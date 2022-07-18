# ETHathon Smart Contract & dApp Development Boilerplate

![Typescript](https://img.shields.io/badge/Typescript-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-yellow)
![Next.js](https://img.shields.io/badge/Next.js-gray)
![Tailwind](https://img.shields.io/badge/Tailwind-pink)

This is a very opinionated boilerplate/starterkit/scaffold to get up and running with smart contract & dApp development. Comes in handy for hackathons. 👀

By [Dennis Zoma](https://twitter.com/dennis_zoma) 🤠

## Disclaimer

This is **work-in-progress** and there are many open tasks:

- [ ] Remove packages that are not actually used
- [ ] Give in instructions on how to initialize this (where to replace placeholder string etc.)
- [ ] Show a sample contract-interaction and build a very basic default layout
- [ ] Make Turborepo Configuration less verbose
- [ ] Optionally integrate Chakra

## The Stack

- Package-Manager: `pnpm`
- Monorepo Tooling: `turborepo`
- Smart Contract Development: `hardhat`
  - TS-Types: `typechain`
- Frontend: `next`
  - Contract Interactions: `wagmi`, `rainbowkit`
  - Styling: `tailwindcss`
  - Styled Components: `twin.macro`, `emotion`
- Linting on Git Hooks: `husky`, `lint-staged`

## Getting Started

```bash
# Install pnpm
npm i -g pnpm

# Install dependencies
pnpm install

# Copy & fill environments
cp packages/frontend/.env.local.example packages/frontend/.env.local
cp packages/hardhat/.env.example packages/hardhat/.env
```

## Development

```bash
# Generate contract-types & start frontend with turborepo
pnpm dev
```
