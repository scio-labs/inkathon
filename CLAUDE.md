## Project Overview

Full-stack project for ink! smart contracts on Polkadot using PolkaVM and a Next.js frontend.

## Tech Stack

- **Smart Contracts**: ink! (Rust)
- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Polkadot API (PAPI), ReactiveDOT
- **Package Manager**: Bun
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI

## Project Structure

- `/frontend` - Next.js application
  - `/frontend/src/components/web3/` - Web3 components (account-select, chain-select, contract-card, etc.)
  - `/frontend/src/lib/reactive-dot/` - ReactiveDOT configuration
  - `/frontend/src/lib/inkathon/` - Constants and deployment configurations
- `/contracts` - ink! smart contracts
  - `/contracts/src` - Contract source code
  - `/contracts/deployments` - Built contracts and deployment files

## Commands

### Development

- `bun run dev` - Start frontend development server
- `bun run node` - Run local ink-node
- `bun run dev-and-node` - Run both frontend and node concurrently

### Smart Contracts

- `bun run -F contracts build` - Build all contracts
- `bun run codegen` - Generate TypeScript types from contracts
- `bun run -F contracts deploy` - Deploy contracts

### Code Quality

- `bun run lint` - Run linter (Biome + Prettier)
- `bun run lint:fix` - Auto-fix linting issues
- `bun run typecheck` - Run TypeScript type checking

### Build & Clean

- `bun run build` - Build production frontend
- `bun run clean` - Clean build artifacts
- `bun run clean-install` - Remove all node_modules and reinstall

## Development Workflow

### Quick Start

1. Run `bun run node` to start local chain
2. Run `bun run dev` for frontend development
3. After contract changes: `bun run -F contracts build` then `bun codegen`
4. **IMPORTANT**: Always run `bun run lint` and `bun run typecheck` before committing

### Writing Smart Contracts

1. Create a new contract directory in `/contracts/src/<contract-name>/`
2. Add `Cargo.toml` and `lib.rs` following ink! v6 conventions
3. Use the flipper contract as a reference template
4. Contract must be annotated with `#[ink::contract]`

### Building Contracts

- `bun run -F contracts build` - Builds all contracts in `/contracts/src/`
- Build outputs: `.contract`, `.json`, and `.polkavm` files in `/contracts/deployments/<contract-name>/`
- Uses `cargo contract build --release` under the hood

### Type Generation (PAPI)

1. After building contracts, run `bun run codegen` to generate TypeScript types
2. PAPI reads contract metadata from `/contracts/deployments/`
3. Generated types are available via `@polkadot-api/descriptors`
4. Contract descriptors accessible as `contracts.<contract-name>`

### Deploying Contracts

```bash
# Deploy to local dev chain (default)
bun run -F contracts deploy

# Deploy to specific chain
CHAIN=pop bun run -F contracts deploy

# Custom account (default: //Alice)
ACCOUNT_URI="//Bob" CHAIN=pop bun run -F contracts deploy
```

Deployment addresses are automatically exported to `/contracts/deployments/<contract>/<chain>.ts`

### Adding New Networks

1. Generate PAPI types for the chain:
   ```bash
   bunx papi add -w <websocket-url> <chain-name>
   ```
2. Add chain configuration in `/frontend/src/lib/reactive-dot/config.ts`:
   ```typescript
   chains: {
     yourchain: {
       descriptor: yourchain,
       provider: getWsProvider("wss://your-rpc-url"),
     }
   }
   ```
3. Deploy contracts to the new chain:
   ```bash
   CHAIN=<chain-name> bun run -F contracts deploy
   ```

### Frontend Integration

1. Import contract deployments in `/frontend/src/lib/inkathon/deployments.ts`
2. Add contract addresses for each chain:
   ```typescript
   import { evmAddress, ss58Address } from 'contracts/deployments/<contract>/<chain>'
   ```
3. Use contracts in components with generated types:
   ```typescript
   import { contracts } from "@polkadot-api/descriptors"
   const contract = contracts.<contract-name>
   ```

### Complete Development Flow

1. Write/modify contract in `/contracts/src/`
2. Build: `bun run -F contracts build`
3. Generate types: `bun run codegen`
4. Deploy: `CHAIN=<chain> bun run -F contracts deploy`
5. Update frontend imports in `deployments.ts`
6. Use contract in frontend components with full type safety

## Code Conventions

### TypeScript

- Functional components with `function` keyword
- Named exports preferred over default exports

### File Naming

- All files: lowercase kebab-case (`connect-button.tsx`)

### React/Next.js

- Minimize 'use client' usage - prefer Server Components
- Wrap client components in Suspense with fallbacks
- Web3 components using ReactiveDOT are client components

### Styling (Tailwind CSS v4)

- **IMPORTANT**: This project uses Tailwind CSS v4
- Mobile-first responsive design

## Available Chains

- `dev` - Local ink-node (wss://127.0.0.1:9944)
- `pop` - Pop Network (wss://rpc1.paseo.popnetwork.xyz)
- `passethub` - Paseo Asset Hub (wss://testnet-passet-hub.polkadot.io)

## Key Files

- **Chain Configuration**: `/frontend/src/lib/reactive-dot/config.ts` - ReactiveDOT chain setup
- **Constants**: `/frontend/src/lib/inkathon/constants.ts` - Alice account, faucet URLs
- **Deployments**: `/frontend/src/lib/inkathon/deployments.ts` - Contract deployment info
- **Contract deployments**: `/contracts/deployments/` - Built contract files
- **Example contract**: `/contracts/src/flipper/lib.rs` - Flipper smart contract

## Important Notes

- This is a monorepo with Bun workspaces
- Frontend and contracts are separate workspaces
- Always check existing patterns before implementing new features

## Related Documentation

- **ink!**: https://use.ink/ - Smart contract language documentation
- **Polkadot API (PAPI)**: https://papi.how - TypeScript API for Polkadot
- **ReactiveDOT**: https://reactivedot.dev - Reactive library for Polkadot
- **Pop CLI**: https://learn.onpop.io/contracts - Development tools for ink!
- **ink-node**: https://github.com/use-ink/ink-node - Local development node
- **cargo-contract**: https://github.com/use-ink/cargo-contract - Contract build tool
