const { test, expect } = require('@playwright/test');

test('Update Personal Details di My Info tanpa Helper', async ({ page }) => {
    // 1. Proses Login (Ditulis langsung di sini)
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Navigasi ke My Info (Sesuai sidebar di gambar Anda)
    await page.getByRole('link', { name: 'My Info' }).click();

    // 3. Tunggu hingga halaman My Info termuat
    await expect(page).toHaveURL(/viewPersonalDetails/);

    // 4. Interaksi dengan Form (Berdasarkan gambar My Info yang Anda kirim)
    
    // Mengisi Driver's License Number
    // Kita gunakan locator yang spesifik agar tidak tertukar dengan field lain
    const licenseInput = page.locator('div').filter({ hasText: /^Driver's License Number$/ }).locator('input');
    await licenseInput.fill('12345678');

    // Mengisi License Expiry Date (Input dengan ikon kalender)
    await page.locator('div').filter({ hasText: /^License Expiry Date$/ }).locator('input').fill('2025-12-31');

    // Memilih Marital Status (Dropdown)
    // Di OrangeHRM, dropdown biasanya berupa div yang harus diklik dulu
    await page.locator('div').filter({ hasText: /^Marital Status$/ }).locator('.oxd-select-text').click();
    await page.getByRole('option', { name: 'Married' }).click();

    // 5. Klik Save (Tombol Submit pertama di form Personal Details)
    await page.locator('button[type="submit"]').first().click();

    // 6. Validasi Pesan Sukses
    await expect(page.getByText('Successfully Updated')).toBeVisible();
});