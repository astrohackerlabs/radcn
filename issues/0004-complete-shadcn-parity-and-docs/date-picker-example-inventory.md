# Date Picker Example Inventory

## Scope

Active upstream Date Picker example cluster from `parity-inventory.md`:

- `date-picker-demo`
- `date-picker-with-presets`
- `date-picker-with-range`

Adjacent date-picker-related registry examples remain outside this cluster
unless the generated inventory reclassifies them later:

- `date-picker-form`

That adjacent example belongs to Form/date-picker recipe coverage rather than
the base active example cluster.

## Evidence Reviewed

Upstream references:

- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-demo.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-with-presets.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/date-picker-with-range.tsx`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-demo.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-with-presets.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/date-picker-with-range.json`

RadCN references:

- `issues/0004-complete-shadcn-parity-and-docs/03-resolve-date-picker-parity.md`
- `radcn/packages/radcn/src/components/date-picker.tsx`
- `radcn/packages/radcn/src/components/calendar.tsx`
- `radcn/packages/radcn/src/components/popover.tsx`
- `radcn/packages/radcn/src/styles/index.ts`
- `radcn/apps/docs/app/content/components.tsx`
- `radcn/apps/docs/tests/coverage.spec.ts`
- `radcn/fixtures/scenarios/index.ts`
- `radcn/fixtures/candidate-remix/app/fixtures/date-picker.tsx`
- `radcn/fixtures/tests/calendar-date-picker.spec.ts`

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `date-picker-demo` | Button trigger with calendar icon, placeholder `Pick a date`, popover calendar, single-date selection, and formatted selected label. | Package supports single mode, placeholder, trigger label, Popover and Calendar composition, selected state, hidden input, disabled state, public hooks, and dependency-free enhancement. Candidate `date-picker/popover` and Playwright prove selected single date, popover open/escape behavior, and calendar visibility. Docs show a package preview but do not expose a named `date-picker-demo` family. | Partial | Add named docs/fixture/test evidence for `date-picker-demo`, including placeholder state, single selection, formatted trigger label, popover/calendar hooks, and upstream mapping copy. |
| `date-picker-with-presets` | Single-date picker with a preset Select for Today, Tomorrow, In 3 days, and In a week, updating the selected date and label. | Package supports preset selections through `presets` and `data-radcn-date-picker-preset-select`. Candidate `date-picker/presets` and Playwright prove selecting `2026-06-15` updates value, label, and selected calendar day. Docs source includes presets but does not expose a named `date-picker-with-presets` family or all four upstream preset labels as named proof. | Partial | Add named docs/fixture/test evidence for all four upstream preset labels and the preset-selection mapping under the upstream example id. |
| `date-picker-with-range` | Button trigger with range label, popover range calendar, default month from the start date, two visible months, and formatted start/end label. | Package supports range mode, `numberOfMonths`, range values, range-start/range-end hooks, and label formatting. Candidate `date-picker/range` and Playwright prove two months, initial range label, range reselection, and range hook updates. Docs do not expose a named `date-picker-with-range` family or dedicated range docs proof. | Partial | Add named docs/fixture/test evidence for range trigger label, two-month calendar, default month/range selected state, range reselection, and public hooks under the upstream example id. |

## Capability Matrix

| Capability | Current status | Notes |
| --- | --- | --- |
| Package API | Covered | `radcn/date-picker` is an importable package API shipped in Experiment 3. |
| Single selection | Covered | Date Picker coordinates Calendar selection, trigger labels, hidden input values, and popover closing. |
| Range selection | Covered | Range values use `YYYY-MM-DD..YYYY-MM-DD`, two-month calendars, and range start/end hooks. |
| Preset selection | Covered | Preset selects update value, label, hidden input, and Calendar selected state. |
| Trigger label formatting | Covered | Package formats ISO values into visible labels without adding `date-fns`. |
| Placeholder state | Covered | Empty values render `Pick a date`. |
| Popover behavior | Covered | Fixture Playwright proves open content and Escape closing. |
| Hidden input submission/reset | Covered | Fixture Playwright proves hidden input update, reset, and GET submission. |
| Disabled trigger state | Covered | Fixture Playwright proves disabled trigger state. |
| Custom classes/styles/tokens | Covered | Fixtures prove custom Date Picker class usage; styles expose package hooks and CSS variables through composed primitives. |
| Public hooks | Covered | Date Picker exposes `data-radcn-date-picker`, label, hidden input, preset select, plus Calendar and Popover hooks. |
| Docs named example ids | Partial | Docs have package-level Date Picker coverage but no `data-radcn-docs-date-picker-family` hooks for the three upstream ids. |
| Candidate fixture named example ids | Partial | Candidate fixtures cover behavior through generic Date Picker routes, not active upstream example ids. |
| Playwright named example proof | Partial | Tests verify behavior but not exact upstream example ids and named compositions. |

## Mapping Decisions

- shadcn React `useState` and `onSelect` map to RadCN explicit props,
  dependency-free enhancement, Calendar events, hidden input values, and
  app/server-owned state.
- shadcn `date-fns` `format` and `addDays` map to RadCN ISO values,
  deterministic package label formatting, and explicit preset values. Apps can
  own richer formatting if needed.
- shadcn `react-day-picker` `DateRange` maps to RadCN range strings in the form
  `YYYY-MM-DD..YYYY-MM-DD`.
- shadcn `className` maps to `class`; `asChild` maps to explicit Date Picker
  trigger composition owned by the package; fixed trigger widths map to app CSS.
- shadcn `CalendarIcon` and `lucide-react` are presentation details. RadCN uses
  a dependency-free trigger icon span and app-owned styling.
- Tailwind utilities map to RadCN classes, `class`, `style`, CSS variables, and
  app CSS.
- Popover and Calendar remain composed RadCN primitives; Date Picker owns their
  coordination for labels, values, presets, range values, and reset.
- Vendor source is read-only evidence and must not become a RadCN dependency.

## Decision

The Date Picker package API appears sufficient for the active upstream example
cluster. The gap is named example parity depth: docs, candidate fixtures, and
Playwright tests need to prove the three upstream example ids and exact
user-facing compositions.

Recommended next experiment: implement Date Picker example parity depth without
changing `radcn/date-picker` unless implementation reveals a concrete package
blocker not found in this audit.
