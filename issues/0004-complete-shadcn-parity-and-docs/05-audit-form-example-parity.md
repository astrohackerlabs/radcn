# Experiment 5: Audit form example parity

## Description

Experiment 4 removed the last known docs-only outcome by shipping
`radcn/data-table`. The regenerated parity inventory now recommends moving from
package outcome gaps to example parity depth, beginning with upstream form
examples.

The vendored shadcn/ui v4 examples registry lists 30 form examples across four
families:

- `form-rhf-*` — React Hook Form examples.
- `form-next-*` — Next/server-action oriented examples.
- `form-tanstack-*` — TanStack Form examples.
- `form-formisch-*` — Formisch examples.

Those examples are not equivalent to RadCN package API requirements one by one,
because many demonstrate app-level form-state libraries rather than shadcn form
parts. RadCN already made the core parity decision in Experiment 2: form state,
schema validation, arrays, and action handling stay app-owned, while RadCN owns
native form markup, deterministic IDs, labels, descriptions, invalid messages,
and explicit ARIA wiring.

This experiment audits every upstream form example and maps it to a RadCN
outcome before any additional implementation work. The output should make the
next experiment obvious: either the current `radcn/form` docs and fixtures
already cover the user-facing patterns, or specific missing examples/tests
should be implemented next.

This experiment does not implement new form components, introduce validation
libraries, change package exports, or alter docs copy beyond adding the audit
artifact and issue learnings.

## Changes

- Create `issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md`.
  - List all upstream form examples from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`.
  - For each example, record:
    - upstream example id;
    - form family (`rhf`, `next`, `tanstack`, or `formisch`);
    - inferred user-facing behavior;
    - upstream dependencies or app-state library demonstrated;
    - RadCN equivalent outcome: current package coverage, current docs/fixture
      coverage, missing docs example, missing fixture test, or intentional
      divergence;
    - evidence links to local source files.
  - Cluster examples by behavior rather than library name: simple input,
    password, textarea, select, radio group, checkbox, switch, array/list,
    complex form, server/action state, invalid/error display, and native
    validation.
- Inspect current RadCN coverage:
  - `radcn/packages/radcn/src/components/form.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
- Update Issue 4 learnings.
  - Record the form example parity map summary.
  - Record whether the next experiment should implement missing form examples,
    broaden docs examples, broaden fixture coverage, or move to the next
    inventory-recommended component cluster.
- Do not modify package exports or add dependencies.
- Do not depend on or import from `vendor/`; the vendored files are read-only
  reference input for the audit.

## Verification

Pass criteria:

- `issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md`
  exists and maps all 30 upstream form examples listed in the parity inventory.
- `test "$(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md | sort -u | wc -l | tr -d ' ')" = "30"`
  exits 0.
- `diff -u <(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md | sort -u) <(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md | sort -u)`
  exits 0 and proves the audit artifact contains the exact upstream form
  example id set recorded in the parity inventory.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|react-hook-form|@tanstack/react-form|from ['\"]formisch['\"]|\"(react-hook-form|@tanstack/react-form|formisch|zod)\"\\s*:|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit collapses all library-specific examples into a vague statement
  without mapping each upstream example id.
- The audit treats React Hook Form, TanStack Form, Formisch, Next actions, or
  schema validation as RadCN package dependencies.
- The audit cannot identify whether current RadCN docs/fixtures cover the
  user-facing form behaviors.
- The audit recommends an implementation next step without evidence from the
  local upstream and RadCN files.

## Design Review

Reviewer: Bohr (`019e9a24-1a2b-7d53-99a4-265de38b5296`)
Fresh context: yes (`fork_context: false`)

Findings:

- Minor: the original verification counted 30 form-looking ids but did not
  prove they were the exact 30 ids from the upstream inventory. Fixed by adding
  a sorted exact-set diff between `parity-inventory.md` and the new
  `form-example-inventory.md` audit artifact.

Review result: approved with no blocker or major findings.

Re-review result: approved; the exact-set verification resolves the prior
minor finding without introducing a blocker.

## Result

**Result:** Pass

Created `form-example-inventory.md` and mapped all 30 upstream shadcn form
examples to RadCN outcomes.

Changed files:

- `issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md`
  - Added the form example audit artifact.
  - Grouped the upstream examples by behavior rather than form-state library.
  - Recorded current RadCN package/docs/fixture coverage and missing proof
    surfaces.
- `issues/0004-complete-shadcn-parity-and-docs/README.md`
  - Added learnings for the form example parity map and next recommended
    implementation cluster.

Verification:

- `issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md`
  exists and maps all 30 upstream form examples listed in the parity inventory.
- `test "$(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md | sort -u | wc -l | tr -d ' ')" = "30"`
  — Pass.
- `diff -u <(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md | sort -u) <(rg -o "form-(rhf|next|tanstack|formisch)-[a-z0-9-]+" issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md | sort -u)`
  — Pass; no diff.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|react-hook-form|@tanstack/react-form|from ['\"]formisch['\"]|\"(react-hook-form|@tanstack/react-form|formisch|zod)\"\\s*:|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  — Pass; exited 1 with no matches.
- `git diff --check` — Pass.
- `git status --short` — Pass; only expected issue documentation changes are
  modified.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  — Pass; no output.

## Conclusion

The upstream form examples are mostly repeated demonstrations of app-owned
form-state libraries around the same shadcn field/control patterns. RadCN
should keep those libraries out of the package and prove parity through native
forms, explicit field wiring, server/action state, and package primitive
composition.

The next experiment should implement the missing Form example depth in docs,
candidate fixtures, and Playwright coverage: basic non-error form, textarea,
select, checkbox group, radio group, switch, repeated array/list fields,
password strength, complex multi-section form, and richer server/action state.

## Completion Review

Reviewer: Fermat (`019e9a28-2920-7961-9dd9-2f30c5f6df4b`)
Fresh context: yes (`fork_context: false`)

Findings:

- None.

Review result: approved with no blocker, major, or minor findings.
