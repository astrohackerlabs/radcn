# Experiment 46: Migrate DataTable to Tailwind utilities

## Description

DataTable is a composite data grid (container + toolbar + filter + column
controls + content + sort + row + selection summary + pagination + row actions +
detail + empty). It is per-element (NO parent→child cascade), imports no Button,
and its `radcn-table-*` reuse is now DEAD markers (Table was fully migrated in
Exp 20, so `.radcn-table-row`/`.radcn-table-cell` have zero CSS). Migrate the 15
`.radcn-data-table*` rules to Tailwind utilities on the components.

Two notes:

1. The base rule is shared `.radcn-data-table, .radcn-data-table-recipe`.
   `radcn-data-table-recipe` is emitted by NO component, fixture, or docs page
   (confirmed) — it is an unused selector. Conservatively SPLIT: keep
   `.radcn-data-table-recipe { <base declarations> }` bespoke (in case a future
   docs recipe uses the raw class) and migrate `.radcn-data-table` to utilities.
2. The row's selected background (`.radcn-data-table-row--selected`) is keyed on a
   class, but the row ALSO emits `data-state="selected"` when selected — so the
   migrated utility keys on `data-[state=selected]:` (and the `--selected` class +
   the dead `radcn-table-row`/`radcn-data-table-row` classes are dropped; no test
   asserts them).

### Exact utility mapping

- base (`.radcn-data-table`): `grid gap-4 max-w-[var(--radcn-data-table-width,46rem)]
  border border-[var(--radcn-data-table-border,var(--radcn-border))] rounded-md
  p-4 bg-[var(--radcn-data-table-bg,var(--radcn-background))] text-foreground
  [font-family:var(--radcn-font)]`.
- toolbar: `flex flex-wrap items-end justify-between gap-3`.
- filter (`<label>`): `grid gap-1.5 min-w-[min(100%,14rem)] text-sm font-medium`
  (0.375rem→gap-1.5).
- filter-label: `text-foreground`.
- column-controls: `flex flex-wrap items-center justify-end gap-2`.
- content: `min-w-0`.
- sort (`<a>`): `inline-flex items-center gap-1.5 text-inherit no-underline
  hover:underline`.
- selection-summary: `m-0 text-muted-foreground text-sm`.
- pagination: `flex flex-wrap items-center justify-between gap-3`.
- row-actions: `flex flex-wrap items-center gap-2`.
- detail: `border border-border rounded-md p-3 bg-muted text-foreground`.
- empty (`<td>`): `h-24 text-center text-muted-foreground` (6rem→h-24).
- row (`<tr>`): `data-[reorderable=true]:cursor-grab
  data-[state=selected]:bg-[color-mix(in_srgb,var(--radcn-primary)_8%,transparent)]`;
  drop `radcn-table-row` + `radcn-data-table-row` + `--selected`; keep all data
  attributes (`data-reorderable`, `data-state`, `data-radcn-data-table-row`,
  `data-radcn-table-row`).

The `dataTablePart(tag, className, dataAttribute, props)` helper is updated to
take the utility string. The `radcn-data-table-caption`/`-header-cell` classes are
style-less (no CSS rule) — left as-is (markers). The custom-data-table fixture
(`--radcn-data-table-border`, `--radcn-data-table-bg`) is retained and read by the
token-referencing base utilities (asserted bg `rgb(250,245,255)`).

## Why both suites stay green

- The custom bg `rgb(250,245,255)` (data-display:149) holds via
  `bg-[var(--radcn-data-table-bg,…)]` reading the unchanged fixture token; the
  `radcn-fixture-custom-data-table` class (:148 `toHaveClass`) is on the consumer
  element (unaffected).
- The row's selected bg holds via `data-[state=selected]:` (the row emits
  `data-state="selected"`); reorderable via `data-[reorderable=true]:`.
- All layout/border/color utilities resolve via the contract + Exp 16; the dead
  `radcn-table-*` markers carried no styling.

## Changes

- `radcn/packages/radcn/src/components/data-table.tsx`: emit utility-const strings
  for each surface; update `dataTablePart` to pass utilities; the row drops the
  dead `radcn-table-row`/`radcn-data-table-row`/`--selected` classes and emits the
  state utilities; keep ALL data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated `.radcn-data-table*`
  rules; KEEP a split `.radcn-data-table-recipe` rule with the base declarations;
  KEEP `.radcn-fixture-custom-data-table`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; no junk ellipsis utility.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-data-table*` rule remains
   EXCEPT the split `.radcn-data-table-recipe`; the custom fixture retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `data-display.spec.ts` (the
   DataTable composition, the custom bg `rgb(250,245,255)`, selected rows,
   pagination/toolbar/filter/empty layout).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: DataTable renders from Tailwind utilities (no `.radcn-data-table*`
rule except the split recipe); the custom bg + selected/reorderable rows + layout
hold; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a data-table assertion regresses (custom bg, selected row); a
layout/border drifts; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

DataTable is migrated; both suites green and stable. Verification:

1. Both `styles:build` exit 0; no junk ellipsis utility (0).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-data-table*`
   rule remains EXCEPT the split-kept `.radcn-data-table-recipe`; the
   `.radcn-fixture-custom-data-table` fixture retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `data-display.spec.ts` in isolation **7
   passed** — incl. the DataTable composition, the custom bg `rgb(250,245,255)`,
   selected rows (`data-[state=selected]`), reorderable rows
   (`data-[reorderable=true]`), pagination/toolbar/filter/empty layout.
6. `git diff --check` clean; `vendor/` untouched; the three expected files changed.

No deviations from the approved design (first attempt green — the per-element,
no-cascade structure made it clean, unlike Toggle).

## Conclusion

DataTable is migrated: the container/toolbar/filter/column-controls/content/sort/
selection-summary/pagination/row-actions/detail/empty render from Tailwind
utilities; the row keys its selected/reorderable styling on the data attributes it
already emits; the unused `.radcn-data-table-recipe` selector is split-kept
bespoke; the dead `radcn-table-*` markers (from the migrated Table) were dropped.
THIRTY-FIVE components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- A composite that REUSES a now-migrated sibling's classes (here `radcn-table-row`/
  `radcn-table-cell` from Table) carries them as DEAD markers — they can be
  dropped, and the element's own state (selected/reorderable) re-keyed on its
  retained data attributes. A per-element composite with NO parent→child cascade
  migrates cleanly first-try (contrast Toggle's cascade).
- For an unused-but-shared bespoke selector (`.radcn-data-table-recipe` in the
  combined base rule), split-keep it bespoke (conservative) rather than dropping —
  zero cost, reserves the raw-class API.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README + Learnings, this
experiment file, and read access to the source + fixtures + docs)

Findings: APPROVED, no Blocker/Major/Minor. The reviewer verified all cruxes:
(1) `radcn-data-table-recipe` is emitted by NO component, fixture, or docs page —
the conservative split is safe; (2) `DataTableRow` emits `data-state="selected"`
+ `data-reorderable="true"`, and `data-display.spec.ts` locates rows via
`[data-radcn-data-table-row][data-state="selected"]`/`[data-reorderable="true"]`
(attribute selectors) — so the migrated `data-[state=selected]:`/
`data-[reorderable=true]:` utilities reproduce the rules and the dead
`radcn-table-row`/`radcn-data-table-row`/`--selected` classes are safe to drop
(NO `toHaveClass` on them); (3) every utility maps exactly to the CSS value;
(4) the custom bg `rgb(250,245,255)` + border `#7c3aed` hold via the
token-referencing base utilities; (5) `-caption`/`-header-cell` are style-less
markers (left as-is); (6) it read the full `data-display.spec.ts` data-table
section — every assertion uses attribute selectors or holds post-migration; (7)
no `text-[var()]` font-size ambiguity (uses `text-sm`); ASCII comments.

Approval result: approved — clean per-element migration; the recipe split, the
data-attribute-keyed row state, and the token-referencing custom bg are sound.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed all surfaces emit utility-const strings (only the
style-less `-caption`/`-header-cell` markers + data attrs remain); the row drops
the dead `radcn-table-row`/`radcn-data-table-row`/`--selected` classes and emits
`data-[reorderable=true]:cursor-grab` + `data-[state=selected]:bg-[color-mix(...)]`
while KEEPING all data attributes; the `dataTablePart` helper takes utility
strings. tokens.css has ZERO migrated `.radcn-data-table*` rules (only the
split-kept `.radcn-data-table-recipe` with the base declarations) + the retained
custom fixture; byte-identical `index.ts`; no junk utility. It re-ran the three
typechecks, the docs suite (11), `data-display.spec.ts` (7 — custom bg
`rgb(250,245,255)`, selected/reorderable rows, composition), and the full fixture
suite (1191). Verdict: APPROVED — a faithful, first-attempt-green migration.

Approval result: approved with no blockers — DataTable is migrated (35
components).
