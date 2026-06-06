# Experiment 23: Audit toggle-group example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`toggle-group`. RadCN already exports `ToggleGroup`, `ToggleGroupItem`, and
`enhanceToggleGroup`, and existing fixtures prove single selection, multiple
selection, disabled item behavior, vertical keyboard navigation, and custom
token hooks.

Upstream shadcn/ui has 7 Toggle Group examples that exercise a broader example
surface: icon-only formatting groups, single and multiple groups, group-level
disabled state, group-level small and large sizing, outline variants, spacing
between grouped items, icon+label items, lucide icons, Tailwind size utilities,
and Tailwind `data-state` selectors for colored selected icons.

This experiment audits the upstream Toggle Group example surface before
implementation. It should identify which examples are already covered, which
need package/docs/test depth, and which React-only, Radix, icon-package,
utility-class, or presentation mechanics should map to Remix 3 web-first
behavior. It must not implement new package APIs.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md`.
  - List all 7 upstream Toggle Group example ids:
    `toggle-group-demo`, `toggle-group-disabled`, `toggle-group-lg`,
    `toggle-group-outline`, `toggle-group-single`, `toggle-group-sm`, and
    `toggle-group-spacing`.
  - For each example, record user-facing behavior, current RadCN evidence,
    outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Record mapping decisions for group-level `variant`, group-level `size`,
    group-level `disabled`, `spacing`, icon-only controls, icon+label controls,
    `aria-label`, single vs multiple selection, lucide icons, Tailwind size
    utilities, Tailwind `data-state` selectors, Radix ToggleGroup behavior,
    keyboard behavior, and current RadCN package/docs/fixture/Playwright
    evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/toggle-group.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/toggle-group-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/toggle-group.tsx`
  - `radcn/packages/radcn/src/components/toggle.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/toggle.tsx`
  - `radcn/fixtures/candidate-remix/app/assets/entry.ts`
  - `radcn/fixtures/tests/toggle.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `toggle-group-example-inventory.md` exists and contains exactly one table row
  for each upstream Toggle Group example id.
- A deterministic Node check proves all 7 upstream Toggle Group example ids
  appear exactly once in `toggle-group-example-inventory.md`.
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = ['toggle-group-demo','toggle-group-disabled','toggle-group-lg','toggle-group-outline','toggle-group-single','toggle-group-sm','toggle-group-spacing']
  let failed = false
  for (const id of ids) {
    const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
    const count = (text.match(pattern) || []).length
    console.log(`${id}: ${count}`)
    if (count !== 1) failed = true
  }
  if (failed) process.exit(1)
  NODE
  ```
- The inventory distinguishes current evidence from follow-up work and does not
  mark the cluster resolved unless every upstream example is `Covered` or
  `Intentional divergence`.
- The inventory explicitly addresses:
  - multiple-selection icon-only formatting controls;
  - single-selection icon-only formatting controls;
  - group-level disabled state;
  - disabled item behavior already covered by RadCN;
  - group-level small and large sizing;
  - item-level size mapping if group-level size remains intentionally
    divergent;
  - group-level outline variant;
  - item-level variant mapping if group-level variant remains intentionally
    divergent;
  - spacing between grouped items;
  - icon+label spacing examples;
  - `aria-label` for icon-only ToggleGroupItems;
  - selected state hooks, `aria-pressed`, `data-state`, and `data-value`;
  - keyboard focus and orientation behavior;
  - lucide icon package mapping;
  - Tailwind `h-4 w-4` / state selector mapping to RadCN classes, styles, or
    CSS variables;
  - Radix ToggleGroup dependency mapping;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "toggle-group-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Toggle Group example id from the generated
  inventory.
- The audit treats React, Radix ToggleGroup, lucide icons, Tailwind utility
  classes, or Tailwind `data-state` selectors as mandatory RadCN package
  dependencies instead of mapping them to equivalent user-facing behavior.
- The audit marks `toggle-group` resolved without package/docs/fixture/test
  evidence for the full upstream example surface.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Sartre (`019e9ae3-2a9e-7931-b7b7-4af05b4a49bd`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Sartre confirmed the design is linked from the
Issue 4 README as `Designed`, has the required sections, stays audit-only,
includes concrete pass/fail checks, includes repo hygiene and vendor
cleanliness checks, and covers all requested Toggle Group risk areas:
group-level disabled/size/variant/spacing, icon-only and icon+label examples,
`aria-label`, selected state hooks, keyboard/orientation behavior,
lucide/Tailwind/Radix mappings, and current package/docs/fixture/Playwright
evidence.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md`
as an audit-only inventory for all 7 upstream Toggle Group examples:
`toggle-group-demo`, `toggle-group-disabled`, `toggle-group-lg`,
`toggle-group-outline`, `toggle-group-single`, `toggle-group-sm`, and
`toggle-group-spacing`.

The inventory records each example's user-facing behavior, current RadCN
evidence, outcome, and required follow-up. It does not mark `toggle-group`
resolved, because the examples need package/docs/fixture/test depth beyond the
current primitive coverage.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = ['toggle-group-demo','toggle-group-disabled','toggle-group-lg','toggle-group-outline','toggle-group-single','toggle-group-sm','toggle-group-spacing']
let failed = false
for (const id of ids) {
  const pattern = new RegExp('\\| `'+id+'` \\|', 'g')
  const count = (text.match(pattern) || []).length
  console.log(`${id}: ${count}`)
  if (count !== 1) failed = true
}
if (failed) process.exit(1)
NODE
```

Output:

```text
toggle-group-demo: 1
toggle-group-disabled: 1
toggle-group-lg: 1
toggle-group-outline: 1
toggle-group-single: 1
toggle-group-sm: 1
toggle-group-spacing: 1
```

```text
rg -n "multiple-selection|single-selection|group-level disabled|disabled item|small|large|outline variant|item-level variant|spacing|icon\\+label|aria-label|aria-pressed|data-state|data-value|keyboard|orientation|lucide|Tailwind|Radix|Playwright" issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: multiple-selection icon-only groups, single-selection icon-only groups,
group-level disabled behavior, disabled item behavior, small and large sizing,
group-level outline variants, item-level size/variant mapping, spacing,
icon+label examples, `aria-label`, `aria-pressed`, `data-state`, `data-value`,
keyboard focus, orientation, lucide icons, Tailwind utility/state selector
mapping, Radix ToggleGroup mapping, and current RadCN
package/docs/fixture/Playwright evidence.

Additional verification:

```text
rg -n "toggle-group-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:392:  `toggle-group-example-inventory.md`. Toggle Group example parity is not
```

`git diff --check` passed with no output. `git status --short` showed only the
expected issue documentation changes:

```text
 M issues/0004-complete-shadcn-parity-and-docs/23-audit-toggle-group-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/toggle-group-example-inventory.md
```

The vendor cleanliness check printed no output.

## Conclusion

Toggle Group example parity is not complete yet. RadCN has strong primitive
coverage for single/multiple state, selected hooks, roving focus, disabled item
skip behavior, vertical orientation, and custom tokens, but the docs and
fixtures need broader example proof for the full upstream Toggle Group
surface. The next experiment should implement Toggle Group example parity
depth and decide whether group-level `size`, `variant`, `disabled`, and
`spacing` should become narrow RadCN APIs or documented item-level/style
mappings.

## Completion Review

Reviewer: Franklin (`019e9ae6-3993-74b1-a6a6-d294859e5e66`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: the recorded `git status --short` output was inaccurate after adding
  `## Result` and `## Conclusion`; it omitted the modified experiment file.
  Fixed by updating the recorded status output to include
  `23-audit-toggle-group-example-parity.md`, `README.md`, and the new
  `toggle-group-example-inventory.md`.
- Minor: none.

Review result: approved. Franklin confirmed all 7 upstream Toggle Group
examples are represented exactly once; the inventory keeps `toggle-group`
unresolved; group-level disabled/size/variant/spacing plus
lucide/Tailwind/Radix mappings are addressed; only issue documentation is
changed; `git diff --check` and vendor cleanliness checks pass; and the result
commit had not been made before review.

Re-review result: approved. Franklin confirmed the recorded
`git status --short` output now includes all three expected paths and that the
completion-review section accurately records the prior Major finding, the fix,
and the approval result. No new blocker was introduced.
