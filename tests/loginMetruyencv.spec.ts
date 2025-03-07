import  {test, expect} from '@playwright/test';

test('Login thành công vào Metruyencv', async ({page}) => {
    try {
        await page.goto('https://metruyencv.com');
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.includes('ads') || url.includes('tracking') || url.includes('analytics')) {
                route.abort();
            } else {
                route.continue();
            }
        });
        
        await page.waitForLoadState('domcontentloaded');  // Load DOM thôi, không đợi idle
        await page.waitForTimeout(3000);  // Chờ thêm 3s cho chắc
        
        await page.waitForSelector('div.flex.space-x-2 > button', { timeout: 10000 });
        await page.click('div.flex.space-x-2 > button');
        const loginButton = page.getByRole('button', { name: 'Đăng nhập' });
        await expect(loginButton).toBeVisible({ timeout: 1000 });
        await loginButton.click();
        const loginPopup = page.locator('div.bg-panel').filter({ has:page.locator('h3',{hasText: 'Đăng nhập' })});
        await expect(loginPopup).toBeVisible({ timeout: 1000 });
        await loginPopup.getByPlaceholder('email').fill('mr.zb.gb@gmail.com');
        await loginPopup.getByPlaceholder('password').fill('GBPha@150611@');
        await loginPopup.getByRole('button', { name: 'Đăng nhập' }).click();
        const userButton = page.getByRole('button', { name: 'Thoát' });
        await expect(userButton).toBeVisible();
        await expect(userButton).toHaveText(/Thoát/, { timeout: 5000 });
        console.log('✅ Đăng nhập thành công!');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
    
        // toàn bộ test step ở đây
    } catch (e) {
        console.error('Test failed:', e);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await page.screenshot({ path: `screenshots/error-screenshot-${timestamp}.png` });
        throw e;
    }
    
}); 