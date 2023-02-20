import { writeFile } from 'fs/promises'
import path from 'path'

/**
 * Writes each given contract address record to a `{basePath}/{contract}/{network}.ts` file.
 */
export const writeContractAddresses = async (
  networkId: string,
  contractAddresses: Record<string, string>,
  basePath = './deployments',
) => {
  console.log()
  for (const [contractName, address] of Object.entries(contractAddresses)) {
    const addressFileRelativePath = path.join(basePath, contractName, `${networkId}.ts`)
    const addressFilePath = path.join(path.resolve(), addressFileRelativePath)
    const addressFileContents = `export const address = '${address}'\n`
    await writeFile(addressFilePath, addressFileContents)
    console.log(`Wrote address to file: ${addressFileRelativePath}`)
  }
}
