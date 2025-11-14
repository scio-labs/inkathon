'use client'

import type { ChainId } from '@reactive-dot/core'
import type { WalletAccount } from '@reactive-dot/core/wallets.js'
import { ChainProvider } from '@reactive-dot/react'
import { Suspense, useState } from 'react'
import { ButtonSkeleton, CardSkeleton } from '@/components/layout/skeletons'
import { Wrapper } from '@/components/layout/wrapper'
import { AccountBalance } from '@/components/web3/account-balance'
import { AccountProvider } from '@/components/web3/account-provider'
import { AccountSelect } from '@/components/web3/account-select'
import { ChainInfoCard } from '@/components/web3/chain-info-card'
import { ChainSelect } from '@/components/web3/chain-select'
import { ContractCard } from '@/components/web3/contract-card'
import { MapAccountButton } from '@/components/web3/map-account-button'

export function App() {
  const [account, setAccount] = useState<WalletAccount>()
  const [chainId, setChainId] = useState<ChainId>('pop')

  return (
    <AccountProvider account={account}>
      <ChainProvider chainId={chainId}>
        <Wrapper className="flex flex-col items-center gap-8">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-4">
            {/* Chain Selector */}
            <Suspense fallback={<ButtonSkeleton />}>
              <ChainSelect chainId={chainId} setChainId={setChainId} />
            </Suspense>

            {/* Connect Button */}
            <Suspense fallback={<ButtonSkeleton />}>
              <AccountSelect account={account} setAccount={setAccount} />
            </Suspense>

            {/* Account Mapping Button */}
            <Suspense>
              <MapAccountButton />
            </Suspense>

            {/* Account Balance */}
            <Suspense>
              <AccountBalance />
            </Suspense>
          </div>

          <div className="flex w-full flex-col gap-8">
            {/* Chain Metadata */}
            <Suspense fallback={<CardSkeleton />}>
              <ChainInfoCard />
            </Suspense>

            {/* Contract Read & Write */}
            <Suspense fallback={<CardSkeleton />}>
              <ContractCard />
            </Suspense>
          </div>
        </Wrapper>
      </ChainProvider>
    </AccountProvider>
  )
}
