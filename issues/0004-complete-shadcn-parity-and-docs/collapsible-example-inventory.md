# Collapsible Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Collapsible example:
`collapsible-demo`.

RadCN already ships `radcn/collapsible` with Collapsible,
CollapsibleTrigger, and CollapsibleContent exports. Current package, fixture,
and Playwright evidence proves dependency-free native disclosure markup,
closed and open rendering, summary trigger hooks, keyboard toggling, disabled
non-interactive state, content visibility, public hooks, and custom tokens.

The named upstream example is still partial because current docs, fixtures, and
tests do not prove the exact `collapsible-demo` composition: the
`@peduarte starred 3 repositories` heading, icon-only Toggle trigger, ghost
Button composition, three exact repository rows, default closed state,
repository row styling, 350px flex-column layout, and the mapping from React
controlled state, Radix, lucide, Button `asChild`, and Tailwind utilities into
RadCN's native/web-first model.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `collapsible-demo` | Root `Collapsible` starts closed from React `useState(false)`, receives `open={isOpen}`, `onOpenChange={setIsOpen}`, and `className="flex w-[350px] flex-col gap-2"`. Header row uses `flex items-center justify-between gap-4 px-4`, heading text `@peduarte starred 3 repositories`, and `CollapsibleTrigger asChild` around a ghost icon Button with `size="icon"`, `className="size-8"`, lucide `ChevronsUpDown`, and `sr-only` text `Toggle`. One rounded bordered monospace row, `@radix-ui/primitives`, is always visible. `CollapsibleContent className="flex flex-col gap-2"` reveals two rounded bordered monospace rows, `@radix-ui/colors` and `@stitches/react`, when opened. The upstream UI uses a React client component marker, React state, Radix Collapsible primitive, `data-slot`, `className`, Tailwind width/flex/gap/spacing/border/rounded/font utilities, Button composition, `asChild`, lucide icon markup, screen-reader text, and Radix controlled open-state callbacks. | `radcn/packages/radcn/src/components/collapsible.tsx` exports Collapsible, CollapsibleTrigger, and CollapsibleContent with public `data-radcn-collapsible*` hooks, native `details`/`summary` rendering for interactive disclosures, `open` and `disabled` props, disabled div fallback, trigger text/icon hooks, and content inner hooks. `radcn/packages/radcn/src/styles/tokens.css` covers root width, border, radius, background, foreground, disabled opacity, trigger layout, marker hiding, hover/focus styles, disabled pointer blocking, icon rotation for `[open]`, content border, content color, content inner padding, and custom tokens. `radcn/fixtures/candidate-remix/app/fixtures/collapsible.tsx` covers default closed, open, disabled, and custom-token fixtures. `radcn/fixtures/tests/collapsible.spec.ts` verifies native details/summary hooks, closed content hidden state, click/Enter/Space toggling, open state, disabled non-interactivity, hidden disabled content, and custom tokens. `radcn/apps/docs/app/content/components.tsx` and `radcn/apps/docs/tests/coverage.spec.ts` prove a generic docs preview for Collapsible. No current docs/fixture/test proves the named upstream `collapsible-demo` 350px repository-list composition, exact heading/repository/Toggle text, icon-only ghost trigger/Button mapping, `asChild` mapping, lucide icon divergence, exact content rows, default closed named state, or Tailwind layout/row styling mapping. | Partial | Add named docs, candidate fixture, and Playwright coverage for `collapsible-demo` with the exact heading text, Toggle accessible text, always-visible `@radix-ui/primitives` row, hidden/toggled `@radix-ui/colors` and `@stitches/react` rows, default closed state, open interaction, 350px flex-column/gap layout, header row layout, rounded bordered monospace row styling, public Collapsible/Trigger/Content hooks, Button/ghost/icon-size or explicit trigger styling evidence, app-owned chevrons icon evidence, screen-reader text behavior, and mapping copy for React state, Radix, `data-slot`, `className`, Tailwind utilities, `asChild`, Button composition, lucide, custom tokens, native `details`/`summary`, and vendor source. |

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
- Upstream `CollapsibleTrigger asChild` around a Button maps either to
  package trigger styling with explicit `class`/`style` or to a documented
  RadCN composition strategy. RadCN should not add a Slot dependency for this
  example.
- Upstream ghost Button and `size="icon"` behavior should be demonstrated with
  RadCN Button styling or equivalent trigger classes if the implementation
  experiment needs exact icon-button visuals.
- Upstream lucide `ChevronsUpDown` maps to app/docs-owned icon markup or an
  installed plain SVG icon package only if already available and appropriate;
  it should not make `lucide-react` a dependency.
- Upstream `sr-only` text `Toggle` maps to a native accessible label or
  screen-reader-only text that preserves icon-only trigger accessibility.
- The exact repository texts `@radix-ui/primitives`, `@radix-ui/colors`, and
  `@stitches/react` are content parity requirements for the named example.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
