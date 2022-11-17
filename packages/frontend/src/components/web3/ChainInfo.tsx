import { Card, Wrap } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export const ChainInfo: FC = () => {
  const { api, activeChain } = usePolkadotProviderContext()
  const [chainInfo, setChainInfo] = useState<{ [_: string]: any }>()

  // Fetch Chain Info
  const fetchChainInfo = async () => {
    if (!api) {
      setChainInfo(undefined)
      return
    }

    const chain = (await api.rpc.system.chain())?.toString() || ''
    const version = (await api.rpc.system.version())?.toString() || ''
    const properties = ((await api.rpc.system.properties())?.toHuman() as any) || {}
    const tokenSymbol = properties?.tokenSymbol?.[0] || 'UNIT'
    const tokenDecimals = properties?.tokenDecimals?.[0] || 12
    const chainInfo = {
      Chain: chain,
      Token: `${tokenSymbol} (${tokenDecimals} Decimals)`,
      Version: version,
    }
    setChainInfo(chainInfo)
  }
  useEffect(() => {
    fetchChainInfo()
  }, [api])

  if (!api || !Object.keys(chainInfo || {}).length) return null

  return (
    <>
      <h2 tw="mt-10 mb-4 font-mono text-gray-400">Chain Info</h2>
      <Wrap>
        <Card variant="outline" p={4}>
          <div tw="text-sm leading-6">
            {/* Metadata */}
            {Object.entries(chainInfo || {}).map(([key, value]) => (
              <div key={key}>
                {key}:{' '}
                <strong tw="float-right ml-6 truncate max-w-[15rem]" title={value}>
                  {value}
                </strong>
              </div>
            ))}

            {/* Faucet Link */}
            {!!activeChain?.faucetUrls?.length && (
              <Link
                href={activeChain.faucetUrls[0]}
                target="_blank"
                tw="mt-2 flex items-center justify-center text-center text-xs text-gray-400 hover:text-white"
              >
                Faucet <HiOutlineExternalLink tw="ml-1" />
              </Link>
            )}
          </div>
        </Card>
      </Wrap>
    </>
  )
}
