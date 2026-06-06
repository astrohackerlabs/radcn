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
