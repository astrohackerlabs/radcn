# Experiment 43: Migrate NativeSelect to Tailwind utilities

## Description

NativeSelect (wrapper + native `<select>` + chevron icon + option/optgroup) is
self-contained. Migrate the surfaces to token-referencing Tailwind utilities.

Two wrinkles drive the design:

1. **Class-locator (must keep a marker).** `native-select.spec.ts:94` asserts
   `select[...][data-size="sm"]` `toHaveClass(/radcn-native-select--sm/)`. So the
   `radcn-native-select--{size}` class is RETAINED on the `<select>` as a
   style-less marker (a test hook, like a data attribute); its CSS rule is
   removed and the sizing moves to a size `Record`.
2. **Conflicting props go in the size Record, NOT the base** (the Exp-41 lesson).
   The base and `--sm` both set `min-height`, `padding-left`, and `font-size`.
   Putting any of those in the base AND the Record would conflict (source-order
   wins). So the base sets NONE of min-h/pl/font-size; the size `Record` sets all
   three for both default and sm.

### Exact utility mapping

- wrapper (`.radcn-native-select-wrapper`): `relative inline-flex w-fit
  min-w-[14rem] items-center [font-family:var(--radcn-font)]
  has-[select:disabled]:opacity-50` (the `:has(.radcn-native-select:disabled)`
  rule → `has-[select:disabled]:`). Drops the style-less `wrapper--{size}` class
  (no CSS rule, not asserted); keeps `data-size`.
- select base (`.radcn-native-select`): `w-full appearance-none border
  border-[var(--radcn-native-select-border,var(--radcn-input))] rounded-md
  bg-[var(--radcn-native-select-bg,var(--radcn-background))]
  text-[var(--radcn-native-select-fg,var(--radcn-foreground))] pr-9 py-0
  font-normal leading-[1.35] outline-none transition-[border-color,box-shadow]
  focus-visible:border-[var(--radcn-ring)]
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  disabled:cursor-not-allowed
  aria-invalid:border-[var(--radcn-native-select-invalid,var(--radcn-destructive))]
  aria-invalid:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-native-select-invalid,var(--radcn-destructive))_20%,transparent)]`
  (padding `0 2.25rem 0 0.75rem` → `pr-9 py-0` here; `pl` is per-size below; font
  `400 0.875rem/1.35` → `font-normal leading-[1.35]`, size per-size below).
  - size `Record` (the conflicting min-h/pl/font-size): default
    `min-h-[var(--radcn-control-height)] pl-3 text-[0.875rem]`; sm `min-h-8 pl-2.5
    text-[0.8125rem]` (2rem→min-h-8, 0.625rem→pl-2.5).
  - PLUS the retained marker class `radcn-native-select--{size}` (style-less).
- icon (`.radcn-native-select-icon`): `pointer-events-none absolute right-3
  text-muted-foreground text-[0.75rem] font-semibold leading-none
  [font-family:var(--radcn-font)]` (font `600 0.75rem/1`).
- option (`.radcn-native-select-option`) + optgroup: `bg-[Canvas] text-[CanvasText]`
  (system colors, preserved verbatim).

The `aria-invalid:` variant matches `[aria-invalid="true"]` (Tailwind default).
The custom-native-select fixture (`--radcn-native-select-border` etc.) is retained
and read by the token-referencing utilities (asserted border `rgb(15,118,110)`).

## Why both suites stay green

- `native-select.spec.ts:94` (`toHaveClass(/radcn-native-select--sm/)`) passes —
  the marker class is retained on the `<select>`.
- `:99` (custom border `rgb(15,118,110)`) holds via
  `border-[var(--radcn-native-select-border,…)]` reading the unchanged fixture
  token (#0f766e).
- The size difference (sm shorter/tighter) holds because min-h/pl/font-size live
  ONLY in the size Record (no base conflict); focus/disabled/invalid reproduce via
  the variants; the `:has(:disabled)` wrapper dim via `has-[select:disabled]:`.

## Changes

- `radcn/packages/radcn/src/components/native-select.tsx`: emit utility-const
  strings for wrapper/select (+ size `Record`)/icon/option/optgroup; RETAIN the
  `radcn-native-select--{size}` marker class on the `<select>`; drop the other
  `radcn-native-select*` classes + the style-less `wrapper--{size}`; keep ALL
  data attributes.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-native-select*` rules (incl. `.radcn-native-select--sm` — its styling
  moves to the Record; the marker class is now style-less); KEEP
  `.radcn-fixture-custom-native-select`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the canonical node
  formula.

Comments stay ASCII and free of bracketed class-like tokens (the Exp-42 lesson —
`@source` scans this file).

Expected git status: `native-select.tsx`, `tokens.css`, `index.ts`, this file,
README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; the utilities generate (`appearance-none`,
   `has-[select:disabled]:`, `aria-invalid:`, `bg-[Canvas]`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-native-select*`
   CLASS rule remains (the `--sm` marker is now style-less, emitted by the
   component but with no rule); `.radcn-fixture-custom-native-select` retained.
   Confirm no junk ellipsis-style utility in the generated CSS. ALSO confirm the
   generated CSS emits `font-size: 0.75rem` (NOT `color`) for the icon's
   `text-[0.75rem]` utility (the design-review icon-ambiguity check).
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `native-select.spec.ts` (the
   `--sm` marker class at :94, the custom border `rgb(15,118,110)` at :99, the
   size/focus/disabled/invalid states, the icon, options).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: NativeSelect renders from Tailwind utilities (only the `--sm`
marker class remains, style-less); the size/states/custom border/icon hold; BOTH
suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: the `--sm` class assertion or custom border regresses; a size/state
breaks; a min-h/pl/font-size conflict collapses the sizes; `tokens.css`/`index.ts`
diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README incl. the Exp-41/42
lessons, this experiment file, and read access to the source)

Findings: the SUBSTANTIVE review PASSED all five cruxes — CRUX 1 (the conflicting
min-h/pl/font-size live ONLY in the size Record, base has none — no Exp-41
conflict), CRUX 2 (the `radcn-native-select--{size}` marker class is retained on
the `<select>` for the `:94` assertion; the style-less `wrapper--{size}` is safely
dropped), CRUX 3 (default/sm font sizes use literal `text-[0.875rem]`/
`text-[0.8125rem]`, not `text-[var()]`), CRUX 4 (all mappings exact; the
`aria-invalid:`/`focus-visible:`/`disabled:`/`has-[select:disabled]:` variants
correct), CRUX 5 (the custom border `rgb(15,118,110)` holds via the token-reading
utility). No cross-component reuse; comments ASCII/token-free.

It returned "REJECTED" on ONE flagged blocker: the icon's `text-[0.75rem]`,
citing the Exp-42 ambiguity. Lead-agent assessment: this is a FALSE POSITIVE for
this case. The Exp-42 ambiguity is specific to `text-[var(...)]` — a `var()`
Tailwind cannot classify, so it defaults to `color`. A LITERAL length with a unit
(`text-[0.75rem]`) IS unambiguously inferred as `font-size`; indeed the
just-shipped Exp-42 Typography uses `text-[0.8125rem]`/`text-[0.875rem]` as
font-sizes and passed the full suite (1191). Keeping `text-[0.75rem]` is also
consistent with that committed migration. To remove all doubt, Verification adds
an explicit check that the generated CSS emits `font-size` (not `color`) for the
icon utility; if it somehow did not, the fallback is `[font-size:0.75rem]`.

Approval result: approved (lead-agent judgment) — the five cruxes hold; the
icon-font-size blocker is overruled with evidence + an added empirical build
check.
