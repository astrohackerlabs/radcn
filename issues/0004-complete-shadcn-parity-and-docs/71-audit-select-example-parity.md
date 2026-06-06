# Experiment 71: Audit select example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`select`. Upstream shadcn/ui New York v4 has two Select examples in the current
inferred cluster:

- `select-demo`
- `select-scrollable`

Current RadCN already ships `radcn/select`, docs coverage, candidate fixture
routes, and Playwright coverage for trigger opening, placeholder state,
selected value display, hidden input submission, grouped items, labels,
separators, disabled and invalid state, keyboard movement, typeahead, selected
indicators, scroll buttons, scrollable content, popper-style placement, custom
tokens, and form reset behavior. This experiment audits whether that evidence
fully covers the two upstream Select examples before implementation. It should
separate Select-owned trigger/content/item/value behavior from app-owned
option sets, React state, Radix Select primitives, `className`, `data-slot`,
Tailwind utilities, `cn`, lucide icons, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster
state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/select-example-inventory.md`.
  - List both active upstream Select example ids: `select-demo` and
    `select-scrollable`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Select root, trigger,
    value placeholder/display, portal, content, viewport, group, label, item,
    item indicator, separator, scroll up/down buttons, hidden input, selected
    value state, keyboard navigation, typeahead, disabled items, invalid state,
    scrollable content, popper placement, custom classes/styles/tokens, docs
    evidence, candidate fixture evidence, reference fixture evidence if
    relevant, and Playwright evidence.
  - Record mapping decisions for shadcn React props, Radix `SelectPrimitive`,
    `className`, `data-slot`, Tailwind utilities, `cn`, `CheckIcon`,
    `ChevronDownIcon`, `ChevronUpIcon`, `lucide-react`, portal behavior,
    trigger widths `w-[180px]` and `w-[280px]`, fruit option sets, timezone
    groups, scrollable content, vendor source, and RadCN package/docs/fixture
    evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/select.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/select-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/select-scrollable.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/select.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/select-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/select-scrollable.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/select.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/select.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/select.tsx`
  - `radcn/fixtures/tests/select.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `select-example-inventory.md` exists and contains exactly one table row for
  each active upstream Select example id.
- A deterministic Node check proves both active upstream Select example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/select-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = ['select-demo', 'select-scrollable']
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1])
  let failed = rows.length !== ids.length
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
  not mark `select` resolved unless every active upstream Select example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - Select root, trigger, value, portal, content, viewport, group, label, item,
    item indicator, separator, scroll up/down buttons, hidden input, selected
    state, keyboard navigation, typeahead, disabled items, invalid state,
    scrollable content, popper placement, custom classes/styles/tokens, and
    docs/fixture/Playwright evidence;
  - React props, Radix `SelectPrimitive`, `className`, `data-slot`, Tailwind
    utilities, `cn`, lucide icons, trigger widths, fruit option sets, timezone
    groups, portal behavior, and vendor source as mappings, existing evidence,
    non-dependencies, possible intentional divergences, or possible follow-up
    work rather than mandatory new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "select-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Select example id from the inventory.
- The audit treats React, Radix Select primitives, lucide-react, Tailwind, `cn`,
  upstream `data-slot`, or vendor source as mandatory RadCN Select
  dependencies.
- The audit marks `select` resolved without package/docs/fixture/test evidence
  for both active upstream Select examples or a recorded intentional
  divergence.
- The audit conflates Select-owned selection/overlay behavior with app-owned
  fruit option sets, timezone grouping, trigger width, labels, or custom layout
  decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Godel the 2nd (`019e9cd5-61e8-7af1-a9e3-80638362d2d3`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed that the plan is valid for an
audit-only Select example parity experiment, is linked from the Issue 4 README
with status `Designed`, includes concrete verification, preserves audit-only
scope, has not started implementation, keeps vendor status clean, and
correctly identifies the active upstream example ids as `select-demo` and
`select-scrollable`.
