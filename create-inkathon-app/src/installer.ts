import { exec } from "node:child_process"
import { promisify } from "node:util"

const execAsync = promisify(exec)

export async function installDependencies(projectPath: string): Promise<void> {
  await execAsync("bun install", {
    cwd: projectPath,
    env: {
      ...process.env,
      // Ensure Bun doesn't prompt for telemetry
      BUN_DISABLE_TELEMETRY: "1",
    },
  })
}

export async function runCodegen(projectPath: string): Promise<void> {
  await execAsync("bun run codegen", {
    cwd: projectPath,
    env: {
      ...process.env,
      BUN_DISABLE_TELEMETRY: "1",
    },
  })
}
