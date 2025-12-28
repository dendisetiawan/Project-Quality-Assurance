import { test, expect } from '@playwright/test';

test('Admin can open Leave List page', async ({ page }) => {
  await page.getByRole('link', { name: 'Leave' }).click();

  await expect(
    page.getByRole('heading', { name: 'Leave List' })
  ).toBeVisible();
});
