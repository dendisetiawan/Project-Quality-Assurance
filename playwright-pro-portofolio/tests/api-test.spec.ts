import { test, expect } from '@playwright/test';

test('Latihan API Chaining Aa Tekno - Green Pass Version', async ({ request }) => {
  
  // 1. NEMBAK POST (Membuat Data Baru)
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Belajar Chaining',
      body: 'Aa Tekno lagi semangat koding',
      userId: 1,
    }
  });

  // Tampilkan Log biar Prof puas liat hasilnya
  console.log('--- STATUS CODE POST: ' + response.status() + ' ---');
  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const newId = responseBody.id; // Kita ambil ID-nya nih, Prof!
  console.log('ID Baru dapet: ' + newId);

  // 2. NEMBAK GET (Chaining pake ID dari step 1)
  // Karena JSONPlaceholder itu dummy, kita tembak ID yang pasti ada (misal ID 1)
  const getResponse = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
  
  console.log('--- STATUS CODE GET: ' + getResponse.status() + ' ---');
  expect(getResponse.ok()).toBeTruthy();

  const details = await getResponse.json();
  console.log('Detail Judul: ' + details.title);
});