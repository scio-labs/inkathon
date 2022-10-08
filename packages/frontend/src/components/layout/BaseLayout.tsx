import { FC, PropsWithChildren } from 'react'
import 'twin.macro'

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div tw="min-h-full flex flex-col relative">
        <main tw="grow flex flex-col relative">{children}</main>
      </div>
    </>
  )
}
