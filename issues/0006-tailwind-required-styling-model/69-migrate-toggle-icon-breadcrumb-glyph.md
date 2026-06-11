# Experiment 69: Migrate toggle-group-icon + breadcrumb-glyph (+ drop dead toggle-group rule)

## Description

Three more debt rules via the proven consumer-site pattern (Exp 68) + one dead-rule
removal:

1. `.radcn-toggle-group` (container) is a DEAD rule — the ToggleGroup component already
   emits the equivalent `toggleGroupClass` utilities (Exp 47) and does NOT emit the bare
   `radcn-toggle-group` class; a precise grep confirms nothing (component, fixture, or
   docs) uses the bare class. Just remove the rule.
2. `.radcn-toggle-group-icon` — raw-class, ~23 sites (docs `components.tsx` + the toggle
   fixture). Consumer-site migrate (append utilities, keep marker). Its color reads
   `--radcn-toggle-icon-fg` (set per-item via the icon's inline `style`), which the
   `toggle.spec.ts:190/:192` `toHaveCSS('color', …)` assertions exercise — the
   `text-[var(--radcn-toggle-icon-fg,currentColor)]` utility reads that inline var, and
   the `.radcn-toggle-group-icon` marker (the test's locator) is kept.
3. `.radcn-breadcrumb-glyph` — raw-class, 6 sites (docs + navigation-collection fixture).
   Consumer-site migrate. No computed assertions.

### Utility mapping (appended after the kept marker)

- toggle-group-icon: `inline-grid w-[var(--radcn-toggle-icon-size,1rem)]
  h-[var(--radcn-toggle-icon-size,1rem)] place-items-center
  text-[var(--radcn-toggle-icon-fg,currentColor)] font-bold text-[0.75rem] leading-none
  [font-family:var(--radcn-font)]` (`font:700 0.75rem/1`).
- breadcrumb-glyph: `inline-flex w-4 h-4 items-center justify-center text-current
  text-[0.875rem] leading-none` (`1rem`=`w-4/h-4`; `color:currentColor`=`text-current`).

## Why both suites stay green

- toggle-group-icon: the `:190/:192` color assertions read the per-item inline
  `--radcn-toggle-icon-fg` via the migrated `text-[var(...)]` utility; the marker
  (locator) is kept. No other toggle assertion touches the icon's box.
- breadcrumb-glyph: no computed/class assertions; marker kept; the appended utilities
  reproduce the removed CSS exactly.
- The dead `.radcn-toggle-group` rule matched nothing (container emits utilities).

## Changes

- `toggle.tsx` (fixture, 1 icon site), `navigation-collection.tsx` (fixture, 2 glyph),
  `components.tsx` (docs, ~22 icon + 4 glyph): append the utilities to each raw `class`
  string (keep markers).
- `tokens.css`: remove `.radcn-toggle-group`, `.radcn-toggle-group-icon`,
  `.radcn-breadcrumb-glyph`.
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the icon/glyph utilities GENERATE in the candidate AND
   docs builds (grep the generated CSS for `place-items: center` from the icon +
   `w-4`/glyph), confirming the consumer-site utilities compiled; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 3 rules removed.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `toggle.spec.ts` (the icon colors `:190/:192`)
   and `navigation-collection.spec.ts` (breadcrumb).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: toggle-group-icon + breadcrumb-glyph render from utilities at the
consumer sites (generated); the icon color assertions hold; the dead toggle-group rule
removed; BOTH suites green; byte-identical. Clears 3 rules (≈12 remain).

Fail criteria: the icon color assertions regress; a utility doesn't generate; divergence.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major. Verified all 5 cruxes: (1) `.radcn-toggle-group`
is dead (container emits `toggleGroupClass`; zero bare-class uses) — safe to remove; (2)
the icon mapping is exact AND — KEY DETAIL the reviewer surfaced — the `:190/:192` color
assertions are driven by a SEPARATE kept cascade
`.radcn-toggle-group-item[data-state="on"] .radcn-toggle-group-icon { color:
var(--radcn-toggle-icon-on-fg, …) }` (the fixture sets `--radcn-toggle-icon-on-fg`
#ca8a04/#dc2626 per item); that cascade is NOT removed (only the BASE
`.radcn-toggle-group-icon` rule is) and, being unlayered, overrides the migrated base
`text-[var(--radcn-toggle-icon-fg,currentColor)]` via the kept `.radcn-toggle-group-icon`
marker — so the assertions hold; (3) the breadcrumb-glyph mapping is exact (`w-4`=1rem,
`text-current`, `leading-none`); (4) all 23 icon + 6 glyph raw sites are uniform
single-class literals (safe find/replace), none missed; (5) no orphan refs. The
tokens.css removal targets ONLY the line-start base rules, NOT the
`[data-state=on] .icon` descendant cascade.

Approval result: approved — dead-rule removal + the two consumer-site migrations are
sound; the kept on-state cascade preserves the icon color assertions.
