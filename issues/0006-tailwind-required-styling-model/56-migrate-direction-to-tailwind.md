# Experiment 56: Migrate DirectionProvider to Tailwind utilities

## Description

DirectionProvider is a tiny component — the only component-emitted class is
`.radcn-direction-provider` (`direction.tsx:22`). The `.radcn-direction-sample` and
`.radcn-direction-nested` classes are FIXTURE/docs demo raw classes (applied in
`fixtures/direction.tsx`, not emitted by the component) — a consumed raw-class demo
API, kept bespoke (the Exp-37/47/49 lesson).

### MIGRATE (component-emitted)

- provider (`.radcn-direction-provider`): `grid
  w-[min(100%,var(--radcn-direction-width,24rem))] gap-3 border
  border-[var(--radcn-direction-border,var(--radcn-border))] rounded-md
  bg-[var(--radcn-direction-bg,var(--radcn-background))]
  text-[var(--radcn-direction-fg,var(--radcn-foreground))] p-4
  [font-family:var(--radcn-font)]` (gap 0.75rem→gap-3; padding 1rem→p-4). The
  component keeps `data-direction`, `data-radcn-direction-provider`, and the `dir`
  attribute (which is what drives the asserted computed `direction`).

### KEEP BESPOKE (fixture demo API)

`.radcn-direction-sample`, `.radcn-direction-nested`, and the
`.radcn-fixture-custom-direction` fixture — consumed by the fixtures/docs directly.

## Why both suites stay green

- `direction.spec.ts:35/41/50` assert the SAMPLE's computed `direction` (`ltr`/`rtl`)
  — that comes from the `dir` HTML attribute (provider + inheritance), NOT from any
  migrated CSS, so it is unaffected.
- The provider's grid/border/bg/padding have no computed assertions; `border`/`bg`
  resolve via the contract + the fixture tokens (if a custom-direction demo applies
  them).

## Changes

- `radcn/packages/radcn/src/components/direction.tsx`: emit a utility-const string
  for the provider; keep all data/`dir` attributes. ASCII comment.
- `radcn/packages/radcn/src/styles/tokens.css`: remove the `.radcn-direction-provider`
  rule; KEEP `.radcn-direction-sample`/`-nested` + the custom fixture.
- `radcn/packages/radcn/src/styles/index.ts`: regenerate via the node formula.

## Verification

1. Both `styles:build` exit 0; the `w-[min(…)]` + token utilities compile; no junk.
2. All three typechecks pass.
3. `index.ts` byte-identical; the provider rule removed; sample/nested + fixture kept.
4. Docs suite green (11) ×2.
5. Fixture suite green (1191) ×2 — incl. `direction.spec.ts` (the `ltr`/`rtl`
   computed direction, nested provider, the demo layout).
6. `git diff --check` clean; `vendor/` untouched; only the expected files changed.

Pass criteria: the provider renders from Tailwind utilities; the `direction` (dir
attr) + the demo layout hold; BOTH suites green; byte-identical.

Fail criteria: a direction assertion regresses; the provider layout drifts;
`tokens.css`/`index.ts` diverge.

## Result

**Result:** Pass

DirectionProvider migrated; both suites green (both fixture runs clean). The
provider renders from Tailwind utilities; the `dir`-driven `direction` + the
fixture-token background hold. All three `styles:build`/typechecks pass;
byte-identical `index.ts`; the provider rule removed, sample/nested + fixture kept;
docs 11 ×2; `direction.spec.ts` isolation 3 passed; fixture 1191 ×2 (both clean);
`git diff --check` clean; three files changed.

## Conclusion

DirectionProvider renders from Tailwind utilities; the `radcn-direction-sample`/
`-nested` fixture demo classes + the custom fixture stay bespoke. FORTY-NINE
components are now migrated. (No new pattern — a clean single-rule component
migration with a fixture-demo raw-class carve-out.)

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session). Fresh context: yes.

Findings: APPROVED, no Blocker/Major/Minor. The reviewer confirmed direction.tsx
emits only `radcn-direction-provider` (sample/nested are fixture demo classes); the
provider rule maps exactly (`rounded-md`=`var(--radcn-radius)`, `gap-3`=0.75rem,
`p-4`=1rem); the `:35/41/50` computed `direction` comes from the `dir` attribute (not
CSS); and notably `:57` `[data-radcn-direction-provider]` `background-color` is
asserted — it holds because the migrated provider reads
`bg-[var(--radcn-direction-bg,…)]` from the kept `.radcn-fixture-custom-direction`
token. No spec locates by the `.radcn-direction-provider` CLASS (only the data attr).
Sample/nested + fixture kept bespoke.

Approval result: approved — the provider migrates cleanly; the `dir`-driven
direction + the fixture-token background both hold.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session). Fresh context: yes.

Findings: none (no Blocker, Major, or Minor). Confirmed the provider emits
`directionProviderClass` + keeps `data-direction`/`data-radcn-direction-provider`/`dir`;
tokens.css removed the provider rule and KEPT `.radcn-direction-sample`/`-nested` +
the custom fixture; byte-identical `index.ts`; the dual-suite gate (direction 3,
docs 11, fixture 1191×2 — run by the implementation session) is green. Verdict:
APPROVED.

Approval result: approved with no blockers — DirectionProvider migrated (49
components).
