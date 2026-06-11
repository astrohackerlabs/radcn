# Experiment 32: Migrate Avatar surfaces to Tailwind utilities

## Description

Avatar is self-contained (not Button-coupled). It migrates the surfaces
(avatar, image, fallback, badge, group-count) to utilities, reproducing RadCN's
exact current values via token-referencing arbitrary values where it uses custom
tokens (so the custom-avatar fixture keeps working with NO translation — the
same technique as Button's default variant in the Exp 31 analysis). The
avatar-GROUP overlap (negative margins + ring) is composition layout kept
bespoke (repointed to the `[data-radcn-*]` attributes).

### Exact utility mapping (reproduces the current `.radcn-avatar*` rules)

- base (`.radcn-avatar` + its `::after` border ring): `relative inline-flex
  size-[var(--radcn-avatar-size,2.5rem)] shrink-0 items-center justify-center
  overflow-hidden rounded-full bg-[var(--radcn-avatar-bg,var(--radcn-secondary))]
  text-[var(--radcn-avatar-fg,var(--radcn-secondary-foreground))] text-sm
  font-semibold leading-none select-none after:pointer-events-none
  after:absolute after:inset-0 after:rounded-[inherit] after:border
  after:border-[var(--radcn-avatar-border,var(--radcn-border))]
  after:content-['']` (font 600/0.875rem/1 → text-sm font-semibold leading-none;
  border-radius 999px → rounded-full; the `::after` ring → `after:*` utilities).
- size variants (Record keyed by `size`; the component drops the
  `radcn-avatar--{size}` class, keeps `data-size`): default `''`; sm `text-xs
  [--radcn-avatar-size:2rem] [--radcn-avatar-badge-size:0.5rem]`; lg `text-base
  [--radcn-avatar-size:3rem] [--radcn-avatar-badge-size:0.75rem]` (the
  badge-size token set on the avatar cascades to the badge descendant — replaces
  the old `.radcn-avatar--sm .radcn-avatar-badge` descendant rules).
- image: `absolute inset-0 z-[1] size-full object-cover`.
- fallback: `flex size-full items-center justify-center
  bg-[var(--radcn-avatar-fallback-bg,var(--radcn-secondary))]
  text-[var(--radcn-avatar-fallback-fg,var(--radcn-secondary-foreground))]`.
- badge: `absolute right-0 bottom-0 z-[2] inline-flex
  size-[var(--radcn-avatar-badge-size,0.625rem)] items-center justify-center
  rounded-full border-2 border-[var(--radcn-background)]
  bg-[var(--radcn-avatar-badge-bg,#16a34a)]
  text-[var(--radcn-avatar-badge-fg,#ffffff)]`.
- group: `flex items-center isolate`.
- group-count: `inline-flex size-10 items-center justify-center rounded-full
  bg-[var(--radcn-avatar-count-bg,var(--radcn-secondary))]
  text-[var(--radcn-avatar-count-fg,var(--radcn-secondary-foreground))]
  text-[0.8125rem] font-semibold leading-none`.

Kept bespoke (composition layout, repointed to data attributes; the children are
separate components so their overlap can't be utilities on the parent):
`[data-radcn-avatar-group] [data-radcn-avatar], [data-radcn-avatar-group]
[data-radcn-avatar-group-count] { margin-left: -0.5rem; box-shadow: 0 0 0 2px
var(--radcn-background); }` + the `:first-child { margin-left: 0 }` reset. (The
old selectors' `.radcn-avatar`/`.radcn-avatar-group-count` class variants are
dropped; the `[data-radcn-*]` variants are kept.)

The `.radcn-fixture-custom-avatar` fixture is UNCHANGED — its
`--radcn-avatar-fallback-bg`/`-badge-bg`/`-border`/`-bg`/`-fallback-fg` tokens
are read by the token-referencing utilities (asserted fallback bg
`rgb(15,118,110)` + badge bg `rgb(124,58,237)` hold with no translation).

## Why both suites stay green

- The custom fallback bg (#0f766e) and badge bg (#7c3aed) hold via the
  token-referencing utilities reading the unchanged fixture tokens.
- The group overlap assertions (`margin-left: -8px`, `box-shadow` not `none`)
  hold via the kept composition rule (repointed to `[data-radcn-avatar]`); the
  consumer `grayscale` filter + image assertions are unaffected.
- Sizes reproduce exactly (`size-[var(--radcn-avatar-size,2.5rem)]` + the sm/lg
  token overrides); `data-size` is retained.
- `bg-secondary`/`secondary-foreground`/`--radcn-background`/`--radcn-border`
  resolve via the contract.

## Changes

- `radcn/packages/radcn/src/components/avatar.tsx`: add `avatarBaseClass`,
  `avatarSizeClass: Record<AvatarSize, string>`, and emit
  `classes(avatarBaseClass, avatarSizeClass[size], className)` (drop
  `radcn-avatar`/`radcn-avatar--{size}`); the image/fallback/badge/group/count
  parts emit their utility strings (drop the `radcn-avatar-*` classes). Keep ALL
  `data-radcn-avatar*` + `data-size`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated
  `.radcn-avatar*` rules (base, `::after`, `--sm`/`--lg`, image, fallback,
  badge, badge size variants, group, count); KEEP the group child-overlap rule
  repointed to the `[data-radcn-*]` attributes (drop the class variants); KEEP
  `.radcn-fixture-custom-avatar`.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the standard
  formula.

Expected git status: `avatar.tsx`, `tokens.css`, `index.ts`, this experiment
file, README index + Learnings. Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; the avatar utilities generate (`rounded-full`,
   `after:border`, `size-[var(--radcn-avatar-size,2.5rem)]`, `object-cover`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css`; no migrated `.radcn-avatar*` CLASS
   rule remains; the group child-overlap rule keyed on `[data-radcn-avatar]`
   present; `.radcn-fixture-custom-avatar` retained.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. `avatar-scroll-area.spec.ts`
   (class presence, fallback bg `rgb(15,118,110)`, badge bg `rgb(124,58,237)`,
   group margin-left `-8px`, box-shadow not `none`, the consumer grayscale).
6. `git diff --check` clean; `vendor/` untouched; only the expected files
   changed.

Pass criteria: Avatar surfaces render from Tailwind utilities (no `radcn-avatar*`
class); the custom fallback/badge colors + sizes hold; the group overlap intact;
BOTH suites green; `tokens.css`/`index.ts` byte-identical.

Fail criteria: an avatar assertion regresses (size/fallback/badge/group); the
custom colors fail; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: APPROVED, no Blocker/Major; one Minor (pre-existing inert fixture
`*:data-[slot=avatar]` dead selectors — harmless, out of scope).

The reviewer verified the full mapping reproduces the current computed values
(base + `::after` ring, the token-driven sizes, image/fallback/badge/count),
confirmed the size variant's `[--radcn-avatar-badge-size:…]` set on the avatar
cascades to the badge descendant (correctly replacing the old descendant rule),
confirmed the custom-avatar fixture is on the Avatar (line 92) and its
`--radcn-avatar-fallback-bg`/`-badge-bg` are read by the token-referencing
utilities so NO translation is needed (asserted fallback bg `rgb(15,118,110)` +
badge bg `rgb(124,58,237)` hold), read the FULL `avatar-scroll-area.spec.ts`
(every assertion holds, incl. the group `margin-left: -8px` + box-shadow via the
kept composition rule), and grepped that NO raw `radcn-avatar*` class strings
exist outside the component (unlike Button). Verdict: APPROVED.

Approval result: approved — self-contained migration; token-referencing
utilities keep the custom fixture working with no translation; the group overlap
stays a bespoke composition rule keyed on the data attributes.
