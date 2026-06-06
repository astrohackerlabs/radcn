# Experiment 24: Implement toggle-group example parity depth

## Description

Experiment 23 audited all 7 upstream shadcn Toggle Group examples and found
that RadCN's primitive behavior is strong, but example parity depth is not
complete. Current proof covers single selection, multiple selection, selected
state hooks, roving focus, disabled item skip behavior, vertical orientation,
and custom token styling. It does not yet prove icon-only formatting groups,
icon+label spacing, group-level disabled behavior, group-level small/large
sizing, group-level outline variants, spacing between items, or selected icon
styling.

This experiment implements that Toggle Group parity depth. It should preserve
RadCN's Remix 3 model: no React dependency, no Radix ToggleGroup dependency, no
lucide dependency, no Tailwind dependency, no vendor imports, and no npm
publishing.

## Changes

- Update `radcn/packages/radcn/src/components/toggle-group.tsx`.
  - Add narrow group-level props needed for shadcn parity:
    `disabled?: boolean`, `size?: ToggleSize`, `variant?: ToggleVariant`, and
    `spacing?: number | string`.
  - Render stable group hooks for those props, such as `data-disabled`,
    `data-size`, `data-variant`, and a CSS variable for spacing.
  - Propagate group-level `disabled`, `size`, and `variant` defaults to child
    `ToggleGroupItem`s without React context. A simple server-rendered approach
    is acceptable, such as data attributes/CSS selectors for visual defaults
    and browser enhancement that applies disabled behavior to grouped items.
  - Preserve item-level `disabled`, `size`, and `variant` overrides.
  - Ensure group-level disabled behavior prevents pointer and keyboard toggling,
    removes disabled items from roving focus, and exposes disabled state on
    items through native `disabled`, `aria-disabled`, or equivalent public
    hooks after enhancement.
  - Preserve existing single/multiple selection, `aria-pressed`, `data-state`,
    `data-value`, and keyboard/orientation behavior.
- Update RadCN styles:
  - `radcn/packages/radcn/src/styles/tokens.css`
  - generated `radcn/packages/radcn/src/styles/index.ts`
  Add only the styles required for group-level size/variant/spacing defaults,
  selected-state icon styling hooks, icon-only buttons, icon+label spacing, and
  disabled group behavior.
- Update docs in `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Toggle Group docs page from seed coverage into rich docs.
  - Demonstrate all 7 upstream Toggle Group example families:
    `demo`, `disabled`, `lg`, `outline`, `single`, `sm`, and `spacing`.
  - Document that Radix ToggleGroup maps to RadCN's native button group plus
    `enhanceToggleGroup`.
  - Document that lucide icons map to app-owned glyphs/assets.
  - Document that Tailwind `h-4 w-4` and selected-state utility selectors map
    to RadCN classes, inline styles, CSS variables, and public `data-state`
    hooks.
  - Keep installation copy aspirational and do not claim RadCN is published.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`
  Add direct fixture scenarios for all 7 upstream Toggle Group examples:
  `demo`, `disabled`, `lg`, `outline`, `single`, `sm`, and `spacing`. Preserve
  the existing `single`, `multiple`, `disabled`, `vertical`, and
  `custom-token` scenarios unless a replacement intentionally proves the same
  behavior.
- Update Playwright coverage in `radcn/fixtures/tests/toggle.spec.ts`.
  Verify:
  - icon-only multiple and single groups expose `aria-label`s, decorative
    app-owned glyphs, `aria-pressed`, `data-state`, `data-value`, and
    click/keyboard state changes;
  - group-level `disabled` disables every item, prevents click and keyboard
    toggling, and removes items from roving focus;
  - group-level `size="sm"` and `size="lg"` render visibly distinct item sizes;
  - group-level `variant="outline"` renders outline ToggleGroupItems while
    preserving item-level overrides;
  - `spacing` changes the visible gap between grouped items;
  - icon+label spacing examples render text labels and selected-state icon
    styling through public hooks/classes/styles;
  - existing single/multiple, disabled item, vertical keyboard, and custom
    token tests continue to pass.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md`.
  - Change each upstream row to `Covered` or `Intentional divergence` after the
    new proof lands.
  - Preserve mapping decisions from Experiment 23.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `toggle-group` as a resolved example cluster with evidence from
    Experiments 23 and 24 plus `toggle-group-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final Toggle Group outcome and the next
  generated recommendation.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts toggle.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 7 upstream Toggle Group example ids
  appear exactly once in `toggle-group-example-inventory.md`.
- A deterministic Node check proves every upstream Toggle Group example row has
  a final outcome of `Covered` or `Intentional divergence`, and that no row
  keeps a `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "toggle-group"`, `status = "resolved"`, and
  evidence for Experiment 23, Experiment 24, and
  `toggle-group-example-inventory.md`.
- If `tokens.css` changes, a deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- A deterministic Node check proves `toggle-group` is absent from
  `## Unresolved Example Clusters` and is not the `## First Recommended
  Cluster` in `parity-inventory.md`.
- Deterministic checks prove the new group-level props are present in
  `radcn/packages/radcn/src/components/toggle-group.tsx` and exported through
  the root `radcn/packages/radcn/src/index.ts` type surface.
- Positive documentation checks prove
  `issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md`
  still records intentional mappings for React, Radix ToggleGroup, lucide
  icons, Tailwind size utilities, Tailwind selected-state selectors, app-owned
  glyphs, and public state hooks.
- A deterministic docs check proves `radcn/apps/docs/app/content/components.tsx`
  contains the 7 intended Toggle Group example family labels or slugs
  (`demo`, `disabled`, `lg`, `outline`, `single`, `sm`, `spacing`) and the
  required mapping copy for Radix ToggleGroup, lucide icons, Tailwind
  utilities, selected-state selectors, and app-owned glyphs.
- A focused docs Playwright assertion or deterministic source check proves the
  Toggle Group docs page renders package-backed ToggleGroup examples for the
  family matrix rather than only the generic seed preview.
- `rg -n "from ['\"]react['\"]|from ['\"][^'\"]*radix-ui|from ['\"][^'\"]*@radix-ui|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.
- A targeted Tailwind-avoidance check proves Toggle Group docs, fixtures, and
  source snippets do not use upstream Tailwind implementation strings such as
  `h-4`, `w-4`, `data-[state=on]:bg-transparent`,
  `data-[state=on]:*:[svg]:fill-yellow-500`,
  `data-[state=on]:*:[svg]:stroke-yellow-500`,
  `data-[state=on]:*:[svg]:fill-red-500`,
  `data-[state=on]:*:[svg]:stroke-red-500`,
  `data-[state=on]:*:[svg]:fill-blue-500`, or
  `data-[state=on]:*:[svg]:stroke-blue-500` as implementation code. Mentions
  are allowed only in issue inventory or docs divergence/mapping prose.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Toggle Group still lacks proof for any audited upstream example family.
- Group-level disabled, size, variant, or spacing behavior is absent without a
  documented intentional divergence and equivalent user-facing proof.
- Icon-only ToggleGroupItems lack accessible names.
- Selected state hooks cannot support icon styling.
- The implementation depends on React, Radix ToggleGroup, lucide icons,
  Tailwind utility implementation, vendor imports, or npm publishing.
- Docs or fixtures imply Toggle Group owns icon assets or app formatting state
  beyond selection and focus behavior.
- The audit inventory marks `toggle-group` resolved while any upstream Toggle
  Group example still lacks package/docs/fixture/test evidence or a documented
  intentional divergence.
- The regenerated parity inventory still recommends `toggle-group` as the
  first unresolved example cluster.

## Design Review

Reviewer: Carson (`019e9aea-2cfe-7911-bb70-c9b9d5c935d0`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Carson confirmed the design is linked from the
Issue 4 README as `Designed`, has the required sections, keeps implementation
scoped to Toggle Group example parity, and covers all 7 audited upstream
examples, group-level `disabled`/`size`/`variant`/`spacing`, item overrides,
icon-only labels, selected icon styling hooks, docs/fixture/Playwright proof,
inventory/resolved-cluster updates, style index regeneration, repo hygiene,
vendor cleanliness, and dependency avoidance.

## Result

**Result:** Pass

Implemented Toggle Group example parity depth.

- `radcn/packages/radcn/src/components/toggle-group.tsx` now supports
  group-level `disabled`, `size`, `variant`, and `spacing` props while
  preserving item-level `disabled`, `size`, and `variant` overrides.
- `radcn/packages/radcn/src/styles/tokens.css` now styles group-level spacing,
  size, variant, disabled state, and selected icon hooks. Generated
  `radcn/packages/radcn/src/styles/index.ts` is in sync.
- `radcn/apps/docs/app/content/components.tsx` now has rich Toggle Group docs
  with package-backed examples for `demo`, `disabled`, `lg`, `outline`,
  `single`, `sm`, and `spacing`.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx` now expose direct
  `/fixtures/toggle-group/*` scenarios for all 7 upstream Toggle Group example
  families, plus a preserved `disabled-item` scenario for the prior disabled
  item behavior.
- `radcn/fixtures/tests/toggle.spec.ts` now proves icon-only multiple and
  single groups, group-level disabled behavior, small and large group sizes,
  outline groups, spacing, icon+label items, selected-state icon styling,
  accessible names, `aria-pressed`, `data-state`, `data-value`, keyboard
  behavior, orientation behavior, and custom token hooks.
- `issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md`
  now marks all 7 upstream Toggle Group examples `Covered` and preserves
  mapping decisions for React, Radix ToggleGroup, lucide icons, Tailwind size
  utilities, Tailwind selected-state selectors, app-owned glyphs, and public
  state hooks.
- `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json` marks
  the `toggle-group` example cluster resolved, and regenerated
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` no longer
  lists `toggle-group` as unresolved. The first generated recommendation is
  now example parity for `breadcrumb`.

Verification run:

- `pnpm radcn:typecheck` passed.
- `pnpm --dir radcn/apps/docs typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts toggle.spec.ts`
  passed: 6 passed.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  passed: 5 passed.
- `node scripts/audit-shadcn-parity.mjs` passed and regenerated
  `parity-inventory.md`.
- The parity inventory idempotence check passed:
  ```text
  tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status
  ```
  Output:
  ```text
  wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
  ```
- Deterministic Node checks confirmed:
  - all 7 upstream Toggle Group example ids appear exactly once in
    `toggle-group-example-inventory.md`;
  - all 7 rows have final outcome `Covered`;
  - `resolved-clusters.json` includes `slug = "toggle-group"`,
    `status = "resolved"`, and evidence for Experiment 23, Experiment 24, and
    `toggle-group-example-inventory.md`;
  - `radcn/packages/radcn/src/styles/index.ts` exactly matches
    `tokens.css`;
  - `toggle-group` is absent from `## Unresolved Example Clusters` and is not
    the `## First Recommended Cluster`; the first recommendation is
    `Example parity for breadcrumb`;
  - the new group-level props are present in
    `radcn/packages/radcn/src/components/toggle-group.tsx`, and
    `ToggleGroupProps` remains exported through
    `radcn/packages/radcn/src/index.ts`;
  - Toggle Group docs contain the intended example family labels and required
    mapping copy;
  - Toggle Group docs implementation snippets and live preview do not use
    upstream Tailwind utility implementation strings.
- Dependency-policy checks passed:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*radix-ui|from ['\"][^'\"]*@radix-ui|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  ```
  It exited 1 with no matches, as expected.
- The targeted Tailwind-avoidance check passed with:
  ```text
  no upstream Tailwind utility implementation strings
  ```
- `git diff --check` passed with no output.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  printed no output.

## Conclusion

Toggle Group example parity is resolved. Adding narrow group-level
`disabled`, `size`, `variant`, and `spacing` props was justified because those
are direct upstream author-facing conveniences and they map cleanly to RadCN
data hooks, CSS variables, and browser enhancement without React or Radix. The
next experiment should follow the regenerated recommendation and audit example
parity for `breadcrumb`.

## Completion Review

Reviewer: Maxwell (`019e9af3-8056-7b02-af68-1cfc96441477`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Review result: approved. Maxwell confirmed the completed result matches the
approved scope; all 7 Toggle Group example families are covered in the
inventory and fixtures; group-level `disabled`, `size`, `variant`, and
`spacing` are implemented; item-level overrides remain available through
`:not([data-size])` and `:not([data-variant])`; icon-only examples have
`ariaLabel`; selected icon styling uses public `data-state` plus
`.radcn-toggle-group-icon`; the experiment has `## Result` and `## Conclusion`;
the Issue 4 README marks Experiment 24 as `Pass` and records the breadcrumb
next learning; `git diff --check` passes; vendor status is clean; dependency
policy checks have no React/Radix/lucide/vendor/publish matches;
`styles/index.ts` matches `tokens.css`; and the result commit had not been made
before review.
