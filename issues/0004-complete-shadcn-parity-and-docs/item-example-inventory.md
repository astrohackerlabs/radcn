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

Item example parity is covered after Experiment 18. RadCN exports the upstream
Item parts: `ItemGroup`, `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`,
`ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, and
`ItemSeparator`. Experiment 18 added an explicit linked Item API through
`href`, `target`, `rel`, and `rmxDocument`; linked rows preserve the outer
`data-radcn-item` `role="listitem"` wrapper and render a nested native anchor
with `data-radcn-item-link`.

The docs and candidate fixtures now cover all 10 upstream Item example
families:

- Avatar and stacked-avatar compositions inside `ItemMedia`;
- DropdownMenu composition with compact Item rows inside menu items;
- grouped repeated rows with `ItemSeparator` and icon-only Button actions;
- image-card composition in `ItemHeader`;
- image media rows with secondary duration metadata;
- internal and external linked Items with native anchor attributes;
- size and variant matrices with actions;
- documented mappings for shadcn `asChild`/Radix Slot, React
  fragments/arrays, Next `Image`, external image sources, and lucide icon
  packages.

The `item` example cluster can be marked resolved in `resolved-clusters.json`
and excluded from the unresolved recommendation queue.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `item-avatar` | Outline Items with Avatar media, user/team descriptions, stacked avatars, and invite Button actions including an icon-only invite button. | Covered by `radcn/apps/docs/app/content/components.tsx`, `/fixtures/item/avatar`, and Playwright checks for Avatar media, stacked avatars, and `ariaLabel` icon-only invite actions. | Covered | None. |
| `item-demo` | Basic outline Item with title/description/action and a small link-like verified-profile Item using `asChild`, icon media, and trailing chevron. | Covered by docs, `/fixtures/item/demo`, and Playwright proof that `href` renders a nested native anchor through `data-radcn-item-link`. `asChild`/Radix Slot maps to explicit RadCN `href`. | Covered | None. |
| `item-dropdown` | DropdownMenu trigger opens a menu whose items render compact Item rows with Avatar media, title, and description. | Covered by docs, `/fixtures/item/dropdown`, and Playwright proof that Item rows compose inside DropdownMenu items while DropdownMenu owns menu state. | Covered | None. |
| `item-group` | ItemGroup list of people with Avatar media, ItemSeparator between rows, and icon Button actions generated from an array with React fragments. | Covered by docs, `/fixtures/item/group`, and Playwright proof for list/listitem semantics, Avatar rows, separators, and icon-only action names. React fragments/arrays are an app/server-owned row mapping. | Covered | None. |
| `item-header` | Grid of outline Items whose ItemHeader contains large image cards, followed by title and description content. Uses Next `Image` and external image URLs. | Covered by docs, `/fixtures/item/header`, and Playwright proof for `ItemHeader` image cards using native/static image content. Next `Image` and remote sources are intentional app/docs choices, not RadCN dependencies. | Covered | None. |
| `item-icon` | Outline Item with `ItemMedia variant="icon"`, alert icon, description, and Review Button action. | Covered by docs, `/fixtures/item/icon`, and Playwright proof for icon media plus Review Button action. Icon packages such as lucide remain presentation choices. | Covered | None. |
| `item-image` | ItemGroup list of link-like outline Items with `ItemMedia variant="image"`, image thumbnails, title plus muted album span, artist description, and secondary duration content. | Covered by docs, `/fixtures/item/image`, and Playwright proof for linked image rows, `variant="image"` media, native image content, and secondary duration metadata. | Covered | None. |
| `item-link` | Default and outline Items rendered as anchors, including external link attributes and trailing chevron/external-link icons. | Covered by package `href`/`target`/`rel`/`rmxDocument` props, docs, `/fixtures/item/link`, and Playwright proof for internal and external native anchors inside listitem wrappers. | Covered | None. |
| `item-size` | Default-size and small-size outline Items, including small link-like `asChild` Item with icon media. | Covered by docs, `/fixtures/item/size`, and Playwright proof for `data-size="default"`, `data-size="sm"`, visibly distinct row height, and a small linked Item. | Covered | None. |
| `item-variant` | Default, outline, and muted Items, each with title, description, and outline Button action. | Covered by docs, `/fixtures/item/variant`, and Playwright proof for default, outline, and muted rows with Button actions. | Covered | None. |

## Mapping Decisions

- RadCN does not port shadcn's `asChild` or Radix Slot mechanics directly.
  Link-like Item examples map to the explicit `href` Item API. Linked Items
  keep the row wrapper as `role="listitem"` and render a nested native anchor
  through `data-radcn-item-link`.
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

Regenerate `parity-inventory.md` with `item` recorded in
`resolved-clusters.json`, then follow the generated first recommendation for
the next unresolved example, block, chart, or package outcome cluster.
