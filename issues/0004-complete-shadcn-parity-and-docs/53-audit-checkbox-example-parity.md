# Experiment 53: Audit checkbox example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`checkbox`. Upstream shadcn/ui New York v4 has three Checkbox examples in the
current inferred cluster:

- `checkbox-demo`
- `checkbox-disabled`
- `checkbox-with-text`

Current RadCN already ships `radcn/checkbox`, docs coverage, candidate fixture
routes, reference artifacts, and Playwright coverage for native checkbox
semantics, checked/unchecked/disabled/invalid/indeterminate states, form
submission and reset, labels, and custom tokens. This experiment audits whether
that evidence fully covers the three upstream examples before implementation.
It should separate Checkbox-owned behavior from app-owned label/description
composition, Field/Form examples, card-like label layouts, hover/checked parent
styling, React prop spelling, Radix state mechanics, `lucide-react` check
icons, Tailwind utilities, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/checkbox-example-inventory.md`.
  - List all three active upstream Checkbox example ids: `checkbox-demo`,
    `checkbox-disabled`, and `checkbox-with-text`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports native checkbox input
    semantics, checked and unchecked state, default checked state, disabled
    state, invalid state, indeterminate/mixed state, label association,
    description text composition, required/form submission/reset behavior,
    public wrapper/input/indicator hooks, state hooks, custom classes/styles/
    tokens, docs evidence, candidate fixture evidence, reference fixture
    evidence, and Playwright evidence.
  - Record mapping decisions for shadcn React props, `defaultChecked`,
    `disabled`, `className`, `data-slot`, `aria-invalid`, Radix
    `CheckboxPrimitive.Root` and `CheckboxPrimitive.Indicator`, `data-state`,
    `CheckIcon`, `lucide-react`, Tailwind utilities, peer/has selectors,
    card-like label wrappers, vendor source, and RadCN package/docs/fixture/
    test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/checkbox.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-disabled.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/checkbox-with-text.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-disabled.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/checkbox-with-text.json`
  - note adjacent but out-of-cluster checkbox examples such as
    `checkbox-form-single`, `checkbox-form-multiple`, `field-checkbox`,
    `form-rhf-checkbox`, `form-tanstack-checkbox`, and
    `form-formisch-checkbox` without adding rows unless the active inventory
    reclassifies them.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/checkbox.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
  - `radcn/fixtures/tests/native-state.spec.ts`
  - `radcn/fixtures/tests/native-controls.spec.ts`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
  - relevant dropdown/context/menubar checkbox-item evidence only where it
    clarifies that menu checkbox items are a separate component surface.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `checkbox-example-inventory.md` exists and contains exactly one table row for
  each active upstream Checkbox example id.
- A deterministic Node check proves all three active upstream Checkbox example
  ids appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/checkbox-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'checkbox-demo',
    'checkbox-disabled',
    'checkbox-with-text',
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
  not mark `checkbox` resolved unless every active upstream Checkbox example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - native checkbox input semantics, checked/default checked/unchecked states,
    disabled state, invalid state, indeterminate/mixed state, label
    association, description composition, form submission/reset, required
    constraint behavior, public hooks, state hooks, custom classes/styles/
    tokens, and docs/fixture/Playwright evidence;
  - React/Radix mechanics mapping to Remix/web-first explicit props, native
    input behavior, app-owned label/card composition, or intentional
    divergence;
  - `defaultChecked`, `disabled`, `className`, `data-slot`, `aria-invalid`,
    `data-state`, `CheckboxPrimitive.Root`, `CheckboxPrimitive.Indicator`,
    `CheckIcon`, `lucide-react`, Tailwind utilities, peer/has selectors, and
    vendor source as mappings or non-dependencies rather than mandatory RadCN
    dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "checkbox-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Checkbox example id from the inventory.
- The audit treats React, Radix, `lucide-react`, Tailwind, upstream
  `CheckIcon`, or vendor source as mandatory RadCN Checkbox dependencies.
- The audit marks `checkbox` resolved without package/docs/fixture/test
  evidence for all three active upstream Checkbox examples.
- The audit conflates Checkbox-owned behavior with app-owned label text,
  description text, card-like wrappers, hover/checked parent styling,
  Field/Form validation recipes, menu checkbox items, or custom-class styling
  decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Sagan the 2nd (`019e9c19-e203-7c22-93ae-7b3ce5adc837`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, scope is audit-only and forbids implementation changes,
the active checkbox cluster is exactly `checkbox-demo`, `checkbox-disabled`,
and `checkbox-with-text`, adjacent form/field/menu checkbox examples are
excluded unless the inventory reclassifies them, verification includes concrete
pass/fail criteria and repo hygiene checks, `git diff --check` passed, vendor
status printed no output, and only the Issue 4 README plus new Experiment 53
plan file are modified.

## Result

**Result:** Pass

Created `checkbox-example-inventory.md` and audited all three active upstream
Checkbox examples:

- `checkbox-demo`
- `checkbox-disabled`
- `checkbox-with-text`

The audit found strong RadCN package and fixture coverage for Checkbox
behavior: native checkbox input semantics, checked and unchecked states,
server-rendered initial checked state, disabled state, invalid state,
indeterminate/mixed ARIA and visual state, label association, app-owned
description composition, native form submission/reset, public wrapper/input/
indicator hooks, `data-state` hooks, custom classes/styles/tokens, docs route
presence, candidate fixture behavior, and Playwright behavior coverage.

The example cluster remains partially covered because current docs, candidate
fixtures, and Playwright tests do not yet prove the three named upstream
example ids or exact user-facing compositions. `checkbox-demo` needs the four
stacked upstream compositions, including the checked card-like label and
custom checked styling. `checkbox-disabled` needs named disabled example proof
with upstream label copy. `checkbox-with-text` needs named label and
description proof.

No current evidence requires changing the `radcn/checkbox` package API. shadcn
`defaultChecked` maps to RadCN's server-rendered `checked` initial state,
`className` maps to `class`, `data-slot` maps to RadCN public hooks, Radix
state mechanics map to native input state and explicit props, and
`lucide-react`/`CheckIcon`/Tailwind/peer/has/card wrapper choices remain
presentation or app-owned composition rather than package dependencies.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/checkbox-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const ids = [
  'checkbox-demo',
  'checkbox-disabled',
  'checkbox-with-text',
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

rg -n "checkbox-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The deterministic inventory check reported each active Checkbox example id
exactly once. `rg` found the README learning. `git diff --check` passed. Vendor
status printed no output. `git status --short` showed only expected Issue 4
documentation changes for the audit result.

## Conclusion

Checkbox example parity is not yet resolved. The next experiment should
implement named Checkbox example parity depth across docs, candidate fixtures,
and Playwright coverage for `checkbox-demo`, `checkbox-disabled`, and
`checkbox-with-text`, without changing the package API unless a direct blocker
appears during implementation.

## Completion Review

Reviewer: Noether the 2nd (`019e9c1d-018d-76c1-8306-76ef78e64f52`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for result commit. The reviewer confirmed that the audit-only
scope was preserved, the inventory contains exactly `checkbox-demo`,
`checkbox-disabled`, and `checkbox-with-text` as active rows, adjacent
form/field/menu checkbox examples are only noted as out-of-cluster,
`git diff --check` passed, vendor status printed no output, no nested `.git`
directories outside `vendor/` were found, the result commit had not been made
yet, and the `Partial` outcome is supported by evidence: generic Checkbox
coverage exists, but named upstream example compositions are not yet proven.
