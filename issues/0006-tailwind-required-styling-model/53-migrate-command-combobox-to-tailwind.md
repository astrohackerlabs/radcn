# Experiment 53: Migrate Command + Combobox together to Tailwind utilities

## Description

Command and Combobox SHARE most rules (combined selectors
`.radcn-combobox-control, .radcn-command-input-wrapper`; `.radcn-combobox-input,
.radcn-command-input` (+`::placeholder`); `.radcn-combobox-content, .radcn-command`;
`.radcn-combobox-list, .radcn-command-list`; `.radcn-combobox-group,
.radcn-command-group`; `.radcn-combobox-item, .radcn-command-item`
(+`[data-highlighted]`/`[data-disabled]`/`-item-indicator`); `.radcn-combobox-empty,
.radcn-command-empty`; `.radcn-combobox-separator, .radcn-command-separator`; the
`[hidden]` group). Migrate BOTH together (Exp-49/51 pattern). Neither uses the
`radcn-menu-*` family helpers.

### Conflict-avoidance splits (Exp-41)

Two shared rules are OVERRIDDEN by a component-specific rule (different value for
the SAME property) → keep the conflicting property OUT of the shared const and put
it only in each component's own const:

- content bg/fg: `.radcn-combobox-content, .radcn-command` sets bg/fg from
  `--radcn-combobox-*`, but `.radcn-command` (later) overrides with
  `--radcn-command-bg/-fg`. So the SHARED content const carries only the STRUCTURE
  (`grid overflow-hidden border border-[var(--radcn-combobox-border,var(--radcn-border))]
  rounded-md shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]`); combobox-content adds
  `bg-[var(--radcn-combobox-bg,var(--radcn-background))]
  text-[var(--radcn-combobox-fg,var(--radcn-foreground))]`, command-root adds
  `bg-[var(--radcn-command-bg,var(--radcn-background))]
  text-[var(--radcn-command-fg,var(--radcn-foreground))]`.
- item grid-cols: the shared item sets `grid-cols-[1rem_minmax(0,1fr)_auto]` but
  `.radcn-command-item` overrides `grid-cols-[minmax(0,1fr)_auto_auto]`. So the
  SHARED item const omits grid-cols; combobox-item adds the 3-col `1rem ...`,
  command-item adds the `minmax(0,1fr) auto auto`.

### Combobox control propagation (Exp-47)

`.radcn-combobox[data-invalid="true"] .radcn-combobox-control { border-color:
destructive; box-shadow: ring }` and `[data-disabled] .control { opacity:0.5 }` are
parent→child cascades → propagate: the `.radcn-combobox` root SETS
`--radcn-combobox-control-bc`/`-shadow`/`-op` via `data-[invalid=true]:[--…]` /
`data-[disabled=true]:[--…]`; the control READS them.

### Exact utility mapping (shared consts, exported from combobox.tsx)

- sharedControl: `flex w-[var(--radcn-combobox-width,14rem)]
  min-h-[var(--radcn-control-height)] items-center border
  border-[color:var(--radcn-combobox-control-bc,var(--radcn-combobox-border,var(--radcn-input)))]
  rounded-md bg-[var(--radcn-combobox-trigger-bg,var(--radcn-background))]
  text-[var(--radcn-combobox-trigger-fg,var(--radcn-foreground))]
  shadow-[var(--radcn-combobox-control-shadow,none)]
  opacity-[var(--radcn-combobox-control-op,1)]`.
- sharedInput: `min-w-0 flex-1 border-0 bg-transparent text-inherit px-3 py-2
  text-[0.875rem] font-normal leading-none [font-family:var(--radcn-font)]
  outline-none placeholder:text-muted-foreground`.
- sharedContentStructure: `grid overflow-hidden border
  border-[var(--radcn-combobox-border,var(--radcn-border))] rounded-md
  shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]`.
- sharedList: `grid gap-0.5 max-h-56 overflow-y-auto p-1.5`.
- sharedGroup: `grid gap-0.5`.
- sharedItemStructure: `grid min-h-8 items-center gap-2
  rounded-[calc(var(--radcn-radius)-0.125rem)] cursor-default px-2 py-1.5
  text-[0.875rem] font-normal leading-[1.25] [font-family:var(--radcn-font)]
  data-[highlighted=true]:bg-[var(--radcn-combobox-highlight-bg,var(--radcn-secondary))]
  data-[highlighted=true]:text-[var(--radcn-combobox-highlight-fg,var(--radcn-foreground))]
  data-[disabled=true]:text-muted-foreground data-[disabled=true]:opacity-50`.
- sharedIndicator: `text-[var(--radcn-combobox-indicator-fg,var(--radcn-primary))]`.
- sharedEmpty: `p-5 text-muted-foreground text-center text-[0.875rem] font-normal
  leading-[1.4] [font-family:var(--radcn-font)]`.
- sharedSeparator: `h-px my-1 mx-1.5 bg-border`.

### Combobox-specific

- root: `[font-family:var(--radcn-font)]
  data-[invalid=true]:[--radcn-combobox-control-bc:var(--radcn-destructive)]
  data-[invalid=true]:[--radcn-combobox-control-shadow:0_0_0_3px_color-mix(in_srgb,var(--radcn-destructive)_18%,transparent)]
  data-[disabled=true]:[--radcn-combobox-control-op:0.5]`.
- control: `${sharedControl}`.
- input: `${sharedInput}`.
- trigger + clear: `inline-flex w-8 min-h-8 items-center justify-center border-0
  bg-transparent text-muted-foreground cursor-pointer text-[0.75rem] font-medium
  leading-none [font-family:var(--radcn-font)]`.
- portal + content: `[&[hidden]]:hidden`; content =
  `${sharedContentStructure} bg-[var(--radcn-combobox-bg,var(--radcn-background))]
  text-[var(--radcn-combobox-fg,var(--radcn-foreground))] z-[var(--radcn-combobox-z,50)]
  max-h-[min(var(--radcn-combobox-content-max-height,17rem),var(--radcn-combobox-available-height,17rem))]
  [transform-origin:var(--radcn-combobox-transform-origin,top_left)]
  animate-[radcn-select-in_120ms_ease-out] [&[hidden]]:hidden`.
- list/group/empty/separator: the shared consts.
- item: `${sharedItemStructure} grid-cols-[1rem_minmax(0,1fr)_auto]`.
- item-indicator: `${sharedIndicator}` (drop the class).
- label: `px-7 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem]
  leading-[1.2] [font-family:var(--radcn-font)]`.
- chips: `flex flex-wrap gap-1.5 mb-2`.
- chip: `inline-flex items-center gap-1 rounded-[calc(var(--radcn-radius)-0.125rem)]
  bg-secondary text-secondary-foreground px-2 py-1 text-[0.75rem] font-medium
  leading-none [font-family:var(--radcn-font)] [&[hidden]]:hidden`.
- chip-remove: `border-0 bg-transparent text-inherit cursor-pointer p-0`.
- value/collection: style-less (no rule) — drop the class.

### Command-specific (incl. the raw-class sub-elements)

- root (`.radcn-command`, the 3 folded rules): `${sharedContentStructure}
  bg-[var(--radcn-command-bg,var(--radcn-background))]
  text-[var(--radcn-command-fg,var(--radcn-foreground))] [font-family:var(--radcn-font)]
  w-[min(100%,var(--radcn-command-width,26rem))]`. (Border reads
  `--radcn-combobox-border` from the shared structure — the fixture sets it; the
  `:250` border `rgb(15,118,110)` holds.)
- input-wrapper (RAW class → utilities): does NOT use `${sharedControl}` (the shared
  `border`/`rounded-md`/`bg` would CONFLICT with the command overrides — Exp-41,
  design-review fix). Emit the RESOLVED command state directly with per-side border
  longhands (no `border` shorthand): `flex w-full min-h-[var(--radcn-control-height)]
  items-center border-x-0 border-t-0 border-b rounded-none
  border-[color:var(--radcn-command-border,var(--radcn-border))]
  bg-[var(--radcn-command-bg,var(--radcn-background))]
  text-[var(--radcn-combobox-trigger-fg,var(--radcn-foreground))]`. (`border-x-0
  border-t-0 border-b` = bottom 1px only via longhands — no shorthand/longhand
  source-order ambiguity; preflight supplies `border-style:solid`. So
  `--radcn-command-border` is read here by the bottom border.)
- input (RAW): `${sharedInput}`.
- input-icon (RAW, style-less — no rule): leave as-is.
- list/empty/group/separator: the shared consts.
- group-heading (RAW → utilities): `px-2 pt-1.5 pb-1 text-muted-foreground
  font-semibold text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]`.
- item: `${sharedItemStructure} grid-cols-[minmax(0,1fr)_auto_auto]`.
- item-indicator (RAW): `${sharedIndicator}` PLUS keeps the
  `radcn-command-item-indicator` class (the KEPT `[data-checked="false"]
  .radcn-command-item-indicator { opacity:0 }` cascade targets it).
- shortcut: `text-muted-foreground font-medium text-[0.75rem] leading-none
  [font-family:var(--radcn-font)]`.
- dialog (RAW class on the migrated DialogContent): `p-0 overflow-hidden`.
- dialog-header (RAW): `absolute w-px h-px overflow-hidden [clip:rect(0,0,0,0)]`.

Kept bespoke: the `.radcn-command-item[data-checked="false"]
.radcn-command-item-indicator { opacity:0 }` cascade (command-specific, opacity ADD
on a child); the `.radcn-fixture-custom-combobox, .radcn-fixture-custom-command`
fixture; `@keyframes radcn-select-in`.

## Why both suites stay green

- Custom combobox (`:193` content `toHaveClass`) + custom command (`:249` class +
  `:250` border `rgb(15,118,110)`) hold: the content/root read `border/bg/fg-[var(--radcn-combobox-*/command-*)]`
  from the fixture tokens.
- Combobox invalid/disabled via the control propagation.
- The raw-class command sub-elements now emit utilities; the checked-indicator
  cascade + `radcn-select-in` animation kept.

## Changes

- `radcn/packages/radcn/src/components/combobox.tsx`: export the shared consts; emit
  combobox utilities (root sets control vars); drop style-less value/collection
  classes; keep data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/components/command.tsx`: import the shared consts; emit
  command utilities INCLUDING the raw-class sub-elements (input-wrapper/input/
  group-heading/dialog/dialog-header/item-indicator); the item-indicator keeps its
  class for the cascade.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated combobox/command
  rules (replacing the control invalid/disabled cascades with propagation); KEEP the
  command checked-indicator cascade + the fixture + `@keyframes radcn-select-in`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the propagation var-sets + `grid-cols-[…]`,
   `max-h-[min(…)]`, `[&[hidden]]:hidden`, `[clip:rect(0,0,0,0)]`,
   `animate-[radcn-select-in_120ms_ease-out]`, `opacity-[var(…)]` compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; no migrated combobox/command rule remains (except the
   kept checked-indicator cascade); the fixture + keyframes retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `combobox-command.spec.ts` (custom combobox
   content class, custom command class + border `rgb(15,118,110)`, combobox invalid/
   disabled, item highlight/disabled/indicator, chips, empty, separators, open/close,
   keyboard nav).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Command + Combobox render from Tailwind utilities (incl. the command
raw-class sub-elements); the custom border/colors + combobox invalid/disabled + the
content/item splits hold; BOTH suites green; byte-identical.

Fail criteria: a combobox-command assertion regresses; a content bg/fg or item
grid-cols conflict; the propagation fails; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass (one in-flight fix: a missed marker class)

Command + Combobox migrated; both suites green. The gate caught one regression,
fixed in-flight:

- `combobox-command.spec.ts:286` locates the command dialog by
  `.radcn-command-dialog[data-radcn-dialog-content]` — `radcn-command-dialog` is an
  asserted MARKER (locator), but the first pass dropped it (migrated to utilities).
  Fix: the command dialog emits `classes(commandDialogClass, 'radcn-command-dialog',
  className)` — the style-less marker kept alongside the utilities (the nav-link
  marker pattern). combobox-command isolation then 11/11.

Verification (post-fix):
1. Both `styles:build` exit 0; the control propagation var-set + read compile
   (`--radcn-combobox-control-bc` set + `var(--radcn-combobox-control-bc…)` read,
   count 2), as do the `grid-cols-[…]`, `max-h-[min(…)]`, `[&[hidden]]:hidden`,
   `[clip:rect(0,0,0,0)]`, `animate-[radcn-select-in_120ms_ease-out]`; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated combobox/command rule
   remains except the kept `[data-checked="false"] .radcn-command-item-indicator`
   cascade; the fixture + `@keyframes radcn-select-in` retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: `combobox-command.spec.ts` in isolation **11 passed** (custom
   combobox content class, custom command class + border `rgb(15,118,110)`, combobox
   invalid/disabled, item highlight/disabled/indicator, chips, empty, the command
   dialog marker + open). Full fixture suite **1191 passed** (run 2 clean); run 1 had
   the known intermittent serial-load flake (1 unrelated, passes on re-run —
   isolation is 11/11 and run 2 is 1191).
6. `git diff --check` clean; `vendor/` untouched; the four expected files changed.

## Conclusion

Command + Combobox render from Tailwind utilities (shared consts exported from
`combobox.tsx`, reused by `command.tsx`); the shared control/input/content/list/item
rules dropped (both migrated together). The content bg/fg + item grid-cols were
SPLIT per component (Exp-41); the combobox control invalid/disabled propagates via
`--radcn-combobox-control-*` vars; the command raw-class sub-elements
(input-wrapper/group-heading/dialog-header) became utilities, the command dialog
keeps its `radcn-command-dialog` marker, and the input-wrapper carries its resolved
state with per-side border longhands (no shared-vs-override conflict). The
`[data-checked="false"] .radcn-command-item-indicator` cascade stays bespoke.
FORTY-SIX components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- A class can be a TEST LOCATOR even when it has no CSS rule and isn't the
  component's "own" surface — `radcn-command-dialog` (on the migrated Dialog) is
  located by `combobox-command.spec.ts:286`. Grep the SPECS for a class before
  dropping it, not just the components/fixtures; keep asserted classes as style-less
  markers.
- Across a shared/override component boundary, do NOT layer
  `${sharedConst} + overrides` when the override changes a shared property
  (border/radius/bg) — that re-creates the Exp-41 source-order conflict. Emit the
  overriding element's RESOLVED state directly (here the command input-wrapper, with
  per-side border longhands instead of the `border` shorthand).

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README + map, this experiment
file, and read access to the source + fixtures + tests).

Findings: the reviewer APPROVED the two main conflict splits (content
structure-vs-bg/fg, item structure-vs-grid-cols), the control propagation (combobox
root emits `data-invalid`/`data-disabled`, the control reads the vars; values
correct), the raw-class sub-element conversions + the item-indicator marker
retention for the kept checked-indicator cascade, and the custom-token assertions
(`:193`/`:249`/`:250` — the command border reads `--radcn-combobox-border` from the
shared structure, which the fixture sets). It returned ONE correct BLOCKER:

- The command INPUT-WRAPPER was specified as `${sharedControl}` + command overrides,
  which re-introduces the Exp-41 conflict (shared `border`/`rounded-md`/`bg` vs the
  command `border-x-0`/`border-t-0`/`rounded-none`/`bg` — resolved by generated
  source order, not class order → unreliable). FIX: the input-wrapper does NOT use
  `${sharedControl}`; it emits the RESOLVED command state directly with per-side
  border longhands (`border-x-0 border-t-0 border-b`, no `border` shorthand), its own
  `rounded-none`/`bg`/`border-[color:--radcn-command-border]` + the non-conflicting
  shared props (`flex`/`w-full`/`min-h`/`items-center`/`text-...`). This is the
  Exp-41 "conflicting prop lives in only one place" rule applied across the
  shared/override boundary.

Minor notes (no action): `--radcn-command-border` is read by the input-wrapper
bottom border (not dead); `input-icon` stays a style-less structural raw class.

Approval result: approved after the input-wrapper fix — the splits + propagation +
raw-class conversions are sound, and the input-wrapper now carries its resolved
state with no shared-vs-override conflict.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer verified all 15 checkpoints: the 9 shared consts exported from
combobox.tsx + imported by command.tsx (sharedControl correctly omitted from
command); the control propagation (root sets `--radcn-combobox-control-bc/-shadow/-op`,
sharedControl reads with the right fallbacks); BOTH conflict-splits (content bg/fg,
item grid-cols — shared carries structure only, each component adds its own); the
command input-wrapper emitting its RESOLVED state with per-side border longhands (no
sharedControl, no conflict); the command raw-class sub-elements converted; the
`radcn-command-dialog` + `radcn-command-item-indicator` markers kept; input-icon
style-less; tokens.css pruned except the kept checked-indicator cascade + fixture +
`@keyframes radcn-select-in`; byte-identical `index.ts`. It rebuilt + confirmed the
propagation var-set/read + the arbitrary utilities generate (no junk), re-ran the
three typechecks, the docs suite (11), `combobox-command.spec.ts` (11 — incl. the
`:286` dialog marker + the custom border `rgb(15,118,110)`), and the full fixture
suite (1191). Verdict: APPROVED.

Approval result: approved with no blockers — Command + Combobox migrated (46
components).
