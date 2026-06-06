# Experiment 91: Audit data-table example parity

## Description

The regenerated parity inventory after Experiment 90 recommends Data Table as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct example, `data-table-demo`, registered as an example dependency on
`data-table`. The same upstream registry also has a dashboard block
implementation at
`vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/dashboard-01/components/data-table.tsx`,
but this experiment should only audit the direct example queue and explicitly
record whether block-specific behavior belongs to a later block audit.

Experiment 4 already shipped `radcn/data-table` as a dependency-free,
package-backed composition layer instead of depending on React, TanStack Table,
or drag/drop table engines. Current RadCN docs and fixtures cover semantic
tables, native filter forms, sortable links, selection checkboxes, pagination,
row actions, responsive detail panels, row editing, dashboard composition,
empty state, custom tokens, and package/public hook exports. This experiment
should audit whether that evidence covers the exact direct upstream
`data-table-demo`, or whether a named implementation experiment is needed.

The likely remaining gap is named docs/fixture/test evidence for the upstream
payments table composition:

- `"use client"`, React state, and `useReactTable`;
- TanStack Table `ColumnDef`, sorting, column filters, column visibility, row
  selection, core row model, pagination row model, sorted row model, and
  filtered row model;
- sample `Payment` data with ids `m5gr84i9`, `3u1reuv4`, `derv1ws0`,
  `5kma53ae`, and `bhqecj4p`;
- statuses `success`, `processing`, and `failed`;
- emails `ken99@example.com`, `Abe45@example.com`,
  `Monserrat44@example.com`, `Silas22@example.com`, and
  `carmella@example.com`;
- amounts `316`, `242`, `837`, `874`, and `721`, formatted as USD;
- select-all and row checkbox aria labels `Select all` and `Select row`;
- headers `Status`, `Email`, and `Amount`;
- email sort button with `ArrowUpDown`;
- row action menu trigger with `Open menu`, `MoreHorizontal`, label
  `Actions`, item `Copy payment ID`, and items `View customer` and
  `View payment details`;
- filter input placeholder `Filter emails...`;
- columns dropdown button `Columns` with `ChevronDown` and checkbox items for
  hideable columns;
- bordered rounded overflow table frame;
- selected-row data state;
- empty result text `No results.`;
- footer text `{selected} of {filtered} row(s) selected.`;
- outline `Previous` and `Next` pagination buttons with disabled state;
- mappings for Button, Checkbox, DropdownMenu, Input, Table, lucide icons,
  React/TanStack state, `className`, Tailwind utilities, clipboard behavior,
  and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md`.
  - List direct upstream data-table example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["data-table"]`, and cross-check those entries
    against `examples/data-table*.tsx` files.
  - Record the dashboard block data-table path as related but out of scope for
    this direct example audit unless the audit proves it must be treated as
    direct example evidence.
  - Summarize upstream mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/data-table-demo.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `data-table-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for React client components, TanStack Table
    non-dependency, native forms/links/server state, sorting, filtering,
    column visibility, row selection, pagination, row actions, clipboard,
    `className`, Tailwind utility mapping, Button/Checkbox/DropdownMenu/Input/
    Table composition, lucide icon mapping, app-owned data operations, package
    hooks, custom tokens, docs evidence, fixture evidence, Playwright evidence,
    block-vs-example scope, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 91 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `data-table-example-inventory.md` exists and has:
  - `# Data Table Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `data-table-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Related Block`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor data-table example
  registry entry count is exactly one, the matching file-glob count is exactly
  one, and the inventory table contains exactly one matching row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[2].includes('"data-table"'))
    .map((match) => match[1])
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^data-table.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'data-table-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'data-table-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'data-table-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md', 'utf8')
  const row = text.match(/^\| `data-table-demo` \|([^\n]+)$/m)?.[0]
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

- A deterministic check proves the related dashboard block path is mentioned
  under `## Related Block` and is not counted as a direct example row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md', 'utf8')
  const related = text.match(/## Related Block[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  if (!related.includes('blocks/dashboard-01/components/data-table.tsx')) process.exit(1)
  if (examples.includes('dashboard-01')) process.exit(1)
  NODE
  ```

- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, React state, TanStack Table, `ColumnDef`, sorting state,
  column filters, column visibility, row selection, row models, pagination,
  filter input, columns dropdown, row action dropdown, select-all checkbox,
  row checkboxes, selected-row data state, empty state, formatted USD amounts,
  Button, Checkbox, DropdownMenu, Input, Table, `className`, Tailwind
  utilities, lucide `ArrowUpDown`, `ChevronDown`, and `MoreHorizontal`,
  clipboard write behavior, and vendor source.
- The audit explicitly mentions all exact upstream user-facing text and data:
  `Filter emails...`, `Columns`, `Status`, `Email`, `Amount`, `Select all`,
  `Select row`, `Open menu`, `Actions`, `Copy payment ID`, `View customer`,
  `View payment details`, `No results.`, `Previous`, `Next`,
  `0 of 0 row(s) selected.` pattern, `m5gr84i9`, `3u1reuv4`, `derv1ws0`,
  `5kma53ae`, `bhqecj4p`, `success`, `processing`, `failed`,
  `ken99@example.com`,
  `Abe45@example.com`, `Monserrat44@example.com`, `Silas22@example.com`,
  `carmella@example.com`, `$316.00`, `$242.00`, `$837.00`, `$874.00`, and
  `$721.00`.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/data-table.tsx`;
  - `radcn/packages/radcn/src/components/table.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/data-table.tsx`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/tests/data-display.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 91 with status
  `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Data Table audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 91|data-table-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text or data listed above.
- The audit counts the dashboard block data-table file as a direct example row
  instead of classifying it separately.
- The audit marks `data-table-demo` covered without docs, fixture, and
  Playwright evidence for the named example, unless it records a precise
  intentional divergence with enough existing evidence.
- The audit treats React, TanStack Table, lucide-react, or Tailwind
  implementation details as RadCN dependencies instead of mapping or rejecting
  them.
- The audit changes package, docs app, fixture, or Playwright implementation
  files before the follow-up implementation experiment is designed and
  approved.
- The audit mutates vendor source or adds forbidden dependencies such as React,
  TanStack Table, lucide-react, Tailwind, or class-variance-authority.

## Design Review

Reviewer: Hegel the 3rd
(`019e9dc5-44f7-78d1-be4b-e2f6d2cb1162`), fresh-context Codex subagent
(`fork_context: false`).

Initial findings:

- Blocker: none.
- Major: The initial design counted direct upstream data-table examples by
  filename glob only, even though the source of truth is the examples registry.
  Fixed by requiring `_registry.ts` validation for `registry:example` entries
  with `registryDependencies: ["data-table"]`, cross-checked against the
  `examples/data-table*.tsx` file glob.
- Major: The initial explicit data pass criteria listed emails and formatted
  amounts but omitted payment IDs and status values. Fixed by adding
  `m5gr84i9`, `3u1reuv4`, `derv1ws0`, `5kma53ae`, `bhqecj4p`, `success`,
  `processing`, and `failed`.
- Minor: The initial design deferred README learnings but did not require the
  result-phase README learning update in verification. Fixed by adding a
  pass criterion that the Issue 4 README `## Learnings` records the Data Table
  audit outcome and next-step decision after the result is recorded.

Re-review: approved. The reviewer confirmed all prior findings are resolved,
the README links Experiment 91 as `Designed`, the experiment remains
audit-only, and no new blocker was introduced.
