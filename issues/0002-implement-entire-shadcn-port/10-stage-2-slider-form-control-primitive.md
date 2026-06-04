# Experiment 10: Stage 2 Slider Form Control Primitive

## Description

Continue Stage 2 by porting the bounded range form-control primitive:

- `slider`

This experiment should not port `avatar`, `scroll-area`, or `hover-card`. It
should not start Stage 3 overlay work or Stage 4 composite widgets.

Experiments 8 and 9 established two client enhancement patterns:

- tabs need a selected-state helper for ARIA relationships and roving focus;
- toggle and toggle-group need a smaller pressed-state helper for native
  button state and group coordination.

Slider is different because it is both a visual control and a native form value.
The experiment should decide whether RadCN can provide shadcn/ui-compatible
single-thumb slider behavior with native `<input type="range">`, or whether the
Radix/shadcn multi-thumb model requires a custom client primitive in Stage 2.

The goal is to preserve visible slider behavior, keyboard and pointer
interaction, accessibility semantics, value hooks, form behavior, and
customization hooks while choosing the smallest Remix 3-compatible strategy.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/slider.tsx`

The exported component family should include:

- `Slider`

The public API should preserve shadcn/ui's author-facing shape where practical:

- `Slider` accepts `name`;
- `Slider` accepts `value` or `defaultValue`;
- `Slider` accepts `min`, `max`, and `step`;
- `Slider` accepts `disabled`;
- `Slider` accepts `orientation` if the chosen strategy can support it
  accessibly and consistently;
- `Slider` exposes stable root, input, track, range, and thumb hooks;
- `Slider` exposes value hooks such as `data-value`, `data-min`, `data-max`,
  and `data-orientation`.

The experiment must explicitly choose a state strategy:

1. Native-first single-thumb slider using `<input type="range">`, CSS variables
   for visible value/range styling, and a small enhancement only if necessary
   to keep value hooks and visual range current.
2. Custom client primitive if native range cannot satisfy the required
   shadcn/ui behavior.

Do not leave both strategies half-implemented. If the implementation chooses
native single-thumb slider and defers multi-thumb support, document that as an
approved divergence with evidence from the inventory and tests. If it chooses a
client helper, export it from the package and load it through the candidate
Remix browser entry, matching prior client enhancement patterns.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- slider root, native input, track, range, and thumb hooks;
- default, value, disabled, vertical if supported, focused, and customized
  states;
- stable `radcn-*` classes and `data-radcn-*` attributes;
- visible focus treatment for keyboard navigation;
- current value rendering through CSS variables or data attributes.

Add candidate fixtures that import `Slider` from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use Radix if already available, or local
markup that preserves the visible, semantic, keyboard, pointer, and form
surfaces needed for comparison.

Shared scenarios for this experiment should include:

- `slider/default`
- `slider/value`
- `slider/disabled`
- `slider/step`
- `slider/custom-token`
- `slider/form-submit-reset`

If vertical orientation is supported, add `slider/vertical`; if it is not
supported, document why native range vertical rendering is not part of the
portable Stage 2 surface.

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN slider source;
- the rendered control is accessible as a slider;
- min, max, step, current value, and disabled state are reflected in real
  attributes;
- pointer or programmatic input changes update the value and visible hooks;
- keyboard interaction changes value with Arrow keys, Home, and End where the
  platform supports it;
- disabled sliders cannot be changed;
- form submission includes the slider value;
- form reset restores the initial value;
- customization probes can override documented tokens or class hooks;
- any multi-thumb or vertical-orientation limitation is documented as an
  approved divergence.

Document approved divergences from upstream shadcn/ui/Radix behavior. At
minimum, the docs must answer:

- whether RadCN slider is native range, a custom primitive, or a hybrid;
- whether multi-thumb values are supported now, deferred, or excluded;
- how value, min, max, step, disabled, focused, and customized states map to
  Remix 3 markup and attributes;
- whether vertical orientation is supported;
- how form submission and reset work;
- whether the slider strategy should inform later form/control primitives.

Add issue-level learnings when the experiment discovers a reusable range-input
strategy, native limitation, keyboard test pattern, form behavior, client
enhancement boundary, or approved divergence needed by later components.

## Verification

The experiment passes if:

1. RadCN source exists for `slider`.
2. `packages/radcn` exports slider from a package subpath and the root index.
3. The Remix 3 candidate app imports `Slider` from RadCN source.
4. Shared scenarios include `default`, `value`, `disabled`, `step`,
   `custom-token`, and `form-submit-reset`, plus `vertical` if supported.
5. Reference and candidate fixture routes exist for every shared slider
   scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
   slider scenario.
10. Component-specific checks prove semantics, value state, keyboard behavior,
    pointer or input behavior, disabled behavior, form submission/reset, state
    hooks, and customization hooks.
11. Documentation explains source shape, state strategy, form behavior,
    keyboard behavior, approved divergences, and remaining Stage 2 questions.
12. Any reusable discovery needed by later stateful components is added to the
    issue `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 2 unless its result also proves that no
Stage 2 components remain. It should settle the remaining bounded range
form-control strategy before later Stage 2 experiments handle avatar fallback
behavior, scroll areas, and the `hover-card` disposition.

## Design Review

Independent AI design review was performed by subagent `Descartes`, which
approved the design with **Pass** and no required fixes.

The review confirmed that the experiment follows the Issue 2 workflow, is
linked from the README as `Designed`, stays scoped to `slider`, preserves the
one-at-a-time rule, requires RadCN source plus exports, candidate and reference
fixtures, artifact capture, focused Playwright checks, docs, issue learnings,
and explicitly forbids `vendor/` edits.

The review also confirmed that the plan sufficiently calls out the key slider
decisions: native range versus custom client primitive, single-thumb versus
multi-thumb divergence, vertical orientation support or documented exclusion,
form submit/reset behavior, keyboard and pointer behavior, state hooks, and
customization hooks.

## Result

**Result:** Pass

Experiment 10 implemented the RadCN slider primitive:

- `Slider`

RadCN source lives at `packages/radcn/src/components/slider.tsx`. The package
now exports `radcn/slider`, root exports for the component and type, and the
client helper `enhanceSlider()`.

The chosen state strategy is native-first single-thumb range input. `Slider`
renders a real `<input type="range">` for accessible slider semantics, keyboard
behavior, pointer behavior, form submission, and form reset. The wrapper exposes
stable root, input, track, range, and thumb hooks. `enhanceSlider()` only
reflects live `data-value` and `--radcn-slider-percent` after input events and
form resets.

This is an approved divergence from the full Radix/shadcn multi-thumb slider
model. Multi-thumb values are deferred because native range has one value and a
custom multi-thumb primitive would need additional collision behavior, hidden
form values, ARIA relationships, and pointer management. Vertical orientation is
also deferred because native range vertical rendering is not portable enough for
the current Stage 2 visual parity surface.

Disabled sliders preserve their server-rendered value hooks. The helper ignores
input events from disabled controls so reflected metadata cannot drift from a
non-interactive native value.

Shared slider scenarios now include:

- `slider/default`
- `slider/value`
- `slider/disabled`
- `slider/step`
- `slider/custom-token`
- `slider/form-submit-reset`

Verification commands run so far:

```bash
pnpm radcn:typecheck
pnpm fixtures:candidate:typecheck
pnpm fixtures:reference:typecheck
pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/slider.spec.ts
pnpm fixtures:artifacts
```

All verification commands passed. `pnpm fixtures:artifacts` ran 258 Playwright
tests successfully.

The generated artifact manifest contains:

- 214 screenshot entries;
- 107 shared scenarios;
- 6 slider scenarios;
- paired `reference` and `candidate` artifacts;
- reference app on port 4601 and candidate app on port 4602.

No files under `vendor/` were modified.

## Completion Review

**Reviewer:** Epicurus

**Result:** Pass

Epicurus found no blocking issues. The review confirmed the native range
implementation, package exports, candidate enhancement entry, six shared slider
scenarios, Playwright coverage, source documentation, issue learnings, result
record, and clean `vendor/` status. The only note was non-blocking: the
accessibility test asserts native range semantics and accessible name rather
than using `getByRole("slider")`, which is acceptable because RadCN renders a
real native range input.

## Conclusion

Experiment 10 establishes RadCN's native range-input strategy. Single-value
range controls should use the platform input for semantics and forms, with
small helpers only for reflected styling metadata. More complex multi-thumb
range behavior should be treated as a future custom primitive rather than
smuggled into the single-thumb native implementation.

This experiment does not complete Stage 2. The next experiment should handle
the remaining bounded non-overlay primitives, likely `avatar` and
`scroll-area`, before deciding whether `hover-card` belongs in Stage 2 or moves
to Stage 3.
