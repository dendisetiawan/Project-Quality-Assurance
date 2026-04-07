import { BasePage } from "./BasePage";
import { InventoryPage } from "./InventoryPage";

export class CartPage extends BasePage {
    readonly checkoutBtn = this.page.locator('[data-test="checkout"]');
    readonly InventoryItemName = this.page.locator('.inventory_item_name');

    async proceedToCheckout(){
        await this.clickElement(this.checkoutBtn);
    }
}