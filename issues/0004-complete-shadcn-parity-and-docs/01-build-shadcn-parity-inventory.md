# Experiment 1: Build shadcn parity inventory

## Description

Issue 4 needs a complete source-of-truth inventory before any implementation
cluster starts. RadCN currently has many package exports and a complete docs
route registry, but the project has not yet mapped the full vendored shadcn/ui
v4 registry surface to explicit RadCN outcomes.

This experiment audits the vendored shadcn/ui v4 registry against RadCN's
current package exports and docs registry. It should classify every upstream
surface into a RadCN outcome:

- shipped package API;
- helper;
- docs recipe;
- docs block;
- needs implementation;
- needs richer docs/examples;
- intentional Remix 3 divergence;
- not applicable.

This is an inventory experiment only. It must not implement components, change
package exports, publish anything, or make install instructions work.

## Changes

- `scripts/audit-shadcn-parity.mjs`
  - Add a repository-local audit script that reads, but does not modify:
    - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/`;
    - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/`;
    - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/`;
    - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/`;
    - `radcn/packages/radcn/package.json`;
    - `radcn/apps/docs/app/content/components.tsx`.
  - Produce deterministic Markdown output.
  - Write the inventory to
    `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md` by
    default, so rerunning the script can prove the committed inventory is
    current.
  - Do not import runtime code from `vendor/`; parse file paths and text
    metadata only.
- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - Add the generated audit result.
  - Include counts for upstream UI components, examples, blocks, and chart
    examples.
  - Include the current RadCN export count and docs route count.
  - List upstream UI components missing from RadCN exports.
  - List RadCN exports without obvious upstream UI counterparts.
  - List upstream examples grouped by inferred component slug.
  - List upstream blocks and chart examples as separate parity queues.
  - Identify the first recommended implementation cluster, with a short reason.
- `issues/0004-complete-shadcn-parity-and-docs/README.md`
  - Add learnings that later experiments need, especially the parity queues and
    first implementation cluster.

## Verification

Pass criteria:

- The inventory is generated from current files, not hand-written guesses.
- The inventory explicitly accounts for:
  - upstream `ui/` components;
  - upstream `examples/`;
  - upstream `blocks/`;
  - upstream `charts/`;
  - current RadCN package exports;
  - current docs registry routes.
- The inventory identifies the known missing outcomes `form`, `date-picker`,
  and `data-table`.
- The inventory does not claim npm publishing or working external install is in
  scope.
- No RadCN source file or package export changes in this experiment.
- No code depends on `vendor/`; the script reads `vendor/` as an ignored source
  reference only.

Commands:

- `node scripts/audit-shadcn-parity.mjs`
- `git diff --exit-code -- issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
- `git diff --check`
- `git diff --name-only HEAD` shows only:
  - `issues/0004-complete-shadcn-parity-and-docs/README.md`;
  - `issues/0004-complete-shadcn-parity-and-docs/01-build-shadcn-parity-inventory.md`;
  - `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`;
  - `scripts/audit-shadcn-parity.mjs`.
- `git -C vendor/shadcn-ui status --short`
- `git -C vendor/remix status --short`
- `git -C vendor/react-router status --short`
- `git diff --name-only HEAD -- radcn package.json pnpm-workspace.yaml pnpm-lock.yaml | rg '(^|/)vendor(/|$)'`
  returns no output.
- `git diff HEAD -- radcn package.json pnpm-workspace.yaml pnpm-lock.yaml | rg 'npm publish|pnpm publish|publishConfig|"private": false|vendor/'`
  returns no output.

Manual review:

- Inspect `parity-inventory.md` and confirm the first recommended cluster is
  small enough for one follow-up experiment.
- Confirm the issue README links this experiment and captures cross-component
  learnings from the inventory.

## Design Review

Reviewer: Wegener (`019e99e8-ba87-7423-9034-e9c6c6c7d33b`)

Fresh context: Yes (`fork_context: false`)

Findings:

- Blocker: None
- Major: The plan did not require proving the committed inventory matched
  regenerated script output.
- Major: The plan did not explicitly fail accidental RadCN source or package
  export changes.
- Minor: None

Fixes:

- Specified that the audit script writes the inventory file by default and added
  `git diff --exit-code -- issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  after rerunning it.
- Added an explicit changed-file scope check limiting the experiment result to
  the issue README, experiment file, generated inventory, and audit script.

Reviewer approval: Approved; no blockers remained.
