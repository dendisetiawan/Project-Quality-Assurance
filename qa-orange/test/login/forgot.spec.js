import { test, expect } from '@playwright/test';

test.describe('Forgot Password OrangeHRM', () => {

  test('User dapat membuka halaman Forgot Password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // klik link Forgot your password?
    await page.getByText('Forgot your password?').click();

    // validasi halaman reset password
    await expect(
      page.getByRole('heading', { name: 'Reset Password' })
    ).toBeVisible();
  });

  test('Reset password berhasil dengan username valid', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByText('Forgot your password?').click();

    // isi username
    await page.getByPlaceholder('Username').fill('Admin');

    // klik reset password
    await page.getByRole('button', { name: 'Reset Password' }).click();

    // validasi pesan sukses
    await expect(
      page.getByText('Reset Password link sent successfully')
    ).toBeVisible();
  });

  test('Reset password gagal jika username kosong', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.getByText('Forgot your password?').click();

    // klik reset tanpa isi username
    await page.getByRole('button', { name: 'Reset Password' }).click();

    // validasi error required
    await expect(
      page.locator('.oxd-input-field-error-message')
    ).toBeVisible();
  });

});
