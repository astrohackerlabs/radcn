# Experiment 52: Migrate Menubar + NavigationMenu together to Tailwind utilities

## Description

Menubar and NavigationMenu SHARE the trigger/font/disabled/`[hidden]` rules
(combined selectors `.radcn-menubar, .radcn-navigation-menu`;
`.radcn-menubar-trigger, .radcn-navigation-menu-trigger, .radcn-navigation-menu-link`;
the `[data-state="open"]`/`[aria-current="page"]` active rule; the
`[data-disabled]` rule; the `[hidden]` group). Per the Exp-49/51 sibling pattern,
migrate BOTH together so the shared rules drop. Menubar emits the family
`radcn-menu-*` helpers (KEPT bespoke until the family-helper retirement). Carve-outs:

- KEEP bespoke: the family `radcn-menu-*` helpers (Menubar still emits
  `radcn-menu-item--inset`/`--${variant}`/`radcn-menu-item-indicator`/`data-radcn-menu-item`).
  Keep `.radcn-fixture-navigation-panel` + both custom fixtures + `@keyframes
  radcn-select-in`.
- DELETE (not split) the `.radcn-menubar-shortcut, .radcn-menu-sub-caret` combined
  rule (tokens.css ~2572): the menubar-shortcut selector migrates to a utility, and
  `.radcn-menu-sub-caret` is ALREADY fully covered by the STANDALONE
  `.radcn-menu-sub-caret { margin-left:auto; color; font }` rule kept from Exp 51
  (its body is a superset of the combined rule's `color`+`font`). So deleting the
  combined rule leaves sub-caret correctly styled by the standalone rule — no split,
  no duplication.
- The `.radcn-navigation-menu[data-orientation="vertical"] .radcn-navigation-menu-list`
  parent→child cascade is REPLACED by CSS-var PROPAGATION (design-review fix — a
  bespoke cascade overriding the migrated list's `display`/`align-items` is the
  unreliable Exp-47 case). The nav root SETS
  `--radcn-nav-list-display`/`-align`/`-justify` via `data-[orientation=vertical]:[--…]`;
  the list READS them (`[display:var(--radcn-nav-list-display,flex)]`,
  `[align-items:var(--radcn-nav-list-align,center)]`,
  `[justify-self:var(--radcn-nav-list-justify,auto)]`). Horizontal = the fallbacks
  (flex / center / auto); vertical = inline-grid / stretch / start.
- MARKER: the NavigationMenu LINK keeps the `radcn-navigation-menu-link` class
  (style-less) — `menubar-navigation.spec.ts:215` locates by it.

### Shared base (each emits its own copy)

- trigger / nav-trigger / nav-link base: `inline-flex min-h-8 items-center
  justify-center border-0 rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent
  text-inherit cursor-pointer px-3 py-1.5 no-underline font-medium text-[0.875rem]
  leading-none [font-family:var(--radcn-font)]`.
- active: menubar-trigger + nav-trigger add `data-[state=open]:bg-[var(--radcn-menubar-highlight-bg,var(--radcn-secondary))]
  data-[state=open]:text-[var(--radcn-menubar-highlight-fg,var(--radcn-foreground))]`;
  nav-link adds the same via `aria-[current=page]:` instead of `data-[state=open]:`.
- disabled (trigger/item/checkbox/radio/link): `data-[disabled=true]:opacity-50
  data-[disabled=true]:pointer-events-none`.
- `[hidden]` (portal/content/sub-content/nav-content/indicator/viewport):
  `[&[hidden]]:hidden`.

### Menubar-specific

- root: `[font-family:var(--radcn-font)] inline-flex gap-0.5 items-center border
  border-[var(--radcn-menubar-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-menubar-bg,var(--radcn-background))]
  text-[var(--radcn-menubar-fg,var(--radcn-foreground))] p-1
  data-[orientation=vertical]:inline-grid data-[orientation=vertical]:items-stretch`.
- content + sub-content: `z-[var(--radcn-menubar-z,50)] grid min-w-48
  max-h-[min(var(--radcn-menubar-content-max-height,18rem),var(--radcn-menu-available-height,18rem))]
  overflow-y-auto gap-0.5 border border-[var(--radcn-menubar-border,var(--radcn-border))]
  rounded-md bg-[var(--radcn-menubar-content-bg,var(--radcn-popover))]
  text-[var(--radcn-menubar-content-fg,var(--radcn-popover-foreground))] p-1.5
  shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]
  [transform-origin:var(--radcn-menu-transform-origin,top_left)]
  animate-[radcn-select-in_120ms_ease-out] [&[hidden]]:hidden`.
- item/checkbox/radio/sub-trigger: `grid min-h-8 grid-cols-[1rem_minmax(0,1fr)_auto]
  items-center gap-2 border-0 rounded-[calc(var(--radcn-radius)-0.125rem)]
  bg-transparent text-inherit cursor-default px-2 py-1.5 text-left font-normal
  text-[0.875rem] leading-[1.25] [font-family:var(--radcn-font)]
  data-[highlighted=true]:bg-[var(--radcn-menubar-highlight-bg,var(--radcn-secondary))]
  data-[highlighted=true]:text-[var(--radcn-menubar-highlight-fg,var(--radcn-foreground))]
  data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none`.
- label: `px-7 pt-1.5 pb-1 text-muted-foreground font-semibold text-[0.75rem]
  leading-[1.2] [font-family:var(--radcn-font)]`.
- separator: `h-px my-1 mx-1.5 bg-border`.
- shortcut (SPLIT): `text-muted-foreground font-medium text-[0.75rem] leading-none
  [font-family:var(--radcn-font)]`.

### NavigationMenu-specific

- root: `[font-family:var(--radcn-font)] relative grid
  w-[min(100%,var(--radcn-navigation-menu-width,42rem))] gap-2
  text-[var(--radcn-navigation-menu-fg,var(--radcn-foreground))]
  data-[orientation=vertical]:[--radcn-nav-list-display:inline-grid]
  data-[orientation=vertical]:[--radcn-nav-list-align:stretch]
  data-[orientation=vertical]:[--radcn-nav-list-justify:start]` (the list-orientation
  propagation var-sets).
- list: `[display:var(--radcn-nav-list-display,flex)] flex-wrap gap-1 list-none m-0
  p-1 border border-[var(--radcn-navigation-menu-border,var(--radcn-border))]
  rounded-md bg-[var(--radcn-navigation-menu-bg,var(--radcn-background))]
  [align-items:var(--radcn-nav-list-align,center)]
  [justify-self:var(--radcn-nav-list-justify,auto)]` (display/align/justify via the
  inherited vars; `flex-wrap`/`gap` are harmless in the vertical inline-grid mode).
- item: `relative`.
- content: `grid min-w-72 gap-2 border
  border-[var(--radcn-navigation-menu-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-navigation-menu-panel-bg,var(--radcn-popover))]
  text-[var(--radcn-navigation-menu-panel-fg,var(--radcn-popover-foreground))] p-4
  shadow-[0_18px_48px_rgb(0_0_0_/_0.14)] [&[hidden]]:hidden`.
- viewport: `w-[var(--radcn-navigation-menu-viewport-width,18rem)]
  h-[var(--radcn-navigation-menu-viewport-height,8rem)] rounded-md pointer-events-none
  [&[hidden]]:hidden`.
- indicator: `absolute top-[2.6rem] left-[var(--radcn-navigation-menu-indicator-left,1rem)]
  w-3 h-3 [transform:translateX(-50%)_rotate(45deg)]
  bg-[var(--radcn-navigation-menu-panel-bg,var(--radcn-popover))] border-l border-t
  border-[var(--radcn-navigation-menu-border,var(--radcn-border))] [&[hidden]]:hidden`.

## Why both suites stay green

- Menubar custom border `rgb(15,118,110)` (#0f766e, menubar-navigation:167) holds via
  the root `border-[var(--radcn-menubar-border,…)]` reading the fixture token.
- NavigationMenu custom: root `toHaveClass(/radcn-fixture-custom-navigation-menu/)`
  (:295) holds (class on root); the LIST border `rgb(15,118,110)` (:296) holds via
  `border-[var(--radcn-navigation-menu-border,…)]`. The link keeps the
  `radcn-navigation-menu-link` MARKER (:215).
- Menubar items still emit the family `radcn-menu-*` helpers (kept bespoke); the
  vertical-list layout via the kept cascade; the `radcn-select-in` animation kept.

## Changes

- `radcn/packages/radcn/src/components/menubar.tsx` +
  `radcn/packages/radcn/src/components/navigation-menu.tsx`: emit utility-const
  strings (shared trigger base exported from one, reused by the other); the nav-link
  keeps its marker class; keep the family helper classes + all data attributes.
  ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated menubar/navmenu
  rules INCLUDING the whole `.radcn-menubar-shortcut, .radcn-menu-sub-caret` rule
  (sub-caret stays covered by the Exp-51 standalone rule) AND the nav vertical-list
  cascade (replaced by the propagation var-sets in the component); KEEP the family
  helpers, both custom fixtures, `.radcn-fixture-navigation-panel`, `@keyframes
  radcn-select-in`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the shared/own utilities + `[&[hidden]]:hidden`,
   `data-[orientation=vertical]:inline-grid`, `[transform:translateX(-50%)_rotate(45deg)]`,
   `animate-[radcn-select-in_120ms_ease-out]` compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no migrated menubar/navmenu rule remains; the family
   helpers + nav vertical-list cascade + fixtures + keyframes retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `menubar-navigation.spec.ts` (menubar
   custom border, open/close, items/highlight/disabled, checkbox/radio indicators,
   separators; navmenu custom class + list border, the link marker, triggers,
   content panels, orientation, keyboard nav). DropdownMenu/ContextMenu (the family
   helpers) stay green.
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Menubar + NavigationMenu render from Tailwind utilities (family
helpers + nav vertical-list cascade kept bespoke; nav-link marker kept); the custom
borders + structure + orientation hold; BOTH suites green; byte-identical.

Fail criteria: a menubar-navigation assertion regresses (custom borders, link
marker, highlight, orientation); the content positioning/animation drifts;
`tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README + Remaining map, this
experiment file, and read access to the source + fixtures + tests).

Findings: the reviewer APPROVED the carve-outs (family helpers kept — dropdown/
context/menubar still emit them), the marker retention (nav-link
`radcn-navigation-menu-link` for `:215`), all the assertions (`:167` menubar
border, `:295/:296` nav root class + list border), the dimension mappings, and the
animate/transform/`[&[hidden]]:hidden` syntax. It returned TWO correct BLOCKERS,
both now FIXED:

1. The nav vertical-list cascade
   (`.radcn-navigation-menu[data-orientation=vertical] .radcn-navigation-menu-list`)
   would OVERRIDE the migrated list's `display`/`align-items` — the unreliable
   Exp-47 case. FIX: replaced by CSS-var propagation (nav root sets
   `--radcn-nav-list-display`/`-align`/`-justify` via `data-[orientation=vertical]:`;
   the list reads them with the horizontal fallbacks flex/center/auto). The list no
   longer uses the `flex`/`items-center` utilities for the changing properties (it
   reads them via arbitrary-property `[display:var()]`/`[align-items:var()]`/
   `[justify-self:var()]`), so there is no base-vs-var conflict.
2. The `.radcn-menubar-shortcut, .radcn-menu-sub-caret` combined rule's sub-caret
   half is REDUNDANT with the standalone `.radcn-menu-sub-caret { margin-left:auto;
   color; font }` rule kept from Exp 51 (a superset). FIX: DELETE the combined rule
   entirely (migrate menubar-shortcut to a utility); sub-caret stays fully styled by
   the standalone rule — no split, no duplication.

Minor (no action): `z-[var(--radcn-menubar-z,50)]` is valid (the same form passed in
Exp 51); the nav-trigger `data-state` is JS-toggled and the `data-[state=open]:`
variant responds (standard).

Approval result: approved after the two fixes — the propagation replaces the
unreliable cascade, the redundant sub-caret rule is cleanly deleted, and the
shared-rule together-migration + family-helper/marker carve-outs are sound.
