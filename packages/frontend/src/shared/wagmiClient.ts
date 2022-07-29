import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { allChains, Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './environment'

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */

export const defaultChain: Chain = allChains.filter((chain) => env.defaultChain === chain.id)[0]

export const supportedChains: Chain[] = allChains.filter((chain) =>
  env.supportedChains.includes(chain.id)
)

export const { chains, provider } = configureChains(
  Array.from(new Set([defaultChain, ...supportedChains])),
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcUrl = env.rpcUrls[chain.id as keyof typeof env.rpcUrls]
        if (!rpcUrl) {
          throw new Error(`No RPC provided for chain ${chain.id}`)
        }
        return { http: rpcUrl }
      },
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Ethathon',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
