# Experiment 6: Implement form example parity depth

## Description

Experiment 5 audited all 30 upstream shadcn form examples and found that the
current RadCN form package is directionally correct, but the public proof
surface is too narrow. The Form docs and Form fixture cover native validation,
server errors, action-state display, and custom tokens. They do not yet show
the full user-facing behavior set that upstream demonstrates through React Hook
Form, TanStack Form, Formisch, and Next action examples.

This experiment implements that missing example depth without adding app-state
libraries or changing the `radcn/form` package API unless a concrete helper gap
is discovered during implementation. The goal is to prove the audited upstream
behaviors through native forms, explicit form wiring, existing RadCN
primitives, docs examples, candidate fixtures, and Playwright coverage.

This experiment does not publish RadCN, add validation dependencies, port
React-only form libraries, or implement every form-state-library variant as a
separate RadCN example. Parity is by user-facing behavior cluster.

## Changes

- Update `radcn/fixtures/candidate-remix/app/fixtures/form.tsx`.
  - Add package-backed Form scenarios for:
    - basic non-error form;
    - textarea field;
    - select field;
    - checkbox group;
    - radio group;
    - switch field;
    - repeated array/list fields;
    - password strength with Input Group and Progress;
    - complex multi-section form;
    - richer server/action state with multiple field errors.
  - Use existing RadCN primitives: `Input`, `Textarea`, `Select`, `Checkbox`,
    `RadioGroup`, `Switch`, `InputGroup`, `Progress`, `Card`, `Button`, and
    Form helpers.
  - Keep all state explicit in rendered markup, query strings, default values,
    and native controls.
- Update `radcn/fixtures/scenarios/index.ts`.
  - Add scenario metadata for the new Form behavior clusters.
- Update `radcn/fixtures/tests/form-input-cluster.spec.ts`.
  - Assert the new Form scenarios render package hooks and expected accessible
    controls.
  - Assert select, checkbox group, radio group, switch, array/list, password
    strength, and complex form scenarios expose the expected submitted controls,
    labels, descriptions, invalid states, and custom hooks.
  - Preserve negative dependency assertions for form-state and schema packages.
- Update `radcn/apps/docs/app/content/components.tsx`.
  - Expand the rich Form docs entry from one example to multiple examples or a
    single comprehensive example that clearly demonstrates:
    - basic form;
    - invalid/server-error form;
    - select/checkbox/radio/switch controls;
    - repeated list fields;
    - password strength;
    - complex multi-section composition.
  - Explain that upstream library-specific examples map to RadCN behavior
    clusters, not package dependencies.
  - Keep installation copy aspirational and do not claim npm publishing works.
- Update `radcn/apps/docs/tests/coverage.spec.ts` only if new docs hooks or
  route-specific assertions are needed for Form coverage.
- Update `issues/0004-complete-shadcn-parity-and-docs/form-example-inventory.md`
  if implementation changes any outcome from missing/partial to covered.
- Update Issue 4 learnings with the final Form example parity decision and the
  next recommended cluster after form examples.
- Do not add package dependencies or imports from `vendor/`.

## Verification

Pass criteria:

- `pnpm radcn:typecheck`
- `pnpm --dir radcn/apps/docs typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts form-input-cluster.spec.ts`
- `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts coverage.spec.ts`
- `rg -n "from ['\"](\\.\\./)*vendor/|from ['\"][^'\"]*vendor/|from ['\"]react['\"]|react-hook-form|@hookform/resolvers|@tanstack/react-form|from ['\"]@formisch/react['\"]|from ['\"]valibot['\"]|from ['\"]zod['\"]|\"(react-hook-form|@hookform/resolvers|@tanstack/react-form|@formisch/react|valibot|zod)\"\\s*:|npm publish|pnpm publish|publishConfig" radcn/packages/radcn radcn/apps/docs radcn/fixtures/candidate-remix package.json`
  exits 1 with no matches.
- `git diff --check`
- `git status --short` shows only expected docs, fixture, test, issue, and
  optional inventory changes before the result commit.
- `for d in vendor/shadcn-ui vendor/remix vendor/react-router; do git -C "$d" status --short; done`
  prints no output.

Failure criteria:

- The implementation adds React Hook Form, TanStack Form, Formisch, Valibot,
  Zod, or another validation/form-state dependency to RadCN.
- The docs still only show a single invalid input Form example after this
  experiment.
- The candidate fixture does not cover at least the behavior clusters listed in
  Experiment 5's next recommendation.
- Browser coverage only checks static route loading and does not assert the new
  form controls, ARIA wiring, submitted values, or invalid states.
- The implementation changes `radcn/form` package API without recording a
  concrete helper gap and proving it through tests.

## Design Review

Reviewer: Sagan (`019e9a2a-5c4f-7591-b0a4-277f327e2811`)
Fresh context: yes (`fork_context: false`)

Findings:

- None.

Review result: approved with no blocker, major, or minor findings.
