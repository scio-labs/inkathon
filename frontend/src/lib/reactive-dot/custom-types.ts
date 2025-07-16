import type { ChainProvider, SignerProvider, useAccounts, useWallets } from "@reactive-dot/react"
import type { ComponentProps } from "react"

export type Wallet = ReturnType<typeof useWallets>[number]

export type WalletAccount = ReturnType<typeof useAccounts>[number]

export type Signer = ComponentProps<typeof SignerProvider>["signer"]

export type ChainId = ComponentProps<typeof ChainProvider>["chainId"]
