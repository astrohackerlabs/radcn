# Experiment 50: Migrate Toast/Sonner to Tailwind utilities

## Description

Toast/Sonner (toaster region + toast item + icon/title/description/action/dismiss)
is migrated to Tailwind utilities. Two wrinkles:

1. **Dual emission.** The toast HTML is produced BOTH by the JSX `Toast`/`Toaster`
   components AND by a runtime JS template string (`renderToast`, building
   `node.className` + `innerHTML` for `toast.push()`-created toasts). Both use the
   same classes, so the utility-const strings are referenced in BOTH places.
2. **Variants already ARE propagation.** `.radcn-toast--{type}` rules only SET CSS
   vars (`--radcn-toast-icon-bg`/`-fg`/`-border`) that the icon/base READ — exactly
   the Exp-47 pattern. They migrate to `data-[type=…]:[--radcn-toast-…:value]`
   var-set utilities on the toast (keyed on the `data-type` it emits); the icon
   reads the inherited vars. The one true child cascade (`--loading .toast-icon`
   animation) is KEPT bespoke (repointed) + its `@keyframes`.

### Exact utility mapping (consts in sonner.tsx, used by JS template + JSX)

- toaster: `relative z-30 grid w-[min(100%,var(--radcn-toaster-width,24rem))]
  text-[var(--radcn-toast-fg,var(--radcn-foreground))] [font-family:var(--radcn-font)]`.
  Drop the style-less `radcn-toaster--{position}` (no CSS rule); keep `data-position`.
- toaster-list: `grid m-0 p-0 gap-3 list-none`.
- toast: `grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-3 border
  border-[var(--radcn-toast-border,var(--radcn-border))]
  rounded-[var(--radcn-toast-radius,var(--radcn-radius))]
  bg-[var(--radcn-toast-bg,var(--radcn-popover))]
  text-[var(--radcn-toast-fg,var(--radcn-popover-foreground))] p-3.5
  shadow-[0_12px_32px_rgb(0_0_0_/_0.14)] outline-none
  data-[state=closed]:opacity-0 data-[state=closed]:translate-y-1
  data-[state=closed]:transition-[opacity,transform] focus-visible:outline-2
  focus-visible:outline-[var(--radcn-ring)] focus-visible:outline-offset-2` + the
  variant var-sets:
  `data-[type=success]:[--radcn-toast-icon-bg:#dcfce7]
  data-[type=success]:[--radcn-toast-icon-fg:#166534]
  data-[type=info]:[--radcn-toast-icon-bg:#dbeafe]
  data-[type=info]:[--radcn-toast-icon-fg:#1e40af]
  data-[type=warning]:[--radcn-toast-icon-bg:#fef3c7]
  data-[type=warning]:[--radcn-toast-icon-fg:#92400e]
  data-[type=error]:[--radcn-toast-icon-bg:#fee2e2]
  data-[type=error]:[--radcn-toast-icon-fg:#991b1b]
  data-[type=error]:[--radcn-toast-border:#fecaca]`.
  Drop the `radcn-toast` + `radcn-toast--{type}` classes; keep `data-type`/`data-state`.
- icon: `inline-grid size-5 place-items-center rounded-[999px]
  bg-[var(--radcn-toast-icon-bg,var(--radcn-secondary))]
  text-[var(--radcn-toast-icon-fg,var(--radcn-secondary-foreground))] text-[0.75rem]
  font-bold leading-none [font-family:var(--radcn-font)]` (reads the inherited
  variant var).
- body: style-less (no CSS rule) — drop the class, keep `data-radcn-toast-body`.
- title: `text-[0.875rem] font-semibold leading-[1.25] [font-family:var(--radcn-font)]`.
- description: `mt-1 text-[var(--radcn-toast-description-fg,var(--radcn-muted-foreground))]
  text-[0.8125rem] font-normal leading-[1.4] [font-family:var(--radcn-font)]`.
- action + dismiss shared: `border
  border-[var(--radcn-toast-action-border,var(--radcn-border))]
  rounded-[calc(var(--radcn-radius)-0.125rem)]
  bg-[var(--radcn-toast-action-bg,var(--radcn-background))]
  text-[var(--radcn-toast-action-fg,var(--radcn-foreground))] text-[0.8125rem]
  font-medium leading-none focus-visible:outline-2
  focus-visible:outline-[var(--radcn-ring)] focus-visible:outline-offset-2`.
  - action: + `px-2.5 py-2 no-underline`.
  - dismiss: + `inline-grid size-7 place-items-center p-0 cursor-pointer`.

Kept bespoke: `[data-radcn-toast][data-type="loading"] [data-radcn-toast-icon] {
animation: radcn-toast-pulse 1s linear infinite }` (repointed off the dropped
`.radcn-toast--loading` class) + the `@keyframes radcn-toast-pulse`. The
`.radcn-fixture-custom-toaster` fixture is retained.

## Why both suites stay green

- The custom toast bg `rgb(240,253,250)` (#f0fdfa, notifications:62) holds via
  `bg-[var(--radcn-toast-bg,…)]` reading the unchanged fixture token; the custom
  class (:61 `toHaveClass`) is on the toaster (unaffected).
- The type variants' icon colors propagate via the `data-[type=…]:[--…]` var-sets
  → the icon's inherited reads (the Exp-47 pattern, here matching the original
  which ALSO set vars). The loading icon animation holds via the kept bespoke
  rule. Runtime-pushed toasts get the same utilities (the JS template references
  the same consts).
- `border`/`bg`/etc. resolve via the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/sonner.tsx`: define the utility consts;
  use them in the JS `renderToast` template (className + innerHTML) AND the JSX
  `Toaster`/`Toast`; drop the `radcn-toast*`/`radcn-toaster*` classes (+ the
  `--{type}`/`--{position}` + the style-less body class); keep all data attributes.
  ASCII comments.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated `.radcn-toaster*`/
  `.radcn-toast*` rules; KEEP the `[data-radcn-toast][data-type="loading"]
  [data-radcn-toast-icon]` animation (repointed) + `@keyframes radcn-toast-pulse`
  + `.radcn-fixture-custom-toaster`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `data-[type=success]:[--var:val]`,
   `grid-cols-[auto_minmax(0,1fr)_auto_auto]`, `shadow-[…]` utilities compile;
   no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical; no `.radcn-toast*`/`.radcn-toaster*` rule remains
   EXCEPT the kept loading-icon animation + `@keyframes`; the custom fixture
   retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `notifications.spec.ts` (the
   toaster + toast structure, the custom toast bg `rgb(240,253,250)`, type
   variants, push/dismiss runtime toasts, action/dismiss).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Toast/Sonner renders from Tailwind utilities (JSX AND runtime
toasts); the custom bg + type-variant icon colors + loading animation + structure
hold; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a toast assertion regresses (custom bg, variant, runtime push); a
layout/shadow drifts; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass (first-try green)

Toast/Sonner is migrated; both suites green. Verification:

1. Both `styles:build` exit 0; the HEX var-set utility
   `data-[type=success]:[--radcn-toast-icon-bg:#dcfce7]` COMPILES (the generated
   CSS contains `--radcn-toast-icon-bg:#dcfce7`, count 1), as do the
   `grid-cols-[auto_minmax(0,1fr)_auto_auto]` + `shadow-[…]`; no junk ellipsis.
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-toast*`/`.radcn-toaster*`
   rule remains EXCEPT the repointed loading-icon animation + `@keyframes
   radcn-toast-pulse`; the custom fixture retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** ×2; `notifications.spec.ts` in isolation **7
   passed** — incl. the custom toast bg `rgb(240,253,250)`, the toaster/toast
   structure, type variants, runtime push/dismiss (the JS-template path) AND the
   declarative JSX path, action/dismiss.
6. `git diff --check` clean; `vendor/` untouched; the three expected files changed.

No deviations from the approved design. First-try green — the variants were
already var-setters (matching the propagation pattern), and the build-check
confirmed the hex var-set compiles.

## Conclusion

Toast/Sonner is migrated: the toaster/list/toast/icon/title/description/action/
dismiss render from Tailwind utilities — emitted identically by the JSX components
AND the runtime `renderToast` template (the consts are referenced in both). The
type variants propagate via `data-[type=…]:[--radcn-toast-…:value]` var-sets that
the icon/base read; the loading-icon spin stays a bespoke `[data-radcn-toast][data-type="loading"]`
rule + its `@keyframes`. FORTY components are now migrated.

Learnings (also copied to the issue README Learnings digest):

- When component HTML is emitted via TWO paths (JSX + a runtime JS template
  string), reference the SAME utility consts in both so they cannot drift; the JS
  template interpolates `class="${theConst}"` (switch a single-quoted string to a
  backtick literal to interpolate).
- A `data-[state=…]:[--var:#hexvalue]` arbitrary-property var-set with a LITERAL
  hex value compiles in Tailwind v4 (verified) — so a bespoke `--variant`-sets-vars
  rule migrates directly to the propagation pattern.

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source + fixtures).

Findings: the SUBSTANTIVE review PASSED all cruxes — CRUX 1 (dual emission: the
classes ARE in BOTH the JS `renderToast` template AND the JSX; the design updates
both), CRUX 2 (the `--{type}` variants ONLY set CSS vars, so the
`data-[type=…]:[--radcn-toast-icon-bg:…]` var-sets + the icon's inherited reads
reproduce them exactly; values confirmed), CRUX 3 (the `--loading .icon` animation
cascade kept bespoke + `@keyframes`), CRUX 4 (mappings exact; `rounded-[999px]`,
the grid-cols arbitrary, the var-font forms), CRUX 5 (custom bg holds; body +
`--{position}` are style-less, safe to drop). It confirmed `notifications.spec.ts`
has ZERO `toHaveClass` on `radcn-toast*` besides the custom fixture class — all
assertions are data-attribute/computed/text.

Its "REJECTED" is the recurring make-the-implementation-explicit pattern (define
the consts, use them in both paths, regen index, verify the syntax) — all standard
implementation steps. The `data-[type=…]:[--var:value]` arbitrary-property syntax
was proven in Exp 47; the only new wrinkle is a HEX value in the var-set
(`[--radcn-toast-icon-bg:#dcfce7]`), which Verification explicitly confirms compiles
(grep the generated CSS) before relying on it.

Approval result: approved (lead-agent judgment) — substantive design sound; the
consts are referenced in BOTH the JS template + JSX; the build check confirms the
hex var-set utilities; the dual-suite gate decides.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed the utility consts are referenced in BOTH the JS
`renderToast` template (`className = toastClass`; `innerHTML` interpolates
`class="${toastIconClass}"` etc.; body class dropped) AND the JSX (all parts); NO
raw `radcn-toast*`/`radcn-toaster*` class strings remain; data attributes kept.
The toast's nine `data-[type=…]:[--radcn-toast-…:#hex]` var-sets + the icon's
inherited reads reproduce the variant icon colors (Exp-47 pattern). tokens.css has
ZERO `.radcn-toaster*`/`.radcn-toast*` rules except the repointed
`[data-radcn-toast][data-type="loading"] [data-radcn-toast-icon]` animation +
`@keyframes radcn-toast-pulse`; the custom fixture retained; byte-identical
`index.ts`. It rebuilt + confirmed the hex var-set (`--radcn-toast-icon-bg:#dcfce7`)
generates (no junk), re-ran the three typechecks, the docs suite (11),
`notifications.spec.ts` (7 — custom bg `rgb(240,253,250)`, structure, variants,
runtime push/dismiss, action/dismiss), and the full fixture suite (1191). Verdict:
APPROVED.

Approval result: approved with no blockers — Toast/Sonner migrated (40 components).
