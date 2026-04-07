const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPages');
const { PimPage } = require('../../pages/PimPage');

test('Prof Tambah Karyawan Kangkung Master dengan POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    // 1. Login dari Gudang Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // 2. Tambah Karyawan dari Gudang PIM
    await pimPage.navigateToPim();
    await pimPage.addEmployee('Kangkung', 'Master');

    // 3. Verifikasi (Gunakan Regex agar fleksibel)
    await expect(page.getByRole('heading', { name: /Kangkung Master/i })).toBeVisible({ timeout: 15000 });
    
    console.log('Misi Tambah Kangkung Berhasil, Prof!');
});