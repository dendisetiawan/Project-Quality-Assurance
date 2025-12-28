// test/performance/kpi.spec.js
const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');
const { PerformancePage } = require('../helpers/performance.page');

test.describe('Performance Module - KPI Test', () => {
    
    test('Bos, ini skrip buat nambah KPI baru', async ({ page }) => {
        const performance = new PerformancePage(page);

        // 1. Login & Masuk menu
        await login(page);
        await performance.navigateToKPIs();

        // 2. Tambah KPI baru
        await performance.btnAdd.click();
        await performance.kpiInput.fill('KPI QA Otomasi Bos');
        
        // Pilih Job Title (misal: Software Engineer)
        await page.locator('.oxd-select-text').click();
        await page.getByRole('option', { name: 'Software Engineer' }).click();

        // 3. Simpan
        await performance.saveBtn.click();

        // 4. Validasi sukses
        await expect(page.getByText('Successfully Saved')).toBeVisible();
        console.log('Selesai Bos! KPI berhasil ditambah.');
    });
});