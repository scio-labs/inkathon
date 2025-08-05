import { execSync } from "node:child_process"
import { homedir } from "node:os"
import { join } from "node:path"

export function checkUnixShell(): boolean {
  const platform = process.platform
  return platform === "darwin" || platform === "linux"
}

export function checkBunInstalled(): boolean {
  try {
    execSync("bun --version", { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

export async function installBun(): Promise<void> {
  const { confirm } = await import("@inquirer/prompts")

  const shouldInstall = await confirm({
    message: "Bun is not installed. Would you like to install it now?",
    default: true,
  })

  if (!shouldInstall) {
    throw new Error("Bun is required to continue. Please install it manually: https://bun.sh")
  }

  console.log("\nInstalling Bun...")
  execSync("curl -fsSL https://bun.sh/install | bash", { stdio: "inherit" })

  // Add bun to PATH for current session
  const bunPath = join(homedir(), ".bun", "bin")
  process.env.PATH = `${bunPath}:${process.env.PATH}`

  // Verify installation
  if (!checkBunInstalled()) {
    throw new Error("Failed to install Bun. Please install it manually: https://bun.sh")
  }
}
