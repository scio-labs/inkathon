#!/usr/bin/env bash
set -eu

# ENVIRONMENT VARIABLES
CONTRACTS_DIR="${CONTRACTS_DIR:=./src}" # Base contract directory 

# Determine all contracts under `$CONTRACTS_DIR`
contracts=($(find $CONTRACTS_DIR -maxdepth 1 -type d -exec test -f {}/Cargo.toml \; -print | xargs -n 1 basename))

# Test all contracts
for i in "${contracts[@]}"
do
  echo -e "\nTesting '$CONTRACTS_DIR/$i/Cargo.toml'…"
  cargo test --manifest-path $CONTRACTS_DIR/$i/Cargo.toml
done