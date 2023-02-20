import { readFile } from 'fs/promises'
import path from 'path'

/**
 * Reads the contract deployment files (wasm & abi) from the `basePath` directory.
 */
export const getDeploymentData = async (contractName: string, basePath = './deployments') => {
  const contractPath = path.join(path.resolve(), basePath, contractName)
  let abi, wasm
  try {
    abi = JSON.parse(await readFile(path.join(contractPath, 'metadata.json'), 'utf-8'))
    wasm = await readFile(path.join(contractPath, `${contractName}.wasm`))
  } catch (e) {
    console.error(e)
    throw new Error("Couldn't find contract deployment files. Did you build it via `pnpm build`?")
  }

  return {
    contractPath,
    abi,
    wasm,
  }
}
