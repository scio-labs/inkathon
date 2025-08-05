import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Biome
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
}

export default withMDX(config)
