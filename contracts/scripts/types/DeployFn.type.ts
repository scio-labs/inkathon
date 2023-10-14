import { deployContract } from '@scio-labs/use-inkathon'
import { InitParams } from '../utils/initPolkadotJs'

/**
 * Helper function type that deploys a contract with the given initialization
 * parameters from `initPolkadotJs` and generic contract arguments.
 */
export type DeployFn<T = any> = (
  initParams: InitParams,
  customArgs?: Partial<T>,
) => ReturnType<typeof deployContract>
