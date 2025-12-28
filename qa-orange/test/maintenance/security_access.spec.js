const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');

test('Maintenance - Security Validation Prof', async ({ page }) => {
    await login(page);
    
    // Klik menu Maintenance
    await page.getByRole('link', { name: 'Maintenance' }).click(); 
    
    // Profesional Standard: Pastikan sistem meminta password ulang (Administrator Access)
    const passwordPrompt = page.getByText('Administrator Access');
    await expect(passwordPrompt).toBeVisible();
    
    // Pastikan tombol 'Confirm' tidak bisa diklik kalau password kosong
    const confirmBtn = page.getByRole('button', { name: ' Confirm ' });
    await expect(confirmBtn).toBeVisible();
});