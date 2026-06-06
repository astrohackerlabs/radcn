# Toggle Group Example Inventory

Generated during Experiment 23 on 2026-06-06.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/toggle-group-*.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/toggle-group.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/toggle-group.tsx`
  `radcn/packages/radcn/src/components/toggle.tsx`
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`
  `radcn/fixtures/candidate-remix/app/assets/entry.ts`
  `radcn/fixtures/tests/toggle.spec.ts`

## Summary

Toggle Group example parity is complete after Experiment 24. RadCN has a real
Remix 3 implementation with browser enhancement for single and multiple
selection, selected state hooks, roving focus, disabled item skip behavior,
vertical orientation, custom token styling, group-level disabled behavior,
group-level size and variant defaults, spacing between ToggleGroupItems,
icon-only formatting groups with accessible names, and icon+label examples
with selected icon styling.

No React dependency, Radix ToggleGroup dependency, lucide dependency, Tailwind
dependency, vendor import, or npm publishing behavior was needed.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `toggle-group-demo` | Multiple-selection outline formatting group with icon-only Bold, Italic, and Underline buttons. Uses group-level `variant="outline"`, lucide icons, and icon button `aria-label`s. | RadCN docs, `/fixtures/toggle-group/demo`, and Playwright prove icon-only multiple outline group parity with `aria-label`s, group-level `variant="outline"`, app-owned glyphs, `aria-pressed`, `data-state`, and `data-value`. | Covered | Lucide icons map to app-owned decorative glyphs. |
| `toggle-group-disabled` | Multiple-selection group with group-level `disabled`, making all icon-only items unavailable. Uses Radix group disabled behavior. | RadCN package API now supports group-level `disabled`; `/fixtures/toggle-group/disabled` and Playwright prove all grouped items become disabled, avoid roving focus, and do not toggle. | Covered | Radix group disabled behavior maps to RadCN `disabled` plus `enhanceToggleGroup`. |
| `toggle-group-lg` | Multiple-selection icon-only formatting group with group-level `size="lg"`. | RadCN package API now supports group-level `size`; `/fixtures/toggle-group/lg` and Playwright prove large grouped items render visibly distinct size behavior. | Covered | Group-level size maps to public `data-size` and package styles while item-level size overrides remain available. |
| `toggle-group-outline` | Multiple-selection icon-only formatting group with group-level outline variant. | RadCN package API now supports group-level `variant`; `/fixtures/toggle-group/outline` and Playwright prove outline grouped items while item-level variants remain available. | Covered | Group-level variant maps to public `data-variant` and package styles. |
| `toggle-group-single` | Single-selection icon-only formatting group with Bold, Italic, and Underline options. | RadCN docs, `/fixtures/toggle-group/single`, and Playwright prove single-selection icon-only items with accessible names, app-owned glyphs, selected state, and keyboard behavior. | Covered | Lucide icons map to decorative app-owned glyphs. |
| `toggle-group-sm` | Single-selection icon-only formatting group with group-level `size="sm"`. | RadCN package API now supports group-level `size`; `/fixtures/toggle-group/sm` and Playwright prove small grouped items render visibly distinct size behavior. | Covered | Group-level size maps to public `data-size` and package styles while item-level size overrides remain available. |
| `toggle-group-spacing` | Multiple-selection outline group with `spacing={2}`, icon+label items, and selected-state icon fill/stroke colors using Tailwind `data-state` selectors. | RadCN package API now supports `spacing`; `/fixtures/toggle-group/spacing` and Playwright prove visible group gap, icon+label text, and selected icon color through public classes/styles/CSS variables. | Covered | Tailwind selected-state selectors map to RadCN `data-state`, classes, inline styles, and CSS variables. |

## Mapping Decisions

- RadCN should not depend on React, Radix ToggleGroup, or Radix context. Group
  state remains owned by `enhanceToggleGroup` and platform button semantics.
- Lucide icons are presentation choices. Toggle Group parity should verify
  icon-only and icon+label affordances, accessible names, and selected states
  without adding icon packages as RadCN dependencies.
- Tailwind `h-4 w-4` utilities map to RadCN classes, inline styles, or CSS
  variables for icon sizing.
- Tailwind `data-[state=on]` selector examples map to RadCN's public
  `data-state`, `data-value`, classes, inline styles, or CSS variables for
  selected-state styling.
- shadcn's group-level `variant`, `size`, `disabled`, and `spacing` props are
  real author-facing conveniences. The implementation experiment should decide
  whether to add narrow group-level props to RadCN or intentionally document
  item-level equivalents. The audit does not assume either answer.
- `aria-label` is required for icon-only ToggleGroupItems because the visual
  glyph should not be the only accessible name.
- Existing keyboard behavior is strong evidence for the primitive, but example
  parity still needs direct docs/fixture proof for the upstream example
  families.

## Resolution

Experiment 24 resolved Toggle Group example parity depth. The next Issue 4
cluster should come from the regenerated `parity-inventory.md` first
recommended cluster.
