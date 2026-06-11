# Experiment 51: Migrate DropdownMenu + ContextMenu together to Tailwind utilities

## Description

DropdownMenu and ContextMenu SHARE nearly all their rules (combined selectors
`.radcn-dropdown-menu, .radcn-context-menu`; `-content`/`-sub-content`; `-group`;
`-label`; `-item`/`-checkbox-item`/`-radio-item`/`-sub-trigger`; `[data-highlighted]`;
`-shortcut`; `-separator`; `-sub`). Per the Exp-39/49 sibling pattern, migrate BOTH
together so the shared rules drop. Neither imports Button.

### Scope carve-outs (kept bespoke — coupling)

Two sets of rules are SHARED beyond dropdown/context and are KEPT bespoke this
experiment (later experiments migrate their owners):

1. **Family-wide menu helpers** — `.radcn-menu-item--inset`, `.radcn-menu-label--inset`,
   `.radcn-menu-item--destructive`, `.radcn-menu-item-indicator`,
   `.radcn-menu-sub-caret`, `[data-radcn-menu-item][data-disabled="true"]`. Menubar
   ALSO emits these (verified: `menubar.tsx` uses `radcn-menu-item--inset`/
   `--${variant}`/`radcn-menu-item-indicator`, and `data-radcn-menu-item`). They are
   a consumed family API (Exp-37/47 raw-class lesson) — kept until Menubar migrates.
   The `:375/:376/:425` `toHaveClass(/radcn-menu-item--inset|radcn-menu-label--inset/)`
   assertions hold because those marker rules stay.
2. **Triggers** — `.radcn-dropdown-menu-trigger` (+`:focus-visible`),
   `.radcn-context-menu-trigger`. A `.radcn-button-group > .radcn-dropdown-menu-trigger`
   cascade (tokens.css ~840-900) restyles the trigger inside a ButtonGroup
   (split-button). Migrating the trigger's radius to a utility would make that
   bespoke cascade an unreliable override of a migrated child (Exp-47). So the
   triggers stay bespoke until ButtonGroup migrates.

### Exact utility mapping (dropdown/context-prefixed — MIGRATE)

- root (`.radcn-dropdown-menu, .radcn-context-menu`): `contents [font-family:var(--radcn-font)]`.
- portal: `z-[var(--radcn-menu-z,50)]`.
- content + sub-content: `z-[var(--radcn-menu-z,50)] grid
  min-w-[var(--radcn-menu-width,14rem)]
  max-h-[min(var(--radcn-menu-max-height,24rem),var(--radcn-menu-available-height,calc(100vh-1rem)))]
  overflow-auto gap-0.5 border border-[var(--radcn-menu-border,var(--radcn-border))]
  rounded-md bg-[var(--radcn-menu-bg,var(--radcn-background))]
  text-[var(--radcn-menu-fg,var(--radcn-foreground))] p-1.5
  shadow-[0_18px_48px_rgb(0_0_0_/_0.16)]
  [transform-origin:var(--radcn-menu-transform-origin,top_left)]
  animate-[radcn-positioned-overlay-in_120ms_ease-out] [&[hidden]]:hidden`
  (the `[&[hidden]]:hidden` reproduces `.content[hidden]{display:none}`, since the
  base `grid` overrides the browser `[hidden]` default — same as the other overlays).
- group + radio-group: `grid gap-0.5`.
- label: `px-2 py-1.5 text-muted-foreground text-[0.75rem] font-semibold
  leading-[1.2] [font-family:var(--radcn-font)]`.
- item + checkbox-item + radio-item + sub-trigger: `grid min-h-8
  grid-cols-[1rem_minmax(0,1fr)_auto] items-center gap-2 border-0
  rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent text-inherit
  cursor-default px-2 py-1.5 text-left text-[0.875rem] font-normal leading-[1.25]
  [font-family:var(--radcn-font)] outline-none
  data-[highlighted=true]:bg-[var(--radcn-menu-highlight-bg,var(--radcn-secondary))]
  data-[highlighted=true]:text-[var(--radcn-menu-highlight-fg,var(--radcn-foreground))]`.
  (The `--inset`/`--destructive` modifiers + the `[data-radcn-menu-item][data-disabled]`
  rule remain family-bespoke; items keep emitting those classes/attrs.)
- shortcut (SPLIT from the family `.radcn-menu-sub-caret`): `ml-auto
  text-muted-foreground text-[0.75rem] font-medium leading-none
  [font-family:var(--radcn-font)]`. The `.radcn-menu-sub-caret` half of that combined
  rule is KEPT bespoke (split).
- separator: `h-px my-1 -mx-1.5 bg-[var(--radcn-menu-separator-bg,var(--radcn-border))]`.
- sub (`.radcn-*-sub`): `contents`.

The `.radcn-fixture-custom-menu` fixture is unchanged; the `@keyframes
radcn-positioned-overlay-in` (shared with other overlays) stays.

## Why both suites stay green

- The custom menu (`:145/:330` `toHaveClass(/radcn-fixture-custom-menu/)`) holds: the
  class is on the content, and the migrated content reads `bg/border/fg-[var(--radcn-menu-*)]`
  from the fixture tokens.
- The inset markers (`:375/:376/:425`) hold (the `radcn-menu-item--inset`/`-label--inset`
  rules stay bespoke; items/labels keep emitting them).
- Highlight state via `data-[highlighted=true]:` (the item emits `data-highlighted`);
  disabled via the kept family `[data-radcn-menu-item][data-disabled]` rule.
- The content animation/transform-origin/positioning + the enhancer JS are
  untouched (same data attributes); `border`/`bg`/etc. resolve via the contract.

## Changes

- `radcn/packages/radcn/src/components/dropdown-menu.tsx` +
  `radcn/packages/radcn/src/components/context-menu.tsx`: emit utility-const strings
  for root/portal/content/sub-content/group/label/item(+checkbox/radio/sub-trigger)/
  shortcut/separator/sub; KEEP emitting the trigger classes + the family
  `radcn-menu-*` helper classes + `data-radcn-menu-item`; keep all data attributes.
  ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated dropdown/context
  rules; SPLIT the shortcut/sub-caret rule (keep `.radcn-menu-sub-caret`); KEEP the
  triggers + family helpers + `[data-radcn-menu-item][data-disabled]` + the custom
  fixture + `@keyframes radcn-positioned-overlay-in`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `max-h-[min(…calc(…))]`,
   `grid-cols-[1rem_minmax(0,1fr)_auto]`, `[&[hidden]]:hidden`,
   `animate-[radcn-positioned-overlay-in_120ms_ease-out]` utilities compile;
   no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no migrated dropdown/context rule remains; the
   triggers + family `radcn-menu-*` helpers + `[data-radcn-menu-item][data-disabled]`
   + custom fixture + keyframes retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `menu-overlays.spec.ts` (open/close,
   the custom-menu class on content, the inset markers, highlight, checkbox/radio
   indicators, separators, sub-menus, keyboard nav).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: DropdownMenu + ContextMenu render their root/content/items/etc. from
Tailwind utilities (triggers + family helpers kept bespoke); the custom menu +
inset markers + highlight + structure hold; BOTH suites green; byte-identical.

Fail criteria: a menu-overlays assertion regresses (custom class, inset, highlight,
open/close); the content positioning/animation drifts; `tokens.css`/`index.ts`
diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source + fixtures + tests).

Findings: APPROVED, no Blocker/Major (one Minor doc note). The reviewer verified
all five cruxes: (1) the family helpers + triggers are correctly kept bespoke
(confirmed Menubar emits the `radcn-menu-*` helpers at `menubar.tsx:230/237/244/258/265`
+ `data-radcn-menu-item`; the trigger↔ButtonGroup cascade at tokens.css ~840-897);
(2) the shared rules drop when both migrate, and the combined
`shortcut/sub-caret` rule is correctly SPLIT (keep `.radcn-menu-sub-caret`); (3) all
utility mappings exact (`rounded-md`=`var(--radcn-radius)` confirmed at tokens.css:22;
`gap-0.5`/`p-1.5`/`my-1`/`min-h-8`/`grid-cols-[1rem_minmax(0,1fr)_auto]`; the
`[&[hidden]]:hidden` + `max-h-[min(…calc(…))]` valid); (4) highlight via
`data-[highlighted=true]:` (items emit `data-highlighted`), disabled via the kept
family `[data-radcn-menu-item][data-disabled]` rule (items emit both attrs); (5) the
custom-menu holds — and the reviewer found the content has BOTH a
`toHaveClass(/radcn-fixture-custom-menu/)` AND `toHaveCSS()` color assertions
(`:145-147`/`:330-331`), satisfied by the migrated `bg/border/text-[var(--radcn-menu-*)]`
utilities reading the fixture vars; the inset/destructive/sub-caret markers
(`:375/376/388/389/405/425`) hold (kept bespoke); the `w-52`/`w-44` width classes
are fixture-applied Tailwind utilities (unaffected); the
`@keyframes radcn-positioned-overlay-in` stays.

Minor note (no action): a second combined rule `.radcn-menubar-shortcut,
.radcn-menu-sub-caret` exists — both selectors stay bespoke, so no split needed.

Approval result: approved — the sibling together-migration + the shortcut/sub-caret
split + the family-helper/trigger bespoke carve-outs are sound; the custom-menu
computed assertions are covered by the var-reading content utilities.
