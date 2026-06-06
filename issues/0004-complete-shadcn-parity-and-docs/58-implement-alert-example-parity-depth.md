# Experiment 58: Implement alert example parity depth

## Description

Experiment 57 audited the two upstream shadcn/ui New York v4 Alert examples and
found the cluster is still partial. RadCN has sufficient Alert package
mechanics already, but lacks named docs/fixture/Playwright evidence for:

- `alert-demo`
- `alert-destructive`

This experiment implements that missing proof while preserving Alert as a
dependency-free package primitive. It should compose the existing `Alert`,
`AlertTitle`, and `AlertDescription` parts with app-owned icon markup and
example layout rather than introducing React, cva, `lucide-react`, Tailwind,
vendor imports, or new Alert package APIs unless a direct blocker is discovered
and recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Alert from a generic preview page to an authored rich docs page if
    needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Alert example ids using
    `data-radcn-docs-alert-family`.
  - Demonstrate `alert-demo` with the three upstream compositions:
    - success Alert with title `Success! Your changes have been saved` and
      description `This is an alert with icon, title and description.`;
    - title-only Alert with title `This Alert has a title and an icon. No
      description.`;
    - destructive Alert with title `Unable to process your payment.`,
      paragraph `Please verify your billing information and try again.`, and
      list items `Check your card details`, `Ensure sufficient funds`, and
      `Verify billing address`.
  - Demonstrate `alert-destructive` with destructive variant title `Error` and
    description `Your session has expired. Please log in again.`
  - Use app-owned plain SVG or existing package-neutral icon markup for the
    `CheckCircle2Icon`, `PopcornIcon`, and `AlertCircleIcon` roles. Do not add
    `lucide-react`.
  - Explain mappings from shadcn React props, `className`, `data-slot`, cva,
    Tailwind utilities, `AlertCircleIcon`, `CheckCircle2Icon`, `PopcornIcon`,
    `lucide-react`, icon grid layout, SVG presentation, and vendor source to
    RadCN explicit props, `class`, `style`, CSS variables, public hooks,
    app-owned icons, app-owned layout, and non-dependencies.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add named Alert fixture routes for `demo` and `destructive-upstream`, or
  equivalent route ids that keep both upstream example ids explicit in scenario
  metadata and tests. Preserve the existing generic `default`, `destructive`,
  and `custom-token` Alert routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/static-display.spec.ts`.
  - Verify `alert/demo` exposes three Alerts, app-owned icon hooks, two default
    Alerts, one destructive Alert, the exact upstream titles/descriptions/list
    items, public Alert hooks, and role semantics.
  - Verify `alert/destructive-upstream` exposes one destructive Alert with the
    exact upstream `Error` title and session-expired description, app-owned icon
    hook, public Alert hooks, and role semantics.
  - Keep existing generic Alert behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for both named Alert examples.
  - Assert rendered evidence for three `alert-demo` Alerts, destructive
    variant, exact upstream copy, list content, app-owned icon hooks, public
    `data-radcn-alert*` hooks, `role="alert"`, `class`, `style`, CSS variables,
    `className`, `data-slot`, cva, Tailwind, `AlertCircleIcon`,
    `CheckCircle2Icon`, `PopcornIcon`, `lucide-react`, icon grid/SVG layout,
    Alert Dialog separation, vendor source, and no vendor dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md`.
  - Change both Alert rows to `Covered` only after package/docs/fixture/
    Playwright evidence exists.
  - Record final API decisions for variants, role semantics, title/description
    parts, paragraphs/lists, app-owned icon composition, icon layout,
    `class`/`style`, public hooks, custom tokens, Alert Dialog separation, and
    upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `alert` as a resolved example cluster with evidence from Experiments 57
    and 58 plus `alert-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Alert example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/alert.tsx` or Alert
  package APIs unless implementation discovers and records a direct blocker in
  the current primitive. Scoped docs/fixture example classes or inline styles
  may be used for app-owned icon/layout presentation.

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
- A deterministic Node check proves both upstream Alert example ids appear
  exactly once in `alert-example-inventory.md` and every row is `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'alert-demo',
    'alert-destructive',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== ids.length
  for (const id of ids) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (row.length !== 1 || !row[0][0].includes('| Covered |')) {
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
  `examples` entry with `slug = "alert"`, `status = "resolved"`, and evidence
  for Experiment 57, Experiment 58, and `alert-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `alert` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for alert`.
- Fixture tests assert:
  - both named Alert routes expose public RadCN hooks;
  - demo route proves three Alerts, exact upstream titles/descriptions/list
    items, two default variants, one destructive variant, role semantics,
    app-owned icon hooks, and paragraph/list composition;
  - destructive route proves exact upstream title/description, destructive
    variant, role semantics, and app-owned icon hook;
  - existing generic Alert tests still pass.
- Docs coverage asserts the Alert page renders stable evidence for both named
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
      name === 'class-variance-authority' ||
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
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ]
  const forbidden = new Set([
    'react',
    'react-dom',
    'class-variance-authority',
    'lucide-react',
    'radix-ui',
    'tailwindcss',
  ])
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[field] ?? {})) {
        if (forbidden.has(name) || name.startsWith('@radix-ui/') || name.startsWith('@tailwindcss/')) {
          console.log(`${manifest}: forbidden dependency ${name}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either upstream Alert example row remains `Partial` or `Missing` after the
  implementation.
- Named docs, fixture, or Playwright evidence is missing for either upstream
  example id.
- The implementation introduces React, cva, `lucide-react`, Tailwind, vendor
  imports, or a new package dependency.
- The implementation changes Alert package APIs without recording a concrete
  primitive blocker in the experiment result and Issue 4 learnings.
- Existing generic Alert fixture behavior regresses.
- Alert Dialog behavior is conflated with Alert example parity.
- `alert` is marked resolved before docs, fixture, Playwright, inventory, and
  regenerated parity evidence all agree.

## Design Review

Reviewer: Plato the 2nd (`019e9c41-edbb-7b60-b0b0-13243afdae83`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that Issue 4 links
Experiment 58 with status `Designed`, the experiment includes Description,
Changes, Verification, and Design Review sections, the scope is limited to the
two Alert example ids, implementation has not started, verification includes
typechecks, fixture/docs Playwright, inventory/resolved-cluster checks,
dependency checks, `git diff --check`, and vendor cleanliness, existing generic
Alert fixture routes are explicitly preserved, and the technical plan should
achieve named parity for `alert-demo` and `alert-destructive` without React,
cva, `lucide-react`, Tailwind, or vendor dependencies.

## Result

**Result:** Pass

Implemented named Alert example parity for `alert-demo` and
`alert-destructive` without changing `radcn/alert` package APIs.

The docs site now treats Alert as a rich authored component page with stable
`data-radcn-docs-alert-family` hooks for both upstream example ids. The page
renders the three upstream `alert-demo` compositions, the standalone
`alert-destructive` composition, exact titles/descriptions/list items,
destructive variants, role semantics, public Alert hooks, app-owned icon hooks,
and mapping copy for React props, `className`, `data-slot`, cva, Tailwind,
`lucide-react`, icon layout, Alert Dialog separation, and vendor source.

The candidate fixture app now preserves the existing generic `default`,
`destructive`, and `custom-token` Alert routes while adding named
`/fixtures/alert/demo` and `/fixtures/alert/destructive-upstream` routes.
Playwright coverage proves exact upstream copy, variant counts, alert roles,
paragraph/list composition, app-owned icon hooks, public Alert hooks, and the
existing generic Alert behavior.

`alert-example-inventory.md` now marks both rows `Covered`.
`resolved-clusters.json` records the `alert` example cluster as resolved, and
the regenerated `parity-inventory.md` recommends `calendar` as the next example
parity cluster.

Verification run:

```text
pnpm radcn:typecheck
$ pnpm --dir radcn/packages/radcn typecheck
$ tsc

pnpm --dir radcn/apps/docs typecheck
$ tsc --noEmit

pnpm fixtures:candidate:typecheck
$ pnpm --dir radcn/fixtures/candidate-remix typecheck
$ tsc

pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
9 passed

pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
5 passed

node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const ids = [
  'alert-demo',
  'alert-destructive',
]
const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
let failed = rows.length !== ids.length
for (const id of ids) {
  const row = rows.filter((match) => match[1] === id)
  console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
  if (row.length !== 1 || !row[0][0].includes('| Covered |')) {
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
alert-demo: 1 ... | Covered | None. |
alert-destructive: 1 ... | Covered | None. |

node - <<'NODE'
const fs = require('fs')
const resolved = JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json', 'utf8'))
const entry = resolved.examples.find((item) => item.slug === 'alert')
console.log(JSON.stringify(entry, null, 2))
if (!entry || entry.status !== 'resolved') process.exit(1)
for (const evidence of [
  'issues/0004-complete-shadcn-parity-and-docs/57-audit-alert-example-parity.md',
  'issues/0004-complete-shadcn-parity-and-docs/58-implement-alert-example-parity-depth.md',
  'issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md',
]) {
  if (!entry.evidence.includes(evidence)) process.exit(1)
}
NODE
{
  "slug": "alert",
  "status": "resolved",
  "evidence": [
    "issues/0004-complete-shadcn-parity-and-docs/57-audit-alert-example-parity.md",
    "issues/0004-complete-shadcn-parity-and-docs/58-implement-alert-example-parity-depth.md",
    "issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md"
  ]
}

node - <<'NODE'
const fs = require('fs')
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md', 'utf8')
const unresolved = text.match(/## Unresolved Example Clusters[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const recommendation = text.match(/## First Recommended Cluster[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
console.log(recommendation.match(/\*\*Cluster:\*\* .+/)?.[0] ?? 'missing recommendation')
if (/^\| alert \|/m.test(unresolved)) process.exit(1)
if (recommendation.includes('Example parity for alert')) process.exit(1)
NODE
**Cluster:** Example parity for calendar

node - <<'NODE'
const fs = require('fs')
const path = require('path')
const roots = ['radcn/packages/radcn', 'radcn/apps/docs', 'radcn/fixtures/candidate-remix']
function forbiddenImport(name) {
  return (
    name === 'react' ||
    name === 'react-dom' ||
    name === 'class-variance-authority' ||
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
  'radcn/packages/radcn/package.json',
  'radcn/apps/docs/package.json',
  'radcn/fixtures/candidate-remix/package.json',
]
const forbidden = new Set([
  'react',
  'react-dom',
  'class-variance-authority',
  'lucide-react',
  'radix-ui',
  'tailwindcss',
])
let failed = false
for (const manifest of manifests) {
  const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
  for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
    for (const name of Object.keys(json[field] ?? {})) {
      if (forbidden.has(name) || name.startsWith('@radix-ui/') || name.startsWith('@tailwindcss/')) {
        console.log(`${manifest}: forbidden dependency ${name}`)
        failed = true
      }
    }
  }
}
if (failed) process.exit(1)
NODE

git diff --check

for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done

git status --short
 M issues/0004-complete-shadcn-parity-and-docs/58-implement-alert-example-parity-depth.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
 M issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md
 M issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
 M issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json
 M radcn/apps/docs/app/content/components.tsx
 M radcn/apps/docs/tests/coverage.spec.ts
 M radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx
 M radcn/fixtures/scenarios/index.ts
 M radcn/fixtures/tests/static-display.spec.ts
```

## Conclusion

Alert example parity is complete. The package API was already sufficient; the
missing work was named example depth and proof. The next experiment should
audit the `calendar` example cluster recommended by the regenerated parity
inventory.

## Completion Review

Reviewer: Turing the 2nd (`019e9c49-7224-7753-b4e2-96b06ab7ebab`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the
experiment has Result and Conclusion sections, the Issue 4 README marks
Experiment 58 `Pass` and records Alert learnings, the docs implement
`alert-demo` and `alert-destructive` with stable hooks and exact copy, fixture
routes preserve generic `default`, `destructive`, and `custom-token` routes
while adding named routes, fixture rendering covers both named examples,
Playwright assertions cover named Alert parity and existing generic behavior,
the inventory rows are `Covered`, `resolved-clusters.json` records `alert` as
resolved, the result commit had not been made before review, and there are no
blocker, major, or minor findings.

The reviewer reran:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `git diff --check`
- vendor status checks
- forbidden import/dependency checks

All reviewer verification passed.
