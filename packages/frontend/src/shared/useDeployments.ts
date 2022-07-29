import { deployments } from '@deployments/deployments'
import { useState } from 'react'
import { HardhatExportContracts } from 'src/types/hardhat'
import { useAsyncEffect } from 'use-async-effect'
import { Chain, useNetwork } from 'wagmi'
import { defaultChain } from './wagmiClient'

export const useDeployments = () => {
  const { chain } = useNetwork()
  const [useDefaultChain, setUseDefaultChain] = useState<boolean>()
  const [contractsChain, setContractsChain] = useState<Chain>()
  const [contractsChainId, setContractsChainId] = useState<number>()
  const [contracts, setContracts] = useState<HardhatExportContracts>()

  useAsyncEffect(async () => {
    const useDefaultChain = !chain?.id || chain.unsupported
    const contractsChain: Chain = useDefaultChain ? defaultChain : chain
    const contracts = (await deployments[contractsChain.id]).contracts

    setUseDefaultChain(useDefaultChain)
    setContractsChain(contractsChain)
    setContractsChainId(contractsChain.id)
    setContracts(contracts)
  }, [chain])

  return {
    useDefaultChain,
    contractsChain,
    contractsChainId,
    contracts,
  }
}
