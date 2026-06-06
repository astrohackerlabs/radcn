# Breadcrumb Example Inventory

Generated during Experiment 25 on 2026-06-06.

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

Breadcrumb example parity is not complete yet. RadCN exports the core
Breadcrumb parts: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, and
`BreadcrumbEllipsis`. Fixtures and Playwright already prove basic navigation
semantics, current-page semantics, collapsed ellipsis rendering, accessible
hidden ellipsis text, custom separator content, and public style hooks.

The upstream example surface is broader. Breadcrumb still needs docs, fixture,
and Playwright depth for shadcn's named examples, especially dropdown menu
breadcrumb branches and the responsive desktop DropdownMenu/mobile Drawer
composition. The implementation experiment should also decide whether RadCN's
default separator should stay `/` as an intentional divergence or shift toward
shadcn's ChevronRight visual default.

No React dependency, Next `Link` dependency, Radix Slot dependency, lucide
dependency, Tailwind dependency, vendor import, or npm publishing behavior is
needed for Breadcrumb parity.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `breadcrumb-demo` | Home link, collapsed middle branch rendered as a DropdownMenu trigger with BreadcrumbEllipsis and hidden "Toggle menu" text, dropdown items for Documentation/Themes/GitHub, Components link, and current Breadcrumb page. Uses Next `Link`, shadcn `asChild`, DropdownMenu, and default separators. | RadCN has primitive Breadcrumb links, page semantics, ellipsis, and DropdownMenu components, but no docs/fixture/Playwright example proving a Breadcrumb item containing a DropdownMenu trigger and menu content. | Missing | Add docs, candidate fixture, and Playwright coverage for a demo breadcrumb with native links, app-owned hidden trigger text, DropdownMenu composition, default separators, and current-page semantics. |
| `breadcrumb-dropdown` | Home link, SlashIcon custom separators, a Components DropdownMenu trigger with ChevronDownIcon, dropdown items, and current page. Uses lucide Slash and ChevronDown icons plus DropdownMenu. | RadCN proves custom separator text through `/fixtures/breadcrumb/custom-separator` and has DropdownMenu components, but does not prove Slash-style icon separators or a label+chevron DropdownMenu trigger inside Breadcrumb. | Partial | Add a dropdown breadcrumb fixture and docs example with app-owned Slash/Chevron glyphs, DropdownMenu trigger semantics, and separator styling hooks. |
| `breadcrumb-ellipsis` | Home link, default separator, BreadcrumbEllipsis collapsed branch with sr-only "More" text, Components link, default separator, and current page. | RadCN `/fixtures/breadcrumb/collapsed` and Playwright prove collapsed ellipsis, accessible hidden text, linked ancestors, separators, and current-page semantics. Docs only have a seed-level Breadcrumb snippet, not a named ellipsis example. | Partial | Promote the collapsed ellipsis case into docs and explicit shadcn example parity fixture naming if the implementation experiment standardizes named upstream example routes. |
| `breadcrumb-link` | Simple linked breadcrumb: Home link, Components link, and current Breadcrumb page. Uses Next `Link` through `BreadcrumbLink asChild`. | RadCN `BreadcrumbLink` renders native anchors with `href`, and `/fixtures/breadcrumb/default` proves linked ancestors plus current page semantics. Docs have only a generic seed snippet. | Partial | Document native anchor mapping for Next `Link`/`asChild` and add explicit docs/fixture coverage for the simple link example. |
| `breadcrumb-responsive` | Responsive Breadcrumb with Home link, collapsed middle items, desktop DropdownMenu at `(min-width: 768px)`, mobile Drawer below that breakpoint, shared open state, Drawer title/description, link list, outline Button close action, truncation/max-width on trailing items, and current page. Uses React `useState`, `useMediaQuery`, Button, Drawer, DropdownMenu, Next `Link`, and responsive Tailwind utilities. | RadCN has Button, Drawer, DropdownMenu, Breadcrumb parts, and public class/style hooks, but no responsive Breadcrumb fixture, no desktop/mobile branch coverage, and no Playwright viewport tests for this composition. | Missing | Add a responsive Breadcrumb example owned by the docs/fixture app: native links, app-owned state/browser enhancement or CSS breakpoint mapping for `useMediaQuery`, desktop DropdownMenu, mobile Drawer, outline Button close action, truncation/max-width styles, and viewport Playwright assertions. |
| `breadcrumb-separator` | Simple linked breadcrumb using custom SlashIcon separators between Home, Components, and current page. | RadCN `/fixtures/breadcrumb/custom-separator` proves author-supplied separator content and style hooks, but uses text `>` rather than a Slash visual equivalent and docs do not show the named custom separator example. | Partial | Add docs/fixture coverage with app-owned Slash glyphs or equivalent visual separators; lucide SlashIcon should remain a presentation choice. |

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
- The current RadCN default BreadcrumbSeparator is `/`, while upstream shadcn's
  default component renders ChevronRight. The implementation experiment should
  either align the visual default or record `/` as an intentional, documented
  divergence with docs/fixture evidence.
- BreadcrumbEllipsis currently renders text `...` plus hidden `More`, while
  upstream renders a MoreHorizontal icon plus hidden `More`. This can be a
  stable divergence if docs and fixtures show app-owned glyph customization;
  otherwise the implementation should add clearer icon-like presentation.
- Parity does not require literal React or DOM equivalence. It requires
  equivalent navigation semantics, visual behavior, accessibility, composition
  affordances, and author-facing modifiability.

## Resolution

Breadcrumb example parity remains unresolved after Experiment 25. The next
Issue 4 experiment should implement Breadcrumb example parity depth across
package defaults where needed, docs, candidate fixtures, and Playwright
coverage.
