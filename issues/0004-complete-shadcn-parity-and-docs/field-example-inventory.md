# Field Example Inventory

Generated during Experiment 11 on 2026-06-05.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/field-*.tsx`
- RadCN packages:
  `radcn/packages/radcn/src/components/field.tsx`
  `radcn/packages/radcn/src/components/form.tsx`
  `radcn/packages/radcn/src/components/label.tsx`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
  `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
  `radcn/fixtures/tests/native-controls.spec.ts`
  `radcn/fixtures/tests/form-input-cluster.spec.ts`

## Summary

Field example parity is not complete yet. RadCN currently exports
`Field`, `FieldDescription`, and `FieldError`; labels are covered by the
separate `radcn/label` package and richer form wiring is covered by
`radcn/form`. That is enough for basic label/control/description/error wiring,
but it does not cover the upstream Field example surface.

The missing Field parity depth is:

- package parts: `FieldLabel`, `FieldSet`, `FieldGroup`, `FieldLegend`,
  `FieldSeparator`, `FieldContent`, and `FieldTitle`;
- layout behavior: horizontal and responsive field orientation;
- fieldset/legend grouping semantics;
- choice-card composition with nested labels, descriptions, titles, and radio
  items;
- grouped checkbox/radio/switch/select/textarea/slider/button compositions;
- a web-first strategy for the slider value-display example that does not port
  React `useState`.

Do not mark the `field` example cluster resolved yet. The next experiment
should implement the missing Field example parity depth.

## Example Map

| Upstream id | User-facing behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `field-demo` | Full payment form using FieldGroup, FieldSet, FieldLegend, FieldSeparator, nested fields, select, checkbox, textarea, and action buttons. | RadCN has individual form, input, select, checkbox, textarea, and button primitives, but `radcn/field` lacks group, fieldset, legend, separator, and orientation APIs. | Partial | Add Field composition parts and a checkout-style docs/fixture proof. |
| `field-input` | FieldSet and FieldGroup wrapping username/password fields with labels and descriptions before/after controls. | Basic Field + Label + Input + FieldDescription is covered in docs and fixtures. FieldSet and FieldGroup are missing. | Partial | Add FieldSet/FieldGroup/FieldLabel proof for stacked input fields. |
| `field-textarea` | FieldSet/FieldGroup wrapping a textarea with label and description. | Textarea field behavior is covered through Form examples, but not through FieldSet/FieldGroup package parts. | Partial | Add textarea Field fixture using FieldSet and FieldGroup. |
| `field-fieldset` | Semantic address fieldset with legend, description, grouped fields, and two-column layout. | Current Field package has no FieldSet or FieldLegend. | Missing | Add semantic FieldSet and FieldLegend parts plus grouped layout proof. |
| `field-radio` | FieldSet with group label/description and horizontal radio options. | RadCN radio and form examples cover radio submission, but Field lacks horizontal orientation and FieldLabel composition for radio rows. | Partial | Add horizontal Field layout and radio-group Field proof. |
| `field-checkbox` | FieldLegend, grouped checkbox rows, separator, and FieldContent wrapping label/description. | RadCN checkbox examples cover native checkbox state; FieldContent, FieldLegend, FieldGroup, FieldSeparator, and horizontal orientation are missing. | Partial | Add checkbox group and FieldContent proof. |
| `field-switch` | Horizontal field with FieldContent label/description on one side and Switch on the other. | RadCN switch Form examples cover boolean switch fields, but Field lacks FieldContent and horizontal layout proof. | Partial | Add switch composition with horizontal Field and FieldContent. |
| `field-slider` | FieldTitle/FieldDescription with live value text and Slider range control. | RadCN slider exists and has form/reset coverage, but FieldTitle is missing and the upstream React `useState` live display must be mapped to a web-first strategy. | Partial | Add FieldTitle and a Remix/web-first slider value-display approach. |
| `field-select` | Field with label, Select trigger/content/items, and description. | RadCN select and Form examples cover select submission; FieldLabel and Field-specific select proof are missing. | Partial | Add FieldLabel/Select Field docs and fixture proof. |
| `field-choice-card` | Radio options rendered as card-like Fields with FieldContent, FieldTitle, description, and nested labels. | RadCN radio exists, but FieldContent/FieldTitle and choice-card styling/layout are missing. | Missing | Add choice-card Field composition and radio proof. |
| `field-group` | Multiple FieldSet sections separated by FieldSeparator with checkbox groups and inline link copy. | Current Field package lacks FieldGroup, FieldSet, FieldSeparator, and horizontal checkbox rows. | Missing | Add grouped sections and separator proof. |
| `field-responsive` | Responsive Field orientation with FieldContent, input/textarea controls, separators, and action buttons. | Current Field package lacks responsive orientation and FieldContent/FieldSeparator. | Missing | Add responsive orientation proof across desktop/mobile-friendly markup. |

## Mapping Decisions

- RadCN should not treat the existing `radcn/form` API as complete Field
  parity. Form helpers solve server/action wiring; upstream Field examples
  expose reusable layout and grouping parts that belong in `radcn/field` if
  parity is implemented.
- `FieldLabel` can likely wrap or mirror `radcn/label`, but it needs a Field
  package export so examples can be authored against the Field API surface.
- `FieldSet` and `FieldLegend` should preserve real `fieldset` and `legend`
  semantics rather than generic wrappers.
- `FieldGroup`, `FieldContent`, `FieldTitle`, and `FieldSeparator` are layout
  and content composition parts. They should remain dependency-free host
  elements.
- Horizontal and responsive orientation should be expressed with explicit props
  and data attributes, not React context.
- The `field-slider` example's React `useState` behavior should be mapped to a
  Remix/web-first pattern: native range/form state, server-provided default
  values, or a small dependency-free enhancement if live value text is required.

## Next Recommendation

Implement Field example parity depth:

- add the missing Field package parts and orientation props;
- expand docs and candidate fixtures for all 12 upstream Field examples;
- add Playwright coverage for semantics, layout hooks, control composition, and
  slider value strategy;
- then mark `field` resolved in `resolved-clusters.json` and regenerate
  `parity-inventory.md`.
