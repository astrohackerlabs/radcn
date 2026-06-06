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
| `date-picker-demo` | Button trigger with calendar icon, placeholder `Pick a date`, popover calendar, single-date selection, and formatted selected label. | Covered by package single mode, placeholder, trigger label, Popover and Calendar composition, hidden input, public hooks, dependency-free enhancement, docs `data-radcn-docs-date-picker-family="date-picker-demo"`, candidate route `date-picker/demo`, and Playwright proof for placeholder state, popover/calendar rendering, single selection, formatted label update, selected calendar state, and public hooks. | Covered | No follow-up for the active example. Calendar icon presentation stays dependency-free and app-owned. |
| `date-picker-with-presets` | Single-date picker with a preset Select for Today, Tomorrow, In 3 days, and In a week, updating the selected date and label. | Covered by package presets, `data-radcn-date-picker-preset-select`, docs `data-radcn-docs-date-picker-family="date-picker-with-presets"`, candidate route `date-picker/with-presets`, and Playwright proof for all four upstream preset labels plus preset-driven value, label, and calendar selected-state updates. | Covered | No follow-up for the active example. Preset values stay explicit ISO strings rather than `date-fns` offsets. |
| `date-picker-with-range` | Button trigger with range label, popover range calendar, default month from the start date, two visible months, and formatted start/end label. | Covered by package range mode, `numberOfMonths`, range strings, range-start/range-end hooks, docs `data-radcn-docs-date-picker-family="date-picker-with-range"`, candidate route `date-picker/with-range`, and Playwright proof for formatted range label, two visible months, initial range hooks, range reselection behavior, and public hooks. | Covered | No follow-up for the active example. `react-day-picker` `DateRange` remains mapped to RadCN range strings. |

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
| Docs named example ids | Covered | Docs expose `data-radcn-docs-date-picker-family` hooks for all three active upstream examples. |
| Candidate fixture named example ids | Covered | Candidate fixtures expose named routes for `demo`, `with-presets`, and `with-range`. |
| Playwright named example proof | Covered | Fixture and docs Playwright coverage prove the named example compositions and mapping copy. |

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

The Date Picker package API is sufficient for the active upstream example
cluster. All three active examples are covered by package behavior, docs,
candidate fixtures, Playwright coverage, and mapping decisions.

Final API decision: no Date Picker package API change is required. shadcn React
state, `date-fns`, and `react-day-picker` mechanics map to explicit DatePicker
props, ISO values, hidden inputs, Calendar/Popover coordination, public hooks,
and app-owned formatting/presentation.
