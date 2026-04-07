import { BasePage } from "./BasePage";
import {Locator} from '@playwright/test';

export class LoginPage extends BasePage{

    readonly usernameInput= this.page.locator('#user-name');
    readonly passwordInput= this.page.locator('#password');
    readonly loginBtn = this.page.locator('#login-button')

    async login(user:string, pass:string){
        await this.typeText(this.usernameInput, user);
        await this.typeText(this.passwordInput, pass);
        await this.clickElement(this.loginBtn);
        
    }
}