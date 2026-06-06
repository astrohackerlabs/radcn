# Experiment 11: Audit field example parity

## Description

Experiment 10 resolved Button example parity and advanced the generated
inventory recommendation to `field`. Upstream shadcn's Field examples cover a
larger composition API than RadCN currently exposes: labels, fieldsets, groups,
legends, separators, content wrappers, titles, horizontal/responsive layouts,
and compositions with input, textarea, checkbox, radio group, switch, slider,
select, and buttons.

This experiment audits all upstream shadcn Field examples and maps them to
RadCN's current package APIs, docs examples, fixture scenarios, and Playwright
coverage. It should not implement Field changes yet. The expected output is a
durable inventory that says whether Field example parity is already complete
or identifies the exact follow-up implementation experiment.

## Changes

- Audit these upstream files from
  `vendor/shadcn-ui/apps/v4/registry/new-york-v4/examples/`:
  - `field-demo.tsx`
  - `field-input.tsx`
  - `field-textarea.tsx`
  - `field-fieldset.tsx`
  - `field-radio.tsx`
  - `field-checkbox.tsx`
  - `field-switch.tsx`
  - `field-slider.tsx`
  - `field-select.tsx`
  - `field-choice-card.tsx`
  - `field-group.tsx`
  - `field-responsive.tsx`
- Create
  `issues/0004-complete-shadcn-parity-and-docs/field-example-inventory.md`
  with:
  - one row per upstream Field example id;
  - the user-facing behavior each example proves;
  - the current RadCN package/docs/fixture/test evidence;
  - the parity outcome: covered, partial, missing, or intentionally divergent;
  - follow-up work needed for each non-covered row.
- Inspect and cite current RadCN Field-related surfaces:
  - `radcn/packages/radcn/src/components/field.tsx`
  - `radcn/packages/radcn/src/components/form.tsx`
  - `radcn/packages/radcn/src/components/label.tsx`
  - `radcn/apps/docs/app/content/components.tsx`
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
  - `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`
  - `radcn/fixtures/tests/native-controls.spec.ts`
  - `radcn/fixtures/tests/form-input-cluster.spec.ts`
- Decide whether `field` should be marked resolved in
  `resolved-clusters.json` now or remain unresolved pending a follow-up
  implementation experiment.
- Regenerate `parity-inventory.md` only if `resolved-clusters.json` changes.
- Update Issue 4 learnings with the audit conclusion and next recommended
  experiment.

## Verification

Pass criteria:

- `field-example-inventory.md` exists.
- A deterministic check proves all 12 upstream Field example ids appear in
  `field-example-inventory.md`.
- The inventory has exactly one outcome row for each upstream id and each row
  records current RadCN evidence or a concrete gap.
- The audit explicitly handles these shadcn-to-RadCN mapping decisions:
  - whether RadCN should add package exports for `FieldLabel`, `FieldSet`,
    `FieldGroup`, `FieldLegend`, `FieldSeparator`, `FieldContent`, and
    `FieldTitle`, or map them to existing primitives;
  - horizontal and responsive Field layout behavior;
  - fieldset/legend semantics;
  - choice-card composition with nested labels and radio items;
  - checkbox, radio, switch, select, textarea, slider, and button compositions;
  - shadcn's `field-slider` React `useState` example as a behavior pattern
    rather than a React state dependency.
- If `resolved-clusters.json` changes, `node scripts/audit-shadcn-parity.mjs`
  and the parity inventory regeneration diff check both pass.
- If the audit marks `field` resolved, the regenerated inventory no longer
  recommends `field` as the first unresolved example cluster.
- If the audit keeps `field` unresolved, the experiment conclusion names the
  next implementation experiment and the minimum missing package/docs/fixture
  proof required.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json issues/0004-complete-shadcn-parity-and-docs/field-example-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected Issue 4 documentation, inventory,
  and optional resolved-cluster/generated-inventory changes before the result
  commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Any upstream Field example id is missing from the inventory.
- The audit claims parity based only on package exports without docs, fixture,
  or test evidence for the user-facing behavior.
- The audit silently treats missing Field composition parts as already covered
  by unrelated Form APIs.
- The audit ports or recommends React-only `useState` behavior for slider
  parity instead of a Remix/web-first state strategy.
- The audit marks `field` resolved while leaving concrete uncovered behavior
  without a documented intentional divergence.

## Design Review

Reviewer: Bernoulli (`019e9a56-ada4-7c50-b946-0c8308199f41`)
Fresh context: yes (`fork_context: false`)

Findings:

- No blockers found.

Approval result: approved. The reviewer confirmed the plan follows the
one-experiment-at-a-time workflow, builds from the generated `field`
recommendation, names all 12 upstream Field files, targets the right
false-coverage risks, avoids premature implementation or resolution, and has
enough criteria to decide the next experiment.

Non-blocking note: the plan requires deterministic checks but does not prescribe
their exact commands. The implementation result should record the actual checks
used.

## Result

**Result:** Pass

Experiment 11 created `field-example-inventory.md` and audited all 12 upstream
Field examples. The audit keeps `field` unresolved because RadCN's current
Field API and examples do not yet cover the full upstream Field composition
surface.

Confirmed current coverage:

- Basic `Field`, `FieldDescription`, `FieldError`, `Label`, and `Input` wiring
  exists in docs and candidate fixtures.
- Broader `radcn/form` examples cover several control compositions such as
  textarea, select, checkbox group, radio group, switch, and server/action
  state.

Confirmed gaps:

- `radcn/field` lacks `FieldLabel`, `FieldSet`, `FieldGroup`, `FieldLegend`,
  `FieldSeparator`, `FieldContent`, and `FieldTitle`.
- Horizontal and responsive Field orientation are not package APIs yet.
- Fieldset/legend semantics, choice-card composition, grouped checkbox/radio
  sections, and Field-specific select/slider/switch/textarea examples need
  docs, fixture, and Playwright proof.
- The upstream `field-slider` example's React `useState` live value display
  needs a Remix/web-first strategy instead of a React state port.

Verification run:

- `field-example-inventory.md` exists.
- A deterministic Node check proved all 12 upstream Field example ids appear in
  `field-example-inventory.md`.
- A deterministic Node check proved the inventory has exactly one outcome row
  for each upstream id.
- A deterministic Node check proved the inventory explicitly discusses
  `FieldLabel`, `FieldSet`, `FieldGroup`, `FieldLegend`, `FieldSeparator`,
  `FieldContent`, `FieldTitle`, horizontal/responsive layout,
  fieldset/legend semantics, choice-card composition, checkbox, radio, switch,
  select, textarea, slider, button composition, `useState`, and the web-first
  mapping.
- The no-vendor/no-React/no-publish scope grep exited 1 with no matches.
- `git diff --check` passed.
- Vendor status checks for shadcn/ui, Remix, and React Router printed no
  output.
- `git status --short` showed only the expected Issue 4 experiment, README,
  and `field-example-inventory.md` changes before completion review.

## Conclusion

Field example parity needs a follow-up implementation experiment. The next
experiment should add the missing Field composition parts and orientation
props, expand docs and candidate fixtures for all 12 upstream Field examples,
and add Playwright coverage before marking `field` resolved.

## Completion Review

Reviewer: Chandrasekhar (`019e9a59-a3c6-7d62-a610-3db38e414839`)
Fresh context: yes (`fork_context: false`)

Result: approved after evidence wording fix.

Findings:

- Major: the recorded `git status --short` evidence originally named only the
  README and `field-example-inventory.md`, while the experiment file itself was
  also modified after result recording. Fixed by naming the experiment file in
  the evidence.

Approval evidence:

- `field-example-inventory.md` maps all 12 upstream Field ids exactly once.
- The audit leaves `field` unresolved and does not change
  `resolved-clusters.json` or `parity-inventory.md`.
- The audit records the expected Field gaps: missing Field parts,
  horizontal/responsive orientation, fieldset/legend and grouped-control proof,
  and a web-first slider value-display strategy.
- The no-vendor/no-React/no-publish grep exited 1 with no matches.
- `git diff --check` passed.
- Vendor status checks printed no output.
