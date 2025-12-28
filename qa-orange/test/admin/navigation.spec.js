import { test, expect } from '@playwright/test';

test('Admin dapat membuka menu PIM', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  await page.getByRole('link', { name: 'PIM' }).click();

  await expect(
    page.getByRole('heading', { name: 'Employee Information' })
  ).toBeVisible();
});
