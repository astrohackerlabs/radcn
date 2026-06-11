# Experiment 27: Migrate Dialog overlay + content surface to Tailwind utilities

## Description

The first MODAL overlay (the positioned-overlay pattern of Exp 24-26 applies,
adapted to a modal backdrop + centered content). Dialog is JS-driven
(`setupModal`): visibility via the `hidden` attribute (enter-only animation,
exit utilities omitted), overlay + content are siblings inside the portal.

Scope: the OVERLAY backdrop + the CONTENT surface (the modal box + centering).
The content sub-parts (header/footer/title/description/close, close--icon) are
layout helpers left bespoke (like the popover/hover-card sub-parts — a
follow-up); the Button-coupled trigger is untouched.

shadcn v4 `dialog.tsx` → utilities (ENTER-only; `duration-200`/exit omitted):

- DialogOverlay: `fixed inset-0 z-50 bg-black/50 animate-in fade-in-0`.
- DialogContent: `fixed top-[50%] left-[50%] z-50 grid w-full
  max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4
  rounded-lg border bg-background p-6 shadow-lg outline-none animate-in
  fade-in-0 zoom-in-95 sm:max-w-lg` (shadcn's `sm:max-w-lg` = 32rem ≈ RadCN's
  `--radcn-dialog-width` 32rem default; the demo's inline `style="width:…"`
  overrides; width is not asserted).

Shared keyframes KEPT: `@keyframes radcn-dialog-fade-in` /
`radcn-dialog-zoom-in` are also used by AlertDialog / Sheet / Drawer (lines
2362/2381/3019), so they remain; only Dialog's own `animation:
radcn-dialog-*` declarations (on the migrated overlay/content) are removed
(replaced by the `animate-in` utilities). Dialog's `.radcn-dialog-overlay` /
`.radcn-dialog-content` entries are removed from the `@media
(prefers-reduced-motion)` rule (the un-migrated modals remain).

Custom-token fixture (the key coupling): `.radcn-fixture-custom-dialog` is
applied to the `DialogPortal` (the shared ancestor of the overlay AND content),
setting `--radcn-dialog-overlay-bg`, `--radcn-dialog-border`, `--radcn-dialog-bg`,
`--radcn-dialog-trigger-bg`. `dialog.spec.ts:69-72` asserts the CONTENT
`border-color: rgb(15, 118, 110)` (#0f766e) + `background-color:
rgb(240, 253, 250)` (#f0fdfa) AND the OVERLAY `background-color: rgba(15, 118,
110, 0.35)`. After migration the content uses `border`/`bg-background` and the
overlay `bg-black/50`, which don't read those tokens — so translate to
DESCENDANT direct rules under the portal:

- `.radcn-fixture-custom-dialog [data-radcn-dialog-content] { border-color:
  #0f766e; background-color: #f0fdfa; }`
- `.radcn-fixture-custom-dialog [data-radcn-dialog-overlay] { background-color:
  rgb(15 118 110 / 0.35); }`
- keep `--radcn-dialog-trigger-bg: #0f766e;` (the un-migrated trigger reads it).

These unlayered descendant rules (after the Tailwind link) override the
content's `border`/`bg-background` and the overlay's `bg-black/50`, so all three
assertions hold.

## Why both suites stay green

- The custom content border/bg (#0f766e/#f0fdfa) and overlay bg
  (rgba(15,118,110,0.35)) are satisfied by the translated descendant direct
  rules.
- Visibility (`toBeVisible`/`toBeHidden` — `hidden` attribute), `data-state`,
  Escape-to-close, focus management, the close-button, and the demo composition
  (sub-parts retained) are driven by the JS + retained attributes + the kept
  sub-part rules.
- Modal centering: shadcn's `fixed top-[50%] left-[50%] translate-x/y-[-50%]`
  reproduces RadCN's `position:fixed; top/left:50%; transform:translate(-50%,
  -50%)`; the content stays above the overlay (it follows the overlay in DOM,
  both `z-50`).
- The enter animation runs via `animate-in` on `hidden` removal (Exp 24
  mechanism). No exit/animation assertion exists.
- `bg-background`/`border` resolve via the contract + the Exp 16 border base;
  animation utilities via Exp 23.

## Changes

- `radcn/packages/radcn/src/components/dialog.tsx`: `DialogOverlay` emits the
  shadcn overlay utilities (no `radcn-dialog-overlay` class); `DialogContent`
  emits the shadcn content utilities (no `radcn-dialog-content` class). Keep ALL
  `data-radcn-dialog*`, `data-state`, `hidden`, `role`/aria. (Trigger / close /
  header / footer / title / description / close--icon unchanged.)
- `radcn/packages/radcn/src/styles/tokens.css`:
  - remove the `.radcn-dialog-overlay` and `.radcn-dialog-content` base rules
    (migration comment, no literal selectors); KEEP the
    `@keyframes radcn-dialog-fade-in`/`radcn-dialog-zoom-in` (shared with
    AlertDialog/Sheet/Drawer);
  - remove `.radcn-dialog-overlay`/`.radcn-dialog-content` from the
    `@media (prefers-reduced-motion)` rule;
  - translate `.radcn-fixture-custom-dialog` to the descendant content + overlay
    direct rules (keeping `--radcn-dialog-trigger-bg`).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `dialog.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the dialog utilities
   (`bg-background`, `bg-black/50`, `max-w-[calc(100%-2rem)]`, `sm:max-w-lg`,
   `translate-x-[-50%]`, `animate-in`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-dialog-overlay`/
   `.radcn-dialog-content` base CLASS rule remains; the `radcn-dialog-*`
   keyframes remain; the `@media` rule no longer lists dialog overlay/content;
   `.radcn-fixture-custom-dialog` has the descendant content + overlay rules.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `dialog.spec.ts` (open/close
   visibility, `data-state`, Escape, default-open, the demo, AND the custom-token
   content border `rgb(15,118,110)` + bg `rgb(240,253,250)` + overlay bg
   `rgba(15,118,110,0.35)`).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Dialog overlay + content render from Tailwind utilities (no
`radcn-dialog-overlay`/`-content` class); the custom content/overlay colors hold
via the descendant rules; modal centering + open/close + focus intact; BOTH
suites green and stable; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a dialog assertion regresses; the modal mis-centers; the custom
content/overlay colors fail; a shared keyframe is broken for the other modals;
`tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Dialog's overlay + content surface are migrated; both suites are green and
stable. The first modal validates the modal-overlay pattern. Verification:

1. Both `styles:build` exit 0; the dialog utilities generate (`bg-background`,
   `bg-black/50`, `max-w-[calc(100%-2rem)]`, `sm:max-w-lg`, `translate-x-[-50%]`,
   `animate-in`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-dialog-overlay`/
   `.radcn-dialog-content` base CLASS rule remains; the `radcn-dialog-fade-in`/
   `radcn-dialog-zoom-in` keyframes remain (kept ×2, shared with the other
   modals); the `@media` rule no longer lists dialog; `.radcn-fixture-custom-dialog`
   has the two descendant content + overlay direct rules (+ the kept trigger
   token).
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `dialog.spec.ts` in isolation **6 passed**
   — incl. open/close visibility, `data-state`, Escape-to-close, default-open,
   the demo, AND the custom-token content `border-color: rgb(15, 118, 110)` +
   `background-color: rgb(240, 253, 250)` + overlay `background-color: rgba(15,
   118, 110, 0.35)`.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   three expected files changed.

No deviations from the approved design.

## Conclusion

Dialog is the first migrated MODAL overlay: its overlay backdrop and centered
content box render from shadcn v4 utilities (`bg-black/50`; `fixed`-centered
`grid` `rounded-lg border bg-background p-6 shadow-lg` + enter-animation). The
shared `radcn-dialog-*` keyframes were kept (AlertDialog/Sheet/Drawer still use
them); the custom-token override on the portal was translated to descendant
direct rules for the content (border/bg) and the sibling overlay (bg). The
header/footer/title/description/close sub-parts + Button-coupled trigger are
retained. Nineteen components are now migrated (… Tooltip, Popover, HoverCard,
Dialog — plus sub-parts). This establishes the MODAL pattern for AlertDialog,
Sheet, and Drawer.

Learnings (also copied to the issue README Learnings digest):

- The modal-overlay pattern: migrate the overlay backdrop (`fixed inset-0 z-50
  bg-black/50 animate-in fade-in-0`) + the centered content box (shadcn's
  `fixed top/left-[50%] translate-x/y-[-50%] grid … rounded-lg border
  bg-background p-6 shadow-lg` + enter-animation) to utilities; keep sub-parts +
  the shared modal keyframes; the JS `hidden`-hide means exit utilities are
  omitted.
- When a custom-token class sits on a shared ANCESTOR (the DialogPortal) and its
  tokens are read by sibling descendants (overlay + content), translate to
  DESCENDANT direct rules (`.custom [data-overlay]`, `.custom [data-content]`),
  one per affected descendant.
- Modal keyframes (`radcn-dialog-fade-in`/`zoom-in`) are SHARED across the modal
  cluster — keep them until the last modal migrates; only remove each modal's
  `animation:` declaration as it migrates.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources incl. vendored shadcn)

Findings: no Blocker, no Major; one Minor (a doc-wording nit — the demo width is
inline-asserted, outside this migration's scope). APPROVED, high confidence.

The reviewer verified, reading the FULL `dialog.spec.ts`: the design keeps all
data attributes (drops only the two classes) with trigger/close/sub-parts
untouched; the `@keyframes radcn-dialog-fade-in`/`radcn-dialog-zoom-in` are
SHARED (AlertDialog/Sheet at 2362/2381, Drawer at 3019) so keeping them is
correct (only Dialog's `animation:` declarations are removed); the `@media`
cleanup leaves the un-migrated modals. CRUX: it confirmed
`.radcn-fixture-custom-dialog` is on the PORTAL (the shared ancestor of overlay
+ content), so the descendant translation works — and walked the selector
matching (`.portal [data-…-content]` matches the content child) and the cascade
(unlayered descendant rules, after the Tailwind link, override the migrated
`border`/`bg-background` and `bg-black/50`), so the three asserted values
(content border `rgb(15,118,110)`, content bg `rgb(240,253,250)`, overlay bg
`rgba(15,118,110,0.35)`) all hold. It confirmed shadcn's centering utilities
reproduce RadCN's transform, the z-50/DOM-order stacking is correct,
`--color-background`/`--color-border` resolve, and no other component depends on
the two dialog classes. Verdict: APPROVED.

Approval result: approved with no blockers — the first modal migration is sound;
the shared keyframes are preserved and the custom-token sibling coupling is
handled via descendant rules.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed dialog.tsx emits the shadcn overlay + content utilities
(no `radcn-dialog-overlay`/`-content` class) with all data attributes kept and
trigger/close/sub-parts unchanged; tokens.css has ZERO dialog overlay/content
class rules, BOTH `radcn-dialog-fade-in`/`radcn-dialog-zoom-in` keyframes kept
(verified still used by AlertDialog/Sheet/Drawer), the `@media` rule without
dialog (alert-dialog/sheet remain), and `.radcn-fixture-custom-dialog` with the
kept trigger token + the two descendant content/overlay rules; byte-identical
`index.ts`. It re-ran both `styles:build`, the three typechecks, the docs suite
(2/2 = 11), the fixture suite (2/2 = 1191), `dialog.spec.ts` in isolation (6 —
confirming the custom content border/bg + overlay bg), AND
`modal-variants.spec.ts` (8 — AlertDialog/Sheet, proving the shared keyframes
still work). It judged the modal migration faithful, the custom content+overlay
winning via the descendant rules, the shared keyframes intact, and the
centering/open/close intact. Verdict: APPROVED.

Approval result: approved with no blockers — the modal-overlay pattern is
established for AlertDialog/Sheet/Drawer.
