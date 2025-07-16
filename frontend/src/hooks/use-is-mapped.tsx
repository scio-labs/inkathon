import { createReviveSdk, type ReviveSdkTypedApi } from "@polkadot-api/sdk-ink"
import { useTypedApi } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"
import * as deployments from "@/lib/inkathon/deployments"
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

    // Check if account is mapped
    // TODO: Check mapping state without mandatory contract instance
    const arbitraryContract = Object.values(deployments)[0].contract
    const sdk = createReviveSdk(api as ReviveSdkTypedApi, arbitraryContract)
    const isMapped = await sdk.addressIsMapped(signerAddress)

    setIsMapped(isMapped)
  }, [api, signerAddress])

  useEffect(() => {
    updateIsMapped()
  }, [updateIsMapped])

  return isMapped
}
