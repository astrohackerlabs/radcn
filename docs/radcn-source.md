# RadCN Source Layout

RadCN source starts in `packages/radcn`. The package is private during the early
port, but it is shaped like the future copy/install surface:

```text
packages/radcn/
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    ├── styles/
    └── utils/
```

The Remix 3 candidate fixture app imports components from `radcn`, not from
fixture-local placeholder files. That keeps fixtures honest: a candidate
scenario exercises the same source layout future documentation and install
tooling will expose.

## Proof Slice

Experiment 1 covers the native form-control proof slice:

- `Button`
- `Input`
- `Field`
- `FieldDescription`
- `FieldError`
- `Label`
- `Textarea`

These components are intentionally native-first. They preserve button, input,
label, and textarea browser behavior instead of wrapping React-specific form
state.

Experiment 4 adds the remaining Stage 1 native form control:

- `NativeSelect`
- `NativeSelectOption`
- `NativeSelectOptGroup`

`NativeSelect` intentionally renders a real `<select>`. RadCN keeps native
submission, reset, required validation, option groups, disabled state, labels,
and browser keyboard behavior instead of replacing the control with a custom
ARIA widget.

Experiment 2 adds static/display primitives:

- `Alert`
- `AlertAction`
- `AlertDescription`
- `AlertTitle`
- `AspectRatio`
- `Badge`
- `Card`
- `CardAction`
- `CardContent`
- `CardDescription`
- `CardFooter`
- `CardHeader`
- `CardTitle`
- `Empty`
- `EmptyContent`
- `EmptyDescription`
- `EmptyHeader`
- `EmptyMedia`
- `EmptyTitle`
- `Kbd`
- `KbdGroup`
- `Separator`
- `Skeleton`
- `Spinner`

These components should be server-rendered by default. They expose semantic
markup, slots, variants, and styling hooks, but they do not own client state or
hydrate themselves.

Experiment 3 adds navigation, collection, and typography primitives:

- `Breadcrumb`
- `ButtonGroup`
- `Item`
- `Pagination`
- `Table`
- `TypographyH1`, `TypographyH2`, `TypographyH3`, `TypographyH4`,
  `TypographyP`, `TypographyBlockquote`, `TypographyList`,
  `TypographyListItem`, `TypographyInlineCode`, `TypographyLead`,
  `TypographyLarge`, `TypographySmall`, and `TypographyMuted`

These are also server-rendered by default. They preserve semantic HTML and ARIA
relationships while exposing RadCN slot hooks for styling and fixtures.

## Static Primitive Conventions

Static primitives use component-part slots when shadcn/ui exposes separate
subcomponents. Slot hooks follow the component name:

- `data-radcn-alert-title`
- `data-radcn-card-content`
- `data-radcn-empty-media`
- `data-radcn-kbd`

Variant hooks use both a modifier class and a `data-variant` attribute when the
variant is author-facing:

```html
<span class="radcn-badge radcn-badge--secondary" data-variant="secondary">
```

Prefer semantic HTML when it directly matches the component:

- `Alert` renders `role="alert"`.
- `Kbd` renders a real `<kbd>` element.
- `Separator` renders `role="separator"` when it is not decorative.
- `Spinner` renders `role="status"` with an accessible loading label.
- `Skeleton` renders `aria-hidden="true"` so decorative placeholders do not add
  noise to the accessibility tree.

Use CSS for static layout behavior. For example, `AspectRatio` uses the native
`aspect-ratio` property instead of a client primitive.

Navigation and collection primitives follow the same slot rule, but the
semantic contract is more important:

- `Breadcrumb` renders `nav[aria-label="breadcrumb"]`, an ordered list, current
  page semantics, presentation separators, and optional ellipsis hooks.
- `Pagination` renders `nav[aria-label="pagination"]`, list items, page links,
  `aria-current="page"` for the active page, previous/next labels, and an
  ellipsis hook.
- `ButtonGroup` renders `role="group"` with `data-orientation` for horizontal
  and vertical layouts.
- `ItemGroup` renders `role="list"` and each `Item` renders `role="listitem"`.
- `Table` renders real table elements: `caption`, `thead`, `tbody`, `tfoot`,
  `tr`, `th`, and `td`.

Typography is a RadCN recipe surface rather than a shadcn/ui primitive file.
shadcn/ui documents typography as examples, not shipped component source. RadCN
uses small named components for those recipe styles so Remix 3 apps can import
and test them consistently while preserving semantic headings, paragraphs,
lists, blockquotes, code, and supporting text elements.

Native select uses a wrapper for styling and an icon hook, but the form control
is the real select:

- `data-radcn-native-select-wrapper`
- `data-radcn-native-select`
- `data-radcn-native-select-option`
- `data-radcn-native-select-optgroup`
- `data-radcn-native-select-icon`

The wrapper exposes `data-size`; the select also exposes `data-size` and size
modifier classes. Invalid state uses `aria-invalid="true"`, disabled state uses
the native `disabled` attribute, and required state uses the native `required`
attribute.

Native select browser rendering varies by operating system and browser,
especially for popup menus and option styling. RadCN only treats the closed
control, wrapper/icon hooks, option/optgroup markup, form behavior, and
documented tokens as portable parity surfaces.

## Stage 2 Native State Primitives

Experiment 5 starts Stage 2 with primitives that can stay native-first:

- `Checkbox`
- `RadioGroup`
- `RadioGroupItem`
- `Switch`
- `Progress`

These components are exported from the root `radcn` package and from package
subpaths:

- `radcn/checkbox`
- `radcn/radio-group`
- `radcn/switch`
- `radcn/progress`

RadCN intentionally diverges from shadcn/ui's Radix-backed DOM for this batch
when a platform control preserves the user-facing contract:

- `Checkbox` renders a real `<input type="checkbox">`.
- `RadioGroupItem` renders real radio inputs with a shared `name`.
- `Switch` renders a real `<input type="checkbox" role="switch">`.
- `Progress` renders a real `<progress>`.

The public styling surface uses wrappers and part hooks around those native
controls:

- `data-radcn-checkbox-wrapper`, `data-radcn-checkbox-input`, and
  `data-radcn-checkbox-indicator`
- `data-radcn-radio-group`, `data-radcn-radio-item`,
  `data-radcn-radio-input`, and `data-radcn-radio-indicator`
- `data-radcn-switch-wrapper`, `data-radcn-switch-input`, and
  `data-radcn-switch-thumb`
- `data-radcn-progress-wrapper`, `data-radcn-progress`,
  `data-radcn-progress-track`, and `data-radcn-progress-indicator`

The server-rendered `data-state` attributes record the initial state. The live
visual state for user changes is driven by CSS selectors such as
`:has(input:checked)`, so checkbox, radio, and switch controls remain visibly
modifiable without hydration. Decorative indicators and thumbs must use
`pointer-events: none`; otherwise they intercept clicks intended for the real
input.

Checkbox indeterminate state is an approved explicit divergence. Native
`HTMLInputElement.indeterminate` is a runtime property and cannot be represented
as serialized HTML alone. RadCN exposes the server-rendered mixed state through
`aria-checked="mixed"` plus `data-state="indeterminate"` on the input and
wrapper. It does not claim that the browser input's `indeterminate` property is
set without client code.

Form behavior remains native:

- checked checkboxes and switches submit their `name=value`;
- unchecked checkboxes and switches do not submit;
- radio groups submit the selected shared-name value;
- radio disabled and required behavior lives on `RadioGroupItem` inputs, not on
  `RadioGroup`, because a server-rendered group wrapper cannot propagate native
  input attributes to arbitrary child items;
- reset buttons restore the initial checked radio, checkbox, and switch state;
- disabled controls use the native `disabled` attribute;
- invalid controls use `aria-invalid="true"` and `aria-describedby` for error
  text;
- required controls use the native `required` attribute where applicable.

Customization for this batch uses control-level and progress-level variables:

- `--radcn-control-border`
- `--radcn-control-bg`
- `--radcn-control-fg`
- `--radcn-control-checked-bg`
- `--radcn-control-invalid`
- `--radcn-switch-thumb-bg`
- `--radcn-progress-bg`
- `--radcn-progress-fg`

Remaining Stage 2 questions are not answered by this native-state batch:

- custom disclosure state for `tabs`;
- pressed-state strategy for `toggle` and `toggle-group`;
- pointer and keyboard strategy for `slider`;
- fallback loading behavior for `avatar`;
- scroll behavior for `scroll-area`;
- whether `hover-card` belongs in Stage 2 or should move to Stage 3 with
  positioned overlays.

## Stage 2 Accordion Disclosure

Experiment 6 adds the first bounded disclosure primitive:

- `Accordion`
- `AccordionItem`
- `AccordionTrigger`
- `AccordionContent`

RadCN accordion uses native `<details>` and `<summary>` elements instead of a
Radix client-state primitive. The goal is to preserve the browser's disclosure
behavior in Remix 3 while exposing shadcn/ui-like slots and customization
hooks.

The source is exported from the root `radcn` package and from `radcn/accordion`.

Public hooks:

- `data-radcn-accordion`
- `data-radcn-accordion-item`
- `data-radcn-accordion-trigger`
- `data-radcn-accordion-trigger-text`
- `data-radcn-accordion-icon`
- `data-radcn-accordion-content`
- `data-radcn-accordion-content-inner`

The root exposes `data-type="single"` or `data-type="multiple"`,
`data-collapsible="true"` when requested, and `data-default-value` when authors
provide a `defaultValue`. In the current server-rendered implementation,
`defaultValue` is metadata only; initial open behavior is set on
`AccordionItem open`. This is an approved interim divergence from Radix until
RadCN has a context or client-state strategy that can propagate root state into
arbitrary children. Items expose `data-value`, `data-state`, and
`data-disabled` when applicable. Live open styling should use the native
`details[open]` selector because a server-rendered `data-state` attribute only
describes the initial state.

Single accordion exclusivity uses the platform `<details name>` behavior. A
server-rendered root cannot automatically propagate that native `name` to
arbitrary child items, so current RadCN single accordion fixtures pass the same
`name` to each `AccordionItem`. This is an approved interim divergence from the
Radix API. Future client-state or context support may remove the item-level
`name` requirement.

Disabled accordion items render non-interactive wrapper markup with
`data-disabled="true"`, `aria-disabled="true"` on the trigger, hidden content,
and pointer-disabled trigger styling. Native HTML does not provide a real
`disabled` attribute for `<details>`, so RadCN does not render disabled items as
focusable disclosure controls.

Customization tokens:

- `--radcn-accordion-border`
- `--radcn-accordion-trigger-fg`
- `--radcn-accordion-content-fg`

Accordion answers the first Stage 2 disclosure question for simple disclosure:
native details can cover default-open, collapsible, multiple-open, keyboard,
pointer, and basic single-exclusivity behavior. It does not answer richer tab
roving-focus behavior or arbitrary controlled state.

## Stage 2 Collapsible Disclosure

Experiment 7 adds the second bounded disclosure primitive:

- `Collapsible`
- `CollapsibleTrigger`
- `CollapsibleContent`

RadCN collapsible also uses native `<details>` and `<summary>`. Unlike
accordion, a single-panel collapsible can map root `open` directly to the
native `open` attribute, so initial open state is real behavior rather than
metadata.

The source is exported from the root `radcn` package and from
`radcn/collapsible`.

Public hooks:

- `data-radcn-collapsible`
- `data-radcn-collapsible-trigger`
- `data-radcn-collapsible-trigger-text`
- `data-radcn-collapsible-icon`
- `data-radcn-collapsible-content`
- `data-radcn-collapsible-content-inner`

The root exposes `data-state="open"` or `data-state="closed"` for initial
state and `data-disabled="true"` for disabled state. Live open styling should
use `details[open]`, matching the accordion rule that server-rendered
`data-state` is initial state only.

Disabled collapsibles use explicit disabled props at each affected layer.
`Collapsible disabled` renders the root as non-details wrapper markup with
`data-disabled="true"`. `CollapsibleTrigger disabled` renders an
`aria-disabled` non-summary trigger, and `CollapsibleContent disabled` hides the
content. The root cannot automatically rewrite arbitrary trigger/content
children in this server-rendered shape, so tests and fixtures pass disabled to
the root, trigger, and content when the whole collapsible is disabled.

Customization tokens:

- `--radcn-collapsible-border`
- `--radcn-collapsible-bg`
- `--radcn-collapsible-fg`
- `--radcn-collapsible-content-fg`

Collapsible confirms that native details cover simple single-panel disclosure
without a client-state primitive. Tabs still need a separate strategy because
they require tablist semantics, roving focus, selected tab state, and panel
relationships that native details do not provide.

## Stage 2 Tabs State

Experiment 8 adds the first selected-state composite primitive:

- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

RadCN tabs use server-rendered component markup plus a small tabs-specific
client enhancement exported as `enhanceTabs` from `radcn/tabs`. Native
`<details>/<summary>` is not used because it cannot express one selected tab,
dynamic `aria-selected`, roving focus, disabled trigger skipping, and associated
tabpanel visibility.

The source is exported from the root `radcn` package and from `radcn/tabs`.
Apps that use tabs must load the enhancement in a browser entry:

```ts
import { enhanceTabs } from 'radcn/tabs'

enhanceTabs()
```

The candidate Remix fixture app imports `enhanceTabs` from the package source in
`app/assets/entry.ts`. Its asset server allowlist includes
`../../packages/radcn/src/**` so client enhancements can compile from the same
workspace package that server-rendered components import.

Public hooks:

- `data-radcn-tabs`
- `data-radcn-tabs-list`
- `data-radcn-tabs-trigger`
- `data-radcn-tabs-content`

The root exposes `data-default-value`, `data-value`, `data-orientation`, and
`data-activation-mode`. Before enhancement, child triggers and panels expose
stable `data-value` hooks. After enhancement, triggers receive generated ids,
`aria-controls`, live `aria-selected`, `tabIndex`, and `data-state`. Panels
receive generated ids, `aria-labelledby`, live `data-state`, and `hidden` for
inactive content.

Tabs support automatic and manual activation modes. In automatic mode, Arrow
keys, Home, and End move focus and selection together. In manual mode, Arrow
keys, Home, and End move focus only, while Enter and Space activate the focused
tab. Disabled triggers use the native `disabled` attribute plus
`aria-disabled="true"` and are skipped by keyboard roving focus.

Customization tokens:

- `--radcn-tabs-list-bg`
- `--radcn-tabs-trigger-fg`
- `--radcn-tabs-trigger-active-bg`
- `--radcn-tabs-trigger-active-fg`
- `--radcn-tabs-content-border`
- `--radcn-tabs-content-bg`
- `--radcn-tabs-content-fg`

Tabs establish the first explicit client enhancement boundary in RadCN. Later
Stage 2 components should prefer native controls when they can provide live
state, but selected-state composites that need coordinated ARIA and keyboard
behavior may reuse this pattern: server-render stable hooks, export a focused
enhancement, and make fixture asset allowlists include package client source.

## Stage 2 Toggle Pressed State

Experiment 9 adds pressed-state controls:

- `Toggle`
- `ToggleGroup`
- `ToggleGroupItem`

RadCN toggles use native `<button type="button">` elements with `aria-pressed`
and small client enhancements exported from `radcn/toggle` and
`radcn/toggle-group`:

```ts
import { enhanceToggle } from 'radcn/toggle'
import { enhanceToggleGroup } from 'radcn/toggle-group'

enhanceToggle()
enhanceToggleGroup()
```

This is intentionally smaller than the tabs helper. Toggles do not need panel
relationships or generated ids; they only need live pressed state, group value
coordination, disabled skipping, and roving focus.

The source is exported from the root `radcn` package and from the `radcn/toggle`
and `radcn/toggle-group` subpaths.

Public hooks:

- `data-radcn-toggle`
- `data-radcn-toggle-group`
- `data-radcn-toggle-group-item`

`Toggle` exposes `aria-pressed`, `data-state="on"` or `data-state="off"`,
`data-variant`, and `data-disabled` when disabled. The helper flips
`aria-pressed` and `data-state` on pointer, Enter, and Space activation through
the native button click behavior.

`ToggleGroup` exposes `role="group"`, `data-type`, `data-orientation`,
`data-default-value`, and live `data-value`. `ToggleGroupItem` exposes
`aria-pressed`, `data-state`, `data-value`, `data-variant`, and disabled hooks.
The group helper keeps single groups to zero or one pressed item, lets multiple
groups maintain independent pressed items, moves keyboard focus through enabled
items with Arrow keys/Home/End, and skips disabled items.

Toggle buttons do not participate in native form submission in this experiment.
They are action buttons, not native form controls. Future form-oriented pressed
controls should use checkbox, switch, radio-group, or an explicit hidden-input
adapter rather than pretending button state submits by default.

Customization tokens:

- `--radcn-toggle-border`
- `--radcn-toggle-hover-bg`
- `--radcn-toggle-pressed-bg`
- `--radcn-toggle-pressed-fg`

Toggle and toggle-group establish a second client enhancement pattern:
button-local and group-local pressed state. Later Stage 2 components should use
this smaller helper shape when they do not need the richer tabpanel relationship
model from tabs.

## Stage 2 Slider Range Control

Experiment 10 adds the bounded range form-control primitive:

- `Slider`

RadCN slider uses a native `<input type="range">` for the real accessible
control and form value. A small `enhanceSlider()` helper from `radcn/slider`
keeps wrapper `data-value` and the CSS range fill variable current after input
events and form resets:

```ts
import { enhanceSlider } from 'radcn/slider'

enhanceSlider()
```

The source is exported from the root `radcn` package and from `radcn/slider`.

Public hooks:

- `data-radcn-slider`
- `data-radcn-slider-input`
- `data-radcn-slider-track`
- `data-radcn-slider-range`
- `data-radcn-slider-thumb`

The root exposes `data-value`, `data-min`, `data-max`, `data-step`,
`data-orientation="horizontal"`, and `data-disabled` when disabled. The native
input owns `name`, `min`, `max`, `step`, `disabled`, value, keyboard behavior,
pointer behavior, form submission, and form reset.

RadCN supports single-thumb horizontal sliders in Stage 2. Multi-thumb Radix
slider values are deferred because native range has one value, and implementing
multi-thumb collision, hidden form values, and ARIA relationships would require
a custom client primitive beyond this bounded native form-control pass.
Vertical orientation is also deferred because native vertical range rendering is
not portable enough across browsers to use as a stable visual parity surface.

Disabled sliders preserve their server-rendered value hooks: the helper ignores
input events from disabled controls so visual metadata does not drift from a
non-interactive native value.

Customization tokens:

- `--radcn-slider-track-bg`
- `--radcn-slider-range-bg`
- `--radcn-slider-thumb-border`
- `--radcn-slider-thumb-bg`

Slider establishes the range-input pattern for RadCN: prefer native form
controls for single-value behavior, add a focused helper only for reflected
metadata and visuals, and defer multi-value custom primitives until a component
explicitly needs them.

## Stage 2 Avatar, Scroll Area, and Hover Card Disposition

Experiment 11 closes the remaining Stage 2 surface with:

- `Avatar`
- `AvatarImage`
- `AvatarFallback`
- `AvatarBadge`
- `AvatarGroup`
- `AvatarGroupCount`
- `ScrollArea`
- `ScrollAreaViewport`
- `ScrollBar`
- `ScrollAreaThumb`
- `ScrollAreaCorner`

RadCN avatar is server-rendered. The root exposes size metadata and stable
slots; image loading remains native browser behavior. Authors should provide
fallback content that is meaningful without JavaScript. When an avatar image is
decorative or repeats the same identity as visible text, the fallback can use
`ariaHidden`; when fallback initials are the only identity, keep them exposed.

Public avatar hooks:

- `data-radcn-avatar`
- `data-radcn-avatar-image`
- `data-radcn-avatar-fallback`
- `data-radcn-avatar-badge`
- `data-radcn-avatar-group`
- `data-radcn-avatar-group-count`

Avatar supports `default`, `sm`, and `lg` root sizes, badge slots, grouped
avatars, and count slots. It does not add a client delay timer or image-error
state machine in Stage 2. This is an approved native-first divergence from
Radix Avatar's load/error state management: the current RadCN contract is
stable fallback markup and native image semantics, not JavaScript-mediated
fallback timing.

Avatar customization tokens:

- `--radcn-avatar-bg`
- `--radcn-avatar-fg`
- `--radcn-avatar-border`
- `--radcn-avatar-fallback-bg`
- `--radcn-avatar-fallback-fg`
- `--radcn-avatar-badge-bg`
- `--radcn-avatar-badge-fg`
- `--radcn-avatar-count-bg`
- `--radcn-avatar-count-fg`

RadCN scroll area is native-scroll-first. The viewport owns real `overflow:
auto`, focus, keyboard scrolling, pointer wheel/touchpad scrolling, and browser
scrollbar behavior. RadCN adds stable root, viewport, scrollbar, thumb, and
corner hooks so authors can style the container and expose shadcn-like slots.

Public scroll-area hooks:

- `data-radcn-scroll-area`
- `data-radcn-scroll-area-viewport`
- `data-radcn-scroll-area-scrollbar`
- `data-radcn-scroll-area-thumb`
- `data-radcn-scroll-area-corner`

`ScrollBar` exposes `data-orientation="vertical"` or
`data-orientation="horizontal"`. In Stage 2, the scrollbar and thumb slots are
decorative hooks layered over native scrolling; they are not draggable custom
scrollbar controls. Radix-like thumb measurement, thumb position syncing, and
drag behavior are deferred because they require client measurement and pointer
coordination beyond the native-scroll surface verified here.

Scroll-area customization tokens:

- `--radcn-scroll-area-border`
- `--radcn-scroll-area-bg`
- `--radcn-scroll-area-fg`
- `--radcn-scroll-area-thumb-bg`
- `--radcn-scroll-area-corner-bg`

`hover-card` moves to Stage 3. Useful hover-card parity depends on portal
placement, floating positioning, side/align offsets, hover and focus open
delay, dismissal policy, escape behavior, and animation state hooks. Those are
overlay concerns shared with tooltip, popover, dropdown-menu, dialog, and
sheet, so implementing hover-card before the Stage 3 overlay strategy would
create a one-off positioning primitive.

Stage 2 is complete after Experiment 11. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-2-audit.md`.

## Stage 3 Dialog Overlay Foundation

Experiment 12 begins Stage 3 with the modal overlay proof:

- `Dialog`
- `DialogTrigger`
- `DialogPortal`
- `DialogOverlay`
- `DialogContent`
- `DialogClose`
- `DialogHeader`
- `DialogFooter`
- `DialogTitle`
- `DialogDescription`

RadCN dialog uses server-rendered markup plus `enhanceDialog()` from
`radcn/dialog`:

```ts
import { enhanceDialog } from 'radcn/dialog'

enhanceDialog()
```

Public hooks:

- `data-radcn-dialog`
- `data-radcn-dialog-trigger`
- `data-radcn-dialog-portal`
- `data-radcn-dialog-overlay`
- `data-radcn-dialog-content`
- `data-radcn-dialog-close`
- `data-radcn-dialog-header`
- `data-radcn-dialog-footer`
- `data-radcn-dialog-title`
- `data-radcn-dialog-description`

The server markup exposes stable parts and initial `data-state` hooks. The
client helper owns browser-only modal behavior: opening and closing, generated
title/description relationships, `role="dialog"`, `aria-modal="true"`, focus
entry, focus trap, focus restoration, Escape dismissal, outside pointer
dismissal, body scroll lock, and open/closed state updates.

Portal strategy is progressive: dialog markup is rendered in place first, then
`enhanceDialog()` moves the portal subtree into a `data-radcn-portal-root`. In
fixture pages the portal root stays inside the screenshot stage; in normal apps
it falls back to `document.body`.

Closed dialog portals, overlays, and content are hidden. When JavaScript is
absent or delayed, closed dialogs remain hidden and triggers are inert until the
helper loads; `defaultOpen` dialogs become modal after enhancement. This is the
current approved progressive-enhancement boundary for modal overlays.

Customization tokens:

- `--radcn-dialog-overlay-bg`
- `--radcn-dialog-border`
- `--radcn-dialog-bg`
- `--radcn-dialog-fg`
- `--radcn-dialog-trigger-bg`
- `--radcn-dialog-trigger-fg`
- `--radcn-dialog-width`
- `--radcn-dialog-z`

This experiment establishes the modal overlay baseline for later
`alert-dialog` and `sheet` work. It does not solve positioned overlays:
`popover`, `tooltip`, `hover-card`, dropdown menus, context menus, and drawer
gestures need positioning, collision, arrow, delay, non-modal, menu, or
gesture-specific experiments.

## Stage 3 Modal Variants

Experiment 13 adds modal variants on top of the dialog foundation:

- `AlertDialog`
- `AlertDialogTrigger`
- `AlertDialogPortal`
- `AlertDialogOverlay`
- `AlertDialogContent`
- `AlertDialogHeader`
- `AlertDialogFooter`
- `AlertDialogMedia`
- `AlertDialogTitle`
- `AlertDialogDescription`
- `AlertDialogAction`
- `AlertDialogCancel`
- `Sheet`
- `SheetTrigger`
- `SheetPortal`
- `SheetOverlay`
- `SheetContent`
- `SheetClose`
- `SheetHeader`
- `SheetFooter`
- `SheetTitle`
- `SheetDescription`

Both component families use the modal behavior from `packages/radcn/src/components/dialog.tsx`.
Their exported helpers delegate to the shared `setupModal()` implementation:

```ts
import { enhanceAlertDialog } from 'radcn/alert-dialog'
import { enhanceSheet } from 'radcn/sheet'

enhanceAlertDialog()
enhanceSheet()
```

Alert dialog public hooks:

- `data-radcn-alert-dialog`
- `data-radcn-alert-dialog-trigger`
- `data-radcn-alert-dialog-portal`
- `data-radcn-alert-dialog-overlay`
- `data-radcn-alert-dialog-content`
- `data-radcn-alert-dialog-header`
- `data-radcn-alert-dialog-footer`
- `data-radcn-alert-dialog-media`
- `data-radcn-alert-dialog-title`
- `data-radcn-alert-dialog-description`
- `data-radcn-alert-dialog-action`
- `data-radcn-alert-dialog-cancel`

Alert dialog content receives `role="alertdialog"` and `aria-modal="true"`
after enhancement. It defaults to non-dismissible behavior: Escape and outside
pointer events do not close it. Authors close it through `AlertDialogAction` or
`AlertDialogCancel`, matching the component's destructive-confirmation purpose.
`dismissible` remains available on the root for explicit opt-in divergence.

Sheet public hooks:

- `data-radcn-sheet`
- `data-radcn-sheet-trigger`
- `data-radcn-sheet-portal`
- `data-radcn-sheet-overlay`
- `data-radcn-sheet-content`
- `data-radcn-sheet-close`
- `data-radcn-sheet-header`
- `data-radcn-sheet-footer`
- `data-radcn-sheet-title`
- `data-radcn-sheet-description`

Sheet content receives `role="dialog"`, `aria-modal="true"`, and `data-side`
after enhancement. `side="top" | "right" | "bottom" | "left"` maps to
side-specific classes and stable `data-side` hooks. Sheet uses the same focus
trap, focus restoration, Escape dismissal, outside pointer dismissal, and body
scroll lock behavior as dialog.

Alert-dialog customization tokens:

- `--radcn-modal-overlay-bg`
- `--radcn-modal-action-bg`
- `--radcn-modal-action-fg`
- `--radcn-alert-dialog-border`
- `--radcn-alert-dialog-bg`
- `--radcn-alert-dialog-fg`
- `--radcn-alert-dialog-media-bg`
- `--radcn-alert-dialog-media-fg`
- `--radcn-alert-dialog-width`

Sheet customization tokens:

- `--radcn-modal-overlay-bg`
- `--radcn-modal-action-bg`
- `--radcn-modal-action-fg`
- `--radcn-sheet-border`
- `--radcn-sheet-bg`
- `--radcn-sheet-fg`
- `--radcn-sheet-width`
- `--radcn-sheet-height`

The modal overlay layer now covers `dialog`, `alert-dialog`, and `sheet`.
Positioned overlays, menus, hover-card, context-menu, dropdown-menu, and drawer
need additional collision, anchoring, menu focus/typeahead, hover/focus delay,
contextmenu, or gesture behavior beyond this modal variant layer.

## Stage 3 Positioned Overlay Foundation

Experiment 14 adds the non-modal positioned overlay foundation:

- `Popover`
- `PopoverTrigger`
- `PopoverAnchor`
- `PopoverPortal`
- `PopoverContent`
- `PopoverClose`
- `PopoverHeader`
- `PopoverTitle`
- `PopoverDescription`
- `TooltipProvider`
- `Tooltip`
- `TooltipTrigger`
- `TooltipPortal`
- `TooltipContent`
- `TooltipArrow`
- `HoverCard`
- `HoverCardTrigger`
- `HoverCardPortal`
- `HoverCardContent`

These components use server-rendered markup plus browser helpers from their
package subpaths:

```ts
import { enhancePopover } from 'radcn/popover'
import { enhanceTooltip } from 'radcn/tooltip'
import { enhanceHoverCard } from 'radcn/hover-card'

enhancePopover()
enhanceTooltip()
enhanceHoverCard()
```

All three helpers delegate to the shared non-modal
`setupPositionedOverlay()` helper in
`packages/radcn/src/utils/positioned-overlay.ts`. That helper owns portal
movement, generated IDs, open/closed state, anchor geometry, side and align
metadata, side offsets, fixture-stage or viewport collision clamping, Escape
close, and transform-origin CSS variables.

This helper is intentionally separate from `setupModal()`. Positioned overlays
do not set `aria-modal`, do not trap focus, do not restore focus as a modal
contract, and do not lock body scrolling. Popover uses click activation,
`aria-expanded`, `aria-controls`, Escape close, close slots, and outside-pointer
dismissal. Tooltip uses hover and focus activation, provider/root delay values,
`role="tooltip"`, `aria-describedby`, Escape close, and an arrow hook.
Hover-card uses hover and focus activation, open and close delays, Escape close,
and trigger/content hover-region tracking so it stays open while the pointer
moves into floating content and closes only after leaving both regions.

Positioning policy:

- `side="top" | "right" | "bottom" | "left"` chooses the preferred side.
- `align="start" | "center" | "end"` aligns content along the anchor edge.
- `sideOffset` adds gap from the trigger or anchor.
- Content is clamped inside the nearest fixture stage when present, otherwise
  inside the viewport.
- Content receives `--radcn-overlay-transform-origin`,
  `--radcn-overlay-available-width`, and
  `--radcn-overlay-available-height` for styling and animation hooks.

Public hooks:

- `data-radcn-popover`, `data-radcn-popover-trigger`,
  `data-radcn-popover-anchor`, `data-radcn-popover-portal`,
  `data-radcn-popover-content`, `data-radcn-popover-close`,
  `data-radcn-popover-header`, `data-radcn-popover-title`, and
  `data-radcn-popover-description`
- `data-radcn-tooltip-provider`, `data-radcn-tooltip`,
  `data-radcn-tooltip-trigger`, `data-radcn-tooltip-portal`,
  `data-radcn-tooltip-content`, and `data-radcn-tooltip-arrow`
- `data-radcn-hover-card`, `data-radcn-hover-card-trigger`,
  `data-radcn-hover-card-portal`, and `data-radcn-hover-card-content`

Positioned overlay customization tokens:

- `--radcn-positioned-overlay-z`
- `--radcn-overlay-trigger-bg`
- `--radcn-overlay-trigger-fg`
- `--radcn-overlay-width`
- `--radcn-overlay-border`
- `--radcn-overlay-bg`
- `--radcn-overlay-fg`
- `--radcn-popover-close-border`
- `--radcn-popover-close-bg`
- `--radcn-popover-close-fg`
- `--radcn-tooltip-width`
- `--radcn-tooltip-bg`
- `--radcn-tooltip-fg`
- `--radcn-hover-card-width`
- `--radcn-hover-card-avatar-bg`
- `--radcn-hover-card-avatar-fg`

The positioned overlay foundation now covers `popover`, `tooltip`, and
`hover-card`. Menus build on the same portal and clamping ideas but need their
own helper because they own focus, item activation, checked state, typeahead,
and submenu coordination. Drawer needs modal behavior plus direction and
gesture policy, so it stays separate from the non-modal positioning helper.

## Stage 3 Menu Overlay Foundation

Experiment 15 adds menu overlays:

- `dropdown-menu`
- `context-menu`

Both component families render server markup with stable slots and export
browser helpers from the package:

- `enhanceDropdownMenu()`
- `enhanceContextMenu()`
- shared helper: `setupMenuOverlay()`

Menus intentionally do not reuse `setupPositionedOverlay()` directly. They
reuse the Stage 3 policy of moving portal content into the nearest
`data-radcn-portal-root` inside `[data-fixture-stage]`, then falling back to
the document body. They also reuse stage-or-viewport clamping and side/align
metadata. Menu-specific code owns the parts that popovers do not have: roving
focus, item roles, typeahead, item activation, checked/radio state, disabled
skipping, contextmenu virtual anchors, and submenu coordination.

Dropdown menus open from the trigger through click, Enter, Space, ArrowDown, or
ArrowUp. Context menus open from the pointer `contextmenu` event, the Context
Menu key, or Shift+F10. Pointer-opened context menus position from a virtual
anchor at the event coordinates; keyboard-opened context menus position from
the trigger box.

Focus policy:

- opening focuses the first enabled item, except ArrowUp opens on the last
  enabled item;
- ArrowUp, ArrowDown, Home, and End rove among enabled menu items with
  wrapping;
- disabled items are skipped by keyboard focus, ignored by pointer highlight,
  and do not close or activate when clicked;
- typeahead searches enabled item text values;
- Escape closes the menu and restores focus to the trigger;
- Tab and Shift+Tab close the menu without preventing default focus movement.

Activation policy:

- normal item activation closes the menu;
- checkbox items toggle `aria-checked` and `data-state`, then close;
- radio items update their containing radio group, expose `aria-checked` and
  `data-state`, then close;
- pointer movement highlights enabled items and clears the previous highlight.

Submenus open from pointer hover/focus and ArrowRight. ArrowLeft closes the
submenu and restores focus to its trigger; Escape closes the menu stack.
Submenu content is positioned relative to the submenu trigger and clamped inside
the fixture stage or viewport. Moving the pointer from the submenu trigger into
submenu content keeps the submenu open.

Public menu hooks:

- `data-radcn-dropdown-menu`, `data-radcn-dropdown-menu-trigger`,
  `data-radcn-dropdown-menu-portal`, `data-radcn-dropdown-menu-content`,
  `data-radcn-dropdown-menu-group`, `data-radcn-dropdown-menu-label`,
  `data-radcn-dropdown-menu-item`,
  `data-radcn-dropdown-menu-checkbox-item`,
  `data-radcn-dropdown-menu-radio-group`,
  `data-radcn-dropdown-menu-radio-item`,
  `data-radcn-dropdown-menu-separator`,
  `data-radcn-dropdown-menu-shortcut`,
  `data-radcn-dropdown-menu-sub`,
  `data-radcn-dropdown-menu-sub-trigger`, and
  `data-radcn-dropdown-menu-sub-content`
- `data-radcn-context-menu`, `data-radcn-context-menu-trigger`,
  `data-radcn-context-menu-portal`, `data-radcn-context-menu-content`,
  `data-radcn-context-menu-group`, `data-radcn-context-menu-label`,
  `data-radcn-context-menu-item`,
  `data-radcn-context-menu-checkbox-item`,
  `data-radcn-context-menu-radio-group`,
  `data-radcn-context-menu-radio-item`,
  `data-radcn-context-menu-separator`,
  `data-radcn-context-menu-shortcut`, `data-radcn-context-menu-sub`,
  `data-radcn-context-menu-sub-trigger`, and
  `data-radcn-context-menu-sub-content`
- shared item hooks: `data-radcn-menu-item`, `data-highlighted`,
  `data-disabled`, `data-state`, `data-value`, `data-inset`, and
  `data-variant`

Menu customization tokens:

- `--radcn-menu-z`
- `--radcn-menu-trigger-bg`
- `--radcn-menu-trigger-fg`
- `--radcn-menu-width`
- `--radcn-menu-bg`
- `--radcn-menu-fg`
- `--radcn-menu-border`
- `--radcn-menu-label-fg`
- `--radcn-menu-muted-fg`
- `--radcn-menu-highlight-bg`
- `--radcn-menu-highlight-fg`
- `--radcn-menu-destructive-fg`
- `--radcn-menu-destructive-highlight-bg`
- `--radcn-menu-destructive-highlight-fg`
- `--radcn-menu-disabled-fg`

The menu foundation now covers `dropdown-menu` and `context-menu`. Drawer
uses the modal foundation rather than the menu helper. Stage 4 widgets such as
`menubar`, `select`, `combobox`, `navigation-menu`, and `command` should not
blindly reuse `setupMenuOverlay()`; they need their own orientation, selection,
listbox/combobox, viewport, filtering, or navigation contracts.

## Stage 3 Drawer and Closure

Experiment 16 adds the final Stage 3 primitive:

- `Drawer`
- `DrawerTrigger`
- `DrawerPortal`
- `DrawerOverlay`
- `DrawerContent`
- `DrawerClose`
- `DrawerHeader`
- `DrawerFooter`
- `DrawerTitle`
- `DrawerDescription`

Drawer is a modal overlay like sheet, but it is not just an alias for sheet.
Sheet is a side-panel dialog variant with explicit side placement. Drawer
matches the shadcn/Vaul author expectation of a bottom-first panel with
optional `direction`, a visible handle by default for bottom drawers, and a
drag threshold policy.

RadCN drawer reuses `setupModal()` for portal movement, title/description
relationships, `role="dialog"`, `aria-modal`, focus trap, focus restoration,
Escape and outside dismissal, close controls, and body scroll lock. The drawer
wrapper layers on direction metadata, trigger `aria-expanded`/`aria-controls`,
handle rendering, and pointer drag behavior.

Direction policy:

- default direction is `bottom`;
- supported directions are `top`, `right`, `bottom`, and `left`;
- content exposes `data-direction` and `data-vaul-drawer-direction` for styling
  and migration familiarity;
- top/bottom drawers cap height at 80vh by default;
- left/right drawers cap width at 75vw and 24rem by default.

Gesture policy:

- bottom drawers render a handle by default;
- authors may request a handle for other directions;
- dragging from the handle or non-interactive content tracks along the drawer
  axis with `--radcn-drawer-drag-offset`;
- the deterministic close threshold is 80px;
- drags below 80px snap back open;
- drags at or beyond 80px close and restore focus through the modal controller.

The implementation intentionally does not include Vaul's full velocity physics,
snap points, nested drawer scaling, or background scaling. Those are approved
divergences for this stage because the tested RadCN policy preserves the
visible shadcn panel model, modal accessibility contract, customization hooks,
and a deterministic mobile-friendly dismiss gesture without importing Vaul.

Scrollable drawer content should scroll inside the drawer while body scroll
remains locked. Fixtures use an explicit internal scroll region to verify this
policy.

Drawer customization tokens:

- `--radcn-drawer-z`
- `--radcn-drawer-overlay-bg`
- `--radcn-drawer-border`
- `--radcn-drawer-bg`
- `--radcn-drawer-fg`
- `--radcn-drawer-trigger-bg`
- `--radcn-drawer-radius`
- `--radcn-drawer-max-height`
- `--radcn-drawer-side-width`
- `--radcn-drawer-side-max-width`
- `--radcn-drawer-handle-width`
- `--radcn-drawer-handle-height`
- `--radcn-drawer-handle-bg`
- `--radcn-drawer-action-bg`

Stage 3 is complete after Experiment 16. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-3-audit.md`. Stage 4 should
move next to composite widgets such as `select`, `combobox`, `command`,
`menubar`, `navigation-menu`, `calendar`, `date-picker`, and `carousel`.

## Stage 4 Select and Listbox Foundation

Experiment 17 adds the first Stage 4 composite widget:

- `Select`
- `SelectTrigger`
- `SelectValue`
- `SelectPortal`
- `SelectContent`
- `SelectViewport`
- `SelectGroup`
- `SelectLabel`
- `SelectItem`
- `SelectItemIndicator`
- `SelectSeparator`
- `SelectScrollUpButton`
- `SelectScrollDownButton`

RadCN now has two select surfaces with different contracts. `NativeSelect`
renders a real browser `<select>` and keeps native popup rendering, submission,
reset, and constraint validation. Custom `Select` renders server markup plus a
package-exported `enhanceSelect()` helper so authors can style the trigger,
portal content, listbox viewport, options, indicators, separators, groups, and
scroll buttons like shadcn/ui.

The custom select intentionally does not chase Radix DOM equivalence. It
preserves the visible and author-facing contract: a trigger opens positioned
content, selected option text is reflected into the trigger, options expose
listbox semantics, and stable `data-radcn-select-*` hooks plus CSS variables
drive customization.

Select reuses the Stage 3 portal and clamping policy rather than the menu
helper. Portal content moves to the nearest fixture-stage portal root when one
exists, otherwise to a document-level portal root. `position="item-aligned"`
aligns content to the trigger. `position="popper"` uses `side`, `align`, and
`sideOffset` metadata, clamps to the fixture stage or viewport, and exposes
available-size and transform-origin CSS variables.

The listbox behavior is new Stage 4 behavior, not menu behavior:

- the trigger has `role="combobox"`, `aria-haspopup="listbox"`,
  `aria-expanded`, `aria-controls`, and `aria-activedescendant` while open;
- the viewport has `role="listbox"`;
- items have `role="option"`, `aria-selected`, `aria-disabled`, `data-value`,
  `data-selected`, `data-highlighted`, and `data-disabled`;
- ArrowUp, ArrowDown, Home, and End rove highlighted options while skipping
  disabled items;
- typeahead searches enabled option text;
- Enter, Space, and pointer selection update the selected value, visible
  trigger text, selected hooks, hidden form value, and then close;
- Escape closes and restores trigger focus;
- outside pointer, Tab, and Shift+Tab close without changing selection.

Custom select form integration uses a hidden input when `name` is supplied.
The enhancement synchronizes the hidden input value on selection and restores
the initial/default value on form reset. This is an approved divergence from
native select constraint validation: the hidden input is for submission and
reset synchronization, while native browser required-validation behavior
belongs to `NativeSelect`.

`SelectPortal`, `SelectViewport`, and `SelectItemIndicator` are public because
the Remix 3 server-rendered compound shape needs explicit authored slots for
portal capture, scrollable viewport customization, and selected indicators.
They also make fixture probes and future install/copy output clear even though
upstream shadcn currently hides some of these details behind Radix parts.

Select customization tokens:

- `--radcn-select-z`
- `--radcn-select-trigger-width`
- `--radcn-select-trigger-bg`
- `--radcn-select-trigger-fg`
- `--radcn-select-border`
- `--radcn-select-invalid-border`
- `--radcn-select-placeholder-fg`
- `--radcn-select-icon-fg`
- `--radcn-select-content-max-height`
- `--radcn-select-bg`
- `--radcn-select-fg`
- `--radcn-select-highlight-bg`
- `--radcn-select-highlight-fg`
- `--radcn-select-indicator-fg`
- `--radcn-select-separator-bg`

Future `menubar` and `navigation-menu` work should reuse the boundary, not
blindly share the implementation. `menubar` should reuse menu-style item
activation and submenu policy instead of select's single-value listbox.
`navigation-menu` needs navigation and disclosure semantics rather than
selected form value semantics.

## Stage 4 Searchable Listbox Foundation

Experiment 18 adds input-owned searchable widgets:

- `Combobox` and its trigger, clear, portal, content, list, item, group, label,
  empty, separator, chip, and indicator parts
- `Command` and its dialog, input, list, empty, group, item, shortcut, and
  separator parts
- shared helper: `setupSearchableListbox()`

`Combobox` is not a native input and is not the same as custom `Select`.
`NativeSelect` owns native browser choice behavior. Custom `Select` owns a
closed trigger plus a selectable listbox. `Combobox` owns a text input, an
optional trigger and clear button, a filtered popup listbox, selected-value
display, optional chips, and hidden form synchronization.

`Command` is not a combobox or menu. It uses searchable option-like rows for
active-descendant movement and disabled skipping, but activation records a
command value and dispatches `radcn-command-select` instead of submitting a
form value or closing a menu. Shortcuts are visual hints only in this
experiment; there are no global keyboard listeners.

`setupSearchableListbox()` owns the behavior that is shared by both widgets:
query normalization, filtering, visible enabled item indexing, group hiding,
empty-state visibility, active-descendant synchronization, highlighted item
movement, and disabled skipping. Consumers own activation policy. Combobox
maps activation to selected values and form state; command maps activation to
command selection.

Combobox reuses the Stage 3 portal and clamping policy. Content moves to the
nearest fixture-stage portal root when present and falls back to a document
portal root. `side`, `align`, and `sideOffset` metadata drive fixed
positioning, available-height variables, and transform origin. Command renders
inline by default. `CommandDialog` composes the existing RadCN dialog
foundation for modal semantics, title/description, portal capture, focus trap,
Escape/outside dismissal, and scroll lock.

Search behavior is input-owned:

- typing filters visible items and updates `data-query`;
- matching groups stay visible and empty groups are hidden;
- empty slots show only when no items match;
- ArrowUp, ArrowDown, Home, and End move through visible enabled items;
- Enter selects the active combobox item or activates the active command item;
- pointer movement highlights enabled rows and pointer click activates them;
- disabled rows stay visible when they match but cannot be highlighted or
  activated.

Combobox form behavior uses a hidden input when `name` is supplied. Single
selection serializes the selected value directly. Multiple selection serializes
selected values as a comma-separated string in selection order, such as
`react,remix,svelte`; this is a documented interim policy rather than native
multi-select equivalence. Form reset restores the initial/default selection and
visible input display. Required validation for this custom widget remains an
approved divergence; use `NativeSelect` when native constraint validation is
the priority.

Approved upstream divergences:

- RadCN does not copy Base UI, cmdk, Radix, or shadcn DOM shape.
- Combobox and command use Remix 3 server markup plus package-exported
  enhancements instead of React context/state machines.
- Command activation is local to the component and a custom event, not cmdk's
  React callback model.
- Combobox multiple values use hidden-input comma serialization until a later
  form-array policy exists.
- Command dialog is composition over the existing RadCN dialog rather than a
  separate palette modal implementation.

Later `menubar`, `navigation-menu`, `calendar`, `date-picker`, and `carousel`
experiments should reuse only the pieces that fit their user contract.
`menubar` should stay closer to menu activation and submenus. `navigation-menu`
should prioritize navigation/disclosure semantics. `calendar` and
`date-picker` may reuse roving and active-descendant lessons, but need date
grid semantics and range/value policy. `carousel` should avoid listbox
semantics unless a real selectable list is present.

## Stage 4 Menu and Navigation Composite Foundation

Experiment 19 adds the menu/navigation composite cluster:

- `Menubar` and its menu, trigger, portal, content, item, checkbox item, radio
  group/item, indicator, label, separator, shortcut, group, submenu trigger,
  and submenu content parts
- `NavigationMenu` and its list, item, trigger, content, link, indicator, and
  viewport parts

`Menubar` is not just `DropdownMenu` with a different trigger. Each
`MenubarMenu` reuses the proven Stage 3 `setupMenuOverlay()` behavior for the
popup content, menu item roving, typeahead, checked/radio state, submenus,
portal capture, and clamping. The `Menubar` root adds the missing persistent
menu-bar contract: horizontal or vertical roving between top-level triggers,
orientation-aware Arrow key behavior, loop policy, and handoff to the owning
menu popup.

`NavigationMenu` is not a menubar and not generic disclosure. It is navigation
first: links remain real anchors, trigger-owned panels are disclosure content,
and the root renders navigation semantics. Its enhancer owns top-level roving
between triggers/links, active content visibility, viewport open/closed state,
indicator positioning, and delay/skip-delay hooks. Roving deliberately ignores
links inside open content panels; those links are page navigation targets, not
top-level navigation-menu controls.

RadCN does not reuse listbox or searchable-listbox helpers for this cluster.
Menubar activation follows menu semantics, including submenus and checked
items. Navigation menu activation follows link/disclosure semantics. Neither
component owns a selected form value or searchable query.

Keyboard and pointer policy:

- menubar root exposes `role="menubar"` and `aria-orientation`;
- menubar triggers expose `role="menuitem"`, popup relationships, roving
  `tabindex`, and orientation-aware root movement;
- menubar content and submenus expose `role="menu"` and reuse menu item
  movement, typeahead, Escape, Tab, checked/radio, and disabled-skip behavior;
- navigation menu root exposes a labeled `nav`;
- navigation triggers expose `aria-expanded` and `aria-controls`;
- navigation links remain anchors with optional `aria-current="page"`;
- navigation viewport and indicator are decorative/layout hooks with
  `aria-hidden="true"`;
- disabled top-level controls are skipped by roving and inactive.

Approved divergences from Radix/shadcn:

- Menubar composes one enhanced menu overlay per top-level menu instead of
  copying Radix menubar internals.
- Navigation menu uses inline root-owned content, viewport, and indicator
  hooks instead of Radix context and animation state.
- Viewport sizing is exposed through deterministic CSS variables from measured
  content; artifact screenshots do not depend on React layout effects.
- Content-panel links are not part of top-level roving focus.

`Calendar` and `date-picker` reuse only the roving-focus discipline and
explicit state hooks from this cluster. They own date-grid semantics, date value
policy, range policy, and popover composition rather than menu item activation.
`Carousel` should use its own slide/region semantics and should not borrow
menu, date-grid, or listbox roles unless a true menu/listbox is present.

## Stage 4 Calendar and Date Picker Foundation

Experiment 20 adds the date-grid cluster:

- `Calendar` and its caption, navigation, month, grid, week, day, day button,
  weekday, and week-number hooks
- `enhanceCalendar()` for pointer selection, keyboard movement, form reset, and
  visible month navigation
- date-picker fixture recipes that compose existing `Button`, `Popover`, and
  `Calendar` behavior

`Calendar` is not a listbox, menu, or navigation menu. The root exposes a
labeled calendar region, the month content renders a real table with
`role="grid"`, day cells expose `role="gridcell"`, and day buttons own roving
focus. Date selection is a date-grid concern, not menu activation and not a
selected option list.

RadCN does not copy `react-day-picker` into the package. The port keeps the
visible shadcn-style calendar surface while using a small native `Date` helper
for the supported scenarios. Values serialize as local `YYYY-MM-DD` strings.
Range display uses a `start..end` value for fixture and styling hooks; richer
interactive range authoring should be added only when a later requirement needs
it.

Keyboard and pointer policy:

- Arrow keys move day focus by one day or one week.
- Home and End move to the start or end of the focused week.
- PageUp and PageDown change the visible month and rerender the caption and day
  grid.
- Enter, Space, or pointer activation selects an enabled day and syncs the
  hidden form value when the calendar has a `name`.
- Disabled dates, `min`, and `max` remove dates from selection and focus.
- Selected, today, outside, disabled, focused, range-start, range-middle, and
  range-end states are public `data-*` hooks.

Date-picker is currently a recipe/block disposition, not a core package
subpath. The fixture route documents the composition boundary with
`data-radcn-date-picker-recipe`: a trigger button opens a RadCN popover, the
popover contains a RadCN calendar, and the recipe owns its hidden input and
display label. This avoids publishing a premature date-picker API while still
proving the browser behavior and artifact comparison path.

Approved divergences from Radix/shadcn:

- Calendar uses dependency-free native date helpers instead of `react-day-picker`
  internals.
- Date-picker is documented as composition, not exported as a core component.
- Range behavior is currently a visual/state-hook disposition rather than a
  complete interactive range picker.
- Calendar month navigation rerenders deterministic DOM instead of relying on
  React state.

After this cluster, Stage 4 remains open for `carousel` only. Carousel should
reuse the fixture/artifact discipline and explicit data hooks, but it should
own slide, region, scroll, and motion policy separately from date-grid,
menu/navigation, and listbox behavior.

## Stage 4 Carousel Foundation

Experiment 21 adds the final Stage 4 composite widget:

- `Carousel`
- `CarouselContent`
- `CarouselItem`
- `CarouselPrevious`
- `CarouselNext`
- `enhanceCarousel()`

RadCN keeps the shadcn/ui carousel parts but does not copy the React Embla
wrapper. The core RadCN carousel is a progressively enhanced native scroll-snap
region. This preserves the visible component shape, slide semantics, keyboard
movement, previous/next controls, boundary disabled state, responsive layout,
and customization hooks without publishing a React `api`, `setApi`, `opts`, or
plugin contract.

The supported RadCN API is explicit:

- `Carousel` supports `ariaLabel`, `ariaLabelledby`, `defaultIndex`,
  `orientation`, `loop`, and public class/style hooks.
- `CarouselContent` owns the overflow viewport and scroll-snap surface.
- `CarouselItem` owns slide semantics with optional authored labels/indexes.
- `CarouselPrevious` and `CarouselNext` are button controls with labels,
  disabled overrides, and public class/style hooks.
- `enhanceCarousel()` owns current-index state, native scroll synchronization,
  control disabled state, keyboard movement, and `radcn-carousel-select` /
  `radcn-carousel-scroll` events.

Accessibility and state policy:

- the root exposes `role="region"` and `aria-roledescription="carousel"`;
- the root must have an accessible name through `ariaLabel` or
  `ariaLabelledby`;
- slides expose `role="group"` and `aria-roledescription="slide"`;
- unlabeled slides are labeled as `Slide n of total` during enhancement;
- current state is exposed through `data-index`, `data-current`,
  `data-count`, `data-can-previous`, `data-can-next`, `data-motion`, and
  per-slide `data-selected`;
- previous/next controls are disabled at boundaries unless `loop` is enabled.

Keyboard and scroll policy:

- horizontal carousels respond to ArrowLeft and ArrowRight;
- vertical carousels respond to ArrowUp and ArrowDown;
- Home and End move to the first and last slide;
- keyboard movement focuses the selected slide for deterministic focus;
- native scroll, touchpad-style scroll, or programmatic `scrollTo()` movement
  resynchronizes current hooks and control disabled state.

Approved divergences from shadcn/Embla:

- RadCN does not expose Embla's React API, options object, `setApi`, or plugin
  system in the core carousel.
- Core carousel movement is immediate and deterministic for state hooks rather
  than driven by Embla animation state.
- Advanced Embla-specific features can become future recipes or hardening work
  if a later issue proves they are required.

Stage 4 is complete after this cluster. Stage 5 should handle React-heavy
systems and application blocks next: `chart`, `data-table`, `sonner`, `toast`,
`resizable`, `sidebar`, `form`, `input-group`, `input-otp`, and any remaining
recipe/block dispositions.

## Stage 5 Form and Input Cluster

Experiment 22 starts Stage 5 with the form/input cluster:

- `InputGroup`
- `InputOTP`
- `form` disposition recipes

This cluster resolves the pieces that are closest to existing RadCN native form
controls before moving to larger systems such as charting, data tables,
notifications, sidebars, and resizable panels.

### Input Group

`InputGroup` is a core RadCN component. It keeps shadcn/ui's author-facing
parts:

- `InputGroup`
- `InputGroupAddon`
- `InputGroupButton`
- `InputGroupText`
- `InputGroupInput`
- `InputGroupTextarea`

The implementation is mostly server-rendered markup and CSS. The root renders a
real `role="group"` container with stable `data-radcn-input-group` hooks.
Input and textarea slots render native controls, so names, values, disabled
state, required state, keyboard behavior, form submission, and reset remain
browser-owned.

`enhanceInputGroup()` is intentionally small. It only restores the upstream
addon affordance where clicking a non-interactive addon focuses the grouped
input or textarea. It does not intercept clicks on nested buttons or links.

Supported customization hooks:

- root class and style hooks;
- addon `data-align` for `inline-start`, `inline-end`, `block-start`, and
  `block-end`;
- `radcn-input-group-*` classes;
- CSS variables such as `--radcn-input-group-border`,
  `--radcn-input-group-bg`, and `--radcn-input-group-addon-fg`.

### Input OTP

`InputOTP` is a core RadCN component, but it does not use the React
`input-otp` package. RadCN uses one real text input as the source of truth and
mirrors that value into visible slots through `enhanceInputOTP()`.

This preserves the important browser contract:

- `name`, `value`, `required`, `pattern`, disabled state, submit, and reset live
  on an actual form control;
- visible slots are presentation/state hooks, not separate form controls;
- paste and typing are filtered through the configured pattern;
- Backspace, Delete, ArrowLeft, ArrowRight, Home, and End remain input editing
  operations with mirrored slot/caret state;
- slots expose deterministic `data-index`, `data-char`, `data-filled`, and
  `data-active` hooks;
- separators render `role="separator"`;
- `radcn-input-otp-change` is emitted when the enhanced value changes.

RadCN exports `REGEXP_ONLY_DIGITS` and `REGEXP_ONLY_DIGITS_AND_CHARS` to keep
the common upstream examples portable without depending on the upstream React
package.

Approved divergences from the React `input-otp` package:

- RadCN does not expose the package's React context or render-prop internals.
- Slots mirror a native input value instead of receiving React context state.
- Fake caret state is a CSS/data-hook projection from the input selection.

### Form Disposition

`form` is a recipe/disposition outcome, not a core RadCN package export.

The upstream shadcn/ui `form` file is a React Hook Form adapter. It depends on
React context, `Controller`, `useFormContext()`, `useFormState()`, generated
React IDs, and Radix `Slot`. That API does not map cleanly to Remix 3's
server-first form model, and copying it would make RadCN's core form story
React-shaped.

RadCN's replacement strategy is:

- use native `<form>` elements;
- use RadCN `Field`, `Label`, `Input`, `Textarea`, `Select`, `Checkbox`,
  `RadioGroup`, `Switch`, `InputGroup`, and `InputOTP` as needed;
- render server/action validation output as `FieldError`;
- wire errors and descriptions through explicit `id`, `aria-describedby`, and
  `aria-invalid`;
- rely on native required/pattern validation where it is sufficient;
- keep form orchestration in Remix routes/actions or recipe code rather than a
  `radcn/form` adapter.

Install/source parity for `form` is recipe-based: docs and fixtures demonstrate
the supported composition, but `packages/radcn/package.json` intentionally does
not export `./form`.

## Stage 5 Data Display and Table Block

Experiment 23 resolves the data-display cluster:

- `Chart`
- `data-table` disposition recipes

### Chart

`chart` is a core RadCN data-display component set, but it does not use
Recharts. The upstream shadcn/ui chart module is a React wrapper around
Recharts context, payload objects, tooltip components, and responsive container
behavior. RadCN replaces that with dependency-free SVG primitives and explicit
data hooks.

Supported parts:

- `ChartContainer`
- `ChartBarSeries`
- `ChartLineSeries`
- `ChartLegend`
- `ChartLegendItem`
- `ChartTooltip`
- `ChartTooltipItem`

The core chart contract is intentionally bounded:

- charts render as plain SVG inside a `role="img"` figure;
- the chart has an explicit accessible name through `ariaLabel` or
  `ariaLabelledby`;
- descriptions can be provided through visible text and `aria-describedby`;
- bar and line series render deterministic `data-radcn-chart-bar`,
  `data-radcn-chart-line`, and `data-radcn-chart-point` hooks;
- legend and tooltip/details output are normal DOM, not Recharts payload
  render callbacks;
- colors use explicit props, `ChartConfig` variables, or public CSS variables;
- sizing uses `viewBox`, CSS width, and an aspect-ratio hook.

Approved divergences from shadcn/Recharts:

- RadCN does not expose Recharts `ResponsiveContainer`, payload helpers,
  `Tooltip`, `Legend`, or React context.
- RadCN does not add `recharts` as a core dependency.
- Advanced chart types and live interaction can be future recipes if a later
  issue proves they are needed.

### Data Table Disposition

`data-table` is a block/recipe outcome, not a core RadCN package export.

The upstream dashboard data table is application code. It combines TanStack
Table, dnd-kit drag/drop, Zod schemas, Recharts, Sonner toasts, Drawer,
DropdownMenu, Select, Tabs, Checkbox, Button, and Table. Copying that as a
generic `radcn/data-table` primitive would bring application state and several
React-specific libraries into core RadCN.

RadCN's supported data-table strategy is:

- keep `Table` as the semantic core primitive;
- compose `Button`, `Checkbox`, `DropdownMenu`, `Drawer`, `Select`, `Tabs`, and
  `Chart` in recipe/block code;
- model sorting, filtering, pagination, row selection, row actions, column
  visibility, row detail panels, and reordering in Remix route/action or local
  recipe code;
- document omitted dashboard behaviors instead of pretending unavailable
  notification or drag/drop systems exist in core;
- keep install/source parity recipe-based, with no `radcn/data-table` package
  subpath.

The fixture block demonstrates the portable pieces: semantic table output,
sort/filter controls, selected rows, pagination, row actions, responsive detail
composition, and custom tokens. Drag/drop persistence, schema validation,
server-backed filtering, and notification side effects remain application-code
responsibilities.

## Stage 5 Notifications

Experiment 24 resolves the notification cluster:

- `sonner`
- `toast`

### Sonner

`sonner` is a core RadCN notification component set, but it does not use the
React `sonner` package or `next-themes`. The upstream shadcn/ui module is a
small React wrapper around Sonner's toaster, icon slots, theme bridge, and CSS
variable mapping. RadCN replaces that with dependency-free server-rendered
notification markup plus an optional browser enhancement.

Supported parts and helpers:

- `Toaster`
- `Toast`
- `enhanceToaster`

The core notification contract is intentionally bounded:

- the toaster renders a named `role="region"` notification viewport;
- initial notifications are plain server-rendered markup, so route/action
  feedback and screenshots do not depend on client state;
- each toast uses `role="status"` or `role="alert"` based on severity;
- toast variants cover `default`, `success`, `info`, `warning`, `error`, and
  `loading`;
- title, description, action, dismiss, icon, state, and type hooks use stable
  `data-radcn-toast*` attributes;
- colors and shape come from RadCN CSS variables rather than an external theme
  manager;
- `enhanceToaster()` listens for `radcn-toast` events and can render
  client-dispatched notifications after hydration.

Approved divergences from Sonner:

- RadCN does not expose Sonner's React component payloads, promise helpers,
  swipe physics, rich positioning API, or external theme-manager bridge.
- RadCN does not add `sonner` or `next-themes` as core dependencies.
- Advanced notification orchestration can be future recipe or app code if a
  later issue proves it is needed.

### Toast Disposition

`toast` is the event/helper surface for the toaster, not a second visual
primitive. RadCN exposes a dependency-free `radcn/toast` helper with:

- `RADCN_TOAST_EVENT`
- `createToastEvent(payload)`
- `toast(payload)`

Applications may also dispatch a browser `CustomEvent` directly. Server-driven
route/action notifications should render initial `Toast` payloads into
`Toaster`; client-only notifications can use `toast()` after
`enhanceToaster()` is registered.

Install/source parity for `toast` is helper-based: the visual source is
`radcn/sonner`, while `radcn/toast` is the optional dispatch adapter.

## Stage 5 Application Shell

Experiment 25 resolves the application-shell cluster:

- `ResizablePanelGroup`
- `ResizablePanel`
- `ResizableHandle`
- `SidebarProvider`
- `Sidebar`
- `SidebarTrigger`
- `SidebarRail`
- `SidebarInset`
- `SidebarHeader`
- `SidebarFooter`
- `SidebarContent`
- `SidebarGroup`
- `SidebarGroupLabel`
- `SidebarGroupAction`
- `SidebarGroupContent`
- `SidebarMenu`
- `SidebarMenuItem`
- `SidebarMenuButton`
- `SidebarMenuAction`
- `SidebarMenuBadge`
- `SidebarMenuSkeleton`
- `SidebarMenuSub`
- `SidebarMenuSubItem`
- `SidebarMenuSubButton`
- `SidebarInput`
- `SidebarSeparator`

### Resizable

`resizable` is a core RadCN layout primitive set, but it does not use
`react-resizable-panels`. The upstream shadcn/ui module is a React wrapper
around that package. RadCN replaces it with dependency-free panel markup plus a
small browser enhancement.

The supported contract is bounded to horizontal and vertical panel groups,
percentage-sized adjacent panels, separator handles, pointer dragging, keyboard
resizing with Arrow/Home/End keys, optional visible grip handles, and stable
customization hooks.

Resizable hooks include:

- `data-radcn-resizable-panel-group`
- `data-radcn-resizable-panel`
- `data-radcn-resizable-handle`
- `data-radcn-resizable-handle-grip`

Approved divergences from `react-resizable-panels`:

- RadCN does not add `react-resizable-panels` as a core dependency.
- RadCN does not expose React callbacks, persistence APIs, imperative panel
  handles, collapsible panel groups, or nested group orchestration in this
  port.
- Advanced resize persistence and app-specific layout state can be recipe code
  layered on the emitted `radcn-resizable-change` event.

### Sidebar

`sidebar` is a core RadCN application-shell component set, but it does not use
React context, Radix Slot, class-variance-authority, or a mobile detection hook.
The upstream shadcn/ui module is a large client component composed from many
React primitives. RadCN replaces that with server-rendered shell markup plus a
small enhancement that owns collapsed state, trigger/rail toggles, and the
`Cmd/Ctrl+B` shortcut.

The supported contract includes left/right side placement, `sidebar`,
`floating`, and `inset` variants, `none`, `icon`, and `offcanvas` collapsible
modes, server-rendered default open state, menu slots, active/disabled/badge/
action/submenu/skeleton states, and stable state hooks.

Sidebar hooks include:

- `data-radcn-sidebar-provider`
- `data-radcn-sidebar`
- `data-radcn-sidebar-trigger`
- `data-radcn-sidebar-rail`
- `data-radcn-sidebar-menu-button`
- `data-radcn-sidebar-menu-badge`
- `data-radcn-sidebar-menu-action`
- `data-radcn-sidebar-menu-sub`
- `data-radcn-sidebar-menu-skeleton`

Approved divergences from shadcn/ui sidebar:

- RadCN does not add React context, `@radix-ui/react-slot`,
  `class-variance-authority`, React, React DOM, or a mobile hook dependency.
- The responsive/mobile policy is deterministic CSS/offcanvas state rather than
  a JavaScript media-query hook and cookie-backed React state provider.
- Tooltip, sheet, and input behavior are represented through explicit sidebar
  parts and existing RadCN styling hooks instead of hidden client composition.
- Application-specific persistence can listen for `radcn-sidebar-change` and
  write route, cookie, or storage state outside core RadCN.

## Styles and Tokens

RadCN exposes `radcnStyles` from `radcn/styles`. The candidate Remix document
loads that CSS once for all fixtures.

The CSS defines:

- `radcn-*` classes for public component parts;
- `data-radcn-*` attributes for stable fixture and customization probes;
- CSS variables such as `--radcn-primary`, `--radcn-input`,
  `--radcn-field-error`, `--radcn-card-border`, `--radcn-spinner-size`, and
  `--radcn-radius`.

Customization probes should prefer these public hooks. For example,
`button/custom-class` uses `radcn-fixture-custom-button` to override button
tokens, and `field/custom-error-token` uses `radcn-fixture-custom-field` to
override the field error token.

Static/display customization probes follow the same rule:

- `alert/custom-token` overrides alert color tokens.
- `badge/custom-class` overrides badge color tokens.
- `card/custom-token` overrides card background and border tokens.
- `spinner/custom-size` overrides spinner color and size tokens.

Navigation, collection, and typography probes continue that pattern:

- `breadcrumb/custom-separator` customizes breadcrumb color and separator text.
- `typography/custom-token` overrides heading size and muted text color.
- `native-select/custom-token` overrides select border, background,
  foreground, and invalid tokens.
- `checkbox/custom-token`, `radio-group/custom-token`, and
  `switch/custom-token` override shared native state control tokens.
- `progress/custom-token` overrides progress track and indicator tokens.
- `accordion/custom-token` overrides accordion border, trigger, and content
  tokens.
- `avatar/custom-token` overrides avatar fallback and badge tokens.
- `scroll-area/custom-token` overrides scroll-area border, background, thumb,
  and corner tokens.
- `dialog/custom-token` overrides dialog overlay, content, and trigger tokens.
- `alert-dialog/custom-token` overrides alert-dialog overlay, panel, media, and
  action tokens.
- `sheet/custom-token` overrides sheet overlay, panel, and action tokens.
- `drawer/custom-token` overrides drawer overlay, panel, handle, trigger, and
  action tokens.
- `popover/custom-token` overrides positioned overlay border, background,
  foreground, and close tokens.
- `tooltip/custom-token` overrides tooltip background and foreground tokens.
- `hover-card/custom-token` overrides positioned overlay panel and avatar
  tokens.
- `dropdown-menu/custom-token` and `context-menu/custom-token` override menu
  panel, border, and item highlight tokens.
- `select/custom-token` overrides custom select trigger, panel, highlight, and
  indicator tokens.
- `combobox/custom-token` overrides combobox panel border and highlight tokens.
- `command/custom-token` overrides command panel border and highlighted item
  tokens.
- `menubar/custom-token` overrides menubar border, panel, and highlighted item
  tokens.
- `navigation-menu/custom-token` overrides navigation menu border, panel, and
  foreground tokens.
- `chart/custom-token` overrides chart border, background, series, and tooltip
  tokens.
- `data-table/custom-token` overrides the recipe block border and background
  tokens.
- `sonner/custom-token` overrides notification border, background, foreground,
  icon, and action tokens.
- `resizable/custom-token` overrides resizable border, panel background,
  handle, and grip tokens.
- `sidebar/custom-token` overrides sidebar background, foreground, border,
  accent, and icon-width tokens.

## Stage 1 Status

Stage 1 is complete as of Experiment 4. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-1-audit.md`.

## Stage 2 Status

Stage 2 is complete as of Experiment 11. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-2-audit.md`.

## Stage 3 Status

Stage 3 is complete as of Experiment 16. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-3-audit.md`.

## Stage 4 Status

Stage 4 is complete as of Experiment 21. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-4-audit.md`.

## Stage 5 Status

Stage 5 is complete as of Experiment 25. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-5-audit.md`.

## Interim Install and Copy Workflow

Until the final documentation site and CLI exist, the workspace package is the
source of truth. Future install tooling should copy from this source shape into
an app-owned component directory, preserving shadcn/ui's copy-own-customize
workflow while adapting the implementation to Remix 3.
