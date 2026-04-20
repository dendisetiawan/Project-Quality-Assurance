import { test, expect } from '@playwright/test';
import userData from '../data/user.json';

test.describe('Sauce Demo - Data Driven Testing', () => {

  for (const user of userData) {
    test(`Menjalankan ${user.scenario}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      // Aksi Login
      await page.locator('[data-test="username"]').fill(user.username);
      await page.locator('[data-test="password"]').fill(user.password);
      await page.locator('[data-test="login-button"]').click();

      // Validasi berdasarkan status di JSON
      if (user.expectedStatus === 'success') {
        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
      } 
      else if (user.expectedStatus === 'locked') {
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toContainText('Sorry, this user has been locked out');
      }
      else {
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toContainText('Username and password do not match any user in this service');
      }
    });
  }
});