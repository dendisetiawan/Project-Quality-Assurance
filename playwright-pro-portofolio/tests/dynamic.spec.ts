import { test, expect } from '@playwright/test';
import { DynamicPage } from '../pages/DynamicPage';

test('handle dynamic element removal', async ({ page }) => {
    const dynamicPage = new DynamicPage(page);
    
    // 1. Pastikan URL benar (pakai 's' di belakang controls)
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    
    await dynamicPage.clickRemove();

    // 2. Tambahkan tanda seru (!) agar sama persis dengan di website
    await expect(dynamicPage.message).toHaveText("It's gone!", {timeout: 10000}); 
});