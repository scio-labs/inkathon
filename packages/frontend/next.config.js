/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@ethathon/contracts'])

module.exports = withTM(nextConfig)
