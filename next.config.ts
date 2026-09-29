import type { NextConfig } from "next";
const config: NextConfig = {
  distDir: process.env.SAFF_TEST_OUTPUT || ".next",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
};
export default config;
