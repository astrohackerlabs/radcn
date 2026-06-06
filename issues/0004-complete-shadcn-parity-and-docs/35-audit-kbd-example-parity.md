# Experiment 35: Audit kbd example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`kbd`. RadCN already exports `Kbd` and `KbdGroup`, and current fixtures prove a
basic semantic keyboard shortcut. Upstream shadcn/ui has broader Kbd example
coverage that composes Kbd with Button, InputGroup, Tooltip, ButtonGroup, and
inline prose.

Upstream shadcn/ui has 5 Kbd component examples:

- `kbd-button`
- `kbd-demo`
- `kbd-group`
- `kbd-input-group`
- `kbd-tooltip`

This experiment audits those 5 examples before implementation. It should
separate what the `Kbd` package itself must support from composition owned by
Button, ButtonGroup, InputGroup, Tooltip, prose, app-owned icons, docs
examples, fixture routes, and Playwright proof. It must not implement new
package APIs, docs examples, fixture routes, or tests.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/kbd-example-inventory.md`.
  - List all 5 upstream Kbd example ids: `kbd-button`, `kbd-demo`,
    `kbd-group`, `kbd-input-group`, and `kbd-tooltip`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports semantic `<kbd>` output,
    `KbdGroup`, grouped key sequences, plus signs or text separators, inline
    prose composition, Kbd inside Button, Kbd inside InputGroup addons, Kbd
    inside TooltipContent, KbdGroup inside TooltipContent, ButtonGroup plus
    Tooltip composition, and app-owned Search icon presentation.
  - Record mapping decisions for shadcn Tailwind layout utilities,
    `data-slot`, tooltip-context styling, lucide Search icon usage,
    `TooltipTrigger asChild`, Button composition, ButtonGroup composition,
    InputGroup composition, and current RadCN package/docs/fixture/Playwright
    evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/kbd.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/kbd-button.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/kbd-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/kbd-group.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/kbd-input-group.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/kbd-tooltip.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/kbd.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/input-group.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  - relevant Playwright specs for ButtonGroup, InputGroup, and Tooltip
    composition if they contain existing evidence.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `kbd-example-inventory.md` exists and contains exactly one table row for each
  upstream Kbd example id.
- A deterministic Node check proves all 5 upstream Kbd example ids appear
  exactly once:
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
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (text.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does not
  mark `kbd` resolved unless every upstream Kbd example is `Covered` or
  `Intentional divergence`.
- The inventory explicitly addresses:
  - Kbd inside Button composition;
  - multiple KbdGroup rows with symbol keys and text keys;
  - inline prose with KbdGroup;
  - Kbd inside InputGroup inline-end addon and app-owned Search icon mapping;
  - Kbd and KbdGroup inside TooltipContent with ButtonGroup/Tooltip
    composition;
  - whether lucide icons are app presentation rather than package
    dependencies;
  - whether `TooltipTrigger asChild` maps to explicit RadCN trigger
    composition;
  - Tailwind utility and `data-slot` mapping to RadCN classes, styles, data
    hooks, or CSS variables;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "kbd-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Kbd example id.
- The audit treats lucide, Tailwind utility classes, Radix Slot/asChild, or
  vendor source as mandatory `Kbd` package dependencies.
- The audit marks `kbd` resolved without package/docs/fixture/test evidence
  for all 5 upstream examples.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Goodall (`019e9b5f-3c68-7f50-b2b2-48463392e96b`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Goodall confirmed the plan is audit-only, scoped to
exactly the 5 upstream Kbd examples, linked from the Issue 4 README as
`Designed`, includes the required Description, Changes, Verification, and
Design Review sections, has concrete pass/fail criteria and hygiene checks,
keeps vendor checkouts untouched, treats lucide, Tailwind utilities, Radix
`asChild`, and vendor source as mappings rather than dependencies, separates
current evidence from follow-up work, and has not started implementation.
