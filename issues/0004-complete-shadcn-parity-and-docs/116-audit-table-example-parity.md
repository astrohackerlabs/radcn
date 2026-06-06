# Experiment 116: Audit table example parity

## Description

The regenerated parity inventory after Experiment 115 recommends `table` as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Table example, `table-demo`, registered as an example dependency on
`table`.

RadCN already ships `radcn/table` with dependency-free semantic table parts:
`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`,
`TableCell`, and `TableCaption`. The docs site also has substantial
`radcn/data-table` coverage, but that is a different component surface and
must not be treated as direct `table-demo` proof unless the plain Table
example itself is covered.

This experiment should audit whether existing evidence covers the exact direct
upstream `table-demo`, or whether a named implementation experiment is needed.
The likely remaining gap is named docs/fixture/test evidence for the upstream
invoice table composition:

- caption text `A list of your recent invoices.`;
- header cells `Invoice`, `Status`, `Method`, and `Amount`;
- seven invoice rows `INV001` through `INV007`;
- payment statuses, methods, and amounts exactly as upstream;
- footer row with `Total` and `$2,500.00`;
- `TableHead className="w-[100px]"`;
- right-aligned `Amount` header, body cells, and footer cell;
- `TableCell className="font-medium"` for invoice ids;
- `TableCell colSpan={3}` in the footer;
- upstream package mechanics: `"use client"`, React component props,
  `React.ComponentProps<"table">`, `React.ComponentProps<"thead">`,
  `React.ComponentProps<"tbody">`, `React.ComponentProps<"tfoot">`,
  `React.ComponentProps<"tr">`, `React.ComponentProps<"th">`,
  `React.ComponentProps<"td">`, `React.ComponentProps<"caption">`,
  `data-slot`, `className`, Tailwind utilities, `cn`, responsive overflow
  table container, semantic table accessibility, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/table-example-inventory.md`.
  - List direct upstream Table example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["table"]`, and cross-check those entries against
    `examples/table*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/table-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/table.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `table-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, semantic table mapping,
    container overflow mapping, caption/header/body/footer/row/cell mapping,
    `className`, Tailwind utility mapping, `cn`, `data-slot`, width/right
    align/font/colspan mapping, DataTable non-substitution, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 116 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `table-example-inventory.md` exists and has:
  - `# Table Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `table-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Table example
  cluster count is exactly one by the direct table filename-prefix and
  `registryDependencies: ["table"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'table' || match[1].startsWith('table-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'table')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^table.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/table-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'table-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'table-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'table-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up.
- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, `React.ComponentProps<"table">`,
  `React.ComponentProps<"thead">`, `React.ComponentProps<"tbody">`,
  `React.ComponentProps<"tfoot">`, `React.ComponentProps<"tr">`,
  `React.ComponentProps<"th">`, `React.ComponentProps<"td">`,
  `React.ComponentProps<"caption">`, caption text, all invoice rows, footer
  total, `w-[100px]`, `text-right`, `font-medium`, `colSpan={3}`,
  responsive overflow container, `className`, Tailwind utilities, `cn`,
  `data-slot`, semantic table accessibility, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/table.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`;
  - `radcn/fixtures/tests/native-state.spec.ts` or another fixture test file
    only to record whether direct Table-specific assertions exist;
  - `radcn/data-table` docs/fixtures only to classify them as related but not
    direct `table-demo` proof.
- The Issue 4 README `## Experiments` section links Experiment 116 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Table audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 116|table-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git diff --exit-code -- pnpm-lock.yaml`
- A deterministic tracked-vendor-source check proves the RadCN repository only
  tracks `vendor/.gitignore` under `vendor/`:

  ```text
  node - <<'NODE'
  const { execFileSync } = require('child_process')
  const files = execFileSync('git', ['ls-files', 'vendor'], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  console.log(files.join('\n'))
  if (files.length !== 1 || files[0] !== 'vendor/.gitignore') process.exit(1)
  NODE
  ```
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream invoice data, caption, header, footer,
  right-alignment, width, font, colspan, table part, or mechanics listed above.
- The audit marks `table-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream invoice table composition, unless
  existing evidence already proves that composition on the plain Table surface.
- The audit treats the richer `radcn/data-table` package as sufficient direct
  `table-demo` proof.
- The audit treats React DOM equivalence as required instead of user-facing
  behavior, accessibility, browser behavior, and author-facing modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Newton the 3rd (`019e9ed9-b0d2-7771-83e3-2237c80ec033`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The tracked-vendor-source hygiene check was described but not given
  as an exact command or expected output. Fixed by adding the deterministic
  `git ls-files vendor` Node command that asserts only `vendor/.gitignore` is
  tracked.

Approved. The reviewer confirmed the design is scoped to a read-only audit
plus issue documentation, the Issue 4 README links Experiment 116 as
`Designed`, the plan explicitly avoids using `radcn/data-table` as direct
`table-demo` proof, and the revised Issue 4 scope excludes upstream blocks and
chart-gallery examples while retaining the ordinary `radcn/chart` package
component.

## Result

**Result:** Partial

Added `table-example-inventory.md` and audited the single direct upstream
Table example cluster, `table-demo`.

The audit found that RadCN already has strong plain Table substrate:
dependency-free semantic table elements, container/table/caption/header/body/
footer/row/head/cell hooks, `scope="col"` on heads, `ariaSort`, class/style
customization, dense spacing, generic footer support, generic docs preview
coverage, and generic fixture coverage in `navigation-collection.spec.ts`.

The direct example remains partial. Current RadCN evidence does not prove a
named `table-demo` docs page, candidate fixture route, or Playwright tests for
the exact upstream invoice table: caption `A list of your recent invoices.`,
headers `Invoice`, `Status`, `Method`, `Amount`, seven invoice rows `INV001`
through `INV007`, exact statuses, methods, and amounts, footer total
`$2,500.00`, `TableHead className="w-[100px]"`, right-aligned amount header
and cells, `TableCell className="font-medium"` invoice ids, footer
`colSpan={3}`, source snippet, and React/Tailwind/`cn`/`className`/
`data-slot` divergence copy. Existing `radcn/data-table` proof is related
composition evidence, not direct plain Table example parity.

Verification run:

```text
node deterministic check for direct table registry/file/inventory count
node deterministic check for table-demo row outcome and follow-up
rg checks for required upstream mechanics and required RadCN evidence paths
git diff --check
git diff --exit-code -- pnpm-lock.yaml
node deterministic tracked-vendor-source check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
git status --short
```

All checks passed. `git status --short` showed only the Experiment 116 result
documentation changes before the completion review.

## Conclusion

Table direct example parity is not complete yet, but the remaining work is
well-scoped. The next experiment should implement named `table-demo` parity in
docs, candidate fixtures, and Playwright coverage, then update
`table-example-inventory.md`, `resolved-clusters.json`, and the generated
parity inventory.

## Completion Review

Reviewer: Bacon the 3rd (`019e9edd-1e39-7503-b1e5-019489c6f9c1`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the experiment stayed documentation-only,
the result commit had not been made before review, `git diff --check`,
lockfile, tracked-vendor, nested vendor, deterministic direct table count, and
deterministic outcome checks passed, the `Partial` result is supported because
upstream `table-demo` has the exact invoice table while current RadCN evidence
is generic plain Table plus separate DataTable coverage, and the Issue 4
README records the learning and marks Experiment 116 `Partial`.
