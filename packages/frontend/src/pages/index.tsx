import { HomePageTitle } from '@components/home/HomePageTitle'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ChainInfo } from '@components/web3/ChainInfo'
import { ConnectButton } from '@components/web3/ConnectButton'
import { GreeterContractInteractions } from '@components/web3/GreeterContractInteractions'
import type { NextPage } from 'next'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      {/* Top Bar */}
      <HomeTopBar />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}
        <HomePageTitle />

        {/* Connect Wallet Button */}
        <ConnectButton />

        {/* Chain Metadata Information */}
        <ChainInfo />

        {/* Greeter Read/Write Contract Interactions */}
        <GreeterContractInteractions />
      </CenterBody>
    </>
  )
}

export default HomePage
