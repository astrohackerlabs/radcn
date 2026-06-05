# Experiment 6: Add Dark Mode Support

## Description

Add first-class dark mode support to RadCN and the RadCN docs site.

Experiment 5 proved the docs registry and page renderer across representative
components. It also made clear that the current component previews and docs
shell are light-only. RadCN itself is token-based, so components can be themed,
but the package currently ships only light default tokens and the docs site
hardcodes light color-scheme metadata and light brand tokens.

This experiment should make dark mode a supported product behavior, not a
docs-only visual trick:

- RadCN package styles should include dark theme token values that a consuming
  app can activate.
- The docs site should expose a usable light/dark control and render the docs
  shell plus live RadCN package previews correctly in both modes.
- Verification should prove representative components have dark computed
  colors and that the docs pages remain readable on desktop and mobile.

The implementation should keep the scope narrow. Do not redesign the site or
rework the component registry. Do not add broad theme customization,
multi-palette support, system preference persistence, or a full theme editor.

## Changes

- `radcn/packages/radcn/src/styles/tokens.css`
  - Add RadCN dark token support using an explicit selector such as
    `[data-radcn-theme="dark"]`.
  - Keep light defaults compatible with the current `:root` behavior.
  - Cover every base token used by package components, including background,
    foreground, primary, secondary, muted, border, input, ring, destructive,
    popover, accent, card, and any other root-level tokens referenced by
    components.
  - Prefer token overrides over component-specific dark CSS unless a component
    has a concrete contrast bug that cannot be solved by tokens.
- `radcn/packages/radcn/src/styles/index.ts`
  - Keep `radcnStyles` synchronized with `tokens.css`.
  - If the project already has or needs a tiny generation helper, record that
    in the result; otherwise keep this experiment focused and update the string
    module directly.
- `radcn/apps/docs/app/ui/brand.ts`
  - Add a dark docs-brand palette or a theme-aware brand token model.
  - Preserve the Experiment 4 RadCN identity: robot mark, high-energy accent,
    grid, hard-shadow attitude, and neutral component preview surfaces.
- `radcn/apps/docs/app/ui/document.tsx`
  - Update color-scheme metadata so the document can support both light and
    dark rendering.
  - Add the initial theme attribute needed by the docs shell and RadCN tokens.
- `radcn/apps/docs/app/ui/docs-pages.tsx`
  - Add a small theme control in the existing docs chrome.
  - The control should be a real UI control, not a marketing note. It should
    allow switching between light and dark in the browser without a full page
    rebuild.
  - Apply the theme attribute so both docs shell styles and RadCN package
    component previews switch together.
  - Keep page layout, navigation, registry rendering, and component examples
    otherwise unchanged.
- `radcn/apps/docs/app/assets/`
  - Add the smallest browser entry needed for the theme switch.
  - Store user choice in `localStorage` if practical.
  - Avoid adding a framework or global state system for this experiment.
- `radcn/apps/docs/app/content/components.tsx`
  - Update documentation text only if needed to mention dark-mode token usage.
  - Do not add new component pages in this experiment.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Record learnings about the theme selector, token scope, docs-shell theming,
    and whether `radcnStyles` synchronization needs a future generator.
- `issues/0003-build-radcn-documentation-site/06-add-dark-mode-support.md`
  - Record implementation result, verification output, screenshot paths,
    conclusion, and completion review.

If implementation discovers that a package component uses an undefined token
such as `--radcn-popover` or `--radcn-card`, define that token at the root in
both light and dark themes instead of patching only the affected component.

## Verification

The experiment passes when all of these are true:

- RadCN package styles expose a documented dark theme selector.
- Light mode remains the default when no theme selector is present.
- Applying the dark theme selector changes package component computed colors for
  representative components such as `button`, `input`, `badge`, `dialog`,
  `tabs`, and `sonner`.
- The docs site has a visible theme control in the existing chrome.
- The theme control switches the document, docs shell, and RadCN component
  previews between light and dark without navigation.
- The selected theme persists across reloads if localStorage is available.
- The docs document advertises support for both light and dark color schemes.
- Existing component routes still render from the shared registry and continue
  to return `200`.
- Unknown component slugs still return `404`.
- Desktop and mobile screenshots in both light and dark show readable text,
  visible focus/control affordances, readable code blocks, and no incoherent
  overlap.
- The dark docs palette still reads as RadCN: energetic accent, robot mark,
  grid texture, and neutral preview panels.
- The implementation does not modify vendor checkouts.
- `pnpm --dir apps/docs typecheck` passes.
- `pnpm radcn:typecheck` passes.
- `git diff --check` passes.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
cd radcn
pnpm --dir apps/docs typecheck
pnpm radcn:typecheck
PORT=5175 pnpm --dir apps/docs start
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/ | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/button | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/badge | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/input | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/dialog | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/tabs | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/sonner | rg '^200$'
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:5175/docs/components/not-a-component | rg '^404$'
curl -s http://localhost:5175/ | rg 'color-scheme|data-radcn-theme|Theme|data-radcn-logo'
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/ /tmp/radcn-exp6-home-light-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/ /tmp/radcn-exp6-home-light-mobile.png
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/docs/components/dialog /tmp/radcn-exp6-dialog-light-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/docs/components/dialog /tmp/radcn-exp6-dialog-light-mobile.png
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/docs/components/tabs /tmp/radcn-exp6-tabs-light-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/docs/components/tabs /tmp/radcn-exp6-tabs-light-mobile.png
# Use Playwright or DevTools emulation to switch the theme control, then capture:
# /tmp/radcn-exp6-home-dark-desktop.png
# /tmp/radcn-exp6-home-dark-mobile.png
# /tmp/radcn-exp6-dialog-dark-desktop.png
# /tmp/radcn-exp6-dialog-dark-mobile.png
# /tmp/radcn-exp6-tabs-dark-desktop.png
# /tmp/radcn-exp6-tabs-dark-mobile.png
git -C .. diff --check
git -C .. status --short -- vendor
```

Add a focused Playwright or Node-based computed-style check if practical. It
should verify that applying `[data-radcn-theme="dark"]` changes at least these
observable values:

- page background;
- page foreground text;
- `button` default background/foreground;
- `input` background/border/foreground;
- `badge` outline foreground/border;
- `dialog` content background/foreground;
- `tabs` trigger/content background;
- `sonner` toast background/foreground.

During screenshot inspection, explicitly check:

- top navigation and theme-control fit;
- sidebar category readability;
- homepage hero and robot mark in both themes;
- neutral preview-panel contrast in both themes;
- source-code block contrast in both themes;
- overlay and composite previews in both themes;
- mobile header, nav, and page-title fit.

## Design Review

Fresh-context design review was performed by Codex subagent `Huygens` on
2026-06-05 with `fork_context: false`.

Findings:

- **Minor:** `radcn/package.json` had an unrelated uncommitted pnpm
  `packageManager` bump in the worktree, but this experiment does not include
  `radcn/package.json` in scope. The plan commit must exclude that unrelated
  change, commit it separately, or explicitly add it to scope.

Resolution:

- Kept the pnpm `radcn/package.json` change out of Experiment 6 scope. The plan
  commit must stage only the Issue 3 README and Experiment 6 plan file.

Result:

- Huygens approved the experiment design with no blockers or major findings.
