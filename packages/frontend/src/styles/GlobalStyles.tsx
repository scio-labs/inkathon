import { Global } from '@emotion/react'
import 'nprogress/nprogress.css'
import 'react-tippy/dist/tippy.css'
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  html {
    scroll-behavior: smooth;
  }
  body {
    ${tw`antialiased bg-black text-white font-mono`}
    ${tw`min-h-screen h-screen relative`}
  }
  #__next,
  #__next > div {
    ${tw`h-full relative flex flex-col`}
  }
  #nprogress > .bar {
    ${tw`bg-white`}
  }
  #nprogress > .spinner {
    ${tw`hidden!`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
