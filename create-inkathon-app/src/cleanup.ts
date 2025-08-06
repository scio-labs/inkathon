import { readdir, rm } from "node:fs/promises"
import { join } from "node:path"

const DIRECTORIES_TO_REMOVE: string[] = [".changeset", ".github", "create-inkathon-app", "docs"]
const FILES_TO_REMOVE: string[] = []

async function cleanupDirectories(projectPath: string): Promise<void> {
  for (const dir of DIRECTORIES_TO_REMOVE) {
    try {
      await rm(join(projectPath, dir), { recursive: true, force: true })
    } catch (error) {
      // Silently continue if directory doesn't exist
    }
  }
}

async function cleanupFiles(projectPath: string): Promise<void> {
  for (const file of FILES_TO_REMOVE) {
    try {
      await rm(join(projectPath, file), { force: true })
    } catch (error) {
      // Silently continue if file doesn't exist
    }
  }
}

async function cleanupChangelogFiles(projectPath: string): Promise<void> {
  async function removeChangelogsRecursively(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories (except those we're already handling)
        if (entry.name === "node_modules" || (entry.name.startsWith(".") && entry.name !== ".")) {
          continue
        }
        await removeChangelogsRecursively(fullPath)
      } else if (entry.isFile() && entry.name === "CHANGELOG.md") {
        try {
          await rm(fullPath, { force: true })
        } catch (error) {
          // Silently continue if file cannot be removed
        }
      }
    }
  }

  await removeChangelogsRecursively(projectPath)
}

export async function cleanupRepository(projectPath: string): Promise<void> {
  await cleanupDirectories(projectPath)
  await cleanupFiles(projectPath)
  await cleanupChangelogFiles(projectPath)
}
