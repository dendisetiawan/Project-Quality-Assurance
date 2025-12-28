import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/login.helper';

test.describe('Time - Validation', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('link', { name: 'Time' }).click();
  });

  test('View tanpa Employee Name menampilkan validation', async ({ page }) => {
    await page.getByRole('button', { name: 'View' }).click();

    await expect(
      page.getByText('Required')
    ).toBeVisible();
  });

});
