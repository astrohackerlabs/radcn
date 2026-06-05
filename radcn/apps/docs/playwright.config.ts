import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: false,
  reporter: [['list']],
  timeout: 120_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:44100',
    viewport: { width: 1280, height: 900 },
    locale: 'en-US',
    timezoneId: 'America/Chicago',
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:44100',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
