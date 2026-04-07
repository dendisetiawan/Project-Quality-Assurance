import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage{
  readonly firstNameInput= this.page.locator('[data-test="firstName"]');
  readonly lastNameInput= this.page.locator('[data-test="lastName"]');
  readonly zipCodeInput = this.page.locator('[data-test="postalCode"]');
  readonly continueBtn= this.page.locator('[data-test= "continue"]');
  readonly finishBtn = this.page.locator('[data-test="finish"]');
  readonly completeHeader = this.page.locator('.complete-header');

  async fillInformation(fname:string, lname:string, zip:string){

  await this.typeText(this.firstNameInput, fname);
  await this.typeText(this.lastNameInput, lname);
  await this.typeText(this.zipCodeInput, zip);
  await this.clickElement(this.continueBtn);

  }

async finishOrder(){
    await this.clickElement(this.finishBtn);
}

}