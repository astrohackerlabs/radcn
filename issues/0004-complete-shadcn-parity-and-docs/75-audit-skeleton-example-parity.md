# Experiment 75: Audit skeleton example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`skeleton`. Upstream shadcn/ui New York v4 has two Skeleton examples in the
current inferred cluster:

- `skeleton-card`
- `skeleton-demo`

Current RadCN already ships `radcn/skeleton`, docs coverage, candidate fixture
routes, and Playwright coverage for hidden placeholder semantics and pulse
animation. This experiment audits whether that evidence fully covers the two
upstream Skeleton examples before implementation. It should separate
Skeleton-owned placeholder behavior from app-owned layout, dimensions,
rounded shapes, Tailwind utilities, `className`, `data-slot`, `cn`, and vendor
source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/skeleton-example-inventory.md`.
  - Include a `## Examples` table whose first column is the backticked upstream
    example id, so deterministic row-count verification can parse it.
  - List both active upstream Skeleton example ids: `skeleton-card` and
    `skeleton-demo`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports hidden placeholder
    semantics, pulse animation, base rounded/accent styling, custom classes,
    inline styles, CSS variables if relevant, docs evidence, candidate fixture
    evidence, reference fixture evidence if relevant, and Playwright evidence.
  - Record mapping decisions for shadcn React props, `className`, `data-slot`,
    Tailwind utilities, `cn`, flex/space layout, fixed widths/heights,
    rounded-full avatar shape, rounded-xl card shape, app-owned grouping
    wrappers, vendor source, and RadCN package/docs/fixture evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/skeleton.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/skeleton-card.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/skeleton-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/skeleton.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/skeleton-card.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/skeleton-demo.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/skeleton.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/static-display.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `skeleton-example-inventory.md` exists and contains exactly one table row for
  each active upstream Skeleton example id.
- A deterministic Node check proves both active upstream Skeleton example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/skeleton-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = ['skeleton-card', 'skeleton-demo']
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
  not claim the Skeleton cluster is resolved unless every active upstream
  Skeleton example is `Covered` or `Intentional divergence`. This audit may
  record per-example outcomes inside `skeleton-example-inventory.md`, but it
  must not update `resolved-clusters.json` or regenerate/update
  `parity-inventory.md`.
- The inventory explicitly addresses:
  - hidden placeholder semantics, pulse animation, base styling, shape
    customization, custom classes/styles/tokens, and docs/fixture/Playwright
    evidence;
  - React props, `className`, `data-slot`, Tailwind utilities, `cn`, flex and
    space layout wrappers, fixed dimensions, rounded avatar/card shapes, and
    vendor source as mappings, existing evidence, non-dependencies, possible
    intentional divergences, or possible follow-up work rather than mandatory
    new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "skeleton-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Skeleton example id from the inventory.
- The audit treats React, Tailwind, `cn`, upstream `data-slot`, layout wrappers,
  or vendor source as mandatory RadCN Skeleton dependencies.
- The audit marks `skeleton` resolved without package/docs/fixture/test
  evidence for both active upstream Skeleton examples or a recorded intentional
  divergence.
- The audit conflates Skeleton-owned placeholder semantics and animation with
  app-owned layout, width, height, avatar shape, card shape, or grouping
  decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Harvey the 2nd (`019e9d0f-ec5f-7aa2-8e14-07b9ee307603`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 75 as `Designed`, the scope is audit-only, active upstream New York
v4 Skeleton example ids are `skeleton-card` and `skeleton-demo`, `git diff
--check` passed, vendor checkouts are clean, and no blockers remain.
