# Resizable Example Inventory

This audit maps the active upstream shadcn/ui New York v4 Resizable example
cluster to current RadCN evidence. It covers only the examples named by
`parity-inventory.md` for the `resizable` cluster:

- `resizable-demo`
- `resizable-demo-with-handle`
- `resizable-handle`
- `resizable-vertical`

Adjacent upstream references such as `resizable-rtl` and `resizable-example`
are noted as out of the current generated cluster.

## Sources

- Upstream component:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/resizable.tsx`
- Upstream examples:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/resizable-demo.tsx`,
  `resizable-demo-with-handle.tsx`, `resizable-handle.tsx`, and
  `resizable-vertical.tsx`
- Upstream public registry JSON:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/resizable-demo.json`,
  `resizable-demo-with-handle.json`, `resizable-handle.json`, and
  `resizable-vertical.json`
- RadCN package:
  `radcn/packages/radcn/src/components/resizable.tsx`
- RadCN styles:
  `radcn/packages/radcn/src/styles/tokens.css`
- RadCN docs:
  `radcn/apps/docs/app/content/components.tsx` and
  `radcn/apps/docs/tests/coverage.spec.ts`
- RadCN fixtures:
  `radcn/fixtures/scenarios/index.ts`,
  `radcn/fixtures/candidate-remix/app/fixtures/resizable.tsx`,
  `radcn/fixtures/candidate-remix/app/assets/entry.ts`,
  `radcn/fixtures/reference-react-router/app/fixtures/resizable.tsx`, and
  `radcn/fixtures/tests/application-shell.spec.ts`

## Mapping Rules

- Upstream `ResizablePanelGroup` maps to RadCN `ResizablePanelGroup`, which
  renders a panel group with `data-radcn-resizable-panel-group`.
- Upstream `ResizablePanel` maps to RadCN `ResizablePanel`, which renders a
  flex-basis-owned panel with `data-radcn-resizable-panel`.
- Upstream `ResizableHandle` maps to RadCN `ResizableHandle`, which renders a
  semantic `role="separator"` handle with `data-radcn-resizable-handle`.
- Upstream React `className` maps to RadCN `class`.
- Upstream `orientation`, `defaultSize`, `minSize`, and `withHandle` map to
  explicit RadCN props.
- Upstream `data-slot` names map to RadCN public `data-radcn-*` hooks and
  stable class names, not literal DOM equality.
- Upstream `react-resizable-panels` mechanics map to RadCN's dependency-free
  `enhanceResizable()` behavior, pointer events, keyboard events, ARIA value
  attributes, and `radcn-resizable-change` events.
- Upstream `GripVerticalIcon` from `lucide-react` maps to RadCN's
  dependency-free decorative grip. Exact icon path parity is app-owned
  presentation, not a package dependency.
- Upstream Tailwind utilities map to RadCN CSS variables, stable classes,
  `class`, `style`, and app-authored CSS.
- Vendor source is reference material only and must not become a runtime or
  package dependency.

## Current RadCN Evidence

- Package exports `ResizablePanelGroup`, `ResizablePanel`,
  `ResizableHandle`, `enhanceResizable`, and public prop types from
  `radcn/packages/radcn/src/index.ts`.
- `ResizablePanelGroup` supports `orientation`, `class`, `id`, `style`, and
  children.
- `ResizablePanel` supports `defaultSize`, `minSize`, `class`, `id`, `style`,
  and children.
- `ResizableHandle` supports `withHandle`, `disabled`, `label`, `class`, and
  `style`.
- Package enhancement sets `aria-orientation`, `aria-valuemin`,
  `aria-valuemax`, `aria-valuenow`, keyboard resizing, pointer resizing, and
  emits `radcn-resizable-change`.
- Source CSS covers horizontal and vertical group layout, panel overflow,
  handle orientation, focus-visible styling, visible grip styling, and custom
  CSS variables.
- Docs registry includes a `resizable` page and preview hook
  `[data-radcn-resizable-panel-group]`.
- Candidate fixtures include default, vertical, with-handle, keyboard, and
  custom-token routes.
- Reference React Router fixtures mirror the current generic scenario family
  for comparison.
- Playwright coverage verifies horizontal orientation, separator ARIA
  orientation/value, keyboard resizing, emitted resize event detail, vertical
  orientation, visible handle grip, and custom token styling.

## Examples

| Example | User-facing behavior | Upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- | --- |
| `resizable-demo` | A horizontal outer group splits `One` from a nested vertical group containing `Two` and `Three`; handles have no visible grip. | Uses `ResizablePanelGroup orientation="horizontal"`, 50/50 outer panels, a nested `ResizablePanelGroup orientation="vertical"` with 25/75 panels, and two plain `ResizableHandle` instances. | RadCN supports horizontal and vertical groups, nested composition in principle, default sizes, plain handles, pointer/keyboard enhancement, and public hooks. Current docs and fixtures show a two-panel generic layout and do not prove the nested `One`/`Two`/`Three` composition by named id. | Partial | Add named docs/fixture/Playwright evidence for the nested horizontal-plus-vertical demo without handle grips. |
| `resizable-demo-with-handle` | The same nested `One`/`Two`/`Three` layout as `resizable-demo`, but both handles show visible grip affordances. | Uses the same nested group structure with `ResizableHandle withHandle` on both separators. | RadCN supports `withHandle` and Playwright proves a visible handle grip on the generic `with-handle` route. Current fixtures do not prove nested grips on both outer and inner handles or the named upstream composition. | Partial | Add named docs/fixture/Playwright evidence for nested groups with two `withHandle` grips. |
| `resizable-handle` | A two-panel horizontal group splits `Sidebar` and `Content` at 25/75 with a visible handle grip. | Uses a horizontal group, `ResizablePanel defaultSize="25%"`, `ResizableHandle withHandle`, and `ResizablePanel defaultSize="75%"`. | RadCN supports `defaultSize`, horizontal groups, and visible grips. Current generic fixtures use `Navigation`/`Preview` and usually 50/50 or keyboard 40/60 sizes, so they do not prove the upstream `Sidebar`/`Content` 25/75 named example. | Partial | Add named docs/fixture/Playwright evidence for the `Sidebar`/`Content` 25/75 visible-handle composition. |
| `resizable-vertical` | A vertical two-panel group splits `Header` and `Content` at 25/75 with a plain handle. | Uses `ResizablePanelGroup orientation="vertical"`, `ResizablePanel defaultSize="25%"`, plain `ResizableHandle`, and `ResizablePanel defaultSize="75%"`. | RadCN supports vertical groups and Playwright proves separator `aria-orientation="vertical"`. Current generic vertical fixture uses `Navigation`/`Preview` and 50/50 sizes, so it does not prove the upstream labels, sizes, or named example. | Partial | Add named docs/fixture/Playwright evidence for the `Header`/`Content` 25/75 vertical composition. |

## Coverage Notes

- Resizable-owned primitive behavior is already strong. RadCN has
  dependency-free resizing, semantic handles, ARIA value attributes, keyboard
  and pointer resizing, emitted resize events, orientation styling, grip
  rendering, and token customization.
- The active gap is named example parity depth, not a package API blocker.
  Existing fixtures prove generic two-panel behavior, but they do not prove the
  four upstream example ids with nested groups, exact panel labels, 25/75
  sizing where required, and handle-grip variants.
- Upstream `react-resizable-panels` and `lucide-react` are not required RadCN
  dependencies. RadCN should continue using dependency-free enhancement and
  decorative grip presentation unless a concrete blocker appears.
- `resizable-rtl` is not in the active generated cluster. Direction/RTL
  behavior should be handled only if a later inventory recommends it or a
  broader direction issue requires it.

## Decision

`resizable` is not resolved yet. The next experiment should implement named
Resizable example parity depth for `resizable-demo`,
`resizable-demo-with-handle`, `resizable-handle`, and `resizable-vertical`
without changing the package API unless implementation uncovers a concrete
primitive blocker.
