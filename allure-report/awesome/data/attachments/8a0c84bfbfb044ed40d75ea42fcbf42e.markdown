# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login thành công vào Metruyencv
- Location: D:\Work\Playwright\tests\loginMetruyencv.spec.ts:3:5

# Error details

```
Error: expect.toHaveText: Error: strict mode violation: locator('div.flex.space-x-2') resolved to 27 elements:
    1) <div class="flex space-x-2">…</div> aka locator('#header div').nth(4)
    2) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Oa Ngưu Cuồng BônHuyền Huyễn')
    3) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Dạ Hành NguyệtHuyền Huyễn')
    4) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Nan Ngôn Đích DạTiên Hiệp')
    5) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Lâm Ngoại Hữu LâmLight Novel')
    6) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Sa Lạp Cổ TưHuyền Huyễn')
    7) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Sơn Trung Thổ KhốiĐô Thị')
    8) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Bì Bì ThụĐô Thị')
    9) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Nhất Thế Lưu LyHuyền Huyễn')
    10) <div class="flex justify-between items-center space-x-2 pt-1">…</div> aka getByText('Hồng Diệp Bạch MãCạnh Kỹ')
    ...

Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('div.flex.space-x-2')

    at D:\Work\Playwright\tests\loginMetruyencv.spec.ts:15:35
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
  - textbox "email": mr.zb.gb@gmail.com
  - text: Mật khẩu
  - button "Quên mật khẩu"
  - textbox "password": GBPha@150611@
  - button "Đăng nhập" [disabled]
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
  11 |     await loginPopup.getByPlaceholder('email').fill('mr.zb.gb@gmail.com');
  12 |     await loginPopup.getByPlaceholder('password').fill('GBPha@150611@');
  13 |     await loginPopup.getByRole('button', { name: 'Đăng nhập' }).click();
  14 |     const usernameElement = page.locator('div.flex.space-x-2');
> 15 |     await expect(usernameElement).toHaveText(/GiBasama/);
     |                                   ^ Error: expect.toHaveText: Error: strict mode violation: locator('div.flex.space-x-2') resolved to 27 elements:
  16 |     console.log('✅ Đăng nhập thành công!');
  17 |     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  18 |     await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  19 | }); 
```