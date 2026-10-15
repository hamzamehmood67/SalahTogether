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
  await expect(
    page.getByRole("radio", { name: "Male", exact: true }),
  ).toBeChecked();
  await page.getByRole("radio", { name: "Female" }).click();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await expect(page.getByRole("heading", { name: "Amina" })).toBeVisible();
  expect(state.settings.gender).toBe("female");
  await page.reload();
  await expect(page.getByRole("heading", { name: "Amina" })).toBeVisible();
});
test("create circle with disclosure and edit goal", async ({ page }) => {
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Circles" })
    .click();
  await page.getByRole("button", { name: /^The Rahman Family/ }).click();
  // Each member row shows that member's character, not their initials.
  await expect(
    page.locator('.reference-circle span[style*="avatars/female.svg"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('.reference-circle span[style*="avatars/male.svg"]'),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "View Ammi progress" }).click();
  await expect(
    page.getByRole("heading", { name: "Ammi’s journey" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Achievements" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await page.getByRole("button", { name: "Back to your circles" }).click();
  await page.getByRole("button", { name: "Create a circle" }).click();
  await expect(page.getByText(/existing prayer history/)).toBeVisible();
  await page.getByLabel("Circle name").fill("Our little circle");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Create circle" })
    .click();
  // The new circle opens straight away.
  await expect(page.getByRole("button", { name: "Manage circles" })).toHaveText(
    "Our little circle",
  );
  await page.getByRole("button", { name: "Manage circles" }).click();
  await page.getByRole("button", { name: "Edit monthly circle goal" }).click();
  await page.getByLabel("Monthly prayer goal").fill("100");
  await page.getByRole("button", { name: "Save goal" }).click();
  // The previous message may still be fading out of the sheet's toast slot.
  await expect(
    page.getByRole("status").filter({ hasText: "Circle goal updated" }),
  ).toBeVisible();
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
      if (tab === "Circles") {
        await page.getByRole("button", { name: /^The Rahman Family/ }).click();
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          )
          .toBe(true);
      }
    }
  }
});

test("insights opens on this week and reaches back a year", async ({
  page,
}) => {
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Insights" })
    .click();
  const days = page.getByRole("group", { name: /^Daily prayers in / });
  await expect(
    page.getByRole("button", { name: "Week", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  // Monday to Sunday around Tuesday 29 September.
  await expect(days).toHaveAccessibleName(/28 Sept? – 4 Oct$/);
  await expect(days.getByRole("button")).toHaveCount(7);
  await expect(page.getByText("This week · so far")).toBeVisible();
  await expect(page.getByRole("button", { name: "Next week" })).toBeDisabled();
  await page.getByRole("button", { name: "Previous week" }).click();
  await expect(days).toHaveAccessibleName(/21\s?–\s?27 Sept?$/);
  await expect(page.getByText("30/35", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Month", exact: true }).click();
  await expect(days).toHaveAccessibleName("Daily prayers in September 2026");
  await expect(days.getByRole("button")).toHaveCount(30);
  // The year grid reaches 12 months back; a month picked there opens as a month.
  await page.getByRole("button", { name: "October 2025" }).click();
  await expect(days).toHaveAccessibleName("Daily prayers in October 2025");
  await expect(
    page.getByRole("button", { name: "Previous month" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Week", exact: true }).click();
  await expect(days).toHaveAccessibleName(/29 Sept? – 5 Oct 2025$/);
  await expect(
    page.getByRole("button", { name: "Previous week" }),
  ).toBeDisabled();
});
test("invite links open a prefilled join sheet and owners can share one", async ({
  page,
}) => {
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Circles" })
    .click();
  await page
    .getByRole("button", { name: "Settings for The Rahman Family" })
    .click();
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

test("circle admins decide who invites and members see their role", async ({
  page,
}) => {
  const circlesTab = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("button", { name: "Circles" });
  const settingsFor = (name: string) =>
    page.getByRole("button", { name: "Settings for " + name });
  await circlesTab.click();
  await expect(
    page.getByRole("button", { name: /^The Rahman Family/ }),
  ).toContainText("Admin · 2 members");
  await settingsFor("The Rahman Family").click();
  const family = page.getByRole("dialog", { name: "The Rahman Family" });
  const allow = family.getByLabel("Members can invite");
  await allow.check();
  await expect(page.getByRole("status")).toContainText(
    "Members can now invite",
  );
  expect(state.circles[0].membersCanInvite).toBe(true);
  await allow.uncheck();
  await expect(page.getByRole("status")).toContainText(
    "The invite code has changed",
  );
  expect(state.circles[0].code).toBe("ROTATED1");
  page.once("dialog", (dialog) => dialog.accept());
  await family.getByRole("button", { name: "Reset invite code" }).click();
  await expect(page.getByRole("status")).toContainText("New invite code ready");
  await family
    .getByRole("button", { name: "Invite to The Rahman Family" })
    .click();
  await expect(page.getByLabel("Invite link")).toHaveText(
    "http://127.0.0.1:3100/join/RESET001",
  );
  await page.getByRole("button", { name: "Close", exact: true }).click();
  // A second circle, joined as a member: invites stay with its admin until allowed.
  await page.getByRole("button", { name: "Join with a code" }).click();
  const join = page.getByRole("dialog", { name: "Join your people" });
  await join.getByLabel("Invite code").fill("FRIENDS1");
  await join.getByRole("button", { name: "Join circle" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Welcome" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /^Friends of the Masjid/ }),
  ).toContainText("Member · 2 members");
  await settingsFor("Friends of the Masjid").click();
  const friends = page.getByRole("dialog", { name: "Friends of the Masjid" });
  await expect(
    friends.getByText(
      "Only the admin can invite people to Friends of the Masjid.",
    ),
  ).toBeVisible();
  await expect(friends.getByLabel("Members can invite")).toHaveCount(0);
  await expect(
    friends.getByRole("button", { name: "Reset invite code" }),
  ).toHaveCount(0);
  state.circles.find((c) => c.id === "friends")!.membersCanInvite = true;
  await page.reload();
  await circlesTab.click();
  await settingsFor("Friends of the Masjid").click();
  await page
    .getByRole("button", { name: "Invite to Friends of the Masjid" })
    .click();
  await expect(page.getByLabel("Invite link")).toHaveText(
    "http://127.0.0.1:3100/join/FRIENDS1",
  );
});
