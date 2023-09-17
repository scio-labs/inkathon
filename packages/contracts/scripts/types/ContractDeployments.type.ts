import { deployContract } from '@scio-labs/use-inkathon'

/**
 * Helper type that maps contract names to their deployment results.
 */
export type ContractDeployments = Record<string, Awaited<ReturnType<typeof deployContract>>>
