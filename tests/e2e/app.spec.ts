import { test, expect } from "@playwright/test";
import { mockSupabase } from "./supabase-fixture";
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-09-29T11:50:00Z"));
  await mockSupabase(page);
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
