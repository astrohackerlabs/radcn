# Experiment 16: Add the default border-color base rule

## Description

Experiment 15 (Card) failed because RadCN's theme contract has no default
border color: Tailwind's `border` utility sets only border-WIDTH, and Tailwind
preflight sets `border-style: solid` with `border-color` defaulting to
`currentColor`. shadcn relies on a base-layer rule that defaults all border
colors to the `--border` token (shadcn `globals.css`:
`@layer base { *, ::after, ::before { @apply border-border ... } }`). RadCN
never added it, so a migrated `border` rendered `currentColor`
(`--foreground`), not the subtle `--border` gray. This blocks every
visible-border component (Card, Input, Dialog, Checkbox, …).

This experiment adds that base rule to the RadCN theme contract
(`theme.css`), so the `border` utility renders `--border` by default — exactly
shadcn's behavior. It is foundational and unblocks the bordered-component
migrations; it migrates no component itself.

## Changes

- `radcn/packages/radcn/src/styles/theme.css`: add, near the top (after the
  `@custom-variant`), a base layer defaulting border color to the token:

  ```css
  @layer base {
    *,
    ::before,
    ::after {
      border-color: var(--border);
    }
  }
  ```

  `--border` is already defined for light (`#e4e4e7`) and dark (`#3f3f46`) in
  the same file, so the default border color is theme-aware. Placing it in
  `@layer base` keeps it at low cascade priority: Tailwind border-color
  UTILITIES (e.g. `border-destructive`, `border-transparent`) and the existing
  UNLAYERED bespoke `radcn-*` border rules in `radcnStyles` both override it,
  so it only fills the default where nothing else sets a border color.

No component, fixture, or test changes. The candidate fixture and docs
pipelines already import `radcn/theme.css`, so both pick up the base rule on
the next `styles:build`.

Dependency note (for the Card re-attempt, Experiment 17): this base rule is the
foundation Card needs, but it does NOT by itself make the
`radcn-fixture-custom-card` scenario pass — that scenario sets
`--radcn-card-border` (a custom-token hook the migrated Card won't read), so
Experiment 17 must also translate it to a direct `border-color` rule and
repoint the `.radcn-chart-example-card .radcn-card-content` selector (both per
Experiment 15's Conclusion). Experiment 16 only lays the border-color
foundation; it changes nothing touching those two today.

## Why both suites stay green

- The rule only affects elements whose border color is otherwise unset. Every
  existing non-migrated component sets its border color explicitly via
  unlayered `radcn-*` CSS (higher priority than `@layer base`), so their
  computed border colors are unchanged.
- Migrated components either set an explicit border color utility (Badge:
  `border-transparent`) or have no border (Kbd, Skeleton, Separator, Empty's
  width-0 `border-dashed`, Label, AspectRatio). So no existing computed
  border-color assertion shifts.
- Net effect on the current suites: the default border color of unstyled-border
  elements becomes `--border` instead of `currentColor`. No test asserts such
  an element's border color today (Card, which would, is reverted). The
  dual-suite gate confirms zero regressions.

## Verification

1. Both `styles:build` exit 0; each generated CSS contains a base-layer
   `border-color: var(--border)` rule (e.g. grep the generated CSS for
   `border-color: var(--border)` within an `@layer base`/base context).
2. All three typechecks pass.
3. Docs suite green (11), run twice.
4. Fixture suite green (1191), run twice.
5. Spot-confirm the fix works, IN THIS experiment, via a throwaway probe: add a
   temporary `@source`-scanned element with a bare `border` utility (no other
   border-color), build, and confirm it computes `border-color: rgb(228, 228, 231)`
   (light `--border`) — then delete the probe and rebuild before the result
   commit. (Full integration proof comes in Experiment 17 when Card consumes
   the rule.)
6. `git diff --check` clean; `vendor/` untouched; only `theme.css` (the
   single edit) plus this experiment file and the README change.

Pass criteria: the base border-color rule is added to `theme.css`; both suites
green and stable; no existing border-color assertion shifts; only the expected
files change.

Fail criteria: any suite regresses (would reveal an element whose border color
was unintentionally changed by the base rule); the rule does not appear in the
generated CSS.

## Result

**Result:** Pass

The default border-color base rule is in place; both suites are green and
stable. Verification:

1. Both `styles:build` exit 0; each generated CSS contains the base-layer
   `border-color: var(--border)` rule (grep count 2 each — the rule plus its
   dark-variant materialization).
2. All three typechecks pass.
3. Docs suite: **11 passed** ×2 — stable.
4. Fixture suite: **1191 passed** ×2 in this experiment's runs; no existing
   border-color assertion shifted. (The positioned-overlay tests retain the
   rare serial-load flakiness classified in Experiment 9 — a re-run during the
   completion review hit it once and passed on retry; it is unrelated to this
   CSS-base change, which touches only default border color.)
5. Throwaway probe confirmed: a bare `border p-4` element generates with the
   base `border-color: var(--border)` and `--border: #e4e4e7` (light) present,
   so a bare `border` now resolves to `rgb(228, 228, 231)` instead of
   currentColor. Probe deleted and rebuilt before this result.
6. `git diff --check` clean; `vendor/` untouched; only `theme.css` changed
   (tokens.css/index.ts untouched — this is a contract-file edit, not a
   bespoke-CSS edit).

No deviations from the approved design.

## Conclusion

The theme contract now defaults `border-color` to `--border` via a low-priority
`@layer base` rule, matching shadcn. Tailwind's `border` utility renders the
subtle `--border` color (not currentColor), border-color UTILITIES and the
unlayered `radcn-*` rules still override it, and no current test regressed. This
is the foundation Experiment 15 (Card) was missing; the bordered-component
migrations (Card re-attempt, Input, Dialog, …) can now proceed.

Learnings for later experiments (also copied to the issue README Learnings
digest):

- `theme.css` now provides `@layer base { *,::before,::after { border-color:
  var(--border) } }`, so any migrated component using the `border` utility gets
  the `--border` color for free; only override it with a `border-*` color
  utility or inline/bespoke rule when a different border color is intended.
- This is a theme-CONTRACT edit (`theme.css`), independent of the
  `tokens.css` ↔ `index.ts` bespoke-CSS sync; `theme.css` flows into both
  pipelines via their `@import 'radcn/theme.css'`.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, Experiments 15–16,
`theme.css`, and read access to referenced sources)

Round 1: REJECTED with one (thin) Blocker + one Major + one Minor. The reviewer
confirmed the core design is sound — the rule is the correct shadcn-parity fix,
`--border` is defined light/dark, the cascade reasoning holds (theme.css's
`@layer base` is low priority; border-color UTILITIES and the unlayered
`radcnStyles` both override it; the document shells order the Tailwind `<link>`
before the `radcnStyles` `<style>`), and NO existing border-color assertion in
either suite shifts (all are backed by explicit utilities/inline/bespoke
sources that beat `@layer base`).

Resolutions:

- Blocker (acknowledge the custom-token re-write dependency for the Card
  re-attempt): added a Dependency note clarifying Experiment 16 only lays the
  border-color foundation and that Experiment 17 must translate
  `radcn-fixture-custom-card` and repoint the chart selector (per Exp 15's
  Conclusion). Exp 16 changes nothing touching those today.
- Major (clarify the "throwaway check" scope): verification step 5 now states
  the probe runs IN Exp 16 (temporary scanned element → confirm bare `border`
  computes `--border` → delete before result commit), with full integration in
  Exp 17.
- Minor (docs suite count): the docs suite is 11 tests (established Exp 6);
  noted.

Round 2 (re-review of these resolutions by a fresh Claude subagent): confirmed
all three resolved (Dependency note, throwaway-probe scope, docs count) and no
new blocker. Verdict: APPROVED.

Approval result: approved (round 2). No blocker findings remain; the core
design (the `@layer base` border-color rule + sound cascade reasoning + no
shifted assertions) was uncontested.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: one Minor (Result wording re: a re-run flake), no Blocker/Major.

The reviewer confirmed theme.css has the `@layer base` border-color rule near
the top with `--border` defined light/dark, that ONLY theme.css changed (no
tokens.css/index.ts), and the cascade order (the generated `<link>` before the
unlayered `radcnStyles` `<style>`, so utilities and bespoke rules override the
base); independently re-ran both `styles:build` (rule present), all three
typechecks, the docs suite (11) and fixture suite (1191 on re-run; one run hit
the Exp-9-classified overlay flake and passed on retry, unrelated to this
change). It judged the change correctly scoped, sound, and unblocking for
bordered components with no regression. Verdict: APPROVED. The minor (note the
re-run flake in the Result) is folded in above.

Approval result: approved with no blockers.
