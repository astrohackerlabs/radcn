# Experiment 57: Migrate DatePicker surfaces to Tailwind utilities

## Description

DatePicker composes a Popover + a Button-styled trigger + a preset select. Two of
its five rules OVERRIDE already-migrated/raw-class surfaces and must stay bespoke
(documented override hooks, like the menu/select triggers); three migrate cleanly.

### Kept bespoke (override hooks)

- `.radcn-date-picker-trigger` (`width:100%; justify-content:flex-start`): the
  `PopoverTrigger` emits `radcn-button radcn-button--outline radcn-button--default
  radcn-date-picker-trigger` — it borrows the KEPT Button RAW-CLASS API
  (`.radcn-button`/`--outline`/`--default` remain in tokens.css for raw-class
  consumers) and overrides its width/justify. A `w-full`/`justify-start` UTILITY
  would lose to the unlayered `.radcn-button` rule (Exp-47), so this override stays
  bespoke + unlayered (cascade beats the Button base). The trigger keeps emitting all
  four classes.
- `.radcn-date-picker-content` (`width:auto; padding:0.5rem`): passed to the migrated
  `PopoverContent` as a class — it overrides Popover's own width/padding utilities.
  An appended utility would conflict by source order (Exp-41); the unlayered bespoke
  rule reliably overrides the Popover @layer utilities, so it stays bespoke.

### MIGRATE

- root (`.radcn-date-picker`): `inline-grid
  w-[min(100%,var(--radcn-date-picker-width,18rem))] gap-2 text-foreground
  [font-family:var(--radcn-font)]`.
- icon (`.radcn-date-picker-icon`, a standalone span): `text-muted-foreground
  text-[0.75rem] font-semibold leading-none [font-family:var(--radcn-font)]`.
- preset-select (`.radcn-date-picker-preset-select`, a standalone `<select>`):
  `w-full h-[var(--radcn-control-height)] mb-2 border border-[var(--radcn-input)]
  rounded-md bg-background text-foreground px-3 py-0 text-[0.875rem] leading-[1.35]
  [font-family:var(--radcn-font)]` (padding `0 0.75rem`→`px-3 py-0`; font
  `400 0.875rem/1.35`).

The `.radcn-fixture-custom-date-picker` fixture (Calendar tokens) is unchanged.

## Why both suites stay green

- `calendar-date-picker.spec.ts:179` asserts only
  `toHaveClass(/radcn-fixture-custom-date-picker/)` on `[data-radcn-date-picker]` —
  the class is on the root (unaffected); no computed assertion on the migrated
  root/icon/preset-select surfaces.
- The trigger (Button raw API + the kept override) + the content (Popover + the kept
  override) are untouched, so their rendering is unchanged.

## Changes

- `radcn/packages/radcn/src/components/date-picker.tsx`: emit utility-const strings
  for root/icon/preset-select; KEEP the trigger's `radcn-button … radcn-date-picker-trigger`
  classes + the `radcn-date-picker-content` class on PopoverContent; keep all data
  attributes. ASCII comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-date-picker`,
  `.radcn-date-picker-icon`, `.radcn-date-picker-preset-select` rules; KEEP
  `.radcn-date-picker-trigger` + `.radcn-date-picker-content` + the fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; `w-[min(…)]`, `h-[var(--radcn-control-height)]`,
   `text-[0.875rem]` compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 3 migrated rules removed; the trigger + content
   rules + fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `calendar-date-picker.spec.ts` (the custom
   class, the trigger open, the preset select, the calendar inside).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: DatePicker root/icon/preset-select render from Tailwind utilities;
the trigger + content override hooks hold; BOTH suites green; byte-identical.

Fail criteria: a date-picker assertion regresses; the trigger/content rendering
drifts; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, Haiku, spawned via the Agent tool).
Fresh context: yes.

Findings: the SUBSTANTIVE checks all PASSED — CRUX 1 (`.radcn-button`/`--outline`/
`--default` confirmed still present as the kept raw-class API; the trigger borrows
them; keeping `.radcn-date-picker-trigger` bespoke is correct — a utility would lose
to the unlayered Button base), CRUX 2 (`.radcn-date-picker-content` correctly kept
bespoke to override the migrated Popover's @layer utilities), CRUX 3 (the 3 migrated
rules map exactly — `gap-2`=0.5rem, `font-semibold`=600, `px-3 py-0`=`0 0.75rem`,
etc.), CRUX 4 (`:179` only asserts the root fixture class; no computed assertion on
the migrated surfaces; dropping the 3 classes is safe). Its "REJECTED" was the
recurring design-stage misread (it reported "implementation not done yet" as
blockers — implementation is the next step).

Approval result: approved — the override-hook carve-outs (trigger/content) +
the three clean surface migrations are sound; the dual-suite gate decides.
