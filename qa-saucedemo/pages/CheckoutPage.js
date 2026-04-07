// pages/CheckoutPage.js
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.successMsg = page.locator('.complete-header');
    }

    async isiDataDiri(fName, lName, zip) {
        await this.firstName.fill(fName);
        await this.lastName.fill(lName);
        await this.postalCode.fill(zip);
        await this.continueBtn.click();
    }

    async klikFinish() {
        await this.finishBtn.click();
    }
}
module.exports = { CheckoutPage };