"use client"

import {
  useAccounts,
  useConnectedWallets,
  useWalletConnector,
  useWalletDisconnector,
  useWallets,
} from "@reactive-dot/react"
import { LinkIcon, UnlinkIcon, WalletIcon } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"
import type { Wallet } from "@/lib/reactive-dot/custom-types"
import { Button } from "../ui/button-extended"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function ConnectButton() {
  const accounts = useAccounts()
  const wallets = useWallets()
  const connectedWallets = useConnectedWallets()

  const connectWallet = useWalletConnector()[1]
  const disconnectWallet = useWalletDisconnector()[1]

  const handleConnect = useCallback(
    async (wallet?: Wallet) => {
      if (!wallets?.length) return

      toast.promise(connectWallet(wallet ?? wallets[0]), {
        loading: "Connecting to wallet...",
        success: "Wallet connected",
        error: "Failed to connect to wallet",
      })
    },
    [connectWallet, wallets],
  )

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

  if (accounts?.length > 0) {
    return (
      <Button
        size="lg"
        variant="glass"
        className="min-w-[200px]"
        onClick={() => handleDisconnect()}
      >
        <UnlinkIcon /> Disconnect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="glass" className="min-w-[200px]" onClick={() => handleConnect()}>
          <LinkIcon /> Connect Wallet
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl"
        sideOffset={6}
      >
        {!wallets?.length && <DropdownMenuItem disabled>No wallets found</DropdownMenuItem>}

        {wallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.id}
            onClick={() => handleConnect(wallet)}
            className="justify-center rounded-lg"
          >
            <WalletIcon /> {wallet.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
