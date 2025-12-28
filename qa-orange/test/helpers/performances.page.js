// test/helpers/performance.page.js
class PerformancePage {
    constructor(page) {
        this.page = page;
        // Selector utama berdasarkan gambar dashboard Bos
        this.performanceMenu = page.getByRole('link', { name: 'Performance' });
        this.configureTab = page.locator('span').filter({ hasText: 'Configure' });
        this.kpiOption = page.getByRole('menuitem', { name: 'KPIs' });
        
        // Selector Form
        this.btnAdd = page.getByRole('button', { name: ' Add ' });
        this.kpiInput = page.locator('.oxd-input').nth(1);
        this.saveBtn = page.getByRole('button', { name: ' Save ' });
    }

    async navigateToKPIs() {
        await this.performanceMenu.click();
        await this.configureTab.click(); // Klik dropdown Configure
        await this.kpiOption.click();    // Klik pilihan KPIs
    }
}

module.exports = { PerformancePage };