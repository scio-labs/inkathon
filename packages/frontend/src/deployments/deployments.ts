import { HardhatExport } from 'src/types/hardhat'

/**
 * Aggregating all deployments in one object.
 * NOTE: After deploying to a new chain, a new entry has to be entered _manually_ here!
 */

export const deploymentsByChainId: {
  [chainId: number]: Promise<HardhatExport>
} = {
  [1337]: import(`src/deployments/1337.json`),
  [5]: import(`src/deployments/5.json`),
  [80001]: import(`src/deployments/80001.json`),
}
