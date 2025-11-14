import type { WalletAccount } from '@reactive-dot/core/wallets.js'
import { SignerProvider } from '@reactive-dot/react'
import { createContext, type PropsWithChildren } from 'react'

export const accountContext = createContext<WalletAccount | undefined>(undefined)

export function AccountProvider({
  account,
  children,
}: PropsWithChildren<{
  account: WalletAccount | undefined
}>) {
  return (
    <accountContext.Provider value={account}>
      <SignerProvider signer={account?.polkadotSigner}>{children}</SignerProvider>
    </accountContext.Provider>
  )
}
