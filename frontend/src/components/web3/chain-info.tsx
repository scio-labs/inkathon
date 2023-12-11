'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

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
      <div className="mb-4 mt-8 flex flex-col items-center justify-center space-y-3 text-center font-mono text-sm text-gray-400 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Spinner />
        <div>
          Connecting to {activeChain?.name} ({activeChain?.rpcUrls?.[0]})
        </div>
      </div>
    )

  return (
    <>
      <div className="flex max-w-[22rem] grow flex-col gap-4">
        <h2 className="text-center font-mono text-gray-400">Chain Info</h2>

        <Card>
          <CardContent className="pb-3 pt-6">
            {/* Metadata */}
            {Object.entries(chainInfo || {}).map(([key, value]) => (
              <div key={key} className="text-sm leading-7">
                {key}:
                <strong className="float-right ml-6 max-w-[15rem] truncate" title={value}>
                  {value}
                </strong>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex items-center justify-center space-x-3">
            {/* Explorer Link */}
            {!!activeChain?.explorerUrls && !!Object.keys(activeChain.explorerUrls)?.length && (
              <Link
                href={Object.values(activeChain.explorerUrls)[0]}
                target="_blank"
                className="flex items-center justify-center gap-1 text-center text-sm text-gray-400 hover:text-white"
              >
                Explorer <HiOutlineExternalLink />
              </Link>
            )}
            {/* Faucet Link */}
            {!!activeChain?.faucetUrls?.length && (
              <Link
                href={activeChain.faucetUrls[0]}
                target="_blank"
                className="flex items-center justify-center gap-1 text-center text-sm text-gray-400 hover:text-white"
              >
                Faucet <HiOutlineExternalLink />
              </Link>
            )}
            {/* Contracts UI Link */}
            {!!activeChain?.rpcUrls?.length && (
              <Link
                href={`https://contracts-ui.substrate.io/?rpc=${activeChain.rpcUrls[0]}`}
                target="_blank"
                className="flex items-center justify-center gap-1 text-center text-sm text-gray-400 hover:text-white"
              >
                Contracts UI <HiOutlineExternalLink />
              </Link>
            )}
          </CardFooter>
        </Card>

        {/* Mainnet Security Disclaimer */}
        {!activeChain?.testnet && (
          <>
            <h2 className="text-center font-mono text-red-400">Security Disclaimer</h2>

            <Card className="border-red-300 bg-red-500 p-2 shadow-md">
              You are interacting with un-audited mainnet contracts and risk all your funds. Never
              transfer tokens to this contract.
            </Card>
          </>
        )}
      </div>
    </>
  )
}
