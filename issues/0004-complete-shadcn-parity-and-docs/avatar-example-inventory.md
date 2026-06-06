# Avatar Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Avatar example:
`avatar-demo`.

RadCN ships `radcn/avatar` with Avatar, AvatarImage, AvatarFallback,
AvatarBadge, AvatarGroup, and AvatarGroupCount exports. Package, docs,
fixture, and Playwright evidence now proves image alt/src/loading props,
visible and hidden fallback behavior, badge hooks, group hooks, group count
hooks, size variants, custom token styling, Avatar composition inside Item and
Empty examples, and the exact named upstream `avatar-demo` composition.

Experiment 86 resolved the direct Avatar cluster by adding named docs,
candidate fixture, and browser coverage for the exact GitHub image URLs,
fallback text `CN`, `ER`, and `LR`, a rounded-square Avatar, a flex/wrapped
`gap-12` wrapper, and a stacked negative-space group with ring and grayscale
image treatment.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `avatar-demo` | Wrapper `div` uses flex row, wrapping, centered items, and `gap-12`. First Avatar is the default circular shape with image `https://github.com/shadcn.png`, alt `@shadcn`, and fallback `CN`. Second Avatar adds `className="rounded-lg"` for a rounded-square shape with image `https://github.com/evilrabbit.png`, alt `@evilrabbit`, and fallback `ER`. Third section is a stacked avatar group using negative spacing, ring styling, and grayscale image treatment for avatars `@shadcn`/`CN`, `@maxleiter`/`LR`, and `@evilrabbit`/`ER`. The upstream UI uses a React client component marker, Radix Avatar primitive, `data-slot`, `data-size`, `className`, `cn`, Tailwind size/shape/flex/ring/group selectors, and app-owned remote GitHub image mechanics. | `radcn/apps/docs/app/content/components.tsx` now renders rich `avatar-demo` docs with `data-radcn-docs-avatar-family="avatar-demo"`, exact remote GitHub image URLs, exact alt/fallback triplets, default circular shape, rounded-square class/style evidence, stacked AvatarGroup, negative spacing class/style evidence, ring box-shadow evidence through package/public CSS and explicit root styles, grayscale image style/class evidence, and mapping copy for React, Radix, `data-slot`, `data-size`, `className`, `cn`, Tailwind utilities, remote images, custom tokens, and vendor source. `radcn/apps/docs/tests/coverage.spec.ts` verifies the same docs evidence. `radcn/fixtures/candidate-remix/app/fixtures/avatar.tsx` exposes `avatar/demo` with the exact named composition, and `radcn/fixtures/tests/avatar-scroll-area.spec.ts` verifies the five image elements, exact `src`/`alt` attributes, fallback texts with deliberate `aria-hidden`, wrapper flex/gap layout, circular and rounded-square computed shape evidence, group accessible label, negative spacing, ring box-shadow, grayscale image class/style, and public Avatar/Image/Fallback/Group hooks. `radcn/packages/radcn/src/components/avatar.tsx` and `radcn/packages/radcn/src/styles/tokens.css` continue to provide dependency-free Avatar parts, public hooks, native image props, fallback control, circular sizing, group overlap, ring-like border/box-shadow, and custom tokens. Related Item and Empty Avatar examples remain covered by their own inventories. | Covered | No follow-up. |

## Related Examples

- `item-avatar` belongs to the Item example cluster. It is tracked in
  `item-example-inventory.md` and is already covered by Item docs, fixtures,
  and Playwright checks for Avatar media, stacked avatars, and icon-only invite
  actions.
- `empty-avatar` belongs to the Empty example cluster. It is tracked in
  `empty-example-inventory.md` and is already covered by Empty docs, fixtures,
  and Playwright checks for Avatar media, deterministic image/fallback content,
  and action composition.
- `empty-avatar-group` belongs to the Empty example cluster. It is tracked in
  `empty-example-inventory.md` and is already covered by Empty docs, fixtures,
  and Playwright checks for AvatarGroup media and AvatarGroupCount composition.

## Decisions

- RadCN should keep Avatar as dependency-free markup over native `img` and
  span/div parts. The Radix Avatar primitive is not needed for this example.
- Upstream `data-slot` maps to public `data-radcn-avatar*` hooks, and upstream
  `data-size` maps to RadCN `data-size` plus size classes.
- Upstream `className` and `cn` map to explicit `class`, `style`, CSS
  variables, and package classes.
- Remote GitHub image loading remains app-owned content. The named docs and
  fixture use the exact upstream remote URLs for markup parity, while tests
  verify attributes and CSS behavior rather than network image decoding.
- Upstream fallback texts `CN`, `ER`, and `LR` should be included in named
  docs/fixtures even when images are present. Use `ariaHidden` deliberately
  when fallback text is only visual backup behind an accessible image.
- Upstream `rounded-lg` on Avatar maps to an app/docs class or style on the
  Avatar root; it should not require a package API change.
- Upstream stacked `-space-x-2`, ring utilities, and grayscale image treatment
  map to AvatarGroup package behavior plus explicit app/docs classes, styles,
  CSS variables, or scoped CSS over public hooks.
- AvatarGroup package CSS must avoid child-combinator selectors in exported
  `radcnStyles` because the current style injection path escapes `>` to
  `&gt;`; descendant/public-hook selectors are verified by the plain
  `avatar/group` fixture.
- Image-backed named-demo fallbacks use `ariaHidden={true}` because the native
  image `alt` attributes provide the accessible names and the initials are
  visual fallback content.
- AvatarBadge is not used by `avatar-demo`; badge evidence remains useful
  package coverage but should not be required for this direct example row.
- `AvatarGroupCount` is not used by `avatar-demo`; count evidence remains
  useful package coverage but should not be required for this direct example
  row.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
