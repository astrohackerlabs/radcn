# Experiment 17: Stage 4 Select Listbox Foundation

## Description

Begin Stage 4 by porting `select` and establishing the RadCN listbox selection
foundation.

This is the right first Stage 4 experiment because `select` is the smallest
high-risk composite widget that combines:

- trigger/content overlay behavior from Stage 3;
- option selection and selected-value display;
- roving focus and typeahead;
- disabled option skipping;
- grouped options, labels, separators, and scroll buttons;
- form value submission and reset behavior;
- placeholder, invalid, disabled, and size styling hooks.

This experiment should not port `combobox`, `command`, `menubar`,
`navigation-menu`, `calendar`, `date-picker`, or `carousel`. Those components
should consume what is learned here instead of being designed upfront.

RadCN should match shadcn/ui's visible behavior and author-facing
customization value while using Remix 3-compatible server markup plus
package-exported browser enhancements. Exact DOM equivalence with Radix Select
is not required.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/select.tsx`

The select component family should include:

- `Select`
- `SelectTrigger`
- `SelectValue`
- `SelectPortal`
- `SelectContent`
- `SelectViewport`
- `SelectGroup`
- `SelectLabel`
- `SelectItem`
- `SelectItemIndicator`
- `SelectSeparator`
- `SelectScrollUpButton`
- `SelectScrollDownButton`

Add package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load the browser enhancement from:

- `fixtures/candidate-remix/app/assets/entry.ts`

The implementation should use a dedicated helper such as `enhanceSelect()` or
`setupSelect()`. It may reuse small positioning, portal, clamping, typeahead,
or disabled-skip ideas from Stage 3 helpers, but it must not treat select as a
menu. Select owns a listbox selection model, displayed value, form value, and
single-selection option semantics.

Select props and state hooks should support:

- root `name`, `defaultValue`, `value` as initial value only, `required`,
  `disabled`, `invalid`, `defaultOpen`, `id`, `class`, and `style`;
- trigger `size` of `default` or `sm`, `ariaLabel`, `class`, and `style`;
- value placeholder text;
- content `position` of `item-aligned` or `popper`, `side`, `align`,
  `sideOffset`, `class`, and `style`;
- item `value`, `textValue`, `disabled`, `class`, and `style`;
- stable `data-radcn-select-*` hooks for every public part;
- shared state hooks: `data-state`, `data-disabled`, `data-invalid`,
  `data-placeholder`, `data-highlighted`, `data-selected`, `data-value`,
  `data-side`, `data-align`, and `data-position`.

Accessibility and keyboard policy:

- trigger exposes `role="combobox"`, `aria-haspopup="listbox"`,
  `aria-expanded`, `aria-controls`, and `aria-activedescendant` while open;
- content/viewport exposes `role="listbox"`;
- items expose `role="option"`, `aria-selected`, and `aria-disabled` when
  applicable;
- labels and separators preserve non-option semantics;
- click, Enter, Space, ArrowDown, and ArrowUp open the listbox;
- ArrowDown opens on the first enabled item, ArrowUp opens on the last enabled
  item, and existing selected value opens highlighted;
- ArrowUp, ArrowDown, Home, and End rove among enabled options with wrapping;
- typeahead searches enabled option text;
- Enter, Space, and pointer click select the highlighted/clicked option,
  update trigger display, update selected hooks, update form value, close, and
  restore focus to the trigger;
- Escape closes without changing the selected value and restores trigger focus;
- outside pointer closes without changing the selected value;
- Tab and Shift+Tab close without preventing default focus movement;
- disabled trigger cannot open;
- disabled options are skipped by keyboard, ignored by typeahead, and cannot be
  selected by pointer.

Form policy:

- if `name` is provided, enhancement should create or synchronize an associated
  form control that submits the selected value;
- reset should restore the initial/default value and trigger display;
- required/invalid state should be represented for styling and accessibility;
- if native browser constraint validation cannot be preserved for the custom
  select surface, record that as an explicit reviewed divergence and keep
  `native-select` documented as the native-validation option.

Overlay and positioning policy:

- select content should move to the nearest fixture-stage portal root when
  present, and document body fallback otherwise;
- `position="item-aligned"` should align content to the trigger while keeping
  the selected item visually aligned where practical;
- `position="popper"` should use side/align/offset hooks and stage-or-viewport
  clamping like Stage 3 positioned overlays;
- content should expose available width/height and transform-origin variables
  where useful;
- scroll up/down buttons should render for long lists and support pointer or
  keyboard-visible scroll behavior.

Extend RadCN styles and tokens for:

- select root, trigger, value, icon, portal, content, viewport, group, label,
  item, item indicator, separator, scroll buttons, placeholder, disabled,
  invalid, highlighted, selected, open/closed state, side/align/position state,
  and custom token hooks;
- reduced-motion-compatible open animations;
- long-list scrolling.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and local geometry
code instead of Radix if it preserves the visible, semantic, keyboard, pointer,
focus, form, and customization behavior needed for comparison artifacts.

Shared select scenarios should include:

- `select/default`
- `select/placeholder`
- `select/groups`
- `select/disabled-invalid`
- `select/keyboard-typeahead`
- `select/scrollable`
- `select/popper-placement`
- `select/form-submit-reset`
- `select/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN select source;
- select portal content is moved into the fixture-stage portal root;
- trigger ARIA relationships and state hooks update on open/close;
- content has listbox semantics and items have option semantics;
- placeholder and selected value display correctly;
- click, Enter, Space, ArrowDown, and ArrowUp open paths work with
  deterministic initial highlight;
- keyboard roving supports ArrowUp, ArrowDown, Home, End, wrapping, and
  disabled skip;
- typeahead highlights matching enabled options and skips disabled options;
- Enter, Space, and pointer selection update selected state, visible value,
  form value, and close;
- Escape, outside pointer, Tab, and Shift+Tab close without changing selection;
- disabled trigger cannot open and disabled options cannot be selected;
- group, label, separator, indicator, scroll buttons, size, invalid, disabled,
  side/align/position, and custom token hooks render;
- form submit includes the selected value and reset restores the default value;
- artifact screenshots capture open select content inside the fixture stage;
- no files under `vendor/` are modified.

Document the select/listbox strategy in `docs/radcn-source.md`. The docs must
answer:

- how custom `select` differs from `native-select`;
- what Stage 3 overlay behavior is reused;
- what listbox selection behavior is new in Stage 4;
- how trigger display, selected item state, and form value synchronization work;
- how disabled, required, invalid, placeholder, group, label, separator, and
  scroll-button behavior work;
- how typeahead and keyboard roving work;
- what divergences from Radix/shadcn are approved;
- what later `combobox`, `command`, and `menubar` experiments should reuse or
  avoid.

Add issue-level learnings for the listbox helper boundary, form control policy,
typeahead/roving policy, custom-select versus native-select boundary, and any
approved divergence from Radix/shadcn behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `select`.
2. The select component family exports all required parts and `enhanceSelect()`.
3. `packages/radcn` exports select from a package subpath and the root index.
4. The Remix 3 candidate app loads the select browser enhancement.
5. Shared scenarios include every required select scenario.
6. Reference and candidate fixture routes exist for every shared select
   scenario.
7. Component-specific Playwright checks cover portal capture, trigger ARIA,
   listbox/option semantics, placeholder, selected value display, open paths,
   deterministic highlight, roving focus, disabled skip, typeahead, pointer and
   keyboard selection, Escape, outside pointer, Tab/Shift+Tab, disabled trigger,
   disabled options, group/label/separator/indicator/scroll/size/invalid hooks,
   popper placement, form submit/reset, customization hooks, and non-vendor
   cleanliness.
8. `pnpm radcn:typecheck` passes.
9. `pnpm fixtures:candidate:typecheck` passes.
10. `pnpm fixtures:reference:typecheck` passes.
11. The focused select Playwright test passes.
12. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    select scenario.
13. Documentation explains custom-select versus native-select boundaries,
    overlay reuse, listbox selection, form synchronization, keyboard/typeahead
    policy, approved divergences, and implications for later Stage 4 widgets.
14. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
15. No files under `vendor/` are modified.
16. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should not complete Stage 4. It should establish the custom
select/listbox foundation and leave the remaining composite widgets for later
experiments informed by the select result.

## Design Review

Independent AI design review was performed by subagent `Beauvoir`, which
approved the design with **Pass** and no blocking findings.

The review checked that the README links Experiment 17 as `Designed`, the scope
is limited to `select` and the listbox foundation, the required shadcn select
surface is covered, ARIA/keyboard/pointer/portal/positioning/form/docs/
scenario/learning/vendor-cleanliness requirements are concrete, and the
verification criteria are specific enough to prove the implementation.

Two non-blocking implementation notes were recorded:

- document the exact hidden form control strategy, including how `required` is
  represented and whether native constraint validation is intentionally
  unsupported;
- if RadCN publicly exposes `SelectPortal`, `SelectViewport`, or
  `SelectItemIndicator`, record why those additional parts are public even
  though upstream shadcn currently exports only the outer select parts.
