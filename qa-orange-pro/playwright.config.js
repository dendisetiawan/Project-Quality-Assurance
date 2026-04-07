import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000, 
  fullyParallel: false, // Matikan paralel agar tidak tabrakan login
  workers: 1,           // Jalankan satu per satu
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    headless: false,    // Set 'true' nanti kalau sudah stabil
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});