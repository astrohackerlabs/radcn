# Experiment 8: Stage 2 Tabs State and Keyboard Primitive

## Description

Continue Stage 2 by porting `tabs` as the first selected-state composite after
the native disclosure experiments.

This experiment covers only:

- `tabs`

It should not port `toggle`, `toggle-group`, `slider`, `avatar`,
`scroll-area`, or `hover-card`. It also should not introduce a broad client
state framework unless `tabs` proves that a smaller native or component-local
strategy is insufficient.

Experiments 6 and 7 proved that simple disclosure can use native
`<details>/<summary>`, but tabs need a different model:

- tab state selects exactly one trigger and one associated panel;
- inactive panels must be hidden from users and assistive technology;
- `role="tablist"`, `role="tab"`, and `role="tabpanel"` relationships are part
  of the public behavior;
- keyboard behavior includes roving focus and activation with Arrow keys,
  Home, End, Enter, and Space;
- disabled triggers must stay visible but cannot receive focus or become
  selected.

The experiment should determine and implement the smallest Remix 3-compatible
state strategy that preserves shadcn/ui's user-visible and author-visible tab
behavior. Native radio-backed tabs are allowed if they satisfy the interaction
and accessibility contract. If they cannot satisfy roving focus, dynamic
`aria-selected`, panel hiding, and disabled behavior without excessive markup
coupling, the experiment may add a focused client-side enhancement for tabs and
must document why this is the first Stage 2 component that needs it.

## Changes

Add RadCN source under `packages/radcn/src/components/tabs.tsx`.

The exported component family should include:

- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

The public API should preserve shadcn/ui's author-facing shape where practical:

- `Tabs` accepts `defaultValue`;
- `Tabs` accepts `orientation`;
- `Tabs` accepts `activationMode` when the implemented strategy can support
  manual versus automatic activation;
- `TabsList` exposes the tablist slot and orientation hooks;
- `TabsTrigger` accepts `value` and `disabled`;
- `TabsContent` accepts `value`;
- all parts expose stable `radcn-*` classes, `data-radcn-*` attributes, state
  hooks, and customization hooks.

The experiment must explicitly choose one state strategy:

1. A native-first strategy, such as radio-backed state and CSS-driven panel
   visibility.
2. A small tabs-specific client enhancement that manages selected value,
   roving focus, ARIA state, and panel visibility.

Do not leave both strategies half-implemented. If the implementation chooses a
client enhancement, keep it scoped to tabs and document how later Stage 2
components should decide whether to reuse or avoid it.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- tabs root, list, trigger, and content hooks;
- selected, inactive, disabled, horizontal, vertical, focused, and customized
  states;
- stable `radcn-*` classes and `data-radcn-*` attributes;
- visible focus treatment for keyboard navigation;
- panel visibility without layout shifts or inaccessible hidden content.

Add candidate fixtures that import from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use Radix if already available, or local
markup that preserves the visible, semantic, and keyboard surfaces needed for
comparison.

Shared scenarios for this experiment should include:

- `tabs/default`
- `tabs/default-value`
- `tabs/disabled`
- `tabs/vertical`
- `tabs/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN tabs source;
- `role="tablist"`, `role="tab"`, and `role="tabpanel"` are present;
- triggers and panels are connected with `aria-controls` and
  `aria-labelledby`;
- the default selected tab and panel are correct;
- pointer activation selects a different tab and reveals the matching panel;
- Arrow keys move focus or selection according to the documented activation
  mode;
- Home and End navigate to the first and last enabled tabs;
- Enter and Space activate the focused tab when manual activation is used;
- disabled tabs cannot be focused, clicked into selection, or activated by
  keyboard;
- inactive panels are hidden accessibly;
- stable hooks and customization probes work.

Document approved divergences from upstream shadcn/ui/Radix behavior. At
minimum, the docs must answer:

- which tabs state strategy RadCN chose;
- why native disclosure is insufficient for tabs;
- whether the strategy requires client JavaScript;
- how selected, inactive, disabled, focused, horizontal, and vertical states
  map to Remix 3 markup and attributes;
- how keyboard behavior is verified;
- whether the tabs strategy should inform `toggle`, `toggle-group`, `slider`,
  or later composite widgets.

Add issue-level learnings when the experiment discovers a reusable state
strategy, ARIA relationship rule, keyboard test pattern, client enhancement
boundary, or approved divergence needed by later components.

## Verification

The experiment passes if:

1. RadCN source exists for the tabs family.
2. `packages/radcn` exports tabs from a package subpath and the root index.
3. The Remix 3 candidate app imports tabs components from RadCN source.
4. Shared scenarios include `default`, `default-value`, `disabled`, `vertical`,
   and `custom-token`.
5. Reference and candidate fixture routes exist for every shared tabs scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for all
   shared tabs scenarios.
10. Component-specific checks prove tablist semantics, selected state, panel
    relationships, keyboard behavior, disabled behavior, hidden inactive
    panels, state hooks, and customization hooks.
11. Documentation explains the tabs source shape, state strategy, ARIA
    relationships, keyboard behavior, approved divergences, and remaining Stage
    2 questions.
12. Any reusable discovery needed by later stateful components is added to the
    issue `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 2 unless its result also proves that no
Stage 2 components remain. It should establish the selected-state and keyboard
model before later Stage 2 experiments handle toggle-like controls, range
controls, avatar fallback behavior, scroll areas, and the `hover-card`
disposition.

## Design Review

Independent AI design review was performed by subagent `Peirce`, which approved
the design with **Pass** and no required fixes.

The review confirmed that the experiment follows the one-experiment rule, is
scoped only to `tabs`, is linked from the Issue 2 README as `Designed`, requires
candidate and reference fixtures, includes Playwright coverage for semantics,
state, keyboard behavior, disabled behavior, hidden panels, and customization
hooks, requires documentation and learnings for reusable discoveries, and
explicitly forbids `vendor/` edits.

The reviewer gave one non-blocking implementation suggestion: the eventual
result should make the chosen tabs state strategy explicit because this
experiment is likely to set precedent for later Stage 2 stateful components.
