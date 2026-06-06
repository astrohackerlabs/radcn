# Alert Example Inventory

## Scope

This audit covers the active upstream Alert example cluster recommended by
`parity-inventory.md`:

- `alert-demo`
- `alert-destructive`

Adjacent Alert Dialog examples are out of scope for this cluster. They belong to
the separate `alert-dialog` component surface.

## Evidence Reviewed

- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/alert.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/alert-demo.tsx`
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/alert-destructive.tsx`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert-demo.json`
- `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert-destructive.json`
- `radcn/packages/radcn/src/components/alert.tsx`
- `radcn/packages/radcn/src/styles/index.ts`
- `radcn/apps/docs/app/content/components.tsx`
- `radcn/apps/docs/tests/coverage.spec.ts`
- `radcn/fixtures/scenarios/index.ts`
- `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
- `radcn/fixtures/tests/static-display.spec.ts`

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `alert-demo` | Renders three Alerts in a stacked max-width grid: a default success alert with `CheckCircle2Icon`, title `Success! Your changes have been saved`, and description `This is an alert with icon, title and description.`; a default title-only alert with `PopcornIcon` and title `This Alert has a title and an icon. No description.`; and a destructive alert with `AlertCircleIcon`, title `Unable to process your payment.`, paragraph `Please verify your billing information and try again.`, and list items `Check your card details`, `Ensure sufficient funds`, and `Verify billing address`. | `radcn/alert` supports default/destructive variants, `role="alert"`, title and description parts, arbitrary description children including paragraphs/lists, public `data-radcn-*` hooks, custom classes/styles, and app-owned icon composition through children. Docs and fixtures currently prove only generic default/destructive/custom-token Alert behavior, not this named three-alert composition or exact upstream copy. | Partial | Add docs, candidate fixture, and Playwright evidence for a named `alert-demo` family that renders the three upstream compositions, exact titles/descriptions/list items, destructive variant, and app-owned icons without adding `lucide-react` or package API dependencies. |
| `alert-destructive` | Renders one destructive Alert with `AlertCircleIcon`, title `Error`, and description `Your session has expired. Please log in again.` | `radcn/alert` supports the destructive variant and role semantics. The candidate fixture and Playwright test prove a destructive Alert, but with RadCN-specific copy `Unable to save changes` / `Review the highlighted fields and try again.` rather than the named upstream example id and copy. | Partial | Add named docs, fixture, and Playwright evidence for `alert-destructive` with exact upstream title/description and app-owned icon composition. |

## Capability Matrix

| Capability | Current status | Evidence |
| --- | --- | --- |
| Default variant | Supported | `Alert` defaults `variant` to `default` and emits `radcn-alert--default`. |
| Destructive variant | Supported | `AlertVariant` includes `destructive`; candidate tests assert `data-variant="destructive"`. |
| Alert role semantics | Supported | `Alert` renders `role="alert"`; candidate tests assert the role. |
| Title part | Supported | `AlertTitle` renders `data-radcn-alert-title`; docs and fixtures use it. |
| Description part | Supported | `AlertDescription` renders `data-radcn-alert-description`; docs and fixtures use it. |
| Description paragraphs/lists | Supported by composition, not yet example-proven | `AlertDescription` accepts arbitrary children, so paragraphs and lists are app markup. No current named Alert example proves the upstream list content. |
| Action composition | Supported beyond upstream examples | `AlertAction` exists and the default candidate fixture composes a `Button` action. Upstream Alert examples do not require an action. |
| Public hooks | Supported | Alert parts expose `data-radcn-alert`, `data-radcn-alert-title`, `data-radcn-alert-description`, and `data-radcn-alert-action`. |
| Custom classes/styles/tokens | Supported | Alert props accept `class` and `style`; the custom-token fixture and Playwright test prove public CSS variable customization. |
| Icon composition | Supported by app-owned children | The package accepts arbitrary children before title/description. Current docs/fixtures do not yet prove the exact three upstream icon cases. |
| Docs evidence | Partial | The docs route renders a generic Alert preview and source snippet, not named upstream Alert examples. |
| Candidate fixture evidence | Partial | The fixture app covers generic default, destructive, and custom-token Alert scenarios, not exact upstream example ids/copy. |
| Playwright evidence | Partial | Static fixture tests prove role, destructive variant, title hook, and custom-token styling, but not `alert-demo` or `alert-destructive` parity. |

## Mapping Decisions

| Upstream mechanic | RadCN mapping |
| --- | --- |
| React component props and `className` | Map to explicit Remix UI props and RadCN's `class` prop. React prop spreading is not required for parity. |
| `variant` | Preserve as `variant="default"` / `variant="destructive"`. |
| `data-slot` | Map to stable public `data-radcn-*` hooks. DOM attribute names may differ if user-facing behavior and customization remain equivalent. |
| cva and `cn` utilities | Implementation detail only. RadCN owns static classes and CSS variables instead of depending on `class-variance-authority` or shadcn utility helpers. |
| Tailwind utilities | Implementation detail only. RadCN maps the visual behavior into package CSS and app-owned layout classes where needed. |
| `AlertCircleIcon`, `CheckCircle2Icon`, `PopcornIcon` | App-owned icon composition. RadCN must permit icons as children but should not depend on `lucide-react`. |
| `lucide-react` | Not a RadCN dependency. Docs/fixtures may use plain SVG, existing icon utilities, or package-neutral app markup. |
| SVG/icon layout | Package styles should make inline child icons usable, but the exact SVG implementation belongs to examples. |
| Alert Dialog references | Separate component cluster. Alert Dialog must not be folded into Alert parity. |
| Vendor source | Read-only reference. No RadCN package or app code may import from `vendor/`. |

## Decision

The Alert package API appears sufficient for the two active upstream Alert
examples. The remaining gap is example parity depth: RadCN needs named docs,
candidate fixture, and Playwright coverage for `alert-demo` and
`alert-destructive` with exact user-facing copy and compositions. The next
experiment should implement those named Alert examples without changing the
package API unless a concrete package-level issue appears during
implementation.
