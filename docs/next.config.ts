import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

let nextConfig: NextConfig = {
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
  // Dev Indicators
  devIndicators: {
    position: "bottom-right",
  },
  // Images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inkathon.xyz",
      },
    ],
  },
  // Redirects
  redirects: async () => {
    return [
      {
        source: "/learn",
        destination: "/learn/structure",
        permanent: false,
      },
      {
        source: "/guides",
        destination: "/guides/contract-development",
        permanent: false,
      },
      {
        source: "/resources",
        destination: "/resources/ecosystem",
        permanent: false,
      },
    ]
  },
}

// Apply FumaDocs MDX
const withMDX = createMDX()
nextConfig = withMDX(nextConfig)

export default nextConfig
