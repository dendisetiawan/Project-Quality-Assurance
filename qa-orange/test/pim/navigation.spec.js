import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/login.helper';

test.describe('PIM - Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('Admin dapat membuka menu PIM', async ({ page }) => {
    await page.getByRole('link', { name: 'PIM' }).click();

    await expect(
      page.getByRole('heading', { name: 'Employee Information' })
    ).toBeVisible();
  });

});
