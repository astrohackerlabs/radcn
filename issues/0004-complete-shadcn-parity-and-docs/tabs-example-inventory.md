# Tabs Example Inventory

## Summary

Upstream shadcn/ui New York v4 has one direct Tabs example, `tabs-demo`.
RadCN has strong Tabs behavior substrate and fixture coverage for tablist
semantics, default values, pointer activation, horizontal and vertical keyboard
navigation, manual activation, disabled triggers, custom tokens, `data-state`,
ARIA associations, and generic preview/code docs composition.

The current outcome is `Covered`. Experiment 119 added named `tabs-demo`
parity across the docs page, candidate fixture route, and Playwright coverage.

Current RadCN evidence compared in this audit:

- `radcn/packages/radcn/src/components/tabs.tsx` exports `Tabs`, `TabsList`,
  `TabsTrigger`, `TabsContent`, and `enhanceTabs`, with browser enhancement
  for roles, ids, `aria-selected`, `aria-controls`, `aria-labelledby`,
  keyboard navigation, roving focus, automatic/manual activation, disabled
  triggers, horizontal/vertical orientation, `data-value`, and `data-state`.
- `radcn/packages/radcn/src/styles/tokens.css` defines Tabs root, list,
  trigger, content, active/inactive, disabled, orientation, focus, and custom
  token styling.
- `radcn/packages/radcn/src/index.ts` re-exports Tabs parts and types.
- `radcn/packages/radcn/package.json` exposes the `./tabs` package subpath.
- `radcn/apps/docs/app/content/components.tsx` includes generic preview/code
  Tabs docs and a named direct `tabs-demo` Account/Password card form.
- `radcn/apps/docs/app/assets/entry.ts` scopes `enhanceTabs` to the named
  docs `tabs-demo` example so browser selection behavior runs on the docs
  page.
- `radcn/apps/docs/tests/coverage.spec.ts` checks the named `tabs-demo` docs
  example, public hooks, source snippet, dependency-divergence copy, and live
  Account/Password selection behavior.
- `radcn/fixtures/scenarios/index.ts` lists generic Tabs scenarios for
  default, default-value, disabled, vertical, manual, custom-token, plus the
  named `demo` route.
- `radcn/fixtures/candidate-remix/app/fixtures/tabs.tsx` renders generic
  Account/Password/Billing behavior fixtures through `AccountTabs` and the
  exact upstream Account/Password card form demo through `TabsDemo`.
- `radcn/fixtures/tests/tabs.spec.ts` asserts named `tabs-demo` composition,
  labels, input ids, values, password types, buttons, pointer activation,
  keyboard activation, public hooks, and the existing generic default
  selection, tablist semantics, ARIA associations, default value, manual
  activation, disabled trigger behavior, vertical orientation, and custom
  tokens.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `tabs-demo` | Renders a wrapper `className="flex w-full max-w-sm flex-col gap-6"` with `Tabs defaultValue="account"`, a `TabsList`, Account and Password triggers, Account content containing a Card with title `Account`, description `Make changes to your account here. Click save when you're done.`, labelled Name and Username inputs with ids `tabs-demo-name` and `tabs-demo-username` and default values `Pedro Duarte` and `@peduarte`, and footer button `Save changes`. Password content contains a Card with title `Password`, description `Change your password here. After saving, you'll be logged out.`, labelled password inputs `tabs-demo-current` and `tabs-demo-new`, and footer button `Save password`. The example imports unused `AppWindowIcon` and `CodeIcon` from `lucide-react`. Upstream package mechanics include `"use client"`, React props, Radix Tabs primitive, `TabsPrimitive.Root`, `TabsPrimitive.List`, `TabsPrimitive.Trigger`, `TabsPrimitive.Content`, `cva`, `VariantProps`, `tabsListVariants`, `defaultValue="account"`, `data-slot`, `data-orientation`, `data-variant`, `data-state`, `className`, Tailwind utilities, `cn`, keyboard behavior, disabled behavior, custom tokens, and vendor source. | RadCN exports dependency-free Tabs primitives with scoped `enhanceTabs`, public root/list/trigger/content hooks, default value metadata, active/inactive `data-state`, ARIA tab associations, pointer activation, horizontal/vertical keyboard behavior, manual activation, disabled trigger behavior, and custom-token coverage. Experiment 119 added named docs and candidate fixture evidence for the exact Account/Password Card composition, ids, server-rendered input values, descriptions, buttons, wrapper layout, source snippet, unused lucide import decision, cva/Radix/Tailwind divergence copy, and Card/Input/Label/Button composition inside Tabs. Fixture and docs Playwright coverage prove the named demo's initial Account state, pointer activation to Password, keyboard activation, ARIA hooks, hidden panels, labels, input ids, input values, password input types, and buttons. | Covered | None. |

## Decisions

- React non-dependency: RadCN should not import React or React component prop
  aliases for Tabs. The equivalent author-facing surface is explicit Remix UI
  props and scoped browser enhancement.
- Radix non-dependency: RadCN should not import `radix-ui` or
  `TabsPrimitive.*`. Radix Root/List/Trigger/Content map to RadCN
  root/list/trigger/content parts plus `enhanceTabs`.
- cva non-dependency: RadCN should not import `class-variance-authority`.
  `tabsListVariants` and `VariantProps` map to package classes, explicit
  props, CSS variables, and documented variant decisions.
- Upstream `defaultValue="account"` maps to RadCN `defaultValue="account"`,
  `data-default-value="account"`, initial `data-value="account"`, active
  Account trigger, and visible Account panel.
- Upstream React `defaultValue` on inputs maps to static RadCN `Input value`
  for this server-rendered docs/fixture demo.
- The upstream Account/Password card form is a composition example: Tabs
  should compose with existing RadCN Card, Label, Input, and Button
  primitives, not grow form-field ownership.
- Upstream unused `AppWindowIcon` and `CodeIcon` imports should be documented
  as unused upstream imports that do not map to RadCN dependencies.
- Upstream `data-slot` maps to public `data-radcn-tabs`,
  `data-radcn-tabs-list`, `data-radcn-tabs-trigger`, and
  `data-radcn-tabs-content` hooks.
- Upstream `data-orientation`, `data-variant`, and `data-state` map to RadCN
  orientation metadata, package/default list styling decisions, and active/
  inactive state hooks.
- Browser Tabs behavior is behavior-level parity, not literal Radix DOM
  equality: roles, ARIA associations, default selection, keyboard navigation,
  pointer activation, disabled behavior, and hidden panels are the important
  evidence.
- Custom tokens are already covered by `radcn-fixture-custom-tabs`.
- Vendor source remains a reference only. The next implementation should not
  commit vendored shadcn source or add runtime dependencies on React, Radix,
  lucide-react, cva, or Tailwind.
