# Sonner Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes two active Sonner examples:
`sonner-demo` and `sonner-types`.

RadCN already has strong notification primitives: `radcn/sonner` renders
server-provided initial toasts, `radcn/toast` dispatches browser toast events,
and fixture coverage proves accessible regions, status/alert roles, default,
success, error, loading, action, dismiss, stack, custom tokens, and event
dispatch behavior without React or the Sonner package dependency.

The named upstream examples are still partial because current docs, fixtures,
and tests do not prove the exact upstream Button trigger compositions,
messages, action label, type set, or promise-loading flow.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `sonner-demo` | Outline Button labelled `Show Toast`. Clicking it calls `toast("Event has been created", { description: "Sunday, December 03, 2023 at 9:00 AM", action: { label: "Undo", onClick: () => console.log("Undo") } })`. Uses React client component marker, React click handler, Sonner `toast`, Button composition, action callback, `console.log`, `className`/Tailwind through Button, and Sonner runtime. | `radcn/sonner` supports server-rendered toasts with title, description, action label/url, roles, aria-live behavior, duration, dismiss controls, and public hooks. `radcn/toast` supports browser-dispatched toast payloads from triggers and helper APIs. Current docs show static Toaster examples, and fixtures cover action toasts, event-dispatched toasts, dismiss behavior, and dependency absence. However no current Sonner docs/fixture/test proves the named `Show Toast` trigger, exact title `Event has been created`, exact date description, exact `Undo` action label, or upstream `sonner-demo` mapping. | Partial | Add named docs, candidate fixture, and Playwright coverage for `sonner-demo` with a `Show Toast` outline Button trigger, exact title/description/action label, event-dispatched or initial toast evidence, public hooks, and mapping copy. Map action callback/console behavior to app-owned link/event behavior rather than a package dependency. |
| `sonner-types` | Flex-wrapped Button group with six outline Buttons labelled `Default`, `Success`, `Info`, `Warning`, `Error`, and `Promise`. Each triggers the corresponding Sonner API: `toast`, `toast.success`, `toast.info`, `toast.warning`, `toast.error`, and `toast.promise` with loading text `Loading...`, success callback text `${data.name} has been created`, and error text `Error`. Uses React client component marker, React click handlers, Sonner typed helpers, promise orchestration, `setTimeout`, Button composition, Tailwind flex/gap utilities, and Sonner runtime. | Current RadCN fixtures cover default, success, error, loading, action, dismiss, stack with info/warning, custom tokens, and event dispatch. Toaster maps warning/error to alert roles and default/success/info/loading to status roles. Current tests do not prove the exact six upstream trigger labels, exact upstream messages for default/success/info/warning/error, or a named promise sequence equivalent. RadCN has no Sonner dependency and should not implement Sonner's exact `toast.promise` API unless a later experiment finds a clear RadCN helper need. | Partial | Add named docs, candidate fixture, and Playwright coverage for the six upstream type triggers and exact messages. Decide whether `toast.promise` maps to app-owned browser orchestration that dispatches loading then success/error events, or to an explicit intentional divergence. Keep Sonner, React, next-themes, lucide icons, Tailwind, `cn`, and vendor source out of RadCN dependencies. |

## Decisions

- `radcn/sonner` remains the Toaster rendering surface. It should not import
  or wrap the upstream `sonner` package.
- `radcn/toast` remains the explicit browser event/helper surface for
  client-dispatched notifications.
- shadcn React click handlers map to native Button triggers plus RadCN browser
  events, server-provided initial Toaster state, route state, or app-owned
  enhancement.
- `toast.promise` is promise orchestration, not Toaster rendering. A follow-up
  implementation should decide whether to document it as app-owned orchestration
  or add a dependency-free helper only if it removes real repeated complexity.
- Sonner `Toaster`, `next-themes`, lucide icons, Tailwind utilities,
  `className`, `data-slot`, `cn`, and vendor source remain mappings or
  non-dependencies, not required RadCN dependencies.
