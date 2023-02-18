import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { IKeyringPair } from '@polkadot/types/types/interfaces'

/**
 * Initialize Polkadot.js API with given RPC & account from given URI.
 */
export const initPolkadotJs = async (
  rpc: string | string[],
  uri: string,
): Promise<{ api: ApiPromise; account: IKeyringPair }> => {
  // Initialize api
  if (Array.isArray(rpc)) rpc = rpc?.[0]
  if (!rpc) throw new Error('No RPC given')
  const provider = new WsProvider(rpc)
  const api = await ApiPromise.create({ provider, noInitWarn: true })

  // Print chain info
  const chain = (await api.rpc.system.chain())?.toString() || ''
  const version = (await api.rpc.system.version())?.toString() || ''
  console.log(`Initialized API on ${chain} (${version})`)

  // Initialize account
  const keyring = new Keyring({ type: 'sr25519' })
  const account = keyring.addFromUri(uri)
  console.log(`Initialized Account: ${account.address}\n`)

  return { api, account }
}
