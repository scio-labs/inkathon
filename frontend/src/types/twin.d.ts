import { css as cssImport } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'
import styledImport from '@emotion/styled'
import 'twin.macro'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string
    css?: CSSInterpolation
  }
}
