export function validateProjectName(name: string): boolean | string {
  if (!name || name.trim().length === 0) {
    return "Project name cannot be empty"
  }
  return true
}

export function validatePackageName(name: string): boolean | string {
  if (!name || name.trim().length === 0) {
    return "Package name cannot be empty"
  }

  // npm package name validation
  if (!/^[a-z0-9][a-z0-9-_]*$/.test(name)) {
    return "Package name must start with a lowercase letter or number, and contain only lowercase letters, numbers, hyphens, and underscores"
  }

  if (name.length > 214) {
    return "Package name must be less than 214 characters"
  }

  return true
}

export function toPackageName(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/^[^a-z0-9]+/, "")
}
