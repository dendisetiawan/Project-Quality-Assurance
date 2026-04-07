class SauceLoginPage {
    constructor(page) {
        this.page = page;
        this.userInput = page.locator('[data-test="username"]');
        this.passInput = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        // PINDAHKAN KE SINI & BENERIN KURUNG SIKUNYA:
        this.errorContainer = page.locator('[data-test="error"]'); 
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(user, pass) {
        await this.userInput.fill(user);
        await this.passInput.fill(pass);
        await this.loginBtn.click();
    }

    async verifikasiPesanError(expectedMessage) {
        const errorMsg = await this.errorContainer.textContent();
        // PAKAI BACKTICK (``) BIAR VARIABELNYA WARNA-WARNI DAN JALAN
        if (!errorMsg.includes(expectedMessage)) {
            throw new Error(`Harusnya muncul "${expectedMessage}", tapi malah muncul "${errorMsg}"`);
        }
    }
}

module.exports = { SauceLoginPage };