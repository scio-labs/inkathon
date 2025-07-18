#!/bin/bash
set -eu

# The script creates an empty 'dev.ts' file if it doesn't exist yet.
# This is kind of a hack to prevent a nasty Next.js error when running the frontend
# for the first time after deploying to a local node which forces to clear `frontend/.next`.

for dir in "./src/"*/; do
    contract_name=$(basename "${dir}")

    if [[ ! -e "./deployments/${contract_name}/dev.ts" ]]; then
        echo "Creating empty 'dev.ts' file for '${contract_name}'…"

        mkdir -p "./deployments/${contract_name}"

        if command -v touch &>/dev/null; then
            touch "./deployments/${contract_name}/dev.ts"
        else
            copy /b "deployments/${contract_name}/dev.ts" +,,
        fi
    else
        echo "Great, 'development.ts' for '${contract_name}' already exists! Skipping…"
    fi
done
