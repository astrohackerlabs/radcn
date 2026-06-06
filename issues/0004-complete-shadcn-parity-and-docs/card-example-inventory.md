# Card Example Inventory

## Scope

This audit covers the active upstream Card example cluster recommended by
`parity-inventory.md`:

- `card-demo`
- `card-with-form`

Card composition inside already-resolved Form, Chart, Carousel, and future
block clusters is out of scope. Those references are useful only where they
prove current Card composition behavior or clarify that the active cluster is
limited to the two named Card examples.

## Evidence Reviewed

- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/card.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/card-demo.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/card-with-form.tsx`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card-demo.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/card-with-form.json`
- `radcn/packages/radcn/src/components/card.tsx`
- `radcn/packages/radcn/src/styles/index.ts`
- `radcn/apps/docs/app/content/components.tsx`
- `radcn/apps/docs/tests/coverage.spec.ts`
- `radcn/fixtures/scenarios/index.ts`
- `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
- `radcn/fixtures/tests/static-display.spec.ts`

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `card-demo` | Renders a max-width login/account card with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter`. The content composes a native form shell, email/password inputs, labels, a forgot-password link, a link-variant signup button, a full-width submit button, and an outline Google button. Styling comes from `className` width, flex/grid/gap utilities, and CardAction placement. The registry JSON lists `switch` as a dependency, but the current source does not import or render Switch. | `radcn/card` ships all Card parts including `CardAction`, public hooks, `size`, `class`, `style`, and token-driven styling. Candidate fixtures and Playwright prove generic Card slots, action, compact size, custom token styling, and Button composition. Other fixtures prove Input, Label, Button, and Form composition separately. Docs currently render a generic Card preview, but there is no named `card-demo` docs family, candidate route, or Playwright evidence with the upstream login copy, form structure, link action, full-width buttons, and input types. | Partial | Add named docs, candidate fixture, and Playwright evidence for `card-demo`. Likely no Card package API change is needed unless implementation exposes a concrete layout or slot gap. |
| `card-with-form` | Renders a fixed-width project creation card with header/title/description, a native form shell, project-name `Input`, framework `Select` with `SelectTrigger`, `SelectValue`, `SelectContent position="popper"`, four options, and footer buttons laid out with `justify-between`. Styling comes from `className="w-[350px]"`, grid/flex/gap utilities, and Button variants. | `radcn/card` provides the needed slots and custom `class`/`style` hooks. RadCN already ships Input, Label, Select, and Button package surfaces, and existing fixtures prove generic Card, form, select, input, and button behavior independently. Current Card fixtures do not prove the named `card-with-form` example, fixed-width card presentation, project form copy, Select composition inside Card, footer justify-between layout, or named Playwright evidence. | Partial | Add named docs, candidate fixture, and Playwright evidence for `card-with-form`, reusing existing RadCN Input, Label, Select, and Button primitives. |

## Capability Matrix

| Capability | Current status | Evidence |
| --- | --- | --- |
| Card root | Supported | `Card` renders `data-radcn-card`, `data-size`, package classes, `class`, and `style`. |
| Card header | Supported | `CardHeader` renders `data-radcn-card-header`; fixture tests assert one header. |
| Card title | Supported | `CardTitle` renders `data-radcn-card-title`; fixture tests assert generic title text. |
| Card description | Supported | `CardDescription` renders `data-radcn-card-description`; fixture tests assert generic description text. |
| Card action | Supported | `CardAction` renders `data-radcn-card-action`; fixture tests assert the slot exists. |
| Card content | Supported | `CardContent` renders `data-radcn-card-content`; fixture tests assert generic content text. |
| Card footer | Supported | `CardFooter` renders `data-radcn-card-footer`; fixture tests assert the slot exists. |
| Public hooks | Supported | All Card parts expose `data-radcn-card*` hooks. |
| Size variants | Supported | `size="default"` and `size="sm"` exist; fixture scenarios cover default and compact cards. |
| Custom classes/styles/tokens | Supported | Card accepts `class` and `style`; custom-token fixture proves CSS variable styling. |
| Full-width and max-width styling | Supported as author styling, not named-example-proven | `class` and `style` can carry `w-full`/`max-w-sm` equivalents, but `card-demo` is not represented yet. |
| Compact fixed-width styling | Supported as author styling, not named-example-proven | `class` and `style` can carry `w-[350px]` equivalents, but `card-with-form` is not represented yet. |
| Login/account form composition | Partial | Required primitives exist, but no named `card-demo` docs/fixture/test evidence exists. |
| Project form composition | Partial | Required primitives exist, but no named `card-with-form` docs/fixture/test evidence exists. |
| Button composition | Supported generally, partial for Card examples | Button variants are package-backed, but the named Card examples do not prove link, full-width, outline, cancel, or deploy buttons in Card context. |
| Input and Label composition | Supported generally, partial for Card examples | Input and Label packages exist and are tested elsewhere; named Card examples do not prove email/password/project fields in Card context. |
| Select composition | Supported generally, partial for Card examples | Select package exists and is tested elsewhere; `card-with-form` does not yet prove Select inside Card. |
| Docs evidence | Partial | Docs have a generic Card page and preview, not named `card-demo` or `card-with-form` evidence. |
| Candidate fixture evidence | Partial | Fixture routes prove generic Card mechanics but not the two named upstream example ids. |
| Reference fixture evidence | Out of scope | Reference fixture has generic static Card rows only; no named Card example comparison exists. |
| Playwright evidence | Partial | `static-display.spec.ts` proves generic Card slots and custom token styling but not named Card example parity. |

## Mapping Decisions

| Upstream mechanic | RadCN mapping |
| --- | --- |
| React component props and prop spreading | Map to deliberate Remix UI props on each Card part. |
| `className` | Maps to `class`; width/layout utilities can be author CSS classes or inline `style`. |
| `data-slot` | Maps to public `data-radcn-card*` hooks. |
| `cn` | Implementation detail. RadCN uses package classes, `class`, `style`, and CSS variables. |
| Tailwind `w-full`, `max-w-sm`, `w-[350px]` | Map to app/docs fixture classes or `style` width constraints. |
| Tailwind `flex`, `grid`, `gap-*`, `justify-between` | Map to Card package layout where reusable, or app/docs fixture layout classes/styles where example-specific. |
| `CardAction` | Already exists as `CardAction` with `data-radcn-card-action`. |
| `Button variant="link"` | Maps to RadCN Button link variant where the action is button-like; native anchors remain app-owned when real navigation is intended. |
| `Button variant="outline"` | Maps to RadCN Button `variant="outline"`. |
| Full-width buttons | App/docs fixture styling through `class` or `style`, not a Card dependency. |
| Input `type="email"` and `type="password"` | Map to RadCN Input `type` support and native input semantics. |
| Native form shell | App-owned form composition unless RadCN `Form` wiring is explicitly needed; Card does not own form state. |
| Select `position="popper"` | Select-owned overlay positioning. Card only composes the Select surface. |
| Form, Chart, and Carousel Card references | Separate resolved clusters or composition evidence; they are not extra Card example rows. |
| Block Card references | Future block parity work, not part of this Card example cluster. |
| `switch` registry dependency in `card-demo.json` | Registry metadata drift for this example; current source does not render Switch, so no Card/Switch follow-up is required from this row. |
| Vendor source | Read-only reference. No RadCN package or app code may import from `vendor/`. |

## Decision

The Card example cluster is partial. The `radcn/card` package API appears
sufficient for both active upstream examples: Card root, slots, action, sizing,
custom styling hooks, and composition with Button/Input/Label/Select are already
available. The missing work is named parity depth, not a known package API gap:
docs, candidate fixtures, and Playwright tests should render and assert
`card-demo` and `card-with-form` with their user-facing copy, form structure,
width/layout styling, CardAction placement, Button variants, Input types, and
Select composition.
