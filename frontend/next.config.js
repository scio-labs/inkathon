/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  // Fix for warnings about cjs/esm package duplication
  // See: https://github.com/polkadot-js/api/issues/5636
  transpilePackages: [
    '**@polkadot/**',
    '@polkadot/api',
    '@polkadot/api-contract',
    '@polkadot/extension-dapp',
    '@polkadot/extension-inject',
    '@polkadot/keyring',
    '@polkadot/types',
    '@polkadot/util',
    '@polkadot/util-crypto',
  ],
}

module.exports = nextConfig
