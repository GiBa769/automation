# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login thành công vào Metruyencv
- Location: D:\Work\Playwright\tests\loginMetruyencv.spec.ts:3:5

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div.flex.space-x-2').locator('text=Đăng nhập') to be visible

    at D:\Work\Playwright\tests\loginMetruyencv.spec.ts:7:16
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
   5 |     //await page.click('OpenModal('menu')');
   6 |     await page.click('div.flex.space-x-2 > button');
>  7 |     await page.waitForSelector('div.flex.space-x-2 >> text=Đăng nhập', { timeout: 10000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   8 |     await page.click('div[data-x-show="$store.modal.menu"] >> text=Đăng nhập');
   9 |     await page.fill('#email', 'mr.zb.gb@gmail.com');
  10 |     await page.fill('#password', 'GBPha@150611@');
  11 |     await page.click('#submit');
  12 |     await expect(page.locator('.title')).toHaveText('Truyện mới cập nhật');
  13 |     console.log('✅ Đăng nhập thành công!');
  14 |     const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  15 |     await page.screenshot({ path: `screenshots/screenshot-${timestamp}.png` });
  16 | }); 
```