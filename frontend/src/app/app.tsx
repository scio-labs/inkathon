"use client"

import { ChainProvider } from "@reactive-dot/react"
import { type ComponentProps, Suspense, useState } from "react"
import { Wrapper } from "@/components/layout/wrapper"
import { Button, type ButtonProps } from "@/components/ui/button-extended"
import { ChainMetaCard } from "@/components/web3/chain-meta-card"
import { ChainSelect } from "@/components/web3/chain-select"
import { ConnectButton } from "@/components/web3/connect-button"
import { ContractCard } from "@/components/web3/contract-card"

type ChainId = ComponentProps<typeof ChainProvider>["chainId"]

export function App() {
  const [chainId, setChainId] = useState<ChainId>("pop")

  return (
    <ChainProvider chainId={chainId}>
      <Wrapper className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-4">
          {/* Chain Selector */}
          <Suspense fallback={<ButtonSkeleton />}>
            <ChainSelect chainId={chainId} setChainId={setChainId} />
            <ConnectButton />
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

export function AppSkeleton() {
  return (
    <Wrapper size="md" className="flex flex-col items-center gap-8">
      <ButtonSkeleton />

      <div className="flex w-full flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </Wrapper>
  )
}

export function CardSkeleton() {
  return <div className="glass-card h-[250px] animate-pulse" />
}

export function ButtonSkeleton(props: ButtonProps) {
  return (
    <Button
      size="lg"
      variant="glass"
      className="w-[200px]"
      isLoading
      loadingText="Initializing..."
      {...props}
    />
  )
}
