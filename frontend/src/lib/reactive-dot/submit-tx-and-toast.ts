import type { TxEvent } from 'polkadot-api'
import { catchError, type Observable, tap } from 'rxjs'
import { toast } from 'sonner'

export function submitTxAndToast(
  submit: () => Observable<TxEvent>,
  messages: { loading: string; success: string; error: string },
) {
  const id = globalThis.crypto.randomUUID()

  try {
    toast.loading(messages.loading, { id })

    return submit()
      .pipe(
        tap((event) => {
          if (event.type === 'finalized') {
            toast.success(messages.success, { id })
          }
        }),
        catchError((error) => {
          toast.error(messages.error, { id })
          throw error
        }),
      )
      .subscribe()
  } catch (error) {
    toast.error('Failed to submit transaction', { id })
  }
}
