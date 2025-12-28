import { test, expect } from '@playwright/test';


test('Admin can search leave by status', async ({ page }) => {
  await page.getByRole('link', { name: 'Leave' }).click();

  await page.locator('.oxd-select-text').first().click();
  await page.getByText('Pending Approval').click();

  await page.getByRole('button', { name: 'Search' }).click();

  await expect(
    page.locator('text=No Records Found')
      .or(page.locator('.oxd-table-body'))
  ).toBeVisible();
});
