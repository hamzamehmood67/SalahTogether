"use client";
// Faithful React port of the supplied Saff milestones screen.
import { Fragment, type CSSProperties } from "react";
import type { ReferenceValues } from "./types";
export default function MilestonesReference({ v }: { v: ReferenceValues }) {
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
      className={"reference-screen reference-milestones"}
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
          <radialGradient id={"gMedGold"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#FFF0BE"} />
            <stop offset={"0.5"} stopColor={"#F5B942"} />
            <stop offset={"1"} stopColor={"#B97714"} />
          </radialGradient>
          <linearGradient id={"gMedGoldIn"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#D9901F"} />
            <stop offset={"1"} stopColor={"#8F5A0C"} />
          </linearGradient>
          <radialGradient id={"gMedSky"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#DDF1FF"} />
            <stop offset={"0.5"} stopColor={"#6DB8FF"} />
            <stop offset={"1"} stopColor={"#2A6FC9"} />
          </radialGradient>
          <linearGradient id={"gMedSkyIn"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#2F6FC4"} />
            <stop offset={"1"} stopColor={"#173F7E"} />
          </linearGradient>
          <radialGradient id={"gMedViolet"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#E6DCFF"} />
            <stop offset={"0.5"} stopColor={"#9C7CFF"} />
            <stop offset={"1"} stopColor={"#5337B8"} />
          </radialGradient>
          <linearGradient
            id={"gMedVioletIn"}
            x1={"0"}
            y1={"0"}
            x2={"0"}
            y2={"1"}
          >
            <stop offset={"0"} stopColor={"#5B3FC4"} />
            <stop offset={"1"} stopColor={"#2F1F7A"} />
          </linearGradient>
          <radialGradient id={"gMedTeal"} cx={"0.35"} cy={"0.3"} r={"0.8"}>
            <stop offset={"0"} stopColor={"#C4FFEE"} />
            <stop offset={"0.5"} stopColor={"#3FD1A8"} />
            <stop offset={"1"} stopColor={"#16806E"} />
          </radialGradient>
          <linearGradient id={"gMedTealIn"} x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
            <stop offset={"0"} stopColor={"#1B8A74"} />
            <stop offset={"1"} stopColor={"#0B4A3F"} />
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
        </symbol>
        <symbol id={"icoIsha"} viewBox={"0 0 64 64"}>
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
        <symbol id={"medGold"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"61"}
            rx={"18"}
            ry={"2.5"}
            fill={"url(#gShadow)"}
          />
          <path d={"M21 38 L15 58 L22 55 L26 61 L31 42 Z"} fill={"#E0487A"} />
          <path d={"M43 38 L49 58 L42 55 L38 61 L33 42 Z"} fill={"#B8336A"} />
          <circle cx={"32"} cy={"29"} r={"23"} fill={"#9C6210"} />
          <circle cx={"32"} cy={"27"} r={"23"} fill={"url(#gMedGold)"} />
          <circle cx={"32"} cy={"27"} r={"17"} fill={"url(#gMedGoldIn)"} />
          <circle
            cx={"32"}
            cy={"27"}
            r={"17"}
            fill={"none"}
            stroke={"#FFF1C4"}
            strokeOpacity={"0.55"}
            strokeWidth={"1.2"}
          />
          <ellipse
            cx={"23"}
            cy={"13"}
            rx={"7"}
            ry={"3.5"}
            fill={"#ffffff"}
            opacity={"0.6"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"medSky"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"61"}
            rx={"18"}
            ry={"2.5"}
            fill={"url(#gShadow)"}
          />
          <path d={"M21 38 L15 58 L22 55 L26 61 L31 42 Z"} fill={"#7652C9"} />
          <path d={"M43 38 L49 58 L42 55 L38 61 L33 42 Z"} fill={"#553AA6"} />
          <circle cx={"32"} cy={"29"} r={"23"} fill={"#1D4F95"} />
          <circle cx={"32"} cy={"27"} r={"23"} fill={"url(#gMedSky)"} />
          <circle cx={"32"} cy={"27"} r={"17"} fill={"url(#gMedSkyIn)"} />
          <circle
            cx={"32"}
            cy={"27"}
            r={"17"}
            fill={"none"}
            stroke={"#DDF1FF"}
            strokeOpacity={"0.5"}
            strokeWidth={"1.2"}
          />
          <ellipse
            cx={"23"}
            cy={"13"}
            rx={"7"}
            ry={"3.5"}
            fill={"#ffffff"}
            opacity={"0.6"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"medViolet"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"61"}
            rx={"18"}
            ry={"2.5"}
            fill={"url(#gShadow)"}
          />
          <path d={"M21 38 L15 58 L22 55 L26 61 L31 42 Z"} fill={"#F5B942"} />
          <path d={"M43 38 L49 58 L42 55 L38 61 L33 42 Z"} fill={"#C98A1C"} />
          <circle cx={"32"} cy={"29"} r={"23"} fill={"#3B2489"} />
          <circle cx={"32"} cy={"27"} r={"23"} fill={"url(#gMedViolet)"} />
          <circle cx={"32"} cy={"27"} r={"17"} fill={"url(#gMedVioletIn)"} />
          <circle
            cx={"32"}
            cy={"27"}
            r={"17"}
            fill={"none"}
            stroke={"#E6DCFF"}
            strokeOpacity={"0.5"}
            strokeWidth={"1.2"}
          />
          <ellipse
            cx={"23"}
            cy={"13"}
            rx={"7"}
            ry={"3.5"}
            fill={"#ffffff"}
            opacity={"0.6"}
            filter={"url(#fSoft)"}
          />
        </symbol>
        <symbol id={"medTeal"} viewBox={"0 0 64 64"}>
          <ellipse
            cx={"32"}
            cy={"61"}
            rx={"18"}
            ry={"2.5"}
            fill={"url(#gShadow)"}
          />
          <path d={"M21 38 L15 58 L22 55 L26 61 L31 42 Z"} fill={"#3A3F9E"} />
          <path d={"M43 38 L49 58 L42 55 L38 61 L33 42 Z"} fill={"#262A78"} />
          <circle cx={"32"} cy={"29"} r={"23"} fill={"#0E5C4F"} />
          <circle cx={"32"} cy={"27"} r={"23"} fill={"url(#gMedTeal)"} />
          <circle cx={"32"} cy={"27"} r={"17"} fill={"url(#gMedTealIn)"} />
          <circle
            cx={"32"}
            cy={"27"}
            r={"17"}
            fill={"none"}
            stroke={"#C4FFEE"}
            strokeOpacity={"0.5"}
            strokeWidth={"1.2"}
          />
          <ellipse
            cx={"23"}
            cy={"13"}
            rx={"7"}
            ry={"3.5"}
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
            left: "50px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,185,66,0.2), rgba(245,185,66,0) 65%)",
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
              flexDirection: "column",
              gap: "1px",
              height: "48px",
              justifyContent: "center",
            } as CSSProperties
          }
          data-section={"0"}
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
            {"Milestones"}
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
            {String(v.earnedCount) +
              " of " +
              String(v.totalCount) +
              " earned · small steps, kept steadily"}
          </span>
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
                "linear-gradient(155deg, rgba(245,185,66,0.2), rgba(245,185,66,0.03) 60%), rgba(255,255,255,0.04)",
              border: "1px solid rgba(245,185,66,0.35)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
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
              style={
                {
                  position: "relative",
                  width: "112px",
                  height: "112px",
                  flexShrink: "0",
                } as CSSProperties
              }
            >
              <svg
                viewBox={"0 0 112 112"}
                width={"112"}
                height={"112"}
                aria-hidden={"true"}
                style={
                  {
                    position: "absolute",
                    left: "0",
                    top: "0",
                    transform: "rotate(-90deg)",
                  } as CSSProperties
                }
              >
                <circle
                  cx={"56"}
                  cy={"56"}
                  r={"50"}
                  fill={"none"}
                  stroke={"rgba(255,255,255,0.1)"}
                  strokeWidth={"6"}
                />
                <circle
                  className={"ringp"}
                  cx={"56"}
                  cy={"56"}
                  r={"50"}
                  fill={"none"}
                  stroke={"#F5B942"}
                  strokeWidth={"6"}
                  strokeLinecap={"round"}
                  strokeDasharray={"314.16"}
                  strokeDashoffset={v.ringOff}
                />
              </svg>
              <div
                className={"float"}
                style={
                  {
                    position: "absolute",
                    left: "14px",
                    top: "12px",
                    width: "84px",
                    height: "84px",
                  } as CSSProperties
                }
              >
                <div
                  className={v.celeCls}
                  style={
                    {
                      width: "84px",
                      height: "84px",
                      position: "relative",
                    } as CSSProperties
                  }
                >
                  <svg
                    className={"fb"}
                    viewBox={"0 0 64 64"}
                    width={"84"}
                    height={"84"}
                    role={"img"}
                    aria-label={String(v.sel.name) + " badge"}
                  >
                    <use href={v.sel.med} />
                    <use
                      href={v.sel.glyph}
                      x={"19"}
                      y={"14"}
                      width={"26"}
                      height={"26"}
                    />
                  </svg>
                  <span className={"burst"} aria-hidden={"true"}>
                    <i
                      style={
                        { "--dx": "0px", "--dy": "-60px" } as CSSProperties
                      }
                    />
                    <i
                      style={
                        { "--dx": "42px", "--dy": "-42px" } as CSSProperties
                      }
                    />
                    <i
                      style={{ "--dx": "60px", "--dy": "0px" } as CSSProperties}
                    />
                    <i
                      style={
                        { "--dx": "42px", "--dy": "42px" } as CSSProperties
                      }
                    />
                    <i
                      style={{ "--dx": "0px", "--dy": "60px" } as CSSProperties}
                    />
                    <i
                      style={
                        { "--dx": "-42px", "--dy": "42px" } as CSSProperties
                      }
                    />
                    <i
                      style={
                        { "--dx": "-60px", "--dy": "0px" } as CSSProperties
                      }
                    />
                    <i
                      style={
                        { "--dx": "-42px", "--dy": "-42px" } as CSSProperties
                      }
                    />
                    <i
                      style={
                        { "--dx": "24px", "--dy": "-56px" } as CSSProperties
                      }
                    />
                    <i
                      style={
                        { "--dx": "-24px", "--dy": "-56px" } as CSSProperties
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              style={
                {
                  flexGrow: "1",
                  minWidth: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                } as CSSProperties
              }
            >
              <span
                style={
                  {
                    alignSelf: "flex-start",
                    height: "22px",
                    padding: "0 9px",
                    borderRadius: "11px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.04em",
                    background: v.sel.tagBg,
                    color: v.sel.tagFg,
                  } as CSSProperties
                }
              >
                {v.sel.tag}
              </span>
              <span
                className={"disp"}
                style={
                  {
                    fontSize: "22px",
                    fontWeight: "800",
                    lineHeight: "1.1",
                  } as CSSProperties
                }
                role={"heading"}
                aria-level={2}
              >
                {v.sel.name}
              </span>
              <span
                style={
                  {
                    fontSize: "13px",
                    fontWeight: "500",
                    lineHeight: "1.4",
                    color: "#C9CDE6",
                  } as CSSProperties
                }
              >
                {v.sel.desc}
              </span>
            </div>
          </div>
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
              style={
                {
                  flexGrow: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                } as CSSProperties
              }
            >
              <span
                style={
                  {
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#C9CDE6",
                  } as CSSProperties
                }
              >
                <span
                  className={"disp"}
                  style={
                    {
                      fontSize: "16px",
                      fontWeight: "800",
                      color: "#F6F2E9",
                    } as CSSProperties
                  }
                >
                  {v.sel.have}
                </span>
                {" / " + String(v.sel.need) + " " + String(v.sel.unit)}
              </span>
              <div
                style={
                  {
                    height: "8px",
                    borderRadius: "4px",
                    background: "rgba(13,17,48,0.6)",
                    overflow: "hidden",
                  } as CSSProperties
                }
              >
                <div
                  className={"bfill"}
                  style={
                    {
                      height: "100%",
                      width: String(v.sel.pct) + "%",
                      borderRadius: "4px",
                      background: "linear-gradient(90deg, #FFE3A0, #F5B942)",
                    } as CSSProperties
                  }
                />
              </div>
            </div>
            <button className={"share"} onClick={v.share}>
              <svg
                viewBox={"0 0 24 24"}
                width={"17"}
                height={"17"}
                fill={"none"}
                stroke={"currentColor"}
                strokeWidth={"2.3"}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                aria-hidden={"true"}
              >
                <path d={"M12 4v11"} />
                <path d={"M7.5 8.5L12 4l4.5 4.5"} />
                <path d={"M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"} />
              </svg>
              {"\nShare\n"}
            </button>
          </div>
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.12s",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            } as CSSProperties
          }
          data-section={"2"}
        >
          <span
            className={"disp"}
            style={{ fontSize: "17px", fontWeight: "700" } as CSSProperties}
          >
            {"Badges"}
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
            {"Tap to see progress"}
          </span>
        </div>
        <div
          style={
            {
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "10px",
            } as CSSProperties
          }
          data-section={"3"}
        >
          {(v.badges ?? []).map((b: any, index: number) => (
            <Fragment key={index}>
              <button
                className={b.cls}
                onClick={b.pick}
                aria-pressed={b.selected}
                aria-label={b.label}
                style={
                  {
                    animation:
                      "ref-milestones-rise .6s cubic-bezier(.2,.8,.2,1) backwards",
                    animationDelay: b.delay,
                  } as CSSProperties
                }
              >
                <svg
                  viewBox={"0 0 64 64"}
                  width={"54"}
                  height={"54"}
                  aria-hidden={"true"}
                >
                  <use href={b.med} />
                  <use
                    href={b.glyph}
                    x={"19"}
                    y={"14"}
                    width={"26"}
                    height={"26"}
                  />
                </svg>
                <span
                  style={
                    {
                      fontSize: "12px",
                      fontWeight: "800",
                      whiteSpace: "nowrap",
                    } as CSSProperties
                  }
                >
                  {b.name}
                </span>
                <span
                  style={
                    {
                      fontSize: "11px",
                      fontWeight: "700",
                      color: b.subColor,
                    } as CSSProperties
                  }
                >
                  {b.sub}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.6s",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              height: "72px",
              boxSizing: "border-box",
              padding: "0 16px 0 12px",
              borderRadius: "20px",
              background: "rgba(63,209,168,0.1)",
              border: "1px solid rgba(63,209,168,0.35)",
            } as CSSProperties
          }
          data-section={"4"}
        >
          <div
            className={"float"}
            style={
              {
                width: "48px",
                height: "48px",
                flexShrink: "0",
              } as CSSProperties
            }
          >
            <svg
              viewBox={"0 0 64 64"}
              width={"48"}
              height={"48"}
              aria-hidden={"true"}
            >
              <use href={"#icoMark"} />
            </svg>
          </div>
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
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "8px",
                } as CSSProperties
              }
            >
              <span
                style={{ fontSize: "14px", fontWeight: "800" } as CSSProperties}
              >
                {"Circle goal · " + String(v.goalMonth)}
              </span>
              <span
                style={
                  {
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#7CF2C6",
                  } as CSSProperties
                }
              >
                {String(v.goalTotal) + " / " + String(v.goalTarget)}
              </span>
            </div>
            <div
              style={
                {
                  height: "6px",
                  borderRadius: "3px",
                  background: "rgba(13,17,48,0.6)",
                  overflow: "hidden",
                } as CSSProperties
              }
            >
              <div
                style={
                  {
                    height: "100%",
                    width: String(v.goalPct) + "%",
                    borderRadius: "3px",
                    background: "linear-gradient(90deg, #9FF7D6, #3FD1A8)",
                  } as CSSProperties
                }
              />
            </div>
            <span
              style={
                {
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#C9CDE6",
                } as CSSProperties
              }
            >
              {v.goalCaption}
            </span>
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
            <circle cx={"12"} cy={"9"} r={"6"} />
            <path d={"M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7"} />
          </svg>
          {"\nMilestones\n"}
        </button>
      </nav>
    </div>
  );
}
