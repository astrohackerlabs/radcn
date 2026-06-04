# Experiment 25: Stage 5 Application Shell and Closure

## Description

Complete the remaining Stage 5 application-shell cluster:

- `resizable`
- `sidebar`

This cluster should answer how RadCN handles layout and application-shell
systems that upstream shadcn/ui implements with React context, third-party
layout packages, mobile detection hooks, cookies, keyboard shortcuts, composed
primitives, and large slot surfaces.

Upstream shapes:

- `resizable` is a thin React wrapper around `react-resizable-panels`. It
  exposes `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle`, with
  orientation styling, separator semantics, pointer/keyboard resizing, and an
  optional grip handle.
- `sidebar` is an application shell system. It composes `Button`, `Input`,
  `Separator`, `Sheet`, `Skeleton`, and `Tooltip`, while relying on React
  context for expanded/collapsed state, mobile sheet state, cookie persistence,
  a `Cmd/Ctrl+B` shortcut, side/variant/collapsible modes, menu slots, badges,
  skeletons, submenus, and many CSS variables.

Expected disposition:

- `resizable` should receive a RadCN-native source outcome if a bounded
  dependency-free implementation can preserve the useful author/user-visible
  contract: panel group, panels, separator handle, horizontal/vertical layout,
  pointer resizing, keyboard resizing, stable percentages, accessibility, and
  customization hooks. It must not add `react-resizable-panels` to
  `packages/radcn`.
- `sidebar` should receive a RadCN-native application-shell outcome, not a
  literal React context port. The preferred implementation is server-rendered
  shell markup plus a small browser enhancement that owns collapsed/open state,
  keyboard shortcut, rail/trigger toggles, mobile/offcanvas behavior, and stable
  data hooks. It should reuse existing RadCN primitives where practical, but it
  may expose dedicated sidebar parts because the upstream author-facing slot
  surface is valuable.

This experiment should add source, fixtures, tests, docs, learnings, and a
reviewed final disposition for both targets. Because these are the last named
Stage 5 targets, it should also add a Stage 5 and Issue 2 closure audit if all
completion criteria are satisfied. It should not reopen earlier stage scope
except to verify that every inventory component now has a final disposition.

## Resizable Requirements

Keep the familiar author-facing parts:

- `ResizablePanelGroup`
- `ResizablePanel`
- `ResizableHandle`

The RadCN resizable outcome should support:

- horizontal and vertical panel groups;
- initial panel sizes expressed as percentages;
- stable `data-radcn-resizable*` hooks;
- separator handle with `role="separator"`, `aria-orientation`, `aria-valuemin`,
  `aria-valuemax`, and `aria-valuenow` where meaningful;
- pointer dragging to resize adjacent panels;
- keyboard resizing with Arrow keys, Home, and End;
- optional visible grip handle;
- disabled handle state if needed;
- responsive sizing without layout jumps;
- custom token hooks for handle, border, and panel backgrounds;
- no `react-resizable-panels` dependency in `packages/radcn`.

Shared `resizable` scenarios should include:

- `resizable/default`
- `resizable/vertical`
- `resizable/with-handle`
- `resizable/keyboard`
- `resizable/custom-token`

## Sidebar Requirements

Keep the familiar author-facing parts where they map cleanly:

- `SidebarProvider`
- `Sidebar`
- `SidebarTrigger`
- `SidebarRail`
- `SidebarInset`
- `SidebarHeader`
- `SidebarFooter`
- `SidebarContent`
- `SidebarGroup`
- `SidebarGroupLabel`
- `SidebarGroupAction`
- `SidebarGroupContent`
- `SidebarMenu`
- `SidebarMenuItem`
- `SidebarMenuButton`
- `SidebarMenuAction`
- `SidebarMenuBadge`
- `SidebarMenuSkeleton`
- `SidebarMenuSub`
- `SidebarMenuSubItem`
- `SidebarMenuSubButton`
- `SidebarInput`
- `SidebarSeparator`

The RadCN sidebar outcome should support:

- left and right sides;
- variants: `sidebar`, `floating`, and `inset`;
- collapsible modes: `offcanvas`, `icon`, and `none`;
- server-rendered default open/collapsed state;
- enhanced trigger and rail toggle behavior;
- `Cmd/Ctrl+B` keyboard shortcut;
- mobile/offcanvas behavior through deterministic viewport or data-state logic;
- stable `data-radcn-sidebar*` hooks plus state, side, variant, and
  collapsible attributes;
- menu buttons with active, disabled, size, variant, badge, action, submenus,
  skeleton, and tooltip/custom-label hooks where practical;
- composition with existing RadCN primitives where doing so does not hide
  required sidebar hooks;
- custom token hooks for sidebar background, foreground, accent, border, ring,
  width, and icon width;
- no React context, `@radix-ui/react-slot`, `class-variance-authority`,
  `react-resizable-panels`, or mobile hook dependency in `packages/radcn`.

Shared `sidebar` scenarios should include:

- `sidebar/default`
- `sidebar/right`
- `sidebar/floating`
- `sidebar/inset`
- `sidebar/icon-collapsible`
- `sidebar/offcanvas`
- `sidebar/trigger-shortcut`
- `sidebar/menu-states`
- `sidebar/submenu`
- `sidebar/skeleton`
- `sidebar/custom-token`

## Closure Audit Requirements

If both `resizable` and `sidebar` pass, add a Stage 5 audit and issue closure
audit.

The audit should verify:

- every component in the Issue 1 inventory has a final disposition;
- every ported component has source, exports, fixtures, artifact coverage, and
  focused verification or a documented recipe/block/exclusion disposition;
- every intentional dependency/API divergence has docs and experiment evidence;
- every Stage 5 target has a final outcome;
- `pnpm fixtures:artifacts` passes after the final cluster;
- the issue index and issue README accurately reflect open/closed status.

Only close Issue 2 if the audit proves all completion criteria are satisfied
and independent completion review approves the full port outcome. If the audit
finds a remaining gap, record it and leave Issue 2 open with the next required
experiment implied by the audit.

## Changes

Expected implementation files:

- `packages/radcn/src/components/resizable.tsx`
  - Add the panel group, panel, handle parts, types, data hooks, pointer and
    keyboard enhancement, and customization hooks.
- `packages/radcn/src/components/sidebar.tsx`
  - Add the application-shell parts, types, data hooks, server state metadata,
    trigger/rail/shortcut enhancement, and customization hooks.
- `packages/radcn/package.json`
  - Add `./resizable` and `./sidebar`.
- `packages/radcn/src/index.ts`
  - Export supported resizable and sidebar parts, helpers, and types.
- `packages/radcn/src/styles/tokens.css`
  - Add resizable and sidebar layout, state, responsive, variant, and custom
    token styling.
- `packages/radcn/src/styles/index.ts`
  - Regenerate after token changes.
- `fixtures/scenarios/types.ts`
  - Add `resizable` and `sidebar` to `FixtureComponent`.
- `fixtures/scenarios/index.ts`
  - Add every shared scenario listed above.
- `fixtures/candidate-remix/app/fixtures/resizable.tsx`
  - Add candidate fixtures using real RadCN resizable source.
- `fixtures/candidate-remix/app/fixtures/sidebar.tsx`
  - Add candidate fixtures using real RadCN sidebar source.
- `fixtures/candidate-remix/app/fixtures/index.tsx`
  - Route the new candidate fixtures.
- `fixtures/candidate-remix/app/assets/entry.ts`
  - Register resizable/sidebar enhancements.
- `fixtures/reference-react-router/app/fixtures/resizable.tsx`
  - Add matching React Router reference resizable fixtures.
- `fixtures/reference-react-router/app/fixtures/sidebar.tsx`
  - Add matching React Router reference sidebar fixtures.
- `fixtures/reference-react-router/app/fixtures/index.ts`
  - Route the new reference fixtures.
- `fixtures/reference-react-router/app/app.css`
  - Add reference styles for the new fixtures.
- `fixtures/tests/application-shell.spec.ts`
  - Add focused candidate behavior tests for resizable and sidebar.
- `docs/radcn-source.md`
  - Document resizable/sidebar implementations, divergences, dependency policy,
    install/source parity, and any omitted advanced behavior.
- `issues/0002-implement-entire-shadcn-port/stage-5-audit.md`
  - Add if the implementation resolves Stage 5.
- `issues/0002-implement-entire-shadcn-port/README.md`
  - Update experiment status, learnings, and conclusion/status if the closure
    audit proves Issue 2 complete.

## Verification

The experiment passes if:

1. `resizable` has a final RadCN outcome with source, package export, root
   export, docs, fixtures, and focused tests.
2. `sidebar` has a final RadCN outcome with source, package export, root
   export, docs, fixtures, and focused tests.
3. No forbidden application-shell dependencies are added to `packages/radcn`:
   no `react-resizable-panels`, React, React DOM, `class-variance-authority`,
   `@radix-ui/react-slot`, or mobile hook package.
4. Shared scenarios include every required `resizable` and `sidebar` scenario.
5. Reference and candidate fixture routes exist for every shared scenario.
6. Component-specific Playwright checks cover resizable semantics, pointer
   resizing, keyboard resizing, orientation, custom tokens, package exports,
   and dependency policy.
7. Component-specific Playwright checks cover sidebar landmarks/slots, side and
   variant state, trigger/rail toggles, shortcut behavior, offcanvas/icon
   collapse, menu states, submenus, skeletons, responsive/mobile policy,
   custom tokens, package exports, and dependency policy.
8. Artifact screenshots capture paired reference/candidate output for every new
   scenario.
9. Documentation explains the React/third-party divergences, state model,
   responsive policy, omitted advanced behavior, dependency policy, and
   install/source parity.
10. Issue learnings record reusable application-shell, layout, resize, and
    closure-audit rules.
11. If Stage 5 is complete, `stage-5-audit.md` proves every Stage 5 component
    now has a final outcome.
12. If Issue 2 is complete, the issue README conclusion/frontmatter and
    `issues/README.md` index are updated according to the closing workflow.
13. `pnpm radcn:typecheck` passes.
14. `pnpm fixtures:candidate:typecheck` passes.
15. `pnpm fixtures:reference:typecheck` passes.
16. Focused application-shell Playwright tests pass.
17. `pnpm fixtures:artifacts` passes.
18. `git status --short -- vendor` returns no output.
19. Independent completion review approves the result and, if applicable, the
    Issue 2 closure audit, or findings are fixed and recorded.

This experiment should complete Stage 5 if both components pass. It should
close Issue 2 only if the closure audit proves the full component port is done.

## Design Review

Independent AI design review was performed by subagent `Feynman` and returned
**Pass**.

Feynman confirmed:

- grouping `resizable` and `sidebar` is coherent because both are Stage 5
  application-shell/layout systems with React-heavy upstream behavior and
  shared closure implications;
- the plan defines concrete RadCN-native outcomes: dependency-free resizable
  behavior and a server-rendered plus enhanced sidebar shell;
- the plan explicitly forbids React, `react-resizable-panels`,
  `class-variance-authority`, Radix Slot, and mobile hook dependencies;
- the plan preserves the important shadcn/ui value: familiar part names,
  sizing, orientation, keyboard behavior, sidebar variants, collapse modes,
  menu slots, shortcut, mobile/offcanvas behavior, tokens, and state hooks;
- closure audit scope is correct because Issue 2 closes only if inventory-wide
  completion criteria are proven and independently reviewed;
- verification criteria are sufficient for a plan commit under `AGENTS.md`.

## Result

**Result:** Pass

Experiment 25 completed the Stage 5 application-shell cluster.

`resizable` now has RadCN source, package/root exports, styles, candidate and
reference fixtures, shared scenarios, focused tests, artifact coverage, and
documentation. The implementation preserves the useful shadcn/ui contract with
dependency-free panel markup, separator semantics, horizontal and vertical
orientation, pointer resizing, keyboard resizing, grip handles, percentage
sizing, and customization hooks. It does not add `react-resizable-panels`.

`sidebar` now has RadCN source, package/root exports, styles, candidate and
reference fixtures, shared scenarios, focused tests, artifact coverage, and
documentation. The implementation preserves the useful shadcn/ui application
shell surface with explicit server-rendered parts, side/variant/collapsible
state hooks, trigger and rail toggles, `Cmd/Ctrl+B` shortcut behavior, menu
slots, submenu/badge/action/skeleton states, and customization hooks. It does
not add React context, React, React DOM, Radix Slot, class-variance-authority,
or a mobile hook dependency.

The Stage 5 audit was added in
[stage-5-audit.md](stage-5-audit.md). Stage 5 is complete, but Issue 2 should
not close yet. The inventory-wide closure audit found that `direction` appears
in the Issue 1 inventory and still needs an explicit final experiment or
approved no-export/native-attribute disposition in Issue 2.

Verification passed:

- `pnpm radcn:typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck` with the existing React Router
  `module.register()` deprecation warning
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/application-shell.spec.ts`
  passed: 3 tests
- `pnpm fixtures:artifacts` passed: 703 tests
- `git status --short -- vendor` returned no output

## Conclusion

`resizable` and `sidebar` are complete RadCN outcomes, and Stage 5 is complete.
The next experiment should resolve `direction` explicitly before Issue 2 is
closed.

## Completion Review

Independent AI completion review was performed by subagent `Sartre`.

The first review found two blockers:

- docs described a `radcn-resizable-change` event while the implementation used
  `radcn-resizable-resize`, and pointer resizing did not emit the documented
  event;
- docs described a `radcn-sidebar-change` event while the sidebar enhancement
  did not dispatch one.

Both findings were fixed:

- `resizable` now emits `radcn-resizable-change` from keyboard and pointer
  resize paths;
- `sidebar` now emits `radcn-sidebar-change` from trigger, rail, and shortcut
  toggles;
- `fixtures/tests/application-shell.spec.ts` now asserts both documented event
  contracts.

Verification after the fixes passed:

- `pnpm radcn:typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck` with the existing React Router
  `module.register()` deprecation warning
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/application-shell.spec.ts`
  passed: 3 tests
- `pnpm fixtures:artifacts` passed: 703 tests
- `git diff --check`

Sartre then returned **Pass**, confirming that the blockers were resolved and
that the Stage 5 complete / Issue 2 still open boundary is correct because
`direction` still needs its own final disposition.
