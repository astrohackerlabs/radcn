# Experiment 5: Add Representative Component Docs Batch

## Description

Scale the docs registry and component-page model beyond `button` by adding a
small but diverse set of real component docs pages.

Experiment 3 proved one page. Experiment 4 proved the docs visual identity.
This experiment should prove that the registry, navigation, page sections,
examples, source snippets, and visual system can handle different component
shapes before broad coverage begins.

The goal is not to document every RadCN component yet. The goal is to add enough
variety to expose schema and layout problems while the docs surface is still
small.

Add docs entries for these representative categories:

- static/display: `badge`;
- native form/control: `input`;
- overlay/interactive: `dialog`;
- composite/application: `tabs`;
- helper/notification surface: `toast` or `sonner`.

If implementation discovers that one listed component cannot render a useful
docs example without browser behavior that is too broad for this experiment,
replace it with the nearest same-category component and record the reason in
the result. Any replacement must preserve all five representative categories and
the verification commands must be updated to check the replacement slug, title,
and import path.

The result should answer:

- whether the current registry schema works for more than one component;
- whether category grouping and navigation remain readable;
- whether examples can stay package-imported and live-rendered;
- whether source snippets and previews remain understandable across simple,
  native, overlay, composite, and helper surfaces;
- whether component-page sections need richer metadata before broad coverage;
- what later full-coverage docs work should preserve or change.

## Changes

- `radcn/apps/docs/app/content/components.tsx`
  - Add registry entries for the selected representative components.
  - Import examples from RadCN package subpaths such as `radcn/badge`,
    `radcn/input`, `radcn/dialog`, `radcn/tabs`, and `radcn/sonner` or
    `radcn/toast`.
  - Add at least one live preview and one source string for each new entry.
  - Include title, slug, category, status, import path, install guidance,
    summary, accessibility notes, customization notes, and Remix 3 divergence
    notes for each entry.
  - Keep explicit source strings acceptable for this experiment, but record any
    synchronization pain as a learning.
- `radcn/apps/docs/app/ui/docs-pages.tsx`
  - Update navigation and homepage preview behavior only as needed to keep the
    larger registry readable.
  - Add category grouping if the flat list becomes harder to scan.
  - Keep visual styling aligned with `brand.ts`.
  - Preserve neutral preview areas for component examples.
  - Do not add search, command menus, copy buttons, theme switching, or broad
    content-generation infrastructure.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Record learnings about registry shape, navigation grouping, live example
    limits, snippet synchronization, or component categories that later broad
    coverage must preserve.
- `issues/0003-build-radcn-documentation-site/05-representative-component-docs-batch.md`
  - Record implementation result, verification output, screenshot paths,
    conclusion, and completion review.

Do not change `radcn/packages/radcn` component implementations or package
tokens in this experiment. If a component appears impossible to document
without package changes, record that as a blocker or follow-up instead of
editing the package.

## Verification

The experiment passes when all of these are true:

- The registry includes `button` plus at least five new representative docs
  entries covering static/display, native form/control, overlay/interactive,
  composite/application, and helper/notification categories.
- The docs navigation exposes every documented component and remains readable on
  desktop and mobile.
- Each new component page renders at `/docs/components/:slug`.
- Unknown component slugs still return `404`.
- Every new page renders from structured registry data rather than hard-coded
  route-specific page bodies.
- Every new page has at least one live preview imported from the RadCN package,
  not a static screenshot or docs-local component copy.
- Every new page includes source, install/import guidance, accessibility notes,
  customization notes, and Remix 3 divergence notes.
- The homepage still renders real RadCN package components in the first
  viewport and keeps the Experiment 4 visual identity.
- Component preview areas remain neutral enough to evaluate the package
  components.
- No changes are made under `radcn/packages/radcn`.
- `pnpm --dir apps/docs typecheck` passes.
- Browser requests for the new pages return `200` and contain the component
  title plus `radcn/` import text.
- Browser requests for representative pages include `data-radcn-logo`, proving
  the docs shell still renders.
- Desktop and mobile screenshot inspection finds no obvious text overlap,
  clipped navigation labels, unreadable code blocks, or incoherent UI overlap.
- `git diff --check` passes.
- `git status --short -- vendor` confirms this experiment did not modify
  ignored vendor checkouts.
- `git diff --name-only -- radcn/packages/radcn` returns no output.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
cd radcn
pnpm --dir apps/docs typecheck
PORT=5175 pnpm --dir apps/docs start
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/ | rg '^200$'
curl -s http://localhost:5175/ | rg 'RadCN|data-radcn-logo|button'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/badge | rg '^200$'
curl -s http://localhost:5175/docs/components/badge | rg 'Badge|radcn/badge|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/input | rg '^200$'
curl -s http://localhost:5175/docs/components/input | rg 'Input|radcn/input|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/dialog | rg '^200$'
curl -s http://localhost:5175/docs/components/dialog | rg 'Dialog|radcn/dialog|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/tabs | rg '^200$'
curl -s http://localhost:5175/docs/components/tabs | rg 'Tabs|radcn/tabs|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/sonner | rg '^200$'
curl -s http://localhost:5175/docs/components/sonner | rg 'Toast|Sonner|radcn/sonner|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/not-a-component | rg '^404$'
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/ /tmp/radcn-exp5-home-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/ /tmp/radcn-exp5-home-mobile.png
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/docs/components/dialog /tmp/radcn-exp5-dialog-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/docs/components/dialog /tmp/radcn-exp5-dialog-mobile.png
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/docs/components/tabs /tmp/radcn-exp5-tabs-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/docs/components/tabs /tmp/radcn-exp5-tabs-mobile.png
git -C .. diff --check
git -C .. status --short -- vendor
git -C .. diff --name-only -- radcn/packages/radcn
```

If any representative component is replaced, preserve the same category in the
replacement, update the pass criteria and verification commands for the
replacement slug/title/import path, and record the reason.

During screenshot inspection, explicitly check:

- category navigation readability;
- first-viewport homepage composition;
- overlay and composite example panels;
- source-code block overflow;
- mobile navigation and page-header fit.

## Design Review

Fresh-context design review was performed by Codex subagent `Newton` on
2026-06-05 with `fork_context: false`.

Findings:

- **Minor:** Suggested `curl -I` commands did not explicitly assert the expected
  HTTP status codes.
- **Minor:** The replacement policy allowed replacing any representative
  component, but only documented command updates for replacing `sonner`.

Resolution:

- Updated suggested route checks to assert `200` and `404` status codes.
- Updated replacement handling so any replacement must preserve the same
  category and update pass criteria plus verification commands for the
  replacement slug, title, and import path.

Result:

- Newton approved the experiment design with no blockers or major findings.
