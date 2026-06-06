# Experiment 74: Implement sheet example parity depth

## Description

Experiment 73 audited the two active upstream Sheet examples and found the
cluster is partial because RadCN has generic Sheet package, fixture, and
Playwright proof but no named evidence for:

- `sheet-demo`
- `sheet-side`

This experiment should resolve the Sheet example cluster by adding named docs,
candidate fixture routes, and Playwright coverage for both examples. The audit
did not identify a required package API change: RadCN already owns reusable
Sheet modal and side behavior, while Button, Input, Label, form layout, submit
actions, repeated side mapping, React props, Radix/Dialog primitives, `asChild`,
Tailwind utilities, `className`, `data-slot`, `cn`, and vendor source are
app/docs composition or mapping details.

RadCN should not add React, Radix/Dialog primitives, `asChild`, Tailwind, `cn`,
Button/Input/Label dependencies, layout/form dependencies, or vendor
dependencies for Sheet parity. DOM equivalence is not required; the examples
need equivalent user-facing behavior, accessibility, visual modifiability, and
author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Sheet from the generic registry preview to an authored rich docs
    page if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Sheet example ids using
    `data-radcn-docs-sheet-family`.
  - Demonstrate `sheet-demo` with:
    - trigger text `Open` styled through RadCN Button composition or a
      documented equivalent;
    - default right-side content;
    - title `Edit profile`;
    - description `Make changes to your profile here. Click save when you're done.`;
    - two labelled inputs with ids or deterministic equivalents for
      `sheet-demo-name` and `sheet-demo-username`;
    - default values `Pedro Duarte` and `@peduarte`;
    - footer actions `Save changes` and `Close`;
    - close behavior evidence, modal hooks, and public Sheet hooks.
  - Demonstrate `sheet-side` with:
    - four triggers labelled `top`, `right`, `bottom`, and `left`;
    - each trigger opening content with matching `side`;
    - title/description matching upstream profile copy;
    - two profile inputs labelled `Name` and `Username` with values
      `Pedro Duarte` and `@peduarte`;
    - footer `Save changes` close action;
    - deterministic unique ids instead of upstream duplicate fixed ids where
      needed for valid documents;
    - public Sheet hooks and side evidence for all four sides.
  - Include mapping copy for React props, Radix/Dialog primitives, `asChild`,
    `className`, `data-slot`, Tailwind utilities, `cn`, Button composition,
    Input composition, Label composition, layout grids, form actions,
    `SHEET_SIDES`, React keys, repeated/fixed ids, `SheetClose asChild`,
    default values, side values, close behavior, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/sheet.tsx`
  Add named Sheet fixture routes for `demo` and `side`, preserving existing
  generic Sheet routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/modal-variants.spec.ts`.
  - Verify `sheet/demo` exposes public Sheet hooks, exact trigger text, title,
    description, labels, input ids/default values, footer actions, right-side
    content, modal role/ARIA wiring, focus behavior, close behavior, and focus
    restoration.
  - Verify `sheet/side` exposes four triggers labelled `top`, `right`,
    `bottom`, and `left`; opens each matching side; proves profile copy, labels,
    values, footer close action, side placement, modal role/ARIA wiring, focus
    behavior, close behavior, and focus restoration for each side.
  - Keep existing generic Sheet behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `sheet-demo` and `sheet-side`.
  - Assert rendered Sheet, trigger, portal/overlay/content, header, title,
    description, footer, close controls, side values, Button/Input/Label
    composition evidence, and layout evidence.
  - Assert the required mapping copy without requiring DOM equivalence with
    shadcn/ui.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/sheet-example-inventory.md`.
  - Change `sheet-demo` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Change `sheet-side` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Record final decisions for trigger mapping, Button/Input/Label
    composition, profile copy, input ids/default values, side values, repeated
    side mapping, valid unique ids, close behavior, public hooks, custom layout
    evidence, and upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `sheet` as a resolved example cluster only after both example rows are
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Sheet example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn` unless implementation discovers a real
  package-level gap that is necessary for the two named examples. If such a gap
  appears, record it in the result before changing package code.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture modal coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts modal-variants.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Sheet example ids appear
  exactly once in `sheet-example-inventory.md`, and both are `Covered` or an
  explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/sheet-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['sheet-demo', 'sheet-side']
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== expected.length
  for (const id of expected) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      (!row[0][0].includes('| Covered |') &&
        !row[0][0].includes('| Intentional divergence |'))
    ) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!expected.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "sheet"`, `status = "resolved"`, and evidence
  for Experiment 73, Experiment 74, and `sheet-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `sheet` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for sheet`.
- Fixture tests assert:
  - named Sheet routes expose public RadCN hooks;
  - `sheet/demo` proves exact trigger text, title, description, input labels,
    input values, footer actions, right-side content, modal ARIA/focus
    behavior, close behavior, and focus restoration;
  - `sheet/side` proves all four trigger labels, matching side values,
    profile copy, input labels, input values, footer close action, modal
    ARIA/focus behavior, side placement, close behavior, and focus restoration;
  - existing generic Sheet behavior tests still pass.
- Docs coverage asserts the Sheet page renders stable evidence for both named
  docs examples and source/API text mentions the required mapping copy.
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
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name === 'class-variance-authority' ||
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
  ```
- A deterministic manifest check proves no forbidden dependencies exist in the
  current RadCN manifests, and the lockfile remains unchanged because this
  experiment should not add dependencies:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'package.json',
    'radcn/package.json',
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ].filter((file) => fs.existsSync(file))
  const forbidden = [
    'react',
    'react-dom',
    'radix-ui',
    '@radix-ui/',
    'tailwindcss',
    '@tailwindcss/vite',
    '@tailwindcss/postcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      const deps = json[field] || {}
      for (const name of Object.keys(deps)) {
        if (
          forbidden.includes(name) ||
          forbidden.some((prefix) => prefix.endsWith('/') && name.startsWith(prefix))
        ) {
          console.log(`${file}: ${field}.${name}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  ```
- `git diff --check`
- `git status --short` shows only expected experiment result changes before
  the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either upstream Sheet example remains `Partial` or `Missing` without a
  recorded intentional divergence.
- Docs, fixtures, or tests omit the named profile or four-side compositions.
- `sheet-side` covers fewer than all four upstream side values.
- The implementation adds React, Radix/Dialog primitives, Tailwind, `cn`,
  `class-variance-authority`, Button/Input/Label dependencies, layout/form
  dependencies, or vendor source as package/app dependencies.
- The implementation marks `sheet` resolved without docs, fixture, and
  Playwright evidence for both named examples.
- The experiment changes unrelated component clusters or skips the regenerated
  parity inventory.

## Design Review

Reviewer: Aristotle the 2nd (`019e9cf6-4caa-7e13-bf7e-0b6ad36bea9e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 74 as `Designed`, the required sections are present, scope follows
Experiment 73's conclusion, both upstream Sheet examples and all four
`sheet-side` values are covered by the plan, verification has concrete
pass/fail criteria and hygiene checks, no implementation started before the
plan commit, vendor checkouts are clean, and no blockers remain.

## Result

**Result:** Pass

Implemented named Sheet example parity for `sheet-demo` and `sheet-side`.
The docs page now renders rich Sheet examples with stable
`data-radcn-docs-sheet-family` hooks, exact upstream profile copy, `Open` and
four side triggers, labelled `Name` and `Username` inputs with Pedro Duarte
values, footer actions, all public Sheet part hooks, source snippets, and
mapping copy for React/Radix/Dialog, `asChild`, Tailwind, `cn`, `data-slot`,
Button/Input/Label composition, repeated side mapping, valid unique ids, and
vendor source.

Candidate fixtures now expose `/fixtures/sheet/demo` and
`/fixtures/sheet/side`. Fixture Playwright coverage proves modal role/ARIA
wiring, focus behavior, side placement, footer close behavior, focus
restoration, exact profile copy, labels, input ids/default values, and all four
side values while preserving the existing generic Sheet behavior tests.

Implementation discovered one real package-level Sheet gap. The shared
`.radcn-sheet-close` style made every authored `SheetClose` icon-sized and
absolute-positioned at the top-right of the Sheet content, so footer close
actions overlaid the default close affordance and intercepted clicks. The
package now keeps `data-radcn-sheet-close` and `.radcn-sheet-close` as behavior
hooks, adds `.radcn-sheet-close--icon` to the default direct child close
button, and scopes icon sizing, placement, and icon hover styling to that
modifier. Authored footer `SheetClose` controls can now use normal Button
composition.

`sheet-example-inventory.md` now marks both upstream Sheet rows `Covered`,
`resolved-clusters.json` records `sheet` as resolved, and
`parity-inventory.md` now recommends example parity for `skeleton` next.

Verification:

- `pnpm radcn:typecheck` — pass.
- `pnpm --dir radcn/apps/docs typecheck` — pass.
- `pnpm fixtures:candidate:typecheck` — pass.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts modal-variants.spec.ts`
  — pass, 7 passed. The named Sheet tests assert default close controls use
  `.radcn-sheet-close--icon` with absolute positioning and footer
  `SheetClose` controls are static, wider than 2rem text buttons.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — pass, 5 passed. Docs coverage asserts the same default-icon versus
  footer-close positioning contract on the public Sheet page.
- `node scripts/audit-shadcn-parity.mjs` — pass; regenerated
  `parity-inventory.md`.
- Sheet inventory deterministic check — pass; `sheet-demo` and `sheet-side`
  each appear once and are `Covered`.
- Resolved-cluster deterministic check — pass; `sheet` has status `resolved`
  and evidence for Experiment 73, Experiment 74, and
  `sheet-example-inventory.md`.
- Parity recommendation check — pass; `sheet` is absent from unresolved
  example clusters and the first recommended cluster is `skeleton`.
- Forbidden import check — pass; checked 135 TypeScript/JavaScript files under
  package, docs, and candidate fixture roots.
- Manifest dependency check — pass; checked 4 manifests and found no forbidden
  React, Radix, Tailwind, class-variance-authority, or vendor dependencies.
- `git diff --exit-code -- pnpm-lock.yaml` — pass; lockfile unchanged.
- `git diff --check` — pass.
- Vendor cleanliness loop for `vendor/shadcn-ui`, `vendor/remix`, and
  `vendor/react-router` — pass; no output.

Known warnings: Playwright web servers still print the existing Node
`module.register()` deprecation warning and the existing `NO_COLOR` /
`FORCE_COLOR` warning. These warnings were present before this experiment and
did not affect the pass/fail result.

## Conclusion

Sheet example parity is resolved. The important cross-component lesson is that
part classes used by both default affordances and authored controls must not
force placement globally; placement belongs to the default direct-child
affordance or an explicit composition wrapper. The next Issue 4 experiment
should audit upstream `skeleton` examples, which is the regenerated parity
inventory's first recommendation.

## Completion Review

Reviewer: Erdos the 2nd (`019e9d0a-b28d-7d51-947e-99f592759401`),
fresh-context Codex subagent (`fork_context: false`).

Initial findings:

- Blocker: `.radcn-sheet-close` still owned 2rem icon sizing, so authored
  footer `SheetClose` controls were clickable but still styled as icon buttons.
  Required fix: split default icon close styling from authored close behavior
  and add coverage proving footer close controls are not 2rem icon buttons.
- Major: none.
- Minor: none.

Fixes:

- Added `.radcn-sheet-close--icon` to the default direct child close button in
  `SheetContent`.
- Reduced `.radcn-sheet-close` to the shared close behavior hook and moved icon
  sizing, absolute positioning, icon presentation, and icon hover styling to
  `.radcn-sheet-close--icon`.
- Added fixture and docs Playwright assertions that the default close is
  icon-positioned while footer `SheetClose` controls are static text buttons.
- Reran affected package/docs/fixture typechecks, fixture modal Playwright,
  docs coverage Playwright, diff hygiene, lockfile, and vendor checks.

Re-review result: approved. The reviewer confirmed the prior blocker is
resolved, no new blocker was introduced, `git diff --check` passed, and no
major or minor findings remain.
