# Experiment 10: Use Lucide icons uniformly

## Description

The docs app currently mixes icon strategies. The theme mode control uses text
only, and `radcn/apps/docs/app/assets/prompt-button.tsx` contains a hand-written
copy SVG. That makes icon usage harder to scale as the docs site grows.

This experiment installs Lucide's plain SVG package and establishes one
docs-local icon pattern that works with Remix 3's non-React UI model. The goal
is not to add decoration everywhere. The goal is to use icons where they clarify
compact controls and commands, while keeping visible labels where text is needed
for scanning.

Use `lucide-static`, not `lucide-react`, because RadCN docs are built with
Remix UI instead of React components. The implementation should use only the
individual icons needed by the docs app.

## Changes

- `pnpm-workspace.yaml`
  - Add `lucide-static` to the root catalog.
  - Resolve the actual version at implementation time with
    `pnpm view lucide-static version`, then record the selected range in the
    catalog.

- `radcn/apps/docs/package.json`
  - Add `lucide-static` as a docs app dependency using the catalog protocol.
  - Do not add any dependency on `vendor/`, and do not use vendored source as a
    package dependency.

- `pnpm-lock.yaml`
  - Update through `pnpm install` after the catalog and docs dependency are
    added.

- `radcn/apps/docs/app/ui/icons.tsx`
  - Create a docs-local icon module that exposes a small named set of icons
    needed now, starting with:
    - `MonitorIcon` or `LaptopIcon` for System mode;
    - `SunIcon` for Light mode;
    - `MoonIcon` for Dark mode;
    - `CopyIcon` for copy actions.
  - Prefer a uniform Remix UI component wrapper with shared props for accessible
    label, decorative mode, size, stroke width, and class/style hooks.
  - Keep icons as inline SVG in rendered HTML so they inherit `currentColor` and
    can be styled consistently in buttons.
  - During implementation, first prove the best `lucide-static` consumption
    path in this app:
    - preferred: import individual SVG assets from
      `lucide-static/icons/{name}.svg` only if Remix's asset pipeline and
      TypeScript expose inline/raw SVG markup that the wrapper can render as
      SVG elements;
    - rejected: URL or `<img>` style SVG imports, because they do not satisfy
      the `currentColor` inheritance and inline accessibility goals;
    - fallback: generate or maintain a tiny checked-in icon map from
      `lucide-static` SVG strings for only the icons RadCN docs uses.
  - Do not introduce a global sprite or icon font.

- `radcn/apps/docs/app/ui/docs-pages.tsx`
  - Update the theme mode segmented control so each option contains a Lucide
    icon plus an accessible text label.
  - Keep the three-option `role="radiogroup"` semantics from Experiment 9.
  - Use the shared icon styles instead of one-off SVG sizing.
  - Add icons only where they make command/navigation affordances clearer; do
    not turn every nav link, heading, or badge into an icon row.

- `radcn/apps/docs/app/assets/prompt-button.tsx`
  - Replace the hand-written copy SVG with the shared `CopyIcon`.
  - Preserve the existing hydrated clipboard behavior and visual layout.

- `radcn/apps/docs/tests/theme-mode.spec.ts`
  - Extend the theme control assertions to verify the three mode buttons still
    expose accessible names `System`, `Light`, and `Dark` after icons are added.
  - Assert that the stale binary toggle remains absent.

- `issues/0003-build-radcn-documentation-site/README.md`
  - After implementation, record the chosen Lucide consumption pattern in
    `## Learnings` so future docs work knows whether to import SVG assets
    directly or use the local generated/icon-map wrapper.

## Verification

- Dependency and workspace checks:
  - `pnpm install`
  - `pnpm list lucide-static --filter docs`
  - confirm `vendor/` remains outside workspace dependencies and no vendor
    source is referenced by `package.json`, `pnpm-lock.yaml`, or app imports.

- Static checks:
  - `pnpm --dir radcn/apps/docs typecheck`
  - `pnpm radcn:typecheck`
  - `git diff --check`

- Browser checks:
  - `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`
  - the theme control still has exactly three accessible options: `System`,
    `Light`, and `Dark`;
  - the theme buttons render icons without replacing their accessible names;
  - selecting System, Light, and Dark still updates `data-radcn-theme-mode` and
    resolved `data-radcn-theme` as in Experiment 9;
  - the prompt copy button still renders and can be clicked without console
    errors.

- Visual inspection:
  - theme-control icons are legible in resolved light and dark themes;
  - icons align with labels in the compact header at desktop and mobile widths;
  - copy/action icons inherit `currentColor` and do not introduce off-palette
    fills;
  - no text or icon overlaps in the top bar.

## Design Review

Reviewer: Gauss (`019e97f7-7e2b-7d73-8730-8659bffd484d`)

Fresh context: Yes (`fork_context: false`)

Findings:

- Blocker: None
- Major: Direct SVG asset imports might resolve to URLs instead of inline SVG
  markup, which would fail the experiment's `currentColor` and inline
  accessibility goals.
- Minor: None

Fixes:

- Clarified that direct SVG imports are acceptable only if Remix and TypeScript
  expose inline/raw SVG markup usable by the wrapper.
- Explicitly rejected URL or `<img>` style SVG imports.
- Kept the generated or checked-in icon-map fallback as the required path if
  raw inline SVG imports are not available.

Reviewer approval: Approved after the major clarification.

## Result

**Result:** Pass

Installed `lucide-static` `^1.17.0` through the root pnpm catalog and added it
as a docs app dependency. The docs app now has a local
`radcn/apps/docs/app/ui/icons.tsx` wrapper that imports only the four individual
Lucide SVG-string modules currently needed: copy, monitor, moon, and sun.

The wrapper renders trusted Lucide SVG strings inline through Remix UI so icons
inherit `currentColor`. It does not use React icon components, sprites, icon
fonts, URL-style SVG assets, or `<img>` tags. A narrow declaration file covers
the individual Lucide `.mjs` icon modules.

The theme mode control now renders Lucide icons for System, Light, and Dark
while preserving the three accessible radio option names. Code blocks now render
a docs-owned copy button with the shared Lucide copy icon and browser behavior
owned by `app/assets/entry.ts`.

The old hand-written copy SVG in `prompt-button.tsx` was removed and replaced
with the shared `CopyIcon` helper. During implementation, `PromptButton` was
confirmed to be an unused scaffold component in the current docs app, so its
existing layout and hydrated clipboard behavior were preserved rather than
converted into the new compact docs code-copy command. The live rendered and
clicked copy surface verified by Playwright is the code-block copy button.

Verification run:

- `pnpm install` — Pass
- `pnpm list lucide-static --filter docs` — Pass; docs depends on
  `lucide-static@1.17.0`
- `pnpm --dir radcn/apps/docs typecheck` — Pass
- `pnpm radcn:typecheck` — Pass
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` — Pass
  (6 tests; verifies theme icons and the rendered code-block copy button)
- `git diff --check` — Pass
- Vendor dependency check — Pass; only `lucide-static` package references are in
  `pnpm-workspace.yaml`, `pnpm-lock.yaml`, `radcn/apps/docs/package.json`, and
  docs app imports. No `vendor/` dependency references were added.
- `git status --short --ignored vendor` — Pass; vendor checkouts remain ignored
  as `!! vendor/react-router/`, `!! vendor/remix/`, and `!! vendor/shadcn-ui/`
- Visual spot check — Pass; desktop screenshot at 1280x900 showed the theme
  icons aligned and readable in the top bar with no new control overlap.

## Conclusion

The docs app now has a uniform Lucide-backed icon path for compact controls and
commands. Future docs icons should be added through `app/ui/icons.tsx` and
should import individual `lucide-static/dist/esm/icons/*.mjs` modules rather
than the package barrel, SVG URL assets, sprites, icon fonts, or React icon
packages.

## Completion Review

Reviewer: Ramanujan (`019e9802-ff46-7770-a8b5-715c68b614da`)

Fresh context: Yes (`fork_context: false`)

Initial findings:

- Blocker: `icons.tsx` and `lucide-static-icons.d.ts` were untracked and would
  have been omitted from the result commit.
- Major: `prompt-button.tsx` had changed layout and transition behavior instead
  of preserving the existing prompt button while replacing only the icon source.
- Major: the first result text did not clearly explain that `PromptButton` is
  currently unused and that the rendered/clicked copy surface verified by
  Playwright is the code-block copy button.
- Minor: None

Fixes:

- Staged the full result set, including the new icon wrapper and Lucide module
  declaration files.
- Restored `prompt-button.tsx` to its original full-width, left-aligned,
  16-pixel padded layout and resetting fade state while keeping the shared
  `CopyIcon`.
- Updated the result text to document that `PromptButton` is unused in the
  current docs app and that code-block copy is the live verified copy surface.

Re-review findings:

- Blocker: None
- Major: None
- Minor: None

Reviewer verification:

- `git diff --cached --check` — Pass
- `git diff --check` — Pass
- `pnpm --dir radcn/apps/docs typecheck` — Pass
- `pnpm radcn:typecheck` — Pass
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts` — Pass
  (6 tests)

Reviewer approval: Approved.
