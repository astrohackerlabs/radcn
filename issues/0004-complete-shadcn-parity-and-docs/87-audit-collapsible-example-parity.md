# Experiment 87: Audit collapsible example parity

## Description

The regenerated parity inventory after Experiment 86 recommends Collapsible as
the next unresolved example cluster. Upstream shadcn/ui New York v4 has one
direct Collapsible example, `collapsible-demo`. RadCN already exports
`radcn/collapsible`, has candidate fixtures for default, open, disabled, and
custom-token behavior, and has Playwright coverage for native `details` /
`summary` behavior, open/closed state, keyboard toggling, disabled state,
public hooks, and custom tokens.

This experiment should audit the upstream direct Collapsible example against
current RadCN evidence and produce a focused inventory that determines whether
the cluster is already covered or which exact named-example gaps remain. It
should not implement the named example yet.

The likely remaining gap is named docs/fixture/test evidence for the exact
upstream `collapsible-demo` composition:

- controlled React `useState(false)` open state and `onOpenChange`;
- root `className="flex w-[350px] flex-col gap-2"`;
- header row `div` with `flex items-center justify-between gap-4 px-4`;
- heading text `@peduarte starred 3 repositories`;
- trigger using `asChild` around a ghost icon Button with size `icon`,
  `className="size-8"`, `ChevronsUpDown`, and screen-reader text `Toggle`;
- always-visible repository row `@radix-ui/primitives`;
- CollapsibleContent with `className="flex flex-col gap-2"`;
- hidden/toggled repository rows `@radix-ui/colors` and `@stitches/react`;
- rounded bordered mono repository row styling;
- upstream React client component marker, Radix Collapsible primitive,
  `data-slot`, `className`, Tailwind layout/spacing/sizing utilities, Radix
  controlled-state callbacks, lucide icon package, Button composition, and
  `asChild` mechanics mapped to RadCN's dependency-free native disclosure
  markup, public hooks, class/style/CSS variables, explicit app-owned icon
  markup, and Remix/web-first state model.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md`.
  - List direct upstream collapsible example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/collapsible*.tsx`.
  - Summarize the upstream UI implementation from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/collapsible.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `collapsible-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for React state, Radix non-dependency, native
    `details`/`summary`, `data-slot`, `className`, Tailwind utility mapping,
    `asChild`, Button composition, lucide icon mapping, screen-reader text,
    default closed state, repository row layout, package hooks, custom tokens,
    docs evidence, fixture evidence, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 87 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation, inventory
regeneration, or `resolved-clusters.json` changes should be made in this audit
experiment unless the audit itself exposes an already-covered result that can
be proven entirely from existing evidence. If that happens, record the
evidence and keep the change limited to issue documentation.

## Verification

Pass criteria:

- `collapsible-example-inventory.md` exists and has:
  - `# Collapsible Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `collapsible-demo`, using
    this header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor collapsible example
  count is exactly one and the inventory table contains exactly one matching
  row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^collapsible.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`vendor: ${vendor.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (vendor.length !== 1 || vendor[0] !== 'collapsible-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'collapsible-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md', 'utf8')
  const row = text.match(/^\| `collapsible-demo` \|([^\n]+)$/m)?.[0]
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
  React client component marker, React `useState`, `open`, `onOpenChange`,
  Radix Collapsible primitive, `data-slot`, `className`, `asChild`, Button
  composition, ghost variant, icon size, `size-8`, lucide
  `ChevronsUpDown`, `sr-only` text, default closed state, `w-[350px]`, flex
  column/gap layout, header row, repository row styling, mono text, content
  toggling, Tailwind utilities, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/collapsible.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/collapsible.tsx`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/tests/collapsible.spec.ts`.
- The Issue 4 README `## Learnings` section records the Collapsible audit
  result and the next recommended experiment after the audit result is known.
  A deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 87|collapsible-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file,
  `collapsible-example-inventory.md`, and the Issue 4 README before the result
  commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text:
  `@peduarte starred 3 repositories`, `Toggle`,
  `@radix-ui/primitives`, `@radix-ui/colors`, or `@stitches/react`.
- The audit marks `collapsible-demo` covered without docs, fixture, and
  Playwright evidence for the named example, unless it records a precise
  intentional divergence with enough existing evidence.
- The audit treats React/Radix/lucide/Tailwind implementation details as
  RadCN dependencies instead of mapping or rejecting them.
- The audit changes package, docs app, fixture, or Playwright implementation
  files before the follow-up implementation experiment is designed and
  approved.
- The audit mutates vendor source or adds forbidden dependencies such as React,
  Radix, Tailwind, lucide-react, or class-variance-authority.

## Design Review

Reviewer: Ampere the 2nd (`019e9d90-1ed8-7c50-a596-905e3c3cf091`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 87 as `Designed`, required sections are present, scope is
narrow and audit-only, implementation has not started before the plan commit,
verification has concrete pass/fail criteria and hygiene checks, vendor
checkouts are clean, and the technical target matches upstream
`collapsible-demo` while current RadCN evidence supports the likely-gap
framing.

## Result

**Result:** Partial

Created `collapsible-example-inventory.md` for the single direct upstream New
York v4 Collapsible example, `collapsible-demo`. The audit confirms RadCN
already covers dependency-free native `details`/`summary` disclosure markup,
public Collapsible/Trigger/Content hooks, closed and open rendering, click,
Enter, and Space toggling, disabled non-interactive state, hidden disabled
content, content visibility, icon hooks, and custom tokens.

The direct Collapsible cluster remains partial because current docs, fixtures,
and tests do not prove the exact named upstream `collapsible-demo`
composition: `@peduarte starred 3 repositories`, accessible `Toggle`
icon-only trigger, ghost Button `size="icon"`/`size-8` styling, `asChild`
mapping, app-owned chevrons icon, always-visible `@radix-ui/primitives` row,
toggled `@radix-ui/colors` and `@stitches/react` rows, 350px flex-column root
layout, header row layout, rounded bordered monospace row styling, default
closed named state, or the React/Radix/lucide/Tailwind mapping.

Verification commands run:

```text
node - <<'NODE'
const fs = require('fs')
const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
  .filter((file) => /^collapsible.*\.tsx$/.test(file))
  .map((file) => file.replace(/\.tsx$/, ''))
  .sort()
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md', 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
console.log(`vendor: ${vendor.join(', ')}`)
console.log(`inventory: ${rows.join(', ')}`)
if (vendor.length !== 1 || vendor[0] !== 'collapsible-demo') process.exit(1)
if (rows.length !== 1 || rows[0] !== 'collapsible-demo') process.exit(1)
NODE
```

Passed with `vendor: collapsible-demo` and
`inventory: collapsible-demo`.

```text
node - <<'NODE'
const fs = require('fs')
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md', 'utf8')
const row = text.match(/^\| `collapsible-demo` \|([^\n]+)$/m)?.[0]
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

Passed with `outcome: Partial` and a non-empty follow-up.

```text
rg -n "Experiment 87|collapsible-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
```

Passed.

```text
git diff --check
```

Passed.

```text
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Passed with no output.

```text
git status --short
```

Passed with only the expected audit result files:

```text
 M issues/0004-complete-shadcn-parity-and-docs/87-audit-collapsible-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/collapsible-example-inventory.md
```

## Conclusion

Collapsible direct example parity is not complete yet. The next experiment
should implement named `collapsible-demo` docs, candidate fixture, and
Playwright coverage using RadCN's native disclosure model, explicit
Button/icon/accessibility mapping, exact repository-list content, and
documented React/Radix/lucide/Tailwind divergences.

## Completion Review

Reviewer: Schrodinger the 2nd (`019e9d93-57bf-78a3-a73b-45c1604e046e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: the first review found that the result did not record
  `git status --short` output even though the plan required it. Fixed by
  recording the expected three audit result paths. The review also found that
  the README learning recorded the audit result and gaps but not the next
  recommended experiment. Fixed by adding that the next experiment should
  implement named `collapsible-demo` docs, candidate fixture, and Playwright
  coverage.
- Minor: none.

Re-review: the reviewer confirmed both Major findings are resolved. The result
now records `git status --short` with only the expected three audit result
paths, and the README learning now states the next experiment should implement
named `collapsible-demo` docs, candidate fixture, and Playwright coverage. No
new blocker was introduced.

Approval: approved.
