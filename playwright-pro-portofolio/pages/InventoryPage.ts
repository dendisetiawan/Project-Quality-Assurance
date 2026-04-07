import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    // 1. Locators
    readonly backpackAddBtn = this.page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    readonly cartLink = this.page.locator('.shopping_cart_link');
    readonly cardBadge = this.page.locator('.shopping_cart_link');

    // 2. Fungsi Tambah Barang (Action)
    async addItemToCart() {
        await this.clickElement(this.backpackAddBtn);
    }
}