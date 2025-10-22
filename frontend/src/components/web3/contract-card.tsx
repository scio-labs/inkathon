import { useChainId, useContractMutation, useLazyLoadQuery, useStore } from '@reactive-dot/react'
import { startTransition, use } from 'react'
import { finalize } from 'rxjs'
import { useIsMapped } from '@/hooks/use-is-mapped'
import { flipper } from '@/lib/inkathon/deployments'
import { flipperContract } from '@/lib/reactive-dot/contracts'
import { submitTxAndToast } from '@/lib/reactive-dot/submit-tx-and-toast'
import { Button } from '../ui/button-extended'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { accountContext } from './account-provider'

export function ContractCard() {
  const chain = useChainId()

  return (
    <Card className="inkathon-card">
      <CardHeader className="relative">
        <CardTitle>Flipper Contract</CardTitle>
        {use(accountContext) !== undefined && <FlipTx />}
      </CardHeader>

      <Table className="inkathon-card-table">
        <TableBody>
          <FlipStatus />

          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{flipper.evmAddresses[chain]}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Language</TableCell>
            <TableCell>{flipper.contract.metadata?.source.language}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Compiler</TableCell>
            <TableCell>{flipper.contract.metadata?.source.compiler}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

function FlipStatus() {
  const chain = useChainId()
  const state = useLazyLoadQuery((query) =>
    query.contract(flipperContract, flipper.evmAddresses[chain], (query) => query.message('get')),
  )

  return (
    <TableRow>
      <TableCell>Flip State</TableCell>
      <TableCell>{state ? 'True' : 'False'}</TableCell>
    </TableRow>
  )
}

function FlipTx() {
  const chain = useChainId()
  const isMapped = useIsMapped()

  const store = useStore()
  const [_, flip] = useContractMutation((mutate) =>
    mutate(flipperContract, flipper.evmAddresses[chain], 'flip'),
  )

  return (
    <Button
      variant="default"
      size="sm"
      className="-top-2 absolute right-6"
      onClick={() =>
        submitTxAndToast(
          () =>
            flip().pipe(
              finalize(() =>
                startTransition(() =>
                  store.invalidateContractQueries(
                    (x) =>
                      x.contract === flipperContract && x.address === flipper.evmAddresses[chain],
                  ),
                ),
              ),
            ),
          {
            loading: 'Sending transaction...',
            success: 'Successfully flipped',
            error: 'Failed to send transaction',
          },
        )
      }
      disabled={!isMapped}
    >
      {isMapped ? 'Call Flip' : 'Map account to flip'}
    </Button>
  )
}
