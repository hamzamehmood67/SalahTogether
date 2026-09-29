import { test, expect } from "@playwright/test";
import { mockSupabase, AUTH_KEY } from "./supabase-fixture";
import { existsSync } from "node:fs";
const design = process.env.SAFF_REFERENCE_FILE;
test("compare original mobile composition and motion", async ({
  page,
  browser,
  baseURL,
}) => {
  test.skip(
    !design || !existsSync(design),
    "Set SAFF_REFERENCE_FILE to the supplied HTML to capture reference comparisons.",
  );
  await page.setViewportSize({ width: 1500, height: 1000 });
  await page.goto("file://" + design);
  await page.waitForTimeout(2500);
  const titles = [
    "Welcome",
    "Today",
    "Family circle",
    "Insights · month & year",
    "Milestones",
  ];
  for (const title of titles) {
    const el = page.locator('iframe[title="' + title + '"]');
    await expect(el).toBeVisible();
    await el.screenshot({
      path: "/tmp/saff-original-" + title.split(" ")[0] + ".png",
      animations: "disabled",
    });
  }
  const app = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await app.clock.setFixedTime(new Date("2026-09-29T11:50:00Z"));
  await mockSupabase(app);
  await app.goto(baseURL!);
  await expect(app.locator(".reference-today")).toBeVisible();
  const referenceToday = page.frameLocator('iframe[title="Today"]');
  const styleProperties = [
    "height",
    "borderRadius",
    "backgroundImage",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "borderTopColor",
  ];
  const originalPrayerStyle = await referenceToday
    .locator(".prow")
    .first()
    .evaluate(
      (el, props) =>
        Object.fromEntries(
          props.map((p) => [p, (getComputedStyle(el) as any)[p]]),
        ),
      styleProperties,
    );
  const actualPrayerStyle = await app
    .locator(".prow")
    .first()
    .evaluate(
      (el, props) =>
        Object.fromEntries(
          props.map((p) => [p, (getComputedStyle(el) as any)[p]]),
        ),
      styleProperties,
    );
  expect(actualPrayerStyle).toEqual(originalPrayerStyle);
  await expect(app.locator(".prow").last()).toHaveCSS(
    "opacity",
    await referenceToday
      .locator(".prow")
      .last()
      .evaluate((el) => getComputedStyle(el).opacity),
  );
  const sourceHero = await referenceToday
    .locator('[style*="linear-gradient(150deg"]')
    .evaluate((el) => ({
      background: getComputedStyle(el).backgroundImage,
      height: getComputedStyle(el).height,
      radius: getComputedStyle(el).borderRadius,
    }));
  const appHero = await app
    .locator('[style*="linear-gradient(150deg"]')
    .evaluate((el) => ({
      background: getComputedStyle(el).backgroundImage,
      height: getComputedStyle(el).height,
      radius: getComputedStyle(el).borderRadius,
    }));
  expect(appHero).toEqual(sourceHero);
  await expect(app.locator(".prow").first()).toHaveCSS("height", "56px");
  await expect(app.locator(".reference-today .reference-content")).toHaveCSS(
    "padding-top",
    "36px",
  );
  await expect(app.locator(".reference-today .float").first()).toHaveCSS(
    "animation-duration",
    "5s",
  );
  await expect(app.locator(".reference-today .drift").first()).toHaveCSS(
    "animation-duration",
    "7s",
  );
  await expect(app.locator(".reference-today .spin").first()).toHaveCSS(
    "animation-duration",
    "22s",
  );
  for (const tab of ["Today", "Circles", "Insights", "Milestones"]) {
    await app
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("button", { name: tab, exact: true })
      .click();
    await app.screenshot({
      path: "/tmp/saff-updated-" + tab + ".png",
      animations: "disabled",
    });
  }
  const session = await app.evaluate((key) => {
    const session = localStorage.getItem(key)!;
    localStorage.removeItem(key);
    return session;
  }, AUTH_KEY);
  await app.reload();
  await expect(app.locator(".reference-welcome")).toBeVisible();
  await app.screenshot({
    path: "/tmp/saff-updated-Welcome.png",
    animations: "disabled",
  });
  for (const width of [320, 360, 390, 430]) {
    await app.setViewportSize({ width, height: 844 });
    await expect
      .poll(() =>
        app.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
  }
  await app.setViewportSize({ width: 390, height: 844 });
  await app.emulateMedia({ reducedMotion: "reduce" });
  await expect(app.locator(".reference-welcome .float").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await app.emulateMedia({ reducedMotion: "no-preference" });
  await app.evaluate(({ key, session }) => localStorage.setItem(key, session), {
    key: AUTH_KEY,
    session,
  });
  await app.reload();
  await expect(app.locator(".reference-today")).toBeVisible();
  await app
    .getByRole("button", { name: "Asr, mark as prayed", exact: true })
    .click();
  await expect(app.locator(".prow.just .ico")).toHaveCSS(
    "animation-duration",
    "0.7s",
  );
  await expect(app.locator(".prow.just .burst i").first()).toHaveCSS(
    "animation-duration",
    "0.8s",
  );
  await app.getByRole("button", { name: /Prayer times location:/ }).click();
  await expect(
    app.getByRole("dialog", { name: "Prayer times location" }),
  ).toBeVisible();
  await app.getByRole("button", { name: "Calculation settings" }).click();
  await expect(app.getByLabel("Your name")).toBeVisible();
  await app.close();
});
