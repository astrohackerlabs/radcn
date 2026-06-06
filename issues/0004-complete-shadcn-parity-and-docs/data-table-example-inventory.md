# Data Table Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Data Table example through
the examples registry: `data-table-demo`. The registry entry has
`type: "registry:example"`, `registryDependencies: ["data-table"]`, and file
path `examples/data-table-demo.tsx`.

RadCN already ships `radcn/data-table` as a dependency-free composition layer
over semantic table markup and explicit app-owned data operations. Existing
docs, fixtures, and Playwright prove native filter forms, sortable links,
selection checkboxes, pagination, row actions, column controls, responsive
detail panels, row editing, dashboard-style composition, empty state, custom
tokens, package exports, public hooks, and the decision not to depend on
React, TanStack Table, drag/drop engines, Recharts, Zod, or Sonner.

Experiment 92 covers the direct upstream example in docs, candidate fixtures,
and Playwright. The exact named `data-table-demo` payments composition now has
evidence for upstream payment IDs, emails, lowercase status state with visibly
capitalized status labels, USD amounts, filter placeholder, column visibility
menu, row action menu, select-all and row checkbox labels, selected-row state,
empty state, Previous/Next pagination buttons, and the
React/TanStack/lucide/Tailwind/clipboard mapping for RadCN's native
composition model.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `data-table-demo` | Renders a React client component using `useReactTable`, TanStack `ColumnDef`, sorting state, column filters, column visibility, row selection, core/pagination/sorted/filtered row models, and `flexRender`. It defines five `Payment` rows with ids `m5gr84i9`, `3u1reuv4`, `derv1ws0`, `5kma53ae`, and `bhqecj4p`; statuses `success`, `processing`, and `failed`; emails `ken99@example.com`, `Abe45@example.com`, `Monserrat44@example.com`, `Silas22@example.com`, and `carmella@example.com`; and amounts `316`, `242`, `837`, `874`, and `721`, formatted as `$316.00`, `$242.00`, `$837.00`, `$874.00`, and `$721.00`. The UI includes select-all and row checkboxes with aria labels `Select all` and `Select row`; headers `Status`, sortable `Email` with `ArrowUpDown`, and right-aligned `Amount`; row action menu trigger `Open menu` with `MoreHorizontal`; row menu label `Actions`, item `Copy payment ID` using `navigator.clipboard.writeText(payment.id)`, separator, `View customer`, and `View payment details`; filter input placeholder `Filter emails...`; `Columns` dropdown with `ChevronDown` and checkbox items for hideable columns; a bordered rounded overflow table frame; selected-row `data-state`; empty text `No results.`; footer selection text like `0 of 0 row(s) selected.`; and outline `Previous` / `Next` pagination buttons with disabled state. Upstream composes Button, Checkbox, DropdownMenu, Input, Table, `className`, Tailwind sizing/flex/spacing/text/border/overflow/capitalize/lowercase/right-align/font utilities, and lucide icons. | `radcn/apps/docs/app/content/components.tsx` renders a named `data-table-demo` docs example with stable `data-radcn-docs-data-table-family="data-table-demo"`, exact payment ids/statuses/emails/amounts, lowercase status state plus visible `Success`/`Processing`/`Failed` labels, native filter placeholder `Filter emails...`, hideable `Columns` dropdown items `status`, `email`, and `amount` excluding non-hideable `select` and `actions`, selected row state, `No results.`, `1 of 5 row(s) selected.`, disabled Previous, enabled Next, row action menu content, app-owned icon glyph hooks, visible payment id data for clipboard behavior, and mapping copy for React/TanStack/lucide/Tailwind/clipboard mechanics. `radcn/apps/docs/app/assets/entry.ts` targets dropdown enhancement to the named docs Data Table demo so menu roles/state are exercised without relocating unrelated docs dropdowns. `radcn/apps/docs/tests/coverage.spec.ts` verifies the named docs route evidence. `radcn/fixtures/scenarios/index.ts` registers `data-table/demo`. `radcn/fixtures/candidate-remix/app/fixtures/data-table.tsx` renders the named fixture with the same exact payment composition. `radcn/fixtures/tests/data-display.spec.ts` verifies public Data Table/Table hooks, exact payment data, visible status capitalization, filter/sort/column visibility/selection/row action/pagination/empty-state behavior, app-owned icon and clipboard evidence, and negative dependency boundaries. Package code did not need changes; existing `radcn/data-table`, `radcn/table`, `DropdownMenu`, `Checkbox`, `Button`, and `Input` primitives were sufficient. | Covered | None. |

## Related Block

Upstream also includes a dashboard block data-table component at
`vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/dashboard-01/components/data-table.tsx`.
That file is related evidence for future block parity, not a direct example
row for this audit. It should stay out of the `## Examples` table and be
handled by a later block-focused issue or experiment if the Issue 4 queue
starts resolving upstream blocks.

## Decisions

- `data-table-demo` is a direct upstream example because `_registry.ts`
  registers it as `type: "registry:example"` with
  `registryDependencies: ["data-table"]`.
- The dashboard block data-table file is related but not a direct example row.
- React client component state maps to explicit server state, query strings,
  submitted form values, native inputs, or small app-owned browser
  enhancement. It should not make React a RadCN dependency.
- TanStack Table remains a non-dependency. RadCN owns composable slots and
  public hooks; apps own row models, sorting/filtering algorithms, pagination
  state, and column visibility state.
- Upstream `ColumnDef`, `useReactTable`, and `flexRender` mechanics map to
  app-owned data rendering over RadCN `DataTable` and `Table` primitives.
- Upstream sorting state maps to sortable links, submitted route state, or
  app-owned enhancement over `DataTableHeaderCell` and
  `data-radcn-data-table-sort`.
- Upstream filter state maps to native forms and `Input` controls; the named
  example still needs exact `Filter emails...` evidence.
- Upstream column visibility maps to `DropdownMenuCheckboxItem` controls and
  app-owned visible-column state, not a package table engine.
- Upstream row selection maps to native `Checkbox` controls, selected row data
  state, and `DataTableSelectionSummary`.
- Upstream row action menus map to existing RadCN `DropdownMenu` primitives;
  clipboard writing remains app-owned browser behavior.
- Upstream Button, Checkbox, DropdownMenu, Input, and Table composition maps to
  existing RadCN package primitives.
- Upstream lucide `ArrowUpDown`, `ChevronDown`, and `MoreHorizontal` icons map
  to app-owned presentation or package-owned static glyph/icon choices; they
  must not introduce `lucide-react`.
- Upstream `className` maps to `class`, explicit class composition, style,
  CSS variables, and package/app CSS.
- Upstream Tailwind sizing, flex, spacing, border, rounded, overflow, text,
  capitalize, lowercase, right-align, and font utilities map to RadCN package
  classes, class/style props, CSS variables, or app CSS.
- Upstream empty state text `No results.` and selected-row `data-state` are
  user-facing/state evidence requirements for the named follow-up.
- Existing generic Data Table docs and fixtures are good substrate evidence,
  but exact named `data-table-demo` parity requires named sample-data evidence
  in docs, fixtures, and Playwright.
- Dropdown enhancement in docs should stay scoped to examples that require
  runtime menu state. Global docs dropdown enhancement relocates unrelated
  docs portals and can invalidate wrapper-local assertions.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
