# Radio Group Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Radio Group example:
`radio-group-demo`.

RadCN ships strong Radio Group substrate: dependency-free native radio inputs,
a radiogroup wrapper, checked and unchecked state hooks, disabled and invalid
state support, form submission/reset behavior, custom-token fixtures, generic
docs coverage, and Playwright coverage.

The direct upstream example is partial. Current evidence proves general Radio
Group behavior and modifiability, but it does not prove a named
`radio-group-demo` docs/fixture/test surface for the upstream
`defaultValue="comfortable"` three-option composition with ids `r1`, `r2`,
`r3`, labels `Default`, `Comfortable`, and `Compact`, and row layout mapping.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `radio-group-demo` | Renders `RadioGroup defaultValue="comfortable"` with three rows using `className="flex items-center gap-3"`. The rows contain `RadioGroupItem value="default" id="r1"` with `Label htmlFor="r1"` text `Default`, `RadioGroupItem value="comfortable" id="r2"` with `Label htmlFor="r2"` text `Comfortable`, and `RadioGroupItem value="compact" id="r3"` with `Label htmlFor="r3"` text `Compact`. Upstream package mechanics include `"use client"`, React component props, Radix Radio Group primitive, `RadioGroupPrimitive.Root`, `RadioGroupPrimitive.Item`, `RadioGroupPrimitive.Indicator`, lucide `CircleIcon`, `className`, Tailwind utilities, `cn`, `data-slot`, checked/default state, disabled/invalid styling, browser radio behavior, custom tokens, Label composition, and vendor source. | `radcn/packages/radcn/src/components/radio-group.tsx` exports dependency-free `RadioGroup` and `RadioGroupItem`. It renders a `role="radiogroup"` wrapper with public group hooks and native radio inputs inside item wrappers with checked/unchecked data-state, disabled, invalid, required, name, value, id, indicator, and native browser selection behavior. `radcn/packages/radcn/src/index.ts` exports the API and `radcn/packages/radcn/package.json` has no React, Radix, lucide, Tailwind, or `class-variance-authority` dependency. Package CSS in `radcn/packages/radcn/src/styles/tokens.css` provides radio group, item, input, indicator, checked, disabled, invalid, and custom-token hooks. `radcn/apps/docs/app/content/components.tsx` currently renders generic Radio Group docs with `System`, `Light`, and `Dark`, plus form examples elsewhere, but no named `radio-group-demo`, no `Default`/`Comfortable`/`Compact` set, no ids `r1`/`r2`/`r3`, and no explicit `comfortable` default mapping. `radcn/apps/docs/tests/coverage.spec.ts` verifies general docs route coverage but not the exact upstream demo. `radcn/fixtures/scenarios/index.ts` lists default, disabled, invalid, custom-token, and form-submit-reset Radio Group scenarios. `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx` renders generic priority/theme/contact examples. `radcn/fixtures/tests/native-state.spec.ts` verifies radiogroup role, native input name/value behavior, checked changes, disabled state, invalid state, form reset/submit, and custom-token styling, but not a named `radio-group/demo` route matching the upstream three-option composition. | Partial | Add named `radio-group-demo` docs and candidate fixture evidence. The next experiment should render the exact `Default`, `Comfortable`, and `Compact` rows, map `defaultValue="comfortable"` to the checked `comfortable` native radio, preserve ids `r1`, `r2`, and `r3` where appropriate, prove labels are associated with inputs, verify row layout, public hooks, native selection behavior, source snippet, mapping copy, and preserve existing disabled, invalid, form, and custom-token coverage. |

## Decisions

- `"use client"`: not required. RadCN Radio Group renders native radio markup
  that works without React.
- React component props: map to explicit Remix UI props on `RadioGroup` and
  `RadioGroupItem`.
- Radix Radio Group primitive: not a dependency. Radix root, item, and
  indicator behavior maps to RadCN wrapper, native inputs, item wrappers, and
  public data hooks.
- `RadioGroupPrimitive.Root`: maps to `data-radcn-radio-group` with
  `role="radiogroup"`, shared `name`, and native input children.
- `RadioGroupPrimitive.Item`: maps to `RadioGroupItem`, which renders a native
  radio input inside a styled item wrapper.
- `RadioGroupPrimitive.Indicator`: maps to `data-radcn-radio-indicator`.
- lucide `CircleIcon`: maps to CSS indicator presentation; lucide is not a
  RadCN dependency.
- `defaultValue="comfortable"`: should map to the `comfortable` radio item
  being checked in server-rendered markup.
- ids `r1`, `r2`, and `r3`: should be preserved or explicitly namespaced in
  named docs/fixture demos while keeping label associations exact.
- values `default`, `comfortable`, and `compact`: should be preserved in named
  docs/fixture demos.
- Labels `Default`, `Comfortable`, and `Compact`: should be preserved exactly.
- Row layout: upstream `flex items-center gap-3` maps to class/style/CSS
  evidence in the named demo.
- `className`: maps to `class`.
- Tailwind utilities: map to package CSS, classes, CSS variables, inline
  styles, and app-owned styles rather than a Tailwind dependency.
- `cn`: not needed as a package dependency; class composition is explicit.
- `data-slot`: maps to RadCN public `data-radcn-radio*` hooks.
- Checked/default state: current package uses native checked radio inputs and
  wrapper data-state hooks.
- Disabled/invalid behavior: existing fixtures cover disabled and invalid
  radio states and should remain intact.
- Browser radio behavior: existing tests cover native checking and unchecking
  across a group; named demo should add exact upstream option coverage.
- Custom tokens: existing custom-token fixture and CSS evidence should remain
  intact when the named demo is added.
- Label composition: upstream `Label htmlFor` maps to RadCN `Label for` or
  equivalent native label associations.
- Vendor source: the upstream references are
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/radio-group-demo.tsx`
  and `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/radio-group.tsx`.
