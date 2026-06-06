# Experiment 44: Implement combobox example parity depth

## Description

Experiment 43 audited the four upstream shadcn/ui New York v4 Combobox examples
and found the cluster is still partial. RadCN has strong Combobox primitive
mechanics already, but lacks named docs/fixture/Playwright evidence for:

- `combobox-demo`
- `combobox-dropdown-menu`
- `combobox-popover`
- `combobox-responsive`

This experiment implements that missing proof while preserving Combobox as a
web-first searchable-listbox primitive. It should compose existing RadCN
Button, Combobox, Command, Dropdown Menu, Popover, and Drawer primitives rather
than introducing React, `lucide-react`, Tailwind, upstream `useMediaQuery`,
vendor imports, or new Combobox package APIs unless a direct blocker is
discovered and recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Combobox rich docs page and source snippet.
  - Render stable docs hooks for all four upstream Combobox example ids using
    `data-radcn-docs-combobox-family`.
  - Demonstrate `combobox-demo`: framework trigger/placeholder, searchable
    option list, selected indicator, decorative trigger glyph, and
    close-on-select behavior.
  - Demonstrate `combobox-dropdown-menu`: a task/status row with current label,
    Dropdown Menu actions, submenu label picker, searchable filtering, and
    selected label presentation as app-owned state.
  - Demonstrate `combobox-popover`: status selector with side/align popover or
    equivalent direct Combobox placement, searchable statuses, label
    persistence, and close-on-select behavior.
  - Demonstrate `combobox-responsive`: desktop popover branch and mobile drawer
    branch sharing a searchable status list.
  - Explain mappings from shadcn React `useState`, `onSelect`,
    `Button asChild`, `Command`, `Popover`, `DropdownMenu`, `Drawer`,
    `useMediaQuery`, `lucide-react`, Tailwind utilities, `className`,
    `data-slot`, and vendor source to RadCN explicit primitives, `class`,
    `style`, public hooks/classes, CSS breakpoints or dependency-free browser
    enhancement, native form/server state, and app-owned icons/labels.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/combobox.tsx`
  Add named Combobox fixture routes for `demo`, `dropdown-menu`, `popover`,
  and `responsive`. Preserve existing generic Combobox routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/combobox-command.spec.ts`.
  - Verify `combobox/demo` exposes `role="combobox"`, filters frameworks,
    selects an item, shows selected indicator/state, syncs submitted value or
    app-owned label state, hides after selection, and exposes public hooks.
  - Verify `combobox/dropdown-menu` opens a dropdown-menu submenu, filters label
    choices, selects a label, updates the visible label badge, closes the menu,
    and keeps Dropdown Menu and searchable-listbox hooks visible to tests.
  - Verify `combobox/popover` opens side/align status content, filters statuses,
    selects a status, updates the trigger label, closes after selection, and
    exposes Popover or Combobox placement hooks.
  - Verify `combobox/responsive` at desktop viewport shows the popover branch
    and hides the drawer branch, while a mobile viewport shows the drawer
    branch and hides the popover branch; both branches must expose the shared
    searchable status list and selected label behavior.
  - Keep existing generic Combobox and Command behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all four named Combobox examples.
  - Assert docs/source text for `Combobox`, `ComboboxInput`,
    `ComboboxItem`, `DropdownMenu`, `Popover`, `Drawer`, `Command`,
    `class`, `style`, public `data-radcn-*` hooks, React `useState`,
    `onSelect`, `Button asChild`, `useMediaQuery`, `lucide-react`, Tailwind,
    `className`, `data-slot`, app-owned label/state, and no vendor dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/combobox-example-inventory.md`.
  - Change all four Combobox rows to `Covered` only after package/docs/
    fixture/Playwright evidence exists.
  - Record final API decisions for app-owned labels, icon presentation,
    responsive branch selection, menu/popover/drawer composition, and
    `combobox-form` remaining adjacent Form/Combobox evidence.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `combobox` as a resolved example cluster with evidence from Experiments
    43 and 44 plus `combobox-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Combobox example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/combobox.tsx` or Combobox
  package APIs unless implementation discovers and records a direct blocker in
  the current primitive.

## Verification

Pass criteria:

- Package, docs, and fixture checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright Combobox/Command coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts combobox-command.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all four upstream Combobox example ids
  appear exactly once in `combobox-example-inventory.md` and every row is
  `Covered` or `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/combobox-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'combobox-demo',
    'combobox-dropdown-menu',
    'combobox-popover',
    'combobox-responsive',
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
  `examples` entry with `slug = "combobox"`, `status = "resolved"`, and
  evidence for Experiment 43, Experiment 44, and
  `combobox-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `combobox` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for combobox`.
- Fixture tests assert:
  - all four named Combobox routes expose public RadCN hooks;
  - demo route proves filtering, selected state, placeholder/label behavior,
    selected indicator, and close-on-select;
  - dropdown-menu route proves searchable submenu composition and app-owned
    selected label update;
  - popover route proves side/align status picker composition;
  - responsive route proves separate desktop popover and mobile drawer branches;
  - existing generic Combobox and Command tests still pass.
- Docs coverage asserts the Combobox page renders stable evidence for all four
  named docs examples and source/API text mentions the required mapping copy.
- Dependency and scope checks pass:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const path = require('path')
  const roots = ['radcn/packages/radcn', 'radcn/apps/docs', 'radcn/fixtures/candidate-remix']
  const forbiddenImports = new Set(['react', 'react-dom', 'lucide-react'])
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
      if (forbiddenImports.has(match[1]) || match[1].includes('/vendor/') || match[1].startsWith('../vendor/')) {
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
  const forbidden = new Set(['react', 'react-dom', 'lucide-react'])
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const key of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[key] || {})) {
        if (forbidden.has(name)) {
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

Failure criteria:

- Any of the four upstream Combobox example ids remains `Partial` or `Missing`
  without a recorded intentional divergence.
- The implementation treats React, `lucide-react`, Tailwind, upstream
  `useMediaQuery`, upstream `Command`, upstream `Popover`, upstream
  `DropdownMenu`, upstream `Drawer`, or vendor source as RadCN package
  dependencies.
- The implementation changes Combobox package APIs without recording a direct
  blocker and updating docs/fixtures/tests for that API.
- The responsive example only tests one viewport or only proves static markup
  without demonstrating the desktop/mobile branch behavior.
- The dropdown-menu example proves Dropdown Menu and Combobox separately but
  not the searchable submenu composition.
- The inventory marks `combobox-form` as resolved by this cluster without
  recording why it is outside the active four-example combobox cluster.

## Design Review

Reviewer: Franklin the 2nd (`019e9bb1-bf1f-7b31-b498-d0baebeb2f22`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Franklin the 2nd confirmed that the issue README
links Experiment 44 as `Designed`, the experiment has Description, Changes,
Verification, and Design Review sections, the scope is one coherent
implementation-depth cluster with exactly the four active Combobox example ids,
`combobox-form` is kept as adjacent evidence rather than a fifth row,
verification has concrete typecheck, Playwright, deterministic inventory,
resolved-cluster, dependency, `git diff --check`, and vendor status checks, the
plan avoids React, `lucide-react`, Tailwind, upstream `useMediaQuery`, vendor
dependencies, and package API churn unless a direct blocker is recorded, and
the dropdown submenu plus responsive behavior are tested as real compositions
rather than isolated primitives.

## Result

**Result:** Pass

Implemented named Combobox example parity depth for all four upstream examples:

- `combobox-demo`
- `combobox-dropdown-menu`
- `combobox-popover`
- `combobox-responsive`

The implementation preserved the existing `radcn/combobox` package API. It
added a rich Combobox docs page with stable named hooks, candidate fixture
routes for the four upstream examples, fixture-local dependency-free label
enhancement for app-owned selected labels, and Playwright coverage for
searchable framework selection, a searchable Dropdown Menu label submenu, a
side-positioned status Popover, and desktop Popover/mobile Drawer responsive
branches. The mobile Drawer branch uses a RadCN Combobox for the searchable
status list so it keeps the same user-facing responsive behavior without React
or upstream `useMediaQuery`.

Updated `combobox-example-inventory.md` to mark all four examples `Covered`,
added `combobox` to `resolved-clusters.json`, regenerated
`parity-inventory.md`, and recorded the next recommendation as
`dropdown-menu`.

Verification:

- `pnpm radcn:typecheck`: pass.
- `pnpm --dir radcn/apps/docs typecheck`: pass.
- `pnpm fixtures:candidate:typecheck`: pass.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts combobox-command.spec.ts`:
  pass; 9 passed. The known Node `module.register()` deprecation warning was
  printed by the dev server/test runner.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`:
  pass; 5 passed. The known Node `module.register()` deprecation warning was
  printed by the dev server/test runner.
- Deterministic `combobox-example-inventory.md` row/status check: pass. It
  reported exactly one `Covered` row for each of `combobox-demo`,
  `combobox-dropdown-menu`, `combobox-popover`, and `combobox-responsive`.
- Deterministic `resolved-clusters.json` check: pass. It found
  `slug = "combobox"`, `status = "resolved"`, and evidence for Experiments 43
  and 44 plus `combobox-example-inventory.md`.
- Deterministic `parity-inventory.md` check: pass. `combobox` is no longer in
  unresolved example clusters, and the first recommendation is no longer
  `Example parity for combobox`; it is now `Example parity for dropdown-menu`.
- Forbidden import/dependency checks for React, React DOM, `lucide-react`, and
  vendor imports: pass.
- Publish-scope manifest check: pass; no checked manifest has `publishConfig`.
- `git diff --check`: pass.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`:
  pass; no output.

## Conclusion

Combobox example parity is resolved. Later component clusters should reuse the
same pattern for composed shadcn examples: preserve the package primitive when
it is sufficient, add named docs/fixture/Playwright proof for the upstream
example ids, keep app-owned selected labels in scoped dependency-free
enhancement when needed, and record responsive React hook examples as CSS
breakpoints or app enhancement rather than package dependencies.

The next experiment should audit `dropdown-menu` example parity, as recommended
by the regenerated parity inventory.

## Completion Review

Reviewer: Einstein the 2nd (`019e9bc4-588a-71b1-a52c-dffe6932884d`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Einstein the 2nd confirmed that the implementation
matches the approved scope, all four active Combobox rows are `Covered`,
`combobox-form` remains adjacent evidence rather than a fifth row, Result and
Conclusion are recorded, the issue README marks Experiment 44 as `Pass` and
records the learning plus next `dropdown-menu` recommendation, docs coverage
asserts all four hooks and mapping copy, fixture tests exercise the searchable
Dropdown Menu submenu and responsive desktop/mobile branches, no Combobox
package API or manifest churn occurred, the result commit had not been made
before review, all three typechecks passed, fixture Playwright passed 9/9, docs
Playwright passed 5/5, deterministic inventory/dependency checks passed,
`git diff --check` passed, and vendor status checks produced no output.
