import { useChainSpecData } from "@reactive-dot/react"
import { config } from "@/lib/reactive-dot/config"
import type { ChainId } from "@/lib/reactive-dot/custom-types"
import { buttonVariants } from "../ui/button-extended"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

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
          className: "inkathon-select",
        })}
      >
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chains</SelectLabel>
          {chainIds.map((chainId) => (
            <ChainSelectItem key={chainId} chainId={chainId} />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function ChainSelectItem({ chainId }: { chainId: keyof typeof config.chains }) {
  const { name } = useChainSpecData({ chainId })

  const formattedName = name === "passet-hub" ? "Passet Hub Testnet" : name

  return <SelectItem value={chainId}>{formattedName}</SelectItem>
}
