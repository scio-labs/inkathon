# inkathon v6 Boilerplate (Alpha)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Built with ink!](https://raw.githubusercontent.com/paritytech/ink/master/.images/badge.svg)](https://use.ink)
![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)

> Next generation full-stack boilerplate for ink! smart contracts running on PolkaVM. Powered by Papi, ReactiveDOT, Pop CLI, and more. – Perfect for kickstarting building hackathon projects.

**Join the discussion in our [Telegram Group](https://t.me/inkathon)** 💬

## About 📖

The inkathon boilerplate offers a complete setup for developing full-stack dApps on Polkadot with ink! smart contracts and Next.js. It now shines in new glory with full ink! v6 support powered by Papi, ReactiveDOT, Pop CLI, and more.

The inkathon boilerplate is almost as old as ink! itself. With accumulated over 200 stars, more than 250 public projects depending on it and the most active [ink! Telegram group](https://t.me/inkathon).

> [!NOTE]  
> Are you looking for the old ink! v5 compatible boilerplate? Check out the [`v1` branch](https://github.com/scio-labs/inkathon/tree/v1).

## Getting Started 🚀

- [1. Run the frontend](#1-run-the-frontend)
- [2. Build & deploy contracts on a local node](#2-build--deploy-contracts-on-a-local-node)
- [3. Connect the frontend to the local node](#3-connect-the-frontend-to-the-local-node)
- [4. Adding a new network](#4-adding-a-new-network)

### 1. Run the frontend

> [!IMPORTANT]
>
> - Setup Node.js v22 (recommended via [nvm](https://github.com/nvm-sh/nvm))
> - Install [Bun](https://bun.sh/)
> - Clone this repository

```bash
# Executed from the root directory
bun run install

# Executed from the root or /frontend directory
bun run dev
```

---

### 2. Build & deploy contracts on a local node

> [!IMPORTANT]
>
> - Setup your environment with Pop CLI: [Guide](https://learn.onpop.io/welcome/install-pop-cli)
> - Install `ink-node` by [downloading it's binary](https://github.com/use-ink/ink-node/releases)
> - Make `ink-node` available globally by moving it to `/usr/local/bin`

1. Add your contract (or just continue with the provided `flipper` example)
2. Build your contract

```bash
# Executed from the /contracts directory
bun run build
```

3. Run the local `ink-node` in the background

```bash
# Executed from the /contracts directory
bun run node
```

4. (Re-)generate PAPI types

```bash
# Executed from the /contracts directory
bun run codegen
```

5. Deploy your contract

Put your signers `ACCOUNT_URI` in `.env.<chain>` (e.g. `.env.pop`). By default, the `//Alice` account is used.

```bash
# Executed from the /contracts directory
# If `CHAIN` is not set, it will default to `dev`
CHAIN=pop bun run deploy
```

> [!NOTE]
>
> The `deploy.sh` script triggered by `bun run deploy` will automatically export the deployed contract addresses under `/contracts/deployments/<contract>/<chain>.ts`. These files are used to be cross-imported in the frontend in `frontend/src/lib/inkathon/deployments.ts`.

---

### 3. Connect the frontend to the local node

> [!NOTE]
>
> Tip: You can also run Next.js and `ink-node` in parallel via `bun run dev-and-node` (executed from the project root).

1. Go to `frontend/src/lib/reactive-dot/config.ts` and uncomment the `dev` chain
2. Go to `frontend/src/lib/inkathon/deployments.ts` and uncomment the `dev` address imports & exports
3. That's it! 🎉

---

### 4. Adding a new network

1. (Re-)generate PAPI types

```bash
# Executed from the /contracts directory
bunx papi add -w <websocket-url> <chain-name>
```

2. (Re-)deploy your contract

```bash
# Executed from the /contracts directory
CHAIN=<chain-name> bun run deploy
```

3. Add the new network to the frontend under `frontend/src/lib/reactive-dot/config.ts`
