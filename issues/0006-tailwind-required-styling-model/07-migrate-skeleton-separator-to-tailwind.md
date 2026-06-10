# Experiment 7: Migrate Skeleton and Separator to Tailwind utilities

## Description

With the docs app Tailwind pipeline in place (Experiment 6) and the dual-suite
gate established, component migration resumes. This experiment applies the
Badge recipe (Experiment 5) as a small BATCH to two clean leaf primitives —
Skeleton and Separator — both consumed only through their JSX API (no raw
`radcn-skeleton`/`radcn-separator` class strings in fixtures or docs), each
with an exact shadcn v4 equivalent.

shadcn v4 mappings (vendored `registry/new-york-v4/ui/`, copied verbatim):

- Skeleton (`skeleton.tsx`): `animate-pulse rounded-md bg-accent`
- Separator (`separator.tsx`): `shrink-0 bg-border
  data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
  data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`

Both resolve through the Experiment 2 theme contract (`bg-accent`, `bg-border`)
plus Tailwind defaults (`animate-pulse`, `rounded-md`, `shrink-0`, the
`data-[orientation=...]` variants). The Separator component already sets
`data-orientation`, so shadcn's `data-[orientation=...]` utilities target it;
the `radcn-separator--${orientation}` class is dropped.

Scope limits: Skeleton and Separator only. No preflight. The
`data-radcn-skeleton`/`data-radcn-separator`/`data-orientation` attributes and
the Separator `role`/`aria-orientation` logic stay (non-visual/semantic hooks).
aspect-ratio, kbd, and label remain deferred (each needs a divergence
adaptation).

## Why both suites stay green (with one intended test update in each)

Separator — both suites assert only attributes plus the exact dimensions the
shadcn utilities produce:

- Fixture (`static-display.spec.ts`): `role`/`aria-orientation` attributes
  only — unaffected.
- Docs (`coverage.spec.ts`): `data-orientation` attributes plus
  `separatorHorizontal` `height: 1px` (shadcn `data-[orientation=horizontal]:h-px`)
  and `separatorVertical` `width: 1px` (shadcn `data-[orientation=vertical]:w-px`).
  Both computed values are exactly what the shadcn utilities emit, so they hold
  after migration (the `radcn-separator*` rules are removed, leaving the
  utilities uncontested). Vertical height changes from `align-self: stretch`
  to `h-full`, but no test asserts it.

Skeleton — width/height/border-radius assertions in both suites come from the
fixture/docs content's inline styles (`style="...border-radius:12px"`, `999px`,
explicit width/height), which win over utilities, so they are unaffected. The
ONE exception is `animation-name`: migrating to `animate-pulse` changes the
keyframe from `radcn-pulse` to Tailwind's `pulse` (verified:
`tailwindcss/theme.css` defines `--animate-pulse: pulse 2s ...` with
`@keyframes pulse`). Three assertions must be updated from `radcn-pulse` to
`pulse`:

- fixture `static-display.spec.ts`: the `expectSkeletonBlock` helper and a
  standalone skeleton check;
- docs `coverage.spec.ts:1515`: the skeleton-demo `animation-name` assertion.

These are intended, documented test updates reflecting the migration, not
regressions. Visual artifacts are not pixel-compared (the suites stayed green
through Badge's appearance change), so appearance shifts to shadcn parity are
acceptable.

## Changes

- `radcn/packages/radcn/src/components/skeleton.tsx`: replace
  `classes('radcn-skeleton', className)` with
  `classes('animate-pulse rounded-md bg-accent', className)`; keep
  `aria-hidden`, `data-radcn-skeleton`, `style`.
- `radcn/packages/radcn/src/components/separator.tsx`: replace
  `classes('radcn-separator', \`radcn-separator--${orientation}\`, className)`
  with the verbatim shadcn base string + `className`; keep `data-orientation`,
  `data-radcn-separator`, `role`, `aria-orientation`, `style`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove `.radcn-skeleton`, the
  now-orphaned `@keyframes radcn-pulse` (used only by `.radcn-skeleton`;
  verified), and `.radcn-separator`/`.radcn-separator--horizontal`/
  `.radcn-separator--vertical`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate from `tokens.css`
  with `export const radcnStyles = ${JSON.stringify(tokensCss)}\n`.
- `radcn/fixtures/tests/static-display.spec.ts`: update the two `animation-name`
  assertions (`expectSkeletonBlock` helper + standalone check) `radcn-pulse` →
  `pulse`.
- `radcn/apps/docs/tests/coverage.spec.ts`: update the `animation-name`
  assertion (line ~1515) `radcn-pulse` → `pulse`.

Expected git status for the result commit: `skeleton.tsx`, `separator.tsx`,
`tokens.css`, `index.ts`, fixture `static-display.spec.ts`, docs
`coverage.spec.ts`, this experiment file, and the README index + Learnings.
Both generated CSS files stay untracked.

## Verification

From the repo root:

1. `pnpm --dir radcn/fixtures/candidate-remix styles:build` and
   `pnpm --dir radcn/apps/docs styles:build` — both exit 0; each generated CSS
   contains `.animate-pulse`, `.bg-accent`, `.bg-border`, the
   `data-[orientation=...]` rules, and a `@keyframes pulse`.
2. `pnpm radcn:typecheck`, `pnpm fixtures:candidate:typecheck`,
   `pnpm --dir radcn/apps/docs typecheck` — all pass.
3. `index.ts` byte-identical to `tokens.css`; neither contains
   `radcn-skeleton`, `radcn-separator`, or `radcn-pulse`.
4. `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` — docs
   suite green (with the updated `pulse` assertion; separator dimension
   assertions still hold).
5. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts` — fixture
   suite green (1191; with the two updated `pulse` assertions).
6. `git diff --check` clean; `vendor/` untouched; both generated CSS untracked;
   only the expected files changed.

Pass criteria (all must hold):

- Skeleton and Separator render from Tailwind utilities (no
  `radcn-skeleton`/`radcn-separator` classes emitted); `data-*`/role hooks
  intact.
- BOTH suites green, with only the three intended `animation-name` updates.
- `tokens.css`/`index.ts` byte-identical; typechecks and hygiene clean.

Fail criteria (any → record Partial/Fail with specifics):

- Any spec regresses beyond the three intended assertion updates (e.g. a
  separator dimension assertion shifts).
- A migrated utility/keyframe is not generated by either `styles:build`.
- `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given only `AGENTS.md`, the issue README, this experiment
file, Experiments 5–6, and read access to referenced sources incl. vendored
shadcn)

Findings: none (no Blocker, Major, or Minor — one informational note that the
vertical separator height changes from `align-self: stretch` to `h-full`,
which no test asserts).

The reviewer verified the verbatim shadcn mappings; the tokens.css rules to
remove (incl. `@keyframes radcn-pulse` used only by `.radcn-skeleton`); the
`bg-accent`/`bg-border` tokens in the contract; that BOTH suites' relevant
assertions were accounted for — the three `animation-name: radcn-pulse`
assertions to update (fixture helper + standalone, docs line 1515), and
critically that the docs separator assertions (`height: 1px` horizontal,
`width: 1px` vertical) are exactly what shadcn's `h-px`/`w-px` produce so they
stay green; that skeleton dimension assertions are inline-driven; that no other
computed-style assertion on either component exists in either suite; that
Skeleton/Separator are JSX-only (no raw class strings); the index.ts formula;
and that verification runs both suites + all three typechecks. Verdict:
APPROVED.

Approval result: approved with no blockers.

## Result

**Result:** Pass

Skeleton and Separator are migrated; both suites are green. Verification:

1. Both `styles:build` runs exit 0; each generated CSS contains the migrated
   utilities (`animate-pulse`, `bg-accent`, `bg-border`, `w-px`, the
   `data-[orientation=...]` rules) and a `@keyframes pulse`.
2. `pnpm radcn:typecheck`, `pnpm fixtures:candidate:typecheck`, and
   `pnpm --dir radcn/apps/docs typecheck` all pass.
3. `index.ts` byte-identical to `tokens.css`; neither contains `radcn-skeleton`,
   `radcn-separator`, or `radcn-pulse` (the explanatory comment was reworded so
   the literal selectors do not linger as prose either).
4. Docs suite: **11 passed** — the skeleton `animation-name` assertion updated
   to `pulse`; the separator dimension assertions (`height: 1px` horizontal,
   `width: 1px` vertical) still hold via shadcn's `h-px`/`w-px`.
5. Fixture suite: **1191 passed** — the two skeleton `animation-name`
   assertions updated to `pulse`; all else unchanged.
6. `git diff --check` clean; `vendor/` untouched; both generated CSS untracked;
   exactly the six expected files changed.

No deviations from the approved design. The three `animation-name` assertions
were updated as planned; the in-CSS comment was simplified to avoid carrying
the literal selector tokens (a tidy-up, not a scope change).

## Conclusion

Two more leaf primitives are off bespoke CSS and onto shadcn v4 utilities, and
the dual-suite gate worked exactly as intended: the docs separator
computed-style assertions confirmed the shadcn utilities reproduce the prior
dimensions, and the skeleton keyframe rename was caught and updated in both
suites. The batch recipe (multiple clean leaf components per experiment) is
validated.

Learnings for later experiments (also copied to the issue README Learnings
digest):

- When a component's bespoke animation is replaced by a Tailwind `animate-*`
  utility, the keyframe NAME changes (`radcn-pulse` → `pulse`), and every
  `animation-name` assertion in BOTH suites must be updated. Search both specs.
- Removing a component's bespoke rule may orphan a shared-looking `@keyframes`;
  verify it has no other user before deleting (here `radcn-pulse` was used only
  by the skeleton rule).
- Prefer rewording in-CSS migration comments so they do not contain the literal
  removed selector tokens — it keeps "no longer present" greps unambiguous.
- shadcn `data-[orientation=...]` variants work directly against RadCN
  components that already emit `data-orientation`, so orientation-style
  components migrate cleanly without markup changes.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given only `AGENTS.md`, the issue README, this experiment
file, and read access to the working tree; not the implementer conversation)

Findings: none (no Blocker, Major, or Minor).

The reviewer independently re-ran both `styles:build` runs (confirming
`@keyframes pulse` and the migrated utilities in each), all three typechecks,
the docs suite (**11 passed**, separator `1px` dimension assertions and the
skeleton `pulse` assertion confirmed), and the fixture suite (**1191
passed**); verified the component sources emit verbatim shadcn utilities while
keeping the data/role hooks, the tokens.css rule/keyframe removals, the
reworded comment carrying no literal selectors, the byte-identical `index.ts`,
the three `animation-name` updates, the exact eight-file change set, both
generated CSS untracked, clean `git diff --check`/vendor, README Pass status
and Learnings entry, plan commit `d074410` present and result commit absent.
Verdict: APPROVED.

Approval result: approved with no blockers.
