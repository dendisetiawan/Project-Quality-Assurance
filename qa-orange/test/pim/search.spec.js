import { test, expect } from '@playwright/test';

test.describe('PIM - Search Employee', () => {

  test('Admin dapat mencari employee berdasarkan nama', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Input employee name
    await page.getByPlaceholder('Type for hints...').first().fill('a');

    // Klik Search
    await page.getByRole('button', { name: 'Search' }).click();

    // Validasi tabel muncul
    const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(firstRow).toBeVisible();
  });

});
