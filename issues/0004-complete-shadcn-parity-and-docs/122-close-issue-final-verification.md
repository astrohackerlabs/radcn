# Experiment 122: Close Issue 4 with final verification

## Description

Experiment 121 resolved the final in-scope direct example cluster,
`tooltip-demo`. The regenerated parity inventory now reports no unresolved
in-scope parity clusters and recommends closing Issue 4 with a final
verification pass.

This experiment should perform that closeout without adding new component
scope:

- verify the generated parity inventory has no unresolved in-scope package,
  package-outcome, or example clusters;
- verify upstream blocks and chart-gallery examples remain explicitly
  out-of-scope and not completion blockers;
- verify `resolved-clusters.json` records the final resolved in-scope example
  clusters, including `tabs` and `tooltip`;
- rerun the final focused typecheck and Playwright commands needed to support
  the current closing state;
- close Issue 4 with frontmatter `status = "closed"` and
  `closed = "2026-06-06"`;
- add an issue-level `## Conclusion`;
- regenerate `issues/README.md`.

The experiment should not add component functionality. If final verification
finds a real gap, record `Partial` or `Fail` and leave Issue 4 open.

## Changes

- Update `issues/0004-complete-shadcn-parity-and-docs/README.md`.
  - Change frontmatter `status` from `open` to `closed` only after final
    verification passes.
  - Add `closed = "2026-06-06"`.
  - Add `## Conclusion` summarizing the final scope and outcome.
  - Update Experiment 122 status from `Designed` to the recorded result.
- Regenerate `issues/README.md` with:

  ```text
  scripts/build-issues-index.sh
  ```

- Update this experiment file with `## Result`, `## Conclusion`, and
  completion review evidence.

No package, docs app, fixture, Playwright implementation, lockfile, or vendor
source changes are expected.

## Verification

Pass criteria:

- Final typechecks pass:

  ```text
  pnpm radcn:typecheck
  pnpm --dir radcn/apps/docs typecheck
  pnpm fixtures:candidate:typecheck
  ```

- Final focused Playwright coverage passes:

  ```text
  pnpm exec playwright test -c radcn/fixtures/playwright.config.ts positioned-overlays.spec.ts
  pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts
  ```

- `node scripts/audit-shadcn-parity.mjs` regenerates
  `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Deterministic checks prove:
  - `## Unresolved Package Outcome Clusters` exists and reports `- None.`;
  - `## Unresolved Example Clusters` contains `None | 0`;
  - `## First Recommended Cluster` says `No unresolved parity clusters`;
  - `tabs` and `tooltip` are present as resolved example clusters in
    `resolved-clusters.json`;
  - out-of-scope blocks and chart-gallery sections remain present.
- `scripts/build-issues-index.sh` regenerates `issues/README.md`.
- Deterministic checks prove:
  - Issue 4 frontmatter has `status = "closed"`,
    `opened = "2026-06-05"`, and `closed = "2026-06-06"`;
  - Issue 4 has a `## Conclusion` section;
  - the top-level issue index lists Issue 4 as closed.
- Dependency and scope checks pass:
  - `git diff --exit-code -- pnpm-lock.yaml`;
  - tracked-vendor-source check proves `git ls-files vendor` returns only
    `vendor/.gitignore`;
  - `git diff --check`;
  - `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
    prints no output;
  - `git status --short` shows only the expected closeout files before the
    result commit.

Failure criteria:

- Any in-scope unresolved package or example cluster remains.
- Issue 4 is closed without final verification evidence.
- Blocks or chart-gallery examples are reintroduced as Issue 4 completion
  requirements.
- Package, docs, fixture, lockfile, or vendor source files change during this
  closeout.

## Design Review

Reviewer: McClintock the 3rd (`019e9f0d-0a1f-76c0-9ab7-2ed1b0efc247`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: fixed. The initial plan referenced the wrong generated inventory
  heading, `## Unresolved Package Outcomes`, and allowed an absent heading to
  pass. The plan now requires the actual generated
  `## Unresolved Package Outcome Clusters` section to exist and report
  `- None.`.
- Major: none.
- Minor: none.

Approved after re-review. The reviewer confirmed the prior blocker is
resolved, no new blocker was introduced, the Issue 4 README links
Experiment 122 as `Designed`, the experiment has the required sections, the
scope is narrow to final verification and closure, repo hygiene checks are
present, vendor sources remain references only, and closure happens only if
the final state is verified.
