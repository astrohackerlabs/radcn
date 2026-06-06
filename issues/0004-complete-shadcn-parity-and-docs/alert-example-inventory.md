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
| `alert-demo` | Renders three Alerts in a stacked max-width grid: a default success alert with `CheckCircle2Icon`, title `Success! Your changes have been saved`, and description `This is an alert with icon, title and description.`; a default title-only alert with `PopcornIcon` and title `This Alert has a title and an icon. No description.`; and a destructive alert with `AlertCircleIcon`, title `Unable to process your payment.`, paragraph `Please verify your billing information and try again.`, and list items `Check your card details`, `Ensure sufficient funds`, and `Verify billing address`. | `radcn/alert` supports default/destructive variants, `role="alert"`, title and description parts, arbitrary description children including paragraphs/lists, public `data-radcn-*` hooks, custom classes/styles, and app-owned icon composition through children. Docs now render `data-radcn-docs-alert-family="alert-demo"` with the three exact upstream compositions and mapping copy. Candidate fixtures expose `/fixtures/alert/demo`; Playwright asserts the three Alerts, variants, role hooks, icon hooks, exact titles/descriptions, and list items. | Covered | None. |
| `alert-destructive` | Renders one destructive Alert with `AlertCircleIcon`, title `Error`, and description `Your session has expired. Please log in again.` | `radcn/alert` supports the destructive variant and role semantics. Docs now render `data-radcn-docs-alert-family="alert-destructive"` with exact upstream copy and mapping evidence. Candidate fixtures expose `/fixtures/alert/destructive-upstream`; Playwright asserts destructive variant, role semantics, exact title/description, and app-owned icon hook. | Covered | None. |

## Capability Matrix

| Capability | Current status | Evidence |
| --- | --- | --- |
| Default variant | Supported | `Alert` defaults `variant` to `default` and emits `radcn-alert--default`. |
| Destructive variant | Supported | `AlertVariant` includes `destructive`; candidate tests assert `data-variant="destructive"`. |
| Alert role semantics | Supported | `Alert` renders `role="alert"`; candidate tests assert the role. |
| Title part | Supported | `AlertTitle` renders `data-radcn-alert-title`; docs and fixtures use it. |
| Description part | Supported | `AlertDescription` renders `data-radcn-alert-description`; docs and fixtures use it. |
| Description paragraphs/lists | Supported and example-proven | `AlertDescription` accepts arbitrary children; docs and candidate fixtures now prove the upstream paragraph and list content for `alert-demo`. |
| Action composition | Supported beyond upstream examples | `AlertAction` exists and the default candidate fixture composes a `Button` action. Upstream Alert examples do not require an action. |
| Public hooks | Supported | Alert parts expose `data-radcn-alert`, `data-radcn-alert-title`, `data-radcn-alert-description`, and `data-radcn-alert-action`. |
| Custom classes/styles/tokens | Supported | Alert props accept `class` and `style`; the custom-token fixture and Playwright test prove public CSS variable customization. |
| Icon composition | Supported and example-proven by app-owned children | The package accepts arbitrary children before title/description; docs and fixtures now prove app-owned hooks for the check-circle, popcorn, and alert-circle icon roles. |
| Docs evidence | Covered | The docs route renders named `alert-demo` and `alert-destructive` examples with stable hooks and mapping copy. |
| Candidate fixture evidence | Covered | The fixture app covers generic default/destructive/custom-token routes plus named `demo` and `destructive-upstream` Alert routes. |
| Playwright evidence | Covered | Static fixture tests and docs coverage prove role, variants, title/description hooks, exact upstream copy, list content, app-owned icon hooks, custom-token styling, and mapping copy. |

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

The Alert package API is sufficient for the two active upstream Alert examples.
RadCN covers `alert-demo` and `alert-destructive` with package support, named
docs examples, candidate fixture routes, Playwright coverage, exact upstream
copy, app-owned icon composition, and recorded non-dependency mappings. No
Alert package API change was needed.
