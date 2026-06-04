# Experiment 24: Stage 5 Notifications

## Description

Continue Stage 5 by resolving the notification cluster:

- `sonner`
- `toast`

This cluster should answer how RadCN handles upstream notification APIs that
are currently built around the React `sonner` package, `next-themes`, client
events, animated toast stacks, icons, variants, and global toaster state.

Upstream shapes:

- `sonner` is a React wrapper around the third-party `sonner` package. It
  bridges theme from `next-themes`, passes icon React elements, and injects
  shadcn theme CSS variables into Sonner's internal toaster.
- `toast` is represented by Sonner examples and event usage rather than a
  separate primitive source file. It maps to an imperative notification API
  plus the rendered toaster viewport.

Expected disposition:

- `sonner` should receive a RadCN-native notification outcome. The preferred
  implementation is a small dependency-free toaster component plus browser
  enhancement that renders server-provided initial notifications and listens
  for RadCN toast events. It must not add `sonner` or `next-themes` to
  `packages/radcn`.
- `toast` should be resolved as the event/API usage surface for that toaster,
  not as a second visual primitive. If RadCN adds a package export for `toast`,
  it should be a dependency-free helper that dispatches browser events or
  serializes notification payloads for progressive enhancement. If no
  `radcn/toast` subpath is added, the omission must be intentional, tested, and
  documented.

The experiment should add source, fixtures, tests, docs, learnings, and a
reviewed disposition for both targets. It should not start `resizable` or
`sidebar`, except to document that notification behavior may be consumed by
application-shell recipes later.

## Notification Requirements

Keep a familiar author-facing surface where useful:

- `Toaster`
- `Toast`
- optional helpers such as `toast()`, `createToastEvent()`, or
  `enhanceToaster()` if browser behavior needs a package-exported helper.

The RadCN notification outcome should support:

- a stable toaster viewport/region with accessible status semantics;
- server-rendered initial notifications for no-JavaScript and artifact
  coverage;
- client-dispatched notifications after enhancement;
- variants or types for `default`, `success`, `info`, `warning`, `error`, and
  `loading`;
- optional title, description, action, and dismiss controls;
- auto-dismiss timing that can be disabled or shortened deterministically in
  tests;
- manual dismiss through pointer and keyboard activation;
- Escape behavior when appropriate for the focused toast/dismiss control;
- pause-on-hover or deterministic timer policy, if implemented;
- stable `data-radcn-toast*` hooks and state attributes;
- CSS variables for background, foreground, border, radius, variant colors, and
  custom token probes;
- theme inheritance from RadCN tokens rather than `next-themes`;
- no `sonner` or `next-themes` dependency in `packages/radcn`.

Shared `sonner` scenarios should include:

- `sonner/default`
- `sonner/success`
- `sonner/error`
- `sonner/loading`
- `sonner/action`
- `sonner/dismiss`
- `sonner/stack`
- `sonner/custom-token`

Shared `toast` scenarios should include:

- `toast/event`
- `toast/form-action`
- `toast/no-js-initial`

The `toast/form-action` scenario should demonstrate how a Remix 3 page can
render an initial notification after an action or route state without depending
on React client state. It may use a fixture-level form or query parameter if
that is enough to prove the pattern inside the current fixture harness.

## Toast Disposition Requirements

Record a final Stage 5 disposition for `toast` in this experiment.

The disposition should answer:

- why upstream `toast()` examples are not a separate visual component;
- whether RadCN exposes a helper subpath such as `radcn/toast`, or keeps toast
  dispatch as documented application code using `CustomEvent`;
- how server-rendered route/action notifications map into the toaster;
- how client-dispatched notifications map into the toaster;
- how install/source parity works for notification examples;
- which Sonner behaviors are intentionally out of core, such as rich promise
  APIs, React element payloads, swipe physics, or external theme managers.

## Changes

Expected implementation files:

- `packages/radcn/src/components/sonner.tsx`
  - Add RadCN notification source parts, prop types, data hooks, initial toast
    rendering, accessible viewport semantics, and enhancement entry.
- `packages/radcn/src/components/toast.ts`
  - Add only if the experiment decides an importable helper is the right
    toast dispatch surface.
- `packages/radcn/package.json`
  - Add `./sonner`.
  - Add `./toast` only if an importable helper is implemented.
- `packages/radcn/src/index.ts`
  - Export the supported notification parts, helpers, and types.
- `packages/radcn/src/styles/tokens.css`
  - Add toaster viewport layout, toast variants, state hooks, action/dismiss
    styling, animation hooks, and custom token hooks.
- `packages/radcn/src/styles/index.ts`
  - Regenerate after token changes.
- `fixtures/scenarios/types.ts`
  - Add `sonner` and `toast` to `FixtureComponent`.
- `fixtures/scenarios/index.ts`
  - Add every shared scenario listed above.
- `fixtures/candidate-remix/app/fixtures/sonner.tsx`
  - Add candidate fixtures using real RadCN notification source.
- `fixtures/candidate-remix/app/fixtures/toast.tsx`
  - Add candidate fixtures for the toast dispatch/disposition surface.
- `fixtures/candidate-remix/app/fixtures/index.tsx`
  - Route the new candidate fixtures.
- `fixtures/candidate-remix/app/assets/entry.ts`
  - Register notification enhancement only if the implementation needs a
    client helper.
- `fixtures/reference-react-router/app/fixtures/sonner.tsx`
  - Add matching React Router reference notification fixtures.
- `fixtures/reference-react-router/app/fixtures/toast.tsx`
  - Add matching React Router reference toast fixtures.
- `fixtures/reference-react-router/app/fixtures/index.ts`
  - Route the new reference fixtures.
- `fixtures/reference-react-router/app/app.css`
  - Add reference styles for the new fixtures.
- `fixtures/tests/notifications.spec.ts`
  - Add focused candidate behavior tests for toaster rendering, event dispatch,
    dismiss behavior, accessibility, custom tokens, dependency policy, and the
    final toast disposition.
- `docs/radcn-source.md`
  - Document the RadCN notification implementation, Sonner divergence, toast
    dispatch model, server/action notification pattern, dependency policy, and
    install/source parity.
- `issues/0002-implement-entire-shadcn-port/README.md`
  - Update experiment status and add reusable learnings.

## Verification

The experiment passes if:

1. `sonner` has a final RadCN outcome with source, package export, root export,
   docs, fixtures, and focused tests.
2. `toast` has a final reviewed disposition as either an importable helper or
   documented application dispatch recipe.
3. No React-only notification dependencies are added to `packages/radcn`: no
   `sonner`, `next-themes`, React, or React DOM.
4. Shared scenarios include every required `sonner` and `toast` scenario.
5. Reference and candidate fixture routes exist for every shared scenario.
6. Component-specific Playwright checks cover accessible toaster semantics,
   initial server-rendered notifications, event-dispatched notifications,
   variants, stacking, action/dismiss controls, manual dismissal, custom
   tokens, package exports, and no Sonner dependency.
7. Artifact screenshots capture paired reference/candidate output for every new
   scenario.
8. Documentation explains the Sonner/API divergence, theme-token replacement,
   server/action notification pattern, client dispatch pattern, install/source
   parity, and intentionally omitted Sonner behaviors.
9. Issue learnings record reusable notification, event, progressive
   enhancement, and dependency-policy rules needed by later Stage 5 work.
10. `pnpm radcn:typecheck` passes.
11. `pnpm fixtures:candidate:typecheck` passes.
12. `pnpm fixtures:reference:typecheck` passes.
13. Focused notification Playwright tests pass.
14. `pnpm fixtures:artifacts` passes.
15. `git status --short -- vendor` returns no output.
16. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should complete the notification cluster, but it should not
close Stage 5. Later experiments still need final outcomes for `resizable`,
`sidebar`, and any unresolved block dispositions.

## Design Review

Independent AI design review was performed by subagent `Newton` and returned
**Pass**.

Newton confirmed:

- grouping `sonner` and `toast` is coherent because the inventory defines
  `toast` as Sonner example/event usage rather than a separate primitive;
- the plan sets a RadCN-native, dependency-free notification outcome and
  explicitly rejects `sonner` and `next-themes` dependencies;
- the plan preserves the required author/user-visible surface: toaster region,
  variants, initial/server notifications, client events, action/dismiss
  controls, accessibility, timers, keyboard behavior, data hooks, theme/custom
  tokens, fixtures, docs, artifacts, and dependency checks;
- the plan correctly excludes `resizable` and `sidebar`;
- the verification criteria are concrete enough for a plan commit under
  `AGENTS.md`.

## Result

**Result:** Pass

Experiment 24 completed the notification cluster.

The implementation added a RadCN-native `sonner` source module with
server-rendered `Toaster` and `Toast` parts, accessible notification region
semantics, status/alert toast roles, explicit toast accessible labels, variant
icons, action and dismiss controls, deterministic duration handling, stable
`data-radcn-toast*` hooks, custom token styling, and `enhanceToaster()` for
browser event dispatch.

The implementation also added `radcn/toast` as a small dependency-free helper
surface. `toast(payload)` and `createToastEvent(payload)` dispatch the
`radcn-toast` browser event; they are not a second visual primitive. Server
route/action feedback is represented by initial `Toaster` payloads, while
client-only feedback dispatches events after the toaster enhancement is
registered.

Added scenario and fixture coverage:

- `sonner/default`
- `sonner/success`
- `sonner/error`
- `sonner/loading`
- `sonner/action`
- `sonner/dismiss`
- `sonner/stack`
- `sonner/custom-token`
- `toast/event`
- `toast/form-action`
- `toast/no-js-initial`

Documentation now explains the Sonner divergence, the RadCN toaster contract,
the toast event/helper surface, server/action notification patterns, client
dispatch patterns, dependency policy, install/source parity, and intentionally
omitted Sonner behaviors. Issue learnings were updated with reusable
notification and event-dispatch rules for later work.

Verification:

- `pnpm radcn:typecheck` passed.
- `pnpm fixtures:candidate:typecheck` passed.
- `pnpm fixtures:reference:typecheck` passed with the existing React Router
  `module.register()` deprecation warning.
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/notifications.spec.ts`
  passed 5 tests.
- `pnpm fixtures:artifacts` passed 668 tests.
- `git diff --check` passed.
- `git status --short -- vendor` returned no output.

## Conclusion

The notification cluster is resolved. RadCN should provide a small
server-rendered toaster core and a browser event helper rather than depending
on the React Sonner runtime. Rich promise helpers, React element payloads,
swipe physics, and external theme-manager integration remain outside core and
can be handled as future recipe or application code if needed.

Stage 5 remains open. Later experiments still need final outcomes for
`resizable`, `sidebar`, and any remaining block dispositions.

## Completion Review

Independent AI completion review was performed by subagent `Galileo` and
returned **Pass**.

Galileo confirmed:

- the completed implementation satisfies the Experiment 24 verification
  criteria and `AGENTS.md` workflow;
- `sonner` and `toast` have the required source and export surfaces;
- forbidden notification dependencies are absent from `packages/radcn`;
- all required shared scenarios, candidate/reference fixture routing, focused
  Playwright coverage, docs/disposition text, issue learnings, artifact
  entries/screenshots, and vendor cleanliness are present;
- no blocking findings remain before the result commit.
