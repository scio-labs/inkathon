import { Card, Spinner, Wrap } from '@chakra-ui/react'
import { useInkathon } from '@scio-labs/use-inkathon'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { HiOutlineExternalLink } from 'react-icons/hi'
import 'twin.macro'

export const ChainInfo: FC = () => {
  const { api, activeChain } = useInkathon()
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
      Version: version,
      Token: `${tokenSymbol} (${tokenDecimals} Decimals)`,
    }
    setChainInfo(chainInfo)
  }
  useEffect(() => {
    fetchChainInfo()
  }, [api])

  // Connection Loading Indicator
  if (!api)
    return (
      <div tw="mt-8 mb-4 flex flex-col items-center justify-center space-y-3 text-center font-mono text-sm text-gray-400 sm:(flex-row space-x-3 space-y-0)">
        <Spinner size="sm" />
        <div>
          Connecting to {activeChain?.name} ({activeChain?.rpcUrls?.[0]})
        </div>
      </div>
    )

  return (
    <>
      <h2 tw="mt-10 mb-4 font-mono text-gray-400">Chain Info</h2>
      <Wrap>
        <Card variant="outline" p={4}>
          {/* Metadata */}
          {Object.entries(chainInfo || {}).map(([key, value]) => (
            <div key={key} tw="text-sm leading-6">
              {key}:{' '}
              <strong tw="float-right ml-6 truncate max-w-[15rem]" title={value}>
                {value}
              </strong>
            </div>
          ))}

          <div tw="mt-2 flex items-center justify-center space-x-2">
            {/* Explorer Link */}
            {!!activeChain?.explorerUrls?.length && (
              <Link
                href={activeChain.explorerUrls[0]}
                target="_blank"
                tw="flex items-center justify-center text-center text-xs text-gray-400 hover:text-white"
              >
                Explorer <HiOutlineExternalLink tw="ml-1" />
              </Link>
            )}

            {/* Faucet Link */}
            {!!activeChain?.faucetUrls?.length && (
              <Link
                href={activeChain.faucetUrls[0]}
                target="_blank"
                tw="flex items-center justify-center text-center text-xs text-gray-400 hover:text-white"
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
