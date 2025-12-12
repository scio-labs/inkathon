import { idle, MutationError, pending } from "@reactive-dot/core"
import type { useMutation } from "@reactive-dot/react"

export function isTxLoading(status: ReturnType<typeof useMutation>[0]): boolean {
  return (
    status === pending ||
    (!(status instanceof MutationError) && status !== idle && status.type !== "finalized")
  )
}
