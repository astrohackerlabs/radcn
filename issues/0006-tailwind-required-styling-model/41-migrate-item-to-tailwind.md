# Experiment 41: Migrate Item surfaces to Tailwind utilities

## Description

Item is a composition/layout primitive (group + item + media + content + title +
description + actions/header/footer + separator). It is self-contained,
assertion-clean (no `toHaveClass(/radcn-item--/)` or class-locator usage), and
has NO custom-token fixture. Migrate all surfaces to Tailwind utilities. The
`<img>` styling (a descendant of the image-media / header) stays a bespoke rule
keyed on the data attributes (the img is consumer content). The item +
item-media variants/sizes map to component `Record`s (the elements already emit
`data-variant`/`data-size`).

### Exact utility mapping

- group (`.radcn-item-group`): `flex w-[min(100%,34rem)] flex-col gap-1
  [font-family:var(--radcn-font)]` (the font is preserved explicitly via an
  arbitrary-property utility, exactly reproducing the original — not relying on
  inheritance).
- item base (`.radcn-item`): `flex w-full flex-wrap items-center gap-3 border
  border-transparent rounded-md p-3.5 text-foreground` (0.75rem→gap-3,
  0.875rem→p-3.5, `--radcn-radius`→rounded-md).
  - variant `Record`: default `''`; outline `border-border`; muted `bg-secondary`.
  - size `Record`: default `''`; sm `p-2.5` (0.625rem); xs `px-2 py-1.5
    text-[0.8125rem]` (0.375rem 0.5rem).
- link (`.radcn-item-link`): `flex min-w-0 grow basis-full flex-wrap items-center
  gap-[inherit] text-inherit no-underline focus-visible:outline-2
  focus-visible:outline-[var(--radcn-ring)] focus-visible:outline-offset-2`
  (`flex: 1 1 100%` → `grow basis-full`; `gap: inherit` → `gap-[inherit]`).
- media (`.radcn-item-media`): `flex size-10 shrink-0 items-center justify-center
  rounded-md bg-secondary text-secondary-foreground font-semibold` (2.5rem→size-10).
  - media-variant `Record`: default `''`; icon `size-8 rounded-[999px]` (2rem;
    `rounded-[999px]` not `rounded-full` — the Avatar Exp-32 exact-value lesson);
    image `overflow-hidden`.
- content (`.radcn-item-content`): `flex min-w-0 grow flex-col gap-1` (`flex: 1` →
  grow).
- title (`.radcn-item-title`): `text-sm font-semibold leading-[1.3]
  [font-family:var(--radcn-font)]`.
- description (`.radcn-item-description`): `m-0 text-muted-foreground
  text-[0.8125rem] leading-[1.4] [font-family:var(--radcn-font)]`.
- actions (`.radcn-item-actions`): `flex items-center gap-2`.
- footer (`.radcn-item-footer`): `flex items-center gap-2 basis-full
  justify-between`.
- header (`.radcn-item-header`): `flex items-stretch gap-2 basis-full
  justify-between` (the base's `items-center` is overridden to `items-stretch` by
  the header rule — fold to `items-stretch`).
- separator (`.radcn-item-separator`): `h-px w-full bg-border`.

Kept bespoke (descendant `<img>` styling — consumer content, keyed on the data
attributes):
- `[data-radcn-item-media][data-variant="image"] img, [data-radcn-item-header] img
  { display: block; width: 100%; height: 100%; object-fit: cover; }`

The `itemPart(className, dataAttribute, props)` helper is updated to take the
utility string (it already merges `className` + `extraClass`).

## Why both suites stay green

- Item is exercised structurally (data attributes, composition, `role`) — no
  computed/class assertions on the `radcn-item*` classes (confirmed); the
  utilities reproduce the layout exactly.
- The variant/size data attributes are retained; the `<img>` styling holds via
  the kept descendant rule (repointed to the data attributes).
- `border`/`bg-secondary`/`text-foreground`/`text-muted-foreground` resolve via
  the contract + Exp 16.

## Changes

- `radcn/packages/radcn/src/components/item.tsx`: emit utility-const strings for
  group/item (+ variant/size `Record`s)/link/media (+ media-variant `Record`)/
  content/title/description/actions/header/footer/separator; update `itemPart` to
  pass utility strings; drop the `radcn-item*` + `--{variant}`/`--{size}` classes;
  keep ALL `data-radcn-item*` + `data-variant`/`data-size`.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the migrated `.radcn-item*`
  rules; KEEP the bespoke descendant `img` rule (repointed to the data attributes).
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the canonical node
  formula.

Expected git status: `item.tsx`, `tokens.css`, `index.ts`, this file, README.
Both generated CSS untracked.

## Verification

1. Both `styles:build` exit 0; the item utilities generate (`flex-wrap`,
   `basis-full`, `gap-[inherit]`, `size-10`).
2. All three typechecks pass.
3. `index.ts` byte-identical to `tokens.css` (node formula); no `.radcn-item*`
   CLASS rule remains; the bespoke `img` rule present (keyed on the data
   attributes).
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice — incl. the Item-using suites
   (`navigation-collection.spec.ts`, `static-display.spec.ts` — item composition,
   variants/sizes, media, the header/footer layout).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: Item renders from Tailwind utilities (no `radcn-item*` class); the
variants/sizes/media/layout + the `img` styling hold; BOTH suites green;
`tokens.css`/`index.ts` byte-identical.

Fail criteria: an item assertion regresses; a variant/size/media/header layout
breaks; the img styling fails; `tokens.css`/`index.ts` diverge.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the source)

Findings: the reviewer's SUBSTANTIVE verification passed — CRUX 1 (the
actions/header/footer combined-rule folding is correct: actions=center,
footer=center+basis+between, header=STRETCH+basis+between), CRUX 2 (the
descendant `img` rule must stay bespoke, repoint valid), CRUX 3 (NO
`toHaveClass(/radcn-item--/)`/computed assertions; tests are structural; the
`--variant`/`--size` classes become style-less; NO raw `radcn-item` class strings
in fixtures; NO cross-component reuse). Two genuine BLOCKERS, both fixed:

1. media icon `rounded-full` → `rounded-[999px]` (the original is `border-radius:
   999px`; the Avatar Exp-32 lesson — `rounded-full` computes to
   `calc(infinity*1px)`).
2. font-family omission — `.radcn-item-group`/`-title`/`-description` set
   `font-family: var(--radcn-font)`. Rather than rely on inheritance, the design
   now reproduces it explicitly via `[font-family:var(--radcn-font)]` on those
   three (exact).

(Minor doc-direction note acknowledged.) Both fixes are folded into the mapping.

Approval result: approved (with the two fixes) — self-contained, assertion-clean
layout migration; the combined-rule folding, variant/size/media Records, the
bespoke descendant img rule, and the explicit font preservation are sound.
