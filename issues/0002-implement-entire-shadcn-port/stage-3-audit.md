# Stage 3 Audit

Stage 3 is complete as of Experiment 16.

Stage 3 covered overlay, portal, focus management, scroll lock, positioning,
dismissal, gesture, animation-state, accessibility, visual, and customization
behavior for the overlay primitives listed in Issue 2.

| Component | Completing experiment | Source status | Fixture/artifact status | Focused-test status | Documentation status | Divergences and notes |
| --- | --- | --- | --- | --- | --- | --- |
| `dialog` | [Experiment 12](12-stage-3-dialog-overlay-foundation.md) | Implemented in `packages/radcn/src/components/dialog.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/dialog.spec.ts` | Documented in `docs/radcn-source.md` | Establishes shared modal helper. |
| `alert-dialog` | [Experiment 13](13-stage-3-modal-variants-alert-dialog-and-sheet.md) | Implemented in `packages/radcn/src/components/alert-dialog.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/modal-variants.spec.ts` | Documented in `docs/radcn-source.md` | Defaults to non-dismissible Escape/outside behavior. |
| `sheet` | [Experiment 13](13-stage-3-modal-variants-alert-dialog-and-sheet.md) | Implemented in `packages/radcn/src/components/sheet.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/modal-variants.spec.ts` | Documented in `docs/radcn-source.md` | Reuses modal helper with side placement hooks. |
| `popover` | [Experiment 14](14-stage-3-positioned-overlay-foundation.md) | Implemented in `packages/radcn/src/components/popover.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/positioned-overlays.spec.ts` | Documented in `docs/radcn-source.md` | Uses non-modal positioned overlay helper. |
| `tooltip` | [Experiment 14](14-stage-3-positioned-overlay-foundation.md) | Implemented in `packages/radcn/src/components/tooltip.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/positioned-overlays.spec.ts` | Documented in `docs/radcn-source.md` | Preserves hoverable content behavior in this implementation. |
| `hover-card` | [Experiment 14](14-stage-3-positioned-overlay-foundation.md) | Implemented in `packages/radcn/src/components/hover-card.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/positioned-overlays.spec.ts` | Documented in `docs/radcn-source.md` | Moved from Stage 2 to Stage 3 because it depends on overlay positioning and hover/focus timers. |
| `dropdown-menu` | [Experiment 15](15-stage-3-menu-overlay-primitives.md) | Implemented in `packages/radcn/src/components/dropdown-menu.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/menu-overlays.spec.ts` | Documented in `docs/radcn-source.md` | Uses menu-specific helper for roving focus, typeahead, checked state, and submenus. |
| `context-menu` | [Experiment 15](15-stage-3-menu-overlay-primitives.md) | Implemented in `packages/radcn/src/components/context-menu.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/menu-overlays.spec.ts` | Documented in `docs/radcn-source.md` | Uses pointer virtual anchors and keyboard trigger anchoring. |
| `drawer` | [Experiment 16](16-stage-3-drawer-and-closure-audit.md) | Implemented in `packages/radcn/src/components/drawer.tsx` | Reference/candidate scenarios captured by `pnpm fixtures:artifacts` | Covered by `fixtures/tests/drawer.spec.ts` | Documented in `docs/radcn-source.md` | Reuses modal helper and adds direction, handle, internal scroll, and deterministic 80px drag threshold. Vaul velocity physics, snap points, nested scaling, and background scaling are not included in Stage 3. |

## Verification

Stage 3 completion requires the Experiment 16 result verification to pass:

- `pnpm radcn:typecheck`
- `pnpm fixtures:candidate:typecheck`
- `pnpm fixtures:reference:typecheck`
- `pnpm playwright test -c fixtures/playwright.config.ts fixtures/tests/drawer.spec.ts`
- `pnpm fixtures:artifacts`

The artifact manifest after Experiment 16 should include every Stage 3 drawer
scenario in both reference and candidate apps, in addition to the previously
captured dialog, alert-dialog, sheet, popover, tooltip, hover-card,
dropdown-menu, and context-menu scenarios.

## Conclusion

No remaining Stage 3 prerequisite blocks Stage 4. Follow-up hardening can still
improve individual overlays, but Issue 2 can now move to composite keyboard
widgets: `select`, `combobox`, `command`, `menubar`, `navigation-menu`,
`calendar`, `date-picker`, and `carousel`.
