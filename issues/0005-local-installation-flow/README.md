+++
status = "open"
opened = "2026-06-06"
+++

# Issue 5: Build the RadCN Local Installation Flow

## Goal

Implement and prove a shadcn-style RadCN installation flow locally, without
publishing RadCN to npm yet.

The result should let a TypeScript target Remix 3 project initialize RadCN
configuration, install specific RadCN components such as Button from a local
registry, and use those installed components from project-local source files in
the same spirit as shadcn/ui.

## Background

shadcn/ui is not primarily consumed as a normal component runtime package.
Instead, it combines:

- a CLI package, run with commands such as `shadcn init` and
  `shadcn add button`;
- a registry of component payloads;
- a project configuration file, `components.json`, that tells the CLI where
  CSS, components, utilities, hooks, aliases, and registries live;
- generated/copied component source files owned by the consuming application.

RadCN should follow that same model where it makes sense for Remix 3. Publishing
the eventual RadCN CLI or registry package to npm is explicitly out of scope for
this issue. This issue should prove the workflow locally first.

The local proof may use workspace commands, local package paths, packed tarballs,
or a local registry file/server, as long as the behavior proves the real
installation model without depending on public npm publication.

## ShadCN Reference Findings

The vendored shadcn CLI lives at `vendor/shadcn-ui/packages/shadcn/src/`.
Issue work should use it as the behavioral reference, but must not depend on
the vendored source at runtime.

The shadcn command model is:

- `shadcn init [components...]` initializes a project, writes
  `components.json`, and can immediately install requested components.
  Important options include `--cwd`, `--yes`, `--defaults`, `--force`,
  `--template`, `--base`, `--css-variables`, and reinstall controls.
- `shadcn add [components...]` installs registry items into an initialized
  project. Important options include `--cwd`, `--yes`, `--overwrite`, `--all`,
  `--path`, `--dry-run`, `--diff`, and `--view`.
- `add` can detect a missing config and offer to run `init`, but the RadCN
  local proof can start with explicit `init` followed by explicit `add`.

The shadcn config model is:

- The config file is `components.json`. shadcn uses `cosmiconfig("components")`
  but restricts search to `components.json`, so using that filename is the
  most compatible default for RadCN unless an experiment proves a concrete
  reason to diverge.
- The raw config includes `style`, `rsc`, `tsx`, `tailwind`, `iconLibrary`,
  `rtl`, menu options, `aliases`, and `registries`.
- The required alias fields are `components` and `utils`; optional aliases are
  `ui`, `lib`, and `hooks`. Resolved paths are derived from `tsconfig.json` or
  package imports and are not written into `components.json`.
- Registry aliases must be named with an `@` prefix and point to a URL pattern
  containing `{name}`. shadcn also supports an object form with URL, params,
  and headers.

The shadcn registry model is:

- Registry items are validated structured JSON, not arbitrary file manifests.
- Relevant item fields include `name`, `type`, `dependencies`,
  `devDependencies`, `registryDependencies`, `files`, `css`, `cssVars`,
  `envVars`, `meta`, `docs`, and `categories`.
- Relevant item types for the RadCN proof are likely `registry:ui`,
  `registry:lib`, `registry:hook`, `registry:file`, `registry:style`, and
  `registry:base`. Blocks and charts are outside RadCN's current component
  scope.
- `registry:file` and `registry:page` require explicit file targets; other item
  types can derive targets from aliases.

The shadcn install model is:

- Component names resolve through the configured registry, local files, URLs,
  GitHub item addresses, namespaced registry aliases, or the default shadcn
  registry path.
- `registryDependencies` are resolved recursively, then merged and
  deduplicated into a single installation tree.
- Installation updates package dependencies, environment variables, files, and
  CSS. Tailwind config updates are part of shadcn, but RadCN should only carry
  Tailwind-specific fields forward if a component or docs requirement actually
  needs them.
- File writes validate safe targets, derive paths from config aliases, skip
  unchanged files, and require explicit overwrite behavior for existing files.

The first RadCN proof should therefore mirror the shape of shadcn while staying
minimal: `radcn init --cwd <fixture> --yes`, then
`radcn add button --cwd <fixture> --yes`, backed by a local registry item that
installs Button and any needed utility or style dependencies into a Remix 3
fixture app.

## Decisions

- RadCN will use `components.json`. This matches shadcn's installed-project
  contract and avoids an avoidable divergence in the first installation-flow
  proof.
- Default generated paths must be compatible with standard Remix 3 project
  structure. The exact component, utility, style, and hook paths should be
  discovered from Remix 3 app conventions during the experiment, then recorded
  in this issue.
- Registry-installed components should copy full standalone source into the
  target application by default. If an experiment shows that standalone source
  creates unexpectedly large or fragile payloads, the issue must record the
  tradeoff before introducing package-owned primitive imports.
- RadCN should support TypeScript only. Do not support plain JavaScript output,
  `tsx: false`, or `.jsx` rewrites.
- RadCN should carry forward only config fields that make sense for Remix 3.
  Omit or reinterpret shadcn fields such as `rsc`, Tailwind-specific fields,
  and icon-library defaults unless an experiment records a concrete Remix 3
  need for them.
- The local flow should be close enough to the eventual published flow that the
  local command, config, registry, and generated source can translate directly
  to the public npm-backed version later.

## Scope

In scope:

- A RadCN CLI surface that can be exercised locally.
- A RadCN configuration file equivalent in role to shadcn/ui
  `components.json`.
- A local RadCN registry format for installable component items.
- Local commands equivalent to:
  - `radcn init`
  - `radcn add button`
  - eventually `radcn add <component>`
- A target Remix 3 fixture app that proves initialization and component
  installation.
- A Button installation proof that writes project-local source and makes it
  usable from the target app.
- TypeScript-only generated output.
- Documentation of how this local flow maps to the eventual published npm
  flow.
- Tests or deterministic checks that verify generated files, config, imports,
  dependencies, and Remix 3 usability.

Out of scope:

- Publishing any package to npm.
- Designing the final public package names or npm release automation beyond
  what is needed to keep the local proof realistic.
- Plain JavaScript output or JavaScript-only target projects.
- Reopening closed parity issues or modifying historical closed issue records.
- Installing from `vendor/` as a dependency. Vendor remains reference-only.

## Architecture

The likely architecture mirrors shadcn/ui:

- `components.json`:
  - records style/config choices;
  - records Remix 3-oriented paths for component output, utilities, CSS, and
    registry aliases;
  - assumes TypeScript output;
  - records import aliases and registry sources.
- RadCN config resolver:
  - validates the written `components.json`;
  - resolves aliases from the target app's `tsconfig.json` or package imports;
  - keeps resolved paths out of the persisted config;
  - refuses to resolve files inside `vendor/`.
- Local RadCN registry:
  - stores installable item metadata;
  - identifies files to write;
  - identifies dependencies or peer requirements;
  - supports recursive `registryDependencies`;
  - validates registry item JSON with a documented schema;
  - supports at least `button` first.
- Local RadCN CLI:
  - `init` detects or asks for project paths and writes config;
  - `add button` resolves the configured registry item;
  - supports `--cwd`, `--yes`, and a safety mode such as `--dry-run` or
    deterministic skip/overwrite handling early in the proof;
  - writes component source into the configured target path;
  - writes or updates utility/style files if needed;
  - avoids reading from or installing from `vendor/`;
  - can run in a local workspace without npm publication.
- Remix 3 proof app:
  - starts as a target consumer app, not as the RadCN source package itself;
  - runs the local CLI against the app;
  - imports the installed Button from the generated local path;
  - renders and verifies the Button in a browser or deterministic route test.

## Key Questions

- How should the local registry be addressed during development:
  filesystem path, localhost registry server, workspace package, or packed
  tarball?
- How much of shadcn's registry address surface should the proof support:
  local files, plain names, namespaced `@radcn/button`, URLs, or all of them?
- Which exact Remix 3 default paths should `components.json` write for
  components, utilities, styles, and hooks?

## Completion Criteria

This issue is complete when:

- a local RadCN CLI/config/registry proof exists;
- the proof uses `components.json`;
- generated output is TypeScript-only;
- generated default paths are compatible with standard Remix 3 app structure;
- a Remix 3 target fixture can run an init flow;
- the same target can run an add-component flow for Button;
- generated config and source files are deterministic and documented;
- registry item validation, recursive dependency resolution, and safe file
  targets are covered at least for the Button proof;
- rerunning `add button` is deterministic: unchanged files are skipped or
  overwrite behavior is explicit and tested;
- the installed Button can be imported and rendered from the target Remix 3
  app;
- the flow does not read from or install dependencies from `vendor/`;
- verification proves the flow works without npm publication;
- the local flow maps directly to the eventual published flow without changing
  the user-facing command shape;
- the issue records what remains for a later publishing issue.
