# Experiment 78: Evacuate docs and fixture CSS from package styles

## Description

Experiment 77 cleared the modal/drawer residual cluster. The only remaining
Issue 6 migration cluster from the Experiment 73 map is docs/fixture/demo CSS
that still lives in the package stylesheet.

This experiment removes docs-only, fixture-only, and raw demo presentation
selectors from `radcn/packages/radcn/src/styles/tokens.css` and replaces their
effects with Tailwind-scanned utilities at the owning docs/fixture call sites.
Package CSS may keep theme tokens, keyframes, portal hosts, dependency-free
positioning/drag mechanics, and documented component behavior glue; it must not
keep demo presentation classes.

The main target selector families are:

- all `.radcn-fixture-custom-*` selectors and custom fixture descendant rules;
- non-custom fixture helpers:
  `.radcn-fixture-rounded-button`, `.radcn-fixture-aspect-media`,
  `.radcn-fixture-navigation-panel`, and `.radcn-fixture-panel`;
- docs/demo helpers:
  `.radcn-chart-docs-grid`, `.radcn-chart-example-card`,
  `.radcn-chart-tooltip-demo`, and `.radcn-data-table-recipe`;
- raw breadcrumb composition helpers:
  `.radcn-breadcrumb-trigger`, `.radcn-breadcrumb-truncate`,
  `.radcn-breadcrumb-responsive-desktop`,
  `.radcn-breadcrumb-responsive-mobile`, and
  `.radcn-breadcrumb-drawer-links`;
- `.radcn-sr-only`, replaced by Tailwind `sr-only`;
- carousel demo/example helpers:
  selected slide-card border, slide-card appearance, multiple/size/spacing/demo
  sizing classes, status, example stack, plugin note, custom-carousel fixture
  variables, and their responsive media rules;
- direction demo helpers:
  `.radcn-direction-sample`, `.radcn-direction-nested`, and
  `.radcn-fixture-custom-direction`.

Carousel control positioning (`.radcn-carousel-previous`,
`.radcn-carousel-next`, and vertical control overrides) is explicitly out of
scope for the migration body because it is component-owned positioning glue, not
docs/fixture/demo presentation. It may remain only if the final closure audit
classifies it as acceptable non-surface positioning glue; if the audit rejects
that classification, this experiment must stop as `Partial` and name a follow-up
component migration instead of closing Issue 6.

This experiment should also update stale comments in `tokens.css` that say
fixture/demo classes are intentionally kept bespoke. After this experiment,
`tokens.css` should contain no `radcn-fixture-*`, chart docs helper, data-table
recipe, breadcrumb raw helper, `radcn-sr-only`, carousel demo helper, or
direction demo helper rules.

## Changes

- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`:
  - remove the targeted docs/fixture/demo selector families;
  - keep theme variables, keyframes, portal host rules, positioning behavior,
    and documented parent-child behavior glue that belongs to package runtime;
  - update comments so they no longer describe demo classes as kept bespoke;
  - regenerate `styles/index.ts` from `tokens.css`.
- `radcn/fixtures/candidate-remix/app/fixtures/**/*.tsx`:
  - replace custom fixture classes and demo helper classes with Tailwind
    utilities, inline custom properties, or local scanned utility combinations;
  - replace `radcn-sr-only` with `sr-only`;
  - preserve marker classes only when tests or docs explicitly assert them,
    while ensuring their styling no longer comes from package CSS.
- `radcn/fixtures/reference-react-router/app/fixtures/**/*.tsx`:
  - keep screenshot/reference parity for carousel, aspect media, direction, and
    related raw fixture compositions by adding equivalent local classes or
    utilities where the reference fixture participates in artifact comparison.
- `radcn/apps/docs/app/content/**/*.tsx` and related docs source:
  - replace docs/demo helper classes with Tailwind utilities at the call sites;
  - replace `radcn-sr-only` with `sr-only`;
  - preserve documented class names only when the content intentionally teaches
    a raw composition API, and update docs text if a class is no longer part of
    the recommended example.
- `issues/0006-tailwind-required-styling-model/README.md`:
  - update the experiment index status when the result is recorded;
  - record durable closure learnings;
  - if the experiment passes and the closure audit is clean, close Issue 6 with
    a conclusion and regenerated issue index.

## Verification

1. Build style output:
   - `pnpm --dir radcn/fixtures/candidate-remix styles:build`
   - `pnpm --dir radcn/apps/docs styles:build`
2. Typecheck:
   - `pnpm radcn:typecheck`
   - `pnpm fixtures:candidate:typecheck`
   - `pnpm fixtures:reference:typecheck`
   - `pnpm --dir radcn/apps/docs typecheck`
3. Run selector-removal checks against `tokens.css`; each must produce no
   matches:
   - `rg -n "radcn-fixture-|radcn-chart-docs-grid|radcn-chart-example-card|radcn-chart-tooltip-demo|radcn-data-table-recipe|radcn-sr-only" radcn/packages/radcn/src/styles/tokens.css`
   - `rg -n "radcn-breadcrumb-trigger|radcn-breadcrumb-truncate|radcn-breadcrumb-responsive-|radcn-breadcrumb-drawer-links" radcn/packages/radcn/src/styles/tokens.css`
  - `rg -n "radcn-carousel-slide-card|reference-carousel-slide-card|radcn-carousel--multiple|radcn-carousel--size|radcn-carousel--spacing|radcn-carousel--plugin|radcn-carousel--api|radcn-carousel--demo|radcn-carousel-status|radcn-carousel-example-stack|radcn-carousel-plugin-note|radcn-fixture-custom-carousel" radcn/packages/radcn/src/styles/tokens.css`
   - `rg -n "radcn-direction-sample|radcn-direction-nested|radcn-fixture-custom-direction" radcn/packages/radcn/src/styles/tokens.css`
4. Run a remaining-style audit and classify all remaining selectors in
   `tokens.css` as closure-acceptable:
   - `rg -n "^(\\.|\\[data-radcn|@media|@keyframes|  \\.)" radcn/packages/radcn/src/styles/tokens.css`
5. Confirm `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` are in
   sync with the JSON-stringify formula.
6. Confirm docs/fixture call sites still compile Tailwind utilities for the
   moved styles by checking representative generated selectors/properties for:
   - `sr-only`;
   - breadcrumb trigger/truncate/responsive utilities;
   - carousel slide-card/status/example sizing utilities;
   - chart/data-table/direction demo utilities.
7. Focused Playwright gates:
   - `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/fixture-artifacts.spec.ts --grep "breadcrumb|carousel|chart|data-table|direction|button|aspect-ratio|navigation-menu|resizable"`
   - `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`
8. Full fixture artifact gate:
   - `pnpm fixtures:artifacts`
9. Hygiene:
   - `git diff --check`
   - `git status --short`
   - `git diff --name-only | rg '^vendor/'` must produce no matches.
   - `git -C vendor/shadcn-ui status --short`,
     `git -C vendor/remix status --short`, and
     `git -C vendor/react-router status --short` must produce no matches.
   - `scripts/build-issues-index.sh` must run before closing the issue.

Pass criteria:

- Package `tokens.css` contains no docs-only, fixture-only, or raw demo
  presentation selectors from the target families.
- Remaining `tokens.css` selectors are only theme/token foundation, keyframes,
  portal hosts, dependency-free positioning/drag mechanics, or documented
  behavior/layout glue with a concrete RadCN reason.
- Docs and fixtures render the moved presentation through Tailwind-scanned
  utilities or explicit inline custom properties at the owning call sites.
- Candidate and reference fixture artifact comparison remains green.
- Docs Playwright coverage remains green.
- Issue 6 is closed only if the final remaining-style audit proves the closure
  standard; otherwise the result must stay `Partial` and name the next debt.

Fail criteria:

- Any target selector family remains in `tokens.css` without a documented
  closure-acceptable reason.
- Moved docs/fixture styles are not generated by Tailwind or regress visual
  artifact parity.
- The experiment removes a marker class or data hook that existing tests,
  docs, or behavior depend on.
- The issue is closed without a clean final selector audit and completed
  verification gates.

## Design Review

Reviewer: Newton (`019ebe52-1fca-7910-918b-c0265dcdb4bd`), fresh Codex
subagent with `fork_context: false`.

Findings:

- Major: the initial plan left Carousel control positioning as "migrate if
  practical", which made scope discretionary and risked blurring the final
  closure audit.
- Minor: the targeted Carousel removal check omitted the paired
  `reference-carousel-slide-card` selector that currently appears beside
  `radcn-carousel-slide-card`.

Fixes:

- Made Carousel control positioning explicitly out of scope for the migration
  body, with a guard that the experiment must stop as `Partial` if the final
  audit does not accept it as non-surface positioning glue.
- Added `reference-carousel-slide-card` to the targeted Carousel removal check.

Approval result: approved for implementation after these plan cleanups. The
reviewer found no blockers and confirmed the README link, required sections,
verification gates, hygiene checks, vendor checks, and closure guard are present.

## Result

**Result:** Pass

The docs-only, fixture-only, and raw demo presentation selectors targeted by
this experiment were removed from `radcn/packages/radcn/src/styles/tokens.css`.
Their styling now lives at the owning docs and fixture Tailwind v4 call sites.
Marker classes remain only where tests, docs, or examples still need stable
hooks.

The implementation also replaced the remaining `radcn-sr-only` usage in RadCN
package components, fixture sources, docs content, and affected tests with
Tailwind's `sr-only` utility. The package stylesheet still contains theme
tokens, keyframes, portal hosts, positioning/drag mechanics, and documented
behavior glue. The final remaining-style audit classifies Carousel previous/next
placement and vertical overrides as acceptable component-owned positioning glue,
not docs or fixture presentation CSS.

Verification:

- `pnpm --dir radcn/fixtures/candidate-remix styles:build` passed.
- `pnpm --dir radcn/apps/docs styles:build` passed.
- `pnpm radcn:typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm fixtures:reference:typecheck` passed.
- `pnpm --dir radcn/apps/docs typecheck` passed.
- Targeted `rg` removal checks against `tokens.css` for fixture helpers, chart
  docs helpers, data-table recipe helpers, breadcrumb raw helpers,
  `radcn-sr-only`, carousel demo helpers, and direction demo helpers produced
  no matches.
- `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` were confirmed in
  sync with the JSON-stringify export formula.
- Representative generated CSS checks found Tailwind output for `sr-only`,
  breadcrumb trigger/truncate helpers, carousel slide/status helpers,
  chart/demo helpers, direction samples, and fixture panel helpers in the docs
  and candidate fixture generated stylesheets.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/fixture-artifacts.spec.ts --grep "breadcrumb|carousel|chart|data-table|direction|button|aspect-ratio|navigation-menu|resizable"`
  passed: 214 passed.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` passed:
  11 passed.
- `pnpm fixtures:artifacts` passed: 1191 passed.
- `git diff --check` passed.
- `git diff --name-only | rg '^vendor/'` produced no matches.
- `git -C vendor/shadcn-ui status --short`,
  `git -C vendor/remix status --short`, and
  `git -C vendor/react-router status --short` produced no output.

## Conclusion

Experiment 78 clears the last remaining Issue 6 migration cluster from the
Experiment 73 audit. Package CSS no longer owns docs/fixture/demo presentation
selectors, and component visual styling is now Tailwind utility driven with
package CSS reduced to the remaining non-visual foundation and behavior glue.

Issue 6 can close after completion review approves this result.

## Completion Review

Reviewer: Godel (`019ebe66-ed62-7473-babf-4fd115729334`), fresh Codex subagent
with `fork_context: false`.

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Evidence checked:

- Experiment 78 has `Result` and `Conclusion`.
- Verification, hygiene, vendor checks, and test evidence are recorded.
- Issue 6 marks Experiment 78 `Pass`, records durable learnings, has a
  conclusion, and is closed in `issues/README.md`.
- App-owned Tailwind utilities replace package-owned demo/fixture CSS in the
  docs and candidate fixture Tailwind sources.
- The latest commit at review time was still the plan commit
  `37cf703 Plan demo CSS evacuation`; no result commit had been made.
- The reviewer reran cheap checks: `git diff --check`, vendor cleanliness,
  targeted `tokens.css` removal checks, `radcn-sr-only` absence, representative
  generated CSS selector checks, and the `tokens.css`/`styles/index.ts` sync
  check.

Approval result: approved for result commit. No fixes were required.
