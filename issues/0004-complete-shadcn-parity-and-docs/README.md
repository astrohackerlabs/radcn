+++
status = "open"
opened = "2026-06-05"
+++

# Issue 4: Complete shadcn/ui Parity and Docs

## Goal

Complete RadCN's shadcn/ui parity for Remix 3: every shadcn component, helper,
recipe, block, and meaningful example should either exist in RadCN with
equivalent user-facing functionality or be explicitly documented as not
applicable to Remix 3 with a defensible reason.

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
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/` — shadcn blocks that
  may map to RadCN blocks, recipes, or docs-only examples.
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/` — chart examples and
  variants that may exceed the current RadCN `chart` primitive.
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
- comparing shadcn components, helpers, blocks, recipes, and examples against
  RadCN package exports and docs pages;
- implementing missing RadCN package APIs where a reusable package surface makes
  sense for Remix 3;
- implementing recipe/block documentation where a package export does not make
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
- **Block:** larger application pattern that belongs in docs and examples, and
  may later become copyable/generated code.
- **Not applicable:** intentionally omitted because the shadcn behavior depends
  on React-only semantics or a product assumption that does not fit Remix 3.

The first experiment should not start by implementing components. It should
produce a parity inventory generated from the vendored shadcn registry and the
current RadCN export map, then identify the first coherent implementation
cluster. Later experiments should implement one coherent cluster at a time and
record discoveries needed by later clusters in `## Learnings`.

The docs website remains the public verification surface. When a component or
block becomes complete, its docs page should render a real RadCN example,
include representative source, describe installation/import intent, and explain
accessibility, customization, and Remix 3 divergence details.

Installation instructions must stay aspirational while RadCN is private and not
published to npm. Docs may show the intended future command, but they must not
claim external users can install the package today.

## Completion Criteria

This issue is complete when:

- the vendored shadcn/ui v4 registry has been audited and mapped to RadCN
  outcomes;
- every shadcn component/helper/recipe/block has a RadCN outcome: shipped
  package API, docs recipe/block, or documented not-applicable divergence;
- `form`, `date-picker`, and `data-table` are no longer unexplained gaps;
- all implemented RadCN package surfaces have package exports, TypeScript
  coverage, docs pages, live docs examples, and Playwright coverage where
  rendered behavior matters;
- docs clearly identify recipes/blocks that are not package imports;
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
