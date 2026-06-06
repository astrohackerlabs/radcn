# Experiment 62: Implement card example parity depth

## Description

Experiment 61 audited the two active upstream Card examples and found the
cluster is partial because RadCN has generic Card package/fixture proof but no
named evidence for:

- `card-demo`
- `card-with-form`

This experiment should resolve the Card example cluster by adding named docs,
candidate fixture routes, and Playwright coverage for both examples. The audit
found no current Card package API gap, so package changes are out of scope
unless implementation exposes a concrete missing Card behavior. The expected
mapping is composition over existing RadCN primitives: Card owns slots and
container styling; Button, Input, Label, Select, and native form semantics stay
owned by their respective package surfaces or app markup.

The implementation must not introduce React, Tailwind, `cn`, vendor imports,
form-state libraries, or a new Card dependency. DOM equivalence is not required;
the examples need equivalent user-facing behavior, accessibility, visual
modifiability, and author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Card from generic registry preview to an authored rich docs page if
    needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Card example ids using
    `data-radcn-docs-card-family`.
  - Demonstrate `card-demo` with a login/account Card containing:
    - `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
      `CardContent`, and `CardFooter`;
    - title text `Login to your account`;
    - description text `Enter your email below to login to your account`;
    - Sign Up action using RadCN Button link styling or an equivalent explicit
      app-owned link decision;
    - email and password fields with labels, native input types, and required
      semantics;
    - forgot-password link;
    - full-width Login button and outline Login with Google button.
  - Demonstrate `card-with-form` with a project Card containing:
    - title text `Create project`;
    - description text `Deploy your new project in one-click.`;
    - project-name Input and Label;
    - framework Select with options `Next.js`, `SvelteKit`, `Astro`, and
      `Nuxt.js`;
    - footer Cancel and Deploy buttons laid out like the upstream example.
  - Include mapping copy for `className` to `class`, `data-slot` to
    `data-radcn-card*`, `cn` and Tailwind utilities to package classes/CSS
    variables/app CSS, width utilities to `class`/`style`, CardAction,
    Button variants, Input types, native form semantics, Select composition,
    Form/Chart/Carousel separation, block separation, vendor source, and the
    stale `switch` registry dependency in `card-demo.json`.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add named Card fixture routes for `demo` and `with-form`, preserving existing
  generic Card routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/static-display.spec.ts`.
  - Verify `card/demo` exposes the full Card slot stack, title/description
    copy, CardAction, Sign Up link action, labelled email/password inputs,
    input types, required semantics, forgot-password link, full-width Login
    button, outline Login with Google button, public hooks, and custom
    width/layout styling evidence.
  - Verify `card/with-form` exposes the Card slot stack, project copy,
    labelled project-name input, framework Select trigger/content/options,
    Cancel and Deploy buttons, footer layout evidence, public hooks, and native
    form structure.
  - Keep existing generic Card static-display tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `card-demo` and `card-with-form`.
  - Assert rendered Card slot hooks, user-facing copy, input labels/types,
    required semantics, Select options, Button variants, width/layout evidence,
    public hooks, and required mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/card-example-inventory.md`.
  - Change `card-demo` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Change `card-with-form` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Record final API decisions for Card package scope, CardAction, width/layout
    styling, Button/Input/Label/Select composition, native forms, stale Switch
    registry metadata, and upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `card` as a resolved example cluster with evidence from Experiments 61
    and 62 plus `card-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Card example outcome and
  the next generated recommendation.

## Verification

Pass criteria:

- Docs and fixture checks pass:
  ```text
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
- A deterministic Node check proves both upstream Card example ids appear
  exactly once in `card-example-inventory.md`, and both are `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/card-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = new Map([
    ['card-demo', 'Covered'],
    ['card-with-form', 'Covered'],
  ])
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== expected.size
  for (const [id, outcome] of expected) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (row.length !== 1 || !row[0][0].includes(`| ${outcome} |`)) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!expected.has(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "card"`, `status = "resolved"`, and evidence
  for Experiment 61, Experiment 62, and `card-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `card` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for card`.
- Fixture tests assert:
  - named Card routes expose public RadCN hooks;
  - `card/demo` proves CardAction, login/account copy, labelled email/password
    inputs, required semantics, forgot-password link, full-width and outline
    Button presentation, and native form structure;
  - `card/with-form` proves project copy, labelled name input, Select
    composition/options, Cancel/Deploy buttons, footer layout, and native form
    structure;
  - existing generic Card behavior tests still pass.
- Docs coverage asserts the Card page renders stable evidence for both named
  docs examples and source/API text mentions the required mapping copy.
- Dependency and scope checks pass:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const path = require('path')
  const roots = ['radcn/apps/docs', 'radcn/fixtures/candidate-remix']
  function forbiddenImport(name) {
    return (
      name === 'react' ||
      name === 'react-dom' ||
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
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either active upstream Card example remains `Partial`, lacks named docs,
  fixture, or Playwright evidence, or is marked covered without proving its
  user-facing composition.
- The implementation adds React, Tailwind, `cn`, vendor imports, form-state
  dependencies, or a new Card dependency.
- The implementation changes the Card package API without a concrete gap
  recorded in this experiment.
- The implementation regresses generic Card fixture or docs coverage.
- `card` is marked resolved before docs, fixture, Playwright, inventory, and
  regenerated parity evidence all agree.

## Design Review

Reviewer: Pascal the 2nd (`019e9c69-1f32-7770-9cd7-b9ad2a4d55cd`) with fresh
context (`fork_context: false`).

Findings: none.

Approval: Approved for plan commit. The reviewer confirmed that Issue 4 links
Experiment 62 with status `Designed`, the experiment includes Description,
Changes, Verification, and Design Review sections, the scope is narrow enough
for one experiment, implementation has not started before the plan commit, the
plan preserves the no React/Tailwind/`cn`/vendor/form-state dependency
boundaries, and verification includes typechecks, fixture/docs Playwright
commands, deterministic inventory checks, `git diff --check`, and vendor
cleanliness checks.

## Result

**Result:** Pass

Implemented named Card example parity depth for `card-demo` and
`card-with-form` without changing the `radcn/card` package API.

The docs Card page is now an authored rich docs page with stable
`data-radcn-docs-card-family` hooks for both upstream examples. It renders the
login/account Card with `CardAction`, labelled email/password inputs, required
and type semantics, forgot-password link, full-width Login button, outline
Login with Google button, and mapping copy. It also renders the project Card
with fixed-width styling, project-name Input, framework Select composition,
Cancel and Deploy buttons, footer layout, and mapping copy.

The candidate fixture app now has named `card/demo` and `card/with-form`
routes. `static-display.spec.ts` verifies both named routes while preserving the
existing generic Card slot/custom-token tests. The Card inventory now marks
both examples `Covered`, `resolved-clusters.json` records `card` as resolved,
and the regenerated parity inventory recommends `command` next.

Verification run on 2026-06-06:

```text
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node inventory check for card-demo/card-with-form outcomes
node resolved-clusters.json check for card evidence
node scripts/audit-shadcn-parity.mjs and generated recommendation check
node forbidden import check
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

All commands passed. The fixture Playwright run reported 10 passed tests; the
docs Playwright run reported 5 passed tests. The vendor status loop printed no
output.

## Conclusion

Card example parity is resolved for this cluster. The implementation confirms
the Experiment 61 audit finding: Card needed named docs/fixture/test depth, not
a package API change. Card owns the reusable surface and slots, while Button,
Input, Label, Select, native forms, auth behavior, project creation behavior,
and overlay state remain composed package/app concerns. The next generated
Issue 4 recommendation is example parity for `command`.

## Completion Review

Reviewer: Chandrasekhar the 2nd (`019e9c71-39cf-7780-bed0-54e97a46dbc2`)
with fresh context (`fork_context: false`).

Findings:

- Major: the first pass found that docs and fixture footer submit buttons were
  outside their native forms, so `Login` and `Deploy` did not submit the
  relevant forms despite the experiment claiming native form semantics. Fixed
  by wrapping each Card's `CardContent` and `CardFooter` in the same native
  form and asserting the form-scoped submit buttons.
- Minor: docs coverage checked email/password input types but not required
  semantics. Fixed by adding docs Playwright assertions for the required email
  and password fields.

Re-review: Chandrasekhar the 2nd re-reviewed the fixes and confirmed both
findings are resolved. The reviewer also checked that the secondary
`Login with Google` and `Cancel` buttons remain non-submit actions because
`radcn/button` defaults to `type="button"`.

Approval: Approved after fixes. The reviewer confirmed the implementation
matches the approved scope, the recorded checks passed, the README status and
learnings are present, `git diff --check` passed, vendor status was clean, the
result commit had not been made before review, no package API or dependency
files changed, and no React, Tailwind, `cn`, vendor imports, form-state
dependencies, or unjustified Card package API changes were added.
