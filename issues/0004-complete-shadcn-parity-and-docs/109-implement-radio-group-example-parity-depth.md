# Experiment 109: Implement radio-group example parity depth

## Description

Experiment 108 audited the single direct upstream Radio Group example,
`radio-group-demo`, and found it partial. RadCN already has the package
substrate and generic behavior coverage for Radio Group, but there is no named
docs, fixture, and Playwright evidence for the exact upstream three-option
composition.

This experiment should resolve the direct Radio Group example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free native-radio model:

- render `Default`, `Comfortable`, and `Compact` rows;
- map upstream `defaultValue="comfortable"` to the `comfortable` native radio
  being checked in server-rendered markup;
- preserve ids `r1`, `r2`, and `r3` where safe, or explicitly namespace them in
  docs while proving label associations;
- preserve values `default`, `comfortable`, and `compact`;
- map upstream `flex items-center gap-3` row layout to explicit class/style
  evidence;
- prove native radio behavior, radiogroup semantics, public group/item/input/
  indicator hooks, checked state, label associations, and selection changes;
- record dependency-divergence mapping for `"use client"`, React component
  props, Radix Radio Group primitives, lucide `CircleIcon`, `className`,
  Tailwind utilities, `cn`, `data-slot`, disabled/invalid behavior, browser
  radio behavior, custom tokens, Label composition, and vendor source.

The implementation should not add React, Radix, lucide, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Radio Group primitives cannot represent the upstream
example's user-facing behavior, accessibility, browser behavior, or
author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Radio Group docs from generic generated content to a named
    `radio-group-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-radio-group-family="radio-group-demo"` and any row hooks
    needed by docs tests.
  - Render the exact three-option upstream composition with the `comfortable`
    option checked.
  - Include exact source snippet and mapping copy for React/Radix/lucide/
    defaultValue/Label/Tailwind/`cn`/`className`/`data-slot`/custom-token/
    vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
  Add a named `radio-group/demo` fixture route that renders the exact upstream
  composition and preserves existing `default`, `disabled`, `invalid`,
  `custom-token`, and `form-submit-reset` scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/native-state.spec.ts`.
  - Verify `radio-group/demo` renders the named route, radiogroup role,
    public group/item/input/indicator hooks, exact labels, values, checked
    `comfortable` item, label associations, row layout, and native selection
    changes.
  - Keep existing default, disabled, invalid, form, and custom-token coverage.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/radio-group` page renders the named family
    hook, exact labels/values/checked state, public hooks, label associations,
    row layout evidence, native selection behavior, source snippet, and
    required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/radio-group-example-inventory.md`.
  - Change `radio-group-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for default value mapping, label associations,
    ids/values, row layout, native radio behavior, dependency divergences,
    disabled/invalid behavior, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `radio-group` as a resolved example cluster only after the inventory
    row is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Radio Group example outcome in `## Learnings`.
  - Update the Experiment 109 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Radio Group is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Radio Group primitives cannot meet the upstream example's user-facing behavior,
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
  `radio-group-example-inventory.md` has exactly one direct upstream row,
  `radio-group-demo`, and the row is `Covered` or an explicitly recorded
  intentional divergence.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "radio-group"`, `status = "resolved"`, and
  evidence for Experiment 108, Experiment 109, and
  `radio-group-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `radio-group` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for radio-group`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `radio-group/demo` renders Radio Group root, item, input, and indicator
    hooks;
  - root has `role="radiogroup"` and the expected group name;
  - labels are exactly `Default`, `Comfortable`, and `Compact`;
  - input ids and values map the upstream `r1`/`r2`/`r3` and
    `default`/`comfortable`/`compact` values, or documented namespaced ids with
    exact label associations;
  - `comfortable` is checked initially;
  - selecting another option updates native checked state;
  - row layout maps upstream `flex items-center gap-3`;
  - no test depends on React state, Radix internals, lucide, Tailwind, `cn`, or
    literal DOM equivalence with upstream.
- Docs coverage asserts the Radio Group page renders stable evidence for the
  named docs example, exact options, source snippet, public hooks, row layout,
  native selection behavior, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 109 learning, Radio Group
  inventory reference, and next generated recommendation were recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over the files changed by this experiment
    for forbidden React/Radix/lucide-react/Tailwind/vendor source imports. The
    scan must include any changed files under `radcn/packages/radcn`,
    `radcn/apps/docs`, and `radcn/fixtures/candidate-remix`, but must not fail
    on unrelated pre-existing approved references such as docs `lucide-static`
    icons or fixture `vendor/remix` asset mappings;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits exact labels, ids/values, checked comfortable state, row
  layout, native radio behavior, public hooks, or accessible label associations
  listed above.
- The implementation marks `radio-group-demo` covered without docs, fixture,
  and Playwright evidence for the exact upstream three-option composition.
- The implementation adds React, Radix, lucide, Tailwind,
  class-variance-authority, or vendor dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Bohr the 3rd (`019e9e91-d0cf-7e52-872e-7062f76fc836`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: The initial dependency/scope pass criteria required a forbidden
  import scan over all of `radcn/apps/docs` and
  `radcn/fixtures/candidate-remix`, but those trees already contain approved
  existing references such as docs `lucide-static` icons and fixture
  `vendor/remix` asset mappings. Fixed by narrowing the source import scan to
  files changed by Experiment 109 while keeping manifest, lockfile, and vendor
  checks broad.
- Major: none.
- Minor: none.

Re-review approved. The reviewer confirmed the prior blocker is resolved, the
scan is now scoped to files changed by Experiment 109, unrelated existing
`lucide-static` and `vendor/remix` references will not fail the check, and no
new blocker was introduced.
