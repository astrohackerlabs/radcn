# Command Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Command examples:
`command-demo` and `command-dialog`. RadCN already ships `radcn/command` with
the core package behavior needed for searchable command lists and dialog
composition, but the current docs, fixtures, and Playwright tests do not yet
prove the named upstream example compositions.

**Audit outcome:** Covered.

Experiment 64 implemented named Command example parity in the docs site and
candidate fixture app, added focused Playwright coverage, and resolved the
package-level group heading gap without adding React, `cmdk`, `lucide-react`,
Tailwind, `cn`, or vendor dependencies to RadCN.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `command-demo` | Static command palette card with rounded border/shadow/min-width styling, search input placeholder, empty state, two groups labelled `Suggestions` and `Settings`, separator, six items, app-owned icons, one disabled Calculator item, and three shortcut hints. | `radcn/command` supports root, input, list, empty state, group headings, separators, items, disabled items, shortcuts, filtering, keyboard movement, activation events, checked/selected indicators, public hooks, classes/styles/tokens, and app-owned icon children. Docs and candidate fixtures now render named `command-demo` evidence with the upstream copy, rows, headings, disabled Calculator, icon hooks, shortcuts, and card styling. Playwright covers the named docs and fixture behavior plus generic Command behavior. | Covered | No follow-up. Keep icon choice and card width/shadow styling app-owned composition. |
| `command-dialog` | App-owned `Cmd/Ctrl+J` listener toggles controlled dialog state, visible `Press ⌘J` guidance with `kbd` styling, `CommandDialog open/onOpenChange`, search input, empty state, two labelled groups, separator, six items, icons, and three shortcut hints. Calculator is enabled in this example. | `radcn/command` exports `CommandDialog` composed with `radcn/dialog`, supports title, description, default/open state, modal/dismissible behavior, and close-button configuration. Docs and candidate fixtures now render named `command-dialog` evidence with shortcut guidance, Kbd composition, app-owned `⌘J`/`Ctrl+J` opening behavior, dialog role/title/description, exact rows, enabled Calculator, shortcuts, and Escape close behavior. | Covered | No follow-up. Global shortcut routing remains app-owned enhancement and is not a Command package dependency. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Command root/input/list/empty/items/separators/shortcuts | Covered by `radcn/packages/radcn/src/components/command.tsx`, generic candidate fixtures, and `combobox-command.spec.ts`. |
| Filtering, keyboard movement, Home/End, Enter activation, click activation, disabled item skip, empty state | Covered by `enhanceCommand`, `setupSearchableListbox`, and existing Playwright tests. |
| Checked/selected indicators | Covered generically through `checked`, `data-checked`, selected activation state, and candidate tests. The upstream Command examples do not require checked items. |
| Group headings or labels | Covered. RadCN `CommandGroup` now accepts `heading`, renders visible `data-radcn-command-group-heading`, and can wire `aria-labelledby` when an explicit group id is supplied. |
| Icon composition | App-owned. Upstream uses lucide icons (`SearchIcon`, `Calendar`, `Smile`, `Calculator`, `User`, `CreditCard`, `Settings`), while RadCN should accept arbitrary children/icons and should not depend on `lucide-react`. Named examples should use the project's chosen plain-SVG/icon strategy if visual icon parity is needed. |
| `CommandDialog open` and `onOpenChange` | Covered as a mapping. RadCN supports initial server/render state and Dialog dismissal; React-style controlled state callbacks map to app-owned enhancement for dynamic shortcut opening. |
| Global `⌘J`/`Ctrl+J` listener and React `useState`/`useEffect` | Covered as app-owned behavior. Docs and candidate fixtures demonstrate local shortcut opening without installing package-owned document-level shortcut handlers. |
| `kbd` copy | Covered through RadCN Kbd composition in docs and candidate fixtures; Command does not own keyboard-copy styling. |
| `cmdk`, `CommandPrimitive`, React props, `className`, `data-slot`, `cn`, Tailwind utilities | Implementation details or React/Tailwind mechanics from shadcn/ui. RadCN maps these to Remix UI handles, `class`, `data-radcn-*` hooks, package CSS, and public class/style/token customization. They are not RadCN dependencies. |
| Dialog composition | Covered at the package-composition level through `CommandDialog`, but named `command-dialog` behavior needs docs/fixture/test evidence. |
| Vendor source | Reference only. No RadCN package, docs, fixture, or test code should depend on `vendor/`. |

## Evidence

- Upstream package source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/command.tsx`.
- Upstream example source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/command-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/command-dialog.tsx`.
- Upstream registry metadata:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/command.json`,
  `command-demo.json`, and `command-dialog.json`.
- Current RadCN package source:
  `radcn/packages/radcn/src/components/command.tsx` and
  `radcn/packages/radcn/src/utils/searchable-listbox.ts`.
- Current docs evidence:
  `radcn/apps/docs/app/content/components.tsx` has named
  `data-radcn-docs-command-family` examples for `command-demo` and
  `command-dialog`.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/command.tsx` covers generic
  Command scenarios plus named `demo` and `dialog-demo` routes.
- Current Playwright evidence:
  `radcn/fixtures/tests/combobox-command.spec.ts` covers generic Command
  filtering, activation, disabled state, groups, separator, shortcuts, checked
  state, dialog composition, Escape close, custom token styling, named
  `command-demo`, and named `command-dialog`. `radcn/apps/docs/tests/coverage.spec.ts`
  covers the named docs examples and mapping copy.
