import { test, expect } from '@playwright/test';

test.describe('Login OrangeHRM', () => {

  test('Login berhasil dengan username dan password valid', async ({ page }) => {
    // buka website
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // isi username & password
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    // klik tombol login
    await page.getByRole('button', { name: 'Login' }).click();

    // validasi berhasil login
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Login gagal dengan password salah', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('salahpassword');

    await page.getByRole('button', { name: 'Login' }).click();

    // validasi pesan error muncul
    await expect(
      page.locator('.oxd-alert-content-text')
    ).toBeVisible();
  });

  test('Login gagal jika field kosong', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByRole('button', { name: 'Login' }).click();

    // validasi error required muncul
    await expect(
      page.locator('.oxd-input-field-error-message')
    ).toBeVisible();
  });

});
