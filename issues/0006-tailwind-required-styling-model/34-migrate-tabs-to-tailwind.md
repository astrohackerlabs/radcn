# Experiment 34: Migrate Tabs surfaces to Tailwind utilities

## Description

Tabs is self-contained. Migrate root/list/trigger/content to token-referencing
Tailwind utilities reproducing the exact current values. The trigger's states
(`:hover`, `:focus-visible`, `[data-state="active"]`, disabled) map to Tailwind
state variants (`hover:`, `focus-visible:`, `data-[state=active]:`,
`disabled:`/`data-[disabled=true]:`) — the shadcn idiom. The `orientation`
variant: the root's own grid maps to a `Record` (the root keeps
`data-orientation`); the vertical LIST flex-direction (a descendant of the
vertical root) stays a bespoke rule keyed on `[data-orientation]`. The
custom-tabs fixture is unchanged (tokens read by the utilities; asserted list bg
`rgb(204,251,241)` holds, no translation).

### Exact utility mapping

- root: `grid w-[min(100%,34rem)] gap-3 text-[var(--radcn-tabs-fg,var(--radcn-foreground))]`
  + orientation `Record`: default `''`; vertical
  `grid-cols-[max-content_minmax(0,1fr)] items-start`. (The root drops
  `radcn-tabs`/`radcn-tabs--{orientation}`, keeps `data-orientation` +
  `data-radcn-tabs` + the other data attrs.)
- list: `inline-flex w-fit items-center gap-1 rounded-md
  bg-[var(--radcn-tabs-list-bg,var(--radcn-secondary))] p-1`.
- trigger base: `inline-flex min-h-8 items-center justify-center border
  border-transparent rounded-[calc(var(--radcn-radius)-0.125rem)] bg-transparent
  text-[var(--radcn-tabs-trigger-fg,var(--radcn-muted-foreground))]
  cursor-pointer px-3 py-1.5 text-sm font-medium leading-none outline-none
  transition-[background-color,color,box-shadow]`
  - + `hover:text-[var(--radcn-tabs-trigger-active-fg,var(--radcn-foreground))]`
  - + `focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`
  - + `data-[state=active]:bg-[var(--radcn-tabs-trigger-active-bg,var(--radcn-background))]
    data-[state=active]:text-[var(--radcn-tabs-trigger-active-fg,var(--radcn-foreground))]
    data-[state=active]:shadow-[0_1px_2px_rgb(0_0_0_/_0.05)]`
  - + `disabled:cursor-not-allowed disabled:opacity-50
    data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50`
- content: `min-w-0 border
  border-[var(--radcn-tabs-content-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-tabs-content-bg,var(--radcn-background))]
  text-[var(--radcn-tabs-content-fg,var(--radcn-foreground))] p-4 text-sm
  leading-normal outline-none
  focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`
  (font 400/0.875rem/1.5 → text-sm leading-normal; `--radcn-radius` → rounded-md).

Kept bespoke (the vertical root's effect on the descendant list):
- `[data-radcn-tabs][data-orientation="vertical"] [data-radcn-tabs-list] {
  flex-direction: column; align-items: stretch; }`

## Why both suites stay green

- The custom list bg (#ccfbf1) holds via `bg-[var(--radcn-tabs-list-bg,…)]`; the
  trigger-active + content custom tokens likewise (token-referencing utilities,
  no translation).
- The active tab (`data-[state=active]:`) + hover + focus + disabled states
  reproduce via the variants on the retained `data-state`/`data-disabled`.
- The `radcn-tabs--vertical` class assertion (tabs.spec.ts:199) is rewritten to
  `data-orientation="vertical"` (already emitted); the vertical layout (root grid
  + list column) holds via the Record + the kept descendant rule.

## Changes

- `radcn/packages/radcn/src/components/tabs.tsx`: emit utility-const strings for
  root (+ orientation `Record`)/list/trigger/content; drop the `radcn-tabs*`
  classes; keep ALL data attributes (`data-radcn-tabs*`, `data-orientation`,
  `data-state`, `data-disabled`, `data-value`, etc.).
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-tabs*` rules; KEEP the vertical-list descendant rule repointed to
  `[data-radcn-tabs][data-orientation="vertical"] [data-radcn-tabs-list]`; KEEP
  `.radcn-fixture-custom-tabs`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate.
- `radcn/fixtures/tests/tabs.spec.ts:199`:
  `toHaveClass(/radcn-tabs--vertical/)` → `toHaveAttribute('data-orientation',
  'vertical')`.

Expected git status: `tabs.tsx`, `tokens.css`, `index.ts`, `tabs.spec.ts`, this
file, README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; the tabs utilities generate
   (`data-[state=active]:bg-…`, `grid-cols-[max-content_minmax(0,1fr)]`,
   `rounded-md`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-tabs*` CLASS
   rule remains; the vertical-list `[data-orientation]` rule present;
   `.radcn-fixture-custom-tabs` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `tabs.spec.ts` (activation,
   keyboard nav, the rewritten `data-orientation='vertical'`, the active-state
   styling, the custom-token list bg `rgb(204,251,241)`).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Tabs renders from Tailwind utilities (no `radcn-tabs*` class);
the trigger states + orientation + custom list bg hold; BOTH suites green;
`tokens.css`/`index.ts` byte-identical.

Fail criteria: a tabs assertion regresses; an active/hover/focus state or the
vertical layout breaks; the custom list bg fails; `tokens.css`/`index.ts`
diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: all FIVE cruxes PASS — (1) the `radcn-tabs--vertical` class assertion
(tabs.spec.ts:199) is validly rewritten to `data-orientation="vertical"` (the
root emits it) and NO other spec asserts `radcn-tabs--` by name; (2) the trigger
states map to variants on the retained `data-state`/`data-disabled` (the asserted
active-tab bg/fg via the token-referencing utilities; hover/focus/disabled are
unasserted but reproduced); (3) the vertical-list flex-direction stays a valid
bespoke descendant rule keyed on `[data-orientation]`; (4) the custom-tabs
fixture (on the root) is read by the token-referencing utilities — list bg
`rgb(204,251,241)` holds, no translation; (5) NO raw `radcn-tabs*` class strings
in fixtures, no cross-component dependency. Spacing/value conversions verified.

The reviewer's "REJECTED" was explicitly verification-only ("all Blockers are
verification-only [build output, test suite green]... APPROVE FOR
IMPLEMENTATION with the gates" — which ARE this experiment's verification plan)
— the recurring design-vs-implementation pattern. Two Minors: trigger base is a
component `Record` (already the design's structure); the `rounded-md` =
`--radcn-radius` (0.375rem) choice matches all 23 prior migrations (the contract
defines no `--radius-*` tokens, so `rounded-md` is stable).

Lead-agent judgment: the substantive review is an APPROVAL (every crux passes);
the verification-only "REJECTED" is satisfied by the standard dual-suite + build
gate that follows implementation.

Approval result: approved — self-contained migration; the orientation Record +
the kept vertical-list descendant rule + the state-variant trigger + the
token-referencing utilities are sound.
