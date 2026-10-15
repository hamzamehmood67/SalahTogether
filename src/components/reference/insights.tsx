"use client";
// Faithful React port of the supplied Saff insights screen.
import { Fragment, type CSSProperties } from "react";
import type { ReferenceValues } from "./types";
export default function InsightsReference({ v }: { v: ReferenceValues }) {
  return (
    <div
      style={
        {
          width: "390px",
          height: "844px",
          position: "relative",
          overflow: "hidden",
          background: "#0D1130",
          color: "#F6F2E9",
          fontFamily: "Manrope, 'Avenir Next', system-ui, sans-serif",
          boxSizing: "border-box",
        } as CSSProperties
      }
      className={"reference-screen reference-insights"}
    >
      <svg
        aria-hidden={"true"}
        width={"0"}
        height={"0"}
        style={
          {
            position: "absolute",
            width: "0",
            height: "0",
            overflow: "hidden",
          } as CSSProperties
        }
      >
        <defs>
          <radialGradient id={"gSun"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#FFF4B8"} />
            <stop offset={"0.45"} stopColor={"#FFC93C"} />
            <stop offset={"0.85"} stopColor={"#F58F1F"} />
            <stop offset={"1"} stopColor={"#DE6516"} />
          </radialGradient>
          <radialGradient id={"gSunset"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#FFE6A6"} />
            <stop offset={"0.5"} stopColor={"#FF9657"} />
            <stop offset={"1"} stopColor={"#D9407A"} />
          </radialGradient>
          <linearGradient id={"gHill"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#8C92FF"} />
            <stop offset={"1"} stopColor={"#3A3E9C"} />
          </linearGradient>
          <radialGradient id={"gCloud"} cx={"0.35"} cy={"0.25"} r={"0.85"}>
            <stop offset={"0"} stopColor={"#FFFFFF"} />
            <stop offset={"0.6"} stopColor={"#ECE9FF"} />
            <stop offset={"1"} stopColor={"#ADA7E6"} />
          </radialGradient>
          <radialGradient id={"gMoon"} cx={"0.3"} cy={"0.3"} r={"0.85"}>
            <stop offset={"0"} stopColor={"#FFF7CF"} />
            <stop offset={"0.5"} stopColor={"#FFD66A"} />
            <stop offset={"1"} stopColor={"#E29A2E"} />
          </radialGradient>
          <radialGradient id={"gStar"} cx={"0.4"} cy={"0.35"} r={"0.7"}>
            <stop offset={"0"} stopColor={"#FFF6C4"} />
            <stop offset={"1"} stopColor={"#FFB12E"} />
          </radialGradient>
          <radialGradient id={"gShadow"} cx={"0.5"} cy={"0.5"} r={"0.5"}>
            <stop offset={"0"} stopColor={"#000000"} stopOpacity={"0.45"} />
            <stop offset={"1"} stopColor={"#000000"} stopOpacity={"0"} />
          </radialGradient>
          <filter
            id={"fSoft"}
            x={"-50%"}
            y={"-50%"}
            width={"200%"}
            height={"200%"}
          >
            <feGaussianBlur stdDeviation={"1.2"} />
          </filter>
          <clipPath id={"cpTop"}>
            <rect x={"0"} y={"0"} width={"64"} height={"39"} />
          </clipPath>
          <mask id={"mMoon"}>
            <rect x={"0"} y={"0"} width={"64"} height={"64"} fill={"#ffffff"} />
            <circle cx={"40"} cy={"23"} r={"14"} fill={"#000000"} />
          </mask>
        </defs>
        <symbol id={"icoFajr"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"58"}
            rx={"20"}
            ry={"3.5"}
            fill={"url(#gShadow)"}
          />
          <g className={"glow"}>
            <rect
              x={"30.5"}
              y={"7"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFD36B"}
            />
            <rect
              x={"30.5"}
              y={"7"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFD36B"}
              transform={"rotate(-42 32 38)"}
            />
            <rect
              x={"30.5"}
              y={"7"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFD36B"}
              transform={"rotate(42 32 38)"}
            />
          </g>
          <circle
            cx={"32"}
            cy={"38"}
            r={"15"}
            fill={"url(#gSun)"}
            clipPath={"url(#cpTop)"}
          />
          <ellipse
            cx={"26"}
            cy={"30"}
            rx={"5"}
            ry={"3"}
            fill={"#ffffff"}
            opacity={"0.65"}
            filter={"url(#fSoft)"}
          />
          <rect
            x={"6"}
            y={"37"}
            width={"52"}
            height={"17"}
            rx={"8.5"}
            fill={"url(#gHill)"}
          />
          <rect
            x={"13"}
            y={"40"}
            width={"20"}
            height={"3"}
            rx={"1.5"}
            fill={"#ffffff"}
            opacity={"0.4"}
          />
        </symbol>
        <symbol id={"icoDhuhr"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"58"}
            rx={"18"}
            ry={"3.5"}
            fill={"url(#gShadow)"}
          />
          <g className={"spin"}>
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(45 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(90 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(135 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(180 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(225 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(270 32 29)"}
            />
            <rect
              x={"30.5"}
              y={"1"}
              width={"3"}
              height={"8"}
              rx={"1.5"}
              fill={"#FFC23A"}
              transform={"rotate(315 32 29)"}
            />
          </g>
          <circle cx={"32"} cy={"29"} r={"16"} fill={"url(#gSun)"} />
          <ellipse
            cx={"26"}
            cy={"22"}
            rx={"6"}
            ry={"3.5"}
            fill={"#ffffff"}
            opacity={"0.7"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"icoAsr"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"58"}
            rx={"22"}
            ry={"3.5"}
            fill={"url(#gShadow)"}
          />
          <circle cx={"40"} cy={"23"} r={"14"} fill={"url(#gSun)"} />
          <ellipse
            cx={"35"}
            cy={"17"}
            rx={"5"}
            ry={"3"}
            fill={"#ffffff"}
            opacity={"0.7"}
            filter={"url(#fSoft)"}
          />
          <g className={"drift"}>
            <path
              d={
                "M16 53 H48 A8 8 0 0 0 49.5 37.2 A13 13 0 0 0 24.5 33 A10 10 0 0 0 16 53 Z"
              }
              fill={"url(#gCloud)"}
            />
            <ellipse
              cx={"30"}
              cy={"36"}
              rx={"6"}
              ry={"2.6"}
              fill={"#ffffff"}
              opacity={"0.95"}
              filter={"url(#fSoft)"}
            />
          </g>
        </symbol>
        <symbol id={"icoMaghrib"} viewBox={"0 0 64 64"}>
          <circle
            cx={"32"}
            cy={"38"}
            r={"16"}
            fill={"url(#gSunset)"}
            clipPath={"url(#cpTop)"}
          />
          <ellipse
            cx={"26"}
            cy={"29"}
            rx={"5"}
            ry={"3"}
            fill={"#ffffff"}
            opacity={"0.6"}
            filter={"url(#fSoft)"}
          />
          <rect
            x={"7"}
            y={"41"}
            width={"50"}
            height={"4.5"}
            rx={"2.25"}
            fill={"#9A6BE0"}
          />
          <rect
            x={"14"}
            y={"48.5"}
            width={"36"}
            height={"4"}
            rx={"2"}
            fill={"#7652C9"}
          />
          <rect
            x={"22"}
            y={"55.5"}
            width={"20"}
            height={"3.5"}
            rx={"1.75"}
            fill={"#5A3DA8"}
          />
          <rect
            x={"24"}
            y={"41"}
            width={"16"}
            height={"4.5"}
            rx={"2.25"}
            fill={"#FFB36B"}
            opacity={"0.85"}
          />
          <rect
            x={"27"}
            y={"48.5"}
            width={"10"}
            height={"4"}
            rx={"2"}
            fill={"#FFB36B"}
            opacity={"0.6"}
          />
        </symbol>
        <symbol id={"icoIsha"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"30"}
            cy={"58"}
            rx={"16"}
            ry={"3"}
            fill={"url(#gShadow)"}
          />
          <circle
            cx={"28"}
            cy={"33"}
            r={"19"}
            fill={"url(#gMoon)"}
            mask={"url(#mMoon)"}
          />
          <ellipse
            cx={"16"}
            cy={"33"}
            rx={"2.5"}
            ry={"7"}
            fill={"#ffffff"}
            opacity={"0.55"}
            filter={"url(#fSoft)"}
          />
          <path
            className={"tw"}
            d={
              "M50 8 C51 13 51 13 56 14 C51 15 51 15 50 20 C49 15 49 15 44 14 C49 13 49 13 50 8 Z"
            }
            fill={"url(#gStar)"}
          />
          <path
            className={"tw tw2"}
            d={
              "M52 33 C52.7 36.3 52.7 36.3 56 37 C52.7 37.7 52.7 37.7 52 41 C51.3 37.7 51.3 37.7 48 37 C51.3 36.3 51.3 36.3 52 33 Z"
            }
            fill={"url(#gStar)"}
          />
        </symbol>
      </svg>
      <div
        aria-hidden={"true"}
        style={
          {
            position: "absolute",
            top: "-170px",
            right: "-140px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(63,209,168,0.2), rgba(63,209,168,0) 65%)",
          } as CSSProperties
        }
      />
      <div
        style={
          {
            position: "relative",
            padding: "36px 20px 0",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          } as CSSProperties
        }
        className={"reference-content"}
      >
        <div
          className={"enter"}
          style={
            {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "48px",
            } as CSSProperties
          }
          data-section={"0"}
        >
          <div
            style={
              {
                display: "flex",
                flexDirection: "column",
                gap: "1px",
              } as CSSProperties
            }
          >
            <span
              className={"disp"}
              style={
                {
                  fontSize: "26px",
                  fontWeight: "800",
                  letterSpacing: "-0.01em",
                } as CSSProperties
              }
              role={"heading"}
              aria-level={1}
            >
              {"Insights"}
            </span>
            <span
              style={
                {
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {v.yearLine}
            </span>
          </div>
          <div
            style={
              {
                height: "32px",
                padding: "0 12px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "800",
                background: "rgba(63,209,168,0.14)",
                color: "#7CF2C6",
                border: "1px solid rgba(63,209,168,0.35)",
              } as CSSProperties
            }
            className={"period"}
            role={"group"}
            aria-label={"Period"}
          >
            {(v.periods ?? []).map((p: any, index: number) => (
              <Fragment key={index}>
                <button onClick={p.pick} aria-pressed={p.sel}>
                  {p.label}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.05s",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            } as CSSProperties
          }
          data-section={"1"}
        >
          <button
            className={"nav"}
            onClick={v.prev}
            disabled={v.atStart}
            aria-label={v.previousLabel}
          >
            <svg
              viewBox={"0 0 24 24"}
              width={"20"}
              height={"20"}
              fill={"none"}
              stroke={"#F6F2E9"}
              strokeWidth={"2.2"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              aria-hidden={"true"}
            >
              <path d={"M15 6l-6 6 6 6"} />
            </svg>
          </button>
          <div
            style={
              {
                flexGrow: "1",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              } as CSSProperties
            }
          >
            <span
              className={"disp"}
              style={{ fontSize: "19px", fontWeight: "700" } as CSSProperties}
            >
              {v.monthName}
            </span>
            <span
              style={
                {
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {v.monthNote}
            </span>
          </div>
          <button
            className={"nav"}
            onClick={v.next}
            disabled={v.atEnd}
            aria-label={v.nextLabel}
          >
            <svg
              viewBox={"0 0 24 24"}
              width={"20"}
              height={"20"}
              fill={"none"}
              stroke={"#F6F2E9"}
              strokeWidth={"2.2"}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              aria-hidden={"true"}
            >
              <path d={"M9 6l6 6-6 6"} />
            </svg>
          </button>
        </div>
        <div
          style={
            {
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "10px",
            } as CSSProperties
          }
          data-section={"2"}
        >
          <div
            className={"tile"}
            style={
              {
                animationDelay: "0.1s",
                height: "66px",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              } as CSSProperties
            }
          >
            <span
              style={
                {
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"Prayers kept"}
            </span>
            <span
              className={"disp"}
              style={{ fontSize: "22px", fontWeight: "800" } as CSSProperties}
            >
              {v.kept}
              <span
                style={
                  {
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#A7ADCF",
                  } as CSSProperties
                }
              >
                {"/" + String(v.due)}
              </span>
            </span>
          </div>
          <div
            className={"tile"}
            style={
              {
                animationDelay: "0.14s",
                height: "66px",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              } as CSSProperties
            }
          >
            <span
              style={
                {
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"Full days"}
            </span>
            <span
              className={"disp"}
              style={
                {
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#F5B942",
                } as CSSProperties
              }
            >
              {v.full}
            </span>
          </div>
          <div
            className={"tile"}
            style={
              {
                animationDelay: "0.18s",
                height: "66px",
                boxSizing: "border-box",
                padding: "10px 12px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              } as CSSProperties
            }
          >
            <span
              style={
                {
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"Best streak"}
            </span>
            <span
              className={"disp"}
              style={{ fontSize: "22px", fontWeight: "800" } as CSSProperties}
            >
              {v.best}
              <span
                style={
                  {
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#A7ADCF",
                  } as CSSProperties
                }
              >
                {" days"}
              </span>
            </span>
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.2s",
              borderRadius: "22px",
              padding: "14px",
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            } as CSSProperties
          }
          data-section={"3"}
        >
          <div
            style={
              {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              } as CSSProperties
            }
          >
            <span
              className={"disp"}
              style={{ fontSize: "15px", fontWeight: "700" } as CSSProperties}
            >
              {"Prayers per day"}
            </span>
            <span
              style={
                {
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"avg " + String(v.avg) + " / 5"}
            </span>
          </div>
          <div
            role={"group"}
            aria-label={"Daily prayers in " + String(v.monthName)}
            style={
              {
                display: "flex",
                gap: "2px",
                alignItems: "flex-end",
              } as CSSProperties
            }
          >
            {(v.bars ?? []).map((b: any, index: number) => (
              <Fragment key={index}>
                <button
                  className={b.cls}
                  onClick={b.pick}
                  disabled={b.future}
                  aria-label={b.label}
                  aria-pressed={b.sel}
                >
                  <span
                    className={b.lv}
                    style={{ height: String(b.h) + "px" } as CSSProperties}
                  />
                </button>
              </Fragment>
            ))}
          </div>
          <div
            aria-hidden={"true"}
            style={
              {
                display: "flex",
                gap: "2px",
                marginTop: "-2px",
              } as CSSProperties
            }
          >
            {(v.bars ?? []).map((b: any, index: number) => (
              <Fragment key={index}>
                <span
                  style={
                    {
                      flex: "1 1 0",
                      minWidth: "0",
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#A7ADCF",
                      overflow: "visible",
                      whiteSpace: "nowrap",
                    } as CSSProperties
                  }
                >
                  {b.lab}
                </span>
              </Fragment>
            ))}
          </div>
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "44px",
                padding: "0 12px",
                borderRadius: "14px",
                background: "rgba(13,17,48,0.6)",
              } as CSSProperties
            }
          >
            <div
              style={
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  minWidth: "88px",
                } as CSSProperties
              }
            >
              <span
                style={{ fontSize: "13px", fontWeight: "800" } as CSSProperties}
              >
                {v.dayTitle}
              </span>
              <span
                style={
                  {
                    fontSize: "11px",
                    fontWeight: "700",
                    color: v.dayColor,
                  } as CSSProperties
                }
              >
                {v.daySub}
              </span>
            </div>
            <div
              style={
                {
                  flexGrow: "1",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "6px",
                } as CSSProperties
              }
            >
              {(v.dayIcons ?? []).map((ic: any, index: number) => (
                <Fragment key={index}>
                  <svg
                    className={ic.cls}
                    viewBox={"0 0 64 64"}
                    width={"30"}
                    height={"30"}
                    role={"button"}
                    aria-label={ic.label}
                    tabIndex={0}
                    onClick={ic.toggle}
                    onKeyDown={ic.onKeyDown}
                  >
                    <use href={ic.icon} />
                  </svg>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.3s",
              borderRadius: "22px",
              padding: "14px",
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            } as CSSProperties
          }
          data-section={"4"}
        >
          <div
            style={
              {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              } as CSSProperties
            }
          >
            <span
              className={"disp"}
              style={{ fontSize: "15px", fontWeight: "700" } as CSSProperties}
            >
              {"Your year of salah"}
            </span>
            <span
              style={
                {
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"Tap a month"}
            </span>
          </div>
          <div
            style={
              {
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              } as CSSProperties
            }
          >
            {(v.year ?? []).map((y: any, index: number) => (
              <Fragment key={index}>
                <button
                  className={y.cls}
                  onClick={y.pick}
                  aria-label={y.label}
                  aria-pressed={y.sel}
                >
                  <span className={"ylab"}>{y.s}</span>
                  <span
                    style={{ display: "flex", gap: "2px" } as CSSProperties}
                  >
                    {(y.cells ?? []).map((c: any, index: number) => (
                      <Fragment key={index}>
                        <span className={c} />
                      </Fragment>
                    ))}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "4px",
                fontSize: "10px",
                fontWeight: "700",
                color: "#A7ADCF",
              } as CSSProperties
            }
          >
            <span style={{ marginRight: "2px" } as CSSProperties}>{"0"}</span>
            <span className={"cell l0"} />
            <span className={"cell l1"} />
            <span className={"cell l2"} />
            <span className={"cell l3"} />
            <span className={"cell l4"} />
            <span className={"cell l5"} />
            <span style={{ marginLeft: "2px" } as CSSProperties}>
              {"5 prayers"}
            </span>
          </div>
        </div>
      </div>
      <nav
        aria-label={"Mobile navigation"}
        style={
          {
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: "80px",
            boxSizing: "border-box",
            padding: "8px 12px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "4px",
            background: "rgba(13,17,48,0.9)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            zIndex: "10",
          } as CSSProperties
        }
        className={"reference-nav"}
      >
        <button
          className={"tab"}
          data-reference-link={"true"}
          onClick={v.goToday}
        >
          <svg
            viewBox={"0 0 24 24"}
            width={"24"}
            height={"24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.9"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path d={"M3 18h18"} />
            <path d={"M6 18a6 6 0 0 1 12 0"} />
            <path d={"M12 4v3"} />
            <path d={"M4.9 8.9l2.1 2.1"} />
            <path d={"M19.1 8.9l-2.1 2.1"} />
          </svg>
          {"\nToday\n"}
        </button>
        <button
          className={"tab"}
          data-reference-link={"true"}
          onClick={v.goCircles}
        >
          <svg
            viewBox={"0 0 24 24"}
            width={"24"}
            height={"24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.9"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <circle cx={"9"} cy={"8"} r={"3.5"} />
            <path d={"M2.5 19v-.5A5 5 0 0 1 7.5 13.5h3a5 5 0 0 1 5 5v.5"} />
            <path d={"M16 4.6a3.5 3.5 0 0 1 0 6.8"} />
            <path d={"M21.5 19v-.5a5 5 0 0 0-3.5-4.8"} />
          </svg>
          {"\nCircles\n"}
        </button>
        <button className={"tab on"} aria-current={"page"}>
          <svg
            viewBox={"0 0 24 24"}
            width={"24"}
            height={"24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.9"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path d={"M5 20V11"} />
            <path d={"M12 20V5"} />
            <path d={"M19 20v-6"} />
          </svg>
          {"\nInsights\n"}
        </button>
        <button
          className={"tab"}
          data-reference-link={"true"}
          onClick={v.goMilestones}
        >
          <svg
            viewBox={"0 0 24 24"}
            width={"24"}
            height={"24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"1.9"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <circle cx={"12"} cy={"9"} r={"6"} />
            <path d={"M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7"} />
          </svg>
          {"\nMilestones\n"}
        </button>
      </nav>
    </div>
  );
}
