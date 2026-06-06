# Experiment 98: Implement menubar example parity depth

## Description

Experiment 97 audited the single direct upstream Menubar example,
`menubar-demo`, and found the cluster is partial. RadCN already has the
package substrate: `radcn/menubar`, public Menubar part exports, package CSS,
portal enhancement, keyboard/typeahead behavior, hover switching, submenus,
checkbox/radio item state, disabled state, inset classes, shortcut hooks,
custom tokens, generic docs, fixtures, and Playwright coverage.

This experiment should resolve the direct Menubar example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
four-menu composition while preserving RadCN's dependency-free model:

- render top-level triggers `File`, `Edit`, `View`, and `Profiles`;
- render all upstream menu items, submenu items, checkbox items, radio items,
  inset items, disabled items, and shortcut text exactly;
- render `Always Show Full URLs` checked and `MenubarRadioGroup value="benoit"`
  with `Benoit` checked;
- render public hooks for every Menubar part used by the upstream example;
- prove opening, closing, portal movement, hover switching, submenu opening,
  keyboard navigation, checkbox/radio state, disabled state, inset state, and
  shortcut alignment;
- make a deliberate decision for upstream `MenubarContent sideOffset={8}`
  versus RadCN's current default `sideOffset={4}`;
- include mapping copy for `"use client"`, Radix Menubar, lucide icons,
  `className`, Tailwind utilities, `cn`, `data-slot`, portal mechanics,
  keyboard/pointer behavior, custom tokens, and vendor source.

The implementation should not add React, Radix, lucide, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Menubar primitives cannot represent the upstream example's
user-facing behavior, accessibility, or author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Menubar docs from generic generated content to a named
    `menubar-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-menubar-family="menubar-demo"` and part-specific hooks
    for trigger/menu groups as needed.
  - Render the exact upstream four-menu composition and source snippet.
  - Use `sideOffset={8}` for the named demo unless implementation discovers a
    stronger reason to change package defaults or record an intentional
    divergence.
  - Include mapping copy for React/Radix/lucide/`className`/Tailwind/`cn`/
    `data-slot`/portal/keyboard/pointer/custom-token/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/menubar.tsx`
  Add a named `menubar/demo` fixture route that renders the exact upstream
  composition and preserves existing Menubar fixture scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/menubar-navigation.spec.ts`.
  - Verify `menubar/demo` renders the exact upstream composition, public hooks,
    `sideOffset={8}` evidence or recorded divergence, portal behavior,
    keyboard/hover/submenu behavior, checkbox/radio state, disabled/inset
    state, shortcut text/alignment, and no React/Radix/lucide dependencies.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/menubar` page renders the named family hook,
    exact text, public hooks, placement evidence, interactive behavior, and
    required mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/menubar-example-inventory.md`.
  - Change `menubar-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for `sideOffset`, icon mapping, portal behavior,
    keyboard/pointer behavior, checkbox/radio state, inset state, disabled
    state, package API needs, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `menubar` as a resolved example cluster only after the inventory row is
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Menubar example outcome in `## Learnings`.
  - Update the Experiment 98 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Menubar is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Menubar primitives cannot meet the upstream example's user-facing behavior,
accessibility, and author-facing modifiability. If package code changes, add
package-level verification, synchronize generated styles if needed, and record
why the audit assumption changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture coverage for Menubar passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menubar-navigation.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `menubar-example-inventory.md` has exactly
  one direct upstream row, `menubar-demo`, and the row is `Covered` or an
  explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/menubar-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'menubar-demo')
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
  `examples` entry with `slug = "menubar"`, `status = "resolved"`, and
  evidence for Experiment 97, Experiment 98, and
  `menubar-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `menubar` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for menubar`.
- Fixture tests assert:
  - `menubar/demo` renders Menubar root, menu, trigger, portal, content, item,
    separator, sub, sub-trigger, sub-content, checkbox item, radio group,
    radio item, shortcut, and indicator hooks;
  - all exact upstream trigger/item/submenu/checkbox/radio/inset/disabled/
    shortcut text is visible when the relevant menu is open;
  - `Always Show Full URLs` starts checked;
  - `Benoit` starts checked from radio value `benoit`;
  - disabled items expose disabled state and cannot receive active focus;
  - inset rows expose inset hooks/classes;
  - content exposes `data-side-offset="8"` or the documented divergence;
  - opening/closing, hover switching, keyboard movement, Escape, and submenu
    opening work on the named route;
  - no test depends on React state, Radix internals, lucide internals, or
    literal DOM equivalence.
- Docs coverage asserts the Menubar page renders stable evidence for the named
  docs example and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 98 learning, Menubar
  inventory reference, and next generated recommendation were recorded:

  ```text
  rg -n "Experiment 98|menubar-example-inventory|next generated recommendation|Menubar" issues/0004-complete-shadcn-parity-and-docs/README.md
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
    '@radix-ui/react-menubar',
    'lucide-react',
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

- The Menubar page still uses only generic generated docs instead of a named
  `menubar-demo` rich example.
- The candidate fixture route for `menubar/demo` is missing.
- Exact upstream trigger, item, submenu, checkbox, radio, disabled, inset, or
  shortcut text is missing from the named coverage.
- Required mapping copy is missing.
- `sideOffset` behavior is neither matched nor intentionally documented.
- Package code changes add unnecessary dependencies or React/Radix/lucide/
  Tailwind mechanics.
- `menubar` remains the first generated recommendation after the experiment.

## Design Review

Reviewer: Copernicus the 3rd
(`019e9e11-a305-7f81-b260-078cbb00a5ef`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the issue README links Experiment 98 with
status `Designed`, the plan has the required sections, the dirty state is
plan-only, implementation has not started before the plan commit, verification
includes concrete typecheck, Playwright, inventory, resolved-cluster,
parity-inventory, README, dependency, lockfile, `git diff --check`, and vendor
cleanliness checks, vendor checkouts are clean, and the technical plan follows
Experiment 97's audit result.

## Result

**Result:** Pass

Experiment 98 resolved the direct upstream `menubar-demo` example without
package code changes.

- `radcn/apps/docs/app/content/components.tsx` now provides a rich Menubar docs
  page with a named `menubar-demo` example, exact four-menu composition, full
  upstream item/submenu/checkbox/radio/inset/disabled/shortcut text,
  `sideOffset={8}` placement evidence, public Menubar hooks, source snippet,
  and React/Radix/lucide/`className`/Tailwind/`cn`/`data-slot`/portal/
  keyboard/pointer/custom-token/vendor-source mapping copy.
- `radcn/apps/docs/app/assets/entry.ts` enhances the named docs example with
  `enhanceMenubar`.
- `radcn/fixtures/scenarios/index.ts` and
  `radcn/fixtures/candidate-remix/app/fixtures/menubar.tsx` add the candidate
  `/fixtures/menubar/demo` route.
- `radcn/apps/docs/tests/coverage.spec.ts` and
  `radcn/fixtures/tests/menubar-navigation.spec.ts` verify the named docs and
  fixture examples, portal movement, part hooks, exact text, `sideOffset={8}`,
  submenu behavior, checkbox/radio state, disabled/inset state, Escape close,
  keyboard disabled skip, and mapping copy.
- `menubar-example-inventory.md` now marks the single direct Menubar example as
  `Covered`, and `resolved-clusters.json` marks `menubar` resolved in the
  examples queue.
- `node scripts/audit-shadcn-parity.mjs` regenerated
  `parity-inventory.md`; the next generated recommendation is example parity
  for `mode-toggle`.

Verification passed:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menubar-navigation.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
deterministic inventory, resolved-cluster, parity recommendation, README, dependency, manifest, lockfile, diff, and vendor checks
```

The dependency import scanner was narrowed from the original overbroad
`name.startsWith('lucide')` design to `name === 'lucide-react'`. RadCN's docs
app already has an approved `lucide-static` icon package from prior work; the
Menubar port must not add `lucide-react` or Radix dependencies.

## Conclusion

The direct Menubar example cluster is resolved. RadCN's existing Menubar
package substrate was sufficient; the missing work was named docs, a named
fixture route, docs browser enhancement, exact four-menu coverage, and issue
bookkeeping. The next Issue 4 experiment should audit example parity for
`mode-toggle`.

## Completion Review

**Reviewer:** Harvey the 3rd (`019e9e23-41fa-7b41-abca-74bac4669439`)
**Fresh-context status:** fresh Codex subagent
**Result:** Approved

The reviewer found no blockers, major findings, or minor findings. They
confirmed that the completed work matches Experiment 98's scope: named Menubar
docs, candidate fixture, Playwright coverage, inventory and resolved-cluster
updates, and issue README learning/status updates.

The reviewer reran the verification successfully:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menubar-navigation.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
git diff --check
vendor status check
dependency/manifest/lockfile/inventory checks
```

They also approved the dependency scanner adjustment: allowing the existing
approved `lucide-static` package while continuing to forbid `lucide-react`.
