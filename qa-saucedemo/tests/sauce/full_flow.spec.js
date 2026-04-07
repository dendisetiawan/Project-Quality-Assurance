const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CheckoutPage } = require('../../pages/CheckoutPage'); // Pastikan o kecil ya Prof!

// 1. IMPORT DATA DARI JSON (Siapkan list 'pasukan' robotnya)
const testData = require('../../data/users.json');

// 2. LOOPING: Robot bakal jalan otomatis sebanyak data di users.json
testData.forEach(data => {
    
    test(`Misi Final [Data Driven]: Testing untuk ${data.deskripsi}`, async ({ page }) => {
        // Inisialisasi Semua Page (Gudang Senjata)
        const loginPage = new SauceLoginPage(page);
        const invPage = new InventoryPage(page);
        const checkPage = new CheckoutPage(page);

        // Alur Login (Sekarang ambil data dari JSON: data.username & data.password)
        await loginPage.goto();
        await loginPage.login(data.username, data.password);

        // Alur Belanja (Pakai Dynamic Selector Prof yang keren)
        await invPage.addProduct('sauce-labs-backpack');
        await invPage.bukaKeranjang();
        await invPage.klikCheckout();

        // Alur Checkout (Misi Baru Prof!)
        // Isi pake nama Prof biar makin mantap!
        await checkPage.isiDataDiri('Prof', 'IT-Engineer', '12345');
        await checkPage.klikFinish();

        // Validasi Akhir (Bukti Kemenangan)
        await expect(checkPage.successMsg).toBeVisible();
        await expect(checkPage.successMsg).toHaveText('Thank you for your order!');

        console.log(`--- SELESAI UNTUK USER: ${data.username} ---`);
    });

});