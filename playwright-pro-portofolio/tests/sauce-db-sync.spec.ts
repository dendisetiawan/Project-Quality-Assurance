import { test, expect } from '@playwright/test';
import { UserModel } from '../models/user-model'; // Panggil Modelnya

test.describe('Professional Framework: Login & DB Sync', () => {

    test('User login should update status in database', async ({ page }) => {
        const targetEmail = 'test@example.com';
        
        // 1. UI Action
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // 2. DB Action (Pake Model, makin rapi!)
        await UserModel.updateStatus(targetEmail, 'Active');
        console.log('Status updated via UserModel, Prof!');

        // 3. Validation (Langsung dapet nilainya)
        const currentStatus = await UserModel.getStatus(targetEmail);
        
        expect(currentStatus).toBe('Active');
        console.log(`Validasi Berhasil! Status di DB: ${currentStatus}`);
    });
    test.afterAll(async () => {
    // Balikin status jadi Inactive atau hapus sekalian biar bersih
    await UserModel.updateStatus('test@example.com', 'Inactive');
    console.log('Database dibersihkan kembali, Prof! Standar SOP aman.');
});
});