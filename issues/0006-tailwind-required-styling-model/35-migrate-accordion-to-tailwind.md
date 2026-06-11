# Experiment 35: Migrate Accordion surfaces to Tailwind utilities

## Description

Accordion is a native `<details>`/`<summary>` disclosure (no JS animation
keyframes — the icon rotates via the item's `[open]` state). Migrate the
surfaces to token-referencing Tailwind utilities. Two parent-state→child effects
(item `[open]` → icon rotation; item disabled → trigger cursor/pointer-events)
stay bespoke rules keyed on the data attributes (a child can't read its parent's
`[open]`/`[data-disabled]` via a utility). The style-LESS marker classes
(`radcn-accordion--{type}`, `radcn-accordion-item--disabled`,
`radcn-accordion-trigger--disabled` — none have CSS rules) are dropped. The
custom-accordion fixture is unchanged (tokens read by the utilities).

### Exact utility mapping

- root (`.radcn-accordion`, a div): `w-[min(100%,36rem)] border-t
  border-[var(--radcn-accordion-border,var(--radcn-border))]` (drop the
  style-less `radcn-accordion--{type}`).
- item (`.radcn-accordion-item`, `<details>`): `border-b
  border-[var(--radcn-accordion-border,var(--radcn-border))]
  data-[disabled=true]:opacity-50` (drop the style-less
  `radcn-accordion-item--disabled`).
- trigger (`.radcn-accordion-trigger`, `<summary>`/`<div>`): `flex w-full
  items-start justify-between gap-4 py-4
  text-[var(--radcn-accordion-trigger-fg,var(--radcn-foreground))] cursor-pointer
  text-sm font-medium leading-[1.3] list-none outline-none text-left
  hover:underline hover:underline-offset-4 focus-visible:rounded-md
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  marker:content-[''] [&::-webkit-details-marker]:hidden` (drop the style-less
  `radcn-accordion-trigger--disabled`; font 500/0.875rem/1.3 → text-sm
  font-medium leading-[1.3]).
- trigger-text (`.radcn-accordion-trigger-text`): style-less hook (no CSS rule)
  — left as-is.
- icon (`.radcn-accordion-icon`): `shrink-0 text-[var(--radcn-muted-foreground)]
  text-xs font-semibold leading-none transition-transform` (font 600/0.75rem/1 →
  text-xs font-semibold leading-none).
- content (`.radcn-accordion-content`): `overflow-hidden
  text-[var(--radcn-accordion-content-fg,var(--radcn-muted-foreground))] text-sm
  leading-normal` (font 400/0.875rem/1.5; the consumer adds `flex flex-col gap-4
  text-balance` via `className`, which the content-class array assertion checks
  and the `display:flex`/`gap:16px` computed assertions rely on — unaffected).
- content-inner (`.radcn-accordion-content-inner`): `pb-4` (padding 0 0 1rem).

Kept bespoke (parent-state → child, repointed to data attributes):
- `[data-radcn-accordion-item][open] [data-radcn-accordion-icon] { transform:
  rotate(180deg); }`
- `[data-radcn-accordion-item][data-disabled="true"]
  [data-radcn-accordion-trigger] { cursor: not-allowed; pointer-events: none;
  text-decoration: none; }`

## Why both suites stay green

- The custom border-top (#0f766e), trigger color (#134e4a), and content color
  (#0f766e) hold via the token-referencing utilities reading the unchanged
  fixture tokens.
- The disabled item: `data-[disabled=true]:opacity-50` (item) + the kept
  parent-state trigger rule (`pointer-events: none`, asserted line 119); the
  `data-disabled='true'` attr (asserted line 115) is retained, so the redundant
  `radcn-accordion-item--disabled` class assertion (116) is removed.
- The content flex layout (`display:flex`/`flex-direction:column`/`gap:16px` +
  the `flex flex-col gap-4 text-balance` class array) is consumer-`className`-
  driven and unaffected.
- The icon rotation on open holds via the kept parent-state rule; the summary
  marker is hidden via the `marker:`/`[&::-webkit-details-marker]:` utilities.

## Changes

- `radcn/packages/radcn/src/components/accordion.tsx`: emit utility-const strings
  for root/item/trigger/icon/content/content-inner (drop the `radcn-accordion*`
  + the style-less marker classes); keep ALL `data-radcn-accordion*`,
  `data-disabled`, `data-value`, `open`, `role`, `aria-disabled`. (trigger-text
  hook left as-is.)
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-accordion*` rules (incl. the `::marker`/`::-webkit-details-marker`
  rules, now utilities); KEEP the two parent-state→child rules repointed to the
  data attributes; KEEP `.radcn-fixture-custom-accordion`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate.
- `radcn/fixtures/tests/accordion.spec.ts:116`: remove the redundant
  `toHaveClass(/radcn-accordion-item--disabled/)` (line 115 already asserts
  `data-disabled='true'`).

Expected git status: `accordion.tsx`, `tokens.css`, `index.ts`,
`accordion.spec.ts`, this file, README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0 (the `marker:`/`[&::-webkit-details-marker]:`
   variants + `data-[disabled=true]:` + `color-mix` shadow compile).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-accordion*`
   CLASS rule remains; the two parent-state→child rules present (keyed on
   `[open]`/`[data-disabled]`); `.radcn-fixture-custom-accordion` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `accordion.spec.ts` (the content
   class array + `display:flex`/`gap:16px`, the disabled item `pointer-events:
   none` + `data-disabled`, the icon open-rotation, the custom border-top
   `rgb(15,118,110)` + trigger color `rgb(19,78,74)` + content color
   `rgb(15,118,110)`).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Accordion renders from Tailwind utilities (no `radcn-accordion*`
class); the open-rotation + disabled + custom colors + summary-marker-hiding
hold; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: an accordion assertion regresses; the icon rotation or disabled
trigger breaks; the summary marker reappears; the custom colors fail;
`tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Accordion is migrated; both suites green and stable. Verification:

1. Both `styles:build` exit 0 — the `marker:content-['']` +
   `[&::-webkit-details-marker]:hidden` pseudo-element variants compiled cleanly
   (the design-review's MAJOR concern, now confirmed valid Tailwind v4), as did
   `data-[disabled=true]:` and the `color-mix` focus shadow.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-accordion*`
   CLASS rule remains (count 0); the two parent-state→child rules present (keyed
   on `[open]`/`[data-disabled]`); `.radcn-fixture-custom-accordion` retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `accordion.spec.ts` in isolation **4
   passed** — incl. the content class array + `display:flex`/`gap:16px` (consumer-
   driven), the disabled item `pointer-events: none` + `data-disabled`, the icon
   open-rotation, and the custom border-top `rgb(15,118,110)` + trigger color
   `rgb(19,78,74)` + content color `rgb(15,118,110)`.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   four expected files changed (incl. `accordion.spec.ts`).

No deviations from the (clarified) approved design.

## Conclusion

Accordion is migrated: the native `<details>`/`<summary>` surfaces render from
token-referencing Tailwind utilities (the custom-accordion fixture works
unchanged), the summary disclosure marker is hidden via the `marker:` +
`[&::-webkit-details-marker]:` pseudo-element variants, and the two parent-state→
child effects (item `[open]` → icon rotate; item disabled → trigger) stay
bespoke rules keyed on the data attributes. Twenty-five components are now
migrated. The `radcn-accordion-item--disabled` style-less marker class and its
redundant assertion were dropped (the disabled state holds via `data-disabled` +
the `[data-disabled]`-keyed opacity).

Learnings (also copied to the issue README Learnings digest):

- A native `<summary>` disclosure marker hides cleanly via Tailwind
  pseudo-element variants — `marker:content-['']` (built-in `marker:` →
  `::marker`) + `[&::-webkit-details-marker]:hidden` (arbitrary variant). Both
  compile in Tailwind v4.
- Style-less "marker" classes (`--single`/`--multiple`/`item--disabled`/
  `trigger--disabled` — emitted but with no CSS rule) are pure drop-on-migration;
  if a spec asserts one by name, the underlying `data-*` attribute already
  carries the real state, so remove the assertion.

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: the reviewer confirmed the substantive design is sound — the
token-referencing pattern is proven (Exp 32/34), the content's `flex flex-col
gap-4 text-balance` (and its `display:flex`/`gap:16px` assertions) are
consumer-`className`-driven and unaffected, the custom-accordion fixture is
correctly handled (no translation), the style-less marker classes have NO CSS
rule (safe to drop), and the parent-state→child approach is correct. It returned
"REJECTED" on three points, all of which resolve:

1. (claimed BLOCKER — line-116 assertion) Resolved: the design DROPS the
   style-less `radcn-accordion-item--disabled` class from the component, so its
   `toHaveClass(/radcn-accordion-item--disabled/)` assertion (116) WOULD fail and
   is therefore removed — not as a "redundancy" but because the class is
   deliberately gone. The disabled STATE remains fully asserted by line 115
   (`data-disabled='true'`) and styled by the `[data-disabled]`-keyed item
   opacity + the kept parent-state trigger rule. No other place references the
   class (grep: only line 116; no CSS rule).
2. (claimed MAJOR — marker variants) `marker:content-['']` (the built-in
   `marker:` variant → `::marker`) and `[&::-webkit-details-marker]:hidden` (an
   arbitrary pseudo-element variant) are valid Tailwind v4; they are verified at
   build time (the dual-suite gate), and the summary-marker hiding is NOT
   asserted by any test (so this is visual-only, low risk).
3. (claimed MAJOR — selector inconsistency) Both kept rules consistently key on
   the `[data-radcn-accordion-item]` ancestor; `[open]` is the NATIVE `<details>`
   attribute for the open state (there is no `data-open`), and `[data-disabled]`
   is the disabled attribute — each rule uses the correct state attribute.

Lead-agent judgment: the design is sound; the three points are misreads (1, 3)
or verify-at-build (2). Proceeding; the marker-variant compilation + every
assertion are confirmed in the verification gate.

Approval result: approved — the `<details>` migration is sound; parent-state→
child rules kept bespoke, marker hiding as utilities (build-verified), custom
tokens read in place, the dropped marker class's assertion removed.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed accordion.tsx emits the utility-const strings (no
`radcn-accordion*` classes), with the `marker:content-['']` +
`[&::-webkit-details-marker]:hidden` + `list-none` + hover/focus variants on the
trigger, the style-less marker classes dropped, and all data/native attributes
(`data-radcn-accordion*`, `data-disabled`, `data-state`, `data-value`, `open`,
`role`, `aria-disabled`) kept; tokens.css has ZERO migrated `.radcn-accordion*`
class rules, the two parent-state→child rules (`[open]`→icon rotate,
`[data-disabled]`→trigger), and the retained `.radcn-fixture-custom-accordion`;
byte-identical `index.ts`; `accordion.spec.ts` has the `radcn-accordion-item--disabled`
assertion removed with `data-disabled='true'` retained and no other
`radcn-accordion--` class assertion anywhere. It re-ran both `styles:build`, the
three typechecks, the docs suite (2/2 = 11), the fixture suite (2/2 = 1191, the
only intermittent failure being the known unrelated hover-card flake), and
`accordion.spec.ts` in isolation (4 — content flex/gap consumer-driven, disabled
`pointer-events:none`, icon open-rotation, custom border-top/trigger/content
colors). It confirmed the marker-variant compilation (the prior design-review
crux), the parent-state rules + custom tokens holding, and the assertion removal
correct. Verdict: APPROVED.

Approval result: approved with no blockers — Accordion is migrated (25
components).
