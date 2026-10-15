import type { Page } from "@playwright/test";
import {
  DEFAULT_SETTINGS,
  PRAYERS,
  shiftDate,
  type Circle,
  type RecordItem,
} from "../../src/lib/domain";

export const AUTH_KEY = "sb-saff-test-auth-token";
const id = "11111111-1111-4111-8111-111111111111";
// Browser-only network fixtures. Nothing here is imported by the app.
export async function mockSupabase(
  page: Page,
  options: {
    signedIn?: boolean;
    populated?: boolean;
    failDashboard?: boolean;
  } = {},
) {
  const populated = options.populated ?? true;
  const records: RecordItem[] = populated
    ? Array.from({ length: 8 }, (_, day) =>
        (day ? PRAYERS : PRAYERS.slice(0, 2)).map((prayer) => ({
          date: shiftDate("2026-09-29", -day),
          prayer,
        })),
      ).flat()
    : [];
  const state = {
    settings: {
      ...DEFAULT_SETTINGS,
      name: populated ? "Yusuf" : "Friend",
      onboarded: populated,
    },
    records,
    circles: (populated
      ? [
          {
            id: "family",
            name: "The Rahman Family",
            code: "SAFF26",
            owner: id,
            goal: 750,
            membersCanInvite: false,
            members: [
              { id, name: "Yusuf", records, nudges: false },
              {
                id: "member1",
                name: "Ammi",
                records: [...records],
                nudges: true,
              },
            ],
          },
        ]
      : []) as Circle[],
    failDashboard: options.failDashboard ?? false,
    otpRequests: 0,
    deleted: false,
  };
  if (options.signedIn !== false) {
    await page.addInitScript(
      ({ key, id }) => {
        if (sessionStorage.getItem("test-auth-initialized")) return;
        sessionStorage.setItem("test-auth-initialized", "1");
        const encode = (value: object) =>
          btoa(JSON.stringify(value))
            .replaceAll("=", "")
            .replaceAll("+", "-")
            .replaceAll("/", "_");
        const access_token =
          encode({ alg: "HS256", typ: "JWT" }) +
          "." +
          encode({ sub: id, exp: 2147483647, role: "authenticated" }) +
          ".test-signature";
        localStorage.setItem(
          key,
          JSON.stringify({
            access_token,
            refresh_token: "test-refresh",
            token_type: "bearer",
            expires_at: 2147483647,
            user: {
              id,
              email: "test@example.com",
              aud: "authenticated",
              role: "authenticated",
            },
          }),
        );
      },
      { key: AUTH_KEY, id },
    );
  }
  await page.route("https://saff-test.supabase.co/**", async (route) => {
    const url = new URL(route.request().url());
    const method = url.pathname.split("/").pop();
    const payload = route.request().postDataJSON() || {};
    let result: unknown = null;
    if (url.pathname.includes("/auth/v1/")) {
      if (method === "otp") state.otpRequests++;
      if (method === "verify") {
        if (payload.token !== "123456") {
          await route.fulfill({
            status: 403,
            json: {
              code: 403,
              error_code: "otp_expired",
              msg: "Token has expired or is invalid",
            },
          });
          return;
        }
        const encode = (value: object) =>
          Buffer.from(JSON.stringify(value)).toString("base64url");
        await route.fulfill({
          json: {
            access_token:
              encode({ alg: "HS256", typ: "JWT" }) +
              "." +
              encode({ sub: id, exp: 2147483647, role: "authenticated" }) +
              ".test-signature",
            token_type: "bearer",
            expires_in: 3600,
            expires_at: 2147483647,
            refresh_token: "test-refresh",
            user: {
              id,
              email: payload.email,
              aud: "authenticated",
              role: "authenticated",
            },
          },
        });
        return;
      }
      await route.fulfill({
        status: method === "logout" ? 204 : 200,
        contentType: "application/json",
        body: method === "logout" ? "" : "{}",
      });
      return;
    }
    if (method === "get_dashboard") {
      if (state.failDashboard) {
        await route.fulfill({
          status: 500,
          json: { message: "Database setup is incomplete" },
        });
        return;
      }
      // Like the real RPC, members get the code only while member invites are on.
      result = {
        settings: state.settings,
        records: state.records,
        circles: state.circles.map((c) => ({
          ...c,
          code: c.owner === id || c.membersCanInvite ? c.code : null,
        })),
      };
    } else if (method === "set_prayer") {
      state.records = state.records.filter(
        (r) => r.date !== payload.p_date || r.prayer !== payload.p_prayer,
      );
      if (payload.p_done)
        state.records.push({ date: payload.p_date, prayer: payload.p_prayer });
      state.circles.forEach((c) =>
        c.members.forEach((m) => {
          if (m.id === id) m.records = state.records;
        }),
      );
    } else if (method === "save_settings") {
      state.settings = payload.p_settings;
    } else if (method === "create_circle") {
      result = "new-circle";
      state.circles.push({
        id: "new-circle",
        name: payload.p_name,
        owner: id,
        goal: 750,
        code: "NEWCODE1",
        membersCanInvite: false,
        members: [{ id, name: state.settings.name, records: state.records }],
      });
    } else if (method === "join_circle") {
      if (payload.p_code !== "FRIENDS1") {
        await route.fulfill({
          status: 400,
          json: { message: "That invite code was not found" },
        });
        return;
      }
      state.circles.push({
        id: "friends",
        name: "Friends of the Masjid",
        owner: "member2",
        goal: 750,
        code: "FRIENDS1",
        membersCanInvite: false,
        members: [
          { id: "member2", name: "Bilal", records: [], nudges: false },
          { id, name: state.settings.name, records: state.records },
        ],
      });
    } else if (method === "delete_account") {
      state.deleted = true;
      state.records = [];
      state.circles = [];
    } else if (
      method === "set_circle_invites" ||
      method === "reset_circle_code"
    ) {
      const circle = state.circles.find((c) => c.id === payload.p_circle)!;
      if (circle.owner !== id) {
        await route.fulfill({
          status: 400,
          json: { message: "Only the circle admin can change who invites" },
        });
        return;
      }
      if (method === "reset_circle_code") {
        circle.code = "RESET001";
        result = circle.code;
      } else {
        if (circle.membersCanInvite && !payload.p_allowed)
          circle.code = "ROTATED1";
        circle.membersCanInvite = payload.p_allowed;
      }
    } else if (method === "set_circle_goal") {
      state.circles.find((c) => c.id === payload.p_circle)!.goal =
        payload.p_goal;
    } else {
      throw new Error("Unexpected Supabase request: " + url.pathname);
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(result),
    });
  });
  await page.routeWebSocket("wss://saff-test.supabase.co/**", () => {});
  return state;
}
