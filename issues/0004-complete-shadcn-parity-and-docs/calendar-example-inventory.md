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
| `calendar-demo` | Renders a single-selection Calendar initialized to `new Date()`, updates selected date through React `useState`, uses `mode="single"`, `selected`, `onSelect`, `className="rounded-md border shadow-sm"`, and `captionLayout="dropdown"`. | `radcn/calendar` supports single selection through `selected`/`defaultSelected` ISO strings, default month, hidden input values, grid semantics, day accessible names, pointer and keyboard selection, month navigation, outside days, disabled dates, range state, multi-month rendering, public hooks, and custom `class`/`style`/token styling. Docs and fixtures currently prove generic Calendar behavior, selected state, custom tokens, and Date Picker composition, but do not prove this named upstream example id or caption dropdown behavior. | Partial | Add named docs, candidate fixture, and Playwright evidence for `calendar-demo`. Decide whether shadcn `captionLayout="dropdown"` maps to existing RadCN month navigation, a new package caption/dropdown API, or an intentional documented divergence. |
| `calendar-hijri` | Renders a Persian/Hijri calendar example using `react-day-picker/persian`, `Vazirmatn` from `next/font/google`, local example-only Calendar implementation, `defaultMonth`/`selected` initialized to `new Date(2025, 5, 12)`, React `useState`, `onSelect`, `className="rounded-lg border shadow-sm"`, `lucide-react` chevrons, RTL chevron styling, and Button styling. | Current RadCN Calendar renders Gregorian `Date` grids with English month/day labels and ISO `YYYY-MM-DD` values. It has strong grid, selection, navigation, disabled, range, multi-month, form, and token coverage, but no Persian calendar system, Hijri/Persian labels, RTL calendar mechanics, alternate `DayPicker` calendar adapter, or app-font example. No docs/fixture/Playwright evidence records `calendar-hijri` as supported or intentionally divergent. | Partial | Decide and document the Hijri outcome. If supported, add package/docs/fixture/test evidence for alternate calendar rendering without adopting React, `react-day-picker/persian`, `next/font`, or `lucide-react` as mandatory dependencies. If not supported, record an intentional divergence with a defensible Remix/web-first reason and docs guidance for app-owned alternate-calendar implementations. |

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
| Caption dropdown behavior | Partial | Upstream `calendar-demo` uses `captionLayout="dropdown"`. RadCN currently has text captions plus previous/next buttons, not month/year dropdown controls. |
| Persian/Hijri rendering | Missing or intentional divergence pending | Current Calendar renders Gregorian dates and English labels only. No Persian calendar API or documented divergence exists yet. |
| RTL behavior | Partial | RadCN uses plain previous/next buttons and can inherit document direction for layout, but no Calendar-specific RTL chevron or Persian calendar behavior is proven. |
| App-owned font styling | Supported as generic styling, not example-proven | `class`/`style` and CSS variables can carry app font choices, but `Vazirmatn`/Persian font guidance is not documented for Calendar. |
| Docs evidence | Partial | Docs have a generic Calendar preview, not named `calendar-demo` or `calendar-hijri` evidence. |
| Candidate fixture evidence | Partial | Fixture routes prove generic Calendar mechanics but not the two named upstream example ids. |
| Playwright evidence | Partial | `calendar-date-picker.spec.ts` proves broad Calendar mechanics but not named Calendar example parity or Hijri outcome. |

## Mapping Decisions

| Upstream mechanic | RadCN mapping |
| --- | --- |
| React `useState`, `selected`, and `onSelect` | Map to explicit `selected`/`defaultSelected` ISO props, native hidden inputs, and dependency-free browser enhancement events. |
| `mode="single"` | Preserve as `mode="single"` where needed; single mode is also RadCN's default. |
| `defaultMonth` | Map to ISO `defaultMonth`/`month` props such as `2026-06-01`. |
| `captionLayout="dropdown"` | Not currently equivalent. Follow-up must decide whether to add a caption dropdown API or document navigation buttons as the intentional RadCN mapping. |
| `className` and `classNames` | `className` maps to `class`; granular `classNames` maps to public `data-radcn-calendar-*` hooks, package classes, `style`, and CSS variables. |
| `data-slot` | Map to public `data-radcn-calendar-*` hooks. DOM attribute names may differ if behavior and customization remain equivalent. |
| cva, `cn`, Tailwind utilities | Implementation details only. RadCN owns package CSS and CSS variables instead of depending on these utilities. |
| `react-day-picker`, `DayPicker`, `DayButton`, `getDefaultClassNames` | Upstream implementation dependencies. RadCN currently owns dependency-free calendar rendering and enhancement. |
| `react-day-picker/persian` | Not a RadCN dependency. Its alternate calendar behavior is the key unresolved `calendar-hijri` outcome. |
| `buttonVariants` and Button composition | Upstream styling implementation. RadCN Calendar owns its own nav/day buttons; app composition can wrap Calendar where needed. |
| `ChevronDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `lucide-react` | App-owned icon presentation. RadCN must not add `lucide-react` as a Calendar dependency. |
| `next/font/google` and `Vazirmatn` | App/framework-owned font loading. RadCN should not depend on Next font APIs. |
| RTL chevron behavior | App-owned direction/icon presentation unless a concrete Calendar package behavior gap is proven. |
| Date Picker references | Separate resolved composition that reuses Calendar; not part of Calendar example parity rows. |
| Sidebar/block Calendar references | Out-of-cluster block usage; not part of this example audit. |
| Vendor source | Read-only reference. No RadCN package or app code may import from `vendor/`. |

## Decision

Calendar package mechanics are strong, but the active Calendar example cluster
is still partial. `calendar-demo` lacks named docs/fixture/Playwright proof and
needs an explicit decision for `captionLayout="dropdown"`. `calendar-hijri`
requires a product decision: implement alternate Persian/Hijri calendar support
in a dependency-free RadCN-appropriate way, or document it as an intentional
divergence with app-owned guidance. The next experiment should resolve these
two example outcomes without adding React, `react-day-picker`,
`react-day-picker/persian`, `next/font`, `lucide-react`, Tailwind, or vendor
dependencies.
