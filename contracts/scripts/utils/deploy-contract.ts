import { createReviveSdk, type GenericInkDescriptors } from "@polkadot-api/sdk-ink"
import { Binary } from "polkadot-api"
import yoctoSpinner from "yocto-spinner"
import type { initApi } from "./init-api"

/**
 * Deploys a contract to the specified chain.
 */
export async function deployContract<
  D extends GenericInkDescriptors,
  L extends string & keyof D["__types"]["constructors"],
>(
  initResult: Awaited<ReturnType<typeof initApi>>,
  name: string,
  descriptors: D,
  constructorName: L,
  constructorArgs: D["__types"]["constructors"][L]["message"],
) {
  console.log()
  const spinner = yoctoSpinner({ text: "Deploying contract…" }).start()

  try {
    const { api, ss58Address: ss58SignerAddress, signer } = initResult

    // Load contract binary code
    const path = `./deployments/${name}/${name}.polkavm`
    const file = Bun.file(path)
    const blob = await file.bytes()
    const code = Binary.fromBytes(blob)
    const contractSdk = createReviveSdk(api, descriptors)

    // Check if account is mapped
    const isMapped = await contractSdk.addressIsMapped(ss58SignerAddress)
    if (!isMapped) {
      const txResult = await api.tx.Revive.map_account().signAndSubmit(signer)
      if (!txResult.ok) {
        console.error(txResult.dispatchError)
        throw new Error("Failed to map account")
      }
    }

    // Build deployment payload
    const constructorPayload = {
      origin: ss58SignerAddress,
      data: constructorArgs,
    }
    const deployer = contractSdk.getDeployer(code)

    // Determine deployment address
    const evmAddress = await deployer.estimateAddress(constructorName, constructorPayload)
    if (!evmAddress) {
      throw new Error("Failed to estimate deployment address")
    }

    // Deploy contract
    const txResult = await deployer
      .deploy(constructorName, constructorPayload)
      .signAndSubmit(signer)

    if (!txResult.ok) {
      console.error(txResult.dispatchError)
      throw new Error("Failed to deploy contract")
    }

    const contract = contractSdk.getContract(evmAddress)
    const ss58Address = contract.accountId.toString()

    spinner.success(`📜 Deployed contract '${name}' at address '${ss58Address}' (${evmAddress})`)

    return { contract, evmAddress, ss58Address, block: txResult.block }
  } catch (error) {
    spinner.error("Failed to deploy contract")
    throw error
  }
}
