import { Card, Wrap } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export const ChainInfo: FC = () => {
  const { api } = usePolkadotProviderContext()
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
            {Object.entries(chainInfo || {}).map(([key, value]) => (
              <div key={key}>
                {key}: <strong tw="float-right ml-4">{value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </Wrap>
    </>
  )
}
