# Experiment 83: Audit aspect-ratio example parity

## Description

The regenerated parity inventory after Experiment 82 recommends Aspect Ratio
as the next unresolved example cluster. Upstream shadcn/ui New York v4 has one
Aspect Ratio example, `aspect-ratio-demo`, plus the upstream Aspect Ratio UI
implementation. RadCN already exports `radcn/aspect-ratio`, has candidate
fixtures for default 16:9 and custom 1:1 ratios, and has Playwright coverage
that proves requested layout ratios.

This experiment should audit the upstream Aspect Ratio example against current
RadCN evidence and produce a focused inventory that determines whether the
cluster is already covered or which exact named-example gaps remain. It should
not implement the named example yet.

The likely remaining gap is named docs/fixture/test evidence for the exact
upstream `aspect-ratio-demo` composition:

- `AspectRatio` root with `ratio={16 / 9}`;
- `className="rounded-lg bg-muted"` on the root;
- a full-cover image using
  `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80`;
- image alt text `Photo by Drew Beamer`;
- image presentation equivalent to `fill`, `h-full`, `w-full`, `rounded-lg`,
  `object-cover`, `dark:brightness-[0.2]`, and `dark:grayscale`;
- upstream React client marker, Radix AspectRatio primitive, Next Image,
  `data-slot`, `className`, Tailwind rounded/background/sizing/object-fit
  utilities, dark-mode utilities, remote image mechanics, and vendor source
  mapped to RadCN's dependency-free CSS aspect-ratio wrapper, public hooks,
  `class`, `style`, CSS variables, app-owned image markup, and docs/fixture
  composition.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/aspect-ratio-example-inventory.md`.
  - List upstream aspect-ratio example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/aspect-ratio*.tsx`.
  - Summarize the upstream UI implementation from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/aspect-ratio.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `aspect-ratio-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for ratio representation, layout sizing, overflow,
    border radius, muted background, image alt text, object-cover behavior,
    full-cover image sizing, dark-mode image filters, Next Image non-dependency,
    Radix non-dependency, React non-dependency, `data-slot`, `className`,
    Tailwind utility mapping, remote image handling, public hooks, docs assets,
    fixture image strategy, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 83 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, test, inventory-regeneration, or
`resolved-clusters.json` changes should be made in this audit experiment unless
the audit itself exposes an already-covered result that can be proven entirely
from existing evidence. If that happens, record the evidence and keep the
change limited to issue documentation.

## Verification

Pass criteria:

- `aspect-ratio-example-inventory.md` exists and has:
  - `# Aspect Ratio Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one upstream row, `aspect-ratio-demo`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the upstream vendor example count is exactly
  one and the inventory table contains exactly one matching row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^aspect-ratio.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/aspect-ratio-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`vendor: ${vendor.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (vendor.length !== 1 || vendor[0] !== 'aspect-ratio-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'aspect-ratio-demo') process.exit(1)
  NODE
  ```
- A deterministic check proves the row outcome is one of `Covered`, `Partial`,
  `Missing`, or `Intentional divergence` and that any non-covered row has a
  non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/aspect-ratio-example-inventory.md', 'utf8')
  const row = text.match(/^\| `aspect-ratio-demo` \|([^\n]+)$/m)?.[0]
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
  React client component marker, Radix AspectRatio primitive, Next Image,
  `data-slot`, `className`, `ratio={16 / 9}`, rounded/muted root classes,
  full-cover image sizing, `object-cover`, dark-mode brightness/grayscale
  filters, exact remote image URL, exact alt text, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/aspect-ratio.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/fixtures/candidate-remix/app/fixtures/static-display.tsx`;
  - `radcn/fixtures/tests/static-display.spec.ts`;
  - `radcn/apps/docs/tests/coverage.spec.ts`.
- The Issue 4 README `## Learnings` section records the aspect-ratio audit
  result and the next recommended experiment after the audit result is known.
  A deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 83|aspect-ratio-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```
- `git diff --check`
- `git status --short` shows only the new experiment file,
  `aspect-ratio-example-inventory.md`, and the Issue 4 README before the result
  commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits the exact upstream image URL or alt text.
- The audit marks `aspect-ratio-demo` covered without docs, fixture, and
  Playwright evidence for the named image example, unless it records a precise
  intentional divergence with enough existing evidence.
- The audit changes package, docs app, fixture, or Playwright implementation
  files before the follow-up implementation experiment is designed and
  approved.
- The audit mutates vendor source or adds forbidden dependencies such as React,
  Radix, Next, Tailwind, lucide-react, or class-variance-authority.

## Design Review

Reviewer: Curie the 2nd (`019e9d62-22e8-7b91-bf46-7cfa48eb1672`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: clarified the required `## Examples` inventory table header so the
  deterministic row parser has an explicit schema.
- Minor: added this `## Design Review` section before the plan commit.

Approval: approved. The reviewer confirmed the Issue 4 README links
Experiment 83 as `Designed`, implementation has not started, vendor status is
clean, the scope is narrow enough for one audit experiment, and no blockers
remain.

## Result

**Result:** Partial

Created `aspect-ratio-example-inventory.md` for the single upstream New York v4
Aspect Ratio example, `aspect-ratio-demo`. The audit confirms RadCN already
covers dependency-free CSS aspect-ratio layout, default 16:9 layout, custom 1:1
layout, overflow clipping, border radius, muted background, full-size direct
children, public `data-radcn-aspect-ratio` hooks, class/style customization,
and generic docs route coverage.

The cluster remains partial because current docs, fixtures, and tests do not
prove the exact named upstream `aspect-ratio-demo` composition: the Unsplash
remote image URL, alt text `Photo by Drew Beamer`, rounded muted root styling,
full-cover object-fit image behavior, dark-mode brightness/grayscale image
filters, and the Next Image/Radix/Tailwind mapping.

Verification commands run:

```text
node - <<'NODE'
const fs = require('fs')
const vendor = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
  .filter((file) => /^aspect-ratio.*\.tsx$/.test(file))
  .map((file) => file.replace(/\.tsx$/, ''))
  .sort()
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/aspect-ratio-example-inventory.md', 'utf8')
const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
console.log(`vendor: ${vendor.join(', ')}`)
console.log(`inventory: ${rows.join(', ')}`)
if (vendor.length !== 1 || vendor[0] !== 'aspect-ratio-demo') process.exit(1)
if (rows.length !== 1 || rows[0] !== 'aspect-ratio-demo') process.exit(1)
NODE
```

Passed with `vendor: aspect-ratio-demo` and
`inventory: aspect-ratio-demo`.

```text
node - <<'NODE'
const fs = require('fs')
const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/aspect-ratio-example-inventory.md', 'utf8')
const row = text.match(/^\| `aspect-ratio-demo` \|([^\n]+)$/m)?.[0]
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

Passed with `outcome: Partial` and a non-empty follow-up.

```text
rg -n "Experiment 83|aspect-ratio-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
git diff --check
for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done
```

The README check found the Experiment 83 learning and index entry,
`git diff --check` passed, and the vendor cleanliness check printed no output.

## Completion Review

Reviewer: Boyle the 2nd (`019e9d65-89dc-78d3-b542-54eb89a6fccb`),
fresh-context Codex subagent (`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approval: approved. The reviewer confirmed the scope stayed audit-only, the
result and conclusion are present, the issue README learning and experiment
status match `Partial`, the inventory records the exact upstream gap and
follow-up, vendor source confirms the audited mechanics, deterministic checks
passed, `git diff --check` passed, vendor cleanliness was checked, and the
result commit had not been made before review.

## Conclusion

Aspect Ratio example parity remains partial. The package primitive is strong
enough for the upstream behavior, but named docs, fixture, and Playwright
evidence still need to prove the image composition and styling details.

The next Issue 4 experiment should implement named `aspect-ratio-demo` parity
without adding React, Radix, Next Image, Tailwind, or vendor dependencies.
