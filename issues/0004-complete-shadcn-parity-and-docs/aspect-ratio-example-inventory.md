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

The named upstream example is now covered by docs, candidate fixtures, and
Playwright tests that prove the exact `aspect-ratio-demo` composition: the
Unsplash photo URL, alt text `Photo by Drew Beamer`, rounded muted root
styling, full-cover image behavior, and dark-mode brightness/grayscale image
filters.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `aspect-ratio-demo` | `AspectRatio ratio={16 / 9}` with root `className="rounded-lg bg-muted"`. The child is Next `Image` with `src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"`, `alt="Photo by Drew Beamer"`, `fill`, and `className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"`. The upstream UI uses a React client component marker, Radix AspectRatio primitive, `data-slot="aspect-ratio"`, `className`, Tailwind rounded/background/sizing/object-fit utilities, dark-mode image filters, Next remote image mechanics, and app-owned image presentation. | `radcn/apps/docs/app/content/components.tsx` promotes Aspect Ratio to a rich docs page with `data-radcn-docs-aspect-ratio-family="aspect-ratio-demo"`, exact upstream remote image URL, exact alt text, `ratio="16 / 9"`, rounded/muted root class evidence, native full-cover image styling, dark-mode filter styling under `data-radcn-theme="dark"`, public root hook evidence, and mapping copy for React, Radix, Next Image, `data-slot`, `className`, Tailwind rounded/background/sizing/object-fit/dark utilities, remote image handling, package CSS, public hooks, custom tokens, and vendor source. `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` adds `aspect-ratio/demo` with the exact remote URL, exact alt text, 16:9 layout, rounded/muted root classes, native image fill/object-fit styling, and theme-scoped brightness/grayscale filter. `radcn/fixtures/tests/static-display.spec.ts` verifies exact alt text, remote source strategy, 420px by 236.25px layout, root hooks/classes/computed styling, image fill dimensions, object-fit cover, and dark-mode filter. `radcn/apps/docs/tests/coverage.spec.ts` verifies the docs proof surface and divergence copy. | Covered | None. |

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
- Next `Image fill` is not a RadCN dependency. The named example uses native
  `img` markup with the exact upstream remote URL, exact alt text, full-cover
  sizing, and app-owned object-fit/filter styling.
- Upstream `h-full w-full object-cover` maps to RadCN full-size child CSS plus
  app-owned `object-fit: cover` image styling.
- Upstream `dark:brightness-[0.2] dark:grayscale` maps to app/docs CSS under
  RadCN theme hooks. The package should not own image filter policy.
- Existing generic fixtures are useful layout evidence but not named example
  parity because they use placeholder media and omit the upstream photo, alt
  text, and dark-mode image treatment.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
