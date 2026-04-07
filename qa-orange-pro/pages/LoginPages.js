// pages/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        // Kita simpan semua "Kunci" (Selector) di sini
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async getErrorMessage() {
    return await this.page.locator('.oxd-alert-content-text').textContent();
}
}

// Export biar bisa dipanggil di file tes mana aja
module.exports = { LoginPage };