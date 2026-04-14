import { test } from '@playwright/test';


test('Cek apakah file .env terbaca', async ({ page }) => {
  // Kita coba cetak di console terminal
  console.log('URL dari .env:', process.env.BASE_URL);
  console.log('User dari .env:', process.env.SAUCE_USERNAME);

  // Coba navigasi menggunakan variabel tersebut
  if (process.env.BASE_URL) {
    await page.goto(process.env.BASE_URL);
    console.log('Berhasil buka halaman dari .env!');
  } else {
    throw new Error('Waduh! BASE_URL tidak terbaca, cek file .env atau config Prof!');
  }
});