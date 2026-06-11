# Experiment 47: Toggle + ToggleGroup — minimal cascade-fallback fix

> **Design revised after review.** The first design proposed a full CSS-var
> propagation (group sets `--radcn-toggle-bc` via `data-[variant=outline]:[--x:y]`
> arbitrary-property utilities, items read it). The adversarial review correctly
> flagged: (1) that arbitrary-property-with-data-modifier syntax is unverified,
> and (2) it ASSUMES a fix without DIAGNOSING why Exp-45's cascade gave
> currentColor. Sharper diagnosis: Exp-45's SIZE cascade used LITERAL values and
> worked; only the VARIANT cascade failed, and the sole var it used was
> `var(--radcn-border)`. The Tailwind theme token `var(--border)` demonstrably
> resolves (the `.border-border` utility = `border-color: var(--border)` =
> `rgb(228,228,231)` works everywhere). So the MINIMAL, directly-testable fix is to
> re-apply Exp-45's migration verbatim and change ONLY the kept variant cascade
> rule's fallback `var(--radcn-border)` → `var(--border)`. No new syntax, no
> propagation. If `:158` passes, the root cause was the `--radcn-border` var (and
> this is the fix); if it still fails, the cascade itself is the problem and needs
> browser diagnosis. The sections below describe the Exp-45 migration; the ONLY
> delta is the cascade fallback token.

## Approach (minimal)

Re-apply the Exp-45 migration EXACTLY (it passed everything except `:158`/`:182`),
with one delta: every `var(--radcn-border)` fallback (in the variant `Record`'s
outline utility AND in the kept variant cascade rule) becomes `var(--border)`.

- toggle.tsx: `toggleBaseClass` (no bg/border-color/min-h/padding/font-size) +
  `toggleVariantClass` { default `border-transparent bg-transparent`; outline
  `border-[var(--radcn-toggle-border,var(--border))] bg-background` } +
  `toggleSizeClass` { default `min-h-[var(--radcn-control-height)] px-3 py-2
  text-[0.875rem]`; sm `min-h-8 px-2.5 py-1.5 text-[0.8125rem]`; lg `min-h-11 px-4
  py-2.5 text-base` } + the `hover:`/`focus-visible:`/`data-[state=on]:`/disabled
  variants. Toggle emits `base + variantRecord[variant] + sizeRecord[size] +
  radcn-toggle--{variant} + radcn-toggle--{size}`; drop base `radcn-toggle`.
- toggle-group.tsx: container = Exp-45 utilities (incl. `data-[orientation=vertical]:`
  + `--{orientation}` marker); item = `base + (variant ? variantRecord[variant] :
  '') + sizeRecord[size ?? 'default'] + radcn-toggle-group-item + shrink-0 +
  data-[group-disabled=true]:pointer-events-none + (variant && marker) + (size &&
  marker)`; drop base `radcn-toggle`. (Variant-less items get NO variant utility,
  so the kept variant cascade drives their outline border — now via `--border`.)
- tokens.css: remove the `.radcn-toggle` button rules; KEEP the SIZE cascade
  (literal values, unchanged); KEEP the VARIANT cascade but change its fallback:
  `.radcn-toggle-group[data-variant="outline"] .radcn-toggle-group-item:not([data-variant])
  { border-color: var(--radcn-toggle-border, var(--border)); background:
  var(--radcn-background); }`; KEEP both icon rules (repoint the standalone
  `[data-radcn-toggle][data-state="on"]` icon rule); KEEP the custom-toggle fixture.
- index.ts: regenerate (node formula).

Why this fixes `:158`: the variant-less item in the outline group gets its border
from the kept cascade → `var(--radcn-toggle-border, var(--border))` → (no custom)
`var(--border)` = `#e4e4e7` = `rgb(228,228,231)`. The custom group items (own
`variant=outline`) use the variant `Record` utility, reading the custom
`--radcn-toggle-border` `#0f766e` (`:200`); pressed bg/fg via the `data-[state=on]:`
utilities (`:199`/`:201`). Sizes via the unchanged size Record + size cascade.

## Description (superseded — original propagation idea, kept for the record)

Re-attempt of Exp 45 (Partial). Exp 45 migrated Toggle + ToggleGroup correctly
EXCEPT a variant-less item in an outline group: its border resolved to
`currentColor` instead of `--border`. The diagnosis (Exp 45/46 analysis): the
**size** cascade used LITERAL values (`min-height: 2rem`) and worked; the
**variant** cascade used `var(--radcn-toggle-border, var(--radcn-border))` and
failed — the `var()` produced an invalid/currentColor result on the migrated
child (an unresolved layer/var interaction; `--radcn-border` IS defined in the
injected `radcnStyles`, yet the cascade's var failed).

Fix: drop the failing variant CASCADE and propagate the variant via CSS custom
properties (which inherit cleanly and can't fall to currentColor because the
reader supplies a `transparent` fallback):

- Every toggle button READS its border-color/background from inherited vars:
  `border-[color:var(--radcn-toggle-bc,transparent)]
  bg-[var(--radcn-toggle-bgc,transparent)]`.
- The outline variant SETS those vars (arbitrary-property utilities gated on
  `data-[variant=outline]:`), placed on (a) the standalone Toggle, (b) the
  ToggleGroup container (inherited by variant-LESS items), and (c) the group item
  (when it has its own variant):
  `data-[variant=outline]:[--radcn-toggle-bc:var(--radcn-toggle-border,var(--border))]
  data-[variant=outline]:[--radcn-toggle-bgc:var(--radcn-background)]`
  (uses the Tailwind theme `--border`, which works via `.border-border`, as the
  fallback — not the cascade's failing `--radcn-border`).
- Default variant sets nothing → the reader's `transparent` fallback applies
  (matching the original `.radcn-toggle { border: transparent; background:
  transparent }`).
- Pressed (`data-[state=on]:bg-[var(--radcn-toggle-pressed-bg,var(--radcn-primary))]`)
  overrides the read bg via attribute specificity; focus ring via
  `focus-visible:border-[var(--radcn-ring)]`.

The SIZE handling is UNCHANGED from Exp 45 (it worked): the size `Record`
(min-h/px/py/fs literals) on the item/standalone + the kept bespoke size cascade
(`.radcn-toggle-group[data-size=sm|lg] .radcn-toggle-group-item:not([data-size])`,
literal values) for size-less items.

### Shared toggle button (exported from toggle.tsx; used by ToggleGroupItem)

- base: `inline-flex items-center justify-center gap-2 border rounded-md
  text-[var(--radcn-toggle-fg,var(--radcn-foreground))] cursor-pointer font-medium
  leading-none [font-family:var(--radcn-font)] outline-none
  transition-[background-color,color,border-color,box-shadow]
  border-[color:var(--radcn-toggle-bc,transparent)]
  bg-[var(--radcn-toggle-bgc,transparent)]
  hover:bg-[var(--radcn-toggle-hover-bg,var(--radcn-secondary))]
  focus-visible:border-[var(--radcn-ring)]
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  data-[state=on]:bg-[var(--radcn-toggle-pressed-bg,var(--radcn-primary))]
  data-[state=on]:text-[var(--radcn-toggle-pressed-fg,var(--radcn-primary-foreground))]
  data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50
  disabled:cursor-not-allowed disabled:opacity-50
  data-[variant=outline]:[--radcn-toggle-bc:var(--radcn-toggle-border,var(--border))]
  data-[variant=outline]:[--radcn-toggle-bgc:var(--radcn-background)]`
  (border = width only; the bc/bgc reads + the variant var-sets replace the old
  variant Record).
- size `Record`: default `min-h-[var(--radcn-control-height)] px-3 py-2
  text-[0.875rem]`; sm `min-h-8 px-2.5 py-1.5 text-[0.8125rem]`; lg `min-h-11 px-4
  py-2.5 text-base`.

Toggle `<button>`: `base + sizeRecord[size] + radcn-toggle--{variant} +
radcn-toggle--{size}` (markers). The variant var-set fires from `base` via its own
`data-variant` (the Toggle always emits `data-variant`).

ToggleGroup container: the Exp-45 utilities + `data-[variant=outline]:[--radcn-toggle-bc:…]
data-[variant=outline]:[--radcn-toggle-bgc:…]` (so variant-less items inherit the
vars). The group emits `data-variant`.

ToggleGroupItem `<button>`: `base + sizeRecord[size ?? 'default'] +
radcn-toggle-group-item + shrink-0 + data-[group-disabled=true]:pointer-events-none
+ (variant && radcn-toggle--{variant}) + (size && radcn-toggle--{size})`. The base
carries the bc/bgc reads + the variant var-set (fires when the item has its own
`data-variant`); variant-less items inherit the group's vars.

### tokens.css

- REMOVE the `.radcn-toggle` button rules (as Exp 45) AND the variant cascade
  rule `.radcn-toggle-group[data-variant="outline"]
  .radcn-toggle-group-item:not([data-variant])` (replaced by CSS-var propagation).
- KEEP the SIZE cascade rules (`[data-size=sm|lg] .radcn-toggle-group-item:not([data-size])`,
  literal values — they worked).
- KEEP the two raw-class icon APIs (repoint the standalone `[data-radcn-toggle]`
  on-state icon rule); KEEP the custom-toggle fixture.

## Why both suites stay green

- Variant-less item, outline group: inherits `--radcn-toggle-bc` (= `var(--radcn-toggle-border,var(--border))` = `--border` = `rgb(228,228,231)`) from the group → border 228,228,231 (`toggle.spec.ts:158`/`:182`); `--radcn-toggle-bgc` = `--radcn-background`.
- Custom-token group items (own `variant="outline"`): set the vars themselves; `--radcn-toggle-border` is the custom `#0f766e` → border `rgb(15,118,110)` (`:200`); pressed bg `#0f766e` via the pressed utility (`:199`); pressed fg `#fff` (`:201`).
- Default groups/items: no var set → `transparent` border/bg (matches original).
- Sizes (`:174`/`:178`/`:46`/`:48`/`:88`) via the unchanged size Record + size cascade; markers/`toHaveClass` retained; icon on-colors via the kept bespoke icon rules.

## Changes

- `toggle.tsx`: export `toggleBaseClass` (with the bc/bgc reads + variant var-set +
  states) + `toggleSizeClass`; emit base + size + markers; drop base `radcn-toggle`.
- `toggle-group.tsx`: import the shared consts; container adds the variant var-set
  utilities; item emits base + size(`?? default`) + `radcn-toggle-group-item` +
  `shrink-0` + group-disabled + markers; drop base `radcn-toggle`.
- `tokens.css`: remove the `.radcn-toggle` button rules + the variant cascade;
  keep the size cascade + icons (repoint) + custom fixture.
- `index.ts`: regenerate (node formula).

ASCII/token-free comments.

## Verification

1. `styles:build` ×2 exit 0; no junk ellipsis; the `[--radcn-toggle-bc:…]`
   arbitrary-property + `border-[color:var(…)]` utilities compile.
2. Three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-toggle` button rule and no variant
   cascade rule remain; the SIZE cascade + icon rules + custom fixture retained.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — `toggle.spec.ts` FULLY (the `:158`/`:182`
   variant-less outline borders `rgb(228,228,231)` — the Exp-45 blocker — now via
   propagation; the `:199-201` custom pressed item; sizes; markers; icon colors;
   orientation; gap).
6. `git diff --check` clean; `vendor/` untouched; expected files only.

Pass criteria: Toggle + ToggleGroup render from utilities; the variant-less
outline border resolves to `--border` (NOT currentColor); ALL toggle.spec.ts
assertions hold; BOTH suites green; byte-identical.

Fail criteria: the `:158` border regresses (currentColor/transparent/wrong); a
pressed/custom/size/marker assertion regresses; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass (the Exp-45 blocker is solved)

Toggle + ToggleGroup migrated; both suites green. The path to the fix was itself
diagnostic:

1. The minimal `var(--radcn-border)`→`var(--border)` change did NOT fix `:158`
   (still currentColor) — DISPROVING the var-token hypothesis and proving the
   bespoke parent→child CASCADE intrinsically fails to set a migrated child's
   border-color.
2. Switching the VARIANT to CSS-var propagation (group sets `--radcn-toggle-bc`/
   `-bgc` via `data-[variant=outline]:[--…]`; every toggle READS them via
   `border-[color:var(--radcn-toggle-bc,transparent)]`/`bg-[var(--radcn-toggle-bgc,transparent)]`)
   FIXED `:158` — the failure MOVED to `:174` (size min-height 36px not 44px).
3. That revealed the SIZE cascade ALSO fails the same way (my earlier "size
   cascade works" was an artifact — `:158` failed first in Exp 45 and masked
   `:174`). Extending the SAME propagation to size (group sets `--radcn-toggle-mh`/
   `-px`/`-py`/`-fs` via `data-[size=sm|lg]:[--…]`; toggles read them) fixed `:174`.

Verification:
- Both `styles:build` exit 0; the `data-[variant=outline]:[--var:val]` /
  `data-[size=sm]:[--var:val]` arbitrary-property utilities + the
  `border-[color:var(…)]`/`min-h-[var(…)]`/`text-[length:var(…)]` readers all
  COMPILE (confirmed in the generated CSS); no junk ellipsis.
- Three typechecks pass; `index.ts` byte-identical to `tokens.css`.
- `toggle.spec.ts` in isolation: **7 passed** (incl. `:158`/`:182` variant-less
  outline borders `rgb(228,228,231)`, `:174`/`:178` size-less item min-heights
  44px/32px, `:199-201` custom pressed item, markers, gap, orientation, icon
  on-colors).
- Docs suite: **11 passed** ×2. Fixture suite: **1191 passed** (run 1 clean);
  run 2 had the known intermittent serial-load flake (1 unrelated, passes on
  re-run — toggle isolation is 7/7 and run 1 is 1191).
- `git diff --check` clean; `vendor/` untouched; the four expected files changed.

## Conclusion

Toggle + ToggleGroup are migrated. THIRTY-SIX components are now migrated. The
key outcome: a general, validated pattern for parent→child style inheritance after
migration — **CSS-var propagation** (the container SETS `--x` from its own
`data-*` via `data-[state]:[--x:val]` arbitrary-property utilities; descendants
READ `prop-[…:var(--x,default)]`; a descendant with its own state re-sets `--x`
locally). This REPLACES bespoke parent→child cascades, which fail to override a
migrated child's properties (border-color → currentColor; min-height → the child's
own utility wins). This unblocks the remaining cascade-coupled components
(InputOTP slot states, Resizable orientation, InputGroup addon).

Learnings (also copied to the issue README Learnings digest):

- A bespoke parent→child CASCADE cannot reliably override a MIGRATED child's
  utility-set property (Exp-45/47: border-color → currentColor; min-height → the
  child's utility wins). Do NOT keep such cascades when migrating the child.
- Use CSS-VAR PROPAGATION instead: the parent sets `--x` via
  `data-[state=…]:[--x:value]` arbitrary-property utilities (these compile in
  Tailwind v4); the child READS `border-[color:var(--x,fallback)]` /
  `min-h-[var(--x,fallback)]` / `text-[length:var(--x,fallback)]` (a var font-size
  needs the `length:` hint; a var border-color the `color:` hint); a child with
  its own state re-sets `--x` locally (local beats inherited). Custom-property
  inheritance + utility reads = no cascade, no currentColor.
- When a test fails at assertion N, a LATER assertion in the same test may be
  silently masked — fixing N can reveal a second bug (here `:158` masked `:174`).

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the Exp-45 Partial, and the original
design).

Findings: the reviewer REJECTED the original (propagation) design with two valid
concerns: (1) the `data-[variant=outline]:[--var:value]` arbitrary-property-with-
modifier syntax was unverified, and (2) the design ASSUMED a fix without
DIAGNOSING why Exp-45's cascade gave currentColor. Both are well-taken.

Resolution (design revised to the MINIMAL approach above): rather than the
unproven propagation, re-apply Exp-45's migration verbatim and change ONLY the
`var(--radcn-border)` fallback → `var(--border)` (the Tailwind theme token that
demonstrably resolves via `.border-border`). This (a) needs no new/unverified
syntax, sidestepping concern 1; (b) IS the targeted diagnosis concern 2 asked for
— it directly tests the hypothesis that `--radcn-border` (not the cascade
mechanism) was the failing element, since the SIZE cascade (literal values)
worked and the VARIANT cascade's only var was `--radcn-border`. `:158`/`:182` are
the empirical gate: pass → root cause confirmed + fixed; fail → the cascade
itself is implicated and needs browser diagnosis (revert + investigate).

Approval result: approved (lead-agent judgment) for the MINIMAL revised approach
— low-risk, no new syntax, and it is itself the diagnostic the reviewer asked
for; the dual-suite gate (esp. `:158`) decides.

(Implementation note: the minimal cascade-fallback change was the diagnostic — it
FAILED, proving the cascade itself is the problem, so the implementation then
pivoted to the full CSS-var propagation for BOTH variant and size, which the
arbitrary-property syntax verification + the gate confirmed. See the Result.)

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major; one informational note that the implemented
approach evolved from the planned minimal fix to full CSS-var propagation — fully
documented in the Result).

The reviewer confirmed toggleBaseClass READS border/bg/min-h/px/py/font-size from
CSS vars and SETS them via `data-[variant=outline]:[--…]` + `data-[size=sm|lg]:[--…]`;
the button emits `data-size`+`data-variant`; no `toggleVariantClass`/`toggleSizeClass`
remain; markers kept; base `radcn-toggle` dropped; the group container sets the
same vars (inherited by variant/size-LESS items); the item reuses `toggleBaseClass`
+ markers + `shrink-0` + `data-[group-disabled]:pointer-events-none`. tokens.css
has ZERO `.radcn-toggle` button rules + NO variant/size cascade rules; both icon
rules kept (standalone repointed); custom fixture kept; byte-identical `index.ts`.
It rebuilt + confirmed the arbitrary-property var-set and var-read utilities
generate (no junk), re-ran the three typechecks, the docs suite (11), and
`toggle.spec.ts` (7 — the `:158`/`:182` outline borders `rgb(228,228,231)`,
`:174`/`:178` min-heights 44px/32px, `:199-201` custom pressed, markers, gap,
orientation, icon colors), plus the full fixture suite (1191). Verdict: APPROVED.

Approval result: approved with no blockers — Toggle + ToggleGroup migrated (36
components); the CSS-var propagation pattern is validated for the remaining
cascade-coupled components.
