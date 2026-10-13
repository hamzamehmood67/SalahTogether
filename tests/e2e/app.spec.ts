import { test, expect } from "@playwright/test";
import { mockSupabase } from "./supabase-fixture";
let state: Awaited<ReturnType<typeof mockSupabase>>;
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-09-29T11:50:00Z"));
  state = await mockSupabase(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Yusuf" })).toBeVisible();
});
test("mobile navigation, real history updates, and persistent preferences", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Fajr, recorded, tap to undo", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("unmarked");
  await page.reload();
  await expect(
    page.getByRole("button", { name: /Fajr, (mark as prayed|upcoming)/ }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Insights" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Insights", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Milestones" })
    .click();
  await page.getByRole("button", { name: "First Step" }).click();
  await expect(page.getByRole("heading", { name: "First Step" })).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Today" })
    .click();
  await page.getByRole("button", { name: "Lahore, PK" }).click();
  await page.getByRole("button", { name: "Calculation settings" }).click();
  await page.getByLabel("Your name").fill("Amina");
  await page.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.getByRole("heading", { name: "Amina" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Amina" })).toBeVisible();
});
test("create circle with disclosure and edit goal", async ({ page }) => {
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Circles" })
    .click();
  await page.getByRole("button", { name: "View Ammi progress" }).click();
  await expect(
    page.getByRole("heading", { name: "Ammi’s journey" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Achievements" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page.getByRole("button", { name: "Manage circles" }).click();
  await page
    .getByRole("button", { name: "Create circle", exact: true })
    .click();
  await expect(page.getByText(/existing prayer history/)).toBeVisible();
  await page.getByLabel("Circle name").fill("Our little circle");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Create circle" })
    .click();
  await expect(
    page.getByRole("button", { name: "Manage circles" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Manage circles" }).click();
  await page.getByRole("button", { name: "Edit monthly circle goal" }).click();
  await page.getByLabel("Monthly prayer goal").fill("100");
  await page.getByRole("button", { name: "Save goal" }).click();
  await expect(page.getByRole("status")).toContainText("updated");
});
test("all views fit phone widths and desktop", async ({ page }) => {
  for (const width of [320, 360, 390, 430, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const tab of ["Today", "Circles", "Insights", "Milestones"]) {
      const nav = page.getByRole("navigation", {
        name: width >= 1024 ? "Main navigation" : "Mobile navigation",
        exact: true,
      });
      await nav.getByRole("button", { name: tab, exact: true }).click();
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: "/tmp/saff-" + width + "-" + tab + ".png",
          fullPage: true,
          animations: "disabled",
        });
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        )
        .toBe(true);
    }
  }
});

test("invite links open a prefilled join sheet and owners can share one", async ({
  page,
}) => {
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Circles" })
    .click();
  await page.getByRole("button", { name: "Manage circles" }).click();
  await page
    .getByRole("button", { name: "Invite to The Rahman Family" })
    .click();
  await expect(page.getByLabel("Invite link")).toHaveText(
    "http://127.0.0.1:3100/join/SAFF26",
  );
  await page.goto("/join/friends1");
  await expect(page).toHaveURL("http://127.0.0.1:3100/");
  const join = page.getByRole("dialog", { name: "Join your people" });
  await expect(join.getByLabel("Invite code")).toHaveValue("FRIENDS1");
  await expect(join.getByText(/existing prayer history/)).toBeVisible();
  await join.getByRole("button", { name: "Join circle" }).click();
  await expect(page.getByRole("status")).toContainText("Welcome");
  expect(
    await page.evaluate(() => localStorage.getItem("saff-join")),
  ).toBeNull();
});

test("deleting the account needs typed confirmation and signs out", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Lahore, PK" }).click();
  await page.getByRole("button", { name: "Calculation settings" }).click();
  await expect(
    page.getByRole("link", { name: "Privacy policy" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete account" }).click();
  const dialog = page.getByRole("dialog", { name: "Delete your account" });
  const confirm = dialog.getByRole("button", { name: "Delete my account" });
  await expect(confirm).toBeDisabled();
  await dialog.getByLabel("Type DELETE to confirm").fill("DELETE");
  await confirm.click();
  await expect(page.locator(".reference-welcome")).toBeVisible();
  await expect(page.getByRole("status")).toContainText("deleted");
  expect(state.deleted).toBe(true);
  await page.reload();
  await expect(page.locator(".reference-welcome")).toBeVisible();
});
