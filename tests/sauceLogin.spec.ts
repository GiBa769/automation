import { test, expect } from '@playwright/test';

test('Login thành công vào SauceDemo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Xác minh login thành công bằng tiêu đề trang hoặc item đầu tiên
    await expect(page.locator('.title')).toHaveText('Products');

    // Optional - Check item đầu tiên có xuất hiện
    const firstItem = page.locator('.inventory_item_name').first();
    await expect(firstItem).toBeVisible();

    console.log('✅ Đăng nhập thành công!');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });

    //await page.screenshot({ path: 'screenshots/login-success.png' });

});
