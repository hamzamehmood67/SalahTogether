"use client";
import { MoreHorizontal, Plus, Users } from "lucide-react";

export interface CircleCard {
  id: string;
  name: string;
  admin: boolean;
  members: number;
  kept: number;
  due: number;
}

// The Circles tab: every circle the person belongs to, plus create and join.
// It reuses the reference screens' frame classes so the tab bar, safe areas and
// desktop layout behave like the designed screens.
export default function CirclesPage({
  circles,
  openCircle,
  openSettings,
  create,
  join,
  goToday,
  goInsights,
  goMilestones,
}: {
  circles: CircleCard[];
  openCircle: (id: string) => void;
  openSettings: (id: string) => void;
  create: () => void;
  join: () => void;
  goToday: () => void;
  goInsights: () => void;
  goMilestones: () => void;
}) {
  return (
    <div className="reference-screen circles-page">
      <div className="circles-glow" aria-hidden="true" />
      <div className="reference-content circles-content">
        <header className="circles-header">
          <h1>Your circles</h1>
          <p>
            {circles.length
              ? circles.length +
                (circles.length === 1 ? " circle" : " circles") +
                " · praying side by side"
              : "Pray side by side with the people you love"}
          </p>
        </header>
        {circles.length ? (
          <ul className="circles-list">
            {circles.map((c) => (
              <li key={c.id} className="circle-card">
                <button
                  className="circle-card-main"
                  onClick={() => openCircle(c.id)}
                >
                  <span className="circle-card-icon">
                    <Users size={20} />
                  </span>
                  <span className="circle-card-text">
                    <strong>{c.name}</strong>
                    <small>
                      {c.admin ? "Admin" : "Member"} · {c.members}{" "}
                      {c.members === 1 ? "member" : "members"}
                    </small>
                    <span className="circle-card-progress">
                      {c.due
                        ? `${c.kept} of ${c.due} prayers kept today`
                        : "No prayers due yet today"}
                    </span>
                    <span className="circle-card-bar" aria-hidden="true">
                      <span
                        style={{
                          width:
                            (c.due
                              ? Math.min(100, (c.kept / c.due) * 100)
                              : 0) + "%",
                        }}
                      />
                    </span>
                  </span>
                </button>
                <button
                  className="circle-card-more"
                  aria-label={"Settings for " + c.name}
                  onClick={() => openSettings(c.id)}
                >
                  <MoreHorizontal size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="circles-empty">
            <span className="circle-card-icon">
              <Users size={22} />
            </span>
            <strong>No circles yet</strong>
            <p>
              Start one for your family or friends, or join with an invite code.
            </p>
          </div>
        )}
        <div className="circles-actions">
          <button className="primary full" onClick={create}>
            <Plus size={18} />
            Create a circle
          </button>
          <button className="secondary full" onClick={join}>
            Join with a code
          </button>
        </div>
      </div>
      {/* Same tabs, icons and classes as the reference screens' tab bar. */}
      <nav aria-label="Mobile navigation" className="reference-nav circles-nav">
        <button className="tab" onClick={goToday}>
          <svg {...ICON}>
            <path d="M3 18h18" />
            <path d="M6 18a6 6 0 0 1 12 0" />
            <path d="M12 4v3" />
            <path d="M4.9 8.9l2.1 2.1" />
            <path d="M19.1 8.9l-2.1 2.1" />
          </svg>
          Today
        </button>
        <button className="tab on" aria-current="page">
          <svg {...ICON}>
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 19v-.5A5 5 0 0 1 7.5 13.5h3a5 5 0 0 1 5 5v.5" />
            <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
            <path d="M21.5 19v-.5a5 5 0 0 0-3.5-4.8" />
          </svg>
          Circles
        </button>
        <button className="tab" onClick={goInsights}>
          <svg {...ICON}>
            <path d="M5 20V11" />
            <path d="M12 20V5" />
            <path d="M19 20v-6" />
          </svg>
          Insights
        </button>
        <button className="tab" onClick={goMilestones}>
          <svg {...ICON}>
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7" />
          </svg>
          Milestones
        </button>
      </nav>
    </div>
  );
}
const ICON = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;
