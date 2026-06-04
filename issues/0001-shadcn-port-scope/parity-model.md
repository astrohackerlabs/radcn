# RadCN Component Parity Model

## Purpose

RadCN ports the practical value of shadcn/ui to Remix 3. A component is a valid
RadCN port when users experience the same component behavior and authors can
customize it with equivalent control, even if Remix 3 uses different internal
markup, event wiring, or runtime boundaries than React shadcn/ui.

This model is the default acceptance contract for future component-port issues.
Each component issue may add component-specific criteria, but it should not
weaken these requirements without documenting an intentional Remix 3 divergence.

## Parity Surfaces

### Visual Parity

RadCN should match shadcn/ui's visible output for the same scenario:

- default state;
- variants and sizes;
- disabled, invalid, selected, open, checked, focused, hover, active, and loading
  states where applicable;
- light and dark theme when both are supported;
- relevant viewport widths and density/spacing cases;
- animation end states and reduced-motion behavior.

Visual review starts from `pnpm fixtures:artifacts`, which captures paired
`[data-fixture-stage]` screenshots for every shared scenario. These screenshots
are review artifacts first. Pixel diffs are allowed in later issues, but Issue 1
does not require automated pixel pass/fail because the candidate fixtures are
still placeholders.

### Customization Parity

RadCN must preserve shadcn/ui's copy-own-customize value. Authors should be able
to make equivalent modifications through RadCN's Remix 3 surface:

- class names or equivalent class hooks on public component parts;
- CSS variables and theme tokens;
- variant and size choices;
- composition slots or documented replacement hooks;
- data attributes for styling meaningful states;
- source files that can be copied into an application and changed directly.

Customization parity does not require the same React prop names if the React API
does not fit Remix 3. It does require a documented author path for the same
practical modification.

### Accessibility Parity

Accessibility parity is outcome-based. RadCN does not need identical DOM, but it
must expose equivalent semantics:

- role and accessible name;
- label, description, and error relationships;
- disabled, invalid, checked, selected, expanded, pressed, current, modal, and
  live-region state where applicable;
- focus order and focus restoration;
- keyboard affordances expected for the widget pattern;
- screen-reader relevant announcements and relationships.

DOM assertions should target these semantics. Exact child order, wrapper count,
or React/Radix-specific data attributes are not default pass criteria.

### Interaction Parity

Interactive components must reach the same observable states through the same
user actions:

- keyboard navigation and activation;
- pointer hover, press, click, drag, resize, and outside click;
- open, close, dismiss, select, toggle, expand, collapse, and typeahead flows;
- focus trap, scroll lock, portal, collision, and escape behavior for overlays;
- transition timing and animation state where the animation affects usability.

Interaction tests should assert outcomes, not implementation details. For
example, an accordion test should prove the panel opens, closes, exposes
expanded state, and follows keyboard rules; it should not require Radix's exact
element tree.

### Form and Native-Web Parity

Components that participate in forms should prefer native web behavior whenever
that gives the same or better outcome than the React implementation:

- correct `name` and submitted value;
- reset behavior;
- required and constraint validation;
- disabled and read-only behavior;
- label and help/error text linkage;
- progressive enhancement when JavaScript is absent or delayed;
- server-submission compatibility in Remix 3.

React-only form abstractions such as React Hook Form are not parity requirements.
RadCN should document the Remix-native replacement contract instead.

### Install and Source Parity

RadCN should preserve the shadcn/ui ownership workflow:

- generated or copied source should live in the application, not behind an opaque
  runtime package only;
- dependencies should be explicit;
- component files should be small enough to inspect and modify;
- examples should show the canonical Remix 3 usage;
- component source should use Remix 3 primitives and web APIs directly where
  appropriate.

The exact package/source layout can be refined in a later implementation issue.
This issue establishes the principle: RadCN should feel inspectable and
modifiable in the same spirit as shadcn/ui.

## Non-Goals

RadCN does not aim to:

- clone React internals, hooks, context structure, or component composition when
  Remix 3 has a clearer web-native model;
- require exact DOM-tree equality as a default pass criterion;
- require Radix's internal data attributes unless they are part of the public
  customization contract;
- use screenshots as the only parity signal;
- port high-risk React-specific systems before their primitives have a dedicated
  Remix 3 design;
- treat placeholder fixture output as final component parity.

## Acceptable Divergence

A divergence from shadcn/ui is acceptable only when it is documented and
reviewed. The divergence note should record:

- the component and scenario;
- the shadcn/ui behavior or API;
- the RadCN behavior or API;
- why Remix 3 should differ;
- which parity surfaces are affected;
- how users and authors still get equivalent or better outcomes;
- the reviewer who approved the divergence.

Common acceptable divergences:

- fewer wrapper elements when semantics and styling hooks remain sufficient;
- native form controls instead of custom ARIA widgets;
- Remix-native form submission instead of React Hook Form integration;
- different event wiring through Remix UI client entries or small client scripts;
- different source organization that better supports copy-own-customize in
  Remix 3.

Common unacceptable divergences:

- visual drift with no documented reason;
- missing keyboard affordances for a known widget pattern;
- missing labels, roles, or state attributes;
- customization hooks that cannot reproduce common shadcn/ui modifications;
- form controls that look correct but submit, reset, or validate incorrectly.

## Customization Contract

Every ported component must define its public customization surface. At minimum,
the component issue should state:

- public parts authors may style;
- supported class hooks or class forwarding behavior;
- supported CSS variables and theme tokens;
- variant and size API;
- state attributes authors may target;
- composition or replacement points;
- source files expected to be copied or generated into the app;
- unsupported shadcn/ui customization patterns and the RadCN replacement.

Customization probes should be added to fixtures when the surface is important
to component identity. A probe is a scenario that applies an author-style
modification and verifies it works, for example:

- adding a custom class to a button;
- overriding a field error color through a CSS variable;
- styling an accordion trigger through an open-state attribute;
- replacing an icon or link-like child through a documented slot.

## Scenario Requirements

Each component port must add reference and candidate scenarios for the surfaces
that matter to that component.

Baseline scenario groups:

- default rendering;
- variants and sizes;
- disabled, invalid, selected, checked, open, focused, hover, active, and loading
  states as applicable;
- customization probes;
- responsive or density cases when layout changes;
- dark theme when the component has theme-sensitive styling;
- interaction flows for interactive components;
- form submission/reset/validation scenarios for form controls;
- documented divergence scenarios when RadCN intentionally differs.

Scenarios live in the shared fixture registry so the reference and candidate app
route lists stay aligned.

## Verification Layers

Future component issues should use these layers in order.

1. **Fixture contract:** `pnpm fixtures:artifacts` must visit every shared
   scenario in both apps, assert `data-fixture-app`, `data-component`,
   `data-scenario`, and `[data-fixture-stage]`, then capture paired artifacts.
2. **Visual review:** compare paired screenshots for the relevant scenarios.
   Pixel diffs may be added later, but human review plus recorded divergence is
   acceptable until baselines are stable.
3. **Accessibility assertions:** assert roles, names, relationships, state, focus
   behavior, and keyboard affordances that define the component.
4. **Interaction assertions:** drive keyboard and pointer flows, then assert the
   resulting state and screenshots where useful.
5. **Customization probes:** apply documented author modifications and assert the
   visible or computed outcome.
6. **Form/native-web assertions:** for form controls, submit, reset, validate,
   disable, and progressively enhance through Remix-native flows.
7. **Independent review:** another AI agent reviews the component result,
   including screenshots, test scope, divergences, and remaining risk.

DOM checks belong inside the accessibility, interaction, customization, and form
layers as targeted assertions. A raw DOM diff is diagnostic only.

## Component Done Checklist

Copy this checklist into future component-port issues.

- [ ] Component exists in `component-inventory.md` and its risk/category are
      understood.
- [ ] Reference fixture scenarios exist for the required states, variants,
      interactions, forms, themes, and customization probes.
- [ ] Candidate RadCN fixture scenarios exist for the same registry entries.
- [ ] `pnpm fixtures:artifacts` captures paired screenshots and a manifest for
      all scenarios.
- [ ] Visual review is complete, or each visual difference has an approved
      divergence note.
- [ ] Accessibility assertions cover component-critical roles, names,
      relationships, state, and focus behavior.
- [ ] Keyboard and pointer interaction tests exist where the component owns
      interaction.
- [ ] Customization probes verify the public author modification surface.
- [ ] Form/native-web tests exist where the component participates in forms.
- [ ] Remix 3 divergence notes are recorded for intentional API, DOM, behavior,
      or source-layout differences.
- [ ] Install/source behavior preserves the copy-own-customize workflow or
      documents the RadCN replacement.
- [ ] Independent AI completion review approves the component result.

## Proof-Set Planning

### Button

Required scenario groups:

- default;
- variants;
- sizes;
- disabled and `aria-disabled`;
- link-like/composed usage;
- focus, hover, active;
- form submit/reset behavior;
- customization class and CSS variable probes.

Verification layers:

- fixture contract;
- visual review for variants, state, and focus ring;
- accessibility assertions for role/name/disabled state;
- keyboard and pointer activation checks;
- form submission and reset checks;
- customization probes for class forwarding, variant styling, and token
  overrides.

Likely acceptable divergences:

- RadCN may replace React `asChild` with a Remix/web-native composition rule if
  authors can still style links or alternate elements as buttons.

### Field and Input

Required scenario groups:

- input default;
- invalid with error message;
- disabled;
- required;
- described-by/help text;
- value submission;
- reset behavior;
- custom spacing, border, and error-token probes.

Verification layers:

- fixture contract;
- visual review for layout, label, help, error, and disabled state;
- accessibility assertions for label, description, error, invalid, required, and
  disabled relationships;
- keyboard focus and text entry checks;
- form submission/reset/validation checks;
- customization probes for CSS variables and part classes.

Likely acceptable divergences:

- RadCN should favor native labels, inputs, constraint validation, and
  Remix-native form submission over React Hook Form context. The user-facing
  field relationship must remain equivalent or better.

### Accordion

Required scenario groups:

- single item;
- multiple items;
- collapsed default;
- disabled item;
- keyboard navigation;
- open/closed animation state;
- custom trigger/content styling probes.

Verification layers:

- fixture contract;
- visual review for trigger, content, disabled, open/closed, and animation end
  states;
- accessibility assertions for button names, `aria-expanded`, disabled state,
  and panel relationship;
- keyboard checks for tab, enter, space, arrow navigation when supported, home,
  and end;
- pointer open/close checks;
- customization probes for open-state and part styling.

Likely acceptable divergences:

- RadCN may use a different internal disclosure primitive than Radix Accordion
  if the visible state, keyboard behavior, ARIA relationships, and styling hooks
  remain equivalent.

## Open Follow-Up Work

Follow-up issues should start with:

- first real component port, likely `button` plus `input`/`field` as the native
  form-control proof;
- Playwright visual review workflow and, later, optional pixel baseline policy;
- accessibility assertion helpers for repeated role/name/state checks;
- customization probe helpers for class, token, and state-attribute checks;
- Remix 3 source/install layout for generated RadCN component files;
- high-risk primitive design issues for overlays, composite widgets, and
  React-heavy third-party replacements.
