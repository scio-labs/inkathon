import { ApiPromise } from '@polkadot/api'
import { ContractPromise } from '@polkadot/api-contract'
import { ContractOptions } from '@polkadot/api-contract/types'
import { EventRecord } from '@polkadot/types/interfaces'
import { IKeyringPair, ISubmittableResult } from '@polkadot/types/types'
import { stringCamelCase } from '@polkadot/util'
import { contractCallDryRun } from '@scio-labs/use-inkathon'

/**
 * Calls a given mutating contract method (tx) with upfront gas estimation.
 */
export const contractTxPromise = async (
  api: ApiPromise,
  account: IKeyringPair | string,
  contract: ContractPromise,
  method: string,
  options = {} as ContractOptions,
  args = [] as unknown[],
): Promise<ISubmittableResult> => {
  // Dry run
  delete options.gasLimit
  const { gasRequired } = await contractCallDryRun(api, account, contract, method, options, args)

  // Call actual query/tx & wrap it in a promise
  return new Promise(async (resolve, reject) => {
    const tx = contract.tx[stringCamelCase(method)]({ ...options, gasLimit: gasRequired }, ...args)
    const unsub = await tx.signAndSend(account, (result) => {
      const isInBlock = result?.status?.isInBlock
      if (!isInBlock) return
      const failedEvent: EventRecord = result?.events.find(
        ({ event: { method } }: any) => method === 'ExtrinsicFailed',
      )
      if (isInBlock && failedEvent) {
        // Reject if `ExtrinsicFailed` event was found
        reject({ failedEvent, result })
        unsub?.()
      } else if (isInBlock) {
        // Otherwise resolve succesfully if transaction is in block
        resolve(result)
        unsub?.()
      }
    })
  })
}
