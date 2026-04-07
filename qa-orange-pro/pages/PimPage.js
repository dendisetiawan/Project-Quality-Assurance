// pages/PimPage.js
class PimPage {
    constructor(page) {
        this.page = page;
        // 1. Selector Menu & Add
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addButton = page.getByRole('button', { name: ' Add ' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByRole('button', { name: ' Save ' });
        
        // 2. Selector Search
        this.searchInput = page.getByPlaceholder('Type for hints...');
        this.searchButton = page.getByRole('button', { name: ' Search ' });

        // 3. Selector Delete (INI YANG TADI KURANG, PROF!)
        this.deleteSelectedButton = page.getByRole('button', { name: /Delete Selected/i });
        this.confirmDeleteButton = page.getByRole('button', { name: /Yes, Delete/i });
    }

    async navigateToPim() {
        await this.pimMenu.click();
    }

  
async addEmployee(firstName, lastName) {
        await this.addButton.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        
        // Klik Save
        await this.saveButton.click();

        // OBAT KUAT: Tunggu sampai URL-nya berubah ke halaman detail (view)
        // Biasanya URL-nya bakal ada kata 'viewPersonalDetails'
        await this.page.waitForURL(/viewPersonalDetails/, { timeout: 15000 });
        
        // Kasih napas tambahan 2 detik buat render teks namanya
        await this.page.waitForTimeout(2000);
    }
 async searchEmployee(name) {
        await this.searchInput.first().click(); // Klik dulu biar fokus
        await this.searchInput.first().fill(name);
        await this.page.keyboard.press('Enter'); // Pakai Enter biar lebih mantap
        await this.searchButton.click();
        await this.page.waitForTimeout(3000); // Kasih waktu tabel bernapas
    }

    async deleteEmployee(name) {
        // Cari baris yang ada tulisan nama kangkungnya
        const row = this.page.locator('.oxd-table-card').filter({ hasText: name }).first();
        
        // Klik checkbox di baris tersebut
        await row.getByRole('checkbox').click({ force: true });
        
        // Klik tombol delete di atas tabel
        await this.deleteSelectedButton.click();
        
        // Klik konfirmasi "Yes, Delete" di pop-up
        await this.confirmDeleteButton.click();
    }
}

module.exports = { PimPage };