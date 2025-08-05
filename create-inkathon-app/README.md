# create-inkathon-app

Create ink! smart contract dApps with one command.

## Usage

```bash
npx create-inkathon-app@latest
```

Or with a project name:

```bash
npx create-inkathon-app@latest my-dapp
```

## What it does

This CLI tool helps you scaffold a new inkathon project by:

1. Cloning the latest inkathon boilerplate
2. Customizing the project with your chosen name
3. Installing dependencies with Bun
4. Generating TypeScript types for smart contracts
5. Initializing a fresh git repository

## Requirements

- Unix shell (Linux or macOS)
- Node.js >= 20
- Bun
- Git

## Options

```
-y, --yes      Skip prompts and use defaults
--use-npm      Use npm instead of bun (not recommended)
-h, --help     Display help
-V, --version  Display version
```

## Development

Check out the [inkathon repository](https://github.com/scio-labs/inkathon) for more information.

## License

GPL-3.0
