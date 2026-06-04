# Experiment 18: Stage 4 Searchable Listbox, Combobox, and Command

## Description

Continue Stage 4 by porting `combobox` and `command` together around a shared
searchable-listbox foundation.

This is the right next experiment after custom `select` because both components
reuse the listbox discoveries from Experiment 17 while adding input-owned
filtering and command activation:

- `combobox` is a selectable input plus popup listbox, with trigger, clear,
  content, list, item, group, label, empty, separator, and optional chips;
- `command` is a searchable command list and optional dialog palette, with
  input, list, empty, group, item, shortcut, separator, and dialog composition;
- both upstream implementations are React-heavy (`@base-ui/react` and `cmdk`)
  and should not be copied directly into Remix 3;
- both need deterministic keyboard matrices, active descendant management,
  disabled skipping, filtering, empty state behavior, pointer selection, and
  customization hooks.

This experiment should not port `menubar`, `navigation-menu`, `calendar`,
`date-picker`, `carousel`, `input-group`, `form`, `input-otp`, `data-table`,
or `sidebar`. Those components should consume the searchable-listbox result or
receive their own later disposition.

RadCN should match shadcn/ui's visible behavior and author-facing
customization value while using Remix 3-compatible server markup plus
package-exported browser enhancements. Exact DOM equivalence with Base UI,
cmdk, Radix, or shadcn is not required.

## Changes

Add a shared searchable-listbox helper under:

- `packages/radcn/src/utils/searchable-listbox.ts`

The helper should own behavior that is genuinely shared by combobox and
command:

- query normalization and filtering;
- visible item indexing;
- active item movement with wrapping;
- disabled item skipping;
- `aria-activedescendant` synchronization;
- typeahead/search input handling;
- empty-state visibility;
- item activation callbacks;
- pointer highlight and selection;
- optional selected-value synchronization;
- deterministic close/escape behavior for popup comboboxes.

The helper must not assume every consumer is a select menu. It should accept
consumer-specific selectors, state callbacks, and item activation policy so
`combobox` can select a value while `command` can execute or mark a command.

Add RadCN source under:

- `packages/radcn/src/components/combobox.tsx`
- `packages/radcn/src/components/command.tsx`

The combobox component family should include:

- `Combobox`
- `ComboboxValue`
- `ComboboxInput`
- `ComboboxTrigger`
- `ComboboxClear`
- `ComboboxPortal`
- `ComboboxContent`
- `ComboboxList`
- `ComboboxItem`
- `ComboboxItemIndicator`
- `ComboboxGroup`
- `ComboboxLabel`
- `ComboboxCollection`
- `ComboboxEmpty`
- `ComboboxSeparator`
- `ComboboxChips`
- `ComboboxChip`
- `ComboboxChipRemove`

The command component family should include:

- `Command`
- `CommandDialog`
- `CommandInput`
- `CommandList`
- `CommandEmpty`
- `CommandGroup`
- `CommandItem`
- `CommandShortcut`
- `CommandSeparator`

Add package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load browser enhancements from:

- `fixtures/candidate-remix/app/assets/entry.ts`

The implementation should add dedicated helpers such as `enhanceCombobox()`
and `enhanceCommand()`. They may use `setupSearchableListbox()` and the Stage 3
portal/clamping helpers, but they must keep component-specific responsibilities
separate:

- combobox owns input value, selected value, popup open state, trigger/clear,
  optional hidden form value, optional chips, and listbox selection semantics;
- command owns command query, active item, item activation, shortcuts, empty
  results, and optional dialog composition through the existing RadCN dialog
  foundation.

Combobox props and state hooks should support:

- root `name`, `defaultValue`, `value` as initial value only, `multiple`,
  `disabled`, `invalid`, `required`, `defaultOpen`, `id`, `class`, and `style`;
- input `placeholder`, `ariaLabel`, `disabled`, `class`, and `style`;
- trigger and clear buttons with `disabled`, `class`, and `style`;
- content `side`, `align`, `sideOffset`, `class`, and `style`;
- item `value`, `textValue`, `keywords`, `disabled`, `class`, and `style`;
- chip `value`, `disabled`, `class`, and `style`;
- stable `data-radcn-combobox-*` hooks for every public part;
- shared state hooks: `data-state`, `data-open`, `data-disabled`,
  `data-invalid`, `data-placeholder`, `data-highlighted`, `data-selected`,
  `data-value`, `data-query`, `data-empty`, `data-side`, and `data-align`.

Command props and state hooks should support:

- root `value` as initial selected/checked command value, `loop`, `disabled`,
  `id`, `class`, and `style`;
- dialog `open`, `defaultOpen`, `modal`, `title`, `description`,
  `showCloseButton`, `class`, and `style`;
- input `placeholder`, `ariaLabel`, `disabled`, `class`, and `style`;
- item `value`, `keywords`, `disabled`, `checked`, `class`, and `style`;
- shortcut, group, empty, list, and separator styling hooks;
- stable `data-radcn-command-*` hooks for every public part;
- shared state hooks: `data-value`, `data-query`, `data-highlighted`,
  `data-selected`, `data-checked`, `data-disabled`, and `data-empty`.

Accessibility and keyboard policy for combobox:

- input exposes `role="combobox"`, `aria-expanded`, `aria-controls`,
  `aria-autocomplete="list"`, and `aria-activedescendant` while the popup is
  open;
- content/list exposes `role="listbox"`;
- items expose `role="option"`, `aria-selected`, and `aria-disabled`;
- trigger click opens/closes the popup without stealing input ownership;
- typing filters visible items and opens the popup;
- ArrowDown and ArrowUp open the popup and move through visible enabled items;
- Home and End move to first and last visible enabled item;
- Enter selects the active item;
- Escape closes without changing the selected value when open, and clears the
  input query when closed if a query is present;
- Tab and Shift+Tab close without preventing default focus movement;
- pointer click selects an enabled item;
- disabled items are skipped by keyboard, ignored by filtering activation, and
  cannot be selected by pointer;
- clear button clears query and selected value, synchronizes the hidden form
  value, and restores focus to the input;
- single select updates visible value and hidden input;
- multiple select renders chips, toggles selected items, and serializes a
  documented hidden form value policy.

Accessibility and keyboard policy for command:

- input controls a list with `aria-controls` and `aria-activedescendant`;
- list exposes `role="listbox"` or an explicitly documented command-list role
  if a stronger ARIA mapping is chosen;
- items expose option-like active state plus command-specific checked/disabled
  hooks;
- typing filters visible items and updates empty state;
- ArrowDown, ArrowUp, Home, End, Enter, and Escape have deterministic behavior;
- Enter activates the highlighted command item;
- pointer hover highlights enabled items and pointer click activates them;
- disabled items are visible but skipped and inactive;
- shortcuts render as visual hints and do not imply global keyboard listeners
  in this experiment;
- `CommandDialog` reuses RadCN dialog semantics for modal state, title,
  description, focus trap, Escape, outside dismissal, portal capture, and
  scroll lock.

Form policy:

- combobox with `name` should submit the selected value through an associated
  hidden input;
- reset should restore the initial/default selected value and visible input
  display;
- multiple combobox serialization must be documented and tested;
- custom combobox required validation is an approved divergence unless a
  native validation strategy is explicitly implemented;
- command does not submit form values in this experiment unless an item is
  explicitly rendered as a form control; record this boundary in docs.

Overlay and positioning policy:

- combobox content should move to the nearest fixture-stage portal root when
  present, and document body fallback otherwise;
- combobox content should use Stage 3-style side/align/offset metadata,
  available-size CSS variables, transform-origin, and stage-or-viewport
  clamping;
- command without dialog should render inline and not portal by default;
- command dialog should use the existing dialog portal and modal behavior.

Extend RadCN styles and tokens for:

- combobox root, input, trigger, clear, portal, content, list, item, item
  indicator, group, label, collection, empty, separator, chips, chip, chip
  remove, highlighted, selected, placeholder, disabled, invalid, open/closed,
  side/align, and custom token hooks;
- command root, dialog, input wrapper, input, list, empty, group, item,
  shortcut, separator, highlighted, selected/checked, disabled, and custom
  token hooks;
- reduced-motion-compatible popup/dialog animations;
- long-list scrolling and empty states.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and local geometry
code instead of Base UI or cmdk if it preserves the visible, semantic,
keyboard, pointer, focus, form, and customization behavior needed for
comparison artifacts.

Shared combobox scenarios should include:

- `combobox/default`
- `combobox/filtering`
- `combobox/placeholder`
- `combobox/groups`
- `combobox/disabled-invalid`
- `combobox/clearable`
- `combobox/chips-multiple`
- `combobox/form-submit-reset`
- `combobox/popper-placement`
- `combobox/custom-token`

Shared command scenarios should include:

- `command/default`
- `command/filtering`
- `command/empty`
- `command/groups`
- `command/disabled`
- `command/shortcuts`
- `command/checked`
- `command/dialog`
- `command/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN combobox and command source;
- package subpath and root exports exist for all public parts and enhancements;
- combobox portal content is moved into the fixture-stage portal root;
- command dialog uses the existing RadCN dialog portal behavior;
- ARIA relationships and state hooks update on open/close/filter/selection;
- combobox input/listbox and command input/list semantics are present;
- filtering hides non-matching items, preserves matching groups where useful,
  and shows empty states when no items match;
- placeholder, selected value display, checked command state, shortcuts, group,
  label, separator, chip, clear, disabled, invalid, side/align, and custom
  token hooks render;
- keyboard roving supports ArrowUp, ArrowDown, Home, End, wrapping, disabled
  skip, and deterministic initial highlight;
- Enter and pointer activation select combobox items or activate command items;
- Escape, outside pointer, Tab, and Shift+Tab close combobox popups without
  unintended value changes;
- command dialog preserves dialog focus trap, close, title, and description
  behavior;
- combobox form submit/reset and documented multiple serialization work;
- artifact screenshots capture paired reference/candidate output for every
  combobox and command scenario;
- no files under `vendor/` are modified.

Document the searchable-listbox strategy in `docs/radcn-source.md`. The docs
must answer:

- how combobox differs from select and native inputs;
- how command differs from combobox and menu;
- what behavior is shared in the searchable-listbox helper;
- what Stage 3 overlay/dialog behavior is reused;
- how filtering, active item state, selection/activation, disabled items,
  empty states, groups, labels, separators, shortcuts, chips, clear buttons,
  and form synchronization work;
- how hidden form values and multiple combobox serialization work;
- what divergences from Base UI, cmdk, Radix, and shadcn are approved;
- what later `menubar`, `navigation-menu`, `calendar`, `date-picker`, and
  `carousel` experiments should reuse or avoid.

Add issue-level learnings for the searchable-listbox helper boundary, command
activation policy, combobox form policy, multiple-value serialization, dialog
composition reuse, and any approved divergence from upstream behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `combobox`, `command`, and the shared
   searchable-listbox helper.
2. The combobox component family exports all required parts and
   `enhanceCombobox()`.
3. The command component family exports all required parts and
   `enhanceCommand()`.
4. `packages/radcn` exports combobox and command from package subpaths and the
   root index.
5. The Remix 3 candidate app loads both browser enhancements.
6. Shared scenarios include every required combobox and command scenario.
7. Reference and candidate fixture routes exist for every shared scenario.
8. Component-specific Playwright checks cover portal capture, dialog reuse,
   ARIA relationships, list semantics, filtering, empty states, placeholder,
   selected value display, checked command state, shortcut hooks, chips,
   clearing, keyboard roving, disabled skip, pointer activation, Enter,
   Escape, outside pointer, Tab/Shift+Tab, disabled/invalid hooks, popper
   placement, form submit/reset, multiple serialization, customization hooks,
   and non-vendor cleanliness.
9. `pnpm radcn:typecheck` passes.
10. `pnpm fixtures:candidate:typecheck` passes.
11. `pnpm fixtures:reference:typecheck` passes.
12. Focused combobox and command Playwright tests pass.
13. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    combobox and command scenario.
14. Documentation explains combobox and command boundaries, shared searchable
    listbox behavior, overlay/dialog reuse, form synchronization, filtering,
    activation, approved divergences, and implications for later Stage 4
    widgets.
15. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
16. No files under `vendor/` are modified.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should not complete Stage 4. It should establish the searchable
listbox foundation for combobox and command, then leave menubar,
navigation-menu, calendar, date-picker, and carousel for later experiments
informed by the result.

## Design Review

Independent AI design review was performed by subagent `Wegener`, which
approved the design with **Pass** and no blocking findings.

The review checked that the plan is scoped to the next Stage 4 cluster, excludes
unrelated widgets, includes required implementation surfaces, scenarios,
Playwright gates, documentation and learning requirements, independent
completion review, and vendor cleanliness checks, and aligns with Experiment
17's select/listbox learnings and the Issue 2 workflow.
