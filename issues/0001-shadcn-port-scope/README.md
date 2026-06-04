+++
status = "open"
opened = "2026-06-04"
+++

# Issue 1: Scope the shadcn/ui Port to Remix 3

## Goal

Figure out how RadCN should map shadcn/ui components into Remix 3, including the
component architecture, styling strategy, interaction model, and parity testing
needed to prove the port matches shadcn/ui.

## Background

RadCN is intended to bring the practical value of shadcn/ui to Remix 3. The
source library is React-based and assumes React component state, hooks, refs,
composition patterns, and package conventions. Remix 3 changes the target model:
the port should follow Remix 3's web-first architecture rather than recreate
React in another shape.

The vendor checkouts provide the two source references:

- `vendor/shadcn-ui/` — upstream shadcn/ui source and examples.
- `vendor/remix/` — upstream Remix source and Remix 3 direction.

The first task is not to port every component. It is to define a repeatable
mapping and verification strategy that can be applied component by component.
Without that, the project risks producing components that look similar in simple
screenshots but drift in accessibility, keyboard behavior, form behavior,
responsive behavior, animation timing, or theme integration.

## Scope

This issue should answer:

- What is the canonical shadcn/ui component inventory RadCN will target?
- Which shadcn/ui component patterns map directly to Remix 3 primitives?
- Which React-only patterns need a different Remix 3 design?
- How should RadCN organize component source, examples, tests, and generated
  installable artifacts?
- How should RadCN handle Tailwind, CSS variables, themes, variants, slots,
  compound components, accessibility attributes, and progressive enhancement?
- What parity bar is required before a component is considered ported?
- What test harness should compare shadcn/ui against RadCN?

## Analysis

The likely workflow is to build a parity harness before doing broad component
ports. The harness should render an upstream shadcn/ui reference and the RadCN
candidate for the same scenarios, then compare them through automated checks.

Playwright is the likely browser automation layer because it can drive real
browser interactions, capture screenshots, validate keyboard and pointer flows,
inspect accessibility state, and run across multiple viewport sizes. Screenshot
comparison should be part of the system, but not the whole system: many
component requirements are behavioral or semantic rather than visual.

The harness should probably support at least these checks:

- visual screenshots for default, variant, state, density, theme, and viewport
  scenarios;
- accessibility-tree or DOM assertions for roles, names, attributes, focus
  management, and disabled/invalid state;
- keyboard interaction flows for menus, dialogs, popovers, tabs, selects,
  comboboxes, accordions, and forms;
- pointer interaction flows for hover, press, drag, open/close, and outside
  click behavior;
- form submission and progressive-enhancement checks where components
  participate in native forms;
- deterministic fixtures so comparisons are repeatable in CI.

The comparison model needs investigation. Options include:

- a dual-app harness, with one app rendering upstream shadcn/ui in React and
  another rendering RadCN in Remix 3;
- a single Playwright test suite that visits paired routes and compares named
  scenarios;
- generated fixture pages for every component state;
- screenshot baselines checked into RadCN after review;
- an accessibility/behavior assertion layer that does not rely on screenshots.

The issue should also decide how much exactness is required. Pixel-perfect
matching is desirable for static visual output, but interaction semantics and
native web behavior may require intentional differences from React shadcn/ui.
Those differences must be explicit and documented, not accidental.

## Constraints

- Vendor source checkouts are reference inputs only and must not be committed as
  RadCN source.
- The port should not blindly preserve React APIs if Remix 3 has a more native
  web model.
- Component parity must include behavior and accessibility, not just visual
  similarity.
- The test harness should be usable for every future component port.
- Experiments should proceed one at a time. Do not list the full component port
  sequence upfront.

## Experiments

- [Experiment 1: Inventory and classify components](01-inventory-and-classify-components.md)
  — **Pass**
- [Experiment 2: Build paired fixture apps](02-build-paired-fixture-apps.md) —
  **Designed**
