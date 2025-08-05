import { input } from "@inquirer/prompts"
import { toPackageName, validatePackageName, validateProjectName } from "./utils/validate.ts"

export interface ProjectNames {
  displayName: string
  packageName: string
  directory: string
}

export async function getProjectNames(defaultName?: string): Promise<ProjectNames> {
  // First prompt - human-friendly name
  const displayName = await input({
    message: "What is your project named?",
    default: defaultName || "My Inkathon App",
    validate: validateProjectName,
  })

  // Generate default package name
  const defaultPackageName = toPackageName(displayName)

  // Second prompt - package name (optional)
  const packageName = await input({
    message: "Package name:",
    default: defaultPackageName,
    validate: validatePackageName,
  })

  return {
    displayName: displayName.trim(),
    packageName: packageName.trim(),
    directory: packageName.trim(),
  }
}
