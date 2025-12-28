import { test, expect } from '@playwright/test';

test.describe('Admin - Search User', () => {

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

  test('Search user berdasarkan Username', async ({ page }) => {
    // isi field Username
    await page.locator('label:text("Username")')
      .locator('..')
      .locator('input')
      .fill('Admin');

    // klik Search
    await page.getByRole('button', { name: 'Search' }).click();

    // validasi hasil muncul
    const rows = page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows.first()).toBeVisible();

    // validasi username Admin ada di hasil
    await expect(
      page.locator('.oxd-table-cell').filter({ hasText: 'Admin' }).first()
    ).toBeVisible();
  });

});
