const { test, expect } = require('@playwright/test');
const { login } = require('../helpers/login.helper');
const { ClaimPage } = require('../helpers/claim.page');

test('Prof, ini test krusial untuk pengajuan Claim', async ({ page }) => {
    const claim = new ClaimPage(page);
    await login(page);
    await claim.goToSubmitClaim();

    // Pilih Event (Misal: Medical Reimbursement)
    await claim.eventDropdown.click();
    await page.getByRole('option', { name: 'Medical Reimbursement' }).click();

    // Pilih Currency
    await claim.currencyDropdown.click();
    await page.getByRole('option', { name: 'Indonesian Rupiah' }).click();

    await claim.remarksInput.fill('Biaya check-up rutin Prof');
    await claim.btnSubmit.click();

    // Validasi sukses masuk ke daftar claim
    await expect(page.getByText('Successfully Submitted')).toBeVisible();
});