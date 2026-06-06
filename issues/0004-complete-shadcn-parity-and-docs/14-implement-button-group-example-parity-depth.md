# Experiment 14: Implement button-group example parity depth

## Description

Experiment 13 audited all 11 upstream shadcn ButtonGroup examples and found
that RadCN's base ButtonGroup package exists, but example parity depth is not
complete. Current proof covers horizontal grouping, vertical grouping, and
separator/text hooks. It does not prove nested groups, split buttons, size
matrices, input composition, InputGroup composition, Select composition,
DropdownMenu composition, Popover composition, accessible vertical icon groups,
or React state mappings.

This experiment implements that ButtonGroup parity depth. It should preserve
RadCN's Remix 3 model: no React dependency, no `asChild`, no upstream icon
package dependency, no vendor imports, and no npm publishing.

## Changes

- Update `radcn/packages/radcn/src/components/button-group.tsx`.
  - Add accessible group labeling props if needed, such as `ariaLabel` and
    `ariaLabelledby`, so vertical/icon ButtonGroups can expose a group name.
  - Keep `ButtonGroup`, `ButtonGroupText`, and `ButtonGroupSeparator` as
    host-element primitives.
  - Do not add state ownership to ButtonGroup.
- Update RadCN styles:
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/packages/radcn/src/styles/index.ts`
  Add or refine token-driven hooks for:
  - nested ButtonGroups with visible gaps between child groups;
  - joined child controls beyond only direct `.radcn-button` children, including
    inputs and select triggers where needed;
  - split-button and separator-only compositions;
  - size matrix composition across small/default/large and icon sizes;
  - input, InputGroup, Select, DropdownMenu trigger, and Popover trigger
    composition inside ButtonGroup.
- Update docs in `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Button Group docs page from seed-only coverage into rich docs if
    needed.
  - Demonstrate all 11 upstream ButtonGroup example families:
    `demo`, `dropdown`, `input`, `input-group`, `nested`, `orientation`,
    `popover`, `select`, `separator`, `size`, and `split`.
  - Document that shadcn's `asChild` trigger pattern maps to explicit RadCN
    trigger components and Button props.
  - Document that React `useState` examples map to server/default state,
    submitted native values, route state, or dependency-free browser
    enhancement owned by the app.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  Add fixture scenarios for all 11 upstream ButtonGroup examples:
  `demo`, `dropdown`, `input`, `input-group`, `nested`, `orientation`,
  `popover`, `select`, `separator`, `size`, and `split`. Preserve the existing
  `horizontal`, `vertical`, and `with-separator` scenarios unless a replacement
  is intentionally covered by the new scenarios.
- Update Playwright coverage in `radcn/fixtures/tests/navigation-collection.spec.ts`
  or a focused ButtonGroup test file if that keeps the suite clearer. Verify:
  - `ButtonGroup` renders `role="group"` and an accessible group label when
    provided;
  - nested groups expose multiple `data-radcn-button-group` hooks and preserve
    visible spacing between child groups;
  - split buttons use `ButtonGroupSeparator`, an accessible icon-sized action,
    and joined secondary button styling;
  - size examples cover small, default, large, `icon-sm`, `icon`, and
    `icon-lg`;
  - input composition renders Input inside ButtonGroup and keeps the search
    button accessible;
  - InputGroup composition renders nested `data-radcn-input-group` and an
    app-owned active/disabled state mapping;
  - Select composition renders the RadCN Select trigger and hidden native
    submitted value;
  - DropdownMenu and Popover compositions render explicit RadCN trigger
    components and content hooks without `asChild`;
  - separator-only behavior is proved separately from `ButtonGroupText`.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/button-group-example-inventory.md`.
  - Change each upstream row to `Covered` or `Intentional divergence` after the
    new proof lands.
  - Preserve mapping decisions from Experiment 13.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `button-group` as a resolved example cluster with evidence from
    Experiments 13 and 14 plus `button-group-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final ButtonGroup outcome and next
  generated recommendation.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  or the focused ButtonGroup Playwright spec created by this experiment.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 11 upstream ButtonGroup example ids
  appear exactly once in `button-group-example-inventory.md`.
- A deterministic Node check proves every upstream ButtonGroup example row has
  a final outcome of `Covered` or `Intentional divergence`, and that no row
  keeps a `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "button-group"`, `status = "resolved"`, and
  evidence for Experiment 13, Experiment 14, and
  `button-group-example-inventory.md`.
- A deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- `rg -n "Example parity for button-group|Audit upstream examples for button-group" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  exits 1 with no matches.
- Deterministic checks prove `ButtonGroup` exports any new accessibility props
  from both `radcn/packages/radcn/src/components/button-group.tsx` and the root
  `radcn/packages/radcn/src/index.ts` type surface.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|useState\\(|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json issues/0004-complete-shadcn-parity-and-docs/button-group-example-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- ButtonGroup still lacks proof for any audited upstream example family.
- Accessible vertical/icon groups cannot expose a group label.
- The implementation depends on React state, `asChild`, upstream icon packages,
  or vendor imports.
- Docs or fixtures imply ButtonGroup owns select/dropdown/popover/input state.
- The audit inventory marks `button-group` resolved while any upstream
  ButtonGroup example still lacks package/docs/fixture/test evidence or a
  documented intentional divergence.
- The regenerated parity inventory still recommends `button-group` as the first
  unresolved example cluster.

## Design Review

Reviewer: Anscombe (`019e9a73-ba22-7802-9922-e070161d3bad`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment file had Description, Changes, and Verification, but
  did not yet have a `## Design Review` section recording the design-review
  result. Fixed by adding this section before the plan commit.

Approval result: approved. Anscombe confirmed the issue README links Experiment
14 as `Designed`, the scope is coherent for one implementation-depth experiment,
implementation has not started, verification includes concrete typecheck,
Playwright, parity-regeneration, deterministic inventory/resolution,
no-vendor/no-React, diff/status, and vendor-cleanliness criteria, and the
technical plan matches the upstream ButtonGroup gaps.

## Result

**Result:** Pass

ButtonGroup example parity depth is implemented.

Package changes:

- `radcn/packages/radcn/src/components/button-group.tsx` now supports
  `ariaLabel` and `ariaLabelledby` on `ButtonGroup`, so icon-only and vertical
  groups can expose an accessible group name.
- ButtonGroup styles now cover explicit nested cluster spacing through the
  `.radcn-button-group--clustered` hook, joined composition with inputs,
  InputGroup, Select triggers, DropdownMenu triggers, and Popover triggers,
  split/separator compositions, and token-driven ButtonGroupText surfaces.
- `radcn/packages/radcn/src/styles/index.ts` was regenerated from
  `tokens.css`.

Docs, fixtures, and inventory changes:

- `radcn/apps/docs/app/content/components.tsx` now has a rich Button Group docs
  entry and live preview covering the upstream demo, dropdown, input,
  input-group, nested, orientation, popover, select, separator, size, and split
  example families.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx` now
  expose all 11 upstream ButtonGroup example families: `demo`, `dropdown`,
  `input`, `input-group`, `nested`, `orientation`, `popover`, `select`,
  `separator`, `size`, and `split`.
- `radcn/fixtures/tests/navigation-collection.spec.ts` verifies the ButtonGroup
  example cluster through public hooks, accessible group labels, nested group
  spacing, split actions, size variants, input/InputGroup/Select composition,
  DropdownMenu and Popover composition, separator-only groups, and vertical icon
  groups.
- `button-group-example-inventory.md` marks all upstream ButtonGroup rows
  `Covered` except `button-group-input-group` and `button-group-select`, which
  are recorded as `Intentional divergence` because RadCN maps React state to
  server/default values, native submitted values, route state, or app-owned
  enhancement.
- `resolved-clusters.json` marks `button-group` resolved with evidence from
  Experiments 13 and 14 plus `button-group-example-inventory.md`.
- `parity-inventory.md` was regenerated and now recommends example parity for
  `input-group`.

Verification run on 2026-06-05:

- `pnpm radcn:typecheck` — passed.
- `pnpm --dir radcn/apps/docs typecheck` — passed.
- `pnpm fixtures:candidate:typecheck` — passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  — passed, 7 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — passed, 5 tests.
- `node scripts/audit-shadcn-parity.mjs` — passed and regenerated
  `parity-inventory.md`.
- Parity inventory idempotence command — passed with no diff.
- Deterministic ButtonGroup id check — passed; all 11 upstream ButtonGroup ids
  appear exactly once in `button-group-example-inventory.md`.
- Deterministic ButtonGroup outcome check — passed; every upstream ButtonGroup
  row is `Covered` or `Intentional divergence`, with no `Partial` or `Missing`.
- Deterministic resolved-cluster check — passed; `button-group` has
  `status = "resolved"` and evidence for Experiment 13, Experiment 14, and
  `button-group-example-inventory.md`.
- Deterministic style sync check — passed; `styles/index.ts` matches
  `tokens.css`.
- `rg -n "Example parity for button-group|Audit upstream examples for button-group" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  — passed with exit 1 and no matches.
- Deterministic ButtonGroup accessibility prop/type-surface check — passed for
  `radcn/packages/radcn/src/components/button-group.tsx` and the root
  `radcn/packages/radcn/src/index.ts` type surface.
- Forbidden dependency/publish grep — passed with exit 1 and no matches.
- `git diff --check` — passed.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  — passed with no output.
- `git status --short` showed only expected package, docs, fixture, test,
  issue, resolved-cluster, and generated-inventory changes before completion
  review.

Known warnings:

- Playwright web servers print the existing Node `module.register()`
  deprecation warning and `NO_COLOR`/`FORCE_COLOR` warning. These warnings were
  already present in this repository's test harness and did not affect the
  passing checks.

## Conclusion

ButtonGroup is no longer an unresolved Issue 4 example cluster. RadCN now maps
all upstream ButtonGroup examples to Remix 3 host elements, explicit overlay
triggers, native submitted values, and app-owned state boundaries. The remaining
intentional divergences are React state and `asChild`: neither becomes a
ButtonGroup package dependency.

The next unresolved generated cluster is example parity for `input-group`.

## Completion Review

Reviewer: Gibbs (`019e9a7e-d567-7340-9363-57fdb2e347da`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Gibbs reviewed the completed experiment against `AGENTS.md`, the Issue 4
README, Experiment 14, ButtonGroup inventory, resolved clusters, generated
parity inventory, and the relevant package/docs/fixture/test diff.

Reviewer verification rerun:

- `pnpm radcn:typecheck` — passed.
- `pnpm --dir radcn/apps/docs typecheck` — passed.
- `pnpm fixtures:candidate:typecheck` — passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  — passed, 7 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — passed, 5 tests.
- `git diff --check` — passed.
- Vendor status check — passed with no output.
- Forbidden vendor/React/useState/publish grep — passed.
- Deterministic inventory, style-sync, and resolved-cluster checks — passed.

Approval result: approved. Gibbs confirmed the result commit had not been made
before review and found no blocker, major, or minor findings.
