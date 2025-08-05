import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function updateTemplate(
  projectPath: string,
  displayName: string,
  packageName: string,
): Promise<void> {
  // Update root package.json
  await updatePackageJson(join(projectPath, "package.json"), true, packageName)

  // Update frontend package.json
  await updatePackageJson(join(projectPath, "frontend", "package.json"), false)

  // Update contracts package.json
  await updatePackageJson(join(projectPath, "contracts", "package.json"), false)

  // Update README.md
  await updateReadme(join(projectPath, "README.md"), displayName)
}

async function updatePackageJson(filePath: string, isRoot: boolean, name?: string): Promise<void> {
  const content = await readFile(filePath, "utf-8")
  const pkg = JSON.parse(content)

  if (isRoot) {
    // Update the name of the package
    if (!name) throw new Error("Project name is required for root package.json")
    pkg.name = name

    // Only keep `frontend` & `contracts` workspaces
    pkg.workspaces = ["frontend", "contracts"]

    // Clean up changeset-related items from root package.json
    if (pkg.scripts) {
      delete pkg.scripts["changeset:version"]
      delete pkg.scripts["changeset:publish"]
    }

    if (pkg.devDependencies) {
      delete pkg.devDependencies["@changesets/changelog-github"]
      delete pkg.devDependencies["@changesets/cli"]
    }
  }

  await writeFile(filePath, `${JSON.stringify(pkg, null, 2)}\n`)
}

async function updateReadme(filePath: string, displayName: string): Promise<void> {
  let content = await readFile(filePath, "utf-8")

  // Replace the main title (first line starting with #)
  content = content.replace(/^# .+$/m, `# ${displayName}`)

  // Replace inkathon mentions in the description
  content = content.replace(
    /> Next generation full-stack boilerplate.+$/m,
    `> Full-stack dApp built with ink! smart contracts and Next.js`,
  )

  await writeFile(filePath, content)
}
