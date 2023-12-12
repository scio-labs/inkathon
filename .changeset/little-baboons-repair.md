---
"@inkathon/contracts": patch
---

Further simplify contract scripts by moving required explicit types to `use-inkathon`. Also changing the module resolution setting in `tsconfig.json` to import directly from sub-paths like `@scio-labs/use-inkathon/types` which makes the scripts in a context like Next.js app-dir API routes.
