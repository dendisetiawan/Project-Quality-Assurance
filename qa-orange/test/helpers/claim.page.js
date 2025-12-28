class ClaimPage {
    constructor(page) {
        this.page = page;
        this.menuClaim = page.getByRole('link', { name: 'Claim' });
        this.submitClaimTab = page.getByRole('link', { name: 'Submit Claim' });
        this.eventDropdown = page.locator('.oxd-select-text').first();
        this.currencyDropdown = page.locator('.oxd-select-text').last();
        this.remarksInput = page.locator('textarea');
        this.btnSubmit = page.getByRole('button', { name: ' Submit ' });
    }

    async goToSubmitClaim() {
        await this.menuClaim.click();
        await this.submitClaimTab.click();
    }
}
module.exports = { ClaimPage };