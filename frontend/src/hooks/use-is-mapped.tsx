import { ss58ToEthereum } from "@polkadot-api/sdk-ink"
import { useTypedApi } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"
import { useSignerAndAddress } from "./use-signer-and-address"

export function useIsMapped() {
  const api = useTypedApi()
  const { signerAddress } = useSignerAndAddress()

  const [isMapped, setIsMapped] = useState<boolean>()

  const updateIsMapped = useCallback(async () => {
    if (!api || !signerAddress) {
      setIsMapped(undefined)
      return
    }

    const evmSignerAddress = ss58ToEthereum(signerAddress)
    const isMapped = !!(await api.query.Revive.OriginalAccount.getValue(evmSignerAddress))

    setIsMapped(isMapped)
  }, [api, signerAddress])

  useEffect(() => {
    updateIsMapped()
  }, [updateIsMapped])

  return isMapped
}
