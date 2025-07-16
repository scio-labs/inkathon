import path from "node:path"
import dedent from "dedent"
import yoctoSpinner from "yocto-spinner"
import type { deployContract } from "./deploy-contract"

type WritableDeployment = Omit<Awaited<ReturnType<typeof deployContract>>, "contract">

/**
 * Writes each given contract address & block to a `{baseDir}/{contract}/{network}.ts` file.
 *
 * @options
 *  Environment variables:
 *    DIR           - Directory to write the contract addresses to. Default: `./deployments`
 */
export async function writeAddresses(
  deployments: { [name: string]: WritableDeployment },
  metadata?: { [key: string]: string | number },
) {
  console.log()
  const spinner = yoctoSpinner({ text: "Writing contract addresses…" }).start()

  try {
    const baseDir = process.env.DIR || "./deployments"
    const chainId = process.env.CHAIN || "dev"

    for (const [name, deployment] of Object.entries(deployments)) {
      const relativePath = path.join(baseDir, name, `${chainId}.ts`)
      const absolutePath = path.join(path.resolve(), relativePath)

      // Construct file content
      let fileContent = dedent`
        export const ss58Address = "${deployment.ss58Address}"
        export const evmAddress = "${deployment.evmAddress}"
        export const blockHash = "${deployment.block.hash}"
        export const blockNumber = ${deployment.block.number}
      `

      // Iterate over metadata keys and write them to the file
      if (metadata) {
        for (const [key, value] of Object.entries(metadata)) {
          const valueFormatted = typeof value === "string" ? `'${value}'` : value
          fileContent += `export const ${key} = ${valueFormatted}\n`
        }
      }

      // Write file
      await Bun.write(absolutePath, fileContent)

      spinner.success(`Exported deployment info to file '${relativePath}'`)
    }
  } catch (error) {
    spinner.error("Failed to write contract addresses")
    throw error
  }
}
