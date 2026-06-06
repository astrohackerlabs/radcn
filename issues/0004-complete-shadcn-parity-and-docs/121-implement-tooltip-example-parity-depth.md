# Experiment 121: Implement tooltip example parity depth

## Description

Experiment 120 audited the single direct upstream Tooltip example,
`tooltip-demo`, and found it partial. RadCN already has strong Tooltip package
behavior and generic positioned-overlay fixture coverage, but there is no
named docs, candidate fixture, or Playwright evidence for the exact upstream
Hover outline Button plus Add to library tooltip demo.

This experiment should resolve the final direct Tooltip example cluster by
adding named docs, fixture, and Playwright coverage for the upstream
composition while preserving RadCN's dependency-free browser-enhanced Tooltip
model:

- render `<Tooltip>`;
- map upstream `<TooltipTrigger asChild>` to a non-nested RadCN trigger styled
  as an outline Button;
- render visible trigger text `Hover`;
- render content text `Add to library`;
- prove hover and focus opening behavior;
- prove `role="tooltip"`, `aria-describedby`, hidden/open state, portal
  movement, arrow rendering, side and side-offset metadata, and public
  Tooltip/Button hooks;
- record dependency-divergence mapping for `"use client"`, React component
  props, Radix Tooltip primitives, `TooltipPrimitive.Provider`,
  `TooltipPrimitive.Root`, `TooltipPrimitive.Trigger`,
  `TooltipPrimitive.Portal`, `TooltipPrimitive.Content`,
  `TooltipPrimitive.Arrow`, provider `delayDuration = 0`,
  content `sideOffset = 0`, `asChild`, `className`, Tailwind utilities, `cn`,
  `data-slot`, `data-state`, `data-side`, custom tokens, and vendor source.

The implementation should not add React, React DOM, Radix, lucide-react,
class-variance-authority, Tailwind, or vendor dependencies. Package code should
change only if the current Tooltip primitive cannot represent the upstream
example's user-facing behavior, accessibility, browser behavior, or
author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/assets/entry.ts`.
  - Import `enhanceTooltip` from `radcn/tooltip`.
  - Scope docs Tooltip enhancement to the named `tooltip-demo` example, and
    keep existing docs enhancers unchanged.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Tooltip docs from generated seed content to a rich entry with a
    named `tooltip-demo` example.
  - Render stable docs hooks such as
    `data-radcn-docs-tooltip-family="tooltip-demo"`.
  - Render the exact upstream visible trigger text `Hover`, outline Button
    styling, content text `Add to library`, provider/default delay mapping,
    content sideOffset mapping, portal/arrow composition, and public
    Tooltip/Button hooks.
  - Include source snippet and mapping copy for React/Radix/asChild/
    Tailwind/`cn`/`className`/`data-slot`/`data-state`/`data-side`/
    custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`
  Add a named `tooltip/demo` fixture route that renders the exact upstream
  Hover/Add to library demo and preserves existing generic Tooltip scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/positioned-overlays.spec.ts`.
  - Verify `tooltip/demo` renders the named route, exact visible trigger,
    outline Button styling, exact content text, hidden initial state, hover
    opening, focus opening, `role="tooltip"`, `aria-describedby`, portal
    movement, arrow rendering, `data-side`, `data-side-offset`, public
    Tooltip/Button hooks, and no nested interactive button markup.
  - Keep existing generic Tooltip behavior tests unchanged unless selectors
    must be narrowed around the new named fixture.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/tooltip` page renders the named family hook,
    exact Hover/Add to library demo, source snippet, public hooks, live
    hover/focus behavior, portal/arrow evidence, and required
    dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/tooltip-example-inventory.md`.
  - Change `tooltip-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for Button-as-child mapping, outline styling,
    content text, provider/default delay, sideOffset, portal behavior, arrow,
    hover/focus behavior, dependency divergences, custom tokens, and vendor
    source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `tooltip` as a resolved example cluster only after the inventory row
    is `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible,
    record a `Partial` or `Fail` result with follow-up instead. Individual
    mechanics such as React/Radix/asChild/Tailwind/`data-slot` may still be
    documented as dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Tooltip example outcome in `## Learnings`.
  - Update the Experiment 121 index status from `Designed` to the recorded
    result.
  - Record that no in-scope unresolved example clusters remain after Tooltip
    is resolved.

Package code should otherwise stay unchanged. If a package change is needed,
record the reason in the result and prove it with package, fixture, and docs
tests.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture positioned overlay coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts positioned-overlays.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `tooltip-example-inventory.md` has
  exactly one direct upstream row, `tooltip-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "tooltip"`, `status = "resolved"`, and
  evidence for Experiment 120, Experiment 121, and
  `tooltip-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates `parity-inventory.md`; a
  deterministic check proves:
  - `tooltip` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for tooltip`;
  - no in-scope unresolved example clusters remain;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `tooltip/demo` renders the named route;
  - trigger visible text is exactly `Hover`;
  - trigger maps the upstream outline Button styling through public classes/
    hooks without nested button markup;
  - content text is exactly `Add to library`;
  - content is hidden initially and has `role="tooltip"`;
  - hover opens the tooltip and adds `aria-describedby` to the trigger;
  - focus opens the tooltip and blur closes it;
  - portal movement and arrow rendering are visible;
  - side and sideOffset metadata prove the upstream default mapping;
  - public Tooltip provider/root/trigger/portal/content/arrow hooks and Button
    classes are present;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or
    literal DOM equivalence with upstream.
- Docs coverage asserts the Tooltip page renders stable evidence for the named
  docs example, exact Hover/Add to library demo, source snippet, public hooks,
  live hover/focus behavior, portal/arrow evidence, Button-as-child mapping,
  and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 121 learning, Tooltip
  inventory reference, and no-in-scope-unresolved-clusters conclusion were
  recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over files changed by this experiment for
    forbidden React/Radix/lucide-react/cva/Tailwind/vendor source imports. The
    scan must include any changed files under `radcn/packages/radcn`,
    `radcn/apps/docs`, and `radcn/fixtures/candidate-remix`, but must not fail
    on unrelated pre-existing approved references;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `git status --short` shows only the expected Experiment 121 plan files
    before the plan commit:
    `issues/0004-complete-shadcn-parity-and-docs/121-implement-tooltip-example-parity-depth.md`
    and `issues/0004-complete-shadcn-parity-and-docs/README.md`.
  - before the result commit, `git status --short` shows only files expected
    from this implementation experiment.
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The implementation omits the exact upstream trigger text, outline Button
  styling, content text, hover/focus behavior, portal behavior, arrow, provider
  delay mapping, sideOffset mapping, or Button-as-child mapping decision.
- The implementation marks `tooltip-demo` covered without named docs, fixture,
  and Playwright evidence for the exact upstream Hover/Add to library demo.
- The implementation treats generic Tooltip behavior, Kbd Tooltip composition,
  InputGroup Tooltip composition, or chart tooltip evidence as sufficient
  direct `tooltip-demo` proof.
- The implementation treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The implementation adds React, Radix, lucide-react, cva, Tailwind, or vendor
  source dependencies.
- The implementation changes blocks or chart-gallery scope.

## Design Review

Reviewer: Dalton the 3rd (`019e9f03-7d18-71b0-8d27-adf2279efd66`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 121 as
`Designed`, the experiment has the required `Description`, `Changes`,
`Verification`, and `Design Review` sections, the scope is narrow to one
direct upstream `tooltip-demo` example, verification has concrete pass/fail
criteria and repo hygiene checks, vendor sources are treated as references
only, implementation has not started before the plan commit, and the technical
plan is likely to resolve the exact Hover/Add to library demo gap.

## Result

**Result:** Pass

Implemented named `tooltip-demo` parity across the docs app, candidate
fixture, Playwright coverage, and Issue 4 bookkeeping.

The docs app now scopes `enhanceTooltip` to
`data-radcn-docs-tooltip-family="tooltip-demo"` and renders a rich Tooltip
page with the upstream Hover/Add to library composition. The candidate fixture
now has a `tooltip/demo` route with the same composition. Fixture and docs
tests verify the outline Button styling on the trigger without nested button
markup, exact trigger text `Hover`, exact content text `Add to library`,
hidden initial state, hover and focus opening, Escape/blur closing,
`role="tooltip"`, `aria-describedby`, portal movement, arrow rendering,
`data-side="top"`, `data-side-offset="0"`, public Tooltip provider/root/
trigger/portal/content/arrow hooks, and source/mapping copy.

`tooltip-example-inventory.md` now marks `tooltip-demo` as `Covered`,
`resolved-clusters.json` records `tooltip` as resolved with Experiment 120,
Experiment 121, and inventory evidence, and the regenerated
`parity-inventory.md` reports no unresolved in-scope parity clusters.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts positioned-overlays.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
node deterministic check for tooltip-example-inventory Covered row
node deterministic check for tooltip resolved-clusters evidence
node deterministic check for regenerated parity inventory closed state
node deterministic README learning check
node deterministic source import scan over changed docs/fixture source files
node deterministic package manifest forbidden dependency scan
git diff --exit-code -- pnpm-lock.yaml
git ls-files vendor | sed '/^vendor\/.gitignore$/d'
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
git status --short
```

All checks passed. The Playwright runs emitted the existing Node
`module.register()` deprecation warning and `NO_COLOR`/`FORCE_COLOR` warnings;
they did not fail the runs.

## Conclusion

Tooltip direct example parity is complete for the current Issue 4 scope. No
package API change was required: the existing `TooltipProvider`, `Tooltip`,
`TooltipTrigger`, `TooltipPortal`, `TooltipContent`, `TooltipArrow`, and
`enhanceTooltip` primitives already represented the upstream user-facing
behavior. The regenerated parity inventory reports no unresolved in-scope
parity clusters, so the next experiment should close Issue 4 with a final
verification pass.

## Completion Review

Reviewer: Ramanujan the 3rd (`019e9f09-a5eb-7f60-be44-fac5131f6861`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the implementation matches the approved
scope, docs enhancement is scoped to `tooltip-demo`, the docs and candidate
fixture render the Hover/Add to library composition, the experiment has
`Result` and `Conclusion`, the Issue 4 README marks Experiment 121 as `Pass`
with the no-unresolved-clusters learning, verification and hygiene checks
passed, Playwright warnings were only the recorded Node/color warnings, vendor
cleanliness was checked, and the result commit had not been made before
review.
