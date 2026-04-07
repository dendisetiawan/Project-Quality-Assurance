import { test, expect } from '@playwright/test';

test.describe('Login OrangeHRM', () => {

  // Ini rahasianya: Panggil URL sekali saja untuk semua test di bawahnya
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/', { 
      timeout: 60000, 
      waitUntil: 'domcontentloaded' 
    });
  });

  test('Login berhasil dengan username dan password valid', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validasi URL
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Login gagal dengan password salah', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('salahpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // Validasi pesan error
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
  });

  test('Login gagal jika field kosong', async ({ page }) => {
    // Langsung klik tanpa isi apa-apa
    await page.getByRole('button', { name: 'Login' }).click();

    // Validasi pesan 'Required' muncul di bawah field
    await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
  });

});