# Experiment 42: Implement badge example parity depth

## Description

Experiment 41 audited the four upstream shadcn/ui New York v4 Badge examples
and found the cluster is still partial. RadCN has the Badge primitive mechanics
already, but lacks named docs/fixture/Playwright evidence for:

- `badge-demo`
- `badge-destructive`
- `badge-outline`
- `badge-secondary`

This experiment implements that missing proof while preserving Badge as a
small host-element primitive. It should not add React, `lucide-react`,
Tailwind, vendor imports, count-specific props, icon-specific props, or new
Badge package APIs unless a direct blocker is discovered and recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Badge rich docs page and source snippet.
  - Render stable docs hooks for all four upstream Badge example ids using
    `data-radcn-docs-badge-family`.
  - Demonstrate default, secondary, destructive, and outline variants.
  - Demonstrate the richer `badge-demo` behaviors: app-owned icon content,
    custom class/style color override, compact numeric/count pill badges, and
    public `data-radcn-badge`/`data-variant` hooks.
  - Explain mappings from shadcn `className`, Tailwind utility styling,
    `lucide-react` icons, `data-slot`, and React prop spreading to RadCN
    `class`, `style`, public hooks/classes, CSS variables, explicit props, and
    app-owned icon/count presentation.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add named Badge fixture routes for `demo`, `destructive`, `outline`, and
  `secondary`. Preserve existing `variants` and `custom-class` routes.
- Update Playwright coverage in `radcn/fixtures/tests/static-display.spec.ts`.
  - Verify `badge/demo` renders default, secondary, destructive, and outline
    badges; an icon/verified badge; compact numeric/count pill badges `8`,
    `99`, and `20+`; custom class/style evidence; and public hooks.
  - Verify `badge/destructive`, `badge/outline`, and `badge/secondary` render
    the matching variant and label.
  - Keep existing Badge variant/custom-class coverage passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all four named Badge examples.
  - Assert docs/source text for `Badge`, `variant="secondary"`,
    `variant="destructive"`, `variant="outline"`, `class`, `style`,
    `data-radcn-badge`, `data-variant`, `className`, `data-slot`,
    Tailwind mapping, React prop mapping, app-owned icon/count presentation,
    and no `lucide-react` dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/badge-example-inventory.md`.
  - Change all four Badge rows to `Covered` only after package/docs/fixture/
    Playwright evidence exists.
  - Record the final API decision that icon and count/pill presentation remain
    app-owned composition through children, `class`, and `style`.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `badge` as a resolved example cluster with evidence from Experiments
    41 and 42 plus `badge-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Badge example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/badge.tsx` or Badge
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
- Fixture Playwright static-display coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all four upstream Badge example ids appear
  exactly once in `badge-example-inventory.md` and every row is `Covered` or
  `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/badge-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'badge-demo',
    'badge-destructive',
    'badge-outline',
    'badge-secondary',
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
  `examples` entry with `slug = "badge"`, `status = "resolved"`, and evidence
  for Experiment 41, Experiment 42, and `badge-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `badge` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for badge`.
- Fixture tests assert:
  - all four named Badge routes expose RadCN Badge public hooks and variants;
  - the rich demo proves icon children and compact count/pill styling through
    app-owned composition;
  - existing `variants` and `custom-class` routes still pass.
- Docs coverage asserts the Badge page renders stable evidence for all four
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
      console.log(`${file}: publishConfig is out of scope`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
  Both commands should exit `0` with no output. Docs prose references to React,
  lucide, Tailwind, and vendor ownership are allowed when covered by docs-copy
  assertions; only actual forbidden imports, package dependencies, vendor
  imports, and publish configuration fail these checks.
- `git diff --check`
- `git status --short` shows only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any Badge row remains `Partial` or `Missing`.
- The implementation marks `badge` resolved without docs/fixture/Playwright
  evidence for all four upstream Badge examples.
- The implementation adds React, React DOM, `lucide-react`, Tailwind, vendor
  imports, publish configuration, count-specific props, icon-specific props, or
  unrelated Badge package APIs.
- Docs or fixtures imply Badge owns icon rendering, count formatting, or
  layout instead of treating them as app-owned composition.
- The regenerated parity inventory still recommends `badge` as the first
  unresolved example cluster.

## Design Review

Reviewer: Lovelace the 2nd (`019e9b9f-4a8f-7e20-8c08-00c4174d7624`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: the initial dependency/scope verification used no-match `rg`
  commands that would exit `1` on a clean tree and could reject allowed docs
  prose references to React, lucide, Tailwind, or vendor concepts. Fixed by
  replacing them with deterministic Node checks that inspect actual import
  specifiers and package manifest entries while allowing docs prose.
- Major: none.
- Minor: none.

Approval result: approved after re-review. Lovelace the 2nd confirmed that the
issue README links Experiment 42 as `Designed`, the experiment has Description,
Changes, Verification, and Design Review sections, the scope is narrow,
implementation has not started, the plan avoids changing the Badge package API
unless a direct blocker appears, the revised dependency checks exit `0` on a
clean tree, distinguish real imports/manifests from docs prose, and introduce
no new blockers.

## Result

**Result:** Pass

Experiment 42 completed Badge example parity depth for all four upstream
shadcn/ui New York v4 Badge examples:

- `badge-demo`
- `badge-destructive`
- `badge-outline`
- `badge-secondary`

Implementation changes:

- `radcn/apps/docs/app/content/components.tsx` now renders a richer Badge docs
  page with stable `data-radcn-docs-badge-family` hooks for all four upstream
  example ids, a source snippet covering the same patterns, variant examples,
  app-owned icon content, custom class/style color override, compact
  numeric/count pill badges, public hook copy, and mappings for `className`,
  Tailwind utilities, `data-slot`, React prop spreading, and lucide icon
  ownership.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx` now expose
  named routes for `badge/demo`, `badge/destructive`, `badge/outline`, and
  `badge/secondary`, while preserving existing `badge/variants` and
  `badge/custom-class`.
- `radcn/fixtures/tests/static-display.spec.ts` verifies the named Badge
  routes, variant labels, public hooks, icon child composition, custom
  class/style evidence, and compact numeric/count badge styling.
- `radcn/apps/docs/tests/coverage.spec.ts` verifies the named docs hooks and
  source/API mapping copy.
- `badge-example-inventory.md` now marks all four Badge rows `Covered` and
  records that icon/count presentation remains app-owned composition through
  children, `class`, `style`, CSS variables, and app CSS.
- `resolved-clusters.json` marks `badge` resolved in the example queue, and
  the regenerated `parity-inventory.md` now recommends `combobox`.
- `radcn/packages/radcn/src/components/badge.tsx` was not changed.

Verification run:

- `pnpm radcn:typecheck`: pass.
- `pnpm --dir radcn/apps/docs typecheck`: pass.
- `pnpm fixtures:candidate:typecheck`: pass.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`:
  pass, 9 tests.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`:
  pass, 5 tests.
- Deterministic `badge-example-inventory.md` Node check: pass. Each of the
  four upstream Badge ids appears exactly once and each row is `Covered`.
- Deterministic `resolved-clusters.json` Node check: pass. The `badge` example
  cluster is `resolved` with evidence for Experiments 41 and 42 plus
  `badge-example-inventory.md`.
- Deterministic `parity-inventory.md` Node check: pass. `badge` is absent from
  unresolved example clusters, and the first recommended cluster is now
  `combobox`.
- Forbidden import Node check: pass. It produced no output for third-party
  React, React DOM, lucide, or vendor imports.
- Forbidden dependency/publish Node check: pass. It produced no output for
  React, React DOM, lucide dependencies or publish configuration.
- `git diff --check`: pass.
- `git status --short`: pass; only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes were present before the
  result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`:
  pass; no output.
- Playwright warning note: both Playwright suites passed while emitting the
  existing Node `module.register()` deprecation warning and local `NO_COLOR`
  web-server warnings.

## Conclusion

Badge example parity is resolved without changing the Badge package API. The
next experiment should follow the regenerated parity inventory and audit
`combobox` examples next.

## Completion Review

Reviewer: James the 2nd (`019e9ba6-03a9-7802-8471-41f32e509283`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. James the 2nd confirmed that Experiment 42 has
Result and Conclusion sections, the README marks Experiment 42 as `Pass`, the
README records the Badge learning and next `combobox` recommendation, the
Badge package API was not changed, docs and fixture evidence covers all four
Badge examples, `badge-example-inventory.md` marks all four Badge rows
`Covered`, `resolved-clusters.json` includes Badge evidence for Experiments 41
and 42 plus the inventory, `parity-inventory.md` resolves Badge and recommends
`combobox`, all recorded typecheck, Playwright, deterministic, dependency,
`git diff --check`, and vendor cleanliness checks passed, and the result commit
had not been made before review.
