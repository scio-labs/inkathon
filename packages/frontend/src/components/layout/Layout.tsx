import { FC, PropsWithChildren } from 'react'
import 'twin.macro'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main tw="flex-grow">{children}</main>
    </>
  )
}
