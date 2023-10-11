import { Global } from '@emotion/react'
import tw, { GlobalStyles as BaseStyles, css } from 'twin.macro'

const customStyles = css`
  html {
    ${tw`scroll-smooth antialiased`}
  }
  body {
    ${tw`bg-black text-white`}
    ${tw`relative h-screen min-h-screen`}
  }

  #__next,
  #__next > div {
    ${tw`relative flex h-full min-h-full flex-col`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
