import { useChainId, useChainSpecData, useTypedApi } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"

export function useChainMeta() {
  const [isLoading, setIsLoading] = useState(true)

  const chainSpec = useChainSpecData()
  const api = useTypedApi()
  const chain = useChainId()

  const [chainMeta, setChainMeta] = useState<{
    name: string
    ss58Prefix: number
    implName: string
    systemVersion: number
    hasPalletRevive: boolean
  } | null>(null)

  const getChainState = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!api || !chain) return

      const chainId = await api.constants.Revive.ChainId()
      const ss58Prefix = await api.constants.System.SS58Prefix()
      const versions = await api.constants.System.Version()

      setChainMeta({
        name: chainSpec.name,
        ss58Prefix: chainSpec.properties?.ss58Format || ss58Prefix,
        implName: versions.impl_name,
        systemVersion: versions.system_version,
        hasPalletRevive: !!chainId,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [api, chain])

  useEffect(() => {
    getChainState()
  }, [getChainState])

  return { chainMeta, isLoading }
}
