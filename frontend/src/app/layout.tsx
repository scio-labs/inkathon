import type { Metadata } from "next"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { siteMetadata } from "@/lib/metadata"
import { cn } from "../lib/utils"
import { fontStyles } from "../styles/fonts"

import "../styles/globals.css"

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={cn(fontStyles, "dark")} suppressHydrationWarning>
      <body className="relative flex h-full min-h-screen flex-col">
        <Toaster position="top-center" closeButton />

        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
