# @inkathon/contracts

## 0.3.2

### Patch Changes

- [#39](https://github.com/scio-labs/inkathon/pull/39) [`47aed1b`](https://github.com/scio-labs/inkathon/commit/47aed1b722138bd6fca2883337151d3c0b77e4a3) Thanks [@ical10](https://github.com/ical10)! - Deploy contracts & add deployment addresses for Rococo Contracts test-network.

## 0.3.1

### Patch Changes

- [`e73d9b8`](https://github.com/scio-labs/inkathon/commit/e73d9b86a4299702c59538ac43612b9977d479be) Thanks [@wottpal](https://github.com/wottpal)! - Replace `ts-node` with `tsx` (https://github.com/privatenumber/tsx) for less-verbose TypeScript script execution.

## 0.3.0

### Minor Changes

- [`cda19ae`](https://github.com/scio-labs/inkathon/commit/cda19aeb4107c076daeb17a455fecfbd7f373044) Thanks [@wottpal](https://github.com/wottpal)! - Vastly reduce boilerplate for JS/TS script initialization of Polkadot.js. You no longer need to read and parse dotenv environment variables in every script.

## 0.2.1

### Patch Changes

- [`3f4179e`](https://github.com/scio-labs/inkathon/commit/3f4179e9325b155324d23796234d9f853ae03dd9) Thanks [@wottpal](https://github.com/wottpal)! - Add workaround to run ESM-enabled ts-node scripts with Node.js 20. Related: https://github.com/TypeStrong/ts-node/issues/1997

## 0.2.0

### Minor Changes

- [`c2cfbe4`](https://github.com/scio-labs/inkathon/commit/c2cfbe428a4e86f7ddb3d25886d4da79238b69be) Thanks [@wottpal](https://github.com/wottpal)! - Ensure & document Windows, Ubuntu, and macOS compatibility. 🌈

## 0.1.3

### Patch Changes

- [`4bda28d`](https://github.com/scio-labs/inkathon/commit/4bda28d645abc8d8684d33bac788f04c278d7b4e) Thanks [@wottpal](https://github.com/wottpal)! - Further cross-platform script improvements (i.e. regarding the touch command).

## 0.1.2

### Patch Changes

- [`2b9bc68`](https://github.com/scio-labs/inkathon/commit/2b9bc689876ea195a1cf2f6af1ca2414bcf04172) Thanks [@wottpal](https://github.com/wottpal)! - Make cp/copy command work cross-platform (i.e. on Windows) for postinstall and build-all scripts.

## 0.1.0

### Minor Changes

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`cf04f67`](https://github.com/scio-labs/inkathon/commit/cf04f671c06276ffc51e33c1e38c181173227d75) Thanks [@wottpal](https://github.com/wottpal)! - Add `contract/scripts/script.template.ts` template script and simplify script initialization in general.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Move `frontend` and `contracts` packages to the root level

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Auto-detect available contracts in build & test shell scripts

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`7a41afe`](https://github.com/scio-labs/inkathon/commit/7a41afe1e7c2f45b6d3972760c173a4a2197c643) Thanks [@wottpal](https://github.com/wottpal)! - Add contributor guidelines at `CONTRIBUTING.md`.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Add pnpm/npm shorthand script for JS/TS script execution (i.e. `pnpm run script deploy`)

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`3598618`](https://github.com/scio-labs/inkathon/commit/3598618f87d788ec51964167557210ed8b659797) Thanks [@wottpal](https://github.com/wottpal)! - Major README.md overhaul & improvements

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Switch from `husky` to `simple-git-hooks` pre-commit hooks

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`07d8381`](https://github.com/scio-labs/inkathon/commit/07d83819c48f4aaa129ccc3d27929767b916c93d) Thanks [@wottpal](https://github.com/wottpal)! - Add compatability for using yarn (stable only, not classic v1) as the package manager. Note: npm is still not compatible as it lacks support for the workspace import protocol.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Move ink! contract files under `contracts/src/`

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Setup changeset integration for version, release, and changelog management.
