import { describe, it, expect } from "vitest";
import {
  PRAYERS,
  DEFAULT_SETTINGS,
  dateKey,
  shiftDate,
  weekStart,
  countDay,
  streak,
  bestStreak,
  badges,
  prayerTimes,
  missedWindow,
  RecordItem,
} from "../src/lib/domain";
const full = (day: string): RecordItem[] =>
  PRAYERS.map((prayer) => ({ date: day, prayer }));
describe("prayer history", () => {
  it("counts each prayer once, even after a retried submission", () =>
    expect(
      countDay(
        [...full("2026-09-29"), { date: "2026-09-29", prayer: "fajr" }],
        "2026-09-29",
      ),
    ).toBe(5));
  it("keeps yesterday’s streak while today is incomplete", () =>
    expect(
      streak(
        [
          ...full("2026-09-27"),
          ...full("2026-09-28"),
          { date: "2026-09-29", prayer: "fajr" },
        ],
        "2026-09-29",
      ),
    ).toBe(2));
  it("breaks a streak at a missing day", () =>
    expect(
      streak([...full("2026-09-26"), ...full("2026-09-28")], "2026-09-29"),
    ).toBe(1));
  it("finds the best streak independently of current progress", () =>
    expect(
      bestStreak([
        ...full("2026-09-26"),
        ...full("2026-09-27"),
        ...full("2026-09-29"),
      ]),
    ).toBe(2));
  it("undo changes derived milestone progress without erasing lifetime history", () => {
    const r = full("2026-09-29");
    expect(badges(r, "2026-09-29").find((b) => b.id === "full")?.have).toBe(1);
    expect(
      badges(r.slice(1), "2026-09-29").find((b) => b.id === "full")?.have,
    ).toBe(0);
    expect(
      badges(r.slice(1), "2026-09-29").find((b) => b.id === "first")?.have,
    ).toBe(4);
  });
  it("retains a previously earned streak badge after a later gap", () => {
    const r = Array.from({ length: 7 }, (_, i) =>
      full(shiftDate("2026-09-01", i)),
    ).flat();
    expect(badges(r, "2026-09-29").find((b) => b.id === "week")?.have).toBe(7);
  });
  it("requires all members for circle unity", () => {
    const circle = {
      id: "c",
      name: "Circle",
      owner: "a",
      goal: 150,
      members: [
        { id: "a", name: "A", records: full("2026-09-29") },
        { id: "b", name: "B", records: full("2026-09-29").slice(1) },
      ],
    };
    expect(
      badges([], "2026-09-29", [circle]).find((b) => b.id === "unity")?.have,
    ).toBe(0);
  });
});
describe("dates and prayer calculations", () => {
  it("uses the member’s local day across midnight", () =>
    expect(dateKey(new Date("2026-09-28T20:00:00Z"), "Asia/Karachi")).toBe(
      "2026-09-29",
    ));
  it("handles leap years and month boundaries", () => {
    expect(shiftDate("2028-03-01", -1)).toBe("2028-02-29");
    expect(shiftDate("2026-01-01", -1)).toBe("2025-12-31");
  });
  it("starts each week on Monday, across month and year boundaries", () => {
    expect(weekStart("2026-09-28")).toBe("2026-09-28");
    expect(weekStart("2026-09-29")).toBe("2026-09-28");
    expect(weekStart("2026-10-04")).toBe("2026-09-28");
    expect(weekStart("2026-01-01")).toBe("2025-12-29");
  });
  it("returns ordered times and changes Asr for the selected preference", () => {
    const hanafi = prayerTimes(DEFAULT_SETTINGS, "2026-09-29");
    const standard = prayerTimes(
      { ...DEFAULT_SETTINGS, hanafi: false },
      "2026-09-29",
    );
    for (let i = 1; i < PRAYERS.length; i++)
      expect(hanafi[PRAYERS[i]].getTime()).toBeGreaterThan(
        hanafi[PRAYERS[i - 1]].getTime(),
      );
    expect(hanafi.asr.getTime()).toBeGreaterThan(standard.asr.getTime());
  });
});
describe("missed prayer windows", () => {
  const day = "2026-09-29",
    t = prayerTimes(DEFAULT_SETTINGS, day),
    at = (d: Date, minutes: number) => new Date(d.getTime() + minutes * 60000);
  it("is open from a prayer's start until the next one begins", () => {
    expect(missedWindow(DEFAULT_SETTINGS, "dhuhr", day, at(t.dhuhr, 1))).toBe(
      false,
    );
    expect(missedWindow(DEFAULT_SETTINGS, "dhuhr", day, at(t.asr, -1))).toBe(
      false,
    );
    expect(missedWindow(DEFAULT_SETTINGS, "dhuhr", day, at(t.asr, 1))).toBe(
      true,
    );
  });
  it("closes Fajr at sunrise and Maghrib at Isha", () => {
    expect(missedWindow(DEFAULT_SETTINGS, "fajr", day, at(t.sunrise, -1))).toBe(
      false,
    );
    expect(missedWindow(DEFAULT_SETTINGS, "fajr", day, at(t.sunrise, 1))).toBe(
      true,
    );
    expect(missedWindow(DEFAULT_SETTINGS, "maghrib", day, at(t.isha, 1))).toBe(
      true,
    );
  });
  it("keeps Isha open past midnight until the next Fajr", () => {
    const next = prayerTimes(DEFAULT_SETTINGS, shiftDate(day, 1));
    expect(missedWindow(DEFAULT_SETTINGS, "isha", day, at(next.fajr, -1))).toBe(
      false,
    );
    expect(missedWindow(DEFAULT_SETTINGS, "isha", day, at(next.fajr, 1))).toBe(
      true,
    );
  });
  it("treats every prayer on an earlier day as missed", () => {
    const later = at(t.dhuhr, 24 * 60);
    for (const prayer of ["fajr", "dhuhr", "asr", "maghrib"] as const)
      expect(missedWindow(DEFAULT_SETTINGS, prayer, day, later)).toBe(true);
  });
});
