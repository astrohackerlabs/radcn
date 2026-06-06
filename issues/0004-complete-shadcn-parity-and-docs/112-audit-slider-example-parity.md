# Experiment 112: Audit slider example parity

## Description

The regenerated parity inventory after Experiment 111 recommends `slider` as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct Slider example, `slider-demo`, registered as an example dependency
on `slider`.

RadCN already ships `radcn/slider` with a dependency-free native range input,
track/range/thumb visual parts, `data-radcn-slider` hooks, value/min/max/step
metadata, percent CSS variable state, disabled, step, form reset/submit, and
custom-token fixture coverage. RadCN docs currently have generic Slider preview
coverage, not a named direct upstream `slider-demo`.

This experiment should audit whether existing evidence covers the exact direct
upstream `slider-demo`, or whether a named implementation experiment is needed.
The likely remaining gap is named docs/fixture/test evidence for the upstream
demo composition:

- `SliderDemo({ className, ...props }: SliderProps)`;
- `React.ComponentProps<typeof Slider>`;
- `defaultValue={[50]`;
- `max={100}`;
- `step={1}`;
- `className={cn("w-[60%]", className)}`;
- spread `{...props}`;
- upstream package mechanics: `"use client"`, React props, React `useMemo`,
  Radix Slider primitive, `SliderPrimitive.Root`,
  `SliderPrimitive.Track`, `SliderPrimitive.Range`,
  `SliderPrimitive.Thumb`, single-thumb value array behavior,
  `data-slot`, `className`, Tailwind utilities, `cn`, default min/max
  behavior, disabled styling, horizontal orientation, browser range behavior,
  custom tokens, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/slider-example-inventory.md`.
  - List direct upstream Slider example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["slider"]`, and cross-check those entries against
    `examples/slider*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/slider-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/slider.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `slider-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency, native
    range input mapping, single-value array mapping, default value 50, max 100,
    step 1, `w-[60%]` width mapping, `className`, prop spread, Tailwind
    utility mapping, `cn`, `data-slot`, track/range/thumb mapping, percent
    CSS variable behavior, disabled/form/custom-token behavior, browser range
    behavior, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 112 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `slider-example-inventory.md` exists and has:
  - `# Slider Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `slider-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Slider example
  cluster count is exactly one by the direct slider filename-prefix and
  `registryDependencies: ["slider"]` rule used for this audit, the matching
  file-glob count is exactly one, and the inventory table contains exactly one
  matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'slider' || match[1].startsWith('slider-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'slider')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^slider.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/slider-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'slider-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'slider-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'slider-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/slider-example-inventory.md', 'utf8')
  const row = text.match(/^\| `slider-demo` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, `SliderProps`, `React.ComponentProps<typeof Slider>`, React
  `useMemo`, Radix Slider primitive, `SliderPrimitive.Root`,
  `SliderPrimitive.Track`, `SliderPrimitive.Range`,
  `SliderPrimitive.Thumb`, `defaultValue={[50]`, `max={100}`, `step={1}`,
  `className={cn("w-[60%]", className)}`, `{...props}`, `className`,
  Tailwind utilities, `cn`, `data-slot`, horizontal orientation, track/range/
  thumb behavior, disabled behavior, browser range behavior, custom tokens,
  and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/slider.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/slider.tsx`;
  - `radcn/fixtures/tests/slider.spec.ts`;
  - `radcn/fixtures/tests/native-state.spec.ts`, only to record that native
    state coverage does not currently contain Slider-specific assertions.
- The Issue 4 README `## Experiments` section links Experiment 112 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Slider audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 112|slider-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- The audit omits any exact upstream values, width, props, slider parts, or
  mechanics listed above.
- The audit marks `slider-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream default value 50, max 100, step 1,
  60% width, public hooks, and native browser range behavior, unless existing
  evidence already proves the same composition on the Slider surface.
- The audit treats React/Radix DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Aristotle the 3rd (`019e9eb4-f512-70a1-a92d-ee4ffeb4e4b4`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: The initial plan listed
  `radcn/fixtures/tests/native-state.spec.ts` as required current Slider
  evidence, but current Slider behavior assertions live in
  `radcn/fixtures/tests/slider.spec.ts`. Fixed by adding
  `slider.spec.ts` to the evidence list and limiting `native-state.spec.ts`
  to recording that it has no Slider-specific assertions.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 112 as
`Designed`, the experiment has required design sections with no `Result`,
scope is audit-sized, implementation has not started before the plan commit,
verification includes concrete pass/fail criteria and hygiene checks, vendor
checkouts are clean, and the modified blocks/chart-gallery scope remains out
of scope while retaining `radcn/chart` package scope.
