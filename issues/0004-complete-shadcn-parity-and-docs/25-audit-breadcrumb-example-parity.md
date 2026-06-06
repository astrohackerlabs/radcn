# Experiment 25: Audit breadcrumb example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`breadcrumb`. RadCN already exports the core Breadcrumb parts and has fixture
coverage for default navigation semantics, collapsed ellipsis rendering, and a
custom separator.

Upstream shadcn/ui has 6 Breadcrumb examples that exercise a broader example
surface: native link and Next `Link` composition through `asChild`, default
ChevronRight separators, custom Slash separators, ellipsis-only collapsed
breadcrumbs, dropdown menu breadcrumb branches, and a responsive breadcrumb that
switches between a desktop DropdownMenu and a mobile Drawer. The examples also
use React state, `useMediaQuery`, Radix Slot, lucide icons, Tailwind truncation
and responsive utilities, Button composition, Drawer composition, and
DropdownMenu composition.

This experiment audits the upstream Breadcrumb example surface before
implementation. It should identify which examples are already covered, which
need package/docs/test depth, and which React-only, Next, Radix, lucide,
Tailwind, or composition mechanics should map to Remix 3 web-first behavior. It
must not implement new package APIs.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md`.
  - List all 6 upstream Breadcrumb example ids:
    `breadcrumb-demo`, `breadcrumb-dropdown`, `breadcrumb-ellipsis`,
    `breadcrumb-link`, `breadcrumb-responsive`, and `breadcrumb-separator`.
  - For each example, record user-facing behavior, current RadCN evidence,
    outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Record mapping decisions for native links, Next `Link`/`asChild`,
    default ChevronRight separators, custom Slash separators, collapsed
    ellipsis, dropdown menu composition, responsive desktop DropdownMenu vs
    mobile Drawer behavior, Button/Drawer/DropdownMenu ownership, React
    `useState`, `useMediaQuery`, Radix Slot, lucide icons, Tailwind truncation
    and responsive utility classes, and current RadCN package/docs/fixture/
    Playwright evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/breadcrumb.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/breadcrumb-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/breadcrumb.tsx`
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/packages/radcn/src/components/drawer.tsx`
  - `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  - `radcn/fixtures/tests/navigation-collection.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `breadcrumb-example-inventory.md` exists and contains exactly one table row
  for each upstream Breadcrumb example id.
- A deterministic Node check proves all 6 upstream Breadcrumb example ids
  appear exactly once in `breadcrumb-example-inventory.md`.
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = ['breadcrumb-demo','breadcrumb-dropdown','breadcrumb-ellipsis','breadcrumb-link','breadcrumb-responsive','breadcrumb-separator']
  let failed = false
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (text.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does not
  mark the cluster resolved unless every upstream example is `Covered` or
  `Intentional divergence`.
- The inventory explicitly addresses:
  - simple linked breadcrumb navigation with current-page semantics;
  - native link mapping for Next `Link` and shadcn `asChild`;
  - default ChevronRight separator behavior;
  - custom Slash separator behavior;
  - collapsed ellipsis behavior and accessible hidden text;
  - dropdown menu breadcrumb branches and trigger semantics;
  - responsive breadcrumb behavior across desktop and mobile;
  - desktop DropdownMenu vs mobile Drawer composition ownership;
  - Button composition for responsive Drawer close actions;
  - React `useState` and `useMediaQuery` mapping to Remix 3 browser
    enhancement, CSS, or app-owned state;
  - Radix Slot dependency mapping;
  - lucide icon package mapping;
  - Tailwind truncation, max-width, gap, and responsive utility mapping to
    RadCN classes, styles, or CSS variables;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "breadcrumb-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Breadcrumb example id from the generated
  inventory.
- The audit treats React state, `useMediaQuery`, Next `Link`, Radix Slot,
  lucide icons, Tailwind utility classes, Button, Drawer, DropdownMenu, or
  vendor code as mandatory RadCN package dependencies instead of mapping them to
  equivalent user-facing behavior and application composition.
- The audit marks `breadcrumb` resolved without package/docs/fixture/test
  evidence for the full upstream example surface.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Boyle (`019e9af8-2352-73b2-8dab-d3b2bb6655e4`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Boyle confirmed the design is linked from the Issue
4 README as `Designed`, has the required sections, stays audit-only, includes
concrete pass/fail checks, includes repo hygiene and vendor cleanliness checks,
requires issue learnings, and has not started implementation before the plan
commit.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md`
as an audit-only inventory for all 6 upstream Breadcrumb examples:
`breadcrumb-demo`, `breadcrumb-dropdown`, `breadcrumb-ellipsis`,
`breadcrumb-link`, `breadcrumb-responsive`, and `breadcrumb-separator`.

The inventory records each example's user-facing behavior, current RadCN
evidence, outcome, and required follow-up. It does not mark `breadcrumb`
resolved, because the examples need docs/fixture/Playwright depth beyond the
current primitive coverage, especially for DropdownMenu and responsive
DropdownMenu/Drawer compositions.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = ['breadcrumb-demo','breadcrumb-dropdown','breadcrumb-ellipsis','breadcrumb-link','breadcrumb-responsive','breadcrumb-separator']
let failed = false
for (const id of ids) {
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (text.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
if (failed) process.exit(1)
NODE
```

Output:

```text
breadcrumb-demo: 1
breadcrumb-dropdown: 1
breadcrumb-ellipsis: 1
breadcrumb-link: 1
breadcrumb-responsive: 1
breadcrumb-separator: 1
```

```text
rg -n 'current-page|native link|Next `Link`|asChild|ChevronRight|Slash|ellipsis|hidden text|dropdown|trigger|responsive|desktop DropdownMenu|mobile Drawer|Button|useState|useMediaQuery|Radix Slot|lucide|Tailwind|Playwright' issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: simple linked breadcrumb navigation, native link mapping for Next
`Link` and shadcn `asChild`, default ChevronRight separators, custom Slash
separators, collapsed ellipsis behavior, accessible hidden text, dropdown menu
branches, trigger semantics, responsive desktop/mobile behavior, DropdownMenu,
Drawer, Button, React `useState`, `useMediaQuery`, Radix Slot, lucide icons,
Tailwind utility mapping, and current RadCN package/docs/fixture/Playwright
evidence.

Additional verification:

```text
rg -n "breadcrumb-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:420:  `breadcrumb-example-inventory.md`. Breadcrumb example parity is not complete
 M issues/0004-complete-shadcn-parity-and-docs/25-audit-breadcrumb-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/breadcrumb-example-inventory.md
```

`git diff --check` passed with no output. Vendor status printed no output.

## Conclusion

Breadcrumb should be the next implementation cluster. The implementation should
add named docs and fixture coverage for all six upstream examples, prove
dropdown and responsive compositions in Playwright, map React/Next/Radix/
lucide/Tailwind mechanics to Remix 3 and app-owned composition, and either
align or intentionally document RadCN's separator and ellipsis visual defaults.

## Completion Review

Reviewer: Archimedes (`019e9afa-a0d2-7fa0-a92d-2d7f2ad511d3`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: the recorded `rg` verification command used double quotes around a
  pattern containing backticks for `Next \`Link\``, which would trigger shell
  command substitution when copied into a shell.

Fix: changed the recorded `rg` command to single quotes and reran it
successfully.

Review result: approved. Archimedes confirmed the completed result matches the
approved audit-only scope; `git status --short` shows only the two Issue 4 docs
modifications plus the new inventory file; `git diff --check` passes; vendor
status is clean; the result commit had not been made before review; the
experiment has `## Result` and `## Conclusion`; the Issue 4 README marks
Experiment 25 as `Pass`; the README records the Breadcrumb learnings and next
implementation cluster; and the Node inventory check reports each of the six
upstream Breadcrumb example ids exactly once.
