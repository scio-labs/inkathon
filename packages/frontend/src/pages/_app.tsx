import { BaseLayout } from '@components/layout/BaseLayout'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { chains, wagmiClient } from '@shared/wagmiClient'
import GlobalStyles from '@styles/GlobalStyles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
// import { DefaultSeo } from 'next-seo'

// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* SEO TODO */}
      {/* <DefaultSeo
        dangerouslySetAllPagesToNoFollow={!env.isProduction}
        dangerouslySetAllPagesToNoIndex={!env.isProduction}
        defaultTitle="TODO"
        titleTemplate="%s | TODO"
        description="TODO"
        openGraph={{
          type: 'website',
          locale: 'en',
          url: env.url,
          site_name: 'TODO',
          images: [
            {
              url: `${env.url}/og/TODO.jpg`,
              width: 1200,
              height: 670,
            },
          ],
        }}
        twitter={{
          handle: '@TODO',
        }}
      /> */}

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CacheProvider value={cache}>
        <GlobalStyles />

        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode={true}>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </RainbowKitProvider>
        </WagmiConfig>

        <Toaster
          toastOptions={{
            position: 'top-center',
            style: {
              wordBreak: 'break-all',
              maxWidth: '30rem',
              background: '#1a1b1f',
              color: 'white',
              borderRadius: '12px',
            },
            success: {
              duration: 5000,
            },
          }}
        />
      </CacheProvider>
    </>
  )
}

export default MyApp
