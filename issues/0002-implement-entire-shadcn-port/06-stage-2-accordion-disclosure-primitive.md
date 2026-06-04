# Experiment 6: Stage 2 Accordion Disclosure Primitive

## Description

Continue Stage 2 by replacing the candidate accordion placeholder with a real
RadCN accordion component family for Remix 3.

This experiment covers only:

- `accordion`

It should not port `collapsible`, `tabs`, `toggle`, `toggle-group`, `slider`,
`avatar`, `scroll-area`, or `hover-card`. Accordion is the first disclosure
primitive and should establish the bounded disclosure strategy before the issue
moves to the rest of the Stage 2 stateful components.

The primary design question is whether RadCN can preserve shadcn/ui accordion
behavior with native disclosure elements. The preferred implementation should
use `<details>` and `<summary>` if it can preserve visual, accessibility,
keyboard, disabled, default-open, single, multiple, and customization behavior
well enough. If implementation discovers a concrete blocker, record the blocker
and either add the smallest necessary client-state strategy or mark the
unsupported behavior as an approved divergence with tests and documentation.

The current candidate accordion fixture is a fixture-local placeholder. This
experiment must replace that placeholder with imports from `radcn`.

## Changes

Add RadCN source under `packages/radcn/src/components/accordion.tsx`.

The exported component family should include:

- `Accordion`
- `AccordionItem`
- `AccordionTrigger`
- `AccordionContent`

The public API should preserve shadcn/ui's author-facing shape where practical:

- `Accordion` accepts `type="single" | "multiple"`;
- `Accordion` accepts `defaultValue` as a string for single accordions or an
  array of strings for multiple accordions;
- `Accordion` accepts `collapsible` as a documented intent, even if the native
  implementation cannot enforce every Radix rule without client state;
- `AccordionItem` accepts a required `value`;
- `AccordionItem` accepts `disabled`;
- `AccordionTrigger` and `AccordionContent` expose slot hooks and children.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- accordion root, item, trigger, icon, content, and content inner hooks;
- open, closed, disabled, single, multiple, and customization states;
- stable `radcn-*` classes and `data-radcn-*` attributes;
- state attributes such as `data-state`, `data-disabled`, and `data-type`;
- visible focus treatment for the interactive disclosure trigger.

The implementation should make an explicit decision about native disclosure
semantics:

- If using `<details>` and `<summary>`, tests must prove keyboard and pointer
  toggling, default open state, label/summary text, and the exposed `open`
  state.
- If using a client-state strategy, tests must prove `button[aria-expanded]`,
  associated content IDs, keyboard behavior, and progressive fallback behavior.

Update candidate fixtures so the Remix 3 app imports all accordion components
from `radcn`, not fixture-local placeholders.

Keep or update the existing React Router reference fixtures that use the
Radix-backed shadcn/ui-style accordion. The paired reference and candidate
fixtures do not need identical DOM, but they must preserve comparable visible
and semantic behavior.

Shared scenarios for this experiment should include:

- `accordion/single`
- `accordion/multiple`
- `accordion/disabled-item`
- `accordion/custom-token`

The first three already exist. Add `accordion/custom-token`.

Add component-specific Playwright checks proving:

- the candidate app imports and renders the RadCN accordion family;
- single accordion default-open state and user toggling behavior;
- multiple accordion default-open state and ability to keep multiple panels
  open;
- disabled item behavior and disabled styling hooks;
- keyboard toggling through the native or custom trigger;
- stable root/item/trigger/content/icon hooks;
- customization probes can override documented tokens or class hooks;
- any native `<details name>` or single-item exclusivity behavior is either
  verified or documented as a divergence.

Document approved divergences from upstream shadcn/ui/Radix behavior. At
minimum, the docs must answer:

- whether RadCN accordion uses native `<details>/<summary>` or client state;
- how `type`, `defaultValue`, `collapsible`, and `disabled` map to Remix 3;
- how state attributes and open/closed styling work without React state;
- which Radix accordion behaviors are intentionally not guaranteed yet, if any;
- which lessons should inform `collapsible` and `tabs`.

Add issue-level learnings when the experiment discovers a reusable disclosure
strategy, native limitation, keyboard test pattern, or client-state rule.

## Verification

The experiment passes if:

1. RadCN source exists for the accordion family.
2. `packages/radcn` exports accordion from a package subpath and the root index.
3. The Remix 3 candidate app imports accordion components from RadCN source.
4. Shared scenarios include `single`, `multiple`, `disabled-item`, and
   `custom-token`.
5. Reference and candidate fixture routes exist for every shared accordion
   scenario.
6. `pnpm radcn:typecheck` passes.
7. `pnpm fixtures:candidate:typecheck` passes.
8. `pnpm fixtures:reference:typecheck` passes.
9. `pnpm fixtures:artifacts` passes and captures paired artifacts for all
   shared accordion scenarios.
10. Component-specific checks prove disclosure semantics, keyboard/pointer
    interaction, disabled behavior, state hooks, and customization hooks.
11. Documentation explains the accordion source shape, disclosure strategy,
    state hooks, native or client-state divergences, and remaining Stage 2
    questions.
12. Any reusable discovery needed by later disclosure components is added to
    the issue `## Learnings` section with evidence.
13. No files under `vendor/` are modified.
14. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 2. It should establish the first
disclosure primitive strategy so the next experiment can decide whether
`collapsible` and `tabs` can reuse it or need a separate client-state model.

## Design Review

Independent AI design review was performed by subagent `Gauss`, which approved
the design with no required fixes.

The review confirmed that the experiment is scoped only to `accordion`, does
not design future experiments, requires the candidate app to import accordion
from `radcn`, preserves reference parity without requiring exact DOM equality,
covers scenarios, tests, docs, learnings, vendor cleanliness, and completion
review, and frames the native `<details>/<summary>` direction carefully enough
for shadcn/Radix parity risks.
