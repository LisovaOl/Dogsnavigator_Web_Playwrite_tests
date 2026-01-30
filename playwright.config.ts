import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";

const env = process.env.ENV || "dev";
const isCI = !!process.env.CI;

// ✅ dotenv тільки локально
if (!isCI) {
  dotenv.config({ path: `.env.${env}` });
}

// console.log("ENV:", env);
// console.log("BASE_URL:", process.env.BASE_URL);

// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  // ⏱️ ОСЬ ТУТ ТАЙМАУТИ
  timeout: isCI ? 90_000 : 30_000, // timeout одного тесту
  expect: {
    timeout: isCI ? 20_000 : 5_000, // expect(...)
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: process.env.BASE_URL,
    navigationTimeout: isCI ? 60_000 : 30_000,
    actionTimeout: isCI ? 20_000 : 10_000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "DogsNavigator-WEB",
      testDir: "tests",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASE_URL,
        // httpCredentials: process.env.BASIC_USER
        //   ? {
        //       username: process.env.BASIC_USER,
        //       password: process.env.BASIC_PASS!,
        //     }
        //   : undefined,
        geolocation: {
          latitude: 50.4501,
          longitude: 30.5234,
        },
        permissions: ["geolocation"],
      },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
  ],
});
