import { test, expect } from '@playwright/test';

test.describe('PIM - Edit Employee', () => {

  test('Admin dapat mengedit data employee', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Klik employee pertama di list
    const firstEmployee = page.locator('.oxd-table-body .oxd-table-row').first();
    await expect(firstEmployee).toBeVisible();
    await firstEmployee.click();

    // Validasi halaman Personal Details
    await expect(
      page.getByRole('heading', { name: 'Personal Details' })
    ).toBeVisible();

    // Edit middle name
    const middleName = page.getByName('middleName');
    await middleName.fill('Automation');

    // Save
    await page.getByRole('button', { name: 'Save' }).first().click();

    // Validasi data tersimpan
    await expect(middleName).toHaveValue('Automation');
  });

});
