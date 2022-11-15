import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export interface HomeTopBarProps extends PropsWithChildren {
  href: string
}
export const HomeTopBar: FC<HomeTopBarProps> = ({ children, href }) => {
  return (
    <>
      <Link
        href={href}
        tw="absolute top-0 left-0 right-0 z-10 flex items-center justify-center whitespace-pre-wrap bg-gray-900 py-2 px-2 text-center font-semibold text-sm text-white/75 hover:text-white"
      >
        {children}
        <HiOutlineExternalLink tw="ml-1.5" />
      </Link>
    </>
  )
}
