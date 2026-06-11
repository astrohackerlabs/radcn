# Experiment 42: Migrate Typography to Tailwind utilities

## Description

Typography is a self-contained set of 11 text-style components (h1–h4, p,
blockquote, list, list-item, inline-code, lead, large, small, muted). Each emits
its own class; there are no variants, no parent-state, and no shared rule beyond
a `font-family: var(--radcn-font)` applied to all (baked into each component's
utility string via `[font-family:var(--radcn-font)]`, except inline-code which is
monospace and list-item which is style-less). The two asserted values (h1
font-size, muted color) are token-driven; the custom-typography fixture is
unchanged.

CRITICAL (Exp-41 lesson): use LONGHAND margins (`mt-`/`mb-`/`mx-`/`my-`), NEVER
the `m-0` shorthand — a shorthand `margin` + a longhand `margin-bottom` on one
element conflict and resolve by Tailwind source order (the shorthand can reset
the longhand). The CSS sets directional margins (e.g. `margin: 0 0 1rem`), so
emit `mt-0 mx-0 mb-4` etc.

### Exact utility mapping (per component)

- h1: `mt-0 mx-0 mb-4 text-[var(--radcn-typography-h1-size,2rem)] font-bold
  leading-[1.1] [font-family:var(--radcn-font)]` (asserted 40px when custom
  `--radcn-typography-h1-size: 2.5rem`; default 2rem).
- h2: `mt-8 mx-0 mb-4 border-b border-border pb-2 text-2xl font-semibold
  leading-[1.2] [font-family:var(--radcn-font)]` (2rem→mt-8, 1.5rem→text-2xl).
- h3: `mt-6 mx-0 mb-3 text-xl font-semibold [font-family:var(--radcn-font)]`
  (1.5rem→mt-6, 0.75rem→mb-3, 1.25rem→text-xl).
- h4: `mt-4 mx-0 mb-2 text-base font-semibold [font-family:var(--radcn-font)]`.
- p: `mt-0 mx-0 mb-4 text-foreground text-base leading-[1.75]
  [font-family:var(--radcn-font)]`.
- list (`<ul>`): same as p + `pl-6` (1.5rem).
- list-item (`<li>`): style-less (no CSS rule) — drop the class, keep the data
  attribute (emit `classes(className)`).
- blockquote: `my-4 mx-0 border-l-2 border-border pl-4 text-muted-foreground
  italic [font-family:var(--radcn-font)]`.
- inline-code (`<code>`): `rounded-[calc(var(--radcn-radius)-0.125rem)]
  bg-secondary px-1 py-0.5 font-mono text-[0.875em] font-semibold leading-[1.4]`
  (no var-font — it's monospace; px 0.25rem→px-1, py 0.125rem→py-0.5; font-size
  0.875em relative).
- lead: `text-muted-foreground text-xl leading-[1.6] [font-family:var(--radcn-font)]`
  (1.25rem→text-xl).
- large (`<div>`): `text-lg font-semibold [font-family:var(--radcn-font)]`
  (1.125rem→text-lg).
- small (`<small>`): `text-sm font-medium [font-family:var(--radcn-font)]`.
- muted (`<p>`): `text-[var(--radcn-typography-muted,var(--radcn-muted-foreground))]
  text-sm [font-family:var(--radcn-font)]` (asserted `rgb(124,58,237)` when custom
  `--radcn-typography-muted: #7c3aed`).

(lead/large/small/muted set no margin — preflight resets `<p>`/`<small>` margins
to 0, matching the original which had no margin rule for them.)

No bespoke rules are kept (no variants/parent-state/shared selectors); the
`.radcn-fixture-custom-typography` fixture (`--radcn-typography-h1-size`,
`--radcn-typography-muted`) is retained and read by the token-referencing
utilities.

## Why both suites stay green

- The custom h1 font-size (`40px`, navigation-collection:351) and muted color
  (`rgb(124,58,237)`, :352) hold via the token-referencing utilities reading the
  unchanged fixture tokens.
- The shared `font-family` is preserved via `[font-family:var(--radcn-font)]` on
  each element (except mono code); the margins are longhand (no shorthand
  conflict); `text-foreground`/`text-muted-foreground`/`border-border`/
  `bg-secondary` resolve via the contract.

## Changes

- `radcn/packages/radcn/src/components/typography.tsx`: each component emits its
  utility-const string (drop the `radcn-typography-*` classes; list-item drops
  its style-less class); keep ALL `data-radcn-typography-*`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-typography-*` rules (the shared font-family rule + all per-element
  rules); KEEP `.radcn-fixture-custom-typography`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the canonical node
  formula.

Expected git status: `typography.tsx`, `tokens.css`, `index.ts`, this file,
README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; the typography utilities generate (`text-2xl`,
   `border-l-2`, `font-mono`, the `[font-family:var(--radcn-font)]`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-typography-*`
   CLASS rule remains; `.radcn-fixture-custom-typography` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `navigation-collection.spec.ts`
   (the h1 font-size `40px` at :351 + the muted color `rgb(124,58,237)` at :352,
   the typography demo composition).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Typography renders from Tailwind utilities (no `radcn-typography-*`
class); the h1 size + muted color (custom tokens) + the font/margins/borders hold;
BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a typography assertion regresses (h1 size, muted color); a
margin/border/font drifts; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README incl. the Exp-41
shorthand/longhand lesson, this experiment file, and read access to the source)

Findings: APPROVED, no Blocker/Major/Minor. The reviewer verified every element's
mapping reproduces the exact CSS (margins, sizes, weights, line-heights, border,
color, padding); confirmed the four cruxes: (1) the token-referencing h1 size
(40px custom / 2rem default) + muted color (`rgb(124,58,237)` custom) hold via
the retained `.radcn-fixture-custom-typography`; (2) lead/large/small/muted have
no margin (preflight `margin:0` baseline, matching the original); (3) inline-code
maps the `600 0.875em/1.4` mono font to `font-mono text-[0.875em] font-semibold
leading-[1.4]` (family unasserted); (4) list-item has NO CSS rule (safe to drop
the class). It confirmed the LONGHAND margins avoid the Exp-41 shorthand-vs-
longhand conflict, all arbitrary-value syntaxes are valid (proven in prior
migrations), no raw `radcn-typography-*` class strings in fixtures, and no
cross-component reuse.

Approval result: approved — clean, self-contained per-element migration; the
token-referencing h1/muted, the longhand margins, and the preserved font are
sound.
