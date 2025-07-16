import { useSigner } from "@reactive-dot/react"
import { AccountId } from "polkadot-api"
import type { Signer } from "@/lib/reactive-dot/custom-types"

export function useSignerAndAddress():
  | { signer: Signer; signerAddress: string }
  | { signer?: never; signerAddress?: never } {
  const signer = useSigner()
  if (!signer?.publicKey) return {}

  // Determine signer address from public key as `SignerProvider` does not provide it
  let signerAddress: string | undefined
  try {
    signerAddress = AccountId().dec(signer.publicKey)
  } catch (error) {
    console.error(error)
    return {}
  }

  return {
    signer,
    signerAddress,
  }
}
