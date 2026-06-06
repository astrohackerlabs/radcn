# Skeleton Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes two active Skeleton examples:
`skeleton-card` and `skeleton-demo`.

RadCN already has the reusable Skeleton primitive needed for both examples:
`radcn/skeleton` renders an `aria-hidden` placeholder with
`data-radcn-skeleton`, accepts `class` and `style`, applies base radius and
secondary-token background styling, and uses the package `radcn-pulse`
animation.

Experiment 76 adds named docs examples, candidate fixture routes, and
Playwright coverage for both active upstream compositions. No package API
change was needed.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `skeleton-card` | Vertical loading card made from three Skeleton blocks: a `250px` by `125px` rounded-xl media placeholder, then two text-line placeholders sized `250px` by `1rem` and `200px` by `1rem`. Uses React props, `className`, Tailwind `flex flex-col space-y-3`, `space-y-2`, fixed width/height utilities, `rounded-xl`, `data-slot="skeleton"`, `cn`, and shadcn Skeleton source. | `radcn/skeleton` supports hidden placeholder semantics, pulse animation, base radius/background styling, custom `class`, and inline `style`, so the exact dimensions and rounded-xl shape are represented without package changes. Experiment 76 docs render `data-radcn-docs-skeleton-family="skeleton-card"` with three Skeleton blocks, exact media/text dimensions, rounded-xl-equivalent radius, public hooks, and mapping copy. Candidate fixtures expose `/fixtures/skeleton/card`, and Playwright coverage proves the three blocks, exact dimensions, `aria-hidden`, `radcn-pulse`, and rounded media shape. | Covered | No follow-up for this row. Layout wrappers, fixed dimensions, Tailwind, `className`, `data-slot`, `cn`, React props, and vendor source remain app/docs mappings rather than package dependencies. |
| `skeleton-demo` | Horizontal avatar/list loading row made from three Skeleton blocks: a `48px` by `48px` rounded-full avatar placeholder, then two text-line placeholders sized `250px` by `1rem` and `200px` by `1rem`. Uses React props, `className`, Tailwind `flex items-center space-x-4`, `space-y-2`, fixed width/height utilities, `rounded-full`, `data-slot="skeleton"`, `cn`, and shadcn Skeleton source. | `radcn/skeleton` supports the primitive behavior and custom dimensions/shapes needed for this example. Experiment 76 docs render `data-radcn-docs-skeleton-family="skeleton-demo"` with exact avatar and text-line dimensions, rounded-full avatar shape, public hooks, and mapping copy. Candidate fixtures expose `/fixtures/skeleton/demo`, and Playwright coverage proves the three blocks, exact dimensions, `aria-hidden`, `radcn-pulse`, and rounded avatar shape while preserving the existing generic Skeleton fixture. | Covered | No follow-up for this row. Layout wrappers, fixed dimensions, Tailwind, `className`, `data-slot`, `cn`, React props, and vendor source remain app/docs mappings rather than package dependencies. |

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
