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

Toggle Group example parity is not complete yet. RadCN already has a real
Remix 3 implementation with browser enhancement for single and multiple
selection, selected state hooks, roving focus, disabled item skip behavior,
vertical orientation, and custom token styling. Existing fixtures and
Playwright coverage prove that baseline behavior.

The missing Toggle Group parity depth is:

- group-level `disabled` behavior that disables every item;
- group-level `size` and `variant` propagation or an intentional item-level
  mapping with docs/tests;
- spacing between ToggleGroupItems as a first-class example;
- icon-only formatting groups with accessible names;
- icon+label spacing examples with selected icon styling;
- docs/fixtures that demonstrate all 7 upstream example families directly.

Do not mark the `toggle-group` example cluster resolved yet. The next
experiment should implement Toggle Group example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `toggle-group-demo` | Multiple-selection outline formatting group with icon-only Bold, Italic, and Underline buttons. Uses group-level `variant="outline"`, lucide icons, and icon button `aria-label`s. | RadCN has multiple-selection ToggleGroup behavior and item-level `variant="outline"`, but current docs/fixtures do not prove icon-only outline group parity or group-level variant propagation. | Partial | Add direct proof for icon-only multiple outline group with `aria-label`s and decide whether group-level `variant` should be added or item-level variant is the documented mapping. |
| `toggle-group-disabled` | Multiple-selection group with group-level `disabled`, making all icon-only items unavailable. Uses Radix group disabled behavior. | RadCN proves disabled item behavior and keyboard skip for one disabled item, but ToggleGroup has no group-level `disabled` prop and no fixture proving all items disabled through group state. | Missing | Add group-level disabled support or document/verify explicit disabled items as an intentional divergence if that preserves user-facing behavior. |
| `toggle-group-lg` | Multiple-selection icon-only formatting group with group-level `size="lg"`. | RadCN `ToggleGroupItem` supports `size="lg"` through Toggle size styles, but ToggleGroup has no group-level `size` prop and fixtures do not prove large grouped items. | Partial | Add direct large ToggleGroup proof and decide whether group-level `size` should propagate to items or item-level size is the documented mapping. |
| `toggle-group-outline` | Multiple-selection icon-only formatting group with group-level outline variant. | RadCN item-level outline variant and custom-token fixture exist, but no direct upstream outline icon-only group proof or group-level variant propagation exists. | Partial | Add direct outline ToggleGroup proof and resolve group-level vs item-level variant mapping. |
| `toggle-group-single` | Single-selection icon-only formatting group with Bold, Italic, and Underline options. | RadCN proves single-selection state, `aria-pressed`, `data-value`, and keyboard behavior with text items, but not icon-only items with accessible names. | Partial | Add direct single icon-only group proof with `aria-label`s and decorative/app-owned glyphs. |
| `toggle-group-sm` | Single-selection icon-only formatting group with group-level `size="sm"`. | RadCN `ToggleGroupItem` supports `size="sm"` through Toggle size styles, but ToggleGroup has no group-level `size` prop and fixtures do not prove small grouped items. | Partial | Add direct small ToggleGroup proof and decide whether group-level `size` should propagate to items or item-level size is the documented mapping. |
| `toggle-group-spacing` | Multiple-selection outline group with `spacing={2}`, icon+label items, and selected-state icon fill/stroke colors using Tailwind `data-state` selectors. | RadCN has group and item class/style hooks, selected `data-state`, and multiple selection behavior, but no `spacing` prop, no direct icon+label spacing fixture, and no selected icon color proof. | Missing | Add spacing proof and selected icon styling through RadCN classes/styles/CSS variables or add a narrow `spacing` API if needed. |

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

## Next Recommendation

Implement Toggle Group example parity depth:

- add docs and candidate fixtures for all 7 upstream Toggle Group examples;
- add focused Playwright coverage for icon-only multiple and single groups,
  group-level disabled behavior or documented explicit disabled-item mapping,
  small and large sizes, outline variants, spacing, icon+label items,
  selected-state styling, `aria-label`s, `aria-pressed`, `data-state`,
  `data-value`, keyboard navigation, and orientation behavior;
- decide whether the current item-level size/variant/disabled hooks are enough
  or whether narrow group-level `size`, `variant`, `disabled`, and `spacing`
  props are needed;
- record intentional divergences for React, Radix ToggleGroup, lucide icons,
  Tailwind size utilities, and Tailwind selected-state selectors;
- then mark `toggle-group` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
