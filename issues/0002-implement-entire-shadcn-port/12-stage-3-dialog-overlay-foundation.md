# Experiment 12: Stage 3 Dialog Overlay Foundation

## Description

Begin Stage 3 by building the shared modal overlay foundation and porting the
first overlay proof component:

- `dialog`

This experiment should not port `alert-dialog`, `popover`, `tooltip`, `sheet`,
`dropdown-menu`, `context-menu`, `drawer`, or `hover-card`. It should create the
smallest reusable overlay architecture needed to make `dialog` correct in Remix
3, then document which parts are reusable by later Stage 3 components.

Stage 2 deliberately moved `hover-card` to Stage 3 because overlay components
share portal placement, positioning, focus, dismissal, escape handling, scroll
lock, and animation-state concerns. Dialog is the right first Stage 3 proof
because it exercises the modal subset: portal, overlay, content, close actions,
focus trap, focus restoration, escape dismissal, outside click dismissal,
scroll lock, ARIA relationships, and animation hooks.

The goal is to establish a defensible RadCN overlay primitive boundary before
porting the rest of Stage 3.

## Changes

Add RadCN source under:

- `packages/radcn/src/components/dialog.tsx`

If shared helpers are useful, add them under a narrowly scoped path such as:

- `packages/radcn/src/primitives/overlay.ts`

The dialog component family should include:

- `Dialog`
- `DialogTrigger`
- `DialogPortal`
- `DialogOverlay`
- `DialogContent`
- `DialogClose`
- `DialogHeader`
- `DialogFooter`
- `DialogTitle`
- `DialogDescription`

The public API should preserve shadcn/ui's author-facing shape where practical:

- root `defaultOpen` for initial state;
- trigger and close slots;
- content with optional close button;
- title and description slots with stable ids/relationships;
- header and footer layout slots;
- stable `radcn-*` classes and `data-radcn-*` hooks for every part;
- `data-state="open"` and `data-state="closed"` hooks where stateful parts are
  visible to CSS;
- customization tokens for overlay, content, close button, and animation hooks.

The experiment must explicitly choose a portal strategy. The default candidate
strategy is server-rendering dialog markup in place, then moving or ensuring
active overlay content is attached under a single document-level RadCN portal
root during `enhanceDialog()`. The strategy must define what happens when
JavaScript is absent or delayed.

The experiment must export and load a client helper if needed:

```ts
import { enhanceDialog } from 'radcn/dialog'

enhanceDialog()
```

The helper should own only browser behavior that cannot be represented in
server markup:

- opening and closing by trigger/close buttons;
- generating or resolving title/description ids;
- applying `role="dialog"` and `aria-modal="true"` to open modal content;
- hiding closed content from the accessibility tree;
- focus trap while open;
- focus restoration to the opening trigger after close;
- escape key dismissal;
- outside pointer dismissal;
- body scroll lock while any modal dialog is open;
- `data-state` updates for overlay/content/trigger hooks;
- nested or repeated dialog isolation at least well enough to avoid corrupting
  sibling dialog state.

Do not implement a one-off helper that cannot be reused by `alert-dialog` and
`sheet`. If an overlay primitive is added, document its intended limits: modal
only, non-modal later, positioned overlays later, or another explicit boundary.

Update package exports in `packages/radcn/package.json` and public exports in
`packages/radcn/src/index.ts`.

Extend RadCN styles and tokens for:

- dialog overlay;
- dialog content;
- close button;
- header, footer, title, and description slots;
- open/closed animation hooks;
- custom token probes;
- reduced-motion compatibility if animations are included.

Add candidate fixtures that import `Dialog` components from `radcn`, not
fixture-local placeholders.

Add React Router reference fixtures with shadcn/ui-inspired local markup for the
same scenarios. The reference can use local React state rather than Radix if it
preserves the visible, semantic, keyboard, pointer, and focus behavior needed
for comparison.

Shared dialog scenarios should include:

- `dialog/default`
- `dialog/default-open`
- `dialog/close-button`
- `dialog/outside-dismiss`
- `dialog/custom-token`

If nested dialogs are supported, add `dialog/nested`. If nested dialogs are not
supported in this first modal proof, document the limitation rather than adding
a misleading scenario.

Add component-specific Playwright checks proving:

- the candidate app renders real RadCN dialog source;
- triggers expose stable hooks and open their associated dialog;
- open content has correct role, modal state, title/description relationships,
  and visible state hooks;
- focus moves into the dialog on open;
- Tab and Shift+Tab stay within the open dialog;
- Escape closes the dialog and restores focus;
- close buttons close the dialog and restore focus;
- outside pointer dismissal works for dismissible dialogs;
- body scroll is locked while the dialog is open and restored after close;
- default-open dialogs initialize open;
- closed dialogs are hidden from both view and accessibility tree;
- customization probes can override documented tokens or class hooks;
- no files under `vendor/` are modified.

Document the Stage 3 foundation in `docs/radcn-source.md`. The docs must
answer:

- dialog source shape and exported helper;
- portal-root strategy;
- focus trap and focus restoration strategy;
- scroll lock strategy;
- dismissal strategy;
- animation-state hooks;
- progressive-enhancement behavior with JavaScript absent or delayed;
- what later Stage 3 components can reuse;
- what remains unsolved for positioned overlays such as `popover`,
  `tooltip`, `hover-card`, menus, and `drawer`.

Add issue-level learnings for reusable overlay primitives, modal focus policy,
portal strategy, scroll lock, dismissal policy, and any approved divergence from
Radix/shadcn behavior.

## Verification

The experiment passes if:

1. RadCN source exists for `dialog`.
2. Any shared overlay helper is narrowly scoped and documented.
3. `packages/radcn` exports dialog from a package subpath and the root index.
4. The Remix 3 candidate app loads any required `enhanceDialog()` browser
   helper.
5. Shared scenarios include the required dialog scenarios.
6. Reference and candidate fixture routes exist for every shared dialog
   scenario.
7. Component-specific Playwright checks cover trigger/open state, ARIA
   relationships, focus trap, focus restoration, Escape, close button, outside
   dismissal, scroll lock, default-open state, hidden closed state, animation
   hooks, and customization hooks.
8. `pnpm radcn:typecheck` passes.
9. `pnpm fixtures:candidate:typecheck` passes.
10. `pnpm fixtures:reference:typecheck` passes.
11. The focused dialog Playwright test passes.
12. `pnpm fixtures:artifacts` passes and captures paired artifacts for every
    dialog scenario.
13. Documentation explains source shape, helper strategy, portal strategy,
    focus/scroll/dismissal behavior, approved divergences, and remaining Stage
    3 questions.
14. Any reusable discovery needed by later overlays is added to the issue
    `## Learnings` section with evidence.
15. No files under `vendor/` are modified.
16. Independent completion review approves the result or findings are fixed and
    recorded.

This experiment does not complete Stage 3. It establishes the modal overlay
foundation that later Stage 3 experiments should reuse for `alert-dialog` and
`sheet`, while positioned overlays need a later positioning-specific proof.

## Design Review

Independent AI design review was performed by subagent `Faraday`, which
approved the design with **Pass** and no blocking findings.

The review confirmed that the workflow is respected, Stage 2 is recorded
complete before Stage 3 begins, `dialog` is a valid first modal overlay proof,
and the experiment stays scoped to one component plus reusable modal overlay
boundaries rather than porting all Stage 3 components upfront.

The review also confirmed that the plan covers portal strategy, progressive
enhancement, focus trap and restoration, Escape dismissal, outside dismissal,
scroll lock, ARIA relationships, state hooks, repeated dialog isolation,
fixtures, tests, docs, learnings, package exports, vendor cleanliness, and
independent completion review. `git status --short vendor` returned no output.
