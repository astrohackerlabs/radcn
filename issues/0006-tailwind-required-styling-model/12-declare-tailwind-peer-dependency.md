# Experiment 12: Declare Tailwind as a peer dependency

## Description

The issue's Decisions and Completion Criteria require RadCN package metadata to
declare Tailwind as a peer dependency where components require the consuming
app to provide it. That condition is now true: the migrated components (Badge,
Skeleton, Separator, Kbd, Empty, Label, and all future ones) emit Tailwind
utility classes, and the package exports `radcn/theme.css`, which uses Tailwind
v4 directives (`@theme inline`, `@custom-variant`). A consuming app cannot
render RadCN components correctly without Tailwind v4 in its pipeline. So
`tailwindcss` belongs in the package's `peerDependencies`.

This experiment is metadata-only: it adds the peer dependency, with no source
or behavior change. It advances a distinct completion criterion without
touching the per-component migration.

## Changes

- `radcn/packages/radcn/package.json`: add

  ```json
  "peerDependencies": {
    "tailwindcss": "catalog:"
  }
  ```

  using the workspace catalog (resolves to `^4.1.0`), consistent with how the
  package references every other dependency. Tailwind is a REQUIRED peer (not
  optional), so no `peerDependenciesMeta` entry. Placed per the existing
  package.json key ordering.

No other files change.

## Background: who consumes the package

Only two workspace packages depend on `radcn` (`workspace:*`):
`radcn/apps/docs` and `radcn/fixtures/candidate-remix`. Both already declare
`tailwindcss: catalog:` (added in Experiments 6 and 1), so the new peer
dependency is satisfied and pnpm should emit no unmet-peer warning. The
`reference-react-router` fixture does not depend on `radcn`, so it is
unaffected.

## Verification

From the repo root:

1. `pnpm install` — succeeds; the radcn package's `tailwindcss` peer is
   satisfied by both consumers; capture stderr to confirm NO
   `unmet peer tailwindcss` warning/error for `radcn`.
2. `pnpm radcn:typecheck`, `pnpm fixtures:candidate:typecheck`,
   `pnpm --dir radcn/apps/docs typecheck` — all pass (metadata change, no code
   impact).
3. Confirm `radcn/packages/radcn/package.json` now lists
   `peerDependencies.tailwindcss` and remains valid JSON. Also confirm pnpm
   resolves the `catalog:` peer reference (this is the first `catalog:` use in
   a peerDependency in this workspace) — e.g. `pnpm --dir radcn/packages/radcn
   why tailwindcss` or inspecting the lockfile shows the radcn package's
   tailwindcss peer resolving to the catalog `^4.1.0`.
4. `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` — docs
   suite green (11).
5. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts` — fixture
   suite green (1191).
6. `git diff --check` clean; `vendor/` untouched; only `package.json` (and
   possibly `pnpm-lock.yaml`) plus the experiment/README docs change.

Pass criteria: the peer dependency is declared and valid; `pnpm install` raises
no unmet-peer issue for `radcn`; all typechecks and both suites pass; no
behavior change.

Fail criteria: `pnpm install` reports an unmet/broken peer for `radcn`; any
typecheck or suite regresses; package.json becomes invalid.

## Result

**Result:** Pass

The peer dependency is declared and everything stays green. Verification:

1. `pnpm install` succeeded ("Already up to date", "Done"); no unmet-peer
   warning/error for `radcn` (both consumers provide tailwindcss).
2. All three typechecks pass.
3. `radcn/packages/radcn/package.json` is valid JSON and now declares
   `peerDependencies.tailwindcss: "catalog:"`; the lockfile records the
   `tailwindcss` peer under the radcn package (the `catalog:` peer resolved).
4. Docs suite: **11 passed**.
5. Fixture suite: **1191 passed**.
6. `git diff --check` clean; `vendor/` untouched; only `package.json` and
   `pnpm-lock.yaml` changed (plus this experiment file + README).

No deviations from the approved design.

## Conclusion

RadCN's package metadata now declares Tailwind v4 as a required peer
dependency, satisfying that Issue 6 completion criterion for the package
itself: consuming apps must provide Tailwind, which is correct since components
emit Tailwind utilities and the package ships a Tailwind-v4 `theme.css`. The
`catalog:` reference works in `peerDependencies` (first use in this workspace)
and resolves to `^4.1.0`. The remaining peer-dependency surface — generated
registry payloads/`components.json` — belongs to Issue 5's installation-flow
work, which a later experiment will align.

Learnings for later experiments (also copied to the issue README Learnings
digest):

- The radcn package declares `tailwindcss` as a REQUIRED peer dependency
  (`catalog:` → `^4.1.0`); workspace consumers must keep tailwindcss in their
  deps to satisfy it. `catalog:` is valid in `peerDependencies` here.
- Issue 5's registry/`components.json`/install-flow must propagate the same
  "Tailwind v4 required" contract to generated consumer projects.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the package/workspace metadata)

Findings: one Minor, no Blocker/Major.

- Minor: `catalog:` in a peerDependency is the first such use in this
  workspace; verify pnpm resolves it. Folded into verification step 3
  (`pnpm why`/lockfile check).

The reviewer confirmed: the peer is justified (components emit Tailwind
utilities; `theme.css` uses Tailwind v4 `@theme`/`@custom-variant`); the
package currently has no `peerDependencies`; the catalog has `tailwindcss
^4.1.0`; the ONLY radcn consumers are docs and candidate-remix and BOTH
declare tailwindcss (reference-react-router does not depend on radcn), so no
unmet peer; there is no `.npmrc`/`strict-peer-dependencies`/`auto-install-peers`
setting that would turn the peer into an install failure; omitting
`peerDependenciesMeta` (required, not optional) is correct; and the
verification plan is comprehensive and correctly scoped to package.json.
Verdict: APPROVED.

Approval result: approved with no blockers (one minor folded in).

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed the `peerDependencies.tailwindcss: "catalog:"` addition
(valid JSON, no `peerDependenciesMeta`), the lockfile recording the peer
(resolving to 4.3.0 within `^4.1.0`), and independently re-ran `pnpm install`
(clean, no unmet-peer for radcn), all three typechecks, the docs suite (11) and
fixture suite (1191); verified only `package.json`/`pnpm-lock.yaml` changed,
clean `git diff --check`/vendor, README Pass + Learnings, and that the change
is metadata-only. Verdict: APPROVED.

Approval result: approved with no blockers.
