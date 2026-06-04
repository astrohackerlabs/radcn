+++
status = "open"
opened = "2026-06-04"
+++

# Issue 2: Implement the Entire shadcn/ui Port

## Goal

Port the full shadcn/ui component surface to RadCN for Remix 3. The work should
produce a usable Remix 3 component library, fixture coverage, parity artifacts,
documentation, and reviewed divergence notes for every supported component.

## Background

Issue 1 established the porting model and is the foundation for this work:

- [Component inventory and classification](../0001-shadcn-port-scope/component-inventory.md)
  identifies the target component set, risk level, behavior class, likely
  Remix 3 mapping, and parity checks for each shadcn/ui component.
- [RadCN component parity model](../0001-shadcn-port-scope/parity-model.md)
  defines the acceptance contract for future ports: visual parity,
  customization parity, accessibility parity, interaction parity,
  form/native-web parity, install/source parity, and acceptable Remix 3
  divergence.
- The fixture apps and artifact harness already exist under `fixtures/`:
  - React Router shadcn reference app: `http://localhost:4601`
  - Remix 3 RadCN candidate app: `http://localhost:4602`
  - artifact command: `pnpm fixtures:artifacts`

This issue intentionally owns the entire port, but it must proceed through one
experiment at a time. Do not design all experiments upfront. Each experiment
must finish, record results, pass independent review, and commit before the next
experiment is designed.

## Operating Rules

Use the issue workflow from `AGENTS.md`.

This issue has one ordered series of experiments. The experiments should fully
solve one stage before moving to the next. The outcome of each experiment
determines the next experiment inside the current stage.

Every component port must satisfy the checklist in
[the parity model](../0001-shadcn-port-scope/parity-model.md#component-done-checklist)
or record an approved divergence.

Do not treat exact DOM equivalence as the default pass criterion. RadCN should
match shadcn/ui's user-visible behavior and author-visible customization value,
while using Remix 3 and web-native architecture where that is the better fit.

Do not edit vendored source under `vendor/`. Vendor checkouts are reference
inputs only.

## Learnings

Record cross-component discoveries here as soon as they become necessary for
later components to be implemented successfully. This section is the issue-level
memory for decisions that should outlive a single experiment.

Add a learning when an experiment discovers:

- a reusable source layout, helper, primitive, token, fixture pattern, or test
  pattern;
- a Remix 3 behavior that changes how later components should be built;
- a shadcn/ui pattern that should be preserved, adapted, replaced, or avoided;
- an accessibility, keyboard, form, portal, positioning, animation, or
  customization rule that applies beyond one component;
- a dependency or upstream implementation detail that affects later stage
  planning;
- an approved divergence pattern that future components may reuse.

Each learning should be short and actionable:

```markdown
- **YYYY-MM-DD, Experiment N:** {decision or discovery}. Applies to:
  `{component-or-stage}`. Evidence: {link to experiment result, helper, test, or
  artifact}.
```

If a later experiment changes or invalidates a learning, add a new learning that
supersedes it. Do not rewrite old learning entries after they have informed
committed work.

- **2026-06-04, Experiment 1:** RadCN source starts as a workspace package at
  `packages/radcn`, while fixtures consume it through package imports rather
  than fixture-local component placeholders. Applies to: `Stage 1` and all
  future component ports. Evidence:
  [Experiment 1](01-stage-1-source-and-native-control-foundation.md),
  `packages/radcn/package.json`.
- **2026-06-04, Experiment 1:** Stage 1 customization hooks use stable
  `radcn-*` classes, `data-radcn-*` attributes, and CSS variables loaded once by
  the Remix document. Applies to: `button`, `input`, `field`, `label`,
  `textarea`, and later static/native components. Evidence:
  [Experiment 1](01-stage-1-source-and-native-control-foundation.md),
  `packages/radcn/src/styles/tokens.css`.
- **2026-06-04, Experiment 1:** The first `Input` proof is intentionally a text
  input; later input-like components need an explicit type strategy instead of
  assuming one generic wrapper can safely cover every native input type.
  Applies to: `input`, `input-group`, `input-otp`, form controls. Evidence:
  [Experiment 1](01-stage-1-source-and-native-control-foundation.md),
  `packages/radcn/src/components/input.tsx`.
- **2026-06-04, Experiment 1:** Paired reference/candidate screenshots are the
  baseline visual artifact, but automated visual parity still needs a pixel-diff
  threshold before screenshot capture alone can be treated as visual approval.
  Applies to: all component stages. Evidence:
  [Experiment 1](01-stage-1-source-and-native-control-foundation.md),
  `fixtures/artifacts/manifest.json`.
- **2026-06-04, Experiment 1:** Runtime CSS currently exists as both
  `tokens.css` and the exported `radcnStyles` string; future styling work should
  remove or automate that duplication before the token surface grows. Applies
  to: all styled components. Evidence:
  [Experiment 1](01-stage-1-source-and-native-control-foundation.md),
  `packages/radcn/src/styles/tokens.css`,
  `packages/radcn/src/styles/index.ts`.
- **2026-06-04, Experiment 2:** Static/display primitives should stay
  server-rendered by default and expose component-part slots through stable
  `data-radcn-*` hooks plus variant modifier classes. Applies to: `alert`,
  `badge`, `card`, `empty`, `kbd`, `separator`, and the remaining Stage 1
  static components. Evidence:
  [Experiment 2](02-stage-1-static-display-primitives.md),
  `packages/radcn/src/components/card.tsx`,
  `fixtures/tests/static-display.spec.ts`.
- **2026-06-04, Experiment 2:** Loading visuals need explicit accessibility
  policy: status indicators such as `Spinner` expose `role="status"` with an
  accessible name, while decorative placeholders such as `Skeleton` use
  `aria-hidden="true"`. Applies to: `spinner`, `skeleton`, `progress`, and
  future feedback components. Evidence:
  [Experiment 2](02-stage-1-static-display-primitives.md),
  `packages/radcn/src/components/spinner.tsx`,
  `packages/radcn/src/components/skeleton.tsx`.
- **2026-06-04, Experiment 2:** Layout-only Radix wrappers can often collapse to
  native CSS when the visible and author-facing behavior is preserved; RadCN
  `AspectRatio` uses the CSS `aspect-ratio` property instead of a client
  primitive. Applies to: `aspect-ratio` and future layout/static components.
  Evidence: [Experiment 2](02-stage-1-static-display-primitives.md),
  `packages/radcn/src/components/aspect-ratio.tsx`.
- **2026-06-04, Experiment 3:** Navigation and collection primitives must treat
  ARIA semantics as part of the public port contract, not incidental markup.
  Breadcrumb and pagination expose labeled `nav` landmarks, current-page hooks,
  list structure, presentation ellipses/separators, and stable slot hooks.
  Applies to: `breadcrumb`, `pagination`, `navigation-menu`, `menubar`, and
  future collection widgets. Evidence:
  [Experiment 3](03-stage-1-navigation-collection-and-typography-primitives.md),
  `fixtures/tests/navigation-collection.spec.ts`.
- **2026-06-04, Experiment 3:** shadcn/ui typography is documented as examples,
  not shipped primitive source; RadCN treats it as importable recipe components
  so the docs site and fixtures can verify semantic text styles consistently.
  Applies to: `typography` and future recipe/block disposition decisions.
  Evidence:
  [Experiment 3](03-stage-1-navigation-collection-and-typography-primitives.md),
  `packages/radcn/src/components/typography.tsx`,
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 3:** Stage 1 static components can use real semantic
  container elements rather than client wrappers: `Table` renders actual table
  sections, `ItemGroup`/`Item` render list/listitem roles, and `ButtonGroup`
  renders `role="group"` with orientation hooks. Applies to: remaining static
  components and future composite widgets that build on these surfaces.
  Evidence:
  [Experiment 3](03-stage-1-navigation-collection-and-typography-primitives.md),
  `packages/radcn/src/components/table.tsx`,
  `packages/radcn/src/components/item.tsx`,
  `packages/radcn/src/components/button-group.tsx`.
- **2026-06-04, Experiment 4:** Native select parity is scoped to the closed
  control, wrapper/icon hooks, real option/optgroup markup, and native form
  behavior; popup menu rendering remains browser/OS-controlled and is not a
  portable visual parity surface. Applies to: `native-select` and future native
  form controls. Evidence:
  [Experiment 4](04-stage-1-native-select-and-closure-audit.md),
  `packages/radcn/src/components/native-select.tsx`,
  `fixtures/tests/native-select.spec.ts`.
- **2026-06-04, Experiment 4:** Stage 1 is complete after `native-select` and
  the closure audit. The next experiment may begin Stage 2. Applies to:
  `Stage 1`, `Stage 2`. Evidence:
  [Stage 1 audit](stage-1-audit.md),
  [Experiment 4](04-stage-1-native-select-and-closure-audit.md).
- **2026-06-04, Experiment 5:** Native state controls can stay visibly
  modifiable without hydration when the real input owns behavior and CSS
  `:has(input:checked)` drives live visual state. Decorative indicators and
  thumbs must be pointer-transparent so they do not intercept native input
  clicks. Applies to: `checkbox`, `radio-group`, `switch`, and future native
  state controls. Evidence:
  [Experiment 5](05-stage-2-native-state-and-progress-primitives.md),
  `packages/radcn/src/styles/tokens.css`,
  `fixtures/tests/native-state.spec.ts`.
- **2026-06-04, Experiment 5:** Checkbox indeterminate state cannot be serialized
  as the native `HTMLInputElement.indeterminate` property in server HTML.
  RadCN exposes mixed state through `aria-checked="mixed"` and
  `data-state="indeterminate"` unless a later client entry explicitly sets the
  runtime property. Applies to: `checkbox`, `toggle`-like mixed states, and
  future client-state decisions. Evidence:
  [Experiment 5](05-stage-2-native-state-and-progress-primitives.md),
  `packages/radcn/src/components/checkbox.tsx`,
  `fixtures/tests/native-state.spec.ts`.
- **2026-06-04, Experiment 6:** Simple disclosure can use native
  `<details>/<summary>` in Remix 3 when live styling is driven by
  `details[open]` and server-rendered `data-state` is treated as initial state
  only. Applies to: `accordion` and future `collapsible` evaluation. Evidence:
  [Experiment 6](06-stage-2-accordion-disclosure-primitive.md),
  `packages/radcn/src/components/accordion.tsx`,
  `fixtures/tests/accordion.spec.ts`.
- **2026-06-04, Experiment 6:** Native single accordion exclusivity requires a
  shared `<details name>` on the actual item elements; the server-rendered
  `Accordion` root cannot propagate that attribute to arbitrary child items
  without a client/context strategy. Applies to: `accordion`, `collapsible`,
  and future client-state decisions. Evidence:
  [Experiment 6](06-stage-2-accordion-disclosure-primitive.md),
  `fixtures/candidate-remix/app/fixtures/accordion.tsx`,
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 6:** `<details>` has no native disabled attribute.
  Disabled accordion items should render non-interactive wrapper markup with
  `data-disabled` instead of a focusable `<details>/<summary>` pair. Applies to:
  `accordion` and future native disclosure decisions. Evidence:
  [Experiment 6](06-stage-2-accordion-disclosure-primitive.md),
  `packages/radcn/src/styles/tokens.css`,
  `fixtures/tests/accordion.spec.ts`.
- **2026-06-04, Experiment 7:** Single-panel collapsible can map root `open`
  directly to the native `<details open>` attribute, avoiding accordion's
  root-to-item state propagation limitation. Applies to: `collapsible` and
  future single-root disclosure primitives. Evidence:
  [Experiment 7](07-stage-2-collapsible-disclosure-primitive.md),
  `packages/radcn/src/components/collapsible.tsx`,
  `fixtures/tests/collapsible.spec.ts`.
- **2026-06-04, Experiment 7:** Server-rendered compound components cannot
  assume root disabled state rewrites arbitrary child trigger/content markup.
  Collapsible disabled behavior is explicit at each layer: disabled root,
  disabled trigger, and disabled content. Applies to: `collapsible`, `tabs`,
  and future compound state components. Evidence:
  [Experiment 7](07-stage-2-collapsible-disclosure-primitive.md),
  `docs/radcn-source.md`,
  `fixtures/tests/collapsible.spec.ts`.
- **2026-06-04, Experiment 7:** Simple disclosure is covered by native details
  after accordion and collapsible, but tabs still need a separate strategy for
  tablist semantics, roving focus, selected state, and panel relationships.
  Applies to: `tabs` and future client-state planning. Evidence:
  [Experiment 7](07-stage-2-collapsible-disclosure-primitive.md),
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 8:** Tabs are the first RadCN primitive that needs a
  package-exported client enhancement: server markup provides stable hooks and
  values, while `enhanceTabs()` resolves selected state, ARIA relationships,
  roving focus, disabled trigger skipping, and hidden panels in the browser.
  Applies to: `tabs`, later selected-state composites. Evidence:
  [Experiment 8](08-stage-2-tabs-state-and-keyboard-primitive.md),
  `packages/radcn/src/components/tabs.tsx`,
  `fixtures/tests/tabs.spec.ts`.
- **2026-06-04, Experiment 8:** Remix asset entries that import RadCN client
  helpers from workspace package source need the candidate asset server
  allowlist to include `../../packages/radcn/src/**`. Applies to: future RadCN
  client enhancements. Evidence:
  [Experiment 8](08-stage-2-tabs-state-and-keyboard-primitive.md),
  `fixtures/candidate-remix/app/assets.ts`,
  `fixtures/candidate-remix/app/assets/entry.ts`.
- **2026-06-04, Experiment 9:** Pressed-state controls can use a smaller client
  helper than tabs: native buttons own activation, while `enhanceToggle()` and
  `enhanceToggleGroup()` synchronize `aria-pressed`, `data-state`, group
  values, roving focus, and disabled skipping. Applies to: `toggle`,
  `toggle-group`, later button-like composites. Evidence:
  [Experiment 9](09-stage-2-toggle-and-toggle-group-primitives.md),
  `packages/radcn/src/components/toggle.tsx`,
  `packages/radcn/src/components/toggle-group.tsx`,
  `fixtures/tests/toggle.spec.ts`.
- **2026-06-04, Experiment 9:** Toggle buttons are action buttons, not native
  form controls; button pressed state does not submit without a future
  hidden-input adapter. Applies to: `toggle`, `toggle-group`, future form
  integration decisions. Evidence:
  [Experiment 9](09-stage-2-toggle-and-toggle-group-primitives.md),
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 10:** Single-thumb slider should use native
  `<input type="range">` for accessibility, keyboard, pointer, submit, and
  reset behavior; a small `enhanceSlider()` helper only reflects live value
  metadata and CSS fill. Applies to: `slider`, future range controls. Evidence:
  [Experiment 10](10-stage-2-slider-form-control-primitive.md),
  `packages/radcn/src/components/slider.tsx`,
  `fixtures/tests/slider.spec.ts`.
- **2026-06-04, Experiment 10:** Multi-thumb and vertical slider behavior are
  deferred: native range has one value, and portable vertical rendering is not
  stable enough for Stage 2 visual parity. Applies to: `slider`, future custom
  range primitives. Evidence:
  [Experiment 10](10-stage-2-slider-form-control-primitive.md),
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 11:** Avatar fallback should stay meaningful in
  server markup; RadCN does not need a client image loading state machine for
  the Stage 2 avatar surface. Applies to: `avatar`, future feedback components.
  Evidence:
  [Experiment 11](11-stage-2-avatar-scroll-area-and-hover-card-disposition.md),
  `packages/radcn/src/components/avatar.tsx`,
  `fixtures/tests/avatar-scroll-area.spec.ts`.
- **2026-06-04, Experiment 11:** Scroll area should prefer native `overflow:
  auto` for real scrolling, with decorative scrollbar/thumb hooks for styling;
  draggable custom thumb measurement is deferred. Applies to: `scroll-area`,
  future custom-scrollbar components. Evidence:
  [Experiment 11](11-stage-2-avatar-scroll-area-and-hover-card-disposition.md),
  `packages/radcn/src/components/scroll-area.tsx`,
  `fixtures/tests/avatar-scroll-area.spec.ts`.
- **2026-06-04, Experiment 11:** Hover card belongs in Stage 3 because its
  useful behavior shares overlay infrastructure: portal placement, floating
  positioning, delays, dismissal, escape handling, and animation state. Applies
  to: `hover-card`, `tooltip`, `popover`, `dropdown-menu`, `sheet`. Evidence:
  [Experiment 11](11-stage-2-avatar-scroll-area-and-hover-card-disposition.md),
  `docs/radcn-source.md`, `stage-2-audit.md`.
- **2026-06-04, Experiment 11:** Stage 2 is complete after `avatar`,
  `scroll-area`, and the reviewed `hover-card` Stage 3 disposition. Applies to:
  `Stage 2`, `Stage 3`. Evidence:
  [Stage 2 audit](stage-2-audit.md),
  [Experiment 11](11-stage-2-avatar-scroll-area-and-hover-card-disposition.md).
- **2026-06-04, Experiment 12:** Modal overlays need a package-exported client
  helper: server markup provides stable slots, while `enhanceDialog()` owns
  portal movement, open/closed state, ARIA relationships, focus trap, focus
  restoration, Escape/outside dismissal, and scroll lock. Applies to:
  `dialog`, `alert-dialog`, `sheet`, future modal overlays. Evidence:
  [Experiment 12](12-stage-3-dialog-overlay-foundation.md),
  `packages/radcn/src/components/dialog.tsx`,
  `fixtures/tests/dialog.spec.ts`.
- **2026-06-04, Experiment 12:** Fixture screenshots need portal content inside
  `data-fixture-stage`, while normal apps can use a body-level portal root.
  Applies to: `dialog`, future overlay artifact coverage. Evidence:
  [Experiment 12](12-stage-3-dialog-overlay-foundation.md),
  `packages/radcn/src/components/dialog.tsx`,
  `fixtures/tests/fixture-artifacts.spec.ts`.
- **2026-06-04, Experiment 12:** Dialog establishes modal overlay behavior but
  does not solve positioned or gesture overlays; `popover`, `tooltip`,
  `hover-card`, menus, and `drawer` still need later positioning or gesture
  experiments. Applies to: `Stage 3`. Evidence:
  [Experiment 12](12-stage-3-dialog-overlay-foundation.md),
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 13:** Modal variants should delegate to the shared
  `setupModal()` behavior instead of copying focus trap, portal, dismissal, and
  scroll-lock code. Applies to: `dialog`, `alert-dialog`, `sheet`, future modal
  overlays. Evidence:
  [Experiment 13](13-stage-3-modal-variants-alert-dialog-and-sheet.md),
  `packages/radcn/src/components/dialog.tsx`,
  `packages/radcn/src/components/alert-dialog.tsx`,
  `packages/radcn/src/components/sheet.tsx`.
- **2026-06-04, Experiment 13:** Alert dialog should default to
  non-dismissible Escape/outside behavior and close through explicit action or
  cancel controls. Applies to: `alert-dialog`, destructive confirmation flows.
  Evidence:
  [Experiment 13](13-stage-3-modal-variants-alert-dialog-and-sheet.md),
  `fixtures/tests/modal-variants.spec.ts`.
- **2026-06-04, Experiment 13:** Sheet is a modal dialog variant with
  side-specific `data-side` hooks; it reuses dialog focus, dismissal,
  restoration, and scroll-lock behavior while styling panel placement by side.
  Applies to: `sheet`, future side-panel overlays. Evidence:
  [Experiment 13](13-stage-3-modal-variants-alert-dialog-and-sheet.md),
  `packages/radcn/src/components/sheet.tsx`,
  `fixtures/tests/modal-variants.spec.ts`.
- **2026-06-04, Experiment 14:** Non-modal positioned overlays use a separate
  `setupPositionedOverlay()` helper rather than reusing modal focus-trap or
  scroll-lock behavior. Applies to: `popover`, `tooltip`, `hover-card`, later
  positioned overlays. Evidence:
  [Experiment 14](14-stage-3-positioned-overlay-foundation.md),
  `packages/radcn/src/utils/positioned-overlay.ts`,
  `fixtures/tests/positioned-overlays.spec.ts`.
- **2026-06-04, Experiment 14:** Fixture-stage portal capture applies to
  positioned overlays too; portal content moves into the nearest
  `data-radcn-portal-root` inside `[data-fixture-stage]` so screenshot artifacts
  include open floating content. Applies to: all future portal overlays.
  Evidence: [Experiment 14](14-stage-3-positioned-overlay-foundation.md),
  `packages/radcn/src/utils/positioned-overlay.ts`,
  `fixtures/artifacts/manifest.json`.
- **2026-06-04, Experiment 14:** Hover-triggered overlays need timer
  cancellation and trigger/content hover-region tracking. Hover-card remains
  open when moving from trigger to content and closes only after leaving both
  regions; tooltip preserves content-hover behavior in this implementation.
  Applies to: `hover-card`, `tooltip`, later hoverable overlays. Evidence:
  [Experiment 14](14-stage-3-positioned-overlay-foundation.md),
  `fixtures/tests/positioned-overlays.spec.ts`.
- **2026-06-04, Experiment 14:** The first collision policy is stage-or-viewport
  clamping with side/align/offset metadata and transform-origin CSS variables,
  not a full floating-ui replacement. Applies to: `popover`, `tooltip`,
  `hover-card`, and later overlay planning. Evidence:
  [Experiment 14](14-stage-3-positioned-overlay-foundation.md),
  `packages/radcn/src/utils/positioned-overlay.ts`.
- **2026-06-04, Experiment 15:** Menus need a dedicated helper boundary rather
  than plain positioned overlay reuse: `setupMenuOverlay()` owns roving focus,
  typeahead, item activation, checked/radio state, disabled skipping,
  contextmenu virtual anchors, and submenu coordination while preserving the
  Stage 3 portal and clamping policy. Applies to: `dropdown-menu`,
  `context-menu`, future menu-like composites. Evidence:
  [Experiment 15](15-stage-3-menu-overlay-primitives.md),
  `packages/radcn/src/utils/menu-overlay.ts`.
- **2026-06-04, Experiment 15:** RadCN menu Tab policy is to close on Tab and
  Shift+Tab without preventing default focus movement; Escape closes and
  restores focus to the trigger. Applies to: transient non-modal menus and
  later keyboard policy reviews. Evidence:
  [Experiment 15](15-stage-3-menu-overlay-primitives.md),
  `fixtures/tests/menu-overlays.spec.ts`.
- **2026-06-04, Experiment 15:** Checkbox and radio menu items update
  `aria-checked` plus `data-state` and then close on select, preserving
  shadcn/Radix-style checked item feedback without retaining the transient
  menu. Applies to: `dropdown-menu`, `context-menu`, future checked menu
  surfaces. Evidence:
  [Experiment 15](15-stage-3-menu-overlay-primitives.md),
  `packages/radcn/src/utils/menu-overlay.ts`.
- **2026-06-04, Experiment 15:** Context menu pointer activation should use a
  virtual anchor derived from the `contextmenu` event coordinates, while
  keyboard activation should anchor to the trigger. Applies to: `context-menu`
  and future virtual-anchor overlays. Evidence:
  [Experiment 15](15-stage-3-menu-overlay-primitives.md),
  `fixtures/tests/menu-overlays.spec.ts`.
- **2026-06-04, Experiment 16:** Drawer is not just sheet with another name:
  it reuses modal behavior but owns default-bottom direction, handle rendering,
  and a deterministic 80px drag threshold. Applies to: `drawer`, future
  gesture overlays. Evidence:
  [Experiment 16](16-stage-3-drawer-and-closure-audit.md),
  `packages/radcn/src/components/drawer.tsx`.
- **2026-06-04, Experiment 16:** Vaul velocity physics, snap points, nested
  drawer scaling, and background scaling are approved Stage 3 divergences; the
  RadCN contract is modal accessibility, direction hooks, customization hooks,
  internal content scrolling, and deterministic drag dismissal. Applies to:
  `drawer`, future dependency replacement decisions. Evidence:
  [Experiment 16](16-stage-3-drawer-and-closure-audit.md),
  `docs/radcn-source.md`.
- **2026-06-04, Experiment 16:** Stage 3 is complete after drawer. Later
  overlay work should be hardening, not prerequisite scope for Stage 4. Applies
  to: `Stage 3`, `Stage 4`. Evidence: [Stage 3 audit](stage-3-audit.md).

## Five Porting Stages

### Stage 1: Native Form and Static Foundations

Complete the lowest-risk components that establish source layout, styling,
tokens, variants, forms, and copy-own-customize behavior.

Primary components:

- `button`
- `input`
- `field`
- `label`
- `textarea`
- `native-select`
- `separator`
- `badge`
- `alert`
- `card`
- `skeleton`
- `spinner`
- `kbd`
- `table`
- `pagination`
- `breadcrumb`
- `aspect-ratio`
- `empty`
- `item`
- `button-group`
- `typography`

Stage 1 must answer:

- Where RadCN component source lives.
- How components are installed or copied into apps.
- How Tailwind, CSS variables, theme tokens, variants, and class hooks work.
- How native form controls submit, reset, validate, disable, and progressively
  enhance in Remix 3.
- How customization probes are represented in fixtures.

Stage 1 is complete only when all included components have reference fixtures,
candidate RadCN implementations, artifact coverage, component-specific parity
checks, documentation, and review.

Stage 1 status: complete as of Experiment 4. See
[the Stage 1 audit](stage-1-audit.md).

### Stage 2: Bounded Disclosure and Feedback Primitives

Complete components with bounded local state or simple progressive enhancement.

Primary components:

- `accordion`
- `collapsible`
- `tabs`
- `toggle`
- `toggle-group`
- `checkbox`
- `radio-group`
- `switch`
- `slider`
- `progress`
- `avatar`
- `scroll-area`
- `hover-card` if its positioning and delay behavior stay bounded enough for
  this stage; otherwise move it to Stage 3 with an explicit note.

Stage 2 must answer:

- How Remix UI client entries or small client scripts manage local state.
- How state attributes are exposed for styling and customization.
- How keyboard and pointer interaction tests are structured.
- How native controls are preferred when they preserve or improve behavior.

Stage 2 is complete only when these primitives have visual, accessibility,
interaction, customization, and form checks where applicable.

Stage 2 status: complete as of Experiment 11. See
[the Stage 2 audit](stage-2-audit.md).

### Stage 3: Overlay, Portal, and Positioning Primitives

Complete layered UI that requires focus management, portal strategy, scroll
lock, collision handling, dismissal behavior, and animation states.

Primary components:

- `dialog`
- `alert-dialog`
- `popover`
- `tooltip`
- `sheet`
- `dropdown-menu`
- `context-menu`
- `drawer`
- `hover-card` if not completed in Stage 2

Stage 3 must answer:

- How RadCN handles portals in Remix 3.
- How focus trap, focus restoration, escape key, outside click, modal state, and
  scroll lock work.
- How collision and positioning are implemented or delegated.
- How overlay animations expose stable state hooks.

Stage 3 is complete only when overlay behavior is verified through keyboard,
pointer, accessibility, visual, and divergence checks.

Stage 3 status: complete as of Experiment 16. See
[the Stage 3 audit](stage-3-audit.md).

### Stage 4: Composite Keyboard Widgets

Complete complex ARIA widgets and components with roving focus, typeahead,
selection models, and multi-part keyboard behavior.

Primary components:

- `select`
- `combobox`
- `command`
- `menubar`
- `navigation-menu`
- `calendar`
- `date-picker`
- `carousel`

Stage 4 must answer:

- Which React-specific upstream dependencies should be replaced.
- How listbox, menu, combobox, calendar, and navigation behavior map to Remix 3.
- How keyboard matrices are specified and tested.
- How mobile/responsive variants interact with overlays from Stage 3.

Stage 4 is complete only when each widget has scenario coverage for keyboard,
pointer, accessibility, visual output, customization, and documented divergences.

### Stage 5: React-Heavy Systems, Blocks, and Deferred Components

Complete or explicitly replace the high-risk components and system-level pieces
that depend on React-heavy libraries or application-level state.

Primary components:

- `chart`
- `data-table`
- `sonner`
- `toast`
- `resizable`
- `sidebar`
- `form`
- `input-group`
- `input-otp`
- any component deferred from earlier stages

Stage 5 must answer:

- Which upstream examples are true RadCN components versus recipes or blocks.
- How RadCN handles charting, data tables, notifications, sidebars, resizable
  panels, and form orchestration in a Remix 3-first way.
- Which components are included in the core library, which become recipes or
  blocks, and which are intentionally not ported.
- How install/source parity works for large composed systems.

Stage 5 is complete only when each high-risk component has a documented outcome:
ported, replaced with a Remix 3-native design, moved to recipes/blocks, or
explicitly excluded with a reviewed rationale.

## Analysis

The full port should not be approached alphabetically. Similar components should
be solved together because each cluster shares architecture:

- Stage 1 establishes the static, form, styling, source, and customization
  foundation.
- Stage 2 establishes bounded state and progressive enhancement.
- Stage 3 establishes overlays, portals, focus management, and positioning.
- Stage 4 establishes composite keyboard behavior.
- Stage 5 establishes policy for large React-heavy systems and application
  blocks.

Every stage should improve the shared fixtures and harness rather than creating
one-off tests. If a component exposes a new behavior class, add reusable fixture
helpers or verification helpers before porting many components in that class.

The component inventory is the current source of truth for coverage. If upstream
shadcn/ui changes during the port, open an experiment to update the inventory
before continuing.

## Completion Criteria

This issue is complete when:

1. Every component in
   [the inventory](../0001-shadcn-port-scope/component-inventory.md#component-inventory)
   has a final disposition: ported, replaced with a Remix 3-native design,
   moved to recipes/blocks, deferred with explicit rationale, or excluded with
   explicit rationale.
2. Every ported component has candidate RadCN source, reference fixtures,
   candidate fixtures, artifact coverage, and parity verification according to
   [the parity model](../0001-shadcn-port-scope/parity-model.md).
3. Every intentional divergence has a recorded rationale and review.
4. The documentation site can demonstrate every supported component or
   recipe/block outcome.
5. Install/source workflow is documented and works for supported components.
6. `pnpm fixtures:artifacts` and any component-specific checks pass.
7. Independent completion review approves the full port outcome.

## Constraints

- Do not modify files under `vendor/`.
- Do not design the full experiment list upfront.
- Do not start Stage 2 until Stage 1 is complete, and so on.
- Do not count placeholder fixture components as completed RadCN ports.
- Do not use exact DOM-tree equality as the default success condition.
- Do not silently skip high-risk components; record a disposition for each one.

## Experiments

- [Experiment 1: Stage 1 source and native control foundation](01-stage-1-source-and-native-control-foundation.md)
  — **Pass**
- [Experiment 2: Stage 1 static display primitives](02-stage-1-static-display-primitives.md)
  — **Pass**
- [Experiment 3: Stage 1 navigation collection and typography primitives](03-stage-1-navigation-collection-and-typography-primitives.md)
  — **Pass**
- [Experiment 4: Stage 1 native select and closure audit](04-stage-1-native-select-and-closure-audit.md)
  — **Pass**
- [Experiment 5: Stage 2 native state and progress primitives](05-stage-2-native-state-and-progress-primitives.md)
  — **Pass**
- [Experiment 6: Stage 2 accordion disclosure primitive](06-stage-2-accordion-disclosure-primitive.md)
  — **Pass**
- [Experiment 7: Stage 2 collapsible disclosure primitive](07-stage-2-collapsible-disclosure-primitive.md)
  — **Pass**
- [Experiment 8: Stage 2 tabs state and keyboard primitive](08-stage-2-tabs-state-and-keyboard-primitive.md)
  — **Pass**
- [Experiment 9: Stage 2 toggle and toggle group primitives](09-stage-2-toggle-and-toggle-group-primitives.md)
  — **Pass**
- [Experiment 10: Stage 2 slider form control primitive](10-stage-2-slider-form-control-primitive.md)
  — **Pass**
- [Experiment 11: Stage 2 avatar, scroll area, and hover card disposition](11-stage-2-avatar-scroll-area-and-hover-card-disposition.md)
  — **Pass**
- [Experiment 12: Stage 3 dialog overlay foundation](12-stage-3-dialog-overlay-foundation.md)
  — **Pass**
- [Experiment 13: Stage 3 modal variants, alert dialog and sheet](13-stage-3-modal-variants-alert-dialog-and-sheet.md)
  — **Pass**
- [Experiment 14: Stage 3 positioned overlay foundation](14-stage-3-positioned-overlay-foundation.md)
  — **Pass**
- [Experiment 15: Stage 3 menu overlay primitives](15-stage-3-menu-overlay-primitives.md)
  — **Pass**
- [Experiment 16: Stage 3 drawer and closure audit](16-stage-3-drawer-and-closure-audit.md)
  — **Pass**
- [Experiment 17: Stage 4 select listbox foundation](17-stage-4-select-listbox-foundation.md)
  — **Designed**
