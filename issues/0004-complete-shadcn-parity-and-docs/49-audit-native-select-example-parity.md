# Experiment 49: Audit native-select example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`native-select`. Upstream shadcn/ui New York v4 has four Native Select examples
in the current inferred cluster:

- `native-select-demo`
- `native-select-disabled`
- `native-select-groups`
- `native-select-invalid`

Current RadCN already ships `radcn/native-select`, docs coverage, candidate
fixture routes, reference React Router fixture routes, and Playwright coverage
for native select rendering, option and optgroup semantics, disabled and
invalid states, sizes, native form submission/reset, required validation, and
custom tokens. This experiment audits whether that evidence fully covers the
four upstream examples before implementation. It should separate Native
Select-owned behavior from surrounding Field/Form composition, browser-native
popup rendering, icon choice, Tailwind utilities, React prop spelling, and
vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/native-select-example-inventory.md`.
  - List all four upstream Native Select example ids: `native-select-demo`,
    `native-select-disabled`, `native-select-groups`, and
    `native-select-invalid`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports wrapper and select
    styling hooks, default and small sizes, native `<option>` and `<optgroup>`
    children, placeholder-like empty option rows, disabled state, invalid ARIA
    state, native value selection, native form submission/reset, required
    validation, custom hooks/classes/tokens, icon decoration, docs evidence,
    candidate fixture evidence, reference fixture evidence, and Playwright
    evidence.
  - Record mapping decisions for shadcn React props, `size`, `className`,
    `data-slot`, `aria-invalid`, `disabled`, native select browser behavior,
    `lucide-react` `ChevronDownIcon`, Tailwind utilities, option/optgroup
    Canvas colors, vendor source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/native-select.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/native-select-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/native-select-disabled.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/native-select-groups.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/native-select-invalid.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/native-select-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/native-select-disabled.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/native-select-groups.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/native-select-invalid.json`
  - note adjacent but out-of-cluster `native-select-rtl` and
    `native-select-example` references without adding rows unless the active
    inventory reclassifies them.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/native-select.tsx`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/native-select.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/native-select.tsx`
  - `radcn/fixtures/tests/native-select.spec.ts`
  - relevant Field/Form evidence only where it affects adjacent validation and
    submission scenarios.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `native-select-example-inventory.md` exists and contains exactly one table
  row for each upstream Native Select example id.
- A deterministic Node check proves all four upstream Native Select example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/native-select-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'native-select-demo',
    'native-select-disabled',
    'native-select-groups',
    'native-select-invalid',
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
  not mark `native-select` resolved unless every upstream Native Select example
  is `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - wrapper/select styling hooks, default and small sizes, native option and
    optgroup semantics, placeholder-like empty options, disabled state,
    invalid ARIA state, native value selection, native form submission/reset,
    required validation, custom hooks/classes/tokens, icon decoration, and
    docs/fixture/Playwright evidence;
  - React prop spelling and state mechanics mapping to Remix/web-first explicit
    props, native form state, route/server state, or browser-native select
    behavior;
  - `size`, `className`, `data-slot`, `aria-invalid`, `disabled`,
    `lucide-react`, Tailwind, option/optgroup Canvas colors, and vendor source
    as mappings or non-dependencies rather than mandatory RadCN dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "native-select-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Native Select example id from the active parity
  inventory.
- The audit treats React, `lucide-react`, Tailwind, upstream browser popup
  styling, or vendor source as mandatory RadCN Native Select dependencies.
- The audit marks `native-select` resolved without package/docs/fixture/test
  evidence for all four upstream Native Select examples.
- The audit conflates Native Select-owned behavior with app-owned Field/Form
  labels, validation copy, submission result display, custom-class styling
  decisions, or browser-native option popup rendering differences.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Raman the 2nd (`019e9bf5-3234-7e82-951a-ecfc23b1c855`) with
fresh context (`fork_context: false`).

Initial findings:

- **Blocker:** The experiment file had `Description`, `Changes`, and
  `Verification`, but no `## Design Review` section. AGENTS requires the
  design review result to be recorded before implementation and before the
  plan commit.

Fixes:

- Added this `## Design Review` section recording the reviewer identity,
  fresh-context status, finding, fix, and approval state.

Re-review findings:

- Prior blocker resolved. The reviewer confirmed this section now records the
  reviewer identity, fresh-context status, original blocker, fix, and approval
  state.
- No new blockers were introduced by the fix.

Approval: Approved for plan commit.
