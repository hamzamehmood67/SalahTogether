import { test, expect, type Page } from "@playwright/test";
import { mockSupabase } from "./supabase-fixture";

test("old demo data is discarded and visitors must sign in", async ({
  page,
}) => {
  const state = await mockSupabase(page, { signedIn: false });
  await page.addInitScript(() => {
    localStorage.setItem(
      "saff-v1",
      JSON.stringify({
        settings: { name: "Yusuf" },
        records: [{ date: "2026-09-29", prayer: "fajr" }],
      }),
    );
    localStorage.setItem("saff-nudge-member1", "1");
    localStorage.setItem("unrelated", "keep");
  });
  await page.goto("/");
  await expect(page.locator(".reference-welcome")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("saff-v1"))).toBeNull();
  expect(
    await page.evaluate(() => localStorage.getItem("saff-nudge-member1")),
  ).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem("unrelated"))).toBe(
    "keep",
  );
  await page.getByRole("button", { name: "Continue individually" }).click();
  await page.getByLabel("Email address").fill("amina@example.com");
  await page.getByRole("button", { name: "Email me a sign-in code" }).click();
  await expect(page.getByRole("status")).toContainText("Check your email");
  expect(state.otpRequests).toBe(1);
  await expect(page.locator(".reference-today")).toHaveCount(0);
});

test("new account starts empty, persists its first prayer, and clears on sign-out", async ({
  page,
}) => {
  const state = await mockSupabase(page, { populated: false });
  await page.clock.setFixedTime(new Date("2026-09-29T11:50:00Z"));
  await page.goto("/");
  const setup = page.getByRole("dialog", { name: "Let’s set up your space" });
  await expect(setup).toBeVisible();
  await expect(setup.getByLabel("Your name")).toHaveValue("");
  await setup.getByLabel("Your name").fill("Amina");
  await setup.getByRole("radio", { name: /Dubai, AE/ }).click();
  await setup.getByRole("radio", { name: /Lahore, PK/ }).click();
  await setup.getByRole("button", { name: "Start my journey" }).click();
  await expect(setup).toHaveCount(0);
  expect(state.settings).toMatchObject({
    name: "Amina",
    city: "Lahore, PK",
    timezone: "Asia/Karachi",
    onboarded: true,
  });
  await expect(
    page.getByRole("heading", {
      name: "Assalamu alaikum, Amina",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /recorded, tap to undo/ }),
  ).toHaveCount(0);
  expect(state.circles).toHaveLength(0);
  await page
    .getByRole("button", { name: "Fajr, mark as prayed", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("recorded");
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Fajr, recorded, tap to undo",
      exact: true,
    }),
  ).toBeVisible();
  expect(state.records).toHaveLength(1);
  await page.getByRole("button", { name: "Lahore, PK" }).click();
  await page.getByRole("button", { name: "Calculation settings" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page.locator(".reference-welcome")).toBeVisible();
  await page.reload();
  await expect(page.locator(".reference-welcome")).toBeVisible();
  await expect(page.locator(".reference-today")).toHaveCount(0);
});

test("database failure cannot open a fabricated dashboard and can be retried", async ({
  page,
}) => {
  const state = await mockSupabase(page, {
    populated: false,
    failDashboard: true,
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Unable to load your account" }),
  ).toBeVisible();
  await expect(page.locator(".reference-today")).toHaveCount(0);
  state.failDashboard = false;
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Assalamu alaikum, Friend",
      exact: true,
    }),
  ).toBeVisible();
});

test("signed-out visitors keep an invite through sign-in", async ({ page }) => {
  await mockSupabase(page, { signedIn: false });
  await page.goto("/join/abc123");
  await expect(
    page.getByRole("dialog", { name: "Welcome to Saff" }),
  ).toBeVisible();
  await expect(page).toHaveURL("http://127.0.0.1:3100/");
  expect(await page.evaluate(() => localStorage.getItem("saff-join"))).toBe(
    "ABC123",
  );
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("visitors sign in with the emailed code", async ({ page }) => {
  const state = await mockSupabase(page, {
    signedIn: false,
    populated: false,
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Continue individually" }).click();
  await page.getByLabel("Email address").fill("amina@example.com");
  await page.getByRole("button", { name: "Email me a sign-in code" }).click();
  const code = page.getByLabel("Sign-in code");
  await expect(code).toBeVisible();
  await expect(page.getByText("amina@example.com")).toBeVisible();
  await code.fill("000000");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "incorrect or has expired",
  );
  await page.getByRole("button", { name: "Send a new code" }).click();
  await expect(page.getByRole("status")).toContainText("new code");
  expect(state.otpRequests).toBe(2);
  await code.fill("123 456");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Let’s set up your space" }),
  ).toBeVisible();
});

test("start a circle carries through sign-in and first-run setup", async ({
  page,
}) => {
  await mockSupabase(page, { signedIn: false, populated: false });
  await page.goto("/");
  await page.getByRole("button", { name: "Start a circle" }).click();
  await page.getByLabel("Email address").fill("amina@example.com");
  await page.getByRole("button", { name: "Email me a sign-in code" }).click();
  await page.getByLabel("Sign-in code").fill("123456");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  const setup = page.getByRole("dialog", { name: "Let’s set up your space" });
  await setup.getByLabel("Your name").fill("Amina");
  await setup.getByRole("button", { name: "Start my journey" }).click();
  await expect(
    page.getByRole("dialog", { name: "Start a circle" }),
  ).toBeVisible();
});

test("privacy and account deletion pages are public and fit a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: "Privacy policy", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "how account deletion works" }).click();
  await expect(
    page.getByRole("heading", { name: "Delete your Saff account" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

// Headless Chrome cannot reach a push service, so these stub the browser's side.
async function fakeNotifications(page: Page, permission: "granted" | "denied") {
  await page.addInitScript((answer) => {
    Object.defineProperty(Notification, "permission", { get: () => "default" });
    Object.defineProperty(Notification, "requestPermission", {
      value: async () => answer,
    });
    const subscription = {
      endpoint: "https://push.example.test/device",
      toJSON: () => ({
        endpoint: "https://push.example.test/device",
        keys: { p256dh: "test", auth: "test" },
      }),
    };
    Object.defineProperty(navigator.serviceWorker, "ready", {
      get: () =>
        Promise.resolve({
          pushManager: {
            getSubscription: async () => null,
            subscribe: async () => subscription,
          },
        }),
    });
  }, permission);
}

test("first landing asks once to turn on notifications", async ({ page }) => {
  await fakeNotifications(page, "granted");
  const state = await mockSupabase(page, { notifyPrompt: true });
  await page.goto("/");
  const prompt = page.getByRole("dialog", { name: "Never miss a prayer" });
  await expect(prompt).toContainText("Lahore");
  await prompt.getByRole("button", { name: "Turn on notifications" }).click();
  await expect(prompt).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("Reminders are on");
  expect(state.pushRegistered).toBe(true);
  expect(state.settings).toMatchObject({ reminders: true, nudges: true });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Yusuf" })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("a declined permission or Not now ends the prompt for this device", async ({
  page,
}) => {
  await fakeNotifications(page, "denied");
  const state = await mockSupabase(page, { notifyPrompt: true });
  await page.goto("/");
  const prompt = page.getByRole("dialog", { name: "Never miss a prayer" });
  await prompt.getByRole("button", { name: "Turn on notifications" }).click();
  await expect(prompt).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("not enabled");
  expect(state.settings).toMatchObject({ reminders: false, nudges: false });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Yusuf" })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("new users see the notification prompt after setup, then their chosen step", async ({
  page,
}) => {
  await fakeNotifications(page, "granted");
  await mockSupabase(page, {
    signedIn: false,
    populated: false,
    notifyPrompt: true,
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Start a circle" }).click();
  await page.getByLabel("Email address").fill("amina@example.com");
  await page.getByRole("button", { name: "Email me a sign-in code" }).click();
  await page.getByLabel("Sign-in code").fill("123456");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  const setup = page.getByRole("dialog", { name: "Let’s set up your space" });
  await setup.getByLabel("Your name").fill("Amina");
  await setup.getByRole("button", { name: "Start my journey" }).click();
  const prompt = page.getByRole("dialog", { name: "Never miss a prayer" });
  await prompt.getByRole("button", { name: "Not now" }).click();
  await expect(
    page.getByRole("dialog", { name: "Start a circle" }),
  ).toBeVisible();
});
