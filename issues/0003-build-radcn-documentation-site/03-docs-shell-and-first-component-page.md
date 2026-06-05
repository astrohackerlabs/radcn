# Experiment 3: Create Docs Shell and First Component Page

## Description

Replace the generated Remix starter homepage with the first durable RadCN docs
site vertical slice.

This experiment should prove the core documentation architecture before broad
component coverage begins. It should create a polished docs shell, introduce a
small structured component registry, and render one real component page for
`button` using imports from the `radcn` package.

The goal is not to document every component yet. The goal is to establish a
route, layout, registry, and example pattern that can be repeated across the
rest of the library.

The first slice should answer:

- where docs navigation data lives;
- how component pages are routed;
- how examples import RadCN package components;
- how preview and source-code sections are represented;
- how install/import, accessibility, customization, and Remix 3 divergence
  notes fit on a page;
- how the homepage exposes real component previews without becoming a
  marketing-only landing page.

## Changes

- `radcn/apps/docs/app/routes.ts`
  - Add a component detail route for `/docs/components/:slug`.
  - Keep `app/routes.ts` as the URL source of truth.
- `radcn/apps/docs/package.json`
  - Add the docs app dependency on the workspace `radcn` package, likely
    `radcn: "workspace:*"`, so examples import the component library the way a
    local RadCN user app would.
- `radcn/pnpm-lock.yaml`
  - Update if pnpm records the new docs app workspace dependency.
- `radcn/apps/docs/app/actions/controller.tsx`
  - Replace the generated `HomePage` action usage with RadCN docs pages.
  - Add an action for the component detail route.
  - Return a `404` response for unknown component slugs.
- `radcn/apps/docs/app/ui/scaffold-home-page.tsx`
  - Delete or stop using the generated starter homepage once replacement docs
    pages exist.
- `radcn/apps/docs/app/content/`
  - Add a component registry module.
  - Include at least one `button` registry entry with slug, title, category,
    status, package import path, summary, examples, install/import guidance,
    accessibility notes, customization/token notes, and Remix 3 divergence
    notes.
  - Keep the registry data structured enough to drive navigation and the first
    component route without scraping rendered markup.
- `radcn/apps/docs/app/ui/`
  - Add a reusable docs shell with top navigation, left component navigation,
    main content, and responsive behavior.
  - Add a homepage that immediately shows real RadCN component previews and
    links into the first component page.
  - Add a component page view that renders the `button` registry entry.
  - Add a preview/code presentation pattern for at least one `button` example.
    The source-code pane may be backed by an explicit string in the registry for
    this experiment, as long as the rendered preview imports and renders the
    same RadCN component family from the package.
  - Use RadCN components from package imports such as `radcn/button` or `radcn`
    for the actual examples. Do not copy button implementation code into the
    docs app.
- `radcn/apps/docs/app/ui/document.tsx`
  - Add any head links needed for RadCN package styles or docs-local base
    styles.
  - Keep document-level behavior small and app-wide.
- `radcn/apps/docs/app/assets/`
  - Add client/browser modules only if the preview/code UI or navigation needs
    browser behavior. Prefer server-rendered UI when static links and CSS are
    sufficient for this experiment.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Record learnings if this experiment discovers constraints about registry
    shape, route actions, RadCN package styles, source-code synchronization, or
    docs layout that later component-page work must follow.
- `issues/0003-build-radcn-documentation-site/03-docs-shell-and-first-component-page.md`
  - Record the implementation result, verification output, conclusion, and
    completion review after running the experiment.

Do not attempt full component coverage in this experiment. Avoid search,
command-menu navigation, MDX/content pipelines, copy-to-clipboard behavior, or
generated snippet synchronization unless they are required to make the first
vertical slice work.

## Verification

The experiment passes when all of these are true:

- The generated Remix starter homepage is no longer the user-facing homepage.
- The docs app has a persistent documentation shell with a top area, left
  navigation, main content area, and responsive behavior.
- The homepage renders real RadCN package components in the first viewport and
  links to the first component page.
- `/docs/components/button` renders a component page from structured registry
  data.
- Unknown component slugs return `404`.
- At least one `button` preview imports and renders the RadCN package component
  rather than a fixture-local or docs-local copy.
- The docs app declares a workspace dependency on `radcn`, and any lockfile
  update reflects that dependency without adding vendor references.
- The `button` page includes import guidance, example source, accessibility
  notes, customization/token notes, and Remix 3 divergence notes.
- The registry can drive navigation and page content without deriving those
  values from DOM text.
- Any docs-local CSS or head links needed to render RadCN examples are included
  deliberately and documented in the result.
- The docs app runs on a documented port that does not conflict with the
  comparison fixtures. Use `PORT=5175` unless implementation discovers a better
  reason to change it.
- A browser request to `/` returns the new RadCN docs homepage.
- A browser request to `/docs/components/button` returns the button docs page.
- A browser request to an unknown component slug returns `404`.
- `git diff --check` passes.
- `git status --short -- vendor` confirms this experiment did not modify
  ignored vendor checkouts.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
cd radcn
pnpm install
pnpm --dir apps/docs list radcn
pnpm --dir apps/docs typecheck
! rg '(^\s+vendor/|\.\./vendor|link:.*vendor)' pnpm-lock.yaml
PORT=5175 pnpm --dir apps/docs start
curl -I http://localhost:5175/
curl -s http://localhost:5175/ | rg 'RadCN|button|docs'
curl -I http://localhost:5175/docs/components/button
curl -s http://localhost:5175/docs/components/button | rg 'Button|radcn/button|Accessibility|Customization|Remix 3'
curl -I http://localhost:5175/docs/components/not-a-component
git -C .. diff --check
git -C .. status --short -- vendor
```

If rendered-browser behavior or responsive layout cannot be validated by curl,
add a narrow Playwright check or screenshot inspection for the homepage and
`button` page, then record the exact command and artifact paths in the result.

## Design Review

Fresh-context design review was performed by Codex subagent `Dirac` on
2026-06-05 with `fork_context: false`.

Findings:

- **Blocker:** The initial plan required the docs app to import examples from
  the workspace `radcn` package, but the Changes section did not list
  `radcn/apps/docs/package.json` or any resulting `radcn/pnpm-lock.yaml`
  changes.

Resolution:

- Added `radcn/apps/docs/package.json` to the Changes section with an explicit
  workspace `radcn` dependency.
- Added `radcn/pnpm-lock.yaml` to the Changes section for the resulting pnpm
  metadata update.
- Added verification for `pnpm --dir apps/docs list radcn` and the lockfile
  no-vendor-reference check.

Dirac re-reviewed the fix and approved the experiment design.
