import { ss58ToEthereum } from '@polkadot-api/sdk-ink'
import { idle } from '@reactive-dot/core'
import { useLazyLoadQuery } from '@reactive-dot/react'
import { use } from 'react'
import { accountContext } from '@/components/web3/account-provider'

export function useIsMapped() {
  const account = use(accountContext)

  const originalAccount = useLazyLoadQuery((query) =>
    account === undefined
      ? undefined
      : query.storage('Revive', 'OriginalAccount', [ss58ToEthereum(account?.address)]),
  )

  return originalAccount === idle ? idle : originalAccount !== undefined
}
