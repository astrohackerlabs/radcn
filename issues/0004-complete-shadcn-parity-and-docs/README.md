+++
status = "open"
opened = "2026-06-05"
+++

# Issue 4: Complete shadcn/ui Parity and Docs

## Goal

Complete RadCN's shadcn/ui parity for Remix 3: every shadcn component, helper,
recipe, block, and meaningful example should either exist in RadCN with
equivalent user-facing functionality or be explicitly documented as not
applicable to Remix 3 with a defensible reason.

The documentation website should become the proof surface for that parity. It
must show the completed RadCN APIs, explain Remix 3 divergences, and keep
installation copy aspirational until a later npm publishing issue makes the
package installable.

## Background

Issues 2 and 3 produced the first full RadCN component port and a polished Remix
3 documentation site. The current docs honestly mark `form`, `date-picker`, and
`data-table` as `not-shipped-yet` because they are not current `radcn/*` package
exports.

That is enough for a first docs site, but it is not enough for a completed RadCN
product. The project now needs a parity pass against the vendored shadcn/ui
source so missing surfaces are implemented deliberately instead of remaining
implicit gaps.

Primary local references:

- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/` — shadcn/ui v4 component
  source of truth for the New York style.
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/blocks/` — shadcn blocks that
  may map to RadCN blocks, recipes, or docs-only examples.
- `vendor/shadcn-ui/apps/v4/registry/new-york-v4/charts/` — chart examples and
  variants that may exceed the current RadCN `chart` primitive.
- `vendor/shadcn-ui/apps/v4/registry.json` and registry index files — metadata
  for the upstream registry surface.
- `radcn/packages/radcn/` — current RadCN package exports and implementation.
- `radcn/apps/docs/` — current RadCN docs site and component registry.
- `issues/0002-implement-entire-shadcn-port/` — prior implementation evidence
  and divergence records.
- `issues/0003-build-radcn-documentation-site/` — docs architecture,
  installation-scope decisions, and final docs-site verification.

Vendor checkouts are references only. Do not make RadCN code depend on
`vendor/`, and do not commit vendored source.

## Scope

This issue includes:

- auditing the complete current vendored shadcn/ui v4 registry surface;
- comparing shadcn components, helpers, blocks, recipes, and examples against
  RadCN package exports and docs pages;
- implementing missing RadCN package APIs where a reusable package surface makes
  sense for Remix 3;
- implementing recipe/block documentation where a package export does not make
  sense;
- completing the currently missing `form`, `date-picker`, and `data-table`
  outcomes;
- expanding examples and tests so RadCN behavior is visually equivalent and
  modifiable in the same way as shadcn/ui where that comparison makes sense;
- updating the docs site so completed APIs no longer appear as
  `not-shipped-yet`;
- recording all intentional divergences from shadcn/ui in the issue learnings
  and docs pages.

This issue does not include:

- publishing RadCN to npm;
- making external `pnpm add radcn` installation work;
- replacing Remix 3 web-first APIs with React-only shadcn implementation
  details;
- treating DOM equivalence as required when visual behavior, accessibility, and
  author-facing customization are equivalent.

## Analysis

Parity means user-facing capability, not mechanical React translation.

For each upstream shadcn surface, experiments should decide:

- **Package component:** reusable and appropriate as `radcn/<slug>`.
- **Helper:** package utility or event API, such as toast helpers.
- **Recipe:** documented composition of RadCN primitives, not necessarily a new
  package export.
- **Block:** larger application pattern that belongs in docs and examples, and
  may later become copyable/generated code.
- **Not applicable:** intentionally omitted because the shadcn behavior depends
  on React-only semantics or a product assumption that does not fit Remix 3.

The first experiment should not start by implementing components. It should
produce a parity inventory generated from the vendored shadcn registry and the
current RadCN export map, then identify the first coherent implementation
cluster. Later experiments should implement one coherent cluster at a time and
record discoveries needed by later clusters in `## Learnings`.

The docs website remains the public verification surface. When a component or
block becomes complete, its docs page should render a real RadCN example,
include representative source, describe installation/import intent, and explain
accessibility, customization, and Remix 3 divergence details.

Installation instructions must stay aspirational while RadCN is private and not
published to npm. Docs may show the intended future command, but they must not
claim external users can install the package today.

## Completion Criteria

This issue is complete when:

- the vendored shadcn/ui v4 registry has been audited and mapped to RadCN
  outcomes;
- every shadcn component/helper/recipe/block has a RadCN outcome: shipped
  package API, docs recipe/block, or documented not-applicable divergence;
- `form`, `date-picker`, and `data-table` are no longer unexplained gaps;
- all implemented RadCN package surfaces have package exports, TypeScript
  coverage, docs pages, live docs examples, and Playwright coverage where
  rendered behavior matters;
- docs clearly identify recipes/blocks that are not package imports;
- docs installation copy remains aspirational and says RadCN is not published to
  npm yet;
- no RadCN package or app code depends on `vendor/`;
- verification includes package typecheck, docs typecheck, docs Playwright
  coverage, relevant fixture/artifact coverage, vendor cleanliness checks, and
  no-publish/no-vendor scope checks;
- the issue is reviewed through the issue/experiment workflow and closed with a
  conclusion.

## Learnings

Record cross-component discoveries here as experiments complete.

- Experiment 1 generated `parity-inventory.md` from local source files. The
  current vendored shadcn/ui v4 New York registry has 57 UI items, 244 examples,
  27 blocks, and 70 chart examples. RadCN currently has 57 public package
  subpaths and 60 docs routes.
- `form` is the only upstream shadcn `ui/` item that is not a current RadCN
  package export. It is documented today as a docs-only gap.
- `date-picker` and `data-table` are not upstream `ui/` package components in
  the v4 registry; they appear as examples/block outcomes and remain RadCN
  docs-only gaps.
- `typography` is a RadCN package export without an upstream `ui/` counterpart,
  but the upstream registry has typography examples. Treat it as a recipe/API
  parity surface, not a missing upstream component.
- The first recommended implementation cluster is form parity and Remix 3 form
  recipes, because form is the only missing upstream UI package API and later
  date-picker/data-table/block work depends on a stable form story.

## Experiments

- [Experiment 1: Build shadcn parity inventory](01-build-shadcn-parity-inventory.md)
  — **Pass**
- [Experiment 2: Ship Remix-native form parity](02-ship-remix-native-form-parity.md)
  — **Designed**
