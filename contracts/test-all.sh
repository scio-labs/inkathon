#!/usr/bin/env bash -eu

# NOTE: Add contracts to this array to test them ⬇️
# IMPORTANT: Just use spaces (_no commas_) between multiple array items (it's a bash convention).
contracts=( "greeter" )

for i in "${contracts[@]}"
do
  echo -e "\Testing './$i/Cargo.toml'…"
  cargo test --manifest-path $i/Cargo.toml
done