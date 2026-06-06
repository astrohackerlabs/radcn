# Experiment 34: Implement toggle example parity depth

## Description

Experiment 33 audited the 6 plain upstream shadcn/ui Toggle examples and found
that RadCN already has the core `Toggle` primitive behavior, but named example
parity proof is incomplete. This experiment implements the missing docs,
fixture, Playwright, and inventory depth for:

- `toggle-demo`
- `toggle-disabled`
- `toggle-lg`
- `toggle-outline`
- `toggle-sm`
- `toggle-with-text`

The implementation should preserve RadCN's dependency-free native button model:
no React, no Radix Toggle, no lucide dependency, no Tailwind dependency, no
vendor imports, and no `toggle-group` changes.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Toggle docs entry from seed coverage into a named six-example
    parity preview.
  - Render stable docs hooks for all 6 upstream example ids:
    `toggle-demo`, `toggle-disabled`, `toggle-lg`, `toggle-outline`,
    `toggle-sm`, and `toggle-with-text`.
  - Demonstrate `ariaLabel`, disabled state, `size="sm"`, `size="lg"`,
    `variant="outline"`, icon-only toggles, icon plus text toggles, and the
    bookmark demo's app-authored selected-state icon styling.
  - Use package-imported `Toggle` from `radcn/toggle`.
  - Use app-owned glyphs/spans or inline SVGs as presentation; do not import
    lucide or vendor icons.
  - Explain Remix 3 divergences: Radix Toggle maps to native button plus
    enhancement, Tailwind selected-state utilities map to `data-state` and app
    CSS/classes, icons are app presentation, and installation copy remains
    aspirational.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`
  Add named fixture routes for all 6 upstream Toggle examples:
  `demo`, `disabled`, `lg`, `outline`, `sm`, and `with-text`. Preserve existing
  general Toggle routes unless a route is intentionally replaced by equivalent
  upstream example proof.
- Update Playwright coverage in `radcn/fixtures/tests/toggle.spec.ts`.
  - Verify `toggle-demo` renders a small outline bookmark toggle with
    `aria-label="Toggle bookmark"`, visible `Bookmark` text, decorative icon,
    and app-authored selected-state icon styling after press.
  - Verify `toggle-disabled` is a disabled icon-only toggle with accessible
    name.
  - Verify `toggle-lg` uses large sizing and accessible name.
  - Verify `toggle-outline` uses outline variant and accessible name.
  - Verify `toggle-sm` uses small sizing and accessible name.
  - Verify `toggle-with-text` renders icon plus visible `Italic` text with
    accessible name.
  - Keep existing general Toggle and ToggleGroup tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs evidence for all 6 named Toggle examples.
  - Assert source/API text mentions `ariaLabel`, `size="sm"`, `size="lg"`,
    `variant="outline"`, `data-state`, and the absence of lucide/Radix package
    requirements through the docs divergence copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/toggle-example-inventory.md`.
  - Change each upstream row to `Covered` only after docs, fixtures, and
    Playwright evidence exists.
  - Preserve the Experiment 33 mapping decisions.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `toggle` as a resolved example cluster with evidence from Experiments
    33 and 34 plus `toggle-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Toggle example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/toggle-group.tsx`,
  `radcn/packages/radcn/src/components/toggle.tsx`, or Toggle package APIs
  unless implementation discovers and records a direct blocker in the current
  primitive.

## Verification

Pass criteria:

- Package and docs checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts toggle.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all 6 upstream Toggle example ids appear
  exactly once in `toggle-example-inventory.md` and every row is `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/toggle-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = [
    'toggle-demo',
    'toggle-disabled',
    'toggle-lg',
    'toggle-outline',
    'toggle-sm',
    'toggle-with-text',
  ]
  let failed = false
  for (const id of ids) {
    const row = text.match(new RegExp('\\| `'+id+'` \\|[^\\n]+', 'g')) ?? []
    console.log(`${id}: ${row.length} ${row[0] ?? ''}`)
    if (row.length !== 1 || !row[0].includes('| Covered |')) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "toggle"`, `status = "resolved"`, and evidence
  for Experiment 33, Experiment 34, and `toggle-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `toggle` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for toggle`.
- Fixture tests assert:
  - the bookmark demo has small size, outline variant, visible text, accessible
    label, decorative icon, and selected-state icon styling;
  - disabled, large, outline, small, and with-text routes each expose the
    expected accessible name and class/state evidence;
  - existing ToggleGroup coverage still passes.
- Docs coverage asserts the Toggle page renders stable evidence for all 6 named
  docs examples and source/API text mentions `ariaLabel`, `size="sm"`,
  `size="lg"`, `variant="outline"`, and `data-state`.
- Dependency and scope checks pass:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*radix-ui|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  ```
  The command should produce no matches.
- `rg -n "toggle-group" issues/0004-complete-shadcn-parity-and-docs/toggle-example-inventory.md radcn/apps/docs/app/content/components.tsx radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`
  may find existing docs or fixture text, but must not show new claims that
  ToggleGroup is part of the plain Toggle example cluster. Any matches must be
  reviewed and explained in the result.
- `git diff --check`
- `git status --short` shows only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any of the 6 plain Toggle example rows remains `Partial` or `Missing`.
- The implementation marks `toggle` resolved without docs/fixture/Playwright
  evidence for every upstream plain Toggle example.
- The implementation adds React, Radix Toggle, lucide, Tailwind, or vendor
  imports/dependencies.
- The implementation changes ToggleGroup APIs or claims ToggleGroup work as
  part of plain Toggle parity.
- Docs or fixtures imply `Toggle` owns icon packages or app-specific selected
  icon state.
- The regenerated parity inventory still recommends `toggle` as the first
  unresolved example cluster.

## Design Review

Reviewer: Aristotle (`019e9b52-c2c8-7790-bd24-a69de2c357d7`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Aristotle confirmed the README links Experiment 34
as `Designed`, the plan has the required Description, Changes, Verification,
and Design Review sections, the scope is exactly the 6 plain Toggle examples
and explicitly excludes `toggle-group`, the technical plan matches Experiment
33's audit gaps, verification has concrete pass/fail criteria and hygiene
checks, dependency policy is covered, vendor cleanliness is checked, and no
implementation has started.

## Result

**Result:** Pass

Toggle example parity depth is implemented for all 6 plain upstream examples:
`toggle-demo`, `toggle-disabled`, `toggle-lg`, `toggle-outline`, `toggle-sm`,
and `toggle-with-text`.

Implementation changes:

- `radcn/apps/docs/app/content/components.tsx` now has a rich Toggle docs page
  with package-imported `Toggle`, app-owned decorative icon spans, stable
  `data-radcn-docs-toggle-family` hooks for all 6 examples, and divergence copy
  for Radix Toggle, lucide icons, Tailwind selected-state utilities, and
  app-owned state.
- `radcn/apps/docs/tests/coverage.spec.ts` checks all 6 Toggle docs examples
  plus source/API text for `ariaLabel`, `size="sm"`, `size="lg"`,
  `variant="outline"`, `data-state`, lucide, and Radix mappings.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx` add named candidate
  routes for `demo`, `disabled`, `lg`, `outline`, `sm`, and `with-text`.
- `radcn/fixtures/tests/toggle.spec.ts` verifies the bookmark demo's small
  outline variant, visible text, accessible label, decorative icon, and
  selected-state icon styling, plus disabled, large, outline, small, and
  with-text routes.
- `radcn/packages/radcn/src/styles/tokens.css` adds a small
  `.radcn-toggle-icon` presentation hook with selected-state color support, and
  `radcn/packages/radcn/src/styles/index.ts` was regenerated. This avoids using
  ToggleGroup-specific icon classes for plain Toggle examples while keeping
  icon assets app-owned.
- `toggle-example-inventory.md` marks all 6 upstream rows `Covered`.
- `resolved-clusters.json` marks `toggle` resolved in the example queue, and
  the regenerated `parity-inventory.md` now recommends example parity for
  `kbd`.

Verification run:

```text
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm --dir radcn/apps/docs typecheck
```

All three commands passed.

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts toggle.spec.ts
```

The first run failed because the new test expected a nonexistent `data-size`
attribute on `Toggle`; `Toggle` exposes size through public classes and CSS.
The test was corrected to assert `.radcn-toggle--sm` and `min-height`.

Final output summary:

```text
7 passed
```

```text
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

Output summary:

```text
5 passed
```

The Playwright commands emitted the existing Node `module.register()`
deprecation warning and `NO_COLOR`/`FORCE_COLOR` warning.

Additional deterministic checks passed:

```text
node - <<'NODE'
const fs = require('fs')
const css = fs.readFileSync('radcn/packages/radcn/src/styles/tokens.css', 'utf8')
const index = fs.readFileSync('radcn/packages/radcn/src/styles/index.ts', 'utf8')
const expected = `export const radcnStyles = ${JSON.stringify(css)}\n`
if (index !== expected) process.exit(1)
NODE
```

```text
node scripts/audit-shadcn-parity.mjs
```

Output:

```text
wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
```

Deterministic inventory checks proved all 6 rows appear exactly once in
`toggle-example-inventory.md` with `Covered` outcomes, `resolved-clusters.json`
contains the `toggle` resolved example entry with Experiment 33, Experiment 34,
and inventory evidence, `toggle` is absent from unresolved example clusters,
and the first recommended cluster is no longer `Example parity for toggle`.

Dependency and hygiene checks passed:

```text
rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*radix-ui|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The dependency `rg` exited 1 with no matches. `git diff --check` and vendor
status produced no output.

The ToggleGroup scope scan:

```text
rg -n "toggle-group" issues/0004-complete-shadcn-parity-and-docs/toggle-example-inventory.md radcn/apps/docs/app/content/components.tsx radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx
```

returned only existing ToggleGroup docs/fixture sections plus the inventory
statement that this experiment avoided changing `toggle-group`. No result
claims ToggleGroup work as part of plain Toggle parity.

## Completion Review

Reviewer: Hegel (`019e9b5a-9d8d-7cb0-88ef-af1df1ec684f`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Hegel verified that Result and Conclusion are
present, the README marks Experiment 34 `Pass` and records learnings, all 6
Toggle docs hooks exist, fixture routes cover the 6 plain Toggle examples,
fixture Playwright proves the requested plain Toggle behaviors while keeping
ToggleGroup coverage, `resolved-clusters.json` resolves `toggle` with
Experiment 33, Experiment 34, and inventory evidence, all 6 inventory rows are
`Covered` exactly once, typechecks and Playwright verification passed,
dependency and hygiene checks are clean, vendor status is clean, and the result
commit had not been made before completion review.

## Conclusion

Plain Toggle example parity is resolved. The next experiment should follow the
regenerated inventory recommendation and audit example parity for `kbd`.
