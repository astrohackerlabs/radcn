# Experiment 11: Migrate Label to Tailwind utilities

## Description

Migrate Label from bespoke `radcn-label` CSS to verbatim shadcn v4 utilities.
Label is consumed via its JSX API (no raw `radcn-label` class strings in
fixtures/docs), but unlike the earlier leaf migrations it has a cross-component
CSS dependency: the Field component styles invalid-state labels via
`.radcn-field[data-invalid="true"] .radcn-label { color: destructive }`
(tokens.css:210). That selector is repointed to the `[data-radcn-label]` data
attribute (which the migrated Label still emits), so the field-invalid-label
behavior is preserved without the `radcn-label` class.

shadcn v4 mapping (vendored `registry/new-york-v4/ui/label.tsx`, verbatim):

`flex items-center gap-2 text-sm leading-none font-medium select-none
group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
peer-disabled:cursor-not-allowed peer-disabled:opacity-50`

RadCN adaptation (documented): RadCN's Label has a `disabled` prop that sets
`data-disabled="true"` on the label element itself (shadcn instead relies on a
`.group`/`peer` ancestor context). shadcn's `group-data-[disabled=true]:*` and
`peer-disabled:*` variants are kept verbatim (harmless; inert in RadCN's usage,
which has no such ancestor) and a SELF variant is added so the `disabled` prop
still works:
`data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50`.
This changes the disabled appearance from RadCN's current muted-color to
shadcn's opacity-50 — faithful to shadcn and not asserted by any test.

All utilities resolve via the Experiment 2 contract (none beyond Tailwind
defaults + the theme; the label sets no explicit text color, inheriting like
shadcn, so the Field-invalid `color: destructive` rule still wins).

Scope: Label only. No preflight change. `data-radcn-label`, `data-disabled`,
and `for` are retained.

## Why both suites stay green (no test changes expected)

- The docs label-demo computed-style assertions (`coverage.spec.ts:128-130`:
  `display: flex`, `align-items: center`, `gap: 8px`) are on the docs WRAPPER
  `[data-radcn-docs-label-family="label-demo"]`, not on `[data-radcn-label]`.
  The label itself is only asserted for `for` and text. So the label's own
  appearance change is not gated.
- No fixture test asserts a label computed style, class presence, or disabled
  appearance (grep of `radcn/fixtures/tests` for `radcn-label`/`data-radcn-label`
  with `toHaveCSS`/`toHaveClass`/`disabled` is empty).
- No fixture/docs scenario sets a `--radcn-label*` custom token (none exist),
  and no raw `radcn-label` class string is used.
- The Field-invalid-label color (`tokens.css:210`) is not asserted by any test,
  but is preserved by the selector repoint so the behavior does not silently
  regress.

## Changes

- `radcn/packages/radcn/src/components/label.tsx`: replace
  `classes('radcn-label', className)` with
  `classes(<verbatim shadcn label string> + ' data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50', className)`
  (or a base constant + the self-disabled suffix). Keep the `<label>` element,
  `data-radcn-label`, `data-disabled` (set from the `disabled` prop), and `for`.
- `radcn/packages/radcn/src/styles/tokens.css`:
  - remove `.radcn-label` (base) and `.radcn-label[data-disabled="true"]`;
  - repoint `.radcn-field[data-invalid="true"] .radcn-label` to
    `.radcn-field[data-invalid="true"] [data-radcn-label]` (preserves the
    field-invalid-label color via the data hook);
  - replace the removed base rules with a short migration comment (no literal
    selectors).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n`.

Expected git status: `label.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; each generated CSS contains the label utilities
   (`leading-none`, `select-none`, the `data-[disabled=true]:opacity-50`
   utility, `group-data-[disabled=true]:opacity-50`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-label` rule remains;
   the Field-invalid rule now targets `[data-radcn-label]`.
4. Docs suite green (11), run twice — incl. the label-demo wrapper assertions.
5. Fixture suite green (1191), run twice — incl. the Field cluster
   (`form-input-cluster.spec.ts`).
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; only
   the expected files changed.

Pass criteria: Label renders from Tailwind utilities (no `radcn-label` class
emitted); `data-radcn-label`/`data-disabled`/`for` intact; the Field-invalid
selector targets the data hook; BOTH suites green and stable; the Field cluster
and label-demo assertions pass.

Fail criteria: any spec regresses (esp. the Field cluster, if the selector
repoint missed something); a utility not generated; `tokens.css`/`index.ts`
diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources incl. vendored shadcn)

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed: the verbatim shadcn label string; the three
`.radcn-label` selectors in tokens.css (210 field-invalid, 258 base, 263
disabled) and that ONLY the field-invalid one depends on the class (correctly
repointed to `[data-radcn-label]`); the migrated label sets no color utility so
the repointed `color: var(--radcn-field-error, var(--radcn-destructive))` rule
(in `radcnStyles`, ordered after the Tailwind link) still wins; the docs
`128-130` flex/gap assertions are on the docs WRAPPER, not the label; no
fixture/docs test asserts a label computed style, class presence, or
disabled-label appearance (there are disabled-label fixtures in
combobox/field/input-otp but none assert appearance); the self
`data-[disabled=true]` variant is the correct RadCN-API-preserving adaptation
while shadcn's inert `group-data`/`peer-disabled` variants are kept verbatim;
and the disabled muted-color→opacity-50 change is faithful and untested.
Verdict: APPROVED.

Approval result: approved with no blockers.
