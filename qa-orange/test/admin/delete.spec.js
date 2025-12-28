import { test, expect } from '@playwright/test';

test.describe('Admin - Delete User', () => {

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

  test('Admin dapat menghapus user dari System Users', async ({ page }) => {
    // Ambil baris pertama user (selain header)
    const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(firstRow).toBeVisible();

    // Klik checkbox user
    await firstRow.locator('input[type="checkbox"]').check();

    // Klik tombol Delete (ikon trash)
    await page.getByRole('button', { name: 'Delete Selected' }).click();

    // Validasi modal konfirmasi muncul
    await expect(
      page.getByText('Are you Sure?')
    ).toBeVisible();

    // Konfirmasi delete
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    // Validasi proses selesai (modal hilang)
    await expect(
      page.getByText('Are you Sure?')
    ).toBeHidden();
  });

});
