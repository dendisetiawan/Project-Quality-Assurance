import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UserModel } from '../model/user-model';
import { DbHelper } from '../utils/db-helper';

test.describe('Fase 2: Data-Driven Automation', () => {
    
    test.afterAll(async () => {
        await DbHelper.close();
    });

    test('Login menggunakan credential dari Database', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const targetEmail = 'admin@master.com'; // Email yang ada di DB Prof

        // 1. AMBIL DATA DARI DATABASE (The Intelligence)
        console.log(`Sedang mengambil credential untuk: ${targetEmail}...`);
        const userCredential = await UserModel.getUserData(targetEmail);

        // 2. GUNAKAN DATA TERSEBUT UNTUK UI ACTION
        await loginPage.navigasi();
        
        // Perhatikan: Kita tidak ngetik manual lagi, tapi pakai userCredential.username
        await loginPage.login(userCredential.username, userCredential.password);

        // 3. VALIDASI
        await expect(page).toHaveURL(/inventory.html/);
        console.log('Login Berhasil menggunakan data dari Database, Prof!');
    });
});