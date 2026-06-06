# Experiment 18: Implement item example parity depth

## Description

Experiment 17 audited all 10 upstream shadcn Item examples and found that
RadCN's base Item package exists, but example parity depth is not complete.
Current proof covers the package slots, list/listitem semantics, outline and
muted variants, small and extra-small sizes, image and icon media hooks,
headers, footers, and separators. It does not yet prove link-like Items,
Avatar media, stacked-avatar media, DropdownMenu rows, image header cards,
image row lists, secondary metadata content, richer size/variant matrices, or
icon-only Button actions.

This experiment implements that Item parity depth. It should preserve RadCN's
Remix 3 model: no React dependency, no Radix Slot, no shadcn `asChild`, no Next
`Image` dependency, no upstream icon package dependency, no vendor imports, and
no npm publishing.

## Changes

- Update `radcn/packages/radcn/src/components/item.tsx`.
  - Add an explicit link path to `Item`, likely through `href`, optional
    `target`, `rel`, and `rmxDocument` props, so shadcn's link-like `asChild`
    examples map to native anchor semantics without Radix Slot.
  - Preserve the current default `div` + `role="listitem"` output when no
    `href` is provided.
  - Use a concrete wrapper strategy for linked Items: keep the outer Item
    wrapper as the `data-radcn-item` row with `role="listitem"` so `ItemGroup`
    list semantics remain intact, and render a native full-row anchor inside it
    with a stable hook such as `data-radcn-item-link`.
  - Ensure linked Items expose the same `data-radcn-item`, `data-size`,
    `data-variant`, class hooks, styles, and children as unlinked Items while
    also exposing native anchor attributes on the inner link.
  - Do not add image loading, icon, dropdown, avatar, or repeated-list state to
    Item.
- Update RadCN styles if composition gaps appear:
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/packages/radcn/src/styles/index.ts`
  Refine only the hooks required for link-like Items, Avatar media,
  stacked-avatar media, image media, image headers, secondary metadata content,
  DropdownMenu item rows, icon media, and icon-only action composition.
- Update docs in `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Item docs page from seed coverage into rich docs.
  - Demonstrate all 10 upstream Item example families: `avatar`, `demo`,
    `dropdown`, `group`, `header`, `icon`, `image`, `link`, `size`, and
    `variant`.
  - Document that shadcn `asChild`/Radix Slot maps to explicit RadCN `href`
    link output with an Item row wrapper plus native anchor.
  - Document that React fragments/arrays map to server-rendered repeated rows
    or app-owned data mapping.
  - Document that Next `Image`, remote image URLs, and lucide icon packages are
    presentation/app choices rather than RadCN package dependencies.
  - Keep installation copy aspirational and do not claim RadCN is published.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  Add fixture scenarios for all 10 upstream Item examples: `avatar`, `demo`,
  `dropdown`, `group`, `header`, `icon`, `image`, `link`, `size`, and
  `variant`. Preserve the existing `default`, `variants`, and `grouped`
  scenarios unless a replacement intentionally proves the same behavior.
- Update Playwright coverage in
  `radcn/fixtures/tests/navigation-collection.spec.ts` or a focused Item test
  file if that keeps the suite clearer. Verify:
  - default Item still renders as `role="listitem"` inside `ItemGroup`;
  - link-like Items render `data-radcn-item` row wrappers with
    `role="listitem"` plus nested native anchors with expected `href`, and
    external-link `target` and `rel` attributes where relevant;
  - link-like Items inside `ItemGroup` preserve grouped row/list semantics
    while still exposing accessible links through the nested anchors;
  - Avatar media and stacked-avatar media compose inside `ItemMedia`;
  - Item rows compose inside DropdownMenu items without Item owning menu state;
  - ItemGroup row lists render separators between repeated rows;
  - ItemHeader can contain image/card media using deterministic local/static
    or inline image content rather than Next `Image`;
  - `ItemMedia variant="icon"` and `ItemMedia variant="image"` render the
    expected hooks;
  - secondary `ItemContent` metadata such as duration text can sit beside the
    primary content;
  - default, outline, and muted variants render with Button actions;
  - default and small sizes render distinct `data-size` values and visible
    size behavior;
  - icon-only Button actions expose accessible names.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md`.
  - Change each upstream row to `Covered` or `Intentional divergence` after the
    new proof lands.
  - Preserve mapping decisions from Experiment 17.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `item` as a resolved example cluster with evidence from Experiments
    17 and 18 plus `item-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final Item outcome and the next generated
  recommendation.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  or the focused Item Playwright spec created by this experiment.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 10 upstream Item example ids appear
  exactly once in `item-example-inventory.md`.
- A deterministic Node check proves every upstream Item example row has a final
  outcome of `Covered` or `Intentional divergence`, and that no row keeps a
  `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "item"`, `status = "resolved"`, and evidence
  for Experiment 17, Experiment 18, and `item-example-inventory.md`.
- If `tokens.css` changes, a deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- A deterministic Node check proves `item` is absent from
  `## Unresolved Example Clusters` and is not the `## First Recommended
  Cluster` in `parity-inventory.md`.
- Deterministic checks prove the new Item anchor API is exported from both
  `radcn/packages/radcn/src/components/item.tsx` and the root
  `radcn/packages/radcn/src/index.ts` type surface.
- A positive documentation check proves
  `issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md`
  still records intentional mappings for `asChild`, Radix Slot, React
  fragments/arrays, Next `Image`, external/remote images, and lucide icons.
- `rg -n "from ['\"]react['\"]|from ['\"][^'\"]*next/image|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*@tabler/icons-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|Slot\\.Root|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.
- `rg -n "asChild" radcn/packages/radcn radcn/fixtures/candidate-remix`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Item still lacks proof for any audited upstream example family.
- Link-like Item examples cannot render native anchor semantics.
- Link-like Item examples inside ItemGroup cannot preserve list/listitem row
  semantics while also exposing accessible links.
- Icon-only Button actions inside Items cannot expose accessible names.
- The implementation depends on React, Radix Slot, shadcn `asChild`, Next
  `Image`, upstream icon packages, remote image availability, or vendor
  imports.
- Docs or fixtures imply Item owns DropdownMenu, Avatar, Button, Separator,
  image loading, icon, or repeated-list state.
- The audit inventory marks `item` resolved while any upstream Item example
  still lacks package/docs/fixture/test evidence or a documented intentional
  divergence.
- The regenerated parity inventory still recommends `item` as the first
  unresolved example cluster.

## Design Review

Reviewer: Galileo (`019e9aa5-3776-78c1-ae88-cd9e62ebbb3f`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the plan did not fully specify how link-like Items preserve both
  anchor semantics and ItemGroup list semantics. It only described native
  anchor output and default `div role="listitem"` output, missing upstream
  `item-image` where link-like Items are rows inside an ItemGroup. Fixed by
  specifying a wrapper strategy: linked Items keep the outer `data-radcn-item`
  row as `role="listitem"` and render a nested full-row native anchor with a
  stable link hook, with Playwright proof for both row/list semantics and
  accessible links.
- Major: none.
- Minor: the parity inventory check used a broad grep for Item recommendation
  text across the whole generated inventory. Fixed by replacing it with a
  deterministic check scoped to `## Unresolved Example Clusters` and
  `## First Recommended Cluster`.

Review result: not approved until the blocker is fixed. The findings above
have been addressed and require re-review before the plan commit.

Re-review result: approved. Galileo confirmed the linked Item strategy is now
testable: the outer `data-radcn-item` row wrapper keeps `role="listitem"`, the
nested native full-row anchor exposes link semantics through a stable hook, and
verification/failure criteria cover grouped link/list behavior. Galileo also
confirmed the parity-inventory check is now scoped to unresolved examples and
the first recommendation. No new blocker was introduced.

## Result

**Result:** Pass

Implemented Item example parity depth.

- `radcn/packages/radcn/src/components/item.tsx` now supports linked Items
  through `href`, `target`, `rel`, and `rmxDocument`. Unlinked Items keep the
  previous `div` + `role="listitem"` output. Linked Items keep the outer
  `data-radcn-item` row wrapper with `role="listitem"` and render a nested
  native anchor with `data-radcn-item-link`.
- `radcn/packages/radcn/src/styles/tokens.css` and generated
  `radcn/packages/radcn/src/styles/index.ts` now include linked-row and native
  image composition hooks for Item.
- `radcn/apps/docs/app/content/components.tsx` now has rich Item docs and a
  live package-backed example covering avatar, demo, dropdown, group, header,
  icon, image, link, size, and variant families.
- `radcn/fixtures/scenarios/index.ts`,
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`, and
  `radcn/fixtures/tests/navigation-collection.spec.ts` now include focused
  candidate fixture proof for all 10 upstream Item example families.
- `issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md`
  marks every upstream Item example row as `Covered` and preserves the
  intentional mappings for shadcn `asChild`/Radix Slot, React fragments/arrays,
  Next `Image`, external/remote images, and lucide icons.
- `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json` marks
  the `item` example cluster resolved, and regenerated
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` no longer
  lists `item` as unresolved. The first generated recommendation is now
  example parity for `spinner`.

Verification run:

- `pnpm radcn:typecheck` passed.
- `pnpm --dir radcn/apps/docs typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  passed: 8 tests passed. The run printed the existing Node
  `module.register()` deprecation warning.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  passed: 5 tests passed. The run printed the existing Node
  `module.register()` deprecation warning.
- `node scripts/audit-shadcn-parity.mjs` passed and regenerated
  `parity-inventory.md`.
- The parity regeneration no-diff check passed after regeneration.
- Deterministic Node checks passed for:
  - all 10 upstream Item example ids appearing exactly once in
    `item-example-inventory.md`;
  - every upstream Item example row having a final outcome of `Covered` or
    `Intentional divergence`;
  - `resolved-clusters.json` containing `examples` entry `slug = "item"`,
    `status = "resolved"`, and evidence for Experiment 17, Experiment 18, and
    `item-example-inventory.md`;
  - `radcn/packages/radcn/src/styles/index.ts` exactly serializing
    `tokens.css`;
  - `item` being absent from `## Unresolved Example Clusters` and not the
    `## First Recommended Cluster`;
  - the Item anchor API being present in the component implementation and
    public root type surface;
  - `item-example-inventory.md` retaining mapping records for `asChild`, Radix
    Slot, React fragments/arrays, Next `Image`, external/remote images, and
    lucide icons.
- The dependency and scope scans passed:
  - `rg -n "from ['\"]react['\"]|from ['\"][^'\"]*next/image|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*@tabler/icons-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|Slot\\.Root|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
    exited 1 with no matches.
  - `rg -n "asChild" radcn/packages/radcn radcn/fixtures/candidate-remix`
    exited 1 with no matches.
- `git diff --check` passed.
- `git status --short` showed only expected package, docs, fixture, test,
  issue, resolved-cluster, and generated-inventory changes before completion
  review.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  printed no output.

## Conclusion

Item example parity depth is complete. RadCN now has a concrete web-first
replacement for shadcn's link-like `asChild` Item examples: an explicit linked
Item API that preserves list row semantics and native anchors without Radix
Slot. The cluster is resolved in the generated parity inventory, and the next
Issue 4 experiment should audit the generated first recommendation:
`spinner` example parity.

## Completion Review

Reviewer: Socrates (`019e9ab4-b409-7b50-ba69-c0b3cef3326c`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Review result: approved. Socrates confirmed the implementation matches the
approved experiment scope; the experiment file has `## Result` and
`## Conclusion`; the Issue 4 README marks Experiment 18 as `Pass` and records
the Item outcome plus next `spinner` recommendation; the linked Item API
matches the approved wrapper strategy; root type exports still expose
`ItemProps`; fixture scenarios cover all Item example families; Playwright
coverage checks anchors, list semantics, Avatar media, DropdownMenu rows,
images, size, variants, and actions; `git diff --check` passed; vendor status
printed no output; and the result commit had not been made before review.

Socrates also independently reran the main verification checks:
`pnpm radcn:typecheck`, `pnpm --dir radcn/apps/docs typecheck`,
`pnpm fixtures:candidate:typecheck`,
`pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`,
`pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`,
dependency/scope scans, deterministic inventory checks, resolved-cluster
checks, style serialization checks, Item type-surface checks, vendor status,
and `git diff --check`. All passed. Socrates did not rerun
`node scripts/audit-shadcn-parity.mjs` directly to keep the review read-only,
but confirmed the recorded generated inventory state matched deterministic
checks.
