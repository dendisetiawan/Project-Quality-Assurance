import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../helpers/login.helper';

test.describe('Time - View Timesheet', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.getByRole('link', { name: 'Time' }).click();
  });

  test('Admin dapat melihat timesheet employee', async ({ page }) => {
    const employeeInput = page.getByPlaceholder('Type for hints...');

    await employeeInput.fill('a');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'View' }).click();

    await expect(
      page.getByText('Timesheets Pending Action')
    ).toBeVisible();
  });

});
