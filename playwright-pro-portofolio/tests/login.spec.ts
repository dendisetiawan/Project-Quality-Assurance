import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '../fixtures/testFixtures';

test('User can login successfully', async ({ loginPage }) => {
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.BASE_URL!);
    
    // Verifikasi (Gunakan fixture page bawaan Playwright)
    await expect(loginPage.page).toHaveURL(/inventory.html/);
});