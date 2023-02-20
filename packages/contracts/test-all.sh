#!/usr/bin/env bash -eu

# NOTE: Add contracts to this array to test them ⬇️
contracts=( "greeter" )

for i in "${contracts[@]}"
do
  echo -e "\Testing './$i/Cargo.toml'…"
  cargo test --manifest-path $i/Cargo.toml
done