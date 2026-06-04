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
gestures still need positioning, collision, arrow, delay, non-modal, menu, or
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
remain unsolved because they need collision, anchoring, menu focus/typeahead,
hover/focus delay, contextmenu events, or gesture handling beyond this modal
variant layer.

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
`hover-card`. Dropdown menu and context menu remain unsolved because they need
menu semantics, roving focus, typeahead, checked/radio item state, submenu
coordination, and contextmenu triggers. Drawer remains unsolved because it
needs a gesture and mobile interaction policy that should not be forced into
the non-modal positioning helper.

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
- `popover/custom-token` overrides positioned overlay border, background,
  foreground, and close tokens.
- `tooltip/custom-token` overrides tooltip background and foreground tokens.
- `hover-card/custom-token` overrides positioned overlay panel and avatar
  tokens.

## Stage 1 Status

Stage 1 is complete as of Experiment 4. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-1-audit.md`.

## Stage 2 Status

Stage 2 is complete as of Experiment 11. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-2-audit.md`.

## Interim Install and Copy Workflow

Until the final documentation site and CLI exist, the workspace package is the
source of truth. Future install tooling should copy from this source shape into
an app-owned component directory, preserving shadcn/ui's copy-own-customize
workflow while adapting the implementation to Remix 3.
