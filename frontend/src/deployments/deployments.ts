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

  for (const networkId of networks) {
    for (const contractId of Object.values(ContractIds)) {
      const abi = await import(`@inkathon/contracts/deployments/${contractId}/${contractId}.json`)
      const { address } = await import(
        `@inkathon/contracts/deployments/${contractId}/${networkId}.ts`
      )

      deployments.push({ contractId, networkId, abi, address })
    }
  }

  return deployments
}
