"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Sunrise,
  Users,
  ChartNoAxesColumnIncreasing,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  MapPin,
  LocateFixed,
  ArrowRight,
  ArrowUpRight,
  Settings as SettingsIcon,
  LogOut,
  Copy,
  Bell,
  BellOff,
  Share2,
  Menu,
  Mail,
  LoaderCircle,
  Heart,
  CheckCheck,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { useSaff } from "@/lib/use-saff";
import {
  PRAYERS,
  NAMES,
  ARABIC,
  Settings,
  CITIES,
  RecordItem,
  Prayer,
  dateKey,
  shiftDate,
  countDay,
  streak,
  bestStreak,
  prayerTimes,
  timeLabel,
  badges,
} from "@/lib/domain";
import { supabase } from "@/lib/supabase";
import { PushState, pushState, enablePush, disablePush } from "@/lib/push";
import TodayReference from "./reference/today";
import CircleReference from "./reference/circle";
import InsightsReference from "./reference/insights";
import MilestonesReference from "./reference/milestones";
import WelcomeReference from "./reference/welcome";
import type { ReferenceValues } from "./reference/types";
type Tab = "today" | "circles" | "insights" | "milestones";
const TABS = [
  { id: "today", label: "Today", icon: Sunrise },
  { id: "circles", label: "Circles", icon: Users },
  { id: "insights", label: "Insights", icon: ChartNoAxesColumnIncreasing },
  { id: "milestones", label: "Milestones", icon: Award },
] as const;
export function Art({
  id,
  size = 48,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={"art " + className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <use href={"/saff-symbols.svg#" + id} />
    </svg>
  );
}
function Medal({
  med,
  glyph,
  size = 64,
}: {
  med: string;
  glyph: string;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <use href={"/saff-symbols.svg#" + med} />
      <use
        href={"/saff-symbols.svg#" + glyph}
        x="19"
        y="14"
        width="26"
        height="26"
      />
    </svg>
  );
}
function Sheet({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const body = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          'button,input,select,a[href],[tabindex="0"]',
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = body;
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, []);
  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="sheet"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <header>
          <h2>{title}</h2>
          <button className="icon-button" onClick={close} aria-label="Close">
            <X size={20} />
          </button>
        </header>
        {children}
      </motion.div>
    </motion.div>
  );
}
export default function Saff() {
  const app = useSaff();
  const { settings, records, circles, ready, welcome, userId } = app;
  const [tab, setTab] = useState<Tab>("today"),
    [sheet, setSheet] = useState<
      | null
      | "location"
      | "settings"
      | "create"
      | "join"
      | "invite"
      | "goal"
      | "auth"
      | "member"
      | "circles"
    >(null),
    [now, setNow] = useState(new Date()),
    [toast, setToast] = useState(""),
    [just, setJust] = useState<string | null>(null),
    [badgeFlip, setBadgeFlip] = useState(0),
    [nudged, setNudged] = useState<Record<string, boolean>>({}),
    [pending, setPending] = useState(false),
    [circleId, setCircleId] = useState(""),
    [badgeId, setBadgeId] = useState("year"),
    [month, setMonth] = useState(""),
    [selectedDay, setSelectedDay] = useState(""),
    [memberId, setMemberId] = useState(""),
    [memberDay, setMemberDay] = useState(""),
    [email, setEmail] = useState(""),
    [formValue, setFormValue] = useState(""),
    [draft, setDraft] = useState<Settings>(settings),
    [pickedOrb, setPickedOrb] = useState<number | null>(null),
    [devicePush, setDevicePush] = useState<PushState>("off");
  useEffect(() => {
    setSheet(null);
    setNudged({});
    setCircleId("");
  }, [userId]);
  useEffect(() => {
    if (!welcome) setSheet((current) => (current === "auth" ? null : current));
  }, [welcome]);
  const today = dateKey(now, settings.timezone);
  const times = useMemo(() => prayerTimes(settings, today), [settings, today]);
  const done = countDay(records, today);
  const currentIndex = PRAYERS.reduce(
    (a, p, i) => (now >= times[p] ? i : a),
    -1,
  );
  const nextIndex = PRAYERS.findIndex((p) => times[p] > now);
  const nextPrayer =
    nextIndex < 0
      ? prayerTimes(settings, shiftDate(today, 1)).fajr
      : times[PRAYERS[nextIndex]];
  const seconds = Math.max(
    0,
    Math.floor((nextPrayer.getTime() - now.getTime()) / 1000),
  );
  const countdown = [
    Math.floor(seconds / 3600),
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
  const circle = circles.find((c) => c.id === circleId) || circles[0];
  const allBadges = useMemo(
    () => badges(records, today, circles),
    [records, today, circles],
  );
  const selectedBadge = allBadges.find((b) => b.id === badgeId) || allBadges[0];
  const earned = allBadges.filter((b) => b.have >= b.need).length;
  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);
  useEffect(() => {
    if (app.error) setToast(app.error);
  }, [app.error]);
  useEffect(() => {
    if (sheet !== "location") return;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = document.querySelector<HTMLElement>(
      ".reference-location-overlay [role=dialog]",
    );
    dialog?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheet(null);
      if (e.key !== "Tab" || !dialog) return;
      const elements = dialog.querySelectorAll<HTMLElement>(
        "button,a[href],input,select,[tabindex='0']",
      );
      if (!elements.length) return;
      const first = elements[0],
        last = elements[elements.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, [sheet]);
  function notify(message: string) {
    setToast(message);
  }
  async function run(fn: () => Promise<void>) {
    setPending(true);
    try {
      await fn();
    } catch (e) {
      notify((e as Error).message || "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }
  async function toggle(prayer: Prayer, day = today) {
    if (pending) return;
    await run(async () => {
      const added = await app.toggle(prayer, day);
      if (added) {
        setJust(prayer);
        setTimeout(() => setJust(null), 900);
      }
      notify(
        added
          ? countDay(records, day) === 4
            ? "All five. A beautiful day, one prayer at a time."
            : NAMES[PRAYERS.indexOf(prayer)] +
              " recorded. " +
              (circles.length
                ? "Your circle can see it."
                : "A small step, kept steadily.")
          : "Prayer unmarked.",
      );
    });
  }
  function navigate(next: Tab) {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function open(type: typeof sheet) {
    setDraft(settings);
    setFormValue("");
    setSheet(type);
    if (type === "settings" && supabase)
      pushState(supabase)
        .then(setDevicePush)
        .catch(() => setDevicePush("off"));
  }
  async function invite() {
    if (circle?.code) {
      try {
        await navigator.clipboard.writeText(circle.code);
        notify("Invite code copied. Share it with someone you love.");
      } catch {
        open("invite");
      }
    } else open("invite");
  }
  const selectedMonth = month || today.slice(0, 7);
  const [yearNum, monthNum] = selectedMonth.split("-").map(Number);
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  const monthRecords = records.filter((r) => r.date.startsWith(selectedMonth));
  const pickedDay = selectedDay.startsWith(selectedMonth)
    ? selectedDay
    : selectedMonth === today.slice(0, 7)
      ? today
      : selectedMonth + "-01";
  const monthLabel = new Date(yearNum, monthNum - 1, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );
  const closedDays = Array.from(
    { length: daysInMonth },
    (_, i) => selectedMonth + "-" + String(i + 1).padStart(2, "0"),
  ).filter((d) => d < today);
  const fullDays = closedDays.filter((d) => countDay(records, d) === 5).length;
  function changeMonth(n: number) {
    const d = new Date(yearNum, monthNum - 1 + n, 1);
    setMonth(d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"));
    setSelectedDay("");
  }
  const circleMonthTotal =
    circle?.members.reduce(
      (n, m) =>
        n +
        m.records.filter((r) => r.date.startsWith(today.slice(0, 7))).length,
      0,
    ) || 0;
  function groupGoal() {
    return circle ? (
      <div className="group-goal">
        <Art id="icoMark" size={48} />
        <div className="grow">
          <div className="between">
            <strong>
              Circle goal ·{" "}
              {now.toLocaleDateString("en-US", {
                month: "long",
                timeZone: settings.timezone,
              })}
            </strong>
            <span>
              {circleMonthTotal} / {circle.goal}
            </span>
          </div>
          <div className="track mint">
            <span
              style={{
                width:
                  Math.min(100, (circleMonthTotal / circle.goal) * 100) + "%",
              }}
            />
          </div>
          <small>
            {circle.name} · {Math.max(0, circle.goal - circleMonthTotal)}{" "}
            prayers together to go
          </small>
        </div>
      </div>
    ) : null;
  }
  const currentName = NAMES[Math.max(0, currentIndex)];
  const viewedMember = circle?.members.find((m) => m.id === memberId);
  const viewedDate = memberDay || viewedMember?.localDate || today;
  const avatarColors = [
    ["#F5B942", "#1A1400"],
    ["#FF9DBB", "#3A0F1F"],
    ["#7CC4FF", "#06243D"],
    ["#B79CFF", "#1E0F45"],
    ["#7CF2C6", "#06301F"],
    ["#FFC89A", "#3D1C00"],
  ];
  const activePrayer = PRAYERS[Math.max(0, currentIndex)];
  const orbDescriptions = [
    "dawn, before sunrise",
    "just after midday",
    "late afternoon",
    "right after sunset",
    "nightfall",
  ];
  const milestonePct = Math.round(
    Math.min(1, selectedBadge.have / selectedBadge.need) * 100,
  );
  const milestoneLeft = Math.max(0, selectedBadge.need - selectedBadge.have);
  const isEarned = selectedBadge.have >= selectedBadge.need;
  const hijriParts = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: settings.timezone,
  }).formatToParts(now);
  const hijriPart = (type: Intl.DateTimeFormatPartTypes) =>
    hijriParts.find((p) => p.type === type)?.value || "";
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabiʿ al-Awwal",
    "Rabiʿ al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Shaʿban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qiʿdah",
    "Dhu al-Hijjah",
  ];
  const rawHijri = `${hijriPart("day")} ${hijriMonths[Number(hijriPart("month")) - 1]} ${hijriPart("year")}`;
  const firstYearMonth = new Date(
    Number(today.slice(0, 4)),
    Number(today.slice(5, 7)) - 12,
    1,
  );
  const firstYearKey =
    firstYearMonth.getFullYear() +
    "-" +
    String(firstYearMonth.getMonth() + 1).padStart(2, "0");
  const referenceValues: ReferenceValues = {
    name: settings.name,
    toast: sheet ? null : toast,
    goToday: () => navigate("today"),
    goCircles: () => navigate("circles"),
    goInsights: () => navigate("insights"),
    goMilestones: () => navigate("milestones"),
    startCircle: () => {
      if (!userId) open("auth");
      else {
        open("create");
      }
    },
    joinCircle: () => {
      if (!userId) open("auth");
      else {
        open("join");
      }
    },
    orbs: PRAYERS.map((p, i) => ({
      x: [35, 87, 167, 247, 299][i],
      y: [194, 127, 102, 127, 194][i],
      icon: "#ico" + NAMES[i],
      name: NAMES[i],
      sel: pickedOrb === i,
      cls: "orb" + (pickedOrb === i ? " sel" : ""),
      delay: 0.35 + i * 0.1 + "s",
      fdelay: -i * 0.9 + "s",
      pick: () => setPickedOrb(pickedOrb === i ? null : i),
    })),
    picked: pickedOrb !== null,
    notPicked: pickedOrb === null,
    cap:
      pickedOrb === null
        ? {}
        : {
            name: NAMES[pickedOrb],
            ar: ARABIC[pickedOrb],
            sub: orbDescriptions[pickedOrb],
          },
    streak: streak(records, today),
    streakLabel: streak(records, today) + "-day streak of all five prayers",
    hijriDate:
      now.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: settings.timezone,
      }) +
      " · " +
      rawHijri,
    city: {
      name: settings.city,
      asr: timeLabel(times.asr, settings.timezone),
      method: settings.method,
      madhab: settings.hanafi ? "Hanafi" : "Standard",
    },
    currentName,
    currentArabic: ARABIC[Math.max(0, currentIndex)],
    currentIcon: "#ico" + currentName,
    currentLabel:
      currentIndex < 0
        ? "COMING UP"
        : "NOW · SINCE " + timeLabel(times[activePrayer], settings.timezone),
    nextName: NAMES[nextIndex < 0 ? 0 : nextIndex],
    countdown,
    pct:
      currentIndex < 0
        ? 0
        : Math.max(
            0,
            Math.min(
              100,
              ((now.getTime() - times[activePrayer].getTime()) /
                (nextPrayer.getTime() - times[activePrayer].getTime())) *
                100,
            ),
          ),
    doneCount: done,
    segs: PRAYERS.map((p) => ({
      cls:
        "seg" +
        (records.some((r) => r.date === today && r.prayer === p) ? " on" : ""),
    })),
    prayers: PRAYERS.map((p, i) => {
      const complete = records.some((r) => r.date === today && r.prayer === p),
        later = times[p] > now,
        active = currentIndex === i && !complete;
      return {
        name: NAMES[i],
        ar: ARABIC[i],
        icon: "#ico" + NAMES[i],
        time: timeLabel(times[p], settings.timezone),
        cls:
          "prow" +
          (complete ? " done" : "") +
          (active ? " now" : "") +
          (later ? " later" : "") +
          (just === p ? " just" : ""),
        done: complete,
        open: !complete && !later,
        later,
        disabled: pending || later,
        pressed: complete,
        status: complete
          ? "Prayed"
          : active
            ? "Tap once you’ve prayed"
            : later
              ? "Upcoming"
              : "Not logged — tap to add",
        statusColor: complete ? "#F5B942" : active ? "#FFD27A" : "#A7ADCF",
        label:
          NAMES[i] +
          (complete
            ? ", recorded, tap to undo"
            : later
              ? ", upcoming"
              : ", mark as prayed"),
        delay: 0.18 + i * 0.07 + "s",
        onTap: () => toggle(p),
      };
    }),
    sheetOpen: sheet === "location",
    openSheet: () => open("location"),
    closeSheet: () => setSheet(null),
    settings: () => open("settings"),
    useGps: () => {
      if (!navigator.geolocation) {
        notify("Location unavailable. Choose a city below.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          run(async () => {
            await app.saveSettings({
              ...settings,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              city: "Current location",
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            setSheet(null);
            notify("Prayer times updated.");
          }),
        () => notify("Location unavailable. Choose a city below."),
      );
    },
    cities: CITIES.map((c) => {
      const t = prayerTimes({ ...settings, ...c }, today);
      return {
        name: c.city,
        fajr: timeLabel(t.fajr, c.timezone),
        maghrib: timeLabel(t.maghrib, c.timezone),
        sel: settings.city === c.city,
        pick: () =>
          run(async () => {
            await app.saveSettings({
              ...settings,
              ...c,
              name: settings.name,
              reminders: settings.reminders,
              nudges: settings.nudges,
            });
            setSheet(null);
            notify("Prayer times set for " + c.city);
          }),
      };
    }),
    circleName: circle?.name || "Start your circle",
    circleSummary: circle
      ? circle.members.filter((m) =>
          m.records.some(
            (r) =>
              r.date === (m.localDate || today) && r.prayer === activePrayer,
          ),
        ).length +
        " of " +
        circle.members.length +
        " prayed " +
        currentName
      : "A little encouragement, together",
    avatars: (circle?.members.slice(0, 4) || [])
      .map((m, i) => ({
        initials: m.name.slice(0, m.name === settings.name ? 1 : 2),
        bg: avatarColors[i][0],
        fg: avatarColors[i][1],
        z: 4 - i,
        margin: i ? -8 : 0,
        cls:
          "av" +
          (m.records.some((r) => r.date === today && r.prayer === activePrayer)
            ? " on"
            : "") +
          (m.id === userId && just === activePrayer ? " pop" : ""),
      }))
      .concat(
        circle && circle.members.length > 4
          ? [
              {
                initials: "+" + (circle.members.length - 4),
                bg: "#262B5C",
                fg: "#F6F2E9",
                z: 0,
                margin: -8,
                cls: "av",
              },
            ]
          : [],
      ),
    circleSubtitle: circle
      ? circle.members.length + " members · " + currentName + " time now"
      : "Create a circle or join with an invite",
    manageCircles: () => open("circles"),
    invite: () => (circle ? invite() : open("create")),
    keptToday:
      circle?.members.reduce(
        (sum, m) => sum + countDay(m.records, m.localDate || today),
        0,
      ) || 0,
    dueToday: (circle?.members.length || 0) * Math.max(0, currentIndex + 1),
    openText: circle
      ? circle.members.filter(
          (m) =>
            !m.records.some(
              (r) =>
                r.date === (m.localDate || today) && r.prayer === activePrayer,
            ),
        ).length +
        " of you still have " +
        currentName +
        " open"
      : "Bring your family or friends together",
    pills: PRAYERS.map((p, i) => ({
      icon: "#ico" + NAMES[i],
      val:
        i > currentIndex
          ? timeLabel(times[p], settings.timezone).replace(/ [AP]M/, "")
          : (circle?.members.filter((m) =>
              m.records.some(
                (r) => r.date === (m.localDate || today) && r.prayer === p,
              ),
            ).length || 0) +
            "/" +
            (circle?.members.length || 0),
      color: i > currentIndex ? "#A7ADCF" : "#F5B942",
    })),
    members: (circle?.members || []).map((m, i) => {
      const day = m.localDate || today,
        recorded = m.records.some(
          (r) => r.date === day && r.prayer === activePrayer,
        );
      return {
        name: m.name,
        init: m.name.slice(0, m.id === userId ? 1 : 2),
        bg: avatarColors[i % 6][0],
        fg: avatarColors[i % 6][1],
        isYou: m.id === userId,
        streak: streak(m.records, day),
        delay: 0.16 + i * 0.05 + "s",
        dots: PRAYERS.map((p, j) => ({
          cls:
            "dot " +
            (m.records.some((r) => r.date === day && r.prayer === p)
              ? "d"
              : j > currentIndex
                ? "u"
                : "p"),
        })),
        dotsLabel: PRAYERS.map(
          (p, j) =>
            NAMES[j] +
            (m.records.some((r) => r.date === day && r.prayer === p)
              ? " prayed"
              : " not logged"),
        ).join(", "),
        canNudge: m.id !== userId && m.nudges && !recorded && currentIndex >= 0,
        prayedNow: recorded,
        nudged: !!nudged[m.id + day + activePrayer],
        nudgeCls: "nudge" + (nudged[m.id + day + activePrayer] ? " sent" : ""),
        nudgeText: nudged[m.id + day + activePrayer] ? "Nudged" : "Nudge",
        nudgeLabel: "Send " + m.name + " a gentle reminder for " + currentName,
        onNudge: () =>
          run(async () => {
            await app.nudge(m.id, activePrayer);
            setNudged((v) => ({ ...v, [m.id + day + activePrayer]: true }));
            notify("Gentle reminder queued for " + m.name);
          }),
        inspect: () => {
          setMemberId(m.id);
          setMemberDay(day);
          setSheet("member");
        },
      };
    }),
    week: Array.from({ length: 7 }, (_, i) => {
      const day = shiftDate(today, i - 6);
      return {
        l: new Date(day + "T12:00:00").toLocaleDateString("en-US", {
          weekday: "narrow",
        }),
        delay: 0.55 + i * 0.05 + "s",
        color: i === 6 ? "#F5B942" : "#A7ADCF",
        segs: PRAYERS.map((p) => {
          const amount =
            circle?.members.filter((m) =>
              m.records.some((r) => r.date === day && r.prayer === p),
            ).length || 0;
          return (
            "bseg" +
            (amount
              ? " l" +
                Math.max(
                  1,
                  Math.round((amount / (circle?.members.length || 1)) * 4),
                )
              : "")
          );
        }),
      };
    }),
    yearLine:
      new Set(records.map((r) => r.date)).size +
      " days logged · " +
      records.length.toLocaleString() +
      " prayers",
    monthName: monthLabel,
    monthNote:
      selectedMonth === today.slice(0, 7)
        ? "This month · so far"
        : "Tap any bar for that day",
    prev: () => changeMonth(-1),
    next: () => changeMonth(1),
    atStart: selectedMonth <= firstYearKey,
    atEnd: selectedMonth >= today.slice(0, 7),
    kept: monthRecords.length,
    due:
      closedDays.length * 5 +
      (selectedMonth === today.slice(0, 7) ? Math.max(0, currentIndex + 1) : 0),
    full: fullDays,
    best: bestStreak(monthRecords),
    avg: closedDays.length
      ? (
          closedDays.reduce((n, d) => n + countDay(records, d), 0) /
          closedDays.length
        ).toFixed(1)
      : "0",
    bars: Array.from({ length: daysInMonth }, (_, i) => {
      const day = selectedMonth + "-" + String(i + 1).padStart(2, "0"),
        n = countDay(records, day);
      return {
        cls: "bar" + (pickedDay === day ? " sel" : ""),
        future: day > today,
        sel: pickedDay === day,
        lv: day > today ? "lf" : day === today ? "lt" : "l" + n,
        h: Math.max(4, Math.round((n / 5) * 112)),
        lab: i === 0 || (i + 1) % 7 === 1 ? String(i + 1) : "",
        label: day + ": " + n + " of 5 prayers",
        pick: () => setSelectedDay(day),
      };
    }),
    dayTitle: new Date(pickedDay + "T12:00:00").toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }),
    daySub:
      countDay(records, pickedDay) === 5
        ? "All five prayed"
        : countDay(records, pickedDay) + " of 5 prayed",
    dayColor:
      pickedDay === today
        ? "#7CF2C6"
        : countDay(records, pickedDay) === 5
          ? "#F5B942"
          : "#A7ADCF",
    dayIcons: PRAYERS.map((p, i) => ({
      icon: "#ico" + NAMES[i],
      cls:
        "pi " +
        (records.some((r) => r.date === pickedDay && r.prayer === p)
          ? "on"
          : "off"),
      label:
        NAMES[i] +
        (records.some((r) => r.date === pickedDay && r.prayer === p)
          ? " prayed"
          : " not logged"),
      onKeyDown: (e: { key: string; preventDefault: () => void }) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (pickedDay <= today && (pickedDay !== today || times[p] <= now))
            toggle(p, pickedDay);
        }
      },
      toggle: () => {
        if (pickedDay <= today && (pickedDay !== today || times[p] <= now))
          toggle(p, pickedDay);
      },
    })),
    year: Array.from({ length: 12 }, (_, i) => {
      const d = new Date(
          Number(today.slice(0, 4)),
          Number(today.slice(5, 7)) - 12 + i,
          1,
        ),
        key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0"),
        length = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      return {
        s: d.toLocaleDateString("en-US", { month: "short" }),
        sel: key === selectedMonth,
        cls: "yrow" + (key === selectedMonth ? " sel" : ""),
        label: d.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        pick: () => {
          setMonth(key);
          setSelectedDay("");
        },
        cells: Array.from({ length: 31 }, (_, j) => {
          const day = key + "-" + String(j + 1).padStart(2, "0");
          return (
            "cell " +
            (j >= length
              ? "ln"
              : day > today
                ? "lf"
                : day === today
                  ? "lt"
                  : "l" + countDay(records, day))
          );
        }),
      };
    }),
    badges: allBadges.slice(0, 9).map((b, i) => ({
      name: b.name,
      med: "#" + b.med,
      glyph: "#" + b.glyph,
      cls:
        "bdg" +
        (b.have >= b.need ? "" : " locked") +
        (badgeId === b.id ? " sel" : ""),
      selected: badgeId === b.id,
      label:
        b.name +
        ", " +
        (b.have >= b.need ? "earned" : b.have + " of " + b.need + " " + b.unit),
      sub: b.have >= b.need ? "Earned" : b.have + "/" + b.need,
      subColor: b.have >= b.need ? "#F5B942" : "#A7ADCF",
      delay: 0.16 + i * 0.05 + "s",
      pick: () => {
        setBadgeId(b.id);
        setBadgeFlip((n) => n + 1);
      },
    })),
    sel: {
      ...selectedBadge,
      med: "#" + selectedBadge.med,
      glyph: "#" + selectedBadge.glyph,
      pct: milestonePct,
      have: Math.min(selectedBadge.have, selectedBadge.need),
      tag: isEarned
        ? "UNLOCKED"
        : milestoneLeft === 1 && selectedBadge.unit === "days"
          ? "1 DAY TO GO — TOMORROW!"
          : "NEXT UP · " +
            milestoneLeft +
            " " +
            selectedBadge.unit.toUpperCase() +
            " TO GO",
      tagBg: isEarned ? "rgba(245,185,66,0.2)" : "rgba(124,242,198,0.16)",
      tagFg: isEarned ? "#F5B942" : "#7CF2C6",
    },
    ringOff: (314.16 * (1 - milestonePct / 100)).toFixed(1),
    celeCls: badgeFlip === 0 ? "" : badgeFlip % 2 ? "cele" : "cele2",
    earnedCount: allBadges.slice(0, 9).filter((b) => b.have >= b.need).length,
    totalCount: 9,
    share: () =>
      run(async () => {
        const text = `My Saff journey: ${selectedBadge.name} — ${Math.min(selectedBadge.have, selectedBadge.need)} of ${selectedBadge.need} ${selectedBadge.unit}.`;
        if (navigator.share)
          await navigator.share({
            title: "Saff · " + selectedBadge.name,
            text,
          });
        else {
          await navigator.clipboard.writeText(text);
          notify("Milestone copied. Share your little moment.");
        }
      }),
    goalMonth: now.toLocaleDateString("en-US", {
      month: "long",
      timeZone: settings.timezone,
    }),
    goalTotal: circleMonthTotal,
    goalTarget: circle?.goal || 0,
    goalPct: circle ? Math.min(100, (circleMonthTotal / circle.goal) * 100) : 0,
    goalCaption: circle
      ? circle.name +
        " · " +
        Math.max(0, circle.goal - circleMonthTotal) +
        " prayers together to go"
      : "Start a circle to grow together",
  };
  if (!ready)
    return (
      <div className="loading">
        <Art id="icoMark" size={80} />
        <h1>
          Saff<span className="arabic"> صفّ</span>
        </h1>
        <LoaderCircle className="spin" />
        <p>Making room in your day.</p>
      </div>
    );
  if (welcome && userId)
    return (
      <div className="loading">
        <Art id="icoMark" size={80} />
        <h1>
          {app.error ? "Unable to load your account" : "Opening your account"}
        </h1>
        {app.error ? (
          <>
            <p role="alert">{app.error}</p>
            <button
              className="primary"
              disabled={pending}
              onClick={() => run(app.retry)}
            >
              Try again
            </button>
            <button className="secondary" onClick={() => run(app.signOut)}>
              Sign out
            </button>
          </>
        ) : (
          <LoaderCircle className="spin" />
        )}
      </div>
    );
  return (
    <div className="app-shell">
      {!welcome && (
        <aside className="sidebar">
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("today");
            }}
          >
            <Art id="icoMark" size={49} />
            <span>
              Saff<span className="arabic"> صفّ</span>
              <small>SALAH CIRCLES</small>
            </span>
          </a>
          <div className="sidebar-caption">A LITTLE EVERY DAY</div>
          <nav aria-label="Main navigation">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(t.id)}
                className={tab === t.id ? "active" : ""}
                aria-current={tab === t.id ? "page" : undefined}
              >
                <t.icon size={21} />
                {t.label}
                {tab === t.id && <span className="nav-dot" />}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="side-note">
              <Art id="icoIsha" size={50} />
              <p>
                Small steps.
                <br />A steadier heart.
              </p>
              <small>Your journey, one prayer at a time.</small>
            </div>
            <button className="profile" onClick={() => open("settings")}>
              <span className="avatar gold">{settings.name.slice(0, 1)}</span>
              <span>
                <strong>{settings.name}</strong>
                <small>Your personal space</small>
              </span>
              <SettingsIcon size={18} />
            </button>
          </div>
        </aside>
      )}
      <main
        className={
          welcome
            ? "welcome-main reference-main-welcome"
            : "main-content reference-main"
        }
      >
        {!welcome && (
          <div className="desktop-top">
            <span>YOUR SPACE TO GROW</span>
            <div>
              <span className="live-dot" />
              Your salah, in sync
              <button
                className="icon-button"
                onClick={() => open("settings")}
                aria-label="Open settings"
              >
                <SettingsIcon size={18} />
              </button>
            </div>
          </div>
        )}
        {welcome ? (
          <WelcomeReference v={referenceValues} />
        ) : tab === "today" ? (
          <TodayReference v={referenceValues} />
        ) : tab === "circles" ? (
          <CircleReference v={referenceValues} />
        ) : tab === "insights" ? (
          <InsightsReference v={referenceValues} />
        ) : (
          <MilestonesReference v={referenceValues} />
        )}
        {welcome && (
          <button className="reference-solo" onClick={() => open("auth")}>
            Continue individually <ArrowRight size={14} />
          </button>
        )}
      </main>
      <AnimatePresence>
        {toast && (sheet || tab === "insights" || welcome) && (
          <motion.div
            className="toast"
            role="status"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
          >
            <Art id="icoCoin" size={29} />
            <span>{toast}</span>
            <button onClick={() => setToast("")} aria-label="Dismiss">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sheet && sheet !== "location" && (
          <Sheet
            title={
              {
                location: "Prayer times for",
                settings: "Your space",
                create: "Start a circle",
                join: "Join your people",
                invite: "Invite to your circle",
                goal: "A shared intention",
                auth: "Welcome to Saff",
                member: (viewedMember?.name || "Member") + "’s journey",
                circles: "Your circles",
              }[sheet]
            }
            close={() => setSheet(null)}
          >
            {sheet === "circles" && (
              <>
                <div className="circle-tabs">
                  {circles.map((c) => (
                    <button
                      key={c.id}
                      className={circle?.id === c.id ? "selected" : ""}
                      onClick={() => {
                        setCircleId(c.id);
                        setSheet(null);
                      }}
                    >
                      <Users size={15} />
                      {c.name}
                    </button>
                  ))}
                </div>
                <button className="primary full" onClick={() => open("create")}>
                  <Plus size={17} />
                  Create circle
                </button>
                <button className="secondary full" onClick={() => open("join")}>
                  Join a circle
                </button>
                {circle?.owner === userId && (
                  <button
                    className="text-button full"
                    onClick={() => open("goal")}
                  >
                    Edit monthly circle goal
                  </button>
                )}
                {circle && (
                  <button
                    className="text-button danger full"
                    onClick={() =>
                      run(async () => {
                        await app.leaveCircle(circle.id);
                        setSheet(null);
                        notify("You left the circle.");
                      })
                    }
                  >
                    <LogOut size={16} />
                    Leave {circle.name}
                  </button>
                )}
              </>
            )}
            {sheet === "member" && viewedMember && (
              <>
                <p className="muted">
                  Shared with your circle ·{" "}
                  {viewedMember.records.length.toLocaleString()} prayers
                  recorded
                </p>
                <label>
                  Explore a day
                  <input
                    type="date"
                    max={viewedMember.localDate || today}
                    value={viewedDate}
                    onChange={(e) => setMemberDay(e.target.value)}
                  />
                </label>
                <div className="shared-prayers">
                  {PRAYERS.map((p, i) => (
                    <div key={p}>
                      <Art id={"ico" + NAMES[i]} size={35} />
                      <strong>{NAMES[i]}</strong>
                      <span>
                        {viewedMember.records.some(
                          (r) => r.date === viewedDate && r.prayer === p,
                        )
                          ? "Prayed"
                          : "Not recorded"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="section-title">
                  <h3>Achievements</h3>
                </div>
                <div className="badges-grid">
                  {badges(
                    viewedMember.records,
                    viewedMember.localDate || today,
                    circles,
                  ).map((b) => (
                    <div
                      key={b.id}
                      className={
                        "badge-card " + (b.have >= b.need ? "earned" : "locked")
                      }
                    >
                      <Medal med={b.med} glyph={b.glyph} size={54} />
                      <strong>{b.name}</strong>
                      <small>
                        {b.have >= b.need ? "Earned" : `${b.have} / ${b.need}`}
                      </small>
                    </div>
                  ))}
                </div>
              </>
            )}
            {sheet === "settings" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    await app.saveSettings(draft);
                    setSheet(null);
                    notify("Your preferences are saved.");
                  });
                }}
              >
                <label>
                  Your name
                  <input
                    required
                    maxLength={50}
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </label>
                <div className="form-grid">
                  <label>
                    Calculation method
                    <select
                      value={draft.method}
                      onChange={(e) =>
                        setDraft({ ...draft, method: e.target.value })
                      }
                    >
                      {[
                        "Karachi",
                        "MuslimWorldLeague",
                        "Egyptian",
                        "UmmAlQura",
                        "Dubai",
                        "MoonsightingCommittee",
                        "NorthAmerica",
                        "Singapore",
                        "Tehran",
                        "Turkey",
                      ].map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Asr preference
                    <select
                      value={draft.hanafi ? "hanafi" : "standard"}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hanafi: e.target.value === "hanafi",
                        })
                      }
                    >
                      <option value="hanafi">Hanafi</option>
                      <option value="standard">Standard</option>
                    </select>
                  </label>
                </div>
                <label>
                  City or location name
                  <input
                    required
                    maxLength={80}
                    value={draft.city}
                    onChange={(e) =>
                      setDraft({ ...draft, city: e.target.value })
                    }
                  />
                </label>
                <div className="form-grid">
                  <label>
                    Latitude
                    <input
                      type="number"
                      step="any"
                      min={-90}
                      max={90}
                      required
                      value={draft.latitude}
                      onChange={(e) =>
                        setDraft({ ...draft, latitude: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    Longitude
                    <input
                      type="number"
                      step="any"
                      min={-180}
                      max={180}
                      required
                      value={draft.longitude}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          longitude: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  Timezone
                  <input
                    required
                    value={draft.timezone}
                    onChange={(e) =>
                      setDraft({ ...draft, timezone: e.target.value })
                    }
                  />
                </label>
                <label className="toggle-label">
                  <span>
                    <strong>Prayer reminders</strong>
                    <small>Turn off to privately pause reminders.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={draft.reminders}
                    onChange={(e) =>
                      setDraft({ ...draft, reminders: e.target.checked })
                    }
                  />
                </label>
                {draft.reminders && (
                  <>
                    <label>
                      Remind me
                      <select
                        value={draft.offset}
                        onChange={(e) =>
                          setDraft({ ...draft, offset: Number(e.target.value) })
                        }
                      >
                        <option value={0}>At prayer time</option>
                        <option value={5}>5 minutes after</option>
                        <option value={15}>15 minutes after</option>
                        <option value={30}>30 minutes after</option>
                      </select>
                    </label>
                    <div className="reminder-prayers">
                      {PRAYERS.map((p, i) => (
                        <label key={p}>
                          <input
                            type="checkbox"
                            checked={draft.reminderPrayers.includes(p)}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                reminderPrayers: e.target.checked
                                  ? [...draft.reminderPrayers, p]
                                  : draft.reminderPrayers.filter(
                                      (x) => x !== p,
                                    ),
                              })
                            }
                          />
                          {NAMES[i]}
                        </label>
                      ))}
                    </div>
                  </>
                )}
                <label className="toggle-label">
                  <span>
                    <strong>Gentle nudges from circles</strong>
                    <small>At most one per prayer, across your circles.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={draft.nudges}
                    onChange={(e) =>
                      setDraft({ ...draft, nudges: e.target.checked })
                    }
                  />
                </label>
                {devicePush === "on" ? (
                  <button
                    type="button"
                    className="secondary full"
                    onClick={() =>
                      run(async () => {
                        await disablePush(supabase!);
                        setDevicePush("off");
                        notify("This device will no longer receive reminders.");
                      })
                    }
                  >
                    <BellOff size={16} />
                    Turn off notifications on this device
                  </button>
                ) : devicePush === "blocked" ? (
                  <p className="fine-print">
                    Notifications are blocked for Saff in this browser. Allow
                    them in your browser’s site settings to get reminders here.
                  </p>
                ) : (
                  <button
                    type="button"
                    className="secondary full"
                    onClick={() =>
                      run(async () => {
                        if (!userId || !supabase)
                          throw new Error("Please sign in to continue.");
                        await enablePush(supabase);
                        setDevicePush("on");
                        notify("This device is ready for reminders.");
                      })
                    }
                  >
                    <Bell size={16} />
                    Enable notifications on this device
                  </button>
                )}
                <button className="primary full" disabled={pending}>
                  Save preferences{" "}
                  {pending ? (
                    <LoaderCircle className="spin" size={16} />
                  ) : (
                    <Check size={16} />
                  )}
                </button>
                {supabase && (
                  <button
                    type="button"
                    className="text-button danger"
                    onClick={() =>
                      run(async () => {
                        await app.signOut();
                        setSheet(null);
                      })
                    }
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                )}
              </form>
            )}
            {(sheet === "create" || sheet === "join") && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    if (sheet === "create") {
                      const id = await app.createCircle(formValue.trim());
                      setCircleId(id);
                    } else await app.joinCircle(formValue);
                    setSheet(null);
                    navigate("circles");
                    notify(
                      sheet === "create"
                        ? "Your circle is ready. Make room for your people."
                        : "Welcome to your circle.",
                    );
                  });
                }}
              >
                <p className="muted">
                  {sheet === "create"
                    ? "A little place to grow together with family or friends."
                    : "Enter the invite code shared by someone in your circle."}
                </p>
                <label>
                  {sheet === "create" ? "Circle name" : "Invite code"}
                  <input
                    autoFocus
                    required
                    minLength={sheet === "create" ? 2 : 6}
                    maxLength={sheet === "create" ? 60 : 12}
                    placeholder={
                      sheet === "create"
                        ? "e.g. The Rahman Family"
                        : "e.g. SAFF26"
                    }
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                  />
                </label>
                <div className="privacy-note">
                  <Users size={20} />
                  <p>
                    By {sheet === "create" ? "creating" : "joining"} a circle,
                    your existing prayer history, progress, and achievements
                    become visible to all its members.
                  </p>
                </div>
                <button className="primary full" disabled={pending}>
                  {sheet === "create" ? "Create circle" : "Join circle"}
                  <ArrowRight size={17} />
                </button>
              </form>
            )}
            {sheet === "invite" && (
              <>
                <p className="muted">
                  Invite someone to {circle?.name}. Everyone in the circle can
                  see each other’s prayer progress.
                </p>
                <div className="invite-code">
                  {circle?.code || "Ask the circle owner for an invite code"}
                </div>
                {circle?.code && (
                  <button
                    className="primary full"
                    onClick={() =>
                      run(async () => {
                        await navigator.clipboard.writeText(circle.code!);
                        notify("Invite code copied.");
                      })
                    }
                  >
                    <Copy size={17} />
                    Copy invite code
                  </button>
                )}
              </>
            )}
            {sheet === "goal" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    await app.setGoal(circle!.id, Number(formValue));
                    setSheet(null);
                    notify("Circle goal updated.");
                  });
                }}
              >
                <p className="muted">
                  Choose the total prayers your circle hopes to record this
                  month.
                </p>
                <label>
                  Monthly prayer goal
                  <input
                    type="number"
                    required
                    min={1}
                    max={100000}
                    placeholder={String(circle?.goal)}
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                  />
                </label>
                <button className="primary full" disabled={pending}>
                  Save goal <Check size={17} />
                </button>
              </form>
            )}
            {sheet === "auth" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(async () => {
                    if (!supabase)
                      throw new Error(
                        "Sign-in is not available until Supabase is configured.",
                      );
                    const { error } = await supabase.auth.signInWithOtp({
                      email,
                      options: { emailRedirectTo: window.location.origin },
                    });
                    if (error) throw error;
                    notify("Check your email for a sign-in link.");
                  });
                }}
              >
                <p className="muted">
                  One account for your prayers, your circles, and wherever life
                  takes you.
                </p>
                <label>
                  Email address
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                {!supabase && (
                  <p role="alert" className="muted">
                    Sign-in is not available yet. Connect Supabase using the
                    setup instructions in README.md, then restart the app.
                  </p>
                )}
                <button
                  className="primary full"
                  disabled={pending || !supabase}
                >
                  <Mail size={17} />
                  Send sign-in link
                </button>
                <p className="fine-print">
                  We’ll email you a secure link. No password to remember.
                </p>
              </form>
            )}
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}
