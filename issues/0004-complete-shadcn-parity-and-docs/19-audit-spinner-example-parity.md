# Experiment 19: Audit spinner example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`spinner`. RadCN already exports `Spinner` as an accessible SVG status
indicator with a default `ariaLabel`, package styling hooks, CSS-variable
customization for size and color, docs seed coverage, and candidate fixture
coverage for default and custom-size spinners.

Upstream shadcn/ui has 10 Spinner example families that exercise a broader
example surface: standalone spinner usage, size changes, color changes, custom
spinner replacement, Button loading composition, Badge loading composition,
InputGroup loading composition, Empty loading composition, Item loading
composition, and Progress composition inside an Item loading row. The upstream
registry also includes `input-group-spinner`, which is an InputGroup example
using Spinner and LoaderIcon; that related example should be checked as
existing InputGroup evidence, but this experiment should keep the Spinner audit
focused on Spinner-owned behavior and Spinner composition gaps.

This experiment audits the upstream Spinner example surface before
implementation. It should identify which examples are already covered, which
need package/docs/test depth, and which React-only, lucide-only, or
presentation mechanics should map to Remix 3 web-first behavior. It must not
implement new package APIs.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md`.
  - List all 10 upstream Spinner example ids:
    `spinner-badge`, `spinner-basic`, `spinner-button`, `spinner-color`,
    `spinner-custom`, `spinner-demo`, `spinner-empty`,
    `spinner-input-group`, `spinner-item`, and `spinner-size`.
  - For each example, record user-facing behavior, current RadCN evidence,
    outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Record mapping decisions for lucide `LoaderIcon`/`Loader2Icon`, React SVG
    component props, Tailwind `size-*` and `text-*` utility customization,
    custom spinner replacement, loading text, disabled Button composition,
    Badge composition, InputGroup composition, Empty composition, Item
    composition, Progress composition, accessible status names, reduced-motion
    considerations if relevant, and whether Spinner needs package props for
    size/color or should keep those as class/style/CSS-variable customization.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/spinner.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/spinner-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/input-group-spinner.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/spinner.tsx`
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/packages/radcn/src/components/badge.tsx`
  - `radcn/packages/radcn/src/components/input-group.tsx`
  - `radcn/packages/radcn/src/components/empty.tsx`
  - `radcn/packages/radcn/src/components/item.tsx`
  - `radcn/packages/radcn/src/components/progress.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/input-group.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
  - `radcn/fixtures/tests/navigation-collection.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `spinner-example-inventory.md` exists and contains exactly one table row for
  each upstream Spinner example id.
- A deterministic Node check proves all 10 upstream Spinner example ids appear
  exactly once in `spinner-example-inventory.md`.
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = ['spinner-badge','spinner-basic','spinner-button','spinner-color','spinner-custom','spinner-demo','spinner-empty','spinner-input-group','spinner-item','spinner-size']
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
  - standalone status spinner semantics;
  - accessible `role="status"` and `aria-label` behavior;
  - default loading label behavior;
  - size customization;
  - color customization;
  - custom spinner replacement;
  - Button loading composition with disabled buttons and loading text;
  - Badge loading composition;
  - InputGroup loading composition, including the related
    `input-group-spinner` example as prior InputGroup evidence;
  - Empty loading composition;
  - Item loading composition with secondary content;
  - Progress composition inside an Item loading row;
  - lucide icon package mapping;
  - React SVG component prop mapping;
  - Tailwind utility mapping to RadCN classes, styles, or CSS variables;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "spinner-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Spinner example id from the generated inventory.
- The audit treats React component props, lucide icons, Tailwind utility class
  names, or custom spinner replacement as mandatory RadCN package dependencies
  instead of mapping them to equivalent user-facing behavior.
- The audit marks `spinner` resolved without package/docs/fixture/test evidence
  for the full upstream example surface.
- The audit ignores the related `input-group-spinner` example when deciding
  whether InputGroup loading composition is already covered.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Kant (`019e9ab9-25fc-7372-858e-0155c07eae7d`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Kant confirmed the Issue 4 README links Experiment
19 as `Designed`, the experiment has the required sections, the scope is
audit-only and explicitly forbids package/docs/fixture/test implementation
changes, verification includes concrete pass/fail criteria and repo hygiene
checks, vendor paths are only inspected as read-only references, the upstream
Spinner example set matches the generated parity inventory and registry
evidence, and current git status showed only the issue README modification and
new experiment file.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md` as
an audit-only inventory for all 10 upstream Spinner examples:
`spinner-badge`, `spinner-basic`, `spinner-button`, `spinner-color`,
`spinner-custom`, `spinner-demo`, `spinner-empty`, `spinner-input-group`,
`spinner-item`, and `spinner-size`.

The inventory records each example's user-facing behavior, current RadCN
evidence, outcome, and required follow-up. It does not mark `spinner` resolved,
because the examples need package/docs/fixture/test depth beyond the current
primitive status coverage.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = ['spinner-badge','spinner-basic','spinner-button','spinner-color','spinner-custom','spinner-demo','spinner-empty','spinner-input-group','spinner-item','spinner-size']
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
spinner-badge: 1
spinner-basic: 1
spinner-button: 1
spinner-color: 1
spinner-custom: 1
spinner-demo: 1
spinner-empty: 1
spinner-input-group: 1
spinner-item: 1
spinner-size: 1
```

```text
rg -n "standalone|role=\"status\"|aria-label|Loading|size|color|custom spinner|Button loading|Badge|InputGroup|input-group-spinner|Empty|Item|Progress|lucide|React SVG|Tailwind|CSS variables|Playwright" issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: standalone status semantics, default accessible labels, size
customization, color customization, custom spinner replacement, Button loading
composition, Badge composition, InputGroup composition and related
`input-group-spinner` evidence, Empty composition, Item composition, Progress
composition, lucide icon mapping, React SVG prop mapping, Tailwind utility
mapping, CSS variable customization, and current RadCN evidence.

Additional verification:

```text
rg -n "spinner-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:334:  `spinner-example-inventory.md`. Spinner example parity is not complete yet:
```

`git diff --check` passed with no output. Before result recording,
`git status --short` showed only the expected issue documentation changes:

```text
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md
```

After result recording, the current pre-review status was:

```text
 M issues/0004-complete-shadcn-parity-and-docs/19-audit-spinner-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/spinner-example-inventory.md
```

The vendor cleanliness check printed no output.

## Conclusion

Spinner example parity is not complete yet. RadCN's primitive Spinner already
has good accessible status semantics and CSS-variable size/color
customization, but the docs and fixtures need broader example proof for the
full upstream Spinner surface. The next experiment should implement Spinner
example parity depth without adding React, lucide, Tailwind, or custom spinner
replacement as package dependencies.

## Completion Review

Reviewer: Hooke (`019e9abc-46eb-7ad0-b468-428dc39d9df4`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the first result record included a `git status --short` output that
  was accurate before appending the result, but inaccurate for the current
  completion-review state because it omitted the modified experiment file.
  Fixed by distinguishing the before-result-recording status from the current
  pre-review status and including the modified experiment file.
- Major: none.
- Minor: none.

Review result: approved after the blocker fix. Hooke confirmed the audit stayed
audit-only, no package/docs/fixture/test source files changed,
`git diff --check` passed, vendor worktrees were clean, the inventory contains
exactly one row for each of the 10 upstream Spinner example ids, the experiment
has `## Result` and `## Conclusion`, the Issue 4 README status is `Pass`,
later-work learnings are recorded, and the result commit had not been made
before review.

Re-review result: approved. Hooke confirmed the inaccurate status record was
resolved, no new blocker was introduced by the fix, `git diff --check` passed,
and current `git status --short` matched the recorded pre-review status.
