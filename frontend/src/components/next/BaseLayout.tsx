import { FC, PropsWithChildren } from 'react'

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="relative flex grow min-h-full h-full flex-col">{children}</main>
    </>
  )
}
