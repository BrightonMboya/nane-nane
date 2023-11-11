// Importing env files here to validate on build
import "./src/env.mjs";
import "@repo/auth/env.mjs";
import withPWA from 'next-pwa';

/** @type {import("next").NextConfig} */
const config = withPWA({
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@repo/api", "@repo/auth", "@repo/db", "@repo/ui"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.sanity.io",
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});

export default config;
