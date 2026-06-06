# Experiment 105: Implement popover example parity depth

## Description

Experiment 104 audited the single direct upstream Popover example,
`popover-demo`, and found it partial. RadCN already has the package substrate
and behavior coverage for Popover, but there is no named docs, fixture, and
Playwright evidence for the exact upstream dimensions form.

This experiment should resolve the direct Popover example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free model:

- render a Popover trigger with visible text `Open popover` and outline
  Button-style presentation;
- render Popover content at the upstream default align `center` and sideOffset
  `4`;
- map upstream `PopoverContent className="w-80"` to a 20rem content width via
  class/style/CSS variable evidence;
- render heading `Dimensions` and description
  `Set the dimensions for the layer.`;
- render four labelled inputs with exact ids/default values: `width` `100%`,
  `maxWidth` `300px`, `height` `25px`, and `maxHeight` `none`;
- prove root/trigger/portal/content hooks, open/close browser behavior,
  non-modal behavior, and the existing custom-token/modifiability evidence;
- record dependency-divergence mapping for `"use client"`, React props, Radix
  Popover primitives, implicit Radix portal, `PopoverTrigger asChild`, Button,
  Input, Label, `className`, Tailwind utilities, `cn`, `data-slot`,
  transition/data-state/side styling, browser behavior, and vendor source.

The implementation should not add React, Radix, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Popover primitives cannot represent the upstream example's
user-facing behavior, accessibility, browser behavior, or author-facing
modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Popover docs from generic generated content to a named
    `popover-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-popover-family="popover-demo"` and any part/form hooks
    needed by docs tests.
  - Render the exact upstream dimensions form and source snippet.
  - Include mapping copy for React/Radix/`asChild`/Button/Input/Label/
    `className`/Tailwind/`cn`/`data-slot`/portal/default positioning/
    transition/custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`
  Add a named `popover/demo` fixture route that renders the exact upstream
  dimensions form and preserves existing `default`, `default-open`,
  `side-align`, `outside-dismiss`, and `custom-token` scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/positioned-overlays.spec.ts`.
  - Verify `popover/demo` renders the exact trigger text, outline button-style
    trigger mapping, default side/align/sideOffset hooks, 20rem content width,
    exact heading/description, label/input associations, ids/default values,
    root/trigger/portal/content hooks, open/close behavior, non-modal behavior,
    and no React/Radix/Tailwind dependency behavior.
  - Keep existing default-open, outside-dismiss, side-align, close, focus, and
    custom-token coverage for behavior and modifiability.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/popover` page renders the named family hook,
    exact demo text, exact form labels/default values, public hooks, source
    snippet, and required dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/popover-example-inventory.md`.
  - Change `popover-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for trigger composition, Button/Input/Label mapping,
    portal mapping, content width, default align/sideOffset, transition hooks,
    browser behavior, custom-token support, package API needs, and vendor
    source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `popover` as a resolved example cluster only after the inventory row is
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Popover example outcome in `## Learnings`.
  - Update the Experiment 105 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Popover is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Popover primitives cannot meet the upstream example's user-facing behavior,
accessibility, browser behavior, and author-facing modifiability. If package
code changes, add package-level verification and record why the audit
assumption changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture coverage for positioned overlays passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts positioned-overlays.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `popover-example-inventory.md` has exactly one direct upstream row,
  `popover-demo`, and the row is `Covered` or an explicitly recorded
  intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/popover-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'popover-demo')
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
  `examples` entry with `slug = "popover"`, `status = "resolved"`, and
  evidence for Experiment 104, Experiment 105, and
  `popover-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `popover` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for popover`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `popover/demo` renders Popover root, trigger, portal, and content hooks;
  - trigger text is exactly `Open popover`;
  - trigger maps upstream `Button variant="outline"` to outline
    Button-compatible classes or documented equivalent styling;
  - content has default `data-align="center"`, `data-side="bottom"`, and
    `data-side-offset="4"`;
  - content width maps upstream `w-80` to 20rem;
  - heading and description are exactly `Dimensions` and
    `Set the dimensions for the layer.`;
  - labels are associated with inputs `width`, `maxWidth`, `height`, and
    `maxHeight`;
  - input default values are `100%`, `300px`, `25px`, and `none`;
  - open, close, portal movement, Escape, non-modal behavior, and existing
    custom-token scenarios still pass;
  - no test depends on React state, Radix internals, Tailwind, `cn`, or literal
    DOM equivalence with upstream.
- Docs coverage asserts the Popover page renders stable evidence for the named
  docs example, exact dimensions form, source snippet, public hooks, open
  behavior, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 105 learning, Popover
  inventory reference, and next generated recommendation were recorded:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/README.md', 'utf8')
  const learnings = text.match(/## Learnings[\s\S]*?(?=\n## Experiments)/)?.[0] ?? ''
  for (const required of [
    'Experiment 105',
    'popover-example-inventory',
    'Popover',
    'next generated recommendation',
  ]) {
    if (!learnings.includes(required)) {
      console.log(`missing ${required}`)
      process.exit(1)
    }
  }
  NODE
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
      name.startsWith('@radix-ui/') ||
      name === 'radix-ui' ||
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

- Manifest, lockfile, and tracked-vendor checks prove no forbidden
  dependencies, lockfile churn, or vendor source were introduced:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  for (const file of ['radcn/packages/radcn/package.json', 'radcn/apps/docs/package.json', 'radcn/fixtures/candidate-remix/package.json']) {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
    for (const name of ['react', 'react-dom', 'radix-ui', 'tailwindcss', 'class-variance-authority']) {
      if (deps[name]) {
        console.log(`${file}: forbidden dependency ${name}`)
        process.exit(1)
      }
    }
  }
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  node - <<'NODE'
  const { execFileSync } = require('child_process')
  const files = execFileSync('git', ['ls-files', 'vendor'], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  console.log(files.join('\n'))
  if (files.length !== 1 || files[0] !== 'vendor/.gitignore') process.exit(1)
  NODE
  ```

- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The named demo omits any exact upstream user-facing text, label/input
  association, default value, content width, open behavior, or accessible
  behavior listed above.
- The implementation marks `popover-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream dimensions form.
- The implementation adds React, Radix, Tailwind, class-variance-authority, or
  vendor dependencies.
- The implementation treats literal DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Avicenna the 3rd (`019e9e69-945b-7f63-8dc6-e704e1cb3889`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: The initial README verification used a single `rg` alternation, which
  could pass on the Experiment 105 index line without proving the learning,
  inventory reference, Popover text, and next recommendation were all recorded
  in `## Learnings`. Fixed by replacing it with a Node check scoped to
  `## Learnings` and requiring each term independently.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 105 as
`Designed`, the experiment has required sections, implementation has not
started before the plan commit, vendor/status hygiene is covered, and the plan
follows Experiment 104's Popover inventory follow-up while keeping blocks and
chart-gallery scope excluded.

Re-review approved. The reviewer confirmed the README verification now scopes
to `## Learnings`, independently checks `Experiment 105`,
`popover-example-inventory`, `Popover`, and `next generated recommendation`,
and introduces no new blockers.
