class PerformancePage {
    constructor(page) {
        this.page = page;
        this.menuPerformance = page.getByRole('link', { name: 'Performance' });
        this.manageReviewsTab = page.locator('span').filter({ hasText: 'Manage Reviews' });
        
        // Selector berdasarkan gambar UI Performance
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.jobTitleDropdown = page.locator('.oxd-select-text').nth(0);
        this.reviewStatusDropdown = page.locator('.oxd-select-text').nth(1);
        this.searchButton = page.getByRole('button', { name: ' Search ' });
        this.resetButton = page.getByRole('button', { name: ' Reset ' });
    }

    async navigateToManageReviews() {
        await this.menuPerformance.click();
        await this.manageReviewsTab.click();
    }

    async searchByJobTitle(jobTitle) {
        await this.jobTitleDropdown.click();
        await this.page.getByRole('option', { name: jobTitle }).click();
        await this.searchButton.click();
    }
}

module.exports = { PerformancePage };