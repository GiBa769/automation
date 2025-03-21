import { test, expect, request } from "@playwright/test";

test("Lấy Bearer Token sau khi login & gọi API User", async () => {
  const apiRequest = await request.newContext();

  // 🔹 Bước 1: Đăng nhập để lấy Bearer Token
  const loginResponse = await apiRequest.post("https://reqres.in/api/login", {
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  // Kiểm tra đăng nhập thành công
  expect(loginResponse.status()).toBe(200);
  const loginData = await loginResponse.json();
  const token = loginData.token; // Token từ response

  console.log("🔑 Bearer Token:", token);

  // 🔹 Bước 2: Gọi API khác sử dụng Bearer Token
  const authRequest = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const userResponse = await authRequest.get("https://reqres.in/api/users/2");

  // Kiểm tra API trả về dữ liệu
  expect(userResponse.status()).toBe(200);
  const userData = await userResponse.json();
  console.log("📌 API User Response:", userData);
});
