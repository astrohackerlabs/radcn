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
- Per-component `--radcn-*` custom-token override hooks (e.g.
  `--radcn-badge-bg`) are dropped for shadcn parity (decision by the
  maintainer, 2026-06-10). Migrated components emit only Tailwind utilities;
  callers override styling through the `class` prop (e.g. `bg-[#4f46e5]`) or
  inline styles, exactly as shadcn does via `cn()`/`className`. Fixtures and
  tests that exercised a `--radcn-*` override are rewritten to the
  class/inline form as each component migrates. This intentionally removes a
  RadCN divergence and coordinates with Issue 7.

## Scope

In scope:

- Fix the failing fixture Playwright tests observed during this issue's work:
  `tests/dialog.spec.ts` ("edit profile" and "share link" compositions) and
  `tests/drawer.spec.ts` ("desktop Dialog and mobile Drawer branches"), which
  time out clicking dialog/drawer close buttons that Playwright reports as
  never becoming stable. These surfaced during Issue 6 baseline runs and are
  owned by this issue: the styling migration must land on a fully green
  fixture suite, and every experiment that touches fixture styling must leave
  the full suite passing.
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
  — **Pass**
- [Experiment 2: Define the RadCN Tailwind theme/token contract](02-define-tailwind-theme-token-contract.md)
  — **Pass**
- [Experiment 3: Fix the dialog close-button positioning collision](03-fix-dialog-close-button-collision.md)
  — **Pass**
- [Experiment 4: Establish the candidate fixture's global Tailwind pipeline](04-global-tailwind-pipeline-candidate-fixture.md)
  — **Pass**
- [Experiment 5: Migrate Badge to Tailwind utilities](05-migrate-badge-to-tailwind-utilities.md)
  — **Pass**
- [Experiment 6: Establish the docs app Tailwind pipeline and repair the docs gate](06-docs-app-tailwind-pipeline.md)
  — **Designed**

## Learnings

> Update this section after every experiment. When an experiment is concluded,
> copy its durable learnings here (newest experiment last) so the cumulative
> knowledge lives in one place and informs the next experiment. Per-experiment
> Conclusion sections remain the source of record; this is the running digest.

From Experiment 1 (Tailwind v4 integration point for native Remix 3):

- The integration point for a native Remix 3 app is a standalone
  `@tailwindcss/cli` build step that compiles a Tailwind source file into a
  generated CSS asset, which `createAssetServer()` serves like any other
  source CSS, linked via `routes.assets.href(...)`. No Vite, React Router,
  PostCSS runner, or Tailwind config file is needed.
- `@import 'tailwindcss/theme'` + `@import 'tailwindcss/utilities'` without
  preflight works and leaves existing pages untouched. Enabling preflight is a
  deliberate, page-visible decision deferred to component-migration work.
- Dev DX is rebuild-on-demand: `dev`/`start` run `styles:build` once before the
  server boots. A style change during development needs a re-run (or a future
  `--watch`, which would require enabling the `@parcel/watcher` build script
  currently pinned to `false` in `pnpm-workspace.yaml`).

From Experiment 2 (Tailwind theme/token contract):

- Consumers import three layers in order: `tailwindcss/theme`,
  `radcn/theme.css`, `tailwindcss/utilities`. The contract is package-owned and
  consumed via the `radcn/theme.css` package export.
- `@theme inline` emits no `--color-*` variables; it substitutes the referenced
  `var(--token)` directly into utilities. Tests and tooling must look for the
  substituted `var(--token)` form in utility rules, not for `--color-*`.
- Defining `--radius-*` re-scales every `rounded-*` utility application-wide.
  Component migrations must re-baseline any assertion that relied on Tailwind
  default radii (and the same caution applies if the contract ever defines
  spacing or font tokens).
- The served CSS is not byte-identical to the CLI output (the asset server
  recompiles it); string assertions against served CSS must tolerate cosmetic
  normalization such as attribute-selector quote changes.

From Experiment 3 (dialog close-button collision fix):

- `tokens.css` and `src/styles/index.ts` (`radcnStyles`) are byte-identical and
  synced by hand with no build script. The reliable way to edit RadCN styles
  is: edit `tokens.css`, then regenerate `index.ts` with
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n`. Keeping them in
  sync is mandatory or runtime pages will not update.
- A shared base class that bakes in one variant's geometry is exactly the
  bespoke-CSS smell the Tailwind migration should remove; utilities make such
  distinctions explicit at the call site.
- The full fixture suite (`pnpm exec playwright test -c
  radcn/fixtures/playwright.config.ts`, ~2.4 min, 1191 tests) is the
  authoritative regression gate for any styling change; run it before recording
  a styling experiment's result.

From Experiment 4 (global Tailwind pipeline in the candidate fixture):

- The document shell is the single place the generated stylesheet is linked;
  per-page `head` props must not re-link it (Playwright strict-mode locators
  treat duplicate links as errors).
- The generated Tailwind `<link>` is ordered BEFORE the inline `radcnStyles`
  `<style>` so bespoke `.radcn-*` rules win cascade ties during migration;
  inline styles win over both. Consequently, migrating a component means
  REMOVING its bespoke rule for a property, not merely adding a utility — the
  utility cannot take effect while a later-ordered `.radcn-*` rule still sets
  that property.
- The generated stylesheet reflects classes found across the package source
  (via `@source`); it stays gitignored build output regenerated by
  `styles:build` (which `dev`/`start` run automatically).

From Experiment 5 (first component migration — Badge):

- Per-component migration recipe (proven on Badge): copy the shadcn v4 utility
  strings verbatim from the vendored registry into the component as a `base`
  string + a `Record<Variant, string>`; keep `data-*` hooks and href→`<a>`
  rendering; delete the component's `radcn-*` visual rules from `tokens.css`;
  regenerate `index.ts`; translate any fixture custom-token override to a
  direct class rule using longhand properties (which win the cascade tie
  because `radcnStyles` is ordered after the Tailwind link).
- Fixture inline styles and direct fixture-class rules win over component
  utilities, so inline-pinned scenarios need no change; only `--radcn-*`-hook
  scenarios need translating to the class-override form.
- shadcn variant strings use `accent`/`ring` tokens, opacity modifiers
  (`/90`, `/50`), and `dark:` states; all generate correctly against the
  Experiment 2 contract + Tailwind defaults, so later components can adopt the
  full shadcn strings without trimming.
- Components referenced by raw `radcn-*` class strings elsewhere (e.g. Button
  via `radcn-button` in many fixtures) cannot simply drop their bespoke CSS;
  their migration must also migrate those call sites or keep a compatibility
  alias. Prefer migrating leaf components used only via their JSX API first.

## Completion Criteria

This issue is complete when:

- the full fixture Playwright suite passes, including the dialog and drawer
  specs named in the scope;
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
