+++
status = "closed"
opened = "2026-06-04"
closed = "2026-06-05"
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
should not be a marketing shell around static screenshots. It should render real
RadCN examples, explain how to install/copy/use them, and make the Remix 3
architecture legible.

## Architecture

Create a Remix 3 docs app under the nested JavaScript workspace at
`radcn/apps/docs/`.

The docs app should consume `radcn/packages/radcn` the way a user application
would. Examples should import real RadCN components and styles. Avoid
duplicating component implementations inside the docs app.

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
- How should code snippets be generated or stored so they stay in sync with live
  examples?
- Which first component pages best prove the site patterns across static, native
  form, overlay, composite, application-shell, helper, and recipe/block
  categories?
- What visual system should the docs site use so it looks polished while still
  showcasing RadCN rather than custom one-off docs UI?

## In-Scope Completion Criteria

This issue is complete when the repo contains a Remix 3 RadCN documentation site
that:

- runs locally as a docs app;
- renders real RadCN components;
- has a polished navigable shell;
- includes a homepage and component documentation routes;
- covers every core component, helper, recipe, and block disposition from Issue
  2;
- documents installation/import usage (but do not actually publish to npm - the
  installation instructions should be the intended end-result, to be finished by
  another issue, not something that actually works now)
- documents customization and tokens;
- documents accessibility and Remix 3 divergences;
- includes verification for build/typecheck and representative rendered pages;
- is reviewed through the issue/experiment workflow.

## Out of Scope

- publishing to npm
- installation instructions that actually work

## Experiments

- [Experiment 1: Import Remix docs site skills](01-import-remix-docs-site-skills.md)
  — **Pass**
- [Experiment 2: Create nested RadCN workspace and docs app](02-scaffold-docs-app-with-remix-cli.md)
  — **Pass**
- [Experiment 3: Create docs shell and first component page](03-docs-shell-and-first-component-page.md)
  — **Pass**
- [Experiment 4: Design RadCN visual identity and docs UI system](04-design-rad-visual-system.md)
  — **Pass**
- [Experiment 5: Add representative component docs batch](05-representative-component-docs-batch.md)
  — **Pass**
- [Experiment 6: Add dark mode support](06-add-dark-mode-support.md) — **Pass**
- [Experiment 7: Promote root pnpm workspace](07-promote-root-pnpm-workspace.md)
  — **Pass**
- [Experiment 8: Process logo assets with Sharp](08-process-logo-assets-with-sharp.md)
  — **Pass**
- [Experiment 9: Add system theme mode](09-add-system-theme-mode.md) — **Pass**
- [Experiment 10: Use Lucide icons uniformly](10-use-lucide-icons-uniformly.md)
  — **Pass**
- [Experiment 11: Complete docs registry coverage](11-complete-docs-registry-coverage.md)
  — **Pass**
- [Experiment 12: Author full component docs](12-author-full-component-docs.md)
  — **Pass**

## Learnings

- Experiment 2 originally put RadCN's pnpm workspace under `radcn/`, with the
  repository root reserved for process, issue, skill, and vendor references.
  Experiment 7 superseded this: the pnpm workspace now lives at the repository
  root.
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
- The docs app must declare `radcn: "workspace:*"` when examples import package
  components. This keeps docs examples honest while still avoiding any
  dependency on `vendor/`.
- RadCN package styles are exposed as a CSS string. In Remix UI, putting that
  string directly as a `<style>` child HTML-escapes selectors such as `>`. Use a
  raw `createElement('style', { innerHTML })` pattern, matching Remix UI's own
  theme runtime, and escape only closing `</style` sequences.
- Use a plain route leaf for docs component pages that should answer both GET
  and HEAD requests. A `get('/docs/components/:slug')` leaf rendered the page
  for GET but returned 404 for `curl -I`; `'/docs/components/:slug'` reaches the
  same action for HEAD checks.
- The initial docs registry can store explicit source strings beside live Remix
  UI preview nodes. That is sufficient for the first vertical slice, but later
  experiments should decide whether source snippets need generation or stronger
  synchronization before broad component coverage.
- RadCN's docs identity should keep brand attitude at the docs-shell layer:
  robot mark, grid, hard shadow, high-energy accent, and sticker-like labels.
  Live component preview surfaces should stay neutral so users can evaluate the
  RadCN package components accurately.
- Keep docs visual decisions in `radcn/apps/docs/app/ui/brand.ts` and reusable
  UI helpers instead of scattering one-off colors and measurements through page
  components. This keeps later component pages aligned and makes future theme
  changes tractable.
- The current logo direction is a code-native SVG robot wearing sunglasses. It
  avoids external image/font dependencies and can render both as a top-bar mark
  and a larger homepage mascot.
- The docs registry now needs explicit `importExample` metadata. Deriving an
  import snippet from the component title only works for one-symbol exports and
  breaks down for grouped surfaces such as `dialog`, `tabs`, and `sonner`.
- Representative component pages can share one structured page renderer across
  display, input, overlay, composite, and feedback surfaces. Category grouping
  in the sidebar is the first navigation structure that should be preserved when
  full coverage begins.
- Overlay and composite docs previews sometimes need preview-only layout CSS to
  make server-rendered package parts inspectable before browser enhancement
  runs. Keep the source snippet as the real app usage pattern and record when a
  preview is intentionally pinned into the page.
- RadCN theme support separates preference mode from resolved theme. Docs store
  `system`, `light`, or `dark` as `data-radcn-theme-mode`; package tokens read
  the resolved `light` or `dark` value from `data-radcn-theme`.
- Docs icon usage uses `lucide-static` for plain SVG strings, but imports only
  individual icon modules from `lucide-static/dist/esm/icons/*.mjs`. The
  docs-local `icons.tsx` wrapper renders trusted Lucide strings inline so icons
  inherit `currentColor` without using sprites, icon fonts, URL assets, or React
  icon components.
- Explicit source strings remain workable for the first docs batch, but they are
  already a synchronization risk. Full coverage should either generate source
  snippets from example modules or establish a stricter review/test check for
  snippet drift.
- RadCN dark mode is activated by setting `data-radcn-theme="dark"` on an
  ancestor, usually `<html>`. Light mode remains the default `:root` token set.
- Package theme support should define shared base tokens such as background,
  foreground, card, popover, muted, accent, border, input, ring, and destructive
  values. Component-specific variables can keep falling back to those base
  tokens instead of requiring per-component dark CSS.
- The docs theme switch belongs in the normal browser entry. A separate script
  can mask broken hydration; if browser behavior does not run, check the asset
  pipeline before adding workarounds.
- In the nested pnpm workspace, Remix's asset transform may emit imports under
  `/assets/node_modules/.pnpm/...`. The docs asset server must map that URL
  prefix to `../../node_modules/.pnpm/*path`; an `allow` rule alone is not a
  file mapping.
- Keeping `radcnStyles` synchronized with `tokens.css` is now mandatory for any
  package style change. This experiment updated the string directly; future
  style-heavy work should consider a small generator to remove that manual
  synchronization step.
- RadCN's pnpm workspace now lives at the repository root. Run normal workspace
  commands from `/Users/ryan/dev/radcn`; `pnpm dev` starts the docs app through
  `radcn/apps/docs`.
- Root workspace package globs must stay explicit: `radcn/apps/*`,
  `radcn/packages/*`, and `radcn/fixtures/*`. Do not use broad globs that can
  enroll `vendor/`.
- With the root install location, the docs asset server maps
  `/assets/node_modules/.pnpm/...` to `../../../node_modules/.pnpm/*path` from
  `radcn/apps/docs`. The URL prefix is still app-local, but the real virtual
  store is now at the repository root.
- RadCN docs image assets are generated from committed PNG sources under
  `raw-icons/` with the root `pnpm icons` command. Normal generated docs images
  should be WebP files under `radcn/apps/docs/public/images/`.
- The docs favicon intentionally keeps the browser-friendly path `/favicon.ico`,
  but its file contents are a 128x128 PNG generated by Sharp. Link it with
  `type="image/png"` so the filename/content mismatch is explicit.
- The docs registry coverage source of truth is the RadCN package export map
  plus explicit non-exported Issue 3 dispositions. Exported package subpaths get
  docs routes automatically through registry metadata; `form`, `date-picker`,
  and `data-table` are documented as `not-shipped-yet` block dispositions.
- Issue 3 install snippets are aspirational. Registry entries should use
  `pnpm add radcn # intended future package` and page copy must state that RadCN
  is private and not published to npm yet.
- Exported docs pages should be treated as authored `ready` pages once they
  have a package import snippet, live RadCN preview, accessibility notes,
  customization notes, and Remix 3 divergence notes. Keep `draft` reserved for
  non-shipped dispositions such as `form`, `date-picker`, and `data-table`.
- Full-registry docs coverage now depends on the `publicPreviewHooks` map in
  `radcn/apps/docs/tests/coverage.spec.ts`. When adding a package export, add
  its docs seed, live preview, and expected public hook in the same experiment.
- Several overlay/composite examples intentionally render package content in a
  preview-pinned state so users can inspect the surface without first opening a
  browser-enhanced overlay. Keep source snippets representative of normal app
  usage even when the docs preview pins content into view.

## Conclusion

Issue 3 is complete. The repository now contains a Remix 3 RadCN documentation
site under `radcn/apps/docs` that runs from the repository root with
`pnpm dev`, consumes the `radcn` workspace package, renders live RadCN
component examples, and provides a polished navigable docs shell with homepage,
component routes, visual identity, processed logo assets, system/light/dark
theme mode support, Lucide icons, and copyable code snippets.

The docs registry covers every current public RadCN package subpath except the
reserved package/style metadata exports, plus the known Issue 3 block
dispositions `form`, `date-picker`, and `data-table`. Exported pages are marked
`ready` and include import guidance, aspirational install copy, package-backed
examples, accessibility notes, customization/token notes, and Remix 3
divergence notes. The non-shipped block pages remain honest
`not-shipped-yet` dispositions and do not claim fake package imports.

Final verification evidence:

- `pnpm --dir radcn/apps/docs typecheck` passed.
- `pnpm radcn:typecheck` passed.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` passed
  with 10 tests.
- `pnpm --dir radcn/apps/docs exec remix doctor` passed with no warnings or
  advice.
- `pnpm --dir radcn/apps/docs exec remix routes` showed the home,
  `/docs/components/:slug`, and asset routes.
- `git diff --check` passed during the final experiment.
- Vendor checkouts stayed clean and publish/vendor scope greps returned no
  matches.
- Manual Playwright viewport probes found no horizontal overflow on sampled
  desktop and 390px mobile pages.

The Remix 3 beta used here does not expose a `remix build` command. Build-like
confidence for this issue therefore comes from TypeScript checks, `remix
doctor`, route listing, and rendered Playwright coverage rather than a separate
production build artifact.
