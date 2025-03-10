# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login thành công vào Metruyencv
- Location: D:\Work\Playwright\tests\loginMetruyencv.spec.ts:3:5

# Error details

```
Error: Timed out 15000ms waiting for expect(locator).toBeVisible()

Locator: locator('div[data-x-show="$store.modal.menu"]')
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 15000ms
  - waiting for locator('div[data-x-show="$store.modal.menu"]')
    18 × locator resolved to <div data-x-data="" data-x-show="$store.modal.menu">…</div>
       - unexpected value "hidden"

    at D:\Work\Playwright\tests\loginMetruyencv.spec.ts:7:28
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
  - button
  - button "Close panel"
  - button "Đăng nhập"
  - button "Đăng ký tài khoản"
  - heading "Đăng truyện" [level=3]:
    - img
    - link "Đăng truyện"
  - heading "Kho truyện" [level=3]:
    - img
    - link "Kho truyện"
  - list:
    - listitem:
      - link "Truyện mới"
    - listitem:
      - link "Truyện full"
  - heading "Xếp hạng" [level=3]:
    - img
    - link "Xếp hạng"
  - list:
    - listitem:
      - link "Xếp hạng lượt đọc"
    - listitem:
      - link "Xếp hạng đề cử"
    - listitem:
      - link "Xếp hạng tặng thưởng"
    - listitem:
      - link "Xếp hạng bình luận"
  - heading "Thời gian thực" [level=3]:
    - img
    - link "Thời gian thực"
  - heading "Đánh giá mới" [level=3]:
    - img
    - link "Đánh giá mới"
```

# Test source

```ts
   1 | import  {test, expect} from '@playwright/test';
   2 |
   3 | test('Login thành công vào Metruyencv', async ({page}) => {
   4 |     await page.goto('https://metruyencv.com');
   5 |     await page.click('div.flex.space-x-2 > button');
   6 |     const sideMenu = page.locator('div[data-x-show="$store.modal.menu"]');
>  7 |     await expect(sideMenu).toBeVisible({ timeout: 15000 });
     |                            ^ Error: Timed out 15000ms waiting for expect(locator).toBeVisible()
   8 |     await sideMenu.getByRole('button', { name: 'Đăng nhập' }).click();
   9 |     await page.fill('#email', 'mr.zb.gb@gmail.com');
  10 |     await page.fill('#password', 'GBPha@150611@');
  11 |     await page.click('#submit');
  12 |     await expect(page.locator('.title')).toHaveText('Truyện mới cập nhật');
  13 |     console.log('✅ Đăng nhập thành công!');
  14 |     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  15 |     await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  16 | }); 
```