# Checkbox Example Inventory

## Scope

Active upstream Checkbox example cluster from `parity-inventory.md`:

- `checkbox-demo`
- `checkbox-disabled`
- `checkbox-with-text`

Adjacent checkbox-related registry examples remain outside this cluster unless
the generated inventory reclassifies them later:

- `checkbox-form-single`
- `checkbox-form-multiple`
- `field-checkbox`
- `form-rhf-checkbox`
- `form-tanstack-checkbox`
- `form-formisch-checkbox`
- menu checkbox-item examples such as `dropdown-menu-checkboxes`

Those adjacent examples belong to Form, Field, or menu component parity
surfaces, not the base `radcn/checkbox` example cluster.

## Evidence Reviewed

Upstream references:

- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/checkbox.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-demo.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-disabled.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-with-text.tsx`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-demo.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-disabled.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-with-text.json`

RadCN references:

- `radcn/packages/radcn/src/components/checkbox.tsx`
- `radcn/packages/radcn/src/styles/index.ts`
- `radcn/apps/docs/app/content/components.tsx`
- `radcn/apps/docs/tests/coverage.spec.ts`
- `radcn/fixtures/scenarios/index.ts`
- `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
- `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
- `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
- `radcn/fixtures/tests/native-state.spec.ts`
- `radcn/fixtures/tests/native-controls.spec.ts`
- `radcn/fixtures/tests/form-input-cluster.spec.ts`

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `checkbox-demo` | Four stacked compositions: unchecked checkbox with label, default checked checkbox with label and description, disabled checkbox with label, and checked card-like label with custom blue checked styling and description. | Package supports native input semantics, checked/unchecked/disabled state, labels via `id`, descriptions as app-owned markup, `class`, `style`, public hooks, and custom tokens/classes. Fixtures cover default, checked, disabled, invalid, indeterminate, custom token, and form reset/submit states. Docs only show a single checked checkbox preview and do not expose a named `checkbox-demo` family or the four upstream compositions together. | Partial | Add named docs and candidate fixture coverage for all four demo compositions, including label/description text, disabled row, checked card-like wrapper, custom checked styling via app CSS/class/tokens, and Playwright evidence. No package API change is currently required. |
| `checkbox-disabled` | Disabled checkbox with `Accept terms and conditions` label and disabled label styling. | Package supports `disabled` on the native input and wrapper state. Candidate fixture and Playwright prove disabled checkbox behavior, but the route is generic `checkbox/disabled`, uses different copy, and docs do not expose a named `checkbox-disabled` example. | Partial | Add named docs/fixture/test evidence for the upstream disabled example id, label copy, disabled input state, and disabled label styling/composition. |
| `checkbox-with-text` | Unchecked checkbox with label `Accept terms and conditions` and description `You agree to our Terms of Service and Privacy Policy.` | Package supports unchecked native input, label association, and app-owned description markup. Existing docs preview and fixtures do not expose this named example id or exact label/description composition. | Partial | Add named docs/fixture/test evidence for label association, description text, unchecked state, and public hooks under the `checkbox-with-text` example id. |

## Capability Matrix

| Capability | Current status | Notes |
| --- | --- | --- |
| Native checkbox semantics | Covered | `radcn/checkbox` renders a native `input type="checkbox"` with package-owned wrapper and indicator hooks. |
| Checked and unchecked state | Covered | `checked` maps to the initial checked state; unchecked is the default. This is the Remix/web-first equivalent of shadcn's `defaultChecked` for server-rendered examples. |
| Disabled state | Covered | `disabled` passes to the native input and is reflected on wrapper state for styling. |
| Invalid state | Covered | `ariaInvalid` maps to `aria-invalid` and wrapper invalid state. This exceeds the active Checkbox example cluster but supports Form/Field composition. |
| Indeterminate/mixed state | Covered for static ARIA/visual state | `indeterminate` maps to `aria-checked="mixed"` and RadCN state hooks. The browser-only `HTMLInputElement.indeterminate` property is not currently set by the server-rendered component, but the active upstream Checkbox examples do not require it. |
| Label association | Covered | Current fixtures use `id` plus `Label for` or wrapping label compositions. |
| Description composition | Covered as app-owned markup | Descriptions belong to app markup, Field/Form primitives, or docs examples rather than the base Checkbox API. |
| Required/form submission/reset | Covered | Fixture Playwright verifies native form reset and GET submission for checkbox values. |
| Public hooks | Covered | `data-radcn-checkbox-wrapper`, `data-radcn-checkbox-input`, and `data-radcn-checkbox-indicator` exist; wrapper/input expose `data-state`. |
| Custom classes/styles/tokens | Covered | `class` and `style` are supported on the wrapper; fixture CSS proves token customization. |
| Docs named example ids | Partial | Docs currently have generic component preview coverage, not named upstream Checkbox example families. |
| Candidate fixture named example ids | Partial | Candidate fixtures cover behavior through generic native-state routes, not the active upstream example ids. |
| Playwright named example proof | Partial | Tests verify behavior but not exact upstream example compositions or ids. |

## Mapping Decisions

- shadcn `defaultChecked` maps to RadCN `checked` for server-rendered initial
  state. RadCN does not need a separate React-style uncontrolled prop for these
  examples.
- shadcn `className` maps to RadCN `class`; inline and token customization map
  to `style`, app CSS, and CSS variables.
- shadcn `data-slot="checkbox"` and `data-slot="checkbox-indicator"` map to
  `data-radcn-checkbox-wrapper`, `data-radcn-checkbox-input`, and
  `data-radcn-checkbox-indicator`.
- shadcn `CheckboxPrimitive.Root`, `CheckboxPrimitive.Indicator`, Radix state,
  and React event plumbing map to a native checkbox input plus explicit
  server/app-owned state.
- shadcn's `CheckIcon` and `lucide-react` are presentation details. RadCN's
  base checkbox indicator is package-owned and dependency-free; apps may add
  their own icon treatment around or through CSS if needed.
- Tailwind utilities, peer selectors, and `has()` parent styling map to app CSS,
  `class`, `style`, RadCN state hooks, and CSS variables.
- Card-like label wrappers and description layout are app-owned composition,
  not new package parts.
- Vendor source is read-only evidence and must not become a RadCN dependency.

## Decision

The Checkbox package API appears sufficient for the active upstream example
cluster. The gap is named example parity depth: docs, candidate fixtures, and
Playwright tests need to prove the three upstream example ids and exact
user-facing compositions.

Recommended next experiment: implement Checkbox example parity depth without
changing `radcn/checkbox` unless implementation reveals a concrete package
blocker not found in this audit.
