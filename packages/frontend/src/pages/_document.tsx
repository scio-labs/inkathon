import { extractCritical } from '@emotion/server'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { Fragment, ReactFragment } from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    const critical = extractCritical(initialProps.html)
    initialProps.html = critical.html
    initialProps.styles = (
      <Fragment>
        {initialProps.styles}
        <style
          data-emotion-css={critical.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </Fragment>
    ) as any as ReactFragment
    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* TODO Fonts, Manifest, and Favicons */}
          {/* TIP: Generate it at https://realfavicongenerator.net/ */}
          {/* TIP: Generate font-face rules & subsets at https://transfonter.org/ */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
