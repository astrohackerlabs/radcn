# Experiment 31: Audit input example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`input`. RadCN already exports a native `Input` package component and existing
form/field fixtures prove text, email, password, disabled, required, invalid,
custom error-token, and form-submission behavior in broader compositions.

Upstream shadcn/ui has 6 plain Input component examples:

- `input-demo`
- `input-disabled`
- `input-file`
- `input-with-button`
- `input-with-label`
- `input-with-text`

This experiment audits those 6 examples before implementation. It should
separate what the `Input` package itself must support from composition owned by
`Button`, `Label`, `Field`, forms, and docs examples. It must not implement new
package APIs, docs examples, fixture routes, or tests.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md`.
  - List all 6 upstream Input example ids:
    `input-demo`, `input-disabled`, `input-file`, `input-with-button`,
    `input-with-label`, and `input-with-text`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether `InputType` needs `file`, whether native file
    input styling belongs in `radcn/input`, and whether `Button`/`Label`/
    description text composition needs docs/fixture/Playwright depth rather
    than package API.
  - Record mapping decisions for shadcn Tailwind layout utilities, `Label`
    composition, `Button` composition, native `type="email"`, disabled state,
    `type="file"`, placeholder behavior, `id`/`htmlFor` wiring, description
    text, and current RadCN package/docs/fixture/Playwright evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/input.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-disabled.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-file.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-with-button.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-with-label.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-with-text.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/input.tsx`
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/packages/radcn/src/components/label.tsx`
  - `radcn/packages/radcn/src/components/field.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
  - `radcn/fixtures/reference-react-router/app/fixtures/field.tsx`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `input-example-inventory.md` exists and contains exactly one table row for
  each upstream Input example id.
- A deterministic Node check proves all 6 upstream Input example ids appear
  exactly once:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = [
    'input-demo',
    'input-disabled',
    'input-file',
    'input-with-button',
    'input-with-label',
    'input-with-text',
  ]
  let failed = false
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (text.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does not
  mark `input` resolved unless every upstream Input example is `Covered` or
  `Intentional divergence`.
- The inventory explicitly addresses:
  - default email input and placeholder behavior;
  - disabled email input behavior;
  - file input type support and styling;
  - Input plus Button composition;
  - Input plus Label `id`/`htmlFor` wiring;
  - Input plus Label plus description text;
  - whether composition belongs in `Input`, `Field`, docs, fixtures, or tests;
  - Tailwind utility mapping to RadCN classes, styles, or CSS variables;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "input-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Input example id.
- The audit drifts into `input-group` or `input-otp` examples, which are
  separate clusters.
- The audit treats Tailwind utility classes, Label composition, Button
  composition, or vendor source as mandatory `Input` package dependencies.
- The audit marks `input` resolved without package/docs/fixture/test evidence
  for all 6 upstream examples.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Nash (`019e9b3b-035c-7331-8d2a-715570f1c1a5`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Nash confirmed the Issue 4 README links Experiment
31 as `Designed`, the experiment has the required Description, Changes,
Verification, and Design Review sections, the scope is narrow and audit-only,
the plan targets only the 6 plain Input examples, the failure criteria reject
`input-group` and `input-otp` drift, verification has concrete pass/fail and
repo hygiene checks, vendor cleanliness is checked, and current git status
shows only expected plan documentation changes.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md` as an
audit-only inventory for all 6 upstream plain Input examples: `input-demo`,
`input-disabled`, `input-file`, `input-with-button`, `input-with-label`, and
`input-with-text`.

The audit does not mark `input` resolved. RadCN already covers the underlying
native behavior for email inputs, placeholders, disabled state, id/label wiring,
Button composition, description wiring, and native form control styling through
Input, Label, Button, Field, and Form evidence. The cluster still needs named
Input docs/fixture/Playwright proof, and `input-file` is currently missing
because `InputType` does not include `file`.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = [
  'input-demo',
  'input-disabled',
  'input-file',
  'input-with-button',
  'input-with-label',
  'input-with-text',
]
let failed = false
for (const id of ids) {
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (text.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
if (failed) process.exit(1)
NODE
```

Output:

```text
input-demo: 1
input-disabled: 1
input-file: 1
input-with-button: 1
input-with-label: 1
input-with-text: 1
```

```text
rg -n 'email|placeholder|disabled|file|Button|Label|htmlFor|for|description|ariaDescribedBy|Field|Tailwind|InputType|Playwright' issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: default email input and placeholder behavior, disabled email input,
file input type support and styling, Input plus Button composition, Input plus
Label wiring, Input plus Label plus description text, ownership of composition
by Input/Field/docs/fixtures/tests, Tailwind utility mapping, and current
RadCN package/docs/fixture/Playwright evidence.

Additional verification:

```text
rg -n "input-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:  `input-example-inventory.md`. Input example parity is not complete yet:
 M issues/0004-complete-shadcn-parity-and-docs/31-audit-input-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md
```

`git diff --check` and vendor status produced no output.

## Completion Review

Reviewer: Planck (`019e9b3e-8b4c-7543-b95d-e3bf5185e166`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: the recorded README `rg` output used a volatile line number that no
  longer matched the current README line. Fixed by omitting the line number in
  the recorded output.

Approval result: approved. Planck verified that only issue documentation is
changed or untracked, the inventory contains exactly one row for each of the 6
plain upstream Input examples, the result does not claim Input parity is
resolved, no package/docs/fixture/test source was implemented, the next cluster
is clear as Input example parity depth, `git diff --check` and vendor status
checks passed with no output, and the result commit had not been made before
completion review.

## Conclusion

Input needs one implementation-depth experiment. The next experiment should add
file input support and styling if Remix UI accepts it, then add named docs,
candidate fixtures, and Playwright coverage for all 6 upstream Input examples.
It should not broaden into `input-group` or `input-otp`, which are already
separate parity clusters.
