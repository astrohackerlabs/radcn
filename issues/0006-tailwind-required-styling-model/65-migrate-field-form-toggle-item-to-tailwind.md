# Experiment 65: Migrate Field/Form message + ToggleGroup item to Tailwind utilities

## Description

The tractable, no-blast-radius slice of the README audit's remaining debt:
`.radcn-field-description`, `.radcn-field-error`, `.radcn-toggle-group-item`. All
component-emitted (zero raw-class sites in fixtures/docs — the earlier field-error
"raw" hit was prose text in the docs, not a class). Field AND Form share the
field-description/-error classes (Form's message/description reuse them — `form.tsx`
comment), so the utility consts are defined in `field.tsx` and imported by `form.tsx`;
both emit them, keeping the marker classes.

### Exact utility mapping

- field-description (`.radcn-field-description`): `m-0 text-muted-foreground
  text-[0.8125rem] leading-[1.4] [font-family:var(--radcn-font)]` (`font:400 0.8125rem/1.4`).
- field-error (`.radcn-field-error`): `m-0 text-[var(--radcn-field-error,var(--radcn-destructive))]
  font-medium text-[0.8125rem] leading-[1.4] [font-family:var(--radcn-font)]`
  (`font:500 0.8125rem/1.4`; the color reads the `--radcn-field-error` token).
- toggle-group-item (`.radcn-toggle-group-item`): `shrink-0` (`flex-shrink:0`).

## Why both suites stay green

- `static-display.spec.ts:264` asserts `[data-radcn-form-message]` computed `color`
  `rgb(124,58,237)` — the form-message emits `radcn-field-error` + the new
  `text-[var(--radcn-field-error,var(--radcn-destructive))]` utility, which reads the
  test's `--radcn-field-error` override (#7c3aed) → holds. The Field description/error
  + toggle item have no other computed assertions; structure/text/class-presence hold
  via the kept markers.

## Changes

- `field.tsx`: define + export `fieldDescriptionClass`, `fieldErrorClass`; emit them
  (keep the marker classes).
- `form.tsx`: import the two consts; add them to the form-description / form-message
  emissions (keep `radcn-form-*` + `radcn-field-*` markers).
- `toggle-group.tsx`: emit `toggleGroupItemClass` (`shrink-0`) alongside the kept
  `radcn-toggle-group-item` marker.
- `tokens.css`: remove `.radcn-field-description`, `.radcn-field-error`,
  `.radcn-toggle-group-item`.
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; `text-[var(--radcn-field-error,…)]` / `shrink-0`
   compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 3 rules removed.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `static-display.spec.ts` (the form-message
   color `:264`), the Field + ToggleGroup specs.
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Field/Form message + ToggleGroup item render from utilities; the
form-message color + structure hold; BOTH suites green; byte-identical. Clears 3 of
the remaining ~23 debt rules.

Fail criteria: the form-message color regresses; a utility doesn't compile;
`tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Field/Form message + ToggleGroup item migrated; both suites green (both fixture runs
clean). All three `styles:build`/typechecks pass; the
`text-[var(--radcn-field-error,var(--radcn-destructive))]` + `shrink-0` utilities
compile (no junk); `index.ts` byte-identical; the 3 rules removed; docs 11 ×2;
`form-input-cluster.spec.ts` **11 passed** (incl. the form-message color `:264`
`rgb(124,58,237)` via the field-error token) + `static-display.spec.ts` **12 passed**;
fixture 1191 ×2 (both clean); `git diff --check` clean; four files changed
(field.tsx, form.tsx, tokens.css, index.ts — toggle-group.tsx needed no change since
it already emitted `shrink-0`).

## Conclusion

`field-description`/`field-error` render from utilities (defined+exported in
`field.tsx`, imported by `form.tsx` so the form message/description reuse them; the
form-message color reads the `--radcn-field-error` token via the arbitrary-value
utility); `.radcn-toggle-group-item` was already redundant (the component emitted
`shrink-0` since Exp 47) so only its rule was dropped. Clears 3 of the remaining ~23
visual-debt rules (≈19 remain: the Button keystone + its raw-class blast radius, the
Button-coupled triggers/closes, the menu-family `menu-sub-caret`/`menu-item-indicator`
helpers, and the raw-class primitives toggle-group/toggle-icon/breadcrumb-glyph/
hover-card avatar+body).

Learnings (also copied to the issue README Learnings digest):

- A shared sub-element class used by two components (Field + Form's message/
  description) migrates by defining+exporting the utility const in the owner
  (`field.tsx`) and importing it in the reuser (`form.tsx`) — both emit it, keeping
  the marker classes; the token-driven color (`text-[var(--radcn-field-error,…)]`)
  preserves the fixture's computed-color assertion.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: APPROVED, no Blocker/Major (clarification notes only). The reviewer verified
the field-description/-error mappings are EXACT transposes of the current CSS; CRUX 2 —
`toggle-group.tsx:253` ALREADY emits `shrink-0`, so `.radcn-toggle-group-item` is
redundant and the experiment merely removes the rule (no component change); CRUX 3 —
BOTH Field (181/193) and Form (198/214, form-message/description reuse the field
classes) must emit the utility consts, so they are defined+exported in `field.tsx` and
imported by `form.tsx`; CRUX 4 — the form-message color test (`form-input-cluster.spec.ts:264`,
`rgb(124,58,237)`) holds because the fixture `.radcn-fixture-custom-field` sets
`--radcn-field-error: #7c3aed` and the migrated `text-[var(--radcn-field-error,var(--radcn-destructive))]`
utility reads it; no other computed assertions; no fixture raw-class blast radius (the
docs hit was prose). The `text-[var(…)]` fallback syntax is proven across prior
experiments.

Approval result: approved — exact mappings, the toggle item already emits the utility
(rule redundant), Field+Form both emit the shared consts, the form-message color var
chain holds.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: none (no Blocker, Major, or Minor). Confirmed field.tsx exports + emits the
two consts (markers kept); form.tsx imports them and the form-message/description emit
them (markers kept); toggle-group.tsx unchanged (already emits `shrink-0`); tokens.css
removed the 3 rules with the `--radcn-field-error` TOKEN var usages + the
`.radcn-fixture-custom-field` intact; byte-identical `index.ts`. It rebuilt (utilities
generate, no junk), re-ran the three typechecks, docs (11), `form-input-cluster.spec.ts`
(11, incl. the `:264` form-message color `rgb(124,58,237)`), `static-display.spec.ts`
(12), and the full fixture suite (1191). Verdict: APPROVED.

Approval result: approved with no blockers — 19 of the 39 visual-debt rules cleared.
