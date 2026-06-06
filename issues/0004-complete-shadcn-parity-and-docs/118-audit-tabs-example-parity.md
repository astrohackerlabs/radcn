# Experiment 118: Audit tabs example parity

## Description

The regenerated parity inventory after Experiment 117 recommends `tabs` as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Tabs example, `tabs-demo`, registered as an example dependency on
`tabs`.

RadCN already ships `radcn/tabs` with dependency-free browser enhancement for
tablist semantics, default values, pointer activation, horizontal and vertical
keyboard navigation, manual activation, disabled triggers, custom tokens,
`data-state`, and ARIA associations. Current RadCN docs and fixtures cover
generic preview/code tabs, not the exact upstream Account/Password card form
demo.

This experiment should audit whether existing evidence covers the exact direct
upstream `tabs-demo`, or whether a named implementation experiment is needed.
The likely remaining gap is named docs/fixture/test evidence for the upstream
composition:

- wrapper `className="flex w-full max-w-sm flex-col gap-6"`;
- `Tabs defaultValue="account"`;
- `TabsTrigger value="account">Account</TabsTrigger>`;
- `TabsTrigger value="password">Password</TabsTrigger>`;
- Account panel with `Card`, `CardHeader`, `CardTitle`, `CardDescription`,
  `CardContent className="grid gap-6"`, two labelled fields, inputs
  `tabs-demo-name` default value `Pedro Duarte` and `tabs-demo-username`
  default value `@peduarte`, and footer button `Save changes`;
- Password panel with title `Password`, description copy, two password inputs
  `tabs-demo-current` and `tabs-demo-new`, and footer button `Save password`;
- upstream imports of `AppWindowIcon` and `CodeIcon` from `lucide-react`,
  which appear unused in the current upstream file and should be classified;
- upstream package mechanics: `"use client"`, React component props,
  Radix Tabs primitives, `TabsPrimitive.Root`, `TabsPrimitive.List`,
  `TabsPrimitive.Trigger`, `TabsPrimitive.Content`, `cva`, `VariantProps`,
  `tabsListVariants`, `data-slot`, `data-orientation`, `data-variant`,
  `data-state`, `className`, Tailwind utilities, `cn`, keyboard behavior,
  disabled behavior, default horizontal orientation, custom tokens, and vendor
  source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/tabs-example-inventory.md`.
  - List direct upstream Tabs example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["tabs"]`, and cross-check those entries against
    `examples/tabs*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/tabs-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/tabs.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `tabs-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency, cva
    non-dependency, native browser enhancement mapping, Account/Password card
    composition, form field/id/default-value mapping, password input mapping,
    unused lucide icon imports, `className`, Tailwind utility mapping, `cn`,
    `data-slot`, `data-orientation`, `data-variant`, `data-state`, keyboard/
    disabled/custom-token behavior, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 118 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `tabs-example-inventory.md` exists and has:
  - `# Tabs Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `tabs-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Tabs example cluster
  count is exactly one by the direct tabs filename-prefix and
  `registryDependencies: ["tabs"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.
- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up.
- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, `AppWindowIcon`, `CodeIcon`, lucide unused imports, React
  component props, Radix Tabs primitive, `TabsPrimitive.Root`,
  `TabsPrimitive.List`, `TabsPrimitive.Trigger`, `TabsPrimitive.Content`,
  `cva`, `VariantProps`, `tabsListVariants`, `defaultValue="account"`,
  `data-slot`, `data-orientation`, `data-variant`, `data-state`,
  `className`, Tailwind utilities, `cn`, keyboard behavior, disabled behavior,
  custom tokens, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/tabs.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/tabs.tsx`;
  - `radcn/fixtures/tests/tabs.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 118 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Tabs audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 118|tabs-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- The audit omits exact upstream Account/Password labels, fields, ids, default
  values, descriptions, buttons, card composition, tab values, or mechanics
  listed above.
- The audit marks `tabs-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream Account/Password card form
  composition, unless existing evidence already proves that composition.
- The audit treats generic preview/code Tabs docs as sufficient direct
  `tabs-demo` proof.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Hubble the 3rd (`019e9eea-6202-7342-978d-38449a159b37`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 118 as
`Designed`, the experiment has the required `Description`, `Changes`,
`Verification`, and `Design Review` sections, the scope is narrow to one audit
inventory for the single unresolved `tabs-demo` row, the plan explicitly
rejects generic preview/code tabs as direct `tabs-demo` proof, repo hygiene
and vendor checks are present, and implementation has not started before the
plan commit.
