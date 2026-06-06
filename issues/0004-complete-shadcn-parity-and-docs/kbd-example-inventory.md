# Kbd Example Parity Inventory

Experiment 35 audits the 5 upstream shadcn/ui Kbd examples against the current
RadCN `Kbd` package, docs, fixtures, and Playwright evidence. This is an audit
only; it does not implement Kbd changes.

## Summary

RadCN `Kbd` renders semantic `<kbd>` elements and `KbdGroup` renders a grouped
shortcut container. Existing fixture coverage proves a basic `Cmd` + `K`
shortcut with semantic kbd hooks.

Kbd example parity is not complete. The primitive surface is close to the
upstream needs, but current proof is generic and does not yet cover named
upstream examples for Button composition, multiple KbdGroup rows, inline prose,
InputGroup addon composition, TooltipContent composition, or ButtonGroup plus
Tooltip composition.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/kbd.tsx` | `Kbd` semantic `<kbd>` with class/style hooks and `KbdGroup` grouped shortcut container |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Kbd and KbdGroup sizing, border, muted background, text styling, and grouping hooks |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Seed Kbd docs route generated from the public component spec; not a rich named-example parity page yet |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` | Default KbdGroup route with `Cmd` and `K` keys |
| Playwright | `radcn/fixtures/tests/static-display.spec.ts` | General semantic KbdGroup/Kbd hook checks for the default route |

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

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `kbd-button` | Two small outline buttons, each with visible action text and an inline Kbd shortcut (`⏎`, `Esc`). | `Button variant="outline" size="sm"` with nested `Kbd`; Tailwind flex wrapper and right padding. | `Button` supports outline/sm; `Kbd` supports semantic key markup; broader docs/fixtures prove Button and Kbd separately. No named Kbd-in-Button docs/fixture/Playwright proof exists. | Partial | Add named docs/fixture/Playwright proof for Kbd inside Button composition. |
| `kbd-demo` | Two stacked KbdGroup rows: symbol-only modifier keys and a `Ctrl + B` shortcut with plus separator text. | `KbdGroup` containing several `Kbd` elements and a literal `span` plus separator; Tailwind flex column. | Default Kbd fixture proves one grouped shortcut (`Cmd`, `K`), but not multiple rows, symbol keys, or separator text. | Partial | Add named docs/fixture/Playwright proof for multiple KbdGroup rows, symbol keys, and separator text. |
| `kbd-group` | Inline prose sentence with KbdGroup containing compound shortcut labels (`Ctrl + B`, `Ctrl + K`). | Paragraph text with inline `KbdGroup`; Tailwind muted prose class. | `KbdGroup` can be composed inline as markup, but current docs/fixtures do not prove inline prose composition. | Partial | Add named docs/fixture/Playwright proof for inline prose with KbdGroup. |
| `kbd-input-group` | Search input group with app icon addon and inline-end Kbd shortcuts (`⌘`, `K`). | `InputGroup`, `InputGroupInput`, start addon with lucide `SearchIcon`, inline-end addon with two `Kbd` elements. | Existing Empty docs/fixtures compose InputGroup and Kbd for search miss, and InputGroup tests prove addon behavior, but no named Kbd InputGroup example route/proof exists. | Partial | Add named docs/fixture/Playwright proof for Kbd inside InputGroup addon and app-owned Search icon mapping. |
| `kbd-tooltip` | ButtonGroup containing two tooltip-wrapped buttons; TooltipContent includes single Kbd and grouped `Ctrl` + `P` shortcut. | `ButtonGroup`, `Tooltip`, `TooltipTrigger asChild`, `Button`, `TooltipContent`, `Kbd`, and `KbdGroup`. | ButtonGroup, Tooltip, Button, Kbd, and KbdGroup exist separately; no named Kbd Tooltip composition proof exists, and `asChild` requires explicit RadCN trigger mapping. | Partial | Add named docs/fixture/Playwright proof for Kbd/KbdGroup inside TooltipContent with ButtonGroup and explicit TooltipTrigger composition. |

## Outcome

Kbd example parity is not complete.

The next implementation cluster should be **Kbd example parity depth**. It
should add named docs examples, candidate fixture routes, and Playwright
coverage for all 5 upstream examples. It should keep lucide, Tailwind,
`data-slot`, and Radix `asChild` as documented mappings, preserve Kbd as a
semantic shortcut primitive, and leave Button, ButtonGroup, InputGroup, and
Tooltip behavior with their owning packages.
