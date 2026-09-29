"use client";
// Faithful React port of the supplied Saff welcome screen.
import { Fragment, type CSSProperties } from "react";
import type { ReferenceValues } from "./types";
export default function WelcomeReference({ v }: { v: ReferenceValues }) {
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
      className={"reference-screen reference-welcome"}
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
            <stop offset={"0"} stopColor={"#000000"} stopOpacity={"0.5"} />
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
        className={"halo"}
        style={
          {
            position: "absolute",
            left: "-35px",
            top: "60px",
            width: "460px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(108,84,214,0.5), rgba(108,84,214,0) 62%)",
          } as CSSProperties
        }
      />
      <div
        aria-hidden={"true"}
        style={
          {
            position: "absolute",
            left: "95px",
            top: "170px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,185,66,0.35), rgba(245,185,66,0) 65%)",
          } as CSSProperties
        }
      />
      <div aria-hidden={"true"}>
        <span
          className={"star"}
          style={
            { left: "30px", top: "40px", animationDelay: "0s" } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "88px",
              top: "70px",
              animationDelay: "1.3s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "150px",
              top: "32px",
              animationDelay: "0.6s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "240px",
              top: "58px",
              animationDelay: "2s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "318px",
              top: "36px",
              animationDelay: "0.9s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "360px",
              top: "110px",
              animationDelay: "1.7s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "20px",
              top: "150px",
              animationDelay: "2.4s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "370px",
              top: "270px",
              animationDelay: "0.3s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "14px",
              top: "300px",
              animationDelay: "1.1s",
            } as CSSProperties
          }
        />
        <span
          className={"star"}
          style={
            {
              left: "200px",
              top: "80px",
              animationDelay: "2.8s",
            } as CSSProperties
          }
        />
      </div>
      <svg
        aria-hidden={"true"}
        width={"390"}
        height={"300"}
        viewBox={"0 0 390 300"}
        style={{ position: "absolute", left: "0", top: "0" } as CSSProperties}
      >
        <path
          className={"orbit"}
          d={"M55 270 A140 140 0 0 1 335 270"}
          fill={"none"}
          stroke={"rgba(255,255,255,0.18)"}
          strokeWidth={"1.5"}
          strokeDasharray={"2 8"}
          strokeLinecap={"round"}
        />
      </svg>
      <div
        className={"popin"}
        style={
          {
            position: "absolute",
            left: "115px",
            top: "180px",
            width: "160px",
            height: "160px",
            animationDelay: "0.1s",
          } as CSSProperties
        }
      >
        <div
          className={"float"}
          style={{ width: "160px", height: "160px" } as CSSProperties}
        >
          <svg
            viewBox={"0 0 64 64"}
            width={"160"}
            height={"160"}
            role={"img"}
            aria-label={"Saff mark: five arches standing in a row"}
          >
            <ellipse
              cx={"32"}
              cy={"58.5"}
              rx={"27"}
              ry={"3"}
              fill={"url(#gShadow)"}
            />
            <path
              className={"arch"}
              style={{ animationDelay: "0.5s" } as CSSProperties}
              d={"M4 54 V34.5 A4.5 4.5 0 0 1 13 34.5 V54 Z"}
              fill={"url(#gArch)"}
            />
            <path
              className={"arch"}
              style={{ animationDelay: "0.4s" } as CSSProperties}
              d={"M15.75 54 V28.5 A4.5 4.5 0 0 1 24.75 28.5 V54 Z"}
              fill={"url(#gArch)"}
            />
            <path
              className={"arch"}
              style={{ animationDelay: "0.3s" } as CSSProperties}
              d={"M27.5 54 V18.5 A4.5 4.5 0 0 1 36.5 18.5 V54 Z"}
              fill={"url(#gArchC)"}
            />
            <path
              className={"arch"}
              style={{ animationDelay: "0.4s" } as CSSProperties}
              d={"M39.25 54 V28.5 A4.5 4.5 0 0 1 48.25 28.5 V54 Z"}
              fill={"url(#gArch)"}
            />
            <path
              className={"arch"}
              style={{ animationDelay: "0.5s" } as CSSProperties}
              d={"M51 54 V34.5 A4.5 4.5 0 0 1 60 34.5 V54 Z"}
              fill={"url(#gArch)"}
            />
            <rect
              className={"arch"}
              style={{ animationDelay: "0.7s" } as CSSProperties}
              x={"6"}
              y={"34"}
              width={"2"}
              height={"14"}
              rx={"1"}
              fill={"#ffffff"}
              opacity={"0.55"}
            />
            <rect
              className={"arch"}
              style={{ animationDelay: "0.6s" } as CSSProperties}
              x={"17.75"}
              y={"28"}
              width={"2"}
              height={"20"}
              rx={"1"}
              fill={"#ffffff"}
              opacity={"0.55"}
            />
            <rect
              className={"arch"}
              style={{ animationDelay: "0.5s" } as CSSProperties}
              x={"29.5"}
              y={"18"}
              width={"2"}
              height={"30"}
              rx={"1"}
              fill={"#ffffff"}
              opacity={"0.6"}
            />
            <rect
              className={"arch"}
              style={{ animationDelay: "0.6s" } as CSSProperties}
              x={"41.25"}
              y={"28"}
              width={"2"}
              height={"20"}
              rx={"1"}
              fill={"#ffffff"}
              opacity={"0.55"}
            />
            <rect
              className={"arch"}
              style={{ animationDelay: "0.7s" } as CSSProperties}
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
                "M32 2 C32.8 6.2 32.8 6.2 37 7 C32.8 7.8 32.8 7.8 32 12 C31.2 7.8 31.2 7.8 27 7 C31.2 6.2 31.2 6.2 32 2 Z"
              }
              fill={"url(#gStar)"}
            />
          </svg>
        </div>
      </div>
      {(v.orbs ?? []).map((o: any, index: number) => (
        <Fragment key={index}>
          <div
            className={"popin"}
            style={
              {
                position: "absolute",
                left: String(o.x) + "px",
                top: String(o.y) + "px",
                width: "56px",
                height: "56px",
                animationDelay: o.delay,
              } as CSSProperties
            }
          >
            <div
              className={"float"}
              style={{ animationDelay: o.fdelay } as CSSProperties}
            >
              <button
                className={o.cls}
                onClick={o.pick}
                aria-pressed={o.sel}
                aria-label={o.name}
              >
                <svg
                  viewBox={"0 0 64 64"}
                  width={"46"}
                  height={"46"}
                  aria-hidden={"true"}
                >
                  <use href={o.icon} />
                </svg>
              </button>
            </div>
          </div>
        </Fragment>
      ))}
      <div
        aria-live={"polite"}
        style={
          {
            position: "absolute",
            left: "20px",
            right: "20px",
            top: "356px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          } as CSSProperties
        }
      >
        {!!v.picked && (
          <>
            <div
              className={"cap"}
              style={
                {
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                } as CSSProperties
              }
            >
              <span>{v.cap.name}</span>
              <span
                className={"ar"}
                style={{ fontSize: "18px", color: "#F5B942" } as CSSProperties}
              >
                {v.cap.ar}
              </span>
              <span
                style={{ color: "#A7ADCF", fontWeight: "600" } as CSSProperties}
              >
                {"· " + String(v.cap.sub)}
              </span>
            </div>
          </>
        )}
        {!!v.notPicked && (
          <>
            <div
              style={
                {
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#A7ADCF",
                } as CSSProperties
              }
            >
              {"Five prayers. One row. Tap a prayer."}
            </div>
          </>
        )}
      </div>
      <div
        style={
          {
            position: "absolute",
            left: "24px",
            right: "24px",
            top: "404px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            textAlign: "center",
          } as CSSProperties
        }
      >
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.6s",
              display: "flex",
              alignItems: "baseline",
              gap: "14px",
            } as CSSProperties
          }
        >
          <span
            className={"disp"}
            style={
              {
                fontSize: "68px",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1",
              } as CSSProperties
            }
          >
            {"Saff"}
          </span>
          <span
            className={"ar"}
            style={
              {
                fontSize: "40px",
                fontWeight: "700",
                color: "#F5B942",
                lineHeight: "1",
              } as CSSProperties
            }
          >
            {"صفّ"}
          </span>
        </div>
        <div
          className={"enter disp"}
          style={
            {
              animationDelay: "0.7s",
              fontSize: "22px",
              fontWeight: "600",
              lineHeight: "1.25",
              textWrap: "balance",
            } as CSSProperties
          }
        >
          {"Pray side by side with the people you love."}
        </div>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "0.8s",
              fontSize: "15px",
              fontWeight: "500",
              lineHeight: "1.5",
              color: "#C9CDE6",
              textWrap: "pretty",
              maxWidth: "310px",
            } as CSSProperties
          }
        >
          {
            "Track your five daily prayers, share them with a small circle, and gently keep each other going."
          }
        </div>
      </div>
      <div
        style={
          {
            position: "absolute",
            left: "24px",
            right: "24px",
            bottom: "44px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          } as CSSProperties
        }
      >
        <button
          className={"cta primary enter"}
          style={
            {
              animationDelay: "0.9s",
              height: "56px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "#F5B942",
              color: "#1A1400",
              fontSize: "16px",
              fontWeight: "800",
            } as CSSProperties
          }
          data-reference-link={"true"}
          onClick={v.startCircle}
        >
          {"\nStart a circle\n"}
          <svg
            viewBox={"0 0 24 24"}
            width={"18"}
            height={"18"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"2.4"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <path d={"M5 12h14"} />
            <path d={"M13 6l6 6-6 6"} />
          </svg>
        </button>
        <button
          className={"cta ghost enter"}
          style={
            {
              animationDelay: "1s",
              height: "56px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#F6F2E9",
              fontSize: "16px",
              fontWeight: "700",
            } as CSSProperties
          }
          data-reference-link={"true"}
          onClick={v.joinCircle}
        >
          {"Join with an invite code"}
        </button>
        <div
          className={"enter"}
          style={
            {
              animationDelay: "1.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#A7ADCF",
            } as CSSProperties
          }
        >
          <svg
            viewBox={"0 0 24 24"}
            width={"14"}
            height={"14"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            aria-hidden={"true"}
          >
            <rect x={"5"} y={"11"} width={"14"} height={"9"} rx={"2"} />
            <path d={"M8 11V8a4 4 0 0 1 8 0v3"} />
          </svg>
          {"\nOnly your circle sees your salah.\n"}
        </div>
      </div>
    </div>
  );
}
