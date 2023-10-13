import { env } from '@config/environment'
import { SubstrateDeployment } from '@scio-labs/use-inkathon'

/**
 * TODO: Add or change your contract ids here
 */
export enum ContractIds {
  Greeter = 'greeter',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const networks = env.supportedChains
  const deployments: SubstrateDeployment[] = []

  for (const network of networks) {
    for (const contractId of Object.values(ContractIds)) {
      deployments.push({
        contractId: ContractIds.Greeter,
        networkId: network,
        abi: await import(`@inkathon/contracts/deployments/${contractId}/${contractId}.json`),
        address: (await import(`@inkathon/contracts/deployments/${contractId}/${network}.ts`))
          .address,
      })
    }
  }

  return deployments
}
