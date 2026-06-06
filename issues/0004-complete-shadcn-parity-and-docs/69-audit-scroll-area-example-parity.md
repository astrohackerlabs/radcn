# Experiment 69: Audit scroll-area example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`scroll-area`. Upstream shadcn/ui New York v4 has two Scroll Area examples in
the current inferred cluster:

- `scroll-area-demo`
- `scroll-area-horizontal-demo`

Current RadCN already ships `radcn/scroll-area`, docs coverage, candidate
fixture routes, and Playwright coverage for native vertical and horizontal
scrolling, focusable viewports, vertical/horizontal scrollbar hooks, thumb
hooks, corner hooks, custom tokens, and composition with arbitrary content.
This experiment audits whether that evidence fully covers the two upstream
Scroll Area examples before implementation. It should separate Scroll
Area-owned root/viewport/scrollbar/thumb/corner behavior from app-owned
content, Separator composition, image rendering, remote image assets,
Next/Image, React fragments, `className`, `data-slot`, Tailwind utilities,
Radix ScrollArea primitives, `cn`, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster
state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/scroll-area-example-inventory.md`.
  - List both active upstream Scroll Area example ids: `scroll-area-demo` and
    `scroll-area-horizontal-demo`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Scroll Area root,
    viewport, vertical scrollbar, horizontal scrollbar, thumb, corner,
    focus-visible treatment, native scrolling, width/height customization,
    rounded/bordered surfaces, custom classes/styles/tokens, docs evidence,
    candidate fixture evidence, reference fixture evidence if relevant, and
    Playwright evidence.
  - Record mapping decisions for shadcn React props, Radix
    `ScrollAreaPrimitive`, `className`, `data-slot`, Tailwind utilities, `cn`,
    default vertical scrollbar insertion, `ScrollBar orientation="horizontal"`,
    `Separator` composition, repeated tag content, React fragments/keys,
    `next/image`, remote Unsplash image URLs, image dimensions, figure and
    figcaption markup, horizontal `w-max`/`whitespace-nowrap` layout, vendor
    source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/scroll-area.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/scroll-area-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/scroll-area-horizontal-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/scroll-area.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/scroll-area-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/scroll-area-horizontal-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/separator.json`
    only where it clarifies the vertical tags example.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/scroll-area.tsx`
  - `radcn/packages/radcn/src/components/separator.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/scroll-area.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/scroll-area.tsx`
  - `radcn/fixtures/tests/avatar-scroll-area.spec.ts`
  - relevant Separator evidence only where it clarifies Scroll Area example
    composition boundaries.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `scroll-area-example-inventory.md` exists and contains exactly one table row
  for each active upstream Scroll Area example id.
- A deterministic Node check proves both active upstream Scroll Area example
  ids appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/scroll-area-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'scroll-area-demo',
    'scroll-area-horizontal-demo',
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
  not mark `scroll-area` resolved unless every active upstream Scroll Area
  example is `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - Scroll Area root, viewport, vertical scrollbar, horizontal scrollbar,
    thumb, corner, focus-visible treatment, native scrolling, width/height
    customization, rounded/bordered surfaces, custom classes/styles/tokens,
    and docs/fixture/Playwright evidence;
  - React props, Radix `ScrollAreaPrimitive`, `className`, `data-slot`,
    Tailwind utilities, `cn`, default vertical scrollbar behavior,
    horizontal `ScrollBar`, Separator composition, repeated tag content,
    React fragments/keys, `next/image`, remote image URLs, image dimensions,
    figure/figcaption markup, horizontal strip layout, and vendor source as
    mappings, existing evidence, separate package evidence, non-dependencies,
    possible intentional divergences, or possible follow-up work rather than
    mandatory new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "scroll-area-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Scroll Area example id from the
  inventory.
- The audit treats React, Radix, `next/image`, Tailwind, `cn`, upstream
  `data-slot`, remote images, image optimization, or vendor source as mandatory
  RadCN Scroll Area dependencies.
- The audit marks `scroll-area` resolved without package/docs/fixture/test
  evidence for both active upstream Scroll Area examples or a recorded
  intentional divergence.
- The audit conflates Scroll Area-owned scroll container behavior with
  app-owned Separator, repeated content, image, figure/figcaption, remote
  asset, or custom layout decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Hilbert the 2nd (`019e9cbf-232d-7823-8bcb-9f5f108d2eef`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed that the plan is valid for an
audit-only Scroll Area example parity experiment, is linked from the Issue 4
README with status `Designed`, includes concrete verification, preserves the
audit-only scope, has not started implementation, keeps vendor status clean,
and correctly identifies the active upstream example ids as `scroll-area-demo`
and `scroll-area-horizontal-demo`.
