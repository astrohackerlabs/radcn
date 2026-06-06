# Experiment 113: Implement slider example parity depth

## Description

Experiment 112 audited the single direct upstream Slider example,
`slider-demo`, and found it partial. RadCN already has the package substrate
for Slider, but there is no named docs, fixture, and Playwright evidence for
the exact upstream demo composition.

This experiment should resolve the direct Slider example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free native range model:

- map upstream `defaultValue={[50]}` to RadCN scalar `defaultValue={50}`;
- preserve `max={100}` and `step={1}`;
- map upstream `className={cn("w-[60%]", className)}` to explicit RadCN
  `class` and `style="width: 60%"` evidence;
- preserve author-facing customization equivalent to upstream prop spread;
- prove public root/input/track/range/thumb hooks, value/min/max/step data,
  horizontal orientation, native range input behavior, percent visual state,
  and browser value updates;
- record dependency-divergence mapping for `"use client"`, React component
  props, `React.ComponentProps<typeof Slider>`, React `useMemo`, Radix Slider
  primitives, `SliderPrimitive.Root`, `SliderPrimitive.Track`,
  `SliderPrimitive.Range`, `SliderPrimitive.Thumb`, single-value array to
  scalar value, Tailwind utilities, `cn`, `className`, `data-slot`, custom
  tokens, and vendor source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Slider primitive cannot represent the upstream example's
user-facing behavior, accessibility, browser behavior, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Slider docs from generic generated content to a named
    `slider-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-slider-family="slider-demo"` and
    `data-radcn-docs-slider-width="60"` if useful for tests.
  - Render a Slider with default value 50, max 100, step 1, horizontal
    orientation, and a 60% width mapping.
  - Include exact source snippet and mapping copy for React/Radix/defaults/
    single-value-array/Tailwind/`cn`/`className`/prop-spread/`data-slot`/
    custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/slider.tsx`
  Add a named `slider/demo` fixture route that renders the exact upstream
  composition and preserves existing Slider scenarios for default, value,
  disabled, step, custom-token, and form-submit-reset behavior.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/slider.spec.ts`.
  - Verify `slider/demo` renders the named route with root/input/track/range/
    thumb hooks, value 50, min 0, max 100, step 1, horizontal orientation,
    native `input[type="range"]`, 60% width mapping, percent visual state, and
    browser update behavior.
  - Keep existing disabled, keyboard, form, and custom-token tests unchanged
    unless a selector needs to be narrowed around the new named fixture.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/slider` page renders the named family hook,
    public Slider hooks, value/min/max/step/orientation metadata, 60% width
    evidence, source snippet, and required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/slider-example-inventory.md`.
  - Change `slider-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for the scalar value mapping, max/step/default min,
    width mapping, prop-spread customization, public hooks, percent state,
    dependency divergences, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `slider` as a resolved example cluster only after the inventory row is
    `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible,
    record a `Partial` or `Fail` result with follow-up instead. Individual
    mechanics such as React/Radix/Tailwind/`data-slot` may still be documented
    as dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Slider example outcome in `## Learnings`.
  - Update the Experiment 113 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Slider is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Slider primitive cannot meet the upstream example's user-facing behavior,
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

- Fixture Slider coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts slider.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `slider-example-inventory.md` has exactly one direct upstream row,
  `slider-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "slider"`, `status = "resolved"`, and
  evidence for Experiment 112, Experiment 113, and
  `slider-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `slider` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for slider`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `slider/demo` renders the named route;
  - the root exposes `data-radcn-slider`, `data-value="50"`,
    `data-min="0"`, `data-max="100"`, `data-step="1"`, and
    `data-orientation="horizontal"`;
  - the native input exposes `data-radcn-slider-input`, `type="range"`,
    value `50`, min `0`, max `100`, and step `1`;
  - track, range, and thumb expose public hooks;
  - the demo maps upstream `w-[60%]` to explicit 60% width evidence;
  - range/thumb visual state uses `--radcn-slider-percent` or equivalent
    style evidence for 50%;
  - changing the input updates `data-value`, native input value, and visual
    percent state;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or
    literal DOM equivalence with upstream.
- Docs coverage asserts the Slider page renders stable evidence for the named
  docs example, source snippet, public hooks, value/min/max/step/orientation
  metadata, 60% width mapping, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 113 learning, Slider
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
  - `git status --short` shows only the expected Experiment 113 implementation
    files before the result commit:
    `issues/0004-complete-shadcn-parity-and-docs/113-implement-slider-example-parity-depth.md`,
    `issues/0004-complete-shadcn-parity-and-docs/README.md`,
    `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`,
    `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`,
    `issues/0004-complete-shadcn-parity-and-docs/slider-example-inventory.md`,
    `radcn/apps/docs/app/content/components.tsx`,
    `radcn/apps/docs/tests/coverage.spec.ts`,
    `radcn/fixtures/candidate-remix/app/fixtures/slider.tsx`,
    `radcn/fixtures/scenarios/index.ts`, and
    `radcn/fixtures/tests/slider.spec.ts`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits exact value 50, max 100, step 1, 60% width, public
  hooks, percent state, native input semantics, or browser update behavior.
- The implementation marks `slider-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream composition.
- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Euclid the 3rd (`019e9ebe-a75b-7be3-84c9-dd0137cfe692`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the design is narrow to the single
`slider-demo` parity gap, the Issue 4 README links Experiment 113 as
`Designed`, the experiment includes `Description`, `Changes`, `Verification`,
and `Design Review`, no implementation files were modified before the plan
commit, verification includes concrete typecheck, Playwright, deterministic
inventory, resolved-cluster, README, dependency, lockfile, vendor, diff, and
status checks, and the modified Issue 4 scope excludes upstream blocks and
chart-gallery examples while retaining the ordinary `radcn/chart` package
scope.

## Result

**Result:** Pass

Implemented named `slider-demo` parity across the docs site, candidate fixture,
fixture Playwright coverage, docs Playwright coverage, inventory bookkeeping,
and generated parity inventory.

The docs page now has a rich Slider example that renders value 50, min 0, max
100, step 1, horizontal orientation, `class="w-[60%]"`, `style="width:60%;"`,
public root/input/track/range/thumb hooks, and the `--radcn-slider-percent`
visual state. The docs source and copy record the Remix 3 mappings for
upstream React props, `React.ComponentProps<typeof Slider>`, React `useMemo`,
Radix Slider primitives, single-value array defaults, Tailwind utilities,
`cn`, `className`, prop-spread customization, `data-slot`, custom tokens, and
vendor source.

The candidate fixture now has `slider/demo` with the same value, width, and
public-hook evidence. `slider.spec.ts` proves the named route, native range
semantics, percent state at 50%, update behavior to 80%, width evidence, and
the existing Slider behavior scenarios. `slider-example-inventory.md` marks
`slider-demo` as `Covered`, `resolved-clusters.json` marks `slider` resolved,
and the regenerated parity inventory now recommends example parity for
`switch`.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts slider.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
node deterministic check for slider-example-inventory row count and Covered outcome
node deterministic check for resolved-clusters slider evidence
node deterministic check that slider left unresolved examples and the next recommendation is switch
rg -n 'Experiment 113|slider-example-inventory|example parity for `switch`|example parity for switch' issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --exit-code -- pnpm-lock.yaml
git diff --check
node deterministic tracked-vendor-source check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
node deterministic forbidden import/dependency scan over changed implementation files and relevant manifests
git status --short
```

All checks passed. The Playwright runs reported 5 passed tests for
`slider.spec.ts` and 5 passed tests for docs `coverage.spec.ts`. The README
check was first typed with unsafe shell quoting around `` `switch` ``, which
made the shell attempt command substitution; the same check was rerun with
single quotes and passed.

## Conclusion

Slider direct example parity is complete. The current in-scope unresolved
example clusters are `switch`, `table`, `tabs`, and `tooltip`. The next
experiment should audit upstream `switch-demo` parity before implementation.

## Completion Review

Reviewer: Tesla the 3rd (`019e9ec3-b1d3-7fd2-9fed-2777af766f02`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The recorded verification run omitted the explicit
  `node scripts/audit-shadcn-parity.mjs` command required by this experiment's
  verification section, even though the inventory was regenerated and matched
  the expected diff. Fixed by adding that command to the recorded verification
  run.

Approved. The reviewer confirmed typechecks passed, fixture Slider Playwright
passed 5/5, docs coverage Playwright passed 5/5, `slider-demo` is marked
`Covered` with docs, fixture, and Playwright evidence, the Issue 4 README
marks Experiment 113 `Pass` and records Slider learnings plus the next
`switch` recommendation, `git diff --check`, lockfile, tracked-vendor, and
nested vendor checks passed, the result commit had not been made before
review, and blocks/chart-gallery examples remain out of scope while the
ordinary `radcn/chart` package scope is retained.
