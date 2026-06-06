# Experiment 63: Audit command example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`command`. Upstream shadcn/ui New York v4 has two Command examples in the
current inferred cluster:

- `command-demo`
- `command-dialog`

Current RadCN already ships `radcn/command`, docs coverage, candidate fixture
routes, and Playwright coverage for searchable listbox behavior, filtering,
empty state, groups, separators, disabled items, shortcuts, checked state,
dialog composition, keyboard movement, click/Enter activation, custom tokens,
and public hooks. This experiment audits whether that evidence fully covers the
two upstream Command examples before implementation. It should separate
Command-owned behavior from app-owned icons, React state, global keyboard
listeners, Dialog composition, `cmdk`, `lucide-react`, `className`, `data-slot`,
Tailwind utilities, and vendor source.

This is an audit-only experiment. It must not change RadCN package APIs, docs
pages, fixture routes, tests, generated parity state, or resolved-cluster state.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/command-example-inventory.md`.
  - List both active upstream Command example ids: `command-demo` and
    `command-dialog`.
  - For each example, record user-facing behavior, upstream mechanics, current
    RadCN evidence, outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Explicitly record whether RadCN already supports Command root, input,
    list, empty state, group headings or group labels, separators, items,
    disabled items, checked/selected item indicators, shortcuts, icon
    composition, filtering, keyboard movement, activation events, dialog
    composition, default/open dialog state, keyboard-trigger guidance, public
    hooks, custom classes/styles/tokens, docs evidence, candidate fixture
    evidence, reference fixture evidence if present, and Playwright evidence.
  - Record mapping decisions for shadcn React props, `className`, `data-slot`,
    `cmdk`, `CommandPrimitive`, `CommandGroup heading`, `CommandDialog open`,
    `onOpenChange`, React `useState`, React `useEffect`, document keydown
    listener for `⌘J`/`Ctrl+J`, `SearchIcon`, `Calendar`, `Smile`,
    `Calculator`, `User`, `CreditCard`, `Settings`, `lucide-react`, `cn`,
    Tailwind utilities, Dialog composition, `kbd` copy, vendor source, and
    RadCN package/docs/fixture/test evidence.
- Inspect upstream references:
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/command.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/command-demo.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/command-dialog.tsx`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/command.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/command-demo.json`
  - `vendor/shadcn-ui/apps/v4/public/r/styles/new-york-v4/command-dialog.json`
  - note Dialog, Kbd, Popover, Drawer, and Combobox Command references only
    where they clarify out-of-cluster composition.
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/command.tsx`
  - `radcn/packages/radcn/src/utils/searchable-listbox.ts`
  - `radcn/packages/radcn/src/styles/index.ts`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/apps/docs/tests/coverage.spec.ts`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/command.tsx`
  - `radcn/fixtures/tests/combobox-command.spec.ts`
  - relevant Dialog/Kbd evidence only where it clarifies Command Dialog and
    keyboard-copy boundaries.
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended experiment.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source,
  tests, `resolved-clusters.json`, or generated `parity-inventory.md` in this
  experiment except for issue documentation.

## Verification

Pass criteria:

- `command-example-inventory.md` exists and contains exactly one table row for
  each active upstream Command example id.
- A deterministic Node check proves both active upstream Command example ids
  appear exactly once and no extra example rows exist:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/command-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'command-demo',
    'command-dialog',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|/gm)].map((match) => match[1])
  let failed = rows.length !== ids.length
  if (rows.length !== ids.length) {
    console.log(`row-count: ${rows.length}`)
  }
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (examples.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  for (const row of rows) {
    if (!ids.includes(row)) {
      console.log(`unexpected: ${row}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does
  not mark `command` resolved unless every active upstream Command example is
  `Covered` or `Intentional divergence`.
- The inventory explicitly addresses:
  - Command root, input, list, empty state, group headings/labels, separators,
    items, disabled items, checked/selected indicators, shortcuts, icon
    composition, filtering, keyboard movement, activation events, dialog
    composition, dialog default/open state, keyboard-trigger guidance, public
    hooks, custom classes/styles/tokens, and docs/fixture/Playwright evidence;
  - React props, `className`, `data-slot`, `cmdk`, `CommandPrimitive`,
    `CommandGroup heading`, `CommandDialog open`, `onOpenChange`, React
    `useState`, React `useEffect`, document keydown listeners, `SearchIcon`,
    lucide icons, `lucide-react`, `cn`, Tailwind utilities, Dialog references,
    Kbd copy, and vendor source as mappings, existing evidence, separate
    resolved clusters, non-dependencies, possible intentional divergences, or
    possible follow-up work rather than mandatory new dependencies.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "command-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any active upstream Command example id from the inventory.
- The audit treats React, `cmdk`, `lucide-react`, Tailwind, `cn`, upstream
  `data-slot`, keyboard-listener implementation details, form-state libraries,
  or vendor source as mandatory RadCN Command dependencies.
- The audit marks `command` resolved without package/docs/fixture/test evidence
  for both active upstream Command examples or a recorded intentional
  divergence.
- The audit conflates Command-owned searchable listbox behavior with app-owned
  icon choice, global shortcut state, Dialog behavior, Kbd copy, Combobox
  usage, Popover/Drawer usage, or custom-class styling decisions.
- The experiment changes package, docs app, fixture, test, resolved-cluster, or
  generated parity source instead of staying an audit.

## Design Review

Reviewer: Singer the 2nd (`019e9c79-4773-79a0-ab02-31475fc5483c`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed that the Issue 4 README links this
experiment with status `Designed`, the experiment has the required Description,
Changes, Verification, and Design Review sections, the scope is narrow and
audit-only, implementation has not started before the plan commit, verification
has deterministic row checks and repo hygiene checks, vendor checkouts are not
modified, and the plan records the required issue learnings.

## Result

**Result:** Partial

Created `command-example-inventory.md` and audited the two active upstream
Command examples: `command-demo` and `command-dialog`.

RadCN already covers the core Command primitive behavior: root, input, list,
empty state, groups, separators, items, disabled items, shortcuts,
checked/selected indicators, filtering, keyboard movement, activation events,
dialog composition, public hooks, and custom classes/styles/tokens. Existing
candidate fixtures and Playwright tests prove these generic behaviors.

The active upstream examples are still only partially covered because RadCN does
not yet have named docs/fixture/test evidence for the exact upstream Command
demo and Command dialog compositions. The audit also identified two concrete
mapping gaps for the next implementation pass: visible group headings/labels
need a deliberate RadCN API or composition mapping, and the `command-dialog`
example's `⌘J`/`Ctrl+J` shortcut must be demonstrated as app-owned behavior
rather than package-owned global shortcut routing.

Verification run:

- `node - <<'NODE' ... NODE` deterministic row-count check:
  `command-demo: 1`, `command-dialog: 1`.
- `rg -n "command-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
- `git diff --check`
- `git status --short`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`

All verification passed. The only changed files are Issue 4 documentation files.

## Completion Review

Reviewer: Bernoulli the 2nd (`019e9c7c-33be-7070-a9f8-898b5d5a066e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed that the experiment stayed
audit-only, the Result and Conclusion sections are present, the Issue 4 README
records the learning and marks Experiment 63 as `Partial`, the inventory
contains exactly `command-demo` and `command-dialog`, `git diff --check` passed,
vendor cleanliness was checked, and the result commit had not been made before
completion review.

## Conclusion

The next experiment should implement named Command example parity depth. It
should add docs and candidate fixture coverage for `command-demo` and
`command-dialog`, include the upstream rows/copy, prove visible group labels,
show app-owned icon composition, and demonstrate `⌘J`/`Ctrl+J` dialog opening as
app-owned behavior. It should not add React, `cmdk`, `lucide-react`, Tailwind,
`cn`, or vendor dependencies to RadCN.
