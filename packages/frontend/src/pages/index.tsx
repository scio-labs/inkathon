import { CenterBody } from '@components/layout/CenterBody'
import { Lock__factory } from '@ethathon/contracts/typechain-types'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useDeployments } from '@shared/useDeployments'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import githubIcon from 'public/icons/social/github.svg'
import toast from 'react-hot-toast'
import tw from 'twin.macro'
import { useSigner } from 'wagmi'

const Button = tw.button`m-2 px-2 py-1 rounded-lg border border-current text-gray-400 font-semibold hover:(text-white)`

const HomePage: NextPage = () => {
  const { data: signer } = useSigner()
  const { contracts } = useDeployments()

  const getOwner = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const owner = await contract.owner()
      toast.success(owner)
      console.log({ owner })
    } catch (e) {
      toast.error('Error while fetching owner. Try again…')
      console.error(e)
    }
  }

  const withdraw = async () => {
    if (!signer || !contracts) return
    const contract = Lock__factory.connect(contracts.Lock.address, signer)
    try {
      const tsx = await contract.withdraw({ gasLimit: 50000 })
      const receipt = await tsx.wait()
      toast.success('Successfully withdrawn!')
      console.log({ receipt })
    } catch (e: any) {
      toast.error('Error while withdrawal. Try again…')
      console.error(e)
    }
  }

  return (
    <>
      <CenterBody>
        {/* Title */}
        <div tw="flex flex-col items-center text-center mb-14">
          <Link href="https://github.com/ethathon/ethathon" passHref>
            <a target="_blank" tw="mb-2 opacity-50 cursor-pointer hover:opacity-100">
              <Image src={githubIcon} width={42} height={42} alt="Github Logo" />
            </a>
          </Link>
          <h1 tw="text-3xl font-bold tracking-tight">ETHathon</h1>
          <p tw="text-gray-400 mt-1">Smart Contract & DApp Development Boilerplate</p>
        </div>

        {/* Rainbowkit Connect Button */}
        <ConnectButton />

        {/* Lock.sol Contract Interactions */}
        {signer && (
          <div tw="mt-6 flex items-center">
            <div tw="text-gray-400 mr-2">Lock.sol:</div>
            <Button onClick={() => getOwner()}>Get Owner</Button>
            <Button onClick={() => withdraw()}>Withdraw</Button>
          </div>
        )}
      </CenterBody>
    </>
  )
}

export default HomePage
