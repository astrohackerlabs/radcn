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

## Interim Install and Copy Workflow

Until the final documentation site and CLI exist, the workspace package is the
source of truth. Future install tooling should copy from this source shape into
an app-owned component directory, preserving shadcn/ui's copy-own-customize
workflow while adapting the implementation to Remix 3.
