# Experiment 14: Stage 3 Positioned Overlay Foundation

## Description

Continue Stage 3 by porting the non-modal positioned overlay family that shares
portal, anchor geometry, collision, side, align, delay, and dismissal behavior:

- `popover`
- `tooltip`
- `hover-card`

This experiment should not port `dropdown-menu`, `context-menu`, `menubar`,
`select`, or `drawer`. Menus need roving focus, typeahead, submenu behavior, and
selection semantics beyond this positioned overlay foundation. Drawer needs its
own gesture and mobile policy. The goal here is to establish the smaller
positioned overlay primitive that those later components can either reuse or
intentionally bypass.

The RadCN implementation should match shadcn/ui's visible behavior and
author-facing customization value, while using Remix 3-compatible server markup
plus a small package-exported browser enhancement. Exact DOM equivalence is not
the goal. The port should preserve:

- stable root, trigger, content, portal, title, description, header, arrow, and
  provider slots where upstream exposes them;
- click-to-open popover behavior with Escape and outside-pointer dismissal;
- hover/focus tooltip behavior with configurable delay and accessible trigger
  description relationships;
- hover/focus hover-card behavior with configurable delay and non-modal content;
- side, align, side offset, collision/clamping, and transform-origin hooks;
- non-modal behavior: no body scroll lock, no focus trap, and no
  `aria-modal`;
- portal rendering inside the fixture stage portal root so visual artifacts
  capture open overlay content.

The experiment should create a shared positioned overlay helper rather than
copying separate geometry and portal code into every component. The helper
should stay scoped to non-modal overlays and should not absorb the modal
`setupModal()` behavior from Experiment 12.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/popover.tsx`
- `packages/radcn/src/components/tooltip.tsx`
- `packages/radcn/src/components/hover-card.tsx`

Add a shared helper only if it materially reduces duplicated overlay behavior.
The expected shape is a small browser helper such as
`setupPositionedOverlay()` or equivalent, with component-specific wrappers such
as `enhancePopover()`, `enhanceTooltip()`, and `enhanceHoverCard()`.

The helper should support:

- root, trigger, anchor, portal, content, and close selectors;
- portal movement to the nearest `[data-fixture-stage]` portal root when
  present, and document body fallback otherwise;
- trigger-generated `aria-controls`/`aria-expanded` for popover;
- trigger-generated `aria-describedby` for tooltip;
- open and closed `data-state` on root, trigger, portal, and content;
- side values `top`, `right`, `bottom`, and `left`;
- align values `start`, `center`, and `end`;
- side offsets;
- viewport or fixture-stage collision clamping;
- CSS custom properties for transform origin and available width/height where
  practical;
- Escape close for open overlays;
- outside-pointer close for popover;
- pointer/focus open and leave/blur close with delay for tooltip and
  hover-card;
- hover-region tracking for hover-card so content remains open while the
  pointer moves from trigger to floating content and closes only after leaving
  both trigger and content;
- close-timer cancellation when pointer or focus re-enters before the close
  delay expires;
- cleanup of timers and event handlers during normal repeated fixture use.

The popover component family should include:

- `Popover`
- `PopoverTrigger`
- `PopoverAnchor`
- `PopoverPortal`
- `PopoverContent`
- `PopoverClose`
- `PopoverHeader`
- `PopoverTitle`
- `PopoverDescription`

The tooltip component family should include:

- `TooltipProvider`
- `Tooltip`
- `TooltipTrigger`
- `TooltipPortal`
- `TooltipContent`
- `TooltipArrow`

The hover-card component family should include:

- `HoverCard`
- `HoverCardTrigger`
- `HoverCardPortal`
- `HoverCardContent`

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load the new browser enhancements from
`fixtures/candidate-remix/app/assets/entry.ts`.

Extend RadCN styles and tokens for:

- popover content, header, title, description, close, side/align state, and
  customization hooks;
- tooltip content, arrow, side/align state, provider delay hooks, and
  customization hooks;
- hover-card content, side/align state, delay hooks, and customization hooks;
- reduced-motion-compatible animation hooks for open and closed states.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and local geometry
code instead of Radix if it preserves the visible, semantic, keyboard, pointer,
focus, and customization behavior needed for comparison.

Shared popover scenarios should include:

- `popover/default`
- `popover/default-open`
- `popover/side-align`
- `popover/outside-dismiss`
- `popover/custom-token`

Shared tooltip scenarios should include:

- `tooltip/default`
- `tooltip/focus`
- `tooltip/side`
- `tooltip/delay`
- `tooltip/content-hover`
- `tooltip/custom-token`

Shared hover-card scenarios should include:

- `hover-card/default`
- `hover-card/focus`
- `hover-card/side-align`
- `hover-card/delay`
- `hover-card/content-hover`
- `hover-card/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN popover, tooltip, and hover-card source;
- positioned overlay portal content is moved into the fixture-stage portal root;
- popover opens from click, exposes `aria-expanded`, positions relative to its
  trigger or anchor, closes on Escape, closes on outside pointer, supports close
  slots, supports default-open state, and does not lock scroll or trap focus;
- tooltip opens on hover and focus after the configured delay, connects trigger
  and content with `aria-describedby`, closes on Escape and pointer/blur exit,
  renders the arrow hook, supports side/offset positioning, and does not lock
  scroll or trap focus;
- tooltip trigger-to-content pointer movement is either preserved where the
  RadCN interaction model supports hoverable tooltip content, or recorded as an
  explicit reviewed divergence with a reason and a test that proves the chosen
  behavior;
- hover-card opens on hover and focus after the configured delay, positions
  relative to the trigger, closes on pointer/blur exit and Escape, supports
  side/align/offset hooks, and does not lock scroll or trap focus;
- hover-card stays open while the pointer moves from trigger to floating
  content, closes only after the pointer leaves both regions, and cancels close
  timers if the pointer re-enters before the close delay expires;
- collision behavior keeps content visibly inside the screenshot stage or
  viewport for edge scenarios;
- customization token scenarios visibly change content and arrow styling where
  applicable;
- artifact screenshots capture open overlay content inside the fixture stage;
- no files under `vendor/` are modified.

Document the positioned overlay strategy in `docs/radcn-source.md`. The docs
must answer:

- how non-modal positioned overlays differ from modal overlays;
- why popover, tooltip, and hover-card share one positioned helper;
- what the side, align, offset, collision, portal, and transform-origin policy
  is;
- how tooltip and hover-card delays work;
- what accessibility relationships each component owns;
- which behavior remains unsolved for `dropdown-menu`, `context-menu`, and
  `drawer`.

Add issue-level learnings for the non-modal overlay helper boundary, portal
capture behavior, collision policy, delay policy, tooltip accessibility, and any
approved divergence from Radix/shadcn behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `popover`, `tooltip`, and `hover-card`.
2. Shared non-modal positioned overlay behavior is implemented once and reused
   by the three component families, or any duplication is explicitly justified
   in the result.
3. `packages/radcn` exports all three component families from package subpaths
   and the root index.
4. The Remix 3 candidate app loads the required browser enhancements.
5. Shared scenarios include all required popover, tooltip, and hover-card
   scenarios.
6. Reference and candidate fixture routes exist for every shared scenario.
7. Component-specific Playwright checks cover popover click, close, Escape,
   outside pointer, default-open, placement, portal capture, accessibility
   hooks, customization hooks, and non-modal behavior.
8. Component-specific Playwright checks cover tooltip hover/focus, delay,
   Escape, pointer/blur exit, `aria-describedby`, arrow hook, placement,
   customization hooks, portal capture, non-modal behavior, and either
   trigger-to-content hover persistence or an approved documented divergence.
9. Component-specific Playwright checks cover hover-card hover/focus, delay,
   Escape, pointer/blur exit, placement, customization hooks, portal capture,
   non-modal behavior, trigger-to-content hover persistence, leave-both-region
   closing, and close-timer cancellation on re-entry.
10. Collision checks prove edge overlay content remains visible inside the
    screenshot stage or viewport.
11. `pnpm radcn:typecheck` passes.
12. `pnpm fixtures:candidate:typecheck` passes.
13. `pnpm fixtures:reference:typecheck` passes.
14. The focused positioned-overlay Playwright test passes.
15. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    popover, tooltip, and hover-card scenario.
16. Documentation explains helper boundaries, positioning, portal strategy,
    delay policy, accessibility relationships, approved divergences, and
    remaining Stage 3 questions.
17. Any reusable discovery needed by later overlays is added to the issue
    `## Learnings` section with evidence.
18. No files under `vendor/` are modified.
19. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 3. It should complete the non-modal
positioned overlay foundation and leave menu semantics plus drawer gestures for
later Stage 3 experiments.

## Design Review

Independent AI design review was performed by subagent `Halley`, which found a
blocking gap in the first draft: hover-card parity requires trigger-to-content
hover-region behavior, close-after-leaving-both-regions behavior, and close
timer cancellation coverage. Tooltip also needed either comparable
trigger-to-content hover coverage or an explicit reviewed divergence.

The plan was updated to add `tooltip/content-hover` and
`hover-card/content-hover` scenarios, require hover-card hover-region
tracking, require close-timer cancellation checks, and require tooltip
trigger-to-content behavior coverage or a documented divergence.

After the update, `Halley` approved the design with **Pass** and no remaining
blocking findings.

## Result

**Result:** Pass

Experiment 14 ports the non-modal positioned overlay family:

- `popover`
- `tooltip`
- `hover-card`

RadCN source was added for all three component families, plus a shared
`setupPositionedOverlay()` helper under `packages/radcn/src/utils`. The helper
owns non-modal portal movement, state, trigger/content relationships,
side/align/offset geometry, stage-or-viewport collision clamping, Escape close,
outside dismissal for popover, hover/focus delays for tooltip and hover-card,
trigger-to-content hover persistence, close-timer cancellation, and
AbortController-backed listener cleanup.

The candidate Remix app imports real RadCN components and loads
`enhancePopover()`, `enhanceTooltip()`, and `enhanceHoverCard()` from package
subpaths. The React Router reference app has paired shadcn-inspired fixtures
for the same scenarios.

Shared scenarios now include:

- `popover/default`
- `popover/default-open`
- `popover/side-align`
- `popover/outside-dismiss`
- `popover/custom-token`
- `tooltip/default`
- `tooltip/focus`
- `tooltip/side`
- `tooltip/delay`
- `tooltip/content-hover`
- `tooltip/custom-token`
- `hover-card/default`
- `hover-card/focus`
- `hover-card/side-align`
- `hover-card/delay`
- `hover-card/content-hover`
- `hover-card/custom-token`

Verification commands run:

```bash
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm fixtures:reference:typecheck
pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/positioned-overlays.spec.ts
pnpm fixtures:artifacts
```

All verification commands passed. The focused positioned-overlays Playwright
file ran 6 tests successfully. `pnpm fixtures:artifacts` ran 361 Playwright
tests successfully.

The generated artifact manifest contains:

- 298 screenshot entries;
- 149 shared scenarios;
- 5 popover scenarios;
- 6 tooltip scenarios;
- 6 hover-card scenarios;
- paired `reference` and `candidate` artifacts;
- reference app on port 4601 and candidate app on port 4602.

No files under `vendor/` were modified.

## Completion Review

**Reviewer:** Carson

**Result:** Pass

Carson initially found two blocking issues:

- `setupPositionedOverlay()` did not implement the planned cleanup path for
  timers and event handlers.
- The fixtures exported `PopoverAnchor` but did not exercise or verify anchor
  positioning.

Both findings were fixed. `setupPositionedOverlay()` now registers listeners
with an `AbortController`, clears open and close timers, stores a cleanup
function on the root, deletes ready state during cleanup, and returns the
cleanup function. The `popover/side-align` fixture now renders
`PopoverAnchor`, the reference fixture mirrors the anchor marker, and the
focused Playwright spec verifies content placement against the anchor rather
than only the trigger.

After the fixes, the verification commands were rerun:

```bash
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm fixtures:reference:typecheck
pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/positioned-overlays.spec.ts
pnpm fixtures:artifacts
```

All rerun verification commands passed, and Carson approved the result with
**Pass** and no remaining blocking findings.

## Conclusion

Experiment 14 completes the non-modal positioned overlay foundation for Stage
3. Later non-modal overlays should start from `setupPositionedOverlay()` when
they need anchor geometry, portal capture, side/align/offset hooks, and simple
dismissal or hover/focus timing.

This experiment does not complete Stage 3. The next Stage 3 experiment should
handle menu-specific overlays such as `dropdown-menu` and `context-menu`, or
separately design `drawer` gesture behavior. Menus should not be treated as
just another positioned overlay because they still need roving focus, typeahead,
checked/radio item state, submenu behavior, and menu-specific accessibility
semantics.
