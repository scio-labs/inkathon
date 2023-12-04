import Link from 'next/link'
import { FC } from 'react'

import {
  ContractTxResult,
  SubstrateExplorer,
  contractTx,
  useInkathon,
} from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

type ContractTxWithToastParams = Parameters<typeof contractTx>

export const contractTxWithToast = async (...contractTxParams: ContractTxWithToastParams) => {
  return toast.promise(contractTx(...contractTxParams), {
    loading: 'Sending transaction…',
    success: (result) => <ContractTxSuccessToast {...result} />,
    error: (result) => <ContractTxErrorToast {...result} />,
  })
}

export const ContractTxSuccessToast: FC<ContractTxResult> = ({ extrinsicHash, blockHash }) => {
  const { activeChain } = useInkathon()
  const subscanUrl = activeChain?.explorerUrls?.[SubstrateExplorer.Subscan]
  const subscanDetailUrl =
    subscanUrl && extrinsicHash ? `${subscanUrl}/extrinsic/${extrinsicHash}` : null
  const polkadotjsUrl = activeChain?.explorerUrls?.[SubstrateExplorer.PolkadotJs]
  const polkadotjsDetailUrl =
    polkadotjsUrl && blockHash ? `${polkadotjsUrl}/query/${blockHash}` : null

  return (
    <div className="flex flex-col gap-0.5">
      <div>Transaction successful</div>
      {(subscanDetailUrl || polkadotjsDetailUrl) && (
        <div className="text-xs text-gray-400">
          View on{' '}
          {subscanDetailUrl && (
            <Link
              href={subscanDetailUrl}
              target="_blank"
              className="transition-all hover:text-white"
            >
              Subscan ↗
            </Link>
          )}
          {subscanDetailUrl && polkadotjsDetailUrl && ' ∙ '}
          {polkadotjsDetailUrl && (
            <Link
              href={polkadotjsDetailUrl}
              target="_blank"
              className="transition-all hover:text-white"
            >
              Polkadot.js ↗
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export const ContractTxErrorToast: FC<ContractTxResult> = ({ errorMessage }) => {
  const { activeChain } = useInkathon()
  const faucetUrl = activeChain?.faucetUrls?.[0]

  let message: string
  switch (errorMessage) {
    case 'UserCancelled':
      message = 'Transaction cancelled'
      break
    case 'TokenBelowMinimum':
      message = 'Insufficient balance to pay for fees'
      break
    case 'ExtrinsicFailed':
      message = 'Transaction failed'
      break
    case 'Error':
      message = 'Transaction failed'
      break
    default:
      message = errorMessage ? `Transaction failed (${errorMessage})` : 'Transaction failed'
  }

  return (
    <div className="flex flex-col gap-0.5">
      <div>{message}</div>
      {errorMessage === 'TokenBelowMinimum' && faucetUrl && (
        <div className="text-xs text-gray-400">
          <Link href={faucetUrl} target="_blank" className="transition-all hover:text-white">
            Get tokens from a faucet ↗
          </Link>
        </div>
      )}
    </div>
  )
}
