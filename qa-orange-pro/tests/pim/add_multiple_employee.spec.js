const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPages');
const { PimPage } = require('../../pages/PimPage');

// Ini "Daftar Belanjaan" datanya, Prof!
const listKaryawan = [
    { depan: 'Kangkung', belakang: 'Satu' },
    { depan: 'Bayam', belakang: 'Dua' },
    { depan: 'Sawi', belakang: 'Tiga' }
];

// Loop: Robot bakal jalanin tes sebanyak jumlah data di list
for (const orang of listKaryawan) {
    test(`Tambah Karyawan Otomatis: ${orang.depan}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const pimPage = new PimPage(page);

        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');

        await pimPage.navigateToPim();
        await pimPage.addEmployee(orang.depan, orang.belakang);
        
        // Verifikasi tiap nama yang diinput
        await expect(page.getByText(`${orang.depan} ${orang.belakang}`)).toBeVisible();
    });
}