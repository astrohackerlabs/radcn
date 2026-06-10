# Experiment 10: Migrate Empty to Tailwind utilities

## Description

First bordered-component migration now that preflight is on (Experiment 9):
Empty and its five sub-components (EmptyHeader, EmptyTitle, EmptyDescription,
EmptyContent, EmptyMedia) move from bespoke `radcn-empty*` CSS to verbatim
shadcn v4 utilities. Empty is consumed only through its JSX API (no raw
`radcn-empty*` class strings in fixtures or docs), and its computed-style
assertions survive the migration (see below).

shadcn v4 mappings (vendored `registry/new-york-v4/ui/empty.tsx`, verbatim):

- Empty: `flex min-w-0 flex-1 flex-col items-center justify-center gap-6
  rounded-lg border-dashed p-6 text-center text-balance md:p-12`
- EmptyHeader: `flex max-w-sm flex-col items-center gap-2 text-center`
- EmptyMedia (cva base): `mb-2 flex shrink-0 items-center justify-center
  [&_svg]:pointer-events-none [&_svg]:shrink-0`; variant `default`:
  `bg-transparent`; variant `icon`: `flex size-10 shrink-0 items-center
  justify-center rounded-lg bg-muted text-foreground
  [&_svg:not([class*='size-'])]:size-6`
- EmptyTitle: `text-lg font-medium tracking-tight`
- EmptyDescription: `text-sm/relaxed text-muted-foreground [&>a]:underline
  [&>a]:underline-offset-4 [&>a:hover]:text-primary`
- EmptyContent: `flex w-full max-w-sm min-w-0 flex-col items-center gap-4
  text-sm text-balance`

All theme-token utilities (`bg-muted`, `text-foreground`,
`text-muted-foreground`, `text-primary`) resolve via the Experiment 2 contract;
the rest are Tailwind defaults (now including preflight so `border-dashed` and
spacing behave as shadcn expects).

Intended visual changes (faithful to shadcn; the issue's parity goal), none of
which any test asserts:

- The Empty container is borderless by default — shadcn's `border-dashed`
  sets border-STYLE dashed but no border-WIDTH, so no visible border (RadCN
  previously drew a `1px dashed` box). A bordered empty is opt-in via the
  `class` prop, the shadcn way.
- The default EmptyMedia is `bg-transparent` (RadCN previously drew a filled
  circle); the `icon` variant is a `rounded-lg bg-muted` square (was a circle).

## Why both suites stay green

The only empty computed-style assertions (fixture `static-display.spec.ts`)
survive:

- `:285` `toHaveCSS('border-style', 'dashed')` on the `outline` scenario: the
  migrated base still emits `border-dashed`, so `border-style` is `dashed`
  (width 0, but the style is what's asserted).
- `:291` `toHaveCSS('background-color', 'rgb(244, 244, 245)')` on the
  `background` scenario: that color comes from the fixture's inline
  `style="...background:var(--radcn-muted)..."` (static-display.tsx, the
  `background` empty scenario). `--radcn-muted` (`#f4f4f5`) is a `:root`
  variable in `tokens.css` (not part of any `.radcn-empty*` rule), so removing
  the empty rules does not affect it; the inline style wins over utilities and
  is unaffected.

The fixture and docs Tailwind pipelines (established in Experiments 4 and 6
respectively) already import `radcn/theme.css`, so the color-token utilities
(`bg-muted`, `text-foreground`, `text-muted-foreground`, `text-primary`)
resolve there; `@source` scanning of the package source (also Experiments 4/6)
generates the empty utilities from the rewritten `empty.tsx`.

The docs suite references `[data-radcn-empty]` only as a registry-coverage
selector (no computed-style assertion). No fixture/docs scenario sets a
`--radcn-empty*` custom token (none exist). No EmptyMedia computed-style
assertion exists, so the default-media visual change is not gated.

## Changes

- `radcn/packages/radcn/src/components/empty.tsx`: replace each sub-component's
  `radcn-empty*` class(es) with the verbatim shadcn string(s). EmptyMedia
  follows the Badge pattern (Experiment 5): a base string + a
  `Record<EmptyMediaVariant, string>` merged via
  `classes(emptyMediaBase, emptyMediaVariants[variant], className)`. Keep every
  `data-radcn-empty*` attribute and EmptyMedia's `data-variant` (a prop-driven
  attribute, not a class). No markup/element changes.
- `radcn/packages/radcn/src/styles/tokens.css`: remove `.radcn-empty`,
  `.radcn-empty-header`, `.radcn-empty-content`, `.radcn-empty-media`,
  `.radcn-empty-media--icon`, `.radcn-empty-title`, `.radcn-empty-description`
  (replace with a short migration comment carrying no literal selectors).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via
  `export const radcnStyles = ${JSON.stringify(tokensCss)}\n`.

No test changes expected (the two computed-style assertions survive). Expected
git status: `empty.tsx`, `tokens.css`, `index.ts`, this experiment file, README
index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; each generated CSS contains the empty utilities
   (`rounded-lg`, `border-dashed`, `size-10`, `text-balance`, `tracking-tight`,
   `bg-muted`, `text-muted-foreground`). Also grep `static-display.tsx` for
   `--radcn-empty` to confirm no custom-token hook usage (expected: none).
2. `pnpm radcn:typecheck`, `pnpm fixtures:candidate:typecheck`,
   `pnpm --dir radcn/apps/docs typecheck` pass.
3. `index.ts` byte-identical to `tokens.css`; no `.radcn-empty` rule remains.
4. Docs suite green (11), run twice for stability.
5. Fixture suite green (1191), run twice for stability — including the empty
   `outline`/`background` computed-style assertions.
6. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; only
   the expected files changed.

Pass criteria: Empty renders from Tailwind utilities (no `radcn-empty*` classes
emitted); data hooks intact; BOTH suites green and stable; the two empty
computed-style assertions still pass; `tokens.css`/`index.ts` byte-identical.

Fail criteria: any spec regresses (e.g. the `border-style: dashed` or
`background-color` assertion shifts unexpectedly); a utility is not generated;
`tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources incl. vendored shadcn)

Round 1: REJECTED, but the reviewer explicitly characterized all findings as
"documentation/clarity issues, not design flaws" and independently confirmed
every substantive claim — the shadcn strings match the vendor
character-for-character, both empty computed-style assertions survive,
`--radcn-muted` is a preserved `:root` variable (tokens.css:13), no fixture
uses a `--radcn-empty*` custom token, Empty is JSX-only, and no EmptyMedia/
Title/Description/Content computed-style or class-presence assertion was
missed. Clarifications folded in:

- Documented that `--radcn-muted` is a `:root` var (not in the removed
  `.radcn-empty*` rules), so the inline-style background assertion survives.
- Described the EmptyMedia base + `Record<variant,string>` merge (Badge
  pattern) explicitly.
- Added a `--radcn-empty` fixture grep and a generated-CSS utility-presence
  check to verification.
- Referenced Experiments 4/6 as establishing the pipelines that import
  `radcn/theme.css` and `@source`-scan the package.

Round 2 (re-review of the clarifications by a fresh Claude subagent):
confirmed all four clarifications present and no new blocker. Verdict:
APPROVED.

Approval result: approved (round 2). No blocker findings remain; round 1's
findings were clarity-only and are folded in.
