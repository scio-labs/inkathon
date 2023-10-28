#!/bin/bash
set -eu

# The script creates an empty 'development.ts' file if it doesn't exist yet.
# This is kind of a hack to prevent a nasty Next.js error when running the frontend
# for the first time after deploying to a local node which forces to clear `frontend/.next`.

if [[ ! -e deployments/greeter/development.ts ]]; then
    echo "Creating empty 'development.ts'…"
    if command -v touch &> /dev/null; then
        touch deployments/greeter/development.ts
    else
        copy /b deployments/greeter/development.ts +,,
    fi
else
    echo "Great, 'development.ts' already exists! Skipping…"
fi
