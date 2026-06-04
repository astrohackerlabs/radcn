# Experiment 4: Stage 1 Native Select and Closure Audit

## Description

Port the remaining Stage 1 native form-control component and audit whether
Stage 1 is complete.

This experiment covers:

- `native-select`
- Stage 1 closure audit

The goal is to complete the last explicit Stage 1 component from Issue 2 and
prove the native form-control contract for select controls: label association,
name/value submission, reset behavior, required validation, disabled state,
invalid state, option groups, size variants, and customization hooks.

After `native-select` lands, the experiment must audit the full Stage 1 list
from Issue 2 and record whether every Stage 1 component has source, exports,
reference fixtures, candidate fixtures, artifact coverage, component-specific
parity checks, documentation, and review. If the audit finds missing Stage 1
work, the result may still be `Pass` for `native-select`, but Stage 1 must not
be closed; the conclusion must name the next cleanup experiment.

This experiment must not start Stage 2. It may only close Stage 1 if the audit
proves all Stage 1 completion criteria are satisfied.

The experiment must record reusable discoveries in the issue `## Learnings`
section when they affect later components.

## Changes

Add RadCN source under `packages/radcn/src/components/`:

- `native-select.tsx`

The component family should include:

- `NativeSelect`
- `NativeSelectOption`
- `NativeSelectOptGroup`

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- wrapper, select, option, optgroup, and icon hooks;
- `size="default"` and `size="sm"`;
- disabled, invalid, focus-visible, and customization states;
- stable `radcn-*` classes and `data-radcn-*` attributes.

Update candidate fixtures so the Remix 3 app imports `native-select` from
`radcn`, not fixture-local placeholders.

Update React Router reference fixtures with equivalent shadcn/ui-inspired
examples for the same scenarios. Reference fixtures may use local reference
markup/styles instead of importing vendored source directly, but they must
preserve the visible and semantic surfaces needed for comparison.

Add shared scenarios only for this component and the closure audit. Expected
`native-select` coverage:

- `native-select/default`
- `native-select/groups`
- `native-select/disabled`
- `native-select/invalid`
- `native-select/sizes`
- `native-select/custom-token`
- `native-select/form-submit-reset`
- `native-select/required-validation`

Add component-specific Playwright checks for form and accessibility behavior,
not only screenshot capture. The checks should prove at least:

- `NativeSelect` renders a real `<select>` with stable wrapper/select/icon
  hooks.
- `NativeSelectOption` renders real `<option>` elements with values and hooks.
- `NativeSelectOptGroup` renders real `<optgroup>` elements with labels and
  hooks.
- labels can target the select by `id`.
- disabled state prevents interaction and exposes disabled semantics.
- invalid state exposes `aria-invalid` and visible/customizable styling.
- size variants expose `data-size` and stable class hooks.
- form submission includes the selected `name=value` pair.
- form reset restores the initial selected value.
- required validation blocks native submission when no value is selected.
- customization probes can override a documented token or class hook.

Update documentation for `native-select` and Stage 1 closure. This can extend
`docs/radcn-source.md` or add a focused Stage 1 note. It must explain:

- native select source and export shape;
- form/native-web behavior and why RadCN uses a real `<select>`;
- wrapper/select/option/optgroup/icon hooks;
- size, disabled, invalid, required, and customization behavior;
- any known browser-rendering limitations for native selects;
- whether Stage 1 is complete after the audit, with evidence.

Add a Stage 1 audit artifact. A likely location is:

```text
issues/0002-implement-entire-shadcn-port/stage-1-audit.md
```

The audit must list every Stage 1 component from Issue 2 and mark whether it
has:

- RadCN source and exports;
- reference and candidate fixture routes;
- artifact coverage;
- component-specific checks;
- documentation;
- independent review coverage;
- final Stage 1 disposition.

## Verification

The experiment passes if:

1. RadCN source exists for `native-select`.
2. `packages/radcn` exports the `native-select` family from a package subpath
   and the root index.
3. The Remix 3 candidate app imports `native-select` from RadCN source.
4. Shared scenarios include default, groups, disabled, invalid, sizes,
   customization, form submission/reset, and required-validation probes.
5. Reference and candidate fixture routes exist for every shared scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for all
   shared scenarios.
10. Component-specific checks prove the form, accessibility, state, size, and
    customization behavior listed in `## Changes`.
11. Documentation explains native select source layout, hooks, native form
    behavior, browser-rendering limitations, and customization.
12. The Stage 1 audit artifact lists every Stage 1 component and gives a
    supported completion/disposition status.
13. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
14. No files under `vendor/` are modified.
15. Independent completion review approves the result or findings are fixed and
    recorded.

If the audit proves Stage 1 is complete, the experiment should update the issue
README to say Stage 1 is complete and the next experiment should begin Stage 2.
If the audit finds gaps, the experiment must leave Stage 1 open and identify
the next Stage 1 cleanup experiment in its conclusion.

## Design Review

Independent AI design review was performed by subagent `Kuhn`, which approved
the design with no required fixes.

The review confirmed that the experiment is scoped to Stage 1, covers only
`native-select` plus a Stage 1 closure audit, preserves the
one-experiment-at-a-time workflow, provides concrete native-select verification
for real select/option/optgroup elements, label association, disabled/invalid/
size hooks, submit/reset, required validation, and customization checks,
requires a concrete Stage 1 audit artifact, avoids vendor edits, and does not
start Stage 2 unless the audit proves Stage 1 complete.
