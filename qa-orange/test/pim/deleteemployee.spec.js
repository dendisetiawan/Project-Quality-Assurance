import { test, expect } from '@playwright/test';

test.describe('PIM - Delete Employee', () => {

  test('Admin dapat menghapus employee dari Employee List', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Ambil employee pertama
    const firstRow = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(firstRow).toBeVisible();

    // Checklist employee
    await firstRow.locator('input[type="checkbox"]').check();

    // Klik delete
    await page.getByRole('button', { name: 'Delete Selected' }).click();

    // Validasi modal konfirmasi
    await expect(
      page.getByText('Are you Sure')
    ).toBeVisible();

    // Konfirmasi delete
    await page.getByRole('button', { name: 'Yes, Delete' }).click();

    // Validasi modal hilang
    await expect(
      page.getByText('Are you Sure')
    ).toBeHidden();
  });

});
