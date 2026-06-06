# Aspect Ratio Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one active Aspect Ratio example:
`aspect-ratio-demo`.

RadCN already ships `radcn/aspect-ratio` with an `AspectRatio` export that
renders a dependency-free wrapper using CSS `aspect-ratio`. Current package,
fixture, and Playwright evidence proves default 16:9 layout sizing, custom
ratio layout sizing, public `data-radcn-aspect-ratio` hooks, class/style
customization, full-size child styling, overflow clipping, border radius, and
muted background tokens.

The named upstream example is still partial because current docs, fixtures, and
tests do not prove the exact `aspect-ratio-demo` composition: the Unsplash
photo URL, alt text `Photo by Drew Beamer`, rounded muted root styling, full
cover image behavior, and dark-mode brightness/grayscale image filters.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `aspect-ratio-demo` | `AspectRatio ratio={16 / 9}` with root `className="rounded-lg bg-muted"`. The child is Next `Image` with `src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"`, `alt="Photo by Drew Beamer"`, `fill`, and `className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"`. The upstream UI uses a React client component marker, Radix AspectRatio primitive, `data-slot="aspect-ratio"`, `className`, Tailwind rounded/background/sizing/object-fit utilities, dark-mode image filters, Next remote image mechanics, and app-owned image presentation. | `radcn/packages/radcn/src/components/aspect-ratio.tsx` renders `data-radcn-aspect-ratio` with configurable string `ratio`, class, style, and default `16 / 9`. `radcn/packages/radcn/src/styles/tokens.css` gives the root `display:block`, `width:100%`, `overflow:hidden`, token border radius, muted background, and full-size direct children. `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` covers default `16 / 9` and custom `1 / 1` ratio fixtures with placeholder media. `radcn/fixtures/tests/static-display.spec.ts` verifies 420px by 236.25px and 240px by 240px layout outcomes. `radcn/apps/docs/app/content/components.tsx` renders a generic 16:9 preview and source snippet with a local RadCN logo image. `radcn/apps/docs/tests/coverage.spec.ts` verifies the docs route renders an AspectRatio hook through generic coverage. No current docs/fixture/test proves the named upstream remote image URL, exact alt text, rounded/muted root classes, object-cover image sizing, dark-mode brightness/grayscale filters, or Next Image mapping for `aspect-ratio-demo`. | Partial | Add named docs, candidate fixture, and Playwright coverage for `aspect-ratio-demo` with the exact remote image URL or a documented local deterministic equivalent, exact alt text, 16:9 root, rounded/muted root styling, full-cover child image, object-fit cover, dark-mode brightness/grayscale styling, public root hook evidence, and mapping copy for React, Radix, Next Image, `data-slot`, `className`, Tailwind utilities, remote image handling, and vendor source. |

## Decisions

- RadCN should keep Aspect Ratio as dependency-free CSS `aspect-ratio` markup.
  The Radix AspectRatio primitive is not needed for this example.
- Upstream `ratio={16 / 9}` maps to RadCN's `ratio="16 / 9"` string prop. The
  user-facing layout result is what matters, not numeric prop equivalence.
- Upstream `className` maps to `class`, and `data-slot="aspect-ratio"` maps to
  `data-radcn-aspect-ratio`.
- Upstream `rounded-lg bg-muted` maps to existing RadCN package CSS by default,
  plus optional app/docs classes, styles, or CSS variables when a page needs a
  larger radius or different muted token.
- Next `Image fill` is not a RadCN dependency. The named example can use native
  `img` markup or a deterministic docs asset as long as the full-cover visual,
  alt text, sizing, and modifiability are equivalent and any remote-image
  divergence is documented.
- Upstream `h-full w-full object-cover` maps to RadCN full-size child CSS plus
  app-owned `object-fit: cover` image styling.
- Upstream `dark:brightness-[0.2] dark:grayscale` maps to app/docs CSS under
  RadCN theme hooks. The package should not own image filter policy.
- Existing generic fixtures are useful layout evidence but not named example
  parity because they use placeholder media and omit the upstream photo, alt
  text, and dark-mode image treatment.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
