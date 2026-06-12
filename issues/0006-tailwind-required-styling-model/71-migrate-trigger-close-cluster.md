# Experiment 71: Migrate the trigger/close cluster + drawer surfaces to Tailwind

## Description

The Button-coupled trigger/close cluster + the remaining Drawer surfaces — all
PURELY component-emitted (verified: zero raw `class="radcn-…trigger/close"` sites in
fixtures/docs; the earlier raw counts were substring false-matches) with NO computed
(`toHaveCSS`) assertions. So this is a straight in-component utility migration (markers
kept), like the primary-surface experiments. Each surface migrates to its exact rule.

### Const mapping (per component; marker kept)

Shared "primary trigger" structure (dialog/drawer/dropdown/popover-close/alert-cancel):
`inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border
border-transparent rounded-md cursor-pointer py-2 px-4 font-medium text-[0.875rem]
leading-none [font-family:var(--radcn-font)] outline-none` + per-surface bg/fg:

- `dialog-trigger` (dialog.tsx): + `bg-[var(--radcn-dialog-trigger-bg,var(--radcn-primary))]
  text-[var(--radcn-dialog-trigger-fg,var(--radcn-primary-foreground))]`.
- `drawer-trigger` (drawer.tsx): + `bg-[var(--radcn-drawer-trigger-bg,var(--radcn-primary))]
  text-primary-foreground`.
- `dropdown-menu-trigger` (dropdown-menu.tsx): + `bg-[var(--radcn-menu-trigger-bg,var(--radcn-primary))]
  text-[var(--radcn-menu-trigger-fg,var(--radcn-primary-foreground))]`.
- `popover-close` (popover.tsx): + `bg-[var(--radcn-overlay-trigger-bg,var(--radcn-primary))]
  text-[var(--radcn-overlay-trigger-fg,var(--radcn-primary-foreground))]`.
- `alert-dialog-cancel` (alert-dialog.tsx): the shared structure ONLY (no bg/color —
  transparent/inherited, exactly the current rule).

Others:
- `select-trigger` (select.tsx): `inline-flex w-[var(--radcn-select-trigger-width,13rem)]
  min-h-[var(--radcn-control-height)] items-center justify-between gap-2 border
  border-[var(--radcn-select-border,var(--radcn-input))] rounded-md
  bg-[var(--radcn-select-trigger-bg,var(--radcn-background))]
  text-[var(--radcn-select-trigger-fg,var(--radcn-foreground))] cursor-pointer py-2 px-3
  text-[length:0.875rem] font-normal leading-none [font-family:var(--radcn-font)]
  outline-none` (`font:400 0.875rem/1`; padding `0.5rem 0.75rem`).
- `drawer-close` (drawer.tsx): the shared structure but `border-[var(--radcn-border)]`
  (visible) + `bg-[var(--radcn-drawer-action-bg,var(--radcn-background))] text-foreground`.
- `alert-dialog-action` (alert-dialog.tsx): `bg-[var(--radcn-modal-action-bg,var(--radcn-primary))]
  text-[var(--radcn-modal-action-fg,var(--radcn-primary-foreground))]` (bg/color only —
  exactly the current rule; structure is the consumer's, unchanged).
- `drawer-content` (drawer.tsx): `fixed z-[var(--radcn-drawer-z,50)] flex flex-col border
  border-[var(--radcn-drawer-border,var(--radcn-border))]
  bg-[var(--radcn-drawer-bg,var(--radcn-background))]
  text-[var(--radcn-drawer-fg,var(--radcn-foreground))]
  shadow-[0_24px_64px_rgb(0_0_0_/_0.24)] [font-family:var(--radcn-font)]
  [touch-action:none] [will-change:transform]` (keeps the `radcn-drawer-content--{direction}`
  marker — the enhancer drives direction positioning via inline transform).
- `drawer-handle` (drawer.tsx): `w-[var(--radcn-drawer-handle-width,6.25rem)]
  h-[var(--radcn-drawer-handle-height,0.5rem)] flex-none self-center rounded-[999px]
  bg-[var(--radcn-drawer-handle-bg,var(--radcn-muted))] [margin-block:0.75rem_0.25rem]`.

## Why both suites stay green

No `toHaveCSS` on any of these surfaces; the markers stay (locators/`data-*` hooks
resolve); the utilities reproduce each rule exactly. The drawer enhancer's inline
direction transforms are unaffected.

## Changes

- `select.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `popover.tsx`,
  `alert-dialog.tsx`: emit the utility consts on each trigger/close/drawer surface,
  keeping the markers + data attributes.
- `tokens.css`: remove the 10 rules (`.radcn-select-trigger`, `.radcn-dialog-trigger`,
  `.radcn-drawer-trigger`, `.radcn-dropdown-menu-trigger`, `.radcn-popover-close`,
  `.radcn-alert-dialog-action`, `.radcn-alert-dialog-cancel`, `.radcn-drawer-close`,
  `.radcn-drawer-content`, `.radcn-drawer-handle`); KEEP the button-group trigger
  cascades (Exp 63, reference `.radcn-select-trigger`/`-dropdown-menu-trigger`).
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the trigger/close + drawer-content/handle utilities
   compile (`[touch-action:none]`, `[will-change:transform]`, `[margin-block:…]`,
   `shadow-[0_24px_64px_…]`); no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 10 rules removed; the button-group trigger cascades kept.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. the dialog/drawer/sheet/menu/select/popover/
   alert-dialog specs (triggers open overlays, closes dismiss, drawer renders).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: the triggers/closes + drawer surfaces render from utilities; structure/
behavior hold; BOTH suites green; byte-identical. Clears 10 of the remaining ~11 rules.

Fail criteria: a trigger/overlay spec regresses; a utility doesn't compile; divergence.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED (one verify-at-gate note). All 10 surface mappings reproduce their
CSS rules exactly (the shared trigger structure + per-surface bg/fg; select-trigger's
justify-between/width/border-color/px-3/font-normal; drawer-close's visible border;
alert-action bg/color-only; alert-cancel structure-only; drawer-content fixed/flex-col/
shadow/touch-action/will-change; drawer-handle w/h vars/margin-block). CRUX 2 — all 10
are component-emitted only (zero raw sites) → no consumer edits. CRUX 3 — NO `toHaveCSS`
on any; overlay specs locate by `data-radcn-*`/role; the `radcn-alert-dialog-trigger`
toHaveClass is NOT in this set. CRUX 4 — the button-group `> .radcn-select-trigger` /
`> .radcn-dropdown-menu-trigger` cascades are KEPT (markers retained). CRUX 5 — no
`drawer-content--{direction}` rule (positioning is inline via the enhancer); marker
kept. The one note: the select-trigger has `text-[var(--…-fg,…)]` (color) +
`text-[length:0.875rem]` (font-size) — distinct properties via the `length:` hint
(proven Exp-42); the build gate confirms.

Approval result: approved — exact mappings, component-only (no raw sites), no computed
assertions, button-group cascades + drawer direction marker kept.
