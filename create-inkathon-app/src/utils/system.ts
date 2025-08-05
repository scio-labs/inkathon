import { execSync } from "node:child_process"

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

export function checkGitInstalled(): boolean {
  try {
    execSync("git --version", { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}
