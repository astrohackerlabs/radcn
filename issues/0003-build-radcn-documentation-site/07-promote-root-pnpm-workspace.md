# Experiment 7: Promote Root pnpm Workspace

## Description

Move RadCN's pnpm workspace ownership from the nested `radcn/` directory to the
repository root, so a developer can run the docs website with:

```sh
pnpm dev
```

from `/Users/ryan/dev/radcn`.

This experiment should preserve the current code layout under `radcn/` while
making the repository root the package-manager boundary. The `vendor/` directory
must remain a source-reference area only. pnpm must not treat any vendored
repository as a workspace package or dependency source.

The change should avoid solving this with `link-workspace-packages=false`.
That setting does not address the root cause. The root cause is workspace
membership and install location: pnpm should only see the RadCN app, package,
and fixture packages that are explicitly included in the root workspace.

## Changes

- `package.json`
  - Create a repository-root package manifest.
  - Move the workspace-level scripts and dev dependencies currently owned by
    `radcn/package.json` into the root manifest.
  - Add `dev` so `pnpm dev` from the repository root runs the docs app.
  - Rewrite moved scripts to use repository-root-relative paths, for example:
    - `pnpm --dir radcn/apps/docs dev`
    - `pnpm --dir radcn/packages/radcn typecheck`
    - `pnpm --dir radcn/fixtures/reference-react-router typecheck`
    - `pnpm --dir radcn/fixtures/candidate-remix typecheck`
  - Preserve the current `packageManager` value, including the already-updated
    pnpm version if it remains present in the worktree.
  - Keep the root package private.
- `pnpm-workspace.yaml`
  - Move workspace configuration from `radcn/pnpm-workspace.yaml` to the
    repository root.
  - Use explicit package globs only:
    - `radcn/apps/*`
    - `radcn/packages/*`
    - `radcn/fixtures/*`
  - Do not include `vendor/**`, `**`, `*/**`, or any broad glob that could
    enroll vendored upstream repositories.
  - Preserve catalog versions.
- `pnpm-lock.yaml`
  - Move/regenerate the lockfile at the repository root.
  - Remove the nested `radcn/pnpm-lock.yaml` once the root install succeeds.
- `radcn/package.json`
  - Remove the nested workspace manifest if it is no longer needed.
  - If a small placeholder is needed for tooling, it must not define a pnpm
    workspace or scripts that compete with the repository root.
  - The current uncommitted `packageManager` bump to `pnpm@11.5.2` is a
    pre-existing worktree change from the package-manager update request. Do
    not include `radcn/package.json` in the plan commit. During implementation,
    preserve `pnpm@11.5.2` in the new root package manifest as part of moving
    workspace ownership.
- `radcn/apps/docs/app/assets.ts`
  - Update pnpm virtual-store asset mapping for the new root install location.
  - The docs app still runs with cwd `radcn/apps/docs`, but the real virtual
    store should move from `radcn/node_modules/.pnpm` to
    `node_modules/.pnpm` at the repository root.
  - Keep the explicit `.pnpm` fileMap entry that fixed the Remix browser-entry
    404; only adjust its relative target for the new workspace root.
- `.gitignore`
  - Keep ignoring dependency installs at the repository root and under RadCN
    package directories.
  - Ensure `vendor/` remains ignored as upstream source checkouts.
  - Do not add ignore rules that hide source files or issue records.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Update learnings after implementation to record the new workspace boundary,
    root run command, and vendor exclusion rule.
- `issues/0003-build-radcn-documentation-site/07-promote-root-pnpm-workspace.md`
  - Record the result, verification evidence, conclusion, and completion
    review after implementation.

Do not change docs UI, RadCN component source, or vendor checkouts in this
experiment except where the docs asset-server path must change because the pnpm
virtual store moved.

## Verification

The experiment passes when all of these are true:

- Running from `/Users/ryan/dev/radcn`, `pnpm dev` starts the docs website.
- The docs website responds with `200` for `/`.
- The docs website responds with `200` for `/docs/components/button`.
- An unknown component route still responds with `404`.
- The browser entry still serves its transformed `remix/ui` dependency from
  `/assets/node_modules/.pnpm/...` with `200`.
- `pnpm list -r --depth -1` from the repository root lists only the root
  workspace and packages under:
  - `radcn/apps/*`
  - `radcn/packages/*`
  - `radcn/fixtures/*`
- `pnpm list -r --depth -1` does not list any package under `vendor/`.
- No dependency in `pnpm-lock.yaml` resolves from `vendor/`.
- `pnpm radcn:typecheck` passes from the repository root.
- `pnpm --dir radcn/apps/docs typecheck` passes from the repository root.
- `git diff --check` passes.
- `git status --short -- vendor` produces no output.
- The implementation does not stage or commit unrelated worktree changes such
  as `raw-icons/` unless the user explicitly expands scope.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
pnpm install
pnpm list -r --depth -1
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
PORT=5175 pnpm dev
curl -s -o /dev/null -w 'home %{http_code}\n' http://localhost:5175/ | rg '^home 200$'
curl -s -o /dev/null -w 'button %{http_code}\n' http://localhost:5175/docs/components/button | rg '^button 200$'
curl -s -o /dev/null -w 'missing %{http_code}\n' http://localhost:5175/docs/components/not-a-component | rg '^missing 404$'
entry=$(curl -s http://localhost:5175/assets/app/assets/entry.ts | sed -n '1p' | sed -E 's/^import \{ run \} from "([^"]+)";.*/\1/')
curl -s -o /dev/null -w 'entry-dependency %{http_code}\n' "http://localhost:5175${entry}" | rg '^entry-dependency 200$'
git diff --check
git status --short -- vendor
```

Add a lockfile/vendor check during implementation. The check should prove that
the root lockfile does not contain dependency resolutions from `vendor/`.

## Design Review

Fresh-context design review was performed by Codex subagent `Halley`
(`019e97cb-61e4-7b22-afd2-3663e2523467`) on 2026-06-05 with
`fork_context: false`.

Findings:

- **Major:** Moved root scripts must be rewritten to use paths relative to the
  repository root, not copied with their current `radcn/`-relative paths.
- **Major:** The pre-existing uncommitted `radcn/package.json`
  `packageManager` bump to `pnpm@11.5.2` must not contaminate the plan commit.
  The plan should clarify that it is handled only during implementation.
- **Minor:** The experiment needed an explicit design-review recording section.

Resolution:

- Added root-relative script examples for docs, package, and fixture commands.
- Recorded the `pnpm@11.5.2` bump as a pre-existing worktree change that must
  be excluded from the plan commit and preserved during implementation.
- Added this `Design Review` section with reviewer identity, fresh-context
  status, findings, fixes, and approval result.

Result:

- Halley approved the design with no blockers. The real major and minor
  findings were fixed before the plan commit.
