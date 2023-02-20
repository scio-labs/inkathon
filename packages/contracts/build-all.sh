#!/usr/bin/env bash -eu

# NOTE: Add contracts to this array to build them ⬇️
contracts=( "greeter" )

for i in "${contracts[@]}"
do
  echo -e "\nBuilding './$i/Cargo.toml'…"
  cargo contract build --release --quiet --manifest-path $i/Cargo.toml

  echo "Copying build files to './deployments/$i/'…"
  mkdir -p ./deployments/$i
  cp ./target/ink/$i/$i.contract ./deployments/$i/
  cp ./target/ink/$i/$i.wasm ./deployments/$i/
  cp ./target/ink/$i/$i.json ./deployments/$i/metadata.json
done