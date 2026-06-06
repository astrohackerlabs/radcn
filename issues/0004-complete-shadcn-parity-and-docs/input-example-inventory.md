# Input Example Parity Inventory

Experiment 31 audits the 6 plain upstream shadcn/ui Input examples against the
current RadCN `Input` package, docs, fixtures, and Playwright evidence. This is
an audit only; it does not implement Input changes.

## Summary

RadCN `Input` is a native host input primitive for `text`, `email`,
`password`, `tel`, and `url`, with placeholder, disabled, read-only, required,
invalid, described-by, value, class, style, id, and name support. Existing Field
and Form fixtures prove much of the native control behavior in composition.

Input example parity is not complete. The main package gap is `type="file"`:
upstream shadcn/ui forwards arbitrary native input types and includes file-input
styling, while RadCN currently restricts `InputType` to text-like inputs. The
other five examples are behaviorally covered by current primitives but need
named Input docs/fixture/Playwright proof before the `input` example cluster can
be marked resolved.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/input.tsx` | Native `input` with text/email/password/tel/url types, placeholder, disabled, readOnly, required, invalid, described-by, class/style/id/name/value |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Shared control sizing, border, placeholder, focus-visible, disabled, invalid, and grouped-control styling |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Rich Input page with labeled Input composition, accessibility, customization, and divergence notes |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/field.tsx` | Field-owned Input routes for default, invalid, disabled, required, and custom error token behavior |
| Playwright | `radcn/fixtures/tests/form-input-cluster.spec.ts` | Form/Field/Input behavior checks through form, field, and input group clusters |

## Mapping Decisions

- shadcn Tailwind layout wrappers such as `grid w-full max-w-sm gap-3` map to
  docs/fixture layout classes, inline styles, Field composition, or CSS
  variables, not Input package dependencies.
- `Label` composition belongs to `radcn/label` or `radcn/field`, not to
  `Input`. Input should expose `id` so labels can point to it.
- `Button` composition belongs to `radcn/button` plus docs/fixture examples, not
  to `Input`.
- Description text belongs to docs, native paragraphs, `FieldDescription`, or
  form helpers. Input should expose `ariaDescribedBy` for explicit wiring.
- `type="email"` is already supported.
- Disabled state is already supported and should keep native disabled semantics.
- `type="file"` should become a supported `InputType` unless the implementation
  experiment finds Remix UI input typing prevents it. File input styling should
  live in `.radcn-input[type="file"]`/file-selector CSS hooks rather than a new
  component.
- Upstream shadcn/ui forwards arbitrary React input props. RadCN should keep a
  deliberate typed prop surface and add native types only when they are part of
  the shadcn example parity surface.

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `input-demo` | Email input with placeholder text. | `<Input type="email" placeholder="Email" />`; Tailwind styles from `ui/input.tsx`. | `InputType` includes `email`, `placeholder` is supported, and docs/fixtures render email inputs. | Partial | Add named Input docs/fixture/Playwright proof for the upstream demo route. |
| `input-disabled` | Disabled email input with placeholder text and disabled visual state. | `<Input disabled type="email" placeholder="Email" />`; disabled Tailwind selectors. | `Input` supports `disabled`; CSS covers disabled opacity/cursor; Field fixtures test disabled input behavior. | Partial | Add named Input docs/fixture/Playwright proof for disabled email input. |
| `input-file` | File picker with label wired by `htmlFor`/`id`. | `Label htmlFor="picture"` plus `<Input id="picture" type="file" />`; file pseudo-element utility classes. | `Label for` exists, `Input id` exists, but `InputType` does not include `file` and no file-input styling/proof exists. | Missing | Add `file` to `InputType`, style file inputs, and prove labeled file input in docs/fixtures/tests. |
| `input-with-button` | Email input composed with an outline submit button. | Flex wrapper with `<Input type="email" />` and `<Button type="submit" variant="outline">Subscribe</Button>`. | `Input` supports email; `Button` supports submit and outline; composition exists in broader form docs but not named Input examples. | Partial | Add named docs/fixture/Playwright proof for Input plus Button composition. |
| `input-with-label` | Email input with visible label wired to the input id. | `Label htmlFor="email"` plus `<Input id="email" type="email" placeholder="Email" />`. | `Label for` and `Input id/type/placeholder` exist; Field fixtures cover label/input composition. | Partial | Add named Input docs/fixture/Playwright proof for direct Label composition. |
| `input-with-text` | Email input with visible label and helper description text. | `Label`, `Input`, and paragraph styled as muted description. | `Input` has `ariaDescribedBy`, FieldDescription exists, and form/field fixtures cover described-by wiring. | Partial | Add named Input docs/fixture/Playwright proof for label plus description text. |

## Outcome

Input example parity is not complete.

The next implementation cluster should be **Input example parity depth**. It
should add `file` input support and styling if Remix UI accepts it, then add
named Input docs, candidate fixtures, and Playwright coverage for all 6
upstream examples. It should not rework Field, Button, Label, Form, InputGroup,
or InputOTP APIs except where direct Input example proof needs composition.
