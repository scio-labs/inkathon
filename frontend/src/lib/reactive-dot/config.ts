import { passethub } from "@polkadot-api/descriptors"
import { defineConfig } from "@reactive-dot/core"
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js"
import { getWsProvider } from "polkadot-api/ws-provider/web"

// Light Client Provider
// const lightClientProvider = createLightClientProvider()

export const config = defineConfig({
  chains: {
    // dev: {
    //   descriptor: dev,
    //   provider: getWsProvider("ws://127.0.0.1:9944"),
    // },
    // pop: {
    //   descriptor: pop,
    //   provider: getWsProvider("wss://rpc1.paseo.popnetwork.xyz"),
    // },
    passethub: {
      descriptor: passethub,
      provider: getWsProvider("wss://testnet-passet-hub.polkadot.io"),
    },
    // Add more chains here
  },
  ssr: true,
  wallets: [new InjectedWalletProvider()],
})
