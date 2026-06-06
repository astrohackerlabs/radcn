# Experiment 38: Implement textarea example parity depth

## Description

Experiment 37 audited the 10 upstream shadcn/ui New York v4 textarea-related
examples. It found that prior Field, InputGroup, and Form clusters already
cover `field-textarea`, `input-group-textarea`, `form-rhf-textarea`,
`form-tanstack-textarea`, and `form-formisch-textarea`, while the 5 plain
Textarea examples still need named docs, fixture, and Playwright proof:

- `textarea-demo`
- `textarea-disabled`
- `textarea-with-button`
- `textarea-with-label`
- `textarea-with-text`

This experiment implements that missing proof while preserving RadCN
`Textarea` as a native control primitive. It should not add React, React Hook
Form, TanStack Form, Formisch, Zod, Valibot, Sonner toast, Tabler icons,
Tailwind, vendor imports, autosize dependencies, or new Textarea package APIs
unless a direct blocker is discovered and recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Textarea from seed docs into a rich docs page.
  - Render stable docs hooks for all 5 plain upstream example ids:
    `textarea-demo`, `textarea-disabled`, `textarea-with-button`,
    `textarea-with-label`, and `textarea-with-text`.
  - Use package-imported `Textarea` from `radcn/textarea`, `Button` from
    `radcn/button`, and `Label` from `radcn/label`.
  - Demonstrate default placeholder behavior, disabled state, Button
    composition, Label wiring, and helper text composition.
  - Explain Remix 3 divergences: shadcn `data-slot` maps to RadCN public hooks,
    Tailwind utilities map to classes/styles/CSS variables, React prop
    spreading maps to explicit props, and autosize/form libraries/toast/icons
    remain app-owned or covered by their owning packages.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/textarea.tsx`
  Add named Textarea fixture routes for all 5 plain upstream examples:
  `demo`, `disabled`, `with-button`, `with-label`, and `with-text`. Preserve
  the existing `default` route unless a replacement intentionally proves the
  same behavior.
- Update Playwright coverage in
  `radcn/fixtures/tests/native-controls.spec.ts` or a focused
  `textarea.spec.ts` if that keeps the suite clearer.
  - Verify `textarea-demo` renders a native textarea with placeholder
    `Type your message here.` and the public `data-radcn-textarea` hook.
  - Verify `textarea-disabled` renders a disabled native textarea.
  - Verify `textarea-with-button` renders Textarea plus a `Send message`
    Button.
  - Verify `textarea-with-label` wires Label to Textarea with the accessible
    name `Your message`.
  - Verify `textarea-with-text` renders Label, Textarea, and helper text.
  - Keep existing native-control coverage passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs evidence for all 5 named plain Textarea examples.
  - Assert source/API text mentions `Button`, `Label`, `data-slot`,
    `ariaDescribedBy` or `aria-describedby`, Tailwind mapping, React prop
    mapping, and autosize/form-library ownership copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/textarea-example-inventory.md`.
  - Change the 5 plain upstream rows from `Partial` to `Covered` only after
    docs, fixtures, and Playwright evidence exists.
  - Preserve prior covered outcomes for Field, InputGroup, and Form textarea
    variants.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `textarea` as a resolved example cluster with evidence from
    Experiments 37 and 38 plus `textarea-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Textarea example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/textarea.tsx` or Textarea
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
- Fixture Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-controls.spec.ts
  ```
  or the focused Textarea Playwright spec created by this experiment.
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all 10 upstream textarea-related example
  ids appear exactly once in `textarea-example-inventory.md` and every row is
  `Covered` or `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/textarea-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'textarea-demo',
    'textarea-disabled',
    'textarea-with-button',
    'textarea-with-label',
    'textarea-with-text',
    'field-textarea',
    'input-group-textarea',
    'form-rhf-textarea',
    'form-tanstack-textarea',
    'form-formisch-textarea',
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
  `examples` entry with `slug = "textarea"`, `status = "resolved"`, and
  evidence for Experiment 37, Experiment 38, and
  `textarea-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `textarea` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for textarea`.
- Fixture tests assert:
  - all 5 named Textarea routes expose native textarea behavior and
    `data-radcn-textarea`;
  - Button and Label keep their own public hooks and accessible behavior when
    composed with Textarea;
  - helper text stays app/docs composition and does not become Textarea-owned
    state.
- Docs coverage asserts the Textarea page renders stable evidence for all 5
  named docs examples and source/API text mentions the required mapping copy.
- Dependency and scope checks pass:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"][^'\"]*react-hook-form|from ['\"][^'\"]*@tanstack/react-form|from ['\"][^'\"]*@formisch|from ['\"][^'\"]*zod|from ['\"][^'\"]*valibot|from ['\"][^'\"]*@tabler|from ['\"][^'\"]*lucide-react|from ['\"][^'\"]*react-textarea-autosize|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  rg -n "\"(react|react-hook-form|@tanstack/react-form|@formisch/react|zod|valibot|@tabler/icons-react|lucide-react|react-textarea-autosize)\"\\s*:" package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json
  ```
  Both commands should produce no matches. Prose references to autosize,
  form-library, toast, and icon ownership in docs are allowed and should be
  covered by the docs-copy assertions above.
- `git diff --check`
- `git status --short` shows only expected docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any of the 5 plain Textarea rows remains `Partial` or `Missing`.
- The implementation marks `textarea` resolved without docs/fixture/Playwright
  evidence for every upstream textarea-related example.
- The implementation adds React, React Hook Form, TanStack Form, Formisch, Zod,
  Valibot, Sonner toast, Tabler icons, lucide, Tailwind, autosize, or vendor
  imports/dependencies.
- The implementation changes Button, Label, Field, InputGroup, Form, or Card
  APIs instead of composing existing behavior.
- Docs or fixtures imply `Textarea` owns Button, Label, Field, InputGroup,
  Form, Card, validation, toast, icons, helper-text, autosize, route, or
  command behavior.
- The regenerated parity inventory still recommends `textarea` as the first
  unresolved example cluster.

## Design Review

Reviewer: Kuhn (`019e9b77-766a-7581-93ef-d64459b8e0e8`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: the initial dependency/scope `rg` check searched for the raw string
  `react-textarea-autosize` across docs, which would fail on allowed prose that
  explains autosize ownership. Fixed by narrowing the no-match gate to imports
  and package dependency declarations, while leaving docs prose assertions to
  prove ownership copy.
- Blocker: the first fix referenced nonexistent `radcn/package.json` in the
  manifest dependency check. Fixed by removing that path and keeping only
  existing manifests.
- Major: none.
- Minor: none.

Approval result: approved after re-review. Kuhn confirmed that the issue README
links Experiment 38 as `Designed`, the experiment has Description, Changes,
Verification, and Design Review sections, the scope is limited to the five
plain Textarea examples, no implementation files changed before the plan
commit, vendor checkouts are clean, the plan preserves Textarea as a native
control primitive, the dependency/scope commands are runnable as no-match
gates, and `textarea` is only marked resolved after docs, fixtures, Playwright,
inventory, resolved-cluster, and regenerated parity evidence exist.
