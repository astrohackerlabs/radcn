# Experiment 30: Implement chart component example parity depth

## Description

Experiment 29 audited the Chart surface and found two scopes: 6 upstream
component examples under `examples/chart-*.tsx` and 70 upstream chart gallery
examples under `charts/*.tsx`. This experiment implements only the 6 component
examples:

- `chart-bar-demo`
- `chart-bar-demo-axis`
- `chart-bar-demo-grid`
- `chart-bar-demo-legend`
- `chart-bar-demo-tooltip`
- `chart-tooltip-demo`

The goal is to establish the reusable RadCN chart grammar needed by later chart
gallery work without adopting React or Recharts as package dependencies. RadCN
should remain dependency-free, server-renderable SVG: multi-series vertical bar
charts, config color mapping, optional grid lines, optional x-axis tick labels,
legend composition, tooltip content anatomy, tooltip indicator variants,
responsive sizing, Card composition proof, docs examples, fixture routes, and
Playwright coverage.

This experiment must not attempt to solve the 70 chart gallery examples. Those
remain unresolved chart clusters for later family-by-family experiments.

## Changes

- Update `radcn/packages/radcn/src/components/chart.tsx`.
  - Preserve current single-series `ChartBarSeries` and `ChartLineSeries`
    behavior for existing callers.
  - Add a small typed data shape for multi-series chart values, such as
    `ChartSeries`, without introducing Recharts-style payload objects.
  - Extend `ChartBarSeries` so authors can render grouped multi-series vertical
    bars in one SVG coordinate system while keeping current `values`, `labels`,
    `name`, and `color` props working.
  - Add optional grid rendering and x-axis tick label rendering for bar charts.
  - Keep chart color mapping based on chart-scoped CSS variables generated from
    `ChartContainer config`.
  - Extend `ChartTooltip`/`ChartTooltipItem` to support the anatomy required by
    `chart-tooltip-demo`: visible or omitted label, value formatting through
    explicit formatted values, indicator variants `dot`, `line`, and `dashed`,
    hidden indicators, and stable data hooks for tests.
  - Do not add `recharts`, React, lucide, Tailwind, or Card dependencies to the
    RadCN package.
- Update `radcn/packages/radcn/src/styles/tokens.css` and regenerate
  `radcn/packages/radcn/src/styles/index.ts`.
  - Add styles for chart grid lines, tick labels, grouped bars, tooltip
    indicators, hidden indicators, and responsive chart example layout.
- Update `radcn/fixtures/scenarios/index.ts`.
  - Add candidate scenarios for `bar-demo`, `bar-demo-axis`,
    `bar-demo-grid`, `bar-demo-legend`, `bar-demo-tooltip`, and
    `tooltip-demo`.
- Update `radcn/fixtures/candidate-remix/app/fixtures/chart.tsx`.
  - Add named fixture routes for all 6 upstream component examples.
  - Compose with `Card` where the upstream example demonstrates chart-in-card
    framing.
  - Use local/static app-owned glyphs or plain text for explanatory tooltip
    callouts instead of lucide or copied upstream SVG callouts.
- Update `radcn/fixtures/reference-react-router/app/fixtures/chart.tsx` only if
  comparison coverage needs matching reference routes for the new candidate
  scenarios.
- Update `radcn/fixtures/tests/data-display.spec.ts`.
  - Add Playwright coverage for multi-series bars, config color mapping, grid
    lines, x-axis tick labels, legend rows, tooltip rows, indicator variants,
    hidden indicators, accessible chart names, and no `recharts` dependency.
- Update `radcn/fixtures/README.md`.
  - Add the new Chart component example routes to the fixture proof list.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Chart docs entry and source snippet to show the six component
    examples or a compact tab/section-style equivalent: default bar, grid, axis,
    legend, tooltip, and tooltip anatomy.
  - Explain Remix 3 divergences: no Recharts dependency, no React payload
    objects, explicit SVG primitives, app-owned interaction state, composed
    Card, app-owned glyphs, and CSS-variable customization.
  - Keep installation copy aspirational.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md`.
  - Change the 6 component example rows to `Covered` only after docs, fixtures,
    package behavior, and Playwright coverage exist.
  - Keep all 70 chart gallery rows unresolved unless this experiment genuinely
    adds direct evidence for a row.
  - Record any intentional divergences for formatter callbacks, hover payloads,
    or Recharts-only mechanics.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `chart` to the `examples` queue only, with evidence from Experiments 29
    and 30 plus `chart-example-inventory.md`.
  - Do not add any entries to the `charts` queue in this experiment.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the Chart component-example result
  and the next recommended chart-gallery cluster.

## Verification

Pass criteria:

- Package and docs checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts data-display.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- The generated styles export is synchronized:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const css = fs.readFileSync('radcn/packages/radcn/src/styles/tokens.css', 'utf8')
  const index = fs.readFileSync('radcn/packages/radcn/src/styles/index.ts', 'utf8')
  const expected = `export const radcnStyles = ${JSON.stringify(css)}\\n`
  if (index !== expected) process.exit(1)
  NODE
  ```
- The 6 component example ids are exactly once in
  `chart-example-inventory.md` and each row is `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = [
    'chart-bar-demo',
    'chart-bar-demo-axis',
    'chart-bar-demo-grid',
    'chart-bar-demo-legend',
    'chart-bar-demo-tooltip',
    'chart-tooltip-demo',
  ]
  let failed = false
  for (const id of ids) {
    const row = text.match(new RegExp('\\\\| `'+id+'` \\\\|[^\\n]+', 'g')) ?? []
    console.log(`${id}: ${row.length} ${row[0] ?? ''}`)
    if (row.length !== 1 || !row[0].includes('| Covered |')) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The 70 chart gallery ids remain present exactly once and are not all marked
  `Covered`; this proves the experiment did not accidentally claim gallery
  completion.
- `resolved-clusters.json` contains `chart` in `examples` and does not contain
  any `charts` entries for this experiment.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `chart` is absent from `## Unresolved Example Clusters`;
  - `## Unresolved Chart Clusters` still contains chart gallery rows;
  - `## First Recommended Cluster` no longer says `Example parity for chart`.
- Fixture tests assert:
  - `bar-demo` renders two series in one SVG and uses chart config colors;
  - `bar-demo-grid` renders grid lines;
  - `bar-demo-axis` renders month tick labels;
  - `bar-demo-legend` renders two legend rows and tooltip rows;
  - `bar-demo-tooltip` renders tooltip content with label/value rows;
  - `tooltip-demo` renders dot, line, dashed, and hidden-indicator variants;
  - every chart route has an accessible chart name.
- Docs coverage asserts the Chart docs page renders the expanded examples and
  source text mentions the same public APIs shown live.
- Dependency and scope checks pass without rejecting existing explanatory docs
  copy or fixture asset-server references:
  ```text
  rg -n "from ['\\\"]react|from ['\\\"]recharts|from ['\\\"]lucide-react|@radix-ui|from ['\\\"][^'\\\"]*vendor|vendor/" radcn/packages/radcn/src radcn/fixtures/candidate-remix/app/fixtures/chart.tsx radcn/apps/docs/app/content/components.tsx
  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'package.json',
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ]
  const forbidden = ['react', 'recharts', 'lucide-react', '@radix-ui/react-slot', 'tailwindcss']
  let failed = false
  for (const file of manifests) {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
    for (const name of forbidden) {
      if (Object.prototype.hasOwnProperty.call(deps, name)) {
        console.log(`${file}: forbidden dependency ${name}`)
        failed = true
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
  The `rg` command should produce no matches; the Node command should produce
  no output.
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The implementation adds React, Recharts, lucide, Tailwind, Card, or vendor
  source as a RadCN package dependency.
- Existing single-series Chart callers break.
- The 6 component example rows are marked `Covered` without package/docs/
  fixture/Playwright evidence.
- The 70 chart gallery examples are marked resolved as a side effect of this
  experiment.
- The generated parity inventory no longer has unresolved chart gallery work.
- The docs source snippet diverges from the live Chart examples in a way that
  hides required behavior.

## Design Review

Reviewer: Linnaeus (`019e9b2a-32d8-71d1-9288-55f815bcc6a3`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the first dependency/scope verification command was too broad and
  would fail on existing intended docs and fixture strings containing
  `vendor/` or publishing copy. Fixed by replacing it with a narrow import
  check for chart-relevant package/docs/fixture sources and a manifest-based
  forbidden dependency check.
- Major: none.
- Minor: none.

Approval result: approved after re-review. Linnaeus confirmed the fixed checks
are satisfiable on the current tree, still catch direct imports from React,
Recharts, lucide, Radix, or vendor source in the relevant chart surfaces, and
still catch forbidden manifest dependencies. Linnaeus also confirmed the Issue
4 README links Experiment 30 as `Designed`, the experiment has the required
sections, scope is limited to the 6 component Chart examples, the 70 chart
gallery examples remain explicitly unresolved, vendor status is clean, and
current git status shows only plan documentation changes.

## Result

**Result:** Pass

Implemented Chart component example parity depth for the 6 upstream component
Chart examples: `chart-bar-demo`, `chart-bar-demo-axis`,
`chart-bar-demo-grid`, `chart-bar-demo-legend`, `chart-bar-demo-tooltip`, and
`chart-tooltip-demo`.

Package changes:

- `ChartBarSeries` now supports grouped multi-series vertical bars in one SVG
  coordinate system while preserving the existing single-series `values`,
  `labels`, `name`, and `color` prop path.
- `ChartBarSeries` now supports optional grid lines and x-axis tick labels.
- `ChartTooltip` supports `hideLabel`.
- `ChartTooltipItem` supports `indicator="dot" | "line" | "dashed" | "none"`,
  `hideIndicator`, `name`, explicit formatted values, and stable data hooks.
- Styles now cover grid lines, ticks, grouped bars, tooltip indicator variants,
  and shared docs/fixture chart-example layouts.

Docs and fixture changes:

- Added named candidate fixture routes for `/fixtures/chart/bar-demo`,
  `/fixtures/chart/bar-demo-axis`, `/fixtures/chart/bar-demo-grid`,
  `/fixtures/chart/bar-demo-legend`, `/fixtures/chart/bar-demo-tooltip`, and
  `/fixtures/chart/tooltip-demo`.
- Expanded the Chart docs page to rich authored content with live examples and
  source for default bars, grid, axis, legend, tooltip, and tooltip anatomy.
- Added Chart-specific docs Playwright coverage and fixture Playwright coverage.
- Marked only the 6 component example rows `Covered` in
  `chart-example-inventory.md`.
- Added `chart` to the `examples` queue in `resolved-clusters.json`; the
  `charts` queue remains empty so all 70 chart gallery examples remain
  unresolved.
- Regenerated `parity-inventory.md`; the first recommended cluster is now
  `Example parity for input`.

Verification run:

```text
pnpm radcn:typecheck
```

Output:

```text
$ pnpm --dir radcn/packages/radcn typecheck
$ tsc
```

```text
pnpm --dir radcn/apps/docs typecheck
```

Output:

```text
$ tsc --noEmit
```

```text
pnpm fixtures:candidate:typecheck
```

Output:

```text
$ pnpm --dir radcn/fixtures/candidate-remix typecheck
$ tsc
```

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts data-display.spec.ts
```

Output:

```text
6 passed
```

```text
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

Output:

```text
5 passed
```

Deterministic checks:

```text
node scripts/audit-shadcn-parity.mjs
```

Output:

```text
wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
```

```text
node - <<'NODE'
const fs = require('fs')
const css = fs.readFileSync('radcn/packages/radcn/src/styles/tokens.css', 'utf8')
const index = fs.readFileSync('radcn/packages/radcn/src/styles/index.ts', 'utf8')
const expected = `export const radcnStyles = ${JSON.stringify(css)}\n`
if (index !== expected) process.exit(1)
NODE
```

Passed with no output.

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = [
  'chart-bar-demo',
  'chart-bar-demo-axis',
  'chart-bar-demo-grid',
  'chart-bar-demo-legend',
  'chart-bar-demo-tooltip',
  'chart-tooltip-demo',
]
let failed = false
for (const id of ids) {
  const row = text.match(new RegExp('\\| `'+id+'` \\|[^\n]+', 'g')) ?? []
  console.log(`${id}: ${row.length} ${row[0] ?? ''}`)
  if (row.length !== 1 || !row[0].includes('| Covered |')) failed = true
}
if (failed) process.exit(1)
NODE
```

Confirmed each of the 6 component example rows appears exactly once and is
`Covered`.

```text
node - <<'NODE'
const fs = require('fs')
const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/_registry.ts', 'utf8')
const inventory = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md', 'utf8')
const ids = [...registry.matchAll(/name: "([^"]+)"/g)].map((match) => match[1])
let covered = 0
let failed = ids.length !== 70
console.log(`registry ids: ${ids.length}`)
for (const id of ids) {
  const row = inventory.match(new RegExp('\\| `'+id+'` \\|[^\n]+', 'g')) ?? []
  if (row[0]?.includes('| Covered |')) covered++
  if (row.length !== 1) failed = true
}
console.log(`covered gallery rows: ${covered}`)
if (covered === ids.length) failed = true
if (failed) process.exit(1)
NODE
```

Output:

```text
registry ids: 70
covered gallery rows: 0
```

```text
node - <<'NODE'
const fs = require('fs')
const resolved = JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json', 'utf8'))
const hasChartExample = resolved.examples.some((item) => item.slug === 'chart' && item.status === 'resolved')
const hasChartEntries = resolved.charts.length > 0
console.log(`chart example resolved: ${hasChartExample}`)
console.log(`charts queue entries: ${resolved.charts.length}`)
if (!hasChartExample || hasChartEntries) process.exit(1)
NODE
```

Output:

```text
chart example resolved: true
charts queue entries: 0
```

```text
node - <<'NODE'
const fs = require('fs')
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md', 'utf8')
function section(name) {
  const start = text.indexOf(`## ${name}`)
  if (start < 0) return ''
  const next = text.indexOf('\n## ', start + 4)
  return text.slice(start, next < 0 ? text.length : next)
}
const unresolvedExamples = section('Unresolved Example Clusters')
const unresolvedCharts = section('Unresolved Chart Clusters')
const first = section('First Recommended Cluster')
console.log(first.match(/\*\*Cluster:\*\*[^\n]+/)?.[0] ?? 'no cluster')
if (/\| chart \|/.test(unresolvedExamples)) process.exit(1)
if (!/chart-bar-default/.test(unresolvedCharts)) process.exit(1)
if (/Example parity for chart/.test(first)) process.exit(1)
NODE
```

Output:

```text
**Cluster:** Example parity for input
```

Dependency and hygiene checks:

```text
rg -n "from ['\"]react|from ['\"]recharts|from ['\"]lucide-react|@radix-ui|from ['\"][^'\"]*vendor|vendor/" radcn/packages/radcn/src radcn/fixtures/candidate-remix/app/fixtures/chart.tsx radcn/apps/docs/app/content/components.tsx
```

Passed with no matches.

```text
node - <<'NODE'
const fs = require('fs')
const manifests = [
  'package.json',
  'radcn/packages/radcn/package.json',
  'radcn/apps/docs/package.json',
  'radcn/fixtures/candidate-remix/package.json',
]
const forbidden = ['react', 'recharts', 'lucide-react', '@radix-ui/react-slot', 'tailwindcss']
let failed = false
for (const file of manifests) {
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
  for (const name of forbidden) {
    if (Object.prototype.hasOwnProperty.call(deps, name)) {
      console.log(`${file}: forbidden dependency ${name}`)
      failed = true
    }
  }
}
if (failed) process.exit(1)
NODE
```

Passed with no output.

```text
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Both passed with no output.

## Conclusion

Chart component example parity is complete. The next Issue 4 experiment should
follow the regenerated inventory and audit `input` example parity. The chart
gallery remains open in the `charts` queue and can be addressed later by
family, starting with bar and tooltip gallery examples because they can reuse
the primitives established here.

## Completion Review

Reviewer: Noether (`019e9b36-d433-7be3-8bb4-9816e09cdf92`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: `chart-example-inventory.md` still had stale summary/current-evidence
  prose saying the next implementation should start with the 6 component chart
  examples. Fixed by updating the inventory summary and current evidence table
  to say component example parity is complete and only chart gallery family work
  remains.

Approval result: approved. Noether verified package/docs/fixture typechecks,
fixture Playwright, docs Playwright, `git diff --check`, vendor cleanliness,
style export synchronization, the 6 covered component example rows, the 70
uncovered gallery rows, the empty `charts` queue, and the uncommitted result
state before the result commit.
