import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // 1. Inisialisasi Tipe Data
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // 2. Definisi Alamat Elemen (Standard Pro: Pakai data-test)
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // 3. Kumpulan Aksi (Method)
    async navigasi() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async isiForm(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
    }

    async klikLogin() {
        await this.loginButton.click();
    }

    // Fungsi gabungan biar makin ringkas di test
    async login(user: string, pass: string) {
        await this.navigasi();
        await this.isiForm(user, pass);
        await this.klikLogin();
    }
    async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.click('#logout_sidebar_link');
}

async getErrorMessage() {
    return this.page.locator('[data-test="error"]');
}
}