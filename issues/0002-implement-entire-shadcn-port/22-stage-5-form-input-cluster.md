# Experiment 22: Stage 5 Form and Input Cluster

## Description

Begin Stage 5 by resolving the form/input cluster:

- `input-group`
- `input-otp`
- `form`

This cluster is the right first Stage 5 slice because it builds on existing
RadCN native form controls, field wiring, buttons, textareas, validation hooks,
and progressive enhancement. It should produce concrete RadCN source for the
portable input primitives and an explicit reviewed disposition for shadcn/ui's
React form-library adapter.

Upstream shapes:

- `input-group` is a React component group around `Input`, `Textarea`, and
  `Button`, with addon placement, text slots, button slots, grouped focus and
  invalid/disabled styling.
- `input-otp` wraps the React-specific third-party `input-otp` package and
  exposes visual slots, separators, active slot state, fake caret behavior,
  pattern filtering, disabled/invalid states, paste handling, and form value.
- `form` is a `react-hook-form` adapter built around React context,
  `Controller`, `useFormContext()`, `useFormState()`, Radix `Slot`, and
  generated IDs. That API does not map directly to Remix 3 server-first forms.

Expected disposition:

- `input-group` should be ported as a core RadCN source component because it is
  mostly semantic grouping plus layout slots around existing controls.
- `input-otp` should be ported as a RadCN progressive-enhancement component
  without the React `input-otp` package. The core contract is user-visible OTP
  entry, slot rendering, paste, pattern filtering, keyboard editing,
  disabled/invalid state, accessibility, and native form submission.
- `form` should not copy the `react-hook-form` adapter as a core component.
  This experiment should document a Remix 3-native replacement strategy:
  native `<form>` plus RadCN `Field`, `Label`, controls, server/action
  validation output, and optional recipe fixtures. If the implementation proves
  a small reusable helper is necessary for ARIA wiring, it may add one, but the
  experiment must not introduce `react-hook-form`, `zod`, or React context as a
  RadCN dependency.

The experiment should add reusable source, scenarios, fixtures, tests,
documentation, and learnings for the cluster. It should not start `chart`,
`data-table`, `sonner`, `toast`, `resizable`, or `sidebar`.

### Input Group Requirements

Keep the familiar author-facing parts:

- `InputGroup`
- `InputGroupAddon`
- `InputGroupButton`
- `InputGroupText`
- `InputGroupInput`
- `InputGroupTextarea`

The RadCN API should preserve:

- root `role="group"` and stable `data-radcn-input-group`;
- addon alignment: `inline-start`, `inline-end`, `block-start`, `block-end`;
- text/adornment slots;
- button slots with `type`, `variant`, `size`, `disabled`, class/style hooks;
- input and textarea control slots that preserve native `name`, `value`,
  `disabled`, `required`, `aria-invalid`, `aria-describedby`, submit, reset,
  pointer, keyboard, and focus behavior;
- addon pointer behavior that focuses the contained input or textarea when the
  addon itself is clicked, while not stealing clicks from nested buttons.

Shared `input-group` scenarios should include:

- `input-group/default`
- `input-group/addons`
- `input-group/buttons`
- `input-group/textarea`
- `input-group/disabled-invalid`
- `input-group/form-submit-reset`
- `input-group/block-addons`
- `input-group/custom-token`

### Input OTP Requirements

Keep the familiar author-facing parts:

- `InputOTP`
- `InputOTPGroup`
- `InputOTPSlot`
- `InputOTPSeparator`

The RadCN implementation should use a real form control as the source of truth.
The visible slots mirror the input value; they do not replace native form
behavior.

The RadCN API should support:

- `id`, `name`, `value`, `defaultValue`, `maxLength`, `pattern`, `placeholder`,
  `disabled`, `required`, `ariaLabel`, `ariaLabelledby`, `ariaDescribedBy`,
  `ariaInvalid`, `class`, `containerClass`, and `style`;
- slot indexes with deterministic `data-index`, `data-char`, `data-active`,
  `data-filled`, and fake-caret hooks;
- separators with `role="separator"`;
- digit-only and alphanumeric pattern presets exported by RadCN if useful for
  parity with upstream examples;
- paste handling that filters accepted characters and fills slots;
- Backspace/Delete editing, ArrowLeft/ArrowRight movement, Home/End movement,
  and focus behavior;
- native form submission and reset;
- `radcn-input-otp-change` event emission if browser enhancement owns mirrored
  slot state.

Shared `input-otp` scenarios should include:

- `input-otp/default`
- `input-otp/separator`
- `input-otp/digits-only`
- `input-otp/alphanumeric`
- `input-otp/four-digits`
- `input-otp/disabled`
- `input-otp/invalid`
- `input-otp/form-submit-reset`
- `input-otp/paste`
- `input-otp/custom-token`

### Form Disposition Requirements

Record a final Stage 5 disposition for `form` in this experiment.

The disposition should answer:

- why the upstream `react-hook-form` adapter is not a core RadCN port;
- how Remix 3 native forms, action data, `Field`, labels, controls, and
  `aria-describedby`/`aria-invalid` wiring replace the adapter pattern;
- whether RadCN needs any small helper or recipe for repeated ARIA wiring;
- how install/source parity works for form examples when no `radcn/form`
  package subpath is exported;
- how form examples should be demonstrated in fixtures and docs.

Shared `form` scenarios should include recipe/disposition fixtures rather than
placeholder component source:

- `form/native-validation`
- `form/server-errors`
- `form/action-state`
- `form/custom-token`

These scenarios should demonstrate the supported Remix 3 pattern with existing
RadCN primitives. If no `radcn/form` export is added, focused tests must prove
that absence is intentional and documented.

## Changes

Expected implementation files:

- `packages/radcn/src/components/input-group.tsx`
  - Add the input-group component parts, prop types, stable classes/data hooks,
    and any small enhancement needed for addon focus behavior.
- `packages/radcn/src/components/input-otp.tsx`
  - Add the OTP component parts, prop types, pattern constants, and
    `enhanceInputOTP()` if browser enhancement is needed for slot mirroring and
    keyboard/paste behavior.
- `packages/radcn/package.json`
  - Add `./input-group` and `./input-otp` exports.
  - Do not add `./form` unless the experiment proves a core source component is
    necessary.
- `packages/radcn/src/index.ts`
  - Export input-group and input-otp parts, types, constants, and enhancement.
- `packages/radcn/src/styles/tokens.css`
  - Add input-group and input-otp public classes, state hooks, layout variants,
    invalid/disabled states, focus/caret styles, and custom token hooks.
- `packages/radcn/src/styles/index.ts`
  - Regenerate after token changes.
- `fixtures/candidate-remix/app/assets/entry.ts`
  - Load `enhanceInputOTP()` if implemented.
- `fixtures/scenarios/types.ts`
  - Add `input-group`, `input-otp`, and `form` to `FixtureComponent`.
- `fixtures/scenarios/index.ts`
  - Add every shared scenario listed above.
- `fixtures/candidate-remix/app/fixtures/input-group.tsx`
  - Add candidate fixtures using real RadCN input-group source.
- `fixtures/candidate-remix/app/fixtures/input-otp.tsx`
  - Add candidate fixtures using real RadCN input-otp source.
- `fixtures/candidate-remix/app/fixtures/form.tsx`
  - Add candidate recipe/disposition fixtures using existing RadCN form
    primitives and native Remix form behavior.
- `fixtures/candidate-remix/app/fixtures/index.tsx`
  - Route the new candidate fixtures.
- `fixtures/reference-react-router/app/fixtures/input-group.tsx`
  - Add matching React Router reference fixtures.
- `fixtures/reference-react-router/app/fixtures/input-otp.tsx`
  - Add matching React Router reference fixtures.
- `fixtures/reference-react-router/app/fixtures/form.tsx`
  - Add reference form recipe fixtures.
- `fixtures/reference-react-router/app/fixtures/index.ts`
  - Route the new reference fixtures.
- `fixtures/reference-react-router/app/app.css`
  - Add reference styles for the new fixtures.
- `fixtures/tests/form-input-cluster.spec.ts`
  - Add focused candidate behavior tests for input-group, input-otp, and the
    form disposition.
- `docs/radcn-source.md`
  - Document input-group, input-otp, and the Remix 3-native form disposition.
- `issues/0002-implement-entire-shadcn-port/README.md`
  - Update the experiment status and add reusable learnings.

## Verification

The experiment passes if:

1. `input-group` RadCN source exists and exports every supported part from
   `radcn/input-group` and the root index.
2. `input-otp` RadCN source exists and exports every supported part, constants,
   and enhancement from `radcn/input-otp` and the root index.
3. No React-only dependencies are added for this cluster: no `react-hook-form`,
   `zod`, `@hookform/resolvers`, `input-otp`, or React context dependency is
   introduced in `packages/radcn`.
4. If `radcn/form` is not exported, docs and tests prove that the omission is
   intentional and that `form` has a final recipe/disposition outcome.
5. Shared scenarios include every required `input-group`, `input-otp`, and
   `form` scenario.
6. Reference and candidate fixture routes exist for every shared scenario.
7. Component-specific Playwright checks cover input-group semantics, addon
   alignment, addon focus delegation, nested button click preservation,
   disabled/invalid states, textarea layout, block addons, form submit/reset,
   and custom tokens.
8. Component-specific Playwright checks cover input-otp semantics, visible slot
   mirroring, separator semantics, pattern filtering, keyboard editing,
   paste behavior, disabled/invalid states, required validation if supported,
   form submit/reset, and custom tokens.
9. Component-specific Playwright checks cover the `form` disposition with
   native validation, server/action error rendering, ARIA describedby/invalid
   wiring, no `radcn/form` export if intentionally omitted, and custom tokens.
10. Artifact screenshots capture paired reference/candidate output for every
    new scenario.
11. Documentation explains the input-group port, input-otp native-control
    strategy, React `input-otp` package divergence, React Hook Form divergence,
    Remix 3 form replacement strategy, and install/source parity for recipe
    outcomes.
12. Issue learnings record reusable form/ARIA, OTP, and recipe-disposition
    rules needed by later Stage 5 work.
13. `pnpm radcn:typecheck` passes.
14. `pnpm fixtures:candidate:typecheck` passes.
15. `pnpm fixtures:reference:typecheck` passes.
16. Focused form/input-cluster Playwright tests pass.
17. `pnpm fixtures:artifacts` passes.
18. `git status --short -- vendor` returns no output.
19. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should complete the form/input cluster, but it should not close
Stage 5. Later experiments still need final outcomes for `chart`,
`data-table`, `sonner`, `toast`, `resizable`, `sidebar`, and any block
dispositions not resolved here.

## Design Review

Independent AI design review was performed by subagent `Noether` and returned
**Pass**.

Noether confirmed that the plan is sufficiently scoped and testable. The review
found the `input-group`, `input-otp`, and `form` grouping coherent because all
three resolve form/input architecture and dependency policy at the start of
Stage 5, while explicitly excluding unrelated Stage 5 systems.

The review also confirmed:

- the README links Experiment 22 with `Designed` status;
- the plan blocks React-only dependencies such as `react-hook-form`, `zod`,
  `@hookform/resolvers`, `input-otp`, and React context in `packages/radcn`;
- `form` has a real final disposition path through Remix 3-native recipes,
  docs, and tests, including an intentional no-export proof if `radcn/form` is
  omitted;
- `input-otp` verification covers slot mirroring, keyboard editing, paste,
  filtering, form submit/reset, disabled/invalid states, and accessibility;
- required source files, exports, scenarios, fixtures, docs, tests, artifacts,
  vendor cleanliness, and completion review are covered;
- the plan does not design later Stage 5 experiments, and only names the
  remaining systems as future work.

Non-blocking implementation note:

- Since `required` is listed as an `InputOTP` API prop, implementation should
  treat required validation as mandatory unless a reviewed browser/platform
  limitation is discovered and documented.
