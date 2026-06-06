# Context Menu Example Inventory

## Summary

Upstream shadcn/ui New York v4 exposes one direct Context Menu example:
`context-menu-demo`.

RadCN already ships `radcn/context-menu` with ContextMenu,
ContextMenuTrigger, ContextMenuPortal, ContextMenuContent, ContextMenuGroup,
ContextMenuLabel, ContextMenuItem, ContextMenuCheckboxItem,
ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator,
ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger,
ContextMenuSubContent, and `enhanceContextMenu` exports. Current package,
fixture, and Playwright evidence proves dependency-free menu overlay behavior,
right-click opening, keyboard ContextMenu and Shift+F10 opening, portal
placement, menu roles, focus restoration, roving/highlight behavior, typeahead,
disabled item skipping, checkbox state mutation, radio group item state,
submenus, collision handling, public hooks, and custom tokens.

The named upstream example is still partial because current docs, fixtures, and
tests do not prove the exact `context-menu-demo` composition: the 300 by 150
dashed trigger labelled `Right click here`, `w-52` content, inset Back /
disabled Forward / Reload items with shortcuts, More Tools submenu with `w-44`
content and exact items, separators, checked and unchecked checkbox rows,
People radio group with `Pedro Duarte` selected, destructive Delete item, or
the mapping from React/Radix/`data-slot`/`className`/Tailwind into RadCN's
native menu-overlay model.

## Examples

| Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up |
| --- | --- | --- | --- | --- |
| `context-menu-demo` | Root `ContextMenu` wraps a `ContextMenuTrigger` with `className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"` and visible text `Right click here`. `ContextMenuContent className="w-52"` contains inset items `Back`, disabled `Forward`, and `Reload` with `ContextMenuShortcut` values `⌘[`, `⌘]`, and `⌘R`; a `ContextMenuSub` with inset trigger `More Tools`; `ContextMenuSubContent className="w-44"` containing `Save Page...`, `Create Shortcut...`, `Name Window...`, a separator, `Developer Tools`, another separator, and destructive `Delete`; a separator; checked `ContextMenuCheckboxItem` `Show Bookmarks`; unchecked `ContextMenuCheckboxItem` `Show Full URLs`; another separator; `ContextMenuRadioGroup value="pedro"` containing inset label `People`, selected radio item `Pedro Duarte`, and unselected radio item `Colm Tuite`. Upstream UI uses a React client component marker, React component props, Radix Context Menu primitives, Radix Portal/Content/Sub/CheckboxItem/RadioGroup/RadioItem mechanics, `data-slot`, `className`, `cn`, lucide `CheckIcon`, `ChevronRightIcon`, and `CircleIcon`, Tailwind sizing/layout/border/typography/animation/focus/inset utilities, disabled state, checkbox/radio indicators, destructive variant styling, and shortcut layout. | `radcn/packages/radcn/src/components/context-menu.tsx` exports the full Context Menu package surface and `enhanceContextMenu`, renders public `data-radcn-context-menu*` hooks, role `button` triggers, hidden portals/content, role `menu` subcontent, role `menuitem`, `menuitemcheckbox`, and `menuitemradio` controls, aria-disabled, aria-checked, checked/unchecked data state, radio group data value, sub trigger aria-haspopup/expanded/controls, item inset classes, destructive variant class, shortcut hook, separator hook, and app-owned caret/indicator glyphs. `radcn/packages/radcn/src/styles/tokens.css` styles trigger focus, portal/content/subcontent, min width, max height, overflow, border, radius, background, foreground, padding, shadow, highlighted state, inset labels/items, disabled items, indicators, shortcuts, sub caret, separators, sub display, and custom menu tokens. `radcn/packages/radcn/src/index.ts` and `radcn/packages/radcn/package.json` expose `radcn/context-menu`. `radcn/fixtures/candidate-remix/app/fixtures/menu-overlays.tsx` covers default pointer, keyboard trigger, checkbox/radio, submenu, collision, and custom-token context fixtures with Canvas/Open canvas/Paste disabled/Rename/Remove/Show guides/Free move/Snap to grid/Arrange/Bring forward/Send backward/Custom themed item content. `radcn/fixtures/scenarios/index.ts` exposes those context-menu scenarios. `radcn/fixtures/tests/menu-overlays.spec.ts` verifies pointer right-click opening, ContextMenu and Shift+F10 opening, menu role, portal, focus restoration, focused first item, item click closing, roving/typeahead, disabled hover/click behavior, Tab/Shift+Tab dismissal, checkbox mutation, submenu hover/keyboard behavior, collision, and custom token styling. `radcn/apps/docs/app/content/components.tsx` and `radcn/apps/docs/tests/coverage.spec.ts` prove a generic Context Menu docs route and preview with `Right click preview`, `Copy import`, and `Open example`. No current docs/fixture/test proves the named upstream `context-menu-demo` exact trigger text, 300x150 dashed trigger layout, `w-52`/`w-44` widths, exact Back/Forward/Reload shortcuts, More Tools submenu item list, separators count/placement, checked `Show Bookmarks`, unchecked `Show Full URLs`, `People` label, selected `Pedro Duarte`, unselected `Colm Tuite`, destructive Delete row, or required React/Radix/lucide/Tailwind mapping copy. | Partial | Add named docs, candidate fixture, and Playwright coverage for `context-menu-demo` with exact trigger text, trigger layout, right-click and keyboard opening, content/subcontent widths, all exact item/shortcut/label text, disabled Forward behavior, inset item evidence, separator count/placement, checked and unchecked checkbox state, radio group value and selected/unselected item state, destructive Delete styling, submenu hover and keyboard behavior, public ContextMenu hooks, app-owned indicator/caret icon evidence, custom token continuity, and mapping copy for React client marker, Radix primitives, portal/content/submenu mechanics, `data-slot`, `className`, `cn`, Tailwind utilities, lucide icons, native/menu-overlay behavior, and vendor source. |

## Decisions

- RadCN should keep Context Menu dependency-free over `enhanceContextMenu` and
  the shared menu overlay utility. Radix Context Menu primitives are not needed
  as RadCN dependencies for this example.
- Upstream right-click behavior maps to `enhanceContextMenu` handling the
  browser contextmenu event on `ContextMenuTrigger`.
- Upstream keyboard context-menu activation maps to the same enhancer handling
  the ContextMenu key and Shift+F10 on the trigger.
- Upstream Portal, Content, Sub, SubTrigger, and SubContent map to explicit
  RadCN portal/content/sub parts with public `data-radcn-context-menu*` hooks.
- Upstream `data-slot` maps to public `data-radcn-context-menu*` and shared
  `data-radcn-menu-*` hooks.
- Upstream `className` and `cn` map to `class`, `style`, CSS variables, and
  explicit class composition.
- Upstream trigger sizing and dashed-border Tailwind utilities map to app/docs
  class/style on `ContextMenuTrigger`; the package should not bake a 300 by
  150 trigger into the primitive.
- Upstream `w-52` and `w-44` content widths map to class/style or
  `--radcn-menu-width` on `ContextMenuContent` and `ContextMenuSubContent`.
- Upstream item `inset` maps to `inset` props and `radcn-menu-item--inset` /
  `radcn-menu-label--inset` package classes.
- Upstream disabled item behavior maps to `disabled`, `aria-disabled`, and
  `data-disabled`; disabled items must not receive highlight or close the menu
  when clicked.
- Upstream checkbox and radio indicators map to package-owned indicator spans;
  the exact lucide `CheckIcon` and `CircleIcon` remain presentation details.
- Upstream `ChevronRightIcon` maps to the package-owned submenu caret or an
  app-owned presentation glyph; lucide-react must not become a dependency.
- Upstream destructive variant maps to `variant="destructive"` and public
  destructive styling hooks.
- Upstream shortcuts remain visible text in `ContextMenuShortcut`; the package
  owns shortcut layout but not platform shortcut behavior.
- The exact user-facing texts from `context-menu-demo` are content parity
  requirements for the named example.
- Vendor source remains read-only evidence and should not be imported or
  committed into RadCN.
