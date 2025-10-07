import { createInkSdk } from "@polkadot-api/sdk-ink"
import { useClient } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"
import { useSignerAndAddress } from "./use-signer-and-address"

export function useIsMapped() {
  const client = useClient()
  const { signerAddress } = useSignerAndAddress()

  const [isMapped, setIsMapped] = useState<boolean>()

  const updateIsMapped = useCallback(async () => {
    if (!signerAddress) {
      setIsMapped(undefined)
      return
    }

    const sdk = createInkSdk(client)
    const isMapped = await sdk.addressIsMapped(signerAddress)

    setIsMapped(isMapped)
  }, [client, signerAddress])

  useEffect(() => {
    updateIsMapped()
  }, [updateIsMapped])

  return isMapped
}
