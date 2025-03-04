import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('Đếm số dòng chứa ERROR và ghi ra file', async ({}) => {
    const logFilePath = 'sample.log';
    const outputFilePath = 'error_count.txt';

    const logContent = fs.readFileSync(logFilePath, 'utf-8');
    const errorCount = logContent.split('\n').filter(line => line.includes('ERROR')).length;

    fs.writeFileSync(outputFilePath, `Số dòng chứa 'ERROR': ${errorCount}`);
    console.log(`Số dòng chứa 'ERROR': ${errorCount}`);
});