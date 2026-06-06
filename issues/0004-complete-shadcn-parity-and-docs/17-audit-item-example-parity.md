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
