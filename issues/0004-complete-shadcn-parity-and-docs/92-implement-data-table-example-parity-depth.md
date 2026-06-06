# Experiment 92: Implement data-table example parity depth

## Description

Experiment 91 audited the single direct upstream Data Table example,
`data-table-demo`, and found the cluster is partial. RadCN already has the
dependency-free package substrate: `radcn/data-table`, `radcn/table`, semantic
table output, native filter forms, sortable links, selection checkboxes,
pagination, row actions, column controls, responsive detail, row editing,
empty state, custom tokens, package exports, public hooks, and negative
dependency checks for React/TanStack-style table engines.

This experiment should resolve the direct Data Table example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
payments composition while preserving RadCN's web-first model:

- render the five upstream payment rows with ids `m5gr84i9`, `3u1reuv4`,
  `derv1ws0`, `5kma53ae`, and `bhqecj4p`;
- render statuses `success`, `processing`, and `failed`, with upstream
  lowercase/capitalize behavior represented visibly;
- render emails `ken99@example.com`, `Abe45@example.com`,
  `Monserrat44@example.com`, `Silas22@example.com`, and
  `carmella@example.com`, with lowercase presentation where the upstream demo
  lowercases email cells;
- render amounts `316`, `242`, `837`, `874`, and `721` as `$316.00`,
  `$242.00`, `$837.00`, `$874.00`, and `$721.00`;
- include select-all and row selection checkboxes with aria labels
  `Select all` and `Select row`;
- include headers `Status`, sortable `Email` with an app-owned ArrowUpDown
  presentation, and right-aligned `Amount`;
- include row action menu trigger `Open menu` with app-owned MoreHorizontal
  presentation, label `Actions`, item `Copy payment ID`, separator,
  `View customer`, and `View payment details`;
- include filter input placeholder `Filter emails...`;
- include `Columns` dropdown with app-owned ChevronDown presentation and
  checkbox items for hideable columns `status`, `email`, and `amount`, while
  excluding non-hideable `select` and `actions`;
- include bordered rounded overflow table frame evidence;
- include selected-row `data-state`;
- include empty result text `No results.`;
- include footer selection text such as `1 of 5 row(s) selected.`;
- include outline `Previous` and `Next` pagination buttons with disabled
  state evidence;
- include mapping copy for `"use client"`, React state, `useReactTable`,
  TanStack `ColumnDef`, sorting, column filters, column visibility, row
  selection, row models, `flexRender`, Button, Checkbox, DropdownMenu, Input,
  Table, `className`, Tailwind utilities, lucide `ArrowUpDown`,
  `ChevronDown`, `MoreHorizontal`, clipboard behavior, route/server state,
  native forms/links/checkboxes, and vendor source.

The implementation should not add React, TanStack Table, lucide-react,
Tailwind, class-variance-authority, or vendor dependencies. It should use
existing RadCN primitives and app-owned composition. Package code should change
only if the current Data Table primitives cannot represent the upstream
example's user-facing behavior or author-facing modifiability.

Dashboard block behavior remains out of scope. Do not implement or mark the
upstream dashboard block data-table resolved in this experiment.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote the Data Table docs example from generic `native-table-workflow`
    to a named `data-table-demo` example if needed.
  - Render a stable docs hook
    `data-radcn-docs-data-table-family="data-table-demo"`.
  - Render the exact upstream payment data, visible labels, formatted amounts,
    filter placeholder, column dropdown, row action menu, selection summary,
    empty-state evidence, and pagination controls.
  - Use existing `DataTable`, `Table`, `Button`, `Checkbox`, `DropdownMenu`,
    and `Input` primitives. Use app-owned text/glyph/icon presentation for
    ArrowUpDown, ChevronDown, and MoreHorizontal.
  - Include mapping copy for React/TanStack/lucide/Tailwind/clipboard
    mechanics and RadCN native/server/app-owned equivalents.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/data-table.tsx`
  Add a named `data-table/demo` fixture route, preserving existing default,
  sort-filter, selection, pagination, row-actions, responsive-detail,
  custom-token, column-controls, empty, row-editing, and dashboard-composition
  routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/data-display.spec.ts`.
  - Verify `data-table/demo` renders the exact payment data, table structure,
    public Data Table/Table hooks, filter input placeholder, selected row
    state, select-all and row checkbox labels, row checkbox state, sortable
    Email evidence, right-aligned Amount evidence, column dropdown behavior,
    row action dropdown behavior, clipboard/app-owned behavior evidence,
    empty state evidence, selection summary, Previous/Next disabled state,
    app-owned icon presentation, and no React/TanStack DOM-equivalence
    assumption.
  - Keep existing data-display tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/data-table` page renders the named family
    hook, exact payment data, public hooks, selected/empty/pagination/menu
    evidence, app-owned icon evidence, and required mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md`.
  - Change `data-table-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Preserve the `## Related Block` decision that dashboard block data-table is
    not a direct example row.
  - Record final decisions for data state, column visibility, row actions,
    clipboard behavior, icons, exact sample data, package API needs, and block
    scope.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `data-table` as a resolved example cluster only after the example row
    is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Data Table example outcome in `## Learnings`.
  - Update the Experiment 92 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Data Table is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Data Table primitives cannot meet the upstream example's user-facing behavior,
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

- Fixture data-display coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts data-display.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `data-table-example-inventory.md` has
  exactly one direct upstream row, `data-table-demo`, and the row is `Covered`
  or an explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'data-table-demo')
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
  `examples` entry with `slug = "data-table"`, `status = "resolved"`, and
  evidence for Experiment 91, Experiment 92, and
  `data-table-example-inventory.md`.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const data = JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json', 'utf8'))
  const entry = data.examples.find((item) => item.slug === 'data-table')
  console.log(JSON.stringify(entry, null, 2))
  const required = [
    'issues/0004-complete-shadcn-parity-and-docs/91-audit-data-table-example-parity.md',
    'issues/0004-complete-shadcn-parity-and-docs/92-implement-data-table-example-parity-depth.md',
    'issues/0004-complete-shadcn-parity-and-docs/data-table-example-inventory.md',
  ]
  if (!entry || entry.status !== 'resolved' || required.some((file) => !entry.evidence.includes(file))) process.exit(1)
  NODE
  ```

- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `data-table` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for data-table`.

  ```text
  node scripts/audit-shadcn-parity.mjs
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md', 'utf8')
  const unresolved = text.match(/## Unresolved Example Clusters[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const recommended = text.match(/## First Recommended Cluster[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  console.log(recommended.split('\n').slice(0, 4).join('\n'))
  if (unresolved.includes('| data-table |') || recommended.includes('Example parity for data-table')) process.exit(1)
  NODE
  ```

- Fixture tests assert:
  - `data-table/demo` renders DataTable, toolbar, filter, column controls,
    content, table container, table, header, body, rows, cells, selection
    summary, pagination, row action dropdown, and empty-state evidence with
    public hooks;
  - the table has five payment rows and exact ids, statuses, emails, and
    amounts from upstream;
  - `Filter emails...`, `Columns`, `Status`, `Email`, `Amount`, `Select all`,
    `Select row`, `Open menu`, `Actions`, `Copy payment ID`, `View customer`,
    `View payment details`, `No results.`, `Previous`, and `Next` are present;
  - the sortable Email header exposes `aria-sort`/sort link evidence and an
    app-owned ArrowUpDown presentation;
  - status cells expose capitalize behavior or equivalent presentation;
  - email cells expose lowercase behavior or equivalent presentation;
  - amount cells are right-aligned and font-medium or equivalent computed
    evidence;
  - select-all and row checkboxes are native/RadCN checkbox controls with
    labels and checked state evidence;
  - selected rows expose `data-state="selected"`;
  - `Columns` opens a DropdownMenu with checkbox items for the upstream
    hideable columns `status`, `email`, and `amount`, and does not expose
    `select` or `actions` as hideable column items unless an explicit
    divergence is recorded;
  - row action `Open menu` opens a DropdownMenu with label/actions/separator
    evidence and app-owned clipboard-copy state or data evidence for the
    payment id;
  - Previous is disabled on the first page, Next is enabled or explicitly
    linked to the next page, and selection summary text matches the rendered
    state;
  - no test depends on React state, TanStack internals, or literal DOM
    equivalence.
- Docs coverage asserts the Data Table page renders stable evidence for the
  named docs example and required dependency-divergence/mapping copy.
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
      name === '@tanstack/react-table' ||
      name.startsWith('@tanstack/') ||
      name.startsWith('@dnd-kit/') ||
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
    '@tanstack/react-table',
    'lucide-react',
    'tailwindcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[section] ?? {})) {
        if (forbidden.includes(name) || name.startsWith('@tanstack/') || name.startsWith('@dnd-kit/')) {
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

- The implementation adds React, TanStack Table, lucide-react, Tailwind,
  class-variance-authority, drag/drop engines, or vendor dependencies.
- The named demo omits any upstream payment id, email, status, amount, label,
  header, action, empty text, or pagination text listed above.
- Column visibility, row actions, selection, filtering, sorting, or pagination
  are only documented and not tested.
- The implementation treats literal TanStack or React DOM equivalence as
  required instead of proving user-facing behavior, accessibility, and
  modifiability.
- The implementation modifies vendor source or marks dashboard block data-table
  resolved.

## Design Review

Reviewer: Boyle the 3rd
(`019e9dcd-8136-7ae3-807b-de7e06b66db5`), fresh-context Codex subagent
(`fork_context: false`).

Initial findings:

- Blocker: none.
- Major: The initial verification allowed `actions` as a column visibility
  checkbox item, but upstream marks the actions column `enableHiding: false`
  and only maps hideable columns into the `Columns` menu. Fixed by requiring
  the upstream hideable set `status`, `email`, and `amount`, while excluding
  `select` and `actions` unless an explicit divergence is recorded.
- Minor: none.

Re-review: approved. The reviewer confirmed the prior finding is resolved,
the plan still links from the README as `Designed`, the experiment remains
focused on direct `data-table-demo` parity, and no new blocker was introduced.
