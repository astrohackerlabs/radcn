# Toggle Example Parity Inventory

Experiment 33 audits the 6 plain upstream shadcn/ui Toggle examples against the
current RadCN `Toggle` package, docs, fixtures, and Playwright evidence. This is
an audit only; it does not implement Toggle changes.

## Summary

RadCN `Toggle` is a dependency-free native button primitive with `aria-pressed`,
`data-state`, disabled state, `ariaLabel`, `size="sm"`, `size="lg"`,
`variant="outline"`, custom class/style hooks, and browser enhancement that
updates pressed state on pointer and keyboard activation.

Toggle example parity is complete for the 6 plain upstream Toggle examples.
Experiment 34 added named docs examples, candidate fixture routes, Playwright
proof, and app-authored selected-state icon styling for the bookmark demo while
preserving the dependency-free native button model.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/toggle.tsx` | Native button with `ariaLabel`, disabled, pressed/default state, `size`, `variant`, class/style hooks, and `enhanceToggle` state updates |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Toggle base, default/outline variants, sm/lg sizes, disabled state, pressed state, focus-visible, and custom token hooks |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Rich Toggle docs page with all 6 named plain Toggle examples, package-imported `Toggle`, app-owned icons, and divergence notes |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx` | Focused Toggle routes for demo, disabled, lg, outline, sm, and with-text examples plus existing general routes |
| Playwright | `radcn/fixtures/tests/toggle.spec.ts` | General Toggle behavior checks plus focused parity checks for all 6 upstream plain Toggle examples |

## Mapping Decisions

- shadcn's Radix Toggle primitive maps to RadCN's native `<button
  aria-pressed>` plus `enhanceToggle`; do not add Radix as a dependency.
- lucide icons are app presentation. Docs and fixtures can use text glyphs,
  inline spans, package-agnostic app icons, or future app-owned SVGs without
  changing `radcn/toggle`.
- Tailwind utility classes such as `data-[state=on]:*:[svg]:fill-blue-500`
  map to RadCN classes, `data-state`, app CSS, inline style variables, or
  fixture/docs styling hooks.
- Icon-only toggles need accessible names through `ariaLabel`.
- Icon plus text toggles should keep visible text as part of the button
  content while any icon remains decorative with `aria-hidden="true"`.
- Size and variant parity belongs to `Toggle` props and classes, which already
  exist.
- Disabled behavior belongs to native disabled buttons plus `aria-disabled` and
  `data-disabled`, which already exist.
- Selected-state icon styling should be proven through app-authored CSS that
  targets `data-state="on"`; it should not become icon-package-specific package
  behavior.

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `toggle-demo` | Small outline bookmark toggle with icon, visible "Bookmark" text, accessible label, and selected-state icon color/fill styling. | `<Toggle aria-label="Toggle bookmark" size="sm" variant="outline" className="data-[state=on]:...">` with lucide `BookmarkIcon`. | Docs render `data-radcn-docs-toggle-family="toggle-demo"`; candidate route `/fixtures/toggle/demo` renders small outline bookmark toggle with app-owned icon; `toggle.spec.ts` verifies label, size, variant, text, decorative icon, press state, and selected-state icon styling. | Covered | Covered by Experiment 34. |
| `toggle-disabled` | Disabled icon-only underline toggle with accessible label. | `<Toggle aria-label="Toggle italic" disabled>` with lucide `Underline`. | Docs render `data-radcn-docs-toggle-family="toggle-disabled"`; candidate route `/fixtures/toggle/disabled` renders disabled icon-only toggle; `toggle.spec.ts` verifies disabled state, `aria-disabled`, accessible name, and decorative icon. | Covered | Covered by Experiment 34. |
| `toggle-lg` | Large icon-only italic toggle with accessible label. | `<Toggle size="lg" aria-label="Toggle italic">` with lucide `Italic`. | Docs render `data-radcn-docs-toggle-family="toggle-lg"`; candidate route `/fixtures/toggle/lg` renders large icon-only toggle; `toggle.spec.ts` verifies accessible name, lg class, and large sizing. | Covered | Covered by Experiment 34. |
| `toggle-outline` | Outline icon-only italic toggle with accessible label. | `<Toggle variant="outline" aria-label="Toggle italic">` with lucide `Italic`. | Docs render `data-radcn-docs-toggle-family="toggle-outline"`; candidate route `/fixtures/toggle/outline` renders outline icon-only toggle; `toggle.spec.ts` verifies accessible name, outline variant hook, and outline class. | Covered | Covered by Experiment 34. |
| `toggle-sm` | Small icon-only italic toggle with accessible label. | `<Toggle size="sm" aria-label="Toggle italic">` with lucide `Italic`. | Docs render `data-radcn-docs-toggle-family="toggle-sm"`; candidate route `/fixtures/toggle/sm` renders small icon-only toggle; `toggle.spec.ts` verifies accessible name, sm class, and small sizing. | Covered | Covered by Experiment 34. |
| `toggle-with-text` | Default icon plus visible "Italic" text with accessible label. | `<Toggle aria-label="Toggle italic">` with lucide `Italic` and text `Italic`. | Docs render `data-radcn-docs-toggle-family="toggle-with-text"`; candidate route `/fixtures/toggle/with-text` renders icon plus visible text; `toggle.spec.ts` verifies accessible name, visible text, and decorative icon. | Covered | Covered by Experiment 34. |

## Outcome

Toggle example parity is complete for the 6 plain upstream Toggle examples.

Experiment 34 added named docs examples, candidate fixture routes, and
Playwright coverage for all 6 upstream examples. It preserved the
dependency-free native button model, kept lucide/Radix/Tailwind as documented
mappings, proved app-authored selected-state icon styling through `data-state`,
and avoided changing `toggle-group`.
