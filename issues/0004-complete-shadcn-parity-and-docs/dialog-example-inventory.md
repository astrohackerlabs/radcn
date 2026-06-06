# Dialog Example Inventory

## Summary

Upstream shadcn/ui New York v4 has two active Dialog examples:
`dialog-demo` and `dialog-close-button`. RadCN ships `radcn/dialog` with the
core modal behavior needed for both examples, and Experiment 66 added named
docs, candidate fixture, and Playwright proof for both upstream compositions.

**Audit outcome:** Covered.

No package API change was required: `asChild` maps to RadCN's native button
trigger/close parts plus author styling, while Button, Input, Label, native
forms, read-only inputs, and share-link behavior remain composed surfaces.

## Examples

| Example | Upstream behavior | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `dialog-demo` | Trigger styled as outline Button with text `Open Dialog`; modal content constrained to `sm:max-w-[425px]`; title `Edit profile`; description `Make changes to your profile here. Click save when you're done.`; native form shell; labelled `Name` and `Username` inputs with default values `Pedro Duarte` and `@peduarte`; footer with outline `Cancel` close action and submit `Save changes` button. | `radcn/dialog` supports root, trigger, portal, overlay, content, header, footer, title, description, close action, default close button control, modal ARIA relationships, focus movement/trap/restoration, Escape/outside dismissal, scroll lock, default open, public hooks, classes/styles/tokens, and composition with native form controls. Docs and candidate fixtures now render named `dialog-demo` evidence with exact copy, labels, default values, cancel/save footer, submit type, width hook, public hooks, and Playwright coverage for open, focus, Escape, and explicit close behavior. | Covered | No follow-up. Keep form submission and Button/Input/Label styling composition outside Dialog. |
| `dialog-close-button` | Trigger styled as outline Button with text `Share`; modal content constrained to `sm:max-w-md`; title `Share link`; description `Anyone who has this link will be able to view this.`; visually hidden `Link` label; read-only input with value `https://ui.shadcn.com/docs/installation`; left-aligned footer; secondary `Close` close action. | `radcn/dialog` supports explicit close controls, default close button suppression, custom content/footer styling, modal behavior, public hooks, and composition with Label/Input. Docs and candidate fixtures now render named `dialog-close-button` evidence with exact copy, sr-only label, read-only URL input, secondary close styling, footer alignment hook, public hooks, and Playwright coverage for close and focus restoration. | Covered | No follow-up. The share link remains display-only because upstream does not implement copy-to-clipboard behavior. |

## Capability Mapping

| Surface | Decision |
| --- | --- |
| Dialog root, trigger, portal, overlay, content | Supported by `radcn/packages/radcn/src/components/dialog.tsx` with public `data-radcn-dialog*` hooks, package classes, `class`, and `style`. Existing generic candidate tests prove opening and portal movement. |
| Header, footer, title, description | Supported. Docs and fixtures prove the named upstream Dialog copy for both active examples. |
| Close action | Supported. `DialogClose` renders a native close button, and `DialogContent showCloseButton` controls the default close button. Existing tests prove explicit close and default close focus behavior generically. |
| Default close button and `XIcon` | Mapped. Upstream renders a lucide `XIcon` with sr-only text. RadCN renders an accessible default close button with text `x` and `aria-label="Close"` without depending on `lucide-react`. Visual icon choice can be improved by styling or future icon strategy, but the active examples do not inspect the default close icon. |
| `DialogContent showCloseButton` | Supported by RadCN and upstream. Existing candidate fixtures use it to suppress the default close button for the generic close-button scenario. |
| `DialogFooter showCloseButton` | Upstream package API exists but the two active examples do not use it. RadCN can compose `DialogClose` manually in the footer; this audit does not require a package change unless later example/block evidence needs the prop. |
| Modal role and ARIA relationships | Supported. Browser enhancement assigns `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`; candidate Playwright tests cover these generic relationships. |
| Focus movement, focus trap, restoration, Escape dismissal, outside dismissal, scroll lock | Supported by `setupModal`/`enhanceDialog`. Generic candidate Playwright tests cover the full behavior set, and named `dialog-demo`/`dialog-close-button` tests prove focus and dismissal behavior in the upstream compositions. |
| Default open | Supported and covered generically. The active upstream Dialog examples do not render default-open dialogs. |
| Custom classes, styles, and tokens | Supported by `class`, `style`, part classes, and CSS variables. Existing generic custom-token fixture proves token styling, and named examples prove width and footer-alignment hooks. |
| Button composition | App-owned/package composition. Upstream `DialogTrigger asChild` and `DialogClose asChild` avoid nested buttons while styling with shadcn Button. RadCN trigger/close parts are already native buttons and can take Button classes or equivalent author styling without an `asChild` dependency. |
| Input and Label composition | Separate package surfaces. The named examples should compose RadCN Input and Label, but Dialog should not own field semantics. |
| Native form submission | App-owned composition. `dialog-demo` uses a native form shell and submit button; Dialog should not own validation or submission state. |
| `sr-only` labels | Label/author styling composition. The `dialog-close-button` example needs visible proof that the accessible label exists while visual hiding remains app/docs fixture styling. |
| Read-only input | Input/native input behavior. Dialog only composes the read-only input inside modal content. |
| Share-link and copy-to-clipboard behavior | The upstream `dialog-close-button` example displays a share link but does not implement clipboard copying. RadCN should not add clipboard behavior for this row. |
| React props, Radix `DialogPrimitive`, controlled `open`, `onOpenChange`, `asChild`, `className`, `data-slot`, `cn`, Tailwind utilities | Implementation details or React/Tailwind mechanics from shadcn/ui. RadCN maps these to Remix UI props, browser enhancement, `class`, public `data-radcn-*` hooks, package CSS, and CSS variable/custom style hooks. They are not RadCN dependencies. |
| Vendor source | Reference only. No RadCN package, docs, fixture, or test code should depend on `vendor/`. |

## Evidence Reviewed

- Issue inventory:
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Upstream package source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/dialog.tsx`.
- Upstream example source:
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dialog-demo.tsx`
  and
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/dialog-close-button.tsx`.
- Upstream registry metadata:
  `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/dialog.json`,
  `dialog-demo.json`, and `dialog-close-button.json`.
- Current RadCN package source:
  `radcn/packages/radcn/src/components/dialog.tsx`.
- Current RadCN styles:
  `radcn/packages/radcn/src/styles/index.ts`.
- Current docs evidence:
  `radcn/apps/docs/app/content/components.tsx` has named
  `data-radcn-docs-dialog-family` examples for `dialog-demo` and
  `dialog-close-button`.
- Current fixture evidence:
  `radcn/fixtures/candidate-remix/app/fixtures/dialog.tsx` covers generic
  default, default-open, close-button, outside-dismiss, and custom-token
  scenarios plus named `demo` and `close-button-demo` routes.
- Current Playwright evidence:
  `radcn/fixtures/tests/dialog.spec.ts` covers generic modal semantics,
  relationships, focus trap, focus restoration, scroll lock, Escape close,
  explicit close, outside dismissal, default open, custom tokens, named
  `dialog-demo`, and named `dialog-close-button`.
  `radcn/apps/docs/tests/coverage.spec.ts` covers both named docs examples and
  mapping copy.

## Decision

The Dialog example cluster is resolved. RadCN has the core package behavior
needed for both upstream examples, and named docs, candidate fixtures, and
Playwright tests now prove `dialog-demo` and `dialog-close-button` with exact
copy, form/input/label composition, read-only share-link input, footer actions,
public hooks, custom sizing/alignment, and modal behavior in those
compositions. RadCN did not add React, Radix, `asChild`, Tailwind, `cn`,
`lucide-react`, clipboard, form-state, or vendor dependencies.
