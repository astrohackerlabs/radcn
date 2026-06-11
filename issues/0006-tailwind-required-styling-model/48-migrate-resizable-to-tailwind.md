# Experiment 48: Migrate Resizable to Tailwind utilities

## Description

Resizable (panel-group + panel + handle + handle-grip) is the first application
of the Exp-47 CSS-var propagation pattern to a NEW cascade-coupled component. Its
orientation cascades:

1. `.radcn-resizable-panel-group--vertical { min-height: 18rem; flex-direction:
   column }` — on the GROUP itself → migrate to `data-[orientation=vertical]:`
   variants on the group (its OWN state, like Toggle's container — works).
2. `.radcn-resizable-panel-group--horizontal .panel { height: auto }` /
   `--vertical .panel { width: auto }` — CHILD cascades, but they set `auto`,
   which IS the default for a flex item's cross size → NO-OPS. DROP them.
3. `.radcn-resizable-panel-group--vertical .handle { width: auto; height: 0.5rem;
   cursor: row-resize }` — CHILD cascade with REAL differences (the handle's
   axis). A cascade overriding the migrated handle's `w-`/`h-`/`cursor-` utilities
   FAILS (Exp-47 lesson). So PROPAGATE: the group SETS
   `--radcn-resizable-hw`/`-hh`/`-hcur` via `data-[orientation=vertical]:[--…]`;
   the handle READS them with the horizontal defaults as fallbacks.

### Exact utility mapping

- panel-group (`.radcn-resizable-panel-group`): `flex
  w-[min(100%,var(--radcn-resizable-width,32rem))]
  min-h-[var(--radcn-resizable-height,12rem)] overflow-hidden border
  border-[var(--radcn-resizable-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-resizable-bg,var(--radcn-background))] text-foreground
  [font-family:var(--radcn-font)] data-[orientation=vertical]:min-h-[18rem]
  data-[orientation=vertical]:flex-col
  data-[orientation=vertical]:[--radcn-resizable-hw:auto]
  data-[orientation=vertical]:[--radcn-resizable-hh:0.5rem]
  data-[orientation=vertical]:[--radcn-resizable-hcur:row-resize]`. Drops the
  style-less `--{orientation}` class (orientation now via the `data-orientation`
  attribute the group already emits); keeps `data-orientation`.
  (The vertical `min-h-[18rem]` beats the base `min-h-[var(…,12rem)]` via attribute
  specificity.)
- panel (`.radcn-resizable-panel`): `min-w-0 min-h-0 flex-[0_0_auto] overflow-auto
  bg-[var(--radcn-resizable-panel-bg,var(--radcn-background))]`; keeps the inline
  `flex-basis:{size}%` style. (The orientation `height/width:auto` cascades are
  no-ops, dropped.)
- handle (`.radcn-resizable-handle`): `relative grid flex-[0_0_auto]
  place-items-center bg-[var(--radcn-resizable-handle-bg,var(--radcn-border))]
  outline-none touch-none w-[var(--radcn-resizable-hw,0.5rem)]
  h-[var(--radcn-resizable-hh,auto)] cursor-[var(--radcn-resizable-hcur,col-resize)]
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`.
  Horizontal (no var set): w 0.5rem, h auto, cursor col-resize (fallbacks).
  Vertical (group sets vars): w auto, h 0.5rem, cursor row-resize.
- handle-grip (`.radcn-resizable-handle-grip`): `grid min-w-[0.875rem]
  min-h-[1.25rem] place-items-center border
  border-[var(--radcn-resizable-grip-border,var(--radcn-border))]
  rounded-[calc(var(--radcn-radius)-0.125rem)]
  bg-[var(--radcn-resizable-grip-bg,var(--radcn-background))] text-muted-foreground
  leading-none`.

All `.radcn-resizable-*` rules are removed (fully migrated). The
`.radcn-fixture-custom-resizable` fixture + the fixture-only `.radcn-fixture-panel`
demo class are untouched (the latter is a fixture raw class, not a component).

## Why both suites stay green

- The custom bg `rgb(240,253,250)` (#f0fdfa, application-shell:57) holds via
  `bg-[var(--radcn-resizable-bg,…)]` reading the unchanged fixture token; the
  `radcn-fixture-custom-resizable` class (:56 `toHaveClass`) is on the consumer
  (unaffected).
- Vertical groups: `flex-col` + `min-h-[18rem]` via the group's `data-[orientation=
  vertical]:` variants; the handle's axis (w/h/cursor) via the propagated vars (no
  failing child cascade). Horizontal: the read fallbacks.
- The panel flex-basis (inline) + resize JS are untouched; `border`/`bg`/etc.
  resolve via the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/resizable.tsx`: emit utility-const strings
  for panel-group (+ orientation variants + handle var-sets)/panel/handle/grip;
  drop the `radcn-resizable*` classes (+ the `--{orientation}`); keep all data
  attributes + the inline flex-basis. ASCII comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove ALL `.radcn-resizable-*`
  rules; KEEP `.radcn-fixture-custom-resizable` + `.radcn-fixture-panel`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `data-[orientation=vertical]:[--var:val]`,
   `w-[var(…)]`, `cursor-[var(…)]` utilities compile; no junk ellipsis.
2. Three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-resizable-*` rule remains; the two
   fixture classes retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `application-shell.spec.ts` (the custom
   bg `rgb(240,253,250)`, the resizable group/panel/handle structure, vertical +
   horizontal orientation, keyboard resize).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Resizable renders from Tailwind utilities (no `.radcn-resizable-*`
rule); the custom bg + the horizontal/vertical handle axis + the group orientation
hold; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: the custom bg or an orientation/handle-axis regresses; a
base-vs-variant min-h conflict; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass (first-try green — the Exp-47 pattern generalized cleanly)

Resizable is migrated; both suites green. Verification:

1. Both `styles:build` exit 0; no junk ellipsis (0); the
   `data-[orientation=vertical]:[--var:val]`, `w-[var(…)]`, `cursor-[var(…)]`
   utilities compile.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-resizable-*`
   rule remains; `.radcn-fixture-custom-resizable` + `.radcn-fixture-panel` retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `application-shell.spec.ts` in isolation
   **4 passed** — incl. the custom bg `rgb(240,253,250)`, the resizable
   group/panel/handle structure, horizontal + vertical orientation, keyboard
   resize.
6. `git diff --check` clean; `vendor/` untouched; the three expected files changed.

No deviations from the approved design. Unlike the Toggle attempts, this was
first-try green — because the Exp-47 propagation pattern was already proven, so I
applied it from the start (group sets orientation vars, handle reads them) rather
than discovering the cascade failure through the gate.

## Conclusion

Resizable is migrated: the panel-group/panel/handle/grip render from Tailwind
utilities; the group's orientation uses `data-[orientation=vertical]:` variants,
and the handle's axis (width/height/cursor) propagates via the inherited
`--radcn-resizable-hw/-hh/-hcur` vars (no failing child cascade). THIRTY-SEVEN
components are now migrated. The CSS-var propagation pattern (Exp 47) is confirmed
to generalize across components — applied first-try to Resizable.

Learnings (also copied to the issue README Learnings digest):

- The Exp-47 CSS-var propagation pattern generalizes: ANY parent→child
  orientation/state styling on a migrated child should be propagation (parent sets
  `--x` via `data-[state]:[--x:val]`, child reads `prop-[var(--x,fallback)]`), not
  a child cascade. Resizable's handle axis applied it first-try.
- A parent→child cascade that sets a property to its OWN default (e.g.
  `height:auto`/`width:auto` on a flex item's cross-axis) is a no-op and can be
  dropped outright rather than propagated.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README incl. the Exp-47
propagation pattern, this experiment file, and read access to the source +
fixtures).

Findings: APPROVED, no Blocker/Major/Minor. The reviewer verified all five cruxes:
(1) the group's `--vertical` (min-h+flex-direction) correctly becomes
`data-[orientation=vertical]:` variants on the group itself (attribute specificity
beats the base min-h); (2) the panel `height/width: auto` orientation cascades are
genuine no-ops (auto = the flex cross-axis stretch default) — safe to drop, and no
panel dimension is asserted; (3) the handle axis (w/h/cursor) propagates via the
proven Exp-47 pattern (group sets `--radcn-resizable-hw/-hh/-hcur`, handle reads
with the horizontal fallbacks; `cursor-[var(…)]` is valid Tailwind v4); (4) all
four components' utilities map exactly; (5) the custom bg `rgb(240,253,250)` holds
via the token-reading utility, the fixture + the fixture-only `.radcn-fixture-panel`
are untouched. It read the full `application-shell.spec.ts` resizable block — every
assertion uses data-attribute/fixture-class selectors (no `.radcn-resizable-*`
class assertions); no cross-component reuse.

Approval result: approved — the Exp-47 propagation pattern generalizes cleanly to
Resizable's orientation; the group orientation, handle-axis propagation, and
custom token are sound.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed the four components emit utility-const strings (no
`radcn-resizable*` classes; the `--{orientation}` class dropped; `data-orientation`
kept); the group sets `data-[orientation=vertical]:min-h-[18rem]`+`flex-col` + the
handle var-sets, and the handle reads `w-[var(--radcn-resizable-hw,0.5rem)]`/
`h-[var(--radcn-resizable-hh,auto)]`/`cursor-[var(--radcn-resizable-hcur,col-resize)]`;
the panel keeps its inline flex-basis. It verified the horizontal (fallback) vs
vertical (group-var) handle axis is correct, the group orientation is correct, the
custom bg `rgb(240,253,250)` holds, and the panel `height/width:auto` drops are
safe (the inline flex-basis controls panel sizing). tokens.css has ZERO
`.radcn-resizable*` rules with both fixture classes retained; byte-identical
`index.ts`; no junk. It re-ran the three typechecks, the docs suite (11),
`application-shell.spec.ts` (4), and the full fixture suite (1191). Verdict:
APPROVED.

Approval result: approved with no blockers — Resizable is migrated (37
components); the CSS-var propagation pattern confirmed to generalize first-try.
