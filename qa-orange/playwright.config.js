import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // 1. Alarm Global: Robot dikasih waktu 60 detik per test
  timeout: 60000, 

  expect: {
    // Waktu tunggu maksimal untuk validasi (assertion)
    timeout: 10000,
  },

  // Jalankan satu-satu saja biar server OrangeHRM nggak pusing
  workers: 1,

  use: {
    // Alamat utama, jadi di skrip cukup tulis page.goto('/')
    baseURL: 'https://opensource-demo.orangehrmlive.com/',
    
    // Matikan headless kalau mau lihat robotnya gerak pas ngetes lokal
    headless: false,

    // Rekam video & trace kalau tesnya GAGAL (Berguna banget buat CI/CD!)
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    
    screenshot: 'only-on-failure',
  },

  /* Konfigurasi Browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});