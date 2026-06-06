# Experiment 51: Audit resizable example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`resizable`. Upstream shadcn/ui New York v4 has four Resizable examples in the
current inferred cluster:

- `resizable-demo`
- `resizable-demo-with-handle`
- `resizable-handle`
- `resizable-vertical`

Current RadCN already ships `radcn/resizable`, docs coverage, candidate fixture
routes, reference React Router fixture routes, and Playwright coverage for
horizontal and vertical orientation, semantic separator handles, keyboard
resizing, resize change events, visible handle grips, and custom tokens. This
experiment audits whether that evidence fully covers the four upstream
examples before implementation. It should separate Resizable-owned behavior
from app-owned panel content, nested panel composition, `react-resizable-panels`
mechanics, `lucide-react` grip icons, Tailwind utilities, React prop spelling,
and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/resizable-example-inventory.md`.
  - List all four upstream Resizable example ids: `resizable-demo`,
    `resizable-demo-with-handle`, `resizable-handle`, and
    `resizable-vertical`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports horizontal and vertical
    panel groups, nested panel groups, default panel sizes, min-size clamping,
    semantic separator handles, aria orientation/value attributes, keyboard
    resizing, pointer resizing, resize change events, visible handle grips,
    panel content hooks/classes, custom hooks/classes/tokens, docs evidence,
    candidate fixture evidence, reference fixture evidence, and Playwright
    evidence.
  - Record mapping decisions for shadcn React props, `defaultSize`, `minSize`,
    `orientation`, `withHandle`, `className`, `data-slot`,
    `react-resizable-panels`, `GripVerticalIcon`, `lucide-react`, Tailwind
    utilities, nested panel groups, vendor source, and RadCN
    package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/resizable.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/resizable-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/resizable-demo-with-handle.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/resizable-handle.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/resizable-vertical.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/resizable-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/resizable-demo-with-handle.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/resizable-handle.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/resizable-vertical.json`
  - note adjacent but out-of-cluster `resizable-rtl` and `resizable-example`
    references without adding rows unless the active inventory reclassifies
    them.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/resizable.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/resizable.tsx`
  - `radcn/fixtures/candidate-remix/app/assets/entry.ts`
  - `radcn/fixtures/reference-react-router/app/fixtures/resizable.tsx`
  - `radcn/fixtures/tests/application-shell.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `resizable-example-inventory.md` exists and contains exactly one table row
  for each upstream Resizable example id.
- A deterministic Node check proves all four upstream Resizable example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/resizable-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'resizable-demo',
    'resizable-demo-with-handle',
    'resizable-handle',
    'resizable-vertical',
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
  not mark `resizable` resolved unless every upstream Resizable example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - horizontal and vertical panel groups, nested panel groups, default panel
    sizes, min-size clamping, semantic separator handles, aria orientation and
    value attributes, keyboard resizing, pointer resizing, resize change
    events, visible handle grips, panel content hooks/classes, custom
    hooks/classes/tokens, and docs/fixture/Playwright evidence;
  - React prop spelling and `react-resizable-panels` mechanics mapping to
    Remix/web-first explicit props, dependency-free enhancement, browser
    pointer/keyboard events, app-owned panel content, or intentional
    divergence;
  - `defaultSize`, `minSize`, `orientation`, `withHandle`, `className`,
    `data-slot`, `GripVerticalIcon`, `lucide-react`, Tailwind utilities,
    nested panel groups, and vendor source as mappings or non-dependencies
    rather than mandatory RadCN dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "resizable-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Resizable example id from the active parity
  inventory.
- The audit treats React, `react-resizable-panels`, `lucide-react`, Tailwind,
  upstream `GripVerticalIcon`, or vendor source as mandatory RadCN Resizable
  dependencies.
- The audit marks `resizable` resolved without package/docs/fixture/test
  evidence for all four upstream Resizable examples.
- The audit conflates Resizable-owned behavior with app-owned panel content,
  fixed dimensions, visual labels, icon choice, nested example layout, or
  custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Gibbs the 2nd (`019e9c07-d36c-7b20-9b59-207a84ec27cb`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, the scope is explicitly audit-only, verification has
concrete pass/fail criteria and hygiene checks, the inventory identifies
`resizable` as the next recommended cluster, and only the README plus new
Experiment 51 file are modified before implementation.

## Result

**Result:** Pass

Created `resizable-example-inventory.md` and audited all four active upstream
Resizable examples:

- `resizable-demo`
- `resizable-demo-with-handle`
- `resizable-handle`
- `resizable-vertical`

The audit found strong RadCN primitive coverage for Resizable behavior:
horizontal and vertical orientation, semantic separator handles, ARIA
orientation/value attributes, keyboard resizing, pointer resizing,
`radcn-resizable-change` events, visible handle grips, default/min size props,
custom CSS variables, docs route coverage, reference fixture coverage,
candidate fixture coverage, and Playwright coverage.

The example cluster remains partially covered because the docs, candidate
fixtures, and Playwright tests do not yet prove the four named upstream example
ids with nested group composition, exact labels, 25/75 sizes where required,
and handle-grip variants as user-facing compositions. No current evidence
requires changing the `radcn/resizable` package API.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/resizable-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const ids = [
  'resizable-demo',
  'resizable-demo-with-handle',
  'resizable-handle',
  'resizable-vertical',
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
resizable-demo: 1
resizable-demo-with-handle: 1
resizable-handle: 1
resizable-vertical: 1

rg -n "resizable-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
739:  `resizable-example-inventory.md`. RadCN already has strong package, docs

git diff --check

git status --short
 M issues/0004-complete-shadcn-parity-and-docs/51-audit-resizable-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/resizable-example-inventory.md

for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

## Conclusion

The next experiment should implement Resizable example parity depth for
`resizable-demo`, `resizable-demo-with-handle`, `resizable-handle`, and
`resizable-vertical`. It should add named docs/fixture/test evidence and exact
upstream panel compositions while preserving the existing dependency-free
Resizable package API unless implementation reveals a concrete blocker.

## Completion Review

Reviewer: Hypatia the 2nd (`019e9c0a-9178-7460-a15f-b233edbe3a76`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the
experiment has Result and Conclusion, the README status matches `Pass`,
later-work learnings are recorded in the issue README, the inventory covers
exactly the four active Resizable examples from `parity-inventory.md`, the
recorded Node verification reproduced successfully, `git diff --check` and
vendor cleanliness passed, only expected Experiment 51 issue documentation
changed, and HEAD was still the plan commit before the result commit.
