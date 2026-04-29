import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserModel } from '../model/user-model';
import { DbHelper } from '../utils/db-helper';

test.describe('Fase 3: Multi-User Data Driven Testing', () => {

    test('Proses semua user dari database', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        const allUsers = await UserModel.getAllActiveUsers();
        console.log(`Ditemukan ${allUsers.length} user aktif di database.`);

        for (const user of allUsers) {
            console.log(`----------------------------------------------`);
            console.log(`Mencoba Skenario untuk: ${user.email}`);
            
            await loginPage.navigasi();
            await loginPage.login(user.username, user.password);

            if (user.username === 'locked_out_user') {
                // === SKENARIO NEGATIVE (Akun Terkunci) ===
                const errorMessage = page.locator('[data-test="error"]');
                await expect(errorMessage).toBeVisible();
                await expect(errorMessage).toContainText('Sorry, this user has been locked out');
                console.log(`✅ Negative Test Sukses untuk ${user.email}`);
            } else {
                // === SKENARIO POSITIVE (Akun Normal) ===
                // Tunggu sampai URL berubah ke dashboard
                await page.waitForURL('**/inventory.html', { timeout: 5000 }); 
                await expect(page).toHaveURL(/inventory.html/);
                console.log(`✅ Positive Test Sukses untuk ${user.email}`);
                
                // PENTING: Logout agar kembali ke halaman login untuk user berikutnya
                await page.click('#react-burger-menu-btn');
                await page.click('#logout_sidebar_link');
            }
            // Logika ganda yang tadi sudah dihapus agar tidak bentrok
        }
    });

    test.afterAll(async () => {
        await DbHelper.close();
    });
});