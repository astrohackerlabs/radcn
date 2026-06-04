# Experiment 3: Stage 1 Navigation Collection and Typography Primitives

## Description

Port the next cohesive Stage 1 static batch: semantic navigation, grouped
actions, collection display, and typography recipe surfaces that should render
without component-owned client behavior.

This experiment covers:

- `breadcrumb`
- `button-group`
- `item`
- `pagination`
- `table`
- `typography`

The goal is to continue Stage 1 by proving the static primitive pattern works
for components with richer nested structure than Experiment 2. This batch should
exercise ARIA navigation labels, current-page semantics, grouped controls,
list-like item composition, semantic table sections, and typography recipes.

This experiment intentionally excludes `native-select`. That component should
be handled in a form-control experiment because it needs native submission,
reset, validation, keyboard, and browser rendering checks.

The experiment must record reusable discoveries in the issue `## Learnings`
section when they affect later components.

## Changes

Add RadCN source files under `packages/radcn/src/components/` for the covered
components:

- `breadcrumb.tsx`
- `button-group.tsx`
- `item.tsx`
- `pagination.tsx`
- `table.tsx`
- `typography.tsx`

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for this batch while preserving the prior public
hook pattern:

- stable `radcn-*` classes for public component parts;
- stable `data-radcn-*` attributes for fixture and customization probes;
- `data-variant`, `data-size`, `data-orientation`, `aria-current`, and role
  attributes where they are author-facing or semantic;
- CSS variables for themeable spacing, color, border, and typography values
  where appropriate.

Update candidate fixtures so the Remix 3 app imports the new components from
`radcn`, not fixture-local placeholders.

Update React Router reference fixtures with equivalent shadcn/ui-inspired
examples for the same scenarios. Reference fixtures may use local reference
markup/styles instead of importing vendored source directly, but they must
preserve the visible and semantic surfaces needed for comparison.

Add shared scenarios only for this batch. Expected coverage:

- `breadcrumb/default`
- `breadcrumb/collapsed`
- `breadcrumb/custom-separator`
- `button-group/horizontal`
- `button-group/vertical`
- `button-group/with-separator`
- `item/default`
- `item/variants`
- `item/grouped`
- `pagination/default`
- `pagination/active`
- `pagination/custom-labels`
- `table/default`
- `table/dense`
- `table/footer`
- `typography/article`
- `typography/inline`
- `typography/custom-token`

Add component-specific Playwright checks for semantics and customization, not
only screenshot capture. The checks should prove at least:

- `Breadcrumb` renders `nav[aria-label="breadcrumb"]`, ordered-list structure,
  current-page semantics, collapsed ellipsis hooks, and custom separator hooks.
- `ButtonGroup` renders `role="group"` with horizontal and vertical orientation
  hooks, and exposes text/separator part hooks.
- `Item` exposes group/list semantics, variant and size hooks, media/content/
  title/description/actions/header/footer slots, and separator hooks.
- `Pagination` renders `nav[aria-label="pagination"]`, link/list structure,
  active page `aria-current="page"`, previous/next labels, and ellipsis hooks.
- `Table` renders semantic `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`,
  `th`, and `td` elements with stable slot hooks.
- `Typography` renders semantic headings, paragraphs, lists, blockquotes,
  inline code, lead/large/small/muted text, and custom token hooks. If
  implementation treats typography as recipes rather than component primitives,
  record that as an approved divergence and still provide fixture/demo coverage.

Update documentation for navigation, collection, and typography primitives. This
can extend `docs/radcn-source.md` or add a focused Stage 1 note. It must
explain:

- static source and export shape for this batch;
- slot, variant, size, and orientation conventions;
- semantic ARIA rules for breadcrumb, pagination, button-group, and item group;
- table semantics and responsive/container behavior;
- typography as RadCN components or recipes, including any divergence from
  shadcn/ui's examples-only typography page;
- customization probes through classes, attributes, and CSS variables.

## Verification

The experiment passes if:

1. RadCN source exists for all six covered component families.
2. `packages/radcn` exports all six component families from package subpaths and
   the root index.
3. The Remix 3 candidate app imports all covered components from RadCN source.
4. Shared scenarios include default, variant/state, structure, navigation,
   collection, typography, and customization probes for this batch.
5. Reference and candidate fixture routes exist for every shared scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for all
   shared scenarios.
10. Component-specific checks prove the semantics and customization behavior
    listed in `## Changes`.
11. Documentation explains source layout, slots, variants, orientation, ARIA
    semantics, table behavior, typography disposition, and customization hooks
    for this batch.
12. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 1. It should leave only the remaining
Stage 1 native form-control work and any explicitly discovered cleanup needed
before Stage 1 can close.

## Design Review

Independent AI design review was performed by subagent `Banach`, which approved
the design with no required fixes.

The review confirmed that the experiment is scoped to Stage 1, covers only
`breadcrumb`, `button-group`, `item`, `pagination`, `table`, and `typography`,
preserves the one-experiment-at-a-time workflow, provides concrete verification
for every named family, leaves `native-select` out for the valid reason that it
needs native form-control verification, does not design future experiments, and
keeps `vendor/` clean.

## Result

**Result:** Pass

Experiment 3 ported the navigation, collection, and typography batch into
`packages/radcn`:

- `Breadcrumb`, `BreadcrumbEllipsis`, `BreadcrumbItem`, `BreadcrumbLink`,
  `BreadcrumbList`, `BreadcrumbPage`, `BreadcrumbSeparator`
- `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`
- `Item`, `ItemActions`, `ItemContent`, `ItemDescription`, `ItemFooter`,
  `ItemGroup`, `ItemHeader`, `ItemMedia`, `ItemSeparator`, `ItemTitle`
- `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`,
  `PaginationLink`, `PaginationNext`, `PaginationPrevious`
- `Table`, `TableBody`, `TableCaption`, `TableCell`, `TableFooter`,
  `TableHead`, `TableHeader`, `TableRow`
- `TypographyBlockquote`, `TypographyH1`, `TypographyH2`, `TypographyH3`,
  `TypographyH4`, `TypographyInlineCode`, `TypographyLarge`,
  `TypographyLead`, `TypographyList`, `TypographyListItem`,
  `TypographyMuted`, `TypographyP`, `TypographySmall`

Each family is exported from the package root and from a package subpath. The
Remix 3 candidate fixture imports the batch from `radcn`, not from fixture-local
placeholder components.

Shared scenarios were added for the batch:

- `breadcrumb/default`
- `breadcrumb/collapsed`
- `breadcrumb/custom-separator`
- `button-group/horizontal`
- `button-group/vertical`
- `button-group/with-separator`
- `item/default`
- `item/variants`
- `item/grouped`
- `pagination/default`
- `pagination/active`
- `pagination/custom-labels`
- `table/default`
- `table/dense`
- `table/footer`
- `typography/article`
- `typography/inline`
- `typography/custom-token`

The semantic and customization checks live in
`fixtures/tests/navigation-collection.spec.ts`. They verify breadcrumb
navigation/current-page/ellipsis/separator hooks, button-group orientation and
part hooks, item group/listitem and slot hooks, pagination landmark/active-page
and label hooks, table semantic sections and dense/footer hooks, and typography
semantic recipe/custom-token hooks.

Documentation was extended in `docs/radcn-source.md` to cover source shape,
slot conventions, variants, orientation hooks, ARIA semantics, table behavior,
typography disposition, and customization probes.

Typography is an approved divergence from shadcn/ui's examples-only typography
surface. RadCN exposes importable recipe components so the docs site and
fixtures can verify semantic text styles consistently.

Verification run on 2026-06-04:

```bash
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm fixtures:reference:typecheck
pnpm fixtures:artifacts
```

All commands passed. `pnpm fixtures:artifacts` reported `120 passed`. The
artifact manifest contains 104 paired screenshot entries across 52 scenarios,
including 18 Experiment 3 scenarios. The reference app uses port `4601`, and
the candidate app uses port `4602`.

`git status --short -- vendor` was clean. Generated artifact and test-result
outputs remain ignored.

Warnings observed during verification:

- Node reported `[DEP0205] DeprecationWarning: module.register() is deprecated`
  during React Router and Playwright commands.
- The fixture web servers reported that `NO_COLOR` is ignored when
  `FORCE_COLOR` is set.

Neither warning blocked the experiment result.

Reusable discoveries were recorded in the issue `## Learnings` section:

- Navigation and collection primitives treat ARIA semantics as part of the
  public port contract.
- shadcn/ui typography is examples-only, while RadCN exposes importable recipe
  components as an approved divergence.
- Stage 1 static components can use real semantic container elements rather
  than client wrappers.

## Completion Review

Independent AI completion review was performed by subagent `Laplace`, which
approved the completed experiment with **Pass**.

The review confirmed that:

- source files exist for all six covered families;
- package subpath exports and root exports exist;
- candidate fixtures import the batch from `radcn`;
- shared scenarios include the 18 expected Experiment 3 probes;
- reference and candidate route dispatch exists for all six families;
- Playwright checks cover the required semantics and customization hooks;
- docs cover source shape, slots, variants/orientation, ARIA rules, table
  behavior, typography recipe disposition, and customization hooks;
- Issue 2 learnings include Experiment 3 entries;
- `vendor/` is clean;
- the artifact manifest contains 104 paired screenshots across 52 scenarios,
  including 18 Experiment 3 scenarios and both apps.

Residual risks:

- Screenshot capture is still not pixel-diff visual approval.
- `radcnStyles` and `tokens.css` remain duplicated, which is already tracked as
  a prior learning.
- Typography as importable recipe components is an approved divergence from
  shadcn/ui's examples-only typography surface.

## Conclusion

Experiment 3 completes the remaining Stage 1 static/navigation/collection/
typography batch but does not complete Stage 1. The next experiment should
handle the remaining Stage 1 native form-control work, especially
`native-select`, and then audit whether Stage 1 can close or needs cleanup.
