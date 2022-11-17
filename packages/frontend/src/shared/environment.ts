/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Environment Variables defined in `.env.local`.
 * See `env.local.example` for documentation.
 */
export const env = {
  url:
    process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_ENV! === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_URL,
  isProduction: process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true',

  defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN!,
  supportedChains: !!process.env.NEXT_PUBLIC_SUPPORTED_CHAINS
    ? JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_CHAINS!)
    : [process.env.NEXT_PUBLIC_DEFAULT_CHAIN!],
}
