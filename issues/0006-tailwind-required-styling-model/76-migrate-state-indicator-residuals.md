# Experiment 76: Migrate state-indicator residuals

## Description

Experiment 75 cleared Field/Form/InputGroup residual styling. The next remaining
cluster from the Experiment 73 map is state-indicator residuals:

- Checkbox and RadioGroup checked indicator reveal;
- Switch thumb size and checked translation;
- Slider thumb focus ring;
- Command checked-indicator visibility;
- menu-family inset/destructive/disabled helpers across DropdownMenu,
  ContextMenu, and Menubar;
- Toggle icon and ToggleGroup disabled/vertical/item icon state.

This experiment migrates only those state-indicator and menu-helper visual
rules. It should not migrate modal/drawer layout residuals, docs/fixture/demo
CSS evacuation, or behavior-only keyframes/portal/positioning glue.

The risk is parent-state-to-child styling. Experiments 74 and 75 proved that
Tailwind v4 can generate the needed arbitrary descendant and `has-*` utilities
when the owning component emits the parent class. This experiment should use
that pattern rather than keeping package CSS cascades.

## Changes

- `radcn/packages/radcn/src/components/checkbox.tsx`:
  - move checked indicator reveal into component-emitted Tailwind utilities on
    the wrapper or indicator;
  - preserve native input semantics, `data-state`, and
    `data-radcn-checkbox-*` hooks.
- `radcn/packages/radcn/src/components/radio-group.tsx`:
  - move checked dot visibility into component-emitted Tailwind utilities;
  - preserve native radio semantics, `data-state`, and
    `data-radcn-radio-*` hooks.
- `radcn/packages/radcn/src/components/switch.tsx`:
  - move thumb size and checked translation into component-emitted utilities,
    using parent `has-[:checked]` or data-state descendant variants as needed;
  - preserve the `size="sm"` API and all `data-radcn-switch-*` hooks.
- `radcn/packages/radcn/src/components/slider.tsx`:
  - move the thumb focus ring into component-emitted utilities on the slider
    root or thumb;
  - preserve native range input behavior and `--radcn-slider-percent` syncing.
- `radcn/packages/radcn/src/components/command.tsx`:
  - move unchecked checked-indicator hiding into component-emitted utilities on
    `CommandItem` or the indicator;
  - preserve `data-checked`, selection, filtering, and keyboard behavior.
- `radcn/packages/radcn/src/components/dropdown-menu.tsx`,
  `radcn/packages/radcn/src/components/context-menu.tsx`, and
  `radcn/packages/radcn/src/components/menubar.tsx`:
  - move `radcn-menu-item--inset`, `radcn-menu-label--inset`,
    `radcn-menu-item--destructive`, and disabled item visual behavior into
    component-emitted utilities;
  - keep the marker classes because docs and tests describe them as hooks;
  - keep menu overlay positioning and keyboard behavior unchanged.
- `radcn/packages/radcn/src/components/toggle.tsx` and
  `radcn/packages/radcn/src/components/toggle-group.tsx`:
  - move `radcn-toggle-icon`, pressed icon color, ToggleGroup disabled opacity,
    vertical orientation, group-disabled item pointer handling, and
    ToggleGroup icon pressed color into component-emitted utilities or explicit
    raw call-site utilities where the icon marker is consumer-only;
  - preserve marker classes and Toggle/ToggleGroup state behavior.
- `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`:
  - append equivalent Tailwind utilities to raw `radcn-toggle-icon` and
    `radcn-toggle-group-icon` call sites.
- `radcn/apps/docs/app/content/components.tsx`:
  - append equivalent Tailwind utilities to raw `radcn-toggle-icon` and
    `radcn-toggle-group-icon` call sites in docs source snippets, previews, and
    rich examples.
- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`:
  - remove the migrated Checkbox, RadioGroup, Switch, Slider, Command,
    menu-helper, and Toggle/ToggleGroup visual rules;
  - keep theme tokens, custom fixture token variables, intentional behavior
    keyframes, portal/positioning rules, Accordion/Collapsible/Tabs
    parent-child behavior glue, modal/drawer residuals, and docs/fixture/demo
    CSS outside this cluster;
  - regenerate `styles/index.ts` from `tokens.css` with the repository's
    JSON-stringify formula.
- `issues/0006-tailwind-required-styling-model/README.md`:
  - update the experiment index status when the result is recorded;
  - copy durable state-indicator migration findings into `## Learnings`;
  - update the remaining cluster queue if the experiment passes.

## Verification

1. Build style output:
   - `pnpm --dir radcn/fixtures/candidate-remix styles:build`
   - `pnpm --dir radcn/apps/docs styles:build`
2. Typecheck:
   - `pnpm radcn:typecheck`
   - `pnpm fixtures:candidate:typecheck`
   - `pnpm fixtures:reference:typecheck`
   - `pnpm --dir radcn/apps/docs typecheck`
3. Confirm generated CSS contains representative migrated utilities for:
   - Checkbox checked indicator reveal;
   - RadioGroup checked indicator opacity;
   - Switch sm thumb size and checked thumb translation;
   - Slider focus-visible thumb ring;
   - Command unchecked indicator hiding;
   - menu inset/destructive/disabled helper behavior;
   - Toggle icon sizing/color and ToggleGroup disabled/vertical/icon state.
4. Confirm `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` are in
   sync with the repository's JSON-stringify formula after the CSS edit.
5. Confirm `tokens.css` no longer contains migrated visual rules for:
   - `[data-radcn-checkbox-wrapper]:has(...checked) [data-radcn-checkbox-indicator]`;
   - `[data-radcn-radio-item]:has(...checked) [data-radcn-radio-indicator]`;
   - `[data-radcn-switch-wrapper] ... [data-radcn-switch-thumb]`;
   - `[data-radcn-slider]:has(...focus-visible) [data-radcn-slider-thumb]`;
   - `.radcn-command-item[data-checked="false"] .radcn-command-item-indicator`;
   - `.radcn-menu-item--inset`, `.radcn-menu-label--inset`,
     `.radcn-menu-item--destructive`, and
     `[data-radcn-menu-item][data-disabled="true"]`;
   - `.radcn-toggle-icon`, ToggleGroup disabled/vertical/item/icon visual rules.
6. Focused Playwright gates:
   - `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/native-state.spec.ts tests/form-input-cluster.spec.ts tests/combobox-command.spec.ts tests/menu-overlays.spec.ts tests/menubar-navigation.spec.ts tests/static-display.spec.ts tests/toggle.spec.ts`
   - `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`
7. Full fixture artifact gate:
   - `pnpm fixtures:artifacts`
8. Hygiene:
   - `git diff --check`
   - `git status --short`
   - `git diff --name-only | rg '^vendor/'` must produce no matches.

Pass criteria:

- State indicator visuals come from Tailwind utilities, not package CSS
  cascades.
- Checkbox, RadioGroup, Switch, Slider, Command, menu-family helpers, Toggle,
  and ToggleGroup behavior remains green.
- Marker classes and data hooks used by tests/docs remain available.
- The Issue 6 README records the result status and durable learning from the
  cluster.
- No modal/drawer layout residuals or docs/fixture/demo evacuation work is
  migrated.

Fail criteria:

- Any focused state, command, menu, toggle, docs, or fixture test regresses.
- Tailwind does not generate the needed arbitrary descendant or `has-*`
  utilities.
- The migration requires keeping the same package CSS visual cascades.
- The migration removes marker classes or behavior hooks used by tests/docs.

## Design Review

Reviewer: Mencius (`019ebe30-431b-73b1-8767-737668bfd34e`), fresh Codex
subagent with `fork_context: false`.

Initial findings:

- Blocker: the focused Playwright verification omitted `tests/toggle.spec.ts`
  even though Toggle/ToggleGroup icon and state migration is in scope.
- Major: the Changes section described raw toggle icon call sites generically
  instead of listing the specific docs and fixture files to edit.

Fixes:

- Added `tests/toggle.spec.ts` to the focused fixture Playwright gate.
- Named `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx` and
  `radcn/apps/docs/app/content/components.tsx` explicitly in Changes.

Re-review result: approved. The reviewer confirmed both prior findings are
resolved and no new blocker was introduced.
