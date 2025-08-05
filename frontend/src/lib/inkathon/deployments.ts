// import {
//   evmAddress as evmAddressDev,
//   ss58Address as ss58AddressDev,
// } from "contracts/deployments/flipper/dev"

import { contracts } from "@polkadot-api/descriptors"
import {
  evmAddress as evmAddressPassethub,
  ss58Address as ss58AddressPassethub,
} from "contracts/deployments/flipper/passethub"
import {
  evmAddress as evmAddressPop,
  ss58Address as ss58AddressPop,
} from "contracts/deployments/flipper/pop"

export const flipper = {
  contract: contracts.flipper,
  evmAddresses: {
    // dev: evmAddressDev,
    pop: evmAddressPop,
    passethub: evmAddressPassethub,
  },
  ss58Addresses: {
    // dev: ss58AddressDev,
    pop: ss58AddressPop,
    passethub: ss58AddressPassethub,
  },
}
