# Experiment 77: Migrate modal and drawer layout residuals

## Description

Experiment 76 cleared the state-indicator residual cluster. The next remaining
Issue 6 cluster is modal/drawer layout residuals from the Experiment 73 map:

- AlertDialog content width and `size="sm"` footer layout;
- Sheet side geometry and slide-in animation attachment;
- Drawer static content surface, direction geometry, handle presentation,
  side-header alignment, close-button absolute placement, and reduced-motion
  animation suppression.

This experiment migrates those ordinary visual/layout rules from `tokens.css`
into Tailwind-scanned utilities emitted by the owning components. It must keep
Drawer's dependency-free drag-to-dismiss mechanics: `--radcn-drawer-drag-offset`,
direction-specific transforms, `data-dragging`, pointer handling, portal
visibility hooks, and the drawer direction keyframes may remain in package CSS
if they are still required for runtime behavior.

This experiment must not migrate docs/fixture/demo CSS, custom fixture token
classes, breadcrumb raw compositions, carousel example classes, or unrelated
modal overlay sub-elements.

## Changes

- `radcn/packages/radcn/src/components/alert-dialog.tsx`:
  - move the AlertDialog content width into `alertDialogContentClass`;
  - move the `size="sm"` width variable and footer grid behavior into
    data-size-driven utilities on `AlertDialogContent`;
  - preserve `data-size`, modal semantics, action/cancel behavior, and marker
    classes.
- `radcn/packages/radcn/src/components/sheet.tsx`:
  - move side geometry into `sheetContentClass` using `data-[side=*]`
    utilities;
  - move the slide-in animation attachment into the content utility string while
    keeping the existing `radcn-sheet-slide-in` keyframes if needed;
  - migrate Sheet reduced-motion animation suppression into component utilities
    or explicitly document any irreducible package CSS that must remain;
  - preserve `data-side`, portal/overlay behavior, close button behavior, and
    marker classes.
- `radcn/packages/radcn/src/components/drawer.tsx`:
  - move Drawer root/portal static layout, content static surface, direction
    geometry, handle presentation, side-header alignment, close-button absolute
    placement, and reduced-motion animation suppression into component-emitted
    utilities;
  - keep drag-to-dismiss behavior intact, including `touch-action`, transform
    reads from `--radcn-drawer-drag-offset`, `data-dragging` behavior, and the
    direction keyframes if Tailwind utilities still need them;
  - preserve `data-direction`, `data-vaul-drawer-direction`, `data-radcn-*`
    hooks, and `radcn-drawer-*` marker classes.
- `radcn/packages/radcn/src/styles/tokens.css` and
  `radcn/packages/radcn/src/styles/index.ts`:
  - remove the migrated AlertDialog, Sheet, and Drawer ordinary visual/layout
    rules;
  - keep theme tokens, fixture/demo CSS, portal/positioning rules not migrated
    in this experiment, required keyframes, and any irreducible drag mechanics;
  - regenerate `styles/index.ts` from `tokens.css`.
- `issues/0006-tailwind-required-styling-model/README.md`:
  - update the experiment index status when the result is recorded;
  - record durable modal/drawer layout migration learnings;
  - update the remaining queue if this experiment passes.

## Verification

1. Build style output:
   - `pnpm --dir radcn/fixtures/candidate-remix styles:build`
   - `pnpm --dir radcn/apps/docs styles:build`
2. Typecheck:
   - `pnpm radcn:typecheck`
   - `pnpm fixtures:candidate:typecheck`
   - `pnpm fixtures:reference:typecheck`
   - `pnpm --dir radcn/apps/docs typecheck`
3. Confirm generated CSS contains representative migrated utilities for:
   - AlertDialog content width and `data-size="sm"` footer layout;
   - Sheet right/left/top/bottom geometry and slide-in animation attachment;
   - Sheet reduced-motion animation suppression if migrated;
   - Drawer content static surface, direction geometry, handle presentation,
     side-header alignment, close-button placement, and reduced-motion
     animation behavior.
   Evidence should include concrete generated selectors/properties for:
   - `w-[min(calc(100vw-2rem),var(--radcn-alert-dialog-width,32rem))]`,
     `data-[size=sm]:[--radcn-alert-dialog-width:24rem]`, and the
     `data-[size=sm]` descendant footer grid utility;
   - Sheet `data-[side=right|left|top|bottom]` inset/size utilities,
     `animate-[radcn-sheet-slide-in_140ms_ease-out]`, and reduced-motion
     animation suppression;
   - Drawer fixed content surface utilities, direction-specific inset/width or
     max-height/radius/border/transform/animation utilities, handle
     width/height/background/margin utilities, side-header text alignment,
     direct-child close-button placement, and reduced-motion animation
     suppression.
4. Confirm `tokens.css` and `radcn/packages/radcn/src/styles/index.ts` are in
   sync with the repository's JSON-stringify formula after the CSS edit.
5. Confirm `tokens.css` no longer contains migrated visual/layout rules for:
   - `[data-radcn-alert-dialog-content]` width;
   - `[data-radcn-alert-dialog-content][data-size="sm"]` width/footer layout;
   - `[data-radcn-sheet-content]` side geometry, animation attachment, and
     reduced-motion suppression unless explicitly kept with rationale;
   - `.radcn-drawer`, `.radcn-drawer-portal`, `.radcn-drawer-content`,
     `.radcn-drawer-handle`, side-header alignment, close-button placement, and
     reduced-motion content animation suppression, except for explicitly kept
     drag/keyframe behavior.
6. Focused Playwright gates:
   - `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/dialog.spec.ts tests/modal-variants.spec.ts tests/drawer.spec.ts tests/positioned-overlays.spec.ts`
   - `pnpm exec playwright test -c radcn/apps/docs/playwright.config.ts`
7. Full fixture artifact gate:
   - `pnpm fixtures:artifacts`
8. Hygiene:
   - `git diff --check`
   - `git status --short`
   - `git diff --name-only | rg '^vendor/'` must produce no matches.
   - `git -C vendor/shadcn-ui status --short`,
     `git -C vendor/remix status --short`, and
     `git -C vendor/react-router status --short` must produce no matches.

Pass criteria:

- AlertDialog, Sheet, and Drawer ordinary visual/layout residuals come from
  Tailwind utilities rather than package CSS cascades.
- Drawer drag-to-dismiss, direction transforms, focus trapping, close controls,
  and portal visibility behavior remain green.
- AlertDialog and Sheet modal semantics, sizing, side placement, close
  controls, and docs previews remain green.
- Marker classes and data hooks used by tests/docs remain available.
- The Issue 6 README records the result status and durable learning from this
  cluster.
- No docs/fixture/demo CSS evacuation work is migrated.

Fail criteria:

- Any focused modal, drawer, positioned-overlay, docs, or fixture test
  regresses.
- Tailwind does not generate the needed data-attribute geometry or descendant
  utilities.
- The migration requires keeping ordinary visual/layout package CSS for the
  scoped residuals.
- The migration removes marker classes, data hooks, drag behavior, portal
  behavior, or close behavior used by tests/docs.

## Design Review

Reviewer: Raman (`019ebe44-d8d1-7952-b135-20ab0faadc7c`), fresh Codex
subagent with `fork_context: false`.

Initial findings:

- Major: the hygiene gate only checked parent-repo `vendor/` diffs, which would
  not detect dirty ignored nested vendor checkouts.
- Major: Sheet animation migration did not explicitly cover the matching
  reduced-motion suppression.
- Minor: generated-CSS evidence was too generic and did not name concrete
  representative selectors/properties.

Fixes:

- Added explicit nested vendor status checks for `vendor/shadcn-ui`,
  `vendor/remix`, and `vendor/react-router`.
- Added Sheet reduced-motion migration/protection to Changes and Verification.
- Added concrete generated-CSS evidence expectations for AlertDialog, Sheet,
  and Drawer utilities.

Re-review result: approved. The reviewer confirmed all prior findings were
resolved and no new blocker was introduced.
