import { test, expect } from '@playwright/test';

test.describe('PIM - Filter Employee', () => {

  test('Admin dapat filter employee berdasarkan Job Title', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Pilih Job Title
    await page.locator('div').filter({ hasText: 'Job Title' }).locator('i').click();
    await page.getByRole('option').first().click();

    // Klik Search
    await page.getByRole('button', { name: 'Search' }).click();

    // Validasi hasil tampil
    const resultRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(resultRow).toBeVisible();
  });

});
