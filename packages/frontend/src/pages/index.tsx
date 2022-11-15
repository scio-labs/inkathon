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

        {/* Web3 Connect Button */}
        <ConnectButton />
      </CenterBody>
    </>
  )
}

export default HomePage
