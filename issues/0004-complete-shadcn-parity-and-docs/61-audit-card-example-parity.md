# Experiment 61: Audit card example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`card`. Upstream shadcn/ui New York v4 has two Card examples in the current
inferred cluster:

- `card-demo`
- `card-with-form`

Current RadCN already ships `radcn/card`, docs coverage, candidate fixture
routes, and Playwright coverage for Card slot hooks, title/description/action/
content/footer parts, compact sizing, custom tokens, and Card composition inside
Form, Chart, and Carousel fixtures. This experiment audits whether that evidence
fully covers the two upstream Card examples before implementation. It should
separate Card-owned layout and slot behavior from app-owned form state, Button,
Input, Label, Select composition, React imports, `className`, Tailwind width and
layout utilities, `data-slot`, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/card-example-inventory.md`.
  - List both active upstream Card example ids: `card-demo` and
    `card-with-form`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Card root, header, title,
    description, action, content, footer, public hooks, size variants, custom
    classes/styles/tokens, full-width/max-width styling, compact fixed-width
    styling, login/account form composition, project form composition, Button
    composition, Input/Label composition, Select composition, docs evidence,
    candidate fixture evidence, reference fixture evidence if present, and
    Playwright evidence.
  - Record mapping decisions for shadcn React props, `className`, `data-slot`,
    `cn`, Tailwind utilities, `w-full`, `max-w-sm`, `w-[350px]`, `flex`,
    `grid`, `gap-*`, `justify-between`, `CardAction`, `Button variant="link"`,
    `Button variant="outline"`, Input `type="email"`/`type="password"`,
    native form semantics, Select `position="popper"`, vendor source, and RadCN
    package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/card.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/card-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/card-with-form.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card-with-form.json`
  - note already-resolved Form, Chart, Carousel, and block Card references only
    where they clarify out-of-cluster composition.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/card.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
  - relevant Form, Input, Label, Select, Button, Chart, and Carousel evidence
    only where it clarifies Card composition boundaries.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `card-example-inventory.md` exists and contains exactly one table row for
  each active upstream Card example id.
- A deterministic Node check proves both active upstream Card example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/card-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'card-demo',
    'card-with-form',
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
  not mark `card` resolved unless every active upstream Card example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - Card root, header, title, description, action, content, footer, public
    hooks, size variants, custom classes/styles/tokens, width/layout styling,
    login/account form composition, project form composition, Button
    composition, Input/Label composition, Select composition, and docs/fixture/
    Playwright evidence;
  - React props, `className`, `data-slot`, `cn`, Tailwind width/layout
    utilities, `CardAction`, Button variants, Input types, native form
    semantics, Select `position`, Form/Chart/Carousel references, block
    references, and vendor source as mappings, existing evidence, separate
    resolved clusters, non-dependencies, or possible follow-up work rather than
    mandatory new Card dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "card-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Card example id from the inventory.
- The audit treats React, Tailwind, `cn`, upstream `data-slot`, vendor source,
  or a form-state library as mandatory RadCN Card dependencies.
- The audit marks `card` resolved without package/docs/fixture/test evidence
  for both active upstream Card examples or a recorded intentional divergence.
- The audit conflates Card-owned slot/layout behavior with app-owned form
  state, Button/Input/Label/Select behavior, Form example parity, Chart example
  parity, Carousel example parity, block usage, or custom-class styling
  decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Helmholtz the 2nd (`019e9c63-13a4-7542-82fc-2d3dbbaaa6fb`) with
fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that Issue 4 links
Experiment 61 with status `Designed`, the experiment includes Description,
Changes, Verification, and Design Review sections, the scope is audit-only with
explicit no-code-change boundaries, verification includes deterministic
row-count checking, README learning checks, `git diff --check`, expected
worktree status, and vendor cleanliness checks, and the plan matches the active
inventory entries for `card-demo` and `card-with-form`.
