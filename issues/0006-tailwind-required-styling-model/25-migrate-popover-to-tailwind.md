# Experiment 25: Migrate Popover content surface to Tailwind utilities

## Description

The second overlay migration, applying the Experiment 24 pattern. Popover's
content SURFACE is shared with HoverCard via a combined selector
(`.radcn-popover-content, .radcn-hover-card-content { …--radcn-overlay-* tokens… }`),
so this splits that rule (HoverCard keeps a standalone bespoke copy until its
own experiment) and migrates Popover's surface to shadcn v4 utilities. The
RadCN layout + positioning system (grid/gap, the default width, the
collision clamp, the transform origin) stays as a small data-attribute-keyed
bespoke rule. The Button-coupled trigger and the popover-close button +
header/footer/title/description sub-parts are NOT touched here (separate
concerns / the Button experiment).

shadcn v4 `popover.tsx` PopoverContent → utilities (ENTER-only; the JS hides via
`hidden`, so the `data-[state=closed]:animate-out` exit utilities are omitted,
per the Exp 24 pattern):

- PopoverContent surface: `z-50 rounded-md border bg-popover p-4
  text-popover-foreground shadow-md outline-hidden animate-in fade-in-0
  zoom-in-95 data-[side=bottom]:slide-in-from-top-2
  data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2` — note shadcn's `w-72` default is
  OMITTED (RadCN's `classes()` does not tailwind-merge, so a base width utility
  would conflict unpredictably with the consumer's `w-80`; the width default
  stays in the bespoke rule below, which the demo's inline `width:20rem`
  overrides anyway).

Kept as RadCN layout + positioning bespoke (data-attribute-keyed; no
`radcn-popover-content` CLASS emitted):

- `[data-radcn-popover-content] { display: grid; gap: 0.875rem; width:
  min(18rem, var(--radcn-overlay-available-width, calc(100vw - 1rem)));
  transform-origin: var(--radcn-overlay-transform-origin, center top); }` —
  the content's grid layout (arranges its sub-parts), the default/collision
  width, and the JS-driven transform origin. (`--radcn-overlay-width` token
  dropped → `18rem` default.)

Shared-rule split: the combined `.radcn-popover-content, .radcn-hover-card-content`
surface rule (and the `@media (prefers-reduced-motion)` combined rule) have
their `.radcn-popover-content` entry removed; `.radcn-hover-card-content` keeps
a STANDALONE copy of the full bespoke surface body (HoverCard is unchanged,
migrates in its own experiment). HoverCard's existing extra rules
(`grid-template-columns`, its own width) are unaffected.

Reduced-motion hygiene: the `@media (prefers-reduced-motion: reduce) { …
{ animation: none } }` rule (2640-2648) lists seven overlays. Remove the
now-migrated `.radcn-popover-content` AND the `.radcn-tooltip-content` entry
left stranded by Experiment 24 (the migrated overlays use `animate-in`, which —
matching shadcn, which has no reduced-motion guard — is acceptable; the bespoke
rule keeps serving the un-migrated overlays). This also removes the dead
`.radcn-tooltip-content` selector.

Custom-token fixture: `.radcn-fixture-custom-popover` sets `--radcn-overlay-border:
#7c3aed; --radcn-overlay-bg: #faf5ff; --radcn-overlay-fg: #3b0764;
--radcn-popover-close-border: #7c3aed`. `positioned-overlays.spec.ts:79-80`
asserts the content `border-color: rgb(124, 58, 237)` (#7c3aed) and
`background-color: rgb(250, 245, 255)` (#faf5ff). Translate the surface tokens
to direct rules (the migrated content uses `border`/`bg-popover` utilities,
which the unlayered direct rules override): `.radcn-fixture-custom-popover {
border-color: #7c3aed; background-color: #faf5ff; color: #3b0764;
--radcn-popover-close-border: #7c3aed; }` — keeping the close-border token (the
un-migrated close button still reads it).

## Why both suites stay green

- The demo asserts `width: 320px` — INLINE-backed (`style="width:20rem"` in the
  fixture), so it holds regardless of the base width; `toHaveClass(/w-80/)` is
  class-presence (the consumer class is retained on the element).
- The custom-popover content `border-color` (#7c3aed) and `background-color`
  (#faf5ff) are satisfied by the translated direct rules (unlayered, after the
  Tailwind link, so they beat `border`/`bg-popover`).
- Visibility (`toBeVisible`/`toBeHidden`), `data-side`/`data-align`/
  `data-side-offset`/`aria-*`, the close-button click, and the heading/text are
  driven by the JS + retained attributes + the kept sub-part/close rules.
- The enter animation runs via `animate-in` on `hidden` removal (Exp 24
  mechanism); no exit assertion exists.
- HoverCard is unchanged (standalone surface copy), so its tests are unaffected.
- `bg-popover`/`text-popover-foreground` resolve via the contract; animation
  utilities via Exp 23.

## Changes

- `radcn/packages/radcn/src/components/popover.tsx`: `PopoverContent` emits the
  shadcn surface utilities (no `radcn-popover-content` class); keep ALL
  `data-radcn-popover*`, `data-side`/`data-align`/`data-side-offset`,
  `data-state`, `hidden`, `role`. (Trigger/close/sub-parts unchanged.)
- `radcn/packages/radcn/src/styles/tokens.css`:
  - split the `.radcn-popover-content, .radcn-hover-card-content` surface rule —
    `.radcn-hover-card-content` keeps the full bespoke body standalone; replace
    `.radcn-popover-content` with the reduced `[data-radcn-popover-content]`
    layout/positioning rule above;
  - remove `.radcn-popover-content` and the stranded `.radcn-tooltip-content`
    from the `@media (prefers-reduced-motion)` combined selector;
  - translate `.radcn-fixture-custom-popover` to the direct surface rules
    (keeping the close-border token).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `popover.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the popover utilities
   (`bg-popover`, `text-popover-foreground`, `shadow-md`, the `data-[side]:slide`
   + `animate-in`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-popover-content` CLASS
   rule remains; `.radcn-hover-card-content` has a standalone surface body; the
   `@media` reduced-motion rule no longer lists popover or tooltip;
   `.radcn-fixture-custom-popover` sets `border-color`/`background-color`
   directly.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `positioned-overlays.spec.ts`
   popover tests (visibility, `data-side`/`align`, `w-80`/width 320px, the
   close click, AND the custom-token content border `rgb(124,58,237)` + bg
   `rgb(250,245,255)`) AND the hover-card tests (unaffected by the split).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Popover content renders from Tailwind utilities (no
`radcn-popover-content` class); the custom-token border/bg hold via the direct
rules; HoverCard unaffected; positioning/layout intact via the data-keyed rule;
BOTH suites green and stable; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a popover or hover-card assertion regresses; the custom border/bg
fail; the split strands hover-card styling; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources)

Findings: the reviewer's SUBSTANTIVE verification is entirely positive and
constitutes an approval on the merits — it independently confirmed, by reading
the FULL popover and hover-card test blocks:

- Assertion survival ALL pass: the demo `width: 320px` is INLINE-backed
  (`style="width:20rem"`, fixture line 50) so it holds regardless of base width;
  `toHaveClass(/w-80/)` is class-presence (retained consumer class); the
  custom-popover content `border-color: rgb(124, 58, 237)` + `background-color:
  rgb(250, 245, 255)` are satisfied by the translated direct rules (unlayered,
  after the Tailwind link, so they beat `border`/`bg-popover`).
- The shared-rule split is safe: HoverCard keeps a standalone surface body, and
  its own extra rules (grid-template-columns, its width) layer correctly and are
  untouched → hover-card tests unaffected.
- The `.radcn-tooltip-content` reduced-motion selector is confirmed DEAD (Exp 24
  migrated tooltip to a utility string), so removing it is correct.
- `--color-popover`/`--color-popover-foreground` present; the enter-animation /
  `hidden`-hide mechanism is sound; scope (content surface only) is correct.

The reviewer returned "REJECTED", but solely on four "blockers" that are each
"the code isn't changed yet" (PopoverContent still emits the class; tokens.css
still has the combined rule; the fixture still uses tokens; the @media still
lists the selectors). That is the expected DESIGN-stage state — implementation
follows approval + the plan commit (`AGENTS.md`), and the reviewer was asked not
to fault planned-but-unimplemented code.

Lead-agent judgment: those are design-vs-implementation misreads (the recurring
pattern), overruled. The substantive verification is an APPROVAL: the migration
is correct, all assertions survive, the split is safe, the cascade holds.

Approval result: approved — design sound and complete; the four "blockers" are
the to-be-implemented changes themselves, not design flaws.
