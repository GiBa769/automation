# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login thành công vào Metruyencv
- Location: D:\Work\Playwright\tests\loginMetruyencv.spec.ts:3:5

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#email')

    at D:\Work\Playwright\tests\loginMetruyencv.spec.ts:11:16
```

# Page snapshot

```yaml
- banner:
  - button
  - link "Logo":
    - img "Logo"
  - button
- text: Vui lòng đăng nhập
- dialog:
  - heading "Đăng nhập" [level=3]
  - button "Close"
  - text: Email
  - textbox "email"
  - text: Mật khẩu
  - button "Quên mật khẩu"
  - textbox "password"
  - button "Đăng nhập"
  - text: Chưa có tài khoản?
  - button "Đăng ký ngay"
```

# Test source

```ts
   1 | import  {test, expect} from '@playwright/test';
   2 |
   3 | test('Login thành công vào Metruyencv', async ({page}) => {
   4 |     await page.goto('https://metruyencv.com');
   5 |     await page.click('div.flex.space-x-2 > button');
   6 |     const loginButton = page.getByRole('button', { name: 'Đăng nhập' });
   7 |     await expect(loginButton).toBeVisible({ timeout: 1000 });
   8 |     await loginButton.click();
   9 |     const loginPopup = page.locator('div.bg-panel').filter({ has:page.locator('h3',{hasText: 'Đăng nhập' })});
  10 |     await expect(loginPopup).toBeVisible({ timeout: 1000 });
> 11 |     await page.fill('#email','mr.zb.gb@gmail.com');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  12 |     await page.fill('#password', 'GBPha@150611@');
  13 |     await page.click('#submit');
  14 |     await expect(page.locator('.title')).toHaveText('Truyện mới cập nhật');
  15 |     console.log('✅ Đăng nhập thành công!');
  16 |     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  17 |     await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  18 | }); 
```