# Experiment 93: Audit hover-card example parity

## Description

The regenerated parity inventory after Experiment 92 recommends Hover Card as
the next unresolved direct example cluster. Upstream shadcn/ui New York v4 has
one direct example, `hover-card-demo`, registered as an example dependency on
`hover-card`.

RadCN already ships `radcn/hover-card` with package exports, browser
enhancement, positioned overlay behavior, open/close delays, focus and hover
interaction, portal/content hooks, side/align placement, custom token coverage,
and general docs/fixture evidence. This experiment should audit whether that
evidence covers the exact direct upstream `hover-card-demo`, or whether a
named implementation experiment is needed.

The likely remaining gap is named docs/fixture/test evidence for the upstream
profile card composition:

- `"use client"` and Radix Hover Card mechanics;
- `HoverCard`, `HoverCardTrigger`, and `HoverCardContent`;
- `HoverCardTrigger asChild` wrapping a Button with `variant="link"`;
- trigger text `@nextjs`;
- `HoverCardContent className="w-80"` width evidence;
- profile layout equivalent to `flex justify-between gap-4`;
- Avatar composition with image URL `https://github.com/vercel.png` and
  fallback `VC`;
- heading `@nextjs`;
- description text `The React Framework – created and maintained by @vercel.`;
- muted metadata text `Joined December 2021`;
- mappings for Avatar, Button, HoverCard, Radix primitives, `asChild`,
  `className`, Tailwind utilities, vendor source, and the unused upstream
  `CalendarIcon` import.

The audit should not implement named parity yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/hover-card-example-inventory.md`.
  - List direct upstream Hover Card example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    with `type: "registry:example"` and
    `registryDependencies: ["hover-card"]`, and cross-check those entries
    against `examples/hover-card*.tsx` files.
  - Summarize upstream mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/hover-card-demo.tsx`
    and upstream package mechanics from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/ui/hover-card.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    fixture, and Playwright evidence.
  - Mark `hover-card-demo` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial, record the exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for React client components, Radix Hover Card
    non-dependency, native trigger semantics, `asChild` mapping, Button link
    trigger mapping, Avatar composition, image/fallback behavior, portal
    behavior, open/close delay behavior, focus/hover behavior, side/align
    placement, width/class mapping, `className`, Tailwind utility mapping,
    app-owned icon/import choices, docs evidence, fixture evidence,
    Playwright evidence, custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 93 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, or generated parity inventory changes should be made
in this audit experiment unless the audit itself proves the direct example is
already covered entirely from existing evidence. If that happens, keep the
change limited to issue documentation and required resolved-cluster/generated
inventory updates.

## Verification

Pass criteria:

- `hover-card-example-inventory.md` exists and has:
  - `# Hover Card Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `hover-card-demo`, using
    this header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor Hover Card example
  registry entry count is exactly one, the matching file-glob count is exactly
  one, and the inventory table contains exactly one matching row:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",\s*registryDependencies: \[([^\]]*)\],[\s\S]*?path: "examples\/([^"]+)"/g)]
    .filter((match) => match[2].includes('"hover-card"'))
    .map((match) => match[1])
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^hover-card.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/hover-card-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'hover-card-demo') process.exit(1)
  if (files.length !== 1 || files[0] !== 'hover-card-demo') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'hover-card-demo') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/hover-card-example-inventory.md', 'utf8')
  const row = text.match(/^\| `hover-card-demo` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, Radix Hover Card, `HoverCard`, `HoverCardTrigger`,
  `HoverCardContent`, portal behavior, `asChild`, Button `variant="link"`,
  Avatar, AvatarImage, AvatarFallback, image URL, fallback text, `w-80`,
  `flex`, `justify-between`, `gap-4`, `space-y-1`, `text-sm`,
  `font-semibold`, `text-xs`, `text-muted-foreground`, `className`,
  Tailwind utilities, `cn`, `data-slot`, unused `CalendarIcon`, and vendor
  source.
- The audit explicitly mentions all exact upstream user-facing text and data:
  `@nextjs`, `VC`, `https://github.com/vercel.png`,
  `The React Framework – created and maintained by @vercel.`, and
  `Joined December 2021`.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/packages/radcn/src/components/hover-card.tsx`;
  - `radcn/packages/radcn/src/components/avatar.tsx`;
  - `radcn/packages/radcn/src/components/button.tsx`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/src/index.ts`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`;
  - `radcn/apps/docs/tests/coverage.spec.ts`;
  - `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`;
  - `radcn/fixtures/scenarios/index.ts`;
  - `radcn/fixtures/tests/positioned-overlays.spec.ts`.
- The Issue 4 README `## Experiments` section links Experiment 93 with status
  `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the Hover Card audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 93|hover-card-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any exact upstream user-facing text or data listed above.
- The audit marks `hover-card-demo` covered without docs, fixture, and
  Playwright evidence for the exact upstream composition.
- The audit treats Radix/React DOM equivalence as required instead of
  user-facing behavior, accessibility, and author-facing modifiability.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered and
  only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Popper the 3rd
(`019e9de2-7a64-74c3-a5a7-19646b543be1`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the issue README links Experiment 93 with
status `Designed`, the plan has the required sections, the scope is narrow and
audit-only, implementation has not started before the plan commit, verification
has concrete pass/fail criteria and repo hygiene checks, vendor checkouts are
clean, and the regenerated inventory supports Hover Card as the next
recommended cluster.
