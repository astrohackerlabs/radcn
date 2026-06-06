# Experiment 96: Implement label example parity depth

## Description

Experiment 95 audited the single direct upstream Label example, `label-demo`,
and found the cluster is partial. RadCN already has the package substrate:
`radcn/label`, `radcn/checkbox`, native `label` markup, `for` wiring,
disabled state, package exports, public hooks, exact Checkbox/Label substrate
evidence, and native label activation coverage.

This experiment should resolve the direct Label example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
Checkbox/Label composition while preserving RadCN's native model:

- render a Checkbox with stable id `terms` or a route-scoped equivalent;
- render `Label for="terms"` or a route-scoped equivalent;
- render visible text `Accept terms and conditions`;
- render layout evidence equivalent to `flex items-center space-x-2`;
- prove native label click activation toggles the checkbox;
- include public Label and Checkbox hooks;
- include mapping copy for `"use client"`, Radix Label, LabelPrimitive Root,
  `htmlFor`, native `for`, Checkbox composition, `className`, Tailwind
  utilities, `cn`, `data-slot`, `group-data-[disabled=true]`,
  `peer-disabled`, native disabled controls, and vendor source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Label or Checkbox primitives cannot represent the upstream
example's user-facing behavior, accessibility, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote the Label docs example from generic generated content to a named
    `label-demo` rich example if needed.
  - Render a stable docs hook
    `data-radcn-docs-label-family="label-demo"`.
  - Render the exact upstream checkbox id/label association, visible text,
    layout evidence, public Label and Checkbox hooks, and source snippet.
  - Include mapping copy for React/Radix/`htmlFor`/native `for`/Checkbox/
    `className`/Tailwind/`cn`/`data-slot`/disabled-state/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - a relevant candidate fixture module, likely
    `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`
  Add a named `label/demo` fixture route, preserving existing checkbox,
  input, textarea, form, and other label-using routes.
- Update fixture Playwright coverage, likely in
  `radcn/fixtures/tests/native-state.spec.ts`.
  - Verify `label/demo` renders the exact upstream composition, public hooks,
    layout evidence, and native label activation.
  - Keep existing native-state tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/label` page renders the named family hook,
    exact text, public hooks, layout evidence, native label activation, and
    required mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/label-example-inventory.md`.
  - Change `label-demo` from `Partial` to `Covered` only after docs, fixture,
    and Playwright evidence exists.
  - Record final decisions for `for`/`htmlFor`, native label activation,
    layout mapping, disabled/peer-disabled mapping, package API needs, and
    vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `label` as a resolved example cluster only after the inventory row is
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Label example outcome in `## Learnings`.
  - Update the Experiment 96 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Label is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Label or Checkbox primitives cannot meet the upstream example's user-facing
behavior, accessibility, and author-facing modifiability. If package code
changes, add package-level verification, synchronize generated styles if
needed, and record why the audit assumption changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture coverage for the chosen candidate test file passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-state.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `label-example-inventory.md` has exactly
  one direct upstream row, `label-demo`, and the row is `Covered` or an
  explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/label-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'label-demo')
  console.log(`${row.length} ${row[0]?.[0] ?? ''}`)
  if (
    rows.length !== 1 ||
    row.length !== 1 ||
    (!row[0][0].includes('| Covered |') &&
      !row[0][0].includes('| Intentional divergence |'))
  ) {
    process.exit(1)
  }
  NODE
  ```

- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "label"`, `status = "resolved"`, and evidence
  for Experiment 95, Experiment 96, and `label-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `label` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for label`.
- Fixture tests assert:
  - `label/demo` renders Label and Checkbox public hooks;
  - checkbox id and label `for` association are stable and equivalent to
    upstream `terms`;
  - visible text is `Accept terms and conditions`;
  - layout exposes flex/center/spacing evidence;
  - clicking the Label toggles the native checkbox;
  - disabled/peer-disabled behavior is documented as a mapping or covered by
    existing package behavior;
  - no test depends on React state, Radix internals, or literal DOM
    equivalence.
- Docs coverage asserts the Label page renders stable evidence for the named
  docs example and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 96 learning, Label
  inventory reference, and next generated recommendation were recorded:

  ```text
  rg -n "Experiment 96|label-example-inventory|next generated recommendation|Label" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

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
      name === 'next' ||
      name.startsWith('next/') ||
      name === '@radix-ui/react-label' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name === 'class-variance-authority' ||
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
    const patterns = [
      /^\s*import(?:\s+type)?[\s\S]*?\sfrom\s+['"]([^'"]+)['"]/gm,
      /^\s*import\s+['"]([^'"]+)['"]/gm,
      /\bimport\(\s*['"]([^'"]+)['"]\s*\)/gm,
      /\brequire\(\s*['"]([^'"]+)['"]\s*\)/gm,
    ]
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) {
        if (forbiddenImport(match[1])) {
          console.log(`${file}: forbidden import ${match[1]}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```

- A deterministic manifest check proves no forbidden dependencies exist in the
  current RadCN manifests, and the lockfile remains unchanged unless a
  reviewed package-level gap requires otherwise:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'package.json',
    'radcn/package.json',
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ].filter((file) => fs.existsSync(file))
  const forbidden = [
    'react',
    'react-dom',
    'next',
    '@radix-ui/react-label',
    'tailwindcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[section] ?? {})) {
        if (forbidden.includes(name) || name.startsWith('@radix-ui/')) {
          console.log(`${manifest}: forbidden ${section} ${name}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  ```

- If `tokens.css` changes, a deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` exactly serializes `tokens.css`.
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The named demo omits the exact upstream visible text, label/checkbox
  association, layout evidence, or native activation behavior.
- Native label activation is only documented and not tested.
- The implementation treats literal Radix or React DOM equivalence as required
  instead of proving user-facing behavior, accessibility, and modifiability.
- The implementation modifies vendor source.

## Design Review

Reviewer: Nietzsche the 3rd
(`019e9dfe-0089-7943-abff-4d571d238d1c`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The initial verification section did not include a concrete check
  that the Issue 4 README learning and next recommendation were recorded after
  implementation. Fixed by adding a deterministic `rg` check for Experiment
  96, `label-example-inventory`, the next generated recommendation, and Label
  wording in the README.

Approved. The reviewer confirmed the issue README links Experiment 96 with
status `Designed`, the plan has the required sections, the dirty state is
plan-only, vendor checkouts are clean, and the technical plan targets the exact
Experiment 95 Partial gap without adding forbidden dependencies.
