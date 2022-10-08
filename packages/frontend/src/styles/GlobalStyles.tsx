import { Global } from '@emotion/react'
import 'nprogress/nprogress.css'
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  html {
    scroll-behavior: smooth;
  }
  body {
    ${tw`antialiased bg-black text-white font-mono`}
    ${tw`h-screen min-h-screen relative`}
  }
  #__next,
  #__next > div {
    ${tw`h-full min-h-full flex flex-col relative`}
  }

  /* Progress Bar */
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
