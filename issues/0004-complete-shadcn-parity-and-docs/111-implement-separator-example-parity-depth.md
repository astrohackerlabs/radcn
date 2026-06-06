# Experiment 111: Implement separator example parity depth

## Description

Experiment 110 audited the single direct upstream Separator example,
`separator-demo`, and found it partial. RadCN already has the package API and
behavior substrate for Separator, but there is no named docs, fixture, and
Playwright evidence for the exact upstream demo composition.

This experiment should resolve the direct Separator example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free model:

- render heading text `Radix Primitives`;
- render description text `An open-source UI component library.`;
- render one horizontal separator that maps upstream `className="my-4"` to
  explicit class/style evidence;
- render the inline row labels `Blog`, `Docs`, and `Source`;
- render two vertical separators between those labels;
- map upstream `flex h-5 items-center space-x-4 text-sm` row layout to
  explicit class/style evidence;
- prove public `data-radcn-separator` hooks, `data-orientation`, decorative
  default behavior, semantic opt-in behavior or explicit existing semantic
  evidence, horizontal/vertical sizing, and browser accessibility behavior;
- record dependency-divergence mapping for `"use client"`, React component
  props, Radix Separator primitive, `SeparatorPrimitive.Root`, `className`,
  Tailwind utilities, `cn`, `data-slot`, `data-orientation`, decorative versus
  semantic separators, custom tokens, and vendor source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Separator primitive cannot represent the upstream example's
user-facing behavior, accessibility, browser behavior, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Separator docs from generic generated content to a named
    `separator-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-separator-family="separator-demo"`,
    `data-radcn-docs-separator-horizontal`, `data-radcn-docs-separator-row`,
    and `data-radcn-docs-separator-vertical` if useful for tests.
  - Render the exact upstream user-facing text and three-label row.
  - Include exact source snippet and mapping copy for React/Radix/defaults/
    decorative/semantic/Tailwind/`cn`/`className`/`data-slot`/
    `data-orientation`/custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/index.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add a named `separator/demo` fixture route that renders the exact upstream
  composition and preserves existing `separator/orientations` semantic
  coverage. The current dispatcher routes `separator` to
  `renderSeparatorFixture()` in `static-display.tsx`, so update the dispatcher
  to pass the fixture and update `renderSeparatorFixture(fixture)` to branch on
  `demo` versus `orientations`.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/native-state.spec.ts`.
  - Verify `separator/demo` renders the named route, exact heading,
    description, row labels, one horizontal separator, two vertical separators,
    `data-orientation` values, decorative default behavior, row layout
    evidence, and horizontal/vertical sizing.
  - Verify semantic separator behavior through `decorative={false}` either in
    the named fixture or a clearly scoped existing/new fixture assertion.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/separator` page renders the named family hook,
    exact text, one horizontal and two vertical separators, public hooks,
    `data-orientation` values, row layout evidence, source snippet, and
    required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/separator-example-inventory.md`.
  - Change `separator-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for orientation mapping, decorative default,
    semantic opt-in behavior, row layout, text preservation, dependency
    divergences, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `separator` as a resolved example cluster only after the inventory row
    is `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible, record
    a `Partial` or `Fail` result with follow-up instead. Individual mechanics
    such as React/Radix/Tailwind/`data-slot` may still be documented as
    dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Separator example outcome in `## Learnings`.
  - Update the Experiment 111 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Separator is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Separator primitive cannot meet the upstream example's user-facing behavior,
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
  `separator-example-inventory.md` has exactly one direct upstream row,
  `separator-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "separator"`, `status = "resolved"`, and
  evidence for Experiment 110, Experiment 111, and
  `separator-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `separator` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for separator`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `separator/demo` renders the exact heading and description;
  - row labels are exactly `Blog`, `Docs`, and `Source`;
  - there is exactly one horizontal separator and exactly two vertical
    separators in the named demo;
  - every separator exposes `data-radcn-separator` and `data-orientation`;
  - the named demo separators preserve decorative default behavior;
  - semantic separator behavior is covered with `decorative={false}` and
    proves `role="separator"` plus `aria-orientation`;
  - row layout maps upstream `flex h-5 items-center space-x-4 text-sm`;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or literal
    DOM equivalence with upstream.
- Docs coverage asserts the Separator page renders stable evidence for the
  named docs example, exact text, source snippet, public hooks,
  horizontal/vertical orientations, row layout, and required dependency-
  divergence/mapping copy.
- A deterministic README check proves the Experiment 111 learning, Separator
  inventory reference, and next generated recommendation were recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over files changed by this experiment for
    forbidden React/Radix/Tailwind/vendor source imports. The scan must include
    any changed files under `radcn/packages/radcn`, `radcn/apps/docs`, and
    `radcn/fixtures/candidate-remix`, but must not fail on unrelated
    pre-existing approved references;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `git status --short` shows only the expected Experiment 111 implementation
    files before the result commit:
    `issues/0004-complete-shadcn-parity-and-docs/111-implement-separator-example-parity-depth.md`,
    `issues/0004-complete-shadcn-parity-and-docs/README.md`,
    `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`,
    `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`,
    `issues/0004-complete-shadcn-parity-and-docs/separator-example-inventory.md`,
    `radcn/apps/docs/app/content/components.tsx`,
    `radcn/apps/docs/tests/coverage.spec.ts`,
    `radcn/fixtures/candidate-remix/app/fixtures/index.tsx`,
    `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`,
    `radcn/fixtures/scenarios/index.ts`, and
    `radcn/fixtures/tests/native-state.spec.ts`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits exact text, horizontal separator, two vertical
  separators, row labels, row layout, orientation hooks, decorative behavior,
  semantic behavior, public hooks, or accessibility behavior listed above.
- The implementation marks `separator-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream composition.
- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Kepler-111 (`019e9ea8-ecaf-7320-925d-6d7099971d5d`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 111 as
`Designed`, the experiment has `Description`, `Changes`, and `Verification`
with no `Result`, the plan follows Experiment 110's partial conclusion,
implementation has not started before the plan commit, the fixture plan targets
the actual Separator dispatcher through `static-display.tsx`, pass criteria
require `separator-demo` to become `Covered`, the final `git status --short`
expected-file whitelist is present, dependency scanning is scoped to changed
implementation files, repo hygiene and vendor checks are present, and the
modified blocks/chart-gallery scope remains respected while retaining
`radcn/chart`.
