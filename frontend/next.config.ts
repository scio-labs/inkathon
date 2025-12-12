import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // DEBUG
  // logging: {
  //   fetches: { fullUrl: process.env.NEXT_PUBLIC_PRODUCTION_MODE !== "true" },
  // },
  // turbopack: {
  //   debugIds: true,
  // },
  // React Strict Mode
  reactStrictMode: true,
  // Biome
  typescript: {
    ignoreBuildErrors: true,
  },
  // Build Mode (`standalone` for self-hosted builds)
  output: process.env.NEXT_OUTPUT as "standalone" | undefined,
  // Fix Next.js Turbopack Builds in Bun Monorepos
  // Source: https://github.com/vercel/next.js/discussions/55987#discussioncomment-12316599
  // outputFileTracingRoot: path.join(__dirname, "../../"),
}

export default nextConfig
