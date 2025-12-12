"use client"

import { useMutation } from "@reactive-dot/react"
import { useIsMapped } from "@/hooks/use-is-mapped"
import { isTxLoading } from "@/lib/reactive-dot/is-tx-loading"
import { submitTxAndToast } from "@/lib/reactive-dot/submit-tx-and-toast"
import { Button } from "../ui/button-extended"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function MapAccountButton() {
  const isMapped = useIsMapped()

  if (isMapped !== false) {
    return null
  }

  return <MapAccountTx />
}

export function MapAccountTx() {
  const [mapAccountStatus, mapAccount] = useMutation((tx) => tx.Revive.map_account())

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="glass"
          size="lg"
          onClick={() =>
            submitTxAndToast(() => mapAccount(), {
              loading: "Mapping account...",
              success: "Account mapped",
              error: "Failed to map account. Do you have enough funds?",
            })
          }
          isLoading={isTxLoading(mapAccountStatus)}
        >
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
