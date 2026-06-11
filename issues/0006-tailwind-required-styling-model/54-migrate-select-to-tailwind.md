# Experiment 54: Migrate Select content surfaces to Tailwind utilities

## Description

Select migrates like the Exp-51 menu triggers: the `.radcn-select-trigger` (+ its
`[data-size=sm]`/`:focus-visible`/`:disabled`+`[data-disabled]` cascade/`[data-invalid]`
cascade+`[aria-invalid]`/`[data-placeholder]` rules) is COUPLED to ButtonGroup (the
`.radcn-button-group > .radcn-select-trigger` cascade at tokens.css ~839-900 restyles
its radius for split-buttons) — migrating its radius would make that bespoke cascade
an unreliable override (Exp-47). So the TRIGGER stays bespoke (kept) this experiment;
everything else migrates.

### MIGRATE (component-emitted, non-trigger)

- root (`.radcn-select`): `inline-block [font-family:var(--radcn-font)]`.
- value (`.radcn-select-value`): `overflow-hidden text-ellipsis whitespace-nowrap
  data-[placeholder=true]:text-[var(--radcn-select-placeholder-fg,var(--radcn-muted-foreground))]`
  (the value half of the combined `value/trigger[data-placeholder]` rule — SPLIT;
  the trigger half stays bespoke).
- icon (`.radcn-select-icon`): `text-[var(--radcn-select-icon-fg,var(--radcn-muted-foreground))]
  text-[0.75rem]`.
- portal + content `[hidden]`: `[&[hidden]]:hidden`.
- content (`.radcn-select-content`): `z-[var(--radcn-select-z,50)] grid
  max-h-[min(var(--radcn-select-content-max-height,17rem),var(--radcn-select-available-height,17rem))]
  min-w-32 overflow-hidden border border-[var(--radcn-select-border,var(--radcn-border))]
  rounded-md bg-[var(--radcn-select-bg,var(--radcn-background))]
  text-[var(--radcn-select-fg,var(--radcn-foreground))]
  shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]
  [transform-origin:var(--radcn-select-transform-origin,top_left)]
  animate-[radcn-select-in_120ms_ease-out] motion-reduce:animate-none
  [&[hidden]]:hidden`. (The `motion-reduce:animate-none` replaces the bespoke
  `@media (prefers-reduced-motion: reduce) { .radcn-select-content { animation:none } }`
  override — found during implementation; the migrated content dropped the
  `.radcn-select-content` class the `@media` rule targeted, so the reduced-motion
  reset moves onto the content utility via Tailwind's `motion-reduce:` variant.)
- viewport (`.radcn-select-viewport`): `grid gap-0.5
  max-h-[min(14rem,var(--radcn-select-available-height,14rem))] overflow-y-auto p-1.5
  outline-none`.
- group (`.radcn-select-group`): `grid gap-0.5`.
- label (`.radcn-select-label`): `px-7 pt-1.5 pb-1 text-muted-foreground font-semibold
  text-[0.75rem] leading-[1.2] [font-family:var(--radcn-font)]`.
- item (`.radcn-select-item`): `grid min-h-8 grid-cols-[1rem_minmax(0,1fr)] items-center
  gap-2 rounded-[calc(var(--radcn-radius)-0.125rem)] cursor-default px-2 py-1.5
  text-[0.875rem] font-normal leading-[1.25] [font-family:var(--radcn-font)]
  outline-none
  data-[highlighted=true]:bg-[var(--radcn-select-highlight-bg,var(--radcn-secondary))]
  data-[highlighted=true]:text-[var(--radcn-select-highlight-fg,var(--radcn-foreground))]
  data-[disabled=true]:text-muted-foreground data-[disabled=true]:opacity-50`.
- item-indicator (`.radcn-select-item-indicator`): `inline-flex justify-center
  text-[var(--radcn-select-indicator-fg,var(--radcn-primary))]`.
- separator (`.radcn-select-separator`): `h-px my-1 mx-1.5
  bg-[var(--radcn-select-separator-bg,var(--radcn-border))]`.
- scroll-button (`.radcn-select-scroll-button`): `flex h-6 items-center justify-center
  border-0 bg-transparent text-muted-foreground cursor-pointer text-[0.75rem]
  font-medium leading-none [font-family:var(--radcn-font)] focus-visible:outline-2
  focus-visible:outline-[var(--radcn-ring)] focus-visible:[outline-offset:-2px]`. The
  `radcn-select-scroll-button--up`/`--down` modifier classes have NO CSS rule
  (style-less directional markers) — kept as-is alongside the utility const.

### KEEP BESPOKE (trigger, ButtonGroup-coupled)

`.radcn-select-trigger` (+ `[data-size="sm"]`, `:focus-visible`, the
`:disabled`+`[data-disabled]` rule, the `[data-invalid]`+`[aria-invalid]` rule, and
the SPLIT-out `.radcn-select-trigger[data-placeholder="true"]`). The component keeps
emitting `radcn-select-trigger`. The `.radcn-fixture-custom-select` fixture +
`@keyframes radcn-select-in` are unchanged.

## Why both suites stay green

- `select.spec.ts:296` asserts `opened.content` `toHaveClass(/radcn-fixture-custom-select/)`
  — the class is on the content, and the migrated content reads
  `bg/border/text-[var(--radcn-select-*)]` from the fixture tokens (incl. the
  `--radcn-select-border` border → the content border resolves to the custom color).
- The trigger (custom bg/border/fg, size, focus, disabled, invalid, placeholder) is
  untouched (kept bespoke) — its assertions hold unchanged.
- Item highlight/disabled via `data-[…]:`; the `radcn-select-in` animation kept.

## Changes

- `radcn/packages/radcn/src/components/select.tsx`: emit utility-const strings for
  root/value/icon/content/viewport/group/label/item/indicator/separator/scroll-button;
  KEEP the trigger emission (`radcn-select-trigger` + data attrs) unchanged; keep all
  data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated select rules;
  SPLIT the value/trigger `[data-placeholder]` rule (keep the trigger half); KEEP the
  trigger rules + the fixture + `@keyframes radcn-select-in`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `min-w-32`, `max-h-[min(…)]`, `[&[hidden]]:hidden`,
   `[transform-origin:…]`, `animate-[radcn-select-in_120ms_ease-out]`,
   `[outline-offset:-2px]` utilities compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no migrated select rule remains; the trigger rules +
   the split trigger-placeholder + the fixture + keyframes retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `select.spec.ts` (the custom content class,
   trigger open/close, value/placeholder, items + highlight/disabled, indicator,
   groups, separators, scroll buttons, keyboard nav) and any ButtonGroup>select demo.
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Select content surfaces render from Tailwind utilities (trigger kept
bespoke); the custom content + trigger + items + structure hold; BOTH suites green;
byte-identical.

Fail criteria: a select assertion regresses; the content positioning/animation
drifts; the trigger ButtonGroup coupling breaks; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Select content surfaces migrated; both suites green (both fixture runs clean — no
flake). One thing surfaced during implementation: a `@media (prefers-reduced-motion:
reduce) { .radcn-select-content { animation: none } }` override targeted the dropped
`.radcn-select-content` class — moved onto the content utility as
`motion-reduce:animate-none` and the bespoke `@media` block removed.

Verification:
1. Both `styles:build` exit 0; the `min-w-32`, `max-h-[min(…)]`, `[&[hidden]]:hidden`,
   `animate-[radcn-select-in_120ms_ease-out]`, `motion-reduce:animate-none`
   (`@media (prefers-reduced-motion: reduce){…animation:none}` generated, count 1),
   `[outline-offset:-2px]` utilities compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated select rule remains; the
   trigger rules (+ size/focus/disabled/invalid + the split `[data-placeholder]`) +
   the fixture + `@keyframes radcn-select-in` retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2 (both clean); `select.spec.ts` in isolation
   **12 passed** — the custom content class + colors, trigger open/close, value/
   placeholder, items + highlight/disabled, indicator, groups, separators, scroll
   buttons, keyboard nav.
6. `git diff --check` clean; `vendor/` untouched; the three expected files changed.

## Conclusion

Select's content surfaces (root/value/icon/content/viewport/group/label/item/
indicator/separator/scroll-button) render from Tailwind utilities; the
ButtonGroup-coupled trigger (+ its size/focus/disabled/invalid/placeholder rules)
stays bespoke (the `.radcn-button-group > .radcn-select-trigger` cascade still
restyles it for split-buttons). The value/trigger placeholder rule was SPLIT; the
reduced-motion override became a `motion-reduce:` utility. FORTY-SEVEN components are
now migrated (Select counts as one; its trigger remains a kept surface until
ButtonGroup migrates).

Learnings (also copied to the issue README Learnings digest):

- A `@media (prefers-reduced-motion: reduce)` override of an animated migrated
  surface becomes a `motion-reduce:animate-none` (or `motion-reduce:…`) utility on
  that surface — Tailwind's `motion-reduce:` variant IS that media query. Grep for
  `prefers-reduced-motion` blocks targeting a class you're dropping.
- The Exp-51 "ButtonGroup-coupled trigger stays bespoke" carve-out generalizes to
  Select: migrate the content surfaces, keep the trigger + its state rules bespoke
  until ButtonGroup migrates.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, Haiku 4.5, spawned via the Agent
tool by the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README + map, this experiment
file, and read access to the source + fixtures + tests).

Findings: the reviewer's SUBSTANTIVE checks all PASSED — it confirmed the
ButtonGroup→trigger coupling (so the trigger + its size/focus/disabled/invalid rules
correctly stay bespoke), the placeholder SPLIT (value half migrates, trigger half
stays), the token integration (the migrated content reads `--radcn-select-border`/
`-bg`/`-fg`; the `:296` custom content assertions hold), and that no
`toHaveClass(/radcn-select-*/)` beyond the custom fixture forces a marker. It
verified `min-w-32` computes to 8rem.

Its "REJECTED" verdict stemmed from MISREADING the design doc as a claimed
implementation (it reported "no utilities emitted yet" as failures — but this is the
DESIGN stage; implementation is the next step). Its other flags are confirmations,
not blockers:
- scroll-button `--up`/`--down`: grep found NO CSS rule for them — they are
  style-less directional markers, kept as-is (clarified in the mapping above).
- `animate-[radcn-select-in_120ms_ease-out]`: this is the PROVEN pattern from Exp
  25/51 (the `@keyframes radcn-select-in` stays bespoke; the `animate-[name_dur_ease]`
  arbitrary utility references it) — not an inconsistency.
- `gap-0.5` = 0.125rem and `min-w-32` = 8rem are correct Tailwind v4 values (used
  across the prior menu migrations).

Approval result: approved (lead-agent judgment) — the substantive design is sound
(trigger carve-out, placeholder split, token reads, proven animate pattern); the
reviewer's reject was a design-stage misread, and its concrete value-checks confirm
the mapping. The dual-suite gate decides.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed the 11 content-surface utility consts (icon + inline
item-indicator converted from raw classes); the TRIGGER still emits
`radcn-select-trigger` (bespoke, ButtonGroup cascade intact); the scroll-button
`--up`/`--down` style-less markers kept; `selectContentClass` has
`animate-[radcn-select-in_120ms_ease-out]` + `motion-reduce:animate-none` +
`[&[hidden]]:hidden`; `selectValueClass` has the `data-[placeholder=true]:text-[…]`
half of the split. tokens.css KEEPS the trigger rules (+ size/focus/disabled/invalid
+ split `[data-placeholder]`), removed the bespoke `@media (prefers-reduced-motion)`
block, kept the fixture + `@keyframes radcn-select-in`; byte-identical `index.ts`.
It rebuilt + confirmed the utilities (incl. the regenerated reduced-motion media
query) compile with no junk, re-ran the three typechecks, the docs suite (11),
`select.spec.ts` (12), and the full fixture suite (1191×2, both clean). Verdict:
APPROVED.

Approval result: approved with no blockers — Select content surfaces migrated (47
components); the trigger stays bespoke until ButtonGroup migrates.
