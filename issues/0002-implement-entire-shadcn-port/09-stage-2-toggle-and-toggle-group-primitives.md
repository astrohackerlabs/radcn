# Experiment 9: Stage 2 Toggle and Toggle Group Primitives

## Description

Continue Stage 2 by porting the adjacent pressed-state controls:

- `toggle`
- `toggle-group`

This experiment should not port `slider`, `avatar`, `scroll-area`, or
`hover-card`. It should also not generalize the tabs client enhancement into a
shared framework unless the toggle group implementation proves that a focused
helper cannot stay small.

Experiment 8 established the first RadCN client enhancement boundary for tabs.
This experiment should decide whether toggle-like controls can stay closer to
native HTML:

- single toggles may be native buttons with `aria-pressed`;
- toggle groups may need coordinated single or multiple pressed state;
- group items may need roving focus and disabled item skipping;
- form participation is not native for buttons unless RadCN adds hidden inputs
  or explicitly documents the limitation.

The goal is to preserve shadcn/ui's visible toggle and toggle-group behavior,
author-facing variant/size hooks, accessibility semantics, and keyboard
behavior while using the smallest Remix 3-compatible state strategy.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/toggle.tsx`
- `packages/radcn/src/components/toggle-group.tsx`

The exported component families should include:

- `Toggle`
- `ToggleGroup`
- `ToggleGroupItem`

The public API should preserve shadcn/ui's author-facing shape where practical:

- `Toggle` accepts `pressed`, `disabled`, `variant`, and `size`;
- `Toggle` exposes live `aria-pressed`, `data-state`, and stable hooks;
- `ToggleGroup` accepts `type="single" | "multiple"`;
- `ToggleGroup` accepts `defaultValue`;
- `ToggleGroup` accepts `orientation`;
- `ToggleGroup` exposes `data-type`, `data-orientation`, and stable hooks;
- `ToggleGroupItem` accepts `value`, `disabled`, `variant`, and `size`;
- all parts expose stable `radcn-*` classes, `data-radcn-*` attributes, state
  hooks, and customization hooks.

The experiment must explicitly choose a state strategy for each component:

1. `Toggle` may use a button-local client enhancement that flips
   `aria-pressed` and `data-state`, or it may use a native form/control pattern
   if that preserves button semantics.
2. `ToggleGroup` may use a small group-specific client enhancement, reusing the
   tabs pattern only where necessary for roving focus, disabled item skipping,
   and single/multiple state.

Do not leave both strategies half-implemented. If the implementation chooses
client helpers, export them from the package and load them through the
candidate Remix browser entry, matching the `enhanceTabs()` pattern.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- toggle root hooks;
- toggle-group root and item hooks;
- default, outline, small, default-size, large, icon, pressed, unpressed,
  disabled, horizontal, vertical, single, multiple, focused, and customized
  states;
- stable `radcn-*` classes and `data-radcn-*` attributes;
- visible focus treatment for keyboard navigation.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use Radix if already available, or local
markup that preserves the visible, semantic, and keyboard surfaces needed for
comparison.

Shared scenarios for this experiment should include:

- `toggle/default`
- `toggle/pressed`
- `toggle/disabled`
- `toggle/variants-sizes`
- `toggle/custom-token`
- `toggle-group/single`
- `toggle-group/multiple`
- `toggle-group/disabled`
- `toggle-group/vertical`
- `toggle-group/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN toggle and toggle-group source;
- `Toggle` exposes button semantics, `aria-pressed`, `data-state`, disabled
  behavior, pointer activation, keyboard activation, variants/sizes, and
  customization hooks;
- `ToggleGroup` exposes group semantics, type/orientation hooks, item values,
  pressed state, and disabled hooks;
- single groups keep one pressed item at a time;
- multiple groups allow independent pressed items;
- pointer activation updates state correctly;
- keyboard navigation moves focus through enabled items and skips disabled
  items;
- Enter and Space activate the focused item;
- inactive and active item visuals can be customized through documented hooks;
- any form participation limitation is either solved or documented as an
  approved divergence.

Document approved divergences from upstream shadcn/ui/Radix behavior. At
minimum, the docs must answer:

- whether `Toggle` uses native button state, a client helper, or another
  strategy;
- whether `ToggleGroup` reuses the tabs enhancement pattern or uses a smaller
  group helper;
- how single versus multiple group state is represented;
- how pressed, unpressed, disabled, focused, horizontal, and vertical states
  map to Remix 3 markup and attributes;
- whether toggle buttons participate in native form submission;
- whether the strategy should inform `slider` or later composite widgets.

Add issue-level learnings when the experiment discovers a reusable pressed
state strategy, keyboard test pattern, form limitation, client enhancement
boundary, or approved divergence needed by later components.

## Verification

The experiment passes if:

1. RadCN source exists for `toggle` and `toggle-group`.
2. `packages/radcn` exports both components from package subpaths and the root
   index.
3. The Remix 3 candidate app imports toggle components from RadCN source.
4. Shared scenarios include the five toggle scenarios and five toggle-group
   scenarios listed above.
5. Reference and candidate fixture routes exist for every shared scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
   toggle and toggle-group scenario.
10. Component-specific checks prove semantics, pressed state, pointer behavior,
    keyboard behavior, disabled behavior, group single/multiple behavior,
    roving focus or documented focus behavior, state hooks, and customization
    hooks.
11. Documentation explains source shape, state strategy, keyboard behavior,
    form behavior, approved divergences, and remaining Stage 2 questions.
12. Any reusable discovery needed by later stateful components is added to the
    issue `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 2 unless its result also proves that no
Stage 2 components remain. It should settle pressed-state controls before later
Stage 2 experiments handle range input, avatar fallback behavior, scroll areas,
and the `hover-card` disposition.

## Design Review

Independent AI design review was performed by subagent `Chandrasekhar`, which
approved the design with **Pass** and no required fixes.

The review confirmed that the experiment follows the AGENTS.md issue workflow,
is linked from the Issue 2 README as `Designed`, stays scoped to `toggle` and
`toggle-group`, preserves the one-at-a-time rule, requires RadCN source plus
package exports, candidate and reference fixtures, Playwright coverage for
pressed state, keyboard behavior, disabled behavior, single/multiple group
behavior, customization hooks, documentation, issue learnings, and explicitly
forbids `vendor/` edits.

The reviewer gave one non-blocking implementation suggestion: the final result
should record the chosen state strategy very explicitly, especially whether
`toggle-group` reuses the tabs enhancement pattern or establishes a smaller
pressed-state helper.
