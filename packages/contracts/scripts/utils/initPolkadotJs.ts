import { ApiPromise, Keyring } from '@polkadot/api'
import { IKeyringPair } from '@polkadot/types/types/interfaces'
import { initPolkadotJs as initApi, SubstrateChain } from '@scio-labs/use-inkathon'

/**
 * Initialize Polkadot.js API with given RPC & account from given URI.
 */
export const initPolkadotJs = async (
  chain: SubstrateChain,
  uri: string,
): Promise<{ api: ApiPromise; account: IKeyringPair; decimals: number }> => {
  // Initialize api
  const { api } = await initApi(chain)

  // Print chain info
  const network = (await api.rpc.system.chain())?.toString() || ''
  const version = (await api.rpc.system.version())?.toString() || ''
  console.log(`Initialized API on ${network} (${version})`)

  // Get decimals
  const decimals = api.registry.chainDecimals?.[0] || 12

  // Initialize account & set signer
  const keyring = new Keyring({ type: 'sr25519' })
  const account = keyring.addFromUri(uri)
  console.log(`Initialized Accounts: ${account.address}\n`)

  return { api, account, decimals }
}
