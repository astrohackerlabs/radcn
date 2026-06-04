# Experiment 13: Stage 3 Modal Variants, Alert Dialog and Sheet

## Description

Continue Stage 3 by porting the modal overlay variants that should reuse the
dialog foundation from Experiment 12:

- `alert-dialog`
- `sheet`

This experiment should not port `popover`, `tooltip`, `hover-card`,
`dropdown-menu`, `context-menu`, or `drawer`. It should prove whether the
modal overlay helper established by `enhanceDialog()` can support closely
related modal components without creating separate focus, portal, dismissal,
and scroll-lock implementations.

`alert-dialog` is a modal dialog with stricter dismissal and action semantics.
It should reuse the same portal, focus trap, focus restoration, ARIA
relationship, and scroll-lock behavior as `Dialog`, while defaulting to
non-dismissible overlay/Escape behavior unless explicitly allowed.

`sheet` is a modal dialog with side-positioned content and close controls. It
should reuse the same modal helper while adding side metadata and side-specific
animation/layout hooks.

The goal is to validate the modal overlay abstraction before Stage 3 moves to
positioned overlays, menus, drawer gestures, or hover/focus delay systems.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/alert-dialog.tsx`
- `packages/radcn/src/components/sheet.tsx`

If the current dialog helper needs to support reusable selector prefixes or
configuration, refactor only the minimum required shared code. Keep the helper
scope modal-only unless the experiment proves a broader primitive is necessary.
Do not start positioned overlay work in this experiment.

The alert-dialog component family should include:

- `AlertDialog`
- `AlertDialogTrigger`
- `AlertDialogPortal`
- `AlertDialogOverlay`
- `AlertDialogContent`
- `AlertDialogHeader`
- `AlertDialogFooter`
- `AlertDialogMedia`
- `AlertDialogTitle`
- `AlertDialogDescription`
- `AlertDialogAction`
- `AlertDialogCancel`

The alert-dialog API should preserve shadcn/ui's author-facing shape where
practical:

- root `defaultOpen`;
- trigger, portal, overlay, content, header, footer, media, title,
  description, action, and cancel slots;
- `size="default" | "sm"` on content if useful for footer layout;
- stable `radcn-*` classes and `data-radcn-*` hooks for every part;
- generated title/description relationships;
- `role="alertdialog"` and `aria-modal="true"` for open content;
- default non-dismissible behavior for Escape and outside pointer events;
- close behavior from action and cancel slots;
- customization tokens for overlay, content, media, action, cancel, and size
  hooks.

The sheet component family should include:

- `Sheet`
- `SheetTrigger`
- `SheetPortal`
- `SheetOverlay`
- `SheetContent`
- `SheetClose`
- `SheetHeader`
- `SheetFooter`
- `SheetTitle`
- `SheetDescription`

The sheet API should preserve shadcn/ui's author-facing shape where practical:

- root `defaultOpen`;
- trigger, portal, overlay, content, close, header, footer, title, and
  description slots;
- `side="top" | "right" | "bottom" | "left"` on content;
- optional close button;
- stable `radcn-*` classes and `data-radcn-*` hooks for every part;
- `data-side` and `data-state` hooks for side-specific animation;
- generated title/description relationships;
- `role="dialog"` and `aria-modal="true"` for open content;
- Escape, outside pointer, close button, focus trap/restoration, and scroll
  lock behavior through the modal helper;
- customization tokens for overlay, panel, side, close button, and animation
  hooks.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Load any required client helpers from the candidate Remix browser entry. If
`enhanceDialog()` can support all modal variants by selectors/configuration,
document that. If separate `enhanceAlertDialog()` or `enhanceSheet()` helpers
are exported, they must delegate to the shared modal behavior rather than
copying it.

Extend RadCN styles and tokens for:

- alert-dialog overlay, content, media, header, footer, title, description,
  action, cancel, size, and custom token hooks;
- sheet overlay, content, close, header, footer, title, description, side
  variants, state hooks, and custom token hooks;
- reduced-motion-compatible animations where animation hooks are included.

Add candidate fixtures that import components from `radcn`, not fixture-local
placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for
the same scenarios. The reference may reuse local React state rather than Radix
if it preserves the visible, semantic, keyboard, pointer, and focus behavior
needed for comparison.

Shared alert-dialog scenarios should include:

- `alert-dialog/default`
- `alert-dialog/default-open`
- `alert-dialog/cancel-action`
- `alert-dialog/small`
- `alert-dialog/custom-token`

Shared sheet scenarios should include:

- `sheet/right`
- `sheet/left`
- `sheet/top`
- `sheet/bottom`
- `sheet/custom-token`

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN alert-dialog and sheet source;
- both component families use the shared modal overlay behavior;
- alert-dialog content opens with `role="alertdialog"`, modal state, generated
  title/description relationships, focus entry, focus trap, focus restoration,
  and scroll lock;
- alert-dialog default behavior does not close on Escape or outside pointer
  events, while action and cancel slots close and restore focus;
- alert-dialog size and customization hooks render;
- sheet content opens with `role="dialog"`, modal state, generated
  title/description relationships, focus entry, focus trap, focus restoration,
  Escape/outside dismissal, and scroll lock;
- sheet side variants expose `data-side` and expected placement classes/styles;
- sheet close button closes and restores focus;
- sheet customization hooks render;
- artifact screenshots capture open default scenarios inside the fixture stage;
- no files under `vendor/` are modified.

Document the modal variant strategy in `docs/radcn-source.md`. The docs must
answer:

- how alert-dialog and sheet reuse the dialog/modal helper;
- why alert-dialog defaults to non-dismissible overlay/Escape behavior;
- how action/cancel and sheet close slots map to close behavior;
- how sheet side variants map to stable data hooks and CSS;
- which modal overlay behavior is now reusable for later components;
- what remains unsolved for positioned overlays, menus, hover-card, and drawer
  gestures.

Add issue-level learnings for reusable modal helper boundaries,
alert-dialog dismissal policy, sheet side animation hooks, and any approved
divergence from Radix/shadcn behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `alert-dialog` and `sheet`.
2. Shared modal helper behavior is reused or minimally refactored rather than
   copied into separate one-off implementations.
3. `packages/radcn` exports both component families from package subpaths and
   the root index.
4. The Remix 3 candidate app loads any required browser helpers.
5. Shared scenarios include all required alert-dialog and sheet scenarios.
6. Reference and candidate fixture routes exist for every shared scenario.
7. Component-specific Playwright checks cover alert-dialog modal semantics,
   non-dismissible default behavior, action/cancel close behavior, focus trap,
   focus restoration, scroll lock, size hooks, and customization hooks.
8. Component-specific Playwright checks cover sheet modal semantics, side
   variants, close behavior, focus trap, focus restoration, scroll lock,
   dismissal behavior, and customization hooks.
9. `pnpm radcn:typecheck` passes.
10. `pnpm fixtures:candidate:typecheck` passes.
11. `pnpm fixtures:reference:typecheck` passes.
12. The focused modal-variants Playwright test passes.
13. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    alert-dialog and sheet scenario.
14. Documentation explains source shape, helper reuse, dismissal policy,
    side/animation hooks, approved divergences, and remaining Stage 3
    questions.
15. Any reusable discovery needed by later overlays is added to the issue
    `## Learnings` section with evidence.
16. No files under `vendor/` are modified.
17. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 3. It should complete the modal dialog
variant layer and leave positioned overlays, menus, hover-card, and drawer for
later Stage 3 experiments.

## Design Review

Independent AI design review was performed by subagent `Singer`, which
approved the design with **Pass** and no blocking findings.

The review confirmed that the workflow is respected, Experiment 13 is the only
newly designed experiment, and the README link is present with `Designed`
status. It also confirmed that the plan stays within Stage 3 scope, explicitly
excludes positioned overlays, menus, hover-card, drawer, and gesture work, and
requires reuse of the Experiment 12 modal/dialog foundation rather than copied
one-off portal, focus, dismissal, and scroll-lock implementations.

The review also confirmed that alert-dialog coverage includes required slots,
`role="alertdialog"`, ARIA relationships, non-dismissible default Escape and
outside behavior, action/cancel close behavior, and customization hooks; sheet
coverage includes required slots, side variants, `data-side`/`data-state`,
dialog semantics, dismissal behavior, close controls, and side-specific hooks.
Fixtures, shared scenarios, Playwright checks, docs, learnings, package
exports, candidate helper loading, artifact generation, and vendor cleanliness
are all explicit pass criteria. `git status --short vendor` returned no output.
