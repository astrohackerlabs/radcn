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
