# Experiment 64: Implement command example parity depth

## Description

Experiment 63 audited the two active upstream Command examples and found the
cluster is partial because RadCN has generic Command package/fixture proof but
no named evidence for:

- `command-demo`
- `command-dialog`

This experiment should resolve the Command example cluster by adding named docs,
candidate fixture routes, and Playwright coverage for both examples. Unlike the
previous Card cluster, the audit found one concrete package-level gap: upstream
uses visible `CommandGroup heading` labels, while RadCN currently has generic
group containers without a first-class heading/label mapping. A narrow
`CommandGroup` heading or label API change is in scope if implementation confirms
it is the cleanest Remix-native mapping.

The `command-dialog` keyboard shortcut remains app-owned behavior. RadCN should
not add package-owned document-level shortcut routing, React-style controlled
state callbacks, React, `cmdk`, `lucide-react`, Tailwind, `cn`, or vendor
dependencies. DOM equivalence is not required; the examples need equivalent
user-facing behavior, accessibility, visual modifiability, and author-facing
customization.

## Changes

- Update `radcn/packages/radcn/src/components/command.tsx`.
  - Add the narrowest needed group label API, expected to be
    `CommandGroup heading={...}` or an equivalent explicitly documented
    Remix-native prop.
  - Render a visible group heading with public `data-radcn-command-group-heading`
    hook when the prop is present.
  - Wire accessible group labelling with deterministic ids where feasible.
  - Preserve existing child-only `CommandGroup` behavior.
  - Do not add React, `cmdk`, `lucide-react`, Tailwind, `cn`, or vendor imports.
- Update `radcn/packages/radcn/src/styles/index.ts`.
  - Add package styles for command group headings and any named-example custom
    hooks only through RadCN classes/CSS variables.
  - Preserve existing Command layout, filtering, custom-token, and dialog
    styling.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Command from a generic registry preview to an authored rich docs
    page if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Command example ids using
    `data-radcn-docs-command-family`.
  - Demonstrate `command-demo` with:
    - root Command styled like a rounded bordered command card;
    - placeholder `Type a command or search...`;
    - empty copy `No results found.`;
    - headings `Suggestions` and `Settings`;
    - rows `Calendar`, `Search Emoji`, disabled `Calculator`, `Profile`,
      `Billing`, and `Settings`;
    - shortcut hints `⌘P`, `⌘B`, and `⌘S`;
    - app-owned icon composition using the project's existing plain-SVG/icon
      strategy rather than `lucide-react`.
  - Demonstrate `command-dialog` with:
    - visible `Press ⌘J` guidance, using RadCN Kbd or equivalent docs-owned
      markup;
    - CommandDialog title/description behavior;
    - the same upstream rows, with Calculator enabled in the dialog example;
    - app-owned `⌘J`/`Ctrl+J` shortcut opening behavior where the example is
      enhanced in the browser;
    - Escape close behavior through existing Dialog enhancement.
  - Include mapping copy for React props/state/effects, `CommandGroup heading`,
    `CommandDialog open`, `onOpenChange`, global keyboard listeners, icons,
    `className`, `data-slot`, `cmdk`, `CommandPrimitive`, `lucide-react`, `cn`,
    Tailwind utilities, Dialog composition, Kbd composition, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/command.tsx`
  Add named Command fixture routes for `demo` and `dialog-demo`, preserving
  existing generic Command routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/combobox-command.spec.ts`.
  - Verify `command/demo` exposes public Command hooks, placeholder copy,
    empty copy, visible group headings, separator, the six upstream rows,
    disabled Calculator, app-owned icon hooks, shortcut hints, filtering,
    keyboard activation, and custom card styling evidence.
  - Verify `command/dialog-demo` exposes visible `Press ⌘J` guidance, Kbd
    composition if used, initially closed dialog behavior, app-owned
    `Meta+J`/`Control+J` opening behavior in the candidate fixture, visible
    dialog content, the six upstream rows, enabled Calculator, shortcut hints,
    and Escape close behavior.
  - Keep existing generic Command and Combobox behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `command-demo` and `command-dialog`.
  - Assert rendered Command hooks, visible group headings, copy, rows, disabled
    state, shortcut hints, icon hooks, dialog guidance, dialog behavior where
    enhanced, and required mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/command-example-inventory.md`.
  - Change `command-demo` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Change `command-dialog` to `Covered` only after docs, fixture, and
    Playwright evidence exists, including app-owned shortcut opening in the
    candidate fixture. If that cannot be implemented, keep `command-dialog`
    `Partial` and do not add `command` to `resolved-clusters.json`.
  - Record final API decisions for group headings, icon composition,
    global-shortcut ownership, Dialog/Kbd composition, public hooks, and
    upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `command` as a resolved example cluster only after both example rows are
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Command example outcome
  and the next generated recommendation.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright Command/Combobox coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts combobox-command.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Command example ids appear
  exactly once in `command-example-inventory.md`, and both are `Covered` or an
  explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/command-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['command-demo', 'command-dialog']
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== expected.length
  for (const id of expected) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      (!row[0][0].includes('| Covered |') &&
        !row[0][0].includes('| Intentional divergence |'))
    ) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!expected.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "command"`, `status = "resolved"`, and evidence
  for Experiment 63, Experiment 64, and `command-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `command` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for command`.
- Fixture tests assert:
  - named Command routes expose public RadCN hooks;
  - `command/demo` proves group headings, disabled Calculator, six rows,
    shortcuts, filtering, activation, app-owned icon hooks, and custom card
    styling;
  - `command/dialog-demo` proves shortcut guidance, app-owned shortcut opening,
    visible dialog content, six rows, enabled Calculator, shortcuts, and Escape
    close behavior;
  - existing generic Command and Combobox behavior tests still pass.
- Docs coverage asserts the Command page renders stable evidence for both named
  docs examples and source/API text mentions the required mapping copy.
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
      name === 'cmdk' ||
      name === 'lucide-react' ||
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
- A deterministic manifest and lockfile check proves no forbidden dependencies
  were added:
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
    'cmdk',
    'lucide-react',
    'tailwindcss',
    '@tailwindcss/vite',
    '@tailwindcss/postcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      const deps = json[field] || {}
      for (const dep of forbidden) {
        if (Object.prototype.hasOwnProperty.call(deps, dep)) {
          console.log(`${file}: forbidden ${field} dependency ${dep}`)
          failed = true
        }
      }
      for (const dep of Object.keys(deps)) {
        if (dep.includes('vendor') || String(deps[dep]).includes('vendor')) {
          console.log(`${file}: forbidden vendor dependency ${dep}`)
          failed = true
        }
      }
    }
  }
  const diff = require('child_process')
    .execFileSync('git', ['diff', '--', 'pnpm-lock.yaml'], { encoding: 'utf8' })
  for (const line of diff.split('\n')) {
    if (!line.startsWith('+') || line.startsWith('+++')) continue
    for (const dep of forbidden) {
      if (line.includes(dep) || line.includes('vendor')) {
        console.log(`pnpm-lock.yaml: forbidden added lockfile line ${line}`)
        failed = true
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- `git diff --check`
- `git status --short` shows only expected Experiment 64 files before the
  result commit: package Command source/styles, docs content/tests, candidate
  command fixtures/scenarios, fixture Playwright tests, Command inventory,
  resolved clusters, parity inventory, Issue 4 README, and Experiment 64.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either active upstream Command example remains `Partial`, lacks named docs,
  fixture, or Playwright evidence, or is marked covered without proving its
  user-facing composition.
- The implementation adds React, `cmdk`, `lucide-react`, Tailwind, `cn`, vendor
  imports, or a new Command dependency.
- The implementation makes global `⌘J`/`Ctrl+J` shortcut routing a package
  responsibility instead of app-owned example behavior.
- The implementation changes broad Dialog state APIs without a concrete
  Command example need recorded in this experiment.
- The implementation regresses generic Command, CommandDialog, Combobox, or
  docs coverage.
- `command` is marked resolved before docs, fixture, Playwright, inventory, and
  regenerated parity evidence all agree.

## Design Review

Reviewer: Boole the 2nd (`019e9c7f-34bb-7721-b0c8-e470998f5c26`),
fresh-context Codex subagent (`fork_context: false`).

Initial findings:

- Blocker: the plan made app-owned `⌘J`/`Ctrl+J` dialog opening conditional, so
  `command-dialog` could be marked resolved without proving behavior required by
  Experiment 63.
- Major: verification checked forbidden imports but did not include package
  manifest/lockfile checks or an expected `git status --short` worktree-scope
  check.
- Minor: none.

Fixes:

- Made app-owned shortcut opening mandatory in the candidate fixture and
  Playwright coverage. If that cannot be implemented, `command-dialog` must stay
  `Partial` and `command` must not be added to `resolved-clusters.json`.
- Added deterministic package manifest/lockfile dependency checks and expected
  `git status --short` result-scope criteria.
- Narrowed the lockfile check to added `pnpm-lock.yaml` diff lines so existing
  reference-fixture dependencies do not make the verifier fail before
  implementation starts.

Re-review: approved. The reviewer confirmed the shortcut-opening blocker is
resolved, the manifest/worktree verification gap is resolved, and the narrowed
lockfile check avoids pre-existing reference-fixture dependencies while still
checking newly added forbidden lockfile lines. The reviewer ran the verifier
block locally and it exited `0`.

## Result

**Result:** Pass

Implemented named Command example parity depth for `command-demo` and
`command-dialog`.

Package changes:

- `CommandGroup` now accepts `heading` and `id`.
- Groups with headings render visible
  `data-radcn-command-group-heading` content.
- Explicit ids wire `aria-labelledby` from the group to its heading.
- Existing child-only `CommandGroup` behavior remains supported.
- Command group heading styles were added to the package token CSS and exported
  `radcnStyles`.

Docs and fixtures:

- The docs site now treats Command as a rich authored page with
  `data-radcn-docs-command-family="command-demo"` and
  `data-radcn-docs-command-family="command-dialog"` examples.
- The candidate fixture app now has named `command/demo` and
  `command/dialog-demo` routes.
- Both surfaces render the upstream rows, group headings, empty copy, app-owned
  icon hooks, shortcut hints, disabled Calculator in `command-demo`, enabled
  Calculator in `command-dialog`, Kbd shortcut guidance, and dialog
  title/description behavior.
- App-owned browser enhancement proves `⌘J`/`Ctrl+J` opening without making
  global shortcut routing part of the Command package.

Inventory and parity state:

- `command-example-inventory.md` now marks both rows `Covered`.
- `resolved-clusters.json` records `command` as a resolved example cluster with
  evidence from Experiments 63 and 64 plus the inventory.
- `parity-inventory.md` was regenerated and now recommends example parity for
  `dialog` next.

Verification run on 2026-06-06:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts combobox-command.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

The fixture Playwright run passed 11 tests. The docs Playwright run passed 5
tests. The known Node `module.register()` deprecation warning appeared during
Playwright runs.

Additional verification:

- Deterministic `command-example-inventory.md` row/outcome check.
- Deterministic `resolved-clusters.json` check for `command`.
- Regenerated parity check proving `command` is absent from unresolved example
  clusters and the first recommendation is no longer Command.
- Dependency and scope checks for forbidden imports, manifests, and added
  lockfile lines.
- `git diff --check`
- Vendor cleanliness check.

All verification passed.

## Completion Review

Reviewer: Nietzsche the 2nd (`019e9c8a-ee8d-71d3-af3c-e396821b639e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed that the implementation matches the
approved Experiment 64 scope, `CommandGroup` only adds narrow `heading`/`id`
support while preserving child-only groups, shortcut opening lives in docs and
fixture app code rather than the Command package, no forbidden dependency/import
was added, deterministic inventory/resolved-cluster/parity checks passed, repo
hygiene and worktree scope were clean, and the result commit had not been made
before completion review.

## Conclusion

The Command example cluster is resolved. RadCN now supports the missing group
heading surface directly, while preserving the project rule that icons,
React-style state, `cmdk`, `lucide-react`, Tailwind, `cn`, vendor code, and
global command-palette shortcuts are not package dependencies. The next
experiment should audit the `dialog` example cluster recommended by the
regenerated inventory.
