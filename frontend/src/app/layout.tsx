import { BaseLayout } from '@/components/layout/base-layout'
import { HotToastConfig } from '@/components/layout/hot-toast-config'
import { env } from '@/config/environment'
import { Metadata, Viewport } from 'next'
import { Inconsolata } from 'next/font/google'
import { PropsWithChildren } from 'react'
import './globals.css'
import ClientProviders from './providers'

const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' })

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  title: 'ink!athon Boilerplate',
  description: 'Full-Stack DApp Boilerplate for ink! Smart Contracts',
  metadataBase: new URL(env.url),
  robots: env.isProduction ? 'all' : 'noindex,nofollow',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: env.url,
    siteName: 'ink!athon Boilerplate',
    images: [
      {
        url: '/images/inkathon-og-banner.jpg',
        width: 1280,
        height: 640,
      },
    ],
  },
  twitter: {
    site: '@scio_xyz',
    creator: '@scio_xyz',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body className={inconsolata.variable}>
        <ClientProviders>
          <BaseLayout>{children}</BaseLayout>
          <HotToastConfig />
        </ClientProviders>
      </body>
    </html>
  )
}
