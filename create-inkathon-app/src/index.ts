#!/usr/bin/env node
import { run } from "./cli.ts"

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
