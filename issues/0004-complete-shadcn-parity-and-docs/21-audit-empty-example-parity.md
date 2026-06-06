# Experiment 21: Audit empty example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`empty`. RadCN already exports `Empty`, `EmptyHeader`, `EmptyMedia`,
`EmptyTitle`, `EmptyDescription`, and `EmptyContent`, and it has fixture
coverage for a default Empty state plus the `variant="icon"` media hook.
Spinner parity also added one Empty loading composition.

Upstream shadcn/ui has 7 Empty examples that exercise a broader example
surface: default project actions, multiple icon-only states, Avatar media,
Avatar group media, InputGroup search composition, outline/dashed empty
surfaces, and muted/background empty surfaces. The examples also use React
`asChild`, lucide icons, Tabler icons, Tailwind utility classes, remote GitHub
avatar images, links, Button composition, Kbd composition, and InputGroup
composition.

This experiment audits the upstream Empty example surface before
implementation. It should identify which examples are already covered, which
need package/docs/test depth, and which React-only, icon-package, utility
class, remote-image, or presentation mechanics should map to Remix 3 web-first
behavior. It must not implement new package APIs.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md`.
  - List all 7 upstream Empty example ids:
    `empty-avatar`, `empty-avatar-group`, `empty-background`, `empty-demo`,
    `empty-icon`, `empty-input-group`, and `empty-outline`.
  - For each example, record user-facing behavior, current RadCN evidence,
    outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Record mapping decisions for Avatar and AvatarGroup media composition,
    Button composition, link-like Button/asChild composition, InputGroup
    composition, Kbd composition, Empty outline/border styling, muted/background
    styling, icon media, lucide icons, Tabler icons, Tailwind utility classes,
    remote GitHub avatar images, and current RadCN package/docs/fixture/
    Playwright evidence.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/empty.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/empty-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/empty.tsx`
  - `radcn/packages/radcn/src/components/avatar.tsx`
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/packages/radcn/src/components/input-group.tsx`
  - `radcn/packages/radcn/src/components/kbd.tsx`
  - `radcn/packages/radcn/src/components/spinner.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`
  - `radcn/fixtures/tests/static-display.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `empty-example-inventory.md` exists and contains exactly one table row for
  each upstream Empty example id.
- A deterministic Node check proves all 7 upstream Empty example ids appear
  exactly once in `empty-example-inventory.md`.
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = ['empty-avatar','empty-avatar-group','empty-background','empty-demo','empty-icon','empty-input-group','empty-outline']
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
  - default Empty composition with media, title, description, multiple actions,
    and a link-like action;
  - icon media examples and representative icon grids;
  - Avatar media composition;
  - AvatarGroup/stacked avatar media composition;
  - InputGroup search composition inside Empty content;
  - Kbd composition inside InputGroup addons;
  - outline/dashed surface styling;
  - muted/background surface styling;
  - Button composition and link-style actions;
  - shadcn `asChild` mapping;
  - lucide icon package mapping;
  - Tabler icon package mapping;
  - Tailwind utility class mapping to RadCN classes, styles, or CSS variables;
  - remote GitHub avatar image mapping to local/static/app-owned image choices;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "empty-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Empty example id from the generated inventory.
- The audit treats React `asChild`, lucide icons, Tabler icons, Tailwind utility
  classes, or remote GitHub images as mandatory RadCN package dependencies
  instead of mapping them to equivalent user-facing behavior.
- The audit marks `empty` resolved without package/docs/fixture/test evidence
  for the full upstream example surface.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: Pauli (`019e9acd-fd02-7b41-8329-ccf4acc91875`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Pauli confirmed the design is linked from the Issue
4 README as `Designed`, has the required sections, stays audit-only, includes
concrete pass/fail checks, includes repo hygiene and vendor cleanliness checks,
and explicitly prevents treating `asChild`, icon packages, Tailwind utilities,
remote GitHub images, vendor imports, or npm publishing as required RadCN
dependencies.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md` as an
audit-only inventory for all 7 upstream Empty examples: `empty-avatar`,
`empty-avatar-group`, `empty-background`, `empty-demo`, `empty-icon`,
`empty-input-group`, and `empty-outline`.

The inventory records each example's user-facing behavior, current RadCN
evidence, outcome, and required follow-up. It does not mark `empty` resolved,
because the examples need package/docs/fixture/test depth beyond the current
primitive coverage.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = ['empty-avatar','empty-avatar-group','empty-background','empty-demo','empty-icon','empty-input-group','empty-outline']
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
empty-avatar: 1
empty-avatar-group: 1
empty-background: 1
empty-demo: 1
empty-icon: 1
empty-input-group: 1
empty-outline: 1
```

```text
rg -n "default Empty|multiple action|link-style|icon grid|Avatar|AvatarGroup|InputGroup|Kbd|outline|dashed|muted|background|Button|asChild|lucide|Tabler|Tailwind|remote GitHub|local/static|Playwright" issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: default multi-action Empty composition, icon grids, Avatar media,
stacked Avatar media, InputGroup search composition, Kbd addon composition,
outline/dashed styling, muted/background styling, Button composition,
link-style actions, shadcn `asChild`, lucide icons, Tabler icons, Tailwind
utilities, remote GitHub avatar images, local/static/app-owned image mapping,
and current RadCN package/docs/fixture/Playwright evidence.

Additional verification:

```text
rg -n "empty-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:363:  `empty-example-inventory.md`. Empty example parity is not complete yet: RadCN
```

`git diff --check` passed with no output. Before result recording,
`git status --short` showed only the expected issue documentation changes:

```text
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md
```

After result recording, the current pre-review status was:

```text
 M issues/0004-complete-shadcn-parity-and-docs/21-audit-empty-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/empty-example-inventory.md
```

The vendor cleanliness check printed no output.

## Conclusion

Empty example parity is not complete yet. RadCN has the core Empty parts and
basic fixture coverage, but the docs and fixtures need broader example proof
for the full upstream Empty surface. The next experiment should implement Empty
example parity depth without adding React `asChild`, lucide, Tabler, Tailwind,
remote GitHub image, vendor, or npm publishing dependencies.

## Completion Review

Reviewer: Godel (`019e9ad1-e61a-7782-9b4e-07abe22af281`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Review result: approved. Godel confirmed the experiment file has `## Result`
and `## Conclusion`; the Issue 4 README marks Experiment 21 as `Pass` and
records the learning plus next Empty cluster; the inventory has exactly one
table row for each of the 7 upstream Empty ids; the upstream registry lists the
same 7 Empty examples; `git diff --check` passed; vendor cleanliness printed no
output; current `git status --short` shows only issue documentation changes and
the new inventory file; no package/docs app/fixture/test source files changed;
and the result commit had not been made before review.
