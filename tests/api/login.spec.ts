import { test, request } from '@playwright/test';
import fs from 'fs';

test('Get API Token for JMeter', async () => {
    const apiRequest = await request.newContext();
    const response = await apiRequest.post('https://reqres.in/api/login', {
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    });

    const responseBody = await response.json();
    if (response.status() === 200) {
        console.log("✅ Token received: ", responseBody.token);
        fs.writeFileSync('token.txt', responseBody.token);  // Ghi token ra file
    } else {
        console.error("❌ Failed to get token: ", responseBody);
    }
});
