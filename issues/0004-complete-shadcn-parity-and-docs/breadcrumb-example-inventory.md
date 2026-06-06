# Breadcrumb Example Inventory

Generated during Experiment 25 on 2026-06-06 and resolved during Experiment
26.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/breadcrumb-*.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/breadcrumb.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/breadcrumb.tsx`
  `radcn/packages/radcn/src/components/button.tsx`
  `radcn/packages/radcn/src/components/drawer.tsx`
  `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  `radcn/fixtures/tests/navigation-collection.spec.ts`

## Summary

Breadcrumb example parity is complete after Experiment 26. RadCN exports the
core Breadcrumb parts: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, and
`BreadcrumbEllipsis`. Docs, fixtures, and Playwright coverage now prove native
links, current-page semantics, chevron-style default separators, Slash-style
custom separators, collapsed ellipsis rendering, accessible hidden ellipsis
text, DropdownMenu breadcrumb branches, and responsive desktop
DropdownMenu/mobile Drawer composition.

No React dependency, Next `Link` dependency, Radix Slot dependency, lucide
dependency, Tailwind dependency, vendor import, or npm publishing behavior is
needed for Breadcrumb parity.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `breadcrumb-demo` | Home link, collapsed middle branch rendered as a DropdownMenu trigger with BreadcrumbEllipsis and hidden "Toggle menu" text, dropdown items for Documentation/Themes/GitHub, Components link, and current Breadcrumb page. Uses Next `Link`, shadcn `asChild`, DropdownMenu, and default separators. | RadCN docs, `/fixtures/breadcrumb/demo`, and Playwright prove native links, app-owned hidden trigger text, DropdownMenu composition, menu items, default chevron-style separators, and current-page semantics. | Covered | Next `Link`/`asChild` map to native links; default separator maps to package-owned chevron-style text glyph. |
| `breadcrumb-dropdown` | Home link, SlashIcon custom separators, a Components DropdownMenu trigger with ChevronDownIcon, dropdown items, and current page. Uses lucide Slash and ChevronDown icons plus DropdownMenu. | RadCN docs, `/fixtures/breadcrumb/dropdown`, and Playwright prove Slash-style separators, label+chevron DropdownMenu trigger semantics, menu items, and current-page semantics. | Covered | Lucide Slash and ChevronDown map to app-owned glyphs through public classes. |
| `breadcrumb-ellipsis` | Home link, default separator, BreadcrumbEllipsis collapsed branch with sr-only "More" text, Components link, default separator, and current page. | RadCN docs, `/fixtures/breadcrumb/ellipsis`, compatibility route `/fixtures/breadcrumb/collapsed`, and Playwright prove collapsed ellipsis, accessible hidden text, linked ancestors, separators, and current-page semantics. | Covered | MoreHorizontal maps to package-owned ellipsis text plus hidden `More`; apps can supply icon-like children if desired. |
| `breadcrumb-link` | Simple linked breadcrumb: Home link, Components link, and current Breadcrumb page. Uses Next `Link` through `BreadcrumbLink asChild`. | RadCN docs, `/fixtures/breadcrumb/link`, compatibility route `/fixtures/breadcrumb/default`, and Playwright prove native ancestor links plus current-page semantics. | Covered | Next `Link` and Radix Slot map to explicit `BreadcrumbLink href` or app-owned anchors. |
| `breadcrumb-responsive` | Responsive Breadcrumb with Home link, collapsed middle items, desktop DropdownMenu at `(min-width: 768px)`, mobile Drawer below that breakpoint, shared open state, Drawer title/description, link list, outline Button close action, truncation/max-width on trailing items, and current page. Uses React `useState`, `useMediaQuery`, Button, Drawer, DropdownMenu, Next `Link`, and responsive Tailwind utilities. | RadCN docs, `/fixtures/breadcrumb/responsive`, and Playwright viewport assertions prove wide-viewport DropdownMenu behavior, narrow-viewport Drawer behavior, Drawer title/description, link list, outline Button-style close action, truncation/max-width hooks, and current-page semantics. | Covered | React `useState`/`useMediaQuery` map to app-owned browser enhancement and CSS breakpoint classes. |
| `breadcrumb-separator` | Simple linked breadcrumb using custom SlashIcon separators between Home, Components, and current page. | RadCN docs, `/fixtures/breadcrumb/separator`, compatibility route `/fixtures/breadcrumb/custom-separator`, and Playwright prove author-supplied Slash-style separators and style hooks. | Covered | Lucide SlashIcon maps to app-owned glyphs through `BreadcrumbSeparator` children. |

## Mapping Decisions

- RadCN should not port shadcn's `asChild` or Radix Slot mechanics directly.
  Next `Link` composition maps to explicit native `BreadcrumbLink href` usage
  or app-owned anchors inside surrounding Breadcrumb markup where needed.
- React `useState` and `useMediaQuery` from the responsive example are
  application behavior, not Breadcrumb package dependencies. They should map to
  Remix 3 browser enhancement, CSS breakpoint rendering, or fixture/docs-owned
  state.
- DropdownMenu, Drawer, and Button composition should be proven in docs and
  fixtures, but Breadcrumb should not own their state or implementation.
- Lucide ChevronRight, MoreHorizontal, SlashIcon, and ChevronDownIcon are
  presentation choices. Breadcrumb parity should verify equivalent visual
  affordances, accessible names, and modifiable hooks with app-owned glyphs or
  local assets, not a package dependency.
- Tailwind truncation, max-width, gap, icon size, and responsive utilities map
  to RadCN classes, inline styles, or CSS variables.
- RadCN aligns with shadcn's default separator directionality through a
  package-owned chevron-style text glyph. Apps can still pass Slash-style
  children or any app-owned icon to `BreadcrumbSeparator`.
- BreadcrumbEllipsis currently renders text `...` plus hidden `More`, while
  upstream renders a MoreHorizontal icon plus hidden `More`. This can be a
  stable divergence if docs and fixtures show app-owned glyph customization;
  otherwise the implementation should add clearer icon-like presentation.
- Parity does not require literal React or DOM equivalence. It requires
  equivalent navigation semantics, visual behavior, accessibility, composition
  affordances, and author-facing modifiability.

## Resolution

Experiment 26 resolved Breadcrumb example parity depth. The next Issue 4
cluster should come from the regenerated `parity-inventory.md` first
recommended cluster.
