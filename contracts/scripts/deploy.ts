import { deployContract, getSubstrateChain } from '@scio-labs/use-inkathon'
import * as dotenv from 'dotenv'
import { getDeploymentData } from './utils/getDeploymentData'
import { initPolkadotJs } from './utils/initPolkadotJs'
import { writeContractAddresses } from './utils/writeContractAddresses'

// Dynamic environment variables
const chainId = process.env.CHAIN || 'development'
dotenv.config({ path: `.env.${process.env.CHAIN || 'development'}` })

/**
 * Script that deploys the greeter contract and writes its address to a file.
 *
 * Parameters:
 *  - `DIR`: Directory to read deploy files & write contract addresses to (optional, defaults to `./src/deployments`)
 *  - `CHAIN`: Chain ID (optional, defaults to `development`)
 *
 * Example usage:
 *  - `CHAIN=alephzero-testnet pnpm run deploy`
 */
const main = async () => {
  // Initialization
  const chain = getSubstrateChain(chainId)
  if (!chain) throw new Error(`Chain '${chainId}' not found`)
  const accountUri = process.env.ACCOUNT_URI || '//Alice'
  const derivationPath = process.env.ACCOUNT_DERIVATION_PATH || ''
  const { api, account } = await initPolkadotJs(chain, `${accountUri}${derivationPath}`)

  // Deploy greeter contract
  let { abi, wasm } = await getDeploymentData('greeter')
  const greeter = await deployContract(api, account, abi, wasm, 'default', [])

  // Write contract addresses to `{contract}/{network}.ts` file(s)
  await writeContractAddresses(chain.network, { greeter })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
