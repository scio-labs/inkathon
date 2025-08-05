import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function updateTemplate(
  projectPath: string,
  displayName: string,
  packageName: string,
): Promise<void> {
  // Update root package.json
  await updatePackageJson(join(projectPath, "package.json"), packageName)

  // Update frontend package.json
  await updatePackageJson(join(projectPath, "frontend", "package.json"), `@${packageName}/frontend`)

  // Update contracts package.json
  await updatePackageJson(
    join(projectPath, "contracts", "package.json"),
    `@${packageName}/contracts`,
  )

  // Update README.md
  await updateReadme(join(projectPath, "README.md"), displayName)
}

async function updatePackageJson(filePath: string, name: string): Promise<void> {
  const content = await readFile(filePath, "utf-8")
  const pkg = JSON.parse(content)
  pkg.name = name

  // Update workspace dependencies to use the new namespace
  const basePackageName = name.startsWith("@")
    ? name.split("/")[0]?.slice(1)
    : name.split("/")[0] || name

  if (pkg.dependencies) {
    for (const [key, value] of Object.entries(pkg.dependencies)) {
      if (typeof value === "string") {
        if (
          value === "@inkathon/contracts" ||
          value === "workspace:*" ||
          value.includes("workspace:")
        ) {
          // Keep workspace dependencies as is
          pkg.dependencies[key] = "workspace:*"
        } else if (value.startsWith("@inkathon/")) {
          pkg.dependencies[key] = value.replace("@inkathon/", `@${basePackageName}/`)
        }
      }
    }
  }

  // Also update workspaces array in root package.json
  if (pkg.workspaces && Array.isArray(pkg.workspaces)) {
    // Remove create-inkathon-app from workspaces
    pkg.workspaces = pkg.workspaces.filter((ws: string) => ws !== "create-inkathon-app")
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
