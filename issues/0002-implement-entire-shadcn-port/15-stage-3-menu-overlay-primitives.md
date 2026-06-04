# Experiment 15: Stage 3 Menu Overlay Primitives

## Description

Continue Stage 3 by porting the menu overlays that build on the positioned
overlay foundation but require real menu semantics and keyboard behavior:

- `dropdown-menu`
- `context-menu`

This experiment should not port `menubar`, `select`, `combobox`,
`navigation-menu`, `command`, or `drawer`. Menubar, select, combobox, and
navigation-menu are Stage 4 composite widgets because their orientation,
selection, listbox/combobox, viewport, or navigation behavior goes beyond a
transient menu overlay. Drawer still needs a separate Stage 3 gesture and
mobile policy.

Dropdown menu and context menu should be solved together because they share the
same menu item model:

- menu content in a portal;
- item, checkbox item, radio item, group, label, separator, shortcut, submenu
  trigger, and submenu content slots;
- roving focus across enabled items;
- typeahead search;
- Escape and outside-pointer dismissal;
- checked/radio state hooks;
- destructive, inset, disabled, highlighted, and open state hooks;
- submenu opening, closing, and positioning;
- collision/clamping and transform-origin hooks from the positioned overlay
  foundation.

The two components differ in activation and initial anchor geometry:

- `dropdown-menu` opens from a trigger with click, Enter, Space, or ArrowDown.
- `context-menu` opens from a `contextmenu` event, from keyboard context-menu
  keys, or from Shift+F10, and positions at the pointer or trigger-derived
  virtual anchor.

The RadCN implementation should match shadcn/ui's visible behavior and
author-facing customization value while using Remix 3-compatible server markup
plus package-exported browser enhancements. Exact DOM equivalence is not the
goal.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/dropdown-menu.tsx`
- `packages/radcn/src/components/context-menu.tsx`

Add a shared menu helper only if it materially reduces duplication. The
expected shape is a browser helper such as `setupMenuOverlay()` or equivalent,
with component-specific wrappers such as `enhanceDropdownMenu()` and
`enhanceContextMenu()`. The helper may reuse pieces of
`setupPositionedOverlay()` for portal capture, side/align/offset geometry, and
stage-or-viewport clamping, but it must not treat menus as plain popovers.
Menu-specific focus, typeahead, submenu, checked item, and contextmenu behavior
must live in the menu layer.

If `setupPositionedOverlay()` needs a small extension for virtual anchors or
manual anchor coordinates, keep that extension generic and document it. If the
menu helper uses its own positioning path for virtual anchors, explain why in
the result.

The dropdown-menu component family should include:

- `DropdownMenu`
- `DropdownMenuTrigger`
- `DropdownMenuPortal`
- `DropdownMenuContent`
- `DropdownMenuGroup`
- `DropdownMenuLabel`
- `DropdownMenuItem`
- `DropdownMenuCheckboxItem`
- `DropdownMenuRadioGroup`
- `DropdownMenuRadioItem`
- `DropdownMenuSeparator`
- `DropdownMenuShortcut`
- `DropdownMenuSub`
- `DropdownMenuSubTrigger`
- `DropdownMenuSubContent`

The context-menu component family should include:

- `ContextMenu`
- `ContextMenuTrigger`
- `ContextMenuPortal`
- `ContextMenuContent`
- `ContextMenuGroup`
- `ContextMenuLabel`
- `ContextMenuItem`
- `ContextMenuCheckboxItem`
- `ContextMenuRadioGroup`
- `ContextMenuRadioItem`
- `ContextMenuSeparator`
- `ContextMenuShortcut`
- `ContextMenuSub`
- `ContextMenuSubTrigger`
- `ContextMenuSubContent`

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load the new browser enhancements from
`fixtures/candidate-remix/app/assets/entry.ts`.

The menu helper should support:

- portal movement to the nearest `[data-fixture-stage]` portal root when
  present, and document body fallback otherwise;
- root, trigger, portal, content, item, checkbox item, radio group, radio item,
  separator, label, shortcut, submenu trigger, and submenu content selectors;
- dropdown trigger relationships: `aria-haspopup="menu"`,
  `aria-expanded`, and `aria-controls`;
- context trigger relationships and keyboard context-menu activation through
  the Context Menu key and Shift+F10;
- `role="menu"` on content and submenu content;
- `role="menuitem"`, `role="menuitemcheckbox"`, and `role="menuitemradio"`;
- `aria-checked` and `data-state` for checkbox and radio items;
- disabled item skipping for pointer, click, and keyboard focus;
- deterministic initial focus after open for click, Enter, Space, ArrowDown,
  right-click/contextmenu, Context Menu key, and Shift+F10 activation;
- roving focus with ArrowUp, ArrowDown, Home, End, and wrapping;
- Tab and Shift+Tab policy: either close the menu and let focus proceed, or
  record an approved divergence with tests proving the chosen behavior;
- typeahead search over enabled item text;
- Enter and Space item activation;
- Escape close with focus restoration for dropdown menus and sensible focus
  return for context menus;
- outside pointer dismissal;
- close-on-select policy for normal items, checkbox items, and radio items, or
  a documented approved divergence if RadCN chooses a different checked-item
  close policy;
- submenu open from pointer hover/focus and ArrowRight, close from ArrowLeft,
  Escape, and pointer movement outside the submenu path;
- pointer movement sets highlighted state on enabled items, removes highlight
  from prior items, does not highlight disabled items, and does not activate or
  close the menu when disabled items are clicked;
- submenu pointer movement remains stable while moving from submenu trigger to
  submenu content;
- submenu `aria-haspopup`, `aria-expanded`, `data-state`, and side positioning;
- collision/clamping for root content and submenu content;
- cleanup of timers and event handlers during repeated fixture use.

Extend RadCN styles and tokens for:

- dropdown-menu and context-menu root, trigger, portal, content, group, label,
  item, checkbox item, radio item, item indicator, separator, shortcut,
  submenu trigger, submenu content, destructive variant, inset state, disabled
  state, highlighted state, open/closed state, side/align state, and custom
  token hooks;
- reduced-motion-compatible animation hooks for menu and submenu open states.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and local geometry
code instead of Radix if it preserves the visible, semantic, keyboard, pointer,
focus, and customization behavior needed for comparison.

Shared dropdown-menu scenarios should include:

- `dropdown-menu/default`
- `dropdown-menu/checkbox-radio`
- `dropdown-menu/submenu`
- `dropdown-menu/keyboard-typeahead`
- `dropdown-menu/collision`
- `dropdown-menu/custom-token`

Shared context-menu scenarios should include:

- `context-menu/default`
- `context-menu/keyboard-trigger`
- `context-menu/checkbox-radio`
- `context-menu/submenu`
- `context-menu/collision`
- `context-menu/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN dropdown-menu and context-menu source;
- menu portal content is moved into the fixture-stage portal root;
- dropdown-menu opens from click, Enter, Space, and ArrowDown;
- context-menu opens from right-click/contextmenu, Context Menu key, and
  Shift+F10;
- initial focus lands on the expected enabled item for click, Enter, Space,
  ArrowDown, right-click/contextmenu, Context Menu key, and Shift+F10 open
  paths;
- Tab and Shift+Tab behavior is documented and tested, including any approved
  divergence from Radix/shadcn behavior;
- menu content has `role="menu"` and item roles are correct;
- dropdown trigger exposes `aria-expanded` and `aria-controls`;
- roving focus skips disabled items and supports ArrowUp, ArrowDown, Home,
  End, and wrapping;
- typeahead moves focus to matching enabled items;
- Escape closes menus and restores focus to the dropdown trigger or context
  trigger;
- outside pointer closes menus;
- normal item activation closes the menu;
- pointer hover/move sets the highlighted state on enabled items, never
  highlights disabled items, and disabled clicks do not activate items or close
  the menu;
- checkbox and radio items expose `aria-checked`, `data-state`, and visible
  indicators, and their selected state updates according to the documented
  close-on-select policy;
- destructive, inset, disabled, shortcut, label, group, and separator hooks
  render;
- submenus open from pointer/keyboard, expose `aria-expanded` and open
  `data-state`, position relative to the submenu trigger, and close through
  ArrowLeft and Escape;
- pointer movement from submenu trigger to submenu content keeps the submenu
  open and highlighted rather than closing during the handoff;
- collision checks keep root menu and submenu content visibly inside the
  screenshot stage or viewport for edge scenarios;
- customization token scenarios visibly change menu content and item styling;
- artifact screenshots capture open menu content inside the fixture stage;
- no files under `vendor/` are modified.

Document the menu overlay strategy in `docs/radcn-source.md`. The docs must
answer:

- how menu overlays differ from popover-like positioned overlays;
- what part of the positioned overlay strategy is reused or extended;
- how roving focus, disabled skipping, typeahead, and item activation work;
- how initial focus and Tab/Shift+Tab behavior work, including any approved
  divergence;
- how pointer highlighting and disabled pointer behavior work;
- how checkbox and radio item state is represented;
- how submenu behavior and positioning work;
- how contextmenu pointer/keyboard activation is represented;
- what remains unsolved for `drawer` and why Stage 4 widgets should not reuse
  the menu helper blindly.

Add issue-level learnings for the menu helper boundary, roving focus/typeahead
policy, contextmenu virtual anchor policy, checked item close policy, submenu
positioning, and any approved divergence from Radix/shadcn behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `dropdown-menu` and `context-menu`.
2. Shared menu overlay behavior is implemented once and reused by both
   component families, or any duplication is explicitly justified in the
   result.
3. `packages/radcn` exports both component families from package subpaths and
   the root index.
4. The Remix 3 candidate app loads the required browser enhancements.
5. Shared scenarios include all required dropdown-menu and context-menu
   scenarios.
6. Reference and candidate fixture routes exist for every shared scenario.
7. Component-specific Playwright checks cover dropdown click and keyboard open,
   initial focus for each open path, trigger ARIA, portal capture, menu/item
   roles, roving focus, disabled skipping, pointer highlighting, disabled
   pointer clicks, Tab/Shift+Tab policy, typeahead, Escape, outside dismissal,
   item activation, checkbox/radio state, submenu behavior, collision,
   customization hooks, and non-modal behavior.
8. Component-specific Playwright checks cover contextmenu pointer and keyboard
   open, initial focus for each open path, portal capture, menu/item roles,
   roving focus, disabled skipping, pointer highlighting, disabled pointer
   clicks, Tab/Shift+Tab policy, typeahead, Escape, outside dismissal, item
   activation, checkbox/radio state, submenu behavior, collision,
   customization hooks, and non-modal behavior.
9. Submenu checks prove pointer and keyboard opening, `aria-expanded` state,
   relative positioning, trigger-to-submenu pointer stability, ArrowLeft close,
   Escape close, and collision/clamping.
10. `pnpm radcn:typecheck` passes.
11. `pnpm fixtures:candidate:typecheck` passes.
12. `pnpm fixtures:reference:typecheck` passes.
13. The focused menu-overlay Playwright test passes.
14. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    dropdown-menu and context-menu scenario.
15. Documentation explains helper boundaries, menu semantics, initial focus,
    Tab/Shift+Tab policy, pointer highlighting, focus/typeahead, checked/radio
    state, contextmenu activation, submenu behavior, approved divergences, and
    remaining Stage 3/Stage 4 questions.
16. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
17. No files under `vendor/` are modified.
18. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 3. It should complete the menu overlay
layer and leave `drawer` for a separate Stage 3 gesture/mobile experiment.

## Design Review

Independent AI design review was performed by subagent `McClintock`, which
found two blocking gaps in the first draft:

- initial focus and Tab/Shift+Tab behavior were underspecified for dropdown and
  context menu open paths;
- pointer-highlight behavior was not strong enough, especially disabled item
  hover/click handling and submenu trigger-to-content pointer movement.

The plan was updated to require deterministic initial focus checks for click,
Enter, Space, ArrowDown, right-click/contextmenu, Context Menu key, and
Shift+F10 open paths; documented and tested Tab/Shift+Tab policy; pointer
highlight checks for enabled and disabled items; disabled click non-activation;
and submenu pointer handoff stability.

After the update, `McClintock` approved the design with **Pass** and no
remaining blocking findings.
