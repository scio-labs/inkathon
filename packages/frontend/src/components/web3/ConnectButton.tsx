import { truncateHash } from '@shared/truncateHash'
import { FC } from 'react'
import 'twin.macro'
import { BaseButton } from '../shared/BaseButton'
import { usePolkadotProviderContext } from './PolkadotProvider'

export interface ConnectButtonProps {}
export const ConnectButton: FC<ConnectButtonProps> = () => {
  const { setup, accounts } = usePolkadotProviderContext()
  return (
    <>
      <BaseButton
        disabled={!!accounts?.length}
        onClick={() => {
          setup?.()
        }}
      >
        {!!accounts?.length ? (
          <div tw="flex flex-col space-y-1">
            <div tw="text-black">{accounts[0].meta.name}</div>
            <div tw="text-xs">{truncateHash(accounts[0].address, 42)}</div>
          </div>
        ) : (
          <>Connect Wallet</>
        )}
      </BaseButton>
    </>
  )
}
