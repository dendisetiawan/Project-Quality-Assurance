const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');
const { PerformancePage } = require('../helpers/performance.page');

test.describe('Performance - Manage Reviews Tests', () => {
    let performancePage;

    test.beforeEach(async ({ page }) => {
        // Gunakan helper login yang sudah ada
        await login(page);
        performancePage = new PerformancePage(page);
        await performancePage.navigateToManageReviews();
    });

    test('Should display "No Records Found" for empty search results', async ({ page }) => {
        // Sesuai gambar UI yang Anda lampirkan
        await performancePage.searchByJobTitle('Chief Executive Officer');
        
        // Validasi teks yang muncul di dashboard
        const noRecordsText = page.getByText('No Records Found');
        await expect(noRecordsText).toBeVisible();
    });

    test('Should reset search filters correctly', async ({ page }) => {
        // Isi filter Employee Name
        await performancePage.employeeNameInput.fill('manda user');
        
        // Klik Reset
        await performancePage.resetButton.click();

        // Pastikan input kembali kosong
        await expect(performancePage.employeeNameInput).toHaveValue('');
    });
});