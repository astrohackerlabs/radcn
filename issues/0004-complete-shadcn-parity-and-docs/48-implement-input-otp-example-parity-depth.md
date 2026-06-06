# Experiment 48: Implement input-otp example parity depth

## Description

Experiment 47 audited the four upstream shadcn/ui New York v4 Input OTP
examples and found the cluster is still partial. RadCN has strong Input OTP
primitive mechanics already, but lacks named docs/fixture/Playwright evidence
for:

- `input-otp-controlled`
- `input-otp-demo`
- `input-otp-pattern`
- `input-otp-separator`

This experiment implements that missing proof while preserving Input OTP as a
web-first native-input-plus-slots primitive. It should compose existing RadCN
Input OTP parts and app-owned display behavior rather than introducing React,
the upstream `input-otp` package, `lucide-react`, Tailwind, vendor imports, or
new Input OTP package APIs unless a direct blocker is discovered and recorded.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Input OTP from a generated draft page to an authored rich docs
    page.
  - Render stable docs hooks for all four upstream Input OTP example ids using
    `data-radcn-docs-input-otp-family`.
  - Demonstrate `input-otp-demo`: `maxLength={6}`, two groups of three slots,
    one separator, and a six-character value.
  - Demonstrate `input-otp-pattern`: one six-slot group using RadCN's
    `REGEXP_ONLY_DIGITS_AND_CHARS` export and mapping copy for the upstream
    `input-otp` package constant.
  - Demonstrate `input-otp-separator`: three groups of two slots with two
    separators.
  - Demonstrate `input-otp-controlled`: six slots and visible entered-value
    feedback as app-owned display state.
  - Explain mappings from shadcn React `useState`, `value`, `onChange`,
    upstream `input-otp`, `OTPInput` context, `REGEXP_ONLY_DIGITS_AND_CHARS`,
    `lucide-react`, Tailwind utilities, `className`, `containerClassName`,
    `data-slot`, and vendor source to RadCN explicit props, native input
    events, `radcn-input-otp-change`, `class`, `containerClass`, `style`,
    public hooks, and app-owned browser/server state.
- Update docs browser behavior only if the docs `input-otp-controlled`
  example needs visible local state.
  - Prefer server-rendered defaults for static examples.
  - If interactive display text is needed, add a small dependency-free
    enhancement to `radcn/apps/docs/app/assets/entry.ts` scoped to
    `data-radcn-docs-input-otp-family="input-otp-controlled"`.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/input-otp.tsx`
  - `radcn/fixtures/candidate-remix/app/assets/entry.ts`, only if fixture-owned
    visible entered-value feedback needs browser enhancement.
  Add named Input OTP fixture routes for `demo`, `pattern`, `separator-2-2-2`,
  and `controlled`. Preserve existing generic Input OTP routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/form-input-cluster.spec.ts`.
  - Verify `input-otp/demo` exposes the named 3-3 split layout, one separator,
    six slots, native input value/slot mirroring, active slot state, and public
    hooks.
  - Verify `input-otp/pattern` accepts letters and digits, rejects other
    characters, exposes RadCN's alphanumeric pattern, and updates slots.
  - Verify `input-otp/separator-2-2-2` exposes the named 2-2-2 split layout,
    two separators, six slots, and public hooks.
  - Verify `input-otp/controlled` starts with the helper text, updates visible
    "You entered: {value}" feedback from user input, mirrors slots, and remains
    app-owned behavior.
  - Keep existing generic Input OTP, Input Group, and Form cluster tests
    passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all four named Input OTP examples.
  - Assert rendered evidence for Input OTP, groups, slots, separators,
    alphanumeric pattern, controlled display text, native input state,
    `radcn-input-otp-change`, `class`, `containerClass`, `style`, public hooks,
    React `useState`, `value`, `onChange`, upstream `input-otp`, `OTPInput`,
    `lucide-react`, Tailwind, `className`, `containerClassName`, `data-slot`,
    app-owned display state, and no vendor dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/input-otp-example-inventory.md`.
  - Change all four Input OTP rows to `Covered` only after package/docs/
    fixture/Playwright evidence exists.
  - Record final API decisions for controlled display text, pattern constants,
    separator presentation, upstream `input-otp` non-dependency,
    app-owned state, and adjacent `input-otp-form`/`otp-*` recipes remaining
    outside this four-example cluster.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `input-otp` as a resolved example cluster with evidence from
    Experiments 47 and 48 plus `input-otp-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Input OTP example
  outcome and the next generated recommendation.
- Do not change `radcn/packages/radcn/src/components/input-otp.tsx` or Input
  OTP package APIs unless implementation discovers and records a direct blocker
  in the current primitive.

## Verification

Pass criteria:

- Package, docs, and fixture checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright form/input cluster coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts form-input-cluster.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all four upstream Input OTP example ids
  appear exactly once in `input-otp-example-inventory.md` and every row is
  `Covered`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/input-otp-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'input-otp-controlled',
    'input-otp-demo',
    'input-otp-pattern',
    'input-otp-separator',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== ids.length
  for (const id of ids) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      !row[0][0].includes('| Covered |')
    ) {
      failed = true
    }
  }
  for (const row of rows) {
    if (!ids.includes(row[1])) {
      console.log(`unexpected: ${row[1]}`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "input-otp"`, `status = "resolved"`, and
  evidence for Experiment 47, Experiment 48, and
  `input-otp-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `input-otp` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for input-otp`.
- Fixture tests assert:
  - all four named Input OTP routes expose public RadCN hooks;
  - demo route proves the 3-3 split layout, one separator, six slots, input
    value, slot mirroring, active slot state, and public hooks;
  - pattern route proves alphanumeric pattern filtering accepts letters/digits
    and rejects other characters;
  - separator route proves the 2-2-2 split layout and two separators;
  - controlled route proves visible helper/entered-value feedback and slot
    mirroring as app-owned state;
  - existing generic Input OTP, Input Group, and Form cluster tests still pass.
- Docs coverage asserts the Input OTP page renders stable evidence for all four
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
      name === 'lucide-react' ||
      name === 'input-otp' ||
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
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

  node - <<'NODE'
  const fs = require('fs')
  const manifests = [
    'package.json',
    'radcn/packages/radcn/package.json',
    'radcn/apps/docs/package.json',
    'radcn/fixtures/candidate-remix/package.json',
  ]
  function forbiddenPackage(name) {
    return (
      name === 'react' ||
      name === 'react-dom' ||
      name === 'lucide-react' ||
      name === 'input-otp' ||
      name === 'radix-ui' ||
      name.startsWith('@radix-ui/') ||
      name === 'tailwindcss' ||
      name.startsWith('@tailwindcss/')
    )
  }
  let failed = false
  for (const file of manifests) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'))
    for (const key of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
      for (const name of Object.keys(json[key] || {})) {
        if (forbiddenPackage(name)) {
          console.log(`${file}: forbidden dependency ${name}`)
          failed = true
        }
      }
    }
    if (json.publishConfig) {
      console.log(`${file}: publishConfig is out of scope for Issue 4`)
      failed = true
    }
  }
  if (failed) process.exit(1)
  NODE
  ```
- `git diff --check`
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.
- `git status --short` shows only expected files before the plan/result
  commits.

Failure criteria:

- The implementation marks `input-otp` resolved without named docs, fixture,
  and Playwright evidence that marks all four upstream example ids as
  `Covered`.
- The implementation adds React, React DOM, upstream `input-otp`, Radix,
  `lucide-react`, Tailwind, or vendor dependencies.
- The implementation changes Input OTP package APIs without a recorded blocker
  and review.
- The implementation conflates package-owned Input OTP behavior with app-owned
  controlled display text, form submission/result display, toast behavior,
  card/block layout, separator icon presentation, or custom styling decisions.

## Design Review

Reviewer: Hegel the 2nd (`019e9be8-0e2d-7a93-b62f-6b103aad04f4`)
with fresh context (`fork_context: false`) for the initial review.

Findings:

- Blocker: The inventory verification allowed `Covered` or
  `Intentional divergence`, but this implementation experiment is specifically
  meant to prove named parity for all four Input OTP examples. That created a
  pass path where the cluster could be marked resolved without proving the
  named examples.

Fix:

- Updated the deterministic inventory check and failure criteria so
  `input-otp-controlled`, `input-otp-demo`, `input-otp-pattern`, and
  `input-otp-separator` must each be marked `Covered`.

Re-review: Approved. The reviewer confirmed the blocker is resolved and no
blockers remain in the re-review scope.

Approval: Approved for plan commit.
