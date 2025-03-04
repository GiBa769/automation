import { test, expect } from '@playwright/test';

test('Verify post title from JSONPlaceholder API', async ({ request }) => {
    // Gọi API tới JSONPlaceholder
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    // Kiểm tra status code = 200
    expect(response.status()).toBe(200);

    // Parse body từ response
    const responseBody = await response.json();

    // Kiểm tra giá trị "title"
    const expectedTitle = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
    expect(responseBody.title).toBe(expectedTitle);

    console.log('✅ Title is correct:', responseBody.title);
});
