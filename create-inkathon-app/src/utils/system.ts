import { execSync } from "node:child_process"
import semver from "semver"

export function checkUnixShell(): boolean {
  const platform = process.platform
  return platform === "darwin" || platform === "linux"
}

export function checkNodeVersion(requiredVersion: string): {
  isValid: boolean
  currentVersion: string
  requiredVersion: string
} {
  const currentVersion = process.version
  const isValid = semver.satisfies(currentVersion, requiredVersion)

  return {
    isValid,
    currentVersion,
    requiredVersion,
  }
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
