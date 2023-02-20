import { BN } from '@polkadot/util'
import {
  deployContract,
  getGasLimit,
  getMaxGasLimit,
  getSubstrateChain,
} from '@scio-labs/use-inkathon'
import * as dotenv from 'dotenv'
import { getDeploymentData } from './utils/getDeploymentData'
import { initPolkadotJs } from './utils/initPolkadotJs'
import { writeContractAddresses } from './utils/writeContractAddresses'
dotenv.config({ path: `.env.${process.env.CHAIN}` })

const main = async () => {
  const accountUri = process.env.ACCOUNT_URI || '//Alice'
  const chain = getSubstrateChain(process.env.CHAIN || 'development')
  if (!chain) throw new Error(`Chain '${process.env.CHAIN}' not found`)

  const { api, account } = await initPolkadotJs(chain.rpcUrls, accountUri)
  const gasLimit =
    chain.network === 'shibuya'
      ? getGasLimit(api, new BN(100_000_000_000), null)
      : getMaxGasLimit(api)

  // Deploy greeter contract
  let { abi, wasm } = await getDeploymentData('greeter')
  const { address: greeterAddress } = await deployContract(api, account, abi, wasm, 'default', [], {
    gasLimit,
  })

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
