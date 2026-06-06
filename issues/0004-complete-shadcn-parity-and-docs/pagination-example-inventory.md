# Pagination Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Pagination example:
`pagination-demo`.

RadCN ships Pagination substrate and named `pagination-demo` parity evidence:
package exports for the root, content list, item, link, previous, next, and
ellipsis parts; semantic navigation/list/link markup; active page state;
accessible previous/next labels; ellipsis screen-reader text; custom label
support; named docs, candidate fixture, and Playwright coverage.

The direct upstream example is covered. The named docs demo uses upstream
`href="#"` values and renders the exact `Previous`, `1`, active `2`, `3`,
ellipsis/`More pages`, and `Next` sequence. The named candidate fixture covers
the same sequence with upstream hash hrefs, while the existing `active` and
`custom-labels` scenarios keep active-page-`3` and custom-label
modifiability evidence.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `pagination-demo` | Renders a pagination navigation with `Pagination`, `PaginationContent`, six `PaginationItem` rows, `PaginationPrevious href="#"`, `PaginationLink href="#">1</PaginationLink>`, active `PaginationLink` for `2`, `PaginationLink` for `3`, `PaginationEllipsis`, and `PaginationNext href="#"`. The previous link has accessible label `Go to previous page`, visible text `Previous`, and a lucide `ChevronLeftIcon`. The next link has accessible label `Go to next page`, visible text `Next`, and a lucide `ChevronRightIcon`. The ellipsis renders a `MoreHorizontalIcon`, is `aria-hidden`, and includes screen-reader text `More pages`. Upstream package mechanics include React component props, `buttonVariants`, `Button` size typing, `className`, Tailwind utilities, `cn`, `data-slot`, button variant/size mapping, lucide `ChevronLeftIcon`, `ChevronRightIcon`, and `MoreHorizontalIcon`, and vendor source. | `radcn/packages/radcn/src/components/pagination.tsx` exports dependency-free `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, and `PaginationEllipsis`. It renders `nav role="navigation"` with `aria-label="pagination"`, list markup, link hooks, `aria-current="page"` for active links, previous/next accessible labels, text labels, icon hooks using text affordances, and ellipsis `More pages` screen-reader text. `radcn/packages/radcn/src/index.ts` exports the API and `radcn/packages/radcn/package.json` has no React, lucide, Tailwind, or `class-variance-authority` dependency. Package CSS in `radcn/packages/radcn/src/styles/tokens.css` provides pagination layout, link, active, previous/next, ellipsis, and token hooks. `radcn/apps/docs/app/content/components.tsx` now ships a named `pagination-demo` rich example, exact source snippet, upstream hash hrefs, and mapping copy for React/lucide/`buttonVariants`/Button size/Tailwind/`cn`/`className`/`data-slot` divergences. `radcn/apps/docs/tests/coverage.spec.ts` verifies the named docs family hook, root/content/item/link/ellipsis hooks, exact text sequence, active page `2`, previous/next accessible labels, hash hrefs, icon hooks, source snippet, and mapping copy. `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx` renders a named `demo` fixture with upstream hash hrefs and preserves `default`, `active`, and `custom-labels` scenarios. `radcn/fixtures/tests/navigation-collection.spec.ts` verifies the named `pagination/demo` route, exact sequence, active page `2`, hash hrefs, ellipsis `More pages`, previous/next labels, icon hooks, plus existing active-page-`3` and custom-label modifiability coverage. `radcn/fixtures/reference-react-router/app/fixtures/navigation-collection.tsx` remains generic reference parity substrate. | Covered | No follow-up for this direct example. |

## Decisions

- React component props: not required. RadCN Pagination is server-rendered
  Remix UI markup with explicit props.
- `buttonVariants`: not a dependency. Button-like pagination link styling maps
  to package classes and tokenized link/active classes.
- `Button` size typing: not required. RadCN exposes explicit Pagination link
  props and previous/next text props rather than importing Button types.
- `ChevronLeftIcon`, `ChevronRightIcon`, and `MoreHorizontalIcon`: map to
  package-owned text icon affordance hooks today. Apps may replace those
  affordances with app-owned SVG or icon-package presentation without adding
  `lucide-react` to RadCN.
- `Pagination`: current root covers role, accessible label, public class, and
  `data-radcn-pagination`.
- `PaginationContent`: current list part covers the upstream flex list
  semantics through a real `ul`.
- `PaginationItem`: current item part covers the upstream `li` wrapper.
- `PaginationLink`: current link part covers href, active state,
  `aria-current="page"`, classes, and public hooks.
- `PaginationPrevious`: current previous part covers `Go to previous page`,
  visible text, previous icon hook, custom labels, and link behavior.
- `PaginationNext`: current next part covers `Go to next page`, visible text,
  next icon hook, custom labels, and link behavior.
- `PaginationEllipsis`: current ellipsis part covers visible ellipsis,
  `aria-hidden`, public hook, and screen-reader text `More pages`.
- Active page state: the named demo covers active page `2`; the existing
  active scenario continues to cover active page `3` modifiability.
- Previous/next labels: current package and tests cover accessible labels and
  custom visible labels.
- Ellipsis screen-reader text: the named docs and fixture tests cover
  `More pages`.
- `className`: maps to `class`.
- Tailwind utilities: map to package CSS, classes, CSS variables, and app-owned
  styles rather than a Tailwind dependency.
- `cn`: not needed as a package dependency; class composition is explicit.
- `data-slot`: maps to RadCN public `data-radcn-pagination*` hooks.
- Button variant/size mapping: maps to `radcn-pagination-link` and
  `radcn-pagination-link--active` package classes rather than shadcn Button
  variants.
- Docs evidence: the docs route includes a named `pagination-demo` rich example
  with exact source, exact upstream sequence, upstream hash hrefs, and mapping
  copy.
- Fixture evidence: the candidate fixture includes a named `pagination/demo`
  route with upstream hash hrefs; generic candidate/reference fixtures remain
  substrate evidence.
- Playwright evidence: docs and fixture tests cover the named upstream demo;
  existing fixture tests still prove active state, ellipsis presence, custom
  labels, and accessible previous label.
- Custom labels: already supported by `PaginationPrevious` and
  `PaginationNext` text props.
- Custom tokens: package classes and CSS variables are available through the
  same public hooks used by the named demo.
- Vendor source: the upstream references are
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/pagination-demo.tsx`
  and `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/pagination.tsx`.
