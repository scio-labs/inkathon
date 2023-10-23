/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
let nextConfig = {
  // Fix for warnings about cjs/esm package duplication
  // See: https://github.com/polkadot-js/api/issues/5636
  transpilePackages: [
    '@polkadot/api',
    '@polkadot/api-contract',
    '@polkadot/extension-dapp',
    '@polkadot/extension-inject',
    '@polkadot/keyring',
    '@polkadot/types',
    '@polkadot/types-support',
    '@polkadot/util',
    '@polkadot/util-crypto',
  ],
}

const withTwin = require('./withTwin.js')
nextConfig = withTwin(nextConfig)

module.exports = nextConfig
