/**
 * Output-types by the hardhat-deploy plugins json-export
 * https://github.com/wighawag/hardhat-deploy/blob/master/types.ts
 */

export interface HardhatContractExport {
  address: string
  abi: any[]
  linkedData?: any
}

export type HardhatExportContracts = {
  [name: string]: HardhatContractExport
}

export interface HardhatExport {
  chainId: string
  name: string
  contracts: HardhatExportContracts
}

export type HardhatMultiExport = {
  [chainId: string]: HardhatExport[]
}
