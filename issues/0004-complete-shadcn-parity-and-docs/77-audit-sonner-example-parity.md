# Experiment 77: Audit sonner example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`sonner`. Upstream shadcn/ui New York v4 has two Sonner examples in the current
inferred cluster:

- `sonner-demo`
- `sonner-types`

Current RadCN already ships `radcn/sonner` and `radcn/toast`, docs coverage,
candidate fixture routes, and Playwright coverage for initial toasts, toast
event dispatch, accessible notification regions, status/alert roles, variants,
actions, dismiss controls, stacks, custom tokens, and absence of React/Sonner
dependencies. This experiment audits whether that evidence fully covers the
two active upstream Sonner examples before implementation. It should separate
Toaster-owned notification rendering and event behavior from app-owned Button
triggers, promise state, console callbacks, React click handlers, Sonner
library APIs, next-themes, lucide icons, Tailwind utilities, `className`,
`data-slot`, `cn`, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/sonner-example-inventory.md`.
  - Include a `## Examples` table whose first column is the backticked upstream
    example id, so deterministic row-count verification can parse it.
  - List both active upstream Sonner example ids: `sonner-demo` and
    `sonner-types`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Toaster region semantics,
    static toasts, event-dispatched toasts, default/success/info/warning/error/
    loading types, action controls, dismiss controls, duration behavior,
    status/alert roles, aria-live politeness, custom classes/styles/tokens,
    docs evidence, candidate fixture evidence, reference fixture evidence if
    relevant, and Playwright evidence.
  - Record mapping decisions for shadcn React click handlers, `toast()`,
    `toast.success`, `toast.info`, `toast.warning`, `toast.error`,
    `toast.promise`, Sonner `Toaster`, `sonner` package dependency,
    `next-themes`, lucide icons, Button composition, action callbacks,
    promise/loading/success/error flow, console logging, Tailwind utilities,
    `className`, `data-slot`, `cn`, vendor source, and RadCN package/docs/
    fixture evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/sonner.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sonner-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sonner-types.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sonner.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sonner-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sonner-types.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/sonner.tsx`
  - `radcn/packages/radcn/src/components/toast.ts`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/sonner.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/toast.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/sonner.tsx`
  - `radcn/fixtures/tests/notifications.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `sonner-example-inventory.md` exists and contains exactly one table row for
  each active upstream Sonner example id.
- A deterministic Node check proves both active upstream Sonner example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/sonner-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = ['sonner-demo', 'sonner-types']
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
  not claim the Sonner cluster is resolved unless every active upstream Sonner
  example is `Covered` or `Intentional divergence`. This audit may record
  per-example outcomes inside `sonner-example-inventory.md`, but it must not
  update `resolved-clusters.json` or regenerate/update `parity-inventory.md`.
- The inventory explicitly addresses:
  - Toaster region semantics, toast list/items, static toasts, event-dispatched
    toasts, default/success/info/warning/error/loading types, actions,
    dismiss, duration, roles, aria-live behavior, custom classes/styles/tokens,
    and docs/fixture/Playwright evidence;
  - React click handlers, `toast.*` APIs, `toast.promise`, Sonner package
    dependency, `next-themes`, lucide icons, Button composition, action
    callbacks, promise state, console logging, Tailwind utilities, `className`,
    `data-slot`, `cn`, and vendor source as mappings, existing evidence,
    non-dependencies, possible intentional divergences, or possible follow-up
    work rather than mandatory new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "sonner-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Sonner example id from the inventory.
- The audit treats React, Sonner, next-themes, lucide-react, Tailwind, `cn`,
  upstream `data-slot`, or vendor source as mandatory RadCN dependencies.
- The audit marks `sonner` resolved without package/docs/fixture/test evidence
  for both active upstream Sonner examples or a recorded intentional
  divergence.
- The audit conflates Toaster-owned notification rendering with app-owned
  Button trigger composition, promise orchestration, callback behavior, or
  browser event dispatch.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Banach the 2nd (`019e9d21-4aac-7172-bfa2-3276b4c7fbbf`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 77 as `Designed`, active New York v4 Sonner example ids are
`sonner-demo` and `sonner-types`, the scope is audit-only, verification has
concrete pass/fail and hygiene checks, `git diff --check` passed, vendor
checkouts are clean, only expected issue-doc changes exist, and no blockers
remain.
