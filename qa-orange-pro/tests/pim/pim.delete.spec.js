import { test, expect } from '@playwright/test';

test('Prof hapus karyawan kangkung', async ({ page }) => {
    // 1. Login
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Ke PIM & Search
    await page.getByRole('link', { name: 'PIM' }).click();
    
    // Trik: Tunggu input muncul, isi, lalu tekan Enter biar dropdown hilang
    const searchInput = page.getByPlaceholder('Type for hints...');
    await searchInput.first().fill('kangkung');
    await page.keyboard.press('Enter'); // <--- Tambahan biar mantap
    
    await page.getByRole('button', { name: 'Search' }).click();

    // Tunggu tabel loading sebentar
    await page.waitForTimeout(2000); 

    // 3. Seleksi Checkbox (Pastikan baris kangkung ada!)
    const row = page.locator('.oxd-table-card').filter({ hasText: 'kangkung' });
    await row.getByRole('checkbox').click();

    // 4. Klik tombol "Delete Selected" (Gunakan force: true jika terhalang)
    await page.getByRole('button', { name: /Delete Selected/i }).click();

    // 5. Konfirmasi Pop-up
    await page.getByRole('button', { name: /Yes, Delete/i }).click();

    // 6. Verifikasi
    await expect(page.getByText(/Success/i)).toBeVisible({ timeout: 15000 });
    
    console.log('Misi selesai ya Prof! Kebun kangkung sudah bersih!');
});