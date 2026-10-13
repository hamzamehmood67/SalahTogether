import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";
// Phones on the same network open the dev server by this machine's LAN address.
const lanHosts = Object.values(networkInterfaces())
  .flat()
  .flatMap((a) => (a && a.family === "IPv4" && !a.internal ? [a.address] : []));
const config: NextConfig = {
  distDir: process.env.SAFF_TEST_OUTPUT || ".next",
  allowedDevOrigins: ["127.0.0.1", "localhost", ...lanHosts],
  devIndicators: false,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        // Location is used for prayer times; nothing else is requested.
        {
          key: "Permissions-Policy",
          value: "geolocation=(self), camera=(), microphone=(), payment=()",
        },
      ],
    },
  ],
};
export default config;
