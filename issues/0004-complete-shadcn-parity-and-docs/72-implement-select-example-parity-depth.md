# Experiment 72: Implement select example parity depth

## Description

Experiment 71 audited the two active upstream Select examples and found the
cluster is partial because RadCN has generic Select package, docs, fixture, and
Playwright proof but no named evidence for:

- `select-demo`
- `select-scrollable`

This experiment should resolve the Select example cluster by adding named docs,
candidate fixture routes, and Playwright coverage for both examples. The audit
did not identify a required package API change: RadCN already owns the reusable
Select primitive behavior, while fruit options, timezone groups, trigger widths,
React props, Radix Select primitives, Tailwind width utilities, `className`,
`data-slot`, `cn`, lucide icons, and vendor source are app/docs composition or
mapping details.

RadCN should not add React, Radix Select primitives, `lucide-react`, Tailwind,
`cn`, `class-variance-authority`, or vendor dependencies for Select parity. DOM
equivalence is not required; the examples need equivalent user-facing behavior,
accessibility, visual modifiability, and author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Select from the generic registry preview to an authored rich docs
    page if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Select example ids using
    `data-radcn-docs-select-family`.
  - Demonstrate `select-demo` with:
    - trigger width evidence equivalent to `w-[180px]`;
    - placeholder `Select a fruit`;
    - one `Fruits` group label;
    - five options and values: Apple/apple, Banana/banana,
      Blueberry/blueberry, Grapes/grapes, Pineapple/pineapple;
    - selectable value display, selected item indicator, and public Select
      hooks.
  - Demonstrate `select-scrollable` with:
    - trigger width evidence equivalent to `w-[280px]`;
    - placeholder `Select a timezone`;
    - five group labels: North America, Europe & Africa, Asia,
      Australia & Pacific, and South America;
    - all 27 timezone options and values from the upstream source;
    - scroll up/down buttons, scrollable viewport evidence, selected item
      indicator, keyboard/typeahead behavior evidence, and public Select hooks.
  - Include mapping copy for React props, Radix `SelectPrimitive`, portal
    behavior, `className`, `data-slot`, Tailwind utilities, `cn`, lucide
    `CheckIcon`, `ChevronDownIcon`, and `ChevronUpIcon`, trigger width mapping,
    app-owned option data, custom classes/styles/tokens, hidden form values,
    keyboard/typeahead behavior, scroll buttons, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/select.tsx`
  Add named Select fixture routes for `demo` and `scrollable-demo`, preserving
  existing generic Select routes.
- Update fixture Playwright coverage in `radcn/fixtures/tests/select.spec.ts`.
  - Verify `select/demo` exposes public RadCN Select hooks, exact placeholder,
    `Fruits` label, all five fruit options/values, trigger width evidence,
    opening and selection behavior, selected item indicator, hidden input value
    if a deterministic name is provided, and selected display text.
  - Verify `select/scrollable-demo` exposes public RadCN Select hooks, exact
    placeholder, all five timezone group labels, all 27 timezone options/values,
    trigger width evidence, scroll up/down buttons, scrollable viewport
    mutation, selected item indicator, keyboard/typeahead behavior within the
    timezone list, hidden input value if a deterministic name is provided, and
    selected display text.
  - Keep existing generic Select behavior tests passing.
- Update docs Playwright coverage in `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `select-demo` and `select-scrollable`.
  - Assert rendered Select, trigger, value, content/viewport, group, label,
    item, indicator, scroll button, and layout evidence.
  - Assert the required mapping copy without requiring DOM equivalence with
    shadcn/ui.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/select-example-inventory.md`.
  - Change `select-demo` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Change `select-scrollable` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Record final decisions for trigger width mapping, fruit/timezone option
    data, group labels, scroll behavior, selected indicators, hidden values,
    public hooks, custom layout evidence, and upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `select` as a resolved example cluster only after both example rows are
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Select example outcome
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
- Fixture Select coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts select.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Select example ids appear
  exactly once in `select-example-inventory.md`, and both are `Covered` or an
  explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/select-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['select-demo', 'select-scrollable']
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
  `examples` entry with `slug = "select"`, `status = "resolved"`, and evidence
  for Experiment 71, Experiment 72, and `select-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `select` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for select`.
- Fixture tests assert:
  - named Select routes expose public RadCN hooks;
  - `select/demo` proves exact placeholder, `Fruits` label, five fruit options
    and values, trigger width evidence, opening/selection behavior, selected
    item indicator, and hidden value evidence when a name is present;
  - `select/scrollable-demo` proves exact placeholder, five timezone group
    labels, all 27 timezone options and values, trigger width evidence, scroll
    buttons, native scroll mutation, keyboard/typeahead behavior, selected item
    indicator, and hidden value evidence when a name is present;
  - existing generic Select behavior tests still pass.
- Docs coverage asserts the Select page renders stable evidence for both named
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
      name === 'lucide-react' ||
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
    'lucide-react',
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

- Either upstream Select example remains `Partial` or `Missing` without a
  recorded intentional divergence.
- Docs, fixtures, or tests omit the named fruit or timezone compositions.
- `select-scrollable` covers fewer than all 27 upstream timezone options.
- The implementation adds React, Radix Select primitives, `lucide-react`,
  Tailwind, `cn`, `class-variance-authority`, or vendor source as package/app
  dependencies.
- The implementation marks `select` resolved without docs, fixture, and
  Playwright evidence for both named examples.
- The experiment changes unrelated component clusters or skips the regenerated
  parity inventory.

## Design Review

Reviewer: Bacon the 2nd (`019e9cde-d4a6-7992-adfc-a17656b4855d`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: the first review found that the manifest/lockfile verification would
  scan the whole existing `pnpm-lock.yaml` for forbidden historical markers
  that already exist outside this experiment. Fixed by requiring
  `git diff --exit-code -- pnpm-lock.yaml` because this experiment should not
  add dependencies or change the lockfile.
- Major: the first review found that the dependency guards rejected `radix-ui`
  but missed scoped packages such as `@radix-ui/react-select`. Fixed by adding
  scoped `@radix-ui/` detection to both import and manifest checks.
- Minor: none.

Approval: approved after re-review. The reviewer confirmed the design is
linked from the Issue 4 README with status `Designed`, includes required
sections, keeps scope to the two Select examples, carries forward Experiment
71's findings, requires all 27 upstream timezone options, and avoids React,
Radix, `lucide-react`, Tailwind, `cn`, `class-variance-authority`, and vendor
dependencies unless a real package gap is recorded.

## Result

**Result:** Pass

Implemented named Select example parity depth for `select-demo` and
`select-scrollable`.

The docs site now has an authored Select page that renders stable
`data-radcn-docs-select-family` hooks for both upstream examples, exact
placeholder copy, trigger width evidence, the `Fruits` label, all five fruit
options and values, all five timezone group labels, all 27 timezone options and
values, scroll button and viewport evidence, hidden values, public hooks, and
mapping copy for React/Radix/Tailwind/icon/vendor non-dependencies.

The candidate fixture app now exposes `select/demo` and
`select/scrollable-demo` routes. Playwright coverage verifies opening,
selection, selected display, selected indicators, hidden input synchronization,
scroll mutation, typeahead selection, exact option values, and the required
trigger widths. No `radcn/select` package API change was needed.

`select-example-inventory.md` now marks both active upstream Select examples
`Covered`. `resolved-clusters.json` records `select` as a resolved example
cluster, and the regenerated parity inventory recommends example parity for
`sheet` next.

Verification run:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts select.spec.ts`
  - Passed with the existing Node `module.register()` deprecation warning and
    `NO_COLOR`/`FORCE_COLOR` web-server warnings.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  - Passed with the existing Node `module.register()` deprecation warning and
    `NO_COLOR`/`FORCE_COLOR` web-server warnings.
- `node scripts/audit-shadcn-parity.mjs`
- Deterministic `select-example-inventory.md` row/status check:
  `select-demo: 1 ... | Covered |`,
  `select-scrollable: 1 ... | Covered |`.
- Deterministic `resolved-clusters.json` check for `slug = "select"`,
  `status = "resolved"`, and Experiment 71, Experiment 72, plus inventory
  evidence.
- Deterministic regenerated `parity-inventory.md` check confirmed `select` is
  absent from unresolved example clusters and the first recommendation is no
  longer `Example parity for select`.
- Dependency import guard for `radcn/packages/radcn`, `radcn/apps/docs`, and
  `radcn/fixtures/candidate-remix`.
- Manifest dependency guard for RadCN manifests.
- `git diff --exit-code -- pnpm-lock.yaml`
- `git diff --check`
- `git status --short`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`

## Conclusion

Select example parity is resolved. RadCN maps the two upstream shadcn/ui Select
examples to package-backed Remix 3 compositions with equivalent user-facing
behavior and author-facing customization, without adding React, Radix Select
primitives, `lucide-react`, Tailwind, `cn`, `class-variance-authority`, or
vendor dependencies. The next Issue 4 experiment should audit the generated
next recommendation: `sheet`.

## Completion Review

Reviewer: Avicenna the 2nd (`019e9ceb-dce2-7560-975e-acae1e97eff5`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the implementation matches the
approved scope, Experiment 72 has result and conclusion sections, Issue 4
records the `Pass` status and Sheet recommendation, the Select inventory lists
exactly `select-demo` and `select-scrollable` as `Covered`, all 27 timezone
options match the upstream source, `resolved-clusters.json` records Select
evidence, the regenerated parity inventory now recommends Sheet, verification
commands passed, vendor checkouts are clean, the lockfile is unchanged, and no
result commit was made before review.
