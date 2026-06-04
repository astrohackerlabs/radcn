# Experiment 21: Stage 4 Carousel and Stage Closure

## Description

Complete Stage 4 by porting `carousel`, the final remaining composite keyboard
widget. The upstream shadcn/ui carousel is a React client component built around
`embla-carousel-react`; RadCN needs the same public component parts and
shadcn-style visible behavior, but with a Remix 3 web-first implementation.

The experiment should keep the familiar author-facing parts:

- `Carousel`
- `CarouselContent`
- `CarouselItem`
- `CarouselPrevious`
- `CarouselNext`

It must add `enhanceCarousel()` and load that enhancement from the candidate
Remix app. The required previous/next controls, keyboard movement, native
scroll synchronization, boundary disabled state, and live state hooks are
browser behavior; a static-only carousel would not satisfy this experiment.

The implementation strategy is native scroll-snap plus small progressive
enhancement:

- the root is a `role="region"` with `aria-roledescription="carousel"`;
- the root requires an accessible name through `ariaLabel` or `ariaLabelledby`;
- content is an overflow viewport with horizontal or vertical scroll snap;
- items are `role="group"` with `aria-roledescription="slide"`;
- items expose an accessible slide label, defaulting to `Slide {n} of {total}`
  unless an item-specific `ariaLabel` or `ariaLabelledby` is provided;
- previous/next buttons scroll by one slide and expose disabled state at the
  first/last slide;
- ArrowLeft/ArrowRight operate horizontal carousels and ArrowUp/ArrowDown
  operate vertical carousels;
- Home/End move to the first/last slide;
- state hooks expose current slide, previous/next availability, orientation,
  motion direction, and slide selection.

The RadCN replacement API should be explicit instead of pretending to support
Embla's React API:

- `Carousel` supports `ariaLabel`, `ariaLabelledby`, `defaultIndex`,
  `orientation`, `loop`, and `slideCount` only if the rendered children cannot
  be counted reliably during server render.
- `CarouselContent` supports spacing/layout class and style hooks but does not
  accept Embla options.
- `CarouselItem` supports `ariaLabel`, `ariaLabelledby`, `index`, `selected`,
  and the usual `class`/`style` hooks.
- `CarouselPrevious` and `CarouselNext` support labels, disabled override,
  class/style hooks, and render button controls compatible with RadCN styling.
- `enhanceCarousel()` owns current-index state, control disabled state, scroll
  position, keyboard movement, native scroll synchronization, and emitted
  `radcn-carousel-select` / `radcn-carousel-scroll` events.

This experiment should not begin Stage 5 components such as `chart`,
`data-table`, `sonner`, `toast`, `resizable`, `sidebar`, `form`,
`input-group`, or `input-otp`. After carousel passes, the experiment should
record a Stage 4 audit showing every Stage 4 component status and why Stage 5
can begin.

Do not copy `embla-carousel-react` or add it as a RadCN dependency unless the
implementation proves that native scroll-snap cannot preserve the required
visible, keyboard, pointer, responsive, accessibility, and customization
behavior. If Embla compatibility remains unsupported, record it as an approved
divergence: RadCN supports the core carousel component parts and behavior, but
does not expose the React `api`, `setApi`, `opts`, or plugin contract.

Shared carousel scenarios should include:

- `carousel/default`
- `carousel/initial-slide`
- `carousel/vertical`
- `carousel/multiple-visible`
- `carousel/spacing`
- `carousel/disabled-boundaries`
- `carousel/keyboard`
- `carousel/custom-token`

Add component-specific Playwright checks proving:

- candidate fixtures render real RadCN carousel source;
- package subpath and root exports exist for all supported carousel parts and
  `enhanceCarousel()`;
- the candidate app loads carousel enhancement;
- root, content, item, previous, and next semantics are present;
- slides expose `role="group"` and `aria-roledescription="slide"`;
- carousel regions have accessible names and slides expose deterministic
  `Slide n of total` labels or authored labels;
- initial slide selection is deterministic and reflected in public data hooks;
- previous/next buttons move by one slide and disable at boundaries;
- keyboard navigation covers horizontal arrows, vertical arrows, Home, End,
  disabled-boundary behavior, and deterministic focus/state;
- click controls update selected/current hooks;
- native scroll, touchpad-style scroll, or `scrollTo()` movement snaps/syncs
  selected/current hooks and previous/next disabled state without requiring a
  button click;
- multiple-visible and spacing variants preserve shadcn-style layout behavior;
- vertical orientation preserves layout and keyboard policy;
- custom token hooks affect rendered styles;
- artifact screenshots capture paired reference/candidate output for every
  carousel scenario;
- no files under `vendor/` are modified.

Document the carousel strategy in `docs/radcn-source.md`. The docs must answer:

- why RadCN does not copy the React Embla wrapper by default;
- what carousel behavior is core versus unsupported Embla/plugin/API
  compatibility;
- how scroll-snap, state hooks, keyboard navigation, boundary disabled state,
  orientation, responsive/multiple-visible layout, and customization work;
- how carousel differs from listbox, menu, navigation, and date-grid widgets;
- why Stage 4 is complete after carousel;
- what Stage 5 should tackle next.

Add issue-level learnings for the carousel native-scroll strategy, Embla/API
divergence, slide/region semantics, keyboard policy, and Stage 4 closure.

Create `issues/0002-implement-entire-shadcn-port/stage-4-audit.md` as part of
the result. The audit should list every Stage 4 component or disposition,
completing experiment, source/export status, fixture/artifact status,
focused-test status, documentation status, reviewed divergences, and any
remaining non-blocking hardening notes.

## Changes

Expected implementation files:

- `packages/radcn/src/components/carousel.tsx`
  - Add `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`,
    `CarouselNext`, exported prop/types, and `enhanceCarousel()`.
  - Preserve shadcn-style public parts while using native scroll/slide state
    instead of React context and Embla hooks.
  - Support the explicit RadCN API: `ariaLabel`, `ariaLabelledby`,
    `defaultIndex`, `orientation`, `loop`, item labels/index hooks, and
    control labels/disabled overrides.
- `packages/radcn/package.json`
  - Add the `./carousel` export.
- `packages/radcn/src/index.ts`
  - Export carousel parts, types, and enhancement.
- `packages/radcn/src/styles/tokens.css`
  - Add carousel classes, state styles, orientation styles, spacing/multiple
    visible hooks, control positioning, disabled states, and custom tokens.
- `packages/radcn/src/styles/index.ts`
  - Regenerate after token changes.
- `fixtures/candidate-remix/app/assets/entry.ts`
  - Load `enhanceCarousel()`.
- `fixtures/scenarios/types.ts`
  - Add `carousel` to `FixtureComponent`.
- `fixtures/scenarios/index.ts`
  - Add every shared carousel scenario.
- `fixtures/candidate-remix/app/fixtures/carousel.tsx`
  - Add candidate fixtures using real RadCN carousel source.
- `fixtures/candidate-remix/app/fixtures/index.tsx`
  - Route candidate carousel fixtures.
- `fixtures/reference-react-router/app/fixtures/carousel.tsx`
  - Add matching React Router reference fixtures.
- `fixtures/reference-react-router/app/fixtures/index.ts`
  - Route reference carousel fixtures.
- `fixtures/reference-react-router/app/app.css`
  - Add reference carousel styles.
- `fixtures/tests/carousel.spec.ts`
  - Add focused candidate behavior tests.
- `docs/radcn-source.md`
  - Document the carousel implementation strategy and Stage 4 closure.
- `issues/0002-implement-entire-shadcn-port/README.md`
  - Update the experiment status and add reusable learnings.
- `issues/0002-implement-entire-shadcn-port/stage-4-audit.md`
  - Add the Stage 4 closure audit.

## Verification

The experiment passes if:

1. RadCN source exists for `carousel`.
2. `packages/radcn` exports every supported carousel part from `radcn/carousel`
   and the root index.
3. The Remix 3 candidate app loads `enhanceCarousel()`.
4. Shared scenarios include every required carousel scenario.
5. Reference and candidate fixture routes exist for every shared carousel
   scenario.
6. Component-specific Playwright checks cover semantics, current slide state,
   previous/next click behavior, keyboard behavior, disabled boundary behavior,
   native scroll synchronization, accessible region and slide labels, vertical
   orientation, multiple-visible layout, spacing, customization hooks, and
   non-vendor cleanliness.
7. Artifact screenshots capture paired reference/candidate output for every
   carousel scenario.
8. Documentation explains the native carousel strategy, Embla/API/plugin
   divergence, keyboard and state policy, customization hooks, and Stage 4
   closure.
9. The issue `## Learnings` section records reusable discoveries needed by
   Stage 5 and later carousel hardening.
10. `stage-4-audit.md` proves that Stage 4 is complete and lists every Stage 4
    component/disposition with evidence.
11. `pnpm radcn:typecheck` passes.
12. `pnpm fixtures:candidate:typecheck` passes.
13. `pnpm fixtures:reference:typecheck` passes.
14. Focused carousel Playwright tests pass.
15. `pnpm fixtures:artifacts` passes.
16. `git status --short -- vendor` returns no output.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should complete Stage 4, but it should not close Issue 2.
Issue 2 still requires Stage 5 outcomes for the React-heavy systems, blocks,
and deferred components.

## Design Review

Independent AI design review was performed by subagent `Darwin`. The first
review returned **Fail** with four blocking findings:

- `enhanceCarousel()` was treated as optional even though required carousel
  behavior needs browser enhancement.
- The plan said RadCN should preserve the same public component shape while
  rejecting Embla `api`, `setApi`, `opts`, and plugin compatibility, but did
  not define the replacement RadCN API.
- Native scroll/pointer state synchronization was underspecified and could have
  allowed tests to cover only button clicks.
- Accessibility naming policy was incomplete for the carousel region and
  slides.

Fixes applied:

- Made `enhanceCarousel()` mandatory.
- Added an explicit RadCN carousel API with `ariaLabel`, `ariaLabelledby`,
  `defaultIndex`, `orientation`, `loop`, slide/item labels and indexes, control
  labels, and control disabled overrides.
- Required native scroll synchronization coverage that updates current hooks and
  previous/next disabled state without a button click.
- Required accessible region names and deterministic slide labels.

The re-review returned **Pass** with no remaining blocking findings. Darwin
confirmed that the plan consistently requires `enhanceCarousel()` export and
candidate loading, avoids implying Embla API compatibility, and remains scoped
to final Stage 4 carousel closure without starting Stage 5.

## Result

**Result:** Pass

Experiment 21 ported `carousel` as the final Stage 4 composite widget and
recorded the Stage 4 closure audit.

Implemented:

- Added `packages/radcn/src/components/carousel.tsx` with `Carousel`,
  `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, typed
  props, and `enhanceCarousel()`.
- Exported carousel from `radcn/carousel` and the root RadCN package index.
- Loaded `enhanceCarousel()` from the candidate Remix asset entry.
- Added carousel styles, state hooks, orientation styles, spacing and
  multiple-visible variants, disabled control styling, and custom token hooks.
- Added shared carousel scenarios plus paired React Router reference and Remix
  candidate fixtures for default, initial slide, vertical, multiple-visible,
  spacing, disabled-boundaries, keyboard, and custom-token coverage.
- Added focused Playwright coverage for semantics, accessible labels, initial
  state, previous/next behavior, boundary disabled state, keyboard movement,
  native scroll synchronization, vertical layout, multiple-visible layout,
  spacing, and customization hooks.
- Documented the native scroll-snap carousel strategy and approved Embla API
  divergence in `docs/radcn-source.md`.
- Added issue-level learnings for carousel semantics, native scroll
  enhancement, unsupported Embla API/plugin compatibility, and Stage 4 closure.
- Added `stage-4-audit.md` showing every Stage 4 component or disposition has
  source/export status, fixture/artifact coverage, focused tests,
  documentation, and divergence notes.

Verification:

- `pnpm radcn:typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm fixtures:reference:typecheck` passed. It still prints the existing
  React Router `module.register()` deprecation warning.
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/carousel.spec.ts`
  passed with 4 tests.
- `pnpm fixtures:artifacts` passed with 560 tests.
- `git diff --check` passed.
- `git status --short -- vendor` returned no output.

## Conclusion

Stage 4 is complete after carousel. RadCN now has ports or explicit
recipe/block dispositions for the Stage 4 selection, search, menu/navigation,
date-grid, and carousel widgets, with shared fixtures, screenshot artifacts,
focused behavior tests, documentation, reviewed divergence notes, and a closure
audit.

Issue 2 remains open. The next experiment should begin Stage 5 and tackle the
React-heavy systems, blocks, and deferred components: `chart`, `data-table`,
`sonner`, `toast`, `resizable`, `sidebar`, `form`, `input-group`,
`input-otp`, and any remaining block dispositions.

## Completion Review

Independent AI completion review was performed by subagent `Nash` and returned
**Pass**.

Nash confirmed that the carousel source exists, exports are wired through both
`radcn/carousel` and the root package, the candidate Remix app loads
`enhanceCarousel()`, all required shared scenarios are registered, paired
fixtures exist, focused Playwright coverage exercises the required semantics
and behavior, docs and issue learnings record the native scroll-snap strategy
and Embla divergence, `stage-4-audit.md` closes Stage 4, and vendor cleanliness
is confirmed.

Non-blocking hardening notes for later work:

- Add explicit tests for `loop`.
- Add explicit tests for disabled override controls.
- Add explicit tests for emitted `radcn-carousel-select` and
  `radcn-carousel-scroll` events.
