# Experiment 81: Audit alert-dialog example parity

## Description

The regenerated parity inventory after Experiment 80 recommends alert-dialog
as the next unresolved example cluster. Upstream shadcn/ui New York v4
currently has one Alert Dialog example, `alert-dialog-demo`, plus the upstream
Alert Dialog UI implementation. RadCN already exports `radcn/alert-dialog`, has
candidate fixtures for default, cancel/action, default-open, small, and
custom-token behavior, and has Playwright coverage for alertdialog semantics,
ARIA wiring, non-dismissible overlay/Escape behavior, focus trapping,
action/cancel close behavior, default-open state, size, and custom tokens.

This experiment should audit the upstream alert-dialog example against current
RadCN evidence and produce a focused inventory that determines whether the
cluster is already covered or which exact named-example gaps remain. It should
not implement the named example yet.

The likely remaining gap is named docs/fixture/test evidence for the exact
upstream `alert-dialog-demo` composition:

- root `AlertDialog`;
- `AlertDialogTrigger asChild` wrapping an outline Button labelled
  `Show Dialog`;
- `AlertDialogContent`;
- `AlertDialogHeader`;
- title text `Are you absolutely sure?`;
- description text `This action cannot be undone. This will permanently delete
  your account and remove your data from our servers.`;
- `AlertDialogFooter`;
- cancel button text `Cancel`;
- action button text `Continue`;
- no media block;
- upstream Radix AlertDialog primitive, React client component marker, Button
  `asChild`, `cn`, `data-slot`, `className`, Tailwind layout/animation
  utilities, overlay/portal/content animation classes, `size` prop, and
  responsive footer/header layout mapped to RadCN's dependency-free modal
  behavior, explicit parts, public hooks, package CSS, and app/docs
  composition.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md`.
  - List upstream alert-dialog example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/alert-dialog*.tsx`.
  - Summarize the upstream UI implementation from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/alert-dialog.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `alert-dialog-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for alertdialog semantics, non-dismissible behavior,
    trigger/Button mapping, `asChild`, action/cancel close behavior, focus
    management, overlay/portal/content hooks, title/description ARIA wiring,
    footer/header layout, no-media composition, size/default sizing, Radix
    non-dependency, React non-dependency, `cn`, `data-slot`, `className`,
    Tailwind animation/layout mapping, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 81 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, test, inventory-regeneration, or
`resolved-clusters.json` changes should be made in this audit experiment unless
the audit itself exposes an already-covered result that can be proven entirely
from existing evidence. If that happens, record the evidence and keep the
change limited to issue documentation.

## Verification

Pass criteria:

- `alert-dialog-example-inventory.md` exists and has:
  - `# Alert Dialog Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one upstream row, `alert-dialog-demo`;
  - `## Decisions`.
- A deterministic check proves the upstream vendor example count is exactly
  one and the inventory table contains exactly one matching row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^alert-dialog.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`vendor: ${vendor.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (vendor.length !== 1 || vendor[0] !== 'alert-dialog-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'alert-dialog-demo') process.exit(1)
  NODE
  ```
- A deterministic check proves the row outcome is one of `Covered`, `Partial`,
  `Missing`, or `Intentional divergence` and that any non-covered row has a
  non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/alert-dialog-example-inventory.md', 'utf8')
  const row = text.match(/^\| `alert-dialog-demo` \|([^\n]+)$/m)?.[0]
  if (!row) process.exit(1)
  const cells = row.split('|').map((cell) => cell.trim())
  const outcome = cells[4]
  const followUp = cells[5]
  console.log(`outcome: ${outcome}`)
  console.log(`follow-up: ${followUp}`)
  if (!['Covered', 'Partial', 'Missing', 'Intentional divergence'].includes(outcome)) process.exit(1)
  if (outcome !== 'Covered' && (!followUp || followUp === 'No follow-up.')) process.exit(1)
  NODE
  ```
- The audit explicitly mentions and classifies these upstream mechanics:
  React client component marker, Radix AlertDialog primitive, Button
  `asChild`, Button `variant="outline"`, `cn`, `data-slot`, `className`,
  Tailwind layout and animation utilities, overlay/content/portal behavior,
  content `size`, responsive header/footer layout, no-media composition,
  exact trigger/title/description/cancel/action text, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/alert-dialog.tsx`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/fixtures/candidate-remix/app/fixtures/alert-dialog.tsx`;
  - `radcn/fixtures/tests/modal-variants.spec.ts`;
  - `radcn/apps/docs/tests/coverage.spec.ts`.
- The Issue 4 README `## Learnings` section records the alert-dialog audit
  result and the next recommended experiment after the audit result is known.
  A deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 81|alert-dialog-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```
- `git diff --check`
- `git status --short` shows only the new experiment file,
  `alert-dialog-example-inventory.md`, and the Issue 4 README before the
  result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits the exact upstream `alert-dialog-demo` trigger, title,
  description, cancel, or action text.
- The audit marks `alert-dialog-demo` covered without docs, fixture, and
  Playwright evidence for the named example, unless it records a precise
  intentional divergence with enough existing evidence.
- The audit changes package, docs app, fixture, or Playwright implementation
  files before the follow-up implementation experiment is designed and
  approved.
- The audit mutates vendor source or adds forbidden dependencies such as React,
  Radix, lucide-react, Tailwind, or class-variance-authority.

## Design Review

Reviewer: Heisenberg the 2nd (`019e9d4e-4957-79b2-bd77-6761d47bc62e`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the README links Experiment 81 as
`Designed`, the experiment has the required sections, scope is audit-only and
narrow, implementation has not started before the plan commit, verification and
hygiene checks are concrete, vendor checkouts are not in scope, and the plan
captures the upstream `alert-dialog-demo` surface and current RadCN evidence
well enough to decide the next implementation experiment.
