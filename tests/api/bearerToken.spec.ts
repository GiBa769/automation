import { test, expect } from '@playwright/test';

const BASE_URL = "https://reqres.in/api";

test('Lấy token đăng nhập', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    console.log("🔑 Token:", responseData.token);
    expect(responseData).toHaveProperty("token");
});
