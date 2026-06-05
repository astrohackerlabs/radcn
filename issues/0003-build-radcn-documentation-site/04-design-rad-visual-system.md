# Experiment 4: Design RadCN Visual Identity and Docs UI System

## Description

Design and implement the first RadCN visual identity system for the docs site.

The brand direction should play on "rad" as in radical, sharp, and cool, while
still preserving the seriousness expected from a component-library reference.
The docs site may have more attitude than the RadCN package components
themselves, but the component previews must stay clear and neutral enough for
users to judge the library accurately.

This experiment should establish a durable visual language, not just decorate
one page. It should define docs-site brand tokens, a first logo/mascot asset,
layout/composition rules, and reusable UI primitives that can scale across the
homepage and component pages built in Experiment 3.

Preferred direction:

- shadcn-adjacent precision, whitespace, borders, and typography;
- a "rad" accent layer using one high-energy color, such as hot red, safety
  orange, acid green, or cyan;
- a simple robot-with-sunglasses logo or mascot mark that works in monochrome
  and with one accent;
- restrained sticker, label, grid, terminal, or zine-inspired details;
- component previews that remain honest, readable, and not over-branded.

Avoid:

- making the RadCN components themselves overly branded;
- dark, blurred, stock-like, or atmospheric visuals that obscure the product;
- a one-note palette dominated by one hue family;
- purple/purple-blue gradient branding;
- rounded pill-heavy UI when a tighter shadcn-like shape is more appropriate;
- in-app explanatory text about design choices or implementation mechanics.

The result should answer:

- what the RadCN docs brand looks like;
- what logo/mascot direction the site uses for now;
- which color, typography, spacing, border, shadow, and code-block tokens the
  docs UI should reuse;
- which parts of the docs shell get brand attitude versus neutral component
  presentation;
- how the homepage and first component page should look on desktop and mobile;
- what later docs-page experiments should preserve.

## Research Method

Before implementing the visual system, perform and record a short research
pass. The research should be practical and directional, not an open-ended brand
study.

Research must include:

- an internet search on what "rad" can mean visually, with attention to surf,
  skate, neon, punk/zine, early-web, lo-fi, and 1980s/1990s design references;
- an internet search on how mature design systems structure foundations,
  tokens, color, layout, spacing, typography, elevation, documentation, and
  component boundaries;
- at least three "rad" visual reference sources;
- at least three design-system reference sources;
- a short synthesis that separates:
  - brand attitude the RadCN docs site can use;
  - design-system rules that should govern implementation;
  - anti-patterns to avoid;
  - decisions that affect later docs-page work.

Suggested starting sources:

- CARI Institute, Rad Dog / Neon Surf:
  https://www.cari.institute/aesthetics/rad-dog-neon-surf
- SDSU Humanities Hub, zine design history:
  https://humanitieshub.sdsu.edu/omeka/exhibits/show/designhistory/zines
- Material Design color system:
  https://m2.material.io/guidelines/style/color.html
- Material Design layout guidance:
  https://m2.material.io/design/layout/understanding-layout.html
- Atlassian Design System foundations:
  https://atlassian.design/foundations/
- Adobe Spectrum design tokens:
  https://spectrum.adobe.com/page/design-tokens/
- IBM Design Language color:
  https://www.ibm.com/design/language/color

The implementation does not need to copy these sources. It should use them to
make explicit choices about RadCN's own docs identity.

## Changes

- `issues/0003-build-radcn-documentation-site/04-design-rad-visual-system.md`
  - Record the research sources, synthesis, implementation result,
    verification output, screenshot paths, conclusion, and completion review.
- `radcn/apps/docs/app/ui/brand.ts`
  - Add a small docs-site brand token module for color, typography, spacing,
    border, shadow, and reusable measurements.
  - Keep this scoped to the docs app. Do not change RadCN package component
    tokens in `radcn/packages/radcn` during this experiment.
- `radcn/apps/docs/app/ui/logo.tsx`
  - Add a first RadCN logo/mascot component.
  - The initial mark should be a shadcn-esque robot wearing sunglasses,
    implemented as app-native SVG/Remix UI markup so it is versioned with the
    docs site and works without external image loading.
  - Include an icon-sized mark suitable for the top bar and a larger homepage
    treatment if needed.
- `radcn/apps/docs/app/ui/docs-pages.tsx`
  - Apply the visual system to the existing homepage, docs shell, navigation,
    preview panels, code blocks, labels, and component page.
  - Use brand attitude around the shell, homepage, logo, labels, and callouts.
  - Keep live component examples visually readable and do not obscure or restyle
    them so heavily that users cannot evaluate RadCN components.
  - Ensure desktop and mobile layouts remain stable and text does not overlap or
    overflow.
- `radcn/apps/docs/app/ui/document.tsx`
  - Add any document-level metadata or color-scheme hints needed by the visual
    system.
  - Keep raw RadCN package style insertion intact.
- `radcn/apps/docs/public/`
  - Add a favicon or small static logo asset only if the app-native logo cannot
    satisfy favicon needs directly.
  - Do not add generated bitmap assets unless the implementation records why
    SVG/code-native logo assets were insufficient.
- `issues/0003-build-radcn-documentation-site/README.md`
  - Record learnings about the chosen brand direction, logo constraints, token
    system, and visual rules that later component-page work must preserve.

Do not broaden this into full site content coverage, search, command menus,
copy buttons, theme switching, animation systems, or generated brand campaigns.
This is a focused identity-system pass over the pages and shell that already
exist.

## Verification

The experiment passes when all of these are true:

- The experiment result records the research sources used for "rad" visual
  direction and design-system structure.
- The result includes a synthesis of research findings and explains how the
  implementation applies or rejects those findings.
- The docs site has a recognizable RadCN visual identity based on "rad" without
  copying shadcn/ui's exact site design.
- A robot-with-sunglasses logo or mascot mark appears in the docs shell and
  works at small navigation size.
- The visual identity is expressed through reusable docs-app tokens or
  primitives rather than one-off inline color choices scattered across every
  component.
- The homepage still shows real RadCN package components in the first viewport.
- `/docs/components/button` still renders the button page from registry data.
- The button examples remain honest live RadCN package components, not static
  screenshots or docs-local copies.
- Component preview areas remain visually neutral enough to evaluate the
  components.
- Desktop and mobile layouts show no obvious text overlap, clipped labels,
  unreadable code blocks, or incoherent UI overlap.
- The palette does not read as a one-note purple/blue-gradient, beige, dark
  slate, brown/orange, or single-hue theme.
- `radcn/packages/radcn` component tokens are not changed by this docs-branding
  experiment.
- No external image or font dependency is required for the logo or critical
  first render.
- Unknown component slugs still return `404`.
- `pnpm --dir apps/docs typecheck` passes.
- `git diff --check` passes.
- `git status --short -- vendor` confirms this experiment did not modify
  ignored vendor checkouts.
- A separate AI agent reviews the completed experiment result before the result
  commit or any next experiment design.

Suggested verification commands:

```sh
cd radcn
pnpm --dir apps/docs typecheck
PORT=5175 pnpm --dir apps/docs start
curl -I http://localhost:5175/
curl -s http://localhost:5175/ | rg 'RadCN|button|docs|data-radcn-logo'
curl -I http://localhost:5175/docs/components/button
curl -s http://localhost:5175/docs/components/button | rg 'Button|radcn/button|Accessibility|Customization|Remix 3|data-radcn-logo'
curl -I http://localhost:5175/docs/components/not-a-component
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/ /tmp/radcn-exp4-home-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/ /tmp/radcn-exp4-home-mobile.png
pnpm exec playwright screenshot --viewport-size=1440,1000 http://localhost:5175/docs/components/button /tmp/radcn-exp4-button-desktop.png
pnpm exec playwright screenshot --viewport-size=390,844 http://localhost:5175/docs/components/button /tmp/radcn-exp4-button-mobile.png
git -C .. diff --check
git -C .. status --short -- vendor
```

During screenshot inspection, explicitly check:

- top-bar logo legibility at desktop and mobile widths;
- first-viewport homepage composition;
- component page header and import block;
- preview/code panel contrast and overflow;
- mobile navigation and code block readability.

If screenshots reveal visual problems, fix them before recording a passing
result.

## Design Review

Fresh-context design review was performed by Codex subagent `Bacon` on
2026-06-05 with `fork_context: false`.

Findings:

- None.

Result:

- Bacon approved the experiment design with no blockers, major findings, or
  minor findings.

Revised design review was performed by Codex subagent `Hilbert` on 2026-06-05
with `fork_context: false` after the user identified that the original design
did not include explicit research criteria.

Findings:

- **Blocker:** The revised research requirements were added after Bacon's
  approval, but the Design Review section did not distinguish the original
  approval from the revised-plan review.

Resolution:

- Added this revised-plan review record so the experiment history clearly shows
  that the research-method revision requires approval and a separate revised
  plan commit before implementation.

Result:

- Hilbert re-reviewed the fix and approved the revised experiment design.
