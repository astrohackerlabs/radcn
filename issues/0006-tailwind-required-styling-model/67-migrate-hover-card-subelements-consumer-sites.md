# Experiment 67: Migrate HoverCard avatar/body (consumer-site pattern)

## Description

The first CONSUMER-SITE migration — establishing the pattern for the remaining
raw-class blast-radius debt. `.radcn-hover-card-avatar` and `.radcn-hover-card-body`
are NOT component-emitted; they are hand-written raw class strings in the fixture
(`positioned-overlays.tsx`, 3 sites) and docs (`components.tsx`, 2 sites). To migrate,
the equivalent utilities are APPENDED to each raw `class="…"` string (the marker class
is kept as a now-style-less hook — nothing asserts these computed styles, but keeping
the marker is the low-risk, Decision-compliant "non-styling hook" form), and the two
`tokens.css` rules are removed.

### Exact utility mapping

- avatar (`.radcn-hover-card-avatar`): append `inline-grid w-11 h-11 place-items-center
  rounded-[999px] bg-[var(--radcn-hover-card-avatar-bg,var(--radcn-secondary))]
  text-[var(--radcn-hover-card-avatar-fg,var(--radcn-foreground))] font-bold
  text-[0.875rem] leading-none [font-family:var(--radcn-font)]` (`2.75rem`=`w-11/h-11`;
  `font:700 0.875rem/1`).
- body (`.radcn-hover-card-body`): append `grid gap-2 text-[0.875rem] font-normal
  leading-[1.45] [font-family:var(--radcn-font)] [&_p]:m-0 [&_p]:text-muted-foreground`
  (`font:400 0.875rem/1.45`; the trailing `[&_p]:` arbitrary descendant variants fold
  in the `.radcn-hover-card-body p { margin:0; color:var(--radcn-muted-foreground) }`
  cascade so it is migrated too — not left as debt).

### Sites (keep the marker, append utilities)

- `radcn/fixtures/candidate-remix/app/fixtures/positioned-overlays.tsx`: `:206` avatar,
  `:172` + `:207` body.
- `radcn/apps/docs/app/content/components.tsx`: `:1662` + `:4687` body.

## Why both suites stay green

No `toHaveCSS`/`toHaveClass` assertions target `radcn-hover-card-avatar`/`-body`; the
markers stay (so any locator still resolves) and the appended utilities reproduce the
removed CSS exactly (the avatar bg/fg read the same `--radcn-hover-card-avatar-*` token
fallbacks).

## Changes

- `positioned-overlays.tsx` + `components.tsx`: append the utilities to the 5 raw
  `class` strings (keep the marker class).
- `tokens.css`: remove `.radcn-hover-card-avatar`, `.radcn-hover-card-body`, AND
  `.radcn-hover-card-body p` (folded into the body's `[&_p]:` variants).
- `index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the avatar/body utilities compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the 2 rules removed.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `positioned-overlays.spec.ts` (the HoverCard
   renders, avatar + body present).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: HoverCard avatar/body render from utilities at the consumer sites; the
markers + structure hold; BOTH suites green; byte-identical. Establishes the
consumer-site pattern for the remaining blast-radius debt. Clears 2 rules.

Fail criteria: a positioned-overlays/docs assertion regresses; a utility doesn't
compile; divergence.

## Result

**Result:** Fail (premise invalidated — valuable dead-end finding)

Before implementing, an empirical check of the Tailwind source-scanning settled a
question the design had ASSUMED: it injected a unique sentinel utility
(`zz-sentinel-[7px]`) into the fixture raw site (`positioned-overlays.tsx`) AND a
docs sentinel into `components.tsx`, rebuilt both pipelines, and grepped the generated
CSS. **Neither sentinel was generated** (count 0 in both). The candidate fixture's
`tailwind.css` `@source`s ONLY `../../../../packages/radcn/src` and uses granular
`@import 'tailwindcss/utilities'` (not the auto-detecting `@import "tailwindcss"`), so
Tailwind scans ONLY the component package source — NOT the fixture/docs app files.

Therefore appending utilities to fixture/docs raw-class sites does NOT generate those
utilities: the styling would silently break. Because `radcn-hover-card-avatar`/`-body`
have no computed (`toHaveCSS`) assertions, the dual-suite gate would have PASSED while
the avatar/body rendered unstyled — a false green. The experiment was NOT implemented;
the sentinel edits were reverted and both pipelines rebuilt clean.

## Conclusion

**Critical architectural finding for ALL remaining blast-radius debt.** The bespoke
`radcn-*` rules that fixtures/docs hand-write as raw class strings (Button keystone,
the triggers/closes, toggle-group/-icon, breadcrumb-glyph, hover-card avatar/body)
cannot be migrated by putting utilities at those consumer sites — the consumer files
are not in any Tailwind `@source`, so consumer-site utilities never compile. The real
prerequisite is a FOUNDATIONAL enabler experiment, one of:

1. Add the candidate-fixture app dir + the docs app dir to their Tailwind `@source`
   (or switch to the auto-detecting `@import "tailwindcss"`), so consumer-site
   utilities generate. This is the clean enabler — but it newly scans many demo files
   and may generate utilities for class strings that previously resolved only as
   bespoke selectors, so the resulting computed-style churn across BOTH suites must be
   triaged in that experiment (the same kind of triage the Exp-9 preflight decision
   required).
2. OR convert the fixture/docs raw `radcn-*` sites to render through the actual
   components (whose source IS scanned) — a larger refactor of the demos.

Until that enabler lands, the ~18 remaining blast-radius rules cannot be migrated to
utilities; the green-gate would be deceptive (no computed assertions on most of them).
This Fail eliminates the naive consumer-site-utility dead-end and redirects the work to
the `@source`/auto-detect enabler first.

This experiment is a FAIL by the workflow's definition (the designed approach does not
work), and a useful one — it converts the "~95 sites across 13 files" framing into the
true blocker: the consumer files are not Tailwind-scanned.

## CORRECTION (same session) — the Fail conclusion above was WRONG

The "Fail" + "consumer files are not Tailwind-scanned" conclusion is RETRACTED: it was
a FALSE NEGATIVE caused by a flawed probe. The sentinel utility used was a NONSENSE
token (`zz-sentinel-[7px]` / `zzscan-[7px]`) that matches NO Tailwind utility, so it
would never be generated REGARDLESS of whether the file is scanned — the count of 0
proved nothing.

Re-tested with a REAL arbitrary-property utility (`[zoom:2]`, definitely valid and not
otherwise used): adding it to the fixture raw site (`positioned-overlays.tsx`) AND to
the docs `content.tsx` and rebuilding generated `zoom: 2` in BOTH pipelines (count 1
each) — WITHOUT any `@source` change. So **the candidate fixture app AND the docs app
ARE Tailwind-scanned** (Tailwind v4 auto-detects the project's template files in
addition to the explicit `@source 'packages/radcn/src'`). The `@source '../'` spike was
confirmed unnecessary (zero size delta, both suites green) and was reverted.

**Therefore the consumer-site migration IS viable** — utilities appended to fixture/
docs raw-class sites DO compile. No enabler experiment is needed. The actual HoverCard
avatar/body migration (the design above) is sound and is carried out in Experiment 68.
Lesson: a scanning probe MUST use a real, otherwise-unused utility (e.g. an arbitrary
property), never a made-up token.

**Result (corrected): the design is valid; this file's implementation is superseded by
Experiment 68 (the real migration).**

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool). Fresh
context: yes.

Findings: the reviewer confirmed CRUX 1 (avatar/body mappings exact), CRUX 2 (exactly
the 5 raw sites — 3 fixture + 2 docs — no missed site), CRUX 3 (no `toHaveCSS`/
`toHaveClass` on the avatar/body; markers preserve any locator; component-files=0),
and raised ONE real Blocker: the design omitted the cascading
`.radcn-hover-card-body p { margin:0; color:var(--radcn-muted-foreground) }` rule —
removing the body rule while leaving demo `<p>` text uncolored would regress.
RESOLUTION: the body utility now folds that cascade in via `[&_p]:m-0
[&_p]:text-muted-foreground` (arbitrary descendant variants — the proven `[&_…]`
pattern), and all THREE rules (avatar, body, body p) are removed — a complete
migration, no leftover descendant debt, no per-`<p>` edits. The marker classes stay as
non-styling hooks.

Approval result: approved (after the revision) — exact mappings, all 5 sites covered,
the `p` descendant cascade folded into the body utility; the consumer-site pattern is
sound for the remaining blast-radius debt.
