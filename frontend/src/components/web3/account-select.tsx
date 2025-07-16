"use client"

import { useAccounts, useConnectedWallets, useWalletDisconnector } from "@reactive-dot/react"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import type { WalletAccount } from "@/lib/reactive-dot/custom-types"
import { buttonVariants } from "../ui/button-extended"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ConnectButton } from "./connect-button"

interface AccountSelectProps {
  account?: WalletAccount
  setAccount: (account?: WalletAccount) => void
}
export function AccountSelect({ account, setAccount }: AccountSelectProps) {
  const accounts = useAccounts()
  const connectedWallets = useConnectedWallets()
  const disconnectWallet = useWalletDisconnector()[1]

  useEffect(() => {
    if (account || !accounts?.length) return
    setAccount(accounts[0])
  }, [accounts])

  const handleDisconnect = useCallback(async () => {
    if (!connectedWallets?.length) return

    const disconnectAllWallets = Promise.all(
      connectedWallets.map((wallet) => disconnectWallet(wallet)),
    )
    toast.promise(disconnectAllWallets, {
      loading: "Disconnecting from wallet...",
      success: "Wallet disconnected",
      error: "Failed to disconnect from wallet",
    })
  }, [disconnectWallet, connectedWallets])

  const handleValueChange = useCallback(
    async (value: "disconnect" | string) => {
      if (value === "disconnect") {
        await handleDisconnect()
        setAccount(undefined)
        return
      }

      const account = accounts?.find((account) => account.address === value)
      if (account) setAccount(account)
    },
    [accounts, setAccount],
  )

  if (!account) {
    return <ConnectButton />
  }

  return (
    <Select value={account.address} onValueChange={handleValueChange}>
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
          <SelectLabel>Accounts</SelectLabel>
          {accounts?.map((account) => (
            <SelectItem key={account.address} value={account.address}>
              {account.name}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="disconnect">Disconnect</SelectItem>
      </SelectContent>
    </Select>
  )
}
