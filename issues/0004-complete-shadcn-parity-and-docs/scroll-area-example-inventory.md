# Scroll Area Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Scroll Area examples:
`scroll-area-demo` and `scroll-area-horizontal-demo`. RadCN already ships
`radcn/scroll-area` with the core native scroll-container behavior needed for
both examples, but current docs, fixtures, and Playwright tests do not yet
prove the named upstream example compositions.

**Audit outcome:** Partial.

The next experiment should add named docs, candidate fixture routes, and
Playwright coverage for `scroll-area-demo` and
`scroll-area-horizontal-demo`. The audit found no mandatory Scroll Area
package API change yet. React, Radix ScrollArea primitives, `className`,
`data-slot`, Tailwind, `cn`, `next/image`, image optimization, remote image
loading, and vendor source remain non-dependencies unless a later
implementation pass discovers and records a concrete RadCN package gap.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `scroll-area-demo` | Scroll Area with `h-72 w-48 rounded-md border`; vertical scrolling of 50 generated tags from `v1.2.0-beta.50` down to `v1.2.0-beta.1`; inner `p-4` content; heading `Tags`; each tag rendered as text-sm content separated by a horizontal Separator with `my-2`; default vertical scrollbar and corner from the Scroll Area component. | `radcn/scroll-area` supports root, viewport, vertical scrollbar, thumb, native scrolling, focus-visible treatment, custom width/height through style or tokens, rounded/bordered surfaces, and public hooks. `radcn/separator` supports horizontal separators. Existing candidate fixtures prove generic vertical scrolling and custom tokens, and docs render a generic component-list Scroll Area, but no docs/fixture/test evidence renders the named 50-tag list, exact `Tags` heading, beta tag ordering, Separator composition, shadcn dimensions, or named upstream example id. | Partial | Add named docs and candidate fixture evidence for `scroll-area-demo`; cover exact tag count/order/copy, heading, Separator composition, vertical native scrolling, default vertical scrollbar/thumb, sizing/layout evidence, public hooks, focus behavior, and mapping copy. |
| `scroll-area-horizontal-demo` | Scroll Area with `w-96 rounded-md border whitespace-nowrap`; horizontal strip with `flex w-max space-x-4 p-4`; three `figure` items for Ornella Binni, Tom Byrom, and Vladimir Malyavko; each has rounded overflow image wrapper, Next Image remote image with `alt="Photo by {artist}"`, `width=300`, `height=400`, `aspect-[3/4]`, object-cover presentation, and figcaption `Photo by {artist}` with emphasized artist text; explicit horizontal `ScrollBar orientation="horizontal"`. | `radcn/scroll-area` supports horizontal scrollbar/thumb, corner, native horizontal scrolling, custom width/height/layout via class/style, and public hooks. Existing candidate fixtures prove generic horizontal scrolling with card-like release-note content, but no docs/fixture/test evidence renders the named three-artwork strip, figure/figcaption semantics, artist names, image dimensions/aspect evidence, alt text, horizontal `w-max`-style content width, `whitespace-nowrap` behavior, or explicit upstream example id. | Partial | Add named docs and candidate fixture evidence for `scroll-area-horizontal-demo`; cover three artwork items, artist copy, figure/figcaption semantics, accessible image alt text or documented local image substitute, dimensions/aspect/layout evidence, horizontal native scrolling, explicit horizontal scrollbar/thumb/corner evidence, public hooks, and mapping copy. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Scroll Area root | Supported by `radcn/packages/radcn/src/components/scroll-area.tsx` with `data-radcn-scroll-area`, package class, `class`, and `style`. Existing fixtures prove root rendering and custom-token styling. |
| Viewport | Supported through `ScrollAreaViewport` with `data-radcn-scroll-area-viewport`, `ariaLabel`, `id`, `tabIndex`, `class`, and `style`. Existing tests prove focusability and native scroll mutation. |
| Native vertical scrolling | Supported. Existing candidate tests set `scrollTop` on the viewport and verify it moves. Named `scroll-area-demo` still needs 50-tag content proof. |
| Native horizontal scrolling | Supported. Existing candidate tests set `scrollLeft` and verify it moves. Named `scroll-area-horizontal-demo` still needs artwork-strip proof. |
| Vertical scrollbar and thumb | Supported through `ScrollBar` default `orientation="vertical"` and `ScrollAreaThumb`. Existing tests prove vertical scrollbar hooks and custom thumb color. |
| Horizontal scrollbar and thumb | Supported through `ScrollBar orientation="horizontal"` and `ScrollAreaThumb`. Existing tests prove horizontal scrollbar hooks. |
| Corner | Supported through `ScrollAreaCorner`; existing tests prove it in horizontal/bidirectional scenarios. Upstream Scroll Area component always renders a Radix corner, while RadCN makes the part explicit so authors can include it when both axes or corner styling matters. |
| Focus-visible treatment | Supported by viewport focus CSS and covered by candidate Playwright. |
| Width, height, rounded border, padding, whitespace, and horizontal strip layout | Supported through `class`, `style`, CSS variables, and app markup. Named examples need docs/fixture/test proof for shadcn-style dimensions and layouts. |
| Custom classes, styles, and tokens | Supported by `class`, `style`, package part classes, data hooks, and CSS variables such as `--radcn-scroll-area-height`, `--radcn-scroll-area-border`, `--radcn-scroll-area-bg`, `--radcn-scroll-area-thumb-bg`, and `--radcn-scroll-area-corner-bg`. |
| Separator composition | Separate package surface. `scroll-area-demo` should compose `radcn/separator`, but Scroll Area should not own separator semantics. |
| Repeated tag content and React fragments/keys | App-owned content generation. RadCN can render equivalent repeated markup without React fragments or keys becoming package concerns. |
| Image rendering and `next/image` | App-owned presentation. RadCN should not depend on Next Image, image optimization, or remote Unsplash loading for Scroll Area parity. Named examples can use plain `img`, local stable assets, CSS placeholders with alt-text evidence, or a documented intentional substitute if network image loading is not appropriate for tests. |
| Figure and figcaption markup | App-owned semantic content inside the Scroll Area viewport. Named examples should prove this composition because it affects user-facing artwork labels, but the Scroll Area package should not own it. |
| React props, Radix `ScrollAreaPrimitive`, `className`, `data-slot`, Tailwind utilities, and `cn` | Implementation details or React/Tailwind mechanics from shadcn/ui. RadCN maps these to Remix UI props, `class`, public `data-radcn-*` hooks, package CSS, inline style, CSS variables, and app-owned markup. They are not RadCN dependencies. |
| Vendor source | Reference only. No RadCN package, docs, fixture, or test code should depend on `vendor/`. |

## Evidence Reviewed

- Issue inventory:
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Upstream package source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/scroll-area.tsx`.
- Upstream example source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/scroll-area-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/scroll-area-horizontal-demo.tsx`.
- Upstream registry metadata:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/scroll-area.json`,
  `scroll-area-demo.json`, `scroll-area-horizontal-demo.json`, and
  `separator.json`.
- Current RadCN package source:
  `radcn/packages/radcn/src/components/scroll-area.tsx` and
  `radcn/packages/radcn/src/components/separator.tsx`.
- Current RadCN styles:
  `radcn/packages/radcn/src/styles/index.ts` and
  `radcn/packages/radcn/src/styles/tokens.css`.
- Current docs evidence:
  `radcn/apps/docs/app/content/components.tsx` has a generic Scroll Area
  registry preview, and `radcn/apps/docs/tests/coverage.spec.ts` only asserts
  generic Scroll Area docs visibility.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/scroll-area.tsx` covers generic
  vertical, horizontal, bidirectional, focus, and custom-token scenarios, but
  not named upstream Scroll Area examples.
- Current Playwright evidence:
  `radcn/fixtures/tests/avatar-scroll-area.spec.ts` covers native vertical and
  horizontal scrolling, viewport focus styling, vertical/horizontal scrollbar
  hooks, corner hooks, and custom token styling.

## Decision

The Scroll Area example cluster is not resolved yet. RadCN has the core package
behavior needed for both upstream examples, and no mandatory React, Radix,
`next/image`, Tailwind, `cn`, image optimization, remote-image, or vendor
dependency was identified. The missing proof is named parity depth: docs,
candidate fixtures, and Playwright should render and test
`scroll-area-demo` and `scroll-area-horizontal-demo` with exact copy, repeated
tag and Separator composition, artwork strip content, image/figure semantics
or a documented image substitute, horizontal/vertical scrolling behavior,
public hooks, custom layout evidence, and mapping copy.
