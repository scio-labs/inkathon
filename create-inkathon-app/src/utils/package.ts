import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

export function getPackageVersion(): string {
  const __dirname = fileURLToPath(new URL(".", import.meta.url))
  const packageJsonPath = resolve(__dirname, "../package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
  return packageJson.version
}

export function getEngineRequirements(): Record<string, string> | undefined {
  const __dirname = fileURLToPath(new URL(".", import.meta.url))
  const packageJsonPath = resolve(__dirname, "../package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))
  return packageJson.engines
}
