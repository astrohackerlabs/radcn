# Experiment 63: Migrate ButtonGroup + InputGroup to Tailwind utilities

## Description

The final two components. Both restyle nested ALREADY-MIGRATED Button/Input/Select
by DOM position (border-merge) or by stripping the nested control's chrome — genuine
cross-component cascades. An empirical probe settled the key question: the bespoke
`radcnStyles` rules are injected UNLAYERED, so `.radcn-button-group > .radcn-button:not(:first-child)
{ border-radius: 0 }` RELIABLY overrides the migrated Button's `@layer utilities`
`rounded-md` (probed: first button `border-top-left-radius` = 6px, non-first = 0px).
So no Button/Input change is needed; the cross-component cascades stay bespoke
(documented integration rules, the same category as the kept Dropdown/Select trigger
cascades). Each group's OWN surfaces migrate to utilities. The `radcn-button-group` /
`radcn-input-group` marker classes are KEPT (the cross-component cascades + the
input-group's own nested-input reset reference them).

### ButtonGroup

Migrate (own surfaces) — the container keeps `radcn-button-group` +
`radcn-button-group--{orientation}` markers + base utilities:
- container base (`.radcn-button-group`): `flex w-fit items-stretch gap-0`.
- text (`.radcn-button-group-text`): `inline-flex items-center justify-center border
  border-[var(--radcn-border)] bg-muted px-3 text-muted-foreground text-[0.8125rem]
  font-medium leading-none [font-family:var(--radcn-font)]`.
- separator base (`.radcn-button-group-separator`): `self-stretch bg-[var(--radcn-border)]`
  (keeps the `radcn-button-group-separator--{orientation}` marker).

Keep bespoke (modifiers + cross-component, all referencing kept markers):
`.radcn-button-group--vertical` (flex-direction), `.radcn-button-group--clustered`
(gap), `.radcn-button-group > .radcn-button-group` (nested gap), the separator
`--vertical`/`--horizontal` (width/height), and ALL the `> .radcn-button` /
`[data-radcn-input]` / `.radcn-select > .radcn-select-trigger` / dropdown / popover
sizing + first/last merge cascades (horizontal + vertical).

### InputGroup

Migrate (own surfaces) — the container keeps `radcn-input-group` marker + base
utilities:
- container base (`.radcn-input-group`): `flex w-full max-w-[var(--radcn-input-group-width,24rem)]
  min-h-[var(--radcn-control-height)] flex-wrap items-stretch border
  border-[var(--radcn-input-group-border,var(--radcn-input))] rounded-md
  bg-[var(--radcn-input-group-bg,var(--radcn-background))] text-foreground
  [font-family:var(--radcn-font)] outline-none
  focus-within:border-[var(--radcn-ring)]
  focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  data-[invalid=true]:border-[var(--radcn-field-error,var(--radcn-destructive))]
  data-[invalid=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-field-error,var(--radcn-destructive))_20%,transparent)]
  has-[[aria-invalid=true]]:border-[var(--radcn-field-error,var(--radcn-destructive))]
  has-[[aria-invalid=true]]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-field-error,var(--radcn-destructive))_20%,transparent)]
  data-[disabled=true]:opacity-60 has-[:disabled]:opacity-60`.
- addon base (`.radcn-input-group-addon`): `inline-flex
  min-h-[calc(var(--radcn-control-height)-2px)] items-center justify-center gap-1.5
  px-3 text-[var(--radcn-input-group-addon-fg,var(--radcn-muted-foreground))]
  cursor-text text-[0.875rem] font-normal leading-[1.35] [font-family:var(--radcn-font)]
  select-none` (keeps the `radcn-input-group-addon--{align}` marker).
- group-input/textarea (`.radcn-input-group-input, -textarea`): `min-w-0
  flex-[1_1_10rem] bg-transparent`; the textarea adds `min-h-[5.5rem]`.
- text (`.radcn-input-group-text`): `inline-flex items-center gap-1`.
- button base (`.radcn-input-group-button`): `min-h-7 px-2 py-1 shadow-none` (keeps
  the `radcn-input-group-button--{size}` marker; `:385` asserts the
  `radcn-input-group-button` class — KEPT).

Keep bespoke (variant markers + cross-component, referencing kept markers):
the addon `--inline-start`/`--inline-end`/`--block-start`/`--block-end` (order +
border-side); the button `--sm`/`--icon-xs`/`--icon-sm` (sizing); and the
cross-component `.radcn-input-group [data-radcn-input], … [data-radcn-textarea]
{ border:0; border-radius; box-shadow:none }` + its `:focus-visible` reset (strips
the nested migrated Input/Textarea chrome inside the group).

The `.radcn-fixture-custom-input-group` fixture is unchanged.

## Why both suites stay green

- `navigation-collection.spec.ts:75` (`radcn-button-group--vertical` class) — KEPT
  marker on the container. `form-input-cluster.spec.ts:70` (`radcn-fixture-custom-input-group`
  class) + `:71` (container bg `rgb(240,253,250)` via
  `bg-[var(--radcn-input-group-bg,…)]` reading the fixture token) — hold.
  `static-display.spec.ts:385` (`radcn-input-group-button` class) — KEPT marker.
- The cross-component border-merge + nested-control resets stay bespoke and reliably
  override the migrated children (probed); the group markers remain so those cascades
  match.

## Changes

- `radcn/packages/radcn/src/components/button-group.tsx` + `input-group.tsx`: emit
  utility-const strings for each group's own surfaces; KEEP the `radcn-button-group`/
  `radcn-input-group` + `--{orientation}`/`--{align}`/`--{size}` marker classes + all
  data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove ONLY the migrated own-surface
  base rules (`.radcn-button-group` base, `-text`, `-separator` base;
  `.radcn-input-group` base, `:focus-within`, `[data-invalid]`/`:has([aria-invalid])`,
  `[data-disabled]`/`:has(:disabled)`, `-input/-textarea`, `-textarea`, `-addon` base,
  `-text`, `-button` base); KEEP the modifier/variant rules + ALL cross-component
  cascades + the fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `max-w-[var(…)]`, `min-h-[calc(var(--radcn-control-height)-2px)]`,
   `focus-within:shadow-[…color-mix…]`, `has-[[aria-invalid=true]]:…`, `flex-[1_1_10rem]`
   utilities compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; the migrated own-surface base rules removed; the
   modifiers + cross-component cascades + fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `navigation-collection.spec.ts` (button-group
   vertical marker, structure), `form-input-cluster.spec.ts` (input-group custom class
   + bg, addons, validation, the group button/input), `static-display.spec.ts` (the
   input-group-button marker).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: ButtonGroup + InputGroup render their own surfaces from Tailwind
utilities; the group markers + custom class + bg hold; the cross-component
border-merge + nested-control resets stay reliable (probed); BOTH suites green;
byte-identical. This MIGRATES THE FINAL TWO COMPONENTS — all ~57 done.

Fail criteria: a group assertion regresses; an own-surface utility doesn't compile;
the border-merge/nested-reset drifts; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

ButtonGroup + InputGroup migrated — the FINAL two components. Both suites green (both
fixture runs clean). All three `styles:build`/typechecks pass; the input-group states
(`focus-within`/`data-[invalid]`/`has-[[aria-invalid]]`/`data-[disabled]`/`has-[:disabled]`)
+ `max-w-[var(…)]` + `min-h-[calc(var(--radcn-control-height)-2px)]` + `flex-[1_1_10rem]`
compile (count 4; no junk); `index.ts` byte-identical; the 12 own-surface base rules
removed while the modifiers + cross-component cascades + the fixture are retained;
docs 11 ×2; isolation **navigation-collection 9 / form-input-cluster 11 /
static-display 12 passed** (the button-group vertical marker + clustered gap, the
input-group custom class + bg `rgb(240,253,250)`, addons, validation, the
input-group-button marker); fixture **1191 ×2** (both clean); `git diff --check`
clean; four files changed.

## Conclusion

ButtonGroup + InputGroup render their OWN surfaces from Tailwind utilities (container/
text/separator; container/addon/group-input/textarea/text/button). The cross-component
border-merge (button-group → nested Button/Input/Select) and the nested-control chrome
reset (input-group → nested Input/Textarea) stay bespoke — an empirical probe proved
the unlayered `radcnStyles` cascade RELIABLY overrides the migrated children's
`@layer utilities` (first button `border-top-left-radius`=6px, non-first=0px), so no
Button/Input change is needed; the `radcn-*-group` + variant marker classes are kept
so those cascades + the asserted markers still match.

**This completes the component migration: all ~57 RadCN components now emit their
visual styling as Tailwind utilities.**

Learnings (also copied to the issue README Learnings digest):

- The bespoke `radcnStyles` is injected UNLAYERED; Tailwind utilities live in
  `@layer utilities`. Unlayered declarations beat any layered declaration regardless
  of specificity — so a cross-component cascade (`.group > .child:not(:first-child)
  { border-radius: 0 }`) RELIABLY overrides a migrated child's utility radius
  (empirically probed). Cross-component integration cascades (group border-merge,
  nested-control chrome reset) can therefore stay bespoke as documented hooks, with
  the group's marker classes kept so they match — no need to thread radius/border
  vars through the already-migrated child component.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major/Minor. The reviewer verified all five cruxes:
(1) the `radcn-button-group`/`radcn-input-group` + `--{orientation}`/`--{align}`/
`--{size}` marker classes are kept (the components already emit them) and the
cross-component + variant rules reference them; (2) every own-surface utility maps
EXACTLY to the current CSS (the `font` shorthand split, `px-3`=`0 0.75rem`,
`min-h-[calc(var(--radcn-control-height)-2px)]`, `flex-[1_1_10rem]`, `gap-1.5`,
`min-h-7`); (3) the input-group states (`focus-within`, `data-[invalid]` +
`has-[[aria-invalid]]`, `data-[disabled]` + `has-[:disabled]`) reproduce the original
dual selectors; (4) the cross-component cascades (button-group merge/sizing,
input-group nested-control reset, addon-align + button-size variants) stay bespoke and
reliably override the migrated children (the unlayered-`radcnStyles`-beats-`@layer`
probe); (5) the assertions hold. It ALSO surfaced an assertion not in the plan:
`navigation-collection.spec.ts:109` asserts `gap: 8px` on the clustered button-group —
this HOLDS because `.radcn-button-group--clustered { gap: 0.5rem }` is KEPT bespoke and
reliably overrides the migrated container's `gap-0` (same probed precedence).

Approval result: approved — the own-surface migration + the kept marker classes + the
reliably-overriding cross-component cascades are sound; this closes the component
migration (final two).

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: none (no Blocker, Major, or Minor). Confirmed both components emit their
own-surface utility consts while KEEPING the `radcn-button-group`/`radcn-input-group`
+ `--{orientation}`/`--{align}`/`--{size}` marker classes + data attributes; the
input-group container carries the full state set (focus-within/data-invalid/
has-aria-invalid/data-disabled/has-disabled); tokens.css removed exactly the 12
own-surface base rules and KEPT the modifiers + the cross-component cascades (the
button-group merge/sizing + the input-group nested-control reset) + the fixture;
byte-identical `index.ts`. It rebuilt (the states + `flex-[1_1_10rem]` +
control-height calc generate, no junk), re-ran the three typechecks, the docs suite
(11), the three isolation specs (navigation-collection 9 incl. the clustered
`gap: 8px` proving the bespoke cascade overrides the migrated `gap-0`,
form-input-cluster 11, static-display 12), and the full fixture suite (1191 ×2). It
confirmed the critical faithfulness point: the kept cross-component cascades reliably
override the migrated children (the clustered-gap test proves the unlayered-beats-layer
precedence). Verdict: APPROVED.

Approval result: approved with no blockers — ButtonGroup + InputGroup migrated; ALL
~57 components now emit their visual styling as Tailwind utilities.
