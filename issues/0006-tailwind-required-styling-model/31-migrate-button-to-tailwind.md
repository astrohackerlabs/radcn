# Experiment 31: Button migration — scope analysis and decomposition plan

## Description

This experiment set out to migrate Button (the keystone) to Tailwind utilities
in one atomic pass. The design review + a deeper investigation revealed the
migration is far larger than a single experiment, so this file is re-scoped to
a **scope-analysis experiment**: it records the exact target utility mapping
(reusable when Button is migrated), the true blast radius discovered, and a
decomposition plan into tractable follow-up experiments. No implementation is
performed here (that would require an unsafe 13-file atomic change at once).

### The blast radius (discovered during this experiment)

- Button's `radcn-button`/`radcn-button--{variant}`/`radcn-button--{size}`
  classes are emitted by the component AND asserted by name in 27 places across
  7 spec files.
- **Decisive finding:** the classes are ALSO hand-written as **raw class strings
  in 95 places across 13 fixture/docs files** (e.g. the collapsible demo's
  `class="radcn-button radcn-button--ghost radcn-button--icon size-8"`, the
  dialog/sheet/drawer/alert-dialog/menu/toast/data-table/navigation/positioned-
  overlay fixtures, and the docs `components.tsx`). These raw sites do NOT go
  through the Button component — they depend directly on the bespoke
  `.radcn-button*` CSS for their styling.
- Therefore removing the bespoke `.radcn-button*` rules (the migration's core)
  would break the styling of all 95 raw sites simultaneously. A single atomic
  experiment touching 13 fixture files + the component + ButtonGroup +
  date-picker + 27 assertions is infeasible to do safely at once.

The original atomic-migration design (the exact target utility mapping) is
preserved below for the eventual component migration.

### Original atomic plan (the target — deferred)

Button is the keystone: its `radcn-button`/`radcn-button--{variant}`/
`radcn-button--{size}` classes are emitted by the component AND asserted by name
in 27 places across 7 spec files (every component that uses a Button trigger).

RadCN's Button DIVERGES from shadcn's `buttonVariants` (it is a
`--radcn-control-height`/`min-height` design with `--radcn-button-*` custom
tokens, `width: max-content`, `lg` = 44px). The computed assertions test
RadCN's values (default `min-height: 36px`, `lg` 44px, `sm`/`icon-sm` 32px,
icon `padding: 0`, custom `background rgb(15,118,110)`). So this migration
REPRODUCES RadCN's exact current values via utilities (clean Tailwind utilities
where `--radcn-radius`/`--radcn-control-height` map to standard scale steps —
`rounded-md` = 0.375rem, `min-h-9` = 36px — and token-referencing arbitrary
values for the custom-token-driven bits), NOT a verbatim shadcn port. This keeps
every assertion green and the visual design unchanged, while removing the
bespoke `.radcn-button*` CSS (the Issue 6 goal).

### Exact utility mapping (reproduces the current `.radcn-button*` rules)

Base (`.radcn-button`, lines 50-77):
`inline-flex w-max items-center justify-center gap-2 min-h-9 cursor-pointer
whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-sm
font-medium leading-none no-underline outline-none transition-colors
focus-visible:border-[var(--radcn-ring)]
focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed
aria-disabled:opacity-50`
(`min-h-9` = 2.25rem = `--radcn-control-height` 36px; `rounded-md` = 0.375rem =
`--radcn-radius`.)

Variants:
- default: `bg-[var(--radcn-button-bg,var(--radcn-primary))]
  text-[var(--radcn-button-fg,var(--radcn-primary-foreground))]` (token-driven —
  the custom-button fixture's `--radcn-button-bg`/`-fg` keep working, NO
  translation needed)
- secondary: `bg-secondary text-secondary-foreground`
- outline: `border-border bg-background text-foreground`
- ghost: `bg-transparent text-foreground`
- destructive: `bg-destructive text-destructive-foreground`
- link: `min-h-auto bg-transparent
  text-[var(--radcn-button-link-fg,var(--radcn-primary))] px-0 underline
  underline-offset-4`

Sizes:
- default: `` (base covers it)
- sm: `min-h-8 px-3 py-1.5 text-[0.8125rem]`
- lg: `min-h-11 px-5 py-2.5 text-base`
- icon: `w-9 p-0`
- icon-sm: `w-8 min-h-8 p-0`
- icon-lg: `w-11 min-h-11 p-0`

## Changes

- `radcn/packages/radcn/src/components/button.tsx`: add `buttonBaseClass`,
  `buttonVariantClass: Record<ButtonVariant, string>`,
  `buttonSizeClass: Record<ButtonSize, string>`, and an exported
  `buttonClass(variant, size)` helper that joins them via `classes(...)`. The
  `Button` builds `mergedClass = classes(buttonClass(variant, size), className)`
  (no `radcn-button*` classes). Keep `data-radcn-button`, `data-variant`,
  `data-size`, and the `<a>`/`<button>` branching + all attributes.
- `radcn/packages/radcn/src/components/date-picker.tsx`: import `buttonClass`;
  the PopoverTrigger emits `classes(buttonClass('outline', 'default'),
  'radcn-date-picker-trigger')` instead of the raw `radcn-button
  radcn-button--outline radcn-button--default radcn-date-picker-trigger` string.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-button`
  base/`:focus-visible`/`:disabled`/`[aria-disabled]` rules and ALL
  `.radcn-button--{variant}`/`.radcn-button--{size}` rules (lines ~50-141,
  replaced with a migration comment). Repoint the ButtonGroup child-combinator
  selectors `> .radcn-button` → `> [data-radcn-button]` (the `:not(:first-child)`/
  `:not(:last-child)`/vertical variants too). KEEP `.radcn-fixture-custom-button`
  (its `--radcn-button-bg`/`-fg` tokens are read by the default variant's
  token-referencing utility). The select/dropdown/popover trigger selectors in
  ButtonGroup are unchanged (those components are not migrated).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.
- Test assertions (27, rewritten from `toHaveClass(/radcn-button.../)` to the
  retained data attributes — `data-radcn-button` for the base, `data-variant`
  for variants, `data-size` for sizes):
  - `radcn/fixtures/tests/positioned-overlays.spec.ts` (44, 45, 151, 152, 285)
  - `radcn/fixtures/tests/collapsible.spec.ts` (72, 73, 74)
  - `radcn/fixtures/tests/navigation-collection.spec.ts` (65)
  - `radcn/fixtures/tests/dialog.spec.ts` (79, 92, 117, 134)
  - `radcn/fixtures/tests/modal-variants.spec.ts` (66, 67)
  - `radcn/fixtures/tests/native-controls.spec.ts` (21)
  - `radcn/apps/docs/tests/coverage.spec.ts` (324, 325, 655, 737, 738, 876, 877,
    878, 1441, 1739, 1740)
  (The `navigation-collection.spec.ts:75` `radcn-button-group--vertical`
  assertion is a GROUP class — left unchanged.)

Expected git status: `button.tsx`, `date-picker.tsx`, `tokens.css`, `index.ts`,
the 7 spec files, this experiment file, README index + Learnings. Both generated
CSS untracked.

## Why both suites stay green

- Every computed assertion holds because the utilities reproduce the exact
  values: `min-h-9` = 36px (native-controls:50), `min-h-11` = 44px (toggle),
  `min-h-8` = 32px, icon `w-9`/`p-0`, the collapsible icon's 32px comes from the
  consumer's own `size-8` utility (unchanged) with `p-0` from the icon size, and
  the custom `background rgb(15,118,110)` holds via the token-referencing default
  utility (native-controls:182).
- The 27 class-name assertions are rewritten to the `data-variant`/`data-size`/
  `data-radcn-button` attributes the component already emits (semantically
  identical checks).
- ButtonGroup grouping geometry holds: its child selectors are repointed to
  `[data-radcn-button]`, which the Button still emits.
- The date-picker trigger renders identically (the same outline/default
  utilities).
- All contract colors used (`secondary`, `secondary-foreground`, `background`,
  `foreground`, `border`, `destructive`, `destructive-foreground`) exist in
  `theme.css`; `--radcn-primary`/`--radcn-ring` resolve as before.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the button utilities
   (`min-h-9`, `bg-secondary`, `border-border`, the `focus-visible:` + arbitrary
   `var(--radcn-*)` utilities).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-button` base/variant/
   size CLASS rule remains; the ButtonGroup selectors use `[data-radcn-button]`;
   `.radcn-fixture-custom-button` retained.
4. Docs suite green (11), run twice (the 11 rewritten coverage assertions).
5. Fixture suite green (1191), run twice — incl. the 16 rewritten fixture
   assertions AND the computed checks (native-controls min-height 36px + custom
   bg, toggle min-height 44px/32px, collapsible icon 32px/padding 0).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Button renders from Tailwind utilities (no `radcn-button*` class);
all variants/sizes reproduce their exact current computed values; the custom
token holds; ButtonGroup + date-picker render identically; the 27 assertions
pass as data-attribute checks; BOTH suites green and stable; `tokens.css`/
`index.ts` byte-identical.

Fail criteria: any button computed value drifts (a size/variant mismatch); the
custom bg fails; a ButtonGroup grouping or date-picker regression; a missed
assertion; `tokens.css`/`index.ts` diverge.

## Decomposition plan (the follow-up experiments Button needs)

Button must be migrated as a sub-project, in this order, each its own
dual-suite-gated experiment:

1. **Convert the raw call sites to the `Button` component (or the
   `buttonClass()` helper), file by file** (≈13 fixture/docs files, batched —
   e.g. 2-4 files per experiment). Each batch is a pure refactor: replace
   `class="radcn-button radcn-button--X radcn-button--Y …"` with `<Button
   variant="X" size="Y" …>` (or `buttonClass('X','Y')` where a raw element is
   required, e.g. a PopoverTrigger). Because the component still emits the same
   classes at this stage, output is byte-identical and the suite stays green.
   This drains the 95 raw sites to zero without any visual change.
2. **Migrate the Button component to utilities** (the target mapping above) +
   repoint ButtonGroup's `.radcn-button` child selectors to `[data-radcn-button]`
   + the date-picker trigger + remove the bespoke `.radcn-button*` CSS + rewrite
   the (now component-only) `toHaveClass(/radcn-button--*/)` assertions to
   `data-variant`/`data-size`. With no raw sites left, this is safe.
3. (The menu-cluster triggers and Breadcrumb/Pagination, which reference button
   classes, unblock after step 2.)

Doing step 1 first is the key insight: it decouples the 95-site refactor (no
styling change) from the CSS removal (styling change), so neither step is a
risky big-bang.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: the reviewer verified the target utility mapping is faithful
(`min-h-9`=36px, `rounded-md`=`--radcn-radius`, `min-h-11`=44px, `min-h-8`=32px,
the variant colors resolve, the token-referencing default reproduces the custom
bg) and that no other component's CSS depends on `.radcn-button`. It raised
genuine concerns — ButtonGroup repoint completeness, the `transition-colors`
150ms-vs-120ms divergence, and (critically) the collapsible icon's 32px
precedence — that prompted the deeper investigation. That investigation found
the migration's TRUE scope: **95 raw `radcn-button--*` class-string call sites
across 13 files** (the collapsible icon's 32px in fact comes from an inline
`style`, confirming the raw sites bypass the component). This makes the atomic
single-experiment approach infeasible.

Lead-agent judgment: the reviewer's REJECTED verdict was correct in outcome —
not for its stated blockers alone, but because the investigation it triggered
revealed Button is a decomposable sub-project, not one experiment. This file is
re-scoped to record that finding + the decomposition plan above.

Approval result: the atomic design is DEFERRED; the scope analysis + the
decomposition plan are the deliverable. Implementation proceeds via the
follow-up experiments (raw-site conversion first, then the component).

## Result

**Result:** Pass (as a scope-analysis experiment)

This experiment's deliverable is the analysis, not a code change. It established:

- The exact target utility mapping for the eventual Button component migration
  (preserved above; reviewer-verified faithful to current computed values).
- The true blast radius: 95 raw `radcn-button--*` call sites across 13 files +
  the component + ButtonGroup + date-picker + 27 assertions.
- A safe decomposition (convert raw sites to the component first — byte-identical,
  green — then migrate the component + remove the bespoke CSS).

No code changed; both suites remain green (1191 / 11) from the prior commit.
`tokens.css`/`index.ts` untouched.

## Conclusion

Button is a decomposable sub-project, not a single migration. The next
experiments execute the decomposition: raw-site → component conversion in
batches, then the component-to-utilities migration. In the meantime, the
remaining self-contained, non-button-coupled components (Avatar, Accordion,
Tabs, ScrollArea, Switch/Checkbox/RadioGroup, Slider, etc.) can be migrated
independently — those proceed in parallel with the Button decomposition.

Learnings (also copied to the issue README Learnings digest):

- The keystone's real cost was not the component but the **95 raw
  `radcn-button--*` class strings hand-written across 13 fixture/docs files** —
  a class-based API used directly, not only via the component. Discover raw
  call-site spread (`grep 'class="…radcn-X--'`) BEFORE planning a class-removal
  migration; the component is often the small part.
- Decouple a class-removal migration into (1) route all call sites through the
  component (byte-identical, green) then (2) remove the class + emit utilities.
  Never remove a widely-hand-written class in one atomic pass.
