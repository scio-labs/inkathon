import { PolkadotProviderChain } from '@components/web3/PolkadotProvider'
import { env } from '@shared/environment'

/**
 * Defined Chain Constants
 * NOTE: You can add chains and update RPCs yourself.
 */
export const development: PolkadotProviderChain = {
  network: 'development',
  name: 'Local Development',
  rpcUrls: ['ws://127.0.0.1:9944'],
  testnet: true,
  faucetUrls: ['https://polkadot.js.org/apps/#/accounts?rpc=ws://127.0.0.1:9944'],
}

export const alephzeroTestnet: PolkadotProviderChain = {
  network: 'alephzero-testnet',
  name: 'Aleph Zero Testnet',
  rpcUrls: ['wss://ws.test.azero.dev'],
  testnet: true,
  faucetUrls: ['https://faucet.test.azero.dev/'],
}

/**
 * Helper functions to extract all chains, default chain, and supported chains
 * defined within environment (see `.env.local.example`)
 */
export const allChains: PolkadotProviderChain[] = [development, alephzeroTestnet]

export const defaultChain: PolkadotProviderChain = allChains.filter(
  (chain) => env.defaultChain === chain.network,
)[0]

export const supportedChains: PolkadotProviderChain[] = allChains.filter((chain) =>
  env.supportedChains.includes(chain.network),
)
