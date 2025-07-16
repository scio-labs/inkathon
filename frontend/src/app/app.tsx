"use client"

import { ChainProvider } from "@reactive-dot/react"
import { type ComponentProps, Suspense, useState } from "react"
import { ButtonSkeleton, CardSkeleton } from "@/components/layout/skeletons"
import { Wrapper } from "@/components/layout/wrapper"
import { AccountBalance } from "@/components/web3/account-balance"
import { ChainMetaCard } from "@/components/web3/chain-meta-card"
import { ChainSelect } from "@/components/web3/chain-select"
import { ConnectButton } from "@/components/web3/connect-button"
import { ContractCard } from "@/components/web3/contract-card"

type ChainId = ComponentProps<typeof ChainProvider>["chainId"]

export function App() {
  const [chainId, setChainId] = useState<ChainId>("passethub")

  return (
    <ChainProvider chainId={chainId}>
      <Wrapper className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-4 max-sm:flex-col">
          {/* Chain Selector */}
          <Suspense fallback={<ButtonSkeleton />}>
            <ChainSelect chainId={chainId} setChainId={setChainId} />
          </Suspense>

          {/* Connect Button */}
          <Suspense fallback={<ButtonSkeleton />}>
            <ConnectButton />
          </Suspense>

          {/* Account Balance */}
          <Suspense>
            <AccountBalance />
          </Suspense>
        </div>

        <div className="flex w-full flex-col gap-8">
          {/* Chain Metadata */}
          <Suspense fallback={<CardSkeleton />}>
            <ChainMetaCard />
          </Suspense>

          {/* Contract Read & Write */}
          <Suspense fallback={<CardSkeleton />}>
            <ContractCard />
          </Suspense>
        </div>
      </Wrapper>
    </ChainProvider>
  )
}
