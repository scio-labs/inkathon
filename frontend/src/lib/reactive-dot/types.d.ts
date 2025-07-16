import type { config } from "./config.js"

declare module "@reactive-dot/core" {
  export interface Register {
    config: typeof config
  }
}
