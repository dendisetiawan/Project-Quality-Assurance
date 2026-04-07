class InventoryPage {
    constructor(page) {
        this.page = page;
        // Kita bikin selector dasar untuk angka di keranjang
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    // --- FUNGSI SAKTI: BISA TAMBAH BARANG APA SAJA ---
    async addProduct(productName) {
        // Kita rakit string selector-nya otomatis (Dinamis)
        // Contoh: 'sauce-labs-backpack'
        const productSelector = `[data-test="add-to-cart-${productName}"]`;
        await this.page.click(productSelector);
    }

    async removeProduct(productName) {
        // Contoh: 'remove-sauce-labs-backpack'
        const removeSelector = `[data-test="remove-${productName}"]`;
        await this.page.click(removeSelector);
    }
// Di dalam class InventoryPage (pages/InventoryPage.js)

async bukaKeranjang() {
    await this.page.click('.shopping_cart_link');
}

async klikCheckout() {
    await this.page.click('[data-test="checkout"]');
}
}

module.exports = { InventoryPage };