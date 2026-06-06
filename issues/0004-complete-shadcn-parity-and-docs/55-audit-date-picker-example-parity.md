# Experiment 55: Audit date-picker example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`date-picker`. Upstream shadcn/ui New York v4 has three Date Picker examples in
the current inferred cluster:

- `date-picker-demo`
- `date-picker-with-presets`
- `date-picker-with-range`

Current RadCN already ships `radcn/date-picker` from Experiment 3, plus docs,
candidate fixture routes, and Playwright coverage for single values, range
values, preset selection, hidden native inputs, popover behavior, disabled
state, custom tokens, calendar coordination, and form reset/submission. This
experiment audits whether that evidence fully covers the three upstream
example ids before implementation. It should separate Date Picker-owned
behavior from app-owned formatting/copy, `date-fns`, `react-day-picker`, React
state, `CalendarIcon`, `lucide-react`, Tailwind utilities, Popover/Calendar
primitive mechanics, form examples, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/date-picker-example-inventory.md`.
  - List all three active upstream Date Picker example ids:
    `date-picker-demo`, `date-picker-with-presets`, and
    `date-picker-with-range`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports single selection, range
    selection, preset selection, trigger label formatting, placeholder state,
    popover open/close behavior, calendar selected state, two-month range
    display, hidden native input submission, form reset, disabled trigger
    state, custom classes/styles/tokens, public Date Picker/Popover/Calendar
    hooks, docs evidence, candidate fixture evidence, reference fixture
    evidence if present, and Playwright evidence.
  - Record mapping decisions for shadcn React props, `useState`, `onSelect`,
    `defaultMonth`, `numberOfMonths`, `className`, `asChild`, `date-fns`
    `format`/`addDays`, `react-day-picker` `DateRange`, `CalendarIcon`,
    `lucide-react`, Tailwind utilities, Popover/Calendar composition, vendor
    source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-with-presets.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-with-range.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-with-presets.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-with-range.json`
  - note adjacent but out-of-cluster `date-picker-form` without adding a row
    unless the active inventory reclassifies it.
- Inspect current RadCN evidence:
  - `issues/0004-complete-shadcn-parity-and-docs/03-resolve-date-picker-parity.md`
  - `radcn/packages/radcn/src/components/date-picker.tsx`
  - `radcn/packages/radcn/src/components/calendar.tsx`
  - `radcn/packages/radcn/src/components/popover.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/date-picker.tsx`
  - `radcn/fixtures/tests/calendar-date-picker.spec.ts`
  - relevant Form evidence only where it affects hidden-input submission and
    reset behavior.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `date-picker-example-inventory.md` exists and contains exactly one table row
  for each active upstream Date Picker example id.
- A deterministic Node check proves all three active upstream Date Picker
  example ids appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/date-picker-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'date-picker-demo',
    'date-picker-with-presets',
    'date-picker-with-range',
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
  not mark `date-picker` resolved unless every active upstream Date Picker
  example is `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - single selection, range selection, presets, trigger label formatting,
    placeholder state, popover behavior, calendar selected state, two-month
    range display, hidden input submission, form reset, disabled state,
    custom hooks/classes/tokens, and docs/fixture/Playwright evidence;
  - React state, `date-fns`, `react-day-picker`, Popover/Calendar mechanics,
    and event handlers mapping to Remix/web-first explicit props, ISO values,
    hidden inputs, dependency-free enhancement, app-owned formatting, or
    intentional divergence;
  - `defaultMonth`, `numberOfMonths`, `className`, `asChild`, `CalendarIcon`,
    `lucide-react`, Tailwind utilities, and vendor source as mappings or
    non-dependencies rather than mandatory RadCN dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "date-picker-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Date Picker example id from the active
  parity inventory.
- The audit treats React, `date-fns`, `react-day-picker`, `lucide-react`,
  Tailwind, upstream `CalendarIcon`, or vendor source as mandatory RadCN Date
  Picker dependencies.
- The audit marks `date-picker` resolved without package/docs/fixture/test
  evidence for all three active upstream Date Picker examples.
- The audit conflates Date Picker-owned behavior with app-owned display
  formatting, copy, icon choice, fixed trigger width, Popover/Calendar internal
  implementation details, form recipes, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Kierkegaard the 2nd (`019e9c29-6251-7db1-93f1-85ee492785e1`) with
fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, scope is audit-only and excludes package/docs/fixture/
test/generated-state changes, the active inventory cluster is exactly
`date-picker-demo`, `date-picker-with-presets`, and
`date-picker-with-range`, adjacent `date-picker-form` is excluded unless the
inventory reclassifies it, verification includes concrete row-count, README,
`git diff --check`, status, and vendor checks, dependency policy is preserved
for React, `date-fns`, `react-day-picker`, `lucide-react`, Tailwind, and vendor
source, and the current diff is plan-only.

## Result

**Result:** Partial

Created `date-picker-example-inventory.md` and audited all three active
upstream Date Picker examples:

- `date-picker-demo`
- `date-picker-with-presets`
- `date-picker-with-range`

The audit found strong RadCN package and fixture coverage for Date Picker
behavior: importable package API, single selection, range selection, preset
selection, trigger label formatting, placeholder state, Popover and Calendar
coordination, two-month range display, hidden native input submission, form
reset, disabled trigger state, custom class/token hooks, public Date Picker/
Popover/Calendar hooks, dependency-free enhancement, and Playwright behavior
coverage.

The example cluster remains partially covered because current docs, candidate
fixtures, and Playwright tests do not yet prove the three named upstream
example ids or exact user-facing compositions. `date-picker-demo` needs named
single-picker proof, `date-picker-with-presets` needs named proof for the
upstream preset labels and behavior, and `date-picker-with-range` needs named
range proof with two visible months and formatted range label.

No current evidence requires changing the `radcn/date-picker` package API.
shadcn React state and `onSelect` map to RadCN explicit props and enhancement,
`date-fns` maps to ISO values and deterministic package labels,
`react-day-picker` range objects map to `YYYY-MM-DD..YYYY-MM-DD`, `className`
maps to `class`, `asChild` maps to explicit package trigger composition, and
`CalendarIcon`/`lucide-react`/Tailwind/fixed widths remain presentation or
app-owned styling rather than package dependencies.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/date-picker-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const ids = [
  'date-picker-demo',
  'date-picker-with-presets',
  'date-picker-with-range',
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

rg -n "date-picker-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The deterministic inventory check reported each active Date Picker example id
exactly once. `rg` found the README learning. `git diff --check` passed. Vendor
status printed no output. `git status --short` showed only expected Issue 4
documentation changes for the audit result.

## Conclusion

Date Picker example parity is not yet resolved. The next experiment should
implement named Date Picker example parity depth across docs, candidate
fixtures, and Playwright coverage for `date-picker-demo`,
`date-picker-with-presets`, and `date-picker-with-range`, without changing the
package API unless a direct blocker appears during implementation.

## Completion Review

Reviewer: Darwin the 2nd (`019e9c2c-62ed-7f51-9dce-d175d7399ade`) with fresh
context (`fork_context: false`).

Initial findings:

- **Blocker:** The experiment recorded `**Result:** Pass` and the Issue 4
  README marked Experiment 55 `Pass`, but the audit evidence and
  `date-picker-example-inventory.md` rows show the Date Picker example cluster
  remains partially covered.

Fixes:

- Changed the experiment result to `**Result:** Partial`.
- Changed the Issue 4 README Experiment 55 status to `Partial`.
- Preserved the conclusion and follow-up language that the next experiment
  should implement named Date Picker example parity depth.

Re-review findings:

- Prior blocker resolved. The reviewer confirmed the experiment result and
  README status now both say `Partial`, the follow-up language was preserved,
  and no new blocker was introduced.

Approval: Approved for result commit.
