# Experiment 2: Stage 1 Static Display Primitives

## Description

Port the next cohesive Stage 1 batch: low-risk static and display primitives
that should render without component-owned client behavior.

This experiment covers:

- `alert`
- `aspect-ratio`
- `badge`
- `card`
- `empty`
- `kbd`
- `separator`
- `skeleton`
- `spinner`

The goal is to prove that RadCN can port static shadcn/ui surfaces as Remix 3
components with stable slots, variants, semantic markup, CSS variables, fixture
coverage, artifact capture, customization probes, and documentation. This
experiment should not start Stage 2 interaction work, and it should not port
unrelated Stage 1 components such as `table`, `pagination`, `breadcrumb`,
`button-group`, `item`, `typography`, or `native-select`.

The experiment must record reusable discoveries in the issue `## Learnings`
section when they affect later components.

## Changes

Add RadCN source files under `packages/radcn/src/components/` for the covered
components:

- `alert.tsx`
- `aspect-ratio.tsx`
- `badge.tsx`
- `card.tsx`
- `empty.tsx`
- `kbd.tsx`
- `separator.tsx`
- `skeleton.tsx`
- `spinner.tsx`

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for this batch. The final style organization may
change, but it must preserve the Experiment 1 public-hook pattern:

- stable `radcn-*` classes for public component parts;
- stable `data-radcn-*` attributes for fixture and customization probes;
- CSS variables for themeable color, border, radius, spacing, and animation
  values where appropriate.

Update candidate fixtures so the Remix 3 app imports the new components from
`radcn`, not fixture-local placeholders.

Update React Router reference fixtures with equivalent shadcn/ui-inspired
examples for the same scenarios. Reference fixtures may use local reference
markup/styles instead of importing vendored source directly, but they must
preserve the visible and semantic surfaces needed for comparison.

Add shared scenarios only for this batch. Expected coverage:

- `alert/default`
- `alert/destructive`
- `alert/custom-token`
- `aspect-ratio/default`
- `aspect-ratio/custom-ratio`
- `badge/variants`
- `badge/custom-class`
- `card/default`
- `card/compact`
- `card/custom-token`
- `empty/default`
- `empty/icon`
- `kbd/default`
- `separator/orientations`
- `skeleton/default`
- `spinner/default`
- `spinner/custom-size`

Add component-specific Playwright checks for semantics and customization, not
only screenshot capture. The checks should prove at least:

- `Alert` renders with `role="alert"` and variant/customization hooks.
- `AspectRatio` enforces the requested ratio with stable layout dimensions.
- `Badge` exposes variant and customization hooks.
- `Card` exposes slot hooks for header/title/description/content/footer/action.
- `Empty` exposes slot hooks for media/title/description/content and any action
  area used by the fixture, without relying only on screenshot capture.
- `Kbd` renders a real `<kbd>` element, or records an approved divergence, with
  stable class and data hooks.
- `Separator` exposes horizontal and vertical orientation semantics.
- `Spinner` has `role="status"` and an accessible loading name.
- `Skeleton` exposes an animation or loading-state hook without creating an
  accessibility tree distraction.

Update documentation for static/display primitives. This can extend
`docs/radcn-source.md` or add a focused static primitive note. It must explain:

- static component source and export shape;
- slot and variant hook conventions;
- when a component should be server-rendered instead of hydrated;
- how the spinner and skeleton expose loading semantics;
- how fixture customization probes should target classes, attributes, and CSS
  variables.

## Verification

The experiment passes if:

1. RadCN source exists for all nine covered components.
2. `packages/radcn` exports all nine components from package subpaths and the
   root index.
3. The Remix 3 candidate app imports all covered components from RadCN source.
4. Shared scenarios include default, variant/state, layout, loading, and
   customization probes for this batch.
5. Reference and candidate fixture routes exist for every shared scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for all
   shared scenarios.
10. Component-specific checks prove the semantics and customization behavior
    listed in `## Changes`.
11. Documentation explains source layout, slots, variants, server-rendering,
    loading semantics, and customization hooks for this batch.
12. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 1. It should leave a clearer static
primitive pattern for the remaining Stage 1 static components.

## Design Review

Independent AI design review was performed by subagent `Hilbert`, which
approved the design after one fix.

The review initially found that `empty` and `kbd` were included in the
experiment scope but were missing from the explicit component-specific
verification bullets. The design was updated to require Playwright checks that:

- `Empty` exposes media/title/description/content and action-area hooks without
  relying only on screenshot capture.
- `Kbd` renders a real `<kbd>` element, or records an approved divergence, with
  stable class and data hooks.

The reviewer then returned **Pass**. The review confirmed that the experiment is
coherent, limited to the next Stage 1 static/display batch, has concrete
verification for all nine named components, avoids vendor edits, preserves the
one-experiment-at-a-time workflow, and does not prematurely design future
experiments.
