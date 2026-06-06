# Separator Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Separator example,
`separator-demo`. RadCN already has the package API and styling substrate for
horizontal and vertical separators, including decorative and semantic modes,
but the current docs and fixture evidence does not prove the exact upstream
demo composition.

The current outcome is `Partial`. The next experiment should add named
`separator-demo` parity across the docs page, candidate fixture route, and
Playwright coverage before marking Separator resolved.

Current RadCN evidence compared in this audit:

- `radcn/packages/radcn/src/components/separator.tsx` exports the package
  component, props, default orientation/decorative behavior, role mapping,
  `aria-orientation`, `data-radcn-separator`, and `data-orientation`.
- `radcn/packages/radcn/src/styles/tokens.css` defines `.radcn-separator`,
  `.radcn-separator--horizontal`, `.radcn-separator--vertical`, and
  `--radcn-border` token styling.
- `radcn/packages/radcn/src/index.ts` re-exports `Separator`,
  `SeparatorOrientation`, and `SeparatorProps`.
- `radcn/packages/radcn/package.json` exposes the `./separator` package
  subpath.
- `radcn/apps/docs/app/content/components.tsx` includes the generic Separator
  docs route and preview seed, but not a named `separator-demo`.
- `radcn/apps/docs/tests/coverage.spec.ts` checks only generic docs hook
  presence for `[data-radcn-separator]`, not named `separator-demo` parity.
- `radcn/fixtures/scenarios/index.ts` lists a `separator/orientations`
  scenario.
- `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx` does not
  currently render a Separator fixture route.
- `radcn/fixtures/tests/native-state.spec.ts` does not currently assert
  Separator fixture behavior.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `separator-demo` | Renders a text block with heading `Radix Primitives` and description `An open-source UI component library.`, then a horizontal separator with `className="my-4"`, then an inline row with `Blog`, `Docs`, and `Source` separated by two vertical separators. The row uses `flex h-5 items-center space-x-4 text-sm`. Upstream package mechanics include `"use client"`, React component props, Radix Separator primitive, `SeparatorPrimitive.Root`, default `orientation="horizontal"`, default `decorative={true}`, `className`, Tailwind utilities, `cn`, `data-slot="separator"`, `data-orientation`, horizontal sizing, vertical sizing, decorative separator behavior, semantic separator behavior, browser accessibility behavior, custom tokens through border color, and vendor source. | RadCN exports `Separator` from `radcn/separator` and the package manifest exposes `./separator`. The component is dependency-free, accepts `class`, `decorative`, `orientation`, and `style`, emits `data-radcn-separator` and `data-orientation`, defaults to horizontal/decorative, uses `role="none"` for decorative separators and `role="separator"` plus `aria-orientation` when semantic, and styles `.radcn-separator--horizontal` as full-width 1px and `.radcn-separator--vertical` as 1px with stretched block size through `--radcn-border`. The docs registry has a generic Separator route and preview seed, and docs coverage has only generic hook presence for `[data-radcn-separator]`. `radcn/fixtures/scenarios/index.ts` lists `separator/orientations`, but `native-state.tsx` and `native-state.spec.ts` do not currently render or assert a Separator fixture route. No current named docs, fixture, or Playwright evidence proves the exact upstream heading, description, `my-4` horizontal separator, inline `Blog`/`Docs`/`Source` row, or two vertical separators. | Partial | Add named `separator-demo` docs, candidate fixture, and Playwright evidence. The implementation should preserve the exact upstream text and three-label row, prove one horizontal and two vertical `Separator` instances, verify `data-orientation`, decorative default behavior, semantic opt-in coverage or an explicit existing fixture reference, row layout mapping for `flex h-5 items-center space-x-4 text-sm`, source snippet, and mapping copy for React/Radix/className/Tailwind/cn/data-slot/vendor divergences. |

## Decisions

- React non-dependency: RadCN should not import React or implement React
  component props. The author-facing equivalent is Remix UI handles and plain
  web markup.
- Radix non-dependency: RadCN should not import `radix-ui` or
  `SeparatorPrimitive.Root`. The package owns the minimal separator markup
  directly.
- `orientation="horizontal"` maps to RadCN's default `orientation =
  'horizontal'`, `data-orientation="horizontal"`, and
  `.radcn-separator--horizontal`.
- Upstream vertical separators map to `orientation="vertical"`,
  `data-orientation="vertical"`, and `.radcn-separator--vertical`.
- Upstream `decorative={true}` maps to RadCN's default `decorative = true` and
  `role="none"`. Semantic separator behavior remains available through
  `decorative={false}`, which emits `role="separator"` and `aria-orientation`.
- Upstream `className="my-4"` and row classes
  `flex h-5 items-center space-x-4 text-sm` should be represented through
  RadCN docs/fixture class and style evidence, not through Tailwind as a
  runtime dependency.
- `className` maps to the RadCN `class` prop. `cn` maps to RadCN's `classes`
  helper internally.
- Upstream `data-slot="separator"` maps to RadCN public hooks:
  `data-radcn-separator` and `data-orientation`.
- The heading `Radix Primitives`, description
  `An open-source UI component library.`, and row labels `Blog`, `Docs`, and
  `Source` are user-facing demo content and should be preserved in the named
  example.
- Custom tokens map through `--radcn-border` and component styles in
  `radcn/packages/radcn/src/styles/tokens.css`.
- Browser accessibility behavior is behavior-level parity, not DOM equality:
  decorative separators may be hidden from assistive separator semantics, while
  semantic separators must expose separator role and orientation.
- Vendor source remains a reference only. The next implementation should not
  commit vendored shadcn source or add runtime dependencies on React, Radix, or
  Tailwind.
