# Experiment 66: Implement dialog example parity depth

## Description

Experiment 65 audited the two active upstream Dialog examples and found the
cluster is partial because RadCN has generic Dialog package/fixture proof but
no named evidence for:

- `dialog-demo`
- `dialog-close-button`

This experiment should resolve the Dialog example cluster by adding named docs,
candidate fixture routes, and Playwright coverage for both examples. The audit
did not identify a required package API change: RadCN already owns the modal
behavior, while Button, Input, Label, native forms, read-only inputs, and
share-link composition remain separate package/app surfaces.

RadCN should not add React, Radix, `asChild`, controlled React-style
`open`/`onOpenChange` state, `lucide-react`, Tailwind, `cn`, clipboard
behavior, form-state libraries, or vendor dependencies. DOM equivalence is not
required; the examples need equivalent user-facing behavior, accessibility,
visual modifiability, and author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Replace or expand the generic Dialog rich docs example with named upstream
    Dialog examples using stable hooks such as `data-radcn-docs-dialog-family`.
  - Demonstrate `dialog-demo` with:
    - outline-styled trigger text `Open Dialog`;
    - title `Edit profile`;
    - description `Make changes to your profile here. Click save when you're done.`;
    - native form shell;
    - labelled `Name` and `Username` fields;
    - default values `Pedro Duarte` and `@peduarte`;
    - content width equivalent to upstream `sm:max-w-[425px]`;
    - footer with outline `Cancel` close action and submit `Save changes`
      action.
  - Demonstrate `dialog-close-button` with:
    - outline-styled trigger text `Share`;
    - title `Share link`;
    - description `Anyone who has this link will be able to view this.`;
    - visually hidden but accessible `Link` label;
    - read-only input value `https://ui.shadcn.com/docs/installation`;
    - content width equivalent to upstream `sm:max-w-md`;
    - left-aligned footer with secondary `Close` close action.
  - Keep Dialog modal mechanics package-owned through `radcn/dialog`; do not
    implement copy-to-clipboard for the share link because upstream does not.
  - Include mapping copy for React props, Radix `DialogPrimitive`, `asChild`,
    controlled `open`/`onOpenChange`, `className`, `data-slot`, Tailwind
    utilities, `cn`, `XIcon`, `lucide-react`, Button composition, Input/Label
    composition, native forms, `sr-only`, read-only inputs, share-link
    boundaries, `DialogFooter showCloseButton`, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/dialog.tsx`
  Add named Dialog fixture routes for `demo` and `close-button-demo`,
  preserving existing generic Dialog routes.
- Update fixture Playwright coverage in `radcn/fixtures/tests/dialog.spec.ts`.
  - Verify `dialog/demo` exposes public Dialog hooks, opens from `Open Dialog`,
    has dialog role/ARIA relationships, contains upstream title/description,
    labelled inputs with default values, form shell, `Cancel` close action,
    `Save changes` submit action, content width evidence, focus behavior, and
    Escape close behavior.
  - Verify `dialog/close-button-demo` exposes public Dialog hooks, opens from
    `Share`, contains upstream title/description, accessible `Link` label,
    read-only URL input, secondary `Close` action, footer alignment evidence,
    focus restoration after close, and no copy-to-clipboard behavior.
  - Keep existing generic Dialog behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `dialog-demo` and `dialog-close-button`.
  - Assert rendered Dialog hooks, trigger copy, title/description copy,
    labels, default input values, read-only URL input, footer actions, width or
    alignment hooks, and mapping copy.
  - Exercise modal opening and closing where docs enhancement supports it
    without requiring DOM equivalence with shadcn/ui.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/dialog-example-inventory.md`.
  - Change `dialog-demo` to `Covered` only after docs, fixture, and Playwright
    evidence exists.
  - Change `dialog-close-button` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Record final decisions for `asChild`, Button/Input/Label/native-form
    composition, `sr-only` labels, read-only inputs, footer close actions,
    default close icon mapping, `DialogFooter showCloseButton`,
    copy-to-clipboard scope, public hooks, custom sizing/alignment, and
    upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `dialog` as a resolved example cluster only after both example rows are
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Dialog example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn` unless implementation discovers a real
  package-level gap that is necessary for the two named examples. If such a gap
  appears, record it in the result before changing package code.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Dialog coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts dialog.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Dialog example ids appear
  exactly once in `dialog-example-inventory.md`, and both are `Covered` or an
  explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/dialog-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['dialog-demo', 'dialog-close-button']
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
  `examples` entry with `slug = "dialog"`, `status = "resolved"`, and evidence
  for Experiment 65, Experiment 66, and `dialog-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `dialog` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for dialog`.
- Fixture tests assert:
  - named Dialog routes expose public RadCN hooks;
  - `dialog/demo` proves trigger copy, title/description copy, form shell,
    labels/default values, footer actions, content width evidence, ARIA
    relationships, focus behavior, Escape close, and explicit close behavior;
  - `dialog/close-button-demo` proves trigger copy, title/description copy,
    accessible sr-only label, read-only URL input, secondary close action,
    footer alignment evidence, close/focus restoration behavior, and no
    clipboard action;
  - existing generic Dialog behavior tests still pass.
- Docs coverage asserts the Dialog page renders stable evidence for both named
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
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
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
- A deterministic manifest check proves no forbidden dependencies exist in the
  current RadCN manifests, and a diff check proves this experiment did not add
  forbidden lockfile dependency markers:
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
    'radix-ui',
    '@radix-ui/react-dialog',
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
  if (failed) process.exit(1)
  NODE
  git diff -- package.json radcn/package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json pnpm-lock.yaml | node -e '
  const fs = require("fs")
  const diff = fs.readFileSync(0, "utf8")
  const forbidden = [
    "react",
    "react-dom",
    "radix-ui",
    "@radix-ui/react-dialog",
    "lucide-react",
    "tailwindcss",
    "@tailwindcss/vite",
    "@tailwindcss/postcss",
    "class-variance-authority",
  ]
  let failed = false
  for (const line of diff.split("\n")) {
    if (!line.startsWith("+") || line.startsWith("+++")) continue
    for (const dep of forbidden) {
      if (line.includes(`"${dep}"`) || line.includes(`/${dep}@`) || line.includes(`${dep}:`)) {
        console.log(`forbidden dependency added in diff: ${line}`)
        failed = true
      }
    }
    if (line.includes("vendor")) {
      console.log(`forbidden vendor dependency added in diff: ${line}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  '
  ```
- `git diff --check`
- `git status --short` shows only expected implementation and issue
  documentation changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either active upstream Dialog example remains `Partial` or `Missing` without
  a recorded intentional divergence.
- The implementation treats React, Radix, `asChild`, `lucide-react`, Tailwind,
  `cn`, upstream `data-slot`, form-state libraries, clipboard behavior, or
  vendor source as mandatory RadCN Dialog dependencies.
- The docs or fixtures prove generic Dialog behavior but omit the named
  `dialog-demo` or `dialog-close-button` compositions.
- The implementation changes `radcn/dialog` package APIs without a recorded
  package-level need found during implementation.
- The implementation conflates Dialog-owned modal behavior with app-owned
  Button, Input, Label, Form, Alert Dialog, Command, Dropdown Menu, Drawer,
  Sheet, share-link, copy-to-clipboard, or custom-class styling decisions.

## Design Review

Reviewer: Arendt the 2nd (`019e9c96-d593-74f2-86a2-5e50e3a40409`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed that the plan is linked from the
Issue 4 README with status `Designed`, implementation has not started, and the
scope targets named docs, fixture, Playwright, inventory, resolved-cluster, and
regenerated parity evidence for `dialog-demo` and `dialog-close-button`. The
reviewer also confirmed that the plan matches Experiment 65's gaps and the
upstream examples: edit-profile copy/default values/footer actions, share-link
sr-only label/read-only input/secondary close action, sizing/alignment
evidence, modal accessibility, focus behavior, and author-facing
customization. The plan correctly avoids adding React, Radix, `asChild`,
Tailwind, `cn`, `lucide-react`, clipboard behavior, form-state libraries,
package API work, or vendor dependencies unless a real package-level gap is
found and recorded.
