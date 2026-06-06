# Experiment 110: Audit separator example parity

## Description

The regenerated parity inventory after Experiment 109 recommends `separator`
as the next unresolved direct example cluster. Upstream shadcn/ui New York v4
has one direct Separator example, `separator-demo`, registered as an example
dependency on `separator`.

RadCN already ships `radcn/separator` with a dependency-free package export,
horizontal and vertical orientation support, decorative separator behavior,
semantic separator behavior when `decorative={false}`, `data-orientation`,
public `data-radcn-separator` hooks, generic docs coverage, and an existing
fixture scenario named `orientations`.

This experiment should audit whether that evidence covers the exact direct
upstream `separator-demo`, or whether a named implementation experiment is
needed. The likely remaining gap is named docs/fixture/test evidence for the
upstream demo composition:

- wrapper content headed by `Radix Primitives`;
- description text `An open-source UI component library.`;
- a horizontal `Separator className="my-4"`;
- a link-like inline row with `Blog`, `Docs`, and `Source`;
- row classes `flex h-5 items-center space-x-4 text-sm`;
- two vertical separators between the three row labels;
- upstream package mechanics: `"use client"`, React component props, Radix
  Separator primitive, `SeparatorPrimitive.Root`, default
  `orientation="horizontal"`, default `decorative={true}`, `className`,
  Tailwind utilities, `cn`, `data-slot`, `data-orientation`, horizontal and
  vertical sizing rules, decorative versus semantic separator behavior,
  browser accessibility behavior, custom tokens, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/separator-example-inventory.md`.
  - List direct upstream Separator example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["separator"]`, and cross-check those entries
    against `examples/separator*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/separator-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/separator.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `separator-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency,
    horizontal and vertical orientation mapping, decorative default behavior,
    semantic separator opt-in behavior, `className="my-4"`, row layout classes,
    `Blog`/`Docs`/`Source` text, `Radix Primitives` heading, description copy,
    Tailwind utility mapping, `cn`, `data-slot`, `data-orientation`, custom
    tokens, browser accessibility behavior, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 110 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `separator-example-inventory.md` exists and has:
  - `# Separator Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `separator-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Separator example
  cluster count is exactly one by the direct separator filename-prefix and
  `registryDependencies: ["separator"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'separator' || match[1].startsWith('separator-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'separator')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^separator.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/separator-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'separator-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'separator-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'separator-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/separator-example-inventory.md', 'utf8')
  const row = text.match(/^\| `separator-demo` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, React component props, Radix Separator primitive,
  `SeparatorPrimitive.Root`, `orientation="horizontal"`,
  `decorative={true}`, `className`, `my-4`, `flex h-5 items-center space-x-4
  text-sm`, `Blog`, `Docs`, `Source`, `Radix Primitives`,
  `An open-source UI component library.`, Tailwind utilities, `cn`,
  `data-slot`, `data-orientation`, horizontal sizing, vertical sizing,
  decorative separator behavior, semantic separator behavior, browser
  accessibility behavior, custom tokens, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/separator.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`;
  - `radcn/fixtures/tests/native-state.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 110 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Separator audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 110|separator-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- The audit omits any exact upstream text, orientation, decorative behavior,
  layout, or mechanics listed above.
- The audit marks `separator-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream heading, description, horizontal
  separator, inline row, and two vertical separators, unless existing evidence
  already proves the same composition on the Separator surface.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Lorentz the 3rd (`019e9e9e-1f03-7630-acf3-93280c8bf51c`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 110 as
`Designed`, the experiment has the required design sections, the scope is
audit-only before implementation, verification includes concrete pass/fail
criteria and repository hygiene checks, vendor checkouts are clean, the
current diff only contains the Issue 4 README link and new experiment file,
upstream has exactly one direct `separator-demo` registry row and one
`separator-demo.tsx` file, and the modified scope excludes blocks and
chart-gallery examples while retaining the `radcn/chart` package/component.
