import { usePolkadotProviderContext } from '@components/web3/PolkadotProvider'
import { ContractPromise } from '@polkadot/api-contract'
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
 * (Deployed) contract addresses by network identifier
 */
export type AddressesType = { [_: string]: Promise<{ address: string }> }
export type AllAddressesType = { [_ in ContractKeys]: AddressesType }
export const allAddresses: AllAddressesType = {
  [ContractKeys.greeter]: {
    'alephzero-testnet': import(`@inkathon/contracts/greeter/deployments/alephzero-testnet.json`),
  },
}

/**
 * (Deployed) contract abis
 */
export type AllABIsType = { [_ in ContractKeys]: Promise<any> }
export const allABIs: AllABIsType = {
  [ContractKeys.greeter]: import(`@inkathon/contracts/greeter/deployments/metadata.json`),
}

/**
 * Helper hook to access abis and addresses by active chain
 */
export const useDeployment = (key: keyof typeof ContractKeys) => {
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
    const addressJson = await allAddresses[key]?.[activeChain?.network]
    const address = addressJson?.address
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
