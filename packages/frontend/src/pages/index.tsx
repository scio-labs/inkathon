import { Spinner } from '@chakra-ui/react'
import { HomeTopBar } from '@components/home/HomeTopBar'
import { CenterBody } from '@components/layout/CenterBody'
import { ChainInfo } from '@components/web3/ChainInfo'
import { ConnectButton } from '@components/web3/ConnectButton'
import { GreeterContractInteractions } from '@components/web3/GreeterContractInteractions'
import { usePolkadotProviderContext } from '@components/web3/PolkadotProvider'
import { env } from '@shared/environment'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import 'twin.macro'

const HomePage: NextPage = () => {
  const { api } = usePolkadotProviderContext()

  return (
    <>
      {/* Top Bar */}
      <HomeTopBar href="https://ethathon.xyz">
        <div tw="font-bold">ETHathon</div>
        <div tw="hidden sm:inline"> – EVM-based DApp Boilerplate</div>
      </HomeTopBar>

      <CenterBody tw="my-12">
        {/* Title */}
        <div tw="flex flex-col items-center text-center font-mono">
          <Link
            href="https://github.com/scio-labs/inkathon"
            target="_blank"
            className="group"
            tw="flex cursor-pointer flex-col items-center"
          >
            <Image
              src={githubIcon}
              priority
              width={42}
              alt="Github Logo"
              tw="opacity-50 group-hover:opacity-100"
            />
            <h1 tw="mt-4 font-black text-3xl tracking-tight underline-offset-4 group-hover:underline">
              INK!athon
            </h1>
          </Link>
          <p tw="mt-1 text-gray-400">
            Substrate-based Smart Contract & DApp Development Boilerplate
          </p>
          <a tw="mt-6" href="https://github.com/scio-labs/inkathon#deployment">
            <Image src={vercelIcon} priority width={92} height={32} alt="Deploy with Vercel" />
          </a>
          <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
        </div>

        {/* Connect Wallet Button */}
        <ConnectButton />

        {!!api ? (
          <>
            <ChainInfo />
            <GreeterContractInteractions />
          </>
        ) : (
          <div tw="mt-8 mb-4 flex items-center space-x-3 text-gray-400">
            <Spinner size="sm" />
            <div tw="font-mono">Connecting to RPC ({env.rpcEndpoint})</div>
          </div>
        )}
      </CenterBody>
    </>
  )
}

export default HomePage
