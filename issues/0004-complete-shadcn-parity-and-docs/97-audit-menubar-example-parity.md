# Experiment 97: Audit menubar example parity

## Description

The regenerated parity inventory after Experiment 96 recommends Menubar as the
next unresolved direct example cluster. Upstream shadcn/ui New York v4 has one
direct Menubar example, `menubar-demo`, registered as an example dependency on
`menubar`.

RadCN already ships `radcn/menubar` with package exports, a dependency-free
Menubar primitive family, menu portal enhancement, roving trigger focus,
submenu behavior, checkbox/radio item state, disabled state, package classes,
public hooks, generic docs coverage, candidate fixtures, reference fixtures,
and Playwright coverage in `menubar-navigation.spec.ts`.

This experiment should audit whether that evidence covers the exact direct
upstream `menubar-demo`, or whether a named implementation experiment is
needed. The likely remaining gap is named docs/fixture/test evidence for the
full upstream browser-style Menubar composition:

- `"use client"` and Radix Menubar mechanics;
- lucide `CheckIcon`, `ChevronRightIcon`, and `CircleIcon` package mechanics;
- `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`,
  `MenubarItem`, `MenubarSeparator`, `MenubarSub`, `MenubarSubTrigger`,
  `MenubarSubContent`, `MenubarCheckboxItem`, `MenubarRadioGroup`,
  `MenubarRadioItem`, and `MenubarShortcut`;
- top-level triggers `File`, `Edit`, `View`, and `Profiles`;
- file menu items `New Tab`, `New Window`, disabled
  `New Incognito Window`, submenu `Share`, submenu items `Email link`,
  `Messages`, `Notes`, and `Print...`;
- edit menu items `Undo`, `Redo`, submenu `Find`, submenu items
  `Search the web`, `Find...`, `Find Next`, `Find Previous`, and items
  `Cut`, `Copy`, `Paste`;
- view menu checkbox items `Always Show Bookmarks Bar` and checked
  `Always Show Full URLs`, inset items `Reload`, disabled `Force Reload`,
  `Toggle Fullscreen`, and `Hide Sidebar`;
- profiles radio group value `benoit`, radio items `Andy`, `Benoit`, `Luis`,
  and inset items `Edit...` and `Add Profile...`;
- shortcuts `⌘T`, `⌘N`, `⌘P`, `⌘Z`, `⇧⌘Z`, `⌘R`, and `⇧⌘R`;
- upstream default content placement `align="start"`, `alignOffset={-4}`,
  `sideOffset={8}`, root layout/classes, content min widths, inset padding,
  checked indicators, submenu caret, `className`, Tailwind utilities, `cn`,
  `data-slot`, role/ARIA semantics, keyboard behavior, hover/pointer
  behavior, portal behavior, docs evidence, fixture evidence, Playwright
  evidence, custom tokens, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/menubar-example-inventory.md`.
  - List direct upstream Menubar example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["menubar"]`, and cross-check those entries against
    `examples/menubar*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/menubar-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/menubar.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `menubar-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for React client components, Radix Menubar
    non-dependency, lucide icon non-dependency, root/menu/trigger/content/item
    mapping, portal/content placement, checkbox/radio indicators, submenu
    behavior, keyboard/hover behavior, disabled/inset state, shortcuts,
    `className`, Tailwind utility mapping, `cn`, `data-slot`, docs evidence,
    fixture evidence, Playwright evidence, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 97 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `menubar-example-inventory.md` exists and has:
  - `# Menubar Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `menubar-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Menubar example
  cluster count is exactly one by the same filename-prefix rule used by
  `scripts/audit-shadcn-parity.mjs`, the matching file-glob count is exactly
  one, and the inventory table contains exactly one matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'menubar' || match[1].startsWith('menubar-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'menubar')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^menubar.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/menubar-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'menubar-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'menubar-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'menubar-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/menubar-example-inventory.md', 'utf8')
  const row = text.match(/^\| `menubar-demo` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, Radix Menubar, lucide `CheckIcon`, `ChevronRightIcon`,
  `CircleIcon`, all Menubar parts listed in Description, root/content default
  layout and placement, checkbox/radio indicators, submenu caret, inset state,
  disabled state, shortcuts, `className`, Tailwind utilities, `cn`,
  `data-slot`, portal behavior, keyboard behavior, hover/pointer behavior, and
  vendor source.
- The audit explicitly mentions exact upstream user-facing trigger, item,
  submenu, checkbox, radio, inset item, disabled item, and shortcut text listed
  in Description.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/menubar.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/menubar.tsx`;
  - `radcn/fixtures/reference-react-router/app/fixtures/menubar.tsx`;
  - `radcn/fixtures/tests/menubar-navigation.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 97 with status
  `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Menubar audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 97|menubar-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text or mechanics listed
  above.
- The audit marks `menubar-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream composition, unless existing
  evidence already proves the same composition on the Menubar surface.
- The audit treats Radix/React DOM equivalence as required instead of
  user-facing behavior, accessibility, and author-facing modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Hume the 3rd
(`019e9e0a-b9d7-7530-97ab-2abf30504beb`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The initial deterministic direct-cluster check captured
  `registryDependencies` but did not assert the dependency list was exactly
  `["menubar"]`, even though the Changes section required that source
  constraint. Fixed by parsing and filtering the captured dependency list so
  only entries with exactly one dependency, `menubar`, count.

Approved. The reviewer confirmed the issue README links Experiment 97 with
status `Designed`, the plan has the required sections including
`## Design Review`, scope is narrow and audit-only, implementation has not
started before the plan commit, verification includes concrete pass/fail
criteria and hygiene checks, vendor checkouts are clean, and the technical
plan is likely to achieve the Menubar audit goal.

## Result

**Result:** Partial

Experiment 97 added `menubar-example-inventory.md` and audited the direct
upstream Menubar example cluster, `menubar-demo`.

The audit found that RadCN already has strong package and substrate evidence
for Menubar: package exports, explicit Menubar parts, server-rendered
role/ARIA markup, `enhanceMenubar`, portal-backed content, roving trigger
focus, keyboard/typeahead behavior, hover switching, submenu behavior,
checkbox/radio item state, disabled state, inset classes, shortcut hooks,
custom tokens, generic docs coverage, candidate/reference fixtures, and
Playwright coverage.

The direct example remains partial because current Menubar docs and fixtures do
not prove the named upstream four-menu demo composition: `File`, `Edit`,
`View`, and `Profiles`; all upstream item, submenu, checkbox, radio, inset,
disabled, and shortcut text; checked `Always Show Full URLs`; radio value
`benoit`; exact submenu contents; exact `sideOffset={8}` placement or an
intentional RadCN offset decision; public hooks for every Menubar part; and the
React/Radix/lucide/`className`/Tailwind/`cn`/`data-slot`/portal/keyboard/
pointer/vendor-source mapping on the Menubar page and fixture route.

Verification passed:

```text
required inventory headings and terms check
deterministic menubar direct-cluster/dependency/file/inventory row-count check
deterministic row outcome/follow-up check
rg -n "Experiment 97|menubar-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

`git status --short` showed only audit-scope issue documentation changes:
modified Experiment 97 after result recording, modified Issue 4 `README.md`,
and new `menubar-example-inventory.md`.

## Conclusion

The direct Menubar example cluster is partial. The next experiment should
implement named `menubar-demo` docs, candidate fixture, and Playwright coverage
for the exact upstream four-menu composition, including a deliberate decision
for the upstream `sideOffset={8}` behavior versus RadCN's current
`sideOffset={4}` default.

## Completion Review

Reviewer: Meitner the 3rd
(`019e9e0e-5d19-7dd0-9e20-a9e290b59d98`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the experiment has Result and Conclusion, the
Issue 4 README marks Experiment 97 as `Partial`, README learnings record the
Menubar audit outcome and next step, deterministic inventory checks passed,
`git diff --check` passed, vendor checkouts were clean, the dirty state was
limited to audit-scope issue docs, and the result commit had not yet been made.
