import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import 'twin.macro'

const HomePage: NextPage = () => {
  return (
    <>
      <CenterBody>
        <ConnectButton />
      </CenterBody>
    </>
  )
}

export default HomePage
