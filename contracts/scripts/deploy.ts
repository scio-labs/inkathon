import { contracts } from "@polkadot-api/descriptors"
import { deployContract } from "./utils/deploy-contract"
import { initApi } from "./utils/init-api"
import { writeAddresses } from "./utils/write-addresses"

/**
 * This script initializes the Polkadot API client and deploys the contract
 * using the provided utilities under './utils'.
 *
 * @options
 *  Environment variables:
 *    CHAIN         - Target chain to deploy the contract to (must be initialized with `bunx papi add <chain>`). Default: `dev`
 *    ACCOUNT_URI   - Account to deploy the contract from. If not set, uses `.env.{CHAIN}` or defaults to `//Alice`
 *    DIR           - Directory to write the contract addresses to. Default: `./deployments`
 *
 * @example
 * CHAIN=dev bun run deploy.ts
 */
const main = async () => {
  const initResult = await initApi()

  const deployResult = await deployContract(initResult, "flipper", contracts.flipper, "new", {
    init_value: true,
  })

  await writeAddresses({ flipper: deployResult })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
