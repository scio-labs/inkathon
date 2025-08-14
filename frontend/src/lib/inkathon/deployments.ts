import { contracts } from "@polkadot-api/descriptors"
import * as flipperPassethub from "contracts/deployments/flipper/passethub"
import * as flipperPop from "contracts/deployments/flipper/pop"
// import * as flipperDev from "contracts/deployments/flipper/dev"

export const flipper = {
  contract: contracts.flipper,
  evmAddresses: {
    // dev: flipperDev.evmAddress,
    pop: flipperPop.evmAddress,
    passethub: flipperPassethub.evmAddress,
    // Add more deployments here
  },
  ss58Addresses: {
    // dev: flipperDev.ss58Address,
    pop: flipperPop.ss58Address,
    passethub: flipperPassethub.ss58Address,
    // Add more deployments here
  },
}

export const deployments = {
  flipper,
  // Add more contracts here
}
