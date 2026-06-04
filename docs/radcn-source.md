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

## Stage 1 Status

Stage 1 is complete as of Experiment 4. Evidence is recorded in
`issues/0002-implement-entire-shadcn-port/stage-1-audit.md`.

## Interim Install and Copy Workflow

Until the final documentation site and CLI exist, the workspace package is the
source of truth. Future install tooling should copy from this source shape into
an app-owned component directory, preserving shadcn/ui's copy-own-customize
workflow while adapting the implementation to Remix 3.
