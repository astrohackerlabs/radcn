# Experiment 43: Audit combobox example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`combobox`. Upstream shadcn/ui New York v4 has four combobox examples in the
current inferred cluster:

- `combobox-demo`
- `combobox-dropdown-menu`
- `combobox-popover`
- `combobox-responsive`

Current RadCN already ships `radcn/combobox`, docs coverage, candidate fixture
routes, and Playwright coverage for searchable listbox behavior, selection,
chips, invalid/disabled state, popper positioning, custom hooks, and native form
submission. This experiment audits whether that evidence fully covers the four
upstream examples before implementation. It should separate Combobox-owned
behavior from app-owned composition with Dropdown Menu, Popover, Drawer, Button,
icons, responsive branching, and route/server state.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/combobox-example-inventory.md`.
  - List all four upstream combobox example ids:
    `combobox-demo`, `combobox-dropdown-menu`, `combobox-popover`, and
    `combobox-responsive`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports searchable command-style
    option lists, empty state, grouped options, selected indicators, trigger
    labels, open/close behavior, keyboard navigation, disabled options,
    popper-style side/align positioning, hidden input form submission,
    clearable state, multiple selection/chips, custom hooks, and docs/fixture/
    Playwright evidence.
  - Record mapping decisions for shadcn React `useState`, `onSelect`,
    `Button asChild`, `Command`, `Popover`, `DropdownMenu`, `Drawer`,
    `useMediaQuery`, `lucide-react` icons, Tailwind utilities, `className`,
    `data-slot`, vendor source, and RadCN package/docs/fixture/test evidence.
  - Inspect `combobox-form` only as adjacent evidence and explicitly record why
    it is outside this experiment's current `combobox` cluster unless the audit
    finds it is actually included in the active parity inventory.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/combobox-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/combobox-dropdown-menu.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/combobox-popover.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/combobox-responsive.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/combobox-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/combobox-dropdown-menu.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/combobox-popover.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/combobox-responsive.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/combobox-form.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/combobox.tsx`
  - `radcn/packages/radcn/src/utils/searchable-listbox.ts`
  - `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  - `radcn/packages/radcn/src/components/popover.tsx`
  - `radcn/packages/radcn/src/components/drawer.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/combobox.tsx`
  - `radcn/fixtures/tests/combobox-command.spec.ts`
  - relevant reference fixture code and package export/dependency checks for
    `radcn/combobox`.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `combobox-example-inventory.md` exists and contains exactly one table row for
  each upstream combobox example id.
- A deterministic Node check proves all four upstream combobox example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/combobox-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'combobox-demo',
    'combobox-dropdown-menu',
    'combobox-popover',
    'combobox-responsive',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1])
  let failed = rows.length !== ids.length
  if (rows.length !== ids.length) {
    console.log(`row-count: ${rows.length}`)
  }
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (examples.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  for (const row of rows) {
    if (!ids.includes(row)) {
      console.log(`unexpected: ${row}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does
  not mark `combobox` resolved unless every upstream combobox example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - searchable command-style lists, empty state, grouping, selected indicators,
    trigger/value labels, keyboard navigation, open/close behavior, disabled
    options, popper side/align positioning, native form submission, clearable
    state, multiple/chip state, custom hooks, responsive popover/drawer
    composition, and docs/fixture/Playwright evidence;
  - React `useState` and `onSelect` state mapping to Remix/web-first explicit
    state, default values, hidden inputs, app-owned route/server state, or
    dependency-free browser enhancement;
  - `Button asChild`, `Command`, `Popover`, `DropdownMenu`, `Drawer`,
    `useMediaQuery`, `lucide-react`, Tailwind, `className`, `data-slot`, and
    vendor source as mappings or non-dependencies rather than mandatory RadCN
    Combobox dependencies;
  - why `combobox-form` is outside this cluster or what evidence proves it must
    be handled by this cluster.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "combobox-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream combobox example id from the active parity
  inventory.
- The audit conflates `combobox-form` with the current four-example combobox
  cluster without recording the distinction.
- The audit treats React, `lucide-react`, Tailwind, `useMediaQuery`, upstream
  `Command`, upstream `Popover`, upstream `DropdownMenu`, upstream `Drawer`, or
  vendor source as mandatory RadCN Combobox dependencies.
- The audit marks `combobox` resolved without package/docs/fixture/test
  evidence for all four upstream combobox examples.
- The audit conflates Combobox-owned behavior with app-owned responsive layout,
  dropdown menu composition, status-row presentation, icon choice, label
  persistence, route/server state, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Russell the 2nd (`019e9bab-30e7-7e31-a121-46c0cf26536b`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Russell the 2nd confirmed that the issue README
links Experiment 43 as `Designed`, the experiment has Description, Changes,
Verification, and Design Review sections, the scope is audit-only with package,
docs, fixture, test, resolved-cluster, and generated parity changes excluded,
verification has concrete pass/fail criteria including exact four-row combobox
validation, repo hygiene and vendor cleanliness checks are present, learnings
and next-experiment recording are required, and the active combobox cluster is
exactly `combobox-demo`, `combobox-dropdown-menu`, `combobox-popover`, and
`combobox-responsive` with `combobox-form` treated as adjacent evidence unless
the audit proves otherwise.
