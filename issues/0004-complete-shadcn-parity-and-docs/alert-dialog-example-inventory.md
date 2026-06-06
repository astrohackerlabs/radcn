# Alert Dialog Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one active Alert Dialog example:
`alert-dialog-demo`.

RadCN already ships `radcn/alert-dialog` with AlertDialog,
AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay,
AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
AlertDialogDescription, AlertDialogAction, AlertDialogCancel, and
AlertDialogMedia exports. The package uses dependency-free modal enhancement
instead of React state or Radix AlertDialog primitives, and current
fixtures/tests prove alertdialog semantics, ARIA title/description wiring,
non-dismissible Escape/overlay behavior, focus trapping, action/cancel close
behavior, default-open state, size, custom tokens, portal mounting, and body
scroll locking.

The named upstream example is now covered by docs, candidate fixtures, and
Playwright tests that prove the exact `alert-dialog-demo` composition: an
outline Button trigger labelled `Show Dialog`, title `Are you absolutely
sure?`, account deletion description copy, cancel text `Cancel`, action text
`Continue`, no media block, and the upstream Button `asChild`/
AlertDialogTrigger composition mapping.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `alert-dialog-demo` | AlertDialog with `AlertDialogTrigger asChild` wrapping an outline Button labelled `Show Dialog`. Opening renders AlertDialogContent with AlertDialogHeader, title `Are you absolutely sure?`, description `This action cannot be undone. This will permanently delete your account and remove your data from our servers.`, AlertDialogFooter, cancel button `Cancel`, and action button `Continue`. The example has no media block. The upstream UI uses a React client component marker, Radix AlertDialog primitive, Button `asChild`, Button `variant="outline"`, `cn`, `data-slot`, `className`, Tailwind fixed overlay/content positioning, animation utilities, responsive header/footer layout, content `size`, portal/overlay/content composition, and Radix focus/dismissal behavior. | `radcn/apps/docs/app/content/components.tsx` promotes Alert Dialog to a rich docs page with `data-radcn-docs-alert-dialog-family="alert-dialog-demo"`, exact upstream copy, a `Show Dialog` trigger styled with `radcn-button radcn-button--outline`, portal/overlay/content/header/footer/title/description/action/cancel hooks, no media hook, and mapping copy for React client markers, Radix AlertDialog, Button `asChild`, outline Button styling, `cn`, `data-slot`, `className`, Tailwind layout/animation utilities, responsive layout, size/default sizing, custom tokens, and vendor source. `radcn/fixtures/candidate-remix/app/fixtures/alert-dialog.tsx` adds `alert-dialog/demo` with the exact no-media composition. `radcn/fixtures/tests/modal-variants.spec.ts` verifies exact trigger/title/description/cancel/action text, outline trigger class evidence, alertdialog role, aria-modal, ARIA title/description wiring, root/trigger/portal/overlay/content open state, body scroll lock, portal-root mounting, no media, initial focus on Cancel with Tab to Continue, non-dismissible Escape/overlay behavior, cancel/action close behavior, and focus return. `radcn/apps/docs/tests/coverage.spec.ts` verifies the docs proof surface and divergence copy. | Covered | None. |

## Decisions

- RadCN should keep Alert Dialog as dependency-free modal enhancement over
  package-rendered parts. The Radix AlertDialog primitive is not needed for
  this example.
- Upstream `AlertDialogTrigger asChild` plus Button `variant="outline"` maps to
  explicit RadCN trigger/button composition: `AlertDialogTrigger` styled with
  `radcn-button radcn-button--outline`. No Slot or package-level Button wrapper
  is required for this example.
- AlertDialog remains non-dismissible by default. Escape and overlay clicks
  should not close the named destructive confirmation example.
- `AlertDialogAction` and `AlertDialogCancel` are both native buttons in RadCN
  and close through `enhanceAlertDialog` selectors. Upstream Button wrapping is
  a styling/composition detail, not a dependency requirement.
- The upstream example has no `AlertDialogMedia`; named docs/fixtures should
  prove the no-media composition because current generic fixtures include a
  media block.
- RadCN already owns alertdialog role, aria-modal, title/description wiring,
  focus trap, body scroll lock, default-open, size, portal, overlay, content,
  header, footer, action, cancel, and custom-token behavior.
- Upstream `cn`, `data-slot`, `className`, Tailwind fixed positioning,
  animation utilities, responsive layout classes, and content size classes map
  to RadCN public hooks, package CSS, `class`, `style`, CSS variables, and
  docs/fixture composition.
- Exact upstream copy should be included in the named fixture/docs because the
  example's user-facing risk is destructive account deletion confirmation.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
