import { test, expect } from '../fixtures/testFixtures';

test('Prof Berhasil Checkout Barang Pertama', async ({ loginPage, inventoryPage }) => {
    // Alur Kerja:
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Nambah barang
    await inventoryPage.addItemToCart();

    // Verifikasi: Apakah angka di keranjang berubah jadi 1?
    await expect(inventoryPage.cardBadge).toHaveText('1');
});