# Collapsible Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Collapsible example:
`collapsible-demo`.

RadCN already ships `radcn/collapsible` with Collapsible,
CollapsibleTrigger, and CollapsibleContent exports. Current package, fixture,
and Playwright evidence proves dependency-free native disclosure markup,
closed and open rendering, summary trigger hooks, keyboard toggling, disabled
non-interactive state, content visibility, public hooks, and custom tokens.

Experiment 88 covers the named upstream example in docs, candidate fixtures,
and Playwright. The final RadCN composition keeps native `details`/`summary`
semantics. Because closed `details` exposes only its `summary`, the visible
header row and always-visible `@radix-ui/primitives` row live inside the
summary presentation, while `@radix-ui/colors` and `@stitches/react` remain in
`CollapsibleContent`.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `collapsible-demo` | Root `Collapsible` starts closed from React `useState(false)`, receives `open={isOpen}`, `onOpenChange={setIsOpen}`, and `className="flex w-[350px] flex-col gap-2"`. Header row uses `flex items-center justify-between gap-4 px-4`, heading text `@peduarte starred 3 repositories`, and `CollapsibleTrigger asChild` around a ghost icon Button with `size="icon"`, `className="size-8"`, lucide `ChevronsUpDown`, and `sr-only` text `Toggle`. One rounded bordered monospace row, `@radix-ui/primitives`, is always visible. `CollapsibleContent className="flex flex-col gap-2"` reveals two rounded bordered monospace rows, `@radix-ui/colors` and `@stitches/react`, when opened. The upstream UI uses a React client component marker, React state, Radix Collapsible primitive, `data-slot`, `className`, Tailwind width/flex/gap/spacing/border/rounded/font utilities, Button composition, `asChild`, lucide icon markup, screen-reader text, and Radix controlled open-state callbacks. | `radcn/apps/docs/app/content/components.tsx` renders rich `collapsible-demo` docs with `data-radcn-docs-collapsible-family="collapsible-demo"`, exact heading/repository/Toggle text, default closed native `details`, 350px flex-column root, summary-owned header row, visible `@radix-ui/primitives` row, hidden/toggled content rows, rounded bordered monospace row classes/styles, public Collapsible/Trigger/Content hooks, app-owned chevrons icon evidence, and mapping copy for React state, Radix, `data-slot`, `className`, Tailwind utilities, Button/`asChild`, lucide, native `details`/`summary`, custom tokens, and vendor source. `radcn/fixtures/candidate-remix/app/fixtures/collapsible.tsx` adds `collapsible/demo`; `radcn/fixtures/scenarios/index.ts` exposes it; `radcn/fixtures/tests/collapsible.spec.ts` and `radcn/apps/docs/tests/coverage.spec.ts` verify native behavior, visibility, layout, styling, hooks, and mapping copy. Existing default/open/disabled/custom-token package evidence remains unchanged. | Covered | None. |

## Decisions

- RadCN should keep Collapsible dependency-free over native `details` and
  `summary` markup. The Radix Collapsible primitive is not needed for this
  example.
- Upstream React `useState(false)`, `open`, and `onOpenChange` map to native
  disclosure state plus optional server-provided initial `open`. If a named
  demo needs live state labels or synchronized attributes beyond native
  `details[open]`, that should be implemented as dependency-free browser
  enhancement, not React state.
- Upstream `data-slot` maps to public `data-radcn-collapsible*` hooks.
- Upstream `className` and `cn` map to explicit `class`, `style`, CSS
  variables, and package classes.
- Upstream `CollapsibleTrigger asChild` around a Button maps to the native
  summary trigger owning the visible header row, with an app-owned 32px
  `radcn-button radcn-button--ghost radcn-button--icon size-8` icon
  presentation inside it. RadCN should not add a Slot dependency for this
  example.
- Closed native `details` exposes only `summary`; therefore the
  always-visible `@radix-ui/primitives` row must be inside the summary
  presentation, while toggled rows remain in `CollapsibleContent`.
- Upstream ghost Button and `size="icon"` behavior is demonstrated with
  RadCN Button classes on the app-owned icon presentation inside the summary.
- Upstream lucide `ChevronsUpDown` maps to app/docs-owned icon markup or an
  installed plain SVG icon package only if already available and appropriate;
  it should not make `lucide-react` a dependency.
- Upstream `sr-only` text `Toggle` maps to a native accessible label or
  screen-reader-only text that preserves icon-only trigger accessibility.
- The exact repository texts `@radix-ui/primitives`, `@radix-ui/colors`, and
  `@stitches/react` are content parity requirements for the named example.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
