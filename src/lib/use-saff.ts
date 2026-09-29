"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "./supabase";
import {
  DEFAULT_SETTINGS,
  Settings,
  RecordItem,
  Circle,
  Prayer,
  dateKey,
} from "./domain";
export function useSaff() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS),
    [records, setRecords] = useState<RecordItem[]>([]),
    [circles, setCircles] = useState<Circle[]>([]),
    [ready, setReady] = useState(false),
    [userId, setUserId] = useState<string | null>(null),
    [error, setError] = useState(""),
    [welcome, setWelcome] = useState(true);
  const identity = useRef<string | null>(null);
  const load = useCallback(async (id: string) => {
    if (!supabase) throw new Error("Supabase has not been configured.");
    const { data, error } = await supabase.rpc("get_dashboard");
    if (identity.current !== id) return;
    if (error) throw error;
    if (!data?.settings)
      throw new Error(
        "Your account could not be loaded. Check the database setup and try again.",
      );
    setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
    setRecords(data.records || []);
    setCircles(data.circles || []);
    setError("");
    setWelcome(false);
  }, []);
  useEffect(() => {
    let active = true;
    // Retire only the old sample workspace; never import it into real accounts.
    try {
      localStorage.removeItem("saff-v1");
      Object.keys(localStorage)
        .filter((key) => key.startsWith("saff-nudge-"))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      /* Storage may be disabled; authentication will report its own errors. */
    }
    if (!supabase) {
      setReady(true);
      return;
    }
    const initialize = async (id: string | null) => {
      if (!active) return;
      if (identity.current !== id) {
        setSettings(DEFAULT_SETTINGS);
        setRecords([]);
        setCircles([]);
        setWelcome(true);
      }
      identity.current = id;
      setUserId(id);
      setError("");
      try {
        if (id) await load(id);
      } catch (e) {
        if (active && identity.current === id) setError((e as Error).message);
      } finally {
        if (active) setReady(true);
      }
    };
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // RPCs must run outside the auth callback's lock.
        setTimeout(() => {
          void initialize(session?.user.id ?? null);
        }, 0);
      },
    );
    // Also surface session-storage/network initialization errors.
    supabase.auth
      .getSession()
      .then(({ error }) => {
        if (active && error) {
          setError(error.message);
          setReady(true);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setReady(true);
        }
      });
    return () => {
      active = false;
      identity.current = null;
      listener.subscription.unsubscribe();
    };
  }, [load]);
  useEffect(() => {
    if (!supabase || !userId || welcome) return;
    const refresh = () => load(userId).catch((e) => setError(e.message));
    const timer = setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);
    const channel = supabase
      .channel("records")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prayer_records" },
        refresh,
      )
      .subscribe();
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      supabase?.removeChannel(channel);
    };
  }, [userId, welcome, load]);
  function account() {
    if (!supabase || !userId) throw new Error("Please sign in to continue.");
    return { client: supabase, id: userId };
  }
  async function toggle(prayer: Prayer, date: string) {
    const { client, id } = account();
    const before = records;
    const exists = records.some((r) => r.prayer === prayer && r.date === date);
    const next = exists
      ? records.filter((r) => r.prayer !== prayer || r.date !== date)
      : [...records, { prayer, date }];
    setRecords(next);
    setCircles((cs) =>
      cs.map((c) => ({
        ...c,
        members: c.members.map((m) =>
          m.id === userId ? { ...m, records: next } : m,
        ),
      })),
    );
    try {
      {
        const { error } = await client.rpc("set_prayer", {
          p_date: date,
          p_prayer: prayer,
          p_done: !exists,
        });
        if (error) throw error;
        await load(id);
      }
      return !exists;
    } catch (e) {
      if (identity.current !== id) throw e;
      setRecords(before);
      setCircles((cs) =>
        cs.map((c) => ({
          ...c,
          members: c.members.map((m) =>
            m.id === userId ? { ...m, records: before } : m,
          ),
        })),
      );
      throw e;
    }
  }
  async function saveSettings(next: Settings) {
    const { client, id } = account();
    dateKey(new Date(), next.timezone);
    if (!next.name.trim()) throw new Error("Please enter your name.");
    {
      const { error } = await client.rpc("save_settings", {
        p_settings: next,
      });
      if (error) throw error;
    }
    if (identity.current !== id) return;
    setSettings(next);
    setCircles((cs) =>
      cs.map((c) => ({
        ...c,
        members: c.members.map((m) =>
          m.id === userId ? { ...m, name: next.name, nudges: next.nudges } : m,
        ),
      })),
    );
  }
  async function createCircle(name: string) {
    const { client, id } = account();
    const { data, error } = await client.rpc("create_circle", { p_name: name });
    if (error) throw error;
    await load(id);
    return data;
  }
  async function joinCircle(code: string) {
    const { client, id } = account();
    const { error } = await client.rpc("join_circle", {
      p_code: code.trim().toUpperCase(),
    });
    if (error) throw error;
    await load(id);
  }
  async function leaveCircle(circle: string) {
    const { client, id } = account();
    const { error } = await client.rpc("leave_circle", { p_circle: circle });
    if (error) throw error;
    await load(id);
  }
  async function nudge(member: string, prayer: Prayer) {
    const { client } = account();
    const { error } = await client.rpc("send_nudge", {
      p_recipient: member,
      p_prayer: prayer,
    });
    if (error) throw error;
  }
  async function setGoal(circle: string, goal: number) {
    const { client, id } = account();
    const { error } = await client.rpc("set_circle_goal", {
      p_circle: circle,
      p_goal: goal,
    });
    if (error) throw error;
    await load(id);
  }
  return {
    settings,
    records,
    circles,
    ready,
    userId,
    error,
    setError,
    welcome,
    retry: async () => {
      const { id } = account();
      await load(id);
    },
    toggle,
    saveSettings,
    createCircle,
    joinCircle,
    leaveCircle,
    nudge,
    setGoal,
  };
}
