# Experiment 67: Audit drawer example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`drawer`. Upstream shadcn/ui New York v4 has two Drawer examples in the current
inferred cluster:

- `drawer-demo`
- `drawer-dialog`

Current RadCN already ships `radcn/drawer`, docs coverage, candidate fixture
routes, and Playwright coverage for bottom/top/right/left drawers, modal
semantics, trigger opening, default open state, focus trap, focus restoration,
Escape dismissal, outside dismissal, scroll lock, explicit close controls,
handle visibility, drag dismissal threshold, scrollable content, custom tokens,
public Drawer hooks, and composition with Dialog in other resolved clusters.
This experiment audits whether that evidence fully covers the two upstream
Drawer examples before implementation. It should separate Drawer-owned modal
and edge-panel behavior from app-owned Button, Input, Label, native form,
responsive branch selection, goal state, chart rendering, icons, React state,
Vaul, `asChild`, `className`, `data-slot`, Tailwind utilities, `cn`,
`lucide-react`, Recharts, media-query hooks, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/drawer-example-inventory.md`.
  - List both active upstream Drawer example ids: `drawer-demo` and
    `drawer-dialog`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Drawer root, trigger,
    portal, overlay, content, handle, header, footer, title, description, close
    action, default close button if relevant, modal role, `aria-modal`,
    `aria-labelledby`, `aria-describedby`, trigger `aria-expanded` and
    `aria-controls`, focus movement, focus restoration, focus trap, Escape
    dismissal, outside dismissal, scroll lock, default open, directions, drag
    dismissal, scrollable content, custom classes/styles/tokens, docs evidence,
    candidate fixture evidence, reference fixture evidence if present, and
    Playwright evidence.
  - Record mapping decisions for shadcn React props, Vaul `DrawerPrimitive`,
    `asChild`, controlled `open`/`onOpenChange`, React `useState`,
    responsive `useMediaQuery`, `className`, `data-slot`, Tailwind utilities,
    `cn`, Button composition, Input composition, Label composition, Dialog
    composition, native form submission, goal increment/decrement state,
    disabled min/max buttons, `Minus`/`Plus` icons, `lucide-react`, Recharts
    `ResponsiveContainer`/`BarChart`/`Bar`, chart data visualization,
    copy/content strings, vendor source, and RadCN package/docs/fixture/test
    evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/drawer.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/drawer-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/drawer-dialog.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/drawer.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/drawer-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/drawer-dialog.json`
  - note Dialog, Button, Input, Label, Chart, Combobox, Breadcrumb, and Form
    references only where they clarify out-of-cluster composition.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/drawer.tsx`
  - `radcn/packages/radcn/src/components/dialog.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/drawer.tsx`
  - `radcn/fixtures/tests/drawer.spec.ts`
  - relevant Button, Input, Label, Dialog, Chart, Combobox, Breadcrumb, and
    Form evidence only where it clarifies Drawer composition boundaries.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `drawer-example-inventory.md` exists and contains exactly one table row for
  each active upstream Drawer example id.
- A deterministic Node check proves both active upstream Drawer example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/drawer-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'drawer-demo',
    'drawer-dialog',
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
  not mark `drawer` resolved unless every active upstream Drawer example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - Drawer root, trigger, portal, overlay, content, handle, header, footer,
    title, description, close action, modal role, `aria-modal`,
    `aria-labelledby`, `aria-describedby`, trigger `aria-expanded` and
    `aria-controls`, focus movement, focus restoration, focus trap, Escape
    dismissal, outside dismissal, scroll lock, default open, directions, drag
    dismissal, scrollable content, custom classes/styles/tokens, and
    docs/fixture/Playwright evidence;
  - React props, Vaul `DrawerPrimitive`, `asChild`, controlled open state,
    `onOpenChange`, React `useState`, responsive `useMediaQuery`,
    `className`, `data-slot`, Tailwind utilities, `cn`, Button composition,
    Input composition, Label composition, Dialog composition, native forms,
    goal state, min/max disabled controls, `Minus`/`Plus` icons,
    `lucide-react`, Recharts chart rendering, and vendor source as mappings,
    existing evidence, separate resolved clusters, non-dependencies, possible
    intentional divergences, or possible follow-up work rather than mandatory
    new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "drawer-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Drawer example id from the inventory.
- The audit treats React, Vaul, `asChild`, `lucide-react`, Recharts,
  media-query hooks, Tailwind, `cn`, upstream `data-slot`, form-state
  libraries, charting libraries, or vendor source as mandatory RadCN Drawer
  dependencies.
- The audit marks `drawer` resolved without package/docs/fixture/test evidence
  for both active upstream Drawer examples or a recorded intentional
  divergence.
- The audit conflates Drawer-owned modal/edge-panel behavior with app-owned
  Button, Input, Label, Dialog, Form, Chart, Combobox, Breadcrumb, responsive
  branch selection, goal counter state, chart rendering, icon presentation, or
  custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Peirce the 2nd (`019e9ca9-ff79-7f00-a51b-48ab5c3f3abe`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed that the plan satisfies the
audit-only scope, limits changes to Issue 4 documentation, links Experiment 67
from the Issue 4 README with status `Designed`, has not started
implementation, confirms the active upstream Drawer example ids as
`drawer-demo` and `drawer-dialog`, includes a deterministic row-count check,
and separates Drawer-owned modal/edge-panel behavior from React state, Vaul,
`asChild`, Tailwind, Recharts, icons, responsive branching, form composition,
and app-owned goal state.
