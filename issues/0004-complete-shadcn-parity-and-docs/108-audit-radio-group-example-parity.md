# Experiment 108: Audit radio-group example parity

## Description

The regenerated parity inventory after Experiment 107 recommends `radio-group`
as the next unresolved direct example cluster. Upstream shadcn/ui New York v4
has one direct Radio Group example, `radio-group-demo`, registered as an
example dependency on `radio-group`.

RadCN already ships `radcn/radio-group` with dependency-free native radio
inputs, a radiogroup wrapper, checked/unchecked state hooks, disabled,
invalid, form, and custom-token fixture coverage, generic docs coverage, and
Playwright coverage in `native-state.spec.ts`.

This experiment should audit whether that evidence covers the exact direct
upstream `radio-group-demo`, or whether a named implementation experiment is
needed. The likely remaining gap is named docs/fixture/test evidence for the
upstream demo composition:

- `RadioGroup defaultValue="comfortable"`;
- three rows with `flex items-center gap-3`;
- `RadioGroupItem value="default" id="r1"` with `Label htmlFor="r1"` and text
  `Default`;
- `RadioGroupItem value="comfortable" id="r2"` with `Label htmlFor="r2"` and
  text `Comfortable`;
- `RadioGroupItem value="compact" id="r3"` with `Label htmlFor="r3"` and text
  `Compact`;
- upstream package mechanics: `"use client"`, React component props, Radix
  Radio Group primitive, `RadioGroupPrimitive.Root`,
  `RadioGroupPrimitive.Item`, `RadioGroupPrimitive.Indicator`,
  lucide `CircleIcon`, `className`, Tailwind utilities, `cn`, `data-slot`,
  checked state/default value behavior, disabled/invalid styling, browser
  radio behavior, custom tokens, Label composition, and vendor source.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/radio-group-example-inventory.md`.
  - List direct upstream Radio Group example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["radio-group"]`, and cross-check those entries
    against `examples/radio-group*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/radio-group-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/radio-group.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `radio-group-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - For every non-covered outcome, record exact follow-up requirements or an
    explicit disposition for the next experiment.
  - Record decisions for React non-dependency, Radix non-dependency,
    `defaultValue="comfortable"` mapping, native radio input behavior,
    Label composition, row layout, ids `r1`/`r2`/`r3`, values
    `default`/`comfortable`/`compact`, checked state, lucide `CircleIcon`,
    `className`, Tailwind utility mapping, `cn`, `data-slot`, disabled/invalid
    behavior, browser behavior, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 108 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `radio-group-example-inventory.md` exists and has:
  - `# Radio Group Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `radio-group-demo`, using
    this header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Radio Group example
  cluster count is exactly one by the direct radio-group filename-prefix and
  `registryDependencies: ["radio-group"]` rule used for this audit, the
  matching file-glob count is exactly one, and the inventory table contains
  exactly one matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[1] === 'radio-group' || match[1].startsWith('radio-group-'))
    .map((match) => ({
      dependencies: [...match[2].matchAll(/"([^"]+)"/g)].map((dependency) => dependency[1]).sort(),
      name: match[1],
    }))
    .filter((entry) => entry.dependencies.length === 1 && entry.dependencies[0] === 'radio-group')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^radio-group.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/radio-group-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'radio-group-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'radio-group-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'radio-group-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up.
- The audit explicitly mentions and classifies these upstream mechanics:
  `"use client"`, React component props, Radix Radio Group primitive,
  `RadioGroupPrimitive.Root`, `RadioGroupPrimitive.Item`,
  `RadioGroupPrimitive.Indicator`, lucide `CircleIcon`,
  `defaultValue="comfortable"`, ids `r1`/`r2`/`r3`, values
  `default`/`comfortable`/`compact`, labels `Default`, `Comfortable`,
  `Compact`, `className`, Tailwind utilities, `cn`, `data-slot`,
  checked/default state, disabled/invalid behavior, browser radio behavior,
  custom tokens, Label composition, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/radio-group.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/native-state.tsx`;
  - `radcn/fixtures/tests/native-state.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 108 with
  status `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Radio Group audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 108|radio-group-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
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

- The audit omits any exact upstream user-facing text, ids, values, checked
  state, layout, or mechanics listed above.
- The audit marks `radio-group-demo` covered without named docs, fixture, and
  Playwright evidence for the exact upstream three-option composition, unless
  existing evidence already proves the same composition on the Radio Group
  surface.
- The audit treats React/Radix/lucide DOM equivalence as required instead of
  user-facing behavior, accessibility, browser behavior, and author-facing
  modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Carver the 3rd (`019e9e8b-bb73-7be1-807f-33b06e53ba72`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: The initial verification said a deterministic tracked-vendor-source
  check must prove only `vendor/.gitignore` is tracked, but did not include the
  exact command or expected output. Fixed by adding the Node `git ls-files
  vendor` check that fails unless the only tracked vendor path is
  `vendor/.gitignore`.

Approved. The reviewer confirmed the Issue 4 README links Experiment 108 as
`Designed`, the experiment has required sections and concrete verification,
scope is audit-only, implementation has not started before the plan commit,
vendor checkouts are clean, and the modified blocks/chart-gallery scope remains
out of scope.

## Result

**Result:** Partial

Experiment 108 added `radio-group-example-inventory.md` and audited the single
direct upstream Radio Group example cluster, `radio-group-demo`.

The audit found that RadCN already has strong Radio Group substrate:
dependency-free native radio inputs, a radiogroup wrapper, checked/unchecked
state hooks, disabled and invalid state support, form behavior, custom-token
evidence, generic docs, candidate fixtures, and Playwright coverage. The direct
upstream example is still partial because current docs and fixtures do not
provide a named `radio-group-demo` surface for the exact
`defaultValue="comfortable"` composition with `Default`, `Comfortable`, and
`Compact`, ids `r1`, `r2`, and `r3`, and upstream row layout mapping.

Verification run:

```text
node deterministic checks for radio-group-example-inventory.md structure, direct
  upstream row count, row outcome/follow-up, and required mechanics/evidence
rg -n "Experiment 108|radio-group-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
git diff --exit-code -- pnpm-lock.yaml
node tracked-vendor-source check for vendor/.gitignore only
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

All commands passed. The tracked-vendor-source check printed only
`vendor/.gitignore`, and the nested vendor status checks printed no modified
files.

## Conclusion

Radio Group needs a follow-up implementation experiment. The next experiment
should add named `radio-group-demo` docs and candidate fixture coverage that
renders the exact `Default`, `Comfortable`, and `Compact` rows, maps
`defaultValue="comfortable"` to a checked native radio, preserves or explicitly
namespaces ids `r1`, `r2`, and `r3`, verifies label associations, row layout,
public hooks, native selection behavior, source/mapping copy, and preserves
existing disabled, invalid, form, and custom-token coverage.

## Completion Review

Reviewer: Herschel the 3rd (`019e9e8e-b4f3-7711-9922-f5c14977af77`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the experiment has `## Result` and
`## Conclusion`, the claimed `Partial` result is supported by the inventory,
the Issue 4 README learning and experiment status are updated, verification and
vendor checks passed, the result commit had not yet been made, vendor
cleanliness and ignored-source rules hold, and the revised Issue 4 scope is
respected with no block or upstream chart-gallery work.
