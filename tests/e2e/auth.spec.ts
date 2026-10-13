import { test, expect } from "@playwright/test";
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
