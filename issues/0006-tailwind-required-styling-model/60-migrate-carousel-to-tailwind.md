# Experiment 60: Migrate Carousel to Tailwind utilities

## Description

Carousel is standalone (no Button/family coupling). Its component-emitted surfaces
(root + `--{orientation}` marker, content, track, item, previous, next) migrate; the
vertical orientation uses propagation for the children + an own-variant for the root
width; control POSITION stays bespoke; the fixture/docs demo classes (slide-card,
`--multiple`, `--size`) + their cascades stay bespoke (they are NOT component-emitted
— verified: only `fixtures/carousel.tsx` + `docs/content/components.tsx` apply them).

### Orientation handling

- root width: `data-[orientation=vertical]:w-[min(100%,var(--radcn-carousel-vertical-width,18rem))]`
  (own variant on the root, which emits `data-orientation`).
- content/track/item vertical changes → CSS-var PROPAGATION (the root SETS vars on
  `data-[orientation=vertical]:`, the children READ them) — a bespoke `.--vertical
  .child` cascade onto the migrated children is unreliable (Exp-47):
  - root: `data-[orientation=vertical]:[--radcn-carousel-content-overflow:hidden_auto]
    data-[orientation=vertical]:[--radcn-carousel-content-maxh:var(--radcn-carousel-vertical-height,18rem)]
    data-[orientation=vertical]:[--radcn-carousel-content-snap:y_mandatory]
    data-[orientation=vertical]:[--radcn-carousel-track-dir:column]
    data-[orientation=vertical]:[--radcn-carousel-item-fallback:11rem]`.
  - content reads `[overflow:var(--radcn-carousel-content-overflow,auto_hidden)]
    max-h-[var(--radcn-carousel-content-maxh,none)]
    [scroll-snap-type:var(--radcn-carousel-content-snap,x_mandatory)]`.
  - track reads `[flex-direction:var(--radcn-carousel-track-dir,row)]`.
  - item reads `flex-[0_0_var(--radcn-carousel-item-size,var(--radcn-carousel-item-fallback,100%))]`.
- control POSITION (`.radcn-carousel-previous`/`-next` + their `.--vertical`
  overrides — only `position`/`top`/`left`/`right`/`bottom`/`transform`) stays
  BESPOKE: positioning-only, it does NOT conflict with the migrated appearance
  utilities (different properties), and the `.--vertical` overrides key on the kept
  `radcn-carousel--vertical` marker. The control keeps emitting `radcn-carousel-previous`/
  `-next` + the `radcn-carousel--{orientation}` marker stays on the root.

### Exact utility mapping (component surfaces)

- root (`.radcn-carousel`): `relative grid w-[min(100%,var(--radcn-carousel-width,22rem))]
  gap-3 text-[var(--radcn-carousel-fg,var(--radcn-foreground))] [font-family:var(--radcn-font)]
  outline-none focus-visible:rounded-md
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]` +
  the orientation var-sets + `data-[orientation=vertical]:w-[…]`. Keeps the
  `radcn-carousel--{orientation}` marker (for the kept control-position rules).
- content (`.radcn-carousel-content`): `[overflow:var(--radcn-carousel-content-overflow,auto_hidden)]
  rounded-md [scroll-behavior:auto] [scroll-snap-type:var(--radcn-carousel-content-snap,x_mandatory)]
  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
  max-h-[var(--radcn-carousel-content-maxh,none)]`.
- track (`.radcn-carousel-track`): `flex gap-[var(--radcn-carousel-gap,1rem)]
  [flex-direction:var(--radcn-carousel-track-dir,row)]`.
- item (`.radcn-carousel-item`): `min-w-0
  flex-[0_0_var(--radcn-carousel-item-size,var(--radcn-carousel-item-fallback,100%))]
  [scroll-snap-align:start] outline-none focus-visible:rounded-md
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`.
- previous/next APPEARANCE: `absolute z-[1] inline-flex w-8 h-8 items-center
  justify-center border border-[var(--radcn-carousel-control-border,var(--radcn-border))]
  rounded-[999px] bg-[var(--radcn-carousel-control-bg,var(--radcn-background))]
  text-[var(--radcn-carousel-control-fg,var(--radcn-foreground))] cursor-pointer
  text-[1.25rem] font-semibold leading-none shadow-[0_8px_24px_rgb(0_0_0_/_0.12)]
  disabled:cursor-not-allowed disabled:opacity-[0.45]`.

### Kept bespoke

- The control POSITION rules: `.radcn-carousel-previous` / `.radcn-carousel-next`
  (top/left/right/transform) + `.radcn-carousel--vertical .radcn-carousel-previous` /
  `.--vertical .radcn-carousel-next` (the vertical overrides). Positioning-only.
- The fixture/docs demo classes: `.radcn-carousel-slide-card` + the
  `.radcn-carousel-item[data-selected] .radcn-carousel-slide-card` (+ `.reference-…`)
  selected-border cascade; `.radcn-carousel--multiple`; `.radcn-carousel--size`.
- The `.radcn-fixture-custom-carousel` fixture.

## Why both suites stay green

- `carousel.spec.ts:68/152` (track `gap` 6px) hold via `gap-[var(--radcn-carousel-gap,1rem)]`
  reading the demo's `--radcn-carousel-gap` (0.375rem); `:155` (custom class on root)
  holds; `:156/:157` (slide-card border/bg `rgb(15,118,110)`/`rgb(240,253,250)`) hold
  via the KEPT fixture slide-card rule (+ the kept selected cascade).
- Vertical: the root width via its own variant; content/track/item via the root's
  `data-[orientation=vertical]:` var-sets → the children's reads; the control vertical
  position via the kept bespoke `.--vertical` rules (keyed on the kept marker).
- The horizontal control position via the kept bespoke base rules; the scrollbar
  hidden via `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`.

## Changes

- `radcn/packages/radcn/src/components/carousel.tsx`: emit utility-const strings for
  root (+ orientation var-sets, keep the `--{orientation}` marker)/content/track/item/
  previous/next (appearance); keep all data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated carousel rules
  (root/focus, content/scrollbar, track, item/focus, control appearance, the
  `--vertical` root-width + content/track/item cascades); KEEP the control POSITION
  rules (+ `--vertical` overrides), the slide-card + selected cascade, `--multiple`,
  `--size`, and the fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the orientation var-sets + `[overflow:var(…)]`,
   `[&::-webkit-scrollbar]:hidden`, `flex-[0_0_var(…)]`, `rounded-[999px]`,
   `gap-[var(…)]` utilities compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; the migrated carousel rules removed; the control
   position rules + slide-card/multiple/size + fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `carousel.spec.ts` (track gap, custom class,
   slide-card border/bg, horizontal + vertical orientation, prev/next nav, keyboard,
   the multiple/size demos).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Carousel renders from Tailwind utilities (control position + fixture
demos kept bespoke); the track gap + custom class + slide-card + orientation hold;
BOTH suites green; byte-identical.

Fail criteria: a carousel assertion regresses; the vertical layout/control position
drifts; the scrollbar shows; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Carousel migrated; both suites green (both fixture runs clean). All three
`styles:build`/typechecks pass; the orientation var-sets + `[overflow:var(…)]` +
`[&::-webkit-scrollbar]:hidden` + `flex-[0_0_var(…)]` compile (no junk); `index.ts`
byte-identical; the 13 migrated carousel rules removed while the control POSITION
rules (+ `--vertical` overrides), the slide-card + selected cascade, `--multiple`/
`--size`/`--spacing`, and the fixture are retained; docs 11 ×2; `carousel.spec.ts`
in isolation 5 passed (track gap 6px, custom class, slide-card border/bg, horizontal
+ vertical orientation, prev/next nav); fixture 1191 ×2 (both clean); `git diff
--check` clean; three files changed.

## Conclusion

Carousel renders from Tailwind utilities (root/content/track/item/control appearance);
the vertical orientation propagates via the root's `data-[orientation=vertical]:`
var-sets (content overflow/max-h/snap, track flex-direction, item flex-basis
fallback) read by the children, with the root width as its own variant; the control
POSITION stays bespoke (positioning-only, keyed on the kept markers); the slide-card /
`--multiple` / `--size` / `--spacing` fixture-demo classes + the selected-border
cascade stay bespoke. FIFTY-THREE components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- For a positioned control whose POSITION differs by orientation but APPEARANCE does
  not, split: migrate the appearance to utilities, keep the position rules bespoke
  (positioning-only — `top`/`left`/`transform` — does not conflict with the appearance
  utilities), and keep the orientation marker on the parent so the position cascade
  still matches. Avoids propagating ~10 positioning vars.
- `[overflow:var(--x,auto_hidden)]` / `[scroll-snap-type:var(--x,y_mandatory)]` /
  `[&::-webkit-scrollbar]:hidden` all compile — scroll containers migrate fully.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major (documentation-clarity notes only). The reviewer
verified all five cruxes: (1) the content/track/item vertical changes propagate via
the root's `data-[orientation=vertical]:[--…]` var-sets + the children's reads (the
Exp-47/59 pattern; root emits `data-orientation`); the root-width own-variant beats
the base width by attribute specificity (Resizable/Toggle precedent); (2) keeping the
control POSITION rules bespoke is correct — positioning-only, no overlap with the
migrated appearance utilities (the control keeps `radcn-carousel-previous`/`-next` +
the root keeps the `radcn-carousel--{orientation}` marker so the `.--vertical` control
rules still match); (3) slide-card/`--multiple`/`--size`/`--spacing` are fixture/docs
demo classes (NOT component-emitted — verified) → kept bespoke, incl. the
`[data-selected] .slide-card` selected-border cascade; (4) all ~20 utility mappings +
the `[&::-webkit-scrollbar]:hidden`/`[overflow:var(…,auto_hidden)]`/`rounded-[999px]`
syntax are correct + proven in the codebase; (5) `:68/:152` track gap (via
`gap-[var(--radcn-carousel-gap,1rem)]` reading the demo's 0.375rem), `:155` custom
class, `:156/:157` slide-card border/bg (kept bespoke), and the vertical orientation
(via the content max-h var) all hold.

Approval result: approved — the orientation propagation + the control
position/appearance split + the fixture-demo carve-outs are sound.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: none (no Blocker, Major, or Minor). The reviewer confirmed all 5 cruxes:
the root var-sets + children's reads (orientation propagation) + the root width
own-variant; the control appearance migrated + position kept bespoke (positioning-only,
no conflict) with the markers kept; the slide-card/`--multiple`/`--size`/`--spacing` +
selected cascade kept bespoke (not component-emitted); the `[overflow:var(…)]`/
`[&::-webkit-scrollbar]:hidden`/`flex-[0_0_var(…)]`/`gap-[var(…)]` compile; the
`:68/152` track gap, `:155` custom class, `:156/157` slide-card border/bg, and the
vertical orientation all hold. tokens.css removed the 13 migrated rules and kept the
position + demos + fixture; byte-identical `index.ts`. It re-ran the three typechecks,
the docs suite (11), `carousel.spec.ts` (5), and the full fixture suite (1191).
Verdict: APPROVED.

Approval result: approved with no blockers — Carousel migrated (53 components).
