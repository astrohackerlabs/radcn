# Item Example Inventory

Generated during Experiment 17 on 2026-06-06.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/item-*.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/item.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/item.tsx`
  `radcn/packages/radcn/src/components/avatar.tsx`
  `radcn/packages/radcn/src/components/button.tsx`
  `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  `radcn/fixtures/tests/navigation-collection.spec.ts`

## Summary

Item example parity is not complete yet. RadCN currently exports the core
upstream Item parts: `ItemGroup`, `Item`, `ItemMedia`, `ItemContent`,
`ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, and
`ItemSeparator`. Existing fixtures prove the basic package slots, list/listitem
semantics, outline and muted variants, small and extra-small sizes, image and
icon media hooks, header/footer slots, and separator hooks.

That coverage is strong at the primitive level, but it does not yet cover the
full upstream Item example surface.

The missing Item parity depth is:

- link-like Item composition that maps shadcn `asChild`/Radix Slot to explicit
  RadCN anchor semantics;
- Avatar and stacked-avatar compositions inside `ItemMedia`;
- DropdownMenu composition with Item rows inside menu items;
- image-card composition in `ItemHeader`;
- image media rows with secondary metadata content;
- icon-only Button actions with accessible names;
- richer default/size/variant example matrices in docs and fixtures;
- documented mappings for React fragments/arrays, Next `Image`, external image
  sources, and lucide icon packages.

Do not mark the `item` example cluster resolved yet. The next experiment should
implement Item example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `item-avatar` | Outline Items with Avatar media, user/team descriptions, stacked avatars, and invite Button actions including an icon-only invite button. | RadCN has `Avatar`, `AvatarGroup`, `Button`, and Item media/actions primitives, but current Item fixtures do not prove Avatar or stacked-avatar composition inside ItemMedia or accessible icon-only invite actions. | Partial | Add Avatar and stacked-avatar Item examples in docs/fixtures and Playwright proof for media composition plus icon-only Button accessible names. |
| `item-demo` | Basic outline Item with title/description/action and a small link-like verified-profile Item using `asChild`, icon media, and trailing chevron. | Current default fixture proves basic Item slots and actions, but link-like Item semantics and `asChild` mapping are not proved. | Partial | Add link-like Item proof using explicit anchor semantics and record `asChild`/Slot as a RadCN divergence. |
| `item-dropdown` | DropdownMenu trigger opens a menu whose items render compact Item rows with Avatar media, title, and description. | RadCN has DropdownMenu and Item packages, but no Item-specific DropdownMenu fixture/docs proof. | Missing | Add DropdownMenu composition proof with Item rows inside menu items, keeping menu state owned by DropdownMenu. |
| `item-group` | ItemGroup list of people with Avatar media, ItemSeparator between rows, and icon Button actions generated from an array with React fragments. | Current grouped fixture proves ItemGroup, ItemSeparator, header, footer, and a small list, but not Avatar row lists, repeated separators, or icon-only actions. | Partial | Add repeated person-list proof with ItemSeparator and map React fragments/arrays to static server-rendered rows or app-owned data mapping. |
| `item-header` | Grid of outline Items whose ItemHeader contains large image cards, followed by title and description content. Uses Next `Image` and external image URLs. | RadCN exports ItemHeader and current fixtures prove the header hook, but not image-card headers, grid layout, external image handling, or Next Image mapping. | Partial | Add header image-card proof using native `img` or local/static docs images; record Next `Image` and remote source handling as app/docs decisions, not package dependencies. |
| `item-icon` | Outline Item with `ItemMedia variant="icon"`, alert icon, description, and Review Button action. | Current variants fixture proves `variant="icon"` media and action slots, but not a direct security-alert icon example with rendered action behavior. | Partial | Add representative icon media proof in docs/fixtures and keep icon package choice presentation-only. |
| `item-image` | ItemGroup list of link-like outline Items with `ItemMedia variant="image"`, image thumbnails, title plus muted album span, artist description, and secondary duration content. | Current default fixture proves image media and title/description/actions; it does not prove link-like image rows, secondary `ItemContent`, or duration metadata. | Partial | Add image-row list proof with explicit anchors, secondary content, and native/local image mapping. |
| `item-link` | Default and outline Items rendered as anchors, including external link attributes and trailing chevron/external-link icons. | Current Item package renders a `div` only; no docs/fixture proof maps link-like `asChild` Items to anchor semantics. | Missing | Decide whether Item needs an `href`/anchor path or a documented anchor composition, then add internal and external link proof. |
| `item-size` | Default-size and small-size outline Items, including small link-like `asChild` Item with icon media. | Current variants fixture proves `size="sm"` and `size="xs"`, but not the upstream size matrix with link-like small Item behavior. | Partial | Add size matrix proof that includes default and small Items plus link-like small Item mapping. |
| `item-variant` | Default, outline, and muted Items, each with title, description, and outline Button action. | Current variants fixture proves outline and muted variants, and default fixture proves default composition, but no single docs/fixture matrix proves all three upstream variants with actions. | Partial | Add variant matrix proof and mark repeated primitive behavior covered when equivalent. |

## Mapping Decisions

- RadCN should not port shadcn's `asChild` or Radix Slot mechanics directly.
  Link-like Item examples should map to an explicit RadCN anchor path, a
  documented anchor composition, or a package API chosen by the implementation
  experiment.
- React fragments and array mapping are not Item package requirements. RadCN
  examples can render repeated server-side rows directly or map app data to
  repeated Item markup outside the package.
- Next `Image` is not a RadCN dependency candidate. Image examples should use
  native `img`, docs-owned static assets, generated/local assets, or app-owned
  framework image components.
- External image URLs in upstream examples are content choices, not package
  requirements. Docs/fixtures should avoid depending on remote images when a
  local deterministic asset or Avatar fallback proves the same behavior.
- Lucide icons are presentation details. Item parity should verify icon media,
  trailing affordances, and accessible icon-only actions without depending on
  upstream icon packages.
- Avatar, Button, DropdownMenu, and Separator behavior stays owned by those
  package primitives. Item should remain a layout/content primitive unless the
  implementation experiment proves a narrow package API gap.
- The audit should not assume DOM equivalence. The implementation target is
  equivalent visual grouping, accessibility, and author-facing modifiability.

## Next Recommendation

Implement Item example parity depth:

- add docs and candidate fixtures for all 10 upstream Item examples;
- add focused Playwright coverage for Avatar media, stacked avatars, icon media,
  image media, link-like Items, internal/external anchors, DropdownMenu
  composition, grouped rows/separators, header image cards, size and variant
  matrices, secondary content, and icon-only Button actions;
- decide whether Item needs an explicit anchor API or documented anchor
  composition to replace shadcn `asChild`;
- update Item styles if composition gaps appear;
- record intentional divergences for `asChild`/Slot, React fragments/arrays,
  Next `Image`, remote images, and icon packages;
- then mark `item` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
