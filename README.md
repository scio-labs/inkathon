# ETHathon – Smart Contract & DApp Development Boilerplate

![Typescript](https://img.shields.io/badge/Typescript-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-yellow)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-pink)

This is an opinionated boilerplate/starterkit/scaffold to get up and running with smart contract & dApp development. Also comes in handy for hackathons. 👀

By [Dennis Zoma](https://twitter.com/dennis_zoma) 🧙‍♂️

![Cover Image](packages/frontend/public/images/cover.jpg)

## Disclaimer

This is **work-in-progress** and there are open tasks:

- [ ] Give better instructions on how to initialize this:
  - [ ] Where to replace name/placeholders
  - [ ] What & Where to setup environment variabled
  - [ ] How to deploy (to Vercel)
- [ ] Remove packages that are not actually used
- [ ] Make Turborepo configuration less verbose
- [ ] Optionally integrate Chakra

## The Stack

- Package-Manager: `pnpm`
- Monorepo Tooling: `turborepo`
- Smart Contract Development: `hardhat`
  - Deploy & Address-Export: `hardhat-deploy`
  - Typescript-Types: `typechain`
- Frontend: `next`
  - Contract Interactions: `wagmi`, `rainbowkit`
  - Styling: `tailwindcss`
  - Styled Components: `twin.macro`, `emotion`
- Misc:
  - Linting & Formatting: `eslint`, `prettier`
  - Actions on Git Hooks: `husky`, `lint-staged`

## Getting Started

```bash
# Install pnpm
npm i -g pnpm

# Install dependencies
pnpm install

# Copy & fill environments
cp packages/frontend/.env.local.example packages/frontend/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```

## Development

I reommend developing in VSCode by opening the workspace file located at `.vscode/ethathon.code-workspace` and installing recommended plugins listed in `.vscode/extensions.json`.

```bash
# Generate contract-types, start local hardhat node, and start frontend with turborepo
pnpm dev

# Only start frontend
pnpm frontend:dev
```

## Deployment

This boilerplate repository is currently deployed under [ethathon.xyz](https://ethathon.xyz) via Vercel. Setting up a deployment via Vercel is pretty straightforward, only a few things have to be configured differently (as it's a monorepo structure):

- Set a custom output directory `./packages/frontend/.next`
- Set a custom install command `pnpm install --frozen-lockfile`
- Leave the root directory as `./`
- Initialize all the necessary environment variables (see `packages/frontend/.env.local.example`)

![Vercel Screenshot](packages/frontend/public/images/vercel.jpg)
