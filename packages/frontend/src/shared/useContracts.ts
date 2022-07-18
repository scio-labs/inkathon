import { ContractAddresses, ContractAddressesKey } from '@addresses'
import { useEffect, useState } from 'react'
import { Chain, useNetwork } from 'wagmi'
import { defaultChain } from './wagmiClient'

export const useContracts = () => {
  const { chain } = useNetwork()
  const [useDefaultChain, setUseDefaultChain] = useState<boolean>(true)
  const [contractsChain, setContractsChain] = useState<Chain>(defaultChain)
  const contractsChainId = contractsChain.id.toString() as ContractAddressesKey
  const [contracts, setContracts] = useState(ContractAddresses[contractsChainId])

  useEffect(() => {
    const hasChainContracts =
      chain?.id && Object.keys(ContractAddresses).includes(chain.id.toString())
    const useDefaultChain = !!chain?.unsupported || !hasChainContracts
    const contractsChain: Chain = useDefaultChain ? defaultChain : chain
    const contractsChainId = contractsChain.id.toString() as ContractAddressesKey
    const contracts = ContractAddresses[contractsChainId]

    setUseDefaultChain(useDefaultChain)
    setContractsChain(contractsChain)
    setContracts(contracts)
  }, [chain])

  return {
    useDefaultChain,
    contractsChain,
    contractsChainId,
    contracts,
  }
}
