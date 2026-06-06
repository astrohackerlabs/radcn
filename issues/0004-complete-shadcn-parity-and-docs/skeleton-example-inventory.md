# Skeleton Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes two active Skeleton examples:
`skeleton-card` and `skeleton-demo`.

RadCN already has the reusable Skeleton primitive needed for both examples:
`radcn/skeleton` renders an `aria-hidden` placeholder with
`data-radcn-skeleton`, accepts `class` and `style`, applies base radius and
secondary-token background styling, and uses the package `radcn-pulse`
animation. Current docs and fixtures prove generic placeholder behavior, but
they do not yet prove both named upstream compositions.

No package API gap is apparent. The follow-up should add named docs examples,
candidate fixture routes, and Playwright coverage for `skeleton-card` and
`skeleton-demo`.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `skeleton-card` | Vertical loading card made from three Skeleton blocks: a `250px` by `125px` rounded-xl media placeholder, then two text-line placeholders sized `250px` by `1rem` and `200px` by `1rem`. Uses React props, `className`, Tailwind `flex flex-col space-y-3`, `space-y-2`, fixed width/height utilities, `rounded-xl`, `data-slot="skeleton"`, `cn`, and shadcn Skeleton source. | `radcn/skeleton` supports hidden placeholder semantics, pulse animation, base radius/background styling, custom `class`, and inline `style`, so the exact dimensions and rounded-xl shape can be represented without package changes. Current docs show only two generic text lines. Current candidate/reference fixtures show an avatar/list-style placeholder, not the card media composition. Current Playwright only proves `aria-hidden` and `radcn-pulse` on `/fixtures/skeleton/default`; it does not prove the named card layout, three block sizes, or rounded-xl media placeholder. | Partial | Add named docs, candidate fixture, and Playwright coverage for `skeleton-card` with one media block and two text lines, exact dimensions, rounded-xl shape, public hooks, and mapping copy. Keep layout wrappers, fixed dimensions, Tailwind, `className`, `data-slot`, `cn`, React props, and vendor source as app/docs mappings rather than package dependencies. |
| `skeleton-demo` | Horizontal avatar/list loading row made from three Skeleton blocks: a `48px` by `48px` rounded-full avatar placeholder, then two text-line placeholders sized `250px` by `1rem` and `200px` by `1rem`. Uses React props, `className`, Tailwind `flex items-center space-x-4`, `space-y-2`, fixed width/height utilities, `rounded-full`, `data-slot="skeleton"`, `cn`, and shadcn Skeleton source. | `radcn/skeleton` supports the primitive behavior and custom dimensions/shapes needed for this example. Current candidate/reference fixtures roughly resemble the avatar/list composition with a rounded avatar and two lines, and Playwright proves generic hidden/pulse behavior. However the route is `skeleton/default`, not the named upstream `skeleton-demo`, uses different dimensions (`56px`, `100%`, `72%`, `18px`) instead of exact upstream dimensions, and docs do not render a named `skeleton-demo` proof. | Partial | Add named docs, candidate fixture, and Playwright coverage for `skeleton-demo` with exact avatar and text line dimensions, rounded-full avatar shape, horizontal layout, public hooks, and mapping copy. Preserve current generic skeleton fixture if still useful, and keep layout wrappers, fixed dimensions, Tailwind, `className`, `data-slot`, `cn`, React props, and vendor source as app/docs mappings rather than package dependencies. |

## Decisions

- `radcn/skeleton` remains a small placeholder primitive. It should not grow
  card, avatar, text-line, flex, or spacing-specific package APIs unless a
  later implementation experiment discovers a reusable package-level gap.
- shadcn `className`, Tailwind sizing/spacing/rounded utilities, and
  `cn` map to RadCN `class`, inline `style`, public CSS hooks, or docs-owned
  layout wrappers.
- shadcn `data-slot="skeleton"` maps to RadCN's public
  `data-radcn-skeleton` hook.
- React props and vendor source remain source-material mappings, not RadCN
  dependencies.
- Fixed dimensions and grouping wrappers belong to docs/fixtures/examples,
  because Skeleton's reusable behavior is the placeholder block itself.
