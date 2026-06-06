# Experiment 26: Implement breadcrumb example parity depth

## Description

Experiment 25 found that Breadcrumb has the core package primitives but lacks
full example-depth coverage for the 6 upstream shadcn/ui Breadcrumb examples:
`breadcrumb-demo`, `breadcrumb-dropdown`, `breadcrumb-ellipsis`,
`breadcrumb-link`, `breadcrumb-responsive`, and `breadcrumb-separator`.

This experiment implements that depth across the RadCN package defaults, docs
site, candidate fixtures, and Playwright tests. The goal is equivalent
user-facing behavior, accessibility, visual behavior, and author-facing
modifiability, not React or DOM equivalence. React state, Next `Link`, Radix
Slot, lucide icons, Tailwind utilities, and vendor code must not become RadCN
dependencies.

## Changes

- Update `radcn/packages/radcn/src/components/breadcrumb.tsx`.
  - Align the default `BreadcrumbSeparator` visual with shadcn's chevron-style
    default using an app/package-owned glyph such as `›`.
  - Preserve author-supplied separator children so Slash-style separators remain
    possible without an icon package.
  - Keep native `nav`, `ol`, `li`, `a`, and current-page semantics.
- Update `radcn/packages/radcn/src/styles/tokens.css` and regenerate
  `radcn/packages/radcn/src/styles/index.ts` if style tokens change.
  - Add or refine public classes needed for Breadcrumb example parity:
    chevron/slash glyph sizing, label+chevron trigger spacing, ellipsis trigger
    sizing, truncation/max-width hooks, and responsive desktop/mobile branch
    visibility.
  - Keep styling modifiable through classes, inline styles, or CSS variables.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Replace the seed-only Breadcrumb docs with a rich Breadcrumb entry and live
    preview covering all six upstream example families.
  - Add source snippets that use RadCN imports, native `BreadcrumbLink href`,
    app-owned glyphs, DropdownMenu, Drawer, and Button composition.
  - Document intentional mappings: Next `Link`/`asChild` to native links or
    app-owned anchors; React `useState`/`useMediaQuery` to Remix 3 browser/CSS
    composition; lucide icons to app-owned glyphs/assets; Tailwind utilities to
    RadCN classes/styles/CSS variables.
- Update `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`.
  - Add named Breadcrumb scenarios for all upstream ids:
    `demo`, `dropdown`, `ellipsis`, `link`, `responsive`, and `separator`.
  - Preserve existing routes `default`, `collapsed`, and `custom-separator` as
    compatibility aliases unless a test proves they are redundant.
  - Implement DropdownMenu breadcrumb branches with accessible triggers and menu
    items.
  - Implement the responsive Breadcrumb using RadCN primitives and
    fixture/docs-owned breakpoint behavior. Desktop should expose a DropdownMenu
    branch at wide viewports; mobile should expose a Drawer branch at narrow
    viewports, with Drawer title/description, link list, and outline Button
    close action.
- Update `radcn/fixtures/tests/navigation-collection.spec.ts`.
  - Add Playwright assertions for all six upstream Breadcrumb example families.
  - Verify semantics, accessible names, current page, hidden ellipsis text,
    default chevron-style separator, Slash-style custom separator, dropdown
    trigger/menu behavior, responsive desktop DropdownMenu behavior, responsive
    mobile Drawer behavior, truncation/max-width hooks, and native link hrefs.
- Update `issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md`.
  - Change each row to `Covered` once package/docs/fixture/test evidence exists.
  - Record stable divergences for React/Next/Radix/lucide/Tailwind mechanics.
  - Add a resolution section for Breadcrumb.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `breadcrumb` with evidence for Experiments 25 and 26 plus the inventory
    file once all six rows are covered.
- Run `node scripts/audit-shadcn-parity.mjs` and update
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 `README.md` learnings with the completed Breadcrumb outcome
  and the next recommended cluster from the regenerated inventory.

## Verification

Pass criteria:

- Type checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Breadcrumb fixture tests pass:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts
  ```
- Docs coverage tests pass:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- The parity audit passes and regenerates the inventory:
  ```text
  node scripts/audit-shadcn-parity.mjs
  ```
- The parity audit is idempotent after regeneration:
  ```text
  tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status
  ```
- Deterministic checks prove:
  - all 6 upstream Breadcrumb example ids appear exactly once in
    `breadcrumb-example-inventory.md`;
  - all 6 Breadcrumb example rows have final outcome `Covered`;
  - `resolved-clusters.json` includes `slug = "breadcrumb"`,
    `status = "resolved"`, and evidence for Experiment 25, Experiment 26, and
    `breadcrumb-example-inventory.md`;
  - `radcn/packages/radcn/src/styles/index.ts` exactly matches
    `tokens.css` if styles changed;
  - `breadcrumb` is absent from unresolved example clusters in
    `parity-inventory.md` and the first recommended cluster has advanced;
  - docs contain labels/copy for `Demo`, `Dropdown`, `Ellipsis`, `Link`,
    `Responsive`, and `Separator`;
  - docs and fixtures contain no imports from React, Next, Radix, lucide,
    vendor paths, or npm publishing configuration.
- Playwright assertions specifically cover:
  - `breadcrumb-link`: native Home and Components links plus current page;
  - `breadcrumb-ellipsis`: collapsed ellipsis with hidden `More` text;
  - `breadcrumb-separator`: Slash-style author-supplied separators;
  - `breadcrumb-demo`: ellipsis DropdownMenu trigger with hidden `Toggle menu`
    text and menu items;
  - `breadcrumb-dropdown`: label+chevron DropdownMenu trigger and menu items;
  - `breadcrumb-responsive`: desktop DropdownMenu branch at a wide viewport and
    mobile Drawer branch, Drawer title/description, link list, and outline
    Button close action at a narrow viewport;
  - visible truncation/max-width hooks on responsive trailing items.
- Dependency-policy check passes with no matches:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*next/|from ['\"][^'\"]*radix-ui|from ['\"][^'\"]*@radix-ui|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  ```
- Manifest dependency-policy check passes with no matches in RadCN package,
  docs, workspace, and candidate Remix manifests. The reference React Router
  fixture is intentionally excluded because it is the React comparison app.
  ```text
  rg -n '"(react|next|radix-ui|@radix-ui[^"]*|lucide-react|tailwindcss)"|publishConfig|npm publish|pnpm publish' package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any of the six upstream Breadcrumb examples remains `Partial` or `Missing`.
- The implementation adds React, Next, Radix Slot, lucide, Tailwind, vendor, or
  publishing dependencies to RadCN package/docs/fixture source.
- Responsive parity is claimed without viewport-specific Playwright evidence
  for both desktop DropdownMenu and mobile Drawer behavior.
- The default separator change breaks author-supplied separator children or
  current-page navigation semantics.
- The experiment changes unrelated component clusters or starts the next cluster
  before Breadcrumb result review and result commit.

## Design Review

Reviewer: Erdos (`019e9afd-c44b-73c1-8961-c8cf423f3272`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: the dependency-policy verification checked source imports and the root
  `package.json`, but did not check package/app manifests where forbidden
  dependencies or publishing configuration could be added.
- Minor: the required `## Design Review` section was empty before this review
  was recorded.

Fixes:

- Added a manifest dependency-policy check for the root workspace manifest,
  `radcn/packages/radcn/package.json`, `radcn/apps/docs/package.json`, and
  `radcn/fixtures/candidate-remix/package.json`. The reference React Router
  fixture is intentionally excluded because it is the React comparison app.
- Recorded this design review before the plan commit.

Approval result: approved with no blockers. Erdos confirmed the issue README
links Experiment 26 as `Designed`, the design has the required sections, scope
is contained to Breadcrumb example parity, verification is concrete, vendor
cleanliness is checked, and implementation has not started before the plan
commit.

Re-review: Erdos confirmed the manifest coverage and design-review recording
fixes, then found that the manifest regex still missed scoped Radix packages
such as `@radix-ui/react-slot`. The regex was tightened to
`@radix-ui[^"]*` before the plan commit.

Final re-review: approved with no blockers. Erdos confirmed the tightened
manifest regex catches scoped Radix package names while still excluding the
intentional React reference fixture.

## Result

**Result:** Pass

Implemented Breadcrumb example parity depth for all 6 upstream shadcn/ui
Breadcrumb examples: `breadcrumb-demo`, `breadcrumb-dropdown`,
`breadcrumb-ellipsis`, `breadcrumb-link`, `breadcrumb-responsive`, and
`breadcrumb-separator`.

Package changes:

- `radcn/packages/radcn/src/components/breadcrumb.tsx` now uses a
  chevron-style default separator glyph while preserving author-supplied
  separator children.
- `radcn/packages/radcn/src/styles/tokens.css` adds public Breadcrumb hooks for
  item gaps, trigger styling, glyph sizing, truncation, responsive branch
  visibility, and drawer link layout.
- `radcn/packages/radcn/src/styles/index.ts` was regenerated from
  `tokens.css`.

Docs, fixtures, and tests:

- `radcn/apps/docs/app/content/components.tsx` now has a rich Breadcrumb docs
  entry and live/source examples for Link, Ellipsis, Separator, Demo, Dropdown,
  and Responsive examples.
- `radcn/fixtures/scenarios/index.ts`,
  `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`, and
  `radcn/fixtures/README.md` now expose named Breadcrumb scenarios for all six
  upstream examples while preserving the existing compatibility aliases.
- `radcn/fixtures/tests/navigation-collection.spec.ts` now asserts native link
  semantics, current page semantics, hidden ellipsis text, default chevron
  separators, Slash separators, DropdownMenu trigger/menu behavior, desktop
  responsive DropdownMenu behavior, mobile responsive Drawer behavior,
  Drawer title/description/link list, outline Button-style close action, and
  truncation hooks.
- `breadcrumb-example-inventory.md`, `resolved-clusters.json`, and the
  regenerated `parity-inventory.md` now mark `breadcrumb` resolved. The next
  first recommended cluster is `Example parity for carousel`.

Verification run:

- `pnpm radcn:typecheck` passed.
- `pnpm --dir radcn/apps/docs typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts`
  passed: 9 passed.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  passed: 5 passed.
- `node scripts/audit-shadcn-parity.mjs` passed and regenerated
  `parity-inventory.md`.
- The parity inventory idempotence check passed:
  ```text
  tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status
  ```
  Output:
  ```text
  wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
  ```
- Deterministic Node checks confirmed:
  - all 6 upstream Breadcrumb example ids appear exactly once in
    `breadcrumb-example-inventory.md`;
  - all 6 Breadcrumb example rows have final outcome `Covered`;
  - `resolved-clusters.json` includes `slug = "breadcrumb"`,
    `status = "resolved"`, and evidence for Experiment 25, Experiment 26, and
    `breadcrumb-example-inventory.md`;
  - `radcn/packages/radcn/src/styles/index.ts` exactly matches
    `tokens.css`;
  - `breadcrumb` is absent from unresolved example clusters in
    `parity-inventory.md` and the first recommended cluster is
    `Example parity for carousel`;
  - Breadcrumb docs contain labels/copy for `Demo`, `Dropdown`, `Ellipsis`,
    `Link`, `Responsive`, and `Separator`.
- Dependency-policy checks passed:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*next/|from ['\"][^'\"]*radix-ui|from ['\"][^'\"]*@radix-ui|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  rg -n '"(react|next|radix-ui|@radix-ui[^"]*|lucide-react|tailwindcss)"|publishConfig|npm publish|pnpm publish' package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json
  ```
  Both exited 1 with no matches, as expected.
- `git diff --check` passed with no output.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  printed no output.

Known verification note: the first Playwright run exposed a test assertion bug.
The label+chevron trigger's chevron is `aria-hidden`, so the accessible name is
`Components`, not `Components⌄`. The test was corrected to assert the real
accessible name, and the rerun passed.

## Conclusion

Breadcrumb example parity is resolved. The package now aligns with shadcn's
chevron-style default separator while preserving app-owned Slash or icon
separator children. Dropdown and responsive examples remain app composition
over RadCN primitives rather than Breadcrumb-owned state. The next experiment
should follow the regenerated recommendation and audit example parity for
`carousel`.

## Completion Review

Reviewer: Rawls (`019e9b07-a92c-7a81-86ba-773b71391002`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Review result: approved. Rawls confirmed the completed result matches the
approved scope; the experiment has `## Result` and `## Conclusion`; the Issue
4 README marks Experiment 26 as `Pass` and records later-work learnings;
`breadcrumb-example-inventory.md` covers all six upstream rows;
`resolved-clusters.json` marks `breadcrumb` resolved with Experiment 25,
Experiment 26, and inventory evidence; the package default separator preserves
author-supplied children; style hooks are present; fixture and Playwright
coverage exercise the six Breadcrumb families, dropdown, responsive drawer,
links, current page, separators, and truncation; typechecks and Playwright
checks pass; the parity audit passes; `git diff --check` passes; dependency
source and manifest checks return no matches; vendor status is clean; no nested
git repositories outside `vendor/` were found; and the result commit had not
been made before review.
