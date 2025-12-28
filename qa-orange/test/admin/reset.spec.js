import { test, expect } from '@playwright/test';

test.describe('Admin - Reset Filter', () => {

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard/);

    // Masuk ke Admin
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page).toHaveURL(/admin\/viewSystemUsers/);
  });

  test('Reset filter mengosongkan field dan menampilkan data default', async ({ page }) => {
    // isi filter Username
    const usernameInput = page.locator('label:text("Username")')
      .locator('..')
      .locator('input');

    await usernameInput.fill('Admin');

    // klik Reset
    await page.getByRole('button', { name: 'Reset' }).click();

    // validasi field kosong kembali
    await expect(usernameInput).toHaveValue('');

    // validasi table tetap muncul (data default)
    const rows = page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows.first()).toBeVisible();
  });

});
