# Experiment 6: Establish the docs app Tailwind pipeline and repair the docs gate

## Description

The Experiment 5 design review surfaced a structural gap: the docs app
(`radcn/apps/docs`) imports the SAME package components as the candidate
fixture and injects the same bespoke `radcnStyles`, but it has no Tailwind
pipeline. Investigating, the docs app's own Playwright suite
(`radcn/apps/docs/tests/coverage.spec.ts`) — which the prior experiments'
verification never ran (the gate was the fixture suite only) — is currently
red, and earlier experiments are the cause:

- **Experiment 2 regression (test-failing now):** adding the `./theme.css`
  package export made it a "public subpath." The docs coverage test
  enumerates every public export subpath and requires a docs preview hook for
  each, with an exclusion set `excludedExports = new Set(['.', './styles',
  './package.json'])` (`coverage.spec.ts:6`). `./theme.css` was never added,
  so the test fails: "theme.css should have an expected public preview hook."
- **Experiment 5 regression (visual, not test-caught):** the docs app renders
  the migrated `Badge` with Tailwind utility classes (`bg-primary`, …) but has
  no Tailwind CSS loaded, so badges render unstyled in the actual docs site.
  The docs badge tests assert only classes/attributes/text, so they did not
  catch it.

This experiment fixes the root cause and the gate:

1. Give the docs app the same Tailwind v4 pipeline the candidate fixture got
   in Experiment 4 (generated stylesheet served by `createAssetServer`, linked
   in the document shell BEFORE `radcnStyles`, `@source`-scanning the package).
   This repairs the Badge visual regression and is itself a completion
   criterion ("the docs app uses Tailwind as its styling pipeline").
2. Repair the Experiment 2 regression by excluding `./theme.css` from the docs
   coverage test's public-component enumeration (it is a stylesheet asset, not
   a documentable component subpath — exactly like `./styles`).
3. Bring the docs app suite into the verification gate, recorded so every
   future styling experiment runs BOTH the fixture suite and the docs suite.

Scope limits: docs app pipeline + the docs-test exclusion fix only. No
component migration in this experiment. No preflight. The docs app's existing
`radcnStyles` and `docsThemeStyles` injections stay; the Tailwind link is
added ahead of them so bespoke rules keep winning cascade ties (Experiment 4
ordering principle), making this a no-regression pipeline addition for all
not-yet-migrated components while repairing the already-migrated Badge.

## Background: docs app structure (parallels the candidate fixture)

- `app/assets.ts` uses `createAssetServer({ basePath: '/assets', fileMap: {
  'app/*path': 'app/*path', ... }, allow: ['app/assets/**', ...] })`, so a
  generated `app/assets/tailwind.generated.css` is served like any source CSS.
- `app/routes.ts` has `assets: get('/assets/*path')`, so
  `routes.assets.href({ path: 'app/assets/tailwind.generated.css' })` yields
  the URL.
- `app/ui/document.tsx` injects `<RadcnStyle />` (a `<style>` with
  `radcnStyles`) then `<DocsThemeStyle />` in `<head>`. The Tailwind `<link>`
  goes before `<RadcnStyle />`.
- `apps/docs` sits two levels under `radcn/` (like `fixtures/candidate-remix`),
  so the `@source` relative path from `app/styles/tailwind.css` is the same:
  `../../../../packages/radcn/src`.

## Changes

- `pnpm-workspace.yaml`: no change (the `tailwindcss` / `@tailwindcss/cli`
  catalog entries already exist from Experiment 1).
- `radcn/apps/docs/package.json`:
  - add devDependencies `tailwindcss: catalog:` and `@tailwindcss/cli: catalog:`;
  - add `styles:build`:
    `tailwindcss --input app/styles/tailwind.css --output app/assets/tailwind.generated.css`;
  - prepend `pnpm styles:build && ` to `dev` and `start` (the docs Playwright
    `webServer` runs `pnpm dev`, so the stylesheet exists before boot).
- `radcn/apps/docs/app/styles/tailwind.css` (new): identical structure to the
  fixture's —
  `@source '../../../../packages/radcn/src';` then
  `@import 'tailwindcss/theme';`, `@import 'radcn/theme.css';`,
  `@import 'tailwindcss/utilities';` (preflight excluded).
- `radcn/apps/docs/app/ui/document.tsx`:
  - render `<link rel="stylesheet" href={routes.assets.href({ path:
    'app/assets/tailwind.generated.css' })} />` immediately before
    `<RadcnStyle />` in `<head>` (`routes` is already imported).
- `radcn/apps/docs/tests/coverage.spec.ts`:
  - add `'./theme.css'` to `excludedExports` (line 6), repairing the
    Experiment 2 regression. Optionally add one assertion to the badge-demo
    coverage that a default `[data-radcn-badge]` now computes a non-transparent
    background (`rgb(24, 24, 27)` = `--primary`), locking in the Badge visual
    repair; exact selector confirmed during implementation.
- `.gitignore`:
  - add `radcn/apps/**/app/assets/tailwind.generated.css` next to the existing
    `radcn/fixtures/**/app/assets/tailwind.generated.css` line (the fixtures
    path is already ignored; the docs generated CSS must be ignored too).
- Implementation note (from design review): verify no docs route injects its
  own duplicate Tailwind `<link>` via a per-page `head` prop — the shell is the
  single link source (the Experiment 4 strict-mode-locator lesson).

Expected git status for the result commit: the docs `package.json`,
`app/styles/tailwind.css` (new), `app/ui/document.tsx`, `tests/coverage.spec.ts`,
`.gitignore`, `pnpm-lock.yaml` (new docs devDeps), this experiment file, and
the README index line + Learnings digest. The generated
`tailwind.generated.css` stays untracked.

## Verification

From the repo root:

1. `pnpm install` — succeeds; lockfile gains the docs devDeps (already in the
   catalog, so no new versions).
2. `pnpm --dir radcn/apps/docs styles:build` — exits 0; writes
   `app/assets/tailwind.generated.css` with the `tailwindcss v4` header, the
   theme tokens, and the Badge utilities (`.bg-primary` etc., from `@source`
   scanning the package).
3. `pnpm --dir radcn/apps/docs typecheck` — passes.
4. `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` — the
   docs suite is GREEN (repairs the Experiment 2 `theme.css` failure; Badge now
   renders styled). This suite was never run by prior experiments and is the
   newly-added half of the gate.
5. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts` — the
   fixture suite stays green (1191 passed); the package/theme changes did not
   regress it.
6. `git diff --check` clean; `vendor/` untouched; the generated docs CSS is
   untracked.

Pass criteria (all must hold):

- The docs app serves and links real Tailwind v4 output on every page, ordered
  before `radcnStyles`; the migrated Badge renders styled in the docs app.
- BOTH suites are green: docs (`apps/docs/playwright.config.ts`) and fixture
  (`fixtures/playwright.config.ts`).
- `./theme.css` is excluded from the docs coverage enumeration.
- Typecheck and hygiene clean; generated CSS untracked.

Fail criteria (any → record Partial/Fail with specifics):

- The docs suite is not green (any unaddressed prior regression, or a new one
  from loading Tailwind globally in docs).
- The fixture suite regresses.
- The asset server cannot serve the docs stylesheet.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given only `AGENTS.md`, the issue README, this experiment
file, and Experiment 4, plus read access to referenced sources)

Findings: two Minor, no Blocker/Major.

- Minor: warn against per-page `head` props re-linking the stylesheet (the
  Experiment 4 duplicate-link lesson). Folded into Changes as an
  implementation note.
- Minor: `.gitignore` insertion point unspecified. Clarified (next to the
  existing fixtures line).

The reviewer independently verified every technical claim and, notably, RAN
the failing docs test and CONFIRMED the Experiment 2 regression is real
("theme.css should have an expected public preview hook" fails;
`excludedExports` is `['.', './styles', './package.json']` and `./theme.css`
leaks into the enumerated public subpaths). It confirmed the `@source` path
resolves to `radcn/packages/radcn/src`, the asset server serves
`app/assets/**`, `routes.assets` exists, the document shell can take the
`<link>` before `<RadcnStyle/>`, the cascade ordering parallels the proven
Experiment 4 approach, `radcn/theme.css` tokens (`--primary` etc.) do not
collide with the docs `--docs-*` brand variables, the gitignore gap is real,
and the docs Playwright `webServer` runs `pnpm dev` on port 44100. It judged
the global-Tailwind-in-docs regression risk honestly framed and the docs-suite
gate sufficient. Verdict: APPROVED.

Approval result: approved with no blockers (two minor findings folded in).
