# Menubar Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Menubar example through the
examples registry by filename/inferred-cluster ownership: `menubar-demo`. The
registry entry has `type: "registry:example"`,
`registryDependencies: ["menubar"]`, and file path
`examples/menubar-demo.tsx`.

RadCN already ships `radcn/menubar` as a dependency-free Menubar primitive
family with package exports, role/ARIA semantics, trigger roving focus,
portal-backed menu content, submenu support, checkbox and radio item state,
disabled state, inset styling hooks, shortcut presentation, package classes,
public hooks, custom tokens, generic docs coverage, candidate/reference
fixtures, and Playwright coverage.

The direct Menubar example is still not covered as a named `menubar-demo`
outcome. Existing docs and fixtures prove the substrate, but they do not render
or test the exact upstream four-menu browser-style composition, full item text,
shortcut text, checked radio value, checked checkbox item, disabled item names,
submenu contents, placement offsets, and React/Radix/lucide/Tailwind mapping
copy on a named Menubar page and fixture route.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `menubar-demo` | Renders a React client component using shadcn `Menubar` parts. The root contains four menus with triggers `File`, `Edit`, `View`, and `Profiles`. `File` contains `New Tab` with `⌘T`, `New Window` with `⌘N`, disabled `New Incognito Window`, submenu `Share` with `Email link`, `Messages`, `Notes`, and `Print...` with `⌘P`. `Edit` contains `Undo` with `⌘Z`, `Redo` with `⇧⌘Z`, submenu `Find` with `Search the web`, `Find...`, `Find Next`, `Find Previous`, then `Cut`, `Copy`, and `Paste`. `View` contains checkbox items `Always Show Bookmarks Bar` and checked `Always Show Full URLs`, inset `Reload` with `⌘R`, disabled inset `Force Reload` with `⇧⌘R`, inset `Toggle Fullscreen`, and inset `Hide Sidebar`. `Profiles` contains `MenubarRadioGroup value="benoit"` with radio items `Andy`, checked `Benoit`, `Luis`, plus inset `Edit...` and `Add Profile...`. The upstream package is `"use client"`, wraps Radix Menubar primitives, uses lucide `CheckIcon`, `ChevronRightIcon`, and `CircleIcon`, emits `data-slot` names for every part, maps `className` through `cn`, portals content, defaults content placement to `align="start"`, `alignOffset={-4}`, `sideOffset={8}`, and uses Tailwind utilities for root layout, content min widths, item/inset spacing, disabled opacity, checked indicators, submenu caret, shortcuts, focus/highlight states, animations, role/ARIA, keyboard behavior, hover/pointer behavior, and vendor source mechanics. | `radcn/packages/radcn/src/components/menubar.tsx` exports dependency-free `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarPortal`, `MenubarContent`, `MenubarGroup`, `MenubarLabel`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarItemIndicator`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`, and `enhanceMenubar`. It maps Radix behavior to explicit markup, `setupMenuOverlay`, roles, `aria-expanded`, `aria-haspopup`, `aria-checked`, `aria-disabled`, `data-radcn-menubar*` hooks, portal movement, roving trigger focus, pointerenter menu switching, submenus, checked indicators, radio group value, disabled items, inset classes, shortcut hooks, and default content alignment. One divergence is the current RadCN default `sideOffset={4}` rather than upstream MenubarContent `sideOffset={8}`. `radcn/packages/radcn/src/styles/tokens.css` styles root layout, trigger focus/open state, disabled state, content, items, labels, separators, shortcuts, submenu caret, indicators, and custom fixture tokens. `radcn/packages/radcn/src/index.ts` and `radcn/packages/radcn/package.json` export `radcn/menubar`. `radcn/apps/docs/app/content/components.tsx` has a generic Menubar docs preview with a smaller `Docs` menu only, and `radcn/apps/docs/tests/coverage.spec.ts` verifies the generic Menubar route renders a public hook, but not a named `menubar-demo`. `radcn/fixtures/scenarios/index.ts`, `radcn/fixtures/candidate-remix/app/fixtures/menubar.tsx`, and `radcn/fixtures/reference-react-router/app/fixtures/menubar.tsx` cover default, vertical, checkbox/radio, submenu, keyboard-typeahead, disabled, and custom-token scenarios, but they use `File`, `View`, `Help` fixture copy rather than the exact upstream four-menu demo. `radcn/fixtures/tests/menubar-navigation.spec.ts` verifies root roles, orientation, trigger `aria-haspopup`/`aria-expanded`, portal state, content `role="menu"`, keyboard roving, typeahead, disabled skip, vertical roving, checkbox toggle, radio selection, submenu visibility, hover switching, disabled trigger, and custom token styling. | Partial | Implement named `menubar-demo` docs, candidate fixture, and Playwright coverage for the exact upstream four-menu composition. Verify all trigger/item/submenu/checkbox/radio/inset/disabled/shortcut text, public hooks for every Menubar part, root/content placement evidence including upstream `sideOffset={8}` or an intentional RadCN offset decision, portal behavior, open/close/hover/keyboard/submenu behavior, checkbox checked state, radio value `benoit`, disabled item state, inset state, shortcut alignment, and mapping copy for React `"use client"`, Radix Menubar, lucide icons, `className`, Tailwind utilities, `cn`, `data-slot`, portal mechanics, keyboard/pointer behavior, custom tokens, and vendor source. |

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
  details. RadCN currently uses text indicators `✓`, `●`, and `›`; a named
  implementation should either preserve those app-owned glyphs with visual
  parity evidence or document any icon-package decision.
- Upstream `data-slot` names map to `data-radcn-menubar*` hooks and shared
  `data-radcn-menu-*` hooks.
- Upstream `className`, Tailwind utilities, and `cn` map to RadCN `class`,
  package classes, CSS variables, explicit `style`, and app-owned docs/fixture
  layout where needed.
- Upstream portal behavior maps to `MenubarPortal`, `setupMenuOverlay`, and
  browser movement into `data-radcn-portal-root`, which existing fixture tests
  already verify generally.
- Upstream keyboard and pointer behavior maps to `enhanceMenubar` plus shared
  menu overlay behavior. Existing tests verify roving trigger focus, typeahead,
  disabled skip, Escape close, hover switching, and submenu visibility
  generally, but not on the exact `menubar-demo` composition.
- Upstream checkbox and radio item behavior maps to explicit
  `MenubarCheckboxItem`, `MenubarRadioGroup`, and `MenubarRadioItem` props and
  state hooks. Existing tests cover general toggle/selection behavior, but not
  the exact `Always Show Full URLs` checked checkbox or `benoit`/`Benoit`
  radio state.
- Upstream inset item behavior maps to `inset` props and package inset classes.
  Existing fixtures do not prove the exact upstream inset rows.
- Upstream content placement defaults differ in one important detail: upstream
  `MenubarContent` defaults to `sideOffset={8}`, while current RadCN
  `MenubarContent` and `enhanceMenubar` default to `sideOffset={4}`. The named
  implementation should decide whether to pass `sideOffset={8}` for
  `menubar-demo`, change the package default, or record an intentional
  divergence with visual/behavior evidence.
- Existing Menubar package, fixture, and Playwright coverage is strong
  substrate evidence, but exact named `menubar-demo` parity requires named
  Menubar docs, candidate fixture, and Playwright evidence for the full
  upstream composition.
- vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
