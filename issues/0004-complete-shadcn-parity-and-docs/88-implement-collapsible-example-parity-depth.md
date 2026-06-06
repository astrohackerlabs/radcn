# Experiment 88: Implement collapsible example parity depth

## Description

Experiment 87 audited the single direct upstream Collapsible example,
`collapsible-demo`, and found the cluster is partial. RadCN already has a
dependency-free `radcn/collapsible` package primitive, fixtures, and
Playwright coverage for native `details`/`summary` behavior, open/closed
state, keyboard toggling, disabled state, public hooks, content visibility,
and custom tokens. The missing evidence is named `collapsible-demo` parity in
docs, candidate fixtures, and tests.

This experiment should resolve the direct Collapsible example cluster by
adding named docs, candidate fixture, and Playwright coverage for the exact
upstream composition:

- default closed disclosure state;
- 350px flex-column root layout with gap;
- header row with `@peduarte starred 3 repositories`;
- icon-only accessible `Toggle` trigger matching the upstream ghost icon
  Button shape;
- app-owned chevrons icon evidence in place of lucide-react;
- always-visible repository row `@radix-ui/primitives`;
- toggled content rows `@radix-ui/colors` and `@stitches/react`;
- rounded bordered monospace repository row styling;
- public Collapsible/Trigger/Content hooks;
- mapping copy for React state, Radix Collapsible, `data-slot`, `className`,
  Tailwind utilities, `asChild`, Button composition, lucide icons, native
  `details`/`summary`, custom tokens, and vendor source.

The implementation should keep Collapsible dependency-free over native
`details` and `summary`. Tests should verify native disclosure behavior and
stable computed CSS, not DOM equivalence with Radix or React state. The
current package API should be preferred. Package code should change only if
implementation proves the current trigger API cannot provide equivalent
icon-only accessible trigger behavior or author-facing modifiability.

Do not add React, Radix, Tailwind, lucide-react, class-variance-authority,
`cn`, Slot, or vendor dependencies. Do not modify vendor source.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Collapsible from generic seed docs to a rich docs page if needed.
  - Render a stable docs hook
    `data-radcn-docs-collapsible-family="collapsible-demo"`.
  - Demonstrate `collapsible-demo` with:
    - root Collapsible defaulting closed;
    - 350px root width and flex-column/gap styling evidence;
    - header row layout evidence;
    - heading text `@peduarte starred 3 repositories`;
    - accessible `Toggle` trigger;
    - ghost icon Button or equivalent trigger styling evidence;
    - icon-size `size-8` or equivalent 32px dimensions;
    - app-owned chevrons icon evidence;
    - always-visible `@radix-ui/primitives` row;
    - CollapsibleContent with `@radix-ui/colors` and `@stitches/react` rows;
    - rounded bordered monospace row styling evidence;
    - public `data-radcn-collapsible`,
      `data-radcn-collapsible-trigger`, and
      `data-radcn-collapsible-content` hook evidence.
  - Include mapping copy for React client component marker, React
    `useState`, `open`, `onOpenChange`, Radix Collapsible, `data-slot`,
    `className`, Tailwind width/flex/gap/spacing/border/rounded/font
    utilities, `asChild`, Button ghost/icon composition, lucide
    `ChevronsUpDown`, screen-reader text, native `details`/`summary`, custom
    tokens, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/collapsible.tsx`
  Add a named `collapsible/demo` fixture route, preserving existing default,
  open, disabled, and custom-token routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/collapsible.spec.ts`.
  - Verify `collapsible/demo` starts closed with native `details` semantics;
  - verify exact heading, Toggle accessible text, app-owned chevrons icon
    evidence, always-visible row, hidden content rows, public hooks, root
    layout, header layout, trigger dimensions/styling, and repository row
    styling;
  - click or keyboard-toggle the trigger and verify the content rows become
    visible;
  - keep existing Collapsible tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/collapsible` page renders the named family
    hook, exact text, default closed state, trigger accessibility, row
    visibility/toggle behavior, public hooks, layout/styling evidence, icon
    evidence, and dependency-divergence/mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md`.
  - Change `collapsible-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record the final trigger accessibility strategy, Button/`asChild`
    mapping, app-owned chevrons icon strategy, React state mapping, and any
    package API changes.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `collapsible` as a resolved example cluster only after the example row
    is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Collapsible example outcome in `## Learnings`.
  - Update the Experiment 88 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Collapsible is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Collapsible primitives cannot meet the upstream example's user-facing
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

- Fixture Collapsible coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts collapsible.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `collapsible-example-inventory.md` has
  exactly one direct upstream row, `collapsible-demo`, and the row is
  `Covered` or an explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'collapsible-demo')
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
  `examples` entry with `slug = "collapsible"`, `status = "resolved"`, and
  evidence for Experiment 87, Experiment 88, and
  `collapsible-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `collapsible` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for collapsible`.
- Fixture tests assert:
  - `collapsible/demo` renders native `details` with public
    `data-radcn-collapsible` hook;
  - the named demo starts closed;
  - exact heading text and all three exact repository row texts are present;
  - only `@radix-ui/primitives` is visible before opening;
  - `@radix-ui/colors` and `@stitches/react` become visible after toggling;
  - the trigger has accessible name `Toggle` and public trigger hook;
  - the app-owned chevrons icon is present and hidden from assistive tech;
  - root width is 350px or an exact documented equivalent;
  - root/header/content row layout and rounded bordered monospace row styling
    are visible through classes, styles, or computed CSS;
  - no test depends on React state or Radix DOM equivalence.
- Docs coverage asserts the Collapsible page renders stable evidence for the
  named docs example and source/API text mentions the required mapping copy.
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
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'lucide-react' ||
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
    'radix-ui',
    '@radix-ui/react-collapsible',
    'lucide-react',
    'tailwindcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[section] ?? {})) {
        if (forbidden.includes(name)) {
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
  `radcn/packages/radcn/src/styles/index.ts` exactly serializes
  `tokens.css`.
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The implementation changes the package to depend on React, Radix, Slot,
  lucide-react, Tailwind, `cn`, or class-variance-authority.
- The named demo omits any upstream text:
  `@peduarte starred 3 repositories`, `Toggle`,
  `@radix-ui/primitives`, `@radix-ui/colors`, or `@stitches/react`.
- The trigger lacks an accessible name or loses native disclosure toggling.
- The hidden repository rows are visible before the Collapsible opens, unless
  an intentional divergence is documented and tested.
- The implementation treats literal DOM equivalence with Radix as required
  instead of proving visual behavior, accessibility, and modifiability.
- Vendor source is modified or imported.

## Design Review

Reviewer: Kant the 2nd (`019e9d97-8463-7b21-9ea0-7fec05cd8aa5`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 88 as `Designed`, required sections are present, scope is narrow
around the single upstream `collapsible-demo` example, implementation has not
started before the plan commit, package changes are conditional, verification
has concrete typecheck/test/dependency/lockfile/hygiene criteria, and vendor
checkouts are clean.
