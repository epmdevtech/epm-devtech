import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:5213',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5213' },
      testIgnore: /blog-(production|parity)\.spec\.ts/,
    },
    {
      name: 'production',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5214' },
      testMatch: /blog-(production|parity)\.spec\.ts/,
    },
  ],
  webServer: [
    {
      command: 'npm run dev -- --port 5213',
      port: 5213,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
    {
      command: 'node scripts/serve-dist.js 5214',
      port: 5214,
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
  ],
});
