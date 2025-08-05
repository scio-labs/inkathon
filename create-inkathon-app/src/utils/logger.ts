import picocolors from "picocolors"
import type { Spinner } from "yocto-spinner"
import createSpinner from "yocto-spinner"

const pc = picocolors

interface SpinnerInstance {
  success: (msg?: string) => void
  error: (msg?: string) => void
  stop: () => void
}

export const logger = {
  info: (msg: string) => console.log(`${pc.cyan("ℹ")}  ${msg}`),
  success: (msg: string) => console.log(`${pc.green("✓")}  ${msg}`),
  error: (msg: string) => console.log(`${pc.red("✗")}  ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow("⚠")}  ${msg}`),

  spinner: (text: string) => {
    let spinner: Spinner | null = null

    return {
      start: (): SpinnerInstance => {
        spinner = createSpinner({ text })
        spinner.start()

        return {
          success: (msg?: string) => {
            if (spinner) {
              spinner.success(msg || text)
            }
          },
          error: (msg?: string) => {
            if (spinner) {
              spinner.error(msg || text)
            }
          },
          stop: () => {
            if (spinner) {
              spinner.stop()
            }
          },
        }
      },
    }
  },
}
