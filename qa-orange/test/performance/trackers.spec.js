// test/performance/trackers.spec.js
const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');
const { PerformancePage } = require('../helpers/performance.page');

test.describe('Performance - Trackers Management', () => {
    
    test('Prof, ini skrip untuk validasi pembuatan Performance Tracker', async ({ page }) => {
        const performance = new PerformancePage(page);

        // 1. Login dan navigasi
        await login(page);
        await performance.goToTrackers();

        // 2. Tambah Tracker Baru
        await performance.btnAdd.click();
        await performance.inputTrackerName.fill('QA Research Tracker - 2025');
        
        // Mengisi nama karyawan (Sesuai gambar Prof, kita pakai hint)
        await performance.employeeInput.fill('Kagathi');
        await page.getByRole('option').first().click(); // Pilih hasil pertama

        // 3. Simpan data
        await performance.btnSave.click();

        // 4. Verifikasi standar profesional
        await expect(page.getByText('Successfully Saved')).toBeVisible();
        console.log('Log: Tracker Berhasil Disimpan, Prof!');
    });
});