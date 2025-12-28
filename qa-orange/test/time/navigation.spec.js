import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/login.helper';

test.describe('Time - Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Admin dapat membuka menu Time', async ({ page }) => {
    await page.getByRole('link', { name: 'Time' }).click();

    await expect(
      page.getByRole('heading', { name: 'Select Employee' })
    ).toBeVisible();
  });

});
