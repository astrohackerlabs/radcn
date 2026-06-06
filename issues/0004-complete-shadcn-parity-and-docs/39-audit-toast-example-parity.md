# Experiment 39: Audit toast example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`toast`. In the vendored shadcn/ui New York v4 registry, the legacy `toast`
component and its examples are listed in `DEPRECATED_ITEMS`, while `sonner` is
the current notification component with its own separate unresolved example
cluster. The deprecated toast examples still exist in the public registry JSON
payloads, so RadCN needs an explicit parity decision instead of silently
skipping them.

Upstream shadcn/ui has 5 deprecated New York v4 toast examples:

- `toast-demo`
- `toast-destructive`
- `toast-simple`
- `toast-with-action`
- `toast-with-title`

This experiment audits those 5 examples before implementation. It should
separate what RadCN's `toast` event helper must support from behavior owned by
`radcn/sonner`, Button composition, action links/buttons, browser enhancement,
server-rendered initial toasts, docs examples, fixture routes, and Playwright
proof. It must not implement new package APIs, docs examples, fixture routes,
or tests.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/toast-example-inventory.md`.
  - List all 5 upstream deprecated toast example ids:
    `toast-demo`, `toast-destructive`, `toast-simple`, `toast-with-action`,
    and `toast-with-title`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports toast title, description,
    destructive/error mapping, action labels/URLs, event-triggered browser
    toasts, server-rendered initial toasts, no-JS initial state, Button
    trigger composition, dismiss behavior, and accessible status/alert roles.
  - Record mapping decisions for deprecated shadcn `toast`, `useToast`,
    `ToastAction`, React click handlers, Radix/RadCN UI toast internals, Sonner
    replacement guidance, lucide icons, `next-themes`, vendor source, Button
    composition, and current RadCN package/docs/fixture/Playwright evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/toast-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/toast-destructive.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/toast-simple.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/toast-with-action.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/toast-with-title.json`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/sonner.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sonner-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sonner-types.tsx`
    only as adjacent evidence that Sonner is the current upstream notification
    surface, not as part of the `toast` example cluster.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/toast.ts`
  - `radcn/packages/radcn/src/components/sonner.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/toast.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/sonner.tsx`
  - `radcn/fixtures/tests/notifications.spec.ts`
  - relevant package exports and dependency checks for `radcn/toast` and
    `radcn/sonner`.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `toast-example-inventory.md` exists and contains exactly one table row for
  each upstream deprecated toast example id.
- A deterministic Node check proves all 5 upstream deprecated toast example
  ids appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/toast-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'toast-demo',
    'toast-destructive',
    'toast-simple',
    'toast-with-action',
    'toast-with-title',
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
- The inventory distinguishes current evidence from follow-up work and does not
  mark `toast` resolved unless every upstream deprecated toast example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - title-only, description-only, title+description, action, and destructive
    toast behavior;
  - mapping deprecated `useToast` and `ToastAction` to RadCN's event helper,
    `Toaster`, explicit action links, and/or server-rendered initial toasts;
  - whether destructive maps to RadCN `error` toast type;
  - whether React click handlers map to browser-owned enhancement or route/
    server state;
  - whether Sonner is adjacent current upstream notification evidence but not
    the same unresolved `toast` cluster;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "toast-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream deprecated toast example id.
- The audit conflates the unresolved deprecated `toast` examples with the
  separate unresolved `sonner` example cluster without documenting the
  distinction.
- The audit treats React, `useToast`, `ToastAction`, Sonner, lucide,
  next-themes, vendor source, or shadcn toast internals as mandatory RadCN
  `toast` dependencies.
- The audit marks `toast` resolved without package/docs/fixture/test evidence
  for all 5 upstream deprecated toast examples.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Feynman (`019e9b82-6324-7231-82cc-62cfa6c3fc91`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the initial Changes section required mapping decisions for React,
  `useToast`, `ToastAction`, toast internals, Sonner, and Button composition,
  but did not explicitly include lucide, `next-themes`, or vendor source.
  Fixed by adding those three items to the required mapping-decision bullet.

Approval result: approved. Feynman confirmed that the issue README links
Experiment 39 as `Designed`, the experiment has Description, Changes,
Verification, and Design Review sections, the scope is audit-only and excludes
package/docs/fixture/test implementation, verification has concrete pass/fail
criteria and hygiene checks, vendor checkouts are clean, the inventory
recommends toast and lists exactly the five deprecated toast ids, and Sonner is
kept as a separate unresolved cluster.
