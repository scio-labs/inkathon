import { exec } from "node:child_process"
import { rm } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"

const execAsync = promisify(exec)

export async function cloneRepository(targetPath: string): Promise<void> {
  const repoUrl = "https://github.com/scio-labs/inkathon.git"
  await execAsync(`git clone --depth 1 ${repoUrl} "${targetPath}"`)
}

export async function initializeGit(projectPath: string): Promise<void> {
  // Remove existing .git directory
  await rm(join(projectPath, ".git"), { recursive: true, force: true })

  // Initialize new repo
  await execAsync("git init", { cwd: projectPath })

  // Create initial commit
  await execAsync("git add -A", { cwd: projectPath })
  await execAsync('git commit -m "Initial commit from create-inkathon-app"', {
    cwd: projectPath,
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "create-inkathon-app",
      GIT_AUTHOR_EMAIL: "noreply@inkathon.xyz",
      GIT_COMMITTER_NAME: "create-inkathon-app",
      GIT_COMMITTER_EMAIL: "noreply@inkathon.xyz",
    },
  })
}
