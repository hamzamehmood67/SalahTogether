"use client";
// Faithful React port of the supplied Saff circle screen.
import { Fragment, type CSSProperties } from "react";
import type { ReferenceValues } from "./types";
export default function CircleReference({ v }: { v: ReferenceValues }) {
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
      className={"reference-screen reference-circle"}
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
          <linearGradient id={"gFlame"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#FFD45C"} />
            <stop offset={"0.55"} stopColor={"#FF7A2F"} />
            <stop offset={"1"} stopColor={"#E23F3F"} />
          </linearGradient>
          <linearGradient id={"gFlameIn"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#FFF6BF"} />
            <stop offset={"1"} stopColor={"#FFBE3A"} />
          </linearGradient>
          <radialGradient id={"gGold"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#FFEDB0"} />
            <stop offset={"0.5"} stopColor={"#F5B942"} />
            <stop offset={"1"} stopColor={"#C4841A"} />
          </radialGradient>
          <linearGradient id={"gArch"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#FFE9AE"} />
            <stop offset={"1"} stopColor={"#E49A30"} />
          </linearGradient>
          <linearGradient id={"gArchC"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#FFF4CC"} />
            <stop offset={"0.5"} stopColor={"#F5B942"} />
            <stop offset={"1"} stopColor={"#C4841A"} />
          </linearGradient>
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
        <symbol id={"icoFlame"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"59"}
            rx={"16"}
            ry={"3"}
            fill={"url(#gShadow)"}
          />
          <path
            d={
              "M32 5 C40 17 50 23 50 38 C50 50 42 57 32 57 C22 57 14 50 14 38 C14 30 19 24 24 18 C25 25 28 28 30 28 C30 20 29 12 32 5 Z"
            }
            fill={"url(#gFlame)"}
          />
          <path
            d={
              "M32 29 C37 35 42 39 42 45.5 C42 51.5 37.5 55.5 32 55.5 C26.5 55.5 22 51.5 22 45.5 C22 39 27 35 32 29 Z"
            }
            fill={"url(#gFlameIn)"}
          />
          <ellipse
            cx={"22"}
            cy={"38"}
            rx={"3"}
            ry={"7"}
            fill={"#ffffff"}
            opacity={"0.35"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"icoCoin"} viewBox={"0 0 64 64"}>
          <circle cx={"32"} cy={"34"} r={"26"} fill={"#B7780F"} />
          <circle cx={"32"} cy={"31"} r={"26"} fill={"url(#gGold)"} />
          <circle
            cx={"32"}
            cy={"31"}
            r={"20"}
            fill={"none"}
            stroke={"#FFF1C4"}
            strokeOpacity={"0.55"}
            strokeWidth={"1.5"}
          />
          <path
            d={"M21 32 L29 40 L44 23"}
            fill={"none"}
            stroke={"#6E4205"}
            strokeWidth={"5.5"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
          <ellipse
            cx={"23"}
            cy={"18"}
            rx={"7"}
            ry={"4"}
            fill={"#ffffff"}
            opacity={"0.6"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"icoMark"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"58"}
            rx={"26"}
            ry={"3"}
            fill={"url(#gShadow)"}
          />
          <path
            d={"M4 54 V34.5 A4.5 4.5 0 0 1 13 34.5 V54 Z"}
            fill={"url(#gArch)"}
          />
          <path
            d={"M15.75 54 V28.5 A4.5 4.5 0 0 1 24.75 28.5 V54 Z"}
            fill={"url(#gArch)"}
          />
          <path
            d={"M27.5 54 V18.5 A4.5 4.5 0 0 1 36.5 18.5 V54 Z"}
            fill={"url(#gArchC)"}
          />
          <path
            d={"M39.25 54 V28.5 A4.5 4.5 0 0 1 48.25 28.5 V54 Z"}
            fill={"url(#gArch)"}
          />
          <path
            d={"M51 54 V34.5 A4.5 4.5 0 0 1 60 34.5 V54 Z"}
            fill={"url(#gArch)"}
          />
          <rect
            x={"6"}
            y={"34"}
            width={"2"}
            height={"14"}
            rx={"1"}
            fill={"#ffffff"}
            opacity={"0.55"}
          />
          <rect
            x={"17.75"}
            y={"28"}
            width={"2"}
            height={"20"}
            rx={"1"}
            fill={"#ffffff"}
            opacity={"0.55"}
          />
          <rect
            x={"29.5"}
            y={"18"}
            width={"2"}
            height={"30"}
            rx={"1"}
            fill={"#ffffff"}
            opacity={"0.6"}
          />
          <rect
            x={"41.25"}
            y={"28"}
            width={"2"}
            height={"20"}
            rx={"1"}
            fill={"#ffffff"}
            opacity={"0.55"}
          />
          <rect
            x={"53"}
            y={"34"}
            width={"2"}
            height={"14"}
            rx={"1"}
            fill={"#ffffff"}
            opacity={"0.55"}
          />
          <path
            className={"tw"}
            d={
              "M32 2 C32.6 5.4 32.6 5.4 36 6 C32.6 6.6 32.6 6.6 32 10 C31.4 6.6 31.4 6.6 28 6 C31.4 5.4 31.4 5.4 32 2 Z"
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
            top: "-160px",
            left: "-120px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,122,47,0.22), rgba(255,122,47,0) 65%)",
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
            gap: "14px",
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
              gap: "10px",
              height: "48px",
            } as CSSProperties
          }
          data-section={"0"}
        >
          <button
            aria-label={"Back to Today"}
            style={
              {
                width: "44px",
                height: "44px",
                flexShrink: "0",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.07)",
                color: "#F6F2E9",
              } as CSSProperties
            }
            data-reference-link={"true"}
            onClick={v.goToday}
          >
            <svg
              viewBox={"0 0 24 24"}
              width={"22"}
              height={"22"}
              fill={"none"}
              stroke={"currentColor"}
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
                minWidth: "0",
                display: "flex",
                flexDirection: "column",
                gap: "1px",
              } as CSSProperties
            }
          >
            <button
              className={"disp"}
              style={
                {
                  fontSize: "19px",
                  fontWeight: "700",
                  textAlign: "left",
                } as CSSProperties
              }
              onClick={v.manageCircles}
              aria-label={"Manage circles"}
            >
              {v.circleName}
            </button>
            <span
              style={
                {
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {v.circleSubtitle}
            </span>
          </div>
          <button
            className={"invite"}
            onClick={v.invite}
            style={
              {
                height: "44px",
                padding: "0 16px",
                borderRadius: "22px",
                background: "#F5B942",
                color: "#1A1400",
                fontSize: "14px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              } as CSSProperties
            }
          >
            <svg
              viewBox={"0 0 24 24"}
              width={"18"}
              height={"18"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={"2.4"}
              strokeLinecap={"round"}
              aria-hidden={"true"}
            >
              <path d={"M12 5v14M5 12h14"} />
            </svg>
            {"\nInvite\n"}
          </button>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.06s",
              position: "relative",
              borderRadius: "26px",
              padding: "16px",
              background:
                "linear-gradient(160deg, rgba(255,122,47,0.18), rgba(255,122,47,0.03) 60%), rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,140,80,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            } as CSSProperties
          }
          data-section={"1"}
        >
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                gap: "14px",
              } as CSSProperties
            }
          >
            <div
              className={"float"}
              style={
                {
                  width: "64px",
                  height: "64px",
                  flexShrink: "0",
                } as CSSProperties
              }
            >
              <svg
                viewBox={"0 0 64 64"}
                width={"64"}
                height={"64"}
                aria-hidden={"true"}
              >
                <use href={"#icoMark"} />
              </svg>
            </div>
            <div
              style={
                {
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                } as CSSProperties
              }
            >
              <div
                className={"disp"}
                style={
                  {
                    fontSize: "28px",
                    fontWeight: "800",
                    letterSpacing: "-0.01em",
                    lineHeight: "1.05",
                  } as CSSProperties
                }
              >
                {String(v.keptToday) + " "}
                <span
                  style={
                    {
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#C9CDE6",
                    } as CSSProperties
                  }
                >
                  {"of " + String(v.dueToday) + " kept together"}
                </span>
              </div>
              <div
                style={
                  {
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#C9CDE6",
                  } as CSSProperties
                }
              >
                {v.openText}
              </div>
            </div>
          </div>
          <div
            style={
              {
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "8px",
              } as CSSProperties
            }
          >
            {(v.pills ?? []).map((p: any, index: number) => (
              <Fragment key={index}>
                <div
                  className={"pill"}
                  style={
                    {
                      height: "62px",
                      borderRadius: "16px",
                      background: "rgba(13,17,48,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                    } as CSSProperties
                  }
                >
                  <svg
                    viewBox={"0 0 64 64"}
                    width={"30"}
                    height={"30"}
                    aria-hidden={"true"}
                  >
                    <use href={p.icon} />
                  </svg>
                  <span
                    style={
                      {
                        fontSize: "12px",
                        fontWeight: "800",
                        color: p.color,
                      } as CSSProperties
                    }
                  >
                    {p.val}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.12s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            } as CSSProperties
          }
          data-section={"2"}
        >
          <div
            className={"disp"}
            style={{ fontSize: "17px", fontWeight: "700" } as CSSProperties}
          >
            {"Today"}
          </div>
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "11px",
                fontWeight: "700",
                color: "#A7ADCF",
              } as CSSProperties
            }
          >
            <span
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                } as CSSProperties
              }
            >
              <span className={"dot d"} />
              {"Prayed"}
            </span>
            <span
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                } as CSSProperties
              }
            >
              <span className={"dot p"} />
              {"Open"}
            </span>
            <span
              style={
                {
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                } as CSSProperties
              }
            >
              <span className={"dot u"} />
              {"Later"}
            </span>
          </div>
        </div>
        <div
          style={
            {
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              marginTop: "-6px",
            } as CSSProperties
          }
          data-section={"3"}
        >
          {(v.members ?? []).map((m: any, index: number) => (
            <Fragment key={index}>
              <div
                className={"mrow enter"}
                style={
                  {
                    animationDelay: m.delay,
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0 2px 0 4px",
                    borderRadius: "14px",
                  } as CSSProperties
                }
              >
                <span
                  style={
                    {
                      width: "36px",
                      height: "36px",
                      flexShrink: "0",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "800",
                      background: m.bg,
                      color: m.fg,
                    } as CSSProperties
                  }
                >
                  {m.init}
                </span>
                <div
                  style={
                    {
                      flexGrow: "1",
                      minWidth: "0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    } as CSSProperties
                  }
                >
                  <div
                    style={
                      {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      } as CSSProperties
                    }
                  >
                    <button
                      style={
                        { fontSize: "14px", fontWeight: "700" } as CSSProperties
                      }
                      onClick={m.inspect}
                      aria-label={"View " + String(m.name) + " progress"}
                    >
                      {m.name}
                    </button>
                    {!!m.isYou && (
                      <>
                        <span
                          style={
                            {
                              fontSize: "10px",
                              fontWeight: "800",
                              letterSpacing: "0.06em",
                              padding: "2px 6px",
                              borderRadius: "6px",
                              background: "rgba(245,185,66,0.18)",
                              color: "#F5B942",
                            } as CSSProperties
                          }
                        >
                          {"YOU"}
                        </span>
                      </>
                    )}
                    <span
                      style={
                        {
                          display: "flex",
                          alignItems: "center",
                          gap: "1px",
                          fontSize: "12px",
                          fontWeight: "800",
                          color: "#FFB37A",
                        } as CSSProperties
                      }
                    >
                      <svg
                        viewBox={"0 0 64 64"}
                        width={"16"}
                        height={"16"}
                        aria-hidden={"true"}
                      >
                        <use href={"#icoFlame"} />
                      </svg>
                      {m.streak}
                    </span>
                  </div>
                  <div
                    role={"img"}
                    aria-label={m.dotsLabel}
                    style={{ display: "flex", gap: "5px" } as CSSProperties}
                  >
                    {(m.dots ?? []).map((d: any, index: number) => (
                      <Fragment key={index}>
                        <span className={d.cls} />
                      </Fragment>
                    ))}
                  </div>
                </div>
                {!!m.canNudge && (
                  <>
                    <button
                      className={m.nudgeCls}
                      onClick={m.onNudge}
                      disabled={m.nudged}
                      aria-label={m.nudgeLabel}
                    >
                      <svg
                        className={"bell"}
                        viewBox={"0 0 24 24"}
                        width={"16"}
                        height={"16"}
                        fill={"none"}
                        stroke={"currentColor"}
                        strokeWidth={"2.2"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        aria-hidden={"true"}
                      >
                        <path d={"M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"} />
                        <path d={"M10 21h4"} />
                      </svg>
                      {"\n" + String(m.nudgeText) + "\n"}
                    </button>
                  </>
                )}
                {!!m.prayedNow && (
                  <>
                    <svg
                      viewBox={"0 0 64 64"}
                      width={"26"}
                      height={"26"}
                      aria-label={"Prayed Asr"}
                      role={"img"}
                      style={{ marginRight: "10px" } as CSSProperties}
                    >
                      <use href={"#icoCoin"} />
                    </svg>
                  </>
                )}
              </div>
            </Fragment>
          ))}
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.5s",
              borderRadius: "20px",
              padding: "14px 16px",
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
              {"Last 7 days together"}
            </span>
            <button
              style={{ fontSize: "12px", fontWeight: "700" } as CSSProperties}
              data-reference-link={"true"}
              onClick={v.goInsights}
            >
              {"See full year"}
            </button>
          </div>
          <div
            style={
              {
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                gap: "10px",
              } as CSSProperties
            }
          >
            {(v.week ?? []).map((w: any, index: number) => (
              <Fragment key={index}>
                <div
                  className={"bcol"}
                  style={
                    {
                      animationDelay: w.delay,
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    } as CSSProperties
                  }
                >
                  {(w.segs ?? []).map((s: any, index: number) => (
                    <Fragment key={index}>
                      <span className={s} />
                    </Fragment>
                  ))}
                  <span
                    style={
                      {
                        marginTop: "3px",
                        textAlign: "center",
                        fontSize: "11px",
                        fontWeight: "800",
                        color: w.color,
                      } as CSSProperties
                    }
                  >
                    {w.l}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      {!!v.toast && (
        <>
          <div
            role={"status"}
            className={"toast"}
            style={
              {
                position: "absolute",
                left: "20px",
                right: "20px",
                bottom: "96px",
                zIndex: "20",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "18px",
                background: "#F6F2E9",
                color: "#0D1130",
                boxShadow: "0 18px 40px -12px rgba(0,0,0,0.6)",
                fontSize: "14px",
                fontWeight: "700",
              } as CSSProperties
            }
          >
            <svg
              viewBox={"0 0 64 64"}
              width={"28"}
              height={"28"}
              aria-hidden={"true"}
            >
              <use href={"#icoCoin"} />
            </svg>
            <span>{v.toast}</span>
          </div>
        </>
      )}
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
            <circle cx={"9"} cy={"8"} r={"3.5"} />
            <path d={"M2.5 19v-.5A5 5 0 0 1 7.5 13.5h3a5 5 0 0 1 5 5v.5"} />
            <path d={"M16 4.6a3.5 3.5 0 0 1 0 6.8"} />
            <path d={"M21.5 19v-.5a5 5 0 0 0-3.5-4.8"} />
          </svg>
          {"\nCircles\n"}
        </button>
        <button
          className={"tab"}
          data-reference-link={"true"}
          onClick={v.goInsights}
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
