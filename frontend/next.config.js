/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
let nextConfig = {}

const withTwin = require('./withTwin.js')
nextConfig = withTwin(nextConfig)

module.exports = nextConfig
