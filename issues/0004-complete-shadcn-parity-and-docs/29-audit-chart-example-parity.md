# Experiment 29: Audit chart example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`chart`. RadCN already exports dependency-free SVG chart primitives:
`ChartContainer`, `ChartBarSeries`, `ChartLineSeries`, `ChartLegend`,
`ChartLegendItem`, `ChartTooltip`, and `ChartTooltipItem`. Existing fixtures
prove basic bar, line, legend, tooltip, accessibility, and custom-token output,
but the upstream shadcn/ui chart surface is much broader.

This experiment audits the upstream Chart example surface before implementation.
It must cover both upstream locations:

- 6 component examples in
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/chart-*.tsx`;
- 70 chart gallery examples in
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/*.tsx`.

The audit should classify what RadCN already covers, what needs reusable package
API, what belongs as docs recipes or blocks, and what should remain an
intentional Remix 3 divergence. It must not implement new chart package APIs,
docs examples, fixtures, or tests.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md`.
  - List all 6 upstream component Chart example ids:
    `chart-bar-demo`, `chart-bar-demo-axis`, `chart-bar-demo-grid`,
    `chart-bar-demo-legend`, `chart-bar-demo-tooltip`, and
    `chart-tooltip-demo`.
  - List all 70 upstream chart gallery ids from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/_registry.ts`.
  - For every id, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Group the chart gallery by behavior family: area, bar, line, pie, radar,
    radial, and tooltip.
  - Record whether each family should be solved by package primitives, docs
    recipes, fixture routes, Playwright visual/behavior checks, or documented
    divergence.
  - Explicitly map upstream React/Recharts mechanics to RadCN decisions:
    `ResponsiveContainer`, `BarChart`, `AreaChart`, `LineChart`, `PieChart`,
    `RadarChart`, `RadialBarChart`, axes, grids, legends, tooltips, active
    indexes, labels, formatter callbacks, color CSS variables, chart theme
    colors, React state/effects, lucide icons, Tailwind utilities, and Card
    composition.
  - Explicitly decide whether `recharts` remains out of the RadCN package
    dependency graph for this issue and what equivalent browser/SVG strategy
    should replace it.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/chart.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/chart-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/*.tsx`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/chart.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/chart.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/chart.tsx`
  - `radcn/fixtures/tests/data-display.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `chart-example-inventory.md` exists and contains exactly one table row for
  each of the 6 upstream component Chart example ids.
- `chart-example-inventory.md` contains exactly one table row for each of the
  70 upstream chart gallery ids from the vendored charts registry.
- A deterministic Node check proves the 6 component example ids appear exactly
  once:
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
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (text.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves the 70 chart gallery ids appear exactly
  once:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/_registry.ts', 'utf8')
  const inventory = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md', 'utf8')
  const ids = [...registry.matchAll(/name: "([^"]+)"/g)].map((match) => match[1])
  let failed = ids.length !== 70
  console.log(`registry ids: ${ids.length}`)
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (inventory.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does not
  mark the cluster resolved unless every upstream component example and chart
  gallery example is `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - bar chart defaults, axes, grid, legend, and tooltip behavior;
  - tooltip label, name, indicator, formatter, and value formatting behavior;
  - area, line, pie, radar, and radial chart families;
  - active/interactive examples and whether state belongs in the package,
    fixture/browser enhancement, or app code;
  - responsive sizing and aspect-ratio behavior;
  - axis/grid/label/legend composition and customization;
  - multi-series color mapping and theme color mapping;
  - chart accessibility and descriptive text;
  - Card composition ownership;
  - React/Recharts dependency mapping, including whether `recharts` remains out
    of RadCN package dependencies;
  - lucide icon and Tailwind utility mapping;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "chart-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any of the 6 upstream component Chart example ids.
- The audit omits any of the 70 upstream chart gallery ids.
- The audit collapses the chart gallery into one vague entry instead of
  recording per-id outcomes.
- The audit treats React, Recharts, lucide icons, Tailwind utility classes,
  Card composition, or vendor source as mandatory RadCN package dependencies
  without a deliberate Remix 3 parity decision.
- The audit marks `chart` resolved without package/docs/fixture/test evidence
  for the full upstream example and chart gallery surface.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Harvey (`019e9b21-9b71-7030-99d4-72ba4aed526d`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Harvey confirmed the Issue 4 README links
Experiment 29 as `Designed`, the experiment has the required Description,
Changes, Verification, and Design Review sections, the scope is audit-only,
verification includes concrete pass/fail and repo hygiene checks, the plan
requires learnings to be recorded, vendor cleanliness is checked, and current
status shows only expected plan documentation changes.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md` as an
audit-only inventory for all 6 upstream component Chart examples and all 70
upstream chart gallery examples. The inventory records user-facing behavior,
upstream mechanics, current RadCN evidence, outcome, and follow-up for each id.

The audit does not mark `chart` resolved. Current RadCN chart primitives cover
accessible containers, single-series vertical bars, single-series lines with
points, static legends, static tooltips, and custom tokens. They do not yet
cover the full upstream component examples or chart gallery behavior: grid,
axis, tick labels, multi-series coordinate systems, horizontal bars, stacked
bars, negative bars, tooltip indicator variants, tooltip hiding/formatting
options, area, pie/donut, radar, radial, active states, or interactive select
and range examples.

Verification run:

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
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (text.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
if (failed) process.exit(1)
NODE
```

Output:

```text
chart-bar-demo: 1
chart-bar-demo-axis: 1
chart-bar-demo-grid: 1
chart-bar-demo-legend: 1
chart-bar-demo-tooltip: 1
chart-tooltip-demo: 1
```

```text
node - <<'NODE'
const fs = require('fs')
const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/_registry.ts', 'utf8')
const inventory = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md', 'utf8')
const ids = [...registry.matchAll(/name: "([^"]+)"/g)].map((match) => match[1])
let failed = ids.length !== 70
console.log(`registry ids: ${ids.length}`)
for (const id of ids) {
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (inventory.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
if (failed) process.exit(1)
NODE
```

Output:

```text
registry ids: 70
chart-area-axes: 1
chart-area-default: 1
chart-area-gradient: 1
chart-area-icons: 1
chart-area-interactive: 1
chart-area-legend: 1
chart-area-linear: 1
chart-area-stacked-expand: 1
chart-area-stacked: 1
chart-area-step: 1
chart-bar-active: 1
chart-bar-default: 1
chart-bar-horizontal: 1
chart-bar-interactive: 1
chart-bar-label-custom: 1
chart-bar-label: 1
chart-bar-mixed: 1
chart-bar-multiple: 1
chart-bar-negative: 1
chart-bar-stacked: 1
chart-line-default: 1
chart-line-dots-colors: 1
chart-line-dots-custom: 1
chart-line-dots: 1
chart-line-interactive: 1
chart-line-label-custom: 1
chart-line-label: 1
chart-line-linear: 1
chart-line-multiple: 1
chart-line-step: 1
chart-pie-donut-active: 1
chart-pie-donut-text: 1
chart-pie-donut: 1
chart-pie-interactive: 1
chart-pie-label-custom: 1
chart-pie-label-list: 1
chart-pie-label: 1
chart-pie-legend: 1
chart-pie-separator-none: 1
chart-pie-simple: 1
chart-pie-stacked: 1
chart-radar-default: 1
chart-radar-dots: 1
chart-radar-grid-circle-fill: 1
chart-radar-grid-circle-no-lines: 1
chart-radar-grid-circle: 1
chart-radar-grid-custom: 1
chart-radar-grid-fill: 1
chart-radar-grid-none: 1
chart-radar-icons: 1
chart-radar-label-custom: 1
chart-radar-legend: 1
chart-radar-lines-only: 1
chart-radar-multiple: 1
chart-radar-radius: 1
chart-radial-grid: 1
chart-radial-label: 1
chart-radial-shape: 1
chart-radial-simple: 1
chart-radial-stacked: 1
chart-radial-text: 1
chart-tooltip-default: 1
chart-tooltip-indicator-line: 1
chart-tooltip-indicator-none: 1
chart-tooltip-label-none: 1
chart-tooltip-label-custom: 1
chart-tooltip-label-formatter: 1
chart-tooltip-formatter: 1
chart-tooltip-icons: 1
chart-tooltip-advanced: 1
```

Additional verification:

```text
rg -n "bar chart defaults|axes|grid|legend|tooltip|label|name|indicator|formatter|area|line|pie|radar|radial|active|interactive|responsive|axis|multi-series|theme|accessibility|Card|React|Recharts|recharts|lucide|Tailwind|Playwright" issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md
```

Confirmed that the inventory addresses all required chart mapping topics.

```text
rg -n "chart-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:482:  upstream chart gallery examples in `chart-example-inventory.md`. Chart parity
 M issues/0004-complete-shadcn-parity-and-docs/29-audit-chart-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/chart-example-inventory.md
```

`git diff --check` and vendor status produced no output.

## Conclusion

Chart needs a staged implementation. The next experiment should implement
Chart component example parity depth for the 6 component examples before
tackling the 70 chart gallery examples. That experiment should establish the
shared reusable primitives for multi-series bars, axes/ticks, grid lines,
tooltip content variants, indicator variants, config color mapping, responsive
sizing, Card composition proof, docs examples, fixture routes, and Playwright
coverage.

## Completion Review

Reviewer: Euler (`019e9b27-2265-72d0-aa70-373ac2a3ad02`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Euler confirmed the result matches the approved
audit-only scope, the experiment has Result and Conclusion, the Issue 4 README
marks Experiment 29 as `Pass`, later-work learnings are recorded, the inventory
records the Recharts/React/lucide/Tailwind/Card mapping decisions and next
implementation cluster, `chart` is not marked resolved in the parity inventory,
both deterministic ID checks pass for the 6 component examples and 70 chart
gallery examples, `git diff --check` passes, vendor cleanliness has no output,
and the result commit had not been made before review.
