'use client'

import Link from 'next/link'
import { FC } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'

export const HomeTopBar: FC = () => {
  return (
    <>
      <Link
        href="https://www.youtube.com/watch?v=SoNLZfsd0mQ"
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-900 py-3 px-2 text-center font-semibold text-sm text-white/75 hover:text-white"
      >
        <div className="mr-2 rounded px-1.5 py-0.5 font-bold text-xs text-white bg-[#ee391c]">
          <span className="mr-1 hidden sm:inline">VIDEO</span>▶
        </div>
        <div className="font-bold">
          <span className="hidden sm:inline">Watch the sub0 ink!athon workshop (45 min)</span>
          <span className="inline sm:hidden">sub0 ink!athon workshop</span>
        </div>
        <HiOutlineExternalLink className="ml-1.5" />
      </Link>
    </>
  )
}
