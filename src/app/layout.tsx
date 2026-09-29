import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/components/reference/fonts.css";
import "@/components/reference/original.css";
import "@/components/reference/responsive.css";
export const metadata: Metadata = {
  title: "Saff — Salah Circles",
  description:
    "Five prayers. One row. Track your salah and grow together with the people you love.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Saff",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D1130",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
