# Experiment 47: Audit input-otp example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`input-otp`. Upstream shadcn/ui New York v4 has four Input OTP examples in the
current inferred cluster:

- `input-otp-controlled`
- `input-otp-demo`
- `input-otp-pattern`
- `input-otp-separator`

Current RadCN already ships `radcn/input-otp`, docs coverage, candidate fixture
routes, and Playwright coverage for slots, separators, digit/alphanumeric
patterns, disabled and invalid state, paste filtering, keyboard movement,
native form submission/reset, custom tokens, and public data hooks. This
experiment audits whether that evidence fully covers the four upstream
examples before implementation. It should separate Input OTP-owned behavior
from app-owned controlled display text, form recipes, toast behavior, and
React-only mechanics.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/input-otp-example-inventory.md`.
  - List all four upstream Input OTP example ids: `input-otp-controlled`,
    `input-otp-demo`, `input-otp-pattern`, and `input-otp-separator`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports max length, slot groups,
    separators, six-slot and split-slot layouts, controlled/default values,
    visible entered-value feedback, pattern filtering, digit-only and
    alphanumeric input, paste filtering, keyboard movement, active slot/caret
    state, disabled/invalid state, native form value submission/reset, custom
    hooks/classes, and docs/fixture/Playwright evidence.
  - Record mapping decisions for shadcn React `useState`, `value`, `onChange`,
    `REGEXP_ONLY_DIGITS_AND_CHARS` from the upstream `input-otp` package,
    upstream `OTPInput`/context mechanics, `lucide-react` separator icon,
    Tailwind utilities, `className`, `containerClassName`, `data-slot`,
    vendor source, and RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-otp-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-otp-pattern.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-otp-separator.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-otp-controlled.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/input-otp-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/input-otp-pattern.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/input-otp-separator.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/input-otp-controlled.json`
  - note adjacent but out-of-cluster `input-otp-form` and `otp-*` block JSON
    payloads without adding rows unless the active inventory reclassifies them.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/input-otp.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/input-otp.tsx`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
  - relevant Form, Field, Button, Card, and Toast evidence only where it affects
    adjacent form/block examples.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `input-otp-example-inventory.md` exists and contains exactly one table row
  for each upstream Input OTP example id.
- A deterministic Node check proves all four upstream Input OTP example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/input-otp-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'input-otp-controlled',
    'input-otp-demo',
    'input-otp-pattern',
    'input-otp-separator',
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
  not mark `input-otp` resolved unless every upstream Input OTP example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - max length, slot groups, separators, six-slot and split-slot layouts,
    controlled/default values, visible entered-value feedback, pattern
    filtering, digit-only and alphanumeric input, paste filtering, keyboard
    movement, active slot/caret state, disabled/invalid state, native form
    value submission/reset, custom hooks/classes, and docs/fixture/Playwright
    evidence;
  - React `useState`, `value`, and `onChange` mapping to explicit RadCN props,
    native input state, app-owned display text, route/server state, or
    dependency-free browser enhancement;
  - upstream `input-otp`, `OTPInput`, context, `lucide-react`, Tailwind,
    `className`, `containerClassName`, `data-slot`, and vendor source as
    mappings or non-dependencies rather than mandatory RadCN dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "input-otp-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Input OTP example id from the active parity
  inventory.
- The audit treats React, `input-otp`, `lucide-react`, Tailwind, upstream
  context, upstream form/toast/block recipes, or vendor source as mandatory
  RadCN Input OTP dependencies.
- The audit marks `input-otp` resolved without package/docs/fixture/test
  evidence for all four upstream Input OTP examples.
- The audit conflates Input OTP-owned behavior with app-owned controlled
  display text, form submission/result display, toast behavior, card/block
  layout, icon choice, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Confucius the 2nd (`019e9be1-c5b0-75b0-b099-51b9e7568cf2`)
with fresh context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that the Issue 4
README links this experiment with status `Designed`, the experiment includes
the required sections, the scope is audit-only, verification has concrete
pass/fail criteria and hygiene checks, vendor checkouts are read-only
references, and the plan is likely to achieve the stated audit goal without
starting implementation before the plan commit.
