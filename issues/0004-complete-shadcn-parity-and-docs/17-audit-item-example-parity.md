# Experiment 17: Audit item example parity

## Description

The regenerated Issue 4 parity inventory now recommends example parity for
`item`. RadCN already exports `ItemGroup`, `Item`, `ItemMedia`, `ItemContent`,
`ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, and
`ItemSeparator`, and it has fixture coverage for a default item, variants,
sizes, media hooks, headers, footers, and separators.

Upstream shadcn/ui has 10 Item examples that exercise a broader example
surface: basic item composition, size and variant matrices, icon media, image
media, Avatar composition, ItemGroup lists with separators, header image cards,
DropdownMenu item composition, and link-like items through React `asChild`.

This experiment audits that upstream example surface before implementation. It
should identify which examples are already covered, which need package/docs/test
depth, and which React-only, Next-only, or presentation mechanics should map to
Remix 3 web-first behavior. It must not implement new package APIs.

## Changes

- Create
  `issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md`.
  - List all 10 upstream Item example ids:
    `item-avatar`, `item-demo`, `item-dropdown`, `item-group`,
    `item-header`, `item-icon`, `item-image`, `item-link`, `item-size`, and
    `item-variant`.
  - For each example, record user-facing behavior, current RadCN evidence,
    outcome, and follow-up.
  - Use outcomes `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - Record mapping decisions for shadcn `asChild`/Radix Slot, React fragments
    and arrays, Next `Image`, external image sources, lucide icon packages,
    Avatar composition, Button composition, DropdownMenu composition, anchor
    link semantics, grouped list semantics, header/footer slots, separators,
    item sizes, item variants, and media variants.
- Inspect these upstream references:
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/item.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/item-*.tsx`
  - `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
- Inspect current RadCN evidence:
  - `radcn/packages/radcn/src/components/item.tsx`
  - `radcn/packages/radcn/src/components/avatar.tsx`
  - `radcn/packages/radcn/src/components/button.tsx`
  - `radcn/packages/radcn/src/components/dropdown-menu.tsx`
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/navigation-collection.tsx`
  - `radcn/fixtures/tests/navigation-collection.spec.ts`
- Update Issue 4 `README.md` learnings with the audit result and the next
  recommended implementation cluster.
- Do not change `radcn/packages/radcn`, docs app source, fixture app source, or
  tests in this experiment except for issue documentation.

## Verification

Pass criteria:

- `item-example-inventory.md` exists and contains exactly one table row for
  each upstream Item example id.
- A deterministic Node check proves all 10 upstream Item example ids appear
  exactly once in `item-example-inventory.md`.
  ```text
  node - <<'NODE'
  const fs = require('fs')
  const file = 'issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md'
  const text = fs.readFileSync(file, 'utf8')
  const ids = ['item-avatar','item-demo','item-dropdown','item-group','item-header','item-icon','item-image','item-link','item-size','item-variant']
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
  - basic item composition;
  - size variants;
  - visual variants;
  - icon media;
  - image media;
  - Avatar and AvatarGroup-style composition;
  - ItemGroup lists and ItemSeparator;
  - ItemHeader image/card composition;
  - DropdownMenu composition;
  - link-like items and anchor semantics;
  - Button and icon-button actions;
  - shadcn `asChild` and Radix Slot mapping;
  - React fragments/arrays mapping;
  - Next `Image` mapping;
  - external image source handling;
  - lucide icon package mapping;
  - current RadCN package/docs/fixture/Playwright evidence.
- `issues/0004-complete-shadcn-parity-and-docs/README.md` records the audit
  conclusion and the next recommended experiment.
- `rg -n "item-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md`
  finds the new learning.
- `git diff --check`
- `git status --short` shows only expected issue documentation changes before
  the plan/result commits.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream Item example id from the generated inventory.
- The audit treats React `asChild`, Radix Slot, Next `Image`, lucide icons, or
  upstream external image sources as mandatory RadCN package dependencies
  instead of mapping them to equivalent user-facing behavior.
- The audit marks `item` resolved without package/docs/fixture/test evidence
  for the full upstream example surface.
- The experiment changes package, docs app, fixture, or test source instead of
  staying an audit.

## Design Review

Reviewer: James (`019e9a9e-3a7a-7562-8e1b-2e64f0fac63e`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: the verification named a deterministic Node check but did not specify
  the exact command. Fixed by adding the concrete Node command that counts the
  10 expected Item ids and fails on missing or duplicated rows.

Approval result: approved. James confirmed the README links Experiment 17 as
`Designed`, the experiment has the required sections, scope is audit-only,
implementation is explicitly excluded, repo hygiene and vendor checks are
present, and the upstream Item surface is covered, including all 10 ids plus
`asChild`/Slot, fragments/arrays, Next Image, external images, lucide icons,
Avatar, Button, DropdownMenu, ItemGroup/Separator, header/footer/media/size/
variant/link semantics, and current RadCN evidence.

## Result

**Result:** Pass

Created
`issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md` as an
audit-only inventory for all 10 upstream Item examples: `item-avatar`,
`item-demo`, `item-dropdown`, `item-group`, `item-header`, `item-icon`,
`item-image`, `item-link`, `item-size`, and `item-variant`.

The inventory records each example's user-facing behavior, current RadCN
evidence, outcome, and required follow-up. It does not mark `item` resolved,
because the examples need package/docs/fixture/test depth beyond the current
primitive coverage.

Verification run:

```text
node - <<'NODE'
const fs = require('fs')
const file = 'issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md'
const text = fs.readFileSync(file, 'utf8')
const ids = ['item-avatar','item-demo','item-dropdown','item-group','item-header','item-icon','item-image','item-link','item-size','item-variant']
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
item-avatar: 1
item-demo: 1
item-dropdown: 1
item-group: 1
item-header: 1
item-icon: 1
item-image: 1
item-link: 1
item-size: 1
item-variant: 1
```

```text
rg -n 'item-avatar|item-demo|item-dropdown|item-group|item-header|item-icon|item-image|item-link|item-size|item-variant|asChild|Radix Slot|React fragments|Next `Image`|external image|lucide|Avatar|DropdownMenu|ItemGroup|ItemSeparator|ItemHeader|link-like|anchor|size|variant|media' issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md
```

Confirmed that the inventory addresses all required examples and mapping
topics: basic composition, sizes, variants, icon media, image media, Avatar and
stacked-avatar composition, ItemGroup lists, ItemSeparator, ItemHeader image
cards, DropdownMenu composition, link-like Items, anchor semantics, Button and
icon-button actions, shadcn `asChild`/Radix Slot, React fragments/arrays, Next
`Image`, external images, lucide icons, and current RadCN evidence.

Additional verification:

```text
rg -n "item-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git status --short
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

Observed output:

```text
issues/0004-complete-shadcn-parity-and-docs/README.md:307:  `item-example-inventory.md`. Item example parity is not complete yet: RadCN
```

`git diff --check` passed with no output. `git status --short` showed only the
expected issue documentation changes:

```text
 M issues/0004-complete-shadcn-parity-and-docs/17-audit-item-example-parity.md
 M issues/0004-complete-shadcn-parity-and-docs/README.md
?? issues/0004-complete-shadcn-parity-and-docs/item-example-inventory.md
```

The vendor status loop printed no output.

## Conclusion

Item parity is not resolved yet. RadCN has the base Item package API and
primitive fixture evidence, but upstream example parity requires a depth
implementation pass for link-like Items, Avatar media, stacked-avatar media,
DropdownMenu Item rows, image header cards, image row lists, secondary metadata
content, richer size and variant matrices, and icon-only Button actions.

The next experiment should implement Item example parity depth, then mark
`item` resolved only after docs, fixtures, Playwright coverage, and the
inventory prove all 10 upstream examples are covered or intentionally diverged.

## Completion Review

Reviewer: Herschel (`019e9aa1-e8c3-7713-88e1-ef3b0f975d87`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval result: approved. Herschel confirmed the experiment is audit-only,
the working tree only shows the expected issue documentation changes, the
result and conclusion are present, the README status is `Pass`, all 10
required Item ids appear exactly once as table rows, `git diff --check` passed,
vendor status checks printed no output, and the result commit had not been made
before review.
