const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');

const skenarioSalah = [
    { ket: 'User Salah', u: 'user_ngawur', p: 'secret_sauce', msg: 'Username and password do not match' },
    { ket: 'Pass Salah', u: 'standard_user', p: 'pass_ngaco', msg: 'Username and password do not match' },
    { ket: 'User Kosong', u: '', p: 'secret_sauce', msg: 'Username is required' }
];

for (const data of skenarioSalah) {
    test(`Negative Test: ${data.ket}`, async ({ page }) => {
        const loginPage = new SauceLoginPage(page);
        
        await loginPage.goto();
        await loginPage.login(data.u, data.p);
        
        // Verifikasi pake locator langsung atau fungsi Page
        await expect(loginPage.errorContainer).toContainText(data.msg);
    });
}