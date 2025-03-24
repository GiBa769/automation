import { test, request, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("Đăng ký user vào hệ thống", async () => {
  const apiRequest = await request.newContext();
  const registerEndpoint = "https://reqres.in/api/register"; // API đăng ký

  // 🔹 Đọc dữ liệu từ file JSON
  const filePath = path.join(__dirname, "../data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`📌 Đang gửi ${users.length} request đăng ký...`);

  // 🔹 Gửi request đăng ký song song để tăng tốc
  const results = await Promise.allSettled(
    users.map(async (user) => {
      const response = await apiRequest.post(registerEndpoint, { data: user });
      return { user, response };
    })
  );

  // 🔹 Phân loại user thành công & thất bại
  type User = {
    email: string;
    password: string;
  };

  const successUsers: User[] = [];
  const failedUsers: { user: User; status: number; error: string }[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      const { user, response } = result.value;
      if (response.status() === 200) {
        successUsers.push(user);
      } else {
        let errorText = "Unknown error";
        try {
          errorText = await response.text();
        } catch (err) {
          console.error("Lỗi khi đọc response:", err);
        }

        failedUsers.push({ user, status: response.status(), error: errorText });
      }
    }
  }

  // 🔹 Xuất kết quả
  console.log(`✅ Đăng ký thành công: ${successUsers.length} user`);
  successUsers.forEach((user, index) => console.log(`   - ${index + 1}: ${user.email}`));

  if (failedUsers.length > 0) {
    console.log(`🚨 Đăng ký thất bại: ${failedUsers.length} user`);
    failedUsers.forEach(({ user, status, error }, index) =>
      console.log(`   - ${index + 1}: ${user.email} (Status: ${status}) ➝ Error: ${error}`)
    );
  }

  // Kiểm tra ít nhất 1 user thành công
  expect(successUsers.length).toBeGreaterThan(0);
});
