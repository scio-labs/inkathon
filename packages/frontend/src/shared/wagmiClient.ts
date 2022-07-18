import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { allChains, Chain, chain, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './environment'

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */

export const rpcsByChainId: {
  [chainId: number]: string
} = {
  [1337]: env.rpc.hardhat,
  [chain.rinkeby.id]: env.rpc.rinkeby,
  [chain.mainnet.id]: env.rpc.mainnet,
}

export const defaultChain: Chain = allChains.filter((chain) => env.defaultChain === chain.id)[0]

export const supportedChains: Chain[] = allChains.filter((chain) =>
  env.supportedChains.includes(chain.id)
)

export const { chains, provider } = configureChains(
  Array.from(new Set([defaultChain, ...supportedChains])),
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcUrl = rpcsByChainId?.[chain.id]
        return rpcUrl ? { http: rpcUrl } : null
      },
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'TODO',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
