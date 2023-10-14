import { extractCritical } from '@emotion/server'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

export type NewDocumentInitialProps = DocumentInitialProps & {
  ids: string[]
  css: string
}
export default class MyDocument extends Document<NewDocumentInitialProps> {
  // Emotion Critical SSR Styles
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const critical = extractCritical(initialProps.html)
    initialProps.html = critical.html
    initialProps.styles = (
      <>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </>
    )

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* TODO Manifest & Favicons */}
          {/* TIP: Generate it at https://realfavicongenerator.net/ */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#7e5da8" />
          <meta name="msapplication-TileColor" content="#7e5da8" />
          <meta name="theme-color" content="#000000" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
