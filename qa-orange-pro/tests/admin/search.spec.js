import { test, expect } from '@playwright/test';

test.describe('Admin module', () => { 
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Login dan Search User', async ({ page }) => {
        // Step 1: Login
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Step 2: Masuk ke Admin
        await page.getByRole('link', { name: 'Admin' }).click();

        // Step 3: Filter Status
        await page.locator('div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Enabled' }).click();
        
        // Step 4: Search
        await page.getByRole('button', { name: 'Search' }).click();
        
        // Step 5: Validasi (Opsional tapi penting)
        await expect(page.getByText('Enabled').first()).toBeVisible();
    });

}); // Kurung penutup describe harus di sini (paling bawah)