# Experiment 99: Audit mode-toggle example parity

## Description

The regenerated parity inventory after Experiment 98 recommends `mode-toggle`
as the next unresolved direct example cluster. Upstream shadcn/ui New York v4
has one direct example, `mode-toggle`, registered as a `registry:example`
without a `ui/` package dependency.

The upstream example is an app-shell theme recipe, not a standalone shadcn UI
package component. It combines `"use client"`, React, `next-themes`,
`lucide-react` `Sun` and `Moon` icons, `Button`, `DropdownMenu`,
`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, icon
transition classes, an accessible `Toggle theme` label, and three actions:
`Light`, `Dark`, and `System`.

RadCN already has a docs-site theme-mode control and browser behavior that may
be the intended Remix 3 outcome: default `system` mode, explicit user
overrides, resolved `light`/`dark` document tokens, system preference changes,
legacy storage migration, `lucide-static` icons, and Playwright coverage. This
audit should decide whether the current RadCN evidence fully covers
`mode-toggle`, whether an implementation experiment is needed, or whether the
upstream dropdown/icon-button shape is an intentional divergence because the
project requirement is a visible three-option control rather than a binary
toggle.

The audit should not implement or restyle the theme control yet.

## Changes

- Add
  `issues/0004-complete-shadcn-parity-and-docs/mode-toggle-example-inventory.md`.
  - List direct upstream `mode-toggle` example rows found under
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts`
    by the same primary-slug inference used by
    `scripts/audit-shadcn-parity.mjs`, and cross-check those rows against
    `examples/mode-toggle*.tsx` files.
  - Summarize upstream user-facing behavior from
    `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/mode-toggle.tsx`.
  - Compare upstream behavior and mechanics with current RadCN package, docs,
    app-shell, browser-entry, icon, fixture, and Playwright evidence.
  - Mark `mode-toggle` as `Covered`, `Partial`, `Missing`, or
    `Intentional divergence`.
  - If partial or missing, record exact follow-up requirements for the next
    implementation experiment.
  - Record decisions for `"use client"`, React, `next-themes`, `useTheme`,
    `setTheme`, `lucide-react`, `lucide-static`, `Sun`, `Moon`, `Monitor`,
    `Button`, `DropdownMenu`, dropdown trigger/content/item behavior,
    visible three-option control versus dropdown icon-button control, default
    `system` mode, explicit `light`/`dark` override, system preference
    following, persistence, legacy storage migration, document
    `data-radcn-theme-mode`, document `data-radcn-theme`, color scheme,
    accessible names/roles, keyboard behavior, icon presentation,
    `className`, Tailwind utilities, `cn`, docs evidence, Playwright evidence,
    custom tokens, and vendor source.
- Update Issue 4 `README.md`.
  - Add Experiment 99 to the experiments index as `Designed`.
  - Do not add final learnings until the experiment result is recorded.

No package, docs app, fixture, Playwright implementation,
`resolved-clusters.json`, generated parity inventory, lockfile, or vendor
changes should be made in this audit experiment unless the audit itself proves
the direct example is already fully covered or intentionally diverged. If that
happens, keep changes limited to issue documentation and required
resolved-cluster/generated inventory bookkeeping.

## Verification

Pass criteria:

- `mode-toggle-example-inventory.md` exists and has:
  - `# Mode Toggle Example Inventory`;
  - `## Summary`;
  - `## Examples`;
  - a table with exactly one direct upstream row, `mode-toggle`, using this
    header:
    `Upstream example | User-facing behavior and upstream mechanics | Current RadCN evidence | Outcome | Follow-up`;
  - `## Decisions`.
- A deterministic check proves the direct upstream vendor `mode-toggle`
  example cluster count is exactly one by the same fallback primary-slug rule
  used by `scripts/audit-shadcn-parity.mjs`, the matching file-glob count is
  exactly one, and the inventory table contains exactly one matching row.

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const registry = fs.readFileSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/_registry.ts', 'utf8')
  const registryEntries = [...registry.matchAll(/\{\s*name: "([^"]+)",\s*type: "registry:example",[\s\S]*?path: "examples\/([^"]+)"/g)]
    .map((match) => ({
      name: match[1],
      path: match[2],
      slug: match[1].replace(/-(demo|default|destructive|outline|secondary|example)$/, ''),
    }))
    .filter((entry) => entry.slug === 'mode-toggle')
    .map((entry) => entry.name)
    .sort()
  const files = fs.readdirSync('vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples')
    .filter((file) => /^mode-toggle.*\.tsx$/.test(file))
    .map((file) => file.replace(/\.tsx$/, ''))
    .sort()
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/mode-toggle-example-inventory.md', 'utf8')
  const examples = text.match(/## Examples[\s\S]*?(?=\n## |$)/)?.[0] ?? ''
  const rows = [...examples.matchAll(/^\| `([^`]+)` \|[^\n]+/gm)].map((match) => match[1]).sort()
  console.log(`registry: ${registryEntries.join(', ')}`)
  console.log(`files: ${files.join(', ')}`)
  console.log(`inventory: ${rows.join(', ')}`)
  if (registryEntries.length !== 1 || registryEntries[0] !== 'mode-toggle') process.exit(1)
  if (files.length !== 1 || files[0] !== 'mode-toggle') process.exit(1)
  if (rows.length !== 1 || rows[0] !== 'mode-toggle') process.exit(1)
  NODE
  ```

- A deterministic check proves the row outcome is one of `Covered`,
  `Partial`, `Missing`, or `Intentional divergence` and that any non-covered
  row has a non-empty follow-up:

  ```text
  node - <<'NODE'
  const fs = require('fs')
  const text = fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/mode-toggle-example-inventory.md', 'utf8')
  const row = text.match(/^\| `mode-toggle` \|([^\n]+)$/m)?.[0]
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
  `"use client"`, React, `next-themes`, `useTheme`, `setTheme`,
  `lucide-react`, `Sun`, `Moon`, `Button`, `DropdownMenu`,
  `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, icon
  transition classes, `Toggle theme` accessible label, `Light`, `Dark`,
  `System`, `className`, Tailwind utilities, and vendor source.
- The audit explicitly compares current RadCN evidence from:
  - `radcn/apps/docs/app/ui/document.tsx`;
  - `radcn/apps/docs/app/ui/docs-pages.tsx`;
  - `radcn/apps/docs/app/ui/icons.tsx`;
  - `radcn/apps/docs/app/assets/entry.ts`;
  - `radcn/apps/docs/tests/theme-mode.spec.ts`;
  - `radcn/packages/radcn/src/styles/tokens.css`;
  - `radcn/packages/radcn/package.json`;
  - `radcn/apps/docs/package.json`;
  - `radcn/apps/docs/app/content/components.tsx`.
- The audit explicitly decides whether `mode-toggle` should become:
  - a RadCN package API;
  - a docs app-shell recipe/pattern;
  - an implementation follow-up for the current docs app; or
  - an intentional divergence from shadcn's dropdown icon-button example.
- The Issue 4 README `## Experiments` section links Experiment 99 with status
  `Designed`.
- After the audit result is recorded, the Issue 4 README `## Learnings`
  section records the mode-toggle audit outcome and next-step decision. A
  deterministic check finds both the experiment and inventory references:

  ```text
  rg -n "Experiment 99|mode-toggle-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
  ```

- `git diff --check`
- `git status --short` shows only the new experiment file and the Issue 4
  README before the plan commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The audit omits any upstream user-facing text or mechanics listed above.
- The audit marks `mode-toggle` covered without explaining why the current
  RadCN theme-mode control satisfies the project requirement despite not being
  the same dropdown icon-button shape.
- The audit treats React, `next-themes`, or `lucide-react` as required RadCN
  dependencies without proving that the dependency fits Remix 3 and RadCN's
  package boundary.
- The audit modifies package, docs, fixture, Playwright, vendor, or lockfile
  implementation files without proving that the row is already covered or
  intentionally diverged and only issue documentation/bookkeeping is needed.

## Design Review

Reviewer: Ptolemy the 3rd
(`019e9e27-d280-7570-ab39-4a9d4fa05510`), fresh-context Codex subagent
(`fork_context: false`).

Findings:

- Blocker: none.
- Major: none.
- Minor: none.

Approved. The reviewer confirmed the Issue 4 README links Experiment 99 with
status `Designed`, the experiment includes `Description`, `Changes`,
`Verification`, and `Design Review`, the scope is audit-only and narrow enough
for one experiment, implementation has not started before the plan commit,
verification includes concrete pass/fail criteria and hygiene checks, vendor
checkouts are clean, and the technical plan is likely to achieve the
mode-toggle audit goal.

The reviewer also checked the deterministic upstream count strategy against
`scripts/audit-shadcn-parity.mjs`: because `mode-toggle` has no
`registryDependencies`, no known package slug prefix match, and no suffix to
strip, the experiment's fallback primary-slug check correctly identifies the
single upstream `mode-toggle` row.

## Result

**Result:** Pass

Experiment 99 added `mode-toggle-example-inventory.md` and audited the single
direct upstream `mode-toggle` example.

The audit found that upstream `mode-toggle` is an application theme recipe,
not a reusable `ui/` package API. Its user-facing outcome is theme selection
among `Light`, `Dark`, and `System`, implemented in shadcn/ui as a React
client dropdown icon button using `next-themes`, `lucide-react`, `Button`, and
`DropdownMenu`.

RadCN already has the required theme-mode outcome in the docs app shell:
default `system`, explicit `light`/`dark` overrides, resolved document
`data-radcn-theme`, `data-radcn-theme-mode`, `colorScheme`, persistence,
legacy storage migration, system preference following, accessible radiogroup
state, keyboard behavior, `lucide-static` icons, token-scoped package styling,
and Playwright coverage in `theme-mode.spec.ts`.

The upstream dropdown icon-button shape is an intentional divergence. RadCN
keeps the visible three-option control as a docs app-shell recipe/pattern and
does not add a `radcn/mode-toggle` package export, `next-themes`,
`lucide-react`, or a dropdown-only implementation.

`resolved-clusters.json` now marks `mode-toggle` resolved for the examples
queue. `node scripts/audit-shadcn-parity.mjs` regenerated
`parity-inventory.md`; the next generated recommendation is example parity for
`navigation-menu`.

Verification passed:

```text
node scripts/audit-shadcn-parity.mjs
deterministic mode-toggle inventory count and outcome checks
rg -n "Experiment 99|mode-toggle-example-inventory" issues/0004-complete-shadcn-parity-and-docs/README.md
pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts theme-mode.spec.ts
dependency manifest check forbidding next-themes and lucide-react in docs/package manifests
git diff --check
vendor cleanliness check
```

## Conclusion

The direct `mode-toggle` example cluster is resolved as an intentional
docs-app-shell divergence with existing behavior and test evidence. The next
Issue 4 experiment should audit example parity for `navigation-menu`.

## Completion Review

**Reviewer:** Heisenberg the 3rd (`019e9e2b-be26-7a43-add6-262423168875`)
**Fresh-context status:** fresh Codex subagent
**Result:** Approved with one major recording finding

Findings:

- Blocker: none.
- Major: The original `Verification passed` block omitted the exact focused
  docs Playwright command and dependency manifest check even though those
  checks were run and supported the result's behavior/dependency claims. Fixed
  by adding
  `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts theme-mode.spec.ts`
  and the dependency manifest check to the verification record.
- Minor: none.

The reviewer independently confirmed that resolving `mode-toggle` as an
intentional docs app-shell divergence is justified. They reran deterministic
mode-toggle checks, the focused theme-mode Playwright test, `git diff --check`,
vendor cleanliness, and dependency manifest checks successfully. They also
confirmed only Issue 4 docs/bookkeeping files are modified and the result
commit had not been made before review.

Re-review approved the fix. The reviewer confirmed the focused Playwright
command and dependency manifest check are now recorded in the verification
block, and no new blocker was introduced.
