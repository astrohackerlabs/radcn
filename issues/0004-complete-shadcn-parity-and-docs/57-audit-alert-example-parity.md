# Experiment 57: Audit alert example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`alert`. Upstream shadcn/ui New York v4 has two Alert examples in the current
inferred cluster:

- `alert-demo`
- `alert-destructive`

Current RadCN already ships `radcn/alert`, docs coverage, candidate fixture
routes, and Playwright coverage for alert role semantics, default and
destructive variants, title/description parts, custom tokens, and actions. This
experiment audits whether that evidence fully covers the two upstream examples
before implementation. It should separate Alert-owned behavior from app-owned
icons, multi-alert example layout, list content, `lucide-react`, cva/class
utilities, Tailwind utilities, React prop spreading, Alert Dialog examples, and
vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md`.
  - List all two active upstream Alert example ids: `alert-demo` and
    `alert-destructive`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports default and destructive
    variants, `role="alert"`, title and description parts, description
    paragraphs/lists, action slot composition, public hooks, custom
    classes/styles/tokens, icon composition, docs evidence, candidate fixture
    evidence, reference fixture evidence if present, and Playwright evidence.
  - Record mapping decisions for shadcn React props, `variant`, `className`,
    `data-slot`, cva/class utilities, `AlertCircleIcon`, `CheckCircle2Icon`,
    `PopcornIcon`, `lucide-react`, Tailwind utilities, SVG/icon layout, vendor
    source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/alert.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/alert-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/alert-destructive.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/alert-destructive.json`
  - note adjacent but out-of-cluster `alert-dialog-demo` and `alert-dialog`
    references without adding rows unless the active inventory reclassifies
    them.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/alert.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
  - relevant Alert Dialog evidence only where it clarifies that Alert Dialog is
    a separate component surface.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `alert-example-inventory.md` exists and contains exactly one table row for
  each active upstream Alert example id.
- A deterministic Node check proves both active upstream Alert example ids
  appear exactly once and no extra example rows exist:
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
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1])
  let failed = rows.length !== ids.length
  if (rows.length !== ids.length) {
    console.log(`row-count: ${rows.length}`)
  }
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (examples.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  for (const row of rows) {
    if (!ids.includes(row)) {
      console.log(`unexpected: ${row}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does
  not mark `alert` resolved unless every active upstream Alert example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - default and destructive variants, alert role semantics, title and
    description parts, description paragraphs/lists, icon composition, action
    composition, public hooks, custom classes/styles/tokens, and docs/fixture/
    Playwright evidence;
  - React props, cva/class utilities, `className`, `data-slot`, and icon
    mechanics mapping to Remix/web-first explicit props, `class`, public
    hooks, app-owned icons, or intentional divergence;
  - `AlertCircleIcon`, `CheckCircle2Icon`, `PopcornIcon`, `lucide-react`,
    Tailwind utilities, SVG/icon layout, Alert Dialog references, and vendor
    source as mappings or non-dependencies rather than mandatory RadCN
    dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "alert-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Alert example id from the inventory.
- The audit treats React, cva, `lucide-react`, Tailwind, upstream icon
  components, or vendor source as mandatory RadCN Alert dependencies.
- The audit marks `alert` resolved without package/docs/fixture/test evidence
  for both active upstream Alert examples.
- The audit conflates Alert-owned behavior with app-owned icon choice, SVG
  layout, multi-alert demo layout, list content, action composition, Alert
  Dialog behavior, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Copernicus the 2nd (`019e9c3a-27e7-7520-aa1e-85074fb6d329`) with
fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, scope is audit-only and forbids source changes, the
active alert cluster matches the inventory with `alert-demo` and
`alert-destructive` while keeping Alert Dialog separate, verification has
concrete pass/fail and repo hygiene checks, the no React/cva/`lucide-react`/
Tailwind/vendor dependency policy is preserved, `git diff --check` passed,
vendor status printed no output, and the worktree is plan-only.

## Result

**Result:** Partial

Created `alert-example-inventory.md` and audited the two active upstream Alert
examples: `alert-demo` and `alert-destructive`.

The audit found that the current `radcn/alert` package API is sufficient for the
cluster. It already supports default and destructive variants, `role="alert"`,
title and description parts, arbitrary description children for paragraphs and
lists, action composition, public hooks, custom classes/styles/tokens, and
app-owned icon composition. The React-specific upstream mechanics map cleanly to
RadCN's web-first model: `className` maps to `class`, `data-slot` maps to
`data-radcn-*` hooks, cva/Tailwind utilities remain implementation details,
and `lucide-react` icons remain app-owned example children.

The cluster is not complete yet because current docs, candidate fixtures, and
Playwright tests prove generic Alert behavior but do not prove the two named
upstream example ids with exact user-facing compositions and copy:
`alert-demo` and `alert-destructive`.

Verification run:

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
const rows = [...examples.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1])
let failed = rows.length !== ids.length
if (rows.length !== ids.length) {
  console.log(`row-count: ${rows.length}`)
}
for (const id of ids) {
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (examples.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
for (const row of rows) {
  if (!ids.includes(row)) {
    console.log(`unexpected: ${row}`)
    failed = true
  }
}
if (failed) process.exit(1)
NODE
alert-demo: 1
alert-destructive: 1

rg -n "alert-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
812:  `alert-example-inventory.md`. RadCN already has package, docs, fixture, and

git diff --check

git status --short
 M issues/0004-complete-shadcn-parity-and-docs/57-audit-alert-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/alert-example-inventory.md

for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

## Conclusion

Alert should move from audit to implementation depth next. The next experiment
should add named docs, candidate fixture, and Playwright proof for `alert-demo`
and `alert-destructive`, preserve icon composition as app-owned markup, and
avoid changing `radcn/alert` unless implementation exposes a concrete API or
styling gap.

## Completion Review

Reviewer: Dalton the 2nd (`019e9c3e-8074-7243-a285-fd9a3fe69d0a`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the result is
a valid read-only audit, the scope stayed to the expected issue documentation
files, the Issue 4 README status `Partial` matches the experiment result, the
inventory contains exactly `alert-demo` and `alert-destructive`, `git diff
--check` passed, `git status --short` showed only expected issue documentation
changes, the vendor status loop printed no output, `git ls-files vendor` shows
only `vendor/.gitignore`, the latest commit was still the plan commit, and the
recorded `Partial` outcome is appropriate because current docs/fixtures/tests
prove generic Alert behavior but not the exact upstream example ids and copy.
