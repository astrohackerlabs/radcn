# Slider Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Slider example, `slider-demo`.
RadCN already has a strong native range-slider substrate and broad fixture
coverage for value hooks, min/max/step, keyboard behavior, disabled state,
form submit/reset behavior, custom tokens, track/range/thumb hooks, and
percent-based visual state.

The current outcome is `Covered`. Experiment 113 added named `slider-demo`
parity across the docs page, candidate fixture route, and Playwright coverage.

Current RadCN evidence compared in this audit:

- `radcn/packages/radcn/src/components/slider.tsx` exports the package
  component, props, enhancer, native range input, value metadata, percent sync,
  and root/input/track/range/thumb hooks.
- `radcn/packages/radcn/src/styles/tokens.css` defines `.radcn-slider`,
  `.radcn-slider-input`, `.radcn-slider-track`, `.radcn-slider-range`,
  `.radcn-slider-thumb`, and custom slider token styling.
- `radcn/packages/radcn/src/index.ts` re-exports Slider.
- `radcn/packages/radcn/package.json` exposes the `./slider` package subpath.
- `radcn/apps/docs/app/content/components.tsx` includes a named
  `slider-demo` rich docs example with default value 50, max 100, step 1,
  60% width mapping, source snippet, public hooks, and dependency-divergence
  copy.
- `radcn/apps/docs/tests/coverage.spec.ts` checks named `slider-demo` docs
  parity, public hooks, value/min/max/step/orientation metadata, width mapping,
  source snippet, and divergence copy.
- `radcn/fixtures/scenarios/index.ts` lists the named `demo` route plus
  generic Slider scenarios for default, value, disabled, step, custom-token,
  and form-submit-reset.
- `radcn/fixtures/candidate-remix/app/fixtures/slider.tsx` renders the named
  `demo` route and the generic Slider fixture scenarios.
- `radcn/fixtures/tests/slider.spec.ts` asserts native Slider behavior,
  value hooks, keyboard behavior, disabled state, form submit/reset behavior,
  custom-token behavior, and named `slider-demo` parity.
- `radcn/fixtures/tests/native-state.spec.ts` currently has no
  Slider-specific assertions.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `slider-demo` | Renders `SliderDemo({ className, ...props }: SliderProps)` where `SliderProps` is `React.ComponentProps<typeof Slider>`. The demo renders `<Slider defaultValue={[50]} max={100} step={1} className={cn("w-[60%]", className)} {...props} />`. Upstream package mechanics include `"use client"`, React props, React `useMemo`, Radix Slider primitive, `SliderPrimitive.Root`, `SliderPrimitive.Track`, `SliderPrimitive.Range`, `SliderPrimitive.Thumb`, single-thumb array value behavior, default min/max behavior, horizontal orientation, disabled styling, `data-slot`, `className`, Tailwind utilities, `cn`, browser range behavior, custom tokens, and vendor source. | RadCN exports a dependency-free `Slider` backed by a native `<input type="range">`. It accepts scalar `defaultValue`, `value`, `min`, `max`, `step`, `disabled`, `name`, `id`, `ariaLabel`, `class`, and `style`; emits root/input/track/range/thumb hooks; records `data-value`, `data-min`, `data-max`, `data-step`, and `data-orientation="horizontal"`; and uses `--radcn-slider-percent` for visual range/thumb position. Named docs and candidate fixtures now render `slider-demo` with value 50, min 0, max 100, step 1, horizontal orientation, `class="w-[60%]"`, `style="width:60%;"`, and public root/input/track/range/thumb hooks. `radcn/apps/docs/tests/coverage.spec.ts` proves the docs source snippet and dependency-divergence copy. `radcn/fixtures/tests/slider.spec.ts` proves the named fixture route, native range semantics, 60% width evidence, percent state, input updates, keyboard behavior, disabled behavior, form submit/reset behavior, and custom tokens. `radcn/fixtures/tests/native-state.spec.ts` remains non-Slider-specific by design. | Covered | No follow-up. |

## Decisions

- React non-dependency: RadCN should not import React, `React.ComponentProps`,
  or `useMemo`. The equivalent author-facing surface is explicit Remix UI
  props and browser-native range behavior.
- Radix non-dependency: RadCN should not import `radix-ui` or
  `SliderPrimitive.*`. Radix Root, Track, Range, and Thumb map to RadCN root,
  native input, track, range, and thumb hooks; track/range/thumb behavior stays
  testable through public data hooks and CSS variables.
- Upstream `defaultValue={[50]}` maps to RadCN scalar `defaultValue={50}` on a
  native range input, because RadCN currently supports a single-thumb Slider.
- Upstream `max={100}` and `step={1}` map directly to native range attributes
  and root `data-max`/`data-step` hooks.
- Upstream default min behavior maps to RadCN's `min = 0` default and
  `data-min="0"`.
- Upstream `className={cn("w-[60%]", className)}` should map to `class` plus
  explicit 60% width style evidence. `cn` maps to explicit class composition,
  not a runtime dependency.
- Upstream `{...props}` maps to explicit documented customization for
  `ariaLabel`, `class`, `style`, `id`, `name`, `defaultValue`, `value`, `min`,
  `max`, `step`, and `disabled`.
- Upstream `data-slot` maps to public `data-radcn-slider`,
  `data-radcn-slider-input`, `data-radcn-slider-track`,
  `data-radcn-slider-range`, and `data-radcn-slider-thumb` hooks.
- Tailwind width, flex, touch, select, disabled, orientation, track, range,
  thumb, border, focus, hover, transition, and sizing utilities map to package
  CSS, classes, style, CSS variables, and app-owned CSS.
- Browser range behavior is behavior-level parity, not literal Radix DOM
  equality: the native input owns value, keyboard, form, disabled, and reset
  behavior while RadCN mirrors visual state through `--radcn-slider-percent`.
- Custom tokens map through Slider CSS variables and are already covered by
  `radcn-fixture-custom-slider`.
- Vendor source remains a reference only. The next implementation should not
  commit vendored shadcn source or add runtime dependencies on React, Radix, or
  Tailwind.
