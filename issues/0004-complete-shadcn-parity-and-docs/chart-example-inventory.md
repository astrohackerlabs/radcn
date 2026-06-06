# Chart Example Parity Inventory

Experiment 29 audits upstream shadcn/ui Chart examples against the current
RadCN chart package, docs, fixtures, and Playwright evidence. It is an
inventory only; it does not implement chart APIs.

## Summary

RadCN currently has dependency-free SVG chart primitives for basic bars, lines,
legends, tooltips, accessible figure labeling, and CSS-variable customization:
`ChartContainer`, `ChartBarSeries`, `ChartLineSeries`, `ChartLegend`,
`ChartLegendItem`, `ChartTooltip`, and `ChartTooltipItem`.

Upstream shadcn/ui's chart surface is much broader. Its `ChartContainer` wraps
Recharts `ResponsiveContainer`, injects chart-scoped CSS variables from
`ChartConfig`, and its examples rely on Recharts chart families, axes, grids,
labels, legends, tooltips, active shapes, responsive sizing, formatter
callbacks, React state/effects, lucide icons, Tailwind utilities, and Card
composition.

Chart parity is not complete. The next implementation should start with the 6
component chart examples because they define the public docs component surface:
bar defaults, grid, axes, legend, tooltip, and tooltip content variants. The 70
chart gallery examples should then be solved by family in later experiments:
bar, tooltip, line, area, pie, radar, and radial.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/chart.tsx` | Basic `figure role="img"` container, config color variables, bar SVG, line SVG, legend item, static tooltip item |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Chart shell, SVG surface, axis, bar, line, point, legend, tooltip, custom tokens |
| Docs | `radcn/apps/docs/app/content/components.tsx` | One compact Chart preview and source snippet |
| Candidate fixture | `radcn/fixtures/candidate-remix/app/fixtures/chart.tsx` | Bar, line, legend, tooltip, accessibility, custom-token fixtures |
| Reference fixture | `radcn/fixtures/reference-react-router/app/fixtures/chart.tsx` | Comparable basic bar/line/legend/tooltip fixtures |
| Playwright | `radcn/fixtures/tests/data-display.spec.ts` | Basic SVG counts, legend/tooltip presence, ARIA, custom-token styling, no `recharts` dependency |

## Mapping Decisions

- Recharts remains out of the RadCN package dependency graph for this issue.
  Current tests explicitly assert the package does not depend on `recharts`, and
  the Remix 3 port should preserve dependency-free, server-renderable SVG
  primitives unless a later experiment proves a stronger need.
- `ResponsiveContainer` maps to RadCN `ChartContainer` sizing classes, CSS
  variables, `viewBox`-based SVG, and fixture/docs viewport checks.
- `BarChart`, `AreaChart`, `LineChart`, `PieChart`, `RadarChart`, and
  `RadialBarChart` map to package-owned SVG primitives only when they are
  reusable chart grammar. App-specific dashboards remain docs recipes.
- Axes, grids, labels, legends, and tooltips should be explicit RadCN
  primitives or props when they affect common author-facing customization.
- `ChartTooltipContent` behavior maps to RadCN tooltip primitives that support
  label visibility, name/value rows, value formatting, indicator variants,
  hidden indicators, and nested label layout without Recharts payload objects.
- Active indexes and interactive range controls map to app-owned route state,
  native form/select state, or dependency-free browser enhancement. Chart
  package primitives should expose data hooks and deterministic SVG states, not
  React state ownership.
- Upstream color CSS variables such as `--color-desktop` and theme-aware
  `ChartConfig.theme` map to RadCN chart-scoped CSS variables and design tokens,
  including dark-mode-aware tokens where needed.
- Card composition remains composition. Chart should not depend on Card, but
  docs and fixtures should prove charts inside `Card`, `CardHeader`,
  `CardContent`, and `CardFooter`.
- lucide `TrendingUp` and other icons are presentation details. They map to
  app-owned glyphs or existing icon package usage in docs, not chart package
  dependencies.
- Tailwind utility classes map to RadCN classes, `class`, `style`, and CSS
  variables.
- Chart accessibility maps to named `figure role="img"`, descriptions, visible
  labels where useful, and Playwright checks for accessible names and text.

## Component Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-bar-demo` | Responsive two-series vertical bar chart with rounded bars and config colors. | Recharts `BarChart`, two `Bar` series, `ChartContainer`, `ChartConfig`, `accessibilityLayer`, `var(--color-*)`. | Basic bar fixture renders one series; `ChartBarSeries` accepts one `values` array and one color. | Partial | Add multi-series bar support or composable repeated series, prove config color mapping, and add named docs/fixture route. |
| `chart-bar-demo-axis` | Two-series vertical bar chart with hidden axis line, short month ticks, and grid. | Recharts `CartesianGrid`, `XAxis`, two `Bar` series. | RadCN draws one baseline axis but has no tick labels or grid primitive. | Missing | Add axis/tick/grid behavior or document a deliberate simpler axis strategy, then test labels and grid. |
| `chart-bar-demo-grid` | Two-series vertical bar chart with horizontal grid and no x-axis labels. | Recharts `CartesianGrid vertical={false}`, two `Bar` series. | No grid primitive or grid styling hook beyond baseline axis. | Missing | Add grid rendering/customization or record divergence; prove visible grid lines. |
| `chart-bar-demo-legend` | Two-series bar chart with axis, grid, tooltip, and legend content from config labels. | Recharts `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`. | Static `ChartLegendItem` and `ChartTooltipItem` exist, but not config-driven legend or integrated tooltip content variants. | Partial | Add docs/fixture proof for composed legend and tooltip, plus package support if config-driven labels are reusable. |
| `chart-bar-demo-tooltip` | Two-series bar chart with axis, grid, and tooltip content. | Recharts `ChartTooltip` with `ChartTooltipContent`. | Static tooltip exists; no hover/payload integration or tooltip content options. | Partial | Add static and enhanced tooltip examples covering label/value rows and indicators. |
| `chart-tooltip-demo` | Standalone tooltip anatomy showing label, name, value, indicator variants, hidden label, and formatting. | React local `TooltipDemo`, Tailwind layout, inline SVG callouts, indicator `dot`/`line`/`dashed`. | `ChartTooltip` and `ChartTooltipItem` cover label and rows only. | Missing | Implement or document RadCN tooltip content anatomy: label, hidden label, hidden indicator, dot/line/dashed indicators, formatted values, and source docs. |

## Chart Gallery By Family

### Area

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-area-axes` | Stacked two-series area chart with x/y axes, grid, tooltip, and Card framing. | Recharts `AreaChart`, `XAxis`, `YAxis`, `CartesianGrid`, stacked `Area`, Card. | No area chart primitive, stacked fill, y-axis, or Card chart docs proof. | Missing | Add area primitives or docs recipe after bar/tooltip foundations. |
| `chart-area-default` | Single-series natural area chart with grid, x-axis, and line indicator tooltip. | Recharts `AreaChart`, one `Area`, `ChartTooltipContent indicator="line"`. | No area primitive or line indicator tooltip. | Missing | Implement basic area and indicator tooltip support. |
| `chart-area-gradient` | Area chart with SVG gradient fill and themed chart colors. | Recharts `Area`, SVG `defs`/gradient, chart color variables. | No area fill or gradient API. | Missing | Add gradient/fill CSS-variable strategy if area ships. |
| `chart-area-icons` | Two-series area chart with legend rows using icon-capable config labels. | Recharts area series, `ChartLegendContent`, lucide-style footer icon. | Legend exists but not config/icon-driven; icons are app-owned. | Missing | Prove legend composition and app-owned icon mapping. |
| `chart-area-interactive` | Interactive area chart filtered by time range select with legend and tooltip formatting. | React `useState`, `useMemo`, shadcn `Select`, date filtering, Recharts area. | No area primitive; interactive chart state not package-owned. | Missing | Treat filtering as app/route or browser-enhancement state; later docs recipe with RadCN Select. |
| `chart-area-legend` | Two-series area chart with legend and line indicator tooltip. | Recharts stacked `Area`, `ChartLegendContent`, `ChartTooltipContent indicator="line"`. | No area primitive; basic legend only. | Missing | Add area + legend recipe after tooltip indicators. |
| `chart-area-linear` | Linear area chart variant with hidden tooltip label. | Recharts `Area type="linear"`, tooltip `hideLabel`. | No area primitive or hidden-label tooltip option. | Missing | Add curve mode and tooltip label controls if area ships. |
| `chart-area-stacked` | Stacked area chart with two filled series. | Recharts stacked `Area` with shared `stackId`. | No stacked area support. | Missing | Add stacked area or record family-level divergence. |
| `chart-area-stacked-expand` | Percent-expanded stacked area chart with three series. | Recharts `stackOffset="expand"` and stacked `Area` series. | No percent stacked area support. | Missing | Likely docs recipe or later package primitive; requires percent scale proof. |
| `chart-area-step` | Step area chart with hidden tooltip label. | Recharts `Area type="step"`. | No area primitive or step curve mode. | Missing | Add curve mode support if area ships. |

### Bar

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-bar-active` | Bar chart with active highlighted bar shape and tooltip. | Recharts `activeIndex`, custom active bar rendering, `ChartTooltipContent hideLabel`. | No active bar state or hover/selected styling. | Missing | Add data-state or selected-index SVG strategy only if package-owned. |
| `chart-bar-default` | Single-series Card-framed bar chart with grid, x-axis, tooltip, and footer trend. | Recharts `BarChart`, Card, lucide trend icon. | Basic bar exists, but no Card docs route, tick labels, or grid. | Partial | First chart depth should cover this default. |
| `chart-bar-horizontal` | Horizontal bar chart with numeric x-axis and categorical y-axis. | Recharts horizontal `BarChart`, `XAxis type="number"`, `YAxis type="category"`. | Current bars are vertical only. | Missing | Add orientation support or record divergence. |
| `chart-bar-interactive` | Switchable desktop/mobile metric totals and chart series. | React `useState`, buttons, active chart key, Recharts bar. | No chart-owned interaction; Button can compose state externally. | Missing | Treat metric switching as app state plus data hooks/docs recipe. |
| `chart-bar-label` | Vertical bars with value labels rendered above bars. | Recharts `LabelList`. | No bar labels. | Missing | Add optional value labels if bar examples are implemented. |
| `chart-bar-label-custom` | Horizontal bars with category labels and value labels inside/outside bars. | Recharts `YAxis`, hidden `XAxis`, two `LabelList` renderers. | No horizontal bars or label placement. | Missing | Requires orientation plus label placement strategy. |
| `chart-bar-mixed` | Mixed positive-style multi-series bars with differently sized radii/colors. | Multiple Recharts `Bar` series and config colors. | One bar series only; no per-series radius API. | Missing | Add multi-series and per-series style controls or docs recipe. |
| `chart-bar-multiple` | Grouped desktop/mobile bars. | Two Recharts `Bar` series. | One series only. | Missing | Add grouped multi-series bar support. |
| `chart-bar-negative` | Bar chart with positive and negative values around an axis. | Recharts numeric scale below/above baseline. | Current negative values clamp to zero. | Missing | Add signed scale support before claiming parity. |
| `chart-bar-stacked` | Stacked bars with legend and tooltip. | Recharts `stackId`, `ChartLegendContent`. | No stacked bars; basic legend only. | Missing | Add stacked bar support or record recipe-only strategy. |

### Line

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-line-default` | Single-series line chart with grid, x-axis, and hidden-label tooltip. | Recharts `LineChart`, `Line`, `CartesianGrid`, `XAxis`. | Basic line SVG exists, but no grid/ticks/tooltip integration. | Partial | Extend line fixture/docs after axis/grid/tooltip work. |
| `chart-line-dots` | Line chart with visible dots. | Recharts `Line dot`. | `ChartLineSeries` already renders points. | Partial | Add named docs/fixture proof with matching dot behavior. |
| `chart-line-dots-colors` | Line chart with per-point dot colors. | Recharts dot fill and config colors. | Points share one color. | Missing | Add per-point style mapping or recipe divergence. |
| `chart-line-dots-custom` | Line chart with custom dot rendering. | Recharts custom `dot` renderer. | No custom point slot. | Missing | Decide whether custom point rendering belongs in package. |
| `chart-line-interactive` | Interactive metric switching and total cards with line chart. | React state, buttons, derived totals, Recharts line. | No chart-owned interaction; route/app state can compose. | Missing | Map to app-owned state and docs recipe. |
| `chart-line-label` | Line chart with value labels near points. | Recharts `LabelList`. | No line labels. | Missing | Add optional line point labels if line depth ships. |
| `chart-line-label-custom` | Line chart with custom label renderer and tooltip label formatting. | Recharts custom `LabelList`, `labelFormatter`. | No labels or formatter callback equivalent. | Missing | Add formatter/label strategy or document app-owned rendering. |
| `chart-line-linear` | Linear line variant with hidden tooltip label. | Recharts `Line type="linear"`, tooltip `hideLabel`. | Current line is straight polyline; tooltip label control absent. | Partial | Prove linear line and add tooltip label option. |
| `chart-line-multiple` | Multi-series line chart. | Two Recharts `Line` series. | One line series at a time; composition may render multiple SVGs, not one plot. | Missing | Add multi-series line support in one coordinate system. |
| `chart-line-step` | Step line chart variant. | Recharts `Line type="step"`. | Current line is straight only. | Missing | Add curve/step mode if needed. |

### Pie

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-pie-donut` | Donut chart with tooltip and browser categories. | Recharts `PieChart`, `Pie innerRadius`. | No pie/donut primitive. | Missing | Add pie/donut SVG family or docs divergence. |
| `chart-pie-donut-active` | Donut chart with expanded active sector. | Recharts custom active `Sector`. | No pie primitive or active shape. | Missing | Needs selected/active wedge strategy. |
| `chart-pie-donut-text` | Donut chart with centered total text label. | Recharts `Label` content in donut center. | No donut or center label. | Missing | Add center label if donut ships. |
| `chart-pie-interactive` | Select-controlled pie chart and active sector. | React state, shadcn Select, Recharts active sector. | No pie primitive; interactive state belongs to app. | Missing | Later recipe using RadCN Select/app state. |
| `chart-pie-label` | Pie chart with slice labels. | Recharts `Pie label`. | No pie labels. | Missing | Add slice labels if pie ships. |
| `chart-pie-label-custom` | Pie chart with custom outside labels. | Recharts custom `label` renderer. | No pie custom label slot. | Missing | Decide package vs recipe after pie primitive. |
| `chart-pie-label-list` | Pie chart with label list and color labels. | Recharts `LabelList` formatter. | No pie label list. | Missing | Add label-list or recipe strategy. |
| `chart-pie-legend` | Pie chart with legend content. | Recharts `ChartLegendContent nameKey`. | Basic legend exists, but no pie or config-driven legend. | Missing | Requires pie plus legend config mapping. |
| `chart-pie-separator-none` | Pie chart without segment separators. | Recharts `stroke="0"`. | No pie stroke/separator control. | Missing | Add separator styling if pie ships. |
| `chart-pie-simple` | Basic pie chart with tooltip. | Recharts `Pie dataKey nameKey`. | No pie primitive. | Missing | Start pie family here when reached. |
| `chart-pie-stacked` | Nested/stacked pie rings with tooltip formatting. | Multiple Recharts `Pie` rings and custom tooltip name keys. | No pie rings or formatter support. | Missing | Later advanced pie/ring recipe or package primitive. |

### Radar

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-radar-default` | Single-series radar chart with polar grid and tooltip. | Recharts `RadarChart`, `PolarAngleAxis`, `PolarGrid`, `Radar`. | No radar primitive. | Missing | Add radar SVG family or document divergence. |
| `chart-radar-dots` | Radar chart with point dots. | Recharts `Radar dot`. | No radar/point support. | Missing | Add dots only if radar ships. |
| `chart-radar-grid-circle` | Radar chart with circular grid. | Recharts `PolarGrid gridType="circle"`. | No polar grid. | Missing | Add grid type controls if radar ships. |
| `chart-radar-grid-circle-fill` | Radar chart with filled circular grid bands. | Recharts `PolarGrid fill`. | No polar band fill. | Missing | Add band fill or recipe strategy. |
| `chart-radar-grid-circle-no-lines` | Radar chart with circular grid and no radial lines. | Recharts `PolarGrid radialLines={false}`. | No polar grid controls. | Missing | Add radial line toggle if radar ships. |
| `chart-radar-grid-custom` | Radar chart with custom radius grid. | Recharts `polarRadius` and `strokeWidth`. | No polar radius customization. | Missing | Add custom radius strategy if needed. |
| `chart-radar-grid-fill` | Radar chart with filled polar grid. | Recharts filled `PolarGrid`. | No radar fill/grid support. | Missing | Add filled grid support or divergence. |
| `chart-radar-grid-none` | Radar chart without grid. | Recharts omits `PolarGrid`. | No radar primitive. | Missing | Should be covered by grid toggle after radar exists. |
| `chart-radar-icons` | Multi-series radar chart with legend and icon-capable config labels. | Recharts two `Radar` series, `ChartLegendContent`, config icons. | No radar; icons app-owned. | Missing | Multi-series radar and legend mapping later. |
| `chart-radar-label-custom` | Radar chart with custom polar angle labels. | Recharts custom `PolarAngleAxis tick`. | No radar labels. | Missing | Add label renderer or recipe strategy. |
| `chart-radar-legend` | Two-series radar chart with legend. | Recharts two `Radar` series and `ChartLegendContent`. | No radar; basic legend only. | Missing | Add radar plus config legend mapping. |
| `chart-radar-lines-only` | Radar chart with line-only style and no fill. | Recharts `fillOpacity={0}`. | No radar style controls. | Missing | Add fill opacity/stroke-only support if radar ships. |
| `chart-radar-multiple` | Multi-series radar chart. | Recharts two `Radar` series. | No radar or multi-series polar support. | Missing | Later radar multi-series implementation. |
| `chart-radar-radius` | Radar chart with custom radius domain and label key. | Recharts radius/domain props, `labelKey`. | No radar radius or tooltip label key. | Missing | Requires radar scale and tooltip key support. |

### Radial

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-radial-grid` | Radial bar chart with circular grid. | Recharts `RadialBarChart`, `PolarGrid`, `RadialBar`. | No radial bar primitive. | Missing | Add radial SVG family or document divergence. |
| `chart-radial-label` | Radial bar chart with label list. | Recharts `LabelList` on `RadialBar`. | No radial labels. | Missing | Add labels if radial ships. |
| `chart-radial-shape` | Radial chart with shaped grid and centered label. | Recharts `PolarRadiusAxis`, `Label`, `RadialBar`. | No radial axis or center label. | Missing | Add center label/radius axis strategy. |
| `chart-radial-simple` | Simple radial bar chart with tooltip. | Recharts `RadialBarChart` and `RadialBar`. | No radial primitive. | Missing | Start radial family here when reached. |
| `chart-radial-stacked` | Stacked radial bars with centered total label. | Recharts stacked `RadialBar` and `Label`. | No radial stack support. | Missing | Advanced radial package or recipe. |
| `chart-radial-text` | Radial progress-style chart with centered text. | Recharts radial bar, `PolarGrid`, center `Label`. | No radial progress primitive. | Missing | Could map to a progress recipe if full radial is deferred. |

### Tooltip

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `chart-tooltip-advanced` | Tooltip with custom formatter rows and label names. | `ChartTooltipContent formatter`, stacked bars. | Static tooltip rows only; no formatter prop. | Missing | Add formatter/value slot strategy or app-owned formatting. |
| `chart-tooltip-default` | Default tooltip over two-series chart. | Recharts payload and `ChartTooltipContent`. | Static tooltip rows exist, but no integrated payload. | Partial | Add static docs proof and optional browser-enhanced hover later. |
| `chart-tooltip-formatter` | Tooltip value formatter. | `formatter` callback. | No formatter prop; values passed preformatted manually. | Partial | Prefer explicit formatted `value` prop or formatter helper; document decision. |
| `chart-tooltip-icons` | Tooltip rows with config icons. | `ChartConfig.icon`, `ChartTooltipContent`. | No icon slot in tooltip item. | Missing | Add item media/icon composition or document app-owned glyphs. |
| `chart-tooltip-indicator-line` | Tooltip with line indicator. | `indicator="line"`. | Tooltip swatch is square only. | Missing | Add `indicator` variants. |
| `chart-tooltip-indicator-none` | Tooltip with hidden indicator. | `hideIndicator`. | No hide-indicator prop. | Missing | Add `hideIndicator` or allow CSS-only hiding. |
| `chart-tooltip-label-custom` | Tooltip label pulled from alternate config key. | `labelKey`. | No label key lookup; label is explicit text. | Partial | Explicit `label` may be enough, but docs must map divergence. |
| `chart-tooltip-label-formatter` | Tooltip label formatter. | `labelFormatter` callback. | No label formatter; label can be preformatted. | Partial | Decide explicit string vs formatter prop and prove docs. |
| `chart-tooltip-label-none` | Tooltip with no label and no indicator. | `hideLabel hideIndicator`. | Label can be omitted, indicator cannot. | Partial | Add hidden indicator support. |

## Outcome

Chart example parity is not complete.

Current RadCN chart primitives cover the beginning of the surface: accessible
containers, basic vertical bars, basic line charts with points, static legends,
static tooltips, and custom tokens. They do not yet cover upstream's complete
bar examples, tooltip content anatomy, grid/axis/tick behavior, multi-series
coordinate systems, horizontal/stacked/negative bars, area charts, pie/donut
charts, radar charts, radial charts, active states, formatter callbacks, or
interactive select/range examples.

The next implementation cluster should be **Chart component example parity
depth**. It should focus on the six component examples first:
`chart-bar-demo`, `chart-bar-demo-axis`, `chart-bar-demo-grid`,
`chart-bar-demo-legend`, `chart-bar-demo-tooltip`, and `chart-tooltip-demo`.
That cluster should establish the reusable chart grammar needed by later chart
gallery work: multi-series bars, axis ticks, grid lines, config color mapping,
responsive sizing, Card composition proof, tooltip content variants, indicator
variants, and Playwright checks.

After that, later experiments can resolve the chart gallery by family, starting
with the bar and tooltip gallery rows because they reuse the same primitives.
