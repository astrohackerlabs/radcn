# Select Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Select examples: `select-demo`
and `select-scrollable`. RadCN already ships `radcn/select` with the core
selection, overlay, keyboard, typeahead, grouping, scrolling, and form behavior
needed for both examples. Experiment 72 added named docs, candidate fixtures,
and Playwright coverage for both upstream example compositions.

**Implementation outcome:** Covered.

React, Radix Select primitives, `className`, `data-slot`, Tailwind, `cn`,
lucide icons, and vendor source remain non-dependencies. Trigger width,
option data, group labels, scroll behavior, selected indicators, and hidden
values are proven through package primitives plus app/docs composition.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `select-demo` | Basic Select with trigger width `w-[180px]`, placeholder `Select a fruit`, one group labelled `Fruits`, and five fruit options: Apple, Banana, Blueberry, Grapes, Pineapple. Uses Radix Select primitives, React props, `className`, Tailwind width utility, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, and `SelectItem`. | `radcn/select` supports root, trigger, value placeholder/display, content/viewport, groups, labels, items, item indicators, hidden input, opening/closing, keyboard selection, typeahead, selected state, disabled skip behavior, custom classes/styles/tokens, and named docs/fixture/test evidence. Experiment 72 docs render `data-radcn-docs-select-family="select-demo"` with exact placeholder, `Fruits` label, all five fruit labels/values, 180px trigger evidence, public hooks, and mapping copy. Fixture tests cover `select/demo` opening, selection, selected display, selected indicator, and hidden `fruit` value. | Covered | No follow-up for this row. Portal, React props, Radix primitives, `className`, Tailwind width, `cn`, lucide icons, and vendor source remain mapped non-dependencies. |
| `select-scrollable` | Select with trigger width `w-[280px]`, placeholder `Select a timezone`, five labelled groups: North America, Europe & Africa, Asia, Australia & Pacific, and South America. Contains 27 timezone options, scrollable content, and scroll up/down affordances from upstream Select. | `radcn/select` supports grouped items, labels, scroll up/down buttons, scrollable viewport, keyboard navigation, typeahead, selected indicators, content hooks, and named docs/fixture/test evidence. Experiment 72 docs render `data-radcn-docs-select-family="select-scrollable"` with exact placeholder, all five group labels, all 27 timezone labels/values, 280px trigger evidence, scroll buttons, scrollable viewport evidence, public hooks, and mapping copy. Fixture tests cover `select/scrollable-demo` scroll mutation, typeahead to Japan Standard Time, selection, selected display, selected indicator, and hidden `timezone` value. | Covered | No follow-up for this row. Portal, React props, Radix primitives, `className`, Tailwind width, `cn`, lucide icons, and vendor source remain mapped non-dependencies. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Select root | Supported by `radcn/packages/radcn/src/components/select.tsx` with `data-radcn-select`, package class, hidden input when `name` is provided, `defaultValue`, `value`, `defaultOpen`, `disabled`, `invalid`, `required`, `class`, and `style`. |
| Trigger and value | Supported through `SelectTrigger` and `SelectValue` with public hooks, placeholder state, trigger `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, sizes, accessible labels, and selected text display. Existing tests cover placeholder and selected display generically. |
| Portal, content, viewport | Supported through `SelectPortal`, `SelectContent`, and `SelectViewport`; existing tests prove portal movement, listbox semantics, opening/closing, outside pointer close, tab close, popper placement, side, and align. |
| Groups and labels | Supported through `SelectGroup` and `SelectLabel`; existing tests prove generic groups and labels, but named fruit/timezone group copy still needs proof. |
| Items, selected state, and indicators | Supported through `SelectItem` and `SelectItemIndicator`; existing tests prove selected item state, hidden input updates, disabled skip behavior, and item indicator hooks generically. |
| Scroll buttons and scrollable content | Supported through `SelectScrollUpButton`, `SelectScrollDownButton`, and scrollable viewport behavior; existing tests prove generic scroll buttons and viewport scroll mutation, but named timezone option content still needs proof. |
| Keyboard navigation and typeahead | Supported by `enhanceSelect`; existing tests prove Enter, Space, Arrow keys, Home, End, disabled skip behavior, wrapping, and typeahead generically. Named timezone list typeahead still needs example-specific proof if the next experiment resolves the row. |
| Hidden form value and reset | Supported and covered generically. The active upstream examples do not name fields, but docs/fixtures may add a deterministic name for value evidence if useful. |
| Trigger widths `w-[180px]` and `w-[280px]` | Styling concerns. RadCN supports width through `class`, `style`, and CSS variables; named examples need docs/fixture/test evidence for equivalent trigger width. |
| Lucide `CheckIcon`, `ChevronDownIcon`, `ChevronUpIcon` | Presentation details. RadCN uses dependency-free package glyphs/indicators and public hooks rather than depending on `lucide-react`. |
| React props, Radix `SelectPrimitive`, `className`, `data-slot`, Tailwind utilities, and `cn` | Implementation details or React/Tailwind mechanics from shadcn/ui. RadCN maps these to Remix UI props, `class`, public `data-radcn-*` hooks, package CSS, inline style, CSS variables, and browser enhancement. They are not RadCN dependencies. |
| Vendor source | Reference only. No RadCN package, docs, fixture, or test code should depend on `vendor/`. |

## Evidence Reviewed

- Issue inventory:
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Upstream package source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/select.tsx`.
- Upstream example source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/select-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/select-scrollable.tsx`.
- Upstream registry metadata:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/select.json`,
  `select-demo.json`, and `select-scrollable.json`.
- Current RadCN package source:
  `radcn/packages/radcn/src/components/select.tsx`.
- Current RadCN styles:
  `radcn/packages/radcn/src/styles/index.ts` and
  `radcn/packages/radcn/src/styles/tokens.css`.
- Current docs evidence:
  `radcn/apps/docs/app/content/components.tsx` has generic Select examples and
  many Select compositions inside other resolved pages, but no named
  `select-demo` or `select-scrollable` docs examples.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/select.tsx` covers generic
  default, placeholder, grouped, disabled/invalid, keyboard/typeahead,
  scrollable, popper-placement, form-submit-reset, and custom-token scenarios,
  but not named upstream Select examples.
- Current Playwright evidence:
  `radcn/fixtures/tests/select.spec.ts` covers portal/listbox semantics,
  deterministic highlight, placeholder, click selection, keyboard opening,
  keyboard selection, roving focus, wrapping, disabled skip behavior, typeahead,
  outside/tab close, grouped hooks, scroll buttons, scroll mutation, popper
  placement, custom tokens, hidden form value, and reset behavior.

## Decision

The Select example cluster is resolved. RadCN has the core package behavior
needed for both upstream examples, and named docs, candidate fixtures, and
Playwright coverage now prove `select-demo` and `select-scrollable` with exact
placeholder copy, fruit/timezone option sets, group labels, trigger width
evidence, scrollable timezone behavior, selection behavior, public hooks,
hidden value evidence, and mapping copy. No mandatory React, Radix,
`lucide-react`, Tailwind, `cn`, or vendor dependency was identified.
