import { usePolkadotProviderContext } from '@components/web3/PolkadotProvider'
import { ContractPromise } from '@polkadot/api-contract'
import { alephzeroTestnet, development } from '@shared/chains'
import { useEffect, useState } from 'react'

/**
 * All deployed contracts for ABIs and/or addresses below
 */
export enum ContractKeys {
  Greeter = 'Greeter',
}

/**
 * (Deployed) contract addresses by network identifier
 */
export type AddressesType = { [_ in ContractKeys]?: string }
export type AllAddressesType = { [_ in ContractKeys]: { [_: string]: string } }
export const allAddresses: AllAddressesType = {
  [ContractKeys.Greeter]: {
    [development.network]: '5H8rGukb2DiVwXpcQ68FaNuyQHVm8tgCS6H3n71njwWiMvHu',
    [alephzeroTestnet.network]: '5CbJV57ky3XyPi9F9rU69KYU3wNHRE3BixFDLSrgurkWQTB4',
  },
}

/**
 * (Deployed) contract abis
 */
export type AllABIsType = { [_ in ContractKeys]?: Promise<object> }
export const allABIs = {
  [ContractKeys.Greeter]: import('@inkathon/contracts/greeter/abi/metadata.json'), // TODO
}

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
    const address = allAddresses[key]?.[activeChain?.network]
    setContractAddress(address)
    setContract(api ? new ContractPromise(api, abi, address) : undefined)
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
