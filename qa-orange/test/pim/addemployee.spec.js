import { test, expect } from '@playwright/test';

test.describe('PIM - Add Employee', () => {

  test('Admin dapat menambahkan employee baru', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // Klik Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Validasi halaman Add Employee
    await expect(
      page.getByRole('heading', { name: 'Add Employee' })
    ).toBeVisible();

    // Input mandatory field
    await page.getByName('firstName').fill('Test');
    await page.getByName('lastName').fill('Automation');

    // Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Validasi berhasil masuk halaman Personal Details
    await expect(
      page.getByRole('heading', { name: 'Personal Details' })
    ).toBeVisible();
  });

});
