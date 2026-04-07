const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPages');

test('Cek Login Gagal: Password Salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Kasih data ngawur
    await loginPage.login('Admin', 'salah_total_123');

    // Cek pesan error yang muncul di web OrangeHRM
    const alert = page.locator('.oxd-alert-content-text');
    await expect(alert).toHaveText('Invalid credentials');
});