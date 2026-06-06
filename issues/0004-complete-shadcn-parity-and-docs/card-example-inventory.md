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
| `card-demo` | Renders a max-width login/account card with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter`. The content composes a native form shell, email/password inputs, labels, a forgot-password link, a link-variant signup button, a full-width submit button, and an outline Google button. Styling comes from `className` width, flex/grid/gap utilities, and CardAction placement. The registry JSON lists `switch` as a dependency, but the current source does not import or render Switch. | `radcn/card` ships all Card parts including `CardAction`, public hooks, `size`, `class`, `style`, and token-driven styling. Docs and candidate fixtures now render named `card-demo` evidence with the login copy, CardAction Sign Up link, native form shell, labelled email/password inputs, required/type semantics, forgot-password link, full-width Login button, outline Login with Google button, public Card hooks, and Playwright assertions. | Covered | No Card package API change was needed. Keep form behavior and auth actions app-owned composition. |
| `card-with-form` | Renders a fixed-width project creation card with header/title/description, a native form shell, project-name `Input`, framework `Select` with `SelectTrigger`, `SelectValue`, `SelectContent position="popper"`, four options, and footer buttons laid out with `justify-between`. Styling comes from `className="w-[350px]"`, grid/flex/gap utilities, and Button variants. | `radcn/card` provides the needed slots and custom `class`/`style` hooks. Docs and candidate fixtures now render named `card-with-form` evidence with project copy, fixed-width styling, labelled project-name Input, framework Select composition/options, Cancel and Deploy buttons, footer layout, native form structure, public hooks, and Playwright assertions. | Covered | No Card package API change was needed. Select overlay behavior remains Select-owned composition. |

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
| Full-width and max-width styling | Supported | `card-demo` docs and fixture use author styling to map upstream width utilities. |
| Compact fixed-width styling | Supported | `card-with-form` docs and fixture use author styling to map `w-[350px]`. |
| Login/account form composition | Supported | Named `card-demo` docs, fixture, and Playwright evidence prove the composition. |
| Project form composition | Supported | Named `card-with-form` docs, fixture, and Playwright evidence prove the composition. |
| Button composition | Supported | Named Card examples prove link, full-width, outline, cancel, and deploy buttons in Card context. |
| Input and Label composition | Supported | Named Card examples prove labelled email/password/project fields in Card context. |
| Select composition | Supported | Named `card-with-form` docs, fixture, and Playwright evidence prove Select composition inside Card. |
| Docs evidence | Supported | Card is an authored rich docs page with named `card-demo` and `card-with-form` evidence. |
| Candidate fixture evidence | Supported | Fixture routes include `card/demo` and `card/with-form`. |
| Reference fixture evidence | Out of scope | Reference fixture has generic static Card rows only; no named Card example comparison exists. |
| Playwright evidence | Supported | `static-display.spec.ts` and docs coverage prove named Card example parity. |

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

The Card example cluster is resolved. `card-demo` and `card-with-form` are now
covered by package-owned Card slots plus named docs, candidate fixtures, and
Playwright evidence. No Card package API change was needed: Card owns the
surface and slots, while Button, Input, Label, Select, native forms, auth
behavior, project creation behavior, and overlay state remain composed
application/package concerns. RadCN did not add React, Tailwind, `cn`, vendor
imports, form-state dependencies, or a new Card dependency.
