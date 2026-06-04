# Experiment 1: Stage 1 Source and Native Control Foundation

## Description

Establish the real Stage 1 foundation for RadCN by creating the first component
source layout, install/copy shape, documentation shape, fixture integration, and
verification pattern. Use the smallest native form-control proof slice to prove
the foundation:

- `button`
- `input`
- `field`
- `label`
- `textarea`

This experiment should replace the existing candidate placeholders for this
slice with real RadCN source consumed by the Remix 3 candidate fixture app. It
should not try to complete all Stage 1 components in one step. The goal is to
make later Stage 1 ports repeatable.

The experiment must record reusable discoveries in the issue `## Learnings`
section when they affect later components.

## Changes

Create the first RadCN source and documentation structure. The exact layout may
change during implementation, but the final result must clearly answer where
RadCN source lives and how fixture apps consume it. A likely starting shape:

```text
packages/
└── radcn/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── components/
        │   ├── button.tsx
        │   ├── field.tsx
        │   ├── input.tsx
        │   ├── label.tsx
        │   └── textarea.tsx
        ├── styles/
        │   └── tokens.css
        └── utils/
            └── classes.ts
```

Add or update workspace metadata so the candidate Remix app can import RadCN
source through a workspace package rather than fixture-local placeholders.

Update candidate fixtures:

- remove or stop using placeholder candidate implementations for the proof
  slice;
- render the proof scenarios through RadCN source;
- add customization probe scenarios where needed.

Update reference fixtures only as needed to keep paired scenario coverage
aligned with shadcn/ui behavior.

Update shared scenarios if the first proof slice needs more coverage, for
example:

- `button/sizes`
- `button/custom-class`
- `button/form-submit`
- `field/required`
- `field/custom-error-token`
- `textarea/default`
- `textarea/disabled`

Do not add scenarios for components outside this experiment's proof slice.

Add documentation for the first real component source shape. This may be a
minimal markdown file under a future docs area or an issue-local design note if
the documentation site does not exist yet. The documentation must explain:

- how RadCN source is organized;
- how candidate fixtures import components;
- how class hooks, variants, tokens, and customization probes work for this
  proof slice;
- what install/copy workflow is assumed until the final CLI/site exists.

## Verification

The experiment passes if:

1. A real RadCN source package or equivalent source root exists for the proof
   slice.
2. The Remix 3 candidate app imports proof-slice components from RadCN source,
   not fixture-local placeholder components.
3. The proof-slice components cover `button`, `input`, `field`, `label`, and
   `textarea`. If implementation discovers a blocker that prevents `textarea`
   from landing with the rest of the proof slice, the experiment result must be
   recorded as `Partial` and explain the blocker.
4. Shared scenarios cover default, state, form, and customization probes needed
   to validate the proof slice.
5. `pnpm fixtures:artifacts` passes and captures paired artifacts for all shared
   scenarios.
6. Component-specific checks prove at least:
   - button native submit/reset behavior;
   - input label/help/error linkage through field;
   - disabled and invalid state semantics;
   - class or token customization changes the rendered result.
7. Documentation explains source layout, fixture imports, customization hooks,
   and the interim install/copy workflow.
8. Any reusable discovery needed by later components is added to the issue
   `## Learnings` section with evidence.
9. No files under `vendor/` are modified.
10. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 1. It creates the Stage 1 foundation and
first native form-control proof so the remaining static and native components
can be ported through follow-up experiments.

## Design Review

Independent AI design review was performed by subagent `Heisenberg`, which
approved the design after one fix.

The review initially found that `textarea` was optional in the proof slice. The
design was updated so `textarea` is required; if implementation discovers a
blocker that prevents `textarea` from landing with the rest of the proof slice,
the result must be recorded as `Partial` with the blocker explained.

The review found no remaining blocking issues. It verified that the experiment
starts Stage 1 without claiming to finish all Stage 1, establishes source
layout, install/copy documentation, fixture integration, and verification
foundation, requires the candidate app to consume real RadCN source instead of
fixture-local placeholders, requires artifacts and component-specific checks,
requires reusable discoveries to be recorded in `## Learnings`, prohibits vendor
edits, and keeps Issue 2 to one designed experiment.

Residual risks:

- The source layout is intentionally flexible, so implementation must make the
  final package and import shape concrete.
- Component-specific checks are described at the behavior level, so
  implementation should translate them into explicit Playwright or fixture tests
  rather than relying only on artifact capture.

## Result

**Result:** Pass

Experiment 1 created the first real RadCN source package at `packages/radcn`.
The package exports `button`, `input`, `field`, `label`, `textarea`, and
`styles`; the Remix 3 candidate fixture app consumes those exports through the
workspace package import `radcn` instead of fixture-local placeholder
components.

The proof slice now covers:

- `Button`
- `Input`
- `Field`
- `FieldDescription`
- `FieldError`
- `Label`
- `Textarea`

Shared paired scenarios were expanded for default, state, form, and
customization probes:

- `button/default`
- `button/variants`
- `button/disabled`
- `button/as-child-or-link`
- `button/sizes`
- `button/custom-class`
- `button/form-submit`
- `field/input-default`
- `field/input-invalid`
- `field/input-disabled`
- `field/required`
- `field/custom-error-token`
- `textarea/default`
- `textarea/disabled`

The candidate document loads the exported `radcnStyles` once, and
customization probes use stable `radcn-*` classes, `data-radcn-*` attributes,
and CSS variables. Source layout and the interim install/copy workflow are
documented in `docs/radcn-source.md`.

Verification run on 2026-06-04:

```bash
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm fixtures:reference:typecheck
pnpm fixtures:artifacts
```

All commands passed. `pnpm fixtures:artifacts` reported `38 passed`, including
the native-control checks for button submit/reset behavior, field ARIA linkage,
disabled and required semantics, and customization hooks. The artifact manifest
contains 34 paired screenshot entries across 17 scenarios, with the reference
app on port `4601` and the candidate app on port `4602`.

`git status --short -- vendor` was clean. Generated artifact and test-result
outputs remain ignored.

Warnings observed during verification:

- Node reported `[DEP0205] DeprecationWarning: module.register() is deprecated`
  during React Router and Playwright commands.
- The fixture web servers reported that `NO_COLOR` is ignored when
  `FORCE_COLOR` is set.

Neither warning blocked the experiment result.

Reusable discoveries were recorded in the issue `## Learnings` section:

- RadCN source starts as the `packages/radcn` workspace package.
- Stage 1 customization hooks use stable classes, data attributes, and CSS
  variables loaded once by the Remix document.
- The first `Input` proof is text-only, so later input-like components need an
  explicit input-type strategy.
- Screenshot capture is the baseline visual artifact, but automated visual
  approval still needs a pixel-diff threshold.
- Runtime CSS currently exists as both `tokens.css` and `radcnStyles`; future
  styling work should remove or automate that duplication before the token
  surface grows.

## Completion Review

Independent AI completion review was performed by subagent `Rawls`.

The reviewer returned **Pass** and confirmed that the experiment satisfies the
verification criteria:

- real RadCN package and exports exist under `packages/radcn`;
- candidate fixtures import from `radcn`, not fixture-local placeholders;
- shared scenarios cover default, state, form, and customization probes;
- Playwright checks cover native submit/reset, ARIA linkage, state semantics,
  and customization hooks;
- documentation explains source layout, imports, hooks/tokens, and interim
  install/copy workflow;
- learnings are recorded in the issue README;
- `vendor/` is clean;
- typecheck and artifact commands passed.

The reviewer identified three residual risks, all recorded as issue learnings:

- `Input` currently hardcodes `type="text"`; later ports need a generalized
  input-type strategy.
- Visual parity is captured as paired screenshots, but no pixel-diff threshold
  exists yet.
- CSS exists both as `tokens.css` and inline `radcnStyles`; future work should
  prevent drift between those sources.

## Conclusion

Experiment 1 establishes the Stage 1 foundation but does not complete Stage 1.
The next experiment should continue Stage 1 by porting the next small batch of
static/native components through the same package, fixture, artifact, and
review pattern.
