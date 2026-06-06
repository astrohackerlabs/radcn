# Navigation Menu Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Navigation Menu example:
`navigation-menu-demo`.

RadCN now covers that example with named docs, a named candidate fixture route,
docs browser enhancement, and Playwright coverage. Package code did not need
changes: the existing `radcn/navigation-menu` primitives can represent the
upstream demo's user-facing behavior, accessibility, and author-facing
modifiability.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `navigation-menu-demo` | Renders a responsive shadcn docs-style navigation menu with top-level `Home`, `Components`, `Docs`, `List`, `Simple`, and `With Icon` controls. `Home` opens a two-column panel with a feature card headed `shadcn/ui`, copy `Beautifully designed components built with Tailwind CSS.`, and links `Introduction`, `Installation`, and `Typography` with their upstream descriptions. `Components` opens six linked entries: `Alert Dialog`, `Hover Card`, `Progress`, `Scroll-area`, `Tabs`, and `Tooltip` with exact descriptions. `Docs` is a plain link styled by `navigationMenuTriggerStyle()`. `List`, `Simple`, and `With Icon` are responsive `hidden md:block` sections. `List` contains `Components`, `Documentation`, and `Blog` with descriptions. `Simple` contains `Components`, `Documentation`, and `Blocks`. `With Icon` contains icon links `Backlog`, `To Do`, and `Done`. Upstream mechanics include `"use client"`, React, Next `Link`, `useIsMobile`, Radix Navigation Menu, `cva`, lucide `ChevronDownIcon`, `CircleHelpIcon`, `CircleIcon`, `CircleCheckIcon`, `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `navigationMenuTriggerStyle`, `viewport={isMobile}`, root-rendered `NavigationMenuViewport` package behavior, optional `NavigationMenuIndicator` package capability, `asChild`, `className`, Tailwind utilities, `cn`, `data-slot`, active/open/motion state, keyboard behavior, pointer/focus behavior, responsive behavior, and vendor source. | `radcn/apps/docs/app/content/components.tsx` now promotes Navigation Menu to a rich docs page with a named `navigation-menu-demo` source and preview, exact upstream copy, six top-level controls, Home/Components/List/Simple/With Icon panels, `Docs` as a trigger-style link, icon-link affordances, responsive desktop-only sections, explicit `NavigationMenuViewport`, `NavigationMenuIndicator`, and mapping copy. `radcn/apps/docs/app/assets/entry.ts` enhances the named docs example with `enhanceNavigationMenu`. `radcn/fixtures/scenarios/index.ts` and `radcn/fixtures/candidate-remix/app/fixtures/navigation-menu.tsx` add `/fixtures/navigation-menu/demo` with the exact upstream composition. `radcn/apps/docs/tests/coverage.spec.ts` and `radcn/fixtures/tests/menubar-navigation.spec.ts` verify exact text, hooks, top-level controls, panel content, icon affordances, responsive section hooks, trigger-style Docs link, viewport open/close state, indicator state, keyboard behavior, Escape/focusout close, and mapping copy. Existing package evidence remains in `radcn/packages/radcn/src/components/navigation-menu.tsx`, `radcn/packages/radcn/src/styles/tokens.css`, `radcn/packages/radcn/src/index.ts`, and `radcn/packages/radcn/package.json`. | Covered | No follow-up. |

## Decisions

- `"use client"`: intentionally not required. RadCN renders server markup and
  adds browser behavior through `enhanceNavigationMenu`.
- React: not required. RadCN Navigation Menu state is explicit DOM state and
  browser event handling.
- Next `Link`: maps to plain anchors or Remix links supplied by the app.
- `useIsMobile`: not a package dependency. The named demo renders explicit
  `NavigationMenuViewport` and documents responsive behavior as app-owned CSS.
- Radix Navigation Menu: not a dependency. RadCN owns the root, trigger,
  content, viewport, indicator, keyboard, and pointer behavior.
- `cva`: not a dependency. The `navigationMenuTriggerStyle()` outcome maps to
  public NavigationMenuLink classes and package tokens instead of a helper.
- lucide icons: `ChevronDownIcon`, `CircleHelpIcon`, `CircleIcon`, and
  `CircleCheckIcon` are app presentation. RadCN does not add `lucide-react`;
  the named demo uses text icon affordances over public link hooks.
- Demo-rendered Navigation Menu parts: RadCN has package equivalents for
  `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`,
  `NavigationMenuTrigger`, `NavigationMenuContent`, and `NavigationMenuLink`.
- `navigationMenuTriggerStyle`: no package helper was added. The trigger-style
  `Docs` link is documented and tested as the public `NavigationMenuLink`
  class/token equivalent.
- Root/list/content layout: the named docs and fixture demos render the
  upstream panel widths, grids, feature card, and grouped links through
  app-owned CSS over package primitives.
- Root-rendered viewport behavior: RadCN exposes explicit
  `NavigationMenuViewport`; the named demo composes it directly and tests
  viewport state.
- Indicator package capability: RadCN exposes `NavigationMenuIndicator` and the
  named demo keeps it as package capability/modifiability evidence even though
  upstream does not render it explicitly in the demo.
- Responsive `hidden md:block`: the named docs demo maps this to app-owned CSS
  and stable desktop-only classes; tests assert the hooks.
- Icon links: the named docs and fixture demos cover `Backlog`, `To Do`, and
  `Done` with app-owned icon affordance hooks.
- Active/open state: covered by named docs and fixture tests over public
  `data-radcn-navigation-menu-*` hooks.
- Keyboard behavior: covered by named fixture tests and existing generic tests.
- Pointer/focus behavior: covered through `enhanceNavigationMenu` and named
  tests that focus top-level triggers and close with Escape/focusout.
- `asChild`: maps to direct `NavigationMenuLink` anchors and app-owned
  children. React Slot mechanics are not required.
- `className`: maps to `class`, public classes, and app-authored styles.
- Tailwind utilities: map to package CSS, docs-owned styles, CSS variables,
  media queries, and data attributes rather than a Tailwind dependency.
- `cn`: not needed as a package dependency; class composition remains
  app-authored.
- `data-slot`: maps to RadCN public `data-radcn-navigation-menu-*` hooks.
- Docs evidence: the Navigation Menu page renders the named upstream demo and
  mapping copy.
- Fixture evidence: `/fixtures/navigation-menu/demo` renders the named upstream
  demo composition.
- Playwright evidence: docs and fixture tests assert exact copy, behavior, and
  dependency-divergence copy.
- Custom tokens: the existing custom-token fixture remains the token
  modifiability proof for the same package surface.
- Vendor source: the upstream references are
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/navigation-menu-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/navigation-menu.tsx`.
