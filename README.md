![inkathon Devtooling Banner](inkathon-devtooling-banner.png)

# ink!athon Boilerplate

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Built with ink!](https://raw.githubusercontent.com/paritytech/ink/master/.images/badge.svg)](https://github.com/paritytech/ink)
![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)

This is a full-stack dApp boilerplate for ink! smart contracts with an integrated frontend. It can be used to quickly start developing your hackathon idea or to scaffold a production-ready Web3 application.

The project is part of a [Scio Labs](https://scio.xyz) initiative to improve the developer experience in the ink! ecosystem:

- `create-ink-app` CLI (_Coming soon_)
- [`ink!athon`](https://github.com/scio-labs/inkathon) Boilerplate
- [`useInkathon`](https://github.com/scio-labs/use-inkathon) Hooks & Utility Library
- [`zink!`](https://github.com/scio-labs/zink) Smart Contract Macros

**Join the discussion in our [Telegram Group](https://t.me/inkathon)** 💬

**Table of Contents:**

1. [Getting started](#getting-started)
   1. [1. Run the frontend](#1-run-the-frontend)
   2. [2. Build \& deploy contracts on a local node](#2-build--deploy-contracts-on-a-local-node)
   3. [3. Run the frontend against the local node](#3-run-the-frontend-against-the-local-node)
2. [The Stack](#the-stack)
3. [Live Examples](#live-examples)
4. [Customization](#customization)
   1. [Project Name](#project-name)
   2. [Custom Contracts](#custom-contracts)
5. [Deployment](#deployment)
   1. [Environment Variables](#environment-variables)
   2. [Contract Deployment](#contract-deployment)
6. [VSCode Setup](#vscode-setup)
   1. [Workspace](#workspace)
   2. [Plugins](#plugins)
7. [FAQs \& Troubleshooting](#faqs--troubleshooting)

---

## About

TODO: About Section (Scio, EFP, AZERO.ID)

## Getting started

The boilerplate comes with a small sample ink! `Greeter` contract. It stores a `message` (the "greeting") and allows anyone to update it. The frontend contains simple UI components to connect your wallet and interact with the contract (i.e. read & write the `message`). Try it out live on [inkathon.xyz](https://inkathon.xyz).

_This section will guide you through setting up and running the boilerplate locally._

### 1. Run the frontend

The frontend works out of the box, without a local node running, as the sample contract is pre-deployed one certain live testnets (i.e. `alephzero-testnet` and `shibuya`). Necessary deployment metadata and addresses are provided under `contracts/deployments/`.

> **Pre-requisites:**
>
> - Setup Node.js v16+ (recommended via [nvm](https://github.com/nvm-sh/nvm))
> - Install [pnpm](https://pnpm.io/installation) (recommended via [Node.js Corepack](https://nodejs.org/api/corepack.html))
> - Clone this repository

```bash
# Install dependencies (once)
# NOTE: This automatically creates an `.env.local` file
pnpm install

# Start Next.js frontend
pnpm run dev
```

### 2. Build & deploy contracts on a local node

The `contracts/package.json` file contains shorthand scripts for building, testing, and deploying your contracts. To run those, the active working directory of your terminal needs to be `contracts/`.

> **Pre-requisites:**
>
> - Install Rust via the [Substrate Docs](https://docs.substrate.io/install/) (skip the "Compile a Substrate node" section)
> - Install [`cargo contract`](https://github.com/paritytech/cargo-contract)
> - Install [`substrate-contracts-node`](https://github.com/paritytech/substrate-contracts-node)

```bash
# Build contracts and move artifacts to `./deployments/{contract}/` folders
pnpm run build

# Start local node with persistence (contracts stay deployed after restart)
# NOTE: When using Brave, shields have to be taken down for the UIs
pnpm run node

## IMPORTANT: Open a separate terminal window and keep the node running

# Deploy the contracts on the local node
pnpm run deploy
```

Alternatively, you can also deploy contracts manually using [Contracts UI](https://contracts-ui.substrate.io/) (`pnpm contracts-ui`) in the browser.

### 3. Connect the frontend to the local node

Open the `frontend/.env.local` file and set `NEXT_PUBLIC_DEFAULT_CHAIN` to `development`. Then restart the frontend and you should be able to interact with the contracts deployed on your local node.

Read more about environment variables and all available chain constants in the [Deployment](#deployment) section below.

## The Stack

<img src="inkathon-stack.png" width="800" height="auto" alt="The Stack of ink!athon" />

<details>
<summary><strong>The Stack in Detail</strong></summary>

- Structure: Monorepo
- Package-Manager: `pnpm`
- Smart Contract Development: `ink!`, `rust`, `cargo`, `cargo-contract`, `contracts-node`
- Frontend: `next`, `react`, `typescript`
  - Contract Interactions: `polkadot-js`, [`useInkathon` React Hooks](https://github.com/scio-labs/use-inkathon)
  - Styling: `chakra`, `tailwindcss`, `twin.macro`, `emotion`
- Misc:
  - Linting & Formatting: `eslint`, `prettier`, `husky`, `lint-staged`
- Deployment: Vercel

</details>

## Live Examples

Below you find live examples that use this boilerplate or have a similar setup inspired by it:

- [inkathon.xyz Demo Page](https://inkathon.xyz) – Sample deployment of this boilerplate
- [AZERO.ID](https://azero.id) – Domain Name Service for Aleph Zero and beyond
- Multiple hackathon projects from [ETHWarsaw](https://ethwarsaw-2023.devpost.com/submissions/), [HackOnChain](https://www.hackonchain.xyz/), [ETHDam](https://www.ethdam.com/), and the [Polkadot ink! Hackathon](https://www.encode.club/polkadot-ink-hackathon).

## Customization

### Project Name

There are multiple places where you need to insert your actual project name & identifier. I highlighted most of these occurrences with a `/* TODO */` comment in the code. When installing the `todo-tree` plugin [listed above](#vscode-setup) you can easily replace them one by one.

Additionally, there are the following un-highlighted occurrences:

- The name of the `.vscode/*.code-workspace` file
- The package names within `package.json`, `frontend/package.json`, and `contracts/package.json`
- The workspace dependency defined in `frontend/package.json`

### Custom Contracts

TODO: frontend/src/deployments.ts; Cargo.toml; lib.rs file under contracts/src; Deploy Script; UI

## Deployment

Setting up a deployment via Vercel is pretty straightforward as build settings are preconfigured in `vercel.json`. To get started, press the **Deploy** button and enter the default environment variables listed below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscio-labs%2Finkathon%2F&env=NEXT_PUBLIC_DEFAULT_CHAIN&envDescription=Environment%20Variables%20Documentation&envLink=https%3A%2F%2Fgithub.com%2Fscio-labs%2Finkathon%2Fblob%2Fmain%2Ffrontend%2F.env.local.example&demo-url=https%3A%2F%2Finkathon.xyz)

### Environment Variables

The only mandatory environment variable you need to add is `NEXT_PUBLIC_DEFAULT_CHAIN`. Just set it to `alephzero-testnet` at least for the first deploy, as there is the sample contract deployed & the [deplyoments](https://github.com/scio-labs/inkathon/blob/main/frontend/src/deployments/deployments.ts) are pre-configured.

Please see all pre-defined environment variables below and find more info in [`frontend/.env.local.example`](https://github.com/scio-labs/inkathon/blob/main/frontend/.env.local.example). All available blockchain network identifiers are defined in the [`useInkathon` repository](https://github.com/scio-labs/use-inkathon/blob/main/src/chains.ts).

| Environment Variable           | Value                          |
| ------------------------------ | ------------------------------ |
| `NEXT_PUBLIC_PRODUCTION_MODE`  | `true`                         |
| `NEXT_PUBLIC_URL`              | `https://your-repo.vercel.app` |
| `NEXT_PUBLIC_DEFAULT_CHAIN`    | `alephzero-testnet`            |
| `NEXT_PUBLIC_SUPPORTED_CHAINS` | `["alephzero-testnet"]`        |

### Contract Deployment

TODO: Explain custom chain & account arguments

```bash

# Deploy Contracts (on any other chain)
# NOTE: Make sure to create a `.{chain}.env` environment file (gitignored)
#       with the `ACCOUNT_URI` you want to use.
#       Also, chain must be a network-id from here: https://github.com/scio-labs/use-inkathon/blob/main/src/chains.ts.
CHAIN=alephzero-testnet pnpm run deploy

```

Please see the [Contract Quickstart](#contracts-quickstart) section above.

## VSCode Setup

### Workspace

I strongly recommend developing in VSCode by opening the workspace file `inkathon.code-workspace` instead of just the plain directory. This has multiple advantages and assures a more predictable monorepo configuration. The [first plugin](https://marketplace.visualstudio.com/items?itemName=zoma.vscode-auto-open-workspace) listed below will help with getting used to it.

### Plugins

I strongly recommend installing all plugins listed inside `.vscode/extensions.json`. They should be suggested automatically by VSCode.

<details>
<summary><strong>Recommended Plugins</strong></summary>

1. [`zoma.vscode-auto-open-workspace`](https://marketplace.visualstudio.com/items?itemName=zoma.vscode-auto-open-workspace) – Automatically suggests opening the according `.code-workspace` file.
2. [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) – Adds ESLint editor support.
3. [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) – Adds Prettier editor support.
4. [`bradlc.vscode-tailwindcss`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) & [`lightyen.tailwindcss-intellisense-twin`](https://marketplace.visualstudio.com/items?itemName=lightyen.tailwindcss-intellisense-twin) – Adds tailwindcss & twin.macro editor support.
5. [`rust-lang.rust-analyzer`](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) – Adds Rust language support.
6. [`ink-analyzer.ink-analyzer`](https://marketplace.visualstudio.com/items?itemName=ink-analyzer.ink-analyzer) – Adds ink! language support.
7. [`tamasfe.even-better-toml`](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) – Adds `.toml` file support.
8. [`gruntfuggly.todo-tree`](https://marketplace.visualstudio.com/items?itemName=gruntfuggly.todo-tree) & [`wayou.vscode-todo-highlight`](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) – Lists all `TODO` comments in your workspace.
9. [`mikestead.dotenv`](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) – Adds syntax highlighting for `.env` files.

</details>

## FAQs & Troubleshooting

<details>
<summary><strong>What is pnpm and do I need it?</strong></summary>

[Pnpm](https://pnpm.io/) works in my experience way faster and more reliably within monorepos than npm or yarn. When using it though, it's strongly recommended everyone on the team uses it. No installs should perform be performed nor any other lock files should be committed.

Also, esp. the `contracts` package has multiple shorthand npm scripts defined in its `package.json` that are recommended to use.

</details>

<details>
<summary><strong>How to approach styling?</strong></summary>

This boilerplate currently offers styling via the following options.

- [Chakra UI](https://chakra-ui.com/) – Component library for quick prototyping e.g. during hackathons)
- [twin.macro](https://github.com/ben-rogerson/twin.macro) – [Tailwindcss](https://tailwindcss.com/) within Styled Components via [Emotion](https://emotion.sh/docs/styled) (see [snippets](#snippets))
- Standard (S)CSS styles via `className` and `*.module.(s)css` files.

Important, in production it's recommended to use at most one of 1. and 2. to reduce bundle size.

</details>

<details>
<summary><strong>Can I just use plain TailwindCSS?</strong></summary>

The packages above can be easily switched out with plain TailwindCSS, a detailed guide that is coming soon. In the meantime, open an issue to get guidance.

</details>

<details>
<summary><strong>Resources to learn more about Substrate, ink!, and polkadot.js</strong></summary>

- [ink! Documentation](https://use.ink/)
- [polkadot.js Documentation](https://polkadot.js.org/docs/)
- [Polkadot Wiki ink! Tools](https://wiki.polkadot.network/docs/build-open-source)
- [Aleph Zero Documentation](https://docs.alephzero.org/aleph-zero/build/)
- [ink!athon Workshop Recording](https://youtube.com/watch?v=SoNLZfsd0mQ)
- [ink!athon Telegram Group](https://t.me/inkathon)

</details>
