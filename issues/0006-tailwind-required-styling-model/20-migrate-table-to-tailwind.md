# Experiment 20: Migrate Table to Tailwind utilities

## Description

Migrate Table and its sub-components (the container `<div>`, Table, TableHeader,
TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption) off
bespoke `radcn-table*` CSS to verbatim shadcn v4 utilities. Table has NO custom
tokens, NO cross-component selectors (no other component or fixture targets
`.radcn-table*` as a styling class), and is not composed via raw class strings
(DataTable composes the Table components, not raw classes).

shadcn v4 mappings (vendored `table.tsx`, verbatim):

- container `<div>`: `relative w-full overflow-x-auto`
- Table (`<table>`): `w-full caption-bottom text-sm`
- TableHeader (`<thead>`): `[&_tr]:border-b`
- TableBody (`<tbody>`): `[&_tr:last-child]:border-0`
- TableFooter (`<tfoot>`): `border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`
- TableRow (`<tr>`): `border-b transition-colors hover:bg-muted/50
  has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted`
- TableHead (`<th>`): `h-10 px-2 text-left align-middle font-medium
  whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0
  [&>[role=checkbox]]:translate-y-[2px]`
- TableCell (`<td>`): `p-2 align-middle whitespace-nowrap
  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]`
- TableCaption (`<caption>`): `mt-4 text-sm text-muted-foreground`

`bg-muted`, `text-foreground`, `text-muted-foreground` resolve via the
Experiment 2 contract; the `border-b`/`border-t` colors come from the
Experiment 16 `--border` base. The `data-[state=selected]` and `[role=checkbox]`
selectors are inert in current usage (no test exercises them) but are kept
verbatim.

This adopts shadcn's table appearance, removing RadCN divergences (the bordered
container, the secondary-background headers, the 0.75rem padding). None of those
are asserted (see below), so this is faithful shadcn parity with no test
regression.

Documented divergence (dense): RadCN's Table has a `dense` prop that tightened
head/cell padding (`0.375rem 0.5rem` vs `0.75rem`). shadcn has no dense variant
and its cells are uniformly `p-2` (`0.5rem`) — already as tight as RadCN's
dense. So the migration keeps the `dense` prop and the `data-dense` attribute
(the ONLY dense assertion is `navigation-collection.spec.ts:323`
`toHaveAttribute('data-dense', 'true')`, which still passes), but `dense` no
longer changes padding (shadcn parity, like Card's `size`). The
`radcn-table--dense` class is dropped.

## Why both suites stay green

- The only computed-style table assertions are
  `[data-radcn-table-cell].nth(0)` `font-weight: 500` and `.nth(3)`
  `text-align: right` (fixture `navigation-collection.spec.ts:298,303`; docs
  `coverage.spec.ts:456,461`). Both are backed by INLINE styles in the fixtures
  (`style="font-weight:500"`, `style="text-align:right"`) — plus the consumer
  classes `font-medium`/`text-right` — so they survive regardless of the base
  migration.
- The `data-dense` assertion checks the ATTRIBUTE (retained), not padding.
- No test asserts the container border, header background, cell padding, row
  border, or caption styling — so adopting shadcn's appearance regresses
  nothing.
- All semantic/section assertions (`data-radcn-table*` attributes, section
  presence) are preserved via the retained data attributes and element
  structure.

## Changes

- `radcn/packages/radcn/src/components/table.tsx`: replace each component's
  `radcn-table*` class(es) with the verbatim shadcn strings above, via the same
  `classes(<shadcn string>, className)` pattern used in all 12 prior migrations
  (the component stays a Remix 3 `Handle` component; only the class string
  changes). Concretely, e.g. the container becomes
  `classes('relative w-full overflow-x-auto', className)`, the table becomes
  `classes('w-full caption-bottom text-sm', className)` (the
  `dense ? 'radcn-table--dense' : undefined` argument is DROPPED — the
  `radcn-table--dense` class is removed entirely), and TableCell becomes
  `classes('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)`.
  Keep ALL `data-radcn-table*` attributes, `data-dense={dense ? 'true' : undefined}`,
  `aria-sort`, `scope`, `colspan`, and the `dense` prop ON `TableProps` (with a
  comment: retained for API compatibility + the `data-dense` hook; no longer
  adds a class or changes padding — shadcn parity, like Card's `size`).
- `radcn/packages/radcn/src/styles/tokens.css`: remove all `.radcn-table*`
  rules (container, table, caption, row, head/cell base, `--dense`,
  head/footer) — migration comment worded WITHOUT the literal removed selector
  tokens (per Experiment 7's learning, so "no longer present" greps stay
  unambiguous).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `table.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the table utilities
   (`caption-bottom`, `[&_tr]:border-b`, `hover:bg-muted/50`, `bg-muted/50`,
   `[&:has([role=checkbox])]:pr-0`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-table` rule remains;
   the component emits no `radcn-table*` class.
4. Docs suite green (11), run twice — incl. the table cell font-weight/text-align.
5. Fixture suite green (1191), run twice — incl.
   `navigation-collection.spec.ts` table tests (sections, the `data-dense`
   attribute, the cell font-weight/text-align).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Table + subparts render from Tailwind utilities (no `radcn-table*`
classes emitted); all `data-radcn-table*`/`data-dense`/`aria-sort` hooks intact;
BOTH suites green and stable; `tokens.css`/`index.ts` byte-identical.

Fail criteria: any table assertion regresses; a utility not generated;
`tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Table is migrated; both suites are green and stable. Verification:

1. Both `styles:build` exit 0; the table utilities generate (`caption-bottom`,
   `has-aria-expanded`, `[&:has([role=checkbox])]` — grep count 2 in the fixture
   CSS).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-table` rule remains
   (grep empty); the component emits no `radcn-table*` class.
4. Docs suite: **11 passed** ×2 — incl. the table cell font-weight/text-align.
5. Fixture suite: **1191 passed** ×2 — incl. the table-sections,
   `data-dense='true'` attribute, and the inline-backed cell
   font-weight:500/text-align:right assertions.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   three expected files changed.

No deviations from the approved design.

## Conclusion

Table is migrated to shadcn v4 utilities across the container and 8
sub-components — the cleanest container migration so far (no custom tokens, no
cross-component selectors, no raw class-string consumers). It adopts shadcn's
table appearance (borderless container, transparent headers, `p-2` cells, hover
rows), removing RadCN's divergences; none were asserted. The `dense` prop and
`data-dense` attribute are retained as an inert API/hook (the `radcn-table--dense`
class dropped; shadcn has no dense variant). Thirteen components are now
migrated (Badge, Skeleton, Separator, Kbd, Empty, Label, AspectRatio, Card,
Input, Textarea, Alert, Table — plus sub-components).

Learnings for later experiments (also copied to the issue README Learnings
digest):

- A component whose assertions are all inline-backed or attribute-only, with no
  custom tokens / cross-component selectors / raw class-string consumers, is a
  clean verbatim migration even when shadcn's appearance differs markedly from
  RadCN's (here the bordered container + secondary headers) — adopting shadcn's
  look is the goal, and unasserted appearance changes are acceptable.
- A RadCN-only variant with no shadcn equivalent whose effect isn't asserted
  (Table `dense`, like Card `size`) is kept as an inert prop + `data-*` hook;
  drop its class and document the parity.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources incl. vendored shadcn)

Round 1: the reviewer independently verified EVERY substantive aspect PASSES —
the cell `font-weight:500`/`text-align:right` assertions are inline-backed
(`navigation-collection.tsx:890,893`) and survive; the `data-dense` assertion
checks the attribute (retained); the section/`data-radcn-table*` assertions are
preserved; NO test asserts container border/header bg/cell padding/row
border/caption (so adopting shadcn's appearance regresses nothing); there are
NO cross-component `.radcn-table*` selectors and NO raw `radcn-table*` styling
class strings in fixtures/docs; the nine shadcn strings are verbatim; dense is
safe as an inert hook. It returned REJECTED solely because the component source
still emits `radcn-table*` (implementation not done yet) and it wanted
before/after code snippets — i.e. it faulted the design for being
pre-implementation and for prose-vs-code form.

Lead-agent judgment: those are design-vs-implementation / documentation-verbosity
misreads (the reviewer was explicitly asked not to fault planned-but-unimplemented
code; `AGENTS.md` forbids implementing before approval + plan commit). Its own
substantive verification is an APPROVAL of the design's correctness. The clarity
requests are addressed: the Changes section now spells out the
`classes(<shadcn string>, className)` pattern (identical to 12 prior
migrations), that the `radcn-table--dense` class is DROPPED while the `dense`
prop + `data-dense` attribute are retained, and the literal-free migration-comment
rule.

Round 2 (re-review of these clarifications by a fresh Claude subagent):
confirmed the Changes section is now unambiguous (the `classes()` pattern,
`radcn-table--dense` dropped while `dense`/`data-dense` retained, literal-free
comment) and independently re-verified all substantive correctness (inline-
backed cell assertions, attribute-only dense assertion, no
container/header/padding assertions, no cross-component `.radcn-table`
dependency, verbatim shadcn strings). No new blocker. Verdict: APPROVED.

Approval result: approved (round 2). Design correct, complete, and
implementation-ready; round-1's "rejection" was a design-vs-implementation /
verbosity misread, overruled by lead judgment with the substantive all-pass
verification standing.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed all nine table parts emit the verbatim shadcn strings
with no `radcn-table*` class, the `radcn-table--dense` class dropped while the
`dense` prop + `data-dense` attribute are retained, and all
`data-radcn-table*`/`aria-sort`/`scope`/`colspan` hooks kept; tokens.css has no
`.radcn-table` rule (literal-free comment) and byte-identical `index.ts`. It
independently re-ran both `styles:build` (utilities present), the three
typechecks, the docs suite (2/2 = 11), and the fixture suite (2/2 = 1191) —
confirming the table-sections + `data-dense='true'` + the cell
font-weight/text-align tests pass, and verified those cell assertions are
genuinely inline-backed (so they pass legitimately, not via residual CSS). It
judged the migration faithful and dense-as-inert-hook acceptable (Badge/Alert/
Card precedent). Verdict: APPROVED.

Approval result: approved with no blockers.
