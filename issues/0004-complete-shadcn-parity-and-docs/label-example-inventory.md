# Label Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Label example through the
examples registry by filename/inferred-cluster ownership: `label-demo`. The registry entry has
`type: "registry:example"`, `registryDependencies: ["label"]`, and file path
`examples/label-demo.tsx`.

Several other upstream examples include `label` in `registryDependencies`, but
their primary example clusters are `input`, `textarea`, `dropdown-menu`,
`card`, `kbd`, or `input-group`. They are not direct rows for this Label
example inventory.

RadCN already ships `radcn/label` as a dependency-free native label primitive
with package exports, `for` wiring, disabled state, package classes, public
hooks, and broad composition evidence through forms, inputs, checkboxes,
dialogs, drawers, sheets, and input groups. Existing Checkbox docs and
candidate fixtures already prove the exact visible label text
`Accept terms and conditions`, native click-to-toggle behavior, and a
Label/Checkbox composition. The direct Label example is still not covered as a
named `label-demo` outcome on the Label docs/fixture/test surface.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `label-demo` | Renders a React client component using shadcn `Checkbox` and `Label`. The example has a wrapper `div`, an inner `div className="flex items-center space-x-2"`, `Checkbox id="terms"`, `Label htmlFor="terms"`, and visible text `Accept terms and conditions`. The upstream Label package is a `"use client"` wrapper around Radix LabelPrimitive Root, emits `data-slot="label"`, and maps `className` through `cn` over Tailwind classes `flex`, `items-center`, `gap-2`, `text-sm`, `leading-none`, `font-medium`, `select-none`, `group-data-[disabled=true]:pointer-events-none`, `group-data-[disabled=true]:opacity-50`, `peer-disabled:cursor-not-allowed`, and `peer-disabled:opacity-50`. | `radcn/packages/radcn/src/components/label.tsx` exports `Label` as native `<label>` markup with `for`, `disabled`, `class`, `style`, `data-disabled`, and `data-radcn-label`. `radcn/packages/radcn/src/components/checkbox.tsx` provides the native checkbox primitive needed for the upstream composition. `radcn/packages/radcn/src/styles/tokens.css` styles `.radcn-label` with foreground color, medium 0.875rem typography, disabled muted state, and invalid form/field integration. `radcn/packages/radcn/src/index.ts` and `radcn/packages/radcn/package.json` export `radcn/label`. `radcn/apps/docs/app/content/components.tsx` has Label docs and multiple composed Label usages; Checkbox docs render `Checkbox id="terms"` with `Label for="terms">Accept terms and conditions</Label>`, and richer docs examples render disabled label and description variants. `radcn/apps/docs/tests/coverage.spec.ts` verifies generic Label route rendering and multiple Label compositions, but not a named Label page `label-demo`. `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx` renders Checkbox/Label compositions with exact `Accept terms and conditions` text, and `radcn/fixtures/tests/native-state.spec.ts` verifies native label activation by clicking `label[for="candidate-checkbox-terms"]` and observing the checkbox become checked. Current fixture scenarios do not include a named `label/demo` route. | Partial | Implement named `label-demo` docs, candidate fixture, and Playwright coverage for the exact upstream Checkbox/Label composition. Verify `Checkbox id="terms"` or a stable equivalent, `Label for="terms"`, visible text `Accept terms and conditions`, flex/spacing layout evidence, public Label and Checkbox hooks, native label click activation, disabled/peer-disabled mapping copy, and React/Radix/`htmlFor`/`className`/Tailwind/`cn`/`data-slot`/vendor-source mapping. |

## Decisions

- `label-demo` is a direct upstream example because `_registry.ts` registers it
  as `type: "registry:example"` with name prefix `label-` and
  `registryDependencies: ["label"]`.
- Other examples that depend on `label` are handled by their own primary
  filename/inferred clusters and are intentionally not counted as direct Label
  rows here.
- React client component mechanics map to server-rendered native label and
  checkbox markup. No React dependency is needed.
- Radix Label remains a non-dependency. Native `<label for>` semantics provide
  the user-facing association and click activation.
- Upstream `htmlFor` maps to RadCN's `for` prop because Remix UI emits native
  attributes rather than React DOM prop names.
- Upstream `Checkbox id="terms"` maps to the existing RadCN Checkbox primitive
  with a stable id and native input semantics.
- Upstream `Label htmlFor="terms"` maps to `Label for="terms"` and native
  label activation.
- Upstream wrapper `flex items-center space-x-2` maps to app-owned class/style
  layout around RadCN primitives.
- Upstream Label's package-owned `flex`, `items-center`, `gap-2`, `text-sm`,
  `leading-none`, `font-medium`, and `select-none` styling mostly maps to
  RadCN package CSS and explicit app layout. The named follow-up should decide
  whether any additional package styling is needed or whether direct example
  layout evidence is sufficient.
- Upstream `group-data-[disabled=true]` and `peer-disabled` behavior maps to
  RadCN's explicit `disabled` prop, `data-disabled`, native disabled controls,
  and app-owned composition. Current package CSS covers disabled label color,
  but the named follow-up should document the peer-disabled divergence.
- Upstream `className`, Tailwind utilities, `cn`, and `data-slot` map to
  RadCN `class`, style, CSS variables, package classes, and public
  `data-radcn-label` / `data-radcn-checkbox-*` hooks.
- Existing Checkbox docs and native-state fixtures are good substrate evidence,
  but exact named `label-demo` parity requires named Label docs, fixture, and
  Playwright evidence.
- vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
