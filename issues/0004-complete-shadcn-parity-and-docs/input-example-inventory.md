# Input Example Parity Inventory

Experiment 31 audits the 6 plain upstream shadcn/ui Input examples against the
current RadCN `Input` package, docs, fixtures, and Playwright evidence. This is
an audit only; it does not implement Input changes.

## Summary

RadCN `Input` is a native host input primitive for `text`, `email`, `file`,
`password`, `tel`, and `url`, with placeholder, disabled, read-only, required,
invalid, described-by, value, class, style, id, and name support. Existing Field
and Form fixtures prove broader field behavior, while Experiment 32 adds named
plain Input example proof.

Input example parity is complete for the 6 plain upstream Input examples.
RadCN intentionally keeps a deliberate typed prop surface instead of forwarding
arbitrary React input props. Experiment 32 added the missing `type="file"`
support, CSS-native file selector styling, named docs examples, focused
candidate fixture routes, and Playwright proof for all six rows.

## Current RadCN Evidence

| Surface | Evidence | Current coverage |
| --- | --- | --- |
| Package API | `radcn/packages/radcn/src/components/input.tsx` | Native `input` with text/email/file/password/tel/url types, placeholder, disabled, readOnly, required, invalid, described-by, class/style/id/name/value |
| Package styles | `radcn/packages/radcn/src/styles/tokens.css` | Shared control sizing, border, placeholder, focus-visible, disabled, invalid, grouped-control styling, and CSS-native file selector styling |
| Docs | `radcn/apps/docs/app/content/components.tsx` | Rich Input page with all 6 named plain Input examples, labeled Input composition, Button composition, file input, accessibility, customization, and divergence notes |
| Candidate fixtures | `radcn/fixtures/candidate-remix/app/fixtures/input.tsx` | Focused Input routes for demo, disabled, file, Button composition, Label composition, and description composition |
| Playwright | `radcn/fixtures/tests/input.spec.ts` | Focused plain Input behavior checks for email placeholder, disabled state, file upload and styling, Button submission, Label wiring, and description wiring |

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
- `type="file"` is a supported `InputType`. File input styling lives in
  `.radcn-input[type="file"]`/file-selector CSS hooks rather than a new
  component.
- Upstream shadcn/ui forwards arbitrary React input props. RadCN should keep a
  deliberate typed prop surface and add native types only when they are part of
  the shadcn example parity surface.

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `input-demo` | Email input with placeholder text. | `<Input type="email" placeholder="Email" />`; Tailwind styles from `ui/input.tsx`. | `InputType` includes `email`, `placeholder` is supported, docs render `data-radcn-docs-example="input-demo"`, candidate fixture route `/fixtures/input/demo` exists, and `input.spec.ts` verifies `type="email"` plus placeholder. | Covered | Covered by Experiment 32. |
| `input-disabled` | Disabled email input with placeholder text and disabled visual state. | `<Input disabled type="email" placeholder="Email" />`; disabled Tailwind selectors. | `Input` supports `disabled`; CSS covers disabled opacity/cursor; docs render `data-radcn-docs-example="input-disabled"`; candidate fixture route `/fixtures/input/disabled` exists; and `input.spec.ts` verifies disabled behavior and cursor styling. | Covered | Covered by Experiment 32. |
| `input-file` | File picker with label wired by `htmlFor`/`id`. | `Label htmlFor="picture"` plus `<Input id="picture" type="file" />`; file pseudo-element utility classes. | `InputType` includes `file`; file inputs render without `role="textbox"`; CSS styles `.radcn-input[type="file"]` and `::file-selector-button`; docs render `data-radcn-docs-example="input-file"`; candidate fixture route `/fixtures/input/file` exists; and `input.spec.ts` verifies label wiring, native type, file-selector styling, and Playwright file upload. | Covered | Covered by Experiment 32. |
| `input-with-button` | Email input composed with an outline submit button. | Flex wrapper with `<Input type="email" />` and `<Button type="submit" variant="outline">Subscribe</Button>`. | `Input` supports email; `Button` supports submit and outline; docs render `data-radcn-docs-example="input-with-button"`; candidate fixture route `/fixtures/input/with-button` exists; and `input.spec.ts` verifies the outline button and native form submission. | Covered | Covered by Experiment 32. |
| `input-with-label` | Email input with visible label wired to the input id. | `Label htmlFor="email"` plus `<Input id="email" type="email" placeholder="Email" />`. | `Label for` and `Input id/type/placeholder` exist; docs render `data-radcn-docs-example="input-with-label"`; candidate fixture route `/fixtures/input/with-label` exists; and `input.spec.ts` verifies accessible label wiring. | Covered | Covered by Experiment 32. |
| `input-with-text` | Email input with visible label and helper description text. | `Label`, `Input`, and paragraph styled as muted description. | `Input` has `ariaDescribedBy`; docs render `data-radcn-docs-example="input-with-text"`; candidate fixture route `/fixtures/input/with-text` exists; and `input.spec.ts` verifies `aria-describedby` points to the helper text id. | Covered | Covered by Experiment 32. |

## Outcome

Input example parity is complete for the 6 plain upstream Input examples.

Experiment 32 added `file` input support and styling, named docs examples,
candidate fixture routes, and Playwright coverage for all 6 upstream examples.
It did not rework Field, Button, Label, Form, InputGroup, or InputOTP APIs.
