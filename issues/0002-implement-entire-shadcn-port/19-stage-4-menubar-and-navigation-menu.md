# Experiment 19: Stage 4 Menubar and Navigation Menu

## Description

Continue Stage 4 by porting `menubar` and `navigation-menu` together around a
shared composite-menu/navigation boundary.

This is the right next experiment after `select`, `combobox`, and `command`
because these components reuse Stage 3 menu-overlay and positioning lessons,
but they are not listbox or searchable-listbox widgets:

- `menubar` is a persistent horizontal or vertical menu bar with roving focus,
  trigger-owned menus, submenu support, checkbox/radio items, shortcuts, and
  menu-style activation;
- `navigation-menu` is a navigation/disclosure surface with triggers, links,
  content panels, indicator/viewport hooks, responsive layout concerns, and
  navigation semantics;
- both upstream implementations are Radix-backed React components and should
  not be copied directly into Remix 3;
- both need deterministic keyboard matrices, pointer behavior, open/close
  state, disabled skipping, portal/viewport policy, accessibility semantics,
  and customization hooks.

This experiment should not port `calendar`, `date-picker`, `carousel`,
`input-group`, `form`, `input-otp`, `data-table`, `sidebar`, `chart`,
`toast`, `sonner`, or `resizable`. Those components need their own Stage 4 or
Stage 5 disposition after this experiment records what menu/navigation
behavior can and cannot share.

RadCN should match shadcn/ui's visible behavior and author-facing
customization value while using Remix 3-compatible server markup plus
package-exported browser enhancements. Exact DOM equivalence with Radix or
shadcn is not required.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/menubar.tsx`
- `packages/radcn/src/components/navigation-menu.tsx`

Add any genuinely shared helper under `packages/radcn/src/utils/` only if it
removes real duplication between menubar and navigation menu. If the behavior
contracts diverge, keep the helpers separate and document the boundary instead
of forcing reuse.

The menubar component family should include:

- `Menubar`
- `MenubarMenu`
- `MenubarTrigger`
- `MenubarPortal`
- `MenubarContent`
- `MenubarItem`
- `MenubarCheckboxItem`
- `MenubarRadioGroup`
- `MenubarRadioItem`
- `MenubarItemIndicator`
- `MenubarLabel`
- `MenubarSeparator`
- `MenubarShortcut`
- `MenubarGroup`
- `MenubarSub`
- `MenubarSubTrigger`
- `MenubarSubContent`

The navigation menu component family should include:

- `NavigationMenu`
- `NavigationMenuList`
- `NavigationMenuItem`
- `NavigationMenuTrigger`
- `NavigationMenuContent`
- `NavigationMenuLink`
- `NavigationMenuIndicator`
- `NavigationMenuViewport`

Add package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load browser enhancements from:

- `fixtures/candidate-remix/app/assets/entry.ts`

The implementation should add dedicated helpers such as `enhanceMenubar()`
and `enhanceNavigationMenu()`. They may reuse Stage 3 menu-overlay positioning
and portal capture where that behavior fits, but they must keep
component-specific responsibilities separate:

- menubar owns root roving focus, orientation, trigger-to-menu open state,
  submenu behavior, checked/radio item synchronization, typeahead, and
  menu-style activation;
- navigation menu owns navigation/disclosure state, trigger/link semantics,
  content panel visibility, viewport/indicator hooks, pointer and focus
  opening, and responsive layout hooks.

Menubar props and state hooks should support:

- root `orientation`, `defaultValue`, `value` as initial active menu value,
  `loop`, `disabled`, `id`, `class`, and `style`;
- menu `value`, `disabled`, `class`, and `style`;
- trigger `disabled`, `class`, and `style`;
- content `side`, `align`, `sideOffset`, `class`, and `style`;
- item `disabled`, `variant`, `textValue`, `class`, and `style`;
- checkbox item `checked`, `disabled`, `textValue`, `class`, and `style`;
- radio group `value`, `class`, and `style`;
- radio item `value`, `disabled`, `textValue`, `class`, and `style`;
- stable `data-radcn-menubar-*` hooks for every public part;
- shared state hooks: `data-state`, `data-open`, `data-orientation`,
  `data-highlighted`, `data-disabled`, `data-value`, `data-side`,
  `data-align`, and checked item state hooks.

Navigation menu props and state hooks should support:

- root `defaultValue`, `value` as initial active item value, `delayDuration`,
  `skipDelayDuration`, `orientation`, `id`, `class`, and `style`;
- list `class` and `style`;
- item `value`, `disabled`, `class`, and `style`;
- trigger `disabled`, `class`, and `style`;
- content `class` and `style`;
- link `href`, `current`, `disabled`, `class`, and `style`;
- indicator and viewport `class` and `style`;
- stable `data-radcn-navigation-menu-*` hooks for every public part;
- shared state hooks: `data-state`, `data-open`, `data-orientation`,
  `data-active`, `data-value`, `data-disabled`, `data-motion`, and viewport
  sizing hooks.

Accessibility and keyboard policy for menubar:

- root exposes `role="menubar"` and `aria-orientation`;
- triggers/items inside the root expose menuitem-like semantics and roving
  `tabindex`;
- trigger buttons expose `aria-haspopup="menu"`, `aria-expanded`, and
  `aria-controls` when they own popup content;
- content exposes `role="menu"`;
- submenu triggers expose `aria-haspopup="menu"`, `aria-expanded`, and
  `aria-controls`;
- checkbox and radio items expose `menuitemcheckbox` and `menuitemradio`
  semantics with `aria-checked`;
- ArrowLeft and ArrowRight move across root triggers in horizontal menubars;
- ArrowUp and ArrowDown move across root triggers in vertical menubars;
- Down/Up opens root menu content and focuses first/last enabled item where
  appropriate;
- Home and End move to first and last enabled root trigger or menu item;
- Enter and Space activate menu items or open triggers;
- printable keys perform typeahead within the current root/menu scope;
- Escape closes the active content/submenu and restores focus to the owning
  trigger;
- Tab closes open menus and allows normal focus movement;
- pointer hover and click open triggers predictably without trapping focus;
- disabled triggers/items are skipped by keyboard and ignored by pointer.

Accessibility and keyboard policy for navigation menu:

- root exposes navigation semantics, preferring a `nav` element or
  `role="navigation"` with an accessible label strategy;
- list exposes list semantics or an explicitly documented navigation-menu role
  if a stronger mapping is chosen;
- links remain real anchors whenever navigation is intended;
- triggers expose `aria-expanded` and `aria-controls` for associated content;
- content panels are hidden when inactive and visible when active;
- viewport and indicator are decorative/layout hooks and should not add noise
  to the accessibility tree;
- ArrowLeft/ArrowRight and ArrowUp/ArrowDown rove focus according to
  orientation;
- Home and End move to first and last enabled trigger/link;
- Enter and Space activate links or open trigger content according to element
  semantics;
- Escape closes the active content and restores focus to the trigger;
- pointer enter/focus open content after documented delay behavior, and pointer
  leave/blur close it without flicker;
- disabled items are skipped and inactive.

Overlay, viewport, and positioning policy:

- menubar popup content may reuse Stage 3 menu portal capture and side/align
  clamping when content is portalled;
- menubar submenus should reuse menu-style submenu positioning rather than
  listbox or searchable-listbox behavior;
- navigation menu content should render in a viewport owned by the navigation
  menu root, not in the global menu portal by default;
- navigation viewport should expose measured width/height CSS variables or a
  deterministic server-rendered fallback so animations and artifact screenshots
  are stable;
- indicator and viewport motion states should be explicit `data-motion` hooks
  rather than implicit React animation state.

Extend RadCN styles and tokens for:

- menubar root, menu, trigger, portal, content, item, checkbox item, radio
  item, indicator, label, separator, shortcut, group, submenu trigger,
  submenu content, highlighted, checked, disabled, open/closed, orientation,
  side/align, and custom token hooks;
- navigation menu root, list, item, trigger, link, content, indicator,
  viewport, active/open/closed states, motion states, orientation, responsive
  layout, and custom token hooks;
- reduced-motion-compatible animations;
- long menu content and viewport sizing.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and local geometry
code instead of Radix if it preserves the visible, semantic, keyboard, pointer,
focus, and customization behavior needed for comparison artifacts.

Shared menubar scenarios should include:

- `menubar/default`
- `menubar/vertical`
- `menubar/checkbox-radio`
- `menubar/submenu`
- `menubar/keyboard-typeahead`
- `menubar/disabled`
- `menubar/custom-token`

Shared navigation-menu scenarios should include:

- `navigation-menu/default`
- `navigation-menu/links`
- `navigation-menu/viewport`
- `navigation-menu/indicator`
- `navigation-menu/vertical`
- `navigation-menu/disabled`
- `navigation-menu/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN menubar and navigation-menu source;
- package subpath and root exports exist for all public parts and
  enhancements;
- the candidate app loads both browser enhancements;
- menubar root, trigger, menu content, submenu, checkbox item, and radio item
  semantics are present;
- navigation menu root, list, trigger, link, content, viewport, and indicator
  semantics are present;
- root roving focus works for horizontal and vertical orientations;
- menu item roving, typeahead, disabled skip, Home/End, Enter/Space, Escape,
  and Tab behaviors are deterministic;
- pointer open/close and submenu behavior work;
- checked/radio menubar state hooks synchronize after activation;
- navigation menu trigger focus/pointer opens content, links remain real
  anchors, active content updates viewport/indicator hooks, Escape closes, and
  disabled items remain inactive;
- custom token hooks affect rendered styles;
- artifact screenshots capture paired reference/candidate output for every
  menubar and navigation-menu scenario;
- no files under `vendor/` are modified.

Document the menubar/navigation-menu strategy in `docs/radcn-source.md`. The
docs must answer:

- how menubar differs from dropdown/context menu;
- how navigation menu differs from menubar and generic disclosure;
- what behavior, if any, is shared with the Stage 3 menu-overlay helper;
- why listbox/searchable-listbox helpers are not reused for these widgets;
- how orientation, roving focus, typeahead, submenu behavior, disabled items,
  checked/radio items, links, viewport, indicator, motion hooks, and
  customization work;
- what divergences from Radix and shadcn are approved;
- what later `calendar`, `date-picker`, and `carousel` experiments should
  reuse or avoid.

Add issue-level learnings for the menubar helper boundary, navigation-menu
viewport/indicator policy, orientation keyboard policy, Radix divergence, and
any implications for later Stage 4 widgets.

## Verification

The experiment passes if:

1. RadCN source exists for `menubar` and `navigation-menu`.
2. The menubar component family exports all required parts and
   `enhanceMenubar()`.
3. The navigation-menu component family exports all required parts and
   `enhanceNavigationMenu()`.
4. `packages/radcn` exports menubar and navigation-menu from package subpaths
   and the root index.
5. The Remix 3 candidate app loads both browser enhancements.
6. Shared scenarios include every required menubar and navigation-menu
   scenario.
7. Reference and candidate fixture routes exist for every shared scenario.
8. Component-specific Playwright checks cover semantics, roving focus,
   orientation, typeahead, disabled skip, submenu behavior, checked/radio
   state, pointer open/close, Escape, Tab, navigation links, viewport,
   indicator, motion/state hooks, customization hooks, and non-vendor
   cleanliness.
9. `pnpm radcn:typecheck` passes.
10. `pnpm fixtures:candidate:typecheck` passes.
11. `pnpm fixtures:reference:typecheck` passes.
12. Focused menubar and navigation-menu Playwright tests pass.
13. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    menubar and navigation-menu scenario.
14. Documentation explains menubar/navigation-menu boundaries, helper reuse or
    non-reuse, keyboard and pointer policy, viewport/indicator policy,
    approved divergences, and implications for later Stage 4 widgets.
15. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
16. No files under `vendor/` are modified.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should not complete Stage 4. It should complete the
menu/navigation composite cluster, then leave `calendar`, `date-picker`, and
`carousel` for later experiments informed by the result.

## Design Review

Independent AI design review was performed by subagent `Ohm`, which approved
the design with **Pass** and no blocking findings.

The review checked that the plan is appropriately scoped after Experiment 18,
defensibly groups `menubar` and `navigation-menu`, excludes `calendar`,
`date-picker`, `carousel`, and Stage 5 work, defines concrete components,
props, scenarios, fixtures, tests, docs, learnings, vendor-cleanliness, and
completion-review gates, and explicitly avoids listbox/searchable-listbox
semantics.
