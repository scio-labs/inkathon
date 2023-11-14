'use client'

import { CenterBody } from '@/app/components/layout/center-body'
import { HomePageTitle } from '@/app/home/home-page-title'
import { HomeTopBar } from '@/app/home/home-top-bar'
import { ChainInfo } from '@/app/web3/chain-info'
import { ConnectButton } from '@/app/web3/connect-button'
import { GreeterContractInteractions } from '@/app/web3/greeter-contract-interactions'
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

      <CenterBody className="mb-10 mt-20 px-5">
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
      </CenterBody>
    </>
  )
}

export default HomePage
