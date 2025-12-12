"use client"

import type { WalletAccount } from "@reactive-dot/core/wallets.js"
import { useChainId, useSpendableBalance } from "@reactive-dot/react"
import { FuelIcon } from "lucide-react"
import { use } from "react"
import { FAUCET_URLS } from "@/lib/inkathon/constants"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { accountContext } from "./account-provider"

export function AccountBalance() {
  const account = use(accountContext)

  if (account === undefined) return null

  return <InnerAccountBalance account={account} />
}

type AccountBalanceProps = {
  account: WalletAccount
}

function InnerAccountBalance({ account }: AccountBalanceProps) {
  const chainId = useChainId()
  const spendableBalance = useSpendableBalance(account.address)
  const faucetUrl = FAUCET_URLS[chainId]

  return (
    <div className="flex h-11 w-fit items-center gap-2.5 rounded-xl border border-input px-6 font-mono text-sm ring-1 ring-foreground/10 ring-offset-2 ring-offset-background transition-all">
      <span>{spendableBalance.toLocaleString()}</span>

      {!!faucetUrl && (
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={faucetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="-mr-4.5 ml-2 flex size-7.5 items-center justify-center rounded-md bg-foreground/10 text-muted-foreground transition-colors hover:text-foreground"
            >
              <FuelIcon className="size-3.5" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get testnet tokens</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
