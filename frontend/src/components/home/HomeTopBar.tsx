import Link from 'next/link'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export const HomeTopBar: FC = () => {
  return (
    <>
      <Link
        href="https://www.youtube.com/watch?v=SoNLZfsd0mQ"
        tw="absolute top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-900 py-3 px-2 text-center font-semibold text-sm text-white/75 hover:text-white"
      >
        <div tw="mr-2 rounded px-1.5 py-0.5 font-bold text-xs text-white bg-[#ee391c]">
          <span tw="mr-1 hidden sm:inline">VIDEO</span>▶
        </div>
        <div tw="font-bold">
          <span tw="hidden sm:inline">Watch the sub0 ink!athon workshop (45 min)</span>
          <span tw="inline sm:hidden">sub0 ink!athon workshop</span>
        </div>
        <HiOutlineExternalLink tw="ml-1.5" />
      </Link>
    </>
  )
}
