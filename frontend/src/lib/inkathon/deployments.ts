// import {
//   evmAddress as evmAddressDev,
//   ss58Address as ss58AddressDev,
// } from "@inkathon/contracts/deployments/flipper/dev"

import {
  evmAddress as evmAddressPassethub,
  ss58Address as ss58AddressPassethub,
} from "@inkathon/contracts/deployments/flipper/passethub"
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
    passethub: evmAddressPassethub,
  },
  ss58Addresses: {
    // dev: ss58AddressDev,
    pop: ss58AddressPop,
    passethub: ss58AddressPassethub,
  },
}
