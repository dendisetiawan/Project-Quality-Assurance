const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../pages/SauceLoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test('Misi 1: Login dan Masukkan Backpack ke Keranjang', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    const invPage = new InventoryPage(page);

    // 1. Aksi
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await invPage.addBackpack();

    // 2. Validasi (Assertion)
    // Kita cek apakah angka di keranjang muncul dan bernilai "1"
    await expect(invPage.cartBadge).toBeVisible();
    await expect(invPage.cartBadge).toHaveText('1');

    console.log('Misi Berhasil, Prof! Barang sudah masuk keranjang!');
});