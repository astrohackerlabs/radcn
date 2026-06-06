# Command Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Command examples:
`command-demo` and `command-dialog`. RadCN already ships `radcn/command` with
the core package behavior needed for searchable command lists and dialog
composition, but the current docs, fixtures, and Playwright tests do not yet
prove the named upstream example compositions.

**Audit outcome:** Partial.

The next experiment should implement named Command example parity in the docs
site and candidate fixture app, then add focused Playwright coverage. That work
should avoid adding React, `cmdk`, `lucide-react`, Tailwind, `cn`, or vendor
dependencies to RadCN.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `command-demo` | Static command palette card with rounded border/shadow/min-width styling, search input placeholder, empty state, two groups labelled `Suggestions` and `Settings`, separator, six items, app-owned icons, one disabled Calculator item, and three shortcut hints. | `radcn/command` supports root, input, list, empty state, groups, separators, items, disabled items, shortcuts, filtering, keyboard movement, activation events, checked/selected indicators, public hooks, classes/styles/tokens, and app-owned icon children. Current docs render a generic command snippet; candidate fixtures cover generic groups, separators, disabled item behavior, shortcuts, checked state, filtering, empty state, activation, and custom tokens. Playwright covers those generic behaviors. | Partial | Add a named `command-demo` docs example and candidate fixture using the upstream copy and rows. Decide whether `CommandGroup` gains a `heading`/`label` prop or whether RadCN documents labelled group content as the Remix-native mapping, then test the chosen mapping. |
| `command-dialog` | App-owned `Cmd/Ctrl+J` listener toggles controlled dialog state, visible `Press ⌘J` guidance with `kbd` styling, `CommandDialog open/onOpenChange`, search input, empty state, two labelled groups, separator, six items, icons, and three shortcut hints. Calculator is enabled in this example. | `radcn/command` exports `CommandDialog` composed with `radcn/dialog`, supports `defaultOpen`, `open`, title, description, modal/dismissible behavior, and close-button configuration. Candidate fixtures prove a default-open command dialog renders as a dialog and closes with Escape. Current tests do not prove app-owned global shortcut behavior, `Press ⌘J` guidance, exact upstream rows, enabled Calculator in the dialog example, or named `command-dialog` docs/fixture coverage. | Partial | Add a named `command-dialog` docs example and fixture that shows app-owned shortcut guidance and dialog opening behavior without making global shortcut routing part of the Command package. Reuse or compose RadCN Kbd if appropriate, and test the visible guidance, dialog visibility, rows, and Escape close behavior. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Command root/input/list/empty/items/separators/shortcuts | Covered by `radcn/packages/radcn/src/components/command.tsx`, generic candidate fixtures, and `combobox-command.spec.ts`. |
| Filtering, keyboard movement, Home/End, Enter activation, click activation, disabled item skip, empty state | Covered by `enhanceCommand`, `setupSearchableListbox`, and existing Playwright tests. |
| Checked/selected indicators | Covered generically through `checked`, `data-checked`, selected activation state, and candidate tests. The upstream Command examples do not require checked items. |
| Group headings or labels | Partial. Upstream uses `CommandGroup heading`. RadCN `CommandGroup` currently accepts child content/class/style but no `heading` prop; generic tests only prove group count and separators, not visible group labels. |
| Icon composition | App-owned. Upstream uses lucide icons (`SearchIcon`, `Calendar`, `Smile`, `Calculator`, `User`, `CreditCard`, `Settings`), while RadCN should accept arbitrary children/icons and should not depend on `lucide-react`. Named examples should use the project's chosen plain-SVG/icon strategy if visual icon parity is needed. |
| `CommandDialog open` and `onOpenChange` | Partial mapping. RadCN supports `open`/`defaultOpen` as initial server/render state and Dialog dismissal, but it does not own React-style controlled state callbacks. App-owned scripts/controllers should handle dynamic global shortcut toggling. |
| Global `⌘J`/`Ctrl+J` listener and React `useState`/`useEffect` | App-owned behavior. The package should not install document-level shortcut handlers. Docs/fixtures should demonstrate the pattern if needed for example parity. |
| `kbd` copy | Separate composition surface. Use RadCN Kbd or local docs markup as appropriate; Command should not own keyboard-copy styling. |
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
  `radcn/apps/docs/app/content/components.tsx` has generic Command docs and
  composition examples through Combobox/Popover/Drawer, but no named
  `command-demo` or `command-dialog` family.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/command.tsx` covers generic
  Command scenarios, not the exact named upstream examples.
- Current Playwright evidence:
  `radcn/fixtures/tests/combobox-command.spec.ts` covers generic Command
  filtering, activation, disabled state, groups, separator, shortcuts, checked
  state, dialog composition, Escape close, and custom token styling.
