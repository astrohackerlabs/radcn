# Experiment 117: Implement table example parity depth

## Description

Experiment 116 audited the single direct upstream Table example,
`table-demo`, and found it partial. RadCN already has the semantic Table
substrate, but there is no named docs, fixture, and Playwright evidence for
the exact upstream invoice table composition.

This experiment should resolve the direct Table example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free semantic table model:

- render caption text `A list of your recent invoices.`;
- render header cells `Invoice`, `Status`, `Method`, and `Amount`;
- render seven invoice rows `INV001` through `INV007`;
- preserve exact payment statuses, methods, and amounts;
- render footer row with `Total` and `$2,500.00`;
- map upstream `TableHead className="w-[100px]"` to class plus explicit width
  evidence on the Invoice header cell;
- map upstream `text-right` to class plus explicit text-align evidence on the
  Amount header, body cells, and footer amount cell;
- map upstream `TableCell className="font-medium"` to class plus explicit
  font-weight evidence on invoice id cells;
- preserve `TableCell colSpan={3}` as native `colspan="3"` on the footer
  Total cell;
- prove public container/table/caption/header/body/footer/row/head/cell hooks
  and semantic table accessibility;
- record dependency-divergence mapping for `"use client"`, React component
  props, React intrinsic `ComponentProps` aliases, `data-slot`, `className`,
  Tailwind utilities, `cn`, responsive overflow container, DataTable
  non-substitution, and vendor source.

The implementation should not add React, Tailwind, class-variance-authority,
or vendor dependencies. Package code should change only if the current Table
primitive cannot represent the upstream example's user-facing behavior,
accessibility, browser behavior, or author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Table docs from generic generated content to a named `table-demo`
    rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-table-family="table-demo"` and per-cell evidence hooks if
    useful for tests.
  - Render the exact upstream caption, headers, seven invoice rows, statuses,
    methods, amounts, footer total, width/right-align/font/colspan mappings,
    and semantic table parts.
  - Include exact source snippet and mapping copy for React/defaults/
    Tailwind/`cn`/`className`/`data-slot`/responsive-container/
    DataTable-non-substitution/vendor mechanics.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  Add a named `table/demo` fixture route that renders the exact upstream
  invoice table and preserves existing `table/default`, `table/dense`, and
  `table/footer` scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/navigation-collection.spec.ts`.
  - Verify `table/demo` renders the named route, exact caption, all headers,
    all invoice rows, exact statuses, payment methods, amounts, footer total,
    `colspan="3"`, width/right-align/font mappings, public table hooks, and
    semantic table accessibility.
  - Keep existing generic Table tests unchanged unless selectors need to be
    narrowed around the new named fixture.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/table` page renders the named family hook,
    exact invoice table, source snippet, public hooks, semantic structure,
    width/right-align/font/colspan mappings, DataTable non-substitution copy,
    and required dependency-divergence mapping copy.
- Update `radcn/packages/radcn/src/components/table.tsx` only if
  implementation proves the current Table primitive cannot represent native
  footer colspan. If needed, add a `colSpan?: number` prop to `TableCell` and
  render it as native `colspan={colSpan}`.
- Update `issues/0004-complete-shadcn-parity-and-docs/table-example-inventory.md`.
  - Change `table-demo` from `Partial` to `Covered` only after docs, fixture,
    and Playwright evidence exists.
  - Record final decisions for invoice data, caption, semantic parts, width,
    right alignment, font weight, colspan, responsive container, dependency
    divergences, DataTable non-substitution, custom tokens, and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `table` as a resolved example cluster only after the inventory row is
    `Covered`. Whole-row intentional divergence is not a pass path for this
    experiment; if a new discovery makes exact demo coverage impossible,
    record a `Partial` or `Fail` result with follow-up instead. Individual
    mechanics such as React/Tailwind/`data-slot` may still be documented as
    dependency divergences.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Table example outcome in `## Learnings`.
  - Update the Experiment 117 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Table is resolved.

Package code should otherwise stay unchanged. If `TableCell colSpan` is added,
record in the result that the audit assumption changed because the upstream
footer Total cell requires native colspan support on the plain Table API.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture navigation/collection coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `table-example-inventory.md` has exactly
  one direct upstream row, `table-demo`, and the row is `Covered`.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "table"`, `status = "resolved"`, and evidence
  for Experiment 116, Experiment 117, and `table-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates `parity-inventory.md`; a
  deterministic check proves:
  - `table` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for table`;
  - block and chart-gallery sections remain out of scope, not unresolved
    deliverables.
- Fixture tests assert:
  - `table/demo` renders the named route;
  - caption text is exactly `A list of your recent invoices.`;
  - headers are exactly `Invoice`, `Status`, `Method`, and `Amount`;
  - there are seven body rows with invoice ids `INV001` through `INV007`;
  - every status, method, and amount matches upstream;
  - footer renders `Total`, `$2,500.00`, and native `colspan="3"`;
  - Invoice header maps `w-[100px]` with class/style evidence;
  - Amount header, body amount cells, and footer amount cell map `text-right`
    with class/style evidence;
  - invoice id cells map `font-medium` with class/style evidence;
  - container/table/caption/header/body/footer/row/head/cell public hooks are
    present;
  - semantic table roles and native table structure are discoverable by
    browser accessibility queries where Playwright supports them;
  - no test depends on React state, Tailwind, `cn`, or literal DOM equivalence
    with upstream.
- Docs coverage asserts the Table page renders stable evidence for the named
  docs example, exact invoice table, source snippet, public hooks, semantic
  structure, width/right-align/font/colspan mappings, DataTable
  non-substitution copy, and required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 117 learning, Table
  inventory reference, and next generated recommendation were recorded.
- Dependency and scope checks pass:
  - deterministic source import scan over files changed by this experiment for
    forbidden React/Tailwind/vendor source imports. The scan must include any
    changed files under `radcn/packages/radcn`, `radcn/apps/docs`, and
    `radcn/fixtures/candidate-remix`, but must not fail on unrelated
    pre-existing approved references;
  - manifest checks prove no forbidden dependencies were added;
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `git status --short` shows only the expected Experiment 117 implementation
    files before the result commit:
    `issues/0004-complete-shadcn-parity-and-docs/117-implement-table-example-parity-depth.md`,
    `issues/0004-complete-shadcn-parity-and-docs/README.md`,
    `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`,
    `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`,
    `issues/0004-complete-shadcn-parity-and-docs/table-example-inventory.md`,
    `radcn/apps/docs/app/content/components.tsx`,
    `radcn/apps/docs/tests/coverage.spec.ts`,
    `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`,
    `radcn/fixtures/scenarios/index.ts`,
    `radcn/fixtures/tests/navigation-collection.spec.ts`, and
    `radcn/packages/radcn/src/components/table.tsx`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output.

Failure criteria:

- The named demo omits exact caption, headers, invoice rows, statuses, methods,
  amounts, footer total, width mapping, right alignment, font weight, colspan,
  public hooks, semantic structure, or DataTable non-substitution copy.
- The implementation marks `table-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream composition.
- The implementation adds React, Tailwind, class-variance-authority, or vendor
  dependencies.
- The implementation treats literal DOM/style equivalence as required instead
  of user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The experiment modifies unrelated components, resolved clusters, blocks, or
  chart-gallery scope.

## Design Review

Reviewer: Einstein the 3rd (`019e9ee0-8a80-7f12-9f29-7be36338bf5c`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 117 as
`Designed`, the experiment has `Description`, `Changes`, `Verification`, and
`Design Review`, scope is narrow to the direct upstream `table-demo` cluster,
package changes are allowed only if plain Table cannot express native footer
colspan, implementation has not started before the plan commit, verification
has concrete typecheck, Playwright, deterministic inventory, resolved-cluster,
diff hygiene, lockfile, tracked-vendor, and nested vendor checks, the plan
does not treat `radcn/data-table` as direct Table proof, and the issue scope
excludes upstream blocks and chart-gallery examples while retaining ordinary
`radcn/chart` package scope.

## Result

**Result:** Pass

Implemented named `table-demo` parity across the docs site, candidate fixture,
fixture Playwright coverage, docs Playwright coverage, inventory bookkeeping,
and generated parity inventory.

The docs page now has a rich Table example that renders the exact upstream
invoice table: caption `A list of your recent invoices.`, headers `Invoice`,
`Status`, `Method`, and `Amount`, seven invoice rows `INV001` through
`INV007`, exact statuses, payment methods, amounts, footer `Total`, footer
amount `$2,500.00`, `class="w-[100px]"` plus width style, `class="text-right"`
plus text-align style, `class="font-medium"` plus font-weight style, native
`colspan="3"`, semantic table structure, and public Table hooks. The docs
source and copy record the Remix 3 mappings for upstream React intrinsic
`ComponentProps`, `data-slot`, `className`, Tailwind utilities, `cn`,
responsive overflow container, DataTable non-substitution, and vendor source.

The candidate fixture now has `table/demo` with the same invoice table and
public-hook evidence. `navigation-collection.spec.ts` proves the named route,
semantic table parts, exact invoice content, width/right-align/font/colspan
mappings, and the existing generic Table scenarios. `table-example-inventory.md`
marks `table-demo` as `Covered`, `resolved-clusters.json` marks `table`
resolved, and the regenerated parity inventory now recommends example parity
for `tabs`.

The implementation also added `TableCell colSpan` to `radcn/table`. This
package change was necessary because the upstream footer Total cell requires
native colspan support on the plain Table API.

Verification run:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
node deterministic check for table-example-inventory row count and Covered outcome
node deterministic check for resolved-clusters table evidence
node deterministic check that table left unresolved examples and the next recommendation is tabs
rg -n 'Experiment 117|table-example-inventory|example parity for `tabs`|example parity for tabs' issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --exit-code -- pnpm-lock.yaml
git diff --check
node deterministic tracked-vendor-source check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
node deterministic forbidden import/dependency scan over changed implementation files and relevant manifests
git status --short
```

All checks passed after one correction. The first Playwright run failed because
the tests looked for test-only custom `data-*` props on Table parts, but those
props are not part of the typed Table API and are intentionally not rendered.
The implementation and tests were corrected to use public Table hooks and
native table structure instead. The passing Playwright runs reported 9 passed
tests for `navigation-collection.spec.ts` and 5 passed tests for docs
`coverage.spec.ts`.

## Conclusion

Table direct example parity is complete. The current in-scope unresolved
example clusters are `tabs` and `tooltip`. The next experiment should audit
upstream `tabs-demo` parity before implementation.

## Completion Review

Reviewer: Pasteur the 3rd (`019e9ee7-2b96-7830-b333-3767e75b6fb4`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the implementation matches the approved
scope, `TableCell colSpan` was added to the package API and exported, docs
and fixture render direct plain Table `table-demo` evidence, Playwright covers
the exact caption, rows, style mappings, public hooks, and `colspan`, the
experiment has `Result` and `Conclusion`, Issue 4 records the learning and
marks Experiment 117 `Pass`, `table-demo` is marked `Covered` with docs,
fixture, and Playwright evidence, `radcn/data-table` is not treated as direct
proof, `git diff --check`, lockfile, tracked-vendor, and nested vendor checks
passed, and the result commit had not been made before review.
