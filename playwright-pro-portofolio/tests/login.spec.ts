import { test, expect } from '../fixtures/testFixtures';

test('User can login successfully', async ({ loginPage }) => {
    await loginPage.navigateTo('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verifikasi (Gunakan fixture page bawaan Playwright)
    await expect(loginPage.page).toHaveURL(/inventory.html/);
});