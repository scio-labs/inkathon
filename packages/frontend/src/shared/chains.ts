import { PolkadotProviderChain } from '@components/web3/PolkadotProvider'
import { env } from '@shared/environment'

/**
 * Defined Chain Constants#
 * TODO Add more chains and outsource in own repository
 */
export const development: PolkadotProviderChain = {
  network: 'development',
  name: 'Local Development',
  testnet: true,
  rpcUrls: ['ws://127.0.0.1:9944'],
}

export const alephzeroTestnet: PolkadotProviderChain = {
  network: 'alephzero-testnet',
  name: 'Aleph Zero Testnet',
  testnet: true,
  rpcUrls: ['wss://ws.test.azero.dev'],
}

/**
 * Helper functions to extract all chains, default chain, and supported chains
 * defined within environment (see `.env.local.example`)
 */
export const allChains: PolkadotProviderChain[] = [development, alephzeroTestnet]

export const defaultChain: PolkadotProviderChain = allChains.filter(
  (chain) => env.defaultChain === chain.network.trim().toLowerCase(),
)[0]

export const supportedChains: PolkadotProviderChain[] = allChains.filter((chain) =>
  env.supportedChains.includes(chain.network.trim().toLowerCase()),
)
