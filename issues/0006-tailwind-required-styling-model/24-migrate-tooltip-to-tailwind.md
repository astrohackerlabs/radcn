# Experiment 24: Migrate Tooltip (content + arrow) to Tailwind utilities

## Description

The first overlay migration, now unblocked by the Experiment 23 animation
foundation. Tooltip is a JS-driven positioned overlay: the
`positioned-overlay.ts` runtime sets `content.hidden = state !== 'open'`
(visibility via the `hidden` attribute → `display:none`, NOT CSS), positions
the content, and sets `--radcn-overlay-transform-origin` /
`--radcn-overlay-available-width`. The content has an ENTER-only animation
(`radcn-positioned-overlay-in`); hide is instant via `hidden`.

This migrates the tooltip CONTENT and ARROW visual styling (box, color,
enter-animation) to shadcn v4 utilities, while keeping RadCN's overlay
POSITIONING system (the transform-origin + collision max-width, and the
data-side arrow placement) as small data-attribute-keyed bespoke rules — that
positioning machinery is RadCN's dependency-free equivalent of shadcn's Radix
Popper, not component styling. The Button-coupled trigger
(`TooltipTrigger`, and fixtures that pass `radcn-button*` to it) is NOT touched
here (it migrates with the Button keystone).

shadcn v4 `tooltip.tsx` content/arrow → utilities (validated by probe + Exp 23):

- TooltipContent box/color/animation:
  `z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-balance
  text-background animate-in fade-in-0 zoom-in-95
  data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
  — ENTER-only (the shadcn `data-[state=closed]:animate-out fade-out-0
  zoom-out-95` exit utilities are OMITTED, because RadCN hides via `hidden`/
  `display:none`, so an exit animation never plays — matching RadCN's existing
  enter-only behavior).
- TooltipArrow box: `absolute size-2 rotate-45 bg-foreground` (`size-2` = the
  existing `0.5rem`, which the `-0.25rem` data-side offsets are computed
  against; shadcn's `size-2.5` would mismatch those offsets).

Kept as RadCN overlay-system bespoke (repointed to data attributes, no
`radcn-tooltip-*` CLASS emitted):

- `[data-radcn-tooltip-content] { max-width: min(20rem,
  var(--radcn-overlay-available-width, calc(100vw - 1rem)));
  transform-origin: var(--radcn-overlay-transform-origin, center bottom); }`
  (the collision clamp + the JS-driven transform origin; the
  `--radcn-tooltip-width` token is dropped, defaulting to `20rem`).
- The four arrow placement rules, repointed from
  `.radcn-tooltip-content[data-side="X"] .radcn-tooltip-arrow` →
  `[data-radcn-tooltip-content][data-side="X"] [data-radcn-tooltip-arrow]`.

Custom-token fixture: `.radcn-fixture-custom-tooltip` sets `--radcn-tooltip-bg:
#0f766e; --radcn-tooltip-fg: #ffffff`, which the migrated content/arrow no
longer read. This IS asserted — `positioned-overlays.spec.ts:218`:
`await expect(content).toHaveCSS('background-color', 'rgb(15, 118, 110)')`
(#0f766e) on the custom-token tooltip content (a variable-based assertion). So
the translation is REQUIRED: `.radcn-fixture-custom-tooltip { background-color:
#0f766e; color: #ffffff; }` (this unlayered `radcnStyles` rule wins over the
`bg-foreground` utility because it is injected after the Tailwind `<link>`, so
the assertion holds) plus `.radcn-fixture-custom-tooltip [data-radcn-tooltip-arrow]
{ background-color: #0f766e; }` (the arrow is only `toBeVisible`-asserted, not
color-asserted, but kept teal for consistency).

## Why both suites stay green

- Tooltip tests assert visibility (`toBeVisible`/`toBeHidden` — driven by the
  `hidden` attribute, unchanged), `data-state`/`data-side`/`data-align`/
  `aria-*` attributes (retained), text, and positioning (driven by the JS +
  the kept positioning-glue rule). NO computed-style assertion targets the
  tooltip content/arrow box/color, and the custom tooltip is not asserted.
- The enter animation: `animate-in` is a CSS animation that runs when the
  content's `hidden` is removed (display none→shown re-triggers it) — IDENTICAL
  in mechanism to the current `radcn-positioned-overlay-in` (also a CSS
  animation toggled by the same `hidden` attribute). So the enter behavior is
  preserved, not changed, and it is not test-asserted anyway. `toBeVisible`/
  `toBeHidden` resolve via the `hidden` attribute regardless of the animation.
- No test asserts an exit animation: `positioned-overlays.spec.ts` tooltip
  tests assert visibility, `data-*`/`aria` attributes, text, the arrow
  `toBeVisible`, and the custom content `background-color` — none reference
  `animate-out`/`fade-out`/`zoom-out`, so omitting the exit utilities is safe.
- The trigger (Button-coupled) is unchanged, so its `radcn-button*` assertions
  are unaffected.
- `bg-foreground`/`text-background` resolve via the contract; the animation
  utilities via Exp 23 (`tw-animate-css`).

## Changes

- `radcn/packages/radcn/src/components/tooltip.tsx`:
  - `TooltipContent`: `class={classes('z-50 w-fit rounded-md bg-foreground px-3
    py-1.5 text-xs text-balance text-background animate-in fade-in-0 zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
    data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    className)}` (no `radcn-tooltip-content` class).
  - `TooltipArrow`: `class={classes('absolute size-2 rotate-45 bg-foreground',
    className)}` (no `radcn-tooltip-arrow` class).
  - Keep ALL `data-radcn-tooltip*`, `data-side`/`data-align`/`data-side-offset`,
    `data-state`, `hidden`, `role`.
- `radcn/packages/radcn/src/styles/tokens.css`:
  - replace the `.radcn-tooltip-content` base rule with the positioning-glue
    rule keyed on the data attribute:
    `[data-radcn-tooltip-content] { max-width: min(20rem,
    var(--radcn-overlay-available-width, calc(100vw - 1rem)));
    transform-origin: var(--radcn-overlay-transform-origin, center bottom); }`;
  - remove the `.radcn-tooltip-arrow` base rule (its `position/size/bg/rotate`
    move to the arrow utilities);
  - repoint the four arrow placement rules, e.g.
    `[data-radcn-tooltip-content][data-side="top"] [data-radcn-tooltip-arrow] {
    bottom: -0.25rem; left: calc(50% - 0.25rem); }` (and the bottom/left/right
    siblings, verbatim offsets) — the `-0.25rem` offsets keep `size-2`
    (0.5rem) arrows centered;
  - translate `.radcn-fixture-custom-tooltip` to the direct content + arrow
    rules above.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `tooltip.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the tooltip utilities
   (`bg-foreground`, `text-background`, `data-[side=bottom]:slide-in-from-top-2`,
   `animate-in`, `size-2`, `rotate-45`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-tooltip-content`/
   `.radcn-tooltip-arrow` base CLASS rule remains; the positioning glue +
   arrow placement are now `[data-radcn-tooltip-*]`-keyed.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `positioned-overlays.spec.ts`
   tooltip tests (open/hide visibility, `data-side`/`data-align`/`aria`,
   demo/default/custom scenarios) and the tooltip arrow rendering.
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Tooltip content/arrow render from Tailwind utilities (no
`radcn-tooltip-content`/`-arrow` class emitted); the overlay positioning + arrow
placement still work via the data-attribute-keyed rules; the enter animation
runs and the JS `hidden` hide is intact; BOTH suites green and stable;
`tokens.css`/`index.ts` byte-identical.

Fail criteria: a tooltip visibility/position/attribute assertion regresses; the
arrow mis-positions; a utility not generated; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Tooltip content + arrow are migrated; both suites are green and stable. The
first overlay migration validates the animation foundation (Exp 23) and the
overlay-system pattern. Verification:

1. Both `styles:build` exit 0; the tooltip utilities generate (`bg-foreground`,
   `text-background`, `size-2`, the `data-[side=…]:slide-in-from-*`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-tooltip-content`/
   `.radcn-tooltip-arrow` CLASS rule remains; the positioning glue +
   arrow placement are `[data-radcn-tooltip-*]`-keyed;
   `.radcn-fixture-custom-tooltip` sets `background-color: #0f766e` directly.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `positioned-overlays.spec.ts` in
   isolation **9 passed** — incl. the tooltip open/hide visibility, hover/delay
   placement, `data-side`, the arrow `toBeVisible`, and crucially the
   custom-token content `background-color: rgb(15, 118, 110)` (line 218), now
   satisfied by the translated direct rule.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   three expected files changed.

No deviations from the (corrected) approved design.

## Conclusion

Tooltip is the first migrated overlay: its content (box/color) and arrow render
from shadcn utilities, the enter animation runs via `animate-in`/`fade-in-0`/
`zoom-in-95`/`data-[side]:slide-in-from-*` (the Exp 23 foundation), and the
RadCN positioning system (collision clamp, transform-origin, arrow data-side
placement) stays as data-attribute-keyed bespoke rules. The JS `hidden`-based
hide is intact (exit utilities omitted). Sixteen components are now migrated
(… Spinner, Tooltip — plus sub-components).

This establishes the **overlay-migration pattern** for the cluster (Popover,
Dialog, Dropdown, Select, Sheet, Drawer, HoverCard, Menubar, ContextMenu,
Command, Toast, Accordion): migrate content/arrow box+color+enter-animation to
shadcn utilities; keep the positioning glue + arrow placement as
data-attribute-keyed bespoke; omit exit utilities (JS hides via `hidden`);
translate custom-token overrides to direct rules; leave the Button-coupled
trigger for the Button experiment.

Learnings for later experiments (also copied to the issue README Learnings
digest):

- The overlay-migration pattern (above) — proven on Tooltip — applies to the
  whole positioned-overlay cluster.
- The Spinner variable-based-assertion lesson recurred here: the custom-tooltip
  `background-color` is asserted via `content.toHaveCSS(...)` (a variable
  locator), which a single-line grep missed; the design review caught it.
  ALWAYS read the full overlay test block.
- An overlay's enter animation migrates cleanly to shadcn's `animate-in` family
  because RadCN's JS toggles `hidden` (a CSS animation re-triggers on
  display none→shown), exactly as the old bespoke keyframe did; the exit is the
  `hidden` attribute (instant), so shadcn's `data-[state=closed]:animate-out`
  utilities are omitted.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources)

Round 1: REJECTED. The reviewer confirmed the overlay-system understanding and
the migration approach are sound, but made ONE real catch and several
clarity asks:

- REAL (substantive): the custom-tooltip background IS asserted —
  `positioned-overlays.spec.ts:218` `content.toHaveCSS('background-color',
  'rgb(15, 118, 110)')` (a variable-based assertion my grep missed — the exact
  Spinner-lesson trap). My design wrongly said "not asserted / untested." The
  translation is therefore REQUIRED; the design now states this and that the
  unlayered direct rule wins over `bg-foreground` so the assertion holds.
- The animation re-trigger concern: addressed — `animate-in` is mechanically
  identical to the current `radcn-positioned-overlay-in` (both CSS animations
  toggled by the same `hidden` attribute), so enter behavior is preserved (and
  unasserted). No exit assertion exists, so omitting exit utilities is safe.
- Clarity asks (show the exact component class strings, the repointed arrow
  rules, and the positioning-glue rule): now spelled out verbatim in Changes.

Round 2 (re-review of these resolutions by a fresh Claude subagent): APPROVED.
All five checkpoints confirmed — (1) the custom-tooltip bg assertion (line 218)
is the only tooltip computed-style assertion and the unlayered direct rule
overrides `bg-foreground` so it holds; no exit-animation assertion exists;
(2) the exact class strings + repointed arrow rules + positioning-glue rule are
complete with nothing stranded; (3) `animate-in` is mechanically identical to
the current `radcn-positioned-overlay-in` (both toggled by `hidden`) so enter
behavior is preserved; (4) `size-2` (0.5rem) keeps the `-0.25rem` offsets
centered; (5) no other component depends on the `.radcn-tooltip-content`/
`-arrow` classes (a docs `[data-radcn-tooltip-content][hidden]` rule keys the
data attribute, unaffected), and all utilities generate. No blocker.

Approval result: approved (round 2). Round 1's substantive catch (custom-tooltip
bg IS asserted) is corrected; the migration is sound and complete.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed tooltip.tsx emits the shadcn content + arrow utilities
(no `radcn-tooltip-*` class) with all data/role attributes kept; tokens.css has
no `.radcn-tooltip-content`/`-arrow` class rule, the `[data-radcn-tooltip-content]`
positioning-glue rule + the 4 repointed arrow data-side rules (offsets intact),
and `.radcn-fixture-custom-tooltip` translated to direct bg/color (+ arrow
descendant); byte-identical `index.ts`. It independently re-ran both
`styles:build`, the three typechecks, the docs suite (2/2 = 11), the fixture
suite (1191), and `positioned-overlays.spec.ts` in isolation (9) — confirming
the line-218 custom content `background-color: rgb(15, 118, 110)`, the arrow
`toBeVisible`, the `data-side` placement, and open/hide visibility all pass. It
judged the migration faithful (appearance→utilities, positioning→data-keyed
bespoke), the custom bg genuinely from the unlayered direct rule, and the
enter-animation + `hidden`-hide intact. Verdict: APPROVED.

Approval result: approved with no blockers — the overlay-migration pattern is
established.
