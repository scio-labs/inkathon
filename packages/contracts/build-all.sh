#!/usr/bin/env bash -eu

# NOTE: Add contracts to this array to build them ⬇️
# IMPORTANT: Just use spaces (_no commas_) between multiple array items (it's a bash convention).
contracts=( "greeter" )

# NOTE: Modify the base output directory by setting the `DIR` environment variable.
DIR="${DIR:=./deployments}"

for i in "${contracts[@]}"
do
  echo -e "\nBuilding './$i/Cargo.toml'…"
  cargo contract build --release --quiet --manifest-path $i/Cargo.toml

  echo "Copying build files to '$DIR/$i/'…"
  mkdir -p $DIR/$i
  cp ./target/ink/$i/$i.contract $DIR/$i/
  cp ./target/ink/$i/$i.wasm $DIR/$i/
  cp ./target/ink/$i/$i.json $DIR/$i/metadata.json
done