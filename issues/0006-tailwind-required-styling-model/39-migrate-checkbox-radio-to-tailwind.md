# Experiment 39: Migrate Checkbox + RadioGroup to Tailwind utilities

## Description

Checkbox and RadioGroup are the last two form controls. After Exp 38 split
Switch out, they SHARE six combined rules with each other (base, hidden input,
`:has(:focus-visible)`, `:has(:checked)`+indeterminate, `[data-invalid]`,
`[data-disabled]`). Migrating BOTH together lets those shared rules be FULLY
removed (no intermediate split). Each follows the Switch `:has()` pattern: the
wrapper/item styles itself from its native input via `has-[:checked]:`/
`has-[:focus-visible]:` variants (reading the `--radcn-control-*` tokens — the
custom fixtures work unchanged); the indicator's checked reveal stays a bespoke
parent-state→child rule keyed on data attributes.

### Exact utility mapping

Shared control base + state (emitted by BOTH the checkbox wrapper and the radio
item):
`relative inline-flex shrink-0 items-center justify-center border
border-[var(--radcn-control-border,var(--radcn-input))]
bg-[var(--radcn-control-bg,var(--radcn-background))]
text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] outline-none
transition-[border-color,background-color,box-shadow]
has-[:focus-visible]:border-[var(--radcn-ring)]
has-[:focus-visible]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
has-[:checked]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))]
has-[:checked]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))]
data-[invalid=true]:border-[var(--radcn-control-invalid,var(--radcn-destructive))]
data-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-control-invalid,var(--radcn-destructive))_20%,transparent)]
data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50`

- Checkbox wrapper: the shared base + `size-4 rounded-[calc(var(--radcn-radius)-0.1875rem)]
  data-[state=indeterminate]:border-[var(--radcn-control-checked-bg,var(--radcn-primary))]
  data-[state=indeterminate]:bg-[var(--radcn-control-checked-bg,var(--radcn-primary))]`
  (1rem → size-4; indeterminate styles like checked). Drops `radcn-checkbox-wrapper`
  + the style-less `--{state}`; keeps `data-state`/`data-invalid`/`data-disabled`/
  `data-radcn-checkbox-wrapper`.
- Checkbox input: `absolute inset-0 m-0 opacity-0 cursor-pointer`.
- Checkbox indicator: `grid place-items-center size-full
  text-[var(--radcn-control-fg,var(--radcn-primary-foreground))] text-[0.6875rem]
  font-bold leading-none pointer-events-none` (font 700/0.6875rem/1).
- Radio group: `grid gap-3` (0.75rem; font-family inherited, dropped like prior
  migrations). Keeps `data-radcn-radio-group`/`data-invalid`.
- Radio item: the shared base + `size-4 rounded-full` (1rem; circle). Drops
  `radcn-radio-item` + the style-less `--{state}`; keeps the data attributes.
- Radio input: `absolute inset-0 m-0 opacity-0 cursor-pointer`.
- Radio indicator: `size-1.5 rounded-full bg-current opacity-0 pointer-events-none`
  (0.375rem → size-1.5).

Kept bespoke (parent-state → child indicator reveal, keyed on data attributes):
- `[data-radcn-checkbox-wrapper]:has([data-radcn-checkbox-input]:checked)
  [data-radcn-checkbox-indicator]::before { content: "x"; }`
- `[data-radcn-radio-item]:has([data-radcn-radio-input]:checked)
  [data-radcn-radio-indicator] { opacity: 1; }`

FULLY REMOVED (both migrated): the 6 shared rules + the checkbox-wrapper-size,
checkbox-indicator, radio-group, radio-item-size, radio-indicator base rules.
KEPT: `.radcn-fixture-custom-checkbox, .radcn-fixture-custom-radio,
.radcn-fixture-custom-switch { --radcn-control-* }` (shared fixture; switch +
now checkbox/radio all read it).

## Why both suites stay green

- The checked backgrounds hold via `has-[:checked]:bg-[var(--radcn-control-checked-bg,…)]`
  reading the tokens: the checked checkbox `rgb(37,99,235)` (native-state:68, a
  `--radcn-control-checked-bg` consumer override) and the custom radio
  `rgb(15,118,110)` (native-state:215) both compute correctly.
- The indeterminate checkbox styles via `data-[state=indeterminate]:` (the
  retained `data-state`); the indicator marks (the `x` / the radio dot) reveal
  via the kept bespoke `:has(:checked)` rules; the `-` indeterminate glyph is
  the component's child text (unchanged).
- focus/invalid/disabled reproduce via the variants on the retained attributes;
  `border`/`bg`/etc. resolve via the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/checkbox.tsx`: emit utility-const strings
  for wrapper/input/indicator; drop the `radcn-checkbox*` + `--{state}` classes;
  keep ALL data attributes + the native input + the `-` indeterminate child.
- `radcn/packages/radcn/src/components/radio-group.tsx`: emit utility-const
  strings for group/item/input/indicator; drop the `radcn-radio*` + `--{state}`
  classes; keep ALL data attributes.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the 6 shared rules + the
  checkbox/radio specific surface rules; KEEP the 2 bespoke parent-state→child
  indicator rules (repointed to data attributes); KEEP the shared custom-control
  fixture rule.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the canonical node
  formula.

Expected git status: `checkbox.tsx`, `radio-group.tsx`, `tokens.css`, `index.ts`,
this file, README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0 (the `has-[:checked]:`/`data-[state=indeterminate]:`
   variants + `color-mix` shadows + the bespoke `:has()` rules compile).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-checkbox*`/
   `.radcn-radio*` surface CLASS rule remains; the 6 shared rules gone; the 2
   bespoke indicator rules present (data-attribute-keyed); the custom-control
   fixture retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `native-state.spec.ts` checkbox
   (state, the checked bg `rgb(37,99,235)`, indeterminate, the named examples)
   AND radio (state, the custom radio bg `rgb(15,118,110)`, forms) AND switch
   (unaffected — its rules are already separate). 8 in isolation.
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Checkbox + RadioGroup render from Tailwind utilities (no
`radcn-checkbox*`/`radcn-radio*` surface class); the checked/indeterminate/focus/
invalid/disabled states + the indicator reveals + the custom token colors hold;
Switch unaffected; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a checkbox/radio/switch assertion regresses; a checked bg or the
indicator reveal fails; the indeterminate state breaks; `tokens.css`/`index.ts`
diverge.

## Result

**Result:** Pass

Checkbox + RadioGroup are migrated together; both suites green and stable.
Verification:

1. Both `styles:build` exit 0 (the `has-[:checked]:`/`data-[state=indeterminate]:`
   variants + `color-mix` shadows + the bespoke `:has()` indicator rules compile).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-checkbox*`/
   `.radcn-radio*` surface CLASS rule remains (count 0); the 6 shared rules fully
   removed; the 2 bespoke indicator-reveal rules present (data-attribute-keyed);
   the shared custom-control fixture retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `native-state.spec.ts` in isolation **8
   passed** — checkbox (state, the checked demo bg `rgb(37,99,235)`,
   indeterminate, the named examples, the custom checkbox bg `rgb(15,118,110)`),
   radio (state, forms, the custom radio bg `rgb(15,118,110)`), AND switch
   (unaffected — its rules were already separate).
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   four expected files changed.

No deviations from the approved design (this time the shared rules were removed
correctly — both controls migrated together, the Exp-38 lesson applied).

## Conclusion

Checkbox + RadioGroup render from Tailwind utilities: each control's
wrapper/item styles itself from its native input via `has-[:checked]:`/
`has-[:focus-visible]:` variants (checkbox adds `data-[state=indeterminate]:`),
the inputs/indicators emit utilities, and the indicator reveals (the checkbox
`x`, the radio dot) stay bespoke parent-state→child rules keyed on the data
attributes. The six formerly-shared control rules are FULLY removed (Switch
already separate; both checkbox + radio migrated together — no orphan). The
form-control cluster (Switch, Checkbox, RadioGroup) is complete. THIRTY
components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- When two (or more) siblings share combined rules, migrate them TOGETHER so the
  shared rules are fully removed in one experiment — cleaner than the
  split-then-remove sequence, and no intermediate orphan risk (the safe inverse
  of the Exp-38 lesson, once all sharers are in scope).
- The `:has()` native-input form-control pattern (has-variants on the wrapper for
  its own state + a bespoke `[data-wrapper]:has([data-input]:checked) [data-child]`
  reveal) generalizes cleanly across Switch / Checkbox / RadioGroup.

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README incl. the Exp 38
shared-rule lesson, this experiment file, and read access to the source)

Findings: APPROVED, no Blocker/Major; one Minor. The reviewer verified, applying
the Exp-38 lesson: migrating BOTH checkbox + radio together lets the 6 shared
rules be FULLY removed with NO orphaned sibling (Switch already split out and
uses its own data-keyed rules; no third party shares them). Every utility maps
exactly (base, the checkbox `size-4`/`rounded-[calc(--radius-0.1875rem)]`/
`data-[state=indeterminate]:`, the radio `size-4 rounded-full`/`size-1.5`
indicator, the group `grid gap-3`). It confirmed the checked-bg assertions are
token-driven and hold: the demo checked checkbox `rgb(37,99,235)` (a
`--radcn-control-checked-bg` consumer override, NOT `--radcn-primary`) and the
custom checkbox/radio `rgb(15,118,110)` — all via
`has-[:checked]:bg-[var(--radcn-control-checked-bg,…)]`. It validated the two
bespoke indicator-reveal selectors (data attributes all emitted), read the FULL
checkbox + radio tests (every assertion accounted for), confirmed the `--{state}`
classes are style-less, and that Switch is unaffected.

Minor: the `transition-[border-color,background-color,box-shadow]` arbitrary gives
Tailwind's default 150ms vs the original 120ms — unasserted (no transition-duration
assertion), consistent with the Tabs/Switch migrations.

Approval result: approved — both controls migrate together (shared rules fully
removed, no orphan), has-variants + bespoke indicator reveals + token-referencing
all sound.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor beyond the noted unasserted
transition-duration).

The reviewer confirmed both checkbox.tsx + radio-group.tsx emit utility-const
strings (no `radcn-checkbox*`/`radcn-radio*` surface classes) with the
`has-[:checked]:`/`data-[state=indeterminate]:`/`has-[:focus-visible]:`/
`data-[invalid]:`/`data-[disabled]:` variants and all data attributes; CRUCIALLY
verified the 6 formerly-shared rules are FULLY GONE with NO orphaned selectors,
the 2 bespoke indicator-reveal rules present (data-attribute-keyed), the shared
custom-control fixture retained, and Switch's data-keyed rules untouched;
byte-identical `index.ts` (node). It re-ran both `styles:build`, the three
typechecks, the docs suite (11), the fixture suite (1191), and
`native-state.spec.ts` (8 — checkbox checked `rgb(37,99,235)` + custom
`rgb(15,118,110)`, indeterminate, radio custom `rgb(15,118,110)`, switch). It
judged the migration faithful, the shared rules correctly removed, the
has-variants + indeterminate + bespoke reveals correct, the custom tokens
holding, and Switch still green. Verdict: APPROVED.

Approval result: approved with no blockers — Checkbox + RadioGroup migrated (30
components); the form-control cluster is complete.
