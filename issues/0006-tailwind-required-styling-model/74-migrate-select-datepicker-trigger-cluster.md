# Experiment 74: Migrate Select and DatePicker trigger cluster

## Description

Experiment 73 identified the next highest-signal Tailwind debt cluster:
Select trigger styling, DatePicker trigger/content overrides, and the
ButtonGroup coupling rules needed to keep Select/Dropdown/Popover trigger
geometry correct inside grouped controls.

This experiment migrates only that coherent cluster. It should not migrate the
broader Field/Form/InputGroup residuals, state-indicator residuals, modal/drawer
layout residuals, or docs/fixture CSS evacuation.

The risk is the same one solved by Experiments 70 and 72: the current bespoke
CSS wins by cascade order and applies parent-child grouping overrides. The
migration should use Tailwind utilities plus local CSS variable propagation
rather than keeping late `.radcn-*` visual rules.

## Changes

- `radcn/packages/radcn/src/components/select.tsx`:
  - replace the bespoke `.radcn-select-trigger` rule family with a
    `selectTriggerClass` utility string;
  - preserve the `radcn-select-trigger` marker and data attributes;
  - encode default width, control height, inline layout, border/background/text,
    padding, font, focus-visible, disabled, invalid, placeholder, and `size="sm"`
    behavior as Tailwind utilities;
  - use local variable reads for properties ButtonGroup may override, such as
    radius, adjacent margin, and height.
- `radcn/packages/radcn/src/components/button-group.tsx`:
  - add scoped descendant utilities to `buttonGroupBaseClass` and/or orientation
    classes for the Select/Dropdown/Popover trigger subset currently owned by
    bespoke ButtonGroup cascades;
  - migrate only the ButtonGroup rules needed by Select, DropdownMenu, and
    Popover trigger coupling in this experiment;
  - leave Button/Input/InputGroup residual grouping rules for the later
    Field/Form/InputGroup cluster.
- `radcn/packages/radcn/src/components/date-picker.tsx`:
  - remove the raw `radcn-date-picker-trigger` and `radcn-date-picker-content`
    visual dependence by appending equivalent utilities to the Popover trigger
    and content call sites;
  - keep behavior/data hooks unchanged.
- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`:
  - remove the migrated Select trigger rules;
  - remove the migrated DatePicker trigger/content override rules;
  - remove only the ButtonGroup cascades that this cluster replaces;
  - keep unrelated ButtonGroup/InputGroup, fixture, docs, modal, drawer, and
    behavior rules.
- `issues/0006-tailwind-required-styling-model/README.md`:
  - update the experiment index status when the result is recorded;
  - copy any durable Select/DatePicker/ButtonGroup coupling findings into
    `## Learnings`, even if the finding is that no new pattern was needed beyond
    the Experiment 70/72 variable-propagation patterns.

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
   - `radcn-select-trigger` width/control-height/border/focus/invalid/placeholder
     behavior;
   - ButtonGroup descendant coupling for select/dropdown/popover triggers;
   - DatePicker trigger width/justify and PopoverContent width/padding overrides.
4. Confirm `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` are in
   sync with the repository's JSON-stringify formula after the CSS edit.
5. Confirm `tokens.css` no longer contains:
   - `.radcn-select-trigger` visual rules;
   - `.radcn-date-picker-trigger`;
   - `.radcn-date-picker-content`;
   - migrated ButtonGroup select/dropdown/popover trigger coupling rules.
6. Focused Playwright gates:
   - `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/select.spec.ts tests/calendar-date-picker.spec.ts tests/navigation-collection.spec.ts tests/positioned-overlays.spec.ts tests/menu-overlays.spec.ts`
   - `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`
7. Full fixture artifact gate:
   - `pnpm fixtures:artifacts`
8. Hygiene:
   - `git diff --check`
   - `git status --short`
   - `git diff --name-only | rg '^vendor/'` must produce no matches.

Pass criteria:

- Select trigger appearance and state styling come from Tailwind utilities, not
  bespoke `.radcn-select-trigger` CSS.
- DatePicker trigger/content overrides come from Tailwind-scanned utilities, not
  bespoke `.radcn-date-picker-*` CSS.
- ButtonGroup still joins Select, DropdownMenu, and Popover triggers correctly in
  horizontal and vertical groups.
- Existing Select, DatePicker, ButtonGroup, Popover, DropdownMenu, docs, and
  fixture behavior remains green.
- The Issue 6 README records the result status and any durable learning from the
  cluster.
- No unrelated clusters are migrated.

Fail criteria:

- Any Select/DatePicker/ButtonGroup focused test regresses.
- ButtonGroup coupling requires keeping the same bespoke visual rules.
- The migration removes marker classes or behavior hooks used by tests/docs.
- Tailwind does not generate the descendant utilities needed for the cluster.

## Design Review

Reviewer: Banach (`019ebe17-abfd-72c2-a93d-17400d920b0b`), fresh Codex
subagent with `fork_context: false`.

Initial findings:

- Blocker: verification omitted the mandatory `tokens.css` /
  `styles/index.ts` sync check even though the plan edits both files.
- Major: the plan did not explicitly require updating the Issue 6 README
  Learnings digest after the experiment.

Fixes:

- Added the style sync verification step using the repository JSON-stringify
  formula.
- Added README index/result and durable Learnings requirements to Changes and
  pass criteria.

Re-review result: approved. No blocker, major, or minor findings remained.
