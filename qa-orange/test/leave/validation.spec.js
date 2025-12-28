import { test, expect } from '@playwright/test';


test('Validation shown when required field is empty', async ({ page }) => {
  await page.getByRole('link', { name: 'Leave' }).click();

  await page.getByRole('button', { name: 'Search' }).click();

  await expect(
    page.locator('.oxd-input-field-error-message')
  ).toBeVisible();
});
