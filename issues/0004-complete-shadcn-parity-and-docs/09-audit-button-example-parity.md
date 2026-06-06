# Experiment 9: Audit button example parity

## Description

Experiment 8 cleared the remaining unresolved package-outcome queue. The
generated parity inventory now recommends example parity depth for `button` as
the next Issue 4 cluster.

This experiment audits all upstream shadcn button examples and maps them to
RadCN's current package API, docs examples, fixture scenarios, and Playwright
coverage. It should not implement button changes yet. The expected output is a
durable inventory that says whether Button example parity is already complete
or identifies the exact follow-up implementation experiment.

## Changes

- Audit these upstream files from
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/`:
  - `button-demo.tsx`
  - `button-default.tsx`
  - `button-secondary.tsx`
  - `button-destructive.tsx`
  - `button-outline.tsx`
  - `button-ghost.tsx`
  - `button-link.tsx`
  - `button-with-icon.tsx`
  - `button-loading.tsx`
  - `button-icon.tsx`
  - `button-as-child.tsx`
  - `button-rounded.tsx`
  - `button-size.tsx`
- Create
  `issues/0004-complete-shadcn-parity-and-docs/button-example-inventory.md`
  with:
  - one row per upstream button example id;
  - the user-facing behavior each example proves;
  - the current RadCN package/docs/fixture/test evidence;
  - the parity outcome: covered, partial, missing, or intentionally divergent;
  - follow-up work needed for each non-covered row.
- Inspect and cite current RadCN button surfaces:
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/button.tsx`
  - `radcn/fixtures/tests/native-controls.spec.ts`
- Decide whether `button` should be marked resolved in
  `resolved-clusters.json` now or remain unresolved pending a follow-up
  implementation experiment.
- Regenerate `parity-inventory.md` only if `resolved-clusters.json` changes.
- Update Issue 4 learnings with the audit conclusion and next recommended
  experiment.

## Verification

Pass criteria:

- `button-example-inventory.md` exists.
- A deterministic check proves all 13 upstream button example ids appear in
  `button-example-inventory.md`.
- The inventory has exactly one outcome row for each upstream id and each row
  records current RadCN evidence or a concrete gap.
- The audit explicitly handles these shadcn-to-RadCN mapping decisions:
  - `asChild` maps to RadCN's `href` anchor path rather than React slot
    cloning.
  - shadcn's `variant="link"` is either supported by RadCN or recorded as a
    concrete gap.
  - shadcn `icon-sm` and `icon-lg` sizes are either supported by RadCN or
    recorded as concrete gaps.
  - loading buttons map to RadCN's `disabled` button plus `radcn/spinner`
    composition.
  - icon examples use package-compatible SVG/icon composition without adding
    React-only icon dependencies.
  - rounded buttons map to author customization through `class` or tokens.
- If `resolved-clusters.json` changes, `node scripts/audit-shadcn-parity.mjs`
  and the parity inventory regeneration diff check both pass.
- If the audit marks `button` resolved, the regenerated inventory no longer
  recommends `button` as the first unresolved example cluster.
- If the audit keeps `button` unresolved, the experiment conclusion names the
  next implementation experiment and the minimum missing proof required.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json issues/0004-complete-shadcn-parity-and-docs/button-example-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected Issue 4 documentation, inventory,
  and optional resolved-cluster/generated-inventory changes before the result
  commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any upstream button example id is missing from the inventory.
- The audit claims parity based only on package exports without docs, fixture,
  or test evidence for the user-facing behavior.
- The audit silently treats React-only `asChild`, `lucide-react`,
  `@tabler/icons-react`, or unsupported size/variant props as already covered.
- The audit marks `button` resolved while leaving concrete uncovered behavior
  without a documented intentional divergence.

## Design Review

Reviewer: Peirce (`019e9a43-a6b5-7e93-bcd0-a99ced63624f`)
Fresh context: yes (`fork_context: false`)

Findings:

- Minor: the original description left a small implementation escape hatch for
  a "tiny proof fixture," but the Changes and git status expectations only
  allowed documentation, inventory, optional resolved-cluster, and generated
  inventory changes. Fixed by removing the exception and making Experiment 9 a
  pure audit.

Approval result: approved with no blockers. The reviewer confirmed the plan
audits all 13 upstream button examples, covers the known false-coverage risks,
references current RadCN files accurately, and has enough criteria to decide
the next experiment.

## Result

**Result:** Pass

Experiment 9 created `button-example-inventory.md` and audited all 13 upstream
button examples. The audit keeps `button` unresolved because RadCN's current
Button API and examples do not yet cover the full upstream example surface.

Confirmed current coverage:

- default, secondary, destructive, outline, and ghost variants exist.
- `href` renders anchor semantics and is the RadCN equivalent for shadcn's
  React-only `asChild` slot pattern.
- disabled state, form submit/reset behavior, and author classes already have
  package and fixture evidence.

Confirmed gaps:

- `variant="link"` is missing from RadCN Button.
- `icon-sm` and `icon-lg` are missing from RadCN Button sizes.
- icon-only Button examples need an accessible-name prop such as `ariaLabel`.
- docs, fixtures, and Playwright coverage need explicit proof for link,
  loading, icon-with-text, icon-only, rounded, and full size examples.

Verification run:

- `button-example-inventory.md` exists.
- A deterministic Node check proved all 13 upstream button example ids appear
  in `button-example-inventory.md`.
- A deterministic Node check proved the inventory has exactly one outcome row
  for each upstream id.
- A deterministic Node check proved the inventory explicitly discusses
  `asChild`, `href`, `variant="link"`, `icon-sm`, `icon-lg`, `Spinner`,
  `lucide-react`, `@tabler/icons-react`, and rounded customization.
- The no-vendor/no-React/no-publish scope grep exited 1 with no matches.
- `git diff --check` passed.
- Vendor status checks for shadcn/ui, Remix, and React Router printed no
  output.
- `git status --short` showed only the expected Issue 4 experiment, README,
  and `button-example-inventory.md` changes before completion review.

## Conclusion

Button example parity needs a follow-up implementation experiment. The next
experiment should add `link`, `icon-sm`, `icon-lg`, and accessible icon-button
support to `radcn/button`, then expand docs, fixtures, and Playwright coverage
for the audited example set before marking `button` resolved.

## Completion Review

Reviewer: Dalton (`019e9a47-dabe-7de2-99ee-b778454af74a`)
Fresh context: yes (`fork_context: false`)

Result: approved with no blockers.

Findings:

- Non-blocking note: the recorded `git status --short` evidence originally
  named only the README and `button-example-inventory.md`, while the current
  status also included the experiment file itself after result recording. Fixed
  by naming the experiment file in the evidence.

Approval evidence:

- `button-example-inventory.md` has exactly one row for each of the 13 upstream
  button ids.
- The audit records the expected Button gaps: `link`, `icon-sm`, `icon-lg`,
  icon-only accessible name, and missing docs/fixture/Playwright proof.
- `button` remains unresolved in `parity-inventory.md`, and
  `resolved-clusters.json` was not changed.
- README learning and experiment status are consistent.
- No implementation files changed.
- Scope grep, `git diff --check`, and vendor status checks passed.
