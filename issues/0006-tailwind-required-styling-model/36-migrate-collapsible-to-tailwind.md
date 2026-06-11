# Experiment 36: Migrate Collapsible surfaces to Tailwind utilities

## Description

Collapsible is the single-disclosure sibling of Accordion — the SAME native
`<details>`/`<summary>` pattern (Exp 35), in a bordered box. Migrate the
surfaces to token-referencing Tailwind utilities; keep the two parent-state→
child effects (item `[open]` → icon rotate; root disabled → trigger) as bespoke
rules keyed on the data attributes; drop the style-less marker classes
(`radcn-collapsible--disabled`, `radcn-collapsible-trigger--disabled` — no CSS
rules); keep the custom-collapsible fixture (tokens read by the utilities).

### Exact utility mapping

- root (`.radcn-collapsible`, `<details>`/`<div>`): `block w-[min(100%,28rem)]
  border border-[var(--radcn-collapsible-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-collapsible-bg,var(--radcn-background))]
  text-[var(--radcn-collapsible-fg,var(--radcn-foreground))]
  data-[disabled=true]:opacity-50` (drop the style-less `--disabled`).
- trigger (`<summary>`/`<div>`): `flex w-full items-center justify-between gap-4
  px-4 py-3.5 cursor-pointer text-sm font-medium leading-[1.3] list-none
  outline-none text-left hover:underline hover:underline-offset-4
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]
  marker:content-[''] [&::-webkit-details-marker]:hidden` (padding 0.875rem 1rem
  → py-3.5 px-4; drop the style-less `trigger--disabled`).
- icon: `shrink-0 text-[var(--radcn-muted-foreground)] text-xs font-semibold
  leading-none transition-transform`.
- content: `overflow-hidden border-t
  border-[var(--radcn-collapsible-border,var(--radcn-border))]
  text-[var(--radcn-collapsible-content-fg,var(--radcn-muted-foreground))]
  text-sm leading-normal`.
- content-inner: `p-4`.
- trigger-text: style-less hook (no CSS) — left as-is.

Kept bespoke (parent-state → child, keyed on the data attributes):
- `[data-radcn-collapsible][open] [data-radcn-collapsible-icon] { transform:
  rotate(180deg); }`
- `[data-radcn-collapsible][data-disabled="true"]
  [data-radcn-collapsible-trigger] { cursor: not-allowed; pointer-events: none;
  text-decoration: none; }`

## Why both suites stay green

- The custom border/bg/fg + content color (#0f766e, asserted
  collapsible.spec.ts:134) hold via the token-referencing utilities reading the
  unchanged fixture tokens.
- The disabled trigger `pointer-events: none` (asserted line 119) holds via the
  kept parent-state rule; `data-disabled` is retained.
- The icon rotation on open holds via the kept parent-state rule; the summary
  marker is hidden via the `marker:`/`[&::-webkit-details-marker]:` utilities
  (proven in Exp 35).

## Changes

- `radcn/packages/radcn/src/components/collapsible.tsx`: emit utility-const
  strings for root/trigger/icon/content/content-inner (drop the
  `radcn-collapsible*` + style-less marker classes); keep ALL
  `data-radcn-collapsible*`, `data-disabled`, `open`, `role`, `aria-disabled`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-collapsible*` rules; KEEP the two parent-state→child rules repointed to
  the data attributes; KEEP `.radcn-fixture-custom-collapsible`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate.

Expected git status: `collapsible.tsx`, `tokens.css`, `index.ts`, this file,
README. Both generated CSS untracked. (No test edits — no `radcn-collapsible*`
class is asserted by name.)

## Verification

1. Both `styles:build` exit 0 (marker + `data-[disabled]:` + `color-mix`
   utilities compile).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-collapsible*`
   CLASS rule remains; the two parent-state→child rules present;
   `.radcn-fixture-custom-collapsible` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `collapsible.spec.ts` (open/
   close, the disabled `pointer-events: none`, the icon rotation, the custom
   content color `rgb(15,118,110)`). (The collapsible demo's icon BUTTON is a raw
   `radcn-button` consumer string — unaffected by this experiment, which only
   touches the Collapsible component.)
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Collapsible renders from Tailwind utilities (no
`radcn-collapsible*` class); the open-rotation + disabled + custom colors +
marker-hiding hold; BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a collapsible assertion regresses; the icon rotation or disabled
trigger breaks; the custom colors fail; `tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

Collapsible is migrated; both suites green and stable. Verification:

1. Both `styles:build` exit 0 (marker + `data-[disabled]:` + `color-mix`
   utilities compile).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-collapsible*`
   CLASS rule remains (count 0); the two parent-state→child rules present;
   `.radcn-fixture-custom-collapsible` retained.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** (stable across repeated runs; one earlier run
   showed the known intermittent `positioned-overlays.spec.ts:242` hover-card
   flake, which passed on every re-run and is unrelated to Collapsible — the
   collapsible CSS is byte-unaffected). `collapsible.spec.ts` in isolation **3
   passed** — incl. the disabled `pointer-events: none`, the icon rotation, the
   custom content color `rgb(15,118,110)`.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; the
   three expected files changed (no test edits — no `radcn-collapsible*` class is
   asserted by name).

No deviations from the approved design.

## Conclusion

Collapsible is migrated, reusing the Accordion `<details>` pattern: the surfaces
render from token-referencing utilities (custom fixture works unchanged), the
summary marker hides via the pseudo-element variants, and the two parent-state→
child effects stay bespoke rules keyed on the data attributes. Twenty-six
components are now migrated. The disclosure pair (Accordion + Collapsible) is
complete.

Learnings (also copied to the issue README Learnings digest):

- A second component sharing an already-migrated pattern (Collapsible ≡
  Accordion's `<details>` disclosure) migrates with no new techniques — the
  established token-referencing + marker-variant + parent-state-bespoke recipe
  applies directly; only the per-component values (padding, the `border-t`
  content, no focus radius) differ.

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: APPROVED, no Blocker/Major/Minor. The reviewer verified the full
utility mapping reproduces the current values (incl. the intentional divergences
from Accordion: the trigger has `py-3.5`, NO `focus-visible:rounded-md`, and the
content has `border-t`), confirmed the root switches `<details>`(enabled)/`<div>`
(disabled) with all data attributes emitted, the two parent-state→child rules
must stay bespoke and are correctly keyed, read the FULL `collapsible.spec.ts`
(NO `radcn-collapsible--` class asserted by name; the disabled `pointer-events:
none` at 119 via the kept rule; the custom content color `rgb(15,118,110)` at
134 via the token utility), confirmed the collapsible demo's icon BUTTON is a
RAW `radcn-button` consumer string (Button, untouched here, its assertions
unaffected), the style-less marker classes have no CSS rule (safe to drop), the
custom-collapsible tokens are read by the utilities (no translation), and no raw
`radcn-collapsible` class strings exist in fixtures. Verdict: APPROVED.

Approval result: approved — a clean Accordion-pattern clone; parent-state→child
rules kept bespoke, marker hiding via utilities, custom tokens read in place.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, this experiment file, and read access to
the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed collapsible.tsx emits the utility-const strings (no
`radcn-collapsible*` classes) with the marker variants + `py-3.5` + no focus
radius, the style-less marker classes dropped, and all data/native attributes
kept; tokens.css has ZERO migrated `.radcn-collapsible*` class rules, the two
parent-state→child rules, and the retained `.radcn-fixture-custom-collapsible`;
byte-identical `index.ts`. It re-ran both `styles:build`, the three typechecks,
the docs suite (2/2 = 11), the fixture suite (1191, stable), and
`collapsible.spec.ts` in isolation (3 — disabled `pointer-events:none`, icon
rotation, custom content color `rgb(15,118,110)`); the collapsible demo's raw
`radcn-button` icon button is unaffected. It judged the migration faithful, the
marker hiding + parent-state + custom tokens holding. Verdict: APPROVED.

Approval result: approved with no blockers — Collapsible is migrated (26
components); the Accordion+Collapsible disclosure pair is complete.
