const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPages');
const { PimPage } = require('../../pages/PimPage');

test('Skenario Full Flow: Tambah lalu Hapus Kangkung Master', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    // 1. Masuk ke Markas
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // 2. Tanam Kangkung (Add Employee)
    await pimPage.navigateToPim();
    await pimPage.addEmployee('Kangkung', 'Master');
    
    // Verifikasi muncul di halaman detail setelah Save
    await expect(page.getByRole('heading', { name: /Kangkung Master/i })).toBeVisible({ timeout: 10000 });

    // 3. Cek & Panen (Search & Delete)
    await pimPage.navigateToPim(); // Balik ke daftar karyawan
    await pimPage.searchEmployee('Kangkung');
    await pimPage.deleteEmployee('Kangkung');

    // 4. Verifikasi Akhir
    await expect(page.getByText(/Success/i).first()).toBeVisible();
    
    console.log('Misi Full Flow Selesai, Prof! Kodingan kamu sudah Standar Industri!');
});