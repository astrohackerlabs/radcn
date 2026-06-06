# Experiment 12: Implement field example parity depth

## Description

Experiment 11 audited all 12 upstream shadcn Field examples and found concrete
Field package and proof gaps. RadCN currently has `Field`,
`FieldDescription`, and `FieldError`, but upstream parity needs additional
composition parts, fieldset/legend semantics, horizontal/responsive layouts,
choice-card patterns, grouped controls, and a web-first slider value-display
strategy.

This experiment implements Field example parity depth. It should keep RadCN's
web-first model: no React context, no React `useState` port, no vendor imports,
and no npm publishing.

## Changes

- Update `radcn/packages/radcn/src/components/field.tsx`.
  - Add `FieldLabel`, `FieldSet`, `FieldLegend`, `FieldGroup`,
    `FieldSeparator`, `FieldContent`, and `FieldTitle` exports.
  - Add an `orientation` prop to `Field` with at least `vertical`,
    `horizontal`, and `responsive` outcomes.
  - Preserve semantic host elements: `FieldSet` should render `<fieldset>`,
    `FieldLegend` should render `<legend>`, labels should render `<label>`,
    and separators should render an appropriate decorative host element.
  - Expose data hooks for every new part and orientation.
- Update `radcn/packages/radcn/src/index.ts` so the root `radcn` export surface
  exposes the new Field parts consistently with the `radcn/field` subpath.
- Update RadCN styles:
  - `radcn/packages/radcn/src/styles/tokens.css`
  - `radcn/packages/radcn/src/styles/index.ts`
  Add layout, spacing, separator, content, title, fieldset, legend, horizontal,
  responsive, and choice-card styling hooks while keeping styles token-driven.
- Update docs in `radcn/apps/docs/app/content/components.tsx`.
  - Expand the Field docs page to demonstrate all new package parts.
  - Include examples for input, textarea, fieldset, radio, checkbox, switch,
    slider, select, choice-card, grouped sections, responsive layout, and a
    compact checkout-like composition.
  - Document that `radcn/form` remains for server/action wiring, while
    `radcn/field` owns reusable field layout and grouping primitives.
  - Document the web-first slider value strategy instead of React `useState`.
- Update candidate fixtures:
  - `radcn/fixtures/scenarios/index.ts`
  - `radcn/fixtures/candidate-remix/app/fixtures/field.tsx`
  Add fixture scenarios for all 12 upstream Field examples:
  `demo`, `input`, `textarea`, `fieldset`, `radio`, `checkbox`, `switch`,
  `slider`, `select`, `choice-card`, `group`, and `responsive`.
- Update Playwright coverage in `radcn/fixtures/tests/native-controls.spec.ts`
  or a focused Field test file if that keeps the suite clearer. Verify:
  - `FieldSet` renders `fieldset` and `FieldLegend` renders `legend`;
  - Field orientation writes stable data hooks for horizontal and responsive
    layouts;
  - `FieldGroup`, `FieldSeparator`, `FieldContent`, and `FieldTitle` render
    expected hooks and text;
  - label/control wiring works for input and textarea;
  - checkbox, radio, switch, select, slider, and button compositions render
    with package primitives;
  - choice-card composition exposes nested title/description/radio semantics;
  - slider value-display behavior is web-first and does not require React
    state.
- Update `issues/0004-complete-shadcn-parity-and-docs/field-example-inventory.md`.
  - Change each upstream row to `Covered` or intentional divergence after the
    new proof lands.
  - Preserve the mapping decisions from Experiment 11.
- Update `issues/0004-complete-shadcn-parity-and-docs/resolved-clusters.json`.
  - Mark `field` as a resolved example cluster with evidence from Experiments
    11 and 12 plus `field-example-inventory.md`.
- Regenerate `issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`.
- Update Issue 4 learnings with the final Field outcome and next generated
  recommendation.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts native-controls.spec.ts`
  or the focused Field Playwright spec created by this experiment.
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `node scripts/audit-shadcn-parity.mjs`
- `tmp=$(mktemp) && cp issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md "$tmp" && node scripts/audit-shadcn-parity.mjs >/tmp/radcn-parity-regen.log && diff -u "$tmp" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md; regen_status=$?; rm "$tmp"; cat /tmp/radcn-parity-regen.log; exit $regen_status`
  exits 0 and prints no diff.
- A deterministic Node check proves all 12 upstream Field example ids appear
  exactly once in `field-example-inventory.md`.
- A deterministic Node check proves every upstream Field example row has a
  final outcome of `Covered` or `Intentional divergence`, and that no row keeps
  a `Partial` or `Missing` outcome.
- A deterministic Node check proves `resolved-clusters.json` includes an
  `examples` entry with `slug = "field"`, `status = "resolved"`, and evidence
  for Experiment 11, Experiment 12, and `field-example-inventory.md`.
- A deterministic Node check proves
  `radcn/packages/radcn/src/styles/index.ts` is exactly
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n` for
  `radcn/packages/radcn/src/styles/tokens.css`.
- `rg -n "Example parity for field|Audit upstream examples for field" issues/0004-complete-shadcn-parity-and-docs/parity-inventory.md`
  exits 1 with no matches.
- Deterministic checks prove both `radcn/packages/radcn/src/components/field.tsx`
  and `radcn/packages/radcn/src/index.ts` export all new Field parts:
  `FieldLabel`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldSeparator`,
  `FieldContent`, and `FieldTitle`.
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|useState\\(|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json issues/0004-complete-shadcn-parity-and-docs/field-example-inventory.md`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected package, docs, fixture, test, issue,
  resolved-cluster, and generated-inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- Field still lacks any audited composition part or orientation behavior.
- FieldSet/FieldLegend are implemented as generic divs instead of semantic
  fieldset/legend elements.
- Slider value-display parity depends on React `useState` or another
  React-only state strategy.
- Docs or fixtures imply `radcn/form` alone solves Field layout parity.
- The audit inventory marks `field` resolved while any upstream Field example
  still lacks package/docs/fixture/test evidence or a documented intentional
  divergence.
- The regenerated parity inventory still recommends `field` as the first
  unresolved example cluster.

## Design Review

Reviewer: Epicurus (`019e9a5c-e844-73e3-8b1f-0b06056d3809`)
Fresh context: yes (`fork_context: false`)

Findings:

- Major: the resolved-cluster verification only checked that `field` appeared
  in the examples queue, not that it had `status = "resolved"` and evidence for
  Experiment 11, Experiment 12, and `field-example-inventory.md`. Fixed by
  strengthening the deterministic JSON check.
- Minor: the plan did not include `radcn/packages/radcn/src/index.ts`, even
  though the root package currently re-exports Field parts and candidate
  fixtures import from the root `radcn` package. Fixed by adding the root barrel
  update and requiring export checks for both `field.tsx` and `index.ts`.

Approval result: approved with the two fixes recommended before
implementation. The fixes above have been applied.

Re-review result: approved with no remaining blocker, major, or minor findings.
Epicurus confirmed the resolved-cluster evidence check and root barrel export
verification now cover the prior gaps.
