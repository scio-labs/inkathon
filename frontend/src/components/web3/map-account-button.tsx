"use client"

import { useTypedApi } from "@reactive-dot/react"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { useIsMapped } from "@/hooks/use-is-mapped"
import { useSignerAndAddress } from "@/hooks/use-signer-and-address"
import { Button } from "../ui/button-extended"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function MapAccountButton() {
  const [isLoading, setIsLoading] = useState(false)
  const api = useTypedApi()
  const { signer, signerAddress } = useSignerAndAddress()
  const isMapped = useIsMapped()

  const handleMapAccount = useCallback(async () => {
    if (!api || !signer) return

    setIsLoading(true)

    const tx = api.tx.Revive.map_account()
      .signAndSubmit(signer)
      .then((tx) => {
        if (!tx.ok) throw tx.dispatchError
      })
      .finally(() => setIsLoading(false))

    toast.promise(tx, {
      loading: "Mapping account...",
      success: "Account mapped",
      error: "Failed to map account. Do you have enough funds?",
    })
  }, [api, signer])

  if (isMapped !== false) return null

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="glass" size="lg" onClick={handleMapAccount} isLoading={isLoading}>
          Map
          <div className="size-4 rounded-full bg-yellow-400 font-bold font-mono text-black text-xs">
            !
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={4}>
        <p>This account needs to be mapped first</p>
      </TooltipContent>
    </Tooltip>
  )
}
