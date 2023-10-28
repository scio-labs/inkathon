#!/usr/bin/env bash
set -eu

# This script creates a default '.env.local' file if it doesn't exist yet.
# More information about environment variables: https://github.com/scio-labs/inkathon#environment-variables

if [[ ! -e .env.local ]]; then
    echo "Creating default '.env.local'…" 
    CP_CMD=$(command -v cp &> /dev/null && echo "cp" || echo "copy")
    $CP_CMD .env.local.example .env.local
else
    echo "Great, '.env.local' already exists! Skipping…"
fi
