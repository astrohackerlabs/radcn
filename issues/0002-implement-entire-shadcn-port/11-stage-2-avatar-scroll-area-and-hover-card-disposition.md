# Experiment 11: Stage 2 Avatar, Scroll Area, and Hover Card Disposition

## Description

Complete the remaining Stage 2 surface by handling:

- `avatar`
- `scroll-area`
- `hover-card` disposition

This experiment should port the bounded feedback/static primitives `avatar` and
`scroll-area`. It should not implement Stage 3 overlay infrastructure. Instead,
it must decide whether `hover-card` can honestly remain in Stage 2 or must move
to Stage 3 with a recorded rationale.

The inventory classifies `avatar` as bounded feedback with possible fallback
timing behavior, `scroll-area` as a static/small-client-script candidate, and
`hover-card` as overlay behavior with portal, positioning, pointer/focus delay,
and animation concerns. The default hypothesis is therefore:

- `Avatar` can be server-rendered with an optional small enhancement for image
  load/error fallback state.
- `ScrollArea` can use native scrolling with stable viewport, scrollbar, thumb,
  and corner hooks; custom scrollbar interactivity should be either CSS-only or
  explicitly deferred if it requires Radix-like client measurement.
- `HoverCard` should move to Stage 3 because its useful behavior depends on
  floating positioning, portal/dismissal policy, hover/focus delay, and overlay
  animation state.

The goal is to close Stage 2 only if every Stage 2 component has source,
fixtures, tests, documentation, reviewed divergence notes, or an explicit
reviewed deferral to Stage 3.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/avatar.tsx`
- `packages/radcn/src/components/scroll-area.tsx`

The avatar component family should include:

- `Avatar`
- `AvatarImage`
- `AvatarFallback`
- `AvatarBadge`
- `AvatarGroup`
- `AvatarGroupCount`

The public avatar API should preserve the current shadcn/ui author-facing
surface where practical:

- root size variants: `default`, `sm`, and `lg`;
- image `src`, `alt`, `width`, `height`, and native image attributes;
- fallback content that remains meaningful without JavaScript;
- badge and group slots;
- stable `radcn-*` classes and `data-radcn-*` hooks for every part;
- documented fallback behavior for successful images, failed images, and
  image-less avatars.

The experiment must decide whether avatar needs a client enhancement. If native
image behavior plus CSS is enough, document that. If delayed or error fallback
state needs JavaScript, export `enhanceAvatar()` from `radcn/avatar`, load it in
the candidate browser entry, and verify load/error state hooks.

The scroll-area component family should include:

- `ScrollArea`
- `ScrollAreaViewport`
- `ScrollBar`
- `ScrollAreaThumb`
- `ScrollAreaCorner`

The public scroll-area API should preserve shadcn/ui's author-facing shape
where practical:

- root wrapper with stable hooks;
- viewport that owns native overflow and keyboard scrolling;
- vertical and horizontal scrollbar slots;
- thumb and corner hooks;
- orientation metadata on scrollbars;
- focus treatment on the viewport;
- customization tokens for border, background, thumb, corner, and custom
  scenario probes.

The experiment must explicitly choose a scroll strategy:

1. Native-scroll-first implementation with CSS scrollbar styling and decorative
   RadCN scrollbar hooks.
2. Small client helper if thumb size, thumb position, or custom drag behavior
   is needed for honest parity.
3. Deferral of Radix-like custom scrollbar behavior if it requires measurement
   and pointer-drag behavior beyond Stage 2.

Do not leave multiple scroll strategies half-implemented. If RadCN uses native
scrolling and defers draggable custom scrollbar thumbs, document that as an
approved divergence with evidence from the tests and docs.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- avatar root, image, fallback, badge, group, and group count;
- avatar sizes and grouped overlap;
- image loaded, image error, fallback-only, and customized states;
- scroll-area root, viewport, scrollbar, thumb, and corner;
- vertical and horizontal scrollbars;
- focus-visible viewport treatment;
- stable `radcn-*` classes and `data-radcn-*` attributes.

Add candidate fixtures that import the new components from `radcn`, not
fixture-local placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference fixtures may use local markup and CSS instead
of Radix if that better isolates the user-visible behavior under comparison.

Shared avatar scenarios should include:

- `avatar/default`
- `avatar/fallback`
- `avatar/badge`
- `avatar/group`
- `avatar/custom-token`

Shared scroll-area scenarios should include:

- `scroll-area/vertical`
- `scroll-area/horizontal`
- `scroll-area/both`
- `scroll-area/focus`
- `scroll-area/custom-token`

If avatar client fallback handling is implemented, add an error-state scenario
such as `avatar/image-error`. If scroll-area draggable custom thumbs are
implemented, add a drag scenario. If either behavior is deferred, document the
deferral instead of adding a misleading scenario.

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN avatar and scroll-area source;
- avatar parts expose stable hooks and size metadata;
- avatar image and fallback content have correct accessible names or hidden
  decorative behavior;
- avatar fallback-only, badge, group, and customization scenarios render the
  expected hooks;
- any avatar load/error fallback behavior is either verified or documented as a
  deliberate native-first limitation;
- scroll-area viewport is keyboard focusable when appropriate;
- scroll-area viewport scrolls vertically and horizontally through native
  scrolling APIs;
- scrollbar, thumb, corner, orientation, and customization hooks render;
- no scroll-area test depends on exact browser scrollbar pixel output;
- hover-card is not silently skipped: its Stage 2 outcome is recorded, and if
  moved to Stage 3 the rationale cites portal, positioning, delay, dismissal,
  and animation requirements.

Document the Stage 2 closure decision in `docs/radcn-source.md`. The docs must
answer:

- avatar source shape, slots, fallback policy, sizes, badges, groups, and
  customization hooks;
- scroll-area source shape, native scroll strategy, viewport behavior,
  scrollbar hook policy, customization hooks, and any custom-scrollbar
  divergence;
- hover-card disposition: implemented in Stage 2 or moved to Stage 3;
- whether Stage 2 is complete after this experiment.

Add issue-level learnings for reusable avatar fallback policy, native
scroll-area policy, custom scrollbar limitations, hover-card stage placement,
and Stage 2 closure.

If the experiment proves Stage 2 is complete, add a Stage 2 audit file in the
issue folder, for example:

- `stage-2-audit.md`

The audit should list every Stage 2 component, its experiment evidence, source,
fixture/test coverage, docs coverage, and any approved divergence or deferral.

## Verification

The experiment passes if:

1. RadCN source exists for `avatar` and `scroll-area`.
2. `packages/radcn` exports both components from package subpaths and the root
   index.
3. The Remix 3 candidate app imports avatar and scroll-area components from
   RadCN source.
4. Shared scenarios include the required avatar and scroll-area scenarios.
5. Reference and candidate fixture routes exist for every shared scenario.
6. Component-specific Playwright checks cover avatar semantics, hooks,
   fallback/badge/group states, scroll-area native scrolling, orientation hooks,
   focus behavior, and customization hooks.
7. `hover-card` has an explicit reviewed Stage 2 outcome: ported now, or moved
   to Stage 3 with rationale and issue/docs updates.
8. If Stage 2 is complete, a Stage 2 audit documents every Stage 2 component
   and all approved divergences/deferrals.
9. `pnpm radcn:typecheck` passes.
10. `pnpm fixtures:candidate:typecheck` passes.
11. `pnpm fixtures:reference:typecheck` passes.
12. The focused component-specific Playwright test for this experiment passes.
13. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    new avatar and scroll-area scenario.
14. Documentation explains source shape, native/client strategy, customization
    hooks, approved divergences, hover-card disposition, and Stage 2 closure.
15. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
16. No files under `vendor/` are modified.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment completes Stage 2 only if the result and Stage 2 audit prove
that `accordion`, `collapsible`, `tabs`, `toggle`, `toggle-group`, `checkbox`,
`radio-group`, `switch`, `slider`, `progress`, `avatar`, `scroll-area`, and the
`hover-card` disposition all satisfy the issue's Stage 2 requirements.

## Design Review

Independent AI design review was performed by subagent `Averroes`, which
approved the design with **Pass** and no blocking findings.

The review confirmed that the plan is linked from the issue README as
`Designed`, preserves the one-experiment-at-a-time workflow, correctly targets
the remaining Stage 2 scope, requires avatar and scroll-area source, exports,
styles, fixtures, scenarios, tests, docs, and learnings, and requires an
explicit reviewed Stage 2 outcome for `hover-card`.

The review also confirmed that the Stage 2 audit and closure criteria are
included before Stage 2 can be considered complete, verification includes
typechecks, focused Playwright coverage, artifact generation, documentation,
learnings, `vendor/` cleanliness, and completion review, and that
`git status --short vendor` returned no output.
