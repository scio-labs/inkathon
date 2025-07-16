// import {
//   evmAddress as evmAddressDev,
//   ss58Address as ss58AddressDev,
// } from "@inkathon/contracts/deployments/flipper/dev"
import {
  evmAddress as evmAddressPop,
  ss58Address as ss58AddressPop,
} from "@inkathon/contracts/deployments/flipper/pop"
import { contracts } from "@polkadot-api/descriptors"

export const flipper = {
  contract: contracts.flipper,
  evmAddresses: {
    // dev: evmAddressDev,
    pop: evmAddressPop,
  },
  ss58Addresses: {
    // dev: ss58AddressDev,
    pop: ss58AddressPop,
  },
}
