# Experiment 76: Implement skeleton example parity depth

## Description

Experiment 75 audited the two active upstream Skeleton examples and found the
cluster is partial because RadCN has generic Skeleton package, docs, fixture,
and Playwright evidence but no named proof for:

- `skeleton-card`
- `skeleton-demo`

This experiment should resolve the Skeleton example cluster by adding named
docs, candidate fixture routes, and Playwright coverage for both examples. The
audit did not identify a required package API change: RadCN already owns the
reusable Skeleton placeholder primitive, while fixed dimensions, rounded
avatar/card shapes, flex/spacing wrappers, React props, `className`,
`data-slot`, Tailwind utilities, `cn`, and vendor source are app/docs
composition or mapping details.

RadCN should not add React, Tailwind, `cn`, layout dependencies, shape-specific
Skeleton APIs, card/avatar/text-line APIs, or vendor dependencies for Skeleton
parity. DOM equivalence is not required; the examples need equivalent
user-facing loading placeholders, visual modifiability, public hooks, and
author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Skeleton from the generic registry preview to an authored rich docs
    page if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Skeleton example ids using
    `data-radcn-docs-skeleton-family`.
  - Demonstrate `skeleton-card` with:
    - a vertical layout equivalent to upstream `flex flex-col space-y-3`;
    - a media placeholder sized `250px` by `125px` with rounded-xl-equivalent
      radius;
    - two text-line placeholders sized `250px` by `1rem` and `200px` by
      `1rem`;
    - public `data-radcn-skeleton` hooks, `aria-hidden`, pulse animation
      evidence, and shape/size evidence.
  - Demonstrate `skeleton-demo` with:
    - a horizontal avatar/list layout equivalent to upstream
      `flex items-center space-x-4`;
    - an avatar placeholder sized `48px` by `48px` with rounded-full shape;
    - two text-line placeholders sized `250px` by `1rem` and `200px` by
      `1rem`;
    - public hooks, `aria-hidden`, pulse animation evidence, and shape/size
      evidence.
  - Include mapping copy for React props, `className`, `data-slot`, Tailwind
    utilities, `cn`, fixed dimensions, rounded-full avatar shape, rounded-xl
    card media shape, flex/space wrappers, custom classes/styles/tokens, and
    vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  Add named Skeleton fixture routes for `card` and `demo`, preserving the
  existing generic `default` route.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/static-display.spec.ts`.
  - Verify `skeleton/card` exposes three public Skeleton hooks, `aria-hidden`,
    pulse animation, `250px` by `125px` media placeholder, rounded-xl shape,
    and two exact text-line dimensions.
  - Verify `skeleton/demo` exposes three public Skeleton hooks, `aria-hidden`,
    pulse animation, `48px` rounded-full avatar placeholder, and two exact
    text-line dimensions.
  - Keep existing generic Skeleton behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `skeleton-card` and `skeleton-demo`.
  - Assert rendered Skeleton public hooks, `aria-hidden`, pulse animation,
    exact dimensions, rounded-full/rounded-xl evidence, and mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/skeleton-example-inventory.md`.
  - Change `skeleton-card` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Change `skeleton-demo` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Record final decisions for fixed dimensions, layout wrappers, rounded
    shapes, public hooks, custom style/class evidence, and upstream
    non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `skeleton` as a resolved example cluster only after both example rows
    are `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Skeleton example outcome
  and the next generated recommendation.
- Do not change `radcn/packages/radcn` unless implementation discovers a real
  package-level gap that is necessary for the two named examples. If such a gap
  appears, record it in the result before changing package code.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture static display coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Skeleton example ids appear
  exactly once in `skeleton-example-inventory.md`, and both are `Covered` or an
  explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/skeleton-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['skeleton-card', 'skeleton-demo']
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== expected.length
  for (const id of expected) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      (!row[0][0].includes('| Covered |') &&
        !row[0][0].includes('| Intentional divergence |'))
    ) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!expected.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "skeleton"`, `status = "resolved"`, and
  evidence for Experiment 75, Experiment 76, and
  `skeleton-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `skeleton` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for skeleton`.
- Fixture tests assert:
  - named Skeleton routes expose public RadCN hooks;
  - `skeleton/card` proves all three placeholder blocks, exact dimensions,
    rounded-xl media shape, `aria-hidden`, and pulse animation;
  - `skeleton/demo` proves the rounded-full avatar block, two text lines, exact
    dimensions, `aria-hidden`, and pulse animation;
  - existing generic Skeleton behavior tests still pass.
- Docs coverage asserts the Skeleton page renders stable evidence for both
  named docs examples and source/API text mentions the required mapping copy.
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
    for (const match of text.matchAll(/^\s*import(?:\s+type)?[\s\S]*?\sfrom\s+['"]([^'"]+)['"]/gm)) {
      if (forbiddenImport(match[1])) {
        console.log(`${file}: forbidden import ${match[1]}`)
        failed = true
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic manifest check proves no forbidden dependencies exist in the
  current RadCN manifests, and the lockfile remains unchanged because this
  experiment should not add dependencies:
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
    'tailwindcss',
    '@tailwindcss/vite',
    '@tailwindcss/postcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      const deps = json[field] || {}
      for (const name of Object.keys(deps)) {
        if (
          forbidden.includes(name) ||
          forbidden.some((prefix) => prefix.endsWith('/') && name.startsWith(prefix))
        ) {
          console.log(`${file}: ${field}.${name}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  git diff --exit-code -- pnpm-lock.yaml
  ```
- `git diff --check`
- `git status --short` shows only expected experiment result changes before
  the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either upstream Skeleton example remains `Partial` or `Missing` without a
  recorded intentional divergence.
- Docs, fixtures, or tests omit the named card or avatar/list compositions.
- The implementation adds React, Tailwind, `cn`, `class-variance-authority`,
  layout dependencies, shape-specific Skeleton APIs, card/avatar/text-line
  APIs, or vendor source as package/app dependencies.
- The implementation marks `skeleton` resolved without docs, fixture, and
  Playwright evidence for both named examples.
- The experiment changes unrelated component clusters or skips the regenerated
  parity inventory.

## Design Review

Reviewer: Halley the 2nd (`019e9d16-1a81-7f02-9368-067e61b4abcb`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 76 as `Designed`, Experiment 75's result commit exists, the scope is
narrow and follows the Skeleton audit, verification has concrete pass/fail and
hygiene checks, `git diff --check` passed, vendor checkouts are clean, no
implementation files were changed before the plan commit, and no blockers
remain.

## Result

**Result:** Pass

Implemented named Skeleton example parity for `skeleton-card` and
`skeleton-demo`.

The docs page now renders rich Skeleton examples with stable
`data-radcn-docs-skeleton-family` hooks, exact upstream card media, avatar, and
text-line dimensions, rounded-xl-equivalent media shape, rounded-full avatar
shape, public `data-radcn-skeleton` hooks, `aria-hidden`, pulse animation
evidence, source snippets, and mapping copy for React props, `className`,
`data-slot`, Tailwind utilities, `cn`, fixed dimensions, layout wrappers,
custom styles/classes/tokens, and vendor source.

Candidate fixtures now expose `/fixtures/skeleton/card` and
`/fixtures/skeleton/demo` while preserving `/fixtures/skeleton/default`.
Fixture Playwright coverage proves exact dimensions, shapes, `aria-hidden`,
`radcn-pulse`, and public hooks for the named examples while preserving the
generic Skeleton behavior test.

No `radcn/skeleton` package API change was needed. The package already owns the
reusable placeholder behavior; card media, avatar circles, text lines, flex
wrappers, and fixed dimensions remain app/docs composition.

`skeleton-example-inventory.md` now marks both upstream Skeleton rows
`Covered`, `resolved-clusters.json` records `skeleton` as resolved, and
`parity-inventory.md` now recommends example parity for `sonner` next.

Verification:

- `pnpm radcn:typecheck` — pass.
- `pnpm --dir radcn/apps/docs typecheck` — pass.
- `pnpm fixtures:candidate:typecheck` — pass.
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts static-display.spec.ts`
  — pass, 11 passed.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
  — pass, 5 passed.
- `node scripts/audit-shadcn-parity.mjs` — pass; regenerated
  `parity-inventory.md`.
- Skeleton inventory deterministic check — pass; `skeleton-card` and
  `skeleton-demo` each appear once and are `Covered`.
- Resolved-cluster deterministic check — pass; `skeleton` has status
  `resolved` and evidence for Experiment 75, Experiment 76, and
  `skeleton-example-inventory.md`.
- Parity recommendation check — pass; `skeleton` is absent from unresolved
  example clusters and the first recommended cluster is `sonner`.
- Forbidden import check — pass; checked 135 TypeScript/JavaScript files under
  package, docs, and candidate fixture roots.
- Manifest dependency check — pass; checked 4 manifests and found no forbidden
  React, Tailwind, class-variance-authority, or vendor dependencies.
- `git diff --exit-code -- pnpm-lock.yaml` — pass; lockfile unchanged.
- `git diff --check` — pass.
- Vendor cleanliness loop for `vendor/shadcn-ui`, `vendor/remix`, and
  `vendor/react-router` — pass; no output.

Known warnings: Playwright web servers still print the existing Node
`module.register()` deprecation warning and the existing `NO_COLOR` /
`FORCE_COLOR` warning. These warnings were present before this experiment and
did not affect the pass/fail result.

## Conclusion

Skeleton example parity is resolved. The reusable package surface did not need
to grow; exact loading shapes and dimensions are example-owned composition
using the existing `Skeleton` primitive. The next Issue 4 experiment should
audit upstream `sonner` examples, which is the regenerated parity inventory's
first recommendation.

## Completion Review

Reviewer: Ptolemy the 2nd (`019e9d1c-e8cf-72a1-8ee2-1b55d3151d20`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the implementation matches
Experiment 76 scope, docs and fixtures provide named Skeleton evidence,
Playwright assertions cover both upstream examples, inventory and
resolved-cluster evidence are present, no package API or dependency changes
were added, verification passed, `git diff --check` passed, vendor checkouts
are clean, no ignored vendor source is staged or committed, and the result
commit had not been made before review.
