# Experiment 3: Resolve date-picker parity

## Description

Experiment 2 removed the only missing upstream shadcn `ui/` package API by
shipping `radcn/form`. The next visible gap is `date-picker`, which remains a
`not-shipped-yet` docs page and a fixture recipe.

In the vendored shadcn/ui v4 registry, `date-picker` is not a standalone
`ui/date-picker.tsx` component. It appears as three examples:

- `date-picker-demo` — Button trigger, Popover, single Calendar selection, and
  formatted selected value.
- `date-picker-with-presets` — the same single-date picker plus preset Select
  items for today/tomorrow/future offsets.
- `date-picker-with-range` — Button trigger, Popover, range Calendar selection,
  two visible months, and a formatted range label.

RadCN already has the primitives needed for this shape: `Button`, `Calendar`,
`Popover`, `Select`, and the new explicit form wiring pattern. The current
candidate fixture proves a docs-only recipe with a hidden input, popover
behavior, disabled trigger, and custom token hook, but the docs still present
date-picker as not shipped.

This experiment resolves the date-picker outcome by shipping an importable
RadCN date-picker package API if that remains the simplest way to make shadcn's
date-picker examples exist in RadCN. It should not merely rename the current
fixture recipe. The implementation must cover the user-facing shadcn behavior:
single-date selection, range selection, preset selection, native form
submission, disabled trigger state, accessible trigger/content wiring, display
labels, and customization hooks.

This experiment does not implement `data-table`, charts, blocks, npm
publishing, external installation, or a generic date formatting library.

## Changes

- Add `radcn/packages/radcn/src/components/date-picker.tsx`.
  - Export a Remix-native date-picker API that composes existing RadCN
    primitives instead of introducing React state or `react-day-picker`.
  - Support single and range values using the existing calendar ISO format
    convention (`YYYY-MM-DD` and `YYYY-MM-DD..YYYY-MM-DD`).
  - Support a hidden native input for form submission when `name` is provided.
  - Support `placeholder`, `value`, `defaultValue`, `month`, `numberOfMonths`,
    `disabled`, `required`, `defaultOpen`, `min`, `max`, and class/style
    customization where those map cleanly to existing primitives.
  - Include preset support as either a package part or documented composition
    with `Select`, but the final docs must show the preset shadcn example
    family.
  - Expose `data-radcn-date-picker` hooks and avoid adding React,
    `react-day-picker`, `date-fns`, Radix Slot, or any dependency from
    `vendor/`.
  - Export `enhanceDatePicker(root?: ParentNode)` as the named browser behavior
    entry for client-side date-picker interaction.
- Implement `enhanceDatePicker`.
  - It must coordinate Date Picker state with the existing enhanced Calendar
    and Popover behavior rather than replacing those primitives.
  - For single mode, selecting a day updates the date-picker value, hidden
    input, trigger label, and calendar selected state.
  - For range mode, selecting a start date and then an end date builds the
    `YYYY-MM-DD..YYYY-MM-DD` value, updates range-start/range-middle/range-end
    calendar state, hidden input, and trigger label, and keeps two-month
    rendering intact.
  - For presets, selecting a preset updates the value, visible label, hidden
    input, calendar month, and selected calendar state.
  - Form reset must restore the package default value and trigger label without
    relying on app-specific fixture code.
  - Disabled date pickers must not open or mutate values.
- Add `./date-picker` to `radcn/packages/radcn/package.json`.
- Export date-picker components, helpers, and types from
  `radcn/packages/radcn/src/index.ts`, including `enhanceDatePicker`.
- Add date-picker CSS hooks to `radcn/packages/radcn/src/styles/tokens.css` if
  the package needs layout beyond existing button/popover/calendar styles, then
  regenerate `radcn/packages/radcn/src/styles/index.ts`.
- Wire `enhanceDatePicker` into `radcn/fixtures/candidate-remix/app/assets/entry.ts`
  so fixture browser tests exercise package behavior.
- Wire `enhanceDatePicker` into `radcn/apps/docs/app/assets/entry.ts` if docs
  examples are expected to be interactive, or explicitly document why the docs
  preview is static while fixture coverage owns interaction.
- Update `radcn/fixtures/candidate-remix/app/fixtures/date-picker.tsx` to use
  the package API instead of a local recipe function.
- Update `radcn/fixtures/tests/calendar-date-picker.spec.ts` so date-picker
  assertions prove:
  - the package export exists;
  - single selected value and trigger label render;
  - popover open/escape behavior works;
  - form hidden input submits the selected value;
  - range values and two-month rendering work;
  - preset selection updates the submitted value or displayed value;
  - disabled and custom-token behavior still work.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Move Date Picker from `not-shipped-yet` to a ready package API page.
  - Add live package-backed examples for default single, presets, and range.
  - Explain that shadcn's date picker is an example composition, while RadCN
    promotes the composition into a package API to satisfy product parity.
  - Keep installation copy aspirational and do not claim RadCN is published.
- Update `radcn/apps/docs/tests/coverage.spec.ts`.
  - Remove `date-picker` from `nonExportedDispositions`.
  - Add a date-picker preview hook.
- Re-run `node scripts/audit-shadcn-parity.mjs` and commit the regenerated
  `parity-inventory.md`.
- Add Issue 4 learnings for the final date-picker API decision, the
  single/range value model, preset handling, and any accessibility or form
  wiring requirements that data-table or blocks should reuse. Supersede the
  Experiment 1 package-count learning with the current inventory count after
  `date-picker` is resolved.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts calendar-date-picker.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- `git diff --check`
- `git status --short` shows only expected RadCN source, docs, fixture, issue,
  inventory, and test changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|react-day-picker|date-fns|radix-ui|@radix-ui/react-slot|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.

Failure criteria:

- Date Picker remains a `not-shipped-yet` docs page.
- The package cannot express one of the three shadcn example families: single,
  presets, or range.
- Form submission relies on client JavaScript instead of native hidden input
  state.
- Browser coverage proves only static DOM instead of selection, popover,
  hidden-input, disabled, and customization behavior.
- The docs claim external npm installation works today.

## Design Review

Reviewer: Russell (`019e9a01-28f2-75a1-a195-1daaf69f49bf`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the original plan required interactive date-picker behavior but did
  not explicitly plan an enhancer or app entry integration. Fixed by requiring
  `enhanceDatePicker`, fixture entry wiring, docs entry handling, and concrete
  behavior for single selection, range construction, presets, reset, hidden
  inputs, labels, and disabled state.
- Major: hygiene verification used vague phrases instead of exact commands.
  Fixed by adding concrete parity regeneration, vendor cleanliness, and scope
  grep commands.
- Minor: the issue README had stale wording that could imply the current
  inventory still had 57 public package subpaths. Fixed by time-qualifying the
  Experiment 1 count and recording the current 58-subpath state after
  Experiment 2.

Re-review result: approved with no blocker, major, or minor findings.

## Result

**Result:** Pass

Resolved date-picker parity by shipping a package-backed `radcn/date-picker`
composition and moving the docs page out of `not-shipped-yet`.

Changed files:

- `radcn/packages/radcn/src/components/date-picker.tsx`
  - Added `DatePicker`, `enhanceDatePicker`, `DatePickerProps`, and
    `DatePickerPreset`.
  - Supports single values, range values, preset selects, hidden native inputs,
    default reset state, disabled triggers, labels, and customization hooks.
- `radcn/packages/radcn/src/components/calendar.tsx`
  - Added range-aware selection and a `radcn-calendar-set-value` event so
    composed package APIs can update calendar state without private DOM hacks.
  - Avoided fixed caption IDs when no calendar `id` is provided, so multiple
    date pickers can render on the same page without duplicate IDs.
- `radcn/packages/radcn/src/components/popover.tsx`
  - Added disabled support to `PopoverTrigger` so DatePicker can use the trigger
    button directly without invalid nested buttons.
- `radcn/packages/radcn/package.json` and `radcn/packages/radcn/src/index.ts`
  - Added the public `./date-picker` export and root exports.
- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`
  - Added date-picker layout/preset hooks and regenerated `radcnStyles`.
- `radcn/fixtures/candidate-remix/app/assets/entry.ts`
  - Wired `enhanceDatePicker` into the candidate browser entry.
- `radcn/fixtures/candidate-remix/app/fixtures/date-picker.tsx`
  - Replaced the local fixture recipe with the package API.
- `radcn/fixtures/scenarios/index.ts`
  - Added preset and range date-picker scenarios and updated date-picker
    metadata from recipe language to package language.
- `radcn/fixtures/tests/calendar-date-picker.spec.ts`
  - Added package export, single, preset, range, hidden input, reset, disabled,
    and customization coverage.
- `radcn/apps/docs/app/content/components.tsx`
  - Added a ready package-backed Date Picker docs page with single/preset/range
    examples and divergence notes.
- `radcn/apps/docs/tests/coverage.spec.ts`
  - Removed `date-picker` from non-exported dispositions and added its preview
    hook.
  - Added duplicate-ID coverage for the docs Date Picker page, which renders
    two DatePicker instances.
- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - Regenerated the inventory. It now reports 59 RadCN public package subpaths
    and only `data-table` as a docs-only outcome.

Verification:

- `pnpm radcn:typecheck` — Pass.
- `pnpm --dir radcn/apps/docs typecheck` — Pass.
- `pnpm fixtures:candidate:typecheck` — Pass.
- `pnpm fixtures:reference:typecheck` — Pass, with the existing React Router
  `module.register()` deprecation warning.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts calendar-date-picker.spec.ts`
  — Pass, 4 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — Pass, 5 tests.
- `node scripts/audit-shadcn-parity.mjs` — Pass.
- Temporary regeneration check for `parity-inventory.md` — Pass, no diff.
- `git diff --check` — Pass.
- `git status --short` — Shows only expected implementation, docs, fixture,
  issue, inventory, and test changes.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  — Pass, no output.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|react-day-picker|date-fns|radix-ui|@radix-ui/react-slot|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  — Pass, exits 1 with no matches.

## Conclusion

Date Picker is no longer a docs-only gap. RadCN now exposes an importable
`DatePicker` package API that covers the upstream shadcn single, preset, and
range examples through Remix-native markup and browser enhancement.

The next Issue 4 experiment should resolve `data-table`, the final current
docs-only outcome. That work should decide whether Data Table becomes a package
API or a documented recipe/block, and should cover sorting/filtering/selection
behavior without assuming a React table library is part of RadCN.

## Completion Review

Reviewer: Kierkegaard (`019e9a11-0c08-7a13-b19f-d4780bc4446e`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the initial implementation defaulted every DatePicker to the same
  `id`, creating duplicate DatePicker, Popover, and Calendar caption IDs when
  docs rendered two instances on one page. Fixed by omitting DatePicker and
  Popover IDs unless the caller provides an explicit `id`, avoiding fixed
  Calendar caption IDs when no calendar `id` is provided, and adding docs
  Playwright coverage for duplicate IDs.
- Minor: date-picker fixture scenario metadata still used recipe wording after
  DatePicker became a package API. Fixed by updating date-picker scenario titles
  and descriptions to package/component language.

Fix verification:

- `pnpm radcn:typecheck` — Pass.
- `pnpm --dir radcn/apps/docs typecheck` — Pass.
- `pnpm fixtures:candidate:typecheck` — Pass.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts calendar-date-picker.spec.ts`
  — Pass, 4 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — Pass, 5 tests.
- `git diff --check` — Pass.

Re-review result: approved with no blocker findings. One remaining minor title
cleanup was fixed after approval.
