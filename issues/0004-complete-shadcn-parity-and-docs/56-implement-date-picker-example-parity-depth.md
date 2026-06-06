# Experiment 56: Implement date-picker example parity depth

## Description

Experiment 55 audited the three upstream shadcn/ui New York v4 Date Picker
examples and found the cluster is still partial. RadCN has strong Date Picker
package mechanics already, but lacks named docs/fixture/Playwright evidence for:

- `date-picker-demo`
- `date-picker-with-presets`
- `date-picker-with-range`

This experiment implements that missing proof while preserving Date Picker as a
dependency-free package composition over RadCN Popover and Calendar primitives.
It should compose existing `DatePicker` behavior rather than introducing React,
`date-fns`, `react-day-picker`, `lucide-react`, Tailwind, vendor imports, or
new Date Picker package APIs unless a direct blocker is discovered and
recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Render stable docs hooks for all three upstream Date Picker example ids
    using `data-radcn-docs-date-picker-family`.
  - Demonstrate `date-picker-demo`: placeholder single picker, calendar
    popover, selected single date behavior, and formatted trigger label.
  - Demonstrate `date-picker-with-presets`: single picker with the upstream
    preset labels `Today`, `Tomorrow`, `In 3 days`, and `In a week`.
  - Demonstrate `date-picker-with-range`: range picker with formatted start/end
    label, default month from the range start, and two visible months.
  - Explain mappings from shadcn React state, `onSelect`, `date-fns`
    `format`/`addDays`, `react-day-picker` `DateRange`, `defaultMonth`,
    `numberOfMonths`, `className`, `asChild`, `CalendarIcon`, `lucide-react`,
    Tailwind utilities, Popover/Calendar composition, vendor source, and RadCN
    dependency-free enhancement to explicit props, ISO values, hidden inputs,
    public hooks, CSS variables, and non-dependencies.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/date-picker.tsx`
  Add named Date Picker fixture routes for `demo`, `with-presets`, and
  `with-range`, or equivalent route ids that keep all three upstream example
  ids explicit in scenario metadata and tests. Preserve existing generic Date
  Picker routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/calendar-date-picker.spec.ts`.
  - Verify `date-picker/demo` exposes the placeholder trigger, opens the
    calendar popover, selects a single date, updates the formatted label,
    updates public hooks, and preserves package Date Picker/Popover/Calendar
    hooks.
  - Verify `date-picker/with-presets` exposes all four upstream preset labels,
    preset selection updates value/label/calendar state, and public hooks are
    present.
  - Verify `date-picker/with-range` exposes a formatted range label, two
    visible months, range start/end hooks, range reselection behavior, and
    public hooks.
  - Keep existing generic Date Picker package behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all three named Date Picker examples.
  - Assert rendered evidence for single, presets, range, placeholder, formatted
    labels, two-month calendars, hidden input/native submission intent where
    shown, public hooks, `defaultMonth`, `numberOfMonths`, `class`,
    `className`, `asChild`, React `useState`/`onSelect`, `date-fns`,
    `react-day-picker`, `CalendarIcon`, `lucide-react`, Tailwind, Popover/
    Calendar composition, ISO values, and vendor non-dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/date-picker-example-inventory.md`.
  - Change all three Date Picker rows to `Covered` only after package/docs/
    fixture/Playwright evidence exists.
  - Record final API decisions for single values, preset values, range values,
    formatted labels, hidden inputs, Popover/Calendar composition, public
    hooks, icon presentation, app-owned formatting, and upstream
    non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `date-picker` as a resolved example cluster with evidence from
    Experiments 55 and 56 plus `date-picker-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Date Picker example
  outcome and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/date-picker.tsx` or Date
  Picker package APIs unless implementation discovers and records a direct
  blocker in the current primitive.

## Verification

Pass criteria:

- Package, docs, and fixture checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright calendar/date-picker coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts calendar-date-picker.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all three upstream Date Picker example ids
  appear exactly once in `date-picker-example-inventory.md` and every row is
  `Covered`:
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
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== ids.length
  for (const id of ids) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (row.length !== 1 || !row[0][0].includes('| Covered |')) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!ids.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "date-picker"`, `status = "resolved"`, and
  evidence for Experiment 55, Experiment 56, and
  `date-picker-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `date-picker` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for date-picker`.
- Fixture tests assert:
  - all three named Date Picker routes expose public RadCN hooks;
  - demo route proves placeholder, popover/calendar rendering, single
    selection, formatted label update, and public hooks;
  - with-presets route proves all four upstream preset labels and preset-driven
    value/label/calendar updates;
  - with-range route proves formatted range label, two visible months,
    range-start/range-end hooks, range reselection, and public hooks;
  - existing generic Date Picker tests still pass.
- Docs coverage asserts the Date Picker page renders stable evidence for all
  three named docs examples and source/API text mentions the required mapping
  copy.
- Dependency and scope checks pass:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const path = require('path')
  const roots = ['radcn/packages/radcn', 'radcn/apps/docs', 'radcn/fixtures/candidate-remix']
  function forbiddenImport(name) {
    return (
      name === 'react' ||
      name === 'react-dom' ||
      name === 'date-fns' ||
      name === 'react-day-picker' ||
      name === 'lucide-react' ||
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name.startsWith('@tailwindcss/') ||
      name.includes('/vendor/') ||
      name.startsWith('../vendor/')
    )
  }
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.[cm]?[tj]sx?$/.test(entry.name)) files.push(full)
    }
  }
  for (const root of roots) walk(root)
  let failed = false
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    for (const match of text.matchAll(/^\s*import(?:\s+type)?[\s\S]*?\sfrom\s+['"]([^'"]+)['"]/gm)) {
      if (forbiddenImport(match[1])) {
        console.log(`${file}: forbidden import ${match[1]}`)
        failed = true
      }
    }
  }
  if (failed) process.exit(1)
  NODE

  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ]
  const forbidden = new Set([
    'react',
    'react-dom',
    'date-fns',
    'react-day-picker',
    'lucide-react',
    'radix-ui',
    'tailwindcss',
  ])
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[field] ?? {})) {
        if (forbidden.has(name) || name.startsWith('@radix-ui/') || name.startsWith('@tailwindcss/')) {
          console.log(`${manifest}: forbidden dependency ${name}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any upstream Date Picker example row remains `Partial` or `Missing` after the
  implementation.
- Named docs, fixture, or Playwright evidence is missing for any of the three
  upstream example ids.
- The implementation introduces React, `date-fns`, `react-day-picker`,
  `lucide-react`, Tailwind, vendor imports, or a new package dependency.
- The implementation changes Date Picker package APIs without recording a
  concrete primitive blocker in the experiment result and Issue 4 learnings.
- Existing generic Date Picker fixture behavior regresses.
- `date-picker` is marked resolved before docs, fixture, Playwright,
  inventory, and regenerated parity evidence all agree.

## Design Review

Reviewer: Leibniz the 2nd (`019e9c30-0d72-79c3-a8ed-68e4ff42d649`) with
fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, scope follows Experiment 55's partial audit result and
covers exactly `date-picker-demo`, `date-picker-with-presets`, and
`date-picker-with-range`, adjacent `date-picker-form` remains out of cluster,
verification has concrete pass/fail, hygiene, dependency-policy, and vendor
checks, `git diff --check` passed, vendor status printed no output, and the
current git state is plan-only.
