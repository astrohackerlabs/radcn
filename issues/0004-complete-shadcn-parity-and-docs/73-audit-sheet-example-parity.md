# Experiment 73: Audit sheet example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`sheet`. Upstream shadcn/ui New York v4 has two Sheet examples in the current
inferred cluster:

- `sheet-demo`
- `sheet-side`

Current RadCN already ships `radcn/sheet`, docs coverage, candidate fixture
routes, and Playwright coverage for modal dialog semantics, focus trapping,
Escape and overlay dismissal, focus restoration, portal/overlay/content wiring,
right/left/top/bottom side variants, custom tokens, title/description/footer
parts, and close controls. This experiment audits whether that evidence fully
covers the two upstream Sheet examples before implementation. It should
separate Sheet-owned modal/side behavior from app-owned Button, Input, Label,
form layout, React state, Radix/Dialog primitives, `asChild`, `className`,
`data-slot`, Tailwind utilities, `cn`, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/sheet-example-inventory.md`.
  - Include a `## Examples` table whose first column is the backticked upstream
    example id, so deterministic row-count verification can parse it.
  - List both active upstream Sheet example ids: `sheet-demo` and
    `sheet-side`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Sheet root, trigger,
    portal, overlay, content, side variants, header, title, description,
    footer, close controls, default close button, modal role/ARIA wiring,
    focus trap, focus restoration, Escape dismissal, overlay dismissal,
    custom classes/styles/tokens, docs evidence, candidate fixture evidence,
    reference fixture evidence if relevant, and Playwright evidence.
  - Record mapping decisions for shadcn React props, Radix/Dialog primitives,
    `asChild`, `className`, `data-slot`, Tailwind utilities, `cn`, Button
    composition, Input composition, Label composition, form/layout markup,
    `SHEET_SIDES`, React keys, fixed ids in `sheet-side`, side values,
    `SheetClose asChild`, submit buttons, default values, vendor source, and
    RadCN package/docs/fixture evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/sheet.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sheet-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sheet-side.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sheet.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sheet-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sheet-side.json`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/sheet.tsx`
  - `radcn/packages/radcn/src/components/dialog.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/sheet.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/sheet.tsx`
  - `radcn/fixtures/tests/modal-variants.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `sheet-example-inventory.md` exists and contains exactly one table row for
  each active upstream Sheet example id.
- A deterministic Node check proves both active upstream Sheet example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/sheet-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = ['sheet-demo', 'sheet-side']
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
  not claim the Sheet cluster is resolved unless every active upstream Sheet
  example is `Covered` or `Intentional divergence`. This audit may record
  per-example outcomes inside `sheet-example-inventory.md`, but it must not
  update `resolved-clusters.json` or regenerate/update `parity-inventory.md`.
- The inventory explicitly addresses:
  - Sheet root, trigger, portal, overlay, content, side variants, header,
    title, description, footer, close controls, default close button, modal
    role/ARIA wiring, focus trap, focus restoration, Escape dismissal, overlay
    dismissal, custom classes/styles/tokens, and docs/fixture/Playwright
    evidence;
  - React props, Radix/Dialog primitives, `asChild`, `className`, `data-slot`,
    Tailwind utilities, `cn`, Button/Input/Label composition, form/layout
    markup, `SHEET_SIDES`, React keys, fixed ids in `sheet-side`, side values,
    `SheetClose asChild`, submit buttons, default values, and vendor source as
    mappings, existing evidence, non-dependencies, possible intentional
    divergences, or possible follow-up work rather than mandatory new
    dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "sheet-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Sheet example id from the inventory.
- The audit treats React, Radix/Dialog primitives, `asChild`, Tailwind, `cn`,
  upstream `data-slot`, Button/Input/Label composition, form layout, or vendor
  source as mandatory RadCN Sheet dependencies.
- The audit marks `sheet` resolved without package/docs/fixture/test evidence
  for both active upstream Sheet examples or a recorded intentional divergence.
- The audit conflates Sheet-owned modal/side behavior with app-owned form
  fields, labels, submit actions, layout grids, repeated side demo mapping, or
  button styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Meitner the 2nd (`019e9cef-b37b-7e90-b9f8-4d55d451fdeb`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the first review asked for the inventory table shape to be explicit
  because the verification parses a `## Examples` table whose first column is
  the backticked example id. Fixed.
- Minor: the first review asked for the resolved-state language to clarify
  that this audit may only record per-example outcomes in
  `sheet-example-inventory.md` and must not update `resolved-clusters.json` or
  regenerated `parity-inventory.md`. Fixed.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 73 as `Designed`, required sections are present, the upstream active
Sheet examples are exactly `sheet-demo` and `sheet-side`, vendor checkouts are
clean, and no blockers remain.

## Result

**Result:** Partial

Created `sheet-example-inventory.md` and audited the two active upstream Sheet
examples: `sheet-demo` and `sheet-side`.

RadCN already covers the core Sheet primitive behavior: root, trigger, portal,
overlay, content, side variants, header/title/description/footer, close
controls, default close button, modal role/ARIA wiring, focus trap, initial
focus, focus restoration, Escape dismissal, overlay dismissal, body scroll
lock, custom classes/styles/tokens, and generic side-placement tests.

The active upstream examples are still only partially covered because current
docs, candidate fixtures, and Playwright tests prove generic Sheet behavior
rather than the named upstream profile form and four-side compositions. The
audit did not identify a required Sheet package API change. The likely next
experiment should add named docs examples, candidate fixture routes, and
Playwright coverage for `sheet-demo` and `sheet-side`, while keeping React,
Radix/Dialog primitives, `asChild`, Tailwind, `cn`, Button/Input/Label
composition, layout/form mechanics, and vendor source out of Sheet package
dependencies.

Verification run:

- `node - <<'NODE' ... NODE` deterministic row-count check:
  `sheet-demo: 1`, `sheet-side: 1`.
- `rg -n "sheet-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
- `git diff --check`
- `git status --short`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`

## Conclusion

Sheet example parity is partial. The package API appears sufficient for the
active upstream examples, but named docs, fixtures, and Playwright coverage are
still needed to prove the upstream compositions. The next experiment should
implement parity depth for `sheet-demo` and `sheet-side` without adding React,
Radix/Dialog primitives, `asChild`, Tailwind, `cn`, Button/Input/Label
dependencies, layout/form dependencies, or vendor dependencies.

## Completion Review

Reviewer: Poincare the 2nd (`019e9cf2-de25-7971-b697-ff963162148b`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the audit matches the approved
scope, the experiment has result and conclusion sections, Issue 4 records the
`Partial` status and later-work learning, `sheet-example-inventory.md` has
exactly the two active Sheet rows and both are `Partial`, vendor examples
support the audited behavior, current RadCN evidence supports the partial
result, verification checks passed, vendor checkouts are clean, no
`resolved-clusters.json` or `parity-inventory.md` diff exists, and no result
commit was made before review.
