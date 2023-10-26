#!/usr/bin/env bash
set -eu

# ENVIRONMENT VARIABLES
CONTRACTS_DIR="${CONTRACTS_DIR:=./src}" # Base contract directory 
OUT_DIR="${OUT_DIR:=./deployments}" # Output directory for build files

# Store all folder names under `CONTRACTS_DIR` in an array
contracts=()
for d in $CONTRACTS_DIR/* ; do
  if [ -d "$d" ] && [ -f "$d/Cargo.toml" ]; then
    contracts+=($(basename $d))
  fi
done

# Testing all contracts
for i in "${contracts[@]}"
do
  echo -e "\nTesting '$CONTRACTS_DIR/$i/Cargo.toml'…"
  cargo test --manifest-path $CONTRACTS_DIR/$i/Cargo.toml
done