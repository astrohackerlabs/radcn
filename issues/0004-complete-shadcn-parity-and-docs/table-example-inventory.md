# Table Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Table example, `table-demo`.
RadCN already has strong semantic Table substrate and fixture coverage for the
container, table, caption, header, body, footer, row, head, and cell hooks,
plus dense spacing and generic footer behavior.

The current outcome is `Covered`. Experiment 117 added named `table-demo`
parity across the docs page, candidate fixture route, and Playwright coverage.

Current RadCN evidence compared in this audit:

- `radcn/packages/radcn/src/components/table.tsx` exports `Table`,
  `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`,
  `TableCell`, and `TableCaption`, backed by semantic table elements and
  public data hooks.
- `radcn/packages/radcn/src/styles/tokens.css` defines
  `.radcn-table-container`, `.radcn-table`, `.radcn-table-caption`,
  `.radcn-table-row`, `.radcn-table-head`, `.radcn-table-cell`,
  `.radcn-table-footer`, and dense spacing styles.
- `radcn/packages/radcn/src/index.ts` re-exports Table parts.
- `radcn/packages/radcn/package.json` exposes the `./table` package subpath.
- `radcn/apps/docs/app/content/components.tsx` includes a named direct
  `table-demo` invoice table with exact caption, headers, seven invoice rows,
  footer total, width/right-align/font/colspan mappings, source snippet,
  public hooks, semantic table evidence, DataTable non-substitution copy, and
  dependency-divergence copy.
- `radcn/apps/docs/tests/coverage.spec.ts` checks named `table-demo` docs
  parity, exact invoice content, semantic table structure, public hooks,
  width/right-align/font/colspan mappings, source snippet, DataTable
  non-substitution copy, and divergence copy.
- `radcn/fixtures/scenarios/index.ts` lists the named `demo` route plus
  generic Table scenarios for default, dense, and footer.
- `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  renders the named `demo` invoice table route and generic Table fixture
  scenarios through `renderTableFixture`.
- `radcn/fixtures/tests/navigation-collection.spec.ts` asserts generic Table
  container, semantic table sections, caption, exact invoice demo content,
  width/right-align/font/colspan mappings, first cell text, dense state, and
  footer behavior.
- `radcn/fixtures/tests/native-state.spec.ts` has no direct Table-specific
  assertions; the relevant existing plain Table assertions live in
  `navigation-collection.spec.ts`.
- `radcn/data-table` docs and fixture evidence are related composition work,
  but they are not direct `table-demo` proof because upstream `table-demo`
  uses the plain `table` package surface.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `table-demo` | Renders a plain invoice table with caption `A list of your recent invoices.`, header cells `Invoice`, `Status`, `Method`, and right-aligned `Amount`, seven invoice rows `INV001` through `INV007`, exact statuses, payment methods, and amounts, and a footer row with `Total` plus right-aligned `$2,500.00`. Upstream uses `TableHead className="w-[100px]"`, `TableHead className="text-right"`, `TableCell className="font-medium"`, right-aligned amount cells, and `TableCell colSpan={3}`. Upstream package mechanics include `"use client"`, React props, `React.ComponentProps<"table">`, `React.ComponentProps<"thead">`, `React.ComponentProps<"tbody">`, `React.ComponentProps<"tfoot">`, `React.ComponentProps<"tr">`, `React.ComponentProps<"th">`, `React.ComponentProps<"td">`, `React.ComponentProps<"caption">`, `data-slot`, `className`, Tailwind utilities, `cn`, responsive overflow table container, semantic table accessibility, and vendor source. | RadCN exports dependency-free semantic Table primitives with container/table/caption/header/body/footer/row/head/cell hooks, native table elements, `scope="col"` on heads, `ariaSort`, class/style customization, dense spacing, footer, and native `TableCell colSpan` support. Named docs and candidate fixtures now render `table-demo` with exact caption, headers, seven invoice rows, statuses, payment methods, amounts, footer total, `colspan="3"`, `class="w-[100px]"` plus width style, `class="text-right"` plus text-align style, `class="font-medium"` plus font-weight style, and public table hooks. `radcn/apps/docs/tests/coverage.spec.ts` proves the docs source snippet, semantic structure, public hooks, exact content, width/right-align/font/colspan mappings, DataTable non-substitution copy, and dependency-divergence copy. `radcn/fixtures/tests/navigation-collection.spec.ts` proves the named fixture route, exact invoice content, semantic table parts, and existing generic Table scenarios. | Covered | No follow-up. |

## Decisions

- React non-dependency: RadCN should not import React or
  `React.ComponentProps<"table">` and related intrinsic element prop aliases.
  The equivalent author-facing surface is explicit Remix UI props, semantic
  table elements, and class/style customization.
- RadCN should keep plain Table and DataTable separate. `radcn/data-table`
  composition evidence does not resolve direct `radcn/table` example parity.
- Upstream `Table` container overflow maps to RadCN `data-radcn-table-container`
  and `.radcn-table-container` overflow styling.
- Upstream `data-slot` maps to public `data-radcn-table-container`,
  `data-radcn-table`, `data-radcn-table-caption`,
  `data-radcn-table-header`, `data-radcn-table-body`,
  `data-radcn-table-footer`, `data-radcn-table-row`,
  `data-radcn-table-head`, and `data-radcn-table-cell` hooks.
- Upstream caption, header, body, footer, row, head, and cell components map
  directly to semantic `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, and
  `td` elements.
- Upstream `className` maps to `class`, `cn` maps to explicit class
  composition, and Tailwind utilities map to RadCN package CSS, classes,
  style, CSS variables, and app-owned CSS.
- Upstream `w-[100px]` should map to class plus explicit width style evidence
  on the Invoice header cell.
- Upstream `text-right` should map to class plus explicit text-align style
  evidence on Amount header, body cells, and footer amount cell.
- Upstream `font-medium` should map to class plus explicit font-weight style
  evidence on invoice id cells.
- Upstream footer `colSpan={3}` maps to native `colspan="3"` on the footer
  Total cell.
- Semantic table accessibility is behavior-level parity: browser table
  semantics, captions, column headers, row groups, and cells matter more than
  literal React DOM equivalence.
- Vendor source remains a reference only. The next implementation should not
  commit vendored shadcn source or add runtime dependencies on React or
  Tailwind.
