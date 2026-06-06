# Experiment 104: Audit popover example parity

## Description

The regenerated parity inventory after Experiment 103 recommends `popover` as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Popover example, `popover-demo`, registered as an example dependency
on `popover`.

RadCN already ships `radcn/popover` with package exports, dependency-free
Popover primitives, trigger/content/portal/anchor/header/title/description/
close parts, browser enhancement through `enhancePopover`, outside dismissal,
Escape close, non-modal behavior, placement and alignment props, custom token
fixtures, generic docs coverage, candidate fixtures, and Playwright coverage in
`positioned-overlays.spec.ts`.

This experiment should audit whether that evidence covers the exact direct
upstream `popover-demo`, or whether a named implementation experiment is
needed. The likely remaining gap is named docs/fixture/test evidence for the
upstream dimensions form composition:

- `Popover`, `PopoverTrigger asChild`, `Button variant="outline"` with visible
  text `Open popover`;
- `PopoverContent className="w-80"`;
- content layout with heading `Dimensions` and description
  `Set the dimensions for the layer.`;
- four labelled inputs: `Width` default `100%`, `Max. width` default `300px`,
  `Height` default `25px`, and `Max. height` default `none`;
- upstream package mechanics: `"use client"`, React component props, Radix
  Popover primitives, implicit Radix portal in `PopoverContent`, `PopoverAnchor`,
  `PopoverHeader`, `PopoverTitle`, `PopoverDescription`, `asChild`, Button,
  Input, Label, `className`, Tailwind utilities, `cn`, `data-slot`, align
  default `center`, sideOffset default `4`, transition/data-state/side styling,
  content width mapping, form control mapping, browser behavior, custom tokens,
  and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/popover-example-inventory.md`.
  - List direct upstream Popover example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["popover"]`, and cross-check those entries against
    `examples/popover*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/popover-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/popover.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `popover-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency,
    `PopoverTrigger asChild`, Button/Input/Label composition,
    implicit/explicit portal mapping, `PopoverAnchor`, `PopoverHeader`,
    `PopoverTitle`, `PopoverDescription`, `className`, Tailwind utility
    mapping, `cn`, `data-slot`, align and sideOffset defaults,
    transition/data-state/side styling, content width mapping, form control
    labels/default values, browser behavior, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 104 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `popover-example-inventory.md` exists and has:
  - `# Popover Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `popover-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Popover example
  cluster count is exactly one by the direct popover filename-prefix and
  `registryDependencies: ["popover"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'popover' || match[1].startsWith('popover-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'popover')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^popover.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/popover-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'popover-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'popover-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'popover-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/popover-example-inventory.md', 'utf8')
  const row = text.match(/^\| `popover-demo` \|([^\n]+)$/m)?.[0]
  if (!row) process.exit(1)
  const cells = row.split('|').map((cell) => cell.trim())
  const outcome = cells[4]
  const followUp = cells[5]
  console.log(`outcome: ${outcome}`)
  console.log(`follow-up: ${followUp}`)
  if (!['Covered', 'Partial', 'Missing', 'Intentional divergence'].includes(outcome)) process.exit(1)
  if (outcome !== 'Covered' && (!followUp || followUp === 'No follow-up.')) process.exit(1)
  NODE
  ```

- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, React component props, Radix Popover primitives, implicit
  Radix portal in `PopoverContent`, `PopoverAnchor`, `PopoverHeader`,
  `PopoverTitle`, `PopoverDescription`, `PopoverTrigger asChild`, Button,
  Input, Label, `className`, Tailwind utilities, `cn`, `data-slot`, align
  default `center`, sideOffset default `4`, transition/data-state/side
  styling, content width mapping, form control mapping, browser behavior,
  custom tokens, and vendor source.
- The audit explicitly mentions exact upstream user-facing text and states:
  `Open popover`, `Dimensions`, `Set the dimensions for the layer.`, `Width`,
  `100%`, `Max. width`, `300px`, `Height`, `25px`, `Max. height`, and `none`.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/popover.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`;
  - `radcn/fixtures/tests/positioned-overlays.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 104 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Popover audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 104|popover-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git diff --exit-code -- pnpm-lock.yaml`
- A deterministic tracked-vendor-source check proves the RadCN repository only
  tracks `vendor/.gitignore` under `vendor/`:

  ```text
  node - <<'NODE'
  const { execFileSync } = require('child_process')
  const files = execFileSync('git', ['ls-files', 'vendor'], { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
  console.log(files.join('\n'))
  if (files.length !== 1 || files[0] !== 'vendor/.gitignore') process.exit(1)
  NODE
  ```

- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text or mechanics listed
  above.
- The audit marks `popover-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream dimensions form, unless existing
  evidence already proves the same composition on the Popover surface.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Goodall the 3rd (`019e9e5e-9b17-7212-9db5-4ae049f3f5ab`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: The initial verification included whitespace, worktree, and nested
  vendor checkout checks, but not a deterministic tracked-vendor-source check
  required by Issue 4's no-vendor scope. Fixed by adding
  `git diff --exit-code -- pnpm-lock.yaml` and a Node check that `git ls-files
  vendor` returns only `vendor/.gitignore`.
- Minor: The Changes section said only `Partial` rows need exact follow-up
  requirements, while the verification check requires follow-up for every
  non-`Covered` outcome. Fixed by requiring follow-up or explicit disposition
  for every non-covered outcome.

Approved. The reviewer confirmed the Issue 4 README links Experiment 104 as
`Designed`, the experiment has required sections, scope is audit-sized, vendor
files are reference-only, verification is concrete, and the plan follows the
regenerated Popover recommendation.

Re-review approved. The reviewer confirmed the tracked-vendor/lockfile checks
resolve the prior major finding, the non-covered follow-up wording now matches
the verification check, and no new blockers were introduced.
