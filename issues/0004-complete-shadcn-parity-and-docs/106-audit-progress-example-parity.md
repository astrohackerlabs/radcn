# Experiment 106: Audit progress example parity

## Description

The regenerated parity inventory after Experiment 105 recommends `progress` as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Progress example, `progress-demo`, registered as an example
dependency on `progress`.

RadCN already ships `radcn/progress` with a dependency-free package export,
native `<progress>` semantics, determinate and indeterminate states, indicator
width styling, generic docs coverage, candidate fixtures, custom-token evidence,
and Playwright coverage in `native-state.spec.ts`.

This experiment should audit whether that evidence covers the exact direct
upstream `progress-demo`, or whether a named implementation experiment is
needed. The likely remaining gap is named docs/fixture/test evidence for the
upstream timed demo composition:

- `"use client"`, React `useState(13)`, `useEffect`, and a 500ms timeout that
  updates the value to `66`;
- `Progress value={progress}`;
- `className="w-[60%]"`;
- upstream package mechanics: React component props, Radix Progress primitive,
  `ProgressPrimitive.Root`, `ProgressPrimitive.Indicator`, `className`,
  Tailwind utilities, `cn`, `data-slot`, `bg-primary/20`, `bg-primary`,
  `transition-all`, indicator `transform: translateX(-${100 - value}%)`,
  determinate progress semantics, browser behavior, custom tokens, and vendor
  source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/progress-example-inventory.md`.
  - List direct upstream Progress example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["progress"]`, and cross-check those entries
    against `examples/progress*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/progress-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/progress.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `progress-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency, timed
    browser state, value `13` to `66`, 500ms delay, `className="w-[60%]"`,
    native `<progress>` mapping, wrapper/track/indicator hooks, transform versus
    width indicator mapping, `className`, Tailwind utility mapping, `cn`,
    `data-slot`, colors, transitions, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 106 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `progress-example-inventory.md` exists and has:
  - `# Progress Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `progress-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Progress example
  cluster count is exactly one by the direct progress filename-prefix and
  `registryDependencies: ["progress"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'progress' || match[1].startsWith('progress-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'progress')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^progress.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/progress-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'progress-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'progress-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'progress-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/progress-example-inventory.md', 'utf8')
  const row = text.match(/^\| `progress-demo` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, React `useState`, React `useEffect`, 500ms timeout, value
  `13` to `66`, React component props, Radix Progress primitive,
  `ProgressPrimitive.Root`, `ProgressPrimitive.Indicator`, `className`,
  `w-[60%]`, Tailwind utilities, `cn`, `data-slot`, `bg-primary/20`,
  `bg-primary`, `transition-all`, indicator transform mapping, browser
  behavior, custom tokens, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/progress.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`;
  - `radcn/fixtures/tests/native-state.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 106 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Progress audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 106|progress-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- The audit omits any exact upstream state, values, timing, width, or mechanics
  listed above.
- The audit marks `progress-demo` covered without named docs, fixture, and
  Playwright evidence for the exact timed `13` to `66` value change and 60%
  width, unless existing evidence already proves the same composition on the
  Progress surface.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Helmholtz the 3rd (`019e9e7a-279f-7572-9c34-372ff82205e1`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 106 as
`Designed`, the experiment has the required design sections, verification has
concrete pass/fail criteria and repo hygiene checks, the scope is audit-sized,
vendor files are reference-only, the modified blocks and chart-gallery scope is
respected while retaining `radcn/chart` package scope, and upstream has exactly
one direct `progress-demo` example.
