'use client'

import { HomePageTitle } from '@/app/components/home-page-title'
import { HomeTopBar } from '@/app/components/home-top-bar'
import { ChainInfo } from '@/components/web3/chain-info'
import { ConnectButton } from '@/components/web3/connect-button'
import { GreeterContractInteractions } from '@/components/web3/greeter-contract-interactions'
import { useInkathon } from '@scio-labs/use-inkathon'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const HomePage: NextPage = () => {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <div className="relative mt-20 flex grow flex-col items-center justify-center px-5 pb-10">
        {/* Title */}
        <HomePageTitle />

        {/* Connect Wallet Button */}
        <ConnectButton />

        <div className="mt-10 flex w-full flex-wrap items-start justify-center gap-4">
          {/* Chain Metadata Information */}
          <ChainInfo />

          {/* Greeter Read/Write Contract Interactions */}
          <GreeterContractInteractions />
        </div>
      </div>
    </>
  )
}

export default HomePage
