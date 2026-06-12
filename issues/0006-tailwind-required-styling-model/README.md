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
- Tailwind preflight (the global base reset) IS enabled for RadCN (decision by
  the maintainer, 2026-06-10), reversing the Experiments 1–8 deferral. shadcn
  component utility strings assume preflight (notably `border-style: solid`,
  `box-sizing: border-box`, and margin/heading/list resets), so bordered
  components require it. It is added to both the candidate fixture and docs
  Tailwind pipelines in a dedicated experiment, ordered before `radcnStyles`
  so bespoke rules still win cascade ties; the resulting computed-style churn
  across both suites is triaged and updated in that experiment.
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
  — **Pass**
- [Experiment 7: Migrate Skeleton and Separator to Tailwind utilities](07-migrate-skeleton-separator-to-tailwind.md)
  — **Pass**
- [Experiment 8: Migrate Kbd to Tailwind utilities](08-migrate-kbd-to-tailwind.md)
  — **Pass**
- [Experiment 9: Enable Tailwind preflight](09-enable-tailwind-preflight.md)
  — **Pass**
- [Experiment 10: Migrate Empty to Tailwind utilities](10-migrate-empty-to-tailwind.md)
  — **Pass**
- [Experiment 11: Migrate Label to Tailwind utilities](11-migrate-label-to-tailwind.md)
  — **Pass**
- [Experiment 12: Declare Tailwind as a peer dependency](12-declare-tailwind-peer-dependency.md)
  — **Pass**
- [Experiment 13: Align Issue 5 install-flow docs with Tailwind-required](13-align-issue5-install-flow-tailwind-required.md)
  — **Pass**
- [Experiment 14: Migrate AspectRatio to Tailwind utilities](14-migrate-aspect-ratio-to-tailwind.md)
  — **Pass**
- [Experiment 15: Migrate Card to Tailwind utilities](15-migrate-card-to-tailwind.md)
  — **Fail** (reverted; surfaced the missing default border-color contract —
  see Experiment 16)
- [Experiment 16: Add the default border-color base rule](16-default-border-color-base.md)
  — **Pass**
- [Experiment 17: Re-attempt the Card migration](17-re-attempt-card-migration.md)
  — **Pass**
- [Experiment 18: Migrate Input and Textarea to Tailwind utilities](18-migrate-input-textarea-to-tailwind.md)
  — **Pass**
- [Experiment 19: Migrate Alert to Tailwind utilities](19-migrate-alert-to-tailwind.md)
  — **Pass**
- [Experiment 20: Migrate Table to Tailwind utilities](20-migrate-table-to-tailwind.md)
  — **Pass**
- [Experiment 21: Migrate Progress to Tailwind utilities](21-migrate-progress-to-tailwind.md)
  — **Pass**
- [Experiment 22: Migrate Spinner to Tailwind utilities](22-migrate-spinner-to-tailwind.md)
  — **Pass**
- [Experiment 23: Add the animation-utilities foundation (tw-animate-css)](23-add-animation-utilities-foundation.md)
  — **Pass**
- [Experiment 24: Migrate Tooltip (content + arrow) to Tailwind utilities](24-migrate-tooltip-to-tailwind.md)
  — **Pass**
- [Experiment 25: Migrate Popover content surface to Tailwind utilities](25-migrate-popover-to-tailwind.md)
  — **Pass**
- [Experiment 26: Migrate HoverCard content surface to Tailwind utilities](26-migrate-hover-card-to-tailwind.md)
  — **Pass**
- [Experiment 27: Migrate Dialog overlay + content surface to Tailwind utilities](27-migrate-dialog-to-tailwind.md)
  — **Pass**
- [Experiment 28: Migrate AlertDialog overlay + content surface to Tailwind utilities](28-migrate-alert-dialog-to-tailwind.md)
  — **Pass**
- [Experiment 29: Migrate Sheet overlay + content surface to Tailwind utilities](29-migrate-sheet-to-tailwind.md)
  — **Pass**
- [Experiment 30: Migrate Drawer overlay to Tailwind + retire the dead modal keyframes](30-migrate-drawer-overlay-to-tailwind.md)
  — **Pass**
- [Experiment 31: Button migration — scope analysis and decomposition plan](31-migrate-button-to-tailwind.md)
  — **Pass** (scope analysis; Button decomposed into follow-up experiments — no
  code change)
- [Experiment 32: Migrate Avatar surfaces to Tailwind utilities](32-migrate-avatar-to-tailwind.md)
  — **Pass**
- [Experiment 33: Migrate ScrollArea surfaces to Tailwind utilities](33-migrate-scroll-area-to-tailwind.md)
  — **Pass**
- [Experiment 34: Migrate Tabs surfaces to Tailwind utilities](34-migrate-tabs-to-tailwind.md)
  — **Pass**
- [Experiment 35: Migrate Accordion surfaces to Tailwind utilities](35-migrate-accordion-to-tailwind.md)
  — **Pass**
- [Experiment 36: Migrate Collapsible surfaces to Tailwind utilities](36-migrate-collapsible-to-tailwind.md)
  — **Pass**
- [Experiment 37: Migrate Field surfaces to Tailwind utilities](37-migrate-field-to-tailwind.md)
  — **Pass**
- [Experiment 38: Migrate Switch surfaces to Tailwind utilities](38-migrate-switch-to-tailwind.md)
  — **Pass**
- [Experiment 39: Migrate Checkbox + RadioGroup to Tailwind utilities](39-migrate-checkbox-radio-to-tailwind.md)
  — **Pass**
- [Experiment 40: Migrate Slider surfaces to Tailwind utilities](40-migrate-slider-to-tailwind.md)
  — **Pass**
- [Experiment 41: Migrate Item surfaces to Tailwind utilities](41-migrate-item-to-tailwind.md)
  — **Pass**
- [Experiment 42: Migrate Typography to Tailwind utilities](42-migrate-typography-to-tailwind.md)
  — **Pass**
- [Experiment 43: Migrate NativeSelect to Tailwind utilities](43-migrate-native-select-to-tailwind.md)
  — **Pass**
- [Experiment 44: Migrate Toggle (button surface) to Tailwind utilities](44-migrate-toggle-to-tailwind.md)
  — **Fail** (reverted; Toggle + ToggleGroupItem share `.radcn-toggle` rules — migrate together)
- [Experiment 45: Migrate Toggle + ToggleGroup together to Tailwind utilities](45-migrate-toggle-and-group-to-tailwind.md)
  — **Partial** (reverted; the cascade blocker it found is solved in Exp 47 via CSS-var propagation)
- [Experiment 46: Migrate DataTable to Tailwind utilities](46-migrate-data-table-to-tailwind.md)
  — **Pass**
- [Experiment 47: Toggle + ToggleGroup via CSS-var variant propagation](47-toggle-group-css-var-propagation.md)
  — **Pass** (solves the Exp-45 cascade blocker)
- [Experiment 48: Migrate Resizable to Tailwind utilities](48-migrate-resizable-to-tailwind.md)
  — **Pass**
- [Experiment 49: Migrate Breadcrumb + Pagination together to Tailwind utilities](49-migrate-breadcrumb-pagination-to-tailwind.md)
  — **Pass**
- [Experiment 50: Migrate Toast/Sonner to Tailwind utilities](50-migrate-toast-to-tailwind.md)
  — **Pass**
- [Experiment 51: Migrate DropdownMenu + ContextMenu together to Tailwind utilities](51-migrate-dropdown-context-menu-to-tailwind.md)
  — **Pass**
- [Experiment 52: Migrate Menubar + NavigationMenu together to Tailwind utilities](52-migrate-menubar-navigation-menu-to-tailwind.md)
  — **Pass**
- [Experiment 53: Migrate Command + Combobox together to Tailwind utilities](53-migrate-command-combobox-to-tailwind.md)
  — **Pass**
- [Experiment 54: Migrate Select content surfaces to Tailwind utilities](54-migrate-select-to-tailwind.md)
  — **Pass**
- [Experiment 55: Migrate Form container surfaces to Tailwind utilities](55-migrate-form-to-tailwind.md)
  — **Pass**
- [Experiment 56: Migrate DirectionProvider to Tailwind utilities](56-migrate-direction-to-tailwind.md)
  — **Pass**
- [Experiment 57: Migrate DatePicker surfaces to Tailwind utilities](57-migrate-date-picker-to-tailwind.md)
  — **Pass**
- [Experiment 58: Migrate Calendar to Tailwind utilities](58-migrate-calendar-to-tailwind.md)
  — **Pass**
- [Experiment 59: Migrate InputOTP to Tailwind utilities](59-migrate-input-otp-to-tailwind.md)
  — **Pass**
- [Experiment 60: Migrate Carousel to Tailwind utilities](60-migrate-carousel-to-tailwind.md)
  — **Pass**
- [Experiment 61: Migrate Chart to Tailwind utilities](61-migrate-chart-to-tailwind.md)
  — **Pass**
- [Experiment 62: Migrate Sidebar to Tailwind utilities](62-migrate-sidebar-to-tailwind.md)
  — **Pass**
- [Experiment 63: Migrate ButtonGroup + InputGroup to Tailwind utilities](63-migrate-button-group-input-group-to-tailwind.md)
  — **Pass**
- [Experiment 64: Migrate overlay-family content sub-elements to Tailwind utilities](64-migrate-overlay-content-subelements-to-tailwind.md)
  — **Pass**
- [Experiment 65: Migrate Field/Form message + ToggleGroup item to Tailwind utilities](65-migrate-field-form-toggle-item-to-tailwind.md)
  — **Pass**
- [Experiment 66: Migrate the menu-family helpers (sub-caret + item-indicator)](66-migrate-menu-family-helpers-to-tailwind.md)
  — **Pass**
- [Experiment 67: Migrate HoverCard avatar/body (consumer-site pattern)](67-migrate-hover-card-subelements-consumer-sites.md)
  — **Fail** (RETRACTED — false negative from a nonsense sentinel; consumer files ARE
  scanned; see the file's Correction + Experiment 68)
- [Experiment 68: Migrate HoverCard avatar/body (consumer-site, corrected)](68-migrate-hover-card-subelements.md)
  — **Pass**
- [Experiment 69: Migrate toggle-group-icon + breadcrumb-glyph (consumer-site)](69-migrate-toggle-icon-breadcrumb-glyph.md)
  — **Pass**
- [Experiment 70: Migrate the Button keystone to Tailwind utilities](70-migrate-button-keystone.md)
  — **Pass**
- [Experiment 71: Migrate the trigger/close cluster + drawer surfaces to Tailwind](71-migrate-trigger-close-cluster.md)
  — **Fail** (re-scope: cluster more entangled than the single-class audit; audit undercounted)
- [Experiment 72: Migrate the overlay trigger/close cluster (cohesive)](72-migrate-overlay-trigger-close-cluster.md)
  — **Pass**
- [Experiment 73: Audit remaining Tailwind debt](73-audit-remaining-tailwind-debt.md)
  — **Pass**
- [Experiment 74: Migrate Select and DatePicker trigger cluster](74-migrate-select-datepicker-trigger-cluster.md)
  — **Pass**
- [Experiment 75: Migrate Field, Form, and InputGroup residuals](75-migrate-field-form-inputgroup-residuals.md)
  — **Pass**
- [Experiment 76: Migrate state-indicator residuals](76-migrate-state-indicator-residuals.md)
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

From Experiment 6 (docs app Tailwind pipeline + verification-gate repair):

- **The verification gate for any change to shared package components or
  `tokens.css`/`index.ts` is BOTH Playwright suites, not just the fixture
  suite:** `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts`
  AND `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`, plus
  `pnpm --dir radcn/apps/docs typecheck`. The docs app consumes the same
  package components and its `coverage.spec.ts` asserts computed styles, so a
  fixture-only gate is insufficient — it silently missed two docs regressions
  (Experiment 2's `./theme.css` export broke the docs coverage enumeration;
  Experiment 5's Badge rendered unstyled in the docs app, which had no
  Tailwind). Both were repaired in Experiment 6.
- Adding a package `exports` subpath that is not a documentable component
  (like `./theme.css`) requires adding it to the docs coverage test's
  `excludedExports` set.
- The docs app and candidate fixture now share an identical Tailwind pipeline
  shape, so a component migrated once renders correctly in both.

From Experiment 7 (Skeleton + Separator batch migration):

- Replacing a bespoke animation with a Tailwind `animate-*` utility renames the
  keyframe (`radcn-pulse` → `pulse`); every `animation-name` assertion in BOTH
  suites must be updated (search fixture and docs specs).
- Removing a component's bespoke rule may orphan a `@keyframes`; verify it has
  no other user before deleting.
- shadcn `data-[orientation=...]` (and similar data-attribute) variants work
  directly against RadCN components that already emit the matching data
  attribute, so those components migrate without markup changes.
- Reword in-CSS migration comments to avoid the literal removed selector
  tokens, keeping "no longer present" greps unambiguous.

From Experiment 8 (Kbd migration):

- Before claiming a migration needs no test changes, grep BOTH suites for
  `toHaveClass(/radcn-<name>/)` (class-presence) AND computed-style assertions
  on the component. A class-presence assertion on a removed bespoke class must
  be deleted or repointed to the retained `data-*` hook (the data attributes,
  not the class, are the durable selector hooks).
- Verbatim shadcn strings may include variants inert in RadCN (e.g. kbd's
  `[[data-slot=tooltip-content]_&]`, since RadCN tooltips use
  `data-radcn-tooltip-content`); copying verbatim is harmless and flags a
  future structural-alignment item.

From Experiment 9 (enable Tailwind preflight):

- Preflight is ON in both pipelines, ordered before `radcnStyles` (bespoke
  rules win ties). `border` now renders (border-style solid baseline),
  `box-sizing: border-box` is global, and margins/headings/lists are reset —
  bordered components (Empty, Input, Card, Dialog, …) can migrate faithfully
  without a base-reset workaround.
- Preflight's blast radius was tiny thanks to the link-before-radcnStyles
  ordering; the only deterministic break was a positioned-overlay clamp
  interaction.
- `menu-overlay.ts` `positionElement()` clamps fixed overlays to
  `[data-fixture-stage]` when present (else viewport); the vertical clamp is
  now anchor-aware so a too-tall menu in a short container overflows instead of
  covering its trigger. Touch carefully.
- Classify probe failures flaky-vs-deterministic by re-running each in
  isolation Nx before attributing them to a change (serial-suite timing causes
  overlay-test flakiness).

From Experiment 10 (Empty migration — first bordered component under preflight):

- shadcn ships some components borderless/transparent by default (Empty's
  `border-dashed` carries no width; EmptyMedia default is `bg-transparent`).
  Faithful migration adopts that; the visible-box look is opt-in via `class`.
  Flag such visual shifts in the result even when no test asserts the old look.
- Flaky delayed-overlay open assertions need BOTH a generous timeout AND a
  clean pointer-enter: `page.mouse.move(0, 0)` before `hover()`. A timeout
  alone does not fix a missed pointer-enter (the open never fires). Apply to
  any `hover()` → delayed-open → `toBeVisible` pattern (fixture and docs).

From Experiment 11 (Label migration — first cross-component selector dep):

- A component's bespoke class can be a CSS-SELECTOR dependency of ANOTHER
  component (Field styled `.radcn-label` for the invalid state). Before
  removing a class, grep `tokens.css` for ALL selectors using it and repoint
  any cross-component selector to the migrated component's `[data-*]` hook so
  the interaction survives.
- When a RadCN component has an API shadcn expresses via group/peer context
  (Label's `disabled` prop), keep shadcn's variants verbatim (inert) and ADD
  the self `data-[...]` variant that drives the RadCN prop.

From Experiment 12 (Tailwind peer dependency):

- The radcn package declares `tailwindcss` as a REQUIRED peer dependency
  (`catalog:` → `^4.1.0`); `catalog:` works in `peerDependencies` here.
  Workspace consumers must keep tailwindcss in their deps to satisfy it.
- Issue 5's registry/`components.json`/install-flow must propagate the same
  "Tailwind v4 required" contract to generated consumer projects (the
  remaining peer-dependency completion-criterion surface).

From Experiment 13 (align Issue 5 docs with Tailwind-required):

- Issue 5's install-flow docs now record that the flow must require Tailwind v4
  in the target and fail loudly if absent; generated `components.json` retains
  Tailwind config fields (Remix 3 + Tailwind v4); registry items declare
  Tailwind as a required peer. These are the contract for Issue 5's eventual
  implementation.
- A doc-only experiment editing an open issue's spine needs no Playwright run;
  verify doc consistency with the deciding issue, preserved frontmatter, and a
  stable regenerated issues index.

From Experiment 14 (AspectRatio migration — unstyled component):

- Some shadcn components are intentionally UNSTYLED (AspectRatio is a Radix
  passthrough; RadCN's equivalent is just inline CSS aspect-ratio). The
  faithful migration removes the bespoke base entirely and moves any
  base-provided appearance (overflow, radius, background, sizing) to consumer
  call sites — and updates the user-facing docs EXAMPLE STRING so copied code
  still works.
- Confirm each call site already sets a property before deleting the base rule
  that provided it (here every AspectRatio usage set width inline and the child
  img sized via inline styles, so removing base `width:100%` and `> *` was
  safe).

From Experiment 15 (Card migration — FAILED, reverted; useful dead-end):

- **Bordered components need a default `border-color: var(--border)` base rule
  in the theme contract BEFORE migration.** shadcn's `border` utility sets only
  border-width and relies on a base `@layer base { *,::before,::after { @apply
  border-border } }`. RadCN's theme.css lacks it, so a migrated `border`
  renders currentColor (`--foreground`), not `--border`. Card surfaced this
  (Empty's `border-dashed` was width-0 and hid it). Build this base rule first
  (Experiment 16), then migrate visible-border components.
- Grep `tokens.css` (not just fixture `.tsx`) for `--radcn-X-*` custom-token
  override classes AND for cross-component selectors using sub-part classes
  (`.radcn-X-content`, etc.) before removing a component's classes — Card's
  design missed both `radcn-fixture-custom-card` and
  `.radcn-chart-example-card .radcn-card-content`.

From Experiment 16 (default border-color base rule):

- `theme.css` now defaults border color to `--border` via
  `@layer base { *,::before,::after { border-color: var(--border) } }`
  (shadcn parity). Migrated components using the `border` utility get the
  `--border` color for free; this unblocks bordered-component migration. It is
  a theme-CONTRACT edit (separate from the `tokens.css` ↔ `index.ts` sync).

From Experiment 17 (Card re-attempt — Pass):

- Card is migrated (after the Exp 16 foundation), handling all three Exp 15
  gaps: border via `border` + the `--border` base; `radcn-fixture-custom-card`
  translated to a direct `border-color`/`background-color` rule; and
  `.radcn-chart-example-card .radcn-card-content` repointed to
  `[data-radcn-card-content]`. The Fail→foundation→re-attempt arc is the model
  when a migration reveals a missing prerequisite.
- Card is the template for the remaining bordered/container components
  (`border`+base-color, `@container` header, `has-[...]` layout, sub-part data
  hooks, custom-token translation, cross-component selector repoint).

From Experiment 18 (Input + Textarea migration — Pass):

- Components that SHARE bespoke CSS rules (Input+Textarea share base/state)
  migrate together, else the shared rule must be split.
- A component's class can be cross-referenced by MULTIPLE other components
  (Input by InputGroup ×2 combined selectors AND ButtonGroup ×6); grep every
  `.radcn-X` selector (including combined `.radcn-X, .radcn-Y` and
  child-combinator group selectors) and repoint ALL to `[data-radcn-X]`. The
  grouped reset rules are load-bearing — they neutralize the migrated control's
  standalone `border`.
- When shadcn styling legitimately differs (file input: no element text color +
  `file:bg-transparent` vs RadCN's `--muted-foreground` + `--secondary`), update
  the affected test assertions to shadcn's computed values rather than diverging.

From Experiment 19 (Alert migration — Pass):

- A shadcn `cva` ports to a Remix 3 `Handle` component as a base constant + a
  `Record<Variant, string>` class map keyed by the `variant` prop (no cva
  runtime). A variant's `data-[slot=…]` child selector adapts to RadCN's boolean
  attribute as `*:data-[radcn-…]:…`.
- Prefix-sharing ≠ coupling: `.radcn-alert*` (Alert) vs `.radcn-alert-dialog*`
  (AlertDialog) are separate components; grep-confirm no shared selector / no
  cross-render before removing one's rules.

From Experiment 20 (Table migration — Pass):

- A component with all-inline-backed/attribute-only assertions, no custom
  tokens, no cross-component selectors, and no raw class-string consumers is a
  clean verbatim migration even when shadcn's appearance differs markedly
  (Table's bordered container + secondary headers → shadcn's borderless/`p-2`);
  unasserted appearance changes toward shadcn are the goal.
- A RadCN-only unasserted variant (Table `dense`, like Card `size`) is kept as
  an inert prop + `data-*` hook with its class dropped.

From Experiment 21 (Progress migration — Pass):

- When a component's architecture differs from shadcn's (Progress: native-
  progress + width-driven indicator vs Radix + transform), adapt shadcn's
  utilities onto RadCN's elements rather than rewriting the architecture —
  map the base utility (`w-0`) so an asserted inline style (`width:X%`) still
  overrides.
- A RadCN feature with no shadcn equivalent and no computed assertion
  (Progress's indeterminate slide animation) is kept as a bespoke extension
  (its class + `@keyframes`) alongside the migrated utilities.
- A custom-token override on a parent asserted on a CHILD needs a descendant
  direct rule (`.custom [data-child] { … }`), not a rule on the parent alone.

From Experiment 22 (Spinner migration — Pass; round-1 design rejected for
under-scoping):

- A single-line grep for assertions MISSES variable-based assertions (`let s =
  locator(...); expect(s.nth(0)).toHaveCSS(...)`). ALWAYS read a component's
  full test block before claiming "no computed-style assertion" — the Spinner
  design's round-1 rejection came from exactly this gap.
- When size/color is a `--radcn-*` token API used inline by many consumers AND
  asserted, the faithful migration converts EVERY call site to direct
  `width`/`height`/`color` (Spinner: 19 sites) and updates docs prose naming the
  removed tokens — not just the component.
- A bespoke `@keyframes` referenced inline by raw (non-component) SVGs is removed
  only after repointing those SVGs to Tailwind's equivalent keyframe
  (`animation:spin`, present once a migrated component uses `animate-spin`).

From Experiment 23 (animation-utilities foundation — Pass):

- shadcn v4 overlay components require `tw-animate-css` (shadcn imports it in
  globals.css) for their `animate-in`/`data-[state=…]:animate-out`/`fade`/
  `zoom`/`slide` utilities — these are NOT in core Tailwind. RadCN now imports
  it in both pipelines (catalog + both apps' devDeps + `@import 'tw-animate-css'`
  after `tailwindcss/utilities`). This is the foundation overlay migrations need
  (analogous to Exp 16's border-color base).
- `tw-animate-css` utilities are ON-DEMAND (`@utility`): they appear in the
  generated CSS only once a scanned component uses them, so the foundation is
  byte-inert until consumed — verify it with a throwaway probe, not by grepping
  the unused output.

From Experiment 24 (Tooltip — first overlay migration — Pass):

- The **overlay-migration pattern**: migrate the content/arrow box+color+enter-
  animation to shadcn utilities (`bg-foreground`, `animate-in fade-in-0
  zoom-in-95 data-[side=…]:slide-in-from-*`); KEEP the RadCN positioning system
  (collision max-width clamp, transform-origin, manual arrow data-side
  placement) as `[data-radcn-…]`-keyed bespoke rules; OMIT shadcn's exit
  utilities (the JS hides via the `hidden` attribute, so an exit animation never
  plays); translate custom-token overrides to direct rules; leave the
  Button-coupled trigger for the Button experiment. Applies to the whole cluster
  (Popover, Dialog, Dropdown, Select, Sheet, Drawer, HoverCard, Menubar,
  ContextMenu, Command, Toast, Accordion).
- An overlay's enter animation migrates cleanly: RadCN's JS toggles `hidden`, so
  a CSS animation re-triggers on display none→shown — `animate-in` behaves
  exactly as the old bespoke keyframe did.
- Read the FULL overlay test block: a custom-token `toHaveCSS` is often a
  variable-based assertion (`content.toHaveCSS(...)`) that a single-line grep
  misses (Tooltip's custom background at `positioned-overlays.spec.ts:218`).

From Experiment 25 (Popover content surface — second overlay — Pass):

- Overlays can SHARE a surface rule (Popover+HoverCard's combined
  `.radcn-popover-content, .radcn-hover-card-content`); migrating one means
  splitting the selector — give the un-migrated sibling a standalone bespoke
  copy (the Input+Textarea shared-rule pattern, applied to overlays).
- When migrating an overlay, clean its entry from the shared
  `@media (prefers-reduced-motion)` rule and sweep any strand a prior overlay
  migration left (Exp 24's `.radcn-tooltip-content`); dropping that guard for
  migrated overlays is shadcn-faithful.
- The popover width-320px assertion was INLINE-backed (`style="width:20rem"`) —
  always read the full test for inline/variable-based assertions.

From Experiment 26 (HoverCard content surface — third overlay — Pass):

- A surface-sharing overlay pair migrates in two steps: split the shared rule
  (giving the sibling a standalone copy), then migrate the sibling — collapsing
  its standalone surface + its own layout-override rules into one data-keyed
  layout rule (HoverCard's two `.radcn-hover-card-content` rules → one).
- Once all sharers of a `--radcn-*` token group migrate, that group's tokens
  (`--radcn-overlay-bg/border/fg/width`) fall out of use — note for a later
  dead-token cleanup rather than chasing mid-migration.

From Experiment 27 (Dialog — first modal overlay — Pass):

- The modal-overlay pattern: migrate the overlay backdrop (`fixed inset-0 z-50
  bg-black/50 animate-in fade-in-0`) + the centered content box (`fixed
  top/left-[50%] translate-x/y-[-50%] grid … rounded-lg border bg-background
  p-6 shadow-lg` + enter-animation) to utilities; keep sub-parts + the shared
  modal keyframes; omit exit utilities (JS hides via `hidden`). Applies to
  AlertDialog, Sheet, Drawer.
- A custom-token class on a shared ANCESTOR (DialogPortal) whose tokens feed
  sibling descendants (overlay + content) translates to DESCENDANT direct rules,
  one per affected descendant (`.custom [data-overlay]`, `.custom [data-content]`).
- Modal keyframes (`radcn-dialog-fade-in`/`zoom-in`) are SHARED across the modal
  cluster — keep them until the last modal migrates; remove only each modal's
  own `animation:` declaration as it migrates.

From Experiment 28 (AlertDialog — second modal — Pass):

- A RadCN-only `size` variant on an overlay is preserved by keeping `data-size`
  and repointing the size rules (width token, footer grid) from the `--${size}`
  class to `[data-…-content][data-size="X"]` — the size effects survive while
  the surface migrates.
- Modal overlays can SHARE their backdrop rule (AlertDialog+Sheet); split it
  (sibling keeps a standalone copy) — same as the Popover+HoverCard surface
  split.
- The custom-token-on-portal → descendant-rules pattern repeats; confirm the
  fixture puts the class on the PORTAL (so descendant rules reach the sibling
  overlay) AND the content (so `toHaveClass` passes).

From Experiment 29 (Sheet — third modal, side-anchored — Pass):

- A multi-SIDE overlay variant (Sheet right/left/top/bottom) is preserved by
  keeping `data-side` and repointing each `--{side}` rule to
  `[data-…-content][data-side="{side}"]`.
- When an overlay's CONTENT keeps a bespoke animation but its OVERLAY moves to
  `animate-in`, keep the content's `@media (prefers-reduced-motion)` guard
  (repointed to the data attribute) and drop only the overlay's — don't
  blanket-remove the block.

From Experiment 30 (Drawer overlay + dead-keyframe retirement — Pass):

- Some components are RadCN SYSTEMS with no shadcn-utility analog (Drawer's
  drag-to-dismiss vs shadcn's `vaul` library). Migrate the cleanly portable
  parts (the overlay backdrop) and keep the system bespoke + documented — don't
  force a utility port where shadcn itself delegates to a JS library.
- A shared bespoke keyframe can be RETIRED once the last component migrates off
  it (the modal fade/zoom keyframes died with the Drawer overlay); reword the
  retirement comment to avoid the literal keyframe tokens so "no longer present"
  greps stay clean (Exp 7).
- The full overlay cluster (Tooltip, Popover, HoverCard, Dialog, AlertDialog,
  Sheet, Drawer — 7) now renders surfaces/backdrops from Tailwind utilities.

Button keystone — blast-radius finding (investigated after Exp 30, not yet
migrated):

- Button is NOT a single quick migration. Two facts make it a multi-experiment,
  cross-suite phase:
  1. **The `radcn-button--{variant}`/`--{size}` classes are asserted by NAME
     across ~10+ spec files** — `toHaveClass(/radcn-button--outline/)`,
     `/radcn-button--link/`, `/radcn-button--ghost/`, `/radcn-button--icon/`,
     `/radcn-button/` appear in `positioned-overlays`, `collapsible`,
     `navigation-collection`, and more (every component that uses a Button
     trigger asserts its classes). Dropping those classes for utilities means
     rewriting those assertions (Button already emits `data-variant`/`data-size`,
     so they can move to attribute/computed checks).
  2. **RadCN's Button DIVERGES from shadcn's `buttonVariants`** — it is a
     `--radcn-control-height`/`min-height`-based design (e.g. `lg` is
     `min-height: 2.75rem` = 44px, vs shadcn's `h-10` = 40px; `width: max-content`;
     `--radcn-button-bg`/`-fg`/`-link-fg` custom tokens). Computed assertions test
     RadCN's values (e.g. `min-height: 36px` default, `44px` lg, `32px`
     sm/icon-sm, custom `bg rgb(15,118,110)`). So a verbatim shadcn port would
     change the design and fail those assertions — the migration must REPRODUCE
     RadCN's current values via utilities (arbitrary values where it diverges:
     `min-h-[2.75rem]`, `rounded-[var(--radius)]`, etc.), not adopt shadcn's.
- Additional coupling to handle in the Button phase: ButtonGroup styles its
  children via `.radcn-button` child-combinator selectors (repoint to
  `[data-radcn-button]`); the date-picker trigger uses a raw
  `radcn-button radcn-button--outline radcn-button--default` class string
  (re-emit the button utilities); the custom-button fixture (`--radcn-button-bg:
  #0f766e`, asserted) needs a direct-rule translation; Toggle shares button-like
  sizing (asserts `min-height: 44px`/`32px`).
- Recommended decomposition: (a) migrate Button itself (Record-per-variant/size
  utility strings reproducing RadCN values + `data-*` kept + custom-token
  translation), updating the in-suite `toHaveClass(/radcn-button--*/)` assertions
  to `data-variant`/`data-size`; (b) repoint ButtonGroup + date-picker; then the
  menu-cluster triggers unblock.

Update (Experiment 31, scope analysis): the true cost is larger than the
component — there are **95 raw `radcn-button--*` class strings hand-written
across 13 fixture/docs files** that bypass the Button component and depend on
the bespoke CSS directly. So Button is a decomposable sub-project: (1) route all
raw call sites through the `Button` component / a `buttonClass()` helper
(byte-identical, green), THEN (2) flip the component to utilities + remove the
bespoke CSS + rewrite the 27 `toHaveClass` assertions. Never remove a
widely-hand-written class in one atomic pass. Self-contained, non-button-coupled
components (Avatar, Accordion, Tabs, ScrollArea, Switch/Checkbox/RadioGroup,
Slider) can be migrated in parallel with the Button decomposition.

From Experiment 32 (Avatar surfaces — Pass):

- `rounded-full` computes to Tailwind v4's `calc(infinity * 1px)`, NOT a literal
  pixel value — when a test asserts an exact `border-radius` (RadCN's `999px`),
  use `rounded-[999px]`. Same exact-value caution as Card Exp 15.
- A size variant that sets a CSS var consumed by a descendant migrates cleanly
  by emitting an arbitrary-property utility (`[--radcn-avatar-badge-size:0.5rem]`)
  on the parent; the descendant inherits it (no descendant rule needed).
- Token-referencing utilities (`bg-[var(--radcn-avatar-fallback-bg,…)]`)
  reproduce a custom-token fixture's overrides with NO translation — the
  fixture's `--radcn-*` tokens stay and the utilities read them.

From Experiment 33 (ScrollArea surfaces — Pass):

- Native-scrollbar CSS (`scrollbar-width`/`scrollbar-color`) and a `color-mix`
  focus shadow migrate as arbitrary-property/arbitrary-value utilities
  (`[scrollbar-width:thin]`, `[scrollbar-color:var(--x)_transparent]`,
  `shadow-[inset_0_0_0_3px_color-mix(in_srgb,var(--x)_35%,transparent)]`) — they
  compile and resolve.
- A parent orientation/state that styles a CHILD (scrollbar orientation → thumb
  min-size) stays a bespoke descendant rule keyed on the parent's `data-*`; only
  the parent's own geometry maps to a component `Record`.

From Experiment 34 (Tabs surfaces — Pass):

- Interactive-element states (`:hover`, `:focus-visible`, `[data-state=active]`,
  `:disabled`/`[data-disabled]`) migrate to the matching Tailwind variants
  (`hover:`, `focus-visible:`, `data-[state=active]:`, `disabled:`/
  `data-[disabled=true]:`) on the retained data attributes — the shadcn idiom.
- When a spec already asserts the data attribute that replaces a dropped class,
  delete the redundant class assertion rather than duplicate it.

From Experiment 35 (Accordion surfaces — Pass):

- A native `<summary>` disclosure marker hides via Tailwind pseudo-element
  variants — `marker:content-['']` (built-in `marker:` → `::marker`) +
  `[&::-webkit-details-marker]:hidden` (arbitrary variant); both compile in v4.
- Style-less "marker" classes (emitted but with no CSS rule) are pure
  drop-on-migration; if a spec asserts one by name, the underlying `data-*`
  attribute already carries the real state, so remove that assertion.
- Parent-state→child effects on a native `<details>` (`item[open]`→icon,
  `item[data-disabled]`→trigger) stay bespoke rules keyed on the data attribute
  ancestor + the state attribute (`[open]` is native; `[data-disabled]`).

From Experiment 37 (Field surfaces — Pass, one in-flight fix):

- Before dropping a component's class, grep ALL `src/components/*.tsx` (not just
  fixtures) for raw reuse — the Form component reuses `radcn-field-error`/
  `radcn-field-description` as raw classes, so those stay bespoke + class-emitting
  until Form migrates (cross-COMPONENT raw reuse, the Button-finding lesson
  applied to components).
- `@media (max-width: 640px)` → the EXACT `max-[640px]:` arbitrary variant, NOT
  `max-sm:` (639.98px).
- A consumer-applied modifier class the component never emits
  (`radcn-field--choice-card`) stays bespoke (no element to host utilities).

From Experiment 38 (Switch surfaces — Pass, after a caught-and-fixed Fail):

- RadCN's form controls (Checkbox/Radio/Switch) SHARE combined CSS rules
  (`.radcn-checkbox-wrapper, .radcn-radio-item, .radcn-switch-wrapper { … }` for
  base/input/`:has()` states). Migrating one means SPLITTING each shared rule
  (drop only that control's selector, keep the others), NOT removing it — else
  the un-migrated siblings break (the first attempt removed them and broke
  checkbox/radio: transparent checked bg, uninteractable inputs).
- NEVER inspect a rule's structure with `grep -v "<sibling>"` — it hides
  shared/combined selectors and makes a shared rule look standalone.
- Native-input `:has()` state styling migrates cleanly: `has-[:checked]:`/
  `has-[:focus-visible]:` variants on the wrapper for its own state; bespoke
  `[data-wrapper]:has([data-input]:checked) [data-child]` rules for
  parent-state→child (the knob slide).
- Regenerate `index.ts` to the canonical node `JSON.stringify` form
  (`ensure_ascii=False` if using Python) — Python's default `\uXXXX` escaping of
  non-ASCII comment chars otherwise diverges from node's raw output and trips the
  byte-identical check (though the decoded string is equivalent).

From Experiment 39 (Checkbox + RadioGroup — Pass; form-control cluster complete):

- When siblings share combined rules, migrate them TOGETHER so the shared rules
  are fully removed in one experiment (no intermediate split/orphan) — the safe
  inverse of the Exp-38 lesson, once all sharers are in scope.
- The `:has()` native-input form-control pattern (wrapper has-variants for its
  own state + bespoke `[data-wrapper]:has([data-input]:checked) [data-child]`
  reveal) generalizes across Switch / Checkbox / RadioGroup.

From Experiment 40 (Slider surfaces — Pass; native-input control family complete):

- A JS-set inline CSS var driving layout (`--radcn-slider-percent`) is read by
  arbitrary-value utilities (`w-[var(--radcn-slider-percent,0%)]`,
  `left-[var(--radcn-slider-percent,0%)]`) — the percent-driven width/position
  reproduces exactly (the asserted range widths hold).
- Slider is self-contained (unlike the shared Switch/Checkbox/Radio rules) —
  always verify shared-vs-standalone (read the FULL rule) before remove-wholesale
  vs split.

From Experiment 41 (Item surfaces — Pass, after a caught-and-fixed utility conflict):

- NEVER set a property in a component's BASE utility string that a variant/size
  `Record` also overrides — two conflicting utilities on ONE element resolve by
  Tailwind's generated source order (often the base wins), so the variant silently
  doesn't apply. Put the FULL set of that property in the variant `Record`
  (incl. the default value); leave the base without it. (Bespoke `--variant`
  selectors overrode the base via specificity/order; flat utilities on one element
  do NOT.) The Item `sm`/`xs` padding collapsed to the base `p-3.5` until fixed.
- A `toBeGreaterThan(X)` returning exactly `X` can be a real signal (two sizes
  collapsing to equal), not just a flake; identify the EXACT failing assertion
  (the `--reporter=line` progress line can interleave with a prior test's error).

From Experiment 42 (Typography — Pass, after two caught-and-fixed bugs):

- For a font-SIZE driven by a CSS var, use the arbitrary-PROPERTY form
  `[font-size:var(...)]` (or `text-[length:var(...)]`) — a bare `text-[var(...)]`
  is ambiguous and Tailwind defaults it to `color`, silently dropping the size.
  (A var-driven COLOR via `text-[var(...)]` is correct.)
- `@source` scans source files INCLUDING COMMENTS — a bracketed class-like token
  in a comment becomes a real generated utility; if it holds a non-ASCII char
  (e.g. `…`), Tailwind emits a rule the downstream CSS transform chokes on,
  dropping every utility AFTER it and breaking many unrelated components. Keep
  source comments ASCII and free of bracketed class tokens. The on-disk CSS can
  look complete (balanced braces, byte-identical) while the SERVED CSS is
  truncated — only the running suite catches it; `git stash` to isolate, then
  grep the generated CSS for junk rules.

From Experiment 43 (NativeSelect — Pass):

- When a fixture asserts a bespoke class via `toHaveClass(/--x/)`, KEEP that class
  as a style-less MARKER (a test hook, like a data attribute) and move its styling
  to a utility `Record` — the migration goal (styles -> utilities) is met and the
  assertion stays green.
- A LITERAL arbitrary length (`text-[0.75rem]`) is unambiguously inferred as
  `font-size`; the Exp-42 `text-[var()]`->`color` ambiguity is var-specific (don't
  over-apply it — confirmed via the generated CSS).

From Experiment 44 (Toggle button alone — Fail, reverted):

- Before removing a component's bespoke rules, grep ALL `src/components/*.tsx`
  (not just the obvious file + fixtures) for the class. `ToggleGroupItem` reuses
  `radcn-toggle` (base/states) and resolves size/variant via the group cascade, so
  migrating Toggle alone broke the group-item pressed background. A composite
  "item" sub-component often renders the base component's class — migrate the base
  and its reusing siblings TOGETHER (the Exp-39 pattern).
- A review scoped to the primary component + its fixtures can miss a sibling's
  raw-class reuse; the reviewer brief must say "grep EVERY component file."

From Experiment 45 (Toggle + ToggleGroup together — Partial, reverted):

- A kept bespoke parent->child CASCADE that overrides a child UTILITY is reliable
  for some properties (min-height worked) but yielded an unexplained `currentColor`
  for border-color on the migrated item (the `var()` resolved invalid despite the
  token being defined). Do NOT assume a retained `:not([data-X])` cascade will
  drive a property the migrated child no longer sets. For group->item size/variant
  inheritance, the robust pattern is to PROPAGATE the resolved size/variant onto
  each item (component prop injection or enhance-time data attributes) so every
  item emits its OWN utility — no cascade. Toggle + ToggleGroup remain open for a
  propagation-based re-attempt.

From Experiment 46 (DataTable — Pass, first-try green):

- A composite that REUSES a now-migrated sibling's classes (DataTable carries
  `radcn-table-row`/`radcn-table-cell` from the migrated Table) holds them as DEAD
  markers — drop them and re-key the element's own state (selected/reorderable) on
  its retained data attributes. A per-element composite with NO parent->child
  cascade migrates cleanly first-try (contrast Toggle's cascade blocker).
- For an unused-but-shared bespoke selector in a combined base rule
  (`.radcn-data-table-recipe`), split-keep it bespoke (conservative, zero cost)
  rather than dropping.

From Experiment 47 (Toggle + ToggleGroup — Pass; the Exp-45 blocker solved):

- A bespoke parent->child CASCADE cannot reliably override a MIGRATED child's
  utility-set property (border-color -> currentColor; min-height -> the child's
  own utility wins). Do NOT keep such cascades when migrating the child.
- Use CSS-VAR PROPAGATION: the parent SETS `--x` via `data-[state=...]:[--x:value]`
  arbitrary-property utilities (they compile in Tailwind v4); the child READS
  `border-[color:var(--x,fallback)]` / `min-h-[var(--x,fallback)]` /
  `text-[length:var(--x,fallback)]` (var font-size needs `length:`, var
  border-color needs `color:`); a child with its own state re-sets `--x` locally
  (local beats inherited). No cascade, no currentColor. This is the general fix
  for the remaining cascade-coupled components (InputOTP/Resizable/InputGroup).
- A test failing at assertion N can mask a LATER assertion in the same test;
  fixing N may reveal a second bug (`:158` masked `:174`).

From Experiment 48 (Resizable — Pass, first-try green via the Exp-47 pattern):

- The CSS-var propagation pattern generalizes: ANY parent->child orientation/state
  styling on a MIGRATED child should be propagation (parent sets `--x` via
  `data-[state]:[--x:val]`, child reads `prop-[var(--x,fallback)]`), never a child
  cascade. Applied first-try to Resizable's handle axis (width/height/cursor).
- A parent->child cascade that sets a property to its OWN default (e.g.
  `height:auto`/`width:auto` on a flex item's cross-axis = stretch) is a no-op —
  drop it outright rather than propagate.

From Experiment 49 (Breadcrumb + Pagination together — Pass):

- A component's bespoke CSS can mix component-EMITTED classes (migrate to
  utilities) with a consumer-facing RAW-class layout API the component never emits
  (fixtures/docs apply it directly). Grep the component AND the fixtures/docs:
  migrate only the emitted surfaces; keep the raw-class API bespoke (here:
  breadcrumb trigger/glyph/truncate/responsive-*/drawer-links + their `@media`
  blocks). Same family as the toggle-icon (Exp 47) raw-class API.
- Sibling components sharing combined base rules (Breadcrumb + Pagination, like
  Checkbox + Radio) migrate together so the shared rules fully drop.

From Experiment 50 (Toast/Sonner — Pass, first-try green):

- When component HTML is emitted via TWO paths (JSX + a runtime JS template
  string), reference the SAME utility consts in both so they cannot drift (the JS
  template interpolates `class="${theConst}"` — switch a single-quoted string to a
  backtick to interpolate).
- A `data-[state=...]:[--var:#hex]` arbitrary-property var-set with a LITERAL hex
  value compiles in Tailwind v4 (verified) — a bespoke `--variant`-sets-vars rule
  migrates directly to the CSS-var propagation pattern.

From Experiment 51 (DropdownMenu + ContextMenu together — Pass):

- A shared-rule sibling migration can co-exist with a family-wide raw-class helper
  set: migrate the two siblings' prefixed rules, but KEEP the cross-family helper
  classes (`radcn-menu-*`) + family data-attribute rules (`[data-radcn-menu-item][data-disabled]`)
  bespoke while OTHER components (Menubar) still emit them; verify those others stay
  green in isolation. They fall out when the last emitter migrates. SPLIT any
  combined rule that mixes a migrated selector with a kept one (shortcut/sub-caret).
- `[&[hidden]]:hidden` reproduces `.x[hidden]{display:none}` when the base utility
  sets `display:grid` (which beats the browser `[hidden]` default) — used across all
  positioned-overlay content surfaces.

From Experiment 52 (Menubar + NavigationMenu together — Pass):

- When a parent->child orientation cascade would change a migrated child's
  `display`/`align-items`/etc., propagate ALL changing properties via vars and have
  the child READ them with arbitrary-property utilities (`[display:var(--x,flex)]`
  etc.). Do NOT keep both a base `flex`/`items-center` utility AND a var-read of the
  same property (conflict) — use only the var-read.
- A combined rule whose kept selector is ALREADY fully covered by a standalone rule
  (`.radcn-menu-sub-caret`, kept from Exp 51) is DELETED outright, not split.

From Experiment 53 (Command + Combobox together — Pass):

- A class can be a TEST LOCATOR even with no CSS rule and not being the component's
  "own" surface (`radcn-command-dialog`, on the migrated Dialog, is located by
  `combobox-command.spec.ts:286`). Grep the SPECS for a class before dropping it,
  not just components/fixtures; keep asserted classes as style-less markers.
- Across a shared/override component boundary, do NOT layer `${sharedConst} +
  overrides` when the override changes a shared property (border/radius/bg) — that
  re-creates the Exp-41 source-order conflict. Emit the overriding element's RESOLVED
  state directly (per-side border longhands instead of the `border` shorthand).

From Experiment 54 (Select content surfaces — Pass):

- A `@media (prefers-reduced-motion: reduce)` override of an animated MIGRATED
  surface becomes a `motion-reduce:animate-none` (or `motion-reduce:...`) utility on
  that surface (Tailwind's `motion-reduce:` variant IS that media query). Grep for
  `prefers-reduced-motion` blocks targeting a class you're dropping.
- The Exp-51 ButtonGroup-coupled-trigger carve-out generalizes to Select: migrate
  the content surfaces, keep the trigger + its state rules bespoke until ButtonGroup
  migrates.

From Experiment 55 (Form container surfaces — Pass):

- A thin layout-wrapper (Form) migrates its container surfaces cleanly; keep a small
  cross-component CASCADE that colors an already-migrated child (`.radcn-form-label`
  is a Label) bespoke rather than entangle with that child's own color utilities
  (the criteria allow bespoke rules reduced to hooks).

From Experiment 57 (DatePicker surfaces — Pass):

- A composite that wraps already-migrated components (Popover) + a raw-class API
  (Button) keeps its OVERRIDE rules bespoke + unlayered (they reliably beat the
  migrated @layer utilities / would lose as appended utilities); migrate only its
  standalone surfaces (root/icon/preset-select).

From Experiment 58 (Calendar — Pass):

- A grid of stateful cells (Calendar days) where the parent cell carries the state
  and a child button is styled by it: propagate via vars (cell sets `--x` on
  `data-[state]:`, button reads `prop-[var(--x,fallback)]`) — the Exp-47/50 pattern
  scaled to 5 day-states + an own-state (range-middle) on the cell. Wire BOTH the
  internal grid renderer (raw class sites) AND the exported component wrappers.

From Experiment 59 (InputOTP — Pass):

- Position-based first/last cell styling (the OTP slots' rounding + `-ml-px` overlap
  reset) migrates to the cell's OWN `first:`/`last:` position variants — exact for
  the single-group case; multi-group divergence acceptable when unasserted.
- `animate-[name_dur_steps(2,_start)_infinite]` compiles (the `_` inside `steps()` is
  the space); the keyframe stays bespoke, the utility references it (a JS-set
  className reads the same const).

From Experiment 60 (Carousel — Pass):

- For a positioned control whose POSITION differs by orientation but APPEARANCE does
  not, split: migrate the appearance to utilities, keep the position rules bespoke
  (positioning-only `top`/`left`/`transform` — no conflict with the appearance
  utilities), and keep the orientation marker on the parent so the position cascade
  still matches (avoids propagating ~10 positioning vars).
- Scroll containers migrate fully: `[overflow:var(--x,auto_hidden)]`,
  `[scroll-snap-type:var(--x,y_mandatory)]`, `[scrollbar-width:none]`,
  `[&::-webkit-scrollbar]:hidden` all compile.

From Experiment 61 (Chart — Pass):

- SVG components migrate via arbitrary-property utilities: `[stroke:var(…)]`,
  `[fill:var(…)]`, `[stroke-width:N]`, `[stroke-linecap:round]`,
  `[aspect-ratio:var(…,16/9)]`, and a `color-mix(in_srgb,…)` inside a var fallback all
  compile. An inline SVG `fill="…"` attribute is unaffected (the `[fill:…]` utility is
  the same CSS the original class applied).
- When a base + variant conflict on multiple props (the chart swatch's w/h/rounded/bg),
  SELECT a full per-variant const in the component rather than base+append (Exp-41).

From Experiment 62 (Sidebar — Pass):

- A parent-state→descendant cascade where the descendant's matching attribute is also
  set whenever the parent state holds (the enhancer sets the sidebar's data-collapsible
  only when the provider is collapsed) collapses to the descendant's OWN data-variant —
  no group/propagation needed; set a var via the variant + read it (Exp-41-safe).
- When a parent→descendant cascade genuinely must stay (provider-collapse hide,
  variant→inner add-ons), keeping it BESPOKE and repointing to the kept data-* attrs is
  reliable PROVIDED the target has no conflicting base utility (a sole display:none, or a
  clean add) — sidesteps both the Exp-47 override risk and unverified Tailwind named-group
  features.

From Experiment 63 (ButtonGroup + InputGroup — Pass; FINAL components):

- The bespoke `radcnStyles` is injected UNLAYERED while Tailwind utilities live in
  `@layer utilities`; unlayered declarations beat any layered declaration regardless of
  specificity (empirically probed: a kept `.group > .child:not(:first-child){border-radius:0}`
  drives a non-first button's `border-top-left-radius` to 0 while the first stays 6px).
  So cross-component integration cascades (group border-merge, nested-control chrome
  reset) can stay bespoke as documented hooks — keep the group's marker classes so they
  match; no need to thread radius/border vars through the already-migrated child.

## Migration Status Audit (after Experiment 63)

A `tokens.css` audit after Experiment 63 corrects an over-optimistic count used
during Experiments 47–63. Those experiments migrated each component's PRIMARY
surfaces and the count was tracked per-experiment as "components migrated"; the audit
shows the issue is NOT complete. **39 genuine visual-debt rules remain** (rules with
two or more visual declarations — `padding`/`font`/`border`/`background`/`gap`/etc.):

- **Button** (keystone) — `.radcn-button` (+ the `--{variant}`/`--{size}` rules). Still
  fully bespoke. Experiment 31 was re-scoped to a SCOPE-ANALYSIS experiment and
  explicitly DEFERRED the implementation: the `radcn-button*` classes are hand-written
  as raw class strings in ~95 places across 13 fixture/docs files (plus asserted by
  name in 27 spec places), so removing the rules requires a coordinated multi-file
  change, not a component-only edit.
- **Overlay-family triggers** (full button-style visual debt): `.radcn-dialog-trigger`,
  `.radcn-drawer-trigger`, `.radcn-dropdown-menu-trigger`, `.radcn-popover-close`,
  `.radcn-select-trigger` — each ~8–10 visual declarations; several are also raw-class
  in fixtures (shared blast radius with Button).
- **Overlay-family sub-elements**: `.radcn-dialog-{header,footer,title,description}`,
  `.radcn-drawer-{header,footer,title,description,close,content,handle}`,
  `.radcn-sheet-{header,footer,title,description}`,
  `.radcn-popover-{header,title,description}`, `.radcn-alert-dialog-{action,cancel,media}`,
  `.radcn-hover-card-{avatar,body}` — layout + typography (grid/gap/padding/font).
- **Primitives still bespoke**: `.radcn-toggle-group`, `.radcn-toggle-group-icon`,
  `.radcn-toggle-icon`, `.radcn-field-description`, `.radcn-field-error`,
  `.radcn-breadcrumb-{glyph,trigger}`, `.radcn-menu-item-indicator`,
  `.radcn-menu-sub-caret`, `.radcn-date-picker-content`.

What IS genuinely migrated (emits utilities; bespoke rule removed; verified by the
byte-identical gate): the leaf/primitive set (Badge, Card, Input/Textarea, Skeleton,
Separator, Kbd, Empty, Label, AspectRatio, Alert, Table, Progress, Spinner, Avatar,
ScrollArea, Tabs, Accordion, Collapsible, Switch, Checkbox/RadioGroup, Slider, Item,
Typography, NativeSelect, DataTable, Field container, Direction) and this session's
batch (Toggle/ToggleGroup primary, Resizable, Breadcrumb/Pagination, Toast/Sonner,
the menu/select content surfaces, Calendar, Carousel, Chart, Sidebar, InputOTP,
DatePicker surfaces, Form, ButtonGroup/InputGroup own surfaces). Also genuinely kept
as documented non-styling hooks: portals (`position:fixed` only), the family
`radcn-menu-*` raw-class API, fixture/docs demo classes, and style-less markers.

**Issue 6 remains OPEN.** The remaining ~39 visual-debt rules — centered on the
Button keystone + its raw-class blast radius and the overlay-family triggers/
sub-elements — are the genuine path to completion. The next experiments must migrate
each component's surface AND update the raw `radcn-*` class sites in fixtures/docs
that depend on the bespoke rules (the Experiment 31 blast-radius finding), then the
issue can be closed. The byte-identical/dual-suite gate and the per-experiment review
discipline still apply.

### Progress update (after Experiment 66)

Experiments 64–66 cleared the **21 component-emitted, no-blast-radius** debt rules
(every one dual-suite-green + adversarially reviewed):

- Exp 64 — overlay-family content sub-elements (Dialog/Sheet/Drawer/Popover
  header/footer/title/description + AlertDialog media): 16 rules.
- Exp 65 — Field/Form message (`field-description`/`-error`) + ToggleGroup item: 3.
- Exp 66 — menu-family helpers (`menu-sub-caret`/`menu-item-indicator`): 2.

The remaining **~18 visual-debt rules ALL require coordinated CONSUMER-SITE
migration** — removing the bespoke rule breaks raw `radcn-*` class strings
hand-written in the fixtures AND the large `apps/docs/app/content/components.tsx`
demo file, so each experiment must add the equivalent utilities to those raw sites
(or route them through the component) while keeping the asserted marker classes. This
is the Experiment-31 blast-radius work, now mapped per item:

- **Button keystone** (`.radcn-button` + `--{variant}`/`--{size}`): ~95 raw sites
  across 13 fixture/docs files + 27 spec class-presence assertions. The dominant
  piece; Exp 31 deliberately deferred it as unsafe to do atomically.
- **Button-coupled triggers / closes** (`dialog-trigger`, `drawer-trigger`,
  `dropdown-menu-trigger`, `select-trigger`, `popover-close`): full button-style
  surfaces, several hand-written raw + Button-variant-coupled.
- **Raw-class primitives**: `toggle-group` + `toggle-group-icon` (~20+ raw sites in
  docs `components.tsx` + the toggle fixture), `breadcrumb-glyph` (~5 docs + 2
  fixture), `hover-card-avatar` + `hover-card-body` (positioned-overlays fixture +
  docs).

### Progress update (after Experiment 69) — 27/39 cleared; the consumer-site pattern is proven

Experiments 67–69 PROVED the consumer-site pattern (Exp 67's "not scanned" blocker was
a false negative; the fixture + docs ARE scanned — see the correction below) and
cleared the raw-class primitives: HoverCard avatar/body (Exp 68), toggle-group-icon +
breadcrumb-glyph + the dead toggle-group rule (Exp 69). **Cumulative: 27 of 39
visual-debt rules cleared (Exps 64–69), all dual-suite-green + adversarially reviewed.**

**Remaining ~12 rules = the Button keystone + its coupled triggers/closes.** The Button
is the single most conflict-laden migration in the issue (unlike all prior components,
it has MULTIPLE property-override conflicts between base/variant/size — Exp-41). The
worked-out approach for the final Button experiment(s):

- **Resolve every base↔variant/size conflict with the proven var-set pattern**, so each
  conflicting property is read once from a var the variant/size sets:
  - border-color: base `border border-[var(--radcn-btn-bc,transparent)]`; outline sets
    `[--radcn-btn-bc:var(--radcn-border)]`.
  - min-height: base `min-h-[var(--radcn-btn-mh,var(--radcn-control-height))]`; link
    sets `[--radcn-btn-mh:auto]`; icon-sm/lg set their `2rem`/`2.75rem`.
  - padding-x / width: base `px-[var(--radcn-btn-px,1rem)] w-[var(--radcn-btn-w,max-content)]`;
    link sets `[--radcn-btn-px:0]`; icon/icon-sm/icon-lg set `[--radcn-btn-w:…]` +
    `[--radcn-btn-px:0]`; sm/lg set their px.
  - the rest map directly (gap-2, rounded-md, font-medium, the transition, focus-visible
    ring, disabled/aria-disabled opacity; `--default` bg/fg via the existing
    `--radcn-button-bg/-fg` tokens; secondary/destructive/ghost colors; link underline).
- **Component** (`button.tsx`): emit `buttonBase` + the variant/size var-set utilities,
  KEEP the `radcn-button` + `radcn-button--{variant}`/`--{size}` markers (27 assertions
  check them by name).
- **~95 raw sites across 13 fixture/docs files**: a SCRIPT parses each
  `class="radcn-button radcn-button--{v} radcn-button--{s} …"`, appends `buttonBase` +
  the variant-set + size-set utilities for its specific markers, keeps the markers.
  (Sites have heterogeneous variant/size combos — not a uniform find/replace; the
  script keys off the present `--{v}`/`--{s}` markers.)
- **tokens.css**: remove `.radcn-button` base/focus/disabled + the 6 variant + 6 size
  rules; KEEP the button-group cross-component cascades (Exp 63, they reference
  `.radcn-button`).
- **Gate additions**: verify the button utilities GENERATE in the candidate build
  (consumer-site proof); the 27 `radcn-button--{variant}` `toHaveClass` assertions hold
  (markers kept); any computed button color/size assertions hold via the var reads.
  The Button-coupled triggers/closes (dialog/drawer/dropdown/select-trigger,
  popover-close) follow the same consumer-site pattern, several reusing `buttonBase`.

**Exp 71 correction:** the trigger/close cluster is more entangled than the
single-class audit showed (combined-selector structure rules, `:focus-visible`, drawer
`[data-direction]`/position cascades) — the audit UNDERCOUNTED. The finish must re-audit
INCLUDING combined + `:state`/`[data-*]` rules and migrate each overlay component's
trigger/close as a cohesive unit (split shared selectors). See Experiment 71's Fail.

**CORRECTION (Experiment 67's blocker was retracted):** the Experiment-67 claim that
"consumer files are not Tailwind-scanned" was a FALSE NEGATIVE — the probe used a
nonsense sentinel utility (`zz-sentinel-[7px]`) that Tailwind never generates
regardless of scanning. Re-tested with a REAL utility (`[zoom:2]`), the fixture app AND
the docs app BOTH generate it from their raw class sites with NO `@source` change — so
the consumer files ARE Tailwind-scanned (v4 auto-detects the project templates). The
**consumer-site migration is viable**: appending utilities to the fixture/docs raw
`radcn-*` sites compiles correctly. No enabler experiment is needed; the remaining
blast-radius debt (Button keystone + triggers + toggle/breadcrumb/hover-card) is
migrated by appending the equivalent utilities to each raw site (keeping the asserted
marker classes) and removing the bespoke rule, dual-suite-gated as usual. Experiment 68
performs the first such migration (HoverCard avatar/body).

Recommended order: the smaller primitives first (toggle-group/-icon, breadcrumb-glyph,
hover-card) to establish the consumer-site migration pattern on a contained blast
radius, then the Button keystone + its triggers as the final coordinated experiment(s).

### Progress update (after Experiment 72) — overlay trigger/close cluster cleared

Experiments 70–72 resolved the Button keystone and proved that the remaining
trigger/close debt had to be migrated as a cohesive overlay cluster, not as a
single-class sweep. Experiment 71's failed re-scope was useful: it showed that
the combined trigger/close selectors, visible-border variants, icon close
buttons, focus-visible rules, and retained parent-child cascades were too
entangled for the original narrow plan.

Experiment 72's durable pattern:

- Split combined selectors into per-component utility constants so each surface
  emits the exact structure, color, and focus-visible behavior it owns.
- Share only the true structural base (`overlayTriggerBase`) and read
  border-color from `--radcn-ovl-bc`; visible-border variants set that local
  variable with Tailwind arbitrary-property utilities.
- Keep marker classes and non-styling hooks, but remove the bespoke visual rules
  once the utilities compile.
- Keep only explicitly scoped cascades that still express parent-child layout or
  sibling grouping behavior, such as drawer-content direct-child close
  positioning and the button-group trigger cascades.

The stale "remaining ~12 rules" estimate above is no longer authoritative. The
next Issue 6 step must be a fresh remaining-debt audit across `tokens.css`,
generated package styles, docs, and fixtures before designing the final
migration clusters.

### Progress update (after Experiment 73) — current remaining-debt map

Experiment 73 audited the current `tokens.css` selector inventory and confirmed
that Issue 6 is not ready to close. The old remaining-debt maps are superseded.
The closure standard is now: package styles may keep theme tokens, keyframes,
portal hosts, dependency-free positioning/drag mechanics, and documented
parent-child behavior glue; package styles must not keep ordinary component
surface styling or docs/fixture/demo presentation classes.

Remaining migration clusters, in recommended order:

1. State-indicator residuals: Checkbox, RadioGroup, Switch, Slider, Command,
   menu helpers, and Toggle icon/group state.
2. Modal/drawer layout residuals: AlertDialog size/footer, Sheet side geometry,
   and Drawer static surface/handle/close geometry while retaining drag/portal
   behavior.
3. Docs/fixture/demo CSS evacuation: fixture custom classes, non-custom fixture
   helpers (`radcn-fixture-rounded-button`, `radcn-fixture-aspect-media`,
   `radcn-fixture-navigation-panel`, `radcn-fixture-panel`), chart/data-table
   docs helpers, breadcrumb raw compositions, carousel example classes,
   direction samples, and `radcn-sr-only`.

### Progress update (after Experiment 74) — Select and DatePicker trigger cluster cleared

Experiment 74 moved Select trigger styling, DatePicker trigger/content
overrides, and ButtonGroup Select/DropdownMenu/Popover trigger coupling out of
package CSS and into Tailwind-scanned utilities. The `radcn-select-trigger`
marker remains as a behavior/test/grouping hook, but its visual state styling is
now emitted by `select.tsx`.

Tailwind v4 generated the scoped descendant utilities needed for ButtonGroup
grouping across Select, DropdownMenu, and Popover triggers in both the candidate
fixture and docs pipelines. That confirms the Experiment 70/72 pattern remains
valid for parent-owned grouping cascades: keep marker classes, move visual
coupling into the parent component's emitted arbitrary descendant utilities, and
delete only the matching bespoke CSS selectors. The Button/Input/InputGroup
grouping selectors intentionally remain for the next Field/Form/InputGroup
residual cluster.

### Progress update (after Experiment 75) — Field/Form/InputGroup residuals cleared

Experiment 75 moved Field/Form invalid label color, Field choice-card
presentation, InputGroup nested control/addon/button sizing, and the remaining
ButtonGroup Button/Input/InputGroup coupling out of package CSS and into
Tailwind-scanned utilities.

Two patterns are now established for later residual clusters:

- Parent-owned grouping or state propagation can live on the parent component as
  arbitrary descendant utilities, as with Field invalid labels and ButtonGroup
  child coupling.
- Consumer-only marker classes that package components do not emit directly
  should keep the marker for tests/docs but add the equivalent utilities at the
  scanned call site, as with `radcn-field--choice-card` and raw
  `radcn-input-group-button--{size}` overlay triggers.

## Superseded Remaining Map

The old "Remaining Component Migration Map" that followed this section was
removed after Experiment 73. It was useful historical planning after Experiment
51, but it listed already-migrated clusters as remaining and undercounted
docs/fixture/demo CSS debt. Use the Experiment 73 current remaining-debt map
above as the authoritative queue.

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
