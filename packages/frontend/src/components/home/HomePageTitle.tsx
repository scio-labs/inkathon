import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/github-button.svg'
import githubCircleIcon from 'public/icons/github.svg'
import vercelIcon from 'public/icons/vercel-button.svg'
import { FC } from 'react'
import 'twin.macro'

export const HomePageTitle: FC = () => {
  const title = 'INK!athon'
  const desc = 'Full-Stack DApp Boilerplate for Substrate and ink! Smart Contracts'
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
          {/* Github Icon */}
          <Image
            src={githubCircleIcon}
            priority
            width={50}
            alt="Github Logo"
            tw="opacity-50 group-hover:opacity-100"
          />
          {/* Title */}
          <h1 tw="mt-4 font-black text-4xl tracking-tight">{title}</h1>
        </Link>

        {/* Tagline & Links */}
        <p tw="mt-1 text-gray-600 text-sm">
          By{' '}
          <a
            href="https://zoma.dev"
            target="_blank"
            tw="font-semibold text-gray-500 hover:text-gray-100"
          >
            Dennis Zoma
          </a>{' '}
          &{' '}
          <a
            href="https://scio.xyz"
            target="_blank"
            tw="font-semibold text-gray-500 hover:text-gray-100"
          >
            Scio Labs
          </a>
        </p>
        <p tw="mt-4 mb-6 text-gray-400">{desc}</p>

        {/* Github & Vercel Buttons */}
        <div tw="flex space-x-2">
          <Link tw="opacity-80 hover:opacity-100" href={githubHref} target="_blank">
            <Image src={githubIcon} priority width={92} alt="Github Repository" />
          </Link>
          <Link tw="opacity-80 hover:opacity-100" href={deployHref} target="_blank">
            <Image src={vercelIcon} priority width={92} alt="Deploy with Vercel" />
          </Link>
        </div>
        <div tw="my-14 w-14 bg-gray-800 h-[2px]" />
      </div>
    </>
  )
}
