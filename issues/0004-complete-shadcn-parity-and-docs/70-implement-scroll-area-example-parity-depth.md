# Experiment 70: Implement scroll-area example parity depth

## Description

Experiment 69 audited the two active upstream Scroll Area examples and found
the cluster is partial because RadCN has generic Scroll Area package/fixture
proof but no named evidence for:

- `scroll-area-demo`
- `scroll-area-horizontal-demo`

This experiment should resolve the Scroll Area example cluster by adding named
docs, candidate fixture routes, and Playwright coverage for both examples. The
audit did not identify a required package API change: RadCN already owns native
scroll-container behavior, while repeated tag content, Separator composition,
artwork/image markup, figure/figcaption semantics, horizontal strip layout,
React fragments, Next Image, remote image loading, and Tailwind utility
classes remain separate package/app surfaces.

RadCN should not add React, Radix ScrollArea primitives, `next/image`,
Tailwind, `cn`, image optimization, remote-image loading, vendor dependencies,
or package-owned image assets for Scroll Area parity. DOM equivalence is not
required; the examples need equivalent user-facing behavior, accessibility,
visual modifiability, and author-facing customization.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Scroll Area from the generic registry preview to an authored rich
    docs page if needed by the existing docs architecture.
  - Render stable docs hooks for both upstream Scroll Area example ids using
    `data-radcn-docs-scroll-area-family`.
  - Demonstrate `scroll-area-demo` with:
    - Scroll Area dimensions equivalent to `h-72 w-48`;
    - rounded bordered surface;
    - viewport content padding equivalent to `p-4`;
    - heading `Tags`;
    - exactly 50 tag rows from `v1.2.0-beta.50` down to
      `v1.2.0-beta.1`;
    - Separator composition between rows using `radcn/separator`;
    - vertical scrollbar/thumb evidence;
    - vertical native scroll evidence through docs hooks and Playwright.
  - Demonstrate `scroll-area-horizontal-demo` with:
    - Scroll Area width equivalent to `w-96`;
    - rounded bordered `whitespace-nowrap`-style surface;
    - horizontal `w-max` strip layout with spacing and padding;
    - three figure items for Ornella Binni, Tom Byrom, and Vladimir
      Malyavko;
    - image semantics with accessible `alt="Photo by {artist}"`, `width=300`,
      `height=400`, and 3:4 aspect evidence;
    - figcaption text `Photo by {artist}` with emphasized artist text;
    - explicit horizontal `ScrollBar orientation="horizontal"` and thumb;
    - horizontal native scroll evidence through docs hooks and Playwright.
  - Use deterministic artwork placeholders or inline/local assets that do not
    require network image loading, while documenting the mapping from upstream
    remote Unsplash `next/image` usage.
  - Include mapping copy for React props, Radix `ScrollAreaPrimitive`,
    `className`, `data-slot`, Tailwind utilities, `cn`, default vertical
    scrollbar behavior, explicit horizontal `ScrollBar`, Separator
    composition, repeated tag generation, React fragments/keys, `next/image`,
    remote image URLs, image optimization, image dimensions, figure/figcaption
    markup, horizontal strip layout, and vendor source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/scroll-area.tsx`
  Add named Scroll Area fixture routes for `demo` and `horizontal-demo`,
  preserving existing generic Scroll Area routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/avatar-scroll-area.spec.ts`.
  - Verify `scroll-area/demo` exposes public Scroll Area hooks, exact heading,
    50 tag rows, first/last tag text, Separator composition, vertical
    scrollbar/thumb, focusability, native vertical scrolling, and sizing/layout
    evidence.
  - Verify `scroll-area/horizontal-demo` exposes public Scroll Area hooks,
    three figure items, artist names, image alt text, width/height/aspect
    evidence, figcaption text, horizontal strip layout evidence, explicit
    horizontal scrollbar/thumb/corner evidence, focusability, and native
    horizontal scrolling.
  - Keep existing generic Scroll Area behavior tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for `scroll-area-demo` and
    `scroll-area-horizontal-demo`.
  - Assert rendered Scroll Area, viewport, scrollbar, thumb, Separator, tag,
    figure, image, figcaption, and layout evidence.
  - Assert the required mapping copy without requiring DOM equivalence with
    shadcn/ui.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/scroll-area-example-inventory.md`.
  - Change `scroll-area-demo` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Change `scroll-area-horizontal-demo` to `Covered` only after docs, fixture,
    and Playwright evidence exists.
  - Record final decisions for Separator composition, repeated tag generation,
    deterministic artwork placeholders or assets, image alt/dimension/aspect
    evidence, figure/figcaption semantics, horizontal strip layout, public
    hooks, custom layout evidence, and upstream non-dependencies.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `scroll-area` as a resolved example cluster only after both example
    rows are `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Scroll Area example
  outcome and the next generated recommendation.
- Do not change `radcn/packages/radcn` unless implementation discovers a real
  package-level gap that is necessary for the two named examples. If such a
  gap appears, record it in the result before changing package code.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Scroll Area coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts avatar-scroll-area.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves both upstream Scroll Area example ids
  appear exactly once in `scroll-area-example-inventory.md`, and both are
  `Covered` or an explicitly recorded intentional divergence:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/scroll-area-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const expected = ['scroll-area-demo', 'scroll-area-horizontal-demo']
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
  `examples` entry with `slug = "scroll-area"`, `status = "resolved"`, and
  evidence for Experiment 69, Experiment 70, and
  `scroll-area-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `scroll-area` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for scroll-area`.
- Fixture tests assert:
  - named Scroll Area routes expose public RadCN hooks;
  - `scroll-area/demo` proves exact heading, 50 tag rows, first/last tag text,
    Separator composition, vertical scrollbar/thumb, sizing/layout evidence,
    focus behavior, and native vertical scrolling;
  - `scroll-area/horizontal-demo` proves the three artwork figures, artist
    names, accessible image names, width/height/aspect evidence,
    figcaption text, horizontal strip layout, explicit horizontal
    scrollbar/thumb/corner evidence, focus behavior, native horizontal
    scrolling, and that any rendered artwork `img[src]` values in the named
    route are non-network sources: local paths, `data:` URLs, or absent because
    CSS/non-loading placeholders are intentionally used;
  - existing generic Scroll Area behavior tests still pass.
- Docs coverage asserts the Scroll Area page renders stable evidence for both
  named docs examples and source/API text mentions the required mapping copy.
- Docs coverage asserts every artwork image inside
  `[data-radcn-docs-scroll-area-family="scroll-area-horizontal-demo"]` uses a
  non-network `src` value: local path, `data:` URL, or no `img` at all because
  CSS/non-loading placeholders are intentionally used.
- Both docs and fixture coverage must fail if the named horizontal Scroll Area
  examples render artwork images whose `src` starts with `http:`, `https:`, or
  contains `images.unsplash.com`.
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
      name === 'radix-ui' ||
      name === 'next/image' ||
      name === 'tailwindcss' ||
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
  current RadCN manifests, and a diff check proves this experiment did not add
  forbidden lockfile dependency markers:
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
    'radix-ui',
    'next',
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
      for (const dep of forbidden) {
        if (Object.prototype.hasOwnProperty.call(deps, dep)) {
          console.log(`${file}: forbidden ${field} dependency ${dep}`)
          failed = true
        }
      }
      for (const dep of Object.keys(deps)) {
        if (dep.includes('vendor') || String(deps[dep]).includes('vendor')) {
          console.log(`${file}: forbidden vendor dependency ${dep}`)
          failed = true
        }
      }
    }
  }
  if (failed) process.exit(1)
  NODE
  git diff -- package.json radcn/package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json pnpm-lock.yaml | node -e '
  const fs = require("fs")
  const diff = fs.readFileSync(0, "utf8")
  const forbidden = [
    "react",
    "react-dom",
    "radix-ui",
    "next",
    "tailwindcss",
    "@tailwindcss/vite",
    "@tailwindcss/postcss",
    "class-variance-authority",
  ]
  let failed = false
  for (const line of diff.split("\n")) {
    if (!line.startsWith("+") || line.startsWith("+++")) continue
    for (const dep of forbidden) {
      if (line.includes(`"${dep}"`) || line.includes(`/${dep}@`) || line.includes(`${dep}:`)) {
        console.log(`forbidden dependency added in diff: ${line}`)
        failed = true
      }
    }
    if (line.includes("vendor")) {
      console.log(`forbidden vendor dependency added in diff: ${line}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  '
  ```
- `git diff --check`
- `git status --short` shows only expected implementation and issue
  documentation changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Either active upstream Scroll Area example remains `Partial` or `Missing`
  without a recorded intentional divergence.
- The implementation treats React, Radix ScrollArea primitives, `next/image`,
  image optimization, remote image loading, Tailwind, `cn`, upstream
  `data-slot`, or vendor source as mandatory RadCN Scroll Area dependencies.
- The docs or fixtures prove generic Scroll Area behavior but omit the named
  `scroll-area-demo` or `scroll-area-horizontal-demo` compositions.
- The implementation changes `radcn/scroll-area` package APIs without a
  recorded package-level need found during implementation.
- The implementation conflates Scroll Area-owned root/viewport/scrollbar
  behavior with app-owned Separator, repeated content, image,
  figure/figcaption, remote asset, or custom layout decisions.

## Design Review

Reviewer: Linnaeus the 2nd (`019e9cc6-925c-78a1-b3c9-30b58e8159a0`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: the design required deterministic artwork placeholders or local assets
  but did not include a concrete pass/fail check that rejects remote image URLs
  or Next Image usage. Fixed by adding scoped Playwright pass criteria for the
  named docs and fixture horizontal Scroll Area examples: any rendered artwork
  `img[src]` values must be local paths, `data:` URLs, or absent because
  CSS/non-loading placeholders are intentionally used, and the tests must fail
  for `http:`, `https:`, or `images.unsplash.com`.
- Minor: the experiment did not yet contain a recorded `## Design Review`
  section. This was expected before recording the review and is now addressed.

Re-review:

- The reviewer confirmed the original major finding is resolved.
- The reviewer confirmed the broad source-scan blocker introduced by the first
  fix is resolved.
- No new blocker was introduced.

Approval: approved. The reviewer confirmed the plan is coherent for one
implementation-depth experiment, the Issue 4 README links it with status
`Designed`, the plan has Description, Changes, and Verification sections,
implementation has not started before the plan commit, vendor checkouts are
clean, and scoped non-network artwork assertions are now required.
