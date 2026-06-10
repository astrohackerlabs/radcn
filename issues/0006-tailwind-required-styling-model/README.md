+++
status = "open"
opened = "2026-06-06"
+++

# Issue 6: Make Tailwind the Required Styling Model

## Goal

Make Tailwind the required styling model for RadCN components, the docs site,
fixtures, and the local installation flow.

All RadCN component styles should be expressed through Tailwind utilities and
theme tokens, following the shadcn/ui model as closely as Remix 3 allows.

## Background

RadCN is a port of shadcn/ui to Remix 3. shadcn/ui's component model assumes
Tailwind: component source is copied into the consuming app with Tailwind
utility classes, project configuration records Tailwind CSS paths and theme
choices, and installation can update Tailwind-related files.

Current RadCN work diverged from that model in places. The Remix 3 package and
docs app currently rely heavily on bespoke `radcn-*` classes, CSS variables,
and hand-authored CSS. Some demos contain Tailwind-looking utility classes, but
the docs app does not consistently run Tailwind as the source of truth for
those styles. That is the wrong long-term direction.

Tailwind is a requirement for RadCN. The library should not offer a non-Tailwind
styling path, and generated components should not depend on custom RadCN CSS
classes for their primary styling.

RadCN will use Tailwind v4, the latest Tailwind major version for this project.

## Decisions

- Tailwind is required.
- Tailwind v4 is the required Tailwind version family.
- RadCN should declare Tailwind as a peer dependency where the RadCN component
  package or generated component contract requires the consuming app to provide
  it.
- All component styling should be Tailwind utility classes and Tailwind-backed
  theme tokens.
- RadCN should not support a plain CSS or no-Tailwind component styling mode.
- `components.json` should retain Tailwind configuration fields, adapted for
  Remix 3 and Tailwind v4.
- Existing bespoke `radcn-*` component classes are migration debt. They should
  be removed or reduced to non-styling hooks only when a concrete behavior
  needs a stable selector.
- Data attributes may remain for state, behavior, and test selectors, but they
  should not replace Tailwind for visual styling.

## Scope

In scope:

- Decide and document the Tailwind v4 integration model for Remix 3.
- Update RadCN package metadata so Tailwind is treated as a required peer where
  appropriate.
- Update the docs app to run Tailwind as part of its styling pipeline.
- Update fixtures so Tailwind-backed classes render consistently.
- Replace bespoke component CSS with Tailwind utilities in generated/component
  source.
- Keep shadcn-style CSS variable theme tokens where they are part of Tailwind
  theming.
- Update Issue 5 installation-flow assumptions so generated `components.json`
  and registry items require Tailwind.
- Verify that representative components render correctly with Tailwind and do
  not rely on removed bespoke CSS.

Out of scope:

- Supporting a non-Tailwind styling mode.
- Publishing any package to npm.
- Reopening or modifying closed historical issues.
- Adding blocks or charts back into scope.

## Analysis

This issue cuts across existing package code, fixtures, docs, and installation
planning. The work should be staged carefully because replacing bespoke CSS with
Tailwind affects visual parity, docs screenshots, and future generated source.

The likely migration path is:

- audit where styling currently comes from;
- establish the Tailwind v4 Remix 3 integration;
- add Tailwind to package metadata and app/fixture toolchains;
- define the RadCN Tailwind theme/token contract;
- migrate one representative component and prove the strategy;
- migrate the remaining primitive components in grouped experiments;
- update Issue 5 so the installation flow writes Tailwind-aware config and
  registry payloads.

The issue is not complete until Tailwind is the actual styling source, not just
a dependency listed in package manifests.

## Key Questions

- What is the correct Tailwind integration point for a standard Remix 3 app?
- Which `radcn-*` classes are pure styling debt, and which should remain as
  stable behavior/test hooks?
- How should the docs app preserve its current visual identity while moving
  component styling to Tailwind?

## Experiments

- [Experiment 1: Prove the Tailwind v4 integration point for native Remix 3](01-prove-tailwind-v4-asset-pipeline.md)
  — **Designed**

## Completion Criteria

This issue is complete when:

- Tailwind v4 is documented as required for RadCN;
- package metadata declares Tailwind as a peer dependency wherever RadCN
  components or generated source require it;
- the docs app uses Tailwind as its styling pipeline;
- fixtures render Tailwind utility classes through real Tailwind output;
- component visual styling is expressed through Tailwind utilities and
  Tailwind-backed theme tokens;
- bespoke `radcn-*` styling classes are removed or reduced to non-visual hooks;
- Issue 5's installation-flow documentation reflects Tailwind as required;
- verification proves representative installed/generated components render
  correctly with Tailwind and fail loudly if Tailwind is absent.
