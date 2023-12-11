'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'

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
import { AlertOctagon } from 'lucide-react'
import aznsIconSvg from 'public/icons/azns-icon.svg'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineDisconnect } from 'react-icons/ai'
import { FiChevronDown, FiExternalLink } from 'react-icons/fi'
import { RiArrowDownSLine } from 'react-icons/ri'

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

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

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
  const { reducibleBalance, reducibleBalanceFormatted } = useBalance(activeAccount?.address, true, {
    forceUnit: false,
    fixedDecimals: 2,
    removeTrailingZeros: true,
  })
  const [supportedChains] = useState(
    env.supportedChains.map((networkId) => getSubstrateChain(networkId) as SubstrateChain),
  )

  // Sort installed wallets first
  const [browserWallets] = useState([
    ...allSubstrateWallets.filter(
      (w) => w.platforms.includes(SubstrateWalletPlatform.Browser) && isWalletInstalled(w),
    ),
    ...allSubstrateWallets.filter(
      (w) => w.platforms.includes(SubstrateWalletPlatform.Browser) && !isWalletInstalled(w),
    ),
  ])

  // Connect Button
  if (!activeAccount)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-12 min-w-[14rem] gap-2 rounded-2xl border border-white/10 bg-primary px-4 py-3 font-bold text-foreground"
            isLoading={isConnecting}
            disabled={isConnecting}
            translate="no"
          >
            Connect Wallet
            <RiArrowDownSLine size={20} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[14rem]">
          {!activeAccount &&
            browserWallets.map((w) =>
              isWalletInstalled(w) ? (
                <DropdownMenuItem
                  key={w.id}
                  className="cursor-pointer"
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
    <div className="flex select-none flex-wrap items-stretch justify-center gap-4">
      {/* Account Name, Address, and AZERO.ID-Domain (if assigned) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="rounded-2xl bg-gray-900 px-4 py-6 font-bold text-foreground"
        >
          <Button className="min-w-[14rem] border" translate="no">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-center justify-center">
                <AccountName account={activeAccount} />
                <span className="text-xs font-normal">
                  {truncateHash(
                    encodeAddress(activeAccount.address, activeChain?.ss58Prefix || 42),
                    8,
                  )}
                </span>
              </div>
              <FiChevronDown className="shrink-0" size={22} aria-hidden="true" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="no-scrollbar max-h-[40vh] min-w-[14rem] overflow-scroll rounded-2xl"
        >
          {/* Supported Chains */}
          {supportedChains.map((chain) => (
            <DropdownMenuItem
              disabled={chain.network === activeChain?.network}
              className={chain.network !== activeChain?.network ? 'cursor-pointer' : ''}
              key={chain.network}
              onClick={async () => {
                await switchActiveChain?.(chain)
                toast.success(`Switched to ${chain.name}`)
              }}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <p>{chain.name}</p>
                {chain.network === activeChain?.network && (
                  <AiOutlineCheckCircle className="shrink-0" size={15} />
                )}
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
                className={acc.address !== activeAccount?.address ? 'cursor-pointer' : ''}
                onClick={() => {
                  setActiveAccount?.(acc)
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <div>
                    <AccountName account={acc} />
                    <p className="text-xs">{truncatedEncodedAddress}</p>
                  </div>
                  {acc.address === activeAccount?.address && (
                    <AiOutlineCheckCircle className="shrink-0" size={15} />
                  )}
                </div>
              </DropdownMenuItem>
            )
          })}

          {/* Disconnect Button */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => disconnect?.()}>
            <div className="flex gap-2">
              <AiOutlineDisconnect size={18} />
              Disconnect
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Account Balance */}
      {reducibleBalanceFormatted !== undefined && (
        <div className="flex min-w-[10rem] items-center justify-center gap-2 rounded-2xl border bg-gray-900 px-4 py-3 font-mono text-sm font-bold text-foreground">
          {reducibleBalanceFormatted}
          {(!reducibleBalance || reducibleBalance?.isZero()) && (
            <Tooltip>
              <TooltipTrigger className="cursor-help">
                <AlertOctagon size={16} className="text-warning" />
              </TooltipTrigger>
              <TooltipContent>No balance to pay fees</TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
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
    <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase" {...rest}>
      {primaryDomain || account.name}
      {!!primaryDomain && <Image src={aznsIconSvg} alt="AZERO.ID Logo" width={13} height={13} />}
    </div>
  )
}
