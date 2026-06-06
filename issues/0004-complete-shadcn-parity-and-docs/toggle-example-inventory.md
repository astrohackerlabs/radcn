# Toggle Example Parity Inventory

Experiment 33 audits the 6 plain upstream shadcn/ui Toggle examples against the
current RadCN `Toggle` package, docs, fixtures, and Playwright evidence. This is
an audit only; it does not implement Toggle changes.

## Summary

RadCN `Toggle` is a dependency-free native button primitive with `aria-pressed`,
`data-state`, disabled state, `ariaLabel`, `size="sm"`, `size="lg"`,
`variant="outline"`, custom class/style hooks, and browser enhancement that
updates pressed state on pointer and keyboard activation.

Toggle example parity is not complete. The package behavior needed by the
upstream examples mostly exists, but the current proof is general Toggle
coverage (`default`, `pressed`, `disabled`, `variants-sizes`, and
`custom-token`) rather than named docs, fixture, and Playwright proof for the 6
upstream example ids. The likely implementation gap is selected-state icon
styling for the `toggle-demo` bookmark example; that should remain app-authored
CSS/class styling and should not add lucide, Radix Toggle, Tailwind, or vendor
dependencies.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/toggle.tsx` | Native button with `ariaLabel`, disabled, pressed/default state, `size`, `variant`, class/style hooks, and `enhanceToggle` state updates |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Toggle base, default/outline variants, sm/lg sizes, disabled state, pressed state, focus-visible, and custom token hooks |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Seed Toggle docs route generated from the public component spec; not a rich named-example parity page yet |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx` | General Toggle routes for default, pressed, disabled, variants/sizes, and custom token behavior |
| Playwright | `radcn/fixtures/tests/toggle.spec.ts` | General Toggle behavior checks for button semantics, pointer/keyboard state changes, disabled state, size/variant classes, and custom tokens |

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
| `toggle-demo` | Small outline bookmark toggle with icon, visible "Bookmark" text, accessible label, and selected-state icon color/fill styling. | `<Toggle aria-label="Toggle bookmark" size="sm" variant="outline" className="data-[state=on]:...">` with lucide `BookmarkIcon`. | `Toggle` supports `ariaLabel`, `size="sm"`, `variant="outline"`, text children, class hooks, and `data-state`; fixture tests prove size/variant/state generally. No named bookmark demo route or selected-state icon styling proof exists. | Partial | Add named docs/fixture/Playwright proof for small outline icon-plus-text toggle and app-authored selected-state icon styling. |
| `toggle-disabled` | Disabled icon-only underline toggle with accessible label. | `<Toggle aria-label="Toggle italic" disabled>` with lucide `Underline`. | `Toggle` supports `ariaLabel` and `disabled`; fixture tests prove disabled behavior generally. No named upstream disabled icon-only docs/fixture proof exists. | Partial | Add named docs/fixture/Playwright proof for disabled icon-only toggle with accessible name. |
| `toggle-lg` | Large icon-only italic toggle with accessible label. | `<Toggle size="lg" aria-label="Toggle italic">` with lucide `Italic`. | `Toggle` supports `size="lg"` and `ariaLabel`; fixture tests prove lg class sizing generally. No named upstream large icon-only docs/fixture proof exists. | Partial | Add named docs/fixture/Playwright proof for large icon-only toggle. |
| `toggle-outline` | Outline icon-only italic toggle with accessible label. | `<Toggle variant="outline" aria-label="Toggle italic">` with lucide `Italic`. | `Toggle` supports `variant="outline"` and `ariaLabel`; fixture tests prove outline variant generally. No named upstream outline icon-only docs/fixture proof exists. | Partial | Add named docs/fixture/Playwright proof for outline icon-only toggle. |
| `toggle-sm` | Small icon-only italic toggle with accessible label. | `<Toggle size="sm" aria-label="Toggle italic">` with lucide `Italic`. | `Toggle` supports `size="sm"` and `ariaLabel`; fixture tests prove sm class sizing generally. No named upstream small icon-only docs/fixture proof exists. | Partial | Add named docs/fixture/Playwright proof for small icon-only toggle. |
| `toggle-with-text` | Default icon plus visible "Italic" text with accessible label. | `<Toggle aria-label="Toggle italic">` with lucide `Italic` and text `Italic`. | `Toggle` supports `ariaLabel`, text children, and arbitrary children; fixture default routes prove text children generally. No named upstream icon-plus-text docs/fixture proof exists. | Partial | Add named docs/fixture/Playwright proof for icon plus text toggle. |

## Outcome

Toggle example parity is not complete.

The next implementation cluster should be **Toggle example parity depth**. It
should add named docs examples, candidate fixture routes, and Playwright
coverage for all 6 upstream examples. It should preserve the dependency-free
native button model, keep lucide/Radix/Tailwind as documented mappings, prove
app-authored selected-state icon styling through `data-state`, and avoid
touching `toggle-group`.
