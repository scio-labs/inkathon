import picocolors from "picocolors"
import type { Spinner } from "yocto-spinner"
import createSpinner from "yocto-spinner"

const pc = picocolors

const isUnicodeSupported =
  process.platform !== "win32" ||
  Boolean(process.env.WT_SESSION) || // Windows Terminal
  process.env.TERM_PROGRAM === "vscode"

const symbols = {
  info: isUnicodeSupported ? "ℹ" : "i",
  success: isUnicodeSupported ? "✔" : "√",
  error: isUnicodeSupported ? "✖" : "×",
  warn: isUnicodeSupported ? "⚠" : "‼",
}

interface SpinnerInstance {
  success: (msg?: string) => void
  error: (msg?: string) => void
  stop: () => void
}

export const logger = {
  info: (msg: string) => console.log(`${pc.cyan(symbols.info)}  ${msg}`),
  success: (msg: string) => console.log(`${pc.green(symbols.success)}  ${msg}`),
  error: (msg: string) => console.log(`${pc.red(symbols.error)}  ${msg}`),
  warn: (msg: string) => console.log(`${pc.yellow(symbols.warn)}  ${msg}`),

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
