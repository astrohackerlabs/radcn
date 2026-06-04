# Experiment 23: Stage 5 Data Display and Table Block

## Description

Continue Stage 5 by resolving the data-display cluster:

- `chart`
- `data-table`

This cluster should answer how RadCN handles upstream examples that combine
React-only charting/table libraries, drag/drop, schema validation, toast
notifications, and application-level dashboard state.

Upstream shapes:

- `chart` is a React wrapper around `recharts`. It provides chart container
  context, CSS variable theme injection, tooltip content, legend content, and
  Recharts-specific payload helpers.
- `data-table` is not a standalone primitive. It is a dashboard block that
  composes `table`, `button`, `checkbox`, `dropdown-menu`, `drawer`, `select`,
  `tabs`, `chart`, `sonner`, and third-party packages such as
  `@tanstack/react-table`, `@dnd-kit/*`, `recharts`, and `zod`.

Expected disposition:

- `chart` should receive a RadCN-native data-display outcome. The preferred
  implementation is a small, dependency-free SVG/chart recipe component set
  that preserves shadcn's author-visible value: themed chart container, color
  variables, accessible chart summary, legend, tooltip-like static/details
  output, responsive sizing, and customization hooks. It must not add
  `recharts` to `packages/radcn`.
- `data-table` should receive a block/recipe disposition, not a core primitive,
  unless the experiment proves a smaller core component is necessary. RadCN
  already has `Table` as the semantic primitive. The dashboard data table should
  be documented and demonstrated as composed application code using existing
  primitives plus explicit local state/route logic, not a generic
  `radcn/data-table` package export.

This experiment should add source, fixtures, tests, docs, learnings, and a
reviewed disposition for both targets. It should not start `sonner`, `toast`,
`resizable`, or `sidebar`, except to document that the upstream data-table
references those systems and therefore cannot be copied wholesale.

## Chart Requirements

Keep a familiar author-facing surface where useful:

- `ChartContainer`
- `ChartLegend`
- `ChartLegendItem`
- `ChartTooltip`
- `ChartTooltipItem`
- simple chart primitives such as `ChartBarSeries` or `ChartLineSeries` if the
  implementation needs source components rather than fixture-only recipes.

The RadCN chart outcome should support:

- dependency-free SVG rendering for bounded bar and line chart examples;
- `ChartConfig`-style labels and colors or an explicit RadCN replacement;
- stable `data-radcn-chart*` hooks;
- CSS variables for series colors and custom tokens;
- `role="img"` or equivalent accessible chart semantics with an accessible
  name and description;
- visible legend output;
- tooltip/details output that can be rendered without React Recharts payloads;
- responsive sizing through CSS, `viewBox`, and stable aspect ratio;
- no `recharts` dependency in `packages/radcn`.

Shared `chart` scenarios should include:

- `chart/bar`
- `chart/line`
- `chart/legend`
- `chart/tooltip`
- `chart/accessibility`
- `chart/custom-token`

## Data Table Requirements

Record a final Stage 5 disposition for `data-table`.

The disposition should answer:

- why the upstream dashboard data table is a block/recipe, not a core RadCN
  component;
- why `@tanstack/react-table`, `@dnd-kit/*`, `recharts`, `sonner`, and `zod`
  are not added to core RadCN as part of this issue;
- how existing RadCN primitives cover the portable pieces: `Table`, `Button`,
  `Checkbox`, `DropdownMenu`, `Drawer`, `Select`, `Tabs`, and `Chart`;
- how a Remix 3 data-table recipe should model sorting, filtering,
  pagination, row selection, column visibility, row details, and reorder
  behavior;
- which behaviors are demonstrated now and which remain application-code
  responsibilities.

Shared `data-table` scenarios should be recipe/block fixtures rather than
placeholder component source:

- `data-table/default`
- `data-table/sort-filter`
- `data-table/selection`
- `data-table/pagination`
- `data-table/row-actions`
- `data-table/responsive-detail`
- `data-table/custom-token`

These scenarios should demonstrate a bounded Remix 3-native data-table block
using existing RadCN primitives. If no `radcn/data-table` export is added,
focused tests must prove the omission is intentional and documented.

## Changes

Expected implementation files:

- `packages/radcn/src/components/chart.tsx`
  - Add the chart source parts, prop types, data hooks, accessible SVG/data
    rendering, legend/details helpers, and customization hooks.
- `packages/radcn/package.json`
  - Add `./chart`.
  - Do not add `./data-table` unless the experiment proves a core source
    component is necessary.
- `packages/radcn/src/index.ts`
  - Export chart parts and types.
- `packages/radcn/src/styles/tokens.css`
  - Add chart classes, series variables, legend/details styling, responsive
    sizing, and custom token hooks.
- `packages/radcn/src/styles/index.ts`
  - Regenerate after token changes.
- `fixtures/scenarios/types.ts`
  - Add `chart` and `data-table` to `FixtureComponent`.
- `fixtures/scenarios/index.ts`
  - Add every shared scenario listed above.
- `fixtures/candidate-remix/app/fixtures/chart.tsx`
  - Add candidate fixtures using real RadCN chart source.
- `fixtures/candidate-remix/app/fixtures/data-table.tsx`
  - Add candidate recipe/block fixtures using existing RadCN primitives.
- `fixtures/candidate-remix/app/fixtures/index.tsx`
  - Route the new candidate fixtures.
- `fixtures/reference-react-router/app/fixtures/chart.tsx`
  - Add matching React Router reference chart fixtures.
- `fixtures/reference-react-router/app/fixtures/data-table.tsx`
  - Add matching React Router reference data-table fixtures.
- `fixtures/reference-react-router/app/fixtures/index.ts`
  - Route the new reference fixtures.
- `fixtures/reference-react-router/app/app.css`
  - Add reference styles for the new fixtures.
- `fixtures/tests/data-display.spec.ts`
  - Add focused candidate behavior tests for chart and data-table disposition.
- `docs/radcn-source.md`
  - Document the chart implementation, Recharts divergence, and data-table
    block/recipe disposition.
- `issues/0002-implement-entire-shadcn-port/README.md`
  - Update the experiment status and add reusable learnings.

## Verification

The experiment passes if:

1. `chart` RadCN source exists and exports every supported chart part from
   `radcn/chart` and the root index.
2. No React-only data-display dependencies are added to `packages/radcn`: no
   `recharts`, `@tanstack/react-table`, `@dnd-kit/*`, `zod`, or `sonner`.
3. If `radcn/data-table` is not exported, docs and tests prove that omission is
   intentional and that `data-table` has a final block/recipe disposition.
4. Shared scenarios include every required `chart` and `data-table` scenario.
5. Reference and candidate fixture routes exist for every shared scenario.
6. Component-specific Playwright checks cover chart accessibility, SVG/data
   rendering, legend output, tooltip/details output, responsive sizing,
   custom tokens, package exports, and no Recharts dependency.
7. Component-specific Playwright checks cover data-table semantic table output,
   sort/filter recipe behavior, row selection, pagination, row actions,
   responsive/detail composition, no `radcn/data-table` export if intentionally
   omitted, and custom tokens.
8. Artifact screenshots capture paired reference/candidate output for every new
   scenario.
9. Documentation explains the chart source design, Recharts/API divergence,
   data-table block disposition, dependency policy, install/source parity, and
   which dashboard behaviors remain app-code responsibilities.
10. Issue learnings record reusable data-display, block/recipe, and
    third-party dependency rules needed by later Stage 5 work.
11. `pnpm radcn:typecheck` passes.
12. `pnpm fixtures:candidate:typecheck` passes.
13. `pnpm fixtures:reference:typecheck` passes.
14. Focused data-display Playwright tests pass.
15. `pnpm fixtures:artifacts` passes.
16. `git status --short -- vendor` returns no output.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should complete the data-display cluster, but it should not
close Stage 5. Later experiments still need final outcomes for `sonner`,
`toast`, `resizable`, `sidebar`, and any unresolved block dispositions.

## Design Review

Independent AI design review was performed by subagent `Harvey` and returned
**Pass**.

Harvey confirmed that the design is sufficiently scoped, testable, and aligned
with Issue 2 Stage 5.

The review confirmed:

- grouping `chart` and `data-table` is coherent because both resolve
  React-heavy data-display dependencies and application/block policy;
- `chart` has a realistic RadCN-native path without Recharts through
  dependency-free SVG, config/colors, legend, details/tooltip output,
  accessibility, responsive sizing, and stable hooks;
- `data-table` has a real block/recipe disposition with required scenarios and
  explicit no-export proof if `radcn/data-table` is omitted;
- the plan blocks React-only dependencies such as `recharts`,
  `@tanstack/react-table`, `@dnd-kit/*`, `zod`, and `sonner` in core RadCN;
- verification covers exports, scenarios, fixtures, focused Playwright checks,
  artifacts, docs, learnings, vendor cleanliness, and completion review;
- the plan does not design later Stage 5 work beyond naming `sonner`, `toast`,
  `resizable`, and `sidebar` as remaining future targets.

Non-blocking implementation note:

- The data-table recipe should avoid quietly depending on unavailable
  notification or drag/drop behavior; omitted dashboard behavior should be
  visibly documented as application-code responsibility.
