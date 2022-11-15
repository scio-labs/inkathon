# Azero Domains – Smart Contracts

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Built with ink!](https://raw.githubusercontent.com/paritytech/ink/master/.images/badge.svg)](https://github.com/paritytech/ink)

This repository contains all smart contracts of the [azero.domains](https://azero.domains) domain name service.

## Documentation

Wip is accessible under [docs.azero.domains](https://docs.azero.domains) and hosted under: https://github.com/azero-domains/docs.

## Development

```bash
# Prerequisites
# Install Rust & Cargo: https://doc.rust-lang.org/cargo/getting-started/installation.html

# Build all contracts
./build-all.sh
# Build single contract
cargo +nightly contract build --manifest-path azd_registry/Cargo.toml

# Run all tests
./test-all.sh
# Run tests for single contract
cargo +nightly contract test --manifest-path azd_registry/Cargo.toml
```

You can upload the contracts using [Contracts UI](https://contracts-ui.substrate.io/).
If you want to test it locally, [`substrate-contracts-node`](https://ink.substrate.io/getting-started/setup/#installing-the-substrate-smart-contracts-node)
is an easy way to get a local smart contract chain running.


