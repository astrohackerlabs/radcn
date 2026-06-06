# Experiment 60: Resolve calendar example parity depth

## Description

Experiment 59 audited the two upstream shadcn/ui New York v4 Calendar examples
and found the cluster is still partial. RadCN has strong Calendar mechanics,
but lacks named docs/fixture/Playwright evidence for:

- `calendar-demo`
- `calendar-hijri`

This experiment resolves both outcomes. `calendar-demo` should become a covered
package-backed example by adding dependency-free caption dropdown support where
needed and proving the named example in docs, candidate fixtures, and
Playwright. `calendar-hijri` should be recorded as an intentional divergence:
upstream implements it by forking the Calendar example around
`react-day-picker/persian`, `next/font`, `lucide-react`, and app-specific RTL
styling. RadCN should not add those dependencies to the package. Instead, docs
should explain that alternate calendar systems are app-owned recipes that may
compose their own calendar engine with RadCN tokens and hooks.

The implementation must not introduce React, `react-day-picker`,
`react-day-picker/persian`, `next/font`, `lucide-react`, Tailwind, vendor
imports, or mandatory external calendar dependencies.

## Changes

- Update `radcn/packages/radcn/src/components/calendar.tsx`.
  - Add a dependency-free `captionLayout?: 'label' | 'dropdown'` Calendar prop,
    defaulting to `label`.
  - When `captionLayout="dropdown"`, render month and year select controls in
    the caption area using package-owned markup and stable hooks such as
    `data-radcn-calendar-month-select` and
    `data-radcn-calendar-year-select`.
  - Add optional bounds for year dropdowns if needed, using existing `min` and
    `max` when present and a deterministic visible year ±10 years fallback
    when no bounds exist.
  - Enhance dropdown changes so month/year selects update `data-month`, visible
    month captions, day grids, selected state, hidden input values, and month
    change events consistently with previous/next navigation.
  - Preserve existing label caption behavior, previous/next navigation,
    keyboard selection, pointer selection, range selection, form reset,
    disabled dates, multi-month rendering, public hooks, and Date Picker
    composition.
- Update `radcn/packages/radcn/src/styles/index.ts`.
  - Add minimal styles for caption dropdown controls using RadCN tokens.
  - Preserve existing Calendar layout and token names.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Calendar from a generic preview page to an authored rich docs page
    if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Calendar example ids using
    `data-radcn-docs-calendar-family`.
  - Demonstrate `calendar-demo` with a single-selection Calendar,
    `captionLayout="dropdown"`, selected/default-selected ISO values, visible
    month/year dropdowns, custom class/style/token examples, grid semantics, and
    named mapping copy.
  - Demonstrate `calendar-hijri` as an intentional divergence panel or recipe
    note, not a fake supported Hijri calendar. The docs must explain that
    Persian/Hijri rendering is app-owned alternate-calendar work and that RadCN
    does not depend on `react-day-picker/persian`, `next/font`, or
    `lucide-react`.
  - Explain mappings from shadcn React state, `mode`, `selected`, `onSelect`,
    `defaultMonth`, `captionLayout`, `className`, `classNames`, `data-slot`,
    cva/class utilities, `react-day-picker`, `react-day-picker/persian`,
    `DayPicker`, `DayButton`, `getDefaultClassNames`, `buttonVariants`,
    `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `lucide-react`,
    `next/font/google`, `Vazirmatn`, Tailwind utilities, RTL chevron behavior,
    Button composition, Date Picker references, block/sidebar references, and
    vendor source to RadCN explicit props, ISO values, public hooks, CSS
    variables, package-owned caption controls, app-owned alternate calendar
    recipes, and non-dependencies.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/calendar.tsx`
  Add named Calendar fixture routes for `demo` and
  `hijri-intentional-divergence`, or equivalent route ids that keep both
  upstream example ids explicit in scenario metadata and tests. Preserve
  existing generic Calendar routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/calendar-date-picker.spec.ts`.
  - Verify `calendar/demo` exposes a single Calendar, `captionLayout` dropdown
    hooks, month/year select controls, selected state, grid semantics, day
    accessible names, hidden input value, public hooks, and selection behavior.
  - Verify changing month/year dropdowns updates `data-month`, captions, day
    grids, and emits usable selected/month state without breaking
    previous/next navigation.
  - Verify `calendar/hijri-intentional-divergence` records the named Hijri
    outcome as an intentional divergence and does not pretend to render a
    Persian/Hijri package calendar.
  - Keep existing generic Calendar and Date Picker tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `calendar-demo` and `calendar-hijri`.
  - Assert rendered evidence for dropdown caption controls, selected/default
    selected state, grid semantics, day accessible names, custom styling, public
    hooks, `class`, `style`, CSS variables, `captionLayout`, `className`,
    `classNames`, `data-slot`, cva, Tailwind, `react-day-picker`,
    `react-day-picker/persian`, `DayPicker`, `DayButton`,
    `getDefaultClassNames`, Button composition, `lucide-react`, `next/font`,
    `Vazirmatn`, RTL, Date Picker separation, block/sidebar separation, vendor
    source, and no vendor dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/calendar-example-inventory.md`.
  - Change `calendar-demo` to `Covered` only after package/docs/fixture/
    Playwright evidence exists.
  - Change `calendar-hijri` to `Intentional divergence` only after docs,
    fixtures, Playwright, and issue learnings record the support boundary.
  - Record final API decisions for caption dropdowns, ISO selected values,
    app-owned alternate calendar systems, font loading, RTL/icon presentation,
    public hooks, custom tokens, Date Picker separation, block/sidebar
    separation, and upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `calendar` as a resolved example cluster with evidence from
    Experiments 59 and 60 plus `calendar-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Calendar example outcome
  and the next generated recommendation.

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
- A deterministic Node check proves both upstream Calendar example ids appear
  exactly once in `calendar-example-inventory.md`, `calendar-demo` is
  `Covered`, and `calendar-hijri` is `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/calendar-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = new Map([
    ['calendar-demo', 'Covered'],
    ['calendar-hijri', 'Intentional divergence'],
  ])
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== expected.size
  for (const [id, outcome] of expected) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (row.length !== 1 || !row[0][0].includes(`| ${outcome} |`)) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!expected.has(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "calendar"`, `status = "resolved"`, and
  evidence for Experiment 59, Experiment 60, and
  `calendar-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `calendar` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for calendar`.
- Fixture tests assert:
  - named Calendar routes expose public RadCN hooks;
  - demo route proves single selection, caption dropdown controls, selected
    state, hidden input value, grid semantics, day accessible names, month/year
    dropdown changes, previous/next navigation, and public hooks;
  - Hijri route proves the intentional divergence copy and no fake package Hijri
    calendar claim;
  - existing generic Calendar and Date Picker behavior tests still pass.
- Docs coverage asserts the Calendar page renders stable evidence for both
  named docs examples and source/API text mentions the required mapping copy.
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
      name === 'react-day-picker' ||
      name.startsWith('react-day-picker/') ||
      name === 'date-fns' ||
      name === 'class-variance-authority' ||
      name === 'lucide-react' ||
      name === 'next/font/google' ||
      name.startsWith('next/font') ||
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
    'react-day-picker',
    'date-fns',
    'class-variance-authority',
    'lucide-react',
    'next',
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

- `calendar-demo` remains `Partial` or lacks named docs, fixture, or Playwright
  evidence.
- `calendar-hijri` remains unresolved, is marked covered without real
  alternate-calendar support, or is marked intentionally divergent without docs,
  fixtures, Playwright, and issue learnings recording the boundary.
- The implementation introduces React, `react-day-picker`,
  `react-day-picker/persian`, `date-fns`, `next/font`, `lucide-react`,
  Tailwind, vendor imports, or a new mandatory package dependency.
- Caption dropdown support regresses existing label captions, month navigation,
  keyboard selection, pointer selection, range state, form reset, Date Picker
  composition, or multi-month rendering.
- `calendar` is marked resolved before docs, fixture, Playwright, inventory,
  and regenerated parity evidence all agree.

## Design Review

Reviewer: Mencius the 2nd (`019e9c53-3acb-7e81-84d1-76385a71fa72`) with fresh
context (`fork_context: false`).

Findings:

- Minor: the forbidden-import check rejected `react-day-picker` but not
  subpaths such as `react-day-picker/persian`, and rejected
  `next/font/google` but not other `next/font` subpaths. Fixed by adding
  `name.startsWith('react-day-picker/')` and `name.startsWith('next/font')` to
  the verification snippet.
- Minor: the fallback caption-dropdown year range was under-specified. Fixed
  by specifying visible year ±10 years when no `min`/`max` bounds exist.

Approval: Approved for plan commit after the minor fixes. The reviewer found no
blocker or major issues and confirmed that the plan is scoped to resolving
`calendar-demo` and `calendar-hijri`, dependency-free caption dropdown support
is justified by `calendar-demo`, the Hijri outcome is defensibly recorded as an
intentional divergence with required docs/fixture/test evidence, and the plan
avoids React, `react-day-picker`, `react-day-picker/persian`, `next/font`,
`lucide-react`, Tailwind, and vendor dependencies.
