# Mode Toggle Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct `mode-toggle` example. It is an
application theme recipe, not a `ui/` package component.

RadCN should not add a `radcn/mode-toggle` package export for this row. The
current docs app already owns theme selection as app-shell behavior: it renders
a visible three-option `System`/`Light`/`Dark` control, defaults to `system`,
resolves the system preference to package tokens on the document, persists user
overrides, follows system changes when in system mode, migrates legacy storage,
uses `lucide-static` icons, and has Playwright coverage.

The upstream dropdown icon-button shape is an intentional divergence. RadCN's
theme-mode outcome is a docs app-shell recipe/pattern, not a reusable package
API and not a React/`next-themes` port.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `mode-toggle` | Renders a compact outline icon button with an accessible `Toggle theme` label. The button animates `Sun` and `Moon` `lucide-react` icons with Tailwind `className` utilities, opens a `DropdownMenu`, and exposes `Light`, `Dark`, and `System` `DropdownMenuItem` actions that call `setTheme` from `next-themes`. The file is a `"use client"` React component and imports `Button`, `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, and `DropdownMenuItem` from shadcn/ui. Vendor source: `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/mode-toggle.tsx`. | The docs shell renders a visible `role="radiogroup"` named `Theme` with `System`, `Light`, and `Dark` radio buttons in `radcn/apps/docs/app/ui/docs-pages.tsx`. `radcn/apps/docs/app/ui/document.tsx` sets initial `data-radcn-theme-mode`, resolved `data-radcn-theme`, and `colorScheme` before app code runs. `radcn/apps/docs/app/assets/entry.ts` applies clicks and keyboard navigation, persists `radcn-theme-mode`, removes legacy `radcn-theme`, follows `prefers-color-scheme` changes while in system mode, and updates `aria-checked`, `data-active`, and tab order. `radcn/apps/docs/app/ui/icons.tsx` uses `lucide-static` `Monitor`, `Sun`, and `Moon` SVGs. `radcn/apps/docs/tests/theme-mode.spec.ts` verifies default system light/dark resolution, light and dark overrides, persistence, returning to system, following system changes, absence of legacy `[data-radcn-theme-toggle]`, and Lucide icon rendering. `radcn/packages/radcn/src/styles/tokens.css` binds package tokens to `[data-radcn-theme="dark"]`. `radcn/packages/radcn/package.json` has no `next-themes` or `lucide-react` dependency; `radcn/apps/docs/package.json` depends on `lucide-static`, `radcn`, and `remix` only. Component docs in `radcn/apps/docs/app/content/components.tsx` explain theme-scoped styling and dark-mode behavior on package examples. | Intentional divergence | Resolve as a docs app-shell theme-mode recipe. No package export, `next-themes`, `lucide-react`, or dropdown icon-button implementation is needed unless a future docs-design issue explicitly asks for an alternate compact theme picker. |

## Decisions

- `"use client"`: intentionally not portable as a RadCN requirement. The docs
  app uses a Remix 3 browser entry and an inline initial theme script instead
  of a React client component.
- React: not required. Theme mode state is document state plus browser events.
- `next-themes`: not added. RadCN stores `radcn-theme-mode`, resolves
  `system` with `matchMedia('(prefers-color-scheme: dark)')`, and writes
  concrete document theme data.
- `useTheme` and `setTheme`: map to `safeStoredThemeMode`, `applyThemeMode`,
  and click/keyboard event handling in the docs browser entry.
- `lucide-react`: not added. The docs app uses `lucide-static` so icons are
  plain SVG strings that work in Remix UI modules without React components.
- `Sun` and `Moon`: present through `SunIcon` and `MoonIcon`; RadCN also uses
  `MonitorIcon` because the required default mode is `system`.
- `Button`: upstream uses the shadcn `Button` only as the dropdown trigger.
  RadCN does not need a package button for the docs shell's theme control.
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, and
  `DropdownMenuItem`: intentionally not used for the docs shell theme picker.
  The visible three-option control is clearer for the RadCN requirement and
  avoids hiding `system` behind a toggle-style affordance.
- Visible three-option control versus dropdown icon-button control: RadCN keeps
  the visible `System`/`Light`/`Dark` radiogroup as the canonical docs-site
  outcome.
- Default `system` mode: covered by initial document markup, initial script,
  browser entry setup, and Playwright light/dark system default tests.
- Explicit `light`/`dark` override: covered by click behavior, persistence,
  reload tests, and `data-radcn-theme-mode`/`data-radcn-theme` assertions.
- System preference following: covered by the media-query change listener and
  Playwright test that returns to system and follows a changed system scheme.
- Persistence: covered by `localStorage.setItem('radcn-theme-mode', mode)` and
  reload tests.
- Legacy storage migration: covered by removing `radcn-theme` when persisting a
  valid mode and reading legacy `radcn-theme` only as a fallback.
- Document `data-radcn-theme-mode`: source of the user preference.
- Document `data-radcn-theme`: source of resolved package token theme.
- Color scheme: written to `document.documentElement.style.colorScheme` and
  declared in package tokens.
- Accessible names and roles: covered by `role="radiogroup"` named `Theme`,
  `role="radio"` buttons, and `aria-checked` state.
- Keyboard behavior: covered by Arrow, Home, and End behavior in the browser
  entry; the control updates focus and selected state without a dropdown.
- Icon presentation: `Monitor`, `Sun`, and `Moon` are decorative SVG icons
  inside named radio buttons. No icon-only accessible label is needed because
  each option has visible text.
- `className`: not a required package mechanism for this recipe. Styling is
  authored in Remix UI `css` mixins in the docs app.
- Tailwind utilities: map to docs-owned styles and RadCN document tokens rather
  than Tailwind classes.
- `cn`: not required because this recipe is docs-app owned, not a generated
  React component.
- Docs evidence: the theme-mode control is in the top-level docs shell and the
  component-page Theming section documents `data-radcn-theme-mode` and
  `data-radcn-theme`.
- Playwright evidence: `radcn/apps/docs/tests/theme-mode.spec.ts` exercises the
  behavior that matters to users.
- Custom tokens: RadCN package CSS reads document-scoped tokens, so apps can
  customize theme variables independently of the control shape.
- Vendor source: the upstream reference is recorded as
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/mode-toggle.tsx`.
