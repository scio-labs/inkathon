/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  /* config options here */
}

// eslint-disable-next-line
const withTM = require('next-transpile-modules')(['@yieldgate/contracts'])

module.exports = withTM(nextConfig)
