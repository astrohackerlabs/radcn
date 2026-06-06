+++
status = "open"
opened = "2026-06-05"
+++

# Issue 4: Complete shadcn/ui Parity and Docs

## Goal

Complete RadCN's shadcn/ui parity for Remix 3: every shadcn component, helper,
recipe, and meaningful primitive/component example should either exist in
RadCN with equivalent user-facing functionality or be explicitly documented as
not applicable to Remix 3 with a defensible reason.

Upstream shadcn blocks and chart-gallery examples are no longer in scope for
this issue. If RadCN already added block or chart-gallery surfaces for this
issue, a later cleanup experiment must remove them from the project. The
ordinary `radcn/chart` package component remains in scope as a retained
component surface.

The documentation website should become the proof surface for that parity. It
must show the completed RadCN APIs, explain Remix 3 divergences, and keep
installation copy aspirational until a later npm publishing issue makes the
package installable.

## Background

Issues 2 and 3 produced the first full RadCN component port and a polished Remix
3 documentation site. The current docs honestly mark `form`, `date-picker`, and
`data-table` as `not-shipped-yet` because they are not current `radcn/*` package
exports.

That is enough for a first docs site, but it is not enough for a completed RadCN
product. The project now needs a parity pass against the vendored shadcn/ui
source so missing surfaces are implemented deliberately instead of remaining
implicit gaps.

Primary local references:

- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/` — shadcn/ui v4 component
  source of truth for the New York style.
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/` — out-of-scope
  shadcn block references. Use only to identify and remove any already-added
  RadCN block work from this issue.
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/` — out-of-scope
  chart-gallery references. Use only to distinguish chart-gallery work from
  the retained `radcn/chart` package component.
- `vendor/shadcn-ui/apps/v4/registry.json` and registry index files — metadata
  for the upstream registry surface.
- `radcn/packages/radcn/` — current RadCN package exports and implementation.
- `radcn/apps/docs/` — current RadCN docs site and component registry.
- `issues/0002-implement-entire-shadcn-port/` — prior implementation evidence
  and divergence records.
- `issues/0003-build-radcn-documentation-site/` — docs architecture,
  installation-scope decisions, and final docs-site verification.

Vendor checkouts are references only. Do not make RadCN code depend on
`vendor/`, and do not commit vendored source.

## Scope

This issue includes:

- auditing the complete current vendored shadcn/ui v4 registry surface;
- comparing shadcn components, helpers, recipes, and primitive/component
  examples against
  RadCN package exports and docs pages;
- implementing missing RadCN package APIs where a reusable package surface makes
  sense for Remix 3;
- implementing recipe documentation where a package export does not make
  sense;
- completing the currently missing `form`, `date-picker`, and `data-table`
  outcomes;
- expanding examples and tests so RadCN behavior is visually equivalent and
  modifiable in the same way as shadcn/ui where that comparison makes sense;
- updating the docs site so completed APIs no longer appear as
  `not-shipped-yet`;
- recording all intentional divergences from shadcn/ui in the issue learnings
  and docs pages.

This issue does not include:

- publishing RadCN to npm;
- making external `pnpm add radcn` installation work;
- implementing or retaining shadcn blocks;
- implementing or retaining shadcn chart-gallery examples;
- replacing Remix 3 web-first APIs with React-only shadcn implementation
  details;
- treating DOM equivalence as required when visual behavior, accessibility, and
  author-facing customization are equivalent.

## Analysis

Parity means user-facing capability, not mechanical React translation.

For each upstream shadcn surface, experiments should decide:

- **Package component:** reusable and appropriate as `radcn/<slug>`.
- **Helper:** package utility or event API, such as toast helpers.
- **Recipe:** documented composition of RadCN primitives, not necessarily a new
  package export.
- **Out of scope:** upstream blocks and chart-gallery examples. They are not
  RadCN parity deliverables for this issue; if any were already added for Issue
  4, remove them from the project.
- **Not applicable:** intentionally omitted because the shadcn behavior depends
  on React-only semantics or a product assumption that does not fit Remix 3.

The first experiment should not start by implementing components. It should
produce a parity inventory generated from the vendored shadcn registry and the
current RadCN export map, then identify the first coherent implementation
cluster. Later experiments should implement one coherent cluster at a time and
record discoveries needed by later clusters in `## Learnings`.

The docs website remains the public verification surface. When a retained
component, helper, recipe, or primitive/component example becomes complete, its
docs page should render a real RadCN example, include representative source,
describe installation/import intent, and explain accessibility, customization,
and Remix 3 divergence details.

Installation instructions must stay aspirational while RadCN is private and not
published to npm. Docs may show the intended future command, but they must not
claim external users can install the package today.

## Completion Criteria

This issue is complete when:

- the vendored shadcn/ui v4 registry has been audited and mapped to RadCN
  outcomes;
- every in-scope shadcn component/helper/recipe/example has a RadCN outcome:
  shipped package API, docs recipe, covered example parity, or documented
  not-applicable divergence;
- upstream blocks and chart-gallery examples are excluded from the completion
  queue, and any block/chart-gallery work already added for Issue 4 has been
  removed from the project;
- `form`, `date-picker`, and `data-table` are no longer unexplained gaps;
- all implemented RadCN package surfaces have package exports, TypeScript
  coverage, docs pages, live docs examples, and Playwright coverage where
  rendered behavior matters;
- docs clearly identify recipes that are not package imports;
- docs installation copy remains aspirational and says RadCN is not published to
  npm yet;
- no RadCN package or app code depends on `vendor/`;
- verification includes package typecheck, docs typecheck, docs Playwright
  coverage, relevant fixture/artifact coverage, vendor cleanliness checks, and
  no-publish/no-vendor scope checks;
- the issue is reviewed through the issue/experiment workflow and closed with a
  conclusion.

## Learnings

Record cross-component discoveries here as experiments complete.

- Experiment 1 generated `parity-inventory.md` from local source files. At the
  time, the vendored shadcn/ui v4 New York registry had 57 UI items, 244
  examples, 27 blocks, and 70 chart examples, while RadCN had 57 public package
  subpaths and 60 docs routes.
- Scope revision: upstream shadcn blocks and chart-gallery examples are no
  longer Issue 4 deliverables. Retain all other components, helpers, recipes,
  and primitive/component examples, including the `radcn/chart` package
  component. Any block or chart-gallery work already added for Issue 4 should
  be removed from the project before closing the issue.
- `form` is the only upstream shadcn `ui/` item that is not a current RadCN
  package export. It is documented today as a docs-only gap.
- `date-picker` and `data-table` are not upstream `ui/` package components in
  the v4 registry; they appear as examples/block outcomes and remain RadCN
  docs-only gaps.
- `typography` is a RadCN package export without an upstream `ui/` counterpart,
  but the upstream registry has typography examples. Treat it as a recipe/API
  parity surface, not a missing upstream component.
- The first recommended implementation cluster is form parity and Remix 3 form
  recipes, because form is the only missing upstream UI package API and later
  date-picker/data-table/block work depends on a stable form story.
- Experiment 2 shipped `radcn/form` as an explicit Remix-native form API:
  `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`,
  `FormDescription`, `FormMessage`, `formFieldIds`, and
  `formControlAttributes`.
- shadcn/ui form's React Hook Form, React context, `Controller`, `Slot`, and
  `useFormState` mechanics are intentionally not portable to RadCN. RadCN form
  parity is native markup, deterministic IDs, explicit ARIA wiring, server/action
  error display, invalid styling, and app-owned validation state.
- Later `date-picker`, `data-table`, block, and example work should reuse the
  explicit form wiring pattern when composed controls need labels,
  descriptions, invalid messages, and server/action error state.
- The candidate fixture app needs the same root pnpm virtual-store asset
  allowlist as the docs app after the top-level workspace move. Without it,
  browser enhancement imports for `remix/ui` fail before component behavior
  tests run.
- After Experiment 2, the regenerated inventory reports 58 RadCN public package
  subpaths and no missing upstream UI package APIs. The remaining docs-only
  outcomes are `date-picker` and `data-table`.
- Experiment 3 shipped `radcn/date-picker` as a package-backed composition for
  the three upstream shadcn date-picker example families: single date, presets,
  and range.
- Date-picker values use the existing calendar ISO convention:
  `YYYY-MM-DD` for single values and `YYYY-MM-DD..YYYY-MM-DD` for ranges. This
  keeps native form submission, server validation, and docs snippets independent
  of third-party date formatting or calendar state packages.
- `enhanceDatePicker` coordinates trigger labels, hidden inputs, preset selects,
  form reset, and range completion with `enhanceCalendar` and `enhancePopover`.
  Range pickers stay open after the first selected date and close after the range
  is complete.
- After Experiment 3, the regenerated inventory reports 59 RadCN public package
  subpaths. The only remaining docs-only outcome is `data-table`.
- Experiment 4 shipped `radcn/data-table` as a package-backed composition layer
  over existing RadCN primitives. It intentionally does not port TanStack Table,
  React state, drag-and-drop libraries, chart libraries, schema validation, or
  toast dependencies.
- Data Table parity maps upstream filtering, sorting, row selection,
  pagination, column controls, row actions, responsive detail, empty state, and
  row-editing patterns to native forms, links, checkboxes, buttons, explicit
  props, and package-owned slots. Apps remain responsible for route/query state,
  data operations, persistence, and dashboard-specific behavior.
- After Experiment 4, the regenerated inventory reports 60 RadCN public package
  subpaths and no known docs-only outcomes. `data-table`, `date-picker`, and
  `typography` are RadCN package exports without upstream `ui/` counterparts,
  but each now has a documented parity decision.
- The next recommended cluster from the inventory is example parity depth,
  beginning with upstream form examples.
- Experiment 5 mapped all 30 upstream form examples into
  `form-example-inventory.md`. The audit confirms that RadCN should not port
  React Hook Form, TanStack Form, Formisch, Valibot, Zod, or Next action
  mechanics as package dependencies.
- Current Form parity is strong at the package-wiring level and across
  individual control fixtures, but the Form docs and Form fixture need broader
  example depth: basic non-error form, textarea, select, checkbox group, radio
  group, switch, repeated array/list fields, password strength, complex
  multi-section form, and richer server/action state.
- Experiment 6 implemented that Form example parity depth without changing the
  `radcn/form` package API or adding form-state/schema dependencies.
- Form parity now maps the upstream RHF, TanStack Form, Formisch, and Next
  examples to RadCN behavior clusters with docs, candidate fixtures, and
  Playwright coverage: basic form, textarea, select, checkbox group, radio
  group, switch, repeated array/list fields, password strength, complex
  multi-section composition, and richer server/action errors.
- The next Issue 4 cluster should move past Form example parity to the next
  unmapped example/block/chart depth in the regenerated inventory and docs.
- Experiment 7 added `resolved-clusters.json` so the generated inventory can
  distinguish historical upstream coverage from unresolved Issue 4 work. The
  inventory now keeps full upstream tables while excluding resolved clusters
  from unresolved queues and recommendations.
- After Experiment 7, the generated next recommendation is the `typography`
  package outcome decision, because `typography` is a RadCN export without an
  upstream `ui/` counterpart and is not yet marked resolved in Issue 4.
- Experiment 8 resolved the Typography outcome as a RadCN package-backed
  recipe/API rather than an upstream `ui/` component port. All 14 upstream
  typography examples are mapped in `typography-outcome.md`, including
  `typography-table` as Typography prose composed with `radcn/table`.
- After Experiment 8, `typography` is marked resolved in both the package
  outcome and example queues. The next generated recommendation is example
  parity for `button`.
- Experiment 9 audited all 13 upstream button examples in
  `button-example-inventory.md`. Button example parity is not complete yet:
  RadCN needs `link`, `icon-sm`, and `icon-lg` Button support, an accessible
  name prop for icon-only buttons, and docs/fixture/Playwright proof for link,
  loading, icon-with-text, icon-only, rounded, and size examples.
- Experiment 10 completed Button example parity depth. `radcn/button` now
  supports the `link` variant, `icon-sm` and `icon-lg` sizes, and `ariaLabel`
  for icon-only buttons. Docs, fixtures, Playwright, and
  `button-example-inventory.md` cover all 13 upstream Button examples, with
  shadcn's React-only `asChild` recorded as the intentional `href` mapping.
- After Experiment 10, `button` is marked resolved in the example queue. The
  next generated recommendation is example parity for `field`.
- Experiment 11 audited all 12 upstream Field examples in
  `field-example-inventory.md`. Field example parity is not complete yet:
  RadCN needs Field package parts for labels, fieldsets, legends, groups,
  separators, content wrappers, titles, horizontal/responsive orientation, and
  richer grouped control compositions. The slider example needs a Remix/web-first
  value-display strategy instead of React `useState`.
- Experiment 12 completed Field example parity depth. `radcn/field` now exports
  `FieldLabel`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldSeparator`,
  `FieldContent`, and `FieldTitle`, and `Field` supports vertical, horizontal,
  and responsive orientations.
- Field parity is layout and grouping parity, not form-state parity.
  `radcn/field` owns reusable field structure while `radcn/form` remains the
  Remix-native server/action wiring API.
- The upstream Field slider example's React `useState` live value text maps to
  a documented RadCN intentional divergence: native range controls with
  server-provided defaults and submitted min/max values. Apps can add
  dependency-free browser enhancement if live value text is needed.
- After Experiment 12, `field` is marked resolved in the example queue. The
  next generated recommendation is example parity for `button-group`.
- Experiment 13 audited all 11 upstream ButtonGroup examples in
  `button-group-example-inventory.md`. ButtonGroup example parity is not
  complete yet: RadCN has the base package API and basic horizontal, vertical,
  separator, and text-hook proof, but it needs broader docs/fixture/Playwright
  coverage for nested groups, split buttons, size matrices, input/input-group
  composition, select composition, dropdown/popover compositions, accessible
  vertical icon groups, and React state mappings.
- Experiment 14 completed ButtonGroup example parity depth. `ButtonGroup` now
  supports accessible group labels, docs and fixtures cover all 11 upstream
  ButtonGroup examples, and focused Playwright proof covers nested groups,
  split buttons, sizes, input/InputGroup/Select composition, DropdownMenu and
  Popover composition, separator-only groups, and vertical icon groups.
- ButtonGroup remains a layout primitive. React `useState` in upstream examples
  maps to server/default state, hidden native submitted values, route state, or
  app-owned enhancement; shadcn's `asChild` overlay triggers map to explicit
  RadCN trigger components.
- After Experiment 14, `button-group` is marked resolved in the example queue.
  The next generated recommendation is example parity for `input-group`.
- Experiment 15 audited all 11 upstream InputGroup examples in
  `input-group-example-inventory.md`. InputGroup example parity is not complete
  yet: RadCN has the base package API and primitive fixture proof, but it needs
  broader docs/fixture/Playwright coverage for Popover, DropdownMenu, Tooltip,
  Spinner, ButtonGroup, Label, Separator, icon addons, icon buttons, text
  addons, textarea toolbars, custom textarea mapping, and non-text input types.
- InputGroup remains a layout and control-shell primitive. React `useState`,
  `useCopyToClipboard`, shadcn `asChild`, icon package choices, and
  `react-textarea-autosize` map to explicit RadCN composition, native
  server/default state, route/app-owned enhancement, or documented
  customization rather than package dependencies.
- After Experiment 15, the next recommended implementation cluster is
  InputGroup example parity depth.
- Experiment 16 completed InputGroup example parity depth. `radcn/input` now
  exports `InputType` and supports native `text`, `email`, `password`, `tel`,
  and `url` inputs plus `readOnly`; `radcn/input-group` passes those through
  `InputGroupInput` and adds `ariaLabel` support for icon-only
  `InputGroupButton` actions.
- InputGroup docs, fixtures, and Playwright coverage now prove all 11 upstream
  InputGroup example families: buttons, ButtonGroup composition, custom
  textarea mapping, full demo composition, DropdownMenu, icon addons, Label,
  Spinner, text addons, textarea toolbars, and Tooltip.
- Remix UI's accessible input typings do not currently accept `type="search"`
  in this package's textbox branch. Search-style InputGroup examples use
  labeled text inputs while preserving user-facing search behavior.
- After Experiment 16, `input-group` is marked resolved in the example queue.
  The regenerated inventory recommends example parity for `item` next.
- Experiment 17 audited all 10 upstream Item examples in
  `item-example-inventory.md`. Item example parity is not complete yet: RadCN
  has the base package slots and primitive fixture proof, but it needs broader
  docs/fixture/Playwright coverage for link-like Items, Avatar media,
  stacked-avatar media, DropdownMenu rows, image header cards, image row lists,
  secondary metadata content, richer size/variant matrices, and icon-only
  Button actions.
- Item remains a layout/content primitive. shadcn `asChild`/Radix Slot, React
  fragments/arrays, Next `Image`, remote image URLs, and lucide icon choices
  should map to explicit RadCN composition, native anchors or a deliberate
  anchor API, server-rendered repeated rows, docs/app-owned image choices, and
  presentation-only glyphs/assets rather than package dependencies.
- After Experiment 17, the next recommended implementation cluster is Item
  example parity depth.
- Experiment 18 completed Item example parity depth. `radcn/item` now supports
  explicit linked rows through `href`, `target`, `rel`, and `rmxDocument` while
  preserving the outer `data-radcn-item` `role="listitem"` wrapper and exposing
  a nested native anchor through `data-radcn-item-link`.
- Item docs, fixtures, and Playwright coverage now prove all 10 upstream Item
  example families: avatar, demo, dropdown, group, header, icon, image, link,
  size, and variant. The recorded divergences are stable for later components:
  `asChild`/Radix Slot maps to explicit link APIs, React fragments/arrays map
  to app/server-owned repeated rows, Next `Image` and remote image URLs map to
  native/local/app-owned image choices, and lucide icons remain presentation
  choices rather than package dependencies.
- After Experiment 18, `item` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `spinner` next.
- Experiment 19 audited all 10 upstream Spinner examples in
  `spinner-example-inventory.md`. Spinner example parity is not complete yet:
  RadCN has strong primitive coverage for standalone `role="status"` semantics
  and CSS-variable customization, but it needs broader docs/fixture/Playwright
  coverage for Button loading rows, Badge loading rows, InputGroup loading
  addons, Empty media, Item loading rows, Progress footer composition, size and
  color matrices, and custom spinner replacement mapping.
- Spinner remains a status/presentation primitive. Upstream lucide
  `LoaderIcon`/`Loader2Icon`, React SVG prop spreading, and Tailwind
  `size-*`/`text-*` utility classes should map to RadCN's package-owned SVG,
  deliberate Remix UI props, app-owned custom icons, and public classes,
  inline styles, or CSS variables rather than package dependencies.
- After Experiment 19, the next recommended implementation cluster is Spinner
  example parity depth.
- Experiment 20 completed Spinner example parity depth without changing the
  Spinner package API. Existing `class`, `style`, `ariaLabel`,
  `--radcn-spinner-size`, and `--radcn-spinner-color` were enough to cover
  upstream size, color, status, and app-owned custom presentation needs.
- Spinner docs, fixtures, and Playwright coverage now prove all 10 upstream
  Spinner example families: badge, basic, button, color, custom, demo, empty,
  input-group, item, and size. The recorded divergences are stable for later
  components: lucide `LoaderIcon`/`Loader2Icon` maps to RadCN's package-owned
  SVG or app-owned custom icons; React SVG prop spreading maps to deliberate
  Remix UI props; Tailwind `size-*`/`text-*` utility classes map to RadCN
  classes, inline styles, or CSS variables; and composed loading state remains
  owned by Button, Badge, InputGroup, Empty, Item, Progress, forms, routes, or
  app code rather than Spinner.
- After Experiment 20, `spinner` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `empty` next.
- Experiment 21 audited all 7 upstream Empty examples in
  `empty-example-inventory.md`. Empty example parity is not complete yet: RadCN
  has the base package slots, default media proof, icon media proof, and one
  Spinner loading composition, but it needs broader docs/fixture/Playwright
  coverage for multi-action default states, icon grids, Avatar media, stacked
  Avatar media, InputGroup/Kbd search composition, support links,
  outline/dashed styling, and muted/background styling.
- Empty remains a layout/content primitive. shadcn `asChild`, lucide icons,
  Tabler icons, Tailwind utility classes, and remote GitHub avatar images
  should map to explicit RadCN link/Button APIs, app-owned glyphs/assets,
  public classes/styles/CSS variables, and local/static/app-owned images rather
  than package dependencies.
- After Experiment 21, the next recommended implementation cluster is Empty
  example parity depth.
- Experiment 22 completed Empty example parity depth without changing the
  Empty package API. Existing `class`, `style`, `EmptyMedia variant`, and
  composition with Avatar, AvatarGroup, Button, InputGroup, Kbd, and native
  anchors were enough to cover the upstream examples.
- Empty docs, fixtures, and Playwright coverage now prove all 7 upstream Empty
  example families: avatar, avatar-group, background, demo, icon, input-group,
  and outline. The recorded divergences are stable for later components:
  shadcn `asChild` maps to explicit `Button href` or native anchors; lucide
  and Tabler icons map to app-owned glyphs/assets; Tailwind utilities map to
  RadCN classes, inline styles, or CSS variables; remote GitHub avatar images
  map to deterministic local/static/app-owned images or AvatarFallback; and
  Empty does not own Avatar, AvatarGroup, Button, InputGroup, Kbd, route, form,
  icon-package, or support-link state.
- After Experiment 22, `empty` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `toggle-group` next.
- Experiment 23 audited all 7 upstream Toggle Group examples in
  `toggle-group-example-inventory.md`. Toggle Group example parity is not
  complete yet: RadCN has strong primitive behavior for single/multiple
  selection, selected state hooks, roving focus, disabled item skip behavior,
  vertical orientation, and custom tokens, but it needs broader docs/fixture/
  Playwright coverage for icon-only groups, icon+label spacing, group-level
  disabled behavior, small/large sizing, outline variants, spacing, and
  selected icon styling.
- Toggle Group remains a native button group plus browser enhancement. React,
  Radix ToggleGroup, lucide icons, Tailwind size utilities, and Tailwind
  selected-state selectors should map to RadCN enhancement, app-owned glyphs,
  public classes/styles/CSS variables, and data-state hooks rather than package
  dependencies.
- After Experiment 23, the next recommended implementation cluster is Toggle
  Group example parity depth.
- Experiment 24 completed Toggle Group example parity depth. RadCN now supports
  group-level `disabled`, `size`, `variant`, and `spacing` while preserving
  item-level overrides, native button output, `aria-pressed`, `data-state`,
  `data-value`, roving focus, and orientation behavior.
- Toggle Group docs, fixtures, and Playwright coverage now prove all 7
  upstream Toggle Group example families: demo, disabled, lg, outline, single,
  sm, and spacing. The recorded divergences are stable for later components:
  React/Radix ToggleGroup maps to RadCN host markup plus explicit browser
  enhancement; lucide icons map to app-owned decorative glyphs; Tailwind icon
  utilities and selected-state selectors map to RadCN classes, inline styles,
  CSS variables, and public `data-state` hooks.
- After Experiment 24, `toggle-group` is marked resolved in the example queue.
  The regenerated inventory recommends example parity for `breadcrumb` next.
- Experiment 25 audited all 6 upstream Breadcrumb examples in
  `breadcrumb-example-inventory.md`. Breadcrumb example parity is not complete
  yet: RadCN has core navigation semantics, native links, current-page
  semantics, collapsed ellipsis, custom separator content, and style hooks, but
  it needs docs/fixture/Playwright depth for shadcn's named link, ellipsis,
  separator, dropdown, demo, and responsive examples.
- Breadcrumb remains a native navigation primitive plus app composition. React
  state, `useMediaQuery`, Next `Link`, Radix Slot, lucide icons, Tailwind
  utilities, DropdownMenu, Drawer, and Button should map to RadCN host markup,
  app-owned state/browser enhancement, composed RadCN primitives, app-owned
  glyphs, public classes/styles/CSS variables, and native links rather than
  Breadcrumb package dependencies.
- After Experiment 25, the next recommended implementation cluster is
  Breadcrumb example parity depth.
- Experiment 26 completed Breadcrumb example parity depth. RadCN now supports
  chevron-style default separators while preserving author-supplied separator
  children, and it proves all six upstream Breadcrumb example families in
  docs, candidate fixtures, and Playwright coverage: demo, dropdown, ellipsis,
  link, responsive, and separator.
- Breadcrumb's stable mappings for later clusters: Next `Link` and shadcn
  `asChild` map to native `BreadcrumbLink href` or app-owned anchors; React
  `useState`/`useMediaQuery` maps to browser enhancement and CSS breakpoint
  classes; Radix Slot is not needed; lucide ChevronRight, MoreHorizontal,
  SlashIcon, and ChevronDownIcon map to package/app-owned glyphs; Tailwind
  truncation, max-width, gap, icon-size, and responsive utilities map to RadCN
  classes, inline styles, or CSS variables.
- After Experiment 26, `breadcrumb` is marked resolved in the example queue.
  The regenerated inventory recommends example parity for `carousel` next.
- Experiment 27 audited all 6 upstream Carousel examples in
  `carousel-example-inventory.md`. Carousel example parity is not complete yet:
  RadCN has strong primitive behavior for region/slide semantics, selected
  state, current/count data hooks, controls, disabled boundaries, keyboard
  movement, native scroll sync, vertical orientation, multiple visible slides,
  compact spacing, and custom tokens, but it needs named docs/fixture/
  Playwright depth for demo, size, spacing, orientation, API status text, and
  autoplay/plugin behavior.
- Carousel remains a native scroll carousel plus browser enhancement. React
  state/effects/context, Embla, `setApi`, `opts`, `plugins`,
  `embla-carousel-autoplay`, lucide icons, Tailwind utilities, and Card
  composition should map to RadCN enhancement, public events/data hooks,
  app-owned browser behavior, package/app-owned glyphs, classes/styles/CSS
  variables, and composed RadCN primitives rather than mandatory Carousel
  package dependencies.
- After Experiment 27, the next recommended implementation cluster is
  Carousel example parity depth.
- Experiment 28 completed Carousel example parity depth. RadCN now proves all
  six upstream Carousel example families in docs, candidate fixtures, and
  Playwright coverage: api, demo, orientation, plugin, size, and spacing.
  Coverage includes Card slide composition, visible current/count status text,
  responsive multi-slide sizing, compact spacing, vertical orientation,
  keyboard behavior, controls, disabled boundaries, deterministic autoplay
  movement, and hover pause/resume.
- Carousel's stable mappings for later clusters: React state/effects/context
  and shadcn `setApi` map to public data hooks, `radcn-carousel-select`,
  `radcn-carousel-scroll`, and app-owned browser state; Embla,
  `useEmblaCarousel`, `opts`, `plugins`, and `embla-carousel-autoplay` are not
  RadCN dependencies; lucide arrows map to package-owned glyphs or app-owned
  control children; Tailwind sizing, spacing, aspect, padding, negative margin,
  and responsive utilities map to RadCN classes, inline styles, or CSS
  variables.
- After Experiment 28, `carousel` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `chart` next.
- Experiment 29 audited all 6 upstream component Chart examples and all 70
  upstream chart gallery examples in `chart-example-inventory.md`. Chart parity
  is not complete yet: RadCN currently covers accessible chart containers,
  single-series vertical bars, single-series lines with points, static legends,
  static tooltips, and custom tokens, but it does not yet cover upstream's full
  bar examples, tooltip anatomy, grid/axis/tick behavior, multi-series
  coordinate systems, horizontal/stacked/negative bars, area charts, pie/donut
  charts, radar charts, radial charts, active states, formatter callbacks, or
  interactive select/range examples.
- Chart's stable mapping decision is that `recharts` remains out of the RadCN
  package dependency graph for this issue. Recharts `ResponsiveContainer`,
  chart family primitives, axes, grids, labels, legends, tooltips, active
  indexes, formatter callbacks, React state/effects, lucide icons, Tailwind
  utilities, and Card composition map to RadCN SVG primitives, CSS variables,
  docs recipes, app-owned state/enhancement, app-owned glyphs, classes/styles,
  and composed RadCN primitives rather than mandatory package dependencies.
- After Experiment 29, the next recommended implementation cluster is Chart
  component example parity depth, covering the six component examples first:
  bar defaults, axes, grid, legend, tooltip, and standalone tooltip anatomy.
- Experiment 30 completed Chart component example parity depth for the 6
  upstream component examples. `radcn/chart` now supports grouped multi-series
  vertical bars in one SVG coordinate system, optional grid lines, optional
  x-axis tick labels, chart config color variables, tooltip label hiding,
  tooltip indicator variants (`dot`, `line`, `dashed`, and hidden), explicit
  formatted values, Card composition proof, docs examples, fixture routes, and
  Playwright coverage.
- Chart remains dependency-free. Recharts `BarChart`, `CartesianGrid`, `XAxis`,
  `ChartTooltipContent`, `ChartLegendContent`, payload objects, formatter
  callbacks, React state/context, lucide callouts, Tailwind utilities, and Card
  framing map to RadCN SVG primitives, explicit props, app-authored formatted
  values, app-owned presentation, CSS/classes, and composition rather than
  package dependencies.
- After Experiment 30, `chart` is marked resolved in the example queue only.
  The 70 upstream chart gallery examples remain unresolved in the `charts`
  queue. The regenerated inventory recommends example parity for `input` next.
- Experiment 31 audited all 6 upstream plain Input examples in
  `input-example-inventory.md`. Input example parity is not complete yet:
  RadCN already supports email placeholders, disabled state, Label wiring,
  Button composition, description wiring through Field/Form patterns, and
  native control styling, but `radcn/input` does not yet support `type="file"`
  and the Input docs/fixtures need named proof for demo, disabled, file,
  with-button, with-label, and with-text examples.
- Input's stable mapping decisions for later work: shadcn Tailwind layout
  utilities map to docs/fixture layout or CSS variables; Label, Button, and
  description composition remain owned by `radcn/label`, `radcn/button`,
  `radcn/field`, forms, or docs examples rather than by `Input`; file input
  parity should extend the typed `InputType` surface and package CSS instead of
  adding a separate component.
- After Experiment 31, the next recommended implementation cluster is Input
  example parity depth.
- Experiment 32 completed Input example parity depth for all 6 plain upstream
  examples. `radcn/input` now supports `type="file"`, file inputs render without
  `role="textbox"`, file selector styling is CSS-native, the docs page renders
  stable named examples for demo, disabled, file, with-button, with-label, and
  with-text, and focused candidate fixtures plus Playwright tests prove the
  same behavior.
- Adding `file` to `InputType` revealed that `InputGroupInput` had extended
  `InputProps`; the implementation added a type-only exclusion so InputGroup
  keeps its existing non-file grouped-input surface while plain Input gains file
  support. This is a useful guard for future shared prop reuse.
- After Experiment 32, `input` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `toggle` next.
- Experiment 33 audited all 6 upstream plain Toggle examples in
  `toggle-example-inventory.md`. Toggle example parity is not complete yet:
  RadCN already supports the core primitive behavior for pressed state,
  disabled state, `ariaLabel`, `size="sm"`, `size="lg"`, `variant="outline"`,
  text children, arbitrary children, and class/style hooks, but the docs,
  fixtures, and Playwright tests need named proof for demo, disabled, lg,
  outline, sm, and with-text examples.
- Toggle's stable mapping decisions for later work: Radix Toggle maps to
  RadCN's native button plus enhancement; lucide icons are app presentation;
  Tailwind selected-state utilities map to `data-state` plus app CSS/classes;
  icon-only toggles need `ariaLabel`; icon plus text toggles keep icons
  decorative and text visible.
- After Experiment 33, the next recommended implementation cluster is Toggle
  example parity depth.
- Experiment 34 completed Toggle example parity depth for all 6 plain upstream
  examples. The docs page now has stable named examples for demo, disabled, lg,
  outline, sm, and with-text; candidate fixtures expose matching routes; and
  Playwright proves accessible names, size/variant evidence, disabled behavior,
  decorative icons, visible text, and selected-state bookmark icon styling.
- Toggle remains dependency-free: Radix Toggle, lucide icons, Tailwind selected
  selectors, and vendor source map to RadCN native button behavior, app-owned
  glyph spans, `data-state`, public classes, CSS variables, and docs/fixture
  composition. A small `.radcn-toggle-icon` style hook was added so app-authored
  selected-state icon styling does not reuse ToggleGroup-specific classes.
- After Experiment 34, `toggle` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `kbd` next.
- Experiment 35 audited all 5 upstream Kbd examples in
  `kbd-example-inventory.md`. Kbd example parity is not complete yet: RadCN
  already supports semantic `Kbd` and `KbdGroup` primitives and basic
  Cmd/K-style fixture proof, but docs, fixtures, and Playwright tests need
  named proof for Button, demo groups, inline prose, InputGroup, and Tooltip
  examples.
- Kbd's stable mapping decisions for later work: shadcn `data-slot` maps to
  RadCN data hooks/classes; Tailwind layout and tooltip-context utilities map
  to docs/fixture layout, classes, or CSS variables; lucide Search icons are
  app presentation; `TooltipTrigger asChild` maps to explicit RadCN trigger
  composition; Button, ButtonGroup, InputGroup, and Tooltip keep ownership of
  their own behavior.
- After Experiment 35, the next recommended implementation cluster is Kbd
  example parity depth.
- Experiment 36 completed Kbd example parity depth. The docs page, candidate
  fixtures, and Playwright checks now cover all 5 upstream Kbd examples:
  Button composition, multiple KbdGroup rows, inline prose, InputGroup addon
  composition, and TooltipContent/ButtonGroup composition.
- Kbd remains a semantic shortcut primitive. shadcn `data-slot` maps to RadCN
  public hooks, Tailwind context styling maps to RadCN classes/CSS variables,
  lucide Search maps to app-owned decorative presentation, and
  `TooltipTrigger asChild` maps to explicit RadCN TooltipTrigger composition.
- Because RadCN `KbdGroup` currently renders a `div`, inline-prose examples
  must use valid wrapper markup instead of nesting `KbdGroup` inside a native
  `p`; otherwise the browser reparents the groups and tests no longer prove the
  intended composition.
- Experiment 37 audited all 10 upstream New York v4 textarea-related examples
  in `textarea-example-inventory.md`. Field, InputGroup, and Form textarea
  variants are already covered by prior clusters, including the form-library
  dependency divergences for React Hook Form, TanStack Form, Formisch, Zod,
  Valibot, Sonner toast, and app-owned icons.
- Textarea example parity is still incomplete at the named plain Textarea
  example level. The next implementation cluster should add docs, fixtures, and
  Playwright proof for `textarea-demo`, `textarea-disabled`,
  `textarea-with-button`, `textarea-with-label`, and `textarea-with-text`.
- Experiment 38 completed Textarea example parity depth. The docs page,
  candidate fixtures, and Playwright checks now cover all 5 plain upstream
  Textarea examples, while prior Field, InputGroup, and Form outcomes continue
  to cover the other 5 textarea-related examples.
- Textarea remains a native control primitive. shadcn `data-slot` maps to RadCN
  public hooks, Tailwind utility styling maps to RadCN classes/CSS variables,
  React prop spreading maps to explicit Remix UI props, and autosize,
  form-library, toast, icon, helper-text, Button, Label, Field, Form, and
  InputGroup behavior remains app-owned or owned by the composing packages.
- Experiment 39 generated `toast-example-inventory.md` for the five deprecated
  shadcn `toast` examples. RadCN has the needed notification primitives for
  title+description toasts, actions, server-rendered initial state, no-JS
  initial state, Button-triggered browser events, dismiss behavior, and
  accessible `status`/`alert` roles, but the deprecated toast example cluster
  remains partial because named docs/fixture/Playwright evidence is missing and
  `toast-simple` is description-only while RadCN currently requires `title`.
  The next toast experiment should decide and implement description-only
  payload behavior, map shadcn `destructive` to RadCN `type: "error"`, and add
  explicit deprecated toast example coverage without conflating this cluster
  with the separate unresolved `sonner` examples.
- Experiment 40 completed deprecated toast example parity depth. RadCN now
  supports description-only toast payloads, maps shadcn destructive toast
  behavior to `type: "error"`, and has named docs, fixture, and Playwright
  evidence for `toast-demo`, `toast-destructive`, `toast-simple`,
  `toast-with-action`, and `toast-with-title`. `sonner` remains a separate
  unresolved current-upstream notification cluster, and the regenerated parity
  inventory now recommends auditing `badge` examples next.
- Experiment 41 generated `badge-example-inventory.md` for the four upstream
  Badge examples. RadCN already supports the primitive variants, public hooks,
  href rendering, custom classes/styles, and arbitrary children needed for the
  upstream examples, but Badge example parity remains partial because named
  docs/fixture/Playwright evidence is missing for `badge-demo`,
  `badge-destructive`, `badge-outline`, and `badge-secondary`, and the richer
  demo still needs explicit icon and compact count/pill proof.
- Experiment 42 completed Badge example parity depth without changing the Badge
  package API. The docs page, candidate fixtures, and Playwright tests now prove
  `badge-demo`, `badge-destructive`, `badge-outline`, and `badge-secondary`,
  including app-owned icon content, custom class/style color overrides, compact
  numeric/count pill badges, public hooks, and variant labels. Badge icon and
  count presentation remains app-owned composition through children, `class`,
  `style`, CSS variables, and app CSS; RadCN still does not depend on React,
  `lucide-react`, Tailwind, or vendor source. The regenerated parity inventory
  now recommends auditing `combobox` examples next.
- Experiment 43 generated `combobox-example-inventory.md` for the four upstream
  Combobox examples in the active parity cluster. RadCN's Combobox primitive is
  strong, but example parity remains partial because the docs, candidate
  fixtures, and Playwright tests do not yet prove named coverage for
  `combobox-demo`, `combobox-dropdown-menu`, `combobox-popover`, and
  `combobox-responsive`. The next experiment should implement those named
  examples by composing existing RadCN Combobox, Command, Dropdown Menu,
  Popover, Drawer, and Button primitives, with app-owned label/state behavior
  and no React, `lucide-react`, Tailwind, `useMediaQuery`, or vendor dependency.
- Experiment 44 completed Combobox example parity depth without changing the
  Combobox package API. The docs page, candidate fixtures, and Playwright tests
  now prove `combobox-demo`, `combobox-dropdown-menu`, `combobox-popover`, and
  `combobox-responsive`, including searchable framework selection, a searchable
  Dropdown Menu label submenu, a side-positioned status Popover, desktop
  Popover/mobile Drawer responsive branches, app-owned label persistence,
  close-after-select behavior, and public hooks. `combobox-form` remains
  adjacent Form/Combobox evidence outside the active four-example cluster.
  RadCN still does not depend on React, `lucide-react`, Tailwind,
  `useMediaQuery`, or vendor source. The regenerated parity inventory now
  recommends auditing `dropdown-menu` examples next.
- Experiment 45 generated `dropdown-menu-example-inventory.md` for the four
  upstream Dropdown Menu examples in the active parity cluster. RadCN's
  Dropdown Menu primitive is strong, covering trigger semantics, menu roles,
  portal movement, labels, groups, separators, shortcuts, disabled items,
  destructive variants, checkbox items, radio groups/items, submenus, roving
  focus, typeahead, pointer highlight, close-on-select, collision/stage
  clamping, and public hooks. Example parity remains partial because the docs,
  candidate fixtures, and Playwright tests do not yet prove named coverage for
  `dropdown-menu-checkboxes`, `dropdown-menu-demo`, `dropdown-menu-dialog`, and
  `dropdown-menu-radio-group`. The next experiment should implement those named
  examples without changing the Dropdown Menu package API unless a concrete
  package-level gap appears.
- Experiment 46 completed Dropdown Menu example parity depth. The docs page,
  candidate fixtures, and Playwright tests now prove
  `dropdown-menu-checkboxes`, `dropdown-menu-demo`, `dropdown-menu-dialog`, and
  `dropdown-menu-radio-group`, including dense account menus, shortcut text,
  disabled items, submenu pointer/keyboard behavior, checkbox/radio state,
  non-modal menu behavior, and menu-to-dialog composition with Field, Input,
  and Textarea. Implementation uncovered and fixed a package-level positioning
  blocker: `setupMenuOverlay` now reads `DropdownMenuContent` data attributes
  for `align`, `side`, and `sideOffset` instead of always using setup defaults.
  RadCN still does not depend on React, Radix, `lucide-react`, Tailwind, or
  vendor source. The regenerated parity inventory now recommends auditing
  `input-otp` examples next.
- Experiment 47 generated `input-otp-example-inventory.md` for the four
  upstream Input OTP examples in the active parity cluster. RadCN's Input OTP
  primitive is strong, covering max length, slot groups, separators, slot
  character mirroring, active slot/caret state, pattern filtering, paste
  filtering, keyboard movement, disabled/invalid state, native form
  submission/reset, controlled/default value rendering, custom hooks, and
  dependency-free enhancement. Example parity remains partial because the docs,
  candidate fixtures, and Playwright tests do not yet prove named coverage for
  `input-otp-controlled`, `input-otp-demo`, `input-otp-pattern`, and
  `input-otp-separator`. The next experiment should implement those named
  examples without changing the Input OTP package API unless a concrete
  package-level gap appears.
- Experiment 48 completed Input OTP example parity depth. The docs page,
  candidate fixtures, and Playwright tests now prove
  `input-otp-controlled`, `input-otp-demo`, `input-otp-pattern`, and
  `input-otp-separator`, including 3-3 and 2-2-2 slot layouts, separators,
  alphanumeric pattern filtering, active slot state, controlled entered-value
  feedback, native input value ownership, and public hooks. Implementation
  uncovered and fixed a package-level pattern blocker: alphanumeric patterns
  containing both `0-9` and `A-Za-z` now accept letters instead of being
  treated as digit-only. RadCN still does not depend on React, upstream
  `input-otp`, Radix, `lucide-react`, Tailwind, or vendor source. The
  regenerated parity inventory now recommends auditing `native-select`
  examples next.
- Experiment 49 audited Native Select example parity in
  `native-select-example-inventory.md`. RadCN already has strong package,
  docs route, candidate fixture, reference fixture, and Playwright evidence
  for real native select/option/optgroup semantics, wrapper and select hooks,
  default and small sizes, disabled state, invalid ARIA state, native value
  selection, form submission/reset, required validation, custom tokens, and
  option/optgroup Canvas colors. The active upstream examples remain partially
  covered because docs, fixtures, and tests do not yet prove the four named
  example ids with complete upstream option sets: `native-select-demo`,
  `native-select-disabled`, `native-select-groups`, and
  `native-select-invalid`. The next experiment should implement those named
  examples without changing the Native Select package API unless a concrete
  package-level gap appears.
- Experiment 50 completed Native Select example parity depth. The docs page
  now renders stable `data-radcn-docs-native-select-family` hooks for
  `native-select-demo`, `native-select-disabled`, `native-select-groups`, and
  `native-select-invalid` with complete upstream option sets and mapping copy.
  Candidate fixtures and Playwright coverage prove the named status, disabled
  priority, grouped department, and invalid role examples while preserving the
  generic Native Select tests. `native-select-example-inventory.md` now marks
  all four rows `Covered`, `resolved-clusters.json` records `native-select` as
  resolved, and the regenerated parity inventory recommends auditing
  `resizable` examples next. No Native Select package API change was needed.
- Experiment 51 audited Resizable example parity in
  `resizable-example-inventory.md`. RadCN already has strong package, docs
  route, candidate fixture, reference fixture, and Playwright evidence for
  horizontal and vertical orientation, semantic separator handles, ARIA
  orientation/value attributes, keyboard resizing, pointer resizing,
  `radcn-resizable-change` events, visible handle grips, default/min size
  props, and custom tokens. The active upstream examples remain partially
  covered because docs, fixtures, and tests do not yet prove the four named
  example ids with nested group composition, exact labels, 25/75 sizes where
  required, and handle-grip variants: `resizable-demo`,
  `resizable-demo-with-handle`, `resizable-handle`, and
  `resizable-vertical`. The next experiment should implement those named
  examples without changing the Resizable package API unless a concrete
  package-level gap appears.
- Experiment 52 completed Resizable example parity depth. The package needed
  one narrow nested-composition fix: `setupResizableGroup()` now enhances only
  direct child panels and handles, so outer groups no longer claim nested group
  panels/handles while public Resizable APIs remain unchanged. Docs and
  candidate fixtures now render the four named upstream examples with stable
  `data-radcn-docs-resizable-family` hooks, nested horizontal/vertical groups,
  plain and visible-grip handles, 50/50 and 25/75 default sizes, separator ARIA,
  keyboard resizing, `radcn-resizable-change` behavior, and mapping copy for
  shadcn React props, `react-resizable-panels`, `GripVerticalIcon`,
  `lucide-react`, Tailwind, `className`, `data-slot`, public hooks, and
  RadCN's dependency-free enhancement model. `resizable-example-inventory.md`
  now marks all four rows `Covered`, `resolved-clusters.json` records
  `resizable` as resolved, and the regenerated parity inventory recommends
  auditing `checkbox` examples next.
- Experiment 53 audited Checkbox example parity in
  `checkbox-example-inventory.md`. RadCN already has strong package and fixture
  coverage for native checkbox semantics, checked/unchecked/disabled/invalid/
  indeterminate states, labels, descriptions as app-owned composition, form
  submission/reset, public wrapper/input/indicator hooks, state hooks, and
  custom classes/styles/tokens. The active upstream examples remain partially
  covered because docs, candidate fixtures, and Playwright tests do not yet
  prove the three named upstream example ids and exact compositions:
  `checkbox-demo`, `checkbox-disabled`, and `checkbox-with-text`. The next
  experiment should implement those named examples without changing the
  Checkbox package API unless a concrete package-level gap appears.
- Experiment 54 completed Checkbox example parity depth. The docs page now
  renders stable `data-radcn-docs-checkbox-family` hooks for `checkbox-demo`,
  `checkbox-disabled`, and `checkbox-with-text` with upstream label and
  description copy, disabled state, checked and unchecked states, card-like
  checked composition, custom checked styling, public hooks, and mapping copy.
  Candidate fixtures and Playwright coverage prove the named demo, disabled,
  and with-text examples while preserving generic Checkbox behavior tests.
  `checkbox-example-inventory.md` now marks all three rows `Covered`,
  `resolved-clusters.json` records `checkbox` as resolved, and the regenerated
  parity inventory recommends auditing `date-picker` examples next. No
  Checkbox package API change was needed.
- Experiment 55 audited Date Picker example parity in
  `date-picker-example-inventory.md`. RadCN already has strong package,
  fixture, and Playwright coverage for single selection, range selection,
  preset selection, trigger label formatting, placeholder state, Popover/
  Calendar coordination, two-month range display, hidden input submission,
  form reset, disabled state, public hooks, and dependency-free enhancement.
  The active upstream examples remain partially covered because docs,
  candidate fixtures, and Playwright tests do not yet prove the three named
  upstream example ids and exact compositions: `date-picker-demo`,
  `date-picker-with-presets`, and `date-picker-with-range`. The next
  experiment should implement those named examples without changing the Date
  Picker package API unless a concrete package-level gap appears.
- Experiment 56 completed Date Picker example parity depth. The docs page now
  renders stable `data-radcn-docs-date-picker-family` hooks for
  `date-picker-demo`, `date-picker-with-presets`, and
  `date-picker-with-range` with placeholder, presets, formatted labels,
  two-month range rendering, hidden inputs, public hooks, and mapping copy.
  Candidate fixtures and Playwright coverage prove the named demo, presets,
  and range examples while preserving generic Date Picker behavior tests.
  `date-picker-example-inventory.md` now marks all three rows `Covered`,
  `resolved-clusters.json` records `date-picker` as resolved, and the
  regenerated parity inventory recommends auditing `alert` examples next. No
  Date Picker package API change was needed.
- Experiment 57 audited Alert example parity in
  `alert-example-inventory.md`. RadCN already has package, docs, fixture, and
  Playwright evidence for default/destructive variants, `role="alert"`,
  title/description parts, action composition, public hooks, custom classes/
  styles/tokens, and app-owned icon composition. The active upstream examples
  remain partially covered because docs, candidate fixtures, and tests do not
  yet prove the two named upstream example ids and exact compositions:
  `alert-demo` and `alert-destructive`. The next experiment should implement
  those named examples without changing the Alert package API unless a concrete
  package-level gap appears.
- Experiment 58 completed Alert example parity depth. The docs page now renders
  stable `data-radcn-docs-alert-family` hooks for `alert-demo` and
  `alert-destructive` with exact upstream copy, three demo Alert compositions,
  destructive variants, paragraph/list content, app-owned icon hooks, public
  Alert hooks, and mapping copy. Candidate fixtures and Playwright coverage
  prove the named demo and destructive examples while preserving generic Alert
  behavior tests. `alert-example-inventory.md` now marks both rows `Covered`,
  `resolved-clusters.json` records `alert` as resolved, and the regenerated
  parity inventory recommends auditing `calendar` examples next. No Alert
  package API change was needed.
- Experiment 59 audited Calendar example parity in
  `calendar-example-inventory.md`. RadCN already has strong package, fixture,
  and Playwright coverage for Gregorian calendar grid semantics, selected
  state, hidden form values, accessible day names, keyboard and pointer
  selection, month navigation, outside days, disabled dates, range hooks,
  multi-month display, public hooks, and token customization. The active
  upstream examples remain partially covered because docs, candidate fixtures,
  and tests do not yet prove the named `calendar-demo` example, RadCN does not
  currently implement or document `captionLayout="dropdown"` parity, and
  `calendar-hijri` needs an explicit support-or-divergence decision for
  Persian/Hijri rendering without adopting React, `react-day-picker/persian`,
  `next/font`, `lucide-react`, Tailwind, or vendor dependencies.
- Experiment 60 completed Calendar example parity depth. `radcn/calendar` now
  supports dependency-free `captionLayout="dropdown"` month/year controls while
  preserving label captions as the default, previous/next navigation, selected
  state, hidden input values, keyboard/pointer selection, range behavior,
  multi-month rendering, form reset, public hooks, and Date Picker composition.
- `calendar-demo` is now covered by named docs, candidate fixtures, and
  Playwright evidence. `calendar-hijri` is recorded as an intentional
  divergence: alternate Persian/Hijri calendar engines, `Vazirmatn`/font
  loading, RTL chevron behavior, and icon presentation remain app-owned recipes
  that may reuse RadCN tokens and hooks without adding `react-day-picker`,
  `react-day-picker/persian`, `next/font`, `lucide-react`, Tailwind, or vendor
  dependencies to RadCN.
- After Experiment 60, `calendar` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `card` next.
- Experiment 61 audited Card example parity in `card-example-inventory.md`.
  `radcn/card` already has the root, header, title, description, action,
  content, footer, public hooks, sizing, custom styling hooks, and composition
  surfaces needed for the active upstream examples. The cluster remains partial
  because docs, candidate fixtures, and Playwright tests do not yet prove the
  named `card-demo` login/account card or `card-with-form` project card with
  their copy, form structure, width/layout styling, Button variants, Input
  types, and Select composition.
- Experiment 62 completed Card example parity depth without changing the Card
  package API. The docs page and candidate fixtures now prove named
  `card-demo` and `card-with-form` examples with CardAction, login/account
  copy, project form copy, native forms, labelled inputs, input types, required
  semantics, Select composition, Button variants, width/layout styling, public
  hooks, and mapping copy. `card-demo.json`'s stale Switch dependency remains
  recorded as registry metadata drift because the current upstream source does
  not render Switch.
- After Experiment 62, `card` is marked resolved in the example queue. The
  regenerated inventory recommends example parity for `command` next.
- Experiment 63 audited Command example parity in
  `command-example-inventory.md`. RadCN already has package, fixture, and
  Playwright evidence for root/input/list/empty/items/separators/shortcuts,
  filtering, keyboard movement, activation events, disabled items, checked and
  selected indicators, dialog composition, public hooks, and token
  customization. The cluster remains partial because docs, fixtures, and tests
  do not yet prove the named `command-demo` and `command-dialog` examples,
  visible group headings/labels, exact upstream rows/copy, app-owned icon
  composition, app-owned `⌘J`/`Ctrl+J` shortcut guidance, and dialog opening
  behavior. The next experiment should implement those named examples without
  adding React, `cmdk`, `lucide-react`, Tailwind, `cn`, or vendor dependencies.
- Experiment 64 completed Command example parity depth. `radcn/command` now
  supports `CommandGroup heading` with visible
  `data-radcn-command-group-heading` hooks and optional `aria-labelledby`
  wiring through explicit group ids. The docs page and candidate fixtures now
  prove named `command-demo` and `command-dialog` examples with upstream rows,
  visible group headings, empty copy, disabled/enabled Calculator differences,
  app-owned icon hooks, shortcut hints, RadCN Kbd guidance, app-owned
  `⌘J`/`Ctrl+J` dialog opening, dialog role/title/description, Escape close,
  public hooks, and mapping copy. `command-example-inventory.md` now marks both
  rows `Covered`, `resolved-clusters.json` records `command` as resolved, and
  the regenerated parity inventory recommends example parity for `dialog` next.
- Experiment 65 audited Dialog example parity in
  `dialog-example-inventory.md`. RadCN already covers Dialog-owned modal
  behavior: trigger opening, portal/overlay/content parts, roles and ARIA
  relationships, focus movement/trap/restoration, Escape and outside dismissal,
  scroll lock, default open state, explicit/default close actions, public hooks,
  and custom classes/styles/tokens. The cluster remains partial because docs,
  fixtures, and tests do not yet prove the named `dialog-demo` and
  `dialog-close-button` upstream compositions: edit-profile form copy/default
  values/footer actions and share-link sr-only label/read-only input/secondary
  close action.
- Experiment 66 resolved Dialog example parity. Docs, candidate fixtures, and
  Playwright now prove named `dialog-demo` and `dialog-close-button` examples
  with exact upstream copy, edit-profile form composition, labelled/default
  inputs, share-link sr-only label/read-only input, footer actions, sizing and
  alignment evidence, public hooks, and mapping copy. The implementation found
  and fixed a package styling gap by adding `radcn-dialog-close--icon` for the
  generated default close button, so footer `DialogClose` actions are no longer
  positioned as top-right icon closes. `dialog-example-inventory.md` marks both
  rows `Covered`, `resolved-clusters.json` records `dialog` as resolved, and
  the regenerated parity inventory recommends example parity for `drawer` next.
- Experiment 67 audited Drawer example parity in
  `drawer-example-inventory.md`. RadCN already covers Drawer-owned
  modal/edge-panel behavior: trigger opening, portal/overlay/content parts,
  handle, roles and ARIA relationships, trigger expanded/controls state, focus
  movement/trap/restoration, Escape and outside dismissal, scroll lock,
  default open state, directions, drag dismissal, scrollable content, explicit
  close actions, public hooks, and custom classes/styles/tokens. The cluster
  remains partial because docs, fixtures, and tests do not yet prove the named
  `drawer-demo` and `drawer-dialog` upstream compositions: Move Goal
  counter/chart behavior and responsive Dialog/Drawer edit-profile form
  branching.
- Experiment 68 resolved Drawer example parity. Docs, candidate fixtures, and
  Playwright now prove named `drawer-demo` and `drawer-dialog` examples with
  exact upstream copy, Move Goal layout, goal value, accessible
  Decrease/Increase controls, deterministic min/max disabled state evidence,
  dependency-free chart bars as the Recharts substitute, Submit/Cancel actions,
  responsive Dialog/Drawer branch evidence, shared edit-profile form fields,
  default values, public hooks, close/focus behavior, and mapping copy. No
  Drawer package API change was needed. `drawer-example-inventory.md` marks both
  rows `Covered`, `resolved-clusters.json` records `drawer` as resolved, and
  the regenerated parity inventory recommends example parity for `scroll-area`
  next.
- Experiment 69 audited Scroll Area example parity in
  `scroll-area-example-inventory.md`. RadCN already covers Scroll Area-owned
  root, viewport, native vertical/horizontal scrolling, focus-visible viewport,
  vertical/horizontal scrollbar hooks, thumb hooks, corner hooks, custom
  classes/styles/tokens, and Separator composition as a separate package. The
  cluster remains partial because docs, fixtures, and tests do not yet prove
  the named `scroll-area-demo` and `scroll-area-horizontal-demo` upstream
  compositions: the 50-tag `Tags` list with separators and the horizontal
  artwork strip with figure/figcaption/image semantics.
- Experiment 70 resolved Scroll Area example parity. Docs, candidate fixtures,
  and Playwright now prove named `scroll-area-demo` and
  `scroll-area-horizontal-demo` examples with exact `Tags` heading, 50 beta tag
  rows, first/last ordering, Separator composition, native vertical scrolling,
  three artwork figures, artist captions, image alt/dimension/aspect evidence,
  deterministic non-network data images, native horizontal scrolling,
  horizontal scrollbar/thumb/corner hooks, public hooks, and mapping copy. No
  Scroll Area package API change was needed. `scroll-area-example-inventory.md`
  marks both rows `Covered`, `resolved-clusters.json` records `scroll-area` as
  resolved, and the regenerated parity inventory recommends example parity for
  `select` next.
- Experiment 71 audited Select example parity in
  `select-example-inventory.md`. RadCN already covers Select-owned root,
  trigger/value, portal/content/viewport, groups/labels/items, selected
  indicators, hidden inputs, keyboard navigation, typeahead, disabled skip
  behavior, scroll buttons, scrollable viewport behavior, popper placement,
  custom tokens, and form reset behavior. The cluster remains partial because
  docs, fixtures, and tests do not yet prove the named `select-demo` and
  `select-scrollable` upstream compositions: the fruit option set with `Fruits`
  label and the full timezone grouped scrollable list. The next experiment
  should implement named docs examples, candidate fixture routes, and Playwright
  coverage for `select-demo` and `select-scrollable`.
- Experiment 72 resolved Select example parity. Docs, candidate fixtures, and
  Playwright now prove named `select-demo` and `select-scrollable` examples
  with exact placeholders, trigger width evidence, `Fruits` label, five fruit
  options/values, five timezone group labels, all 27 timezone options/values,
  scroll buttons, scrollable viewport behavior, typeahead selection, selected
  indicators, hidden values, public hooks, and mapping copy. No Select package
  API change was needed. `select-example-inventory.md` marks both rows
  `Covered`, `resolved-clusters.json` records `select` as resolved, and the
  regenerated parity inventory recommends example parity for `sheet` next.
- Experiment 73 audited Sheet example parity in
  `sheet-example-inventory.md`. RadCN already covers Sheet-owned root, trigger,
  portal, overlay, content, side variants, header/title/description/footer,
  close controls, modal ARIA wiring, focus trap, focus restoration, Escape and
  overlay dismissal, body scroll lock, custom tokens, and generic side
  placement tests. The cluster remains partial because docs, fixtures, and
  tests do not yet prove the named `sheet-demo` and `sheet-side` upstream
  compositions: profile form copy, two labelled inputs with Pedro Duarte values,
  `Open`/side triggers, footer close actions, and one four-side example.
- Experiment 74 resolved Sheet example parity. Docs, candidate fixtures, and
  Playwright now prove named `sheet-demo` and `sheet-side` examples with exact
  profile copy, labelled Pedro Duarte inputs, `Open` and four side triggers,
  footer actions, all side values, modal ARIA/focus behavior, close behavior,
  public Sheet hooks, and mapping copy. The package needed one narrow styling
  fix: only the default direct child Sheet close button is absolutely
  positioned, so authored `SheetClose` controls inside footers behave like
  normal buttons. `sheet-example-inventory.md` marks both rows `Covered`,
  `resolved-clusters.json` records `sheet` as resolved, and the regenerated
  parity inventory recommends auditing `skeleton` examples next.
- Experiment 75 audited Skeleton example parity in
  `skeleton-example-inventory.md`. RadCN already covers Skeleton-owned hidden
  placeholder semantics, `data-radcn-skeleton`, pulse animation, base
  radius/background styling, and custom class/style hooks. The cluster remains
  partial because docs, fixtures, and tests do not yet prove the named
  `skeleton-card` and `skeleton-demo` upstream compositions with exact media,
  avatar, and text-line dimensions/shapes. No package API change appears
  necessary; the next experiment should implement named docs examples,
  candidate fixture routes, and Playwright coverage for both upstream examples.
- Experiment 76 resolved Skeleton example parity. Docs, candidate fixtures, and
  Playwright now prove named `skeleton-card` and `skeleton-demo` examples with
  exact media, avatar, and text-line dimensions, rounded-xl and rounded-full
  shapes, `aria-hidden`, `data-radcn-skeleton`, pulse animation, public hooks,
  and mapping copy. No Skeleton package API change was needed; fixed
  dimensions, layout wrappers, Tailwind utilities, `className`, `data-slot`,
  `cn`, React props, and vendor source remain app/docs mappings.
  `skeleton-example-inventory.md` marks both rows `Covered`,
  `resolved-clusters.json` records `skeleton` as resolved, and the regenerated
  parity inventory recommends auditing `sonner` examples next.
- Experiment 77 audited Sonner example parity in
  `sonner-example-inventory.md`. RadCN already covers Toaster-owned
  notification rendering, accessible regions, status/alert roles, aria-live
  behavior, initial toasts, event-dispatched toasts, default/success/error/
  loading variants, action and dismiss controls, stacks, custom tokens, and
  dependency absence for React/Sonner/next-themes. The cluster remains partial
  because docs, fixtures, and tests do not yet prove the named `sonner-demo`
  and `sonner-types` upstream Button trigger compositions, exact messages,
  action label, all six type triggers, or promise-loading flow.
- Experiment 78 resolved Sonner example parity for `sonner-demo` and
  `sonner-types`. Docs, candidate fixtures, and Playwright now prove exact
  Button trigger labels, exact upstream notification messages, date
  description, `Undo` action label, default/success/info/warning/error/loading
  data-type hooks, status/alert role semantics, public Toaster/toast/action
  hooks, and dependency absence. `toast.promise` maps to app-owned orchestration
  rather than a package API: apps dispatch `Loading...`, then dispatch
  `Event has been created` or `Error` from their own promise branch. No
  package API or metadata change was needed; React handlers, Sonner APIs,
  next-themes, lucide icons, Tailwind utilities, `className`, `data-slot`,
  `cn`, action callbacks, custom tokens, and vendor source remain documented
  mappings or app-owned concerns. `sonner-example-inventory.md` marks both rows
  `Covered`, `resolved-clusters.json` records `sonner` as resolved, and the
  regenerated parity inventory recommends auditing `accordion` examples next.
- Experiment 79 audited Accordion example parity in
  `accordion-example-inventory.md`. RadCN already covers the Accordion package
  API, native details/summary disclosure semantics, single and multiple modes,
  collapsible behavior, disabled items, keyboard toggling, public data hooks,
  icon hooks, and custom token styling without React, Radix, or lucide
  dependencies. The cluster remains partial because docs, fixtures, and tests
  do not yet prove the named upstream `accordion-demo` composition with
  `defaultValue="item-1"`, values `item-1`/`item-2`/`item-3`, exact
  `Product Information`, `Shipping Details`, and `Return Policy` triggers,
  the two exact paragraphs under each item, full-width styling, or flex/gap/
  text-balance content layout mapping. The audit also found a current RadCN
  Accordion limitation: root `defaultValue` and `name` are metadata hooks only;
  item `open` and shared item `name` must still be passed explicitly for
  server-rendered default state and native single-group behavior. The next
  experiment should implement named `accordion-demo` docs, candidate fixture,
  and Playwright coverage, and explicitly decide whether that explicit
  item-level mapping is the intended RadCN model or whether a package
  enhancement is needed.
- Experiment 80 resolved Accordion example parity for `accordion-demo`.
  Docs, candidate fixtures, and Playwright now prove the exact upstream
  product, shipping, and return policy trigger labels; values
  `item-1`/`item-2`/`item-3`; six exact paragraph bodies; first-open state;
  single collapsible behavior; full-width root styling; flex/gap/text-balance
  content layout mapping; public root/item/trigger/content/icon hooks; and
  the explicit RadCN mapping where root `defaultValue`/`name` are metadata and
  item `open`/matching `name` props own server-rendered state and native
  grouping. No package API or dependency change was needed. React, Radix,
  lucide, `cn`, `data-slot`, `className`, Tailwind utilities, animation
  utilities, disabled styling, and vendor source remain dependency-free
  mappings. `accordion-example-inventory.md` marks `accordion-demo` `Covered`,
  `resolved-clusters.json` records `accordion` as resolved, and the regenerated
  parity inventory recommends auditing `alert-dialog` examples next.
- Experiment 81 audited Alert Dialog example parity in
  `alert-dialog-example-inventory.md`. RadCN already covers alertdialog role,
  aria-modal, title/description wiring, focus trapping, non-dismissible
  Escape/overlay behavior, action/cancel close behavior, default-open state,
  size, portals, overlays, content, header/footer parts, custom tokens, and
  body scroll locking without React or Radix dependencies. The cluster remains
  partial because docs, fixtures, and tests do not yet prove the named upstream
  `alert-dialog-demo` composition with an outline `Show Dialog` trigger,
  `Are you absolutely sure?` title, exact account deletion description,
  `Cancel` and `Continue` controls, no media block, or the Button `asChild`
  trigger mapping. The next experiment should implement named
  `alert-dialog-demo` docs, candidate fixture, and Playwright coverage.
- Experiment 82 resolved Alert Dialog example parity for `alert-dialog-demo`.
  Docs, candidate fixtures, and Playwright now prove the exact upstream
  `Show Dialog` outline trigger, `Are you absolutely sure?` title, account
  deletion description, `Cancel` and `Continue` controls, no media block,
  portal/overlay/content/header/footer/title/description/action/cancel hooks,
  alertdialog role, aria-modal, ARIA title/description wiring, non-dismissible
  Escape/overlay behavior, body scroll locking, and action/cancel close with
  focus return. The upstream `AlertDialogTrigger asChild` plus Button
  `variant="outline"` composition maps to `AlertDialogTrigger` styled with
  `radcn-button radcn-button--outline`; no Slot, Radix, React, Tailwind, `cn`,
  or package-level Button wrapper was needed. Preserving upstream footer order
  makes Cancel the first focused control in the named destructive confirmation,
  with Tab moving to Continue. The regenerated parity inventory recommends
  auditing `aspect-ratio` examples next.
- Experiment 83 audited Aspect Ratio example parity in
  `aspect-ratio-example-inventory.md`. RadCN already covers dependency-free
  CSS aspect-ratio layout, default 16:9 sizing, custom 1:1 sizing, overflow
  clipping, border radius, muted background, full-size direct children, public
  root hooks, class/style customization, and generic docs coverage. The cluster
  remains partial because docs, fixtures, and tests do not yet prove the named
  upstream `aspect-ratio-demo` composition: the Unsplash image URL, alt text
  `Photo by Drew Beamer`, rounded muted root styling, full-cover object-fit
  image behavior, dark-mode brightness/grayscale image filters, and the Next
  Image/Radix/Tailwind mapping. The next experiment should implement named
  `aspect-ratio-demo` docs, candidate fixture, and Playwright coverage.
- Experiment 84 resolved Aspect Ratio example parity for
  `aspect-ratio-demo`. Docs, candidate fixtures, and Playwright now prove the
  exact upstream remote image URL, alt text `Photo by Drew Beamer`, 16:9 root
  layout, rounded/muted root styling, public root hook evidence, native
  full-cover image sizing, `object-fit: cover`, dark-mode
  brightness/grayscale image filter behavior, and the React/Radix/Next
  Image/Tailwind mapping. The final image strategy uses a native `img` with
  the exact upstream remote URL; RadCN remains responsible only for the ratio
  wrapper, while remote image loading and optimization stay app-owned. The
  regenerated parity inventory recommends auditing `avatar` examples next.
- Experiment 85 audited direct Avatar example parity in
  `avatar-example-inventory.md`. RadCN already covers dependency-free Avatar
  markup, native image alt/src/loading props, visible and hidden fallback
  behavior, badge hooks, group hooks, group count hooks, size variants, custom
  token styling, and Avatar composition inside Item and Empty examples. The
  direct Avatar cluster remains partial because docs, fixtures, and tests do
  not yet prove the named upstream `avatar-demo` composition: exact GitHub
  image URLs, alt texts `@shadcn`, `@evilrabbit`, and `@maxleiter`, fallback
  texts `CN`, `ER`, and `LR`, rounded-square Avatar styling, flex/wrapped
  `gap-12` wrapper layout, and stacked negative-space group ring/grayscale
  treatment. Related `item-avatar`, `empty-avatar`, and `empty-avatar-group`
  examples remain owned by the already resolved Item and Empty clusters.
- Experiment 86 resolved Avatar example parity for `avatar-demo`. Docs,
  candidate fixtures, and Playwright now prove the exact GitHub image URLs,
  alt texts `@shadcn`, `@evilrabbit`, and `@maxleiter`, fallback texts `CN`,
  `ER`, and `LR`, circular default shape, rounded-square class/style
  customization, flex/wrapped `gap-12` wrapper layout, stacked AvatarGroup
  composition, negative spacing, ring box-shadow evidence, grayscale image
  treatment, public Avatar/Image/Fallback/Group hooks, and the
  React/Radix/`data-slot`/`data-size`/`className`/`cn`/Tailwind/remote-image
  mapping. Image-backed named-demo fallbacks use `ariaHidden={true}` because
  the native image alt text provides the accessible name. Implementation also
  exposed a package-level styling gap: AvatarGroup overlap rules used the
  child combinator, but injected `radcnStyles` escapes `>` to `&gt;`, causing
  the browser to drop the rule. AvatarGroup now uses descendant/public-hook
  selectors that survive style injection, and plain `avatar/group` fixture
  tests prove the package supplies first-avatar reset, negative spacing, and
  ring box-shadow behavior without inline styles. The named demo still uses
  explicit root styles for deterministic overlap and ring evidence. The
  regenerated parity inventory marks `avatar` resolved and recommends auditing
  `collapsible` examples next.
- Experiment 87 audited direct Collapsible example parity in
  `collapsible-example-inventory.md`. RadCN already covers dependency-free
  native `details`/`summary` disclosure behavior, closed/open rendering,
  keyboard toggling, disabled non-interactive state, content visibility, public
  hooks, and custom tokens. The direct Collapsible cluster remains partial
  because docs, fixtures, and tests do not yet prove the named upstream
  `collapsible-demo` composition: exact `@peduarte starred 3 repositories`
  heading, accessible `Toggle` icon trigger, ghost Button/`asChild` mapping,
  always-visible `@radix-ui/primitives` row, toggled `@radix-ui/colors` and
  `@stitches/react` rows, 350px flex-column layout, header row layout, rounded
  bordered monospace row styling, app-owned chevrons icon, and the
  React/Radix/lucide/Tailwind mapping. The next experiment should implement
  named `collapsible-demo` docs, candidate fixture, and Playwright coverage.
- Experiment 88 resolved Collapsible example parity for `collapsible-demo`.
  Docs, candidate fixtures, and Playwright now prove the exact
  `@peduarte starred 3 repositories` heading, `Toggle` screen-reader text,
  app-owned chevrons icon, visible `@radix-ui/primitives` row, hidden/toggled
  `@radix-ui/colors` and `@stitches/react` rows, default closed state, native
  details/summary toggling, 350px flex-column root, header row layout, rounded
  bordered monospace repository row styling, public Collapsible/Trigger/Content
  hooks, and the React/Radix/`data-slot`/`className`/Tailwind/Button
  `asChild`/lucide/custom-token/vendor-source mapping. The implementation
  recorded one important native-details constraint for later components:
  closed `details` exposes only `summary`, so user-facing content that must
  remain visible while closed must live inside the summary presentation, while
  toggled content stays in the content region. The regenerated parity inventory
  marks `collapsible` resolved and recommends auditing `context-menu`
  examples next.
- Experiment 89 audited direct Context Menu example parity in
  `context-menu-example-inventory.md`. RadCN already covers the exported
  Context Menu package surface, dependency-free menu-overlay enhancement,
  right-click opening, ContextMenu and Shift+F10 keyboard opening, menu roles,
  portal placement, focus restoration, roving/typeahead behavior, disabled
  item skipping, checkbox mutation, radio state, submenus, collision handling,
  public hooks, and custom tokens. The direct Context Menu cluster remains
  partial because docs, fixtures, and tests do not yet prove the named upstream
  `context-menu-demo` composition: exact `Right click here` trigger text,
  300x150 dashed trigger layout, `w-52` menu width, inset Back/Forward/Reload
  rows with shortcuts, disabled Forward behavior, `More Tools` submenu with
  `w-44` width and exact submenu items, separators, checked `Show Bookmarks`,
  unchecked `Show Full URLs`, `People` label, selected `Pedro Duarte`,
  unselected `Colm Tuite`, destructive `Delete`, app-owned indicator/caret
  presentation, and the React/Radix/lucide/Tailwind mapping. The next
  experiment should implement named `context-menu-demo` docs, candidate
  fixture, and Playwright coverage.
- Experiment 90 resolved Context Menu example parity for
  `context-menu-demo`. Docs, candidate fixtures, and Playwright now prove the
  exact `Right click here` trigger text, 300x150 dashed trigger layout,
  `w-52`/208px content, inset Back/Forward/Reload rows with shortcuts,
  disabled Forward behavior, More Tools submenu with `w-44`/176px content and
  exact submenu items, separators, checked `Show Bookmarks`, unchecked `Show
  Full URLs`, `People` label, selected `Pedro Duarte`, unselected `Colm
  Tuite`, destructive `Delete`, public Context Menu hooks, app-owned
  indicator/caret presentation, and the React/Radix/`data-slot`/`className`/
  `cn`/Tailwind/lucide/custom-token/vendor-source mapping. Two reusable
  learnings were recorded: exact shadcn menu widths narrower than the RadCN
  package default must override both `width` and `min-width`, and docs examples
  that exercise package browser enhancement need RadCN package-source asset
  allowance plus tests scoped around portal relocation. The regenerated parity
  inventory marks `context-menu` resolved and recommends auditing `data-table`
  examples next.
- Experiment 91 audited direct Data Table example parity in
  `data-table-example-inventory.md`. The examples registry has one direct
  `data-table` example, `data-table-demo`, and the dashboard block data-table
  file is related future block evidence rather than a direct example row.
  RadCN already covers the package-backed Data Table composition surface,
  semantic table primitives, native forms/links, selection checkboxes,
  pagination, row actions, column controls, responsive detail, row editing,
  empty state, custom tokens, package exports, and negative dependency checks
  for React/TanStack-style table engines. The direct example remains partial
  because docs, fixtures, and tests do not yet prove the exact upstream
  payments dataset, filter placeholder, `Columns` dropdown, row action menu,
  select-all/row checkbox labels, selected/filtered row count text, empty
  state, Previous/Next buttons, formatted status/email/amount output, or the
  React/TanStack/lucide/Tailwind/clipboard mapping for the named
  `data-table-demo`. The next experiment should implement named
  `data-table-demo` docs, candidate fixture, and Playwright coverage while
  keeping dashboard block behavior out of scope.
- Experiment 92 completed direct Data Table example parity for
  `data-table-demo`. Docs, candidate fixtures, and Playwright now prove the
  exact five upstream payment rows, lowercase status state with visible
  `Success`/`Processing`/`Failed` labels, lowercase email presentation,
  formatted amounts, filter placeholder, `Columns` visibility dropdown,
  non-hideable `select`/`actions` exclusion, row action menu, app-owned
  clipboard/id evidence, selected row state, empty state, Previous/Next
  pagination buttons, public Data Table/Table hooks, and the
  React/TanStack/lucide/Tailwind/clipboard mapping for RadCN's native
  composition model. Package code did not need changes.
- Data Table docs dropdown enhancement must stay scoped to the named example
  that needs runtime menu state. Global docs dropdown enhancement relocates
  unrelated menu portals and can make wrapper-local coverage assertions fail.
- After Experiment 92, the regenerated parity inventory marks `data-table`
  resolved in the example queue. The next generated recommendation is example
  parity for `hover-card`.
- Experiment 93 audited direct Hover Card example parity in
  `hover-card-example-inventory.md`. The examples registry has one direct
  `hover-card` example, `hover-card-demo`. RadCN already covers the
  package-backed Hover Card primitive, hover/focus browser enhancement,
  portal/content hooks, open/close delays, side/align placement, non-modal
  behavior, custom tokens, package exports, and general docs/fixture coverage.
  The direct example remains partial because docs, fixtures, and tests do not
  yet prove the exact upstream `@nextjs` profile composition: Button link
  trigger/asChild mapping, Avatar image URL and `VC` fallback, 20rem `w-80`
  content width, exact profile copy, and the Radix/`asChild`/Tailwind/`cn`/
  `data-slot`/unused `CalendarIcon` mapping. The next experiment should
  implement named `hover-card-demo` docs, candidate fixture, and Playwright
  coverage.
- Experiment 94 completed direct Hover Card example parity for
  `hover-card-demo`. Docs, candidate fixtures, and Playwright now prove the
  exact upstream `@nextjs` trigger, link-button/asChild mapping, Avatar image
  URL `https://github.com/vercel.png`, `VC` fallback, 20rem `w-80` content
  width, profile heading, exact description and joined-date copy, hover/focus
  opening, Escape closing, non-modal behavior, public Hover Card/Avatar hooks,
  and the React/Radix/`asChild`/Tailwind/`cn`/`data-slot`/unused
  `CalendarIcon`/vendor-source mapping. Package code did not need changes.
- After Experiment 94, the regenerated parity inventory marks `hover-card`
  resolved in the example queue. The next generated recommendation is example
  parity for `label`.
- Experiment 95 audited direct Label example parity in
  `label-example-inventory.md`. The examples registry has one direct `label`
  example, `label-demo`. RadCN already covers native Label package exports,
  `for` wiring, disabled state, public hooks, Label/Checkbox composition, exact
  `Accept terms and conditions` text in Checkbox docs/fixtures, and native
  label click activation in fixture Playwright. The direct example remains
  partial because the Label docs and fixtures do not yet expose a named
  `label-demo` route/example with exact `Checkbox id="terms"`,
  `Label for="terms"`, flex/spacing layout evidence, and the
  React/Radix/`htmlFor`/Tailwind/`cn`/`data-slot`/peer-disabled mapping.
  The next experiment should implement named `label-demo` docs, candidate
  fixture, and Playwright coverage.
- Experiment 96 completed direct Label example parity for `label-demo`.
  `label-example-inventory.md` now marks the single direct Label example
  covered. Docs and candidate fixtures render the exact `Checkbox id="terms"`
  and `Label for="terms"` composition with `Accept terms and conditions`,
  flex/center/8px spacing evidence, public Label and Checkbox hooks, and native
  label click activation. The Label docs record the React `"use client"`,
  Radix `LabelPrimitive.Root`, `htmlFor`, `className`, Tailwind, `cn`,
  `data-slot`, group disabled, `peer-disabled`, and vendor-source mapping.
  Package code did not need changes. After regenerating parity inventory, the
  next generated recommendation is example parity for `menubar`.
- Experiment 97 audited direct Menubar example parity in
  `menubar-example-inventory.md`. The examples registry has one direct
  `menubar` example, `menubar-demo`. RadCN already covers Menubar package
  exports, explicit Menubar parts, role/ARIA markup, browser enhancement,
  portal-backed content, keyboard/typeahead behavior, hover switching, submenu
  behavior, checkbox/radio item state, disabled state, inset classes, shortcut
  hooks, custom tokens, generic docs, candidate/reference fixtures, and
  Playwright coverage. The direct example remains partial because no named
  Menubar docs/fixture/test surface proves the exact upstream four-menu
  composition (`File`, `Edit`, `View`, `Profiles`), all item/submenu/checkbox/
  radio/inset/disabled/shortcut text, checked `Always Show Full URLs`, radio
  value `benoit`, public hooks for every part, mapping copy, and a deliberate
  decision for upstream `sideOffset={8}` versus RadCN's current
  `sideOffset={4}` default. The next experiment should implement named
  `menubar-demo` docs, candidate fixture, and Playwright coverage.
- Experiment 98 completed direct Menubar example parity for `menubar-demo`.
  `menubar-example-inventory.md` now marks the single direct Menubar example
  covered. Docs and candidate fixtures render the exact four-menu composition
  with `File`, `Edit`, `View`, and `Profiles`; all upstream item, submenu,
  checkbox, radio, inset, disabled, and shortcut text; checked
  `Always Show Full URLs`; radio value `benoit`; public hooks for every used
  Menubar part; portal movement; submenu behavior; Escape close; keyboard
  disabled skip; and `sideOffset={8}` placement evidence. The Menubar docs
  record the React `"use client"`, Radix Menubar, lucide icon, `className`,
  Tailwind, `cn`, `data-slot`, portal, keyboard/pointer, custom-token, and
  vendor-source mapping. Package code did not need changes. After regenerating
  parity inventory, the next generated recommendation is example parity for
  `mode-toggle`.
- Experiment 99 resolved direct `mode-toggle` example parity as an intentional
  docs app-shell divergence. Upstream `mode-toggle` is a React/`next-themes`
  dropdown icon-button recipe, not a package component. RadCN's correct
  outcome is the existing visible three-option `System`/`Light`/`Dark` control
  with `system` default, persisted overrides, resolved document theme tokens,
  system preference following, `lucide-static` icons, and Playwright coverage.
  Do not add a `radcn/mode-toggle` package export, `next-themes`,
  `lucide-react`, or a dropdown-only implementation unless a later docs-design
  issue explicitly changes the product requirement. The audit and decision are
  recorded in `mode-toggle-example-inventory.md`. After regenerating parity
  inventory, the next generated recommendation is example parity for
  `navigation-menu`.
- Experiment 100 audited direct Navigation Menu example parity in
  `navigation-menu-example-inventory.md`. RadCN already has strong package and
  behavior substrate for Navigation Menu: root/list/item/trigger/content/link/
  viewport/indicator exports, `enhanceNavigationMenu`, viewport sizing,
  indicator state, keyboard movement, pointer/focus behavior, disabled state,
  custom tokens, generic docs, fixtures, and Playwright coverage. The direct
  example remains partial because no named docs/fixture/test surface proves
  the exact upstream `navigation-menu-demo` composition, all Home/Components/
  List/Simple/With Icon panel copy, icon-link affordances, responsive
  `hidden md:block` sections, `useIsMobile`/viewport mapping, or
  `navigationMenuTriggerStyle` mapping. The next experiment should implement
  named `navigation-menu-demo` docs, candidate fixture, and Playwright
  coverage, and decide whether `navigationMenuTriggerStyle` should become a
  RadCN helper or stay a documented class/token equivalent.
- Experiment 101 completed direct Navigation Menu example parity for
  `navigation-menu-demo`. `navigation-menu-example-inventory.md` now marks the
  single direct Navigation Menu example covered. Docs and candidate fixtures
  render the exact upstream top-level controls (`Home`, `Components`, `Docs`,
  `List`, `Simple`, `With Icon`), Home/Components/List/Simple/With Icon panel
  copy, icon-link affordances, desktop-only responsive hooks, explicit viewport
  and indicator parts, and trigger-style `Docs` link evidence. The docs app now
  enhances the named demo with `enhanceNavigationMenu`. Package code did not
  need changes; `navigationMenuTriggerStyle()` maps to public
  `NavigationMenuLink` class/token behavior, and upstream `useIsMobile`/
  `viewport={isMobile}` maps to explicit `NavigationMenuViewport` composition
  plus app-owned responsive CSS. After regenerating parity inventory, the next
  generated recommendation is example parity for `pagination`.
- Experiment 102 audited direct Pagination example parity in
  `pagination-example-inventory.md`. RadCN already has strong Pagination
  package and behavior substrate: root/content/item/link/previous/next/
  ellipsis exports, semantic navigation/list/link markup, active page state,
  accessible previous/next labels, ellipsis screen-reader text, custom labels,
  generic docs, fixtures, and Playwright coverage. The direct example remains
  partial because no named docs/fixture/test surface proves the exact upstream
  `pagination-demo` sequence (`Previous`, `1`, active `2`, `3`, ellipsis,
  `Next`) and dependency-divergence mappings. The next experiment should
  implement named `pagination-demo` docs, candidate fixture, and Playwright
  coverage.
- Experiment 103 implemented named `pagination-demo` parity and updated
  `pagination-example-inventory.md` to `Covered`. The docs site now has a rich
  Pagination page with exact source, upstream hash hrefs, exact `Previous`,
  `1`, active `2`, `3`, ellipsis/`More pages`, and `Next` sequence, and mapping
  copy for React props, lucide icons, `buttonVariants`, Button size typing,
  `className`, Tailwind utilities, `cn`, `data-slot`, custom tokens, and vendor
  source. The candidate fixture now has `pagination/demo` with the same hash
  href sequence, while existing `active` and `custom-labels` scenarios preserve
  modifiability evidence. `pagination` is resolved in the example queue; the
  next generated recommendation is example parity for `popover`.
- Experiment 104 audited direct Popover example parity in
  `popover-example-inventory.md`. RadCN already has strong Popover package and
  behavior substrate: root/trigger/anchor/portal/content/close/header/title/
  description exports, explicit portal composition, align and sideOffset props,
  default-open state, non-modal click behavior, outside dismissal, Escape close,
  focus movement, placement/anchor behavior, custom-token hooks, generic docs,
  candidate fixtures, and Playwright coverage. The direct example remains
  partial because no named docs/fixture/test surface proves the exact upstream
  `popover-demo` dimensions form (`Open popover`, `Dimensions`,
  `Set the dimensions for the layer.`, four labelled inputs, and default
  values). The next experiment should implement named `popover-demo` docs,
  candidate fixture, and Playwright coverage.
- Experiment 105 implemented named `popover-demo` parity and updated
  `popover-example-inventory.md` to `Covered`. The docs site now has a rich
  Popover page with exact source, outline trigger mapping, explicit portal,
  20rem `w-80` content width mapping, exact dimensions copy, exact labelled
  input ids/default values, and mapping copy for React props, Radix primitives,
  `asChild`, Button/Input/Label composition, `className`, Tailwind utilities,
  `cn`, `data-slot`, portal behavior, transition hooks, custom tokens, and
  vendor source. The docs entry explicitly enhances the named Popover example
  with `enhancePopover`; overlay examples that must open in browser tests need
  corresponding docs asset wiring, not just server-rendered markup. `popover`
  is resolved in the example queue; the next generated recommendation is
  example parity for `progress`.
- Experiment 106 audited direct Progress example parity in
  `progress-example-inventory.md`. RadCN already has strong Progress package
  and behavior substrate: dependency-free native `<progress>` semantics,
  determinate and indeterminate states, wrapper/track/indicator hooks, width
  indicator styling, generic docs, candidate fixtures, custom-token evidence,
  and Playwright coverage. The direct example remains partial because no named
  docs/fixture/test surface proves the exact upstream timed demo: initial value
  `13`, update to `66` after 500ms, and `className="w-[60%]"` width mapping.
  The next experiment should implement named `progress-demo` docs, candidate
  fixture, dependency-free browser behavior, and Playwright coverage.
- Experiment 107 implemented named `progress-demo` parity and updated
  `progress-example-inventory.md` to `Covered`. The docs site now has a rich
  Progress page with exact source, initial value `13`, scoped dependency-free
  browser behavior that updates to `66` after 500ms, explicit `w-[60%]` and
  60% wrapper width mapping, native progress semantics, wrapper/track/indicator
  hooks, and mapping copy for React state/effect/timer, Radix primitives,
  Tailwind utilities, `cn`, `className`, `data-slot`, transform movement,
  custom tokens, and vendor source. The candidate fixture now has
  `progress/demo` with matching timed behavior while existing default,
  indeterminate, and custom-token scenarios remain covered. `progress` is
  resolved in the example queue; the next generated recommendation is example
  parity for `radio-group`.
- Experiment 108 audited direct Radio Group example parity in
  `radio-group-example-inventory.md`. RadCN already has strong Radio Group
  package and behavior substrate: dependency-free native radio inputs,
  radiogroup semantics, checked/unchecked hooks, disabled and invalid states,
  form behavior, custom-token evidence, generic docs, candidate fixtures, and
  Playwright coverage. The direct example remains partial because no named
  docs/fixture/test surface proves the exact upstream `defaultValue="comfortable"`
  demo with `Default`, `Comfortable`, and `Compact` labels, ids `r1`, `r2`,
  and `r3`, and row layout mapping. The next experiment should implement named
  `radio-group-demo` docs, candidate fixture, and Playwright coverage.
- Experiment 109 implemented named `radio-group-demo` parity and updated
  `radio-group-example-inventory.md` to `Covered`. The docs site now has a
  rich Radio Group page with exact source, `Default`, `Comfortable`, and
  `Compact` labels, ids `r1`, `r2`, and `r3`, values `default`,
  `comfortable`, and `compact`, checked `comfortable` default state, row layout
  evidence for `flex items-center gap-3`, label associations, native selection
  behavior, public hooks, and mapping copy for React props, Radix primitives,
  lucide `CircleIcon`, Tailwind utilities, `cn`, `className`, `data-slot`,
  custom tokens, and vendor source. The candidate fixture now has
  `radio-group/demo` with matching composition while existing disabled,
  invalid, form, and custom-token scenarios remain covered. `radio-group` is
  resolved in the example queue; the next generated recommendation is example
  parity for `separator`.
- Experiment 110 audited Separator direct example parity in
  `separator-example-inventory.md`. RadCN already has the package API,
  dependency-free horizontal/vertical styling, decorative default behavior,
  semantic opt-in behavior, generic docs hook evidence, and package export
  coverage. The direct upstream `separator-demo` remains partial because no
  named docs, candidate fixture, or Playwright evidence currently proves the
  exact `Radix Primitives` heading, `An open-source UI component library.`
  description, `my-4` horizontal separator, `Blog`/`Docs`/`Source` row, and two
  vertical separators. The next experiment should implement named
  `separator-demo` docs, fixture, and Playwright parity.
- Experiment 111 implemented named `separator-demo` parity and updated
  `separator-example-inventory.md` to `Covered`. The docs site now has a rich
  Separator page with exact upstream text, one horizontal `my-4` separator,
  two vertical separators, `Blog`/`Docs`/`Source` row labels, row layout class
  and style evidence, source snippet, decorative default evidence, and mapping
  copy for React/Radix/Tailwind/`cn`/`className`/`data-slot`/vendor
  divergences. The candidate fixture now routes `separator/demo` through the
  static-display fixture dispatcher while preserving `separator/orientations`
  semantic coverage for `decorative={false}`. `separator` is resolved in the
  example queue; the next generated recommendation is example parity for
  `slider`.
- Experiment 112 audited Slider direct example parity in
  `slider-example-inventory.md`. RadCN already has a strong native range
  substrate with value/min/max/step hooks, horizontal orientation, input/
  track/range/thumb parts, percent CSS variable state, keyboard behavior,
  disabled behavior, form submit/reset behavior, and custom-token evidence in
  `slider.spec.ts`. The direct upstream `slider-demo` remains partial because
  no named docs, candidate fixture, or Playwright evidence currently proves the
  exact `defaultValue={[50]}`, `max={100}`, `step={1}`, `w-[60%]` width
  mapping, source snippet, and React/Radix/Tailwind/`cn`/`className`/
  `data-slot` divergence copy. The next experiment should implement named
  `slider-demo` docs, fixture, and Playwright parity.
- Experiment 113 completed Slider direct example parity and updated
  `slider-example-inventory.md` to `Covered`. The docs site now has a rich
  Slider page with named `slider-demo` evidence for value 50, min 0, max 100,
  step 1, horizontal orientation, 60% width mapping, source snippet, public
  root/input/track/range/thumb hooks, percent CSS variable state, and mapping
  copy for React props, `React.ComponentProps`, React `useMemo`, Radix Slider
  primitives, single-value array defaults, Tailwind/`cn`/`className`/
  `data-slot`, custom-token, and vendor divergences. The candidate fixture now
  routes `slider/demo` while preserving the existing Slider behavior scenarios.
  `slider` is resolved in the example queue; the next generated
  recommendation is example parity for `switch`.
- Experiment 114 audited Switch direct example parity in
  `switch-example-inventory.md`. RadCN already has a strong native checkbox
  switch substrate with role switch semantics, wrapper/input/thumb hooks,
  checked/unchecked `data-state`, `data-size`, disabled behavior, form
  submit/reset behavior, label wiring, focus-visible styling, thumb transform
  behavior, small/default sizing, and custom-token evidence in
  `native-state.spec.ts`. The direct upstream `switch-demo` remains partial
  because no named docs, candidate fixture, or Playwright evidence currently
  proves the exact `airplane-mode` id, `Airplane Mode` label, default
  unchecked state, default size, row layout, source snippet, and React/Radix/
  Tailwind/`cn`/`className`/`data-slot`/`data-size` divergence copy. The next
  experiment should implement named `switch-demo` docs, fixture, and
  Playwright parity.
- Experiment 115 completed Switch direct example parity and updated
  `switch-example-inventory.md` to `Covered`. The docs site now has a rich
  Switch page with named `switch-demo` evidence for id `airplane-mode`,
  label text `Airplane Mode`, default unchecked state, default size,
  `flex items-center space-x-2` row layout, source snippet, public wrapper/
  input/thumb hooks, role switch accessibility, label activation, checked/
  unchecked `data-state` sync, `data-size`, and mapping copy for React props,
  `React.ComponentProps`, Radix Switch primitives, `size`, Tailwind/`cn`/
  `className`/`data-slot`, Label `htmlFor`, custom-token, and vendor
  divergences. Because static server-rendered state metadata did not update
  after native browser interaction, `radcn/switch` now exports
  `enhanceSwitch`, and the docs and fixture browser entries call it. `switch`
  is resolved in the example queue; the next generated recommendation is
  example parity for `table`.
- Experiment 116 audited Table direct example parity in
  `table-example-inventory.md`. RadCN already has strong plain Table substrate
  with semantic table elements, container/table/caption/header/body/footer/
  row/head/cell hooks, `scope="col"` on heads, `ariaSort`, class/style
  customization, dense spacing, generic footer support, generic docs preview
  coverage, and generic fixture coverage in `navigation-collection.spec.ts`.
  The direct upstream `table-demo` remains partial because no named docs,
  candidate fixture, or Playwright evidence currently proves the exact invoice
  caption, headers, seven rows, statuses, methods, amounts, footer total,
  `w-[100px]`, right alignment, `font-medium`, `colSpan={3}`, source snippet,
  and React/Tailwind/`cn`/`className`/`data-slot` divergence copy. Existing
  `radcn/data-table` evidence is related composition work, not direct plain
  Table example parity. The next experiment should implement named
  `table-demo` docs, fixture, and Playwright parity.
- Experiment 117 completed Table direct example parity and updated
  `table-example-inventory.md` to `Covered`. The docs site now has a rich
  Table page with named `table-demo` evidence for exact caption text, headers,
  seven invoice rows, statuses, methods, amounts, footer total, native
  `colspan="3"`, `w-[100px]` width mapping, right-aligned Amount cells,
  `font-medium` invoice ids, source snippet, semantic table structure, public
  table hooks, DataTable non-substitution copy, and React/Tailwind/`cn`/
  `className`/`data-slot`/vendor divergences. Because the upstream footer
  Total cell requires native colspan support, `radcn/table` now exposes
  `TableCell colSpan`. `table` is resolved in the example queue; the next
  generated recommendation is example parity for `tabs`.
- Experiment 118 audited Tabs direct example parity in
  `tabs-example-inventory.md`. RadCN already has strong Tabs substrate with
  dependency-free `enhanceTabs`, root/list/trigger/content hooks, default
  value metadata, active/inactive `data-state`, ARIA tab associations, pointer
  activation, horizontal and vertical keyboard behavior, manual activation,
  disabled trigger behavior, hidden panels, generic preview/code docs
  coverage, and custom-token evidence in `tabs.spec.ts`. The direct upstream
  `tabs-demo` remains partial because no named docs, candidate fixture, or
  Playwright evidence currently proves the exact Account/Password Card
  composition, field ids and default values, buttons, wrapper layout, source
  snippet, unused lucide import decision, and React/Radix/cva/Tailwind/`cn`/
  `className`/`data-slot`/`data-orientation`/`data-variant`/`data-state`
  divergence copy. The next experiment should implement named `tabs-demo`
  docs, fixture, and Playwright parity.
- Experiment 119 completed Tabs direct example parity and updated
  `tabs-example-inventory.md` to `Covered`. The docs site and candidate
  fixture now include named `tabs-demo` evidence for the exact Account/
  Password Card form: default `account` value, Account and Password triggers,
  wrapper layout mapping, Card titles/descriptions/content/footer, Name and
  Username labels, `tabs-demo-name` and `tabs-demo-username` values,
  password field ids and `type="password"`, Save buttons, source snippet,
  public Tabs/Card/Label/Input/Button hooks, ARIA associations, pointer and
  keyboard selection behavior, hidden panels, and React/Radix/cva/lucide/
  Tailwind/`cn`/`className`/`data-slot`/`data-orientation`/`data-variant`/
  `data-state`/vendor divergences. Docs now scope `enhanceTabs` to the named
  demo. `tabs` is resolved in the example queue; the next generated
  recommendation is example parity for `tooltip`.

## Experiments

- [Experiment 1: Build shadcn parity inventory](01-build-shadcn-parity-inventory.md)
  — **Pass**
- [Experiment 2: Ship Remix-native form parity](02-ship-remix-native-form-parity.md)
  — **Pass**
- [Experiment 3: Resolve date-picker parity](03-resolve-date-picker-parity.md)
  — **Pass**
- [Experiment 4: Resolve data-table parity](04-resolve-data-table-parity.md)
  — **Pass**
- [Experiment 5: Audit form example parity](05-audit-form-example-parity.md)
  — **Pass**
- [Experiment 6: Implement form example parity depth](06-implement-form-example-parity-depth.md)
  — **Pass**
- [Experiment 7: Track resolved parity clusters](07-track-resolved-parity-clusters.md)
  — **Pass**
- [Experiment 8: Resolve typography outcome](08-resolve-typography-outcome.md)
  — **Pass**
- [Experiment 9: Audit button example parity](09-audit-button-example-parity.md)
  — **Pass**
- [Experiment 10: Implement button example parity depth](10-implement-button-example-parity-depth.md)
  — **Pass**
- [Experiment 11: Audit field example parity](11-audit-field-example-parity.md)
  — **Pass**
- [Experiment 12: Implement field example parity depth](12-implement-field-example-parity-depth.md)
  — **Pass**
- [Experiment 13: Audit button-group example parity](13-audit-button-group-example-parity.md)
  — **Pass**
- [Experiment 14: Implement button-group example parity depth](14-implement-button-group-example-parity-depth.md)
  — **Pass**
- [Experiment 15: Audit input-group example parity](15-audit-input-group-example-parity.md)
  — **Pass**
- [Experiment 16: Implement input-group example parity depth](16-implement-input-group-example-parity-depth.md)
  — **Pass**
- [Experiment 17: Audit item example parity](17-audit-item-example-parity.md)
  — **Pass**
- [Experiment 18: Implement item example parity depth](18-implement-item-example-parity-depth.md)
  — **Pass**
- [Experiment 19: Audit spinner example parity](19-audit-spinner-example-parity.md)
  — **Pass**
- [Experiment 20: Implement spinner example parity depth](20-implement-spinner-example-parity-depth.md)
  — **Pass**
- [Experiment 21: Audit empty example parity](21-audit-empty-example-parity.md)
  — **Pass**
- [Experiment 22: Implement empty example parity depth](22-implement-empty-example-parity-depth.md)
  — **Pass**
- [Experiment 23: Audit toggle-group example parity](23-audit-toggle-group-example-parity.md)
  — **Pass**
- [Experiment 24: Implement toggle-group example parity depth](24-implement-toggle-group-example-parity-depth.md)
  — **Pass**
- [Experiment 25: Audit breadcrumb example parity](25-audit-breadcrumb-example-parity.md)
  — **Pass**
- [Experiment 26: Implement breadcrumb example parity depth](26-implement-breadcrumb-example-parity-depth.md)
  — **Pass**
- [Experiment 27: Audit carousel example parity](27-audit-carousel-example-parity.md)
  — **Pass**
- [Experiment 28: Implement carousel example parity depth](28-implement-carousel-example-parity-depth.md)
  — **Pass**
- [Experiment 29: Audit chart example parity](29-audit-chart-example-parity.md)
  — **Pass**
- [Experiment 30: Implement chart component example parity depth](30-implement-chart-component-example-parity-depth.md)
  — **Pass**
- [Experiment 31: Audit input example parity](31-audit-input-example-parity.md)
  — **Pass**
- [Experiment 32: Implement input example parity depth](32-implement-input-example-parity-depth.md)
  — **Pass**
- [Experiment 33: Audit toggle example parity](33-audit-toggle-example-parity.md)
  — **Pass**
- [Experiment 34: Implement toggle example parity depth](34-implement-toggle-example-parity-depth.md)
  — **Pass**
- [Experiment 35: Audit kbd example parity](35-audit-kbd-example-parity.md)
  — **Pass**
- [Experiment 36: Implement kbd example parity depth](36-implement-kbd-example-parity-depth.md)
  — **Pass**
- [Experiment 37: Audit textarea example parity](37-audit-textarea-example-parity.md)
  — **Pass**
- [Experiment 38: Implement textarea example parity depth](38-implement-textarea-example-parity-depth.md)
  — **Pass**
- [Experiment 39: Audit toast example parity](39-audit-toast-example-parity.md)
  — **Pass**
- [Experiment 40: Implement toast example parity depth](40-implement-toast-example-parity-depth.md)
  — **Pass**
- [Experiment 41: Audit badge example parity](41-audit-badge-example-parity.md)
  — **Pass**
- [Experiment 42: Implement badge example parity depth](42-implement-badge-example-parity-depth.md)
  — **Pass**
- [Experiment 43: Audit combobox example parity](43-audit-combobox-example-parity.md)
  — **Pass**
- [Experiment 44: Implement combobox example parity depth](44-implement-combobox-example-parity-depth.md)
  — **Pass**
- [Experiment 45: Audit dropdown-menu example parity](45-audit-dropdown-menu-example-parity.md)
  — **Pass**
- [Experiment 46: Implement dropdown-menu example parity depth](46-implement-dropdown-menu-example-parity-depth.md)
  — **Pass**
- [Experiment 47: Audit input-otp example parity](47-audit-input-otp-example-parity.md)
  — **Pass**
- [Experiment 48: Implement input-otp example parity depth](48-implement-input-otp-example-parity-depth.md)
  — **Pass**
- [Experiment 49: Audit native-select example parity](49-audit-native-select-example-parity.md)
  — **Pass**
- [Experiment 50: Implement native-select example parity depth](50-implement-native-select-example-parity-depth.md)
  — **Pass**
- [Experiment 51: Audit resizable example parity](51-audit-resizable-example-parity.md)
  — **Pass**
- [Experiment 52: Implement resizable example parity depth](52-implement-resizable-example-parity-depth.md)
  — **Pass**
- [Experiment 53: Audit checkbox example parity](53-audit-checkbox-example-parity.md)
  — **Pass**
- [Experiment 54: Implement checkbox example parity depth](54-implement-checkbox-example-parity-depth.md)
  — **Pass**
- [Experiment 55: Audit date-picker example parity](55-audit-date-picker-example-parity.md)
  — **Partial**
- [Experiment 56: Implement date-picker example parity depth](56-implement-date-picker-example-parity-depth.md)
  — **Pass**
- [Experiment 57: Audit alert example parity](57-audit-alert-example-parity.md)
  — **Partial**
- [Experiment 58: Implement alert example parity depth](58-implement-alert-example-parity-depth.md)
  — **Pass**
- [Experiment 59: Audit calendar example parity](59-audit-calendar-example-parity.md)
  — **Partial**
- [Experiment 60: Resolve calendar example parity depth](60-resolve-calendar-example-parity-depth.md)
  — **Pass**
- [Experiment 61: Audit card example parity](61-audit-card-example-parity.md)
  — **Partial**
- [Experiment 62: Implement card example parity depth](62-implement-card-example-parity-depth.md)
  — **Pass**
- [Experiment 63: Audit command example parity](63-audit-command-example-parity.md)
  — **Partial**
- [Experiment 64: Implement command example parity depth](64-implement-command-example-parity-depth.md)
  — **Pass**
- [Experiment 65: Audit dialog example parity](65-audit-dialog-example-parity.md)
  — **Partial**
- [Experiment 66: Implement dialog example parity depth](66-implement-dialog-example-parity-depth.md)
  — **Pass**
- [Experiment 67: Audit drawer example parity](67-audit-drawer-example-parity.md)
  — **Partial**
- [Experiment 68: Implement drawer example parity depth](68-implement-drawer-example-parity-depth.md)
  — **Pass**
- [Experiment 69: Audit scroll-area example parity](69-audit-scroll-area-example-parity.md)
  — **Partial**
- [Experiment 70: Implement scroll-area example parity depth](70-implement-scroll-area-example-parity-depth.md)
  — **Pass**
- [Experiment 71: Audit select example parity](71-audit-select-example-parity.md)
  — **Partial**
- [Experiment 72: Implement select example parity depth](72-implement-select-example-parity-depth.md)
  — **Pass**
- [Experiment 73: Audit sheet example parity](73-audit-sheet-example-parity.md)
  — **Partial**
- [Experiment 74: Implement sheet example parity depth](74-implement-sheet-example-parity-depth.md)
  — **Pass**
- [Experiment 75: Audit skeleton example parity](75-audit-skeleton-example-parity.md)
  — **Partial**
- [Experiment 76: Implement skeleton example parity depth](76-implement-skeleton-example-parity-depth.md)
  — **Pass**
- [Experiment 77: Audit sonner example parity](77-audit-sonner-example-parity.md)
  — **Partial**
- [Experiment 78: Implement sonner example parity depth](78-implement-sonner-example-parity-depth.md)
  — **Pass**
- [Experiment 79: Audit accordion example parity](79-audit-accordion-example-parity.md)
  — **Partial**
- [Experiment 80: Implement accordion example parity depth](80-implement-accordion-example-parity-depth.md)
  — **Pass**
- [Experiment 81: Audit alert-dialog example parity](81-audit-alert-dialog-example-parity.md)
  — **Partial**
- [Experiment 82: Implement alert-dialog example parity depth](82-implement-alert-dialog-example-parity-depth.md)
  — **Pass**
- [Experiment 83: Audit aspect-ratio example parity](83-audit-aspect-ratio-example-parity.md)
  — **Partial**
- [Experiment 84: Implement aspect-ratio example parity depth](84-implement-aspect-ratio-example-parity-depth.md)
  — **Pass**
- [Experiment 85: Audit avatar example parity](85-audit-avatar-example-parity.md)
  — **Partial**
- [Experiment 86: Implement avatar example parity depth](86-implement-avatar-example-parity-depth.md)
  — **Pass**
- [Experiment 87: Audit collapsible example parity](87-audit-collapsible-example-parity.md)
  — **Partial**
- [Experiment 88: Implement collapsible example parity depth](88-implement-collapsible-example-parity-depth.md)
  — **Pass**
- [Experiment 89: Audit context-menu example parity](89-audit-context-menu-example-parity.md)
  — **Partial**
- [Experiment 90: Implement context-menu example parity depth](90-implement-context-menu-example-parity-depth.md)
  — **Pass**
- [Experiment 91: Audit data-table example parity](91-audit-data-table-example-parity.md)
  — **Partial**
- [Experiment 92: Implement data-table example parity depth](92-implement-data-table-example-parity-depth.md)
  — **Pass**
- [Experiment 93: Audit hover-card example parity](93-audit-hover-card-example-parity.md)
  — **Partial**
- [Experiment 94: Implement hover-card example parity depth](94-implement-hover-card-example-parity-depth.md)
  — **Pass**
- [Experiment 95: Audit label example parity](95-audit-label-example-parity.md)
  — **Partial**
- [Experiment 96: Implement label example parity depth](96-implement-label-example-parity-depth.md)
  — **Pass**
- [Experiment 97: Audit menubar example parity](97-audit-menubar-example-parity.md)
  — **Partial**
- [Experiment 98: Implement menubar example parity depth](98-implement-menubar-example-parity-depth.md)
  — **Pass**
- [Experiment 99: Audit mode-toggle example parity](99-audit-mode-toggle-example-parity.md)
  — **Pass**
- [Experiment 100: Audit navigation-menu example parity](100-audit-navigation-menu-example-parity.md)
  — **Partial**
- [Experiment 101: Implement navigation-menu example parity depth](101-implement-navigation-menu-example-parity-depth.md)
  — **Pass**
- [Experiment 102: Audit pagination example parity](102-audit-pagination-example-parity.md)
  — **Partial**
- [Experiment 103: Implement pagination example parity depth](103-implement-pagination-example-parity-depth.md)
  — **Pass**
- [Experiment 104: Audit popover example parity](104-audit-popover-example-parity.md)
  — **Partial**
- [Experiment 105: Implement popover example parity depth](105-implement-popover-example-parity-depth.md)
  — **Pass**
- [Experiment 106: Audit progress example parity](106-audit-progress-example-parity.md)
  — **Partial**
- [Experiment 107: Implement progress example parity depth](107-implement-progress-example-parity-depth.md)
  — **Pass**
- [Experiment 108: Audit radio-group example parity](108-audit-radio-group-example-parity.md)
  — **Partial**
- [Experiment 109: Implement radio-group example parity depth](109-implement-radio-group-example-parity-depth.md)
  — **Pass**
- [Experiment 110: Audit separator example parity](110-audit-separator-example-parity.md)
  — **Partial**
- [Experiment 111: Implement separator example parity depth](111-implement-separator-example-parity-depth.md)
  — **Pass**
- [Experiment 112: Audit slider example parity](112-audit-slider-example-parity.md)
  — **Partial**
- [Experiment 113: Implement slider example parity depth](113-implement-slider-example-parity-depth.md)
  — **Pass**
- [Experiment 114: Audit switch example parity](114-audit-switch-example-parity.md)
  — **Partial**
- [Experiment 115: Implement switch example parity depth](115-implement-switch-example-parity-depth.md)
  — **Pass**
- [Experiment 116: Audit table example parity](116-audit-table-example-parity.md)
  — **Partial**
- [Experiment 117: Implement table example parity depth](117-implement-table-example-parity-depth.md)
  — **Pass**
- [Experiment 118: Audit tabs example parity](118-audit-tabs-example-parity.md)
  — **Partial**
- [Experiment 119: Implement tabs example parity depth](119-implement-tabs-example-parity-depth.md)
  — **Pass**
- [Experiment 120: Audit tooltip example parity](120-audit-tooltip-example-parity.md)
  — **Designed**
