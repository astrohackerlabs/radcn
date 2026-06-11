# Experiment 30: Migrate Drawer overlay to Tailwind + retire the dead modal keyframes

## Description

Drawer is the modal cluster's outlier: its CONTENT is a dependency-free
drag-to-dismiss system (the direction variants are `data-direction`-keyed but
on the `.radcn-drawer-content` class; the content `transform` is driven by the
live `--radcn-drawer-drag-offset` the JS sets during a drag; `touch-action:
none`; `will-change: transform`; four per-direction keyframes
`radcn-drawer-{bottom,top,right,left}-in`; a drag handle). shadcn's Drawer wraps
the `vaul` library, which drives that drag/positioning in JS — there is NO
shadcn UTILITY analog for RadCN's drag system. So the Drawer CONTENT is a
RadCN-system component kept bespoke (like the positioned-overlay and modal-JS
systems), with its surface staying token-driven (the asserted content
`border-top-color` and `handle` background read `--radcn-drawer-border` /
`--radcn-drawer-handle-bg`, which the custom fixture sets — kept).

What IS cleanly migratable is the OVERLAY backdrop (the standard modal pattern).
This experiment migrates the Drawer overlay to utilities and — because the
drawer overlay is the LAST user of the shared `radcn-dialog-fade-in` /
`radcn-dialog-zoom-in` keyframes (Dialog/AlertDialog/Sheet all migrated off
them) — retires those now-dead keyframes.

Scope: the DrawerOverlay ONLY. The DrawerContent (and all its
direction/drag/border/handle rules) is unchanged and documented as the kept
RadCN drag system.

Mapping:

- DrawerOverlay: `fixed inset-0 z-50 bg-black/50 animate-in fade-in-0` (the
  `--radcn-drawer-overlay-bg` default `0.45` → shadcn's `bg-black/50`; the
  overlay bg is NOT asserted — the custom-drawer asserts only the content
  border + handle, both kept token-driven — so the unused custom overlay-bg
  token is acceptable).

tokens.css:

- remove the `.radcn-drawer-overlay` rule (→ utilities);
- in the Drawer `@media (prefers-reduced-motion)` block, remove
  `.radcn-drawer-overlay` (now the `animate-in` utility, shadcn-faithfully
  unguarded) and KEEP `.radcn-drawer-content` (it retains its bespoke
  per-direction keyframes);
- remove the now-unused `@keyframes radcn-dialog-fade-in` and
  `@keyframes radcn-dialog-zoom-in` (verify no remaining user: Dialog/
  AlertDialog/Sheet migrated off them, and this removes the drawer overlay's
  use — the only remaining one). The drawer's OWN `radcn-drawer-*-in` keyframes
  stay (the content uses them).
- `.radcn-drawer-content` and ALL its direction/drag/border/handle rules are
  UNCHANGED.

The DrawerContent component and `.radcn-fixture-custom-drawer` are unchanged
(the content border + handle stay token-driven; the asserted
`border-top-color`/handle-bg keep passing).

## Why both suites stay green

- The overlay is purely a backdrop (visibility via `hidden`); no test asserts
  its background or animation. `data-radcn-drawer-overlay`/`data-state`/`hidden`
  are retained.
- The Drawer content (drag/direction/border/handle) is untouched, so its
  assertions (`data-direction`, the bounding-box side checks, the
  `border-top-color: rgb(15,118,110)` and handle `background-color:
  rgb(15,118,110)` custom-token assertions, the drag-threshold behavior) all
  hold exactly as before.
- Removing `radcn-dialog-fade-in`/`zoom-in` is safe ONLY if unused — verified at
  implementation time (grep: no `animation: radcn-dialog-fade-in`/`zoom-in`
  references remain after the drawer overlay migrates). If any reference
  remains, the keyframe is kept.
- `bg-black/50`/`animate-in`/`fade-in-0` via core Tailwind + Exp 23.

## Changes

- `radcn/packages/radcn/src/components/drawer.tsx`: `DrawerOverlay` emits the
  shadcn overlay utilities (no `radcn-drawer-overlay` class); keep
  `data-radcn-drawer-overlay`/`data-state`/`hidden`. (DrawerContent + all other
  parts unchanged.)
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-drawer-overlay`
  rule; remove `.radcn-drawer-overlay` from the Drawer `@media` block (keep
  `.radcn-drawer-content`); remove the now-dead `@keyframes radcn-dialog-fade-in`
  and `radcn-dialog-zoom-in` (after verifying unused). Everything else
  (drawer content/handle/direction rules, the `radcn-drawer-*-in` keyframes)
  unchanged.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `drawer.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the overlay utilities
   (`bg-black/50`, `animate-in`, `fade-in-0`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-drawer-overlay` rule
   remains; no `radcn-dialog-fade-in`/`radcn-dialog-zoom-in` keyframe OR
   reference remains (fully retired); the Drawer `@media` block keeps
   `.radcn-drawer-content`; the `radcn-drawer-*-in` keyframes + the content/
   handle/direction rules are unchanged.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `drawer.spec.ts` (open/close,
   the 4 directions, the custom-token content `border-top-color`
   `rgb(15,118,110)` + handle `background-color` `rgb(15,118,110)`, the drag
   threshold, internal scroll) AND `modal-variants.spec.ts`/`dialog.spec.ts`
   (the retired keyframes must not break the other migrated modals — they use
   `animate-in` now, not the bespoke keyframes).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: the Drawer overlay renders from Tailwind utilities (no
`radcn-drawer-overlay` class); the drawer content (drag system) is unchanged and
its assertions hold; the dead `radcn-dialog-*` keyframes are removed with no
remaining user; BOTH suites green and stable; `tokens.css`/`index.ts`
byte-identical.

Fail criteria: a drawer/dialog/alert-dialog/sheet assertion regresses; a removed
keyframe still had a user; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources)

Findings: APPROVED, no Blocker/Major; two Minor.

The reviewer independently verified: the DrawerOverlay migration is isolated and
non-breaking (data attributes retained, no cross-component class dependency);
the DrawerContent drag system's continued use of the `.radcn-drawer-content`
class is JUSTIFIED (load-bearing for the `[data-direction]` rules + the
`--radcn-drawer-drag-offset` JS-driven transform + `touch-action`/`will-change`
+ the 4 `radcn-drawer-*-in` keyframes; no shadcn-utility analog — shadcn uses
the vaul library), so keeping the content bespoke is a legitimate RadCN-system
exception; CRUCIALLY, it grepped every `animation: radcn-dialog-fade-in`/
`radcn-dialog-zoom-in` reference and confirmed the ONLY remaining one is the
drawer overlay (Dialog/AlertDialog/Sheet migrated off them) — so retiring those
keyframes after the drawer overlay migrates is safe; the `@media` handling
(drop overlay, keep content) and the unasserted overlay-bg drop are correct; it
read the full `drawer.spec.ts` (content border-top-color + handle bg + direction
bounding-box + drag threshold + scroll — none on the overlay/animation).

Minors (folded into implementation):

- A stale comment from Exp 27 in tokens.css (the Dialog migration block) says the
  `radcn-dialog-*` keyframes are "KEPT (AlertDialog/Sheet/Drawer use them)" — now
  inaccurate; it is removed/updated when the keyframes are retired.
- The overlay default opacity shifts `0.45` → `bg-black/50` (0.5) toward shadcn
  parity (unasserted) — noted in the Conclusion.

Approval result: approved — overlay-only scope correct; the dead-keyframe
retirement is verified safe; the content drag system is a justified kept
RadCN-system exception.
