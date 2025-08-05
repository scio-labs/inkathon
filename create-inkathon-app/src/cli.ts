import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { Command } from "commander"
import picocolors from "picocolors"
import { cleanupRepository } from "./cleanup.ts"
import { cloneRepository, initializeGit } from "./git.ts"
import { installDependencies, runCodegen } from "./installer.ts"
import { getProjectNames } from "./prompts.ts"
import { updateTemplate } from "./template.ts"
import { logger } from "./utils/logger.ts"
import { displayIntro, displaySuccess } from "./utils/messages.ts"
import { getEngineRequirements, getPackageVersion } from "./utils/package.ts"
import {
  checkBunInstalled,
  checkGitInstalled,
  checkNodeVersion,
  checkUnixShell,
} from "./utils/system.ts"

const pc = picocolors

export async function run(): Promise<void> {
  const program = new Command()

  program
    .name("create-inkathon-app")
    .description("Create ink! smart contract dApps with one command")
    .version(getPackageVersion())
    .argument("[project-name]", "Name of your project")
    .option("-y, --yes", "Skip prompts and use defaults")
    .parse()

  const options = program.opts()
  const args = program.args

  displayIntro()

  // Check system requirements
  if (!checkUnixShell()) {
    logger.error("This tool requires a Unix shell (Linux or macOS). Windows is not supported yet.")
    process.exit(1)
  }

  // Check Node.js version
  const engines = getEngineRequirements()
  if (engines?.node) {
    const nodeCheck = checkNodeVersion(engines.node)
    if (!nodeCheck.isValid) {
      logger.error(
        `Node.js version ${pc.bold(nodeCheck.currentVersion)} does not satisfy the required version ${pc.bold(
          nodeCheck.requiredVersion,
        )}.`,
      )
      logger.info("Please update Node.js to continue.")
      logger.info(
        "Visit https://github.com/nvm-sh/nvm (recommended) or https://nodejs.org for installation instructions.",
      )
      process.exit(1)
    }
  }

  // Check Git installation
  if (!checkGitInstalled()) {
    logger.error("Git is not installed. Please install Git to continue.")
    logger.info("Visit https://git-scm.com/downloads for installation instructions.")
    process.exit(1)
  }

  // Check Bun installation
  if (!checkBunInstalled()) {
    logger.error("Bun is not installed. Please install Bun to continue.")
    logger.info("Visit https://bun.sh for installation instructions.")
    process.exit(1)
  }

  // Get project names
  const projectNames = options.yes
    ? {
        displayName: args[0] || "My Inkathon App",
        packageName: args[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "-") || "my-inkathon-app",
        directory: args[0]?.toLowerCase().replace(/[^a-z0-9-]/g, "-") || "my-inkathon-app",
      }
    : await getProjectNames(args[0])

  const projectPath = resolve(process.cwd(), projectNames.directory)

  // Check if directory already exists
  if (existsSync(projectPath)) {
    logger.error(
      `Directory ${pc.bold(projectNames.directory)} already exists. Please choose a different name.`,
    )
    process.exit(1)
  }

  console.log(`\nCreating a new inkathon app in ${pc.cyan(projectPath)}...\n`)

  // Clone repository
  const cloneSpinner = logger.spinner("Cloning inkathon repository...").start()
  try {
    await cloneRepository(projectPath)
    cloneSpinner.success("Repository cloned successfully")
  } catch (error) {
    cloneSpinner.error("Failed to clone repository")
    logger.error((error as Error).message)
    process.exit(1)
  }

  // Cleanup repository
  const cleanupSpinner = logger.spinner("Cleaning up repository...").start()
  try {
    await cleanupRepository(projectPath)
    cleanupSpinner.success("Repository cleaned up successfully")
  } catch (error) {
    cleanupSpinner.error("Failed to clean up repository")
    logger.warn((error as Error).message)
    // Don't exit here, cleanup is not critical
  }

  // Update template
  const templateSpinner = logger.spinner("Updating project files...").start()
  try {
    await updateTemplate(projectPath, projectNames.displayName, projectNames.packageName)
    templateSpinner.success("Project files updated successfully")
  } catch (error) {
    templateSpinner.error("Failed to update project files")
    logger.error((error as Error).message)
    process.exit(1)
  }

  // Install dependencies
  const installSpinner = logger.spinner("Installing dependencies...").start()
  try {
    await installDependencies(projectPath)
    installSpinner.success("Dependencies installed successfully")
  } catch (error) {
    installSpinner.error("Failed to install dependencies")
    logger.error((error as Error).message)
    process.exit(1)
  }

  // Run codegen
  const codegenSpinner = logger.spinner("Generating types with PAPI...").start()
  try {
    await runCodegen(projectPath)
    codegenSpinner.success("PAPI types generated successfully")
  } catch (error) {
    codegenSpinner.error("Failed to generate PAPI types")
    logger.warn((error as Error).message)
    // Don't exit here, codegen might fail if no contracts are deployed yet
  }

  // Initialize git
  const gitSpinner = logger.spinner("Initializing git repository...").start()
  try {
    await initializeGit(projectPath)
    gitSpinner.success("Git repository initialized")
  } catch (error) {
    gitSpinner.error("Failed to initialize git repository")
    logger.warn((error as Error).message)
    // Don't exit here, git init is not critical
  }

  // Success message
  displaySuccess(projectNames.displayName, projectPath, projectNames.directory)
}
