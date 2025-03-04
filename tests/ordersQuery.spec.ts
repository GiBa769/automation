import { test, expect } from '@playwright/test';

test('Lấy danh sách khách hàng có tổng tiền đơn hàng > 1000 USD', async ({ request }) => {
    // Giả sử có API giả lập trả về danh sách đơn hàng
    const ordersResponse = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(ordersResponse.ok()).toBeTruthy();

    // Giả sử thêm API trả về danh sách khách hàng (demo)
    const customersResponse = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(customersResponse.ok()).toBeTruthy();

    const orders = await ordersResponse.json();
    const customers = await customersResponse.json();

    // Giả lập orders và customers có cấu trúc như sau:
    // orders: [{ orderId, customerId, orderAmount }]
    // customers: [{ customerId, customerName }]

    // Dữ liệu mẫu giả lập (ở thực tế sẽ từ API)
    const sampleOrders = [
        { orderId: 1, customerId: 1, orderAmount: 500 },
        { orderId: 2, customerId: 1, orderAmount: 600 },
        { orderId: 3, customerId: 2, orderAmount: 800 },
        { orderId: 4, customerId: 2, orderAmount: 300 },
        { orderId: 5, customerId: 3, orderAmount: 400 },
    ];

    const sampleCustomers = [
        { customerId: 1, customerName: 'John Doe' },
        { customerId: 2, customerName: 'Jane Smith' },
        { customerId: 3, customerName: 'Alice Brown' },
    ];

    // Tính tổng tiền theo từng khách hàng
    const customerTotalMap = new Map<number, number>();

    for (const order of sampleOrders) {
        if (customerTotalMap.has(order.customerId)) {
            customerTotalMap.set(order.customerId, customerTotalMap.get(order.customerId)! + order.orderAmount);
        } else {
            customerTotalMap.set(order.customerId, order.orderAmount);
        }
    }

    // Lọc ra khách hàng có tổng tiền đơn hàng > 1000
    const richCustomers = sampleCustomers
        .filter(customer => (customerTotalMap.get(customer.customerId) ?? 0) > 1000)
        .map(customer => ({
            customerId: customer.customerId,
            customerName: customer.customerName,
            totalSpent: customerTotalMap.get(customer.customerId) ?? 0
        }));

    console.log('Danh sách khách hàng có tổng tiền > 1000 USD:', richCustomers);

    // Kỳ vọng có ít nhất 1 khách hàng (để kiểm thử)
    expect(richCustomers.length).toBeGreaterThan(0);
});
