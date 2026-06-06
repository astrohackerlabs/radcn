# Experiment 59: Audit calendar example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`calendar`. Upstream shadcn/ui New York v4 has two Calendar examples in the
current inferred cluster:

- `calendar-demo`
- `calendar-hijri`

Current RadCN already ships `radcn/calendar`, docs coverage, candidate fixture
routes, and Playwright coverage for grid semantics, selected state, hidden form
values, range hooks, outside days, disabled days, month navigation, keyboard
selection, pointer selection, two-month display, custom tokens, and Date Picker
composition. This experiment audits whether that evidence fully covers the two
upstream examples before implementation. It should separate Calendar-owned
behavior from app-owned styling, React state, `react-day-picker`, Persian/Hijri
calendar support, `next/font`, `lucide-react`, cva/class utilities, Tailwind
utilities, Button composition, vendor source, Date Picker examples, and block
usage.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/calendar-example-inventory.md`.
  - List both active upstream Calendar example ids: `calendar-demo` and
    `calendar-hijri`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports single date selection,
    default month, selected date state, hidden input values, calendar grid
    semantics, day button accessible names, keyboard selection, pointer
    selection, month navigation, outside days, disabled dates, range state,
    multi-month rendering, public hooks, custom classes/styles/tokens,
    caption/dropdown behavior, right-to-left or alternate calendar rendering,
    Persian/Hijri date display, app-owned font styling, docs evidence,
    candidate fixture evidence, reference fixture evidence if present, and
    Playwright evidence.
  - Record mapping decisions for shadcn React state, `mode`, `selected`,
    `onSelect`, `defaultMonth`, `captionLayout="dropdown"`, `className`,
    `classNames`, `data-slot`, cva/class utilities, `react-day-picker`,
    `react-day-picker/persian`, `DayPicker`, `DayButton`, `getDefaultClassNames`,
    `buttonVariants`, `ChevronDownIcon`, `ChevronLeftIcon`,
    `ChevronRightIcon`, `lucide-react`, `next/font/google`, `Vazirmatn`,
    Tailwind utilities, RTL chevron behavior, Button composition, vendor
    source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/calendar.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/calendar-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/calendar-hijri.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar-hijri.json`
  - note Date Picker and sidebar/block Calendar references only where they
    clarify out-of-cluster composition.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/calendar.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/calendar.tsx`
  - `radcn/fixtures/tests/calendar-date-picker.spec.ts`
  - relevant Date Picker evidence only where it clarifies that Date Picker is
    already resolved as a separate package-backed composition.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `calendar-example-inventory.md` exists and contains exactly one table row for
  each active upstream Calendar example id.
- A deterministic Node check proves both active upstream Calendar example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/calendar-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'calendar-demo',
    'calendar-hijri',
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
  not mark `calendar` resolved unless every active upstream Calendar example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - single selection, default month, selected state, hidden input values, grid
    semantics, day accessible names, keyboard/pointer selection, month
    navigation, outside days, disabled dates, range state, multi-month display,
    public hooks, custom classes/styles/tokens, caption/dropdown behavior,
    Persian/Hijri rendering, RTL behavior, app-owned font styling, and docs/
    fixture/Playwright evidence;
  - React state, `mode`, `selected`, `onSelect`, `defaultMonth`,
    `captionLayout`, `className`, `classNames`, `data-slot`, cva/class
    utilities, `react-day-picker`, `react-day-picker/persian`, `DayPicker`,
    `DayButton`, `getDefaultClassNames`, `buttonVariants`, `lucide-react`,
    `next/font/google`, `Vazirmatn`, Tailwind, Button composition, Date Picker
    references, block references, and vendor source as mappings,
    non-dependencies, or possible intentional divergences rather than
    mandatory RadCN dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "calendar-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Calendar example id from the inventory.
- The audit treats React, `react-day-picker`, `react-day-picker/persian`,
  `next/font`, `lucide-react`, Tailwind, Button styling, or vendor source as
  mandatory RadCN Calendar dependencies.
- The audit marks `calendar` resolved without package/docs/fixture/test
  evidence for both active upstream Calendar examples or a recorded intentional
  divergence for `calendar-hijri`.
- The audit conflates Calendar-owned behavior with Date Picker behavior,
  app-owned font choice, app-owned icon choice, block/sidebar usage, or
  custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Euclid the 2nd (`019e9c4c-f035-7362-906f-057924ad1257`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that Issue 4 links
Experiment 59 with status `Designed`, the experiment includes Description,
Changes, Verification, and Design Review sections, the scope is narrow and
audit-only with explicit no-code-change boundaries, verification has concrete
pass/fail criteria and repo hygiene checks, and the plan explicitly handles
`calendar-hijri` as a possible intentional divergence rather than requiring
`react-day-picker/persian`, `next/font`, `lucide-react`, Tailwind, or vendor
dependencies.
