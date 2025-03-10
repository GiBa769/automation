import { test, expect } from '@playwright/test';

test('Login thành công vào giba.great-site.net', async ({ page }) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    try {
        await page.goto('http://giba.great-site.net/', { waitUntil: 'networkidle' });

        // Click vào nút "Login" để hiển thị form đăng nhập
        await page.getByRole('link', { name: 'Login' }).click();

        // Chờ ô nhập Username xuất hiện
        await page.getByRole('link', { name: 'Login' }).click();
        const usernameInput = page.locator('#user_login');
        await expect(usernameInput).toBeVisible({ timeout: 10000 });
        await usernameInput.fill('gibasama');

        // Chờ ô nhập Password xuất hiện
        const passwordInput = page.locator('#user_pass');
        await expect(passwordInput).toBeVisible({ timeout: 10000 });
        await passwordInput.fill('GBPha@150611@');

        // Click vào checkbox "Remember Me"
        await page.getByRole('checkbox', { name: 'Remember Me' }).check();

        // Click vào nút Login
        await page.getByRole('button', { name: 'Log In' }).click();

        // Đợi điều hướng sau khi đăng nhập
        await page.waitForSelector('text=GiBasama', { timeout: 10000 });

        // Kiểm tra đăng nhập thành công bằng tên tài khoản
        await expect(page.getByRole('link', { name: 'GiBasama' })).toBeVisible();

        // Chụp ảnh màn hình khi đăng nhập thành công
        await page.screenshot({ path: `screenshots/login-success-${timestamp}.png` });

        console.log('✅ Đăng nhập thành công!');
    } catch (e) {
        console.error('❌ Test failed:', e);
        if (!page.isClosed()) {
            await page.screenshot({ path: `screenshots/error-${timestamp}.png` });
        }
        throw e;
    }
});
