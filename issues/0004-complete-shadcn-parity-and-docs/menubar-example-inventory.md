# Menubar Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Menubar example through the
examples registry by filename/inferred-cluster ownership: `menubar-demo`. The
registry entry has `type: "registry:example"`,
`registryDependencies: ["menubar"]`, and file path
`examples/menubar-demo.tsx`.

RadCN ships `radcn/menubar` as a dependency-free Menubar primitive family with
package exports, role/ARIA semantics, trigger roving focus, portal-backed menu
content, submenu support, checkbox and radio item state, disabled state, inset
styling hooks, shortcut presentation, package classes, public hooks, custom
tokens, docs coverage, candidate/reference fixtures, and Playwright coverage.

Experiment 98 added named `menubar-demo` coverage on the Menubar docs page and
candidate fixture route. The named surfaces now render and test the exact
upstream four-menu browser-style composition, full item text, shortcut text,
checked radio value, checked checkbox item, disabled item names, submenu
contents, `sideOffset={8}` placement evidence, public hooks, portal behavior,
and React/Radix/lucide/Tailwind mapping copy.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `menubar-demo` | Renders a React client component using shadcn `Menubar` parts. The root contains four menus with triggers `File`, `Edit`, `View`, and `Profiles`. `File` contains `New Tab` with `⌘T`, `New Window` with `⌘N`, disabled `New Incognito Window`, submenu `Share` with `Email link`, `Messages`, `Notes`, and `Print...` with `⌘P`. `Edit` contains `Undo` with `⌘Z`, `Redo` with `⇧⌘Z`, submenu `Find` with `Search the web`, `Find...`, `Find Next`, `Find Previous`, then `Cut`, `Copy`, and `Paste`. `View` contains checkbox items `Always Show Bookmarks Bar` and checked `Always Show Full URLs`, inset `Reload` with `⌘R`, disabled inset `Force Reload` with `⇧⌘R`, inset `Toggle Fullscreen`, and inset `Hide Sidebar`. `Profiles` contains `MenubarRadioGroup value="benoit"` with radio items `Andy`, checked `Benoit`, `Luis`, plus inset `Edit...` and `Add Profile...`. The upstream package is `"use client"`, wraps Radix Menubar primitives, uses lucide `CheckIcon`, `ChevronRightIcon`, and `CircleIcon`, emits `data-slot` names for every part, maps `className` through `cn`, portals content, defaults content placement to `align="start"`, `alignOffset={-4}`, `sideOffset={8}`, and uses Tailwind utilities for root layout, content min widths, item/inset spacing, disabled opacity, checked indicators, submenu caret, shortcuts, focus/highlight states, animations, role/ARIA, keyboard behavior, hover/pointer behavior, and vendor source mechanics. | `radcn/packages/radcn/src/components/menubar.tsx` exports dependency-free Menubar parts and `enhanceMenubar` for explicit markup, roles, ARIA, portal movement, roving trigger focus, pointerenter menu switching, keyboard/typeahead behavior, submenus, checked indicators, radio group value, disabled items, inset classes, shortcut hooks, and placement hooks. `radcn/packages/radcn/src/styles/tokens.css`, `radcn/packages/radcn/src/index.ts`, and `radcn/packages/radcn/package.json` provide styling and exports. `radcn/apps/docs/app/content/components.tsx` now renders a named `menubar-demo` rich docs example with exact upstream triggers, items, submenus, checkbox/radio state, inset/disabled rows, shortcut text, public hooks, source snippet, and `sideOffset={8}`. `radcn/apps/docs/app/assets/entry.ts` enhances the named docs example with `enhanceMenubar`. `radcn/apps/docs/tests/coverage.spec.ts` verifies the named docs example, portal movement, part hooks, exact text, `sideOffset={8}`, submenu behavior, checkbox/radio state, disabled/inset state, Escape close, and required mapping copy. `radcn/fixtures/scenarios/index.ts` and `radcn/fixtures/candidate-remix/app/fixtures/menubar.tsx` add `/fixtures/menubar/demo`; `radcn/fixtures/tests/menubar-navigation.spec.ts` verifies the named fixture route with the same exact composition and behavior while preserving existing generic hover-switching, keyboard, submenu, checkbox/radio, disabled, and custom-token coverage. Package code did not need changes. | Covered | None. |

## Decisions

- `menubar-demo` is a direct upstream example because `_registry.ts` registers
  it as `type: "registry:example"` with name prefix `menubar-` and
  `registryDependencies: ["menubar"]`.
- React client component mechanics map to server-rendered Menubar markup plus
  scoped `enhanceMenubar` browser behavior. No React dependency is needed.
- Radix Menubar remains a non-dependency. RadCN maps the user-facing behavior
  to explicit root/menu/trigger/content/item parts, browser enhancement, and
  public data hooks.
- lucide `CheckIcon`, `ChevronRightIcon`, and `CircleIcon` remain presentation
  details. RadCN uses text indicators `✓`, `●`, and `›` over public hooks for
  this example instead of adding an icon dependency.
- Upstream `data-slot` names map to `data-radcn-menubar*` hooks and shared
  `data-radcn-menu-*` hooks.
- Upstream `className`, Tailwind utilities, and `cn` map to RadCN `class`,
  package classes, CSS variables, explicit `style`, and app-owned docs/fixture
  layout where needed.
- Upstream portal behavior maps to `MenubarPortal`, `setupMenuOverlay`, and
  browser movement into `data-radcn-portal-root`. Named docs and fixture tests
  verify the four demo portals.
- Upstream keyboard and pointer behavior maps to `enhanceMenubar` plus shared
  menu overlay behavior. Existing tests verify hover switching generally; named
  docs and fixture tests verify open/close, Escape, keyboard skip, submenu
  pointer movement, and checked state on `menubar-demo`.
- Upstream checkbox and radio item behavior maps to explicit
  `MenubarCheckboxItem`, `MenubarRadioGroup`, and `MenubarRadioItem` props and
  state hooks. Named docs and fixture tests now verify the exact
  `Always Show Full URLs` checked checkbox and `benoit`/`Benoit` radio state.
- Upstream inset item behavior maps to `inset` props and package inset classes.
  Named docs and fixture tests now prove the exact upstream inset rows.
- Upstream content placement defaults differ in one important detail: upstream
  `MenubarContent` defaults to `sideOffset={8}`, while current RadCN
  `MenubarContent` and `enhanceMenubar` default to `sideOffset={4}`. The named
  `menubar-demo` passes `sideOffset={8}` explicitly, matching upstream example
  placement without changing the package default for all Menubars.
- Exact named `menubar-demo` parity is covered by named Menubar docs, a
  candidate fixture route, and Playwright evidence for the full upstream
  composition.
- vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
