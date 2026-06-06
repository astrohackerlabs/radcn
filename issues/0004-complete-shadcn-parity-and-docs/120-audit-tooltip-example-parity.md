# Experiment 120: Audit tooltip example parity

## Description

The regenerated parity inventory after Experiment 119 recommends `tooltip` as
the final unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Tooltip example, `tooltip-demo`, registered as an example dependency
on `tooltip`.

RadCN already ships `radcn/tooltip` with dependency-free browser enhancement
for hover/focus opening, tooltip roles, trigger/content association, portal
movement, arrow rendering, placement, provider delay metadata, side offsets,
default-open rendering, and custom tokens. Current RadCN docs and fixtures
cover generic tooltip behavior, Kbd tooltip composition, InputGroup tooltip
composition, and positioned overlay behavior. This audit should determine
whether that existing evidence covers the exact direct upstream `tooltip-demo`,
or whether a named implementation experiment is needed.

The likely remaining gap is named docs/fixture/test evidence for the upstream
composition:

- `<Tooltip>`;
- `<TooltipTrigger asChild>`;
- `<Button variant="outline">Hover</Button>`;
- `<TooltipContent><p>Add to library</p></TooltipContent>`;
- upstream package mechanics: `"use client"`, React component props, Radix
  Tooltip primitives, `TooltipPrimitive.Provider`, `TooltipPrimitive.Root`,
  `TooltipPrimitive.Trigger`, `TooltipPrimitive.Portal`,
  `TooltipPrimitive.Content`, `TooltipPrimitive.Arrow`, provider
  `delayDuration = 0`, content `sideOffset = 0`, `data-slot`, `data-state`,
  `data-side`, `className`, Tailwind utilities, `cn`, portal behavior, arrow
  styling, hover/focus behavior, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/tooltip-example-inventory.md`.
  - List direct upstream Tooltip example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["tooltip"]`, and cross-check those entries
    against `examples/tooltip*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/tooltip-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/tooltip.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `tooltip-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency,
    Button-as-child mapping, provider/default delay mapping, content side
    offset mapping, portal behavior, arrow rendering, `className`, Tailwind
    utility mapping, `cn`, `data-slot`, `data-state`, `data-side`,
    hover/focus behavior, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 120 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `tooltip-example-inventory.md` exists and has:
  - `# Tooltip Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `tooltip-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Tooltip example
  cluster count is exactly one by the direct tooltip filename-prefix and
  `registryDependencies: ["tooltip"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.
- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up.
- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, React component props, Radix Tooltip primitive,
  `TooltipPrimitive.Provider`, `TooltipPrimitive.Root`,
  `TooltipPrimitive.Trigger`, `TooltipPrimitive.Portal`,
  `TooltipPrimitive.Content`, `TooltipPrimitive.Arrow`,
  `delayDuration = 0`, `sideOffset = 0`, `TooltipTrigger asChild`,
  `Button variant="outline"`, trigger text `Hover`, content text
  `Add to library`, `data-slot`, `data-state`, `data-side`, `className`,
  Tailwind utilities, `cn`, portal behavior, arrow rendering, hover behavior,
  focus behavior, custom tokens, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/tooltip.tsx`;
  - `radcn/packages/radcn/src/utils/positioned-overlay.ts`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`;
  - `radcn/fixtures/tests/positioned-overlays.spec.ts`;
  - related composition evidence in
    `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`,
    `radcn/fixtures/tests/static-display.spec.ts`,
    `radcn/fixtures/candidate-remix/app/fixtures/input-group.tsx`, and
    `radcn/fixtures/tests/form-input-cluster.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 120 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Tooltip audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 120|tooltip-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git diff --exit-code -- pnpm-lock.yaml`
- A deterministic tracked-vendor-source check proves the RadCN repository only
  tracks `vendor/.gitignore` under `vendor`.
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits exact upstream trigger text, content text, Button outline
  variant, asChild trigger composition, provider delay, content side offset,
  portal, arrow, hover/focus behavior, or mechanics listed above.
- The audit marks `tooltip-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream `Hover` outline Button and
  `Add to library` tooltip composition, unless existing evidence already
  proves that composition.
- The audit treats generic tooltip behavior, Kbd tooltip composition,
  InputGroup tooltip composition, or chart tooltip evidence as sufficient
  direct `tooltip-demo` proof.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Curie the 3rd (`019e9efd-5b46-7763-91ef-8d988a5350a3`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 120 as
`Designed`, the experiment has the required `Description`, `Changes`,
`Verification`, and `Design Review` sections, verification includes concrete
pass/fail criteria and hygiene checks, vendor cleanliness is planned, the
generated inventory lists `tooltip` as the only unresolved example cluster,
upstream registry/source evidence matches `tooltip-demo`, and no
implementation work has started before the plan commit.
