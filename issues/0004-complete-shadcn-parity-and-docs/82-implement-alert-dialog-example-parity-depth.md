# Experiment 82: Implement alert-dialog example parity depth

## Description

Experiment 81 audited the single active upstream Alert Dialog example,
`alert-dialog-demo`, and found the cluster is partial. RadCN already has
dependency-free Alert Dialog package behavior, fixtures, and Playwright
coverage for generic alertdialog semantics, ARIA wiring, non-dismissible
behavior, focus trapping, action/cancel close behavior, default-open state,
size, portals, overlays, custom tokens, and body scroll locking. The missing
evidence is named `alert-dialog-demo` parity in docs, candidate fixtures, and
tests.

This experiment should resolve the Alert Dialog example cluster by adding named
docs, candidate fixture, and Playwright coverage for `alert-dialog-demo`.

The implementation should prefer the current RadCN authoring model unless a
real package-level gap appears during implementation:

- `AlertDialogTrigger asChild` plus an outline Button maps to an explicit
  RadCN AlertDialogTrigger styled with Button outline classes or another
  documented dependency-free composition that produces the same user-facing
  trigger;
- Alert Dialog remains non-dismissible by default;
- the upstream no-media composition should be preserved by omitting
  `AlertDialogMedia`;
- action and cancel are native RadCN buttons that close through
  `enhanceAlertDialog`.

The experiment should not add React, Radix, lucide-react, Tailwind,
class-variance-authority, `cn`, animation libraries, or vendor dependencies.
If implementation discovers that current AlertDialogTrigger/Button composition
cannot provide equivalent user-facing behavior or author-facing modifiability,
record the package gap before changing package code.

## Changes

- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote Alert Dialog from a generated seed doc to a rich docs page if
    needed.
  - Render a stable docs hook
    `data-radcn-docs-alert-dialog-family="alert-dialog-demo"`.
  - Demonstrate `alert-dialog-demo` with:
    - root `AlertDialog`;
    - outline `Show Dialog` trigger;
    - `AlertDialogPortal`;
    - `AlertDialogOverlay`;
    - `AlertDialogContent`;
    - `AlertDialogHeader`;
    - `AlertDialogTitle` text `Are you absolutely sure?`;
    - `AlertDialogDescription` text `This action cannot be undone. This will
      permanently delete your account and remove your data from our servers.`;
    - `AlertDialogFooter`;
    - `AlertDialogCancel` text `Cancel`;
    - `AlertDialogAction` text `Continue`;
    - no `AlertDialogMedia`;
    - public root/trigger/portal/overlay/content/header/footer/title/
      description/action/cancel hooks and closed/open state evidence.
  - Include mapping copy for React client component marker, Radix AlertDialog,
    Button `asChild`, Button `variant="outline"`, `cn`, `data-slot`,
    `className`, Tailwind layout/animation utilities, responsive header/footer
    layout, content size/default sizing, custom tokens, vendor source, and the
    RadCN explicit trigger/Button composition decision.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/alert-dialog.tsx`
  Add a named `alert-dialog/demo` fixture route, preserving existing generic
  alert-dialog routes.
- Update fixture Playwright coverage in
  `radcn/fixtures/tests/modal-variants.spec.ts`.
  - Verify `alert-dialog/demo` exposes the exact upstream trigger, title,
    description, cancel, and action text.
  - Verify the trigger has outline Button styling evidence and public
    AlertDialog trigger hooks.
  - Verify opening produces role `alertdialog`, `aria-modal`, title/
    description wiring, open state on root/trigger/portal/overlay/content, body
    scroll locking, portal-root mounting, no media block, focus on the action,
    non-dismissible Escape/overlay behavior, cancel close behavior, action
    close behavior, and focus return to the trigger.
  - Keep existing generic Alert Dialog and Sheet tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert the `/docs/components/alert-dialog` page renders the named family
    hook, exact trigger/title/description/cancel/action copy, no media block,
    public hooks, outline trigger styling evidence, content/default-size
    evidence, and dependency-divergence/mapping copy.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md`.
  - Change `alert-dialog-demo` to `Covered` only after docs, fixture, and
    Playwright evidence exists.
  - Record the final trigger composition decision, unless implementation
    discovers and fixes a real package-level gap.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `alert-dialog` as a resolved example cluster only after the example row
    is `Covered` or intentionally diverged with evidence.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final Alert Dialog example
  outcome and the next generated recommendation.

Do not change `radcn/packages/radcn` unless implementation proves the explicit
trigger/Button composition cannot meet the upstream example's user-facing
behavior, accessibility, and author-facing modifiability. If package code
changes, add package-level verification and record why the audit assumption
changed.

## Verification

Pass criteria:

- Package, docs, and fixture typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture modal coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts modal-variants.spec.ts
  ```
- Docs Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves `alert-dialog-example-inventory.md` has
  exactly one upstream row, `alert-dialog-demo`, and the row is `Covered` or an
  explicitly recorded intentional divergence:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  const row = rows.filter((match) => match[1] === 'alert-dialog-demo')
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
  `examples` entry with `slug = "alert-dialog"`, `status = "resolved"`, and
  evidence for Experiment 81, Experiment 82, and
  `alert-dialog-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `alert-dialog` is absent from `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says
    `Example parity for alert-dialog`.
- Fixture tests assert:
  - `alert-dialog/demo` renders exact upstream trigger, title, description,
    cancel, and action text;
  - no `AlertDialogMedia` hook is present in the named demo;
  - trigger has public AlertDialog trigger hooks and outline Button styling
    evidence;
  - opening the dialog sets visible alertdialog content, `aria-modal`, ARIA
    title/description references, root/trigger/portal/overlay/content open
    state, body scroll lock, and portal-root mounting;
  - Escape and overlay clicks do not close the alert dialog;
  - cancel and action clicks close the dialog and return focus to the trigger.
- Docs coverage asserts the Alert Dialog page renders stable evidence for the
  named docs example and source/API text mentions the required mapping copy.
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
    'radix-ui',
    'lucide-react',
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
          name.startsWith('@radix-ui/') ||
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

- `alert-dialog-demo` remains `Partial` or `Missing` without a recorded
  intentional divergence.
- Docs, fixtures, or tests omit the exact trigger, title, description, cancel,
  or action copy.
- The implementation hides the Button `asChild`/outline trigger mapping instead
  of documenting and testing it.
- The named demo includes a media block despite the upstream example not using
  one.
- The implementation adds React, Radix, lucide-react, Tailwind,
  class-variance-authority, `cn`, animation libraries, or vendor source as
  package/app dependencies.
- The implementation changes unrelated component clusters or skips the
  regenerated parity inventory.

## Design Review

Reviewer: Huygens the 2nd (`019e9d55-89fd-76f0-b0e4-bcd43f33afbd`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the README links Experiment 82 as
`Designed`, the plan has the required sections, scope is narrow, implementation
has not started before the plan commit, verification and hygiene checks are
concrete, vendor checkouts are clean, Experiment 81's audit findings are
carried forward, and current RadCN package capabilities support the likely
dependency-free implementation path.

## Result

**Result:** Pass

Implemented named upstream `alert-dialog-demo` parity without changing
`radcn/packages/radcn` and without adding React, Radix, Tailwind, lucide-react,
`cn`, class-variance-authority, animation libraries, or vendor dependencies.

Changes made:

- `radcn/apps/docs/app/content/components.tsx`
  - promoted Alert Dialog from a generated seed doc to a rich docs page;
  - added `alertDialogDemoSource`;
  - added `AlertDialogDemoPreview` with
    `data-radcn-docs-alert-dialog-family="alert-dialog-demo"`;
  - rendered the exact upstream `Show Dialog` trigger, title, description,
    cancel, and action copy;
  - omitted `AlertDialogMedia`;
  - rendered portal, overlay, content, header, footer, title, description,
    cancel, and action hooks;
  - documented React, Radix, Button `asChild`, outline Button, `cn`,
    `data-slot`, `className`, Tailwind layout/animation, size/default sizing,
    custom-token, and vendor-source mappings;
  - extended the docs-only forced preview style so hidden Alert Dialog portals
    can show their hidden content inside documentation previews.
- `radcn/fixtures/scenarios/index.ts`
  - added the named `alert-dialog/demo` scenario.
- `radcn/fixtures/candidate-remix/app/fixtures/alert-dialog.tsx`
  - added the named demo route with exact upstream copy, outline trigger
    styling, portal/overlay/content composition, and no media block.
- `radcn/fixtures/tests/modal-variants.spec.ts`
  - added browser coverage for named `alert-dialog/demo` copy, public hooks,
    outline trigger classes, no media block, alertdialog role, aria-modal,
    title/description ARIA wiring, root/trigger/portal/overlay/content open
    state, body scroll locking, portal-root mounting, non-dismissible
    Escape/overlay behavior, Cancel/Continue close behavior, and focus return.
- `radcn/apps/docs/tests/coverage.spec.ts`
  - added docs coverage for the named docs family hook, exact upstream copy,
    public hooks, default size evidence, no media block, outline trigger
    styling, and divergence copy.
- `issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md`
  - marked `alert-dialog-demo` `Covered` with concrete docs, fixture, and test
    evidence.
- `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`
  - recorded `alert-dialog` as a resolved example cluster with Experiment 81,
    Experiment 82, and inventory evidence.
- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - regenerated the inventory; Alert Dialog is no longer unresolved and the
    next recommendation is `aspect-ratio`.
- `issues/0004-complete-shadcn-parity-and-docs/README.md`
  - updated Experiment 82 to `Pass` and recorded the Alert Dialog learning.

One design assumption changed during verification. The plan asked fixture tests
to prove focus on the action button after opening. The exact upstream demo
orders `Cancel` before `Continue`, and RadCN's modal helper focuses the first
focusable control. For a destructive confirmation, preserving that order makes
Cancel the initial focus target and Tab moves to Continue. The test now records
that safer behavior instead of forcing destructive action focus.

Verification performed:

```text
pnpm radcn:typecheck
pnpm --dir radcn/apps/docs typecheck
pnpm fixtures:candidate:typecheck
pnpm exec playwright test -c radcn/fixtures/playwright.config.ts modal-variants.spec.ts
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
node scripts/audit-shadcn-parity.mjs
```

Additional deterministic checks passed:

- `alert-dialog-example-inventory.md` has exactly one upstream example row,
  `alert-dialog-demo`, and it is `Covered`.
- `resolved-clusters.json` includes an `examples` entry for `alert-dialog` with
  `status = "resolved"` and evidence for Experiment 81, Experiment 82, and
  `alert-dialog-example-inventory.md`.
- `parity-inventory.md` no longer lists `alert-dialog` under unresolved example
  clusters, and the first recommendation is now `aspect-ratio`.
- forbidden import scan over `radcn/packages/radcn`, `radcn/apps/docs`, and
  `radcn/fixtures/candidate-remix` passed.
- manifest forbidden dependency scan passed.
- `git diff --exit-code -- pnpm-lock.yaml` passed.
- `git diff --check` passed.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  printed no output.

The first fixture Playwright run failed because the named demo test expected
initial focus on `AlertDialogAction`. After inspecting `setupModal`, the test
was corrected to assert initial focus on `AlertDialogCancel`, Tab to
`AlertDialogAction`, and Shift+Tab back to `AlertDialogCancel`. The rerun
passed.

## Completion Review

Reviewer: Epicurus the 2nd (`019e9d5e-ec84-7ec2-b5d8-189b3729a25e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the implementation matches the
approved experiment scope, the result and conclusion are recorded, the issue
README marks Experiment 82 `Pass`, the learning and next `aspect-ratio`
recommendation are recorded, docs and fixture evidence cover the named
`alert-dialog-demo`, inventory/resolved-clusters evidence is present,
`git diff --check` passed, vendor cleanliness was checked, `pnpm-lock.yaml`
is unchanged, no ignored vendor source is staged, and the result commit had not
been made before review.

## Conclusion

Alert Dialog example parity is resolved. The dependency-free RadCN package API
already had the required behavior; the missing work was named docs, fixture,
tests, and inventory evidence. The upstream `asChild` Button trigger maps cleanly
to explicit `AlertDialogTrigger` styling with Button classes.

The next Issue 4 experiment should audit upstream `aspect-ratio` examples.
