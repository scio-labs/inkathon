import dynamic from "next/dynamic"
import type { PropsWithChildren } from "react"

function NoSsrComponent({ children }: PropsWithChildren) {
  return <>{children}</>
}

export const NoSsr = dynamic(() => Promise.resolve(NoSsrComponent), {
  ssr: false,
})
