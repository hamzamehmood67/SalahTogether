import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3100",
    channel: "chrome",
    headless: true,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    env: {
      SAFF_TEST_OUTPUT: ".next-e2e",
      NEXT_PUBLIC_SUPABASE_URL: "https://saff-test.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_browser_test_only",
      // Set explicitly so the notification prompt does not depend on .env.local.
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: "BTestOnlyNotARealVapidKeyAAA",
    },
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120000,
  },
});
