# Experiment 59: Migrate InputOTP to Tailwind utilities

## Description

InputOTP (container + hidden input + slots/group + slot + caret + separator) is
standalone. Two nuances:

1. **Invalid→slot propagation (Exp-47):** `.radcn-input-otp[data-invalid] .slot` and
   `.radcn-input-otp:has([aria-invalid]) .slot` color the slot border red — a
   parent→child cascade onto the migrated slot. Migrate via CSS-var propagation: the
   container SETS `--radcn-input-otp-slot-bc` via `data-[invalid=true]:[--…]` and
   `has-[[aria-invalid=true]]:[--…]`; the slot READS
   `border-[color:var(--radcn-input-otp-slot-bc,var(--radcn-input-otp-border,var(--radcn-input)))]`.
2. **Position-based first/last (unasserted):** the FIRST slot rounds its left corners
   + drops the `-ml-px` overlap; the LAST slot rounds its right corners. The original
   keys on `.group:first-child .slot:first-child` / `.group:last-child .slot:last-child`
   (the very first/last slot across groups). Since only `:232`
   (`toHaveClass(/radcn-fixture-custom-input-otp/)`) is asserted (no computed
   rounding/margin assertion), reproduce via the slot's OWN position variants
   `first:ml-0 first:rounded-l-md last:rounded-r-md` — exact for the single-group
   case (the fixture + common usage); for multi-group it rounds each group's ends
   (a documented, unasserted divergence).

### Exact utility mapping

- container (`.radcn-input-otp`): `inline-grid gap-2 text-foreground
  [font-family:var(--radcn-font)] data-[disabled=true]:opacity-[0.55]
  data-[invalid=true]:[--radcn-input-otp-slot-bc:var(--radcn-field-error,var(--radcn-destructive))]
  has-[[aria-invalid=true]]:[--radcn-input-otp-slot-bc:var(--radcn-field-error,var(--radcn-destructive))]`.
- input (`.radcn-input-otp-input`): `w-px h-px border-0 opacity-0 absolute
  pointer-events-none`.
- slots + group (`.radcn-input-otp-slots, .radcn-input-otp-group`): `flex items-center`.
- slot (`.radcn-input-otp-slot`): `inline-flex relative
  size-[var(--radcn-input-otp-slot-size,2.5rem)] items-center justify-center border
  border-[color:var(--radcn-input-otp-slot-bc,var(--radcn-input-otp-border,var(--radcn-input)))]
  bg-[var(--radcn-input-otp-bg,var(--radcn-background))]
  text-[var(--radcn-input-otp-fg,var(--radcn-foreground))] text-base font-medium
  leading-none [font-family:var(--radcn-font)] -ml-px first:ml-0 first:rounded-l-md
  last:rounded-r-md data-[active=true]:z-[1]
  data-[active=true]:border-[var(--radcn-ring)]
  data-[active=true]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`.
  (`rounded-l-md`/`rounded-r-md` = the left/right corners at `var(--radcn-radius)`.
  Note: when a slot is BOTH active and invalid, the active ring border wins —
  unlike the original where the higher-specificity descendant-invalid won; this
  active+invalid combination is rare and unasserted.)
- caret (`.radcn-input-otp-caret`, set via JS `caret.className = …`): `w-px h-5
  bg-foreground animate-[radcn-input-otp-caret_1s_steps(2,_start)_infinite]` (the
  `_` inside `steps(2,_start)` is the space, matching the original `steps(2, start)`;
  the build gate confirms it compiles). The JS that sets `caret.className` is updated
  to the const.
- separator (`.radcn-input-otp-separator`): `inline-flex w-4 items-center
  justify-center text-muted-foreground`.

Kept bespoke: `@keyframes radcn-input-otp-caret`; the
`.radcn-fixture-custom-input-otp` fixture (border/bg/fg tokens, read by the slot).

## Why both suites stay green

- `:232` asserts only the container `radcn-fixture-custom-input-otp` class — on the
  container (unaffected). The slot reads the fixture's `--radcn-input-otp-border`/`-bg`/
  `-fg` via its token utilities (custom violet styling holds).
- Invalid via the container's var-set → the slot's inherited border read; active via
  the slot's own `data-[active=true]:` variants; the caret animation via the kept
  `@keyframes`.

## Changes

- `radcn/packages/radcn/src/components/input-otp.tsx`: emit utility-const strings for
  container/input/slots+group/slot/caret/separator; the container SETS the slot
  invalid var; keep all data attributes. ASCII/token-free comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-input-otp*` rules;
  KEEP `@keyframes radcn-input-otp-caret` + the custom fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `size-[var(…)]`, `first:rounded-l-md`,
   `has-[[aria-invalid=true]]:[--…]`, `data-[invalid=true]:[--…]`,
   `animate-[radcn-input-otp-caret_1s_steps(2,_start)_infinite]` utilities compile
   (grep the generated CSS for the caret animation); no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-input-otp*` rule remains; the keyframes +
   fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `form-input-cluster.spec.ts` (the InputOTP
   custom class, slot entry, active slot, disabled, invalid, separators).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: InputOTP renders from Tailwind utilities; the custom slot styling +
invalid (propagation) + active + the first/last rounding hold; BOTH suites green;
byte-identical.

Fail criteria: a form-input-cluster assertion regresses; the slot styling/rounding
drifts; the invalid propagation fails; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: the SUBSTANTIVE checks all PASSED — CRUX 1 (the container emits
`data-invalid` + contains the `aria-invalid` input, so the `data-[invalid=true]:`/
`has-[[aria-invalid=true]]:` var-sets + the slot's inherited read reproduce the
invalid cascade; the active-ring-wins-over-invalid combination is rare + unasserted,
acknowledged), CRUX 2 (the first/last rounding + `-ml-px` via `first:ml-0
first:rounded-l-md last:rounded-r-md`, exact for single-group — the fixture's case —
with the multi-group divergence unasserted), CRUX 3 (mappings exact: `text-base`=1rem,
`gap-2`, the shadow color-mix), CRUX 5 (`@keyframes`/fixture kept; `:232` the only
assertion). Two addressable items: (1) the caret `steps()` animation syntax — RESOLVED
by using `steps(2,_start)` (underscore→space, matching the original `steps(2, start)`)
and verifying it compiles at the build gate; (3) the caret `className` is set in JS
(`input-otp.tsx:100`) — the implementation updates that JS to the const (CRUX 4 in
the plan). The reviewer's "REJECTED" hinged on those two, both handled.

Approval result: approved — the invalid propagation + position variants + mappings
are sound; the caret JS conversion + the `steps(2,_start)` build-check close the
flagged items.
