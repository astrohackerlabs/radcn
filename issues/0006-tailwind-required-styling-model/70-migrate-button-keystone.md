# Experiment 70: Migrate the Button keystone to Tailwind utilities

## Description

The keystone, deferred by Exp 31 for its blast radius — now unblocked (the consumer-site
pattern is proven, Exps 67–69) and executable. The `.radcn-button` base + 6 variant
(`--default/--secondary/--outline/--ghost/--destructive/--link`) + 6 size
(`--default/--sm/--lg/--icon/--icon-sm/--icon-lg`) rules migrate to utilities. Button is
the only component with MULTIPLE base↔variant/size property-override conflicts
(border-color, min-height, padding-x/y, width, font-size); each is resolved with the
proven VAR-SET pattern (base reads `…-[var(--radcn-btn-X,default)]`; the variant/size
SETS the var) so every conflicting property is declared once.

The component (`button.tsx`) emits the utilities + KEEPS the
`radcn-button`/`--{variant}`/`--{size}` markers (27 specs assert them by name). The ~95
raw sites (58 docs `components.tsx` + ~37 across 12 fixtures) are UNIFORM literals — 11
distinct `class="…"` combos — so each combo is replaced by its augmented string
(append `buttonBase` + the variant-set + size-set utilities; keep all original tokens).
The button-group cross-component cascades (Exp 63) reference `.radcn-button` and stay.

### Const mapping

`buttonBase` (reads the conflict vars):
`inline-flex items-center justify-center gap-2 w-[var(--radcn-btn-w,max-content)]
min-h-[var(--radcn-btn-mh,var(--radcn-control-height))] border
border-[var(--radcn-btn-bc,transparent)] rounded-md py-[var(--radcn-btn-py,0.5rem)]
px-[var(--radcn-btn-px,1rem)] font-medium text-[length:var(--radcn-btn-fs,0.875rem)]
leading-none [font-family:var(--radcn-font)] no-underline whitespace-nowrap outline-none
cursor-pointer [transition:background-color_120ms_ease,color_120ms_ease,border-color_120ms_ease]
focus-visible:border-[var(--radcn-ring)]
focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed
aria-disabled:opacity-50`

Variant consts:
- default: `bg-[var(--radcn-button-bg,var(--radcn-primary))] text-[var(--radcn-button-fg,var(--radcn-primary-foreground))]`
- secondary: `bg-secondary text-secondary-foreground`
- outline: `[--radcn-btn-bc:var(--radcn-border)] bg-background text-foreground`
- ghost: `bg-transparent text-foreground`
- destructive: `bg-destructive text-destructive-foreground`
- link: `[--radcn-btn-mh:auto] [--radcn-btn-px:0] bg-transparent
  text-[var(--radcn-button-link-fg,var(--radcn-primary))] underline underline-offset-2`

Size consts (`default` = `''`):
- sm: `[--radcn-btn-mh:2rem] [--radcn-btn-px:0.75rem] [--radcn-btn-py:0.375rem] [--radcn-btn-fs:0.8125rem]`
- lg: `[--radcn-btn-mh:2.75rem] [--radcn-btn-px:1.25rem] [--radcn-btn-py:0.625rem] [--radcn-btn-fs:1rem]`
- icon: `[--radcn-btn-w:var(--radcn-control-height)] [--radcn-btn-px:0] [--radcn-btn-py:0]`
- icon-sm: `[--radcn-btn-w:2rem] [--radcn-btn-mh:2rem] [--radcn-btn-px:0] [--radcn-btn-py:0]`
- icon-lg: `[--radcn-btn-w:2.75rem] [--radcn-btn-mh:2.75rem] [--radcn-btn-px:0] [--radcn-btn-py:0]`

(`text-[length:var(…)]` — the `length:` hint makes the var a font-size, not a color,
per the Exp-42 lesson.)

### Component (button.tsx)

`mergedClass = classes(buttonBase, buttonVariant[variant], buttonSize[size],
'radcn-button', \`radcn-button--${variant}\`, \`radcn-button--${size}\`, className)`
— utilities first (so a consumer `className` can still override), markers kept.

### Consumer raw sites (11 distinct combos, ~95 occurrences)

Each `class="radcn-button radcn-button--{v}[ radcn-button--{s}][ extra]"` →
`class="radcn-button radcn-button--{v}[ radcn-button--{s}][ extra] {buttonBase} {variant-set} {size-set}"`
(append after the existing tokens; keep markers + any extra utility like `size-8`).
The 11 combos: outline; outline+default; outline+sm; secondary; outline+icon;
ghost+icon-sm; link; ghost+icon+size-8; outline+icon-sm; default; default+default.

## Why both suites stay green

- The 27 `toHaveClass(/radcn-button--{variant}/)` assertions hold (markers kept on both
  the component + raw sites).
- Any computed button color/size assertions resolve via the var reads (the var-set
  variant/size + the base read reproduce the exact CSS).
- The button-group merge/sizing cascades (kept, reference `.radcn-button`) still match.
- The utilities GENERATE (consumer files scanned — proven Exps 67–69); verified in the
  gate by grepping the generated CSS.

## Changes

- `button.tsx`: define `buttonBase` + `buttonVariant`/`buttonSize` maps; emit them +
  keep markers.
- 12 fixture files + docs `components.tsx`: per-combo literal replacement of the ~95 raw
  sites.
- `tokens.css`: remove `.radcn-button` base/`:focus-visible`/`:disabled` + the 6 variant
  + 6 size rules; KEEP the `.radcn-button-group …` cascades.
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the button base/variant/size utilities + the var-sets
   GENERATE in the candidate build (grep `--radcn-btn-bc`, the base `min-h`/`px` reads,
   `underline-offset-4`); no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 13 button rules removed; the button-group cascades kept.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — the 27 `radcn-button--{variant}` assertions + every
   button-bearing spec (dialog/drawer/sheet/menu/toast/data-table/navigation/
   positioned-overlays/combobox/static-display/collapsible/alert-dialog) + the
   button-group merge.
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Button renders from utilities (component + all 95 raw sites); the
variant/size conflicts resolve via the vars; the 27 assertions + all button specs hold;
BOTH suites green; byte-identical. This migrates the KEYSTONE — clears the dominant
remaining debt.

Fail criteria: a button assertion regresses; the base/variant utilities don't generate;
a variant/size conflict misrenders; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

The keystone migrated; both suites green (both fixture runs clean). The component
(`button.tsx`) emits `buttonBase` + the variant/size var-set maps + keeps the markers;
the ~99 raw sites (component + 36 docs real-demos + the fixtures) append the utilities;
the 14 button rules removed (button-group cascades kept); `index.ts` byte-identical;
the button utilities GENERATE (count 20 incl. `--radcn-btn-bc`/`-mh` reads +
`underline-offset-2`); no junk; all three typechecks pass; fixture **1191 ×2** (the 27
`radcn-button--{variant}` assertions hold), docs **11 ×2**; `git diff --check` clean.

**One regression caught + fixed mid-implementation (a key lesson):** the first run's
naive `class="…"` regex ALSO rewrote `class="radcn-button …"` strings inside the docs'
CODE-SAMPLE template literals (`const …Source = \`…\``, displayed as text), breaking a
`coverage.spec.ts` exact-text assertion (`<TooltipTrigger class="radcn-button
radcn-button--outline">Hover…`). Fix: re-ran the docs migration with a backtick-region
exclusion — `class="…"` is augmented ONLY outside backtick template literals, so the
REAL demos (36, outside backticks) migrate while the displayed code-samples stay
verbatim. Re-gate: docs coverage **5 passed**, both suites green.

## Conclusion

The Button keystone — base + 6 variants + 6 sizes — renders from Tailwind utilities,
with every base↔variant/size property conflict (border-color/min-height/padding-x/y/
font-size/width) resolved by the var-set pattern (base reads `--radcn-btn-*`; the
variant/size sets it). The `radcn-button`/`--{variant}`/`--{size}` markers are kept
(27 assertions + the button-group cascades); the ~99 raw sites + the component emit the
utilities. This clears the DOMINANT remaining debt (the Exp-31 deferral). Remaining: a
small set of Button-coupled triggers/closes (`select-trigger`, `dialog-trigger`,
`drawer-trigger`, `dropdown-menu-trigger`, `popover-close`) — same consumer-site
pattern, several reusing `buttonBase`.

Learnings (also copied to the issue README Learnings digest):

- Button's base↔variant/size conflicts (the most in any component) all resolve with the
  var-set pattern: base reads `…-[var(--radcn-btn-X,default)]`, each variant/size SETS
  the var — no double-declaration.
- CRITICAL when scripting consumer-site migrations in the DOCS file: it contains
  CODE-SAMPLE template literals (`const …Source = \`…\``) that DISPLAY `class="…"` as
  text. A blind `class="…"` rewrite corrupts those samples (breaking exact-text
  assertions + the displayed examples). Exclude backtick-template-literal regions;
  migrate only real JSX attributes.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: structurally APPROVED with ONE real Blocker (fixed). CRUX 1 — buttonBase
reproduces `.radcn-button` exactly (all props mapped; the var-reads correct). CRUX 2 —
the conflict resolution is complete: every variant/size override is a var-SET the base
READS (border-color/min-h/px/py/fs/width), no residual double-declaration; default size
= `''`; secondary/ghost/destructive only set bg/color. **BLOCKER (fixed):** the link
variant's `text-underline-offset: 0.25rem` is `underline-offset-2`, NOT `underline-offset-4`
(0.5rem) — corrected in the design + the const. CRUX 3 — the component emits utilities
before `className` (override-friendly) + keeps the markers; the `radcn-button--{variant}`
assertions (~19 confirmed in fixtures + docs) are class-presence, hold with markers kept.
CRUX 4 — the 11 distinct uniform literals cover ~95–97 sites; the `--default`
variant-vs-size disambiguation (leading=variant, trailing=size no-op) + the `size-8`
extra are handled by append-keeping-everything. CRUX 5 — removes the 13 button rules,
KEEPS the button-group `.radcn-button` cascades; index.ts via the node formula; gate
includes the consumer-site generation proof + the assertions.

Approval result: approved (after the `underline-offset-2` fix) — the var-set conflict
resolution + the uniform-literal raw-site replacement + the kept markers/cascades are
sound; the gate (generation proof + 27/19 assertions + dual-suite) decides.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: none (no Blocker, Major, or Minor). Confirmed the component exports + emits
buttonBase + the variant/size var-set maps (link `underline-offset-2`), markers kept,
mergedClass order correct; the var-set conflict resolution is complete (every
conflicting property declared once — base reads, variant/size sets; NO double
declaration); the 14 button rules removed, the button-group cascades KEPT; the docs
CODE-SAMPLE template literals are UNCHANGED (e.g. `tooltipDemoSource` line ~7155 shows
the bare class as text) while the real demo (~7171) + the fixtures migrated;
byte-identical `index.ts`. It rebuilt both pipelines (the button utils + var-sets +
underline-offset-2 GENERATE, no junk), re-ran the three typechecks, the docs coverage
spec (the previously-failing `:118` now PASSES), the full fixture suite (1191, the 27
`radcn-button--{variant}` assertions hold), and docs (11). Verdict: APPROVED.

Approval result: approved with no blockers — the KEYSTONE migrated; the dominant
remaining debt cleared (38 of 39 rule-groups done; only the Button-coupled
triggers/closes remain).
