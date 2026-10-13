import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from "adhan";
export const PRAYERS = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
export type Prayer = (typeof PRAYERS)[number];
export const NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
export const ARABIC = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
export interface Settings {
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  method: string;
  hanafi: boolean;
  reminders: boolean;
  nudges: boolean;
  offset: number;
  reminderPrayers: Prayer[];
  onboarded: boolean;
}
export interface RecordItem {
  date: string;
  prayer: Prayer;
}
export interface Member {
  id: string;
  name: string;
  records: RecordItem[];
  nudges?: boolean;
  timezone?: string;
  localDate?: string;
}
export interface Circle {
  id: string;
  name: string;
  code?: string;
  owner: string;
  goal: number;
  members: Member[];
}
export const DEFAULT_SETTINGS: Settings = {
  name: "Friend",
  city: "Lahore, PK",
  latitude: 31.5204,
  longitude: 74.3587,
  timezone: "Asia/Karachi",
  method: "Karachi",
  hanafi: true,
  reminders: false,
  nudges: false,
  offset: 0,
  reminderPrayers: [...PRAYERS],
  onboarded: false,
};
// Location fields only: picking a city must not reset other preferences.
export const CITIES = [
  {
    city: DEFAULT_SETTINGS.city,
    latitude: DEFAULT_SETTINGS.latitude,
    longitude: DEFAULT_SETTINGS.longitude,
    timezone: DEFAULT_SETTINGS.timezone,
    method: DEFAULT_SETTINGS.method,
    hanafi: DEFAULT_SETTINGS.hanafi,
  },
  {
    city: "Karachi, PK",
    latitude: 24.8607,
    longitude: 67.0011,
    timezone: "Asia/Karachi",
    method: "Karachi",
    hanafi: true,
  },
  {
    city: "Dubai, AE",
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: "Asia/Dubai",
    method: "Dubai",
    hanafi: false,
  },
  {
    city: "London, UK",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
    method: "MoonsightingCommittee",
    hanafi: false,
  },
  {
    city: "Toronto, CA",
    latitude: 43.6532,
    longitude: -79.3832,
    timezone: "America/Toronto",
    method: "NorthAmerica",
    hanafi: false,
  },
];
export function dateKey(date = new Date(), timezone = "Asia/Karachi") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export function shiftDate(key: string, n: number) {
  const d = new Date(key + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function countDay(records: RecordItem[], day: string) {
  return new Set(records.filter((r) => r.date === day).map((r) => r.prayer))
    .size;
}
export function streak(records: RecordItem[], today: string, prayer?: Prayer) {
  const valid = (day: string) =>
    prayer
      ? records.some((r) => r.date === day && r.prayer === prayer)
      : countDay(records, day) === 5;
  let d = valid(today) ? today : shiftDate(today, -1),
    n = 0;
  while (valid(d)) {
    n++;
    d = shiftDate(d, -1);
  }
  return n;
}
export function bestStreak(records: RecordItem[]) {
  const days = [...new Set(records.map((r) => r.date))].sort();
  let best = 0,
    run = 0,
    prev = "";
  for (const day of days) {
    run =
      countDay(records, day) === 5
        ? prev === shiftDate(day, -1)
          ? run + 1
          : 1
        : 0;
    best = Math.max(best, run);
    prev = day;
  }
  return best;
}
export function prayerTimes(
  settings: Settings,
  key = dateKey(new Date(), settings.timezone),
) {
  const [y, m, d] = key.split("-").map(Number);
  const factory =
    CalculationMethod[settings.method as keyof typeof CalculationMethod];
  const params =
    typeof factory === "function" ? factory() : CalculationMethod.Karachi();
  params.madhab = settings.hanafi ? Madhab.Hanafi : Madhab.Shafi;
  return new PrayerTimes(
    new Coordinates(settings.latitude, settings.longitude),
    new Date(y, m - 1, d),
    params,
  );
}
export function timeLabel(d: Date, timezone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(d);
}
export function badges(
  records: RecordItem[],
  today: string,
  circles: Circle[] = [],
) {
  const total = new Set(records.map((r) => r.date + r.prayer)).size,
    full = [...new Set(records.map((r) => r.date))].filter(
      (d) => countDay(records, d) === 5,
    ).length;
  let loggedRun = 0,
    day = countDay(records, today) > 0 ? today : shiftDate(today, -1);
  while (countDay(records, day) > 0) {
    loggedRun++;
    day = shiftDate(day, -1);
  }
  const unity = circles.some(
    (c) =>
      c.members.length > 1 &&
      [...new Set(c.members[0].records.map((r) => r.date))].some((day) =>
        c.members.every((m) => countDay(m.records, day) === 5),
      ),
  );
  const bestRun = (prayer?: Prayer, any = false) => {
    const days = [...new Set(records.map((r) => r.date))].sort();
    let best = 0,
      run = 0,
      prev = "";
    for (const d of days) {
      const valid =
        any ||
        (prayer
          ? records.some((r) => r.date === d && r.prayer === prayer)
          : countDay(records, d) === 5);
      run = valid ? (prev === shiftDate(d, -1) ? run + 1 : 1) : 0;
      best = Math.max(best, run);
      prev = d;
    }
    return best;
  };
  const progress = (need: number, prayer?: Prayer) =>
    bestRun(prayer) >= need ? need : streak(records, today, prayer);
  return [
    {
      id: "first",
      name: "First Step",
      desc: "Record your very first prayer. Every journey begins somewhere.",
      have: total,
      need: 1,
      unit: "prayer",
      med: "medGold",
      glyph: "icoCoin",
    },
    {
      id: "full",
      name: "Full Day",
      desc: "All five prayers recorded in a single day.",
      have: full,
      need: 1,
      unit: "day",
      med: "medViolet",
      glyph: "icoDhuhr",
    },
    {
      id: "fajr7",
      name: "Fajr Riser",
      desc: "Meet the dawn with Fajr, seven days in a row.",
      have: progress(7, "fajr"),
      need: 7,
      unit: "days",
      med: "medSky",
      glyph: "icoFajr",
    },
    {
      id: "unity",
      name: "Circle Unity",
      desc: "Everyone in your circle records all five on the same day.",
      have: unity ? 1 : 0,
      need: 1,
      unit: "day",
      med: "medTeal",
      glyph: "icoMark",
    },
    {
      id: "year",
      name: "Year of Noor",
      desc: "Record at least one prayer each day for a full year.",
      have: bestRun(undefined, true) >= 365 ? 365 : loggedRun,
      need: 365,
      unit: "days",
      med: "medGold",
      glyph: "icoMaghrib",
    },
    {
      id: "week",
      name: "Steadfast",
      desc: "All five prayers, seven days running. One day at a time.",
      have: progress(7),
      need: 7,
      unit: "days",
      med: "medViolet",
      glyph: "icoFlame",
    },
    {
      id: "fifty",
      name: "Growing Light",
      desc: "Fifty prayers recorded. Small steps become a beautiful habit.",
      have: total,
      need: 50,
      unit: "prayers",
      med: "medTeal",
      glyph: "icoAsr",
    },
    {
      id: "fajr40",
      name: "Fajr 40",
      desc: "Forty consecutive mornings of Fajr.",
      have: progress(40, "fajr"),
      need: 40,
      unit: "days",
      med: "medSky",
      glyph: "icoFajr",
    },
    {
      id: "month",
      name: "Full Month",
      desc: "All five prayers recorded for thirty consecutive days.",
      have: progress(30),
      need: 30,
      unit: "days",
      med: "medGold",
      glyph: "icoIsha",
    },
    ...[5, 25, 100].map((n) => ({
      id: "total" + n,
      name: n + " Prayers",
      desc: n + " prayers recorded on your journey.",
      have: total,
      need: n,
      unit: "prayers",
      med: "medGold",
      glyph: "icoCoin",
    })),
  ];
}
