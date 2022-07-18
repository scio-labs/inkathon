/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const env = {
  url:
    process.env.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_ENV! === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_URL,
  isProduction: process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true',

  defaultChain: parseInt(process.env.NEXT_PUBLIC_DEFAULT_CHAIN!),
  supportedChains: JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_CHAINS!),

  rpc: {
    hardhat: process.env.NEXT_PUBLIC_RPC_HARDHAT!,
    rinkeby: process.env.NEXT_PUBLIC_RPC_RINKEBY!,
    mainnet: process.env.NEXT_PUBLIC_RPC_MAINNET!,
  },
}
