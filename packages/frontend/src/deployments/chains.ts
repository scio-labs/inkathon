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
  explorerUrls: ['https://polkadot.js.org/apps/#/explorer?rpc=ws://127.0.0.1:9944'],
  testnet: true,
  faucetUrls: ['https://polkadot.js.org/apps/#/accounts?rpc=ws://127.0.0.1:9944'],
}

export const alephzeroTestnet: PolkadotProviderChain = {
  network: 'alephzero-testnet',
  name: 'Aleph Zero Testnet',
  rpcUrls: ['wss://ws.test.azero.dev'],
  explorerUrls: ['https://test.azero.dev/'],
  testnet: true,
  faucetUrls: ['https://faucet.test.azero.dev/'],
}

export const alephzeroSmartnet: PolkadotProviderChain = {
  network: 'alephzero-smartnet',
  name: 'Aleph Zero Smartnet',
  rpcUrls: ['wss://ws-smartnet.test.azero.dev/'],
  explorerUrls: ['https://azero.dev/?rpc=wss%3A%2F%2Fws-smartnet.test.azero.dev'],
  testnet: true,
  faucetUrls: ['https://faucet-smartnet.test.azero.dev/'],
}

export const polkadot: PolkadotProviderChain = {
  network: 'polkadot',
  name: 'Polkadot',
  rpcUrls: ['wss://rpc.polkadot.io'],
  explorerUrls: ['https://polkadot.subscan.io/'],
}

export const kusama: PolkadotProviderChain = {
  network: 'kusama',
  name: 'Kusama',
  rpcUrls: ['wss://kusama-rpc.polkadot.io'],
  explorerUrls: ['https://kusama.subscan.io/'],
  faucetUrls: ['https://guide.kusama.network/docs/kusama-claims/'],
}

export const westend: PolkadotProviderChain = {
  network: 'westend',
  name: 'Westend',
  rpcUrls: ['wss://westend-rpc.polkadot.io'],
  explorerUrls: ['https://westend.subscan.io/'],
  testnet: true,
  faucetUrls: ['https://matrix.to/#/#westend_faucet:matrix.org'],
}

export const rococo: PolkadotProviderChain = {
  network: 'rococo',
  name: 'Rococo',
  rpcUrls: ['wss://rococo-rpc.polkadot.io'],
  testnet: true,
  faucetUrls: ['https://matrix.to/#/#rococo-faucet:matrix.org'],
  explorerUrls: ['https://rococo.subscan.io/'],
}

export const astar: PolkadotProviderChain = {
  network: 'astar',
  name: 'Astar',
  rpcUrls: ['wss://astar.public.blastapi.io', 'wss://astar-rpc.dwellir.com'],
  faucetUrls: [],
  explorerUrls: ['https://astar.subscan.io/'],
}

export const shiden: PolkadotProviderChain = {
  network: 'shiden',
  name: 'Shiden',
  rpcUrls: ['wss://shiden.public.blastapi.io', 'wss://shiden-rpc.dwellir.com'],
  explorerUrls: ['https://shiden.subscan.io/'],
}

export const shibuya: PolkadotProviderChain = {
  network: 'shibuya',
  name: 'Shibuya',
  rpcUrls: ['wss://shibuya.public.blastapi.io', 'wss://shibuya-rpc.dwellir.com'],
  testnet: true,
  faucetUrls: ['https://docs.astar.network/docs/quickstart/faucet'],
  explorerUrls: ['https://shibuya.subscan.io/'],
}

/**
 * Helper functions to extract all chains, default chain, and supported chains
 * defined within environment (see `.env.local.example`)
 */
export const allChains: PolkadotProviderChain[] = [
  development,
  alephzeroTestnet,
  alephzeroSmartnet,
  polkadot,
  kusama,
  westend,
  rococo,
  astar,
  shiden,
  shibuya,
]

export const defaultChain: PolkadotProviderChain = allChains.filter(
  (chain) => env.defaultChain === chain.network,
)[0]

export const supportedChains: PolkadotProviderChain[] = allChains.filter((chain) =>
  env.supportedChains.includes(chain.network),
)
