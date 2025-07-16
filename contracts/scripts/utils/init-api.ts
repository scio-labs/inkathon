import type { dev } from "@polkadot-api/descriptors"
import { getWsProvider } from "@polkadot-api/ws-provider/web"
import { sr25519CreateDerive } from "@polkadot-labs/hdkd"
import { DEV_PHRASE, entropyToMiniSecret, mnemonicToEntropy } from "@polkadot-labs/hdkd-helpers"
import dotenv from "dotenv"
import { AccountId, createClient } from "polkadot-api"
import { getPolkadotSigner } from "polkadot-api/signer"
import yoctoSpinner from "yocto-spinner"
import papiJson from "../../.papi/polkadot-api.json"

// Dynamically load environment from `.env.{chainId}`
const chainId = process.env.CHAIN || "dev"
dotenv.config({ path: `.env.${chainId}`, quiet: true })

/**
 * Initializes the Polkadot API client, signer, and related utilities for a given chain.
 *
 * @options
 *  Environment variables:
 *    CHAIN         - Target chain to deploy the contract to (must be initialized with `bunx papi add <chain>`). Default: `dev`
 *    ACCOUNT_URI   - Account to deploy the contract from. If not set, uses `.env.{CHAIN}` or defaults to `//Alice`
 */
export async function initApi() {
  console.log()
  const spinner = yoctoSpinner({ text: "Initializing…" }).start()

  try {
    // Setup chain
    const chain = (await import("@polkadot-api/descriptors"))[chainId] as typeof dev
    const wsUrl = papiJson.entries[chainId as keyof typeof papiJson.entries]?.wsUrl
    if (!chain || !wsUrl) {
      throw new Error(
        `Chain '${chainId}' not found. Make sure to initialize with 'bunx papi add …' first!`,
      )
    }

    // Setup client & API
    const client = createClient(getWsProvider(wsUrl))
    const api = client.getTypedApi(chain)

    // Setup signer
    const accountUri = process.env.ACCOUNT_URI || "//Alice"
    const derive = sr25519CreateDerive(entropyToMiniSecret(mnemonicToEntropy(DEV_PHRASE)))
    const keyPair = derive(accountUri)
    const signer = getPolkadotSigner(keyPair.publicKey, "Sr25519", keyPair.sign)
    const ss58Address = AccountId().dec(signer.publicKey)

    spinner.success(`Initialized chain '${chainId}' with account '${ss58Address}'`)

    return {
      chain,
      client,
      api,
      keyPair,
      signer,
      ss58Address,
    }
  } catch (error) {
    spinner.error("Failed to initialize")
    throw error
  }
}
