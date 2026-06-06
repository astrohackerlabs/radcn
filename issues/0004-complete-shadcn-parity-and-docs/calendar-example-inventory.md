# Calendar Example Inventory

## Scope

This audit covers the active upstream Calendar example cluster recommended by
`parity-inventory.md`:

- `calendar-demo`
- `calendar-hijri`

Date Picker examples and Calendar usage inside sidebar/block examples are out
of scope for this cluster. Date Picker is already resolved as a separate
package-backed composition.

## Evidence Reviewed

- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/calendar.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/calendar-demo.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/calendar-hijri.tsx`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar-demo.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/calendar-hijri.json`
- `radcn/packages/radcn/src/components/calendar.tsx`
- `radcn/packages/radcn/src/styles/index.ts`
- `radcn/apps/docs/app/content/components.tsx`
- `radcn/apps/docs/tests/coverage.spec.ts`
- `radcn/fixtures/scenarios/index.ts`
- `radcn/fixtures/candidate-remix/app/fixtures/calendar.tsx`
- `radcn/fixtures/tests/calendar-date-picker.spec.ts`

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `calendar-demo` | Renders a single-selection Calendar initialized to `new Date()`, updates selected date through React `useState`, uses `mode="single"`, `selected`, `onSelect`, `className="rounded-md border shadow-sm"`, and `captionLayout="dropdown"`. | `radcn/calendar` now supports single selection through `selected`/`defaultSelected` ISO strings, default month, hidden input values, grid semantics, day accessible names, pointer and keyboard selection, month navigation, outside days, disabled dates, range state, multi-month rendering, public hooks, custom `class`/`style`/token styling, and `captionLayout="dropdown"` month/year controls. Docs and fixtures prove the named `calendar-demo` route and page with dropdown controls, selected state, hidden input values, public hooks, and Playwright browser behavior. | Covered | Keep caption dropdown controls dependency-free and preserve label captions as the default behavior. |
| `calendar-hijri` | Renders a Persian/Hijri calendar example using `react-day-picker/persian`, `Vazirmatn` from `next/font/google`, local example-only Calendar implementation, `defaultMonth`/`selected` initialized to `new Date(2025, 5, 12)`, React `useState`, `onSelect`, `className="rounded-lg border shadow-sm"`, `lucide-react` chevrons, RTL chevron styling, and Button styling. | RadCN Calendar intentionally remains a Gregorian ISO date-grid package. Docs, fixtures, and Playwright coverage record `calendar-hijri` as an intentional divergence: Persian/Hijri rendering, alternate calendar engines, app fonts such as `Vazirmatn`, and RTL/icon presentation are app-owned recipes that may reuse RadCN tokens and hooks without adding `react-day-picker/persian`, `next/font`, or `lucide-react` to RadCN. | Intentional divergence | Revisit only if a future issue designs a dependency-free alternate-calendar adapter API with real package value beyond app composition. |

## Capability Matrix

| Capability | Current status | Evidence |
| --- | --- | --- |
| Single date selection | Supported | `Calendar` accepts `selected` and `defaultSelected`; fixture tests prove pointer and keyboard selection updates selected state. |
| Default month | Supported | `defaultMonth` drives initial `data-month`; fixture tests assert June 2026 and navigation updates. |
| Hidden input values | Supported | `name` renders `data-radcn-calendar-hidden-input`; tests assert submitted value updates. |
| Grid semantics | Supported | Calendar renders `role="grid"` and `role="gridcell"` with labelled month captions. |
| Day accessible names | Supported | Day buttons use full date labels such as `Friday, June 12, 2026`. |
| Keyboard selection | Supported | Fixture tests cover arrow, Home/End, PageUp/PageDown, Enter, and Space behavior. |
| Pointer selection | Supported | Fixture tests click day buttons and assert hidden value updates. |
| Month navigation | Supported | Previous/next buttons and PageUp/PageDown update `data-month` and captions. |
| Outside days | Supported | `showOutsideDays` controls adjacent-month days; fixture route exists. |
| Disabled dates and bounds | Supported | `disabledDates`, `min`, and `max` disable day buttons; fixture tests cover disabled days. |
| Range state | Supported | `mode="range"` and `YYYY-MM-DD..YYYY-MM-DD` values expose start/middle/end hooks. |
| Multi-month rendering | Supported | `numberOfMonths` renders multiple `data-radcn-calendar-month` elements. |
| Public hooks | Supported | Calendar exposes `data-radcn-calendar`, nav, month, caption, grid, week, day, and day-button hooks. |
| Custom classes/styles/tokens | Supported | Props accept `class` and `style`; custom-token fixture proves CSS variable styling. |
| Caption dropdown behavior | Supported | `captionLayout="dropdown"` renders native month/year selects with stable hooks and browser enhancement keeps data-month, grids, hidden inputs, and previous/next navigation synchronized. |
| Persian/Hijri rendering | Intentional divergence | Docs, fixtures, and Playwright record alternate calendar systems as app-owned recipes rather than RadCN package dependencies. |
| RTL behavior | Intentional divergence for Calendar-specific icons | Direction and icon presentation remain app-owned for alternate-calendar recipes; RadCN Calendar keeps dependency-free previous/next controls. |
| App-owned font styling | Supported and documented | `class`/`style` and CSS variables can carry app font choices; `Vazirmatn`/Next font loading is explicitly app/framework-owned. |
| Docs evidence | Supported | Calendar is an authored rich docs page with named `calendar-demo` and `calendar-hijri` evidence. |
| Candidate fixture evidence | Supported | Fixture routes include `calendar/demo` and `calendar/hijri-intentional-divergence`. |
| Playwright evidence | Supported | `calendar-date-picker.spec.ts` and docs coverage prove the named Calendar demo and Hijri intentional divergence outcomes. |

## Mapping Decisions

| Upstream mechanic | RadCN mapping |
| --- | --- |
| React `useState`, `selected`, and `onSelect` | Map to explicit `selected`/`defaultSelected` ISO props, native hidden inputs, and dependency-free browser enhancement events. |
| `mode="single"` | Preserve as `mode="single"` where needed; single mode is also RadCN's default. |
| `defaultMonth` | Map to ISO `defaultMonth`/`month` props such as `2026-06-01`. |
| `captionLayout="dropdown"` | Supported as RadCN package-owned native month/year selects with `data-radcn-calendar-month-select` and `data-radcn-calendar-year-select`; label captions remain the default. |
| `className` and `classNames` | `className` maps to `class`; granular `classNames` maps to public `data-radcn-calendar-*` hooks, package classes, `style`, and CSS variables. |
| `data-slot` | Map to public `data-radcn-calendar-*` hooks. DOM attribute names may differ if behavior and customization remain equivalent. |
| cva, `cn`, Tailwind utilities | Implementation details only. RadCN owns package CSS and CSS variables instead of depending on these utilities. |
| `react-day-picker`, `DayPicker`, `DayButton`, `getDefaultClassNames` | Upstream implementation dependencies. RadCN owns dependency-free calendar rendering and enhancement. |
| `react-day-picker/persian` | Not a RadCN dependency. Alternate calendar systems are app-owned recipes unless a future package adapter issue proves reusable value. |
| `buttonVariants` and Button composition | Upstream styling implementation. RadCN Calendar owns nav/day button behavior and package classes; app composition can wrap Calendar where needed. |
| `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `lucide-react` | App-owned icon presentation. RadCN does not add `lucide-react` as a Calendar dependency. |
| `next/font/google` and `Vazirmatn` | App/framework-owned font loading. RadCN does not depend on Next font APIs. |
| RTL chevron behavior | App-owned direction/icon presentation for alternate-calendar recipes. |
| Date Picker references | Separate resolved composition that reuses Calendar; not part of Calendar example parity rows. |
| Sidebar/block Calendar references | Out-of-cluster block usage; not part of this example audit. |
| Vendor source | Read-only reference. No RadCN package or app code may import from `vendor/`. |

## Decision

The Calendar example cluster is resolved. `calendar-demo` is covered by
package-owned `captionLayout="dropdown"` controls plus named docs, fixture, and
Playwright evidence. `calendar-hijri` is an intentional divergence: alternate
Persian/Hijri calendar engines, app fonts, RTL chevrons, and icon presentation
belong to app-owned recipes that may reuse RadCN hooks and tokens. RadCN did
not add React, `react-day-picker`, `react-day-picker/persian`, `next/font`,
`lucide-react`, Tailwind, or vendor dependencies.
