# Experiment 45: Audit dropdown-menu example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`dropdown-menu`. Upstream shadcn/ui New York v4 has four Dropdown Menu examples
in the current inferred cluster:

- `dropdown-menu-checkboxes`
- `dropdown-menu-demo`
- `dropdown-menu-dialog`
- `dropdown-menu-radio-group`

Current RadCN already ships `radcn/dropdown-menu`, docs coverage, candidate
fixture routes, and Playwright coverage for menu semantics, trigger behavior,
portal movement, roving focus, typeahead, disabled items, checked items, radio
items, submenus, collision handling, shortcuts, destructive items, and custom
tokens. This experiment audits whether that evidence fully covers the four
upstream examples before implementation. It should separate Dropdown Menu-owned
behavior from app-owned composition with Button, Dialog, Field, Input,
Textarea, icons, and route/server state.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/dropdown-menu-example-inventory.md`.
  - List all four upstream Dropdown Menu example ids:
    `dropdown-menu-checkboxes`, `dropdown-menu-demo`,
    `dropdown-menu-dialog`, and `dropdown-menu-radio-group`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports trigger semantics,
    content side/align placement, portal movement, labels, groups, separators,
    shortcuts, disabled items, destructive items, submenus, checkbox items,
    radio groups/items, roving focus, typeahead, pointer highlight, click and
    keyboard activation, close-on-select, collision/stage clamping, custom
    hooks/classes, and docs/fixture/Playwright evidence.
  - Record mapping decisions for shadcn React `useState`, `onCheckedChange`,
    `onValueChange`, `onSelect`, `modal={false}`, `Button asChild`, Dialog
    composition, Field/Input/Textarea composition, `lucide-react` icons,
    Radix primitive types, Tailwind utilities, `className`, `data-slot`, vendor
    source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dropdown-menu-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dropdown-menu-checkboxes.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dropdown-menu-radio-group.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dropdown-menu-dialog.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/dropdown-menu-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/dropdown-menu-checkboxes.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/dropdown-menu-radio-group.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/dropdown-menu-dialog.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  - `radcn/packages/radcn/src/utils/menu-overlay.ts`
  - `radcn/packages/radcn/src/components/dialog.tsx`
  - `radcn/packages/radcn/src/components/field.tsx`
  - `radcn/packages/radcn/src/components/input.tsx`
  - `radcn/packages/radcn/src/components/textarea.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/menu-overlays.tsx`
  - `radcn/fixtures/tests/menu-overlays.spec.ts`
  - relevant dialog, field, input, textarea, and navigation fixture evidence
    where Dropdown Menu is composed with other primitives.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `dropdown-menu-example-inventory.md` exists and contains exactly one table row
  for each upstream Dropdown Menu example id.
- A deterministic Node check proves all four upstream Dropdown Menu example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/dropdown-menu-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'dropdown-menu-checkboxes',
    'dropdown-menu-demo',
    'dropdown-menu-dialog',
    'dropdown-menu-radio-group',
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
  not mark `dropdown-menu` resolved unless every upstream Dropdown Menu example
  is `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - trigger semantics, menu role, portal movement, labels, groups, separators,
    shortcuts, disabled items, destructive items, submenus, checkbox items,
    radio groups/items, roving focus, typeahead, pointer highlight,
    close-on-select, collision/stage clamping, custom hooks/classes, and
    docs/fixture/Playwright evidence;
  - React `useState`, `onCheckedChange`, `onValueChange`, and `onSelect`
    mapping to Remix/web-first explicit state, default checked/value props,
    app-owned route/server state, or dependency-free browser enhancement;
  - `modal={false}`, `Button asChild`, Dialog composition,
    Field/Input/Textarea composition, `lucide-react`, Radix primitive types,
    Tailwind, `className`, `data-slot`, and vendor source as mappings or
    non-dependencies rather than mandatory RadCN Dropdown Menu dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "dropdown-menu-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Dropdown Menu example id from the active parity
  inventory.
- The audit treats React, `lucide-react`, Tailwind, Radix primitive source,
  upstream Dialog, upstream Field/Input/Textarea, or vendor source as mandatory
  RadCN Dropdown Menu dependencies.
- The audit marks `dropdown-menu` resolved without package/docs/fixture/test
  evidence for all four upstream Dropdown Menu examples.
- The audit conflates Dropdown Menu-owned behavior with app-owned dialog
  routing/state, icon choice, form field values, checkbox/radio persistence,
  modal policy, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Galileo the 2nd (`019e9bc9-559b-7ed0-a492-f0adb6e92f28`)
with fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, the scope is audit-only, verification has concrete
pass/fail criteria and hygiene checks, and vendor checkouts are not part of the
write scope.

## Result

**Result:** Pass

Created `dropdown-menu-example-inventory.md` and audited all four active
upstream Dropdown Menu examples:

- `dropdown-menu-checkboxes`
- `dropdown-menu-demo`
- `dropdown-menu-dialog`
- `dropdown-menu-radio-group`

The audit found strong RadCN primitive coverage for Dropdown Menu semantics:
trigger behavior, menu role wiring, portal movement, side/align placement,
labels, groups, separators, shortcuts, disabled items, destructive item
variants, checkbox items, radio groups/items, submenus, roving focus,
typeahead, pointer highlight, close-on-select, outside close, collision/stage
clamping, and custom class/style/data hooks.

The example cluster remains partially covered because the docs, candidate
fixtures, and Playwright tests do not yet prove the four named upstream example
ids as user-facing compositions. No current evidence requires changing the
`radcn/dropdown-menu` package API.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/dropdown-menu-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const ids = [
  'dropdown-menu-checkboxes',
  'dropdown-menu-demo',
  'dropdown-menu-dialog',
  'dropdown-menu-radio-group',
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

Output:

```text
dropdown-menu-checkboxes: 1
dropdown-menu-demo: 1
dropdown-menu-dialog: 1
dropdown-menu-radio-group: 1
```

Additional verification:

```text
rg -n "dropdown-menu-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

`rg` found the new learning. `git diff --check` passed. `git status --short`
showed only expected Issue 4 documentation changes before the result commit.
The vendor status loop printed no output.

## Conclusion

Dropdown Menu primitive parity is strong, but named Dropdown Menu example
parity is not complete. The next experiment should implement docs, candidate
fixtures, and Playwright coverage for the four upstream examples without
adding React, Radix, `lucide-react`, Tailwind, or vendor dependencies.

## Completion Review

Reviewer: Jason the 2nd (`019e9bcd-545c-7ce2-9f7d-83791f213eb5`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the result
matches the audit-only scope, the result commit had not yet been made, the
changed files were limited to Issue 4 documentation, `git diff --check` passed,
vendor cleanliness was checked, the inventory row check covered the four
Dropdown Menu example ids exactly once, and the Issue 4 README records the
matching `Pass` status and follow-up learning.
