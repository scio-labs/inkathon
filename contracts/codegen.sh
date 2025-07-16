#!/usr/bin/env bash
set -eu

# ENVIRONMENT VARIABLES
DIR="${DIR:=./deployments}" # Directory of deployment files

# Determine all contracts under `$DIR`
contracts=($(find $DIR -maxdepth 1 -mindepth 1 -type d -print | xargs -n 1 basename))

# Generate types for all contracts
for i in "${contracts[@]}"
do
  echo -e "\nGenerating types for '$DIR/$i'…"
  bunx papi ink add $DIR/$i/$i.contract
done