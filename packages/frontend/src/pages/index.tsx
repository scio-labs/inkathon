import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@components/web3/ConnectButton'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      <CenterBody>
        {/* Title */}
        <div tw="flex flex-col items-center text-center font-mono">
          <Link
            href="https://github.com/scio-labs/inkathon"
            target="_blank"
            tw="mb-4 cursor-pointer opacity-50 hover:opacity-100"
          >
            <Image src={githubIcon} priority width={42} height={42} alt="Github Logo" />
          </Link>
          <h1 tw="font-black text-3xl tracking-tight">INK!athon</h1>
          <p tw="mt-1 text-gray-400">
            Substrate-based Smart Contract & DApp Development Boilerplate
          </p>
          <a tw="mt-6" href="https://github.com/scio-labs/inkathon#deployment">
            <Image src={vercelIcon} priority width={92} height={32} alt="Deploy with Vercel" />
          </a>
          <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
        </div>

        {/* Web3 Connect Button */}
        <ConnectButton />
      </CenterBody>
    </>
  )
}

export default HomePage
