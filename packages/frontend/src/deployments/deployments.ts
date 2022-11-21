import { usePolkadotProviderContext } from '@components/web3/PolkadotProvider'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import { env } from '@shared/environment'
import { useEffect, useState } from 'react'

/**
 * All deployed contracts for ABIs and/or addresses below
 * NOTE: Add new contracts here
 * IMPORTANT: The respective abi & address jsons must be under `/packages/contracts/${contract}/deployments/`
 */
export enum ContractKeys {
  greeter = 'greeter',
}

/**
 * IMPORTANT: CHANGE NOTHING BELOW JUST FOR ADDING CONTRACTS
 * Imports are inferred dynamically from `ContractKeys` and `supportedChains` from the environment.
 */

/**
 * (Deployed) contract addresses by network identifier
 */
export type AddressesType = { [_: string]: Promise<{ address: string }> }
export type AllAddressesType = { [_ in ContractKeys]: AddressesType }
export const allAddresses = Object.keys(ContractKeys).reduce<AllAddressesType>(
  (acc, contract) => ({
    ...acc,
    [contract]: env.supportedChains.reduce(
      (acc: AddressesType, chain: string) => ({
        ...acc,
        [chain]: import(`@inkathon/contracts/${contract}/deployments/${chain}.json`),
      }),
      {},
    ),
  }),
  {} as AllAddressesType,
)

/**
 * (Deployed) contract abis
 */
export type AllABIsType = { [_ in ContractKeys]: Promise<Abi> }
export const allABIs = Object.keys(ContractKeys).reduce<AllABIsType>(
  (acc, contract) => ({
    ...acc,
    [contract]: import(`@inkathon/contracts/${contract}/deployments/metadata.json`),
  }),
  {} as AllABIsType,
)

/**
 * Helper hook to access abis and addresses by active chain
 */
export const useDeployment = (key: ContractKeys) => {
  const { api, activeChain } = usePolkadotProviderContext()
  const [contractABI, setContractABI] = useState<object>()
  const [contractAddress, setContractAddress] = useState<string>()
  const [contract, setContract] = useState<ContractPromise>()

  const update = async () => {
    if (!activeChain?.network) {
      setContractABI(undefined)
      setContractAddress(undefined)
      setContract(undefined)
      return
    }
    const abi = await allABIs[key]
    setContractABI(abi)
    const address = (await allAddresses[key]?.[activeChain?.network])?.address
    setContractAddress(address)
    const contract = api && address ? new ContractPromise(api, abi, address) : undefined
    setContract(contract)
  }
  useEffect(() => {
    update()
  }, [api])

  return {
    contractABI,
    contractAddress,
    contract,
  }
}
