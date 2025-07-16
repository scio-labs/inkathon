import { contracts } from "@polkadot-api/descriptors"
import { defineContract } from "@reactive-dot/core"

// NOTE: Currently unused
export const flipperContract = defineContract({
  descriptor: contracts.flipper,
})
