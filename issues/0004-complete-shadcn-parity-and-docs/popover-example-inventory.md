# Popover Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Popover example:
`popover-demo`.

RadCN ships strong Popover substrate and named `popover-demo` parity evidence:
dependency-free exports for root, trigger, anchor, portal, content, close,
header, title, and description; click-triggered browser enhancement;
non-modal behavior; outside dismissal; Escape close; placement and alignment
props; default-open support; custom token hooks; named docs, candidate fixture,
and Playwright coverage.

The direct upstream example is covered. The named docs and candidate fixture
render the exact `Open popover`, `Dimensions`, `Set the dimensions for the
layer.`, labelled width/height inputs, and default values. Existing behavior
fixtures continue to prove default-open, outside-dismiss, side/align, close,
focus, placement, and custom-token modifiability evidence.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `popover-demo` | Renders `Popover` with `PopoverTrigger asChild` wrapping `Button variant="outline"` and visible text `Open popover`. `PopoverContent className="w-80"` contains a grid with heading `Dimensions`, description `Set the dimensions for the layer.`, and four labelled controls: `Width` input default `100%`, `Max. width` input default `300px`, `Height` input default `25px`, and `Max. height` input default `none`. Upstream package mechanics include `"use client"`, React component props, Radix Popover primitives, implicit Radix portal in `PopoverContent`, `PopoverAnchor`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`, `className`, Tailwind utilities, `cn`, `data-slot`, align default `center`, sideOffset default `4`, transition/data-state/side styling, Button, Input, Label, form control mapping, browser behavior, custom tokens, and vendor source. | `radcn/packages/radcn/src/components/popover.tsx` exports dependency-free `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverPortal`, `PopoverContent`, `PopoverClose`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`, and `enhancePopover`. It renders explicit root/trigger/portal/content hooks, `aria-haspopup="dialog"`, `aria-expanded`, default-open state hooks, side/align/sideOffset attributes, close button, title/description parts, and browser enhancement through `setupPositionedOverlay`. `radcn/packages/radcn/src/index.ts` exports the API and `radcn/packages/radcn/package.json` has no React, Radix, Tailwind, or `class-variance-authority` dependency. Package CSS in `radcn/packages/radcn/src/styles/tokens.css` provides popover background, foreground, trigger, close, portal, content, header, title, description, positioning, responsive, and custom-token hooks. `radcn/apps/docs/app/content/components.tsx` now ships a named `popover-demo` rich example, exact source snippet, outline Button-style trigger mapping, explicit `PopoverPortal`, 20rem `w-80` content width mapping, exact dimensions form, and mapping copy for React/Radix/`asChild`/Button/Input/Label/Tailwind/`cn`/`className`/`data-slot` divergences. `radcn/apps/docs/app/assets/entry.ts` enhances the named docs demo with `enhancePopover`. `radcn/apps/docs/tests/coverage.spec.ts` verifies the named docs family hook, root/trigger/portal/content hooks, open/close behavior, non-modal behavior, default align/sideOffset, 20rem width, exact text, label/input associations, values, source snippet, and mapping copy. `radcn/fixtures/scenarios/index.ts` lists a named `demo` Popover scenario plus existing behavior scenarios. `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx` renders `popover/demo` with the exact upstream dimensions form. `radcn/fixtures/tests/positioned-overlays.spec.ts` verifies the named route, exact trigger text, outline trigger mapping, default side/align/sideOffset, 20rem width, heading, description, labels, input ids/values, portal movement, non-modal behavior, and Escape close, while preserving existing default-open, outside-dismiss, side-align, close/focus, and custom-token coverage. | Covered | No follow-up for this direct example. |

## Decisions

- `"use client"`: not required. RadCN Popover renders server HTML first and
  uses explicit `enhancePopover` browser behavior.
- React component props: not required. RadCN Popover exposes explicit Remix UI
  props for root, trigger, portal, content, anchor, close, header, title, and
  description parts.
- Radix Popover primitives: not dependencies. Radix root, trigger, content,
  portal, and anchor behavior maps to RadCN markup plus
  `setupPositionedOverlay`.
- Implicit Radix portal in `PopoverContent`: maps to explicit
  `PopoverPortal` composition in RadCN so portal ownership is visible in the
  author surface and test hooks.
- `PopoverAnchor`: current package supports an explicit anchor part and tests
  cover anchor-positioned placement.
- `PopoverHeader`, `PopoverTitle`, and `PopoverDescription`: current package
  supports these parts; the direct upstream example uses a raw `h4` and `p`,
  so the next implementation can either compose the package parts or record a
  raw heading/text mapping if that better preserves the example.
- `PopoverTrigger asChild`: maps to explicit trigger styling/composition in
  RadCN. The next implementation should prove the outline Button visual
  without adding Slot or React child cloning.
- Button composition: upstream `Button variant="outline"` maps to either a
  styled `PopoverTrigger` using RadCN button classes or explicit composition
  with Button-compatible classes; Popover should not depend on Button.
- Input and Label composition: upstream Label/Input rows map to RadCN
  `radcn/label` and `radcn/input` composition or native form controls in the
  docs/fixture surface; Popover should not own form state.
- `className`: maps to `class`.
- Tailwind utilities: map to package CSS, classes, CSS variables, inline
  styles, and app-owned styles rather than a Tailwind dependency.
- `cn`: not needed as a package dependency; class composition is explicit.
- `data-slot`: maps to RadCN public `data-radcn-popover*` hooks.
- Align default `center`: current `PopoverContent` default is `center`.
- sideOffset default `4`: the named demo covers the default prop and data hook;
  generic fixtures still pass `8` for overlay placement coverage.
- Transition/data-state/side styling: current package exposes data-state,
  data-side, and data-align hooks and CSS; literal Radix animation DOM is not
  required.
- Content width mapping: upstream `w-80` maps to class/style evidence for a
  20rem content width in the named docs and fixture demos.
- Form control mapping: named docs and fixture demos cover dimensions labels,
  input ids, and default values. RadCN Input uses `value` for deterministic
  server-rendered default values.
- Browser behavior: current fixture tests cover click open/close, Escape,
  outside dismissal, portal movement, non-modal behavior, focus movement,
  placement, anchor behavior, and close button behavior.
- Custom tokens: existing fixtures and CSS continue to prove custom-token
  styling alongside the named demo.
- Vendor source: the upstream references are
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/popover-demo.tsx`
  and `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/popover.tsx`.
