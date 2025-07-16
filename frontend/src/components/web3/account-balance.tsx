"use client"

import { useAccounts, useSpendableBalance } from "@reactive-dot/react"
import { ALICE } from "@/lib/inkathon/constants"

export function AccountBalance() {
  const account = useAccounts()[0]
  const spendableBalance = useSpendableBalance(account?.address || ALICE)

  if (!account) return null

  return (
    <div className="flex h-11 w-fit items-center rounded-xl border border-input px-6 font-mono text-sm ring-1 ring-foreground/10 ring-offset-2 ring-offset-background transition-all">
      {spendableBalance.toLocaleString()}
    </div>
  )
}
