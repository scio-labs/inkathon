import { type ChainProvider, useChainSpecData } from "@reactive-dot/react"
import type { ComponentProps } from "react"
import { config } from "@/lib/reactive-dot/config"
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
      <SelectTrigger className="!h-11 w-[200px] select-none rounded-xl ring-1 ring-foreground/10 ring-offset-2 ring-offset-background transition-all hover:ring-2 hover:ring-foreground/20">
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

  return <SelectItem value={chainId}>{name}</SelectItem>
}
