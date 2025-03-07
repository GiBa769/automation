import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    use: {
        browserName: 'chromium',
        headless: true
    },
    reporter: [['html'], ['list'], ['allure-playwright']],
    reporter: [['list'], ['allure-playwright'], ['html']],
    use: {
        headless: true,
    },
});

