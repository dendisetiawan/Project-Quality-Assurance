import { test, expect } from '@playwright/test';

test.describe('PIM - Reset Filter', () => {

  test('Admin dapat mereset field pencarian', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com');

    // Login
    await page.getByName('username').fill('Admin');
    await page.getByName('password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Masuk PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    const employeeNameInput = page.getByPlaceholder('Type for hints...').first();

    // Isi field
    await employeeNameInput.fill('test');

    // Klik Reset
    await page.getByRole('button', { name: 'Reset' }).click();

    // Validasi field kosong kembali
    await expect(employeeNameInput).toHaveValue('');
  });

});
