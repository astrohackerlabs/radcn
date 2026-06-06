# Experiment 46: Implement dropdown-menu example parity depth

## Description

Experiment 45 audited the four upstream shadcn/ui New York v4 Dropdown Menu
examples and found the cluster is still partial. RadCN has strong Dropdown Menu
primitive mechanics already, but lacks named docs/fixture/Playwright evidence
for:

- `dropdown-menu-checkboxes`
- `dropdown-menu-demo`
- `dropdown-menu-dialog`
- `dropdown-menu-radio-group`

This experiment implements that missing proof while preserving Dropdown Menu as
a web-first overlay/menu primitive. It should compose existing RadCN Button,
Dropdown Menu, Dialog, Field, Input, Textarea, Label, and supporting primitives
rather than introducing React, Radix, `lucide-react`, Tailwind, vendor imports,
or new Dropdown Menu package APIs unless a direct blocker is discovered and
recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Dropdown Menu rich docs page and source snippet.
  - Render stable docs hooks for all four upstream Dropdown Menu example ids
    using `data-radcn-docs-dropdown-menu-family`.
  - Demonstrate `dropdown-menu-demo`: My Account menu, trigger, labels,
    groups, separators, shortcut text, disabled API item, Invite users submenu,
    and logout item.
  - Demonstrate `dropdown-menu-checkboxes`: Appearance menu, Status Bar,
    disabled Activity Bar, Panel checkbox items, checked/unchecked indicators,
    and explicit app-owned state copy.
  - Demonstrate `dropdown-menu-radio-group`: Panel Position menu with
    top/bottom/right radio items and bottom selected by default.
  - Demonstrate `dropdown-menu-dialog`: icon-style File Actions trigger,
    end-aligned menu, New File and Share actions, disabled Download item, and
    RadCN Dialog composition with Field/Input/Textarea content.
  - Explain mappings from shadcn React `useState`, `onCheckedChange`,
    `onValueChange`, `onSelect`, `modal={false}`, `Button asChild`,
    `lucide-react`, Radix primitive types, Tailwind utilities, `className`,
    `data-slot`, and vendor source to RadCN explicit props, app-owned
    enhancement/server state, non-modal menu behavior, `class`, `style`, and
    public `data-radcn-*` hooks.
- Update docs browser behavior only if the docs examples need local state.
  - Prefer server-rendered examples with clear default state.
  - If interactive local state is needed, add a small dependency-free
    enhancement to `radcn/apps/docs/app/assets/entry.ts` scoped to
    `data-radcn-docs-dropdown-menu-family`; do not create a general package
    state API.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/menu-overlays.tsx`
  - `radcn/fixtures/candidate-remix/app/assets/entry.ts`, only for
    fixture-owned local state or menu-to-dialog coordination.
  Add named Dropdown Menu fixture routes for `demo`, `checkboxes`,
  `radio-group`, and `dialog`. Preserve existing generic Dropdown Menu and
  Context Menu routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/menu-overlays.spec.ts`.
  - Verify `dropdown-menu/demo` exposes the full My Account composition,
    opens from click and keyboard, renders label/group/separator/shortcut
    hooks, skips the disabled API item, opens the Invite users submenu by
    pointer and keyboard, and closes after item activation.
  - Verify `dropdown-menu/checkboxes` exposes the Appearance menu, initial
    Status Bar checked state, disabled Activity Bar behavior, Panel toggling,
    indicator updates, close-on-select, and stable public hooks.
  - Verify `dropdown-menu/radio-group` exposes the Panel Position menu, bottom
    selected by default, top/right selection updates, indicator updates,
    close-on-select, and stable public hooks.
  - Verify `dropdown-menu/dialog` opens the File Actions menu, keeps body
    overflow unlocked for non-modal menu behavior, opens Create New File and
    Share File dialogs from menu item activation, focuses dialog fields,
    renders field/input/textarea hooks, closes dialogs through cancel buttons,
    and keeps Download disabled.
  - Keep existing generic Dropdown Menu and Context Menu behavior tests
    passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all four named Dropdown Menu examples.
  - Assert rendered evidence for Dropdown Menu, Dialog, Field, Input,
    Textarea, labels, groups, separators, shortcuts, checkbox items, radio
    items, submenu, disabled item, non-modal menu behavior, app-owned state,
    `class`, `style`, public hooks, React `useState`, `onCheckedChange`,
    `onValueChange`, `onSelect`, `modal={false}`, `Button asChild`,
    `lucide-react`, Radix, Tailwind, `className`, `data-slot`, and no vendor
    dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/dropdown-menu-example-inventory.md`.
  - Change all four Dropdown Menu rows to `Covered` only after package/docs/
    fixture/Playwright evidence exists.
  - Record final API decisions for checkbox/radio persistence, menu-to-dialog
    composition, icon presentation, non-modal behavior, public hooks, and
    app-owned state.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `dropdown-menu` as a resolved example cluster with evidence from
    Experiments 45 and 46 plus `dropdown-menu-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Dropdown Menu example
  outcome and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/dropdown-menu.tsx` or
  Dropdown Menu package APIs unless implementation discovers and records a
  direct blocker in the current primitive.

## Verification

Pass criteria:

- Package, docs, and fixture checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright menu coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menu-overlays.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all four upstream Dropdown Menu example ids
  appear exactly once in `dropdown-menu-example-inventory.md` and every row is
  `Covered` or `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/dropdown-menu-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'dropdown-menu-checkboxes',
    'dropdown-menu-demo',
    'dropdown-menu-dialog',
    'dropdown-menu-radio-group',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== ids.length
  for (const id of ids) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      (!row[0][0].includes('| Covered |') && !row[0][0].includes('| Intentional divergence |'))
    ) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!ids.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "dropdown-menu"`, `status = "resolved"`, and
  evidence for Experiment 45, Experiment 46, and
  `dropdown-menu-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `dropdown-menu` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for dropdown-menu`.
- Fixture tests assert:
  - all four named Dropdown Menu routes expose public RadCN hooks;
  - demo route proves dense menu composition, submenu behavior, shortcuts,
    disabled item skip, keyboard opening, and close-on-select;
  - checkboxes route proves initial checked state, disabled checkbox behavior,
    toggling, indicators, and close-on-select;
  - radio-group route proves initial selected value, selection updates,
    indicators, and close-on-select;
  - dialog route proves menu-to-dialog composition, non-modal menu behavior,
    disabled Download behavior, Dialog focus, field/input/textarea hooks, and
    cancel close behavior;
  - existing generic Dropdown Menu and Context Menu tests still pass.
- Docs coverage asserts the Dropdown Menu page renders stable evidence for all
  four named docs examples and source/API text mentions the required mapping
  copy.
- Dependency and scope checks pass:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const path = require('path')
  const roots = ['radcn/packages/radcn', 'radcn/apps/docs', 'radcn/fixtures/candidate-remix']
  function forbiddenImport(name) {
    return (
      name === 'react' ||
      name === 'react-dom' ||
      name === 'lucide-react' ||
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name.startsWith('@tailwindcss/') ||
      name.includes('/vendor/') ||
      name.startsWith('../vendor/')
    )
  }
  const files = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.[cm]?[tj]sx?$/.test(entry.name)) files.push(full)
    }
  }
  for (const root of roots) walk(root)
  let failed = false
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    for (const match of text.matchAll(/^\s*import(?:\s+type)?[\s\S]*?\sfrom\s+['"]([^'"]+)['"]/gm)) {
      if (forbiddenImport(match[1])) {
        console.log(`${file}: forbidden import ${match[1]}`)
        failed = true
      }
    }
  }
  if (failed) process.exit(1)
  NODE

  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'package.json',
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ]
  function forbiddenPackage(name) {
    return (
      name === 'react' ||
      name === 'react-dom' ||
      name === 'lucide-react' ||
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name.startsWith('@tailwindcss/')
    )
  }
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const key of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[key] || {})) {
        if (forbiddenPackage(name)) {
          console.log(`${file}: forbidden dependency ${name}`)
          failed = true
        }
      }
    }
    if (json.publishConfig) {
      console.log(`${file}: publishConfig is out of scope for Issue 4`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.
- `git status --short` shows only expected files before the plan/result
  commits.

Failure criteria:

- The implementation marks `dropdown-menu` resolved without named docs,
  fixture, and Playwright evidence for all four upstream example ids.
- The implementation adds React, React DOM, Radix, `lucide-react`, Tailwind, or
  vendor dependencies.
- The implementation changes Dropdown Menu package APIs without a recorded
  blocker and review.
- The implementation conflates package-owned menu behavior with app-owned
  checkbox/radio persistence, menu-to-dialog effects, icon presentation,
  dialog form values, or custom styling decisions.

## Design Review

Reviewer: Pauli the 2nd (`019e9bd0-9f98-7c11-ada4-da87f7ba0b82`)
with fresh context (`fork_context: false`) for the initial review.

Findings:

- Major: The dependency hygiene checks enforced the no React/React DOM/
  `lucide-react`/vendor policy but did not fail on Radix or Tailwind package
  imports/dependencies even though the experiment scope forbids those
  dependencies too.

Fix:

- Updated the verification scripts to fail on `radix-ui`, `@radix-ui/*`,
  `tailwindcss`, and `@tailwindcss/*` in both source import checks and
  manifest dependency checks, while preserving the intended scope of
  `radcn/packages/radcn`, `radcn/apps/docs`, and
  `radcn/fixtures/candidate-remix`.

Re-review: Approved. The reviewer confirmed the hygiene gap is resolved and no
blocker remains.

Approval: Approved for plan commit.

## Result

**Result:** Pass

Implemented named Dropdown Menu example parity for all four upstream examples:

- `dropdown-menu-checkboxes`
- `dropdown-menu-demo`
- `dropdown-menu-dialog`
- `dropdown-menu-radio-group`

The implementation added an authored Dropdown Menu docs page with stable
`data-radcn-docs-dropdown-menu-family` hooks, candidate fixture routes for the
four examples, fixture Playwright coverage, docs Playwright coverage, covered
inventory rows, a resolved `dropdown-menu` example cluster entry, and a
regenerated parity inventory. The regenerated inventory now recommends
`input-otp` as the next example parity audit.

Implementation uncovered one concrete package-level blocker: menu content
`align`, `side`, and `sideOffset` props were rendered as data attributes but
`setupMenuOverlay` initialized from setup defaults instead of the content data
attributes. This made the named `dropdown-menu-dialog` end-aligned menu behave
as start-aligned after enhancement. The experiment fixed
`radcn/packages/radcn/src/utils/menu-overlay.ts` so menu overlay positioning
uses content `data-align`, `data-side`, and `data-side-offset` when present.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menu-overlays.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

Results:

```text
pnpm radcn:typecheck: pass
pnpm --dir radcn/apps/docs typecheck: pass
pnpm fixtures:candidate:typecheck: pass
menu-overlays.spec.ts: 8 passed
coverage.spec.ts: 5 passed
```

Known warnings during Playwright runs:

```text
[DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
```

Deterministic checks passed:

```text
dropdown-menu-example-inventory.md contains exactly one Covered row for each of
dropdown-menu-checkboxes, dropdown-menu-demo, dropdown-menu-dialog, and
dropdown-menu-radio-group.

resolved-clusters.json contains examples/dropdown-menu with status resolved and
evidence for Experiment 45, Experiment 46, and dropdown-menu-example-inventory.md.

parity-inventory.md no longer lists dropdown-menu in Unresolved Example
Clusters, and First Recommended Cluster is now Example parity for input-otp.

The scoped import/dependency checks found no React, React DOM, Radix,
lucide-react, Tailwind, or vendor dependencies/imports in radcn/packages/radcn,
radcn/apps/docs, or radcn/fixtures/candidate-remix.

git diff --check passed.

for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
printed no output.
```

## Conclusion

Dropdown Menu example parity is resolved. The next experiment should audit the
upstream `input-otp` example cluster recommended by the regenerated parity
inventory.

## Completion Review

Reviewer: Ramanujan the 2nd (`019e9bdd-d82d-70d0-92d5-bed4b9e572df`) with
fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the
implementation matches the approved scope, the `setupMenuOverlay` utility
change is justified by the recorded package-level positioning blocker and does
not add a package API, verification commands and deterministic checks pass,
vendor cleanliness was checked, the result commit had not yet been made, and
the Issue 4 README records the matching `Pass` status and `input-otp` next
recommendation.
