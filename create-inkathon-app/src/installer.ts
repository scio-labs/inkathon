import { exec } from "node:child_process"
import { promisify } from "node:util"

const execAsync = promisify(exec)

const getExecOptions = (projectPath: string) => ({
  cwd: projectPath,
  env: {
    ...process.env,
    // Ensure Bun doesn't prompt for telemetry
    BUN_DISABLE_TELEMETRY: "1",
  },
})

export async function installDependencies(projectPath: string): Promise<void> {
  await execAsync("bun install", getExecOptions(projectPath))
}

export async function runCodegen(projectPath: string): Promise<void> {
  await execAsync("bun run codegen", getExecOptions(projectPath))
}
