# Experiment 49: Migrate Breadcrumb + Pagination together to Tailwind utilities

## Description

Breadcrumb and Pagination SHARE their base rules (combined selectors
`.radcn-breadcrumb-list, .radcn-pagination-content`; `-item`; `-link`;
`-link:hover`; `.radcn-breadcrumb-page, .radcn-pagination-link--active`;
`.radcn-breadcrumb-separator, .radcn-breadcrumb-ellipsis, .radcn-pagination-ellipsis`).
Per the Exp-39 sibling pattern, migrate BOTH together so the shared rules are
fully removed (each component emits its own utilities). Both are per-element (no
parent→child cascade), neither imports Button. Breadcrumb keeps the
`radcn-breadcrumb-truncate` class as a style-less MARKER (the suite locates by it).

### Shared base (each component emits its own copy)

- list/content: `flex flex-wrap items-center gap-2 m-0 p-0 list-none
  text-muted-foreground text-[0.875rem] leading-[1.4] [font-family:var(--radcn-font)]`.
- item: `inline-flex items-center gap-1.5`.
- link: `inline-flex items-center justify-center min-h-8 rounded-md text-inherit
  no-underline outline-none hover:text-foreground`.
- page (breadcrumb) / link--active (pagination): `text-foreground font-medium`.
- separator/ellipsis: `inline-flex min-w-6 min-h-6 items-center justify-center
  text-muted-foreground` (1.5rem→min-w-6/min-h-6).

### Breadcrumb-specific (component-emitted — MIGRATE)

- root (`<nav data-radcn-breadcrumb>`): no style rule (color comes from the consumer
  fixture); drop the `radcn-breadcrumb` class, keep `data-radcn-breadcrumb`.
- list (`<ol>`): the shared list utilities.
- item / link / page: the shared utilities.
- separator: shared separator + `text-[length:var(--radcn-breadcrumb-separator-size,1rem)]
  leading-none`.
- ellipsis: shared separator + `rounded-md tracking-normal` (letter-spacing:0).

### Breadcrumb raw-class API (NOT component-emitted — KEEP BESPOKE)

REVISED after design review: `BreadcrumbTrigger`/`-glyph`/`-truncate`/
`-responsive-desktop`/`-responsive-mobile`/`-drawer-links` are NOT emitted by the
breadcrumb component — the fixture (`navigation-collection.tsx`) and docs
(`content/components.tsx`) apply these as RAW classes to demonstrate responsive
breadcrumb composition (trigger on a DropdownMenu/Drawer trigger, glyph as a
separator child, truncate on a link/page, the responsive desktop/mobile + drawer
layout). They are a consumed styling API (the Exp-37/47 raw-class lesson), so
their rules — `.radcn-breadcrumb-trigger` (+ `:hover`/`:focus-visible`),
`.radcn-breadcrumb-glyph`, `.radcn-breadcrumb-truncate`,
`.radcn-breadcrumb-responsive-desktop`/`-mobile`, `.radcn-breadcrumb-drawer-links`,
AND both `@media` blocks (`max-width:767px` toggling responsive-desktop/mobile;
`min-width:768px` resetting `truncate` max-width) — are KEPT bespoke. (This is why
`:54`'s `.radcn-breadcrumb-truncate` `overflow:hidden` holds — the rule stays.)

### Pagination-specific

- nav (`.radcn-pagination`): `flex w-full justify-center [font-family:var(--radcn-font)]`.
- content (`<ul>`): the shared list utilities.
- item / ellipsis: the shared utilities.
- link: the shared link utilities + `min-w-8 px-2.5` (2rem→min-w-8; 0 0.625rem→px-2.5).
- link--active: the shared link utilities + the active utilities (`text-foreground
  font-medium`) + `border border-border bg-background`.
- previous/next: the shared link utilities + `gap-1.5`.

All shared + breadcrumb + pagination `.radcn-*` rules are removed (both fully
migrated), including the duplicate `.radcn-pagination-link` definition. The
`.radcn-fixture-custom-breadcrumb` fixture (root `color: #0f766e`) is unchanged.

## Why both suites stay green

- The custom breadcrumb color `rgb(15,118,110)` (navigation-collection:16) is on
  the ROOT via the fixture class (unaffected — the root has no color utility); the
  list's `text-muted-foreground` matches the original (overriding the inherited
  custom color for the list, as before).
- The `.radcn-breadcrumb-truncate` `overflow:hidden` (:54) holds via the retained
  marker + the `overflow-hidden` utility.
- Pagination is exercised structurally (data attributes, roles); the active
  link's border/bg + the link min-width/padding + prev/next gap reproduce exactly.
- `text-muted-foreground`/`text-foreground`/`border-border`/`bg-background` resolve
  via the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/breadcrumb.tsx`: emit utility-const strings
  for list/item/link/page/separator/ellipsis only (the component-emitted surfaces);
  drop the `radcn-breadcrumb` root + those `radcn-breadcrumb-*` classes; keep all
  data attributes. (The trigger/glyph/truncate/responsive/drawer raw-class API is
  NOT touched — the component never emitted it.)
- `radcn/packages/radcn/src/components/pagination.tsx`: emit utility-const strings
  for nav/content/item/link(+active)/previous/next/ellipsis; drop the
  `radcn-pagination-*` classes (`--active` folded into a conditional utility
  string — not asserted); keep data attributes.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the shared rules + the
  component-emitted breadcrumb rules (list/item/link/hover/page/separator/ellipsis)
  + all pagination rules (incl. the duplicate pagination-link); KEEP the breadcrumb
  RAW-CLASS API rules (trigger/glyph/truncate/responsive-desktop/-mobile/
  drawer-links + BOTH `@media` blocks) and `.radcn-fixture-custom-breadcrumb`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

ASCII/token-free comments.

## Verification

1. Both `styles:build` exit 0; the `max-[767px]:`, `text-[length:var(…)]`,
   `min-w-6` utilities compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-breadcrumb-*`/`.radcn-pagination-*` rule
   remains (the `radcn-breadcrumb-truncate` marker is now style-less); the custom
   fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `navigation-collection.spec.ts`
   (breadcrumb: custom color `rgb(15,118,110)`, the `.radcn-breadcrumb-truncate`
   `overflow:hidden`, separators, the parity depth; pagination: structure, active
   page, prev/next, ellipsis).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Breadcrumb + Pagination render from Tailwind utilities (only the
`radcn-breadcrumb-truncate` marker remains, style-less); the custom color +
truncate + active/prev/next + separators hold; BOTH suites green; byte-identical.

Fail criteria: the custom color, truncate, or an active/link assertion regresses;
the responsive toggle drifts; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Breadcrumb + Pagination migrated; both suites green. Verification:

1. Both `styles:build` exit 0; no junk ellipsis (0); the `max-[767px]:`,
   `text-[length:var(…)]`, `min-w-6` utilities compile.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; ZERO shared/component breadcrumb/
   pagination rules remain; the breadcrumb raw-class API (trigger/glyph/truncate/
   responsive-*/drawer-links + BOTH `@media` blocks) + `.radcn-fixture-custom-breadcrumb`
   retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `navigation-collection.spec.ts` in isolation
   **9 passed** — incl. the breadcrumb custom color `rgb(15,118,110)`, the
   `.radcn-breadcrumb-truncate` `overflow:hidden` (kept bespoke), separators, the
   parity depth; pagination structure, active page, prev/next, ellipsis.
6. `git diff --check` clean; `vendor/` untouched; the four expected files changed.

No deviations from the (review-corrected) design.

## Conclusion

Breadcrumb + Pagination are migrated: the component-emitted surfaces (list/content,
item, link, page, separator, ellipsis, nav, active, prev/next) render from Tailwind
utilities; the shared rules are fully removed (both migrated together); the
breadcrumb raw-class layout API (trigger/glyph/truncate/responsive/drawer +
`@media`) stays bespoke (consumed directly by fixtures+docs). THIRTY-NINE
components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- A component's bespoke CSS can mix component-EMITTED classes (migrate to utilities)
  with a consumer-facing RAW-class layout API the component never emits
  (fixtures/docs apply it). Grep the component AND the fixtures/docs: migrate only
  the emitted surfaces; keep the raw-class API bespoke (the Exp-37/47 lesson, here
  for breadcrumb trigger/glyph/truncate/responsive/drawer + their `@media` blocks).
- Sibling components sharing combined base rules (Breadcrumb + Pagination, like
  Checkbox + Radio) migrate together so the shared rules fully drop.

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source + fixtures + docs).

Findings: the reviewer's SUBSTANTIVE mapping checks all PASSED (the shared-rule
removal, the gap/size/weight/color values, the `text-[length:var(…)]` separator,
the `tracking-normal`/`size-4` mappings, the custom-color root, no third-party
reuse). It returned a correct BLOCKER: the original design tried to migrate
`trigger`/`glyph`/`truncate`/`responsive-desktop`/`-mobile`/`drawer-links` to
component utilities, but those are NOT emitted by the breadcrumb component — the
fixture + docs apply them as RAW classes (verified:
`navigation-collection.tsx:103/107/113/216/219/221/229/240/243`,
`content/components.tsx:2249`), and there is a SECOND `@media (min-width:768px)`
truncate-reset the design missed.

Resolution (design revised): those six classes + BOTH `@media` blocks are a
consumed raw-class styling API (the Exp-37/47 lesson) — KEPT bespoke, NOT
migrated. Only the component-emitted surfaces (breadcrumb list/item/link/page/
separator/ellipsis + all pagination surfaces) migrate; the shared rules are fully
removed (both migrated together). The `:54` `.radcn-breadcrumb-truncate`
`overflow:hidden` holds because that rule stays bespoke.

Approval result: approved (with the corrected scope) — the shared-rule
together-migration is sound; the breadcrumb raw-class layout API stays bespoke.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed breadcrumb.tsx emits utility-const strings for
list/item/link/page/separator/ellipsis (root `radcn-breadcrumb` dropped,
`data-radcn-breadcrumb` kept; trigger/glyph/truncate/responsive/drawer NOT in the
component); pagination.tsx emits utilities for nav/content/item/link(+active)/
prev(`gap-1.5`)/next/ellipsis. tokens.css has ZERO shared + component breadcrumb +
pagination rules, while the breadcrumb RAW-CLASS API is KEPT bespoke — `.radcn-breadcrumb-trigger`
(+`:hover`/`:focus-visible`), `-glyph`, `-truncate` (`overflow:hidden`),
`-responsive-desktop`/`-mobile`, `-drawer-links`, AND BOTH `@media` blocks
(`max-width:767px` + `min-width:768px`) — plus the custom fixture. byte-identical
`index.ts`; no junk. It re-ran the three typechecks, the docs suite (11),
`navigation-collection.spec.ts` (9 — custom color `rgb(15,118,110)`, truncate
`overflow:hidden`, separators, pagination), and the full fixture suite (1191).
Verdict: APPROVED.

Approval result: approved with no blockers — Breadcrumb + Pagination migrated (39
components).
