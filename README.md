# INK!athon – Substrate-based Smart Contract & DApp Boilerplate

![Typescript](https://img.shields.io/badge/Typescript-blue)
![ink!](https://img.shields.io/badge/ink!-purple)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-pink)

<img src="packages/frontend/public/images/mix-cover.jpg" width="800" height="auto" alt="Cover Image" />

---

This is an opinionated boilerplate/starterkit/scaffold to get up and running with smart contract & dApp development in the substrate-ecosystem.

It also comes in handy for hackathons. 👀

By [Dennis Zoma](https://twitter.com/dennis_zoma) 🧙‍♂️ & [Scio Labs](https://scio.xyz) 💫.

---

**Table of Contents:**

1. [The Stack](#the-stack)
2. [Projects using it](#projects-using-it)
3. [Getting Started](#getting-started)
4. [Development](#development)
   1. [Quickstart](#quickstart)
   2. [VSCode Setup](#vscode-setup)
5. [Deployment](#deployment)
6. [FAQs & Troubleshooting](#faqs--troubleshooting)
   1. [What is Pnpm and do I really need it?](#what-is-pnpm-and-do-i-really-need-it)
   2. [What is Turborepo and do I really need it?](#what-is-turborepo-and-do-i-really-need-it)
   3. [What is twin.macro? How can I just use plain TailwindCSS?](#what-is-twinmacro-how-can-i-just-use-plain-tailwindcss)

---

## The Stack

- Package-Manager: `pnpm`
- Monorepo Tooling: `turborepo`
- Smart Contract Development: `ink!`, `cargo`
- Frontend: `next`
  - Contract Interactions: `polkadot-js`
  - Styling: `tailwindcss`, `twin.macro`, `emotion`
- Misc:
  - Linting & Formatting: `eslint`, `prettier`, `husky`, `lint-staged`

## Projects using it

Below you find a few projects that use this boilerplate, a variation of it, or have a similar setup setup that inspired it:

- [Azero Domains](https://github.com/wottpal/azero.domains) – Domain Nameservice for Aleph Zero (Hackathon)

## Getting Started

```bash
# Install pnpm
npm i -g pnpm

# Install dependencies
pnpm install

# Copy & fill environments
# NOTE: Documentation of environment variables can be found in the according `.example` files
cp packages/frontend/.env.local.example packages/frontend/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```

## Development

### Quickstart

```bash
# Generate contract-types, start local hardhat node, and start frontend with turborepo
pnpm dev

# Only start frontend (from root-dir)
# NOTE: Alternatively it can just be started via `pnpm dev` inside `packages/frontend`
pnpm frontend:dev
```

### VSCode Setup

#### Workspace

I strongly reommend developing in VSCode by opening the workspace file located at `.vscode/inkathon.code-workspace` instead of just the directory. This has multiple advantages and assures a more predictable monorepo configuration. The first plugin listed below will help with getting used to it.

#### Plugins

I strongly recommend installing all the plugins listed below. They should be suggested automatically by VSCode as they are contained in `.vscode/extensions.json`.

1. [`zoma.vscode-auto-open-workspace`](https://marketplace.visualstudio.com/items?itemName=zoma.vscode-auto-open-workspace) – Automatically suggests opening the according `.code-workspace` file.
2. [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) – Adds ESLint editor support.
3. [`esbenp.prettier-vscode`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) – Adds Prettier editor support.
4. [`bradlc.vscode-tailwindcss`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) & [`lightyen.tailwindcss-intellisense-twin`](https://marketplace.visualstudio.com/items?itemName=lightyen.tailwindcss-intellisense-twin) – Adds tailwindcss & twin.macro editor support.
5. Optional: [`gruntfuggly.todo-tree`](https://marketplace.visualstudio.com/items?itemName=gruntfuggly.todo-tree) & [`wayou.vscode-todo-highlight`](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) – Lists all `TODO` comments in your workspace.
6. Optional: [`mikestead.dotenv`](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) – Adds syntax highlighting for `.env` files.

#### Snippets

The file [`packages/frontend/.vscode/frontend.code-snippets`](https://github.com/scio-labs/inkathon/blob/main/packages/frontend/.vscode/frontend.code-snippets) contains useful snippets for quickly creating components & pages with Next.js, React, Typescript, and twin.macro. Example: Enter "Function Component with Props" in an empty `.tsx` file to get a `FC` component boilerplate with an empty TypeScript interface declaration and already imported 'twin.macro'. Check out the snippet-file itself to get a full overview.

## Deployment

Setting up a deployment via Vercel is pretty straightforward, only a few things have to be configured differently (as it's a monorepo structure):

1. Press the **Deploy** button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon&env=NEXT_PUBLIC_PRODUCTION_MODE,NEXT_PUBLIC_URL,NEXT_PUBLIC_DEFAULT_CHAIN,NEXT_PUBLIC_SUPPORTED_CHAINS,NEXT_PUBLIC_RPC_1&envDescription=See%20Environment%20Variables%20Examples%20%26%20Documentation&envLink=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon%2Fblob%2Fmain%2Fpackages%2Ffrontend%2F.env.local.example&redirect-url=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon)

2. Configure the environment variables (see [`packages/frontend/.env.local.example`](https://github.com/scio-labs/inkathon/blob/main/packages/frontend/.env.local.example) for documentation) and wait for the first build to finish.
3. Wait for the first build (which will fail) and overwrite the project settings as follows:

   - Set custom "Output Directory": `./packages/frontend/.next`
   - Optionally set custom "Install Command": `pnpm install --no-frozen-lockfile` to enforce a less strict behavior when lock-files are not in sync.

4. Redeploy (Press the three dots next to the latest deployment in Vercel)

## FAQs & Troubleshooting

### What is Pnpm and do I really need it?

[Pnpm](https://pnpm.io/) works in my experience way faster and more reliable within monorepos than npm or yarn. When using it though, it's strongly recommended everyone in the team uses it. No installs should perform be performed nor any other lockfiles should be commited.

### What is Turborepo and do I really need it?

[Turborepo](https://turbo.build/repo) can drastically speed up your incremental builds in monorepos. But you don't have to use it. This is an example on how to rewrite the `build` task in the root `package.json` w/o Turborepo: `turbo run build` → `pnpm --filter contracts build && pnpm --filter frontend build`.

### What is twin.macro? How can I just use plain TailwindCSS?

[twin.macro](https://github.com/ben-rogerson/twin.macro) blends Styled Components with TailwindCSS. I really learned to appreciate it, but can understand that it's not everyones taste. It can be easily switched out with plain TailwindCSS, a detailed guide on that is coming very soon. In the meantime, open an issue to get guidance.
