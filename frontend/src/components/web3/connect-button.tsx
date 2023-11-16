'use client'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { env } from '@/config/environment'
import { truncateHash } from '@/utils/truncate-hash'
import { useIsSSR } from '@/utils/use-is-ssr'
import { SupportedChainId } from '@azns/resolver-core'
import { useResolveAddressToDomain } from '@azns/resolver-react'
import { InjectedAccount } from '@polkadot/extension-inject/types'
import { encodeAddress } from '@polkadot/util-crypto'
import {
  SubstrateChain,
  SubstrateWalletPlatform,
  allSubstrateWallets,
  getSubstrateChain,
  isWalletInstalled,
  useBalance,
  useInkathon,
} from '@scio-labs/use-inkathon'
import Image from 'next/image'
import aznsIconSvg from 'public/icons/azns-icon.svg'
import { FC, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineDisconnect } from 'react-icons/ai'
import { FiChevronDown, FiExternalLink } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'

export interface ConnectButtonProps {}
export const ConnectButton: FC<ConnectButtonProps> = () => {
  const {
    activeChain,
    switchActiveChain,
    connect,
    disconnect,
    isConnecting,
    activeAccount,
    accounts,
    setActiveAccount,
  } = useInkathon()
  const { balanceFormatted } = useBalance(activeAccount?.address, true, {
    forceUnit: false,
    fixedDecimals: 2,
    removeTrailingZeros: true,
  })
  const [supportedChains] = useState(
    env.supportedChains.map((networkId) => getSubstrateChain(networkId) as SubstrateChain),
  )
  const [browserWallets] = useState(
    allSubstrateWallets.filter((w) => w.platforms.includes(SubstrateWalletPlatform.Browser)),
  )
  const isSSR = useIsSSR()

  // Connect Button
  if (!activeAccount)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="group h-12 rounded-2xl bg-primary px-4 py-3 font-bold text-foreground"
            isLoading={isConnecting}
            disabled={isConnecting}
            translate="no"
          >
            Connect Wallet
            <RiArrowDownSLine size={20} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!isSSR &&
            !activeAccount &&
            browserWallets.map((w) =>
              isWalletInstalled(w) ? (
                <DropdownMenuItem
                  key={w.id}
                  onClick={() => {
                    connect?.(undefined, w)
                  }}
                >
                  {w.name}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={w.id} className="opacity-50">
                  <Link href={w.urls.website}>
                    <div className="align-center flex justify-start gap-2">
                      <p>{w.name}</p>
                      <FiExternalLink size={16} />
                    </div>
                    <p>Not installed</p>
                  </Link>
                </DropdownMenuItem>
              ),
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    )

  // Account Menu & Disconnect Button
  return (
    <div className="flex select-none gap-4">
      {/* {Account Balance} */}
      {balanceFormatted !== undefined && (
        <div className="flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-3 font-mono text-base font-bold text-foreground">
          {balanceFormatted}
        </div>
      )}

      {/* Account Name, Address, and AZNS-Domain (if assigned) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="rounded-2xl bg-gray-900 px-4 py-6 font-bold text-foreground"
        >
          <Button className="group" translate="no">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <AccountName account={activeAccount} />
                <span className="text-xs font-normal">
                  {truncateHash(
                    encodeAddress(activeAccount.address, activeChain?.ss58Prefix || 42),
                    8,
                  )}
                </span>
              </div>
              <FiChevronDown size={22} aria-hidden="true" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="no-scrollbar max-h-[40vh] overflow-scroll rounded-2xl">
          {/* Supported Chains */}
          {supportedChains.map((chain) => (
            <DropdownMenuItem
              disabled={chain.network === activeChain?.network}
              key={chain.network}
              onClick={async () => {
                await switchActiveChain?.(chain)
                toast.success(`Switched to ${chain.name}`)
              }}
            >
              <div className="group flex flex-row gap-2">
                <p>{chain.name}</p>
                {chain.network === activeChain?.network && <AiOutlineCheckCircle size={16} />}
              </div>
            </DropdownMenuItem>
          ))}

          {/* Available Accounts/Wallets */}
          <DropdownMenuSeparator />
          {(accounts || []).map((acc) => {
            const encodedAddress = encodeAddress(acc.address, activeChain?.ss58Prefix || 42)
            const truncatedEncodedAddress = truncateHash(encodedAddress, 10)

            return (
              <DropdownMenuItem
                key={encodedAddress}
                disabled={acc.address === activeAccount?.address}
                onClick={() => {
                  setActiveAccount?.(acc)
                }}
              >
                <div className="group">
                  <div className="flex flex-row gap-2">
                    <AccountName account={acc} />
                    {acc.address === activeAccount?.address && <AiOutlineCheckCircle size={16} />}
                  </div>
                  <p className="text-xs">{truncatedEncodedAddress}</p>
                </div>
              </DropdownMenuItem>
            )
          })}

          {/* Disconnect Button */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect?.()}>
            <div className="group flex gap-2">
              <AiOutlineDisconnect size={18} />
              Disconnect
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export interface AccountNameProps {
  account: InjectedAccount
}
export const AccountName: FC<AccountNameProps> = ({ account, ...rest }) => {
  const { activeChain } = useInkathon()
  const doResolveAddress = useMemo(
    () => Object.values(SupportedChainId).includes(activeChain?.network as SupportedChainId),
    [activeChain?.network],
  )
  const { primaryDomain } = useResolveAddressToDomain(
    doResolveAddress ? account?.address : undefined,
    { chainId: activeChain?.network },
  )

  return (
    <div className="flex items-baseline gap-2 font-mono text-base font-bold uppercase" {...rest}>
      {primaryDomain || account.name}
      {!!primaryDomain && <Image src={aznsIconSvg} alt="AZERO.ID Logo" width={11} height={11} />}
    </div>
  )
}
