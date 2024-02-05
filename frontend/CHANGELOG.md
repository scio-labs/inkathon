# @inkathon/frontend

## 0.6.0

### Minor Changes

- [#57](https://github.com/scio-labs/inkathon/pull/57) [`d623968`](https://github.com/scio-labs/inkathon/commit/d623968827da0d96b51a09f79d2f02ecb1c6c2a8) Thanks [@peetzweg](https://github.com/peetzweg)! - uses zod for form validation

- [#50](https://github.com/scio-labs/inkathon/pull/50) [`7c717dd`](https://github.com/scio-labs/inkathon/commit/7c717dd17e4b221b076ecf5d7bf74bebecc9df83) Thanks [@ical10](https://github.com/ical10)! - - Setup Docker workflow for local development of frontend (Next.js Startup & Watching) and production build (non-Vercel deployments)
  - Setup Docker workflow for local development of contracts (Rust & Substrate Contracts Node Setup, Contract Deployment)

### Patch Changes

- [#55](https://github.com/scio-labs/inkathon/pull/55) [`6b7ea5d`](https://github.com/scio-labs/inkathon/commit/6b7ea5de1e425242fd4811dbc85898f64ceb069f) Thanks [@peetzweg](https://github.com/peetzweg)! - allow postinstall to work with new contracts instead of only packaged greeter

- Updated dependencies [[`7c717dd`](https://github.com/scio-labs/inkathon/commit/7c717dd17e4b221b076ecf5d7bf74bebecc9df83), [`6b7ea5d`](https://github.com/scio-labs/inkathon/commit/6b7ea5de1e425242fd4811dbc85898f64ceb069f)]:
  - @inkathon/contracts@0.6.0

## 0.5.0

### Minor Changes

- [#53](https://github.com/scio-labs/inkathon/pull/53) [`194120d`](https://github.com/scio-labs/inkathon/commit/194120d21028d48102d370db72660e1e23c84c4f) Thanks [@wottpal](https://github.com/wottpal)! - Add type-safe contract integrations via `useRegisteredTypedContract` and `typechain-polkadot`.

### Patch Changes

- Updated dependencies [[`194120d`](https://github.com/scio-labs/inkathon/commit/194120d21028d48102d370db72660e1e23c84c4f)]:
  - @inkathon/contracts@0.5.0

## 0.4.2

### Patch Changes

- [`bc7d7ed`](https://github.com/scio-labs/inkathon/commit/bc7d7ed546fc2f17b6adaf96e34645f84ac2a5e0) Thanks [@wottpal](https://github.com/wottpal)! - Move VSCode settings to `settings.json` file but keep `inkathon.code-workspace`. It's now also supported by default to develop with ink!athon without opening the code-workspace file.

- Updated dependencies [[`cf68f5f`](https://github.com/scio-labs/inkathon/commit/cf68f5f96888c69434014ff4f8eccdd3558d20bc), [`bc7d7ed`](https://github.com/scio-labs/inkathon/commit/bc7d7ed546fc2f17b6adaf96e34645f84ac2a5e0)]:
  - @inkathon/contracts@0.4.2

## 0.4.1

### Patch Changes

- [`14e8e11`](https://github.com/scio-labs/inkathon/commit/14e8e11ebc857e81b7cfa97e7c3c7f28d8dbccc3) Thanks [@wottpal](https://github.com/wottpal)! - Add sample code snippets from live workshops (greeter message reversion & make-it-rain script)

- Updated dependencies [[`14e8e11`](https://github.com/scio-labs/inkathon/commit/14e8e11ebc857e81b7cfa97e7c3c7f28d8dbccc3)]:
  - @inkathon/contracts@0.4.1

## 0.4.0

### Minor Changes

- [#42](https://github.com/scio-labs/inkathon/pull/42) [`0533391`](https://github.com/scio-labs/inkathon/commit/0533391ac6f9b953ba0cb231af8b3037e80bcbab) Thanks [@ical10](https://github.com/ical10)! - Update project default to Node 20.

- [#42](https://github.com/scio-labs/inkathon/pull/42) [`bc721ea`](https://github.com/scio-labs/inkathon/commit/bc721ea638a33d5d9d993eecddfd2a6f3ece1bfe) Thanks [@ical10](https://github.com/ical10)! - - Migrate the current pages directory to the Next.js 13 app directory.
  - Migrate to `shadcn/ui` components and vanilla tailwind.

### Patch Changes

- Updated dependencies [[`0533391`](https://github.com/scio-labs/inkathon/commit/0533391ac6f9b953ba0cb231af8b3037e80bcbab)]:
  - @inkathon/contracts@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [[`47aed1b`](https://github.com/scio-labs/inkathon/commit/47aed1b722138bd6fca2883337151d3c0b77e4a3)]:
  - @inkathon/contracts@0.3.2

## 0.3.1

### Patch Changes

- Updated dependencies [[`e73d9b8`](https://github.com/scio-labs/inkathon/commit/e73d9b86a4299702c59538ac43612b9977d479be)]:
  - @inkathon/contracts@0.3.1

## 0.3.0

### Minor Changes

- [`64adba1`](https://github.com/scio-labs/inkathon/commit/64adba196dd98ad272bbb4a99b4f7bc7186ae385) Thanks [@wottpal](https://github.com/wottpal)! - Add Nightly Connect support for Aleph Zero, Aleph Zero Testnet, and Local Node. Checkout: https://connect.nightly.app/.

## 0.3.0

### Patch Changes

- Updated dependencies [[`cda19ae`](https://github.com/scio-labs/inkathon/commit/cda19aeb4107c076daeb17a455fecfbd7f373044)]:
  - @inkathon/contracts@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [[`3f4179e`](https://github.com/scio-labs/inkathon/commit/3f4179e9325b155324d23796234d9f853ae03dd9)]:
  - @inkathon/contracts@0.2.1

## 0.2.0

### Minor Changes

- [`c2cfbe4`](https://github.com/scio-labs/inkathon/commit/c2cfbe428a4e86f7ddb3d25886d4da79238b69be) Thanks [@wottpal](https://github.com/wottpal)! - Ensure & document Windows, Ubuntu, and macOS compatibility. 🌈

### Patch Changes

- Updated dependencies [[`c2cfbe4`](https://github.com/scio-labs/inkathon/commit/c2cfbe428a4e86f7ddb3d25886d4da79238b69be)]:
  - @inkathon/contracts@0.2.0

## 0.1.3

### Patch Changes

- [`4bda28d`](https://github.com/scio-labs/inkathon/commit/4bda28d645abc8d8684d33bac788f04c278d7b4e) Thanks [@wottpal](https://github.com/wottpal)! - Further cross-platform script improvements (i.e. regarding the touch command).

- Updated dependencies [[`4bda28d`](https://github.com/scio-labs/inkathon/commit/4bda28d645abc8d8684d33bac788f04c278d7b4e)]:
  - @inkathon/contracts@0.1.3

## 0.1.2

### Patch Changes

- [`2b9bc68`](https://github.com/scio-labs/inkathon/commit/2b9bc689876ea195a1cf2f6af1ca2414bcf04172) Thanks [@wottpal](https://github.com/wottpal)! - Make cp/copy command work cross-platform (i.e. on Windows) for postinstall and build-all scripts.

- Updated dependencies [[`2b9bc68`](https://github.com/scio-labs/inkathon/commit/2b9bc689876ea195a1cf2f6af1ca2414bcf04172)]:
  - @inkathon/contracts@0.1.2

## 0.1.1

### Patch Changes

- [`1556c0f`](https://github.com/scio-labs/inkathon/commit/1556c0fb526c0b0219217cd19ab2a47dcc038ba4) Thanks [@wottpal](https://github.com/wottpal)! - Fix `@polkadot/*` package warnings about cjs/esm duplications.

## 0.1.0

### Minor Changes

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Move `frontend` and `contracts` packages to the root level

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`7a41afe`](https://github.com/scio-labs/inkathon/commit/7a41afe1e7c2f45b6d3972760c173a4a2197c643) Thanks [@wottpal](https://github.com/wottpal)! - Add contributor guidelines at `CONTRIBUTING.md`.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`3598618`](https://github.com/scio-labs/inkathon/commit/3598618f87d788ec51964167557210ed8b659797) Thanks [@wottpal](https://github.com/wottpal)! - Major README.md overhaul & improvements

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Switch from `husky` to `simple-git-hooks` pre-commit hooks

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`07d8381`](https://github.com/scio-labs/inkathon/commit/07d83819c48f4aaa129ccc3d27929767b916c93d) Thanks [@wottpal](https://github.com/wottpal)! - Add compatability for using yarn (stable only, not classic v1) as the package manager. Note: npm is still not compatible as it lacks support for the workspace import protocol.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Auto-create `.env.local` files upon first package install if non-existent

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964) Thanks [@wottpal](https://github.com/wottpal)! - Setup changeset integration for version, release, and changelog management.

- [#30](https://github.com/scio-labs/inkathon/pull/30) [`bda4108`](https://github.com/scio-labs/inkathon/commit/bda4108c9aac8234bdb5989caea0daa8d12f46fb) Thanks [@wottpal](https://github.com/wottpal)! - Change `@…` local import path shortcut to `@/…` (create-next-app default).

### Patch Changes

- Updated dependencies [[`cf04f67`](https://github.com/scio-labs/inkathon/commit/cf04f671c06276ffc51e33c1e38c181173227d75), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964), [`7a41afe`](https://github.com/scio-labs/inkathon/commit/7a41afe1e7c2f45b6d3972760c173a4a2197c643), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964), [`3598618`](https://github.com/scio-labs/inkathon/commit/3598618f87d788ec51964167557210ed8b659797), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964), [`07d8381`](https://github.com/scio-labs/inkathon/commit/07d83819c48f4aaa129ccc3d27929767b916c93d), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964), [`1839164`](https://github.com/scio-labs/inkathon/commit/183916440fb3043d06c1fd603aba923eb21a5964)]:
  - @inkathon/contracts@0.1.0
