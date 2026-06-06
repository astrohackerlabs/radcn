# Experiment 103: Implement pagination example parity depth

## Description

Experiment 102 audited the single direct upstream Pagination example,
`pagination-demo`, and found it partial. RadCN already has the package
substrate and a generic fixture that renders the same user-facing sequence, but
there is no named docs, fixture, and Playwright evidence for the exact upstream
demo.

This experiment should resolve the direct Pagination example cluster by adding
named docs, candidate fixture, and Playwright coverage for the exact upstream
composition while preserving RadCN's dependency-free model:

- render `Previous`, page `1`, active page `2`, page `3`, ellipsis/`More
  pages`, and `Next` in that order;
- preserve previous and next accessible labels: `Go to previous page` and
  `Go to next page`;
- prove root/content/item/link/previous/next/ellipsis public hooks and active
  state on the named demo;
- map upstream lucide `ChevronLeftIcon`, `ChevronRightIcon`, and
  `MoreHorizontalIcon` to RadCN's package-owned icon affordance hooks without
  adding `lucide-react`;
- record the dependency-divergence mapping for React component props,
  `buttonVariants`, `Button` size typing, `className`, Tailwind utilities,
  `cn`, `data-slot`, button variant/size behavior, custom tokens, and vendor
  source.

The implementation should not add React, lucide-react, Tailwind,
class-variance-authority, or vendor dependencies. Package code should change
only if the current Pagination primitives cannot represent the upstream
example's user-facing behavior, accessibility, or author-facing modifiability.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Pagination docs from generic generated content to a named
    `pagination-demo` rich example if needed.
  - Render stable docs hooks such as
    `data-radcn-docs-pagination-family="pagination-demo"` and any
    part-specific hooks needed by docs tests.
  - Render the exact upstream demo composition and source snippet:
    `Previous`, `1`, active `2`, `3`, ellipsis, `Next`.
  - Include mapping copy for React props, lucide icons, `buttonVariants`,
    `Button` size typing, `className`, Tailwind utilities, `cn`, `data-slot`,
    button variant/size behavior, custom tokens, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  Add a named `pagination/demo` fixture route that renders the exact upstream
  composition and preserves existing `default`, `active`, and `custom-labels`
  Pagination scenarios.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/navigation-collection.spec.ts`.
  - Verify `pagination/demo` renders the exact sequence, accessible labels,
    active page `2`, ellipsis screen-reader text, public hooks, icon affordance
    hooks, link href behavior, and no React/lucide/Tailwind dependency
    behavior.
  - Keep existing active-page-`3` and custom-label coverage for modifiability.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/pagination` page renders the named family
    hook, exact demo text/states, public hooks, source snippet, and required
    dependency-divergence mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/pagination-example-inventory.md`.
  - Change `pagination-demo` from `Partial` to `Covered` only after docs,
    fixture, and Playwright evidence exists.
  - Record final decisions for icon mapping, `buttonVariants`, Button size,
    Tailwind utility mapping, `cn`, `className`, `data-slot`, active state,
    accessible labels, ellipsis text, custom-token support, package API needs,
    and vendor source.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `pagination` as a resolved example cluster only after the inventory row
    is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Pagination example outcome in `## Learnings`.
  - Update the Experiment 103 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Pagination is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Pagination primitives cannot meet the upstream example's user-facing behavior,
accessibility, and author-facing modifiability. If package code changes, add
package-level verification and record why the audit assumption changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Fixture coverage for Navigation Collection passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves
  `pagination-example-inventory.md` has exactly one direct upstream row,
  `pagination-demo`, and the row is `Covered` or an explicitly recorded
  intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/pagination-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'pagination-demo')
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
  `examples` entry with `slug = "pagination"`, `status = "resolved"`, and
  evidence for Experiment 102, Experiment 103, and
  `pagination-example-inventory.md`.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const data = JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json', 'utf8'))
  const entry = (data.examples || []).find((item) => item.slug === 'pagination')
  console.log(JSON.stringify(entry, null, 2))
  if (!entry || entry.status !== 'resolved') process.exit(1)
  const evidence = entry.evidence || []
  for (const required of [
    'issues/0004-complete-shadcn-parity-and-docs/102-audit-pagination-example-parity.md',
    'issues/0004-complete-shadcn-parity-and-docs/103-implement-pagination-example-parity-depth.md',
    'issues/0004-complete-shadcn-parity-and-docs/pagination-example-inventory.md',
  ]) {
    if (!evidence.includes(required)) process.exit(1)
  }
  NODE
  ```
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `pagination` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for pagination`.
- Fixture tests assert:
  - `pagination/demo` renders Pagination root, content, six item wrappers,
    previous, three page links, ellipsis, and next hooks;
  - the visible text sequence is exactly `Previous`, `1`, `2`, `3`, ellipsis,
    `Next` for the named demo;
  - previous, page, and next controls render as links with expected `href`
    behavior. The preferred upstream parity value is `#`; if RadCN uses
    route-local fixture hrefs instead, the inventory must record that as an
    intentional app-owned routing divergence while preserving link semantics;
  - active page `2` has `aria-current="page"`;
  - previous and next links expose `Go to previous page` and
    `Go to next page`;
  - ellipsis exposes screen-reader text `More pages` and a visible/icon
    affordance hook;
  - existing active-page-`3` and custom-label scenarios still pass;
  - no test depends on React, lucide, Tailwind, `buttonVariants`, `cn`, or
    literal DOM equivalence with upstream.
- Docs coverage asserts the Pagination page renders stable evidence for the
  named docs example, exact sequence, active state, source snippet, and
  required dependency-divergence/mapping copy.
- A deterministic README check proves the Experiment 103 learning, Pagination
  inventory reference, and next generated recommendation were recorded:

  ```text
  rg -n "Experiment 103|pagination-example-inventory|next generated recommendation|Pagination" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

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

- Manifest and lockfile checks prove no forbidden dependencies or lockfile
  churn were introduced:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  for (const file of ['radcn/packages/radcn/package.json', 'radcn/apps/docs/package.json', 'radcn/fixtures/candidate-remix/package.json']) {
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'))
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
    for (const name of ['react', 'react-dom', 'lucide-react', 'tailwindcss', 'class-variance-authority']) {
      if (deps[name]) {
        console.log(`${file}: forbidden dependency ${name}`)
        process.exit(1)
      }
    }
  }
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  ```

- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The named demo omits any exact upstream user-facing text, active state, or
  accessible label listed above.
- The implementation marks `pagination-demo` covered without docs, fixture,
  and Playwright evidence for the exact upstream sequence.
- The implementation adds React, lucide-react, Tailwind,
  class-variance-authority, or vendor dependencies.
- The implementation treats literal DOM equivalence as required instead of
  user-facing behavior, accessibility, and author-facing modifiability.
- The experiment modifies unrelated components or resolved clusters.

## Design Review

Reviewer: Mendel the 3rd (`019e9e53-8ec7-7f92-baee-f0980c8cea07`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The fixture test criteria did not explicitly require upstream
  `href="#"` link behavior from the audit inventory. Fixed by adding link href
  behavior to the fixture coverage changes and pass criteria, with `#` as the
  preferred upstream parity value or an explicitly recorded app-owned routing
  divergence if route-local hrefs are used.
- Minor: The `resolved-clusters.json` check was described as deterministic but
  did not include the command body. Fixed by adding a reproducible Node check
  for slug, status, and required evidence paths.

Approved. The reviewer confirmed the design follows Experiment 102's
conclusion and the pagination inventory follow-up, the Issue 4 README links
Experiment 103 as `Designed`, required sections are present, scope is narrow,
repo/vendor hygiene checks are included, and implementation has not started
before the plan commit.

Re-review approved. The reviewer confirmed both prior minor findings are fixed:
href behavior is now covered in fixture changes and pass criteria, and the
`resolved-clusters.json` check now includes a concrete Node command validating
slug, status, and evidence paths. No new blockers were introduced.

## Result

**Result:** Pass

Experiment 103 implemented named `pagination-demo` parity for the direct
upstream Pagination example. The docs site now has a rich Pagination page with
`data-radcn-docs-pagination-family="pagination-demo"`, exact source snippet,
upstream `href="#"` values, exact `Previous`, `1`, active `2`, `3`, ellipsis,
and `Next` sequence, and mapping copy for React props, lucide icons,
`buttonVariants`, Button size typing, `className`, Tailwind utilities, `cn`,
`data-slot`, custom tokens, and vendor source.

The candidate fixture now includes a named `pagination/demo` route that renders
the same upstream sequence with hash hrefs. Existing `active` and
`custom-labels` scenarios remain in place for active-page-`3` and label
modifiability evidence. Package code did not need to change.

Verification passed:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts navigation-collection.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node deterministic pagination inventory status check
node deterministic resolved-clusters pagination evidence check
node deterministic parity-inventory recommendation check
node deterministic forbidden import check
node deterministic forbidden dependency check
git diff --exit-code -- pnpm-lock.yaml
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The regenerated parity inventory removes `pagination` from unresolved example
clusters. The next generated recommendation is example parity for `popover`.

## Conclusion

The direct Pagination example cluster is resolved. Later Pagination work should
reuse the recorded mapping: upstream `buttonVariants`, Button size typing,
lucide icons, Tailwind utilities, `cn`, `className`, and `data-slot` map to
RadCN package classes, explicit props, public `data-radcn-pagination*` hooks,
CSS variables, and app-owned icon presentation. The next Issue 4 experiment
should audit the direct Popover example cluster.

## Completion Review

**Reviewer:** Singer the 3rd (`019e9e5a-831c-71c2-b133-2b8fde4edead`)
**Fresh-context status:** fresh Codex subagent
**Result:** Approved

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

The reviewer confirmed the implementation matches the approved scope, the
experiment has Result and Conclusion, the Issue 4 README marks Experiment 103
as `Pass`, learnings record the Pagination outcome and next recommendation,
`pagination-example-inventory.md` marks `pagination-demo` as `Covered` with
docs/fixture/Playwright evidence, `resolved-clusters.json` and
`parity-inventory.md` are consistent, and the result commit had not been made
before review.

The reviewer reran the recorded verification commands successfully:
typechecks, docs Playwright, fixture Playwright, deterministic inventory
checks, forbidden import/dependency checks, `git diff --check`, lockfile check,
vendor cleanliness, and nested `.git` check.
