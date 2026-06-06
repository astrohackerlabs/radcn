# Sheet Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Sheet examples: `sheet-demo` and
`sheet-side`. RadCN already ships `radcn/sheet` with the core modal, portal,
overlay, side placement, focus, dismissal, and close behavior needed for both
examples. Experiment 74 added named docs, candidate fixtures, and Playwright
coverage for both upstream example compositions.

**Implementation outcome:** Covered.

React, Radix/Dialog primitives, `asChild`, `className`, `data-slot`, Tailwind,
`cn`, layout grids, form actions, repeated side mapping, and vendor source
remain non-dependencies. Button, Input, and Label composition is app/docs
composition over separate RadCN package surfaces, not a Sheet dependency.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `sheet-demo` | Right-side Sheet opened by an outline `Open` Button. Content has title `Edit profile`, description `Make changes to your profile here. Click save when you're done.`, two labelled inputs with ids `sheet-demo-name` and `sheet-demo-username`, default values `Pedro Duarte` and `@peduarte`, footer submit Button `Save changes`, and outline close Button `Close`. Uses `SheetTrigger asChild`, `SheetClose asChild`, Button, Input, Label, React props, `className`, Tailwind grid/flex/gap/padding utilities, and Radix/Dialog mechanics through shadcn Sheet. | `radcn/sheet` supports root, trigger, portal, overlay, right-side content by default, header, title, description, footer, close controls, default close button, modal role/ARIA wiring, focus trap, focus restoration, Escape dismissal, overlay dismissal, custom classes/styles/tokens, and named docs/fixture/test evidence. Experiment 74 docs render `data-radcn-docs-sheet-family="sheet-demo"` with exact trigger text, title, description, two labels, input ids/default values, footer actions, right-side content, public hooks, and mapping copy. Fixture tests cover `sheet/demo` modal ARIA/focus behavior, right-side placement, footer close behavior, and focus restoration. | Covered | No follow-up for this row. `asChild`, React, Radix/Dialog primitives, `className`, Tailwind utilities, `cn`, layout grids, form actions, and vendor source remain mapped non-dependencies. |
| `sheet-side` | Renders four outline triggers labelled `top`, `right`, `bottom`, and `left` from `SHEET_SIDES`. Each opens SheetContent with matching `side`, title `Edit profile`, same profile description, two labelled inputs `Name` and `Username` with values `Pedro Duarte` and `@peduarte`, and footer `Save changes` wrapped in `SheetClose asChild`. Uses React client component marker, array mapping, React keys, repeated fixed ids `name` and `username`, Button/Input/Label composition, `SheetClose asChild`, `className`, Tailwind grid/col-span/text-right utilities, and Radix/Dialog mechanics. | `radcn/sheet` supports `side="top"`, `side="right"`, `side="bottom"`, and `side="left"`. Experiment 74 docs render `data-radcn-docs-sheet-family="sheet-side"` with four triggers, all side values, profile title/description, labelled profile inputs with deterministic unique ids, footer close action, public hooks, and mapping copy. Fixture tests cover `sheet/side` opening each side, side placement, modal ARIA/focus behavior, profile copy, input values, footer close behavior, and focus restoration. | Covered | No follow-up for this row. `SHEET_SIDES`, React keys, duplicate fixed upstream ids, `asChild`, React, Radix/Dialog primitives, Tailwind utilities, `cn`, layout grids, form actions, and vendor source remain mapped non-dependencies. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Sheet root and trigger | Supported by `radcn/packages/radcn/src/components/sheet.tsx` through `Sheet` and `SheetTrigger` with public hooks, `defaultOpen`, `dismissible`, trigger state, and app-owned trigger text or Button composition. |
| Portal and overlay | Supported through `SheetPortal` and `SheetOverlay`; existing tests prove portal movement, overlay display, body scroll lock, overlay dismissal, and custom overlay tokens generically. |
| Content and side variants | Supported through `SheetContent side="top/right/bottom/left"` with public content hooks and side classes. Existing Playwright coverage proves all four side placements generically. |
| Header, title, description, footer | Supported through `SheetHeader`, `SheetTitle`, `SheetDescription`, and `SheetFooter`; existing evidence proves generic title/description/footer parts, but named profile copy still needs proof. |
| Close controls | Supported through the default close button and `SheetClose`; existing tests prove close/focus restoration generically. Named `Close` and `Save changes` footer close compositions still need proof. |
| Modal accessibility and focus | Supported through shared dialog `setupModal`: role, `aria-modal`, `aria-labelledby`, `aria-describedby`, focus trap, initial focus, Escape dismissal, overlay dismissal, body scroll lock, and focus restoration are covered generically. |
| Button, Input, and Label composition | Separate RadCN package surfaces. Sheet should compose them in docs/fixtures for named examples, but they are not Sheet dependencies. |
| `asChild` | Upstream React Slot mechanic. RadCN maps it to explicit `SheetTrigger`, `SheetClose`, and app-owned Button composition instead of package-level Slot behavior. |
| `SHEET_SIDES`, React keys, and repeated fixed ids | Upstream React/example mechanics. RadCN can render equivalent repeated side examples with deterministic markup and unique ids where needed for valid documents; exact duplicate ids are not required for parity. |
| React props, Radix/Dialog primitives, `className`, `data-slot`, Tailwind utilities, and `cn` | Implementation details or React/Tailwind mechanics from shadcn/ui. RadCN maps these to Remix UI props, `class`, public `data-radcn-*` hooks, package CSS, inline style, CSS variables, and browser enhancement. They are not RadCN dependencies. |
| Vendor source | Reference only. No RadCN package, docs, fixture, or test code should depend on `vendor/`. |

## Evidence Reviewed

- Issue inventory:
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Upstream package source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/sheet.tsx`.
- Upstream example source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sheet-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/sheet-side.tsx`.
- Upstream registry metadata:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/sheet.json`,
  `sheet-demo.json`, and `sheet-side.json`.
- Current RadCN package source:
  `radcn/packages/radcn/src/components/sheet.tsx` and shared modal behavior in
  `radcn/packages/radcn/src/components/dialog.tsx`.
- Current RadCN styles:
  `radcn/packages/radcn/src/styles/index.ts` and
  `radcn/packages/radcn/src/styles/tokens.css`.
- Current docs evidence:
  `radcn/apps/docs/app/content/components.tsx` has a generic Sheet preview and
  install/import/docs copy, but no named `sheet-demo` or `sheet-side` docs
  examples.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/sheet.tsx` covers generic
  right/left/top/bottom/custom-token Sheet scenarios with one generic settings
  input, but not named upstream Sheet examples.
- Current Playwright evidence:
  `radcn/fixtures/tests/modal-variants.spec.ts` covers modal role, `aria-modal`,
  side placement, focus trap, initial focus, body scroll lock, Escape close,
  overlay close, focus restoration, and custom tokens for generic Sheet
  scenarios.

## Decision

The Sheet example cluster is resolved. RadCN has the core package behavior
needed for both upstream examples, and named docs, candidate fixtures, and
Playwright coverage now prove `sheet-demo` and `sheet-side` with exact trigger
labels, profile copy, labels, input default values, side values, footer close
actions, modal behavior, public hooks, and mapping copy. No mandatory React,
Radix/Dialog primitives, `asChild`, Tailwind, `cn`, Button/Input/Label, layout,
form-action, or vendor dependency was identified.
