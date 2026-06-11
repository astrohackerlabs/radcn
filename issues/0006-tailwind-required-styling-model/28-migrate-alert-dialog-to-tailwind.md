# Experiment 28: Migrate AlertDialog overlay + content surface to Tailwind utilities

## Description

The second MODAL overlay, applying the Experiment 27 (Dialog) pattern with two
extras: the overlay rule is SHARED with Sheet (split it), and the content has a
RadCN-only `size` variant (`default`/`sm`).

Scope: the OVERLAY backdrop + the CONTENT surface (box + centering + animation).
The content WIDTH + `size` variant + the media/action/header/footer/title/
description sub-parts stay bespoke (the size variant is a RadCN extension; the
sub-parts are layout — a follow-up, like Dialog's). The Button-coupled trigger
is untouched.

shadcn v4 modal utilities (ENTER-only; exit/`duration` omitted — JS `hidden`
hide):

- AlertDialogOverlay: `fixed inset-0 z-50 bg-black/50 animate-in fade-in-0`.
- AlertDialogContent (surface + centering, NO width — width stays bespoke for
  the size variant): `fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%]
  translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg
  outline-none animate-in fade-in-0 zoom-in-95`.

Shared-overlay split: the combined `.radcn-alert-dialog-overlay,
.radcn-sheet-overlay` rule → `.radcn-sheet-overlay` keeps a STANDALONE bespoke
copy (Sheet migrates later); `.radcn-alert-dialog-overlay` removed (→ utilities).

Size variant (kept, data-attribute-keyed): the content emits `data-size`
(retained, asserted) but drops the `radcn-alert-dialog-content--${size}` class.
The width + size + footer-sm rules move to data-keyed bespoke:

- `[data-radcn-alert-dialog-content] { width: min(calc(100vw - 2rem),
  var(--radcn-alert-dialog-width, 32rem)); }`
- `[data-radcn-alert-dialog-content][data-size="sm"] {
  --radcn-alert-dialog-width: 24rem; }`
- repoint `.radcn-alert-dialog-content--sm .radcn-alert-dialog-footer` →
  `[data-radcn-alert-dialog-content][data-size="sm"] .radcn-alert-dialog-footer`.

Shared keyframes KEPT (`radcn-dialog-fade-in`/`radcn-dialog-zoom-in`; Sheet/
Drawer still use them); remove `.radcn-alert-dialog-overlay`/
`.radcn-alert-dialog-content` from the `@media (prefers-reduced-motion)` rule
(Sheet remains).

Custom-token fixture: `.radcn-fixture-custom-alert-dialog` (on the portal —
shared ancestor) sets `--radcn-modal-overlay-bg`, `--radcn-alert-dialog-border`,
`--radcn-alert-dialog-bg`, `--radcn-alert-dialog-media-bg`,
`--radcn-modal-action-bg`. `modal-variants.spec.ts:148-150` asserts the content
`border-color: rgb(153, 27, 27)` (#991b1b) AND the overlay `background-color:
rgba(127, 29, 29, 0.35)`. Translate to DESCENDANT direct rules (keeping the
media/action tokens for the un-migrated sub-parts):

- `.radcn-fixture-custom-alert-dialog [data-radcn-alert-dialog-content] {
  border-color: #991b1b; background-color: #fef2f2; }`
- `.radcn-fixture-custom-alert-dialog [data-radcn-alert-dialog-overlay] {
  background-color: rgb(127 29 29 / 0.35); }`
- keep `--radcn-alert-dialog-media-bg: #fee2e2; --radcn-modal-action-bg: #991b1b;`
  (the un-migrated media + action read them).

## Why both suites stay green

- The custom content `border-color` (#991b1b) and overlay `background-color`
  (rgba(127,29,29,0.35)) hold via the translated descendant direct rules
  (unlayered, after the Tailwind link, beating `border`/`bg-background` and
  `bg-black/50`).
- `data-size='sm'` (asserted) is retained on the content; the size width +
  footer-sm layout hold via the data-keyed rules.
- Visibility (`hidden`), `data-state`, the action/cancel buttons, media, and the
  demo composition are driven by the JS + retained attributes + the kept
  sub-part rules.
- Sheet is unaffected (standalone overlay copy); the shared keyframes are kept.
- The enter animation runs via `animate-in` on `hidden` removal (Exp 24
  mechanism).

## Changes

- `radcn/packages/radcn/src/components/alert-dialog.tsx`: `AlertDialogOverlay`
  emits the shadcn overlay utilities (no `radcn-alert-dialog-overlay` class);
  `AlertDialogContent` emits the shadcn content-surface utilities and drops BOTH
  the `radcn-alert-dialog-content` and `radcn-alert-dialog-content--${size}`
  classes; keep `data-size` and ALL other `data-radcn-alert-dialog*`/`data-state`/
  `hidden`. (Trigger/action/cancel/media/header/footer/title/description
  unchanged.)
- `radcn/packages/radcn/src/styles/tokens.css`:
  - split the combined overlay rule (`.radcn-sheet-overlay` standalone; remove
    `.radcn-alert-dialog-overlay`);
  - replace the `.radcn-alert-dialog-content` base rule with the data-keyed
    width rule (centering/box/animation now on the component); repoint the
    `--sm` width + footer rules to `[data-size="sm"]`;
  - remove `.radcn-alert-dialog-overlay`/`.radcn-alert-dialog-content` from the
    `@media (prefers-reduced-motion)` rule;
  - translate `.radcn-fixture-custom-alert-dialog` to the descendant content +
    overlay rules (keeping media/action tokens).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `alert-dialog.tsx`, `tokens.css`, `index.ts`, this
experiment file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS contains the alert-dialog utilities
   (`bg-background`, `bg-black/50`, `translate-x-[-50%]`, `animate-in`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-alert-dialog-overlay`/
   `.radcn-alert-dialog-content` base CLASS rule remains; `.radcn-sheet-overlay`
   standalone; the size rules `[data-size="sm"]`-keyed; the keyframes kept; the
   `@media` rule no longer lists alert-dialog; `.radcn-fixture-custom-alert-dialog`
   has the descendant content + overlay rules.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `modal-variants.spec.ts`
   alert-dialog tests (open/close, `data-size='sm'`, the custom-token content
   border `rgb(153,27,27)` + overlay bg `rgba(127,29,29,0.35)`) AND the sheet
   tests (unaffected by the split + shared keyframes).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: AlertDialog overlay + content render from Tailwind utilities (no
`radcn-alert-dialog-overlay`/`-content`/`--sm` class); the custom content/overlay
colors hold; the size variant (`data-size`/width/footer-sm) intact; Sheet
unaffected; BOTH suites green and stable; `tokens.css`/`index.ts` byte-identical.

Fail criteria: an alert-dialog or sheet assertion regresses; the size variant
breaks; the custom colors fail; a shared keyframe broken; `tokens.css`/`index.ts`
diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources)

Findings: the reviewer's SUBSTANTIVE verification confirmed the design mirrors
the proven Dialog (Exp 27) pattern: the combined overlay split (sheet
standalone) is sound and sheet tests don't depend on the alert-dialog overlay
rule; the content base rule → utilities + the data-keyed width rule; the size
variant repointed to `[data-size="sm"]` (only `data-size` is asserted); the
shared keyframes kept; the `@media` cleanup leaves sheet; the contract resolves.

It raised ONE genuinely-worth-checking concern (the rest were the recurring
design-vs-implementation misread — "the component still emits the old classes",
which is the expected pre-implementation state): whether
`.radcn-fixture-custom-alert-dialog` is on the content (per
`content.toHaveClass(...)` at modal-variants.spec.ts:148) or the portal (needed
for the overlay descendant rule, since the overlay is the content's SIBLING).

Resolution (verified against the fixture): the class is applied to BOTH the
`AlertDialogPortal` (line 49) AND the `AlertDialogContent` (line 51) — exactly
as Dialog (Exp 27). So the portal-borne class makes BOTH descendant rules
(`[data-…-content]`, `[data-…-overlay]`) match, and the content-borne class
satisfies the `toHaveClass` assertion. The design's descendant translation is
correct and identical to the approved+passed Dialog approach; no change needed.

Lead-agent judgment: the substantive verification is an APPROVAL; the one real
concern resolves (custom class on portal + content, mirroring Dialog); the
component/tokens "blockers" are the to-be-implemented changes.

Approval result: approved — modal pattern correctly applied; the shared-overlay
split, size-variant data-keying, and custom-token descendant translation are
sound (Dialog-proven).
