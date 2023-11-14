import { FC, PropsWithChildren } from 'react'

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="relative flex h-full min-h-full grow flex-col">{children}</main>
    </>
  )
}
