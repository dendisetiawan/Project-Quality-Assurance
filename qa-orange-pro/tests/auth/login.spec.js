const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPages.js');

test('Login Sukses dengan POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Sekarang kodingannya cuma 2 baris! Keren kan?
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // Verifikasi tetap di sini
    await expect(page).toHaveURL(/dashboard/);
});