# Experiment 115: Implement switch example parity depth

## Description

Experiment 114 audited the single direct upstream Switch example,
`switch-demo`, and found it partial. RadCN already has the package API and
behavior substrate for Switch, but there is no named docs, fixture, and
Playwright evidence for the exact upstream demo composition.

This experiment should resolve the direct Switch example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free native checkbox switch
model:

- render a row equivalent to
  `<div className="flex items-center space-x-2">`;
- render `<Switch id="airplane-mode" />` with default unchecked state and
  default size;
- render `<Label htmlFor="airplane-mode">Airplane Mode</Label>` as RadCN
  `Label for="airplane-mode">Airplane Mode</Label>`;
- prove public wrapper/input/thumb hooks, `role="switch"` accessibility,
  native label activation, checked/unchecked `data-state`, `data-size`, and
  browser check behavior;
- record dependency-divergence mapping for `"use client"`, React component
  props, `React.ComponentProps<typeof SwitchPrimitive.Root>`, Radix Switch
  primitives, `SwitchPrimitive.Root`, `SwitchPrimitive.Thumb`,
  `size = "default"`, Tailwind utilities, `cn`, `className`, `data-slot`,
  `data-size`, `data-state`, custom tokens, Label `htmlFor`, and vendor
  source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Switch primitive cannot represent the upstream example's
user-facing behavior, accessibility, browser behavior, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Switch docs from generic generated content to a named
    `switch-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-switch-family="switch-demo"` and
    `data-radcn-docs-switch-row` if useful for tests.
  - Render the exact upstream id `airplane-mode`, label text `Airplane Mode`,
    default unchecked state, default size, and row layout mapping.
  - Include exact source snippet and mapping copy for React/Radix/defaults/
    Label/Tailwind/`cn`/`className`/`data-slot`/`data-size`/`data-state`/
    custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
  Add a named `switch/demo` fixture route that renders the exact upstream
  composition and preserves existing `switch/default`, `switch/checked`,
  `switch/disabled`, `switch/custom-token`, and
  `switch/form-submit-reset` scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/native-state.spec.ts`.
  - Verify `switch/demo` renders the named route, exact id, label text, row
    layout, wrapper/input/thumb hooks, default unchecked state, default size,
    `role="switch"`, native checkbox type, accessible name, label activation,
    checked/unchecked metadata updates, and browser check behavior.
  - Keep existing disabled, form, and custom-token tests unchanged unless a
    selector needs to be narrowed around the new named fixture.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/switch` page renders the named family hook,
    row layout evidence, exact id and label text, public Switch hooks,
    `role="switch"`, default unchecked state, `data-size`, source snippet, and
    required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/switch-example-inventory.md`.
  - Change `switch-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for id/label mapping, row layout, unchecked default
    state, default size, public hooks, role switch behavior, label activation,
    dependency divergences, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `switch` as a resolved example cluster only after the inventory row is
    `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible,
    record a `Partial` or `Fail` result with follow-up instead. Individual
    mechanics such as React/Radix/Tailwind/`data-slot` may still be documented
    as dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Switch example outcome in `## Learnings`.
  - Update the Experiment 115 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Switch is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Switch primitive cannot meet the upstream example's user-facing behavior,
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

- Fixture native-state coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-state.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `switch-example-inventory.md` has exactly one direct upstream row,
  `switch-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "switch"`, `status = "resolved"`, and
  evidence for Experiment 114, Experiment 115, and
  `switch-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `switch` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for switch`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `switch/demo` renders the named route;
  - the row maps upstream `flex items-center space-x-2` with class/style
    evidence;
  - the input has id `airplane-mode`, role `switch`, type `checkbox`,
    accessible name `Airplane Mode`, and default unchecked state;
  - the Label uses `for="airplane-mode"` and native label activation toggles
    the switch;
  - wrapper, input, and thumb expose public hooks;
  - wrapper and input expose `data-state="unchecked"` initially and update to
    `checked` after browser interaction;
  - wrapper and input expose `data-size="default"`;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or literal
    DOM equivalence with upstream.
- Docs coverage asserts the Switch page renders stable evidence for the named
  docs example, exact id and label text, source snippet, public hooks,
  default unchecked/default size metadata, row layout, role switch behavior,
  label activation, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 115 learning, Switch
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
  - `git status --short` shows only the expected Experiment 115 implementation
    files before the result commit:
    `issues/0004-complete-shadcn-parity-and-docs/115-implement-switch-example-parity-depth.md`,
    `issues/0004-complete-shadcn-parity-and-docs/README.md`,
    `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`,
    `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`,
    `issues/0004-complete-shadcn-parity-and-docs/switch-example-inventory.md`,
    `radcn/apps/docs/app/content/components.tsx`,
    `radcn/apps/docs/tests/coverage.spec.ts`,
    `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`,
    `radcn/fixtures/scenarios/index.ts`, and
    `radcn/fixtures/tests/native-state.spec.ts`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits exact id `airplane-mode`, label text `Airplane Mode`,
  row layout, default unchecked state, default size, public hooks, role switch
  behavior, label activation, or browser check behavior.
- The implementation marks `switch-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream composition.
- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Wegener the 3rd (`019e9ecd-fc2c-76d2-aa18-48fa512623a2`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 115 as
`Designed`, the experiment has `Description`, `Changes`, `Verification`, and
`Design Review`, scope is focused on the `switch-demo` gap from Experiment 114,
implementation has not started before the plan commit, verification has
concrete typecheck, Playwright, deterministic inventory, resolved-cluster,
repo hygiene, lockfile, vendor, and status checks, vendor state is clean, the
issue scope excludes upstream blocks and chart-gallery examples while
retaining ordinary `radcn/chart`, and the technical plan directly addresses
the missing named docs, fixture, and Playwright proof.
