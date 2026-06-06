# Experiment 40: Implement toast example parity depth

## Description

Experiment 39 audited the five deprecated upstream shadcn/ui New York v4
`toast` examples and found the cluster is still partial. RadCN already has the
right notification primitives, but it lacks named docs/fixture/Playwright proof
for the deprecated example ids, and upstream `toast-simple` is
description-only while RadCN currently requires a `title`.

This experiment implements deprecated toast example parity depth for:

- `toast-demo`
- `toast-destructive`
- `toast-simple`
- `toast-with-action`
- `toast-with-title`

It should keep `sonner` as a separate unresolved current-upstream notification
cluster. It should not port React, `useToast`, `ToastAction`, Radix toast
internals, Sonner as a dependency, lucide, `next-themes`, Tailwind, or vendor
source into RadCN package code.

## Changes

- Update `radcn/packages/radcn/src/components/toast.ts`.
  - Change `ToastPayload` so `title` is optional and description-only payloads
    are valid.
  - Keep the event helper small and browser-owned: `toast(payload)` and
    `createToastEvent(payload)` still dispatch the `RADCN_TOAST_EVENT`.
- Update `radcn/packages/radcn/src/components/sonner.tsx`.
  - Render title and description conditionally so description-only payloads
    produce visible, accessible toast content instead of being ignored.
  - Update `toastLabel`, static `Toast`, event rendering, trigger enhancement,
    and event handling so a payload with either `title` or `description` is
    valid.
  - Keep empty payloads ignored.
  - Preserve existing action links, dismiss behavior, duration handling,
    `status`/`alert` roles, data hooks, and server-rendered initial toasts.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Promote `toast` from seed docs into a rich helper docs page.
  - Render stable docs hooks for all five deprecated toast example ids using
    `data-radcn-docs-toast-family`.
  - Demonstrate Button-triggered browser events, title+description toasts,
    description-only toasts, action links, and destructive-to-error mapping.
  - Explain mappings from deprecated shadcn `useToast`, `ToastAction`,
    `variant: "destructive"`, React click handlers, and `data-slot`/Tailwind
    styling to RadCN's explicit browser event helper, `Toaster`, native
    Button/form composition, `type: "error"`, public hooks, classes, and CSS
    variables.
  - Explicitly state that current upstream `sonner` examples are tracked
    separately and that lucide, `next-themes`, Sonner, React, and vendor source
    are not toast-helper package dependencies.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/toast.tsx`
  Add named toast fixture routes for `demo`, `destructive`, `simple`,
  `with-action`, and `with-title`. Preserve the existing `event`,
  `form-action`, and `no-js-initial` routes unless a direct conflict is found.
- Update Playwright coverage in `radcn/fixtures/tests/notifications.spec.ts`.
  - Verify `toast/demo` renders a Button trigger labeled `Add to calendar`,
    dispatches a title+description toast, and renders an Undo action.
  - Verify `toast/destructive` maps to `data-type="error"` and `role="alert"`
    with a Try again action.
  - Verify `toast/simple` dispatches and renders a description-only toast with
    no title requirement.
  - Verify `toast/with-action` renders title+description+action behavior.
  - Verify `toast/with-title` renders title+description behavior without an
    action.
  - Keep existing notification export, sonner, event, form-action, and no-JS
    tests passing.
- Update docs Playwright coverage in
  `radcn/apps/docs/tests/coverage.spec.ts`.
  - Assert stable docs hooks for all five named deprecated toast examples.
  - Assert docs copy/source evidence for `createToastEvent`, `toast`,
    `Toaster`, `Button`, `actionLabel`, `actionUrl`, `type: 'error'`,
    description-only payloads, `useToast` mapping, `ToastAction` mapping,
    Sonner separation, and no React/Sonner/lucide/`next-themes` package
    dependency.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/toast-example-inventory.md`.
  - Change all five deprecated toast rows to `Covered` only after package,
    docs, fixture, and Playwright evidence exists.
  - Record the description-only API decision and destructive-to-error mapping.
  - Keep `sonner-demo` and `sonner-types` outside this inventory.
- Update
  `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Add `toast` as a resolved example cluster with evidence from Experiments 39
    and 40 plus `toast-example-inventory.md`.
- Regenerate
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` with
  `node scripts/audit-shadcn-parity.mjs`.
- Update Issue 4 `README.md` learnings with the final deprecated toast example
  outcome and the next generated recommendation.

## Verification

Pass criteria:

- Package, docs, and fixture checks pass:
  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```
- Fixture Playwright notification coverage passes:
  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts notifications.spec.ts
  ```
- Docs Playwright coverage passes:
  ```text
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```
- A deterministic Node check proves all five deprecated toast example ids
  appear exactly once in `toast-example-inventory.md` and every row is
  `Covered` or `Intentional divergence`:
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/toast-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const ids = [
    'toast-demo',
    'toast-destructive',
    'toast-simple',
    'toast-with-action',
    'toast-with-title',
  ]
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)]
  let failed = rows.length !== ids.length
  for (const id of ids) {
    const row = rows.filter((match) => match[1] === id)
    console.log(`${id}: ${row.length} ${row[0]?.[0] ?? ''}`)
    if (
      row.length !== 1 ||
      (!row[0][0].includes('| Covered |') && !row[0][0].includes('| Intentional divergence |'))
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
  `examples` entry with `slug = "toast"`, `status = "resolved"`, and evidence
  for Experiment 39, Experiment 40, and `toast-example-inventory.md`.
- `node scripts/audit-shadcn-parity.mjs` regenerates
  `parity-inventory.md`; a deterministic check proves:
  - `toast` is absent from `## Unresolved Example Clusters`;
  - `sonner` remains present in `## Unresolved Example Clusters`;
  - `## First Recommended Cluster` no longer says `Example parity for toast`.
- Fixture tests assert:
  - all five named deprecated toast routes dispatch or render visible toast
    behavior through RadCN package APIs;
  - `toast-simple` works with description-only payloads;
  - `toast-destructive` maps destructive behavior to `type="error"` and
    `role="alert"`;
  - action examples expose `data-radcn-toast-action`;
  - existing sonner and toast routes still pass.
- Docs coverage asserts the toast page renders stable evidence for all five
  deprecated example ids and source/API text mentions the required mapping
  copy.
- Dependency and scope checks pass:
  ```text
  rg -n "from ['\"]react['\"]|from ['\"]react-dom['\"]|from ['\"]sonner['\"]|from ['\"]next-themes['\"]|from ['\"]lucide-react['\"]|from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json
  rg -n "\"(react|react-dom|sonner|next-themes|lucide-react)\"\\s*:" package.json radcn/packages/radcn/package.json radcn/apps/docs/package.json radcn/fixtures/candidate-remix/package.json
  ```
  Both commands should produce no matches. Docs prose references to React,
  Sonner, lucide, and `next-themes` are allowed when covered by docs-copy
  assertions.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any deprecated toast row remains `Partial` or `Missing`.
- The implementation marks `toast` resolved without package/docs/fixture/
  Playwright evidence for all five deprecated toast examples.
- `toast-simple` remains impossible to represent as a description-only payload.
- Destructive toast behavior is documented or tested without an explicit RadCN
  `type: "error"` mapping.
- The implementation marks or removes the separate `sonner` example cluster as
  resolved.
- The implementation adds React, React DOM, Sonner, lucide, `next-themes`,
  Tailwind, vendor imports, or publish configuration/dependencies.
- The implementation changes unrelated component APIs instead of composing
  existing Button, Toaster, Toast, and event-helper behavior.
- The regenerated parity inventory still recommends `toast` as the first
  unresolved example cluster.

## Design Review

Reviewer: Parfit the 2nd (`019e9b8a-7984-77d0-ac1b-0f385089d6d5`)

Fresh context: yes (`fork_context: false`).

Findings:

- Blocker: the initial dependency/scope grep rejected any import containing
  `sonner`, which would fail on legitimate RadCN package imports such as
  `radcn/sonner`. Fixed by narrowing the grep to exact third-party imports
  from `sonner`, `react`, `react-dom`, `next-themes`, and `lucide-react`.
- Major: the initial design file did not include a `## Design Review` section.
  Fixed by adding this section and recording the reviewer identity, fresh
  context, findings, fixes, and approval result.
- Minor: none.

Approval result: approved after re-review. Parfit the 2nd confirmed that the
issue README links Experiment 40 as `Designed`, the scope is coherent for one
experiment, implementation has not started, vendor status is clean, the
technical plan matches Experiment 39's findings, the revised dependency grep no
longer matches valid `radcn/sonner` imports, both listed dependency `rg`
commands produce no output, the design review section exists, and no new
blocker was introduced by the fixes.
