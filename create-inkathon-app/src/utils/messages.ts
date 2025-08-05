import picocolors from "picocolors"

const pc = picocolors

export function displayIntro(): void {
  const divider = "━".repeat(68)
  console.log()
  console.log(divider)
  console.log(pc.bold("                    🦑 inkathon Boilerplate v6"))
  console.log(divider)
  console.log()
  console.log("Next generation full-stack boilerplate for ink! smart contracts")
  console.log("running on PolkaVM. Powered by Papi, ReactiveDOT, Pop CLI, and more.")
  console.log()
  console.log(`• Demo: ${pc.cyan("https://inkathon.xyz")}`)
  console.log(`• Repository: ${pc.cyan("https://github.com/scio-labs/inkathon")}`)
  console.log()
  console.log(divider)
  console.log()
}

export function displaySuccess(projectName: string, projectPath: string, directory: string): void {
  console.log(
    `\n${pc.green("Success!")} Created ${pc.bold(projectName)} at ${pc.cyan(projectPath)}\n`,
  )

  console.log("Get started by running:\n")
  console.log(pc.cyan(`  cd ${directory}`))
  console.log(pc.cyan("  bun run dev\n"))
}
