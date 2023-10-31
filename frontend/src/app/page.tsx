'use client'

import { HomePageTitle } from '@/app/home/HomePageTitle'
import { HomeTopBar } from '@/app/home/HomeTopBar'
import { ChainInfo } from '@/app/web3/ChainInfo'
import { ConnectButton } from '@/app/web3/ConnectButton'
import { GreeterContractInteractions } from '@/app/web3/GreeterContractInteractions'
import { CenterBody } from '@/components/next/CenterBody'
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

      <CenterBody className="mt-20 mb-10 px-5">
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
