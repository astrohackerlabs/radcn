# Experiment 89: Audit context-menu example parity

## Description

The regenerated parity inventory after Experiment 88 recommends Context Menu
as the next unresolved direct example cluster. Upstream shadcn/ui New York v4
has one direct Context Menu example, `context-menu-demo`. RadCN already exports
`radcn/context-menu`, includes candidate fixtures for default pointer opening,
keyboard opening, checkbox/radio state, submenu behavior, collision placement,
and custom tokens, and has Playwright coverage for context-menu pointer and
keyboard opening, focus management, disabled item behavior, checked state
mutation, submenus, collision handling, custom tokens, portals, public hooks,
and menu semantics.

This experiment should audit the upstream direct Context Menu example against
current RadCN evidence and produce a focused inventory that determines whether
the cluster is already covered or which exact named-example gaps remain. It
should not implement the named example yet.

The likely remaining gap is named docs/fixture/test evidence for the exact
upstream `context-menu-demo` composition:

- trigger text `Right click here`;
- trigger classes `flex h-[150px] w-[300px] items-center justify-center
  rounded-md border border-dashed text-sm`;
- content width `w-52`;
- inset items `Back`, disabled `Forward`, and `Reload`;
- shortcuts `⌘[`, `⌘]`, and `⌘R`;
- submenu trigger `More Tools`;
- submenu content width `w-44`;
- submenu items `Save Page...`, `Create Shortcut...`, `Name Window...`,
  `Developer Tools`, and destructive `Delete`;
- separators around submenu and checked/radio sections;
- checked checkbox item `Show Bookmarks`;
- unchecked checkbox item `Show Full URLs`;
- radio group value `pedro`;
- inset label `People`;
- selected radio item `Pedro Duarte`;
- unselected radio item `Colm Tuite`;
- upstream React client component marker, Radix Context Menu primitive,
  portal/content/submenu mechanics, `data-slot`, `className`, Tailwind
  sizing/layout/border/typography utilities, inset item styling, disabled
  state, checkbox/radio item indicators, destructive item variant, shortcut
  layout, and the mapping of those mechanics into RadCN's dependency-free
  menu-overlay behavior, public hooks, `class`, `style`, CSS variables, and
  app-owned presentation.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md`.
  - List direct upstream context-menu example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/context-menu*.tsx`.
  - Summarize the upstream UI implementation from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/context-menu.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `context-menu-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for React client components, Radix non-dependency,
    portal/content/submenu behavior, right-click trigger behavior, keyboard
    trigger behavior, focus management, item roving, `data-slot`,
    `className`, Tailwind utility mapping, trigger sizing/layout, content
    width, item inset styling, disabled item behavior, shortcut layout,
    separators, checked checkbox state, radio group state, destructive item
    styling, public hooks, custom tokens, docs evidence, fixture evidence,
    Playwright evidence, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 89 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation, inventory
regeneration, or `resolved-clusters.json` changes should be made in this audit
experiment unless the audit itself exposes an already-covered result that can
be proven entirely from existing evidence. If that happens, record the
evidence and keep the change limited to issue documentation.

## Verification

Pass criteria:

- `context-menu-example-inventory.md` exists and has:
  - `# Context Menu Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `context-menu-demo`, using
    this header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor context-menu example
  count is exactly one and the inventory table contains exactly one matching
  row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^context-menu.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`vendor: ${vendor.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (vendor.length !== 1 || vendor[0] !== 'context-menu-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'context-menu-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/context-menu-example-inventory.md', 'utf8')
  const row = text.match(/^\| `context-menu-demo` \|([^\n]+)$/m)?.[0]
  if (!row) process.exit(1)
  const cells = row.split('|').map((cell) => cell.trim())
  const outcome = cells[4]
  const followUp = cells[5]
  console.log(`outcome: ${outcome}`)
  console.log(`follow-up: ${followUp}`)
  if (!['Covered', 'Partial', 'Missing', 'Intentional divergence'].includes(outcome)) process.exit(1)
  if (outcome !== 'Covered' && (!followUp || followUp === 'No follow-up.')) process.exit(1)
  NODE
  ```

- The audit explicitly mentions and classifies these upstream mechanics:
  React client component marker, Radix Context Menu primitive, portal, content,
  submenus, `data-slot`, `className`, trigger sizing/layout utilities,
  `h-[150px]`, `w-[300px]`, `w-52`, `w-44`, `border-dashed`, item `inset`,
  disabled item state, shortcuts, separators, checkbox items, checked state,
  radio group value, radio item selected/unselected state, label inset,
  destructive variant, Tailwind utilities, and vendor source.
- The audit explicitly mentions all exact upstream user-facing text:
  `Right click here`, `Back`, `Forward`, `Reload`, `More Tools`,
  `Save Page...`, `Create Shortcut...`, `Name Window...`,
  `Developer Tools`, `Delete`, `Show Bookmarks`, `Show Full URLs`,
  `People`, `Pedro Duarte`, and `Colm Tuite`.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/context-menu.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/menu-overlays.tsx`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/tests/menu-overlays.spec.ts`.
- The Issue 4 README `## Learnings` section records the Context Menu audit
  result and the next recommended experiment after the audit result is known.
  A deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 89|context-menu-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file,
  `context-menu-example-inventory.md`, and the Issue 4 README before the
  result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text listed above.
- The audit marks `context-menu-demo` covered without docs, fixture, and
  Playwright evidence for the named example, unless it records a precise
  intentional divergence with enough existing evidence.
- The audit treats React/Radix/Tailwind implementation details as RadCN
  dependencies instead of mapping or rejecting them.
- The audit changes package, docs app, fixture, or Playwright implementation
  files before the follow-up implementation experiment is designed and
  approved.
- The audit mutates vendor source or adds forbidden dependencies such as React,
  Radix, Tailwind, lucide-react, or class-variance-authority.

## Design Review

Reviewer: Lagrange the 2nd
(`019e9daa-ded5-7621-aaad-17b802cce685`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 89 as `Designed`, required sections are present, scope is narrow
and documentation-only, implementation is explicitly deferred until after the
plan commit, verification has concrete pass/fail criteria and hygiene checks,
vendor cleanliness checks are present, the Issue 4 learning update is required
after the audit result, and the technical plan matches the regenerated parity
inventory's `context-menu` recommendation.

## Result

**Result:** Partial

Created `context-menu-example-inventory.md` for the single direct upstream New
York v4 Context Menu example, `context-menu-demo`. The audit confirms RadCN
already covers the package API and behavior substrate: dependency-free
`enhanceContextMenu`, right-click opening, ContextMenu and Shift+F10 keyboard
opening, menu role semantics, portal placement, focus restoration,
roving/highlight behavior, typeahead, disabled item skipping, checkbox state
mutation, radio group/item state, submenu hover and keyboard behavior,
collision handling, public hooks, and custom tokens.

The direct Context Menu cluster remains partial because current docs, fixtures,
and tests do not prove the exact named upstream `context-menu-demo`
composition: `Right click here`, the 300x150 dashed trigger layout, `w-52`
content width, inset `Back` / disabled `Forward` / `Reload` rows with
shortcuts, `More Tools` submenu with `w-44` content and exact submenu items,
separator placement, checked `Show Bookmarks`, unchecked `Show Full URLs`,
`People` label, selected `Pedro Duarte`, unselected `Colm Tuite`, destructive
`Delete`, app-owned indicator/caret presentation, or the
React/Radix/lucide/Tailwind mapping.

Verification commands run:

```text
node deterministic direct upstream count and inventory row check
node deterministic outcome/follow-up check
rg -n "Experiment 89|context-menu-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

All commands passed. `git status --short` showed only the new inventory file,
this experiment file, and the Issue 4 README before the result commit.

## Conclusion

Context Menu should proceed to a named example implementation experiment.
Existing package behavior is broad enough for the upstream demo, but the
project still needs docs, fixture, and Playwright evidence for the exact
`context-menu-demo` surface and mapping copy before the cluster can be marked
resolved.

## Completion Review

Reviewer: Locke the 2nd
(`019e9dad-eb6e-76f2-ae72-972a082d8975`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the audit stayed documentation-only,
the experiment file has Result and Conclusion, the Issue 4 README marks
Experiment 89 `Partial` and records the learning/next experiment guidance,
the inventory evidence supports the `Partial` result, `git diff --check`
passed, vendor cleanliness was checked, ignored vendor checkout directories are
not tracked, and the result commit had not been made before the review.
