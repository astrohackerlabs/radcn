# Form Example Parity Inventory

Generated during Experiment 5 on 2026-06-05.

## Sources

- Upstream registry:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/form-*.tsx`
- RadCN package:
  `radcn/packages/radcn/src/components/form.tsx`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx`
- RadCN fixtures:
  `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
  `radcn/fixtures/scenarios/index.ts`
  `radcn/fixtures/tests/form-input-cluster.spec.ts`
- Related RadCN control fixtures:
  `radcn/fixtures/tests/native-state.spec.ts`
  `radcn/fixtures/tests/native-select.spec.ts`
  `radcn/fixtures/tests/select.spec.ts`
  `radcn/fixtures/tests/combobox-command.spec.ts`

## Summary

The upstream form examples mostly demonstrate app-level form libraries wrapped
around shadcn fields. RadCN should not port those libraries. The equivalent
RadCN outcome is:

- keep `radcn/form` as native field wiring;
- keep validation, schema parsing, arrays, route/action state, and persistence
  app-owned;
- demonstrate the user-facing patterns with package primitives, native forms,
  explicit ARIA, deterministic IDs, and server/action state;
- broaden RadCN docs and fixture examples where the current proof surface is
  too narrow.

Current RadCN coverage:

- Package API: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`,
  `FormDescription`, `FormMessage`, `formFieldIds`, and
  `formControlAttributes`.
- Docs: one rich Form page example for an invalid email input with description
  and message.
- Candidate fixtures: native required validation, server errors, action-state
  display, and custom error-token styling.
- Related component fixtures: input group, native select, checkbox, radio
  group, switch, slider, select, combobox, input OTP, and date picker all have
  native form submission/reset coverage in their own component suites.

Missing proof surface:

- The Form docs do not yet show select, checkbox group, radio group, switch,
  textarea, array/list, password strength, or complex multi-section examples.
- The Form fixture does not yet cluster those controls under the `form` package
  page, even though the individual control components have their own form
  behavior tests.
- No RadCN example currently mirrors the upstream `form-*-array` behavior as a
  native add/remove list recipe.
- No RadCN example currently mirrors the upstream password-strength example.

## Behavior Clusters

| Cluster | Upstream examples | User-facing behavior | Current RadCN coverage | Outcome |
| --- | --- | --- | --- | --- |
| Server/action state | `form-next-demo`, `form-next-complex` | Server action result, pending/submitted state, field errors, complex controls | `form/action-state`, `form/server-errors`, docs Form error example | Partial. Needs richer docs/fixture example for complex server/action form. |
| Simple text input | `form-rhf-input`, `form-tanstack-input`, `form-formisch-input` | Label, text input, description, validation message | Form fixture native/error coverage and Input docs | Covered, but Form docs should include a non-error basic input example. |
| Textarea | `form-rhf-textarea`, `form-tanstack-textarea`, `form-formisch-textarea` | Label, textarea, description/error | Textarea component docs/fixtures and Form custom-token textarea | Covered in primitives; missing Form docs example. |
| Select | `form-rhf-select`, `form-tanstack-select`, `form-formisch-select` | Select trigger/content, selected value, submitted hidden value, error text | Select fixture has form submit/reset; Form docs do not show select | Missing Form docs/fixture example. |
| Checkbox group | `form-rhf-checkbox`, `form-tanstack-checkbox`, `form-formisch-checkbox` | Fieldset-style group, multiple checkbox values, descriptions/errors | Checkbox fixture has single form behavior; Form docs do not show checkbox group | Missing Form docs/fixture example. |
| Switch | `form-rhf-switch`, `form-tanstack-switch`, `form-formisch-switch` | Boolean toggle with label/description and submission | Switch fixture has form submit/reset; Form docs do not show switch | Missing Form docs/fixture example. |
| Radio group | `form-rhf-radiogroup`, `form-tanstack-radiogroup`, `form-formisch-radiogroup` | Exclusive choice cards/options and submitted value | Radio group fixture has form submit/reset; Form docs do not show radio group | Missing Form docs/fixture example. |
| Array/list fields | `form-rhf-array`, `form-tanstack-array`, `form-formisch-array` | Dynamic list of repeated inputs with add/remove controls | No Form-level array/list example | Missing recipe/docs/fixture example. |
| Complex multi-section form | `form-rhf-complex`, `form-tanstack-complex`, `form-formisch-complex`, `form-next-complex` | Plan selection, billing select, add-ons, notifications, summary/action state | Individual controls are covered separately | Missing combined Form docs/fixture example. |
| Demo composition | `form-rhf-demo`, `form-tanstack-demo`, `form-formisch-demo` | Card-wrapped form with title/description fields and submit button | Form docs error example; Card/Button/Input primitives covered | Covered conceptually; docs can improve with basic and submitted variants. |
| Password strength | `form-rhf-password` | Password input group, strength meter/progress, validation hints | Input group and Progress exist; no Form password example | Missing Form docs/fixture example. |

## Example Map

| Upstream id | Family | Behavior | Upstream dependencies | RadCN equivalent outcome | Evidence |
| --- | --- | --- | --- | --- | --- |
| `form-next-demo` | next | Server/action state with title and description fields | Next action/schema files; no RadCN package dependency | Partial: current action-state fixture proves submitted route state, but docs need a richer server/action form example. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`; `radcn/apps/docs/app/content/components.tsx` |
| `form-next-complex` | next | Complex server/action form with plan, billing, add-ons, notifications | Next action/schema files; no RadCN package dependency | Missing combined complex Form example. | Current individual primitive fixtures only. |
| `form-rhf-demo` | rhf | Card form with title input, description textarea, submit button | `react-hook-form`, resolver, schema | Covered conceptually by native Form/Input/Textarea/Button/Card; docs should add a basic non-error form. | Form docs and fixture native validation. |
| `form-rhf-input` | rhf | Username text input with description and validation | `react-hook-form`, resolver, schema | Covered by `radcn/form` field wiring and Input docs. | `formFieldIds`, `formControlAttributes`, native-validation fixture. |
| `form-rhf-select` | rhf | Select field with label, description, value, and error | `react-hook-form`, resolver, schema | Missing Form-level select example; Select component form behavior is covered separately. | `radcn/fixtures/tests/select.spec.ts` |
| `form-rhf-checkbox` | rhf | Checkbox group with multiple selected values and descriptions | `react-hook-form`, resolver, schema | Missing Form-level checkbox group example. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-rhf-switch` | rhf | Switch field with label, description, boolean submission | `react-hook-form`, resolver, schema | Missing Form-level switch example. | Switch form behavior in `native-state.spec.ts`. |
| `form-rhf-textarea` | rhf | Textarea field with helper text and error | `react-hook-form`, resolver, schema | Covered by primitives; missing Form docs example. | Textarea docs and Form custom-token fixture. |
| `form-rhf-radiogroup` | rhf | Radio group plan selection | `react-hook-form`, resolver, schema | Missing Form-level radio group example. | Radio group form behavior in `native-state.spec.ts`. |
| `form-rhf-array` | rhf | Repeated email inputs with add/remove controls | `react-hook-form`, resolver, schema | Missing array/list recipe example. | No current Form-level array scenario. |
| `form-rhf-complex` | rhf | Complex plan, billing, add-ons, and notification controls | `react-hook-form`, resolver, schema | Missing combined complex Form example. | Individual controls covered separately. |
| `form-rhf-password` | rhf | Password input group with strength progress and validation hints | `react-hook-form`, resolver, schema | Missing password-strength Form example. | Input group and Progress package APIs exist. |
| `form-tanstack-demo` | tanstack | Card form with title input, description textarea, submit button | `@tanstack/react-form`, schema | Covered conceptually; docs should add a basic non-error form. | Form docs and fixture native validation. |
| `form-tanstack-input` | tanstack | Username text input with description and validation | `@tanstack/react-form`, schema | Covered by `radcn/form` field wiring and Input docs. | Form package and native-validation fixture. |
| `form-tanstack-textarea` | tanstack | Textarea field with helper/error text | `@tanstack/react-form`, schema | Covered by primitives; missing Form docs example. | Textarea docs and Form custom-token fixture. |
| `form-tanstack-select` | tanstack | Select field with submitted value and error | `@tanstack/react-form`, schema | Missing Form-level select example. | Select form behavior in `select.spec.ts`. |
| `form-tanstack-checkbox` | tanstack | Checkbox group with multiple values | `@tanstack/react-form`, schema | Missing Form-level checkbox group example. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-tanstack-switch` | tanstack | Switch field with submitted boolean value | `@tanstack/react-form`, schema | Missing Form-level switch example. | Switch form behavior in `native-state.spec.ts`. |
| `form-tanstack-radiogroup` | tanstack | Radio group plan selection | `@tanstack/react-form`, schema | Missing Form-level radio group example. | Radio group form behavior in `native-state.spec.ts`. |
| `form-tanstack-array` | tanstack | Repeated email inputs with add/remove controls | `@tanstack/react-form`, schema | Missing array/list recipe example. | No current Form-level array scenario. |
| `form-tanstack-complex` | tanstack | Complex plan, billing, add-ons, and notification controls | `@tanstack/react-form`, schema | Missing combined complex Form example. | Individual controls covered separately. |
| `form-formisch-demo` | formisch | Card form with title input, description textarea, submit button | Formisch and Valibot | Covered conceptually; docs should add a basic non-error form. | Form docs and fixture native validation. |
| `form-formisch-input` | formisch | Username text input with description and validation | Formisch and Valibot | Covered by `radcn/form` field wiring and Input docs. | Form package and native-validation fixture. |
| `form-formisch-textarea` | formisch | Textarea field with helper/error text | Formisch and Valibot | Covered by primitives; missing Form docs example. | Textarea docs and Form custom-token fixture. |
| `form-formisch-select` | formisch | Select field with submitted value and error | Formisch and Valibot | Missing Form-level select example. | Select form behavior in `select.spec.ts`. |
| `form-formisch-checkbox` | formisch | Checkbox group with multiple values | Formisch and Valibot | Missing Form-level checkbox group example. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-formisch-radiogroup` | formisch | Radio group plan selection | Formisch and Valibot | Missing Form-level radio group example. | Radio group form behavior in `native-state.spec.ts`. |
| `form-formisch-switch` | formisch | Switch field with submitted boolean value | Formisch and Valibot | Missing Form-level switch example. | Switch form behavior in `native-state.spec.ts`. |
| `form-formisch-array` | formisch | Repeated email inputs with add/remove controls | Formisch and Valibot | Missing array/list recipe example. | No current Form-level array scenario. |
| `form-formisch-complex` | formisch | Complex plan, billing, add-ons, and notification controls | Formisch and Valibot | Missing combined complex Form example. | Individual controls covered separately. |

## Next Experiment Recommendation

Implement Form example parity depth without adding form-state dependencies.

The next experiment should add package-backed docs and fixture examples for:

- basic non-error form;
- textarea field;
- select field;
- checkbox group;
- radio group;
- switch field;
- repeated array/list fields;
- password strength with Input Group and Progress;
- complex multi-section form combining plan, billing, add-ons, and
  notifications;
- server/action state using native GET/POST route state and explicit errors.

That implementation should update docs examples, candidate fixtures, and
Playwright coverage, but should not change the `radcn/form` package API unless
the implementation proves a specific reusable helper is missing.
