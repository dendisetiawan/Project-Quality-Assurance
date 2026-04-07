import { test, expect } from '../fixtures/testFixtures';

// 1. Panggil asisten robot kita (PAKE HURUF KECIL DI DEPAN)
test('Scenario: Full Purchase Journey', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    
    // 2. Suruh robotnya jalan (PAKE HURUF KECIL JUGA)
    await loginPage.navigateTo('https://www.saucedemo.com');
    
    // Pastikan username-nya "standard_user" (pake 'd')
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart();
    await inventoryPage.cartLink.click();

    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation('prof', 'qangqung', '12345');
    await checkoutPage.finishOrder();

    // 3. Verifikasi (Gunakan huruf kecil 'checkoutPage')
    // Perhatikan: Teks-nya harus persis (Case Sensitive)
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});