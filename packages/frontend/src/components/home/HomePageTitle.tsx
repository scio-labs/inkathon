import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel.svg'
import { FC } from 'react'
import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = 'INK!athon'
  const desc = 'Substrate-based Smart Contract & DApp Development Boilerplate'
  const githubHref = 'https://github.com/scio-labs/inkathon'
  const deployHref = 'https://github.com/scio-labs/inkathon#deployment'

  return (
    <>
      <div tw="flex flex-col items-center text-center font-mono">
        <Link
          href={githubHref}
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
            {title}
          </h1>
        </Link>
        <p tw="mt-1 text-gray-400">{desc}</p>
        <a tw="mt-6" href={deployHref}>
          <Image src={vercelIcon} priority width={92} height={32} alt="Deploy with Vercel" />
        </a>
        <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
      </div>
    </>
  )
}
