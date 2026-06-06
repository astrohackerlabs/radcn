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
