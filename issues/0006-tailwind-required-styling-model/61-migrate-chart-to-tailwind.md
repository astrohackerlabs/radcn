# Experiment 61: Migrate Chart to Tailwind utilities

## Description

Chart is standalone (no Button/Input coupling). Its SVG presentation properties
(`stroke`/`fill`/`stroke-width`/`stroke-linecap`/`stroke-linejoin`/`aspect-ratio`)
migrate to Tailwind arbitrary-property utilities (`[stroke:…]`, `[fill:…]`, etc.).
The `data-indicator` tooltip state is an own-state variant; the
`[data-radcn-chart-tooltip-value]` value span gets utilities directly. The DOCS-only
demo classes (`radcn-chart-docs-grid`, `radcn-chart-example-card` + its
`[data-radcn-card-content]` descendant, `radcn-chart-tooltip-demo`) are raw classes
applied by `docs/content/components.tsx` — kept bespoke. The fixture stays.

### Exact utility mapping

- chart (`.radcn-chart`): `grid w-[min(100%,var(--radcn-chart-width,34rem))] gap-3
  text-foreground [font-family:var(--radcn-font)]`.
- title: `text-[0.9375rem] font-semibold leading-[1.3] [font-family:var(--radcn-font)]`.
- description: `-mt-2 mx-0 mb-0 text-muted-foreground text-[0.8125rem] font-normal
  leading-[1.4] [font-family:var(--radcn-font)]` (`margin:-0.5rem 0 0`).
- svg (`.radcn-chart-svg`): `block w-full
  [aspect-ratio:var(--radcn-chart-aspect-ratio,16/9)] border
  border-[var(--radcn-chart-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-chart-bg,var(--radcn-background))] overflow-visible`.
- axis: `[stroke:var(--radcn-chart-axis,var(--radcn-border))] [stroke-width:1]`.
- grid-line: `[stroke:var(--radcn-chart-grid,color-mix(in_srgb,var(--radcn-border)_72%,transparent))]
  [stroke-width:1]`.
- tick: `[fill:var(--radcn-muted-foreground)] text-[0.6875rem] font-normal leading-none
  [font-family:var(--radcn-font)]`.
- bar: `[fill:var(--radcn-chart-series-color,var(--radcn-primary))]`.
- bar-group: `text-foreground`.
- line: `[stroke:var(--radcn-chart-series-color,var(--radcn-primary))] [stroke-width:3]
  [stroke-linecap:round] [stroke-linejoin:round]`.
- point: `[stroke:var(--radcn-chart-bg,var(--radcn-background))] [stroke-width:2]`.
- legend: `flex flex-wrap gap-3 text-muted-foreground text-[0.8125rem] font-normal
  leading-[1.4] [font-family:var(--radcn-font)]`.
- legend-item: `inline-flex items-center gap-1.5` (the shared base).
- tooltip-item: `inline-flex items-center gap-1.5 justify-between
  data-[indicator=none]:pl-0` (shared base + the tooltip-item `justify-content` +
  the `[data-indicator=none]` own-state).
- legend-swatch / tooltip-swatch (base): `w-2.5 h-2.5 rounded-[999px]
  bg-[var(--radcn-chart-item-color,var(--radcn-chart-series-color,var(--radcn-primary)))]`.
- tooltip-swatch--line: `w-1 h-[1.125rem] rounded-[999px]` (appended after the base).
- tooltip-swatch--dashed: `w-0 h-[1.125rem] rounded-none border-l-2 border-dashed
  border-[var(--radcn-chart-item-color,var(--radcn-chart-series-color,var(--radcn-primary)))]
  bg-transparent` (appended after the base; the base bg is overridden by
  `bg-transparent` — last wins... see note).
- tooltip (`.radcn-chart-tooltip`): `grid w-max min-w-36 gap-1.5 border
  border-[var(--radcn-chart-tooltip-border,var(--radcn-border))] rounded-md p-2.5
  bg-[var(--radcn-chart-tooltip-bg,var(--radcn-background))]
  shadow-[0_10px_32px_rgb(0_0_0_/_0.12)] text-[0.8125rem] font-normal leading-[1.35]
  [font-family:var(--radcn-font)]`.
- tooltip-label: `font-semibold`.
- tooltip-value (the `[data-radcn-chart-tooltip-value]` span gets a class): `ml-auto
  tabular-nums font-semibold`.

Note on the swatch variants: the swatch base sets `rounded-[999px]` + a bg; the
`--line` variant only changes w/h (rounded same); the `--dashed` variant changes
w/h + `rounded-none` + border + `bg-transparent`. Since the variant utilities are
appended to the base in the same class list, `rounded-none` vs base `rounded-[999px]`
and `bg-transparent` vs base bg CONFLICT (Exp-41). To avoid: the swatch base const
omits `rounded`/`bg`; each rendered swatch composes base + its own
`rounded`+`bg`/border per variant (the component emits
`radcn-chart-tooltip-swatch--${indicator}` — switch on it). The legend-swatch (always
dot) uses base + `rounded-[999px]` + bg.

### Kept bespoke

`.radcn-chart-docs-grid`, `.radcn-chart-example-card` + `.radcn-chart-example-card
[data-radcn-card-content]`, `.radcn-chart-tooltip-demo` (docs demo classes);
`.radcn-fixture-custom-chart`.

## Why both suites stay green

- `data-display.spec.ts:55` (chart custom class) holds (class on root); `:56`
  (`[data-radcn-chart-svg]` bg `rgb(240,253,250)`) holds via the migrated svg's
  `bg-[var(--radcn-chart-bg,…)]` reading the fixture token.
- The SVG stroke/fill colors read their `--radcn-chart-*` vars via the arbitrary-property
  utilities; the docs demo layout (docs-grid/example-card/tooltip-demo) is untouched.

## Changes

- `radcn/packages/radcn/src/components/chart.tsx`: emit utility-const strings for all
  component surfaces (incl. the SVG arbitrary properties + the tooltip-value span +
  the swatch base/variant composition); keep all data attributes. ASCII/token-free
  comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated `.radcn-chart*`
  rules; KEEP the docs demo classes + the fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `[stroke:var(…)]`, `[fill:var(…)]`,
   `[aspect-ratio:var(…,16/9)]`, `[stroke-linecap:round]`, `tabular-nums`,
   `[stroke:var(--radcn-chart-grid,color-mix(in_srgb,…))]` utilities compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; no migrated `.radcn-chart*` rule remains; the docs demo
   classes + fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `data-display.spec.ts` (the chart custom
   class, the svg bg, bar/line/point rendering, axis/grid, legend, tooltip + swatches).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Chart renders from Tailwind utilities (incl. the SVG presentation via
arbitrary properties); the custom class + svg bg + series colors hold; BOTH suites
green; byte-identical.

Fail criteria: a data-display assertion regresses; an SVG stroke/fill or the svg bg
drifts; a swatch-variant conflict; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major (minor confirmations only). The reviewer verified
all five cruxes: (1) the SVG arbitrary-property mappings (`[stroke:var(…)]`,
`[fill:var(…)]`, `[stroke-width:N]`, `[stroke-linecap:round]`, `[aspect-ratio:var(…,16/9)]`,
and the grid-line `color-mix` inside the var fallback) are correct Tailwind v4; (2)
the swatch variant conflict (Exp-41) must be resolved by per-indicator const
SELECTION (dot/line/dashed; none→dot), NOT base+append — the design does this and the
component's current `classes('…-swatch', \`…--${indicator}\`)` must be replaced; (3)
the tooltip-value span (currently no class) gets `ml-auto tabular-nums font-semibold`,
and tooltip-item = shared + `justify-between` + `data-[indicator=none]:pl-0`; (4) the
docs demo classes + fixture kept bespoke; (5) all mappings exact and `:55` (custom
class) + `:56` (svg bg via `bg-[var(--radcn-chart-bg,…)]`) hold — and the bar `fill`
ATTRIBUTE assertion is unaffected (the migrated `[fill:…]` utility is the same CSS as
the original `.radcn-chart-bar` rule, identical behavior).

Approval result: approved — the SVG arbitrary-property migration + the per-indicator
swatch composition + the docs/fixture carve-outs are sound. Key implementation gate:
swatch per-indicator const selection.
