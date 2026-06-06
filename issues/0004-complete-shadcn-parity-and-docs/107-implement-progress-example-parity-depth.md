# Experiment 107: Implement progress example parity depth

## Description

Experiment 106 audited the single direct upstream Progress example,
`progress-demo`, and found it partial. RadCN already has the package substrate
and generic behavior coverage for Progress, but there is no named docs,
fixture, and Playwright evidence for the exact upstream timed demo.

This experiment should resolve the direct Progress example cluster by adding
named docs, candidate fixture, scoped browser enhancement, and Playwright
coverage for the exact upstream behavior while preserving RadCN's
dependency-free model:

- render a Progress demo that starts at value `13`;
- update that demo to value `66` after roughly 500ms without React;
- map upstream `className="w-[60%]"` to an explicit 60% wrapper width;
- prove native progress semantics and public wrapper/native/track/indicator
  hooks;
- prove indicator width is 13% before the timer and 66% after the timer;
- record dependency-divergence mapping for `"use client"`, React `useState`,
  React `useEffect`, React component props, Radix Progress primitives,
  `ProgressPrimitive.Root`, `ProgressPrimitive.Indicator`, `className`,
  Tailwind utilities, `cn`, `data-slot`, `bg-primary/20`, `bg-primary`,
  `transition-all`, transform-based indicator movement, browser behavior,
  custom tokens, and vendor source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Progress primitive cannot represent the upstream example's
user-facing behavior, accessibility, browser behavior, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Progress docs from generic generated content to a named
    `progress-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-progress-family="progress-demo"` and any timer/value
    hooks needed by docs tests.
  - Render Progress initially at value `13` with a 60% wrapper width.
  - Include the exact source snippet and mapping copy for React/Radix/state/
    timer/width/Tailwind/`cn`/`className`/`data-slot`/transform/custom-token/
    vendor mechanics.
- Update docs browser behavior in `radcn/apps/docs/app/assets/entry.ts`.
  - Add a scoped dependency-free enhancer for
    `[data-radcn-docs-progress-family="progress-demo"]` that updates the
    native `<progress>` value and indicator width from `13` to `66` after
    roughly 500ms.
  - Guard against double initialization.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
  Add a named `progress/demo` fixture route that renders the upstream timed
  composition and preserves existing `default`, `indeterminate`, and
  `custom-token` scenarios.
- Update candidate browser behavior in
  `radcn/fixtures/candidate-remix/app/assets/entry.ts`.
  - Add a scoped dependency-free enhancer for the named `progress/demo`
    fixture that updates from `13` to `66` after roughly 500ms.
  - Guard against double initialization.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/native-state.spec.ts`.
  - Verify `progress/demo` renders the named route, native progress element,
    wrapper/track/indicator hooks, accessible label, `max="100"`, initial
    `value="13"`, initial indicator width `13%`, 60% wrapper width mapping,
    delayed `value="66"`, delayed indicator width `66%`, and determinate
    state.
  - Keep existing default, indeterminate, and custom-token coverage.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/progress` page renders the named family hook,
    native progress element, wrapper/track/indicator hooks, initial and delayed
    values/indicator widths, 60% wrapper width mapping, source snippet, and
    required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/progress-example-inventory.md`.
  - Change `progress-demo` from `Partial` to `Covered` only after docs,
    fixture, scoped browser behavior, and Playwright evidence exists.
  - Record final decisions for timed browser behavior, value mapping, 60% width
    mapping, native progress semantics, indicator width versus upstream
    transform, dependency divergences, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `progress` as a resolved example cluster only after the inventory row
    is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Progress example outcome in `## Learnings`.
  - Update the Experiment 107 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Progress is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Progress primitive cannot meet the upstream example's user-facing behavior,
accessibility, browser behavior, and author-facing modifiability. If package
code changes, add package-level verification and record why the audit
assumption changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture coverage for native state passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-state.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `progress-example-inventory.md` has exactly one direct upstream row,
  `progress-demo`, and the row is `Covered` or an explicitly recorded
  intentional divergence.

- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "progress"`, `status = "resolved"`, and
  evidence for Experiment 106, Experiment 107, and
  `progress-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `progress` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for progress`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `progress/demo` renders Progress wrapper, native progress, track, and
    indicator hooks;
  - accessible label and native `max`/`value` semantics are present;
  - initial value is `13` and indicator width is `13%`;
  - after roughly 500ms, value is `66` and indicator width is `66%`;
  - wrapper width maps upstream `w-[60%]` to 60%;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or literal
    DOM equivalence with upstream transform styling.
- Docs coverage asserts the Progress page renders stable evidence for the named
  docs example, exact timed behavior, source snippet, public hooks, width
  mapping, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 107 learning, Progress
  inventory reference, and next generated recommendation were recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over `radcn/packages/radcn`,
    `radcn/apps/docs`, and `radcn/fixtures/candidate-remix` for forbidden
    React/Radix/Tailwind/vendor imports;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits initial `13`, delayed `66`, 500ms browser behavior, 60%
  width mapping, native progress semantics, public hooks, or accessible behavior
  listed above.
- The implementation marks `progress-demo` covered without docs, fixture,
  scoped browser behavior, and Playwright evidence for the exact upstream timed
  demo.
- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Sagan the 3rd (`019e9e81-0df9-7472-9b66-011ad90434c7`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 107 as
`Designed`, the experiment has required design sections, scope is narrow and
follows Experiment 106's conclusion, verification includes concrete pass/fail
criteria and hygiene checks, implementation had not started before the plan
commit, vendor checks are clean, and the modified blocks/chart-gallery scope is
respected while retaining `radcn/chart` package scope.
