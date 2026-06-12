# Experiment 72: Migrate the overlay trigger/close cluster (cohesive)

## Description

The interconnected overlay trigger/close family (the Exp-71 re-scope), migrated as a
UNIT. All component-emitted; the combined-selector rules are SPLIT (each component emits
its own utilities). A full rule-ref dump (recorded in Exp 71) gives the complete map:
shared structure rules, per-surface bg/fg, and combined `:focus-visible` rules. To make
the combined `:focus-visible` removals clean, dialog-close + sheet-close are INCLUDED
(their `:focus-visible` co-tenants the trigger rules).

### Shared base + border-var (resolves the base↔visible-border conflict, Exp-41)

`overlayTriggerBase` (structure + border-color var + focus-visible; NO bg/color):
`inline-flex min-h-[var(--radcn-control-height)] items-center justify-center border
border-[var(--radcn-ovl-bc,transparent)] rounded-md cursor-pointer py-2 px-4 font-medium
text-[0.875rem] leading-none [font-family:var(--radcn-font)] outline-none
focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`

Per-surface (append bg/fg; visible-border surfaces SET `--radcn-ovl-bc`):
- dialog-trigger: + `bg-[var(--radcn-dialog-trigger-bg,var(--radcn-primary))] text-[var(--radcn-dialog-trigger-fg,var(--radcn-primary-foreground))]`
- drawer-trigger: + `bg-[var(--radcn-drawer-trigger-bg,var(--radcn-primary))] text-primary-foreground`
- dropdown-menu-trigger: + `bg-[var(--radcn-menu-trigger-bg,var(--radcn-primary))] text-[var(--radcn-menu-trigger-fg,var(--radcn-primary-foreground))]`
- popover/tooltip/hover-card-trigger: + `bg-[var(--radcn-overlay-trigger-bg,var(--radcn-primary))] text-[var(--radcn-overlay-trigger-fg,var(--radcn-primary-foreground))]`
- alert-dialog-trigger / sheet-trigger / alert-dialog-action: + `bg-[var(--radcn-modal-action-bg,var(--radcn-primary))] text-[var(--radcn-modal-action-fg,var(--radcn-primary-foreground))]`
- alert-dialog-cancel: + `[--radcn-ovl-bc:var(--radcn-alert-dialog-cancel-border,var(--radcn-border))] bg-background text-foreground`
- popover-close: + `[--radcn-ovl-bc:var(--radcn-popover-close-border,var(--radcn-border))] bg-[var(--radcn-popover-close-bg,var(--radcn-background))] text-[var(--radcn-popover-close-fg,var(--radcn-foreground))]`
- drawer-close: + `[--radcn-ovl-bc:var(--radcn-border)] bg-[var(--radcn-drawer-action-bg,var(--radcn-background))] text-foreground`

Divergent (not the shared base):
- context-menu-trigger: ONLY `focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]` (its sole rule is the combined focus-visible; no structure).
- dialog-close / sheet-close (base): `cursor-pointer focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`.
- dialog-close--icon / sheet-close--icon (the X button, marker kept): `absolute top-3
  right-3 inline-flex w-8 h-8 items-center justify-center border-0 rounded-md
  bg-transparent text-muted-foreground font-semibold text-base leading-none
  [font-family:var(--radcn-font)] hover:bg-secondary hover:text-foreground`.

### Kept bespoke
- `.radcn-drawer-content > .radcn-drawer-close { position:absolute; top/right; min-h:2rem;
  w:2rem; padding:0 }` — a parent>child position cascade (targets the kept drawer-close +
  drawer-content markers); reliably overrides (unlayered). Keep.

NOTE: select-trigger (its 5-rule state set incl. parent-state cascades) + the primitives
(toggle-icon, breadcrumb-trigger, menu-item variants, toggle-group--vertical) are NOT in
this experiment (separate follow-ups).

## tokens.css disposition

Remove (all selectors now component-emitted): the combined structure rule
(`.radcn-alert-dialog-trigger, .radcn-sheet-trigger, .radcn-alert-dialog-action,
.radcn-alert-dialog-cancel`), the combined bg rule (`…-trigger, …-sheet-trigger,
…-action`), the alert-cancel override, the combined overlay-trigger rule
(`.radcn-popover-trigger, .radcn-tooltip-trigger, .radcn-hover-card-trigger,
.radcn-popover-close`), the popover-close override, the standalone dialog/drawer/
dropdown-menu-trigger rules, drawer-close base, dialog-close/sheet-close base, the
`--icon` + `--icon:hover` rules, and ALL the combined `:focus-visible` rules (every
selector in them is now component-emitted). KEEP the `.radcn-drawer-content >
.radcn-drawer-close` position cascade + the button-group `> .radcn-select/dropdown`
cascades (untouched).

## Why both suites stay green

The cluster has near-zero computed assertions (overlay specs locate by `data-radcn-*`/
role + assert open/close behavior). Each surface's utilities reproduce its exact
effective CSS (structure + bg/fg + the border-var for visible borders + focus-visible);
markers + data attributes kept (the dialog/sheet `--icon` markers, the drawer-close
position cascade, the button-group trigger cascades). The var-set border avoids the
Exp-41 base-vs-variant conflict.

## Changes

- `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `context-menu.tsx`, `popover.tsx`,
  `tooltip.tsx`, `hover-card.tsx`, `alert-dialog.tsx`, `sheet.tsx`: emit the consts on
  each trigger/close/icon, keeping markers + data attributes.
- `tokens.css`: the disposition above. `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `border-[var(--radcn-ovl-bc,…)]` + the var-sets +
   focus-visible shadow + the `--icon` utilities compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the cluster rules removed; the kept cascades retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — dialog/drawer/sheet/menu/popover/tooltip/hover-card/
   alert-dialog specs (triggers open, closes dismiss, the X buttons, focus rings).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: the overlay trigger/close cluster renders from utilities; behavior +
structure hold; BOTH suites green; byte-identical. Clears the cluster (the bulk of the
remaining debt).

Fail criteria: an overlay spec regresses; a utility doesn't compile; a combined-rule
split leaves a surface unstyled; divergence. (If so — revert, like Exp 71, + record.)

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major (the listed "blockers" are gate-verification
checks, not design flaws). Verified all 5 cruxes: (1) the border-var resolves the
base↔visible-border conflict (base reads `--radcn-ovl-bc`; alert-cancel/popover-close/
drawer-close SET it; select-trigger correctly excluded); (2) all 13 base-using surfaces
reproduce their EXACT effective CSS — crucially popover-close uses its OWN
`--radcn-popover-close-*` tokens (the override that WINS over the shared overlay-trigger
bg), drawer-trigger fg is the literal `primary-foreground`, focus-visible folded into
base; (3) the divergent cases exact — context-menu-trigger is focus-visible-ONLY (no
structure rule), dialog/sheet close = `cursor-pointer`+focus-visible, the `--icon` =
absolute X (top-3/right-3, w-8/h-8, text-base/font-semibold, hover bg-secondary/fg);
(4) ALL 8 combined rules SPLIT with every one of the 18 selectors migrated in THIS batch
(structure A, bg B, overlay C, + 5 focus-visible rules — zero gaps, the key risk); (5)
the `.radcn-drawer-content > .radcn-drawer-close` position cascade + the button-group
trigger cascades KEPT; no `toHaveCSS` on the surfaces (markers + data-attrs drive the
specs; the icon `position:absolute` is reproduced by `absolute`). Verify-at-gate: the
15 surfaces all emit, the focus-visible/color-mix + border-var compile, the icon markers
+ drawer-content>close cascade retained.

Approval result: approved — the cohesive cluster migration with the border-var, the
complete combined-selector split (18/18 selectors), and the kept cascades is sound.
