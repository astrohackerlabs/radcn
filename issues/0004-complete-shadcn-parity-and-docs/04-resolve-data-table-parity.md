# Experiment 4: Resolve data-table parity

## Description

Experiment 3 left one known docs-only outcome in the generated parity
inventory: `data-table`.

In the vendored shadcn/ui v4 registry, `data-table` is not a primitive under
`ui/`. It appears as `data-table-demo`, a React/TanStack composition using
existing primitives for filtering, sorting, row selection, pagination, column
visibility, and row actions. The upstream `dashboard-01` block expands that
pattern with tabs, a column menu, row editing controls, responsive detail
drawers, chart context, and drag-reorder behavior.

RadCN already has the lower-level primitives required for this outcome:
`Table`, `Checkbox`, `Input`, `Button`, `DropdownMenu`, `Pagination`, `Select`,
`Tabs`, `Drawer`, `Badge`, `Chart`, and `Form`. The current candidate fixture
also has a local `data-table` recipe that proves a small semantic table,
filter form, selection summary, pagination links, row actions, responsive
detail content, and custom styling hook. That fixture is useful evidence, but
it is not enough for Issue 4 because the docs still mark Data Table as
`not-shipped-yet` and there is no importable RadCN package surface.

This experiment resolves the Data Table outcome by promoting it to a
package-backed Remix-native composition API. The API should make the shadcn
data-table user-facing capabilities straightforward to build in Remix 3 while
keeping data operations app-owned: sorting, filtering, pagination, visibility,
selection, row editing, and reordering are represented as native links, forms,
inputs, buttons, and explicit props instead of hidden React table state.

This experiment does not implement a generic table engine, TanStack adapter,
drag-and-drop library, chart expansion, all dashboard blocks, npm publishing,
external installation, or a browser enhancer. Dashboard-specific drag/reorder
and chart-detail patterns should be documented as recipe/block composition
using Data Table slots and app-owned forms/buttons.

## Changes

- Add `radcn/packages/radcn/src/components/data-table.tsx`.
  - Export a package-backed Data Table composition layer over existing RadCN
    primitives.
  - Minimum public component contract:
    - `DataTable` — outer shell with optional `caption`, `selectedCount`,
      `rowCount`, `empty`, `class`, `style`, and `children` props.
    - `DataTableToolbar` — flex toolbar for filter forms and table-level
      controls.
    - `DataTableFilter` — label/control wrapper for native filter inputs or
      selects.
    - `DataTableColumnControls` — slot for column visibility menus or view
      controls.
    - `DataTableContent` — semantic table container around existing `Table`
      parts.
    - `DataTableHeaderCell` — header cell helper for sortable links and
      `aria-sort`.
    - `DataTableRow` — row helper with selected, disabled, and reorder
      affordance state hooks.
    - `DataTableSelectionSummary` — selected/total row status text.
    - `DataTablePagination` — pagination slot around existing `Pagination`
      parts.
    - `DataTableRowActions` — row action slot for buttons or dropdown menus.
    - `DataTableDetail` — responsive detail/editing slot.
    - `DataTableEmpty` — empty-state row/content helper.
  - Minimum public type contract:
    - `DataTableProps`, `DataTablePartProps`, `DataTableFilterProps`,
      `DataTableContentProps`, `DataTableHeaderCellProps`,
      `DataTableRowProps`, `DataTableSelectionSummaryProps`,
      `DataTablePaginationProps`, and `DataTableEmptyProps`.
  - Support explicit app-owned state through props and native markup rather
    than internal React/TanStack state.
  - Preserve semantic table output by composing `Table`, `TableHeader`,
    `TableBody`, `TableRow`, `TableHead`, `TableCell`, and `TableCaption`.
  - Provide `data-radcn-data-table-*` hooks for tests, customization, and docs
    examples.
  - Include selected-row styling hooks and optional drag/reorder affordance
    hooks, but keep actual reorder persistence app-owned.
  - Avoid React, `@tanstack/react-table`, `@dnd-kit/*`, `zod`, `recharts`,
    `sonner`, Radix Slot, and any dependency or import from `vendor/`.
- Add the public `./data-table` export to
  `radcn/packages/radcn/package.json`.
- Export Data Table components and types from
  `radcn/packages/radcn/src/index.ts`.
- Add or refine Data Table CSS hooks in
  `radcn/packages/radcn/src/styles/tokens.css`, then regenerate
  `radcn/packages/radcn/src/styles/index.ts`.
- Update `radcn/fixtures/candidate-remix/app/fixtures/data-table.tsx`.
  - Replace the local recipe shell with the package Data Table API.
  - Cover the upstream demo capabilities as Remix-native scenarios:
    default table, filter form, sortable header links, selected rows, selection
    summary, pagination links, column/action controls, row actions, responsive
    detail content, empty state, row-editing controls, and custom tokens.
  - Keep scenario state explicit in fixture code so browser tests can inspect
    the rendered outcomes without relying on a client-only data engine.
- Update `radcn/fixtures/scenarios/index.ts` if Data Table scenario metadata
  still describes the feature as docs-only or local recipe-only.
- Update `radcn/fixtures/tests/data-display.spec.ts`.
  - Change the package manifest assertion so `./data-table` is expected.
  - Keep negative dependency assertions for React table, drag-and-drop, chart,
    schema, and toast libraries.
  - Add assertions for package data hooks, semantic table structure,
    sort/filter controls, selected row styling, selection summary, pagination,
    row actions, column controls, responsive detail, empty state, row-editing
    controls, and custom token styling.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Move Data Table from `not-shipped-yet` to a ready package-backed outcome.
  - Add live docs examples that cover the shadcn demo families: default,
    filtering/sorting, row selection, pagination, column/actions, and a
    dashboard-style composed example.
  - Explain the Remix 3 divergence: RadCN ships composition parts and native
    state wiring hooks, not a React/TanStack table engine.
  - State that installation copy is aspirational because RadCN is not published
    to npm yet.
- Update `radcn/apps/docs/tests/coverage.spec.ts`.
  - Remove `data-table` from `nonExportedDispositions`.
  - Add a Data Table preview hook/assertion that proves the docs page renders a
    package-backed example.
- Re-run `node scripts/audit-shadcn-parity.mjs` and commit the regenerated
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings.
  - Record the final Data Table outcome.
  - Record which upstream TanStack/React capabilities map to package parts,
    native Remix forms/links, docs recipe code, or intentional dashboard-block
    composition.
  - Record the current parity inventory count and the next recommended cluster
    after `data-table` is resolved.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts data-display.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- `git diff --check`
- `git status --short` shows only expected RadCN source, docs, fixture, issue,
  inventory, and test changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|from ['\"](@tanstack/react-table|@dnd-kit/[^'\"]+|zod|recharts|sonner|radix-ui|@radix-ui/react-slot)['\"]|\"(@tanstack/react-table|@dnd-kit/[^'\"]+|zod|recharts|sonner|radix-ui|@radix-ui/react-slot)\"\\s*:" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.

Failure criteria:

- Data Table remains a `not-shipped-yet` docs page.
- `radcn/data-table` exists only as a styling wrapper and does not make
  filtering, sorting, selection, pagination, actions, detail, and column
  controls authorable in the package-backed pattern.
- The implementation imports or depends on React, TanStack Table, drag-and-drop
  packages, vendored source, or chart/schema/toast libraries just to satisfy
  Data Table parity.
- Browser coverage proves only static DOM and misses user-facing table controls
  that make the upstream shadcn example useful.
- Docs claim external npm installation works today.

## Design Review

Reviewer: Kepler (`019e9a18-2a9f-7b12-b992-fa07ad4c16fe`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the original hygiene grep searched for the bare string `sonner`,
  which would match valid RadCN source and docs. Fixed by narrowing the command
  to forbidden external import specifiers and package manifest dependency keys.
- Major: the original Data Table package API contract was too underspecified
  for a plan commit. Fixed by listing the minimum public component and type
  exports required for this experiment.
- Minor: the original scope allowed a vague late package hook if needed. Fixed
  by explicitly excluding a browser enhancer and requiring dashboard-specific
  drag/reorder and chart-detail behavior to stay in recipe/block composition.

Re-review result: approved with no blocker, major, or minor findings.

## Result

**Result:** Pass

Resolved Data Table parity by shipping an importable `radcn/data-table`
composition API and moving the docs page out of the docs-only
`not-shipped-yet` disposition.

Changed files:

- `radcn/packages/radcn/src/components/data-table.tsx`
  - Added `DataTable`, `DataTableToolbar`, `DataTableFilter`,
    `DataTableColumnControls`, `DataTableContent`, `DataTableHeaderCell`,
    `DataTableRow`, `DataTableSelectionSummary`, `DataTablePagination`,
    `DataTableRowActions`, `DataTableDetail`, `DataTableEmpty`, table-part
    aliases, and public prop types.
  - Keeps table behavior app-owned and server/native friendly; the package
    owns structure, slots, accessibility hooks, and styling hooks.
- `radcn/packages/radcn/package.json` and `radcn/packages/radcn/src/index.ts`
  - Added the public `./data-table` export and root exports/types.
- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`
  - Added package-level Data Table styles and regenerated `radcnStyles`.
- `radcn/fixtures/candidate-remix/app/fixtures/data-table.tsx`
  - Replaced the local recipe shell with the package API.
  - Added package-backed coverage scenarios for filter/sort, selection,
    pagination, column controls, row actions, responsive detail, empty state,
    row editing, dashboard-style composition, and custom tokens.
- `radcn/fixtures/scenarios/index.ts`
  - Updated Data Table scenario descriptions from local recipe language to
    package-backed behavior and added the new scenario entries.
- `radcn/fixtures/tests/data-display.spec.ts`
  - Now requires `./data-table` to be exported and checks the Data Table package
    hooks and controls while preserving negative dependency assertions.
- `radcn/apps/docs/app/content/components.tsx`
  - Added a rich Data Table docs page with live package-backed examples,
    source, accessibility notes, customization notes, and Remix 3 divergence
    documentation.
- `radcn/apps/docs/tests/coverage.spec.ts`
  - Removed Data Table from non-exported dispositions and added the exported
    docs preview hook.
- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - Regenerated the inventory. It now reports 60 RadCN public package subpaths
    and no known docs-only outcomes.

Verification:

- `pnpm radcn:typecheck` — Pass.
- `pnpm --dir radcn/apps/docs typecheck` — Pass.
- `pnpm fixtures:candidate:typecheck` — Pass.
- `pnpm fixtures:reference:typecheck` — Pass, with the existing React Router
  `module.register()` deprecation warning.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts data-display.spec.ts`
  — Pass, 5 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — Pass, 5 tests.
- `node scripts/audit-shadcn-parity.mjs` — Pass; inventory regenerated.
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  — Pass; no diff.
- `git diff --check` — Pass.
- `git status --short` — Pass; only expected source, docs, fixture, issue, and
  inventory files are modified.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  — Pass; no output.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|from ['\"](@tanstack/react-table|@dnd-kit/[^'\"]+|zod|recharts|sonner|radix-ui|@radix-ui/react-slot)['\"]|\"(@tanstack/react-table|@dnd-kit/[^'\"]+|zod|recharts|sonner|radix-ui|@radix-ui/react-slot)\"\\s*:" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  — Pass; exited 1 with no matches.

## Conclusion

Data Table is no longer an unexplained docs-only gap. RadCN now treats it as a
package-backed composition surface: the package owns semantic slots, styling
hooks, selected/empty/detail/action affordances, and docs examples, while apps
own route state, data transforms, persistence, and any dashboard-specific
drag/reorder or chart-detail behavior.

The next Issue 4 experiment should move from unresolved package outcomes to
example parity depth. The regenerated inventory recommends starting with form
examples.

## Completion Review

Reviewer: Heisenberg (`019e9a1f-b1c1-73b3-a4da-d8cd477995fd`)
Fresh context: yes (`fork_context: false`)

Findings:

- Minor: `radcn/apps/docs/app/content/components.tsx` still had a stale
  `registrySeeds` entry for `data-table` with `not-shipped-yet` disposition,
  even though the rich docs entry was ready. Fixed by removing the stale seed
  entry so the registry source has only the ready Data Table outcome.

Re-review result: approved with no blocker, major, or minor findings.
