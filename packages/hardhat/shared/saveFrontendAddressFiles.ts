import { exec } from 'child_process'
import fs from 'fs'
import hre, { config, ethers } from 'hardhat'
import path from 'path'

/**
 * Helper function to store contract addresses in .ts files
 */
export const saveFrontendAddressFiles = async (
  contracts: Record<string, string>,
  doPrettify = true
) => {
  // Create adresses/ directory
  const addressesDir = path.join(config.paths.artifacts, `../addresses`)
  fs.mkdirSync(addressesDir, { recursive: true })

  // Lowercase all addresses
  for (const contractKey of Object.keys(contracts)) {
    contracts[contractKey] = ethers.utils.getAddress(contracts[contractKey])
  }

  // Create {chainId}.ts
  const chainId = hre.network.config.chainId || 1337
  const addressesFilePath = path.join(addressesDir, `${chainId}.ts`)
  const addressesFileContents = `export const ContractAddresses_${chainId} = ${JSON.stringify(
    contracts,
    null,
    2
  )}`
  fs.writeFileSync(addressesFilePath, addressesFileContents)

  // Create addresses.ts (index-file)
  const chainIds = fs
    .readdirSync(addressesDir)
    .filter((name) => name?.endsWith('.ts') && !['index.ts', 'addresses.ts'].includes(name))
    .map((name) => name?.replace('.ts', ''))
  chainIds.sort()
  let indexFileContents = chainIds.reduce(
    (acc, val) => acc + `import { ContractAddresses_${val} } from './${val}'\n`,
    ''
  )
  indexFileContents += `export const ContractAddresses = {`
  indexFileContents += chainIds.reduce(
    (acc, val) => acc + `'${val}': ContractAddresses_${val},\n`,
    ''
  )
  indexFileContents += `}\n`
  indexFileContents += `export type ContractAddressesKey = keyof typeof ContractAddresses`
  const indexFilePath = path.join(addressesDir, 'addresses.ts')
  fs.writeFileSync(indexFilePath, indexFileContents)

  // Prettify all generated files
  if (doPrettify) {
    await exec(`npx prettier --write ${addressesDir}`)
  }
}
