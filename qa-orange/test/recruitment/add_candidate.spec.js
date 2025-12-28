// test/recruitment/add_candidate.spec.js
const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');

test.describe('Recruitment Module Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Melakukan login sebelum setiap test dijalankan
        await login(page);
    });

    test('Should successfully add a new candidate', async ({ page }) => {
        // 1. Navigasi ke menu Recruitment melalui sidebar
        await page.getByRole('link', { name: 'Recruitment' }).click();

        // 2. Klik tombol Add (tombol hijau di gambar Anda)
        await page.getByRole('button', { name: 'Add' }).click();

        // 3. Isi Form Kandidat
        await page.getByPlaceholder('First Name').fill('Budi');
        await page.getByPlaceholder('Last Name').fill('Automation');
        
        // Pilih email (sesuaikan selector jika perlu)
        await page.getByPlaceholder('Type here').first().fill('budi.auto@test.com');

        // 4. Simpan Data
        await page.getByRole('button', { name: 'Save' }).click();

        // 5. Validasi: Pastikan muncul toast sukses atau data tersimpan
        // Biasanya muncul teks "Successfully Saved"
        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });
});