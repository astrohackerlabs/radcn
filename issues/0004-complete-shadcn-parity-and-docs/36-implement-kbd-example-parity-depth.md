# Experiment 36: Implement kbd example parity depth

## Description

Experiment 35 audited the 5 upstream shadcn/ui Kbd examples and found that
RadCN has the core `Kbd` and `KbdGroup` primitives, but named example parity
proof is incomplete. This experiment implements the missing docs, fixture,
Playwright, and inventory depth for:

- `kbd-button`
- `kbd-demo`
- `kbd-group`
- `kbd-input-group`
- `kbd-tooltip`

The implementation should preserve RadCN's dependency-free semantic shortcut
model: no React, no lucide dependency, no Tailwind dependency, no Radix Slot,
no vendor imports, and no ownership drift from Button, ButtonGroup, InputGroup,
or Tooltip into `Kbd`.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Kbd docs entry from seed coverage into a named five-example
    parity preview.
  - Render stable docs hooks for all 5 upstream example ids:
    `kbd-button`, `kbd-demo`, `kbd-group`, `kbd-input-group`, and
    `kbd-tooltip`.
  - Demonstrate `Kbd` inside `Button`, multiple `KbdGroup` rows, inline prose
    with `KbdGroup`, `Kbd` inside `InputGroupAddon`, and `Kbd`/`KbdGroup`
    inside `TooltipContent` composed with `ButtonGroup`.
  - Use package-imported `Kbd` and `KbdGroup` from `radcn/kbd`; compose with
    package-imported `Button`, `ButtonGroup`, `InputGroup`, and `Tooltip`
    primitives where needed.
  - Use app-owned glyphs/spans or inline SVGs for Search icon presentation; do
    not import lucide or vendor icons.
  - Explain Remix 3 divergences: shadcn `data-slot` maps to RadCN public hooks,
    Tailwind layout/context styling maps to classes/styles/CSS variables,
    lucide icons are app presentation, and `TooltipTrigger asChild` maps to
    explicit RadCN trigger composition.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add named Kbd fixture routes for all 5 upstream examples:
  `button`, `demo`, `group`, `input-group`, and `tooltip`. Preserve the
  existing `default` route unless a replacement intentionally proves the same
  behavior.
- Update Playwright coverage in
  `radcn/fixtures/tests/static-display.spec.ts` or a focused `kbd.spec.ts` if
  that keeps the suite clearer.
  - Verify `kbd-button` renders two small outline buttons containing Kbd keys
    `⏎` and `Esc`.
  - Verify `kbd-demo` renders two KbdGroup rows with symbol keys and `Ctrl` +
    `B` separator text.
  - Verify `kbd-group` renders inline prose with `Ctrl + B` and `Ctrl + K`
    Kbd entries.
  - Verify `kbd-input-group` renders InputGroup with an app-owned Search icon
    and inline-end `⌘` plus `K` Kbd entries.
  - Verify `kbd-tooltip` renders ButtonGroup with TooltipContent containing a
    single Kbd shortcut and a grouped `Ctrl` + `P` shortcut.
  - Keep existing static display coverage passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs evidence for all 5 named Kbd examples.
  - Assert source/API text mentions `KbdGroup`, `InputGroup`, `TooltipContent`,
    `ButtonGroup`, `data-slot`, `asChild`, and lucide mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/kbd-example-inventory.md`.
  - Change each upstream row to `Covered` only after docs, fixtures, and
    Playwright evidence exists.
  - Preserve the Experiment 35 mapping decisions.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `kbd` as a resolved example cluster with evidence from Experiments 35
    and 36 plus `kbd-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Kbd example outcome and
  the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/kbd.tsx` or Kbd package
  APIs unless implementation discovers and records a direct blocker in the
  current primitive.

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
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
  ```
  or the focused Kbd Playwright spec created by this experiment.
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all 5 upstream Kbd example ids appear
  exactly once in `kbd-example-inventory.md` and every row is `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/kbd-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = [
    'kbd-button',
    'kbd-demo',
    'kbd-group',
    'kbd-input-group',
    'kbd-tooltip',
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
  `examples` entry with `slug = "kbd"`, `status = "resolved"`, and evidence
  for Experiment 35, Experiment 36, and `kbd-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `kbd` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for kbd`.
- Fixture tests assert:
  - Button, demo, group, input-group, and tooltip Kbd example routes expose the
    expected semantic `kbd[data-radcn-kbd]` and `data-radcn-kbd-group` hooks;
  - Button, ButtonGroup, InputGroup, and Tooltip keep their own public hooks and
    accessible behavior when composed with Kbd;
  - app-owned Search icon presentation is decorative and does not introduce an
    icon package dependency.
- Docs coverage asserts the Kbd page renders stable evidence for all 5 named
  docs examples and source/API text mentions `KbdGroup`, `InputGroup`,
  `TooltipContent`, `ButtonGroup`, `data-slot`, `asChild`, and lucide mapping
  copy.
- Dependency and scope checks pass:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*radix|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  ```
  The command should produce no matches.
- `git diff --check`
- `git status --short` shows only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any of the 5 Kbd example rows remains `Partial` or `Missing`.
- The implementation marks `kbd` resolved without docs/fixture/Playwright
  evidence for every upstream Kbd example.
- The implementation adds React, lucide, Tailwind, Radix, or vendor
  imports/dependencies.
- The implementation changes Button, ButtonGroup, InputGroup, or Tooltip APIs
  instead of composing existing behavior.
- Docs or fixtures imply `Kbd` owns icon packages, tooltip state, button state,
  input-group behavior, or command-palette routing.
- The regenerated parity inventory still recommends `kbd` as the first
  unresolved example cluster.

## Design Review

Reviewer: Codex / GPT-5 fresh-context subagent
`019e9b64-a305-7380-8158-cc3520ba1192`.

Fresh context: yes.

Approval result: approved.

Findings: none.

The reviewer confirmed that the issue README links Experiment 36 as
`Designed`, the experiment has the required Description, Changes,
Verification, and Design Review sections, the scope is exactly the 5 Kbd
examples, ownership boundaries and dependency constraints are explicit,
verification includes concrete inventory, scope, hygiene, and vendor checks,
and implementation has not started before the plan commit.

## Result

**Result:** Pass

Experiment 36 completed named Kbd example parity depth for all 5 upstream
shadcn/ui Kbd examples:

- `kbd-button`
- `kbd-demo`
- `kbd-group`
- `kbd-input-group`
- `kbd-tooltip`

Implementation changes:

- `radcn/apps/docs/app/content/components.tsx` now has a rich Kbd docs page
  with package-imported `Kbd` and `KbdGroup`, stable
  `data-radcn-docs-kbd-family` hooks for all 5 upstream example ids, Button
  composition, multiple grouped shortcut rows, prose shortcut composition,
  InputGroup addon composition, and ButtonGroup plus TooltipContent shortcut
  composition.
- The Kbd docs page records Remix 3 divergences for shadcn `data-slot`,
  Tailwind/context styling, lucide icon presentation, and
  `TooltipTrigger asChild`.
- `radcn/fixtures/scenarios/index.ts`,
  `radcn/fixtures/candidate-remix/app/fixtures/index.tsx`, and
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` now expose
  named candidate routes for `button`, `demo`, `group`, `input-group`, and
  `tooltip`, while preserving the existing `default` route.
- `radcn/fixtures/tests/static-display.spec.ts` verifies the 5 named Kbd
  fixture routes with public RadCN hooks and accessible composition evidence.
- `radcn/apps/docs/tests/coverage.spec.ts` verifies the 5 named Kbd docs hooks
  plus source/API text for `KbdGroup`, `InputGroup`, `TooltipContent`,
  `ButtonGroup`, `data-slot`, `asChild`, and lucide mapping copy.
- `kbd-example-inventory.md` marks all 5 upstream Kbd rows `Covered`.
- `resolved-clusters.json` marks `kbd` resolved with Experiment 35,
  Experiment 36, and inventory evidence.
- `parity-inventory.md` was regenerated and now recommends example parity for
  `textarea`.
- Issue 4 `README.md` records the final Kbd outcome and the `KbdGroup` prose
  markup learning.

During fixture verification, the first Playwright run failed because the test
expected `KbdGroup` elements inside a native `p` element. RadCN `KbdGroup`
renders a `div`, so the browser correctly reparents those elements out of the
paragraph. The prose examples were changed to valid flex-wrapping `div`
wrappers that visually read inline and preserve the intended composition.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
```

All three commands passed.

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
```

The first run failed on the invalid paragraph expectation described above.
After the markup/test correction, the final output summary was:

```text
9 passed
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
node scripts/audit-shadcn-parity.mjs
```

Output:

```text
wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
```

Deterministic inventory checks proved all 5 Kbd rows appear exactly once in
`kbd-example-inventory.md` with `Covered` outcomes, `resolved-clusters.json`
contains the `kbd` resolved example entry with Experiment 35, Experiment 36,
and inventory evidence, `kbd` is absent from unresolved example clusters, and
the first recommended cluster is no longer `Example parity for kbd`.

Dependency and hygiene checks passed:

```text
rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*radix|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The dependency `rg` exited 1 with no matches. `git diff --check` and vendor
status produced no output.

## Completion Review

Reviewer: Carver (`019e9b6d-9967-74c3-8489-c16fe6e20f63`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Carver verified that the experiment has
`Result: Pass`, verification notes, hygiene checks, and Conclusion; the issue
README marks Experiment 36 `Pass` and records later-work learnings; docs and
fixtures cover exactly `kbd-button`, `kbd-demo`, `kbd-group`,
`kbd-input-group`, and `kbd-tooltip`; all inventory rows are `Covered`;
`resolved-clusters.json` marks `kbd` resolved with Experiment 35, Experiment
36, and inventory evidence; the regenerated parity inventory removes `kbd`
from unresolved clusters and recommends `textarea`; `git diff --check`,
dependency/scope search, vendor cleanliness, and nested-git checks were clean;
and the result commit had not been made before completion review.

## Conclusion

Kbd example parity is resolved. The next experiment should follow the
regenerated inventory recommendation and audit example parity for `textarea`.
