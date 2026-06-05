# Experiment 7: Track resolved parity clusters

## Description

Experiments 5 and 6 resolved the Form example parity cluster, but the generated
`parity-inventory.md` still recommends "Example parity for form" because
`scripts/audit-shadcn-parity.mjs` only knows about current package exports,
docs routes, and upstream registry counts. It does not know which example,
block, or chart clusters have already been audited and resolved inside Issue 4.

That makes the inventory less useful as the steering artifact for the rest of
Issue 4. The next experiment should fix the tracking model before implementing
another large cluster. The inventory should show unresolved queues and choose a
next recommendation after excluding completed Issue 4 clusters such as Form.

This experiment updates the inventory tooling and issue docs only. It does not
implement new components, examples, blocks, or charts.

## Changes

- Add `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Record resolved example clusters with evidence paths, starting with
    `form`.
  - Record resolved block clusters with evidence paths, starting as an empty
    list.
  - Record resolved chart clusters with evidence paths, starting as an empty
    list.
  - Record resolved docs-only/package outcome clusters, starting with
    `form`, `date-picker`, and `data-table`.
  - Keep the file small and machine-readable so the audit script can use it.
- Update `scripts/audit-shadcn-parity.mjs`.
  - Read `resolved-clusters.json` if it exists.
  - Add a "Resolved Issue Clusters" section to `parity-inventory.md`.
  - Add an "Unresolved Example Clusters" section that excludes resolved
    examples such as `form`.
  - Add an "Unresolved Block Clusters" section that excludes resolved block
    clusters from `resolved-clusters.json`.
  - Add an "Unresolved Chart Clusters" section that excludes resolved chart
    clusters from `resolved-clusters.json`.
  - Add an "Unresolved Package Outcome Clusters" section for RadCN exports
    without upstream `ui/` counterparts that still need decisions, excluding
    resolved outcomes from the JSON file.
  - Update "First Recommended Cluster" so it selects the largest unresolved
    example cluster, block cluster, or chart cluster after resolved clusters are
    excluded.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the new tracking model and the next generated
  recommendation.

## Verification

Pass criteria:

- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- `rg -n "\\| form \\| 30 \\|" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  still finds the complete upstream examples table entry for historical
  inventory coverage.
- `node -e "const fs=require('node:fs'); const text=fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md','utf8'); const section=(name)=>text.split('## '+name)[1].split('\\n## ')[0]; if (!/\\| form \\|/.test(section('Resolved Issue Clusters'))) process.exit(1); if (/\\| form \\|/.test(section('Unresolved Example Clusters'))) process.exit(2); if (!/## Unresolved Block Clusters/.test(text) || !/## Unresolved Chart Clusters/.test(text)) process.exit(3)"`
  exits 0 and proves `form` is resolved, excluded from unresolved examples, and
  block/chart queue sections exist.
- `node -e "const fs=require('node:fs'); const data=JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json','utf8')); for (const key of ['examples','blocks','charts','packageOutcomes']) if (!Array.isArray(data[key])) process.exit(1)"`
  exits 0 and proves the resolved-cluster artifact has the expected queue
  shapes.
- `rg -n "Example parity for form|Audit upstream examples for form" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected script, issue, JSON, and inventory
  changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The regenerated inventory still recommends Form as the next cluster.
- The script hides upstream Form examples from the historical full examples
  table instead of only excluding them from unresolved/recommended sections.
- Resolved state is hardcoded in the script instead of being stored in an issue
  artifact.
- The inventory cannot identify a next unresolved cluster after Form.

## Design Review

Reviewer: Confucius (`019e9a34-0bb6-7411-bbd5-89c20335ad8d`)
Fresh context: yes (`fork_context: false`)

Findings:

- Blocker: the original plan said the inventory should track example, block,
  and chart clusters, but only designed example/package outcome tracking. Fixed
  by requiring `resolved-clusters.json` arrays for `examples`, `blocks`,
  `charts`, and `packageOutcomes`, plus unresolved block and chart sections in
  the generated inventory.
- Major: the original verification used a broad `rg` for `| form |`, which
  could not distinguish historical tables from unresolved sections. Fixed by
  adding a section-scoped Node verification that checks `form` appears in the
  resolved section and does not appear in the unresolved example section.

Re-review result: approved with no blocker, major, or minor findings.

## Result

**Result:** Pass

Added Issue 4 resolved-cluster tracking and updated the parity inventory
generator so completed clusters no longer keep reappearing as the next
recommendation.

Changed files:

- `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`
  - Added machine-readable resolved queues for examples, blocks, charts, and
    package outcomes.
  - Recorded Form example parity as resolved, and recorded Form, Date Picker,
    and Data Table package outcomes as resolved.
- `scripts/audit-shadcn-parity.mjs`
  - Reads `resolved-clusters.json` when present.
  - Emits resolved issue clusters, unresolved package outcome clusters,
    unresolved example clusters, unresolved block clusters, and unresolved chart
    clusters.
  - Chooses the first recommended cluster after excluding resolved queues.
- `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  - Regenerated with full historical upstream tables plus the new unresolved
    queues.
  - Now recommends `typography` package outcome decisions instead of repeating
    Form example parity.
- `issues/0004-complete-shadcn-parity-and-docs/README.md`
  - Recorded the resolved-cluster tracking learning and next recommendation.

Verification:

- `node scripts/audit-shadcn-parity.mjs` — Pass.
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  — Pass; no diff.
- `rg -n "\\| form \\| 30 \\|" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  — Pass; the historical upstream examples table still includes Form.
- `node -e "const fs=require('node:fs'); const text=fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md','utf8'); const section=(name)=>text.split('## '+name)[1].split('\\n## ')[0]; if (!/\\| form \\|/.test(section('Resolved Issue Clusters'))) process.exit(1); if (/\\| form \\|/.test(section('Unresolved Example Clusters'))) process.exit(2); if (!/## Unresolved Block Clusters/.test(text) || !/## Unresolved Chart Clusters/.test(text)) process.exit(3)"`
  — Pass.
- `node -e "const fs=require('node:fs'); const data=JSON.parse(fs.readFileSync('issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json','utf8')); for (const key of ['examples','blocks','charts','packageOutcomes']) if (!Array.isArray(data[key])) process.exit(1)"`
  — Pass.
- `rg -n "Example parity for form|Audit upstream examples for form" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  — Pass; exited 1 with no matches.
- `git diff --check` — Pass.
- `git status --short` — Pass; only expected script, issue, JSON, and
  inventory files are modified.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  — Pass; no output.

## Conclusion

Issue 4 now has a machine-readable way to remember completed parity clusters.
The generated inventory remains complete for historical upstream coverage, but
the unresolved queues and first recommendation now skip resolved work.

The next experiment should resolve the `typography` package outcome decision.

## Completion Review

Reviewer: Avicenna (`019e9a37-fcb7-7801-b3e1-1a23e3f7251e`)
Fresh context: yes (`fork_context: false`)

Findings:

- None.

Review result: approved with no blocker, major, or minor findings.
