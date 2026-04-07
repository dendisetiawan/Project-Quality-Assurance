import {Page, Locator} from '@playwright/test';

export class BasePage{
    readonly page:Page;

    constructor(page:Page){
        this.page = page
    }


async navigateTo(url:string){
    await this.page.goto(url);
}

async clickElement(Locator:Locator){
    await Locator.waitFor({state:'visible'});
    await Locator.click();

}
async typeText(locator: Locator, text: string){
    await locator.fill(text);
}
}