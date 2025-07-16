import { type ChainProvider, useChainSpecData } from "@reactive-dot/react"
import type { ComponentProps } from "react"
import { config } from "@/lib/reactive-dot/config"
import { buttonVariants } from "../ui/button-extended"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type ChainId = ComponentProps<typeof ChainProvider>["chainId"]

interface ChainSelectProps {
  chainId: ChainId
  setChainId: (chainId: ChainId) => void
}
export function ChainSelect({ chainId, setChainId }: ChainSelectProps) {
  const chainIds = Object.keys(config.chains) as (keyof typeof config.chains)[]

  return (
    <Select value={chainId} onValueChange={setChainId}>
      <SelectTrigger
        className={buttonVariants({
          size: "lg",
          variant: "glass",
          className:
            "!h-11 min-w-[200px] *:data-[slot=select-value]:inline *:data-[slot=select-value]:truncate",
        })}
      >
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        {chainIds.map((chainId) => (
          <ChainSelectItem key={chainId} chainId={chainId} />
        ))}
      </SelectContent>
    </Select>
  )
}

function ChainSelectItem({ chainId }: { chainId: keyof typeof config.chains }) {
  const { name } = useChainSpecData({ chainId })

  const formattedName = name === "passet-hub" ? "Passet Hub Testnet" : name

  return <SelectItem value={chainId}>{formattedName}</SelectItem>
}
