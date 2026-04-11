import {Page, Locator} from '@playwright/test';

export class DynamicPage{
    readonly page: Page;
    readonly removeBtn: Locator;
    readonly message: Locator;
    readonly loadingBar: Locator; 

    constructor(page:Page){
        this.page = page;
        this.removeBtn = page.locator('button', {hasText:'Remove'});
        this.message = page.locator('#message');
        this.loadingBar = page.locator('#loading')
    }

    async clickRemove(){
        await this.removeBtn.click();
        await this.loadingBar.waitFor({state:'hidden'});
    }
}