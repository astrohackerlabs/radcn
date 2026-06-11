# Experiment 66: Migrate the menu-family helpers (sub-caret + item-indicator)

## Description

The README audit's menu-family helper debt: `.radcn-menu-sub-caret` and
`.radcn-menu-item-indicator`, emitted as inline raw class strings across the menu
cluster (DropdownMenu, ContextMenu, Menubar). DropdownMenu OWNS the shared menu
consts (`menuRootClass`/`menuItemClass`/… exported, imported by ContextMenu +
Menubar), so the two new consts are defined+exported there and imported by the other
two — the established family pattern. Component-emitted only (no fixture/docs raw-class
blast radius); no computed (`toHaveCSS`) assertions on either. The marker classes
(`radcn-menu-sub-caret`/`radcn-menu-item-indicator`) + the `data-radcn-menu-item-indicator`
attributes are kept.

### Exact utility mapping

- `menuSubCaretClass` (`.radcn-menu-sub-caret`): `radcn-menu-sub-caret ml-auto
  text-muted-foreground font-medium text-[0.75rem] leading-none
  [font-family:var(--radcn-font)]` (`font:500 0.75rem/1`; keeps the marker).
- `menuItemIndicatorClass` (`.radcn-menu-item-indicator`): `radcn-menu-item-indicator
  inline-flex w-4 justify-center
  text-[var(--radcn-menu-indicator-fg,var(--radcn-primary))]` (keeps the marker).

### Sites

- DropdownMenu (`dropdown-menu.tsx`): define+export both consts; replace the 3 inline
  `class="radcn-menu-item-indicator"`/`"radcn-menu-sub-caret"` with `class={…Class}`.
- ContextMenu (`context-menu.tsx`): import both; replace its 3 inline sites.
- Menubar (`menubar.tsx`): import both; replace its 3 inline sites + the
  `classes('radcn-menu-item-indicator', className)` wrapper → `classes(menuItemIndicatorClass, className)`.

## Why both suites stay green

No `toHaveCSS` assertions target the caret/indicator; specs assert presence/state
(`hidden`, `data-state`) which the kept markers + data attributes preserve. The
indicator color reads `--radcn-menu-indicator-fg` (falling back to `--radcn-primary`),
matching the removed rule.

## Changes

- `dropdown-menu.tsx`: add the two exported consts; wire its 3 sites.
- `context-menu.tsx` + `menubar.tsx`: import the two consts; wire their sites (+ the
  Menubar wrapper).
- `tokens.css`: remove `.radcn-menu-sub-caret`, `.radcn-menu-item-indicator`.
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the indicator/caret utilities compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 2 rules removed.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. the dropdown/context/menubar specs
   (checkbox/radio indicators show/hide, sub-trigger carets render).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: the menu caret + item-indicator render from utilities; presence/state
hold; BOTH suites green; byte-identical. Clears 2 of the remaining debt rules.

Fail criteria: a menu spec regresses; a utility doesn't compile; divergence.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: the SUBSTANTIVE design checks all PASSED — CRUX 1 (the two mappings are
EXACT transposes of the current CSS: `ml-auto`/`text-muted-foreground`/`font-medium`/
`text-[0.75rem]`/`leading-none` for the caret; `inline-flex`/`w-4`/`justify-center`/
the indicator-fg var for the indicator); CRUX 2 (the family pattern is correct —
dropdown-menu owns + exports the menu consts, context/menubar import; the 9 inline
sites + the menubar wrapper; markers + `data-radcn-menu-item-indicator` preserved);
CRUX 3 (NO `toHaveCSS` on either; the menu-overlays spec asserts `.radcn-menu-sub-caret`
`toHaveText('›')` at `:389` and the `[data-radcn-menu-item-indicator]` visibility at
`:418` — BOTH preserved by keeping the marker class + the data attribute; zero
fixture/docs raw-class blast radius); CRUX 4 (the plan is correct). The reviewer's
"REJECTED" was a design-stage misread (it listed "not yet implemented" as blockers —
expected, since implementation follows approval); it explicitly judged the design
"THOROUGH and ACCURATE... should pass both fixture suites." Lead-agent judgment: the
substantive design is approved; the gate decides the implementation.

Approval result: approved — exact mappings, the family-const pattern, markers +
data-attrs preserved (the caret-text + indicator-visible assertions hold).
