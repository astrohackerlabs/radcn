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
