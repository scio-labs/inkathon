import { CenterBody } from '@components/layout/CenterBody'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import { Lock } from 'src/types/typechain'
import 'twin.macro'
import { useSigner } from 'wagmi'

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts, contractsChainId } = useDeployments()

  const getOwner = async () => {
    if (!signer || !contracts) return
    const contract = new ethers.Contract(contracts.Lock.address, contracts.Lock.abi, signer) as Lock
    const owner = await contract.owner()
    console.log({ owner })
  }

  const withdraw = async () => {
    if (!signer || !contracts) return
    const contract = new ethers.Contract(contracts.Lock.address, contracts.Lock.abi, signer) as Lock
    try {
      const tsx = await contract.withdraw({ gasLimit: 50000 })
      const receipt = await tsx.wait()
      console.log({ receipt })
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <>
      <CenterBody>
        <ConnectButton />
        {signer && (
          <>
            <button onClick={() => getOwner()}>Get Owner</button>
            <button onClick={() => withdraw()}>Withdraw</button>
          </>
        )}
      </CenterBody>
    </>
  )
}

export default HomePage
