"use client"

import { ReactiveDotProvider } from "@reactive-dot/react"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { config } from "@/lib/reactive-dot/config"
import { App } from "./app"

export default function Home() {
  return (
    <div className="flex grow flex-col items-center justify-center py-8">
      <Header />

      <ReactiveDotProvider config={config}>
        <App />
      </ReactiveDotProvider>

      <Footer />
    </div>
  )
}
