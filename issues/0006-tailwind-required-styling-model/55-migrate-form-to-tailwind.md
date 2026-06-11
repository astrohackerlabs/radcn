# Experiment 55: Migrate Form container surfaces to Tailwind utilities

## Description

Form is a thin layout wrapper. Migrate its container surfaces (`.radcn-form` root,
`.radcn-form-field`/`.radcn-form-item`, `.radcn-form-control`) to Tailwind utilities.

### Kept bespoke (label-error color hook)

`.radcn-form-label[data-error="true"], .radcn-form-field[data-invalid="true"]
.radcn-form-label, .radcn-form-item[data-invalid="true"] .radcn-form-label { color:
var(--radcn-field-error, var(--radcn-destructive)) }` is a small cross-component
error-color hook: the form-label is a Label (it emits BOTH `radcn-form-label` and
`radcn-label`), and this rule colors it red on its own `data-error` OR when its
field/item is `data-invalid`. Migrating it would entangle with the Label component's
own color utilities (a property-level conflict) for marginal benefit, so it stays
bespoke and targets the retained `radcn-form-label` hook (the field/item keep
emitting `data-invalid`). This is the same "reduced to a documented hook" allowance
as the menu family helpers / triggers.

### MIGRATE (container surfaces)

- root (`.radcn-form`): `grid gap-4 w-[min(100%,var(--radcn-form-width,26rem))]
  text-foreground [font-family:var(--radcn-font)]`.
- field + item (`.radcn-form-field, .radcn-form-item`): `grid gap-2`.
- control (`.radcn-form-control`): `contents`.

The `.radcn-form-description` (`radcn-field-description`) + `.radcn-form-message`
(`radcn-field-error`) emit Field component classes — their styling already comes
from Field (Exp 37); they are unchanged here. The `data-radcn-form-*` attributes
(incl. `data-radcn-form-message`, located by `form-input-cluster.spec.ts:264`) +
the `radcn-form-label` hook are kept.

## Why both suites stay green

- `:264` `[data-radcn-form-message]` color `rgb(124,58,237)` is provided by the
  `radcn-field-error` class (Field, Exp 37) + the fixture token — unaffected by the
  Form container migration.
- The form-label error color holds via the kept bespoke rule (the label keeps
  `radcn-form-label`; the field/item keep `data-invalid`).
- The root/field/item/control surfaces have no computed assertions (structural grid);
  `text-foreground` resolves via the contract.

## Changes

- `radcn/packages/radcn/src/components/form.tsx`: emit utility-const strings for
  root/field/item/control; keep the `radcn-form-label`/`radcn-form-description`/
  `radcn-form-message` + Field/Label hook classes + all data attributes. ASCII
  comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-form`,
  `.radcn-form-field, .radcn-form-item`, `.radcn-form-control` rules; KEEP the
  `.radcn-form-label[...]` error-color rule.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; `w-[min(100%,var(--radcn-form-width,26rem))]`, `gap-4`,
   `gap-2`, `contents` compile; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; the `.radcn-form`/`-field`/`-item`/`-control` rules
   removed; the `.radcn-form-label[...]` error rule retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `form-input-cluster.spec.ts` (the form
   message color `:264`, the form layout, label error state, field/item invalid).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Form container surfaces render from Tailwind utilities; the
label-error hook + form-message color hold; BOTH suites green; byte-identical.

Fail criteria: the form-message color or label-error regresses; the layout drifts;
`tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given the design file + read access to the source/fixtures/tests).

Findings: APPROVED, no Blocker/Major. The reviewer verified all five cruxes: the 3
container rules map exactly (`gap-4`=1rem, `gap-2`=0.5rem, `contents`=display:contents,
the `w-[min(…)]`/`text-foreground`/font); the error-color rule is correctly kept
bespoke (the form-label emits `radcn-form-label`+`radcn-label`+`data-error`; field/item
keep `data-invalid`); the form-message/description styling comes from Field's
`radcn-field-error`/`radcn-field-description` (Exp 37) so `:264`'s
`rgb(124,58,237)`=`--radcn-field-error` `#7c3aed` is UNAFFECTED; and a grep found NO
other consumer of `.radcn-form`/`-field`/`-item`/`-control`. Minor notes (no action):
verify the arbitrary `w-[min(…)]`/font compile (the dual-suite build does); the
label dual-class semantics hold (the kept bespoke rule, not a Label color util).

Approval result: approved — the container surfaces migrate cleanly, the label-error
hook + the Field-provided message color are unaffected.
