import { test } from "@playwright/test";
import "./apiTest.spec";
//import "./logProcessor.spec";
import "./loginGibasite.spec";
//import "./ordersQuery.spec";
//import "./sauceLogin.spec";
import "./weatherHCM.spec";
test.describe.parallel("Tổng hợp các tests", () => {
    test("Chạy tất cả test", async () => {
        console.log("🔹 Đã import và chạy tất cả test!");
    });
});