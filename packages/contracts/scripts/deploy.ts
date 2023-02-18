import { deployContract, getSubstrateChain } from '@scio-labs/use-inkathon'
import * as dotenv from 'dotenv'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { initPolkadotJs } from './utils/initPolkadotJs'
dotenv.config({ path: `.env.${process.env.CHAIN}` })

const main = async () => {
  const accountUri = process.env.ACCOUNT_URI || '//Alice'
  const chain = getSubstrateChain(process.env.CHAIN || 'development')
  if (!chain) throw new Error(`Chain '${process.env.CHAIN}' not found`)

  const { api, account } = await initPolkadotJs(chain.rpcUrls, accountUri)

  // Deploy greeter contract
  const deploymentsRelativePath = './deployments/greeter'
  const greeterPath = path.join(path.resolve(), deploymentsRelativePath)
  const greeterWasm = await readFile(path.join(greeterPath, 'greeter.wasm'))
  const greeterAbi = JSON.parse(await readFile(path.join(greeterPath, 'metadata.json'), 'utf-8'))
  const { address } = await deployContract(api, account, greeterAbi, greeterWasm, 'default')

  // Write address to file
  const addressFileRelativePath = path.join(deploymentsRelativePath, `${chain.network}.ts`)
  const addressFileContents = `export const address = '${address}'\n`
  await writeFile(path.join(path.resolve(), addressFileRelativePath), addressFileContents)
  console.log(`Wrote address to file: ${addressFileRelativePath}`)
}

main()
  .catch((error) => () => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
