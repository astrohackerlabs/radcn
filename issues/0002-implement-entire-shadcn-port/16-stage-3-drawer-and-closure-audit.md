# Experiment 16: Stage 3 Drawer and Closure Audit

## Description

Complete the remaining Stage 3 overlay primitive by porting `drawer`, then audit
whether Stage 3 is complete.

Drawer is intentionally separate from `sheet`. Both are side-panel overlays,
but shadcn/ui's drawer is Vaul-based and carries a different author expectation:

- default bottom placement;
- optional `direction` of `top`, `right`, `bottom`, or `left`;
- modal overlay behavior with focus trap, scroll lock, Escape, outside
  dismissal, close slots, title/description relationships, and focus
  restoration;
- a visible drag handle for bottom drawers;
- gesture/mobile policy for dismissing or retaining the drawer after a drag;
- scrollable drawer content that does not unlock body scroll.

The RadCN implementation should match shadcn/ui's visible behavior and
author-facing customization value while using Remix 3-compatible server markup
plus package-exported browser enhancements. Exact DOM equivalence and Vaul's
full physics model are not required. Any gesture behavior that diverges from
Vaul must be documented, tested, and reviewed.

This experiment should not start Stage 4 widgets such as `select`, `combobox`,
`command`, `menubar`, `navigation-menu`, `calendar`, `date-picker`, or
`carousel`.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/drawer.tsx`

The drawer component family should include:

- `Drawer`
- `DrawerTrigger`
- `DrawerPortal`
- `DrawerOverlay`
- `DrawerContent`
- `DrawerClose`
- `DrawerHeader`
- `DrawerFooter`
- `DrawerTitle`
- `DrawerDescription`

Add package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load the browser enhancement from:

- `fixtures/candidate-remix/app/assets/entry.ts`

The implementation should prefer reusing `setupModal()` from
`packages/radcn/src/components/dialog.tsx` for modal behavior. If drawer needs a
new wrapper such as `enhanceDrawer()` or `setupDrawer()` to layer direction,
handle, and drag behavior over `setupModal()`, keep the wrapper drawer-specific
and document the boundary. If `setupModal()` needs small generic lifecycle
hooks for drawer gesture integration, keep them generic and verify existing
dialog, alert-dialog, and sheet behavior still passes.

Drawer props and state hooks should support:

- root `defaultOpen`, `dismissible`, `direction`, `id`, `class`, and `style`;
- content `direction`, `showHandle`, `showCloseButton`, `class`, and `style`;
- default direction of `bottom`;
- direction values `top`, `right`, `bottom`, and `left`;
- `data-direction`, `data-state`, and `data-open` hooks;
- `data-radcn-drawer-*` hooks for every public part;
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and
  `aria-describedby`;
- trigger `aria-haspopup="dialog"` and open/closed state hooks;
- body scroll lock while open;
- focus trap and focus restoration;
- Escape dismissal when dismissible;
- outside pointer dismissal when dismissible;
- close-button and explicit close-slot dismissal;
- default-open server state that becomes live after enhancement;
- scrollable content inside the drawer while body scroll remains locked.

Gesture policy:

- Bottom drawers should expose a visible handle by default.
- Pointer/touch dragging from the handle or drawer content should track the
  drawer along its axis using a transform hook.
- Dragging past a deterministic threshold should close the drawer.
- Dragging below the threshold should snap back open.
- Directional drawers should interpret the threshold along their own axis.
- The implementation does not need Vaul's full velocity physics, snap points,
  nested drawer scaling, or background scaling in this experiment. Those are
  approved divergences only if documented in `docs/radcn-source.md`, recorded in
  the result, and reviewed.

Extend RadCN styles and tokens for:

- drawer root, trigger, portal, overlay, content, close button, handle, header,
  footer, title, description, open/closed state, direction state, custom token
  hooks, and reduced-motion-compatible animations;
- bottom/top content max-height behavior;
- left/right content width behavior;
- scrollable content layout.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may use local React state and simple local
gesture code rather than Vaul if it preserves the visible, semantic, keyboard,
pointer, focus, and customization behavior needed for comparison artifacts.

Shared drawer scenarios should include:

- `drawer/default`
- `drawer/default-open`
- `drawer/directions`
- `drawer/close-actions`
- `drawer/scrollable-content`
- `drawer/gesture-dismiss`
- `drawer/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN drawer source;
- drawer portal content is moved into the fixture-stage portal root;
- the trigger opens the drawer and exposes `aria-haspopup`, state hooks, and
  live open/closed state;
- content has `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and
  `aria-describedby`;
- focus moves into the drawer on open, traps with Tab and Shift+Tab, and
  restores to the trigger on close;
- body scroll locks while open and unlocks after close;
- Escape closes dismissible drawers;
- outside pointer closes dismissible drawers;
- close button and explicit `DrawerClose` controls close;
- default-open drawers render open and enhance correctly;
- top, right, bottom, and left directions expose direction hooks and visible
  placement;
- the bottom drawer handle renders by default and can be hidden when requested;
- scrollable drawer content scrolls internally while body scroll remains locked;
- drag below the threshold snaps back open;
- drag past the threshold closes the drawer;
- directional drag threshold behavior is tested for at least bottom and one
  side direction;
- customization token scenarios visibly change drawer overlay, content, handle,
  and action styling;
- artifact screenshots capture open drawer content inside the fixture stage;
- no files under `vendor/` are modified.

Document the drawer strategy in `docs/radcn-source.md`. The docs must answer:

- how drawer differs from sheet in RadCN even though both are side panels;
- what modal behavior is reused from dialog/sheet;
- what drawer-specific direction, handle, and gesture behavior is layered on;
- what Vaul features are intentionally not implemented yet, if any;
- how default-open, focus trap, scroll lock, outside dismissal, Escape, close
  controls, and focus restoration work;
- how scrollable content works without body scroll;
- how the drawer custom tokens and direction hooks work;
- whether Stage 3 is complete after drawer, and what Stage 4 should tackle
  next.

Add issue-level learnings for the drawer/sheet boundary, gesture policy,
direction policy, scroll-lock/content-scroll policy, and any approved
divergence from Vaul/shadcn behavior.

Add a Stage 3 audit file after implementation:

- `issues/0002-implement-entire-shadcn-port/stage-3-audit.md`

The audit should list every Stage 3 component, its completing experiment,
source status, fixture/artifact status, focused-test status, documentation
status, and any reviewed divergences or follow-up hardening notes. If the audit
finds a real Stage 3 gap, record it in the result and do not mark Stage 3
complete.

## Verification

The experiment passes if:

1. RadCN source exists for `drawer`.
2. Drawer reuses the modal foundation where appropriate, or any duplicate modal
   behavior is explicitly justified in the result.
3. `packages/radcn` exports drawer from a package subpath and the root index.
4. The Remix 3 candidate app loads the drawer browser enhancement.
5. Shared scenarios include every required drawer scenario.
6. Reference and candidate fixture routes exist for every shared drawer
   scenario.
7. Component-specific Playwright checks cover trigger open, portal capture,
   dialog semantics, title/description relationships, focus trap, focus
   restoration, scroll lock, Escape, outside dismissal, close controls,
   default-open state, direction placement, handle visibility, content scroll,
   drag snap-back, drag dismissal, customization hooks, and non-vendor
   cleanliness.
8. `pnpm radcn:typecheck` passes.
9. `pnpm fixtures:candidate:typecheck` passes.
10. `pnpm fixtures:reference:typecheck` passes.
11. The focused drawer Playwright test passes.
12. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    drawer scenario.
13. Documentation explains drawer/sheet boundaries, reused modal behavior,
    drawer-specific gesture/direction behavior, scroll policy, customization
    hooks, approved divergences, and Stage 3 closure status.
14. `stage-3-audit.md` exists and either proves Stage 3 complete or records the
    remaining gap that prevents closure.
15. Any reusable discovery needed by later components is added to the issue
    `## Learnings` section with evidence.
16. No files under `vendor/` are modified.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment should complete Stage 3 only if the audit proves that dialog,
alert-dialog, sheet, popover, tooltip, hover-card, dropdown-menu,
context-menu, and drawer all satisfy the Issue 2 parity model for their stage.
If that proof is incomplete, the experiment should record the gap and leave
Stage 3 open for one more experiment.

## Design Review

Independent AI design review was performed by subagent `Aristotle`, which
approved the design with **Pass** and no blocking findings.

The review checked that the README links Experiment 16 as `Designed`, the
drawer component surface matches shadcn/ui's exported drawer parts, the gesture
policy is bounded, tests cover semantics/focus/scroll/dismissal/directions/
handle/gesture/artifact/vendor-cleanliness requirements, docs and
`stage-3-audit.md` requirements are explicit, and the scope avoids Stage 4
widgets.

One non-blocking implementation note was recorded: choose and document the
exact drag threshold value during implementation so tests and docs describe the
same gesture policy.
