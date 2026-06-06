# Experiment 101: Implement navigation-menu example parity depth

## Description

Experiment 100 audited the single direct upstream Navigation Menu example,
`navigation-menu-demo`, and found the cluster is partial. RadCN already has
the package substrate: `radcn/navigation-menu`, public Navigation Menu part
exports, package CSS, viewport and indicator parts, `enhanceNavigationMenu`,
keyboard/pointer/focus behavior, disabled state, custom token hooks, generic
docs, fixtures, and Playwright coverage.

This experiment should resolve the direct Navigation Menu example cluster by
adding named docs, candidate fixture, browser enhancement, and Playwright
coverage for the exact upstream demo composition while preserving RadCN's
dependency-free model:

- render top-level controls `Home`, `Components`, `Docs`, `List`, `Simple`,
  and `With Icon`;
- render all upstream Home panel, Components panel, List panel, Simple panel,
  and With Icon panel text exactly;
- render icon-link affordances for `Backlog`, `To Do`, and `Done` without
  adding `lucide-react`;
- prove trigger, link, content, viewport, and public hook behavior on the
  named demo;
- make a deliberate decision for upstream `useIsMobile` and
  `viewport={isMobile}` versus RadCN's explicit `NavigationMenuViewport`
  model;
- make a deliberate decision for upstream `navigationMenuTriggerStyle()`:
  either add a RadCN helper if package reuse needs it, or document the
  equivalent class/token mapping if existing public hooks are enough;
- include mapping copy for `"use client"`, React, Next `Link`, Radix
  Navigation Menu, `useIsMobile`, `cva`, lucide icons, `className`, Tailwind
  utilities, `cn`, `data-slot`, viewport mechanics, responsive behavior,
  keyboard/pointer/focus behavior, custom tokens, and vendor source.

The implementation should not add React, Next, Radix, lucide-react, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Navigation Menu primitives cannot represent the upstream
example's user-facing behavior, accessibility, or author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Navigation Menu docs from generic generated content to a named
    `navigation-menu-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-navigation-menu-family="navigation-menu-demo"` and
    part-specific hooks for top-level controls/panels as needed.
  - Render the exact upstream demo composition and source snippet.
  - Include visible or documented icon affordances for `Backlog`, `To Do`, and
    `Done`.
  - Include mapping copy for React/Next/Radix/useIsMobile/cva/lucide/
    `className`/Tailwind/`cn`/`data-slot`/viewport/responsive/keyboard/
    pointer/focus/custom-token/vendor mechanics.
- Update `radcn/apps/docs/app/assets/entry.ts`.
  - Import and run `enhanceNavigationMenu` for docs examples so the named docs
    demo has the same browser behavior as the candidate fixture.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-menu.tsx`
  Add a named `navigation-menu/demo` fixture route that renders the exact
  upstream composition and preserves existing Navigation Menu fixture
  scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/menubar-navigation.spec.ts`.
  - Verify `navigation-menu/demo` renders the exact upstream composition,
    public hooks, viewport behavior or documented divergence, keyboard/
    pointer/focus behavior, responsive section hooks or documented mapping,
    icon-link affordances, and no React/Next/Radix/lucide dependencies.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/navigation-menu` page renders the named
    family hook, exact text, public hooks, interactive behavior, and required
    mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/navigation-menu-example-inventory.md`.
  - Change `navigation-menu-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for `navigationMenuTriggerStyle`, viewport,
    indicator capability, icon mapping, responsive behavior, package API needs,
    and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `navigation-menu` as a resolved example cluster only after the
    inventory row is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Navigation Menu example outcome in `## Learnings`.
  - Update the Experiment 101 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Navigation Menu is
    resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Navigation Menu primitives cannot meet the upstream example's user-facing
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

- Fixture coverage for Navigation Menu passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menubar-navigation.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `navigation-menu-example-inventory.md` has exactly one direct upstream row,
  `navigation-menu-demo`, and the row is `Covered` or an explicitly recorded
  intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/navigation-menu-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'navigation-menu-demo')
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
  `examples` entry with `slug = "navigation-menu"`, `status = "resolved"`,
  and evidence for Experiment 100, Experiment 101, and
  `navigation-menu-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `navigation-menu` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for navigation-menu`.
- Fixture tests assert:
  - `navigation-menu/demo` renders Navigation Menu root, list, item, trigger,
    content, link, viewport, and any applicable indicator hooks;
  - exact upstream top-level controls `Home`, `Components`, `Docs`, `List`,
    `Simple`, and `With Icon` are present;
  - all upstream Home, Components, List, Simple, and With Icon panel text is
    visible when the relevant panel is open;
  - `Docs` is a link styled as a trigger or the documented equivalent;
  - `Backlog`, `To Do`, and `Done` expose icon-link affordances;
  - responsive `hidden md:block` behavior is either tested across viewport
    sizes or documented as a RadCN app-owned responsive mapping;
  - viewport open/close and sizing hooks are present, or the divergence from
    upstream `viewport={isMobile}` is documented and tested;
  - keyboard movement, pointer/focus open behavior, and Escape/focusout close
    work on the named route;
  - no test depends on React state, Next internals, Radix internals,
    lucide-react internals, or literal DOM equivalence.
- Docs coverage asserts the Navigation Menu page renders stable evidence for
  the named docs example and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 101 learning, Navigation
  Menu inventory reference, and next generated recommendation were recorded:

  ```text
  rg -n "Experiment 101|navigation-menu-example-inventory|next generated recommendation|Navigation Menu" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- Manifest and lockfile checks prove no forbidden dependencies or lockfile
  churn were introduced:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  for (const file of ['radcn/packages/radcn/package.json', 'radcn/apps/docs/package.json', 'radcn/fixtures/candidate-remix/package.json']) {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
    for (const name of ['react', 'react-dom', 'next', 'lucide-react', 'tailwindcss', 'class-variance-authority']) {
      if (deps[name]) {
        console.log(`${file}: forbidden dependency ${name}`)
        process.exit(1)
      }
    }
  }
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  ```

- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.
- `git status --short` before result commit shows only intended Experiment 101
  files.

Failure criteria:

- The implementation omits exact upstream text or controls listed above.
- The implementation marks `navigation-menu-demo` covered without docs,
  fixture, and Playwright evidence for the named upstream composition.
- The implementation adds React, Next, Radix, lucide-react, Tailwind, `cva`,
  or vendor dependencies.
- The implementation changes package APIs without recording why existing
  Navigation Menu primitives were insufficient.
- The implementation broadens scope into unrelated Navigation Menu refactors or
  other unresolved example clusters.

## Design Review

Reviewer: Turing the 3rd
(`019e9e39-85a5-7e51-9db8-c533c8e60d40`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 101 with
status `Designed`, the experiment has the required sections, implementation
has not started beyond plan files, the technical scope is narrow enough for
one experiment, and the plan aligns with Experiment 100's partial audit. They
also confirmed the plan covers exact upstream composition and text, docs app
enhancement, candidate fixture route, Playwright proof, `useIsMobile`/
viewport mapping, `navigationMenuTriggerStyle` decision, responsive sections,
dependency constraints, issue learnings, resolved-cluster bookkeeping,
regenerated inventory, and hygiene checks.
