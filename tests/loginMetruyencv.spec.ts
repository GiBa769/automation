import { test, expect } from '@playwright/test';

test('Login thành công vào Metruyencv', async ({ page }) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    try {
        await page.goto('https://metruyencv.com');

        // Phát hiện nếu gặp Cloudflare anti-bot
        const isCloudflare = await page.locator('text=Verify you are human').isVisible({ timeout: 5000 });
        if (isCloudflare) {
            console.error('❌ Bị chặn bởi Cloudflare - Trang yêu cầu xác minh con người');
            await page.screenshot({ path: `screenshots/cloudflare-block-${timestamp}.png` });
            throw new Error('Cloudflare anti-bot detected, test cannot proceed.');
        }

        // Chờ button login hiển thị (nếu không bị Cloudflare)
        const loginButton = page.locator('div.flex.space-x-2 > button');
        await expect(loginButton).toBeVisible({ timeout: 15000 });

        await loginButton.click();

        const loginPopupButton = page.getByRole('button', { name: 'Đăng nhập' });
        await expect(loginPopupButton).toBeVisible({ timeout: 5000 });
        await loginPopupButton.click();

        console.log('✅ Đăng nhập thành công!');
        await page.screenshot({ path: `screenshots/success-${timestamp}.png` });
    } catch (e) {
        console.error('❌ Test failed:', e);
        await page.screenshot({ path: `screenshots/error-${timestamp}.png` });
        throw e;
    }
});