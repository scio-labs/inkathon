import { contracts } from "@polkadot-api/descriptors"
import { defineContract } from "@reactive-dot/core"

export const flipperContract = defineContract({
  type: "ink",
  descriptor: contracts.flipper,
})
