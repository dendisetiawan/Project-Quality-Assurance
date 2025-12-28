
import { test, expect } from '@playwright/test';


test('Admin can reset leave filter', async ({ page }) => {
  await page.getByRole('link', { name: 'Leave' }).click();

  await page.locator('.oxd-select-text').first().click();
  await page.getByText('Pending Approval').click();

  await page.getByRole('button', { name: 'Reset' }).click();

  await expect(
    page.getByText('-- Select --').first()
  ).toBeVisible();
});
