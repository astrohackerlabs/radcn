# Kbd Example Parity Inventory

Experiment 35 audited the 5 upstream shadcn/ui Kbd examples against the RadCN
`Kbd` package, docs, fixtures, and Playwright evidence. Experiment 36 completed
the missing named example parity proof.

## Summary

RadCN `Kbd` renders semantic `<kbd>` elements and `KbdGroup` renders a grouped
shortcut container. Existing fixture coverage proves a basic `Cmd` + `K`
shortcut with semantic kbd hooks.

Kbd example parity is complete for the 5 upstream Kbd examples. The primitive
surface stays intentionally small, while docs, fixtures, and Playwright now
prove Button composition, multiple KbdGroup rows, inline prose, InputGroup
addon composition, TooltipContent composition, and ButtonGroup plus Tooltip
composition.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/kbd.tsx` | `Kbd` semantic `<kbd>` with class/style hooks and `KbdGroup` grouped shortcut container |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Kbd and KbdGroup sizing, border, muted background, text styling, and grouping hooks |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Rich Kbd docs page with stable hooks for `kbd-button`, `kbd-demo`, `kbd-group`, `kbd-input-group`, and `kbd-tooltip` |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` | Default KbdGroup route plus named routes for all 5 upstream Kbd examples |
| Playwright | `radcn/fixtures/tests/static-display.spec.ts`; `radcn/apps/docs/tests/coverage.spec.ts` | Fixture and docs coverage for all 5 upstream Kbd examples |

## Mapping Decisions

- shadcn `data-slot` attributes map to RadCN public `data-radcn-kbd` and
  `data-radcn-kbd-group` hooks plus classes; do not add upstream slot names as
  required public API.
- shadcn Tailwind layout utilities map to docs/fixture layout, RadCN classes,
  inline styles, or CSS variables.
- Tooltip-context Kbd styling should be expressed through RadCN classes,
  TooltipContent composition, and CSS variables if needed, not copied Tailwind
  context selectors.
- The lucide `SearchIcon` in `kbd-input-group` is app presentation; use
  app-owned glyphs/spans or inline SVGs in docs/fixtures without adding lucide
  as a dependency.
- `TooltipTrigger asChild` maps to explicit RadCN trigger composition rather
  than Radix Slot.
- Button, ButtonGroup, InputGroup, and Tooltip own their own behavior. Kbd
  should remain a semantic inline key primitive and grouped shortcut primitive.
- Plus signs and prose separators are content authored around `Kbd`/`KbdGroup`,
  not Kbd package behavior.
- Because RadCN `KbdGroup` renders a `div`, prose examples must not place it
  inside a native `p` element. Use a valid prose wrapper that visually reads
  inline, such as a flex-wrapping `div`.

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `kbd-button` | Two small outline buttons, each with visible action text and an inline Kbd shortcut (`⏎`, `Esc`). | `Button variant="outline" size="sm"` with nested `Kbd`; Tailwind flex wrapper and right padding. | Docs route, candidate fixture route, and Playwright coverage render two small outline RadCN Buttons with nested semantic Kbd keys. | Covered | None. |
| `kbd-demo` | Two stacked KbdGroup rows: symbol-only modifier keys and a `Ctrl + B` shortcut with plus separator text. | `KbdGroup` containing several `Kbd` elements and a literal `span` plus separator; Tailwind flex column. | Docs route, candidate fixture route, and Playwright coverage render two KbdGroup rows, symbol keys, and authored plus separator text. | Covered | None. |
| `kbd-group` | Inline prose sentence with KbdGroup containing compound shortcut labels (`Ctrl + B`, `Ctrl + K`). | Paragraph text with inline `KbdGroup`; Tailwind muted prose class. | Docs route, candidate fixture route, and Playwright coverage render inline prose with two KbdGroup shortcuts. | Covered | None. |
| `kbd-input-group` | Search input group with app icon addon and inline-end Kbd shortcuts (`⌘`, `K`). | `InputGroup`, `InputGroupInput`, start addon with lucide `SearchIcon`, inline-end addon with two `Kbd` elements. | Docs route, candidate fixture route, and Playwright coverage render InputGroup with decorative app-owned search glyph and inline-end Kbd keys. | Covered | None. |
| `kbd-tooltip` | ButtonGroup containing two tooltip-wrapped buttons; TooltipContent includes single Kbd and grouped `Ctrl` + `P` shortcut. | `ButtonGroup`, `Tooltip`, `TooltipTrigger asChild`, `Button`, `TooltipContent`, `Kbd`, and `KbdGroup`. | Docs route, candidate fixture route, and Playwright coverage render ButtonGroup plus Tooltip composition with Kbd and KbdGroup content. | Covered | None. |

## Outcome

Kbd example parity is complete.

Experiment 36 added named docs examples, candidate fixture routes, and
Playwright coverage for all 5 upstream examples. It keeps lucide, Tailwind,
`data-slot`, and Radix `asChild` as documented mappings, preserves Kbd as a
semantic shortcut primitive, and leaves Button, ButtonGroup, InputGroup, and
Tooltip behavior with their owning packages.
