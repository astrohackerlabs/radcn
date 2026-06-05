+++
status = "open"
opened = "2026-06-04"
+++

# Issue 3: Build the RadCN Documentation Site

## Goal

Build a polished Remix 3 documentation website for RadCN that shows every
component, recipe, and important architectural divergence from shadcn/ui.

The site should feel like a serious component-library reference: visually
strong, fast to navigate, component-forward, and built from the RadCN package
itself rather than fixture-local placeholders.

## Background

Issue 2 completed the initial RadCN port of the shadcn/ui inventory. The repo
now has:

- `radcn/packages/radcn` as the component source package;
- paired reference/candidate fixture apps under `radcn/fixtures/`;
- shared scenario metadata in `radcn/fixtures/scenarios`;
- Playwright artifact coverage for the full component surface;
- final port documentation in `docs/radcn-source.md`;
- issue evidence and divergence records in
  `issues/0002-implement-entire-shadcn-port/`.

The next step is a real public-facing website, similar in purpose to
`ui.shadcn.com`, but designed for RadCN and Remix 3's web-first model. The site
should not be a marketing shell around static screenshots. It should render
real RadCN examples, explain how to install/copy/use them, and make the Remix 3
architecture legible.

## Architecture

Create a Remix 3 docs app under the nested JavaScript workspace at
`radcn/apps/docs/`.

The docs app should consume `radcn/packages/radcn` the way a user application
would.
Examples should import real RadCN components and styles. Avoid duplicating
component implementations inside the docs app.

The initial site architecture should include:

- a persistent documentation shell with component navigation;
- a component registry that records slug, title, category, status, imports,
  examples, and recipe/block disposition;
- one route per component or recipe;
- preview/code presentation for examples;
- install/import guidance;
- accessibility notes;
- customization/token notes;
- Remix 3 divergence notes where RadCN intentionally differs from shadcn/ui;
- a homepage that immediately shows real component previews rather than a
  marketing-only hero.

The site should cover both core source components and recipe/block outcomes:

- core components exported by `radcn/packages/radcn`;
- helper/event surfaces such as `toast`;
- recipes and blocks such as `form`, `date-picker`, and `data-table`;
- documented divergences such as native `dir` behavior for `direction`.

## Design Direction

The site should be polished but utilitarian. It should inherit the taste level
of shadcn/ui without copying its exact visual design.

Preferred direction:

- dense, readable documentation layout;
- left navigation for component categories;
- top-level search/action area if practical;
- right-side table of contents for long pages;
- component examples in preview/code tabs;
- restrained color, strong typography, clean spacing;
- RadCN components used throughout the interface;
- a first viewport that shows the product through real rendered components.

Avoid:

- a landing page that hides the actual docs experience;
- a giant marketing-only hero;
- fixture-only shortcuts that bypass the RadCN package;
- static screenshots where live examples are feasible.

## Content Model

The site should treat documentation as structured product data, not a pile of
unconnected pages.

The component registry should be able to drive:

- navigation;
- route metadata;
- import snippets;
- example lists;
- category grouping;
- status labels;
- recipe/block notes;
- future search;
- future install/copy metadata.

Existing fixture scenarios can inform the first example set, but the docs site
should have its own user-facing example layer when fixture scenarios are too
test-oriented.

## Open Questions

Experiments should answer these before broad implementation:

- What is the smallest Remix 3 app shell that can host the docs site cleanly?
- How much of `radcn/fixtures/scenarios` should be reused directly versus
  translated into docs-specific examples?
- What registry shape best supports pages, navigation, examples, and future
  install metadata?
- How should code snippets be generated or stored so they stay in sync with
  live examples?
- Which first component pages best prove the site patterns across static,
  native form, overlay, composite, application-shell, helper, and recipe/block
  categories?
- What visual system should the docs site use so it looks polished while still
  showcasing RadCN rather than custom one-off docs UI?

## Completion Criteria

This issue is complete when the repo contains a Remix 3 RadCN documentation
site that:

- runs locally as a docs app;
- renders real RadCN components;
- has a polished navigable shell;
- includes a homepage and component documentation routes;
- covers every core component, helper, recipe, and block disposition from
  Issue 2;
- documents installation/import usage;
- documents customization and tokens;
- documents accessibility and Remix 3 divergences;
- includes verification for build/typecheck and representative rendered pages;
- is reviewed through the issue/experiment workflow.

## Experiments

- [Experiment 1: Import Remix docs site skills](01-import-remix-docs-site-skills.md)
  — **Pass**
- [Experiment 2: Create nested RadCN workspace and docs app](02-scaffold-docs-app-with-remix-cli.md)
  — **Pass**
- [Experiment 3: Create docs shell and first component page](03-docs-shell-and-first-component-page.md)
  — **Designed**

## Learnings

- RadCN's pnpm workspace now lives under `radcn/`. Run pnpm commands from that
  directory. The repository root remains the process, issue, skill, and vendor
  reference root.
- `vendor/` must stay outside every pnpm workspace include. Published package
  dependencies, not vendored workspace links, should satisfy Remix dependencies
  for RadCN code.
- The Remix CLI scaffold command `pnpm dlx remix@next new apps/docs`, run from
  `radcn/`, created `radcn/apps/docs` with Remix `v3.0.0-beta.3`.
- The Remix CLI scaffold includes app-local `.agents/skills/remix` guidance.
  RadCN keeps root project skills in `skills/`, but app-local scaffold guidance
  can remain inside `radcn/apps/docs`.
- The generated docs app runs scripts with cwd `radcn/apps/docs`, while pnpm's
  real virtual store is under `radcn/node_modules/.pnpm`. The docs asset server
  needs an explicit allow rule for that workspace virtual-store path so hydrated
  scaffold assets can import published `remix/ui`.
- `pnpm fixtures:reference:typecheck` still passes after the move and still
  emits the known React Router `module.register()` deprecation warning.
