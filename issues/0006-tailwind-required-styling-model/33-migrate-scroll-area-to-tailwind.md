# Experiment 33: Migrate ScrollArea surfaces to Tailwind utilities

## Description

ScrollArea is self-contained. Migrate its surfaces (root, viewport, scrollbar,
thumb, corner) to token-referencing Tailwind utilities reproducing the exact
current values. The scrollbar `orientation` variants (vertical/horizontal
position+size) map to a `Record` in the component (the `data-orientation` attr
is kept). The orientation-DEPENDENT thumb min-size (a descendant of the
oriented scrollbar) stays a bespoke rule keyed on the data attributes (a child
can't read its parent's orientation via a utility). The custom-scroll-area
fixture is unchanged — its tokens are read by the token-referencing utilities
(asserted thumb bg `rgb(15,118,110)` holds, no translation).

### Exact utility mapping

- root: `relative w-[min(100%,24rem)] h-[var(--radcn-scroll-area-height,12rem)]
  overflow-hidden rounded-md border
  border-[var(--radcn-scroll-area-border,var(--radcn-border))]
  bg-[var(--radcn-scroll-area-bg,var(--radcn-background))]
  text-[var(--radcn-scroll-area-fg,var(--radcn-foreground))]`
  (`--radcn-radius` 0.375rem = `rounded-md`).
- viewport: `size-full overflow-auto rounded-[inherit] p-4 outline-none
  [scrollbar-color:var(--radcn-scroll-area-thumb-bg,var(--radcn-border))_transparent]
  [scrollbar-width:thin]
  focus-visible:shadow-[inset_0_0_0_3px_color-mix(in_srgb,var(--radcn-ring)_35%,transparent)]`.
- scrollbar base: `absolute flex rounded-[999px]
  bg-[var(--radcn-scroll-area-scrollbar-bg,transparent)] p-0.5
  pointer-events-none`.
- scrollbar orientation (Record by `orientation`; the component keeps
  `data-orientation`, drops `radcn-scroll-area-scrollbar--{orientation}`):
  vertical `top-1 right-1 bottom-1 w-2.5`; horizontal `right-1 bottom-1 left-1
  h-2.5` (0.25rem = `*-1`, 0.625rem = `*-2.5`).
- thumb base: `block flex-1 rounded-[inherit]
  bg-[var(--radcn-scroll-area-thumb-bg,var(--radcn-border))]`.
- corner: `absolute right-1 bottom-1 size-2.5 rounded-[999px]
  bg-[var(--radcn-scroll-area-corner-bg,var(--radcn-border))] pointer-events-none`.

Kept bespoke (orientation-dependent thumb sizing, repointed to data attributes):
- `[data-radcn-scroll-area-scrollbar][data-orientation="vertical"]
  [data-radcn-scroll-area-thumb] { min-height: 2rem; }`
- `[data-radcn-scroll-area-scrollbar][data-orientation="horizontal"]
  [data-radcn-scroll-area-thumb] { min-width: 2rem; }`

## Why both suites stay green

- The custom thumb bg (#0f766e) holds via `bg-[var(--radcn-scroll-area-thumb-bg,…)]`
  reading the unchanged fixture token; the corner/border/bg tokens likewise.
- The orientation positions/sizes reproduce exactly via the Record; the
  `data-orientation` attribute is retained (and the thumb min-size rule keys on
  it).
- Native scrolling (`overflow-auto` + `scrollbar-*`) and the focus ring are
  reproduced; `rounded-md`/`border` resolve via the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/scroll-area.tsx`: emit utility-const
  strings for root/viewport/thumb/corner; a `scrollbarOrientationClass:
  Record<…, string>` for the scrollbar; drop the `radcn-scroll-area*` classes;
  keep ALL `data-radcn-scroll-area*` + `data-orientation`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-scroll-area*` rules; KEEP the two orientation-dependent thumb min-size
  rules repointed to `[data-radcn-scroll-area-scrollbar][data-orientation=…]
  [data-radcn-scroll-area-thumb]`; KEEP `.radcn-fixture-custom-scroll-area`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate.

Expected git status: `scroll-area.tsx`, `tokens.css`, `index.ts`, this file,
README. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; generated CSS has the scroll-area utilities
   (`overflow-auto`, the `[scrollbar-width:thin]`, `w-2.5`, `rounded-md`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-scroll-area*`
   CLASS rule remains; the two `[data-orientation]` thumb min-size rules present;
   `.radcn-fixture-custom-scroll-area` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `avatar-scroll-area.spec.ts`
   scroll-area tests (native scroll, focus hooks, the Tags/artwork demos, the
   custom-token thumb bg `rgb(15,118,110)`).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: ScrollArea renders from Tailwind utilities (no `radcn-scroll-area*`
class); native scroll + orientation + thumb sizing + the custom thumb bg hold;
BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: a scroll-area assertion regresses; the custom thumb bg fails; an
orientation position/size drifts; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: APPROVED, no Blocker/Major; one Minor (verify the `color-mix(...)`
arbitrary-shadow syntax compiles — checked at build time).

The reviewer verified every spacing-scale conversion exactly (0.25rem=`*-1`,
0.625rem=`*-2.5`, 0.125rem=`*-0.5`, 1rem=`p-4`, 2rem=`min-h-8`), confirmed
`--radcn-radius` 0.375rem = `rounded-md`, the `rounded-[999px]` choice (per the
Exp 32 lesson, though no scroll-area radius is computed-asserted), the orientation
`Record` reproduces vertical/horizontal exactly, and that the orientation-
dependent thumb min-size MUST stay bespoke (a child can't read its parent's
orientation via a utility) — keyed correctly on `data-orientation`. It confirmed
ScrollBar emits `data-orientation`, read the FULL scroll-area tests (native
scroll, focus box-shadow not-none, the Tags/artwork demos, the custom-token thumb
bg `rgb(15,118,110)` via the token-referencing utility — no translation), found
NO raw `radcn-scroll-area*` class strings in fixtures, and confirmed arbitrary
property utilities (`[scrollbar-width:thin]`/`[scrollbar-color:…]`) are valid
Tailwind v4. Verdict: APPROVED.

Approval result: approved — self-contained migration; the orientation Record +
the kept orientation-dependent thumb-size rule + token-referencing utilities are
sound.
