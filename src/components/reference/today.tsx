"use client";
// Faithful React port of the supplied Saff today screen.
import { Fragment, type CSSProperties } from "react";
import type { ReferenceValues } from "./types";
export default function TodayReference({ v }: { v: ReferenceValues }) {
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
      className={"reference-screen reference-today"}
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
      </svg>
      <div
        aria-hidden={"true"}
        style={
          {
            position: "absolute",
            top: "-150px",
            right: "-130px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,92,230,0.42), rgba(124,92,230,0) 65%)",
          } as CSSProperties
        }
      />
      <div
        aria-hidden={"true"}
        style={
          {
            position: "absolute",
            top: "300px",
            left: "-170px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,185,66,0.14), rgba(245,185,66,0) 65%)",
          } as CSSProperties
        }
      />
      <div aria-hidden={"true"}>
        <span
          className={"star"}
          style={
            { left: "34px", top: "22px", animationDelay: "0s" } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "118px",
              top: "14px",
              animationDelay: "1.1s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "202px",
              top: "30px",
              animationDelay: "0.5s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "286px",
              top: "12px",
              animationDelay: "1.8s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "350px",
              top: "26px",
              animationDelay: "0.9s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "162px",
              top: "6px",
              animationDelay: "2.3s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "250px",
              top: "44px",
              animationDelay: "1.4s",
            } as CSSProperties
          }
        />
      </div>
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
              flexDirection: "column",
              gap: "2px",
            } as CSSProperties
          }
          data-section={"0"}
        >
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              } as CSSProperties
            }
          >
            <div
              className={"disp"}
              style={
                {
                  fontSize: "22px",
                  fontWeight: "700",
                  letterSpacing: "-0.01em",
                } as CSSProperties
              }
              role={"heading"}
              aria-level={1}
            >
              {"Assalamu alaikum, " + String(v.name)}
            </div>
            <button
              className={"chip"}
              aria-label={v.streakLabel}
              style={
                {
                  height: "44px",
                  padding: "0 14px 0 8px",
                  borderRadius: "22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(255,122,47,0.14)",
                  border: "1px solid rgba(255,122,47,0.35)",
                } as CSSProperties
              }
              onClick={v.goMilestones}
            >
              <svg
                className={"flick"}
                viewBox={"0 0 64 64"}
                width={"30"}
                height={"30"}
                aria-hidden={"true"}
              >
                <use href={"#icoFlame"} />
              </svg>
              <span
                className={"disp"}
                style={
                  {
                    fontSize: "17px",
                    fontWeight: "800",
                    color: "#FFB37A",
                  } as CSSProperties
                }
              >
                {v.streak}
              </span>
            </button>
          </div>
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
              onClick={v.openSheet}
              aria-label={
                "Prayer times location: " +
                String(v.city.name) +
                ". Change location"
              }
              style={
                {
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                } as CSSProperties
              }
            >
              <span
                style={
                  {
                    height: "32px",
                    padding: "0 12px 0 8px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                    fontWeight: "700",
                  } as CSSProperties
                }
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"16"}
                  height={"16"}
                  fill={"none"}
                  stroke={"#7CF2C6"}
                  strokeWidth={"2"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                >
                  <path
                    d={
                      "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"
                    }
                  />
                  <circle cx={"12"} cy={"9.5"} r={"2.5"} />
                </svg>
                {"\n" + String(v.city.name) + "\n"}
                <svg
                  viewBox={"0 0 24 24"}
                  width={"14"}
                  height={"14"}
                  fill={"none"}
                  stroke={"#A7ADCF"}
                  strokeWidth={"2.2"}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  aria-hidden={"true"}
                >
                  <path d={"M6 9l6 6 6-6"} />
                </svg>
              </span>
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
              {v.hijriDate}
            </span>
            <button
              className={"me"}
              onClick={v.settings}
              aria-label={"Your account and settings"}
            >
              <span
                aria-hidden={"true"}
                style={{ background: v.me } as CSSProperties}
              />
            </button>
          </div>
        </div>
        <div
          className={"enter"}
          style={{ animationDelay: "0.08s" } as CSSProperties}
          data-section={"1"}
        >
          <div
            style={
              {
                position: "relative",
                height: "160px",
                borderRadius: "28px",
                overflow: "hidden",
                background:
                  "linear-gradient(150deg, #2F348C 0%, #6A4DB3 55%, #EE8A58 125%)",
                boxShadow:
                  "0 24px 48px -20px rgba(238,138,88,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
              } as CSSProperties
            }
          >
            <span className={"sheen"} aria-hidden={"true"} />
            <div
              aria-hidden={"true"}
              style={
                {
                  position: "absolute",
                  right: "-36px",
                  top: "-44px",
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.13)",
                } as CSSProperties
              }
            />
            <div
              aria-hidden={"true"}
              style={
                {
                  position: "absolute",
                  right: "-86px",
                  top: "-94px",
                  width: "320px",
                  height: "320px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.07)",
                } as CSSProperties
              }
            />
            <div
              className={"float"}
              style={
                {
                  position: "absolute",
                  right: "4px",
                  top: "4px",
                  width: "136px",
                  height: "136px",
                } as CSSProperties
              }
            >
              <svg
                viewBox={"0 0 64 64"}
                width={"136"}
                height={"136"}
                aria-hidden={"true"}
              >
                <use href={v.currentIcon} />
              </svg>
            </div>
            <div
              style={
                {
                  position: "relative",
                  height: "100%",
                  boxSizing: "border-box",
                  padding: "16px 20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                } as CSSProperties
              }
            >
              <div
                style={
                  {
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  } as CSSProperties
                }
              >
                <span
                  style={
                    {
                      alignSelf: "flex-start",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      height: "24px",
                      padding: "0 10px",
                      borderRadius: "12px",
                      background: "rgba(13,17,48,0.35)",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "0.1em",
                    } as CSSProperties
                  }
                >
                  <span
                    className={"pulse"}
                    style={
                      {
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#7CF2C6",
                      } as CSSProperties
                    }
                  />
                  {v.currentLabel}
                </span>
                <div
                  style={
                    {
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                    } as CSSProperties
                  }
                >
                  <span
                    className={"disp"}
                    style={
                      {
                        fontSize: "44px",
                        fontWeight: "800",
                        letterSpacing: "-0.02em",
                        lineHeight: "1",
                      } as CSSProperties
                    }
                  >
                    {v.currentName}
                  </span>
                  <span
                    className={"ar"}
                    style={
                      {
                        fontSize: "26px",
                        color: "rgba(255,255,255,0.85)",
                      } as CSSProperties
                    }
                  >
                    {v.currentArabic}
                  </span>
                </div>
              </div>
              <div
                style={
                  {
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "200px",
                  } as CSSProperties
                }
              >
                <div
                  style={
                    {
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.88)",
                    } as CSSProperties
                  }
                >
                  {String(v.nextName) + " in "}
                  <span
                    className={"disp"}
                    style={
                      {
                        fontSize: "17px",
                        fontWeight: "700",
                        fontVariantNumeric: "tabular-nums",
                        color: "#ffffff",
                      } as CSSProperties
                    }
                  >
                    {v.countdown}
                  </span>
                </div>
                <div
                  style={
                    {
                      height: "6px",
                      borderRadius: "3px",
                      background: "rgba(13,17,48,0.35)",
                      overflow: "hidden",
                    } as CSSProperties
                  }
                >
                  <div
                    style={
                      {
                        height: "100%",
                        width: String(v.pct) + "%",
                        borderRadius: "3px",
                        background: "linear-gradient(90deg, #FFE3A0, #FFB14A)",
                        transition: "width 1s linear",
                      } as CSSProperties
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.14s",
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
            {"Today’s salah"}
          </div>
          <div
            style={
              {
                display: "flex",
                alignItems: "center",
                gap: "10px",
              } as CSSProperties
            }
          >
            <div style={{ display: "flex", gap: "4px" } as CSSProperties}>
              {(v.segs ?? []).map((s: any, index: number) => (
                <Fragment key={index}>
                  <span className={s.cls} />
                </Fragment>
              ))}
            </div>
            <span
              style={
                {
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#F5B942",
                } as CSSProperties
              }
            >
              {String(v.doneCount) + " of 5"}
            </span>
          </div>
        </div>
        <div
          style={
            {
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            } as CSSProperties
          }
          data-section={"3"}
        >
          {(v.prayers ?? []).map((p: any, index: number) => (
            <Fragment key={index}>
              <div
                className={"enter"}
                style={{ animationDelay: p.delay } as CSSProperties}
              >
                <button
                  className={p.cls}
                  onClick={p.onTap}
                  disabled={p.disabled}
                  aria-pressed={p.pressed}
                  aria-label={p.label}
                  style={
                    {
                      width: "100%",
                      height: "56px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "0 14px 0 8px",
                      borderRadius: "18px",
                      position: "relative",
                      textAlign: "left",
                    } as CSSProperties
                  }
                >
                  <span
                    className={"ico"}
                    style={
                      {
                        width: "42px",
                        height: "42px",
                        flexShrink: "0",
                        display: "flex",
                      } as CSSProperties
                    }
                  >
                    <svg
                      viewBox={"0 0 64 64"}
                      width={"42"}
                      height={"42"}
                      aria-hidden={"true"}
                    >
                      <use href={p.icon} />
                    </svg>
                  </span>
                  <span
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
                    <span
                      style={
                        {
                          display: "flex",
                          alignItems: "baseline",
                          gap: "8px",
                        } as CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            fontSize: "16px",
                            fontWeight: "700",
                          } as CSSProperties
                        }
                      >
                        {p.name}
                      </span>
                      <span
                        className={"ar"}
                        style={
                          {
                            fontSize: "15px",
                            color: "#A7ADCF",
                          } as CSSProperties
                        }
                      >
                        {p.ar}
                      </span>
                    </span>
                    <span
                      style={
                        {
                          fontSize: "12px",
                          fontWeight: "600",
                          color: p.statusColor,
                        } as CSSProperties
                      }
                    >
                      {p.status}
                    </span>
                  </span>
                  <span
                    style={
                      {
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#C9CDE6",
                        fontVariantNumeric: "tabular-nums",
                      } as CSSProperties
                    }
                  >
                    {p.time}
                  </span>
                  <span
                    style={
                      {
                        width: "30px",
                        height: "30px",
                        flexShrink: "0",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      } as CSSProperties
                    }
                  >
                    {!!p.done && (
                      <>
                        <svg
                          className={"coin"}
                          viewBox={"0 0 64 64"}
                          width={"30"}
                          height={"30"}
                          aria-hidden={"true"}
                        >
                          <use href={"#icoCoin"} />
                        </svg>
                      </>
                    )}
                    {!!p.open && (
                      <>
                        <span
                          style={
                            {
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              boxSizing: "border-box",
                              border: "2px solid rgba(245,185,66,0.75)",
                            } as CSSProperties
                          }
                        />
                      </>
                    )}
                    {!!p.later && (
                      <>
                        <span
                          style={
                            {
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              boxSizing: "border-box",
                              border: "2px dashed rgba(167,173,207,0.45)",
                            } as CSSProperties
                          }
                        />
                      </>
                    )}
                    <span className={"burst"} aria-hidden={"true"}>
                      <i
                        style={
                          { "--dx": "0px", "--dy": "-26px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "19px", "--dy": "-19px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "26px", "--dy": "0px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "19px", "--dy": "19px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "0px", "--dy": "26px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "-19px", "--dy": "19px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "-26px", "--dy": "0px" } as CSSProperties
                        }
                      />
                      <i
                        style={
                          { "--dx": "-19px", "--dy": "-19px" } as CSSProperties
                        }
                      />
                    </span>
                  </span>
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <button
          className={"strip enter"}
          style={
            {
              animationDelay: "0.55s",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              height: "66px",
              boxSizing: "border-box",
              padding: "0 14px 0 14px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F6F2E9",
            } as CSSProperties
          }
          data-section={"4"}
          data-reference-link={"true"}
          onClick={v.goCircles}
        >
          <span
            style={
              {
                display: "flex",
                alignItems: "center",
                paddingLeft: "2px",
              } as CSSProperties
            }
          >
            {(v.avatars ?? []).map((a: any, index: number) => (
              <Fragment key={index}>
                <span
                  className={a.cls}
                  style={
                    {
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "800",
                      background: a.bg,
                      color: a.fg,
                      border: "2px solid #0D1130",
                      position: "relative",
                      zIndex: a.z,
                      marginLeft: String(a.margin) + "px",
                    } as CSSProperties
                  }
                >
                  {a.initials}
                </span>
              </Fragment>
            ))}
          </span>
          <span
            style={
              {
                flexGrow: "1",
                minWidth: "0",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              } as CSSProperties
            }
          >
            <span
              style={{ fontSize: "15px", fontWeight: "700" } as CSSProperties}
            >
              {v.circleName}
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
              {v.circleSummary}
            </span>
          </span>
          <svg
            viewBox={"0 0 24 24"}
            width={"20"}
            height={"20"}
            fill={"none"}
            stroke={"#A7ADCF"}
            strokeWidth={"2.2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path d={"M9 6l6 6-6 6"} />
          </svg>
        </button>
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
      {!!v.sheetOpen && (
        <>
          <div
            style={
              {
                position: "absolute",
                left: "0",
                top: "0",
                width: "390px",
                height: "844px",
                zIndex: "30",
              } as CSSProperties
            }
            className={"reference-location-overlay"}
          >
            <button
              className={"scrim"}
              aria-label={"Close location picker"}
              onClick={v.closeSheet}
              style={
                {
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "100%",
                  height: "100%",
                  background: "rgba(5,7,24,0.6)",
                  backdropFilter: "blur(3px)",
                } as CSSProperties
              }
            />
            <div
              className={"sheet"}
              role={"dialog"}
              aria-label={"Prayer times location"}
              style={
                {
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  padding: "12px 20px 28px",
                  borderRadius: "28px 28px 0 0",
                  background: "#161B45",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                } as CSSProperties
              }
              aria-modal={"true"}
              tabIndex={-1}
            >
              <span
                aria-hidden={"true"}
                style={
                  {
                    alignSelf: "center",
                    width: "40px",
                    height: "5px",
                    borderRadius: "3px",
                    background: "rgba(255,255,255,0.2)",
                  } as CSSProperties
                }
              />
              <div
                style={
                  {
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  } as CSSProperties
                }
              >
                <div
                  className={"disp"}
                  style={
                    { fontSize: "22px", fontWeight: "700" } as CSSProperties
                  }
                >
                  {"Prayer times for"}
                </div>
                <div
                  style={
                    {
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#A7ADCF",
                    } as CSSProperties
                  }
                >
                  {"Times update to wherever you are."}
                </div>
              </div>
              <button
                onClick={v.useGps}
                style={
                  {
                    height: "52px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "0 16px",
                    background: "rgba(124,242,198,0.12)",
                    border: "1px solid rgba(124,242,198,0.4)",
                    color: "#7CF2C6",
                    fontSize: "15px",
                    fontWeight: "700",
                  } as CSSProperties
                }
              >
                <svg
                  viewBox={"0 0 24 24"}
                  width={"20"}
                  height={"20"}
                  fill={"none"}
                  stroke={"currentColor"}
                  strokeWidth={"2"}
                  strokeLinecap={"round"}
                  aria-hidden={"true"}
                >
                  <circle cx={"12"} cy={"12"} r={"7"} />
                  <circle cx={"12"} cy={"12"} r={"2.5"} />
                  <path d={"M12 2v3M12 19v3M2 12h3M19 12h3"} />
                </svg>
                {"\nUse my current location\n"}
              </button>
              <div
                style={
                  { display: "flex", flexDirection: "column" } as CSSProperties
                }
              >
                {(v.cities ?? []).map((c: any, index: number) => (
                  <Fragment key={index}>
                    <button
                      className={"city"}
                      onClick={c.pick}
                      aria-pressed={c.sel}
                      style={
                        {
                          height: "50px",
                          borderRadius: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "0 12px",
                          textAlign: "left",
                        } as CSSProperties
                      }
                    >
                      <span
                        style={
                          {
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                          } as CSSProperties
                        }
                      >
                        <span
                          style={
                            {
                              fontSize: "15px",
                              fontWeight: "700",
                            } as CSSProperties
                          }
                        >
                          {c.name}
                        </span>
                        <span
                          style={
                            {
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#A7ADCF",
                            } as CSSProperties
                          }
                        >
                          {"Fajr " +
                            String(c.fajr) +
                            " · Maghrib " +
                            String(c.maghrib)}
                        </span>
                      </span>
                      {!!c.sel && (
                        <>
                          <svg
                            className={"coin"}
                            viewBox={"0 0 64 64"}
                            width={"26"}
                            height={"26"}
                            aria-hidden={"true"}
                          >
                            <use href={"#icoCoin"} />
                          </svg>
                        </>
                      )}
                    </button>
                  </Fragment>
                ))}
              </div>
              <div
                style={
                  {
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "8px",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.05)",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#C9CDE6",
                  } as CSSProperties
                }
              >
                <button
                  onClick={v.settings}
                  aria-label={"Calculation settings"}
                >
                  {"Method: " + String(v.city.method)}
                </button>
                <span>{"Asr: " + String(v.city.madhab)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
