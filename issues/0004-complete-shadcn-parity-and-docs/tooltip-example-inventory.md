# Tooltip Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Tooltip example,
`tooltip-demo`. RadCN already has strong Tooltip behavior substrate and
fixture coverage for hover/focus opening, `role="tooltip"`, described-by
association, portal movement, arrow rendering, placement metadata, provider
delay metadata, side offsets, default-open rendering, Kbd composition,
InputGroup composition, and custom tokens.

The current outcome is `Covered`. Experiment 121 added named `tooltip-demo`
parity across the docs page, candidate fixture route, and Playwright coverage.

Current RadCN evidence compared in this audit:

- `radcn/packages/radcn/src/components/tooltip.tsx` exports
  `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipPortal`,
  `TooltipContent`, `TooltipArrow`, and `enhanceTooltip`, with browser
  enhancement for hover/focus mode, `role="tooltip"`, described-by
  association, portal movement, arrow rendering, open/closed `data-state`,
  provider delay metadata, per-tooltip delay metadata, side, align, and
  side-offset metadata.
- `radcn/packages/radcn/src/utils/positioned-overlay.ts` owns shared overlay
  behavior for hover/focus opening, outside closing, trigger/content state,
  `aria-describedby`, portal root movement, positioning metadata, and hidden
  state.
- `radcn/packages/radcn/src/styles/tokens.css` defines Tooltip provider,
  root, trigger, portal, content, arrow, open/closed, side, focus, and custom
  token styling.
- `radcn/packages/radcn/src/index.ts` re-exports Tooltip parts and types.
- `radcn/packages/radcn/package.json` exposes the `./tooltip` package
  subpath.
- `radcn/apps/docs/app/content/components.tsx` includes a named direct
  `tooltip-demo` Hover outline Button with `Add to library` content, source
  snippet, and dependency-divergence mapping copy.
- `radcn/apps/docs/app/assets/entry.ts` scopes `enhanceTooltip` to the named
  docs `tooltip-demo` example so browser hover/focus behavior runs on the
  docs page.
- `radcn/apps/docs/tests/coverage.spec.ts` checks the named `tooltip-demo`
  docs example, public hooks, source snippet, dependency-divergence copy,
  live hover/focus behavior, portal movement, arrow rendering, side metadata,
  and sideOffset metadata.
- `radcn/fixtures/scenarios/index.ts` lists generic Tooltip scenarios for
  default, default-open, delay, side, content-hover, custom-token, plus the
  named `demo` route.
- `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`
  renders generic Tooltip behavior fixtures through positioned overlay
  examples and the exact upstream Hover/Add to library demo through the named
  `demo` branch.
- `radcn/fixtures/tests/positioned-overlays.spec.ts` asserts hover/focus
  opening, accessible relationships, portal movement, arrow rendering, delay,
  content hover behavior, side placement, custom tokens, plus the named
  `tooltip-demo` trigger, content, outline Button styling, no nested button
  markup, portal movement, arrow rendering, side metadata, and sideOffset
  metadata.
- Related composition evidence in
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`,
  `radcn/fixtures/tests/static-display.spec.ts`,
  `radcn/fixtures/candidate-remix/app/fixtures/input-group.tsx`, and
  `radcn/fixtures/tests/form-input-cluster.spec.ts` proves Tooltip can compose
  with Kbd and InputGroup controls, but it does not prove the direct upstream
  Button outline demo.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `tooltip-demo` | Renders `<Tooltip>` with `<TooltipTrigger asChild>` wrapping `<Button variant="outline">Hover</Button>`, and `<TooltipContent><p>Add to library</p></TooltipContent>`. Upstream package mechanics include `"use client"`, React component props, Radix Tooltip primitive, `TooltipPrimitive.Provider`, `TooltipPrimitive.Root`, `TooltipPrimitive.Trigger`, `TooltipPrimitive.Portal`, `TooltipPrimitive.Content`, `TooltipPrimitive.Arrow`, provider `delayDuration = 0`, content `sideOffset = 0`, `data-slot`, `data-state`, `data-side`, `className`, Tailwind utilities, `cn`, portal behavior, arrow rendering, hover behavior, focus behavior, custom tokens, and vendor source. | RadCN exports dependency-free Tooltip primitives with `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipPortal`, `TooltipContent`, `TooltipArrow`, scoped `enhanceTooltip`, public provider/root/trigger/portal/content/arrow hooks, open/closed `data-state`, `role="tooltip"`, `aria-describedby`, portal movement, arrow rendering, side and side-offset metadata, hover/focus behavior, delay metadata, content-hover behavior, and custom-token coverage. Experiment 121 added named docs and candidate fixture evidence for the exact upstream `Hover` outline Button trigger and `Add to library` content. Fixture and docs Playwright coverage prove hidden initial state, hover opening, focus opening, blur/Escape close behavior, `role="tooltip"`, `aria-describedby`, no nested button markup, portal movement, arrow rendering, `data-side="top"`, `data-side-offset="0"`, source snippet, Button-as-child mapping decision, and React/Radix/Tailwind/`cn`/`className`/`data-slot`/`data-state`/`data-side` divergence copy for `tooltip-demo`. | Covered | None. |

## Decisions

- React non-dependency: RadCN should not import React or React component prop
  aliases for Tooltip. The equivalent author-facing surface is explicit Remix
  UI props and scoped browser enhancement.
- Radix non-dependency: RadCN should not import `radix-ui` or
  `TooltipPrimitive.*`. Radix Provider/Root/Trigger/Portal/Content/Arrow map
  to RadCN TooltipProvider/Tooltip/TooltipTrigger/TooltipPortal/
  TooltipContent/TooltipArrow plus `enhanceTooltip`.
- Button-as-child mapping: upstream `TooltipTrigger asChild` maps to styling
  RadCN `TooltipTrigger` with Button classes when the trigger is itself a
  button. RadCN should avoid nested interactive buttons while preserving the
  visible outline Button trigger.
- Upstream provider `delayDuration = 0` maps to RadCN
  `TooltipProvider delayDuration={0}` and per-tooltip `data-open-delay`
  metadata; the existing browser enhancer currently opens with zero delay for
  package parity.
- Upstream content `sideOffset = 0` maps to RadCN `TooltipContent
  sideOffset={0}` and `data-side-offset="0"`.
- Upstream `data-slot` maps to public `data-radcn-tooltip-provider`,
  `data-radcn-tooltip`, `data-radcn-tooltip-trigger`,
  `data-radcn-tooltip-portal`, `data-radcn-tooltip-content`, and
  `data-radcn-tooltip-arrow` hooks.
- Upstream `data-state` and `data-side` map to RadCN open/closed state hooks
  and side metadata on trigger, portal, content, and arrow behavior.
- Browser Tooltip behavior is behavior-level parity, not literal Radix DOM
  equality: hover/focus opening, accessible description, portal behavior,
  arrow rendering, hidden state, and close behavior are the important
  evidence.
- Custom tokens are already covered by `radcn-fixture-custom-tooltip`.
- Vendor source remains a reference only. The next implementation should not
  commit vendored shadcn source or add runtime dependencies on React, Radix,
  lucide-react, cva, or Tailwind.
