import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { BaseLayout } from '@components/layout/BaseLayout'
import { HotToastConfig } from '@components/layout/HotToastConfig'
import { getDeployments } from '@deployments/deployments'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'
import { env } from '@shared/environment'
import GlobalStyles from '@styles/GlobalStyles'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { toast } from 'react-hot-toast'

// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* TODO SEO */}
      <DefaultSeo
        dangerouslySetAllPagesToNoFollow={!env.isProduction}
        dangerouslySetAllPagesToNoIndex={!env.isProduction}
        defaultTitle="INK!athon" // TODO
        titleTemplate="%s | INK!athon" // TODO
        description="Substrate-based Smart Contract & DApp Development Boilerplate" // TODO
        openGraph={{
          type: 'website',
          locale: 'en',
          url: env.url,
          site_name: 'INK!athon', // TODO
          images: [
            {
              url: `${env.url}/images/cover.jpg`, // TODO
              width: 1200,
              height: 670,
            },
          ],
        }}
        twitter={{
          handle: '@scio_xyz', // TODO
        }}
      />

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <UseInkathonProvider
        appName="INK!athon" // TODO
        connectOnInit={true}
        defaultChain={env.defaultChain}
        deployments={getDeployments()}
        onConnectError={(e?: Error) => {
          toast.error(e?.message || 'Error while connecting wallet')
        }}
      >
        <CacheProvider value={cache}>
          <ChakraProvider>
            <DarkMode>
              <GlobalStyles />

              <BaseLayout>
                <Component {...pageProps} />
              </BaseLayout>

              <HotToastConfig />
            </DarkMode>
          </ChakraProvider>
        </CacheProvider>
      </UseInkathonProvider>
    </>
  )
}

export default MyApp
