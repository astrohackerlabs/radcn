# Experiment 90: Implement context-menu example parity depth

## Description

Experiment 89 audited the single direct upstream Context Menu example,
`context-menu-demo`, and found the cluster is partial. RadCN already has a
dependency-free `radcn/context-menu` package primitive, browser enhancement,
fixtures, and Playwright coverage for right-click opening, keyboard opening,
portals, menu roles, focus restoration, roving/typeahead behavior, disabled
items, checkbox mutation, radio state, submenus, collision handling, public
hooks, and custom tokens. The missing evidence is named `context-menu-demo`
parity in docs, candidate fixtures, and tests.

This experiment should resolve the direct Context Menu example cluster by
adding named docs, candidate fixture, and Playwright coverage for the exact
upstream composition:

- trigger text `Right click here`;
- trigger layout `flex h-[150px] w-[300px] items-center justify-center
  rounded-md border border-dashed text-sm`;
- `ContextMenuContent` width `w-52`;
- inset `Back`, disabled `Forward`, and `Reload` items;
- shortcuts `⌘[`, `⌘]`, and `⌘R`;
- `More Tools` submenu trigger with inset styling;
- `ContextMenuSubContent` width `w-44`;
- submenu items `Save Page...`, `Create Shortcut...`, `Name Window...`,
  `Developer Tools`, and destructive `Delete`;
- separator placement around submenu and checked/radio groups;
- checked checkbox item `Show Bookmarks`;
- unchecked checkbox item `Show Full URLs`;
- `ContextMenuRadioGroup value="pedro"`;
- inset label `People`;
- selected radio item `Pedro Duarte`;
- unselected radio item `Colm Tuite`;
- public Context Menu, portal, content, item, checkbox, radio, label,
  separator, shortcut, sub, sub-trigger, and sub-content hooks;
- app-owned indicator/caret icon evidence in place of lucide-react;
- mapping copy for React client components, Radix Context Menu primitives,
  portal/content/submenu mechanics, `data-slot`, `className`, `cn`, Tailwind
  sizing/layout/border/typography/animation/focus/inset utilities, lucide
  icons, native/menu-overlay behavior, custom tokens, and vendor source.

The implementation should keep Context Menu dependency-free over
`enhanceContextMenu` and shared menu-overlay behavior. Tests should verify
user-facing behavior, accessibility, visual styling, and modifiability, not
literal DOM equivalence with Radix. The current package API should be
preferred. Package code should change only if implementation proves the
current primitives cannot provide equivalent named-demo behavior or
author-facing modifiability.

Do not add React, Radix, Tailwind, lucide-react, class-variance-authority,
`cn`, Slot, or vendor dependencies. Do not modify vendor source.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Context Menu from generic seed docs to a rich docs page if needed.
  - Render a stable docs hook
    `data-radcn-docs-context-menu-family="context-menu-demo"`.
  - Demonstrate `context-menu-demo` with:
    - trigger visible text `Right click here`;
    - 300x150 dashed trigger layout evidence;
    - default-open or force-visible docs preview content so the example can be
      inspected in docs without manual right-clicking;
    - content width `w-52` or exact 208px equivalent;
    - inset Back, disabled Forward, Reload rows;
    - shortcut text and layout evidence for `⌘[`, `⌘]`, and `⌘R`;
    - More Tools submenu with inset trigger and caret evidence;
    - subcontent width `w-44` or exact 176px equivalent;
    - exact submenu items and destructive Delete styling evidence;
    - separator count/placement evidence;
    - checked Show Bookmarks and unchecked Show Full URLs state evidence;
    - People label inset evidence;
    - radio group value `pedro`, selected Pedro Duarte, and unselected Colm
      Tuite state evidence;
    - public `data-radcn-context-menu*` hook evidence for every used part.
  - Include mapping copy for React client component marker, Radix Context Menu,
    portal/content/submenu mechanics, `data-slot`, `className`, `cn`,
    Tailwind sizing/layout/border/typography/animation/focus/inset utilities,
    disabled state, checkbox/radio indicators, lucide icons, native
    menu-overlay behavior, custom tokens, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/menu-overlays.tsx`
  Add a named `context-menu/demo` fixture route, preserving existing default,
  keyboard-trigger, checkbox-radio, submenu, collision, and custom-token
  routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/menu-overlays.spec.ts`.
  - Verify `context-menu/demo` opens from right-click and keyboard;
  - verify exact trigger text, trigger layout/styling, content width, submenu
    width, item/shortcut/label text, disabled state, inset classes,
    separator count/placement, checked/unchecked checkbox state, selected and
    unselected radio state, destructive Delete styling, public hooks, app-owned
    indicators/caret, submenu hover/keyboard behavior, and closing behavior.
  - Keep existing context-menu and dropdown-menu tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/context-menu` page renders the named family
    hook, exact text, visible menu/submenu content evidence, public hooks,
    widths/layout/styling, checked/radio/destructive state evidence, app-owned
    icon evidence, and dependency-divergence/mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md`.
  - Change `context-menu-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record the final trigger, content width, submenu, state, indicator/caret,
    React/Radix/Tailwind/lucide, and package API decisions.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `context-menu` as a resolved example cluster only after the example
    row is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Context Menu example outcome in `## Learnings`.
  - Update the Experiment 90 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Context Menu is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Context Menu primitives cannot meet the upstream example's user-facing
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

- Fixture menu overlay coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts menu-overlays.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `context-menu-example-inventory.md` has
  exactly one direct upstream row, `context-menu-demo`, and the row is
  `Covered` or an explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'context-menu-demo')
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
  `examples` entry with `slug = "context-menu"`, `status = "resolved"`, and
  evidence for Experiment 89, Experiment 90, and
  `context-menu-example-inventory.md`.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const data = JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json', 'utf8'))
  const entry = data.examples.find((item) => item.slug === 'context-menu')
  console.log(JSON.stringify(entry, null, 2))
  const required = [
    'issues/0004-complete-shadcn-parity-and-docs/89-audit-context-menu-example-parity.md',
    'issues/0004-complete-shadcn-parity-and-docs/90-implement-context-menu-example-parity-depth.md',
    'issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md',
  ]
  if (!entry || entry.status !== 'resolved' || required.some((file) => !entry.evidence.includes(file))) process.exit(1)
  NODE
  ```

- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `context-menu` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for context-menu`.

  ```text
  node scripts/audit-shadcn-parity.mjs
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md', 'utf8')
  const unresolved = text.match(/## Unresolved Example Clusters[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const recommended = text.match(/## First Recommended Cluster[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  console.log(recommended.split('\n').slice(0, 4).join('\n'))
  if (unresolved.includes('| context-menu |') || recommended.includes('Example parity for context-menu')) process.exit(1)
  NODE
  ```

- Fixture tests assert:
  - `context-menu/demo` renders a ContextMenu root, trigger, portal, content,
    items, checkbox items, radio group/items, label, separators, shortcuts,
    sub, sub-trigger, and sub-content with public hooks;
  - right-click opens the menu and focuses Back;
  - ContextMenu key or Shift+F10 opens the menu from the trigger;
  - trigger text is `Right click here`;
  - trigger computed size is 300px by 150px with dashed border, centered
    layout, rounded radius, and text-sm font size evidence;
  - content width is 208px or exact documented equivalent;
  - subcontent width is 176px or exact documented equivalent;
  - Back, disabled Forward, Reload, More Tools, Save Page..., Create
    Shortcut..., Name Window..., Developer Tools, Delete, Show Bookmarks, Show
    Full URLs, People, Pedro Duarte, and Colm Tuite are present;
  - shortcuts `⌘[`, `⌘]`, and `⌘R` are present and aligned through shortcut
    hooks;
  - inset rows expose inset class or equivalent computed padding evidence;
  - disabled Forward has `aria-disabled="true"` and does not highlight or close
    the menu when clicked;
  - checked Show Bookmarks has checked state and indicator evidence;
  - Show Full URLs is unchecked;
  - radio group value is `pedro`, Pedro Duarte is selected, and Colm Tuite is
    unselected;
  - Delete has destructive variant styling evidence;
  - submenu opens by hover and keyboard, exposes app/package caret evidence,
    and closes with ArrowLeft;
  - no test depends on React state or Radix DOM equivalence.
- Docs coverage asserts the Context Menu page renders stable evidence for the
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
    'radix-ui',
    '@radix-ui/react-context-menu',
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
  `Right click here`, `Back`, `Forward`, `Reload`, `More Tools`,
  `Save Page...`, `Create Shortcut...`, `Name Window...`,
  `Developer Tools`, `Delete`, `Show Bookmarks`, `Show Full URLs`,
  `People`, `Pedro Duarte`, or `Colm Tuite`.
- The trigger lacks keyboard context-menu activation or right-click opening.
- The disabled Forward item can be highlighted or closes the menu when clicked.
- Checked/radio state evidence is missing or is only documented, not tested.
- The implementation treats literal DOM equivalence with Radix as required
  instead of proving visual behavior, accessibility, and modifiability.
- Vendor source is modified or imported.

## Design Review

Reviewer: Averroes the 2nd
(`019e9db2-7e07-7300-a0d3-b071a2efbbad`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The initial plan named deterministic checks for
  `resolved-clusters.json` and regenerated `parity-inventory.md` without
  including the exact commands. Fixed by adding concrete Node snippets for
  both checks.
- Minor: The initial forbidden-import scanner only covered `import ... from`
  forms. Fixed by extending the deterministic scanner to catch side-effect
  imports, dynamic `import(...)`, and `require(...)`.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 90 as `Designed`, required sections are present, scope is narrow
around the single upstream `context-menu-demo` example, implementation has not
started before the plan commit, verification has concrete pass/fail criteria
and hygiene checks, vendor cleanliness checks are present, necessary learnings
will be recorded in the issue, and the technical plan is likely to resolve the
Context Menu example parity goal.
