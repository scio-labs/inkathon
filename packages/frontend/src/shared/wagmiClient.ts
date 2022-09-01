import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { allChains, chain, Chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './environment'

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */

export const defaultChain: Chain | undefined = allChains.find(
  (chain) => env.defaultChain === chain.id
)

export const isChainSupported = (chainId?: number): boolean => {
  return chainId && env.supportedChains.includes(chainId)
}
export const supportedChains: Chain[] = allChains.filter((chain) => isChainSupported(chain.id))

export const getRpcUrl = (chainId: number): string => {
  return env.rpcUrls[chainId as keyof typeof env.rpcUrls]
}

export const {
  chains: [, ...chains],
  provider,
} = configureChains(
  Array.from(new Set([chain.mainnet, defaultChain, ...supportedChains])).filter(Boolean) as Chain[],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcUrl = getRpcUrl(chain.id)
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
