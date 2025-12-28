// test/recruitment/recruitment_flow.spec.js
const { test, expect } = require('@playwright/test');


test.describe('Recruitment Module - Professional Standard Test', () => {
    let recruitment;

    test.beforeEach(async ({ page }) => {
        await login(page);
        recruitment = new RecruitmentPage(page);
        await recruitment.navigate();
    });

    test('Management Flow: Create Vacancy and Add Candidate', async ({ page }) => {
        // --- BAGIAN 1: VACANCIES ---
        await recruitment.goToVacancies();
        await recruitment.addButton.click();
        
        // Isi detail lowongan (Gunakan selector yang sesuai dengan DOM OrangeHRM)
        await page.locator('.oxd-select-text').first().click(); // Pilih Job Title
        await page.getByRole('option', { name: 'Software Engineer' }).click();
        await page.getByPlaceholder('Type description here').fill('Otomasi Test Vacancy');
        await page.getByPlaceholder('Type here').first().fill('Hiring Manager Test');
        
        await recruitment.saveButton.click();
        await expect(recruitment.successToast).toBeVisible();

        // --- BAGIAN 2: CANDIDATES ---
        await recruitment.goToCandidates();
        await recruitment.addButton.click();

        await page.getByPlaceholder('First Name').fill('Candidate');
        await page.getByPlaceholder('Last Name').fill('Automation');
        
        // Menghubungkan kandidat ke Vacancy yang ada
        await page.locator('.oxd-select-wrapper').click();
        await page.getByRole('option').last().click(); // Pilih vacancy terbaru

        await page.getByPlaceholder('Type here').first().fill('test.email@orange.com');
        
        await recruitment.saveButton.click();
        await expect(recruitment.successToast).toBeVisible();
    });
});