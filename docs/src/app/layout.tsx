import "@/app/global.css"
import { NextProvider } from "fumadocs-core/framework/next"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { template: "%s - inkathon Docs", default: "inkathon Docs" },
  description:
    "Next generation full-stack boilerplate for ink! smart contracts running on PolkaVM. Powered by Papi, ReactiveDOT, Pop CLI, and more.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="dark flex min-h-screen flex-col">
        <NextProvider>{children}</NextProvider>
      </body>
    </html>
  )
}
