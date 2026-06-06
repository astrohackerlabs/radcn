# ButtonGroup Example Inventory

Generated during Experiment 13 on 2026-06-05. Updated by Experiment 14 on
2026-06-05 after ButtonGroup parity depth implementation.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/button-group-*.tsx`
- Upstream package:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/button-group.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/button-group.tsx`
  `radcn/packages/radcn/src/components/button.tsx`
  `radcn/packages/radcn/src/components/input.tsx`
  `radcn/packages/radcn/src/components/input-group.tsx`
  `radcn/packages/radcn/src/components/select.tsx`
  `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  `radcn/packages/radcn/src/components/popover.tsx`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  `radcn/fixtures/tests/navigation-collection.spec.ts`

## Summary

ButtonGroup example parity is resolved. RadCN exports `ButtonGroup`,
`ButtonGroupText`, and `ButtonGroupSeparator`; `ButtonGroup` now supports
accessible group labels through `ariaLabel` and `ariaLabelledby`.

The package, docs, fixtures, and Playwright coverage now prove the upstream
ButtonGroup example surface:

- nested ButtonGroups with explicit clustered spacing;
- split button composition with separators and accessible icon actions;
- size examples across small, default, large, and icon sizes;
- input composition inside ButtonGroup;
- InputGroup composition nested inside ButtonGroup;
- Select composition with a hidden native submitted value;
- DropdownMenu and Popover compositions using explicit RadCN trigger components
  instead of shadcn's React-only `asChild`;
- larger toolbar/demo composition with nested groups, dropdown menu, radio item
  defaults, submenu, and destructive action;
- documented mappings for upstream React state to Remix 3 server/default state,
  native submitted values, route state, or app-owned enhancement.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `button-group-demo` | Mail-style toolbar with nested ButtonGroups, icon-only back action, archive/report/snooze actions, dropdown menu, radio label selection, submenu, and destructive action. | Candidate fixture `button-group/demo`, docs `ButtonGroupPreview`, and Playwright prove nested toolbar groups, accessible icon action, dropdown menu, radio default value, submenu, and destructive action. | Covered | None. |
| `button-group-dropdown` | Split follow button with adjacent dropdown trigger and menu actions. | Candidate fixture `button-group/dropdown`, docs `ButtonGroupPreview`, and Playwright prove split dropdown composition with explicit `DropdownMenuTrigger`. | Covered | None. |
| `button-group-input` | Search input grouped with an icon action button. | Candidate fixture `button-group/input`, docs `ButtonGroupPreview`, styles, and Playwright prove Input composition and accessible search action. | Covered | None. |
| `button-group-input-group` | Rounded ButtonGroup containing a plus icon group and an InputGroup with voice-mode toggle, tooltip, active state, disabled input, and React state. | Candidate fixture `button-group/input-group`, docs `ButtonGroupPreview`, and Playwright prove nested InputGroup, Tooltip trigger, disabled input, and server/default active-state mapping. | Intentional divergence | RadCN does not port React `useState`; live voice-mode toggling remains app-owned enhancement. |
| `button-group-nested` | Pagination-style nested ButtonGroups: numbered buttons plus previous/next icon buttons with spacing between child groups. | Candidate fixture `button-group/nested`, docs `ButtonGroupPreview`, `.radcn-button-group--clustered`, and Playwright prove nested groups, child-group spacing, and accessible icon navigation. | Covered | None. |
| `button-group-orientation` | Vertical icon button group with accessible group label and plus/minus controls. | Candidate fixture `button-group/orientation`, package `ariaLabel`, and Playwright prove named vertical icon ButtonGroup behavior. | Covered | None. |
| `button-group-popover` | Split Copilot button with popover trigger, popover content, separator, textarea, and explanatory copy. | Candidate fixture `button-group/popover`, docs `ButtonGroupPreview`, and Playwright prove explicit `PopoverTrigger`, popover content, separator, and textarea composition. | Covered | None. |
| `button-group-select` | Currency select, numeric input, and send icon button arranged as grouped controls; selected currency is React state. | Candidate fixture `button-group/select`, docs `ButtonGroupPreview`, and Playwright prove Select composition, hidden native value, input amount, and accessible send action. | Intentional divergence | RadCN maps React controlled selected state to default/hidden native value and leaves route/live state to the app. |
| `button-group-separator` | Secondary Copy/Paste buttons separated by ButtonGroupSeparator. | Candidate fixture `button-group/separator`, docs `ButtonGroupPreview`, and Playwright prove the exact separator-only two-button pattern. | Covered | None. |
| `button-group-size` | Three groups showing small/default/large button and icon size combinations. | Candidate fixture `button-group/size`, docs `ButtonGroupPreview`, and Playwright prove `sm`, default, `lg`, `icon-sm`, `icon`, and `icon-lg` inside ButtonGroup. | Covered | None. |
| `button-group-split` | Secondary split button with main action, separator, and icon secondary action. | Candidate fixture `button-group/split`, docs `ButtonGroupPreview`, and Playwright prove secondary split action, separator, icon-sized action, and accessible label. | Covered | None. |

## Mapping Decisions

- RadCN should not port shadcn's `asChild` trigger pattern. ButtonGroup examples
  should use explicit RadCN trigger parts and Button props, matching earlier
  `href` and trigger mapping decisions.
- React `useState` in the upstream demo, input-group, and select examples is
  not a ButtonGroup package requirement. RadCN should map those examples to
  server-provided defaults, native submitted values, route state, or a small
  dependency-free browser enhancement when live interaction is the user-facing
  behavior.
- Icon packages are presentation details. ButtonGroup parity should verify
  accessible icon-only controls and visible icon/text composition without making
  a specific upstream icon package a dependency.
- ButtonGroup should remain a layout primitive. It should compose existing
  Button, Input, InputGroup, Select, DropdownMenu, Popover, Separator, Textarea,
  and Tooltip APIs rather than owning their state.
- Nested ButtonGroups are an important package styling behavior: outer groups
  should provide spacing between child groups while inner groups keep joined
  controls.
- The audit should not assume DOM equivalence. The implementation target is
  equivalent visual grouping, accessibility, and author-facing modifiability.

## Next Recommendation

Mark `button-group` resolved in `resolved-clusters.json`, regenerate
`parity-inventory.md`, and move to the next generated unresolved example,
block, or chart cluster after Experiment 14 completion review.
