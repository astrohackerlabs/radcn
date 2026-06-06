# Experiment 86: Implement avatar example parity depth

## Description

Experiment 85 audited the single direct upstream Avatar example,
`avatar-demo`, and found the cluster is partial. RadCN already ships a
dependency-free `radcn/avatar` package with Avatar, AvatarImage,
AvatarFallback, AvatarBadge, AvatarGroup, and AvatarGroupCount exports, and
existing fixtures prove general image, fallback, badge, group, size, and custom
token behavior. The missing evidence is named `avatar-demo` parity in docs,
candidate fixtures, and Playwright coverage.

This experiment should resolve the direct Avatar example cluster by adding
named docs, candidate fixture, and test coverage for the exact upstream
composition:

- the flex row, wrapping, centered, `gap-12` wrapper;
- a default circular Avatar using `https://github.com/shadcn.png`, alt
  `@shadcn`, and fallback `CN`;
- a rounded-square Avatar using `https://github.com/evilrabbit.png`, alt
  `@evilrabbit`, and fallback `ER`;
- a stacked negative-space Avatar group with avatars for `@shadcn`/`CN`,
  `@maxleiter`/`LR`, and `@evilrabbit`/`ER`;
- ring styling evidence and grayscale image treatment for the stacked group;
- public RadCN hooks for Avatar, AvatarImage, AvatarFallback, and AvatarGroup;
- mapping copy for upstream React, Radix Avatar, `data-slot`, `data-size`,
  `className`, `cn`, Tailwind utilities, remote GitHub images, custom tokens,
  and vendor source.

The implementation should keep Avatar dependency-free over native `img` and
span/div parts. Remote GitHub image loading remains app-owned content, so tests
should verify attributes and CSS behavior rather than depend on remote image
decoding. The existing package API should be sufficient; package code should
change only if implementation proves a real user-facing parity or
author-facing modifiability gap.

Do not add React, Radix, Tailwind, lucide-react, class-variance-authority,
`cn`, image optimization libraries, or vendor dependencies. Do not modify
vendor source.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Avatar from generic seed docs to a rich docs page if needed.
  - Render a stable docs hook
    `data-radcn-docs-avatar-family="avatar-demo"`.
  - Demonstrate `avatar-demo` with:
    - exact remote GitHub image URLs from upstream;
    - exact alt texts `@shadcn`, `@evilrabbit`, and `@maxleiter`;
    - exact fallback texts `CN`, `ER`, and `LR`;
    - a default circular Avatar;
    - a rounded-square Avatar with explicit `rounded-lg` class/style evidence;
    - a stacked AvatarGroup with three avatars, negative spacing, ring
      evidence, and grayscale image treatment;
    - public `data-radcn-avatar`, `data-radcn-avatar-image`,
      `data-radcn-avatar-fallback`, and `data-radcn-avatar-group` hook
      evidence.
  - Include mapping copy for the upstream React client marker, Radix Avatar
    primitive, `data-slot`, `data-size`, `className`, `cn`, Tailwind
    flex/shape/ring/group/grayscale utilities, remote image handling, package
    CSS, public hooks, custom tokens, fallback accessibility, and vendor
    source.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/avatar.tsx`
  Add a named `avatar/demo` fixture route, preserving existing fallback,
  badge, group, custom-token, and default routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/avatar-scroll-area.spec.ts`.
  - Verify `avatar/demo` exposes exact image URLs, alt texts, fallback texts,
    default circular shape, rounded-square shape, stacked group count,
    negative spacing, ring styling evidence, grayscale image treatment, and
    public Avatar/Image/Fallback/Group hooks.
  - Keep existing Avatar and Scroll Area tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/avatar` page renders the named family hook,
    exact image URLs, exact alt/fallback text evidence, rounded-square
    evidence, stacked group evidence, ring/grayscale evidence, public hooks,
    and dependency-divergence/mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/avatar-example-inventory.md`.
  - Change `avatar-demo` from `Partial` to `Covered` only after docs, fixture,
    and Playwright evidence exists.
  - Record the final fallback accessibility choice for image-backed avatars.
  - Record the final strategy for rounded-square styling, negative spacing,
    ring styling, grayscale treatment, and remote GitHub image testing.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `avatar` as a resolved example cluster only after the example row is
    `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md`.
  - Record the final Avatar example outcome in `## Learnings`.
  - Update the Experiment 86 index status from `Designed` to the recorded
    result.
  - Record the next generated recommendation after Avatar is resolved.

Do not change `radcn/packages/radcn` unless implementation proves the current
Avatar primitives cannot meet the upstream example's user-facing behavior,
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

- Fixture Avatar coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts avatar-scroll-area.spec.ts
  ```

- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- A deterministic Node check proves `avatar-example-inventory.md` has exactly
  one direct upstream row, `avatar-demo`, and the row is `Covered` or an
  explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/avatar-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'avatar-demo')
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
  `examples` entry with `slug = "avatar"`, `status = "resolved"`, and
  evidence for Experiment 85, Experiment 86, and
  `avatar-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `avatar` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for avatar`.
- A deterministic README check proves Issue 4 records the final Experiment 86
  outcome, Avatar inventory evidence, resolved Avatar status, and the next
  generated recommendation:

  ```text
  rg -n "Experiment 86|avatar-example-inventory|Avatar example parity|resolved.*avatar|next generated recommendation" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- Fixture tests assert:
  - `avatar/demo` renders the exact five image elements from the upstream
    named example;
  - the `src` attributes are the exact GitHub URLs;
  - the `alt` attributes are `@shadcn`, `@evilrabbit`, and `@maxleiter` in
    the expected positions;
  - fallback text `CN`, `ER`, and `LR` is present and deliberately
    accessibility-scoped for image-backed avatars;
  - the default Avatar remains circular;
  - the second Avatar is rounded-square with visible class/style evidence;
  - the stacked group has three avatars, negative spacing, ring evidence, and
    grayscale image treatment;
  - public Avatar/Image/Fallback/Group hooks are present.
- Docs coverage asserts the Avatar page renders stable evidence for the named
  docs example and source/API text mentions the required mapping copy.
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
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
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
    'radix-ui',
    '@radix-ui/react-avatar',
    'lucide-react',
    'tailwindcss',
    'class-variance-authority',
  ]
  let failed = false
  for (const manifest of manifests) {
    const json = JSON.parse(fs.readFileSync(manifest, 'utf8'))
    for (const section of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[section] ?? {})) {
        if (forbidden.includes(name)) {
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

- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The implementation depends on remote image decoding instead of verifying
  stable attributes and CSS.
- The named demo omits any upstream image URL, alt text, or fallback text.
- The rounded-square Avatar is not visibly modifiable through class/style
  evidence.
- The stacked group lacks negative spacing, ring evidence, or grayscale image
  treatment.
- AvatarBadge or AvatarGroupCount is incorrectly treated as required by the
  direct `avatar-demo` example.
- The implementation adds React, Radix, Tailwind, lucide-react,
  class-variance-authority, `cn`, or vendor dependencies.
- Vendor source is modified or imported.

## Design Review

Reviewer: Tesla the 2nd (`019e9d7d-8930-7ea0-8113-c015309caaac`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: the first review found that the Changes section required updating
  Issue 4 learnings, experiment status, and the next recommendation, but the
  Verification section did not include a concrete README check for that
  deliverable. Fixed by adding a deterministic README `rg` check for
  Experiment 86, `avatar-example-inventory.md`, Avatar status, and the next
  generated recommendation.
- Minor: none.

Re-review: the reviewer confirmed the Major finding is resolved because the
Verification section now has a deterministic README check for the final
Experiment 86 outcome, Avatar inventory evidence, resolved Avatar status, and
next generated recommendation. No new blocker was introduced.

Approval: approved.

## Result

**Result:** Pass

Resolved direct Avatar example parity for `avatar-demo`.

Docs now render a rich `/docs/components/avatar` page with stable
`data-radcn-docs-avatar-family="avatar-demo"` evidence, exact upstream GitHub
image URLs, alt texts `@shadcn`, `@evilrabbit`, and `@maxleiter`, fallback
texts `CN`, `ER`, and `LR`, default circular Avatar shape, rounded-square
class/style customization, a stacked AvatarGroup, negative spacing, ring
box-shadow evidence, grayscale image treatment, public
Avatar/Image/Fallback/Group hooks, and mapping copy for React, Radix Avatar,
`data-slot`, `data-size`, `className`, `cn`, Tailwind utilities, remote image
handling, custom tokens, and vendor source.

The candidate Remix fixture now exposes `avatar/demo` with the same named
composition. Tests verify stable attributes and computed CSS, not remote image
decoding.

Implementation discovered one package-level styling gap: AvatarGroup overlap
rules used the child combinator, but injected `radcnStyles` escapes `>` to
`&gt;`, causing the browser to drop the rule. The package token stylesheet and
generated `radcnStyles` export now use descendant/public-hook selectors, and a
plain `avatar/group` fixture test verifies package-provided first-avatar reset,
negative spacing, and ring box-shadow behavior without inline overlap styles.
The named demo also uses explicit Avatar root styles for deterministic
negative-spacing and ring evidence.

`avatar-example-inventory.md` now marks `avatar-demo` as `Covered`,
`resolved-clusters.json` marks `avatar` resolved, and the regenerated parity
inventory recommends auditing `collapsible` examples next.

Verification commands run:

```text
pnpm radcn:typecheck
```

Passed.

```text
pnpm --dir radcn/apps/docs typecheck
```

Passed.

```text
pnpm fixtures:candidate:typecheck
```

Passed.

```text
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts avatar-scroll-area.spec.ts
```

Initially failed because the AvatarGroup overlap CSS did not produce computed
negative spacing in the named demo. A completion-review follow-up added a
plain AvatarGroup package-CSS assertion, exposed the escaped child-combinator
root cause, and verified the descendant-selector fix. The final run passed
with 7 tests.

```text
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
```

Passed with 5 tests.

```text
node scripts/audit-shadcn-parity.mjs
```

Passed and regenerated `parity-inventory.md`; the first recommended cluster is
now `Example parity for collapsible`.

Deterministic checks passed for:

- `avatar-example-inventory.md` has exactly one direct row, `avatar-demo`, and
  it is `Covered`;
- `resolved-clusters.json` includes `avatar` with `status = "resolved"` and
  Experiment 85, Experiment 86, and inventory evidence;
- `avatar` is absent from direct unresolved example clusters and the first
  recommendation no longer says `Example parity for avatar`;
- forbidden import scan across package, docs, and candidate fixture source;
- forbidden manifest dependency scan;
- `radcn/packages/radcn/src/styles/index.ts` exactly serializes
  `tokens.css`;
- `git diff --exit-code -- pnpm-lock.yaml`;
- `git diff --check`;
- clean vendor checkout status for `vendor/shadcn-ui`, `vendor/remix`, and
  `vendor/react-router`.

The required README check passed:

```text
rg -n "Experiment 86|avatar-example-inventory|Avatar example parity|resolved.*avatar|next generated recommendation" issues/0004-complete-shadcn-parity-and-docs/README.md
```

## Conclusion

Avatar direct example parity is complete. The next experiment should audit the
`collapsible` example cluster recommended by the regenerated parity inventory.

## Completion Review

Reviewer: McClintock the 2nd (`019e9d88-c4d2-72e1-9d0f-596341957807`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: the first review found the package-level AvatarGroup CSS change was
  not behaviorally verified because the named demo used explicit inline
  overlap/ring styles. Fixed by extending the plain `avatar/group` fixture
  test to assert package-provided first-avatar reset, negative spacing, and
  ring box-shadow behavior without inline overlap styles. That test exposed
  the root cause: child-combinator selectors were escaped from `>` to `&gt;`
  in injected `radcnStyles`. Fixed package CSS by replacing child-combinator
  AvatarGroup rules with descendant/public-hook selectors and regenerating
  `radcn/packages/radcn/src/styles/index.ts`.
- Minor: none.

Re-review: the reviewer confirmed the Major finding is resolved. The plain
`avatar/group` fixture test now verifies package CSS on the non-demo path:
first Avatar `margin-left: 0px`, second Avatar `margin-left: -8px`, and
second Avatar `box-shadow` not `none`. The package CSS uses
descendant/public-hook selectors with a first-child reset, and
`styles/index.ts` is synchronized with `tokens.css`. No new blocker was
introduced.

Approval: approved.
