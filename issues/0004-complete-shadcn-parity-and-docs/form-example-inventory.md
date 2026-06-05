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

Experiment 6 proof surface:

- The Form docs now show select, checkbox group, radio group, switch,
  textarea, array/list, password strength, and complex multi-section examples.
- The Form fixture now clusters those controls under the `form` package page,
  while the individual control components still own detailed behavior tests.
- RadCN mirrors the upstream `form-*-array` behavior as repeated native inputs
  with app-owned add/remove state.
- RadCN mirrors the upstream password-strength behavior with `InputGroup` and
  `Progress`, while validation remains app-owned.

## Behavior Clusters

| Cluster | Upstream examples | User-facing behavior | Current RadCN coverage | Outcome |
| --- | --- | --- | --- | --- |
| Server/action state | `form-next-demo`, `form-next-complex` | Server action result, pending/submitted state, field errors, complex controls | `form/action-state`, `form/server-errors`, `form/server-errors-rich`, docs Form error example | Covered by native route state and explicit errors. |
| Simple text input | `form-rhf-input`, `form-tanstack-input`, `form-formisch-input` | Label, text input, description, validation message | Form fixture native/error/basic coverage and Input docs | Covered. |
| Textarea | `form-rhf-textarea`, `form-tanstack-textarea`, `form-formisch-textarea` | Label, textarea, description/error | Textarea component docs/fixtures plus Form docs/fixture textarea example | Covered. |
| Select | `form-rhf-select`, `form-tanstack-select`, `form-formisch-select` | Select trigger/content, selected value, submitted hidden value, error text | Select fixture plus Form docs/fixture select example | Covered. |
| Checkbox group | `form-rhf-checkbox`, `form-tanstack-checkbox`, `form-formisch-checkbox` | Fieldset-style group, multiple checkbox values, descriptions/errors | Checkbox fixture plus Form docs/fixture checkbox-group example | Covered. |
| Switch | `form-rhf-switch`, `form-tanstack-switch`, `form-formisch-switch` | Boolean toggle with label/description and submission | Switch fixture plus Form docs/fixture switch example | Covered. |
| Radio group | `form-rhf-radiogroup`, `form-tanstack-radiogroup`, `form-formisch-radiogroup` | Exclusive choice cards/options and submitted value | Radio group fixture plus Form docs/fixture radio-group example | Covered. |
| Array/list fields | `form-rhf-array`, `form-tanstack-array`, `form-formisch-array` | Dynamic list of repeated inputs with add/remove controls | Form docs/fixture array-list example | Covered as app-owned repeated native inputs. |
| Complex multi-section form | `form-rhf-complex`, `form-tanstack-complex`, `form-formisch-complex`, `form-next-complex` | Plan selection, billing select, add-ons, notifications, summary/action state | Form docs/fixture complex example plus individual control fixtures | Covered by composition. |
| Demo composition | `form-rhf-demo`, `form-tanstack-demo`, `form-formisch-demo` | Card-wrapped form with title/description fields and submit button | Form docs server-error/basic/complex examples; Card/Button/Input primitives covered | Covered. |
| Password strength | `form-rhf-password` | Password input group, strength meter/progress, validation hints | Form docs/fixture password-strength example | Covered. |

## Example Map

| Upstream id | Family | Behavior | Upstream dependencies | RadCN equivalent outcome | Evidence |
| --- | --- | --- | --- | --- | --- |
| `form-next-demo` | next | Server/action state with title and description fields | Next action/schema files; no RadCN package dependency | Covered by native Form action-state and rich server-error examples. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`; `radcn/apps/docs/app/content/components.tsx` |
| `form-next-complex` | next | Complex server/action form with plan, billing, add-ons, notifications | Next action/schema files; no RadCN package dependency | Covered by the complex Form composition and rich server-error examples. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`; `radcn/apps/docs/app/content/components.tsx` |
| `form-rhf-demo` | rhf | Card form with title input, description textarea, submit button | `react-hook-form`, resolver, schema | Covered by basic, controls, and complex Form examples. | Form docs and fixture native validation. |
| `form-rhf-input` | rhf | Username text input with description and validation | `react-hook-form`, resolver, schema | Covered by `radcn/form` field wiring and Input docs. | `formFieldIds`, `formControlAttributes`, native-validation fixture. |
| `form-rhf-select` | rhf | Select field with label, description, value, and error | `react-hook-form`, resolver, schema | Covered by Form select examples and Select component behavior tests. | `radcn/fixtures/tests/select.spec.ts` |
| `form-rhf-checkbox` | rhf | Checkbox group with multiple selected values and descriptions | `react-hook-form`, resolver, schema | Covered by Form checkbox-group examples and Checkbox behavior tests. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-rhf-switch` | rhf | Switch field with label, description, boolean submission | `react-hook-form`, resolver, schema | Covered by Form switch examples and Switch behavior tests. | Switch form behavior in `native-state.spec.ts`. |
| `form-rhf-textarea` | rhf | Textarea field with helper text and error | `react-hook-form`, resolver, schema | Covered by Form textarea examples and Textarea primitives. | Textarea docs and Form custom-token fixture. |
| `form-rhf-radiogroup` | rhf | Radio group plan selection | `react-hook-form`, resolver, schema | Covered by Form radio-group examples and Radio Group behavior tests. | Radio group form behavior in `native-state.spec.ts`. |
| `form-rhf-array` | rhf | Repeated email inputs with add/remove controls | `react-hook-form`, resolver, schema | Covered by array-list examples as app-owned repeated native inputs. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx` |
| `form-rhf-complex` | rhf | Complex plan, billing, add-ons, and notification controls | `react-hook-form`, resolver, schema | Covered by complex Form examples and individual control fixtures. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx` |
| `form-rhf-password` | rhf | Password input group with strength progress and validation hints | `react-hook-form`, resolver, schema | Covered by password-strength examples with Input Group and Progress. | Input group and Progress package APIs exist. |
| `form-tanstack-demo` | tanstack | Card form with title input, description textarea, submit button | `@tanstack/react-form`, schema | Covered by basic, controls, and complex Form examples. | Form docs and fixture native validation. |
| `form-tanstack-input` | tanstack | Username text input with description and validation | `@tanstack/react-form`, schema | Covered by `radcn/form` field wiring and Input docs. | Form package and native-validation fixture. |
| `form-tanstack-textarea` | tanstack | Textarea field with helper/error text | `@tanstack/react-form`, schema | Covered by Form textarea examples and Textarea primitives. | Textarea docs and Form custom-token fixture. |
| `form-tanstack-select` | tanstack | Select field with submitted value and error | `@tanstack/react-form`, schema | Covered by Form select examples. | Select form behavior in `select.spec.ts`. |
| `form-tanstack-checkbox` | tanstack | Checkbox group with multiple values | `@tanstack/react-form`, schema | Covered by Form checkbox-group examples. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-tanstack-switch` | tanstack | Switch field with submitted boolean value | `@tanstack/react-form`, schema | Covered by Form switch examples. | Switch form behavior in `native-state.spec.ts`. |
| `form-tanstack-radiogroup` | tanstack | Radio group plan selection | `@tanstack/react-form`, schema | Covered by Form radio-group examples. | Radio group form behavior in `native-state.spec.ts`. |
| `form-tanstack-array` | tanstack | Repeated email inputs with add/remove controls | `@tanstack/react-form`, schema | Covered by array-list examples as app-owned repeated native inputs. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx` |
| `form-tanstack-complex` | tanstack | Complex plan, billing, add-ons, and notification controls | `@tanstack/react-form`, schema | Covered by complex Form examples. | Individual controls covered separately. |
| `form-formisch-demo` | formisch | Card form with title input, description textarea, submit button | Formisch and Valibot | Covered by basic, controls, and complex Form examples. | Form docs and fixture native validation. |
| `form-formisch-input` | formisch | Username text input with description and validation | Formisch and Valibot | Covered by `radcn/form` field wiring and Input docs. | Form package and native-validation fixture. |
| `form-formisch-textarea` | formisch | Textarea field with helper/error text | Formisch and Valibot | Covered by Form textarea examples and Textarea primitives. | Textarea docs and Form custom-token fixture. |
| `form-formisch-select` | formisch | Select field with submitted value and error | Formisch and Valibot | Covered by Form select examples. | Select form behavior in `select.spec.ts`. |
| `form-formisch-checkbox` | formisch | Checkbox group with multiple values | Formisch and Valibot | Covered by Form checkbox-group examples. | Single checkbox form behavior in `native-state.spec.ts`. |
| `form-formisch-radiogroup` | formisch | Radio group plan selection | Formisch and Valibot | Covered by Form radio-group examples. | Radio group form behavior in `native-state.spec.ts`. |
| `form-formisch-switch` | formisch | Switch field with submitted boolean value | Formisch and Valibot | Covered by Form switch examples. | Switch form behavior in `native-state.spec.ts`. |
| `form-formisch-array` | formisch | Repeated email inputs with add/remove controls | Formisch and Valibot | Covered by array-list examples as app-owned repeated native inputs. | `radcn/fixtures/candidate-remix/app/fixtures/form.tsx` |
| `form-formisch-complex` | formisch | Complex plan, billing, add-ons, and notification controls | Formisch and Valibot | Covered by complex Form examples. | Individual controls covered separately. |

## Next Experiment Recommendation

Move to the next example-parity cluster after Form. The form-state-library
dependency variants are now documented as intentional app-owned divergences,
and the shared user-facing behavior clusters have RadCN docs, fixture, and
Playwright proof.
