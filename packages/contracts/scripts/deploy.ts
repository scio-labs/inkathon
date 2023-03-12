import { deployContract, getSubstrateChain } from '@scio-labs/use-inkathon'
import * as dotenv from 'dotenv'
import { getDeploymentData } from './utils/getDeploymentData'
import { initPolkadotJs } from './utils/initPolkadotJs'
import { writeContractAddresses } from './utils/writeContractAddresses'
dotenv.config({ path: `.env.${process.env.CHAIN}` })

const main = async () => {
  const chain = getSubstrateChain(process.env.CHAIN || 'development')
  if (!chain) throw new Error(`Chain '${process.env.CHAIN}' not found`)
  const accountUri = process.env.ACCOUNT_URI || '//Alice'
  const { api, account } = await initPolkadotJs(chain, accountUri)

  // Deploy greeter contract
  let { abi, wasm } = await getDeploymentData('greeter')
  const { address: greeterAddress } = await deployContract(api, account, abi, wasm, 'default', [])

  // Write contract addresses to `{contract}/{network}.ts` files
  await writeContractAddresses(chain.network, {
    greeter: greeterAddress,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
