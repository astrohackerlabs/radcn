# Experiment 32: Implement input example parity depth

## Description

Experiment 31 audited the 6 plain upstream shadcn/ui Input examples and found
that RadCN has most native input behavior already, but plain Input example
parity is not complete. The missing package behavior is `type="file"` support
and file-input styling. The missing proof is named docs, fixture, and
Playwright coverage for:

- `input-demo`
- `input-disabled`
- `input-file`
- `input-with-button`
- `input-with-label`
- `input-with-text`

This experiment implements only the plain `input` example cluster. It should
not broaden into `input-group` or `input-otp`, which are separate clusters with
their own evidence.

## Changes

- Update `radcn/packages/radcn/src/components/input.tsx`.
  - Add `file` to `InputType`.
  - Keep `text` as the default type.
  - Preserve the existing typed prop surface instead of forwarding arbitrary
    React-style input props.
  - Ensure `type="file"` renders a native file input without an invalid
    textbox role.
  - Preserve current text-like input behavior for `text`, `email`, `password`,
    `tel`, and `url`.
- Update `radcn/packages/radcn/src/styles/tokens.css` and regenerate
  `radcn/packages/radcn/src/styles/index.ts`.
  - Add native file input styling hooks for `.radcn-input[type="file"]` and
    `::file-selector-button`.
  - Keep file styling dependency-free and CSS-native; do not add Tailwind,
    upstream utility classes, or a new component.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Input docs page from the current seed example into named
    examples covering all 6 upstream plain Input examples.
  - Show package-imported `Input`, `Button`, and `Label` composition where the
    upstream examples compose those primitives.
  - Include an accessible description example using explicit
    `ariaDescribedBy` wiring.
  - Explain the Remix 3 mapping: native inputs, explicit Label/Button
    composition, CSS-native file selector styling, no React prop forwarding,
    and aspirational installation copy only.
- Add a focused candidate fixture renderer if one does not already exist:
  - `radcn/fixtures/candidate-remix/app/fixtures/input.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/index.tsx`
  The fixture should render named routes for the 6 upstream example ids:
  `demo`, `disabled`, `file`, `with-button`, `with-label`, and `with-text`.
- Update `radcn/fixtures/scenarios/index.ts`.
  - Add `component: "input"` scenarios for all 6 upstream plain Input examples.
  - Keep existing `field`, `input-group`, and `input-otp` scenarios intact.
- Update Playwright coverage in
  `radcn/fixtures/tests/form-input-cluster.spec.ts` or a focused
  `input.spec.ts` if that keeps the suite clearer.
  - Verify `input-demo` renders a native email input with placeholder text.
  - Verify `input-disabled` is disabled and keeps the disabled visual hook.
  - Verify `input-file` renders `type="file"`, is label-addressable, does not
    expose `role="textbox"`, and can accept a test file through Playwright.
  - Verify `input-with-button` composes an email input with an outline submit
    Button and submits the native form value.
  - Verify `input-with-label` wires `Label for` to the input `id`.
  - Verify `input-with-text` wires description text through
    `aria-describedby`.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Add representative Input page checks that prove the expanded docs render
    the named examples, the file input, and the source/API copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/input-example-inventory.md`.
  - Change each upstream row to `Covered` only after package/docs/fixture/
    Playwright evidence exists.
  - Preserve the Experiment 31 mapping decisions.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `input` as a resolved example cluster with evidence from Experiments 31
    and 32 plus `input-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Input example outcome
  and the next generated recommendation.

## Verification

Pass criteria:

- Package and docs checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts form-input-cluster.spec.ts
  ```
  or the focused Input Playwright spec created by this experiment.
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- The generated styles export is synchronized:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const css = fs.readFileSync('radcn/packages/radcn/src/styles/tokens.css', 'utf8')
  const index = fs.readFileSync('radcn/packages/radcn/src/styles/index.ts', 'utf8')
  const expected = `export const radcnStyles = ${JSON.stringify(css)}\n`
  if (index !== expected) process.exit(1)
  NODE
  ```
- A deterministic Node check proves all 6 upstream Input example ids appear
  exactly once in `input-example-inventory.md` and every row is `Covered`:
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
    const row = text.match(new RegExp('\\| `'+id+'` \\|[^\\n]+', 'g')) ?? []
    console.log(`${id}: ${row.length} ${row[0] ?? ''}`)
    if (row.length !== 1 || !row[0].includes('| Covered |')) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "input"`, `status = "resolved"`, and evidence
  for Experiment 31, Experiment 32, and `input-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `input` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for input`.
- Fixture tests assert:
  - the demo input has `type="email"` and placeholder `Email`;
  - the disabled input is disabled;
  - the file input has `type="file"`, no textbox role, file-selector styling,
    and accepts a temporary file through Playwright;
  - the Button composition submits the email value through native form
    semantics;
  - the Label composition is addressable through accessible label text;
  - the description composition sets `aria-describedby` to the helper text id.
- Docs coverage asserts the Input page renders stable evidence for all 6 named
  docs examples: `input-demo`, `input-disabled`, `input-file`,
  `input-with-button`, `input-with-label`, and `input-with-text`.
- Docs coverage asserts the Input page source/API text mentions `type="file"`,
  `ariaDescribedBy`, `Label`, and `Button`.
- Dependency and scope checks pass:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  ```
  The command should produce no matches.
- If a focused Input Playwright spec is created, the existing
  `form-input-cluster.spec.ts` must still pass or the experiment must explain
  why the coverage moved.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test,
  issue, resolved-cluster, and generated-inventory changes before the result
  commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- `Input` still cannot render `type="file"`.
- `type="file"` renders with `role="textbox"`.
- Any of the 6 plain Input example rows remains `Partial` or `Missing`.
- The implementation marks `input` resolved without package/docs/fixture/
  Playwright evidence for every upstream plain Input example.
- The experiment changes `InputGroup` or `InputOTP` APIs.
- The implementation adds React, Tailwind, lucide, Radix, or vendor imports.
- Docs or fixtures imply that `Input` owns Label, Button, Field, or form state.
- The regenerated parity inventory still recommends `input` as the first
  unresolved example cluster.

## Design Review

Reviewer: Copernicus (`019e9b41-ead3-7723-8439-ca510848a81b`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: docs Playwright verification said the Input page should render
  expanded examples, but did not explicitly require checking stable evidence
  for each of the 6 named docs examples. Fixed by making docs coverage require
  evidence for `input-demo`, `input-disabled`, `input-file`,
  `input-with-button`, `input-with-label`, and `input-with-text`.

Approval result: approved. Copernicus confirmed the README links Experiment 32
as `Designed`, the plan has the required Description, Changes, Verification,
and Design Review sections, the scope is limited to the 6 plain Input examples,
no implementation has started, file-input concerns are covered, verification
has concrete pass/fail criteria, hygiene checks are present, vendor cleanliness
is checked, and the technical plan is likely to achieve the goal.

## Result

**Result:** Pass

Input example parity depth is implemented for all 6 plain upstream examples:
`input-demo`, `input-disabled`, `input-file`, `input-with-button`,
`input-with-label`, and `input-with-text`.

Package changes:

- `radcn/packages/radcn/src/components/input.tsx` now includes `file` in
  `InputType`.
- File and password inputs render without `role="textbox"`; text-like inputs
  keep the existing textbox role.
- `radcn/packages/radcn/src/styles/tokens.css` adds
  `.radcn-input[type="file"]` and `::file-selector-button` styling, and
  `radcn/packages/radcn/src/styles/index.ts` was regenerated.
- `radcn/packages/radcn/src/components/input-group.tsx` now excludes `file`
  from `InputGroupInputProps` as a type-only guard, preserving the existing
  non-file InputGroup input surface after `InputType` widened.

Docs, fixtures, tests, and inventory changes:

- `radcn/apps/docs/app/content/components.tsx` expands the Input docs page into
  a six-example parity preview using package-imported `Input`, `Button`, and
  `Label`.
- `radcn/apps/docs/tests/coverage.spec.ts` checks stable docs evidence for all
  6 named Input examples plus `type="file"`, `ariaDescribedBy`, `Button`, and
  `Label` source/API text.
- `radcn/fixtures/candidate-remix/app/fixtures/input.tsx`,
  `radcn/fixtures/candidate-remix/app/fixtures/index.tsx`,
  `radcn/fixtures/scenarios/index.ts`, and
  `radcn/fixtures/scenarios/types.ts` add focused `input` fixture routes for
  `demo`, `disabled`, `file`, `with-button`, `with-label`, and `with-text`.
- `radcn/fixtures/tests/input.spec.ts` verifies email placeholder behavior,
  disabled state, native file input semantics and file upload, Button form
  submission, Label wiring, and description wiring.
- `input-example-inventory.md` marks all 6 upstream rows `Covered`.
- `resolved-clusters.json` marks `input` resolved in the example queue, and
  the regenerated `parity-inventory.md` now recommends example parity for
  `toggle`.

Verification run:

```text
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm --dir radcn/apps/docs typecheck
```

All three commands passed.

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts input.spec.ts
```

Output summary:

```text
2 passed
```

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts form-input-cluster.spec.ts
```

Output summary:

```text
10 passed
```

```text
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

Output summary:

```text
5 passed
```

The focused Playwright commands emitted the existing Node
`module.register()` deprecation warning and `NO_COLOR`/`FORCE_COLOR` warning.

Additional deterministic checks passed:

```text
node - <<'NODE'
const fs = require('fs')
const css = fs.readFileSync('radcn/packages/radcn/src/styles/tokens.css', 'utf8')
const index = fs.readFileSync('radcn/packages/radcn/src/styles/index.ts', 'utf8')
const expected = `export const radcnStyles = ${JSON.stringify(css)}\n`
if (index !== expected) process.exit(1)
NODE
```

```text
node scripts/audit-shadcn-parity.mjs
```

Output:

```text
wrote issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md
```

Deterministic inventory checks proved all 6 rows appear exactly once in
`input-example-inventory.md` with `Covered` outcomes, `resolved-clusters.json`
contains the `input` resolved example entry with Experiment 31, Experiment 32,
and inventory evidence, `input` is absent from unresolved example clusters, and
the first recommended cluster is no longer `Example parity for input`.

Dependency and hygiene checks passed:

```text
rg -n "from ['\"]react['\"]|from ['\"][^'\"]*lucide-react|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The dependency `rg` exited 1 with no matches. `git diff --check` and vendor
status produced no output.

## Completion Review

Reviewer: Volta (`019e9b49-4bd6-7a43-a114-63b7631087cf`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Volta verified that the implementation stayed scoped
to plain Input, the InputGroup touch is only a type guard excluding `file`, file
inputs render without `role="textbox"`, CSS-native file selector styling exists,
Playwright proves file upload behavior, docs render stable hooks for all 6
named examples, docs coverage checks all 6, the experiment has Result and
Conclusion, the README records learnings and marks Experiment 32 `Pass`,
`resolved-clusters.json` resolves `input`, `parity-inventory.md` recommends
`toggle` instead of `input`, dependency and hygiene checks pass, vendor status
is clean, and the result commit had not been made before completion review.

## Conclusion

Plain Input example parity is resolved. The next experiment should follow the
regenerated inventory recommendation and audit example parity for `toggle`.
