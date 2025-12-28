import { test, expect } from '@playwright/test';

test.describe('Admin - Add User', () => {

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

  test('Admin dapat menambahkan user baru (happy path)', async ({ page }) => {
    // Klik Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Validasi halaman Add User
    await expect(
      page.getByRole('heading', { name: 'Add User' })
    ).toBeVisible();

    // Pilih User Role = Admin
    await page.locator('label:text("User Role")')
      .locator('..')
      .click();
    await page.getByRole('option', { name: 'Admin' }).click();

    // Isi Employee Name (pakai autocomplete)
    await page.getByPlaceholder('Type for hints...').fill('Paul');
    await page.waitForTimeout(1000); // tunggu dropdown muncul
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Pilih Status = Enabled
    await page.locator('label:text("Status")')
      .locator('..')
      .click();
    await page.getByRole('option', { name: 'Enabled' }).click();

    // Isi Username unik
    const uniqueUsername = `qa_user_${Date.now()}`;
    await page.locator('label:text("Username")')
      .locator('..')
      .locator('input')
      .fill(uniqueUsername);

    // Isi Password & Confirm Password
    await page.getByPlaceholder('Password').fill('Admin@123');
    await page.getByPlaceholder('Confirm Password').fill('Admin@123');

    // Klik Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Validasi kembali ke halaman System Users
    await expect(page).toHaveURL(/admin\/viewSystemUsers/);

    // Validasi tidak ada error message
    await expect(
      page.locator('.oxd-input-field-error-message')
    ).toHaveCount(0);
  });

});
