# Experiment 23: Add the animation-utilities foundation (tw-animate-css)

## Description

shadcn/ui v4 styles its overlay components' enter/exit transitions with
animation utilities — `animate-in`, `animate-out`, `fade-in-0`, `fade-out-0`,
`zoom-in-95`, `zoom-out-95`, `slide-in-from-top-2` (and the `left/right/bottom`
+ `data-[state=open|closed]:` variants). These come from the `tw-animate-css`
package, which shadcn v4 imports in its `globals.css` (it replaced the
`tailwindcss-animate` plugin in v4). They are NOT part of core Tailwind.

A probe confirmed RadCN's current pipelines generate NONE of these utilities
(grep count 0 for `animate-in`/`fade-in-0`/`zoom-in-95`/`slide-in-from`). So
every shadcn overlay component (Tooltip, Popover, Dialog, Dropdown, Select,
Sheet, Drawer, HoverCard, Menubar, ContextMenu, Command, Toast, Accordion, …)
is blocked from a verbatim migration — its content classes reference animation
utilities that don't exist here. This is a foundational gap, analogous to the
default border-color the Card migration needed (Experiment 16).

This experiment adds the animation foundation by importing `tw-animate-css`
into both Tailwind pipelines, exactly as shadcn v4 does. It is foundational and
unblocks the overlay-component migrations; it migrates no component itself.

## Changes

- `pnpm-workspace.yaml`: add `tw-animate-css: ^1.4.0` to the `catalog`.
- `radcn/fixtures/candidate-remix/package.json` and
  `radcn/apps/docs/package.json`: add `"tw-animate-css": "catalog:"` to
  `devDependencies` (it is a build-time CSS import, alongside `tailwindcss`/
  `@tailwindcss/cli`).
- `pnpm install` to resolve the package and update `pnpm-lock.yaml`.
- `radcn/fixtures/candidate-remix/app/styles/tailwind.css` and
  `radcn/apps/docs/app/styles/tailwind.css`: add `@import 'tw-animate-css';`
  after `@import 'tailwindcss/utilities';` (mirroring shadcn's
  `@import "tailwindcss"; @import "tw-animate-css";` order). A comment notes its
  purpose.

No component, `tokens.css`, or `index.ts` change. The package's components don't
need `tw-animate-css` to BUILD (the consuming app's Tailwind build, which scans
the package source, generates the utilities) — so this is a pipeline/dependency
change in the two apps.

## Why both suites stay green

- The animation utilities are ADDITIVE: nothing in the current components or
  fixtures uses `animate-in`/etc. yet (no migrated overlay exists), so adding
  them changes no element's computed style — there is no visual change and no
  regression. (This experiment lays the foundation; Experiment 24+ consume it.)
- `tw-animate-css` is a CSS-only utility/keyframe library for Tailwind v4
  (compatible with the `^4.1.0` already used); importing it adds utilities +
  `@keyframes`, it does not alter preflight or existing utilities.
- The dual-suite gate confirms zero regressions.

## Verification

1. `pnpm install` succeeds; `tw-animate-css@1.4.0` resolves; `pnpm-lock.yaml`
   updates.
2. Both `styles:build` exit 0; each generated CSS now contains the animation
   utilities — grep for `animate-in`, `fade-in-0`, `zoom-in-95`,
   `slide-in-from-top-2`, `animate-out`, `fade-out-0` (all present) and the
   associated `@keyframes` (e.g. `enter`/`exit` or the named keyframes
   tw-animate-css defines).
3. All three typechecks pass.
4. Docs suite green (11), run twice.
5. Fixture suite green (1191), run twice.
6. Spot-confirm via a throwaway probe IN THIS experiment: a temporary
   `@source`-scanned element with `data-[state=closed]:animate-out
   fade-in-0 zoom-in-95 slide-in-from-top-2` builds and generates the rules,
   then delete the probe and rebuild before the result commit.
7. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; only
   `pnpm-workspace.yaml`, the two app `package.json`, `pnpm-lock.yaml`, the two
   `tailwind.css`, this experiment file, and the README change.

Pass criteria: `tw-animate-css` is installed and imported into both pipelines;
the shadcn animation utilities generate; both suites green and stable; no
existing assertion shifts.

Fail criteria: the install fails (no registry / resolution error) — then this
foundation is deferred and a non-overlay component is migrated instead; or the
import regresses a suite; or the utilities still do not generate.

## Result

**Result:** Pass

The animation foundation is in place; both suites are green and stable.
Verification:

1. `pnpm install` succeeded; `tw-animate-css@1.4.0` resolved and installed
   (`node_modules/.pnpm/tw-animate-css@1.4.0`); `pnpm-lock.yaml` updated.
2. Both `styles:build` exit 0.
3. All three typechecks pass.
4. Docs suite: **11 passed** ×2.
5. Fixture suite: **1191 passed** on 3 of 4 runs; one run hit the single
   positioned-overlay serial-load flake (classified in Experiment 9), which
   cannot be caused by this change — see the note below.
6. Throwaway probe confirmed the foundation works: a temporary scanned element
   using `animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
   data-[state=closed]:animate-out fade-out-0 zoom-out-95` generated all 7
   utilities + the `enter`/`exit` keyframes/`--tw-enter-*` vars (grep counts
   7 and 22). Probe deleted and rebuilt before this result.
7. `git diff --check` clean; `vendor/` untouched; generated CSS untracked; only
   `pnpm-workspace.yaml`, the two app `package.json`, `pnpm-lock.yaml`, and the
   two `tailwind.css` changed.

Important correction to the design's verification assumption: `tw-animate-css`
defines its utilities via Tailwind v4's ON-DEMAND `@utility` API, so they are
tree-shaken until USED in scanned source. With no overlay migrated yet, the
generated CSS is therefore BYTE-UNCHANGED (the utilities are available but not
emitted) — which is why the change is provably inert and the suites are
unaffected. The foundation is verified by the probe (utilities generate when
used), not by static presence in the unused output. (The design step that
grepped the generated CSS for the utilities was based on a wrong "statically
present" assumption; the on-demand reality is correct and strictly safer.)

## Conclusion

`tw-animate-css` (shadcn v4's animation library) is imported into both Tailwind
pipelines after `tailwindcss/utilities`. Its `animate-in`/`animate-out`/
`fade-*`/`zoom-*`/`slide-*` utilities + `enter`/`exit` keyframes are now
available on demand, so overlay components (Tooltip, Popover, Dialog, Dropdown,
Select, Sheet, Drawer, HoverCard, Menubar, ContextMenu, Command, Toast,
Accordion, …) can migrate to verbatim shadcn content classes that include the
animation utilities. This is the foundation those migrations needed — analogous
to Experiment 16's border-color base for bordered components. No component
migrated yet; the foundation adds zero bytes to the current output.

Learnings for later experiments (also copied to the issue README Learnings
digest):

- shadcn v4 overlay components require `tw-animate-css` (the `@import
  "tw-animate-css"` shadcn uses in globals.css) for their `animate-in`/
  `data-[state=…]:animate-out`/`fade`/`zoom`/`slide` utilities. RadCN now imports
  it in both pipelines; overlay migrations can use those utilities verbatim.
- `tw-animate-css` utilities are ON-DEMAND (`@utility`), so they only appear in
  the generated CSS once a scanned component uses them — verify the foundation
  with a throwaway probe, not by grepping the (still-unused) output. This also
  means the foundation is byte-inert until consumed.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to referenced sources incl. vendored shadcn + the npm registry)

Findings: none (no Blocker, Major, or Minor) — APPROVED.

The reviewer independently confirmed all seven assessment points: (1) the gap is
real (the probe generates 0 animation utilities; vendored shadcn dialog.tsx/
tooltip.tsx use `animate-in`/`data-[state=closed]:animate-out fade-out-0
zoom-out-95`); (2) `tw-animate-css@1.4.0` is the correct, faithful choice
(shadcn v4 `globals.css` imports it; the reviewer unpacked the tarball and
verified it ships CSS-only — utilities `animate-in/out`, `fade/zoom/slide`,
`@keyframes enter`/`exit` — for Tailwind v4, compatible with `^4.1.0`); (3) the
`@import 'tw-animate-css'` placement after `tailwindcss/utilities` mirrors
shadcn's order and resolves from node_modules like `@import 'radcn/theme.css'`
already does — plain `@import`, no `@plugin`/`@source` needed; (4) catalog +
both apps' devDependencies is the right build-time placement; (5) regression
risk is zero — the package is purely additive (utilities + `@property` +
`@keyframes`, no preflight/existing-utility changes) and no current assertion
references the new utilities; (6) scope is minimal and correct (pnpm-workspace
+ 2 package.json + lockfile + 2 tailwind.css; no component/tokens.css/index.ts);
(7) no integration blocker. Verdict: APPROVED.

Approval result: approved with no blockers.

## Completion Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given `AGENTS.md`, the issue README, this experiment file,
and read access to the working tree).

Findings: none (no Blocker, Major, or Minor).

The reviewer confirmed `tw-animate-css@1.4.0` is installed, the catalog + both
devDeps + both `@import 'tw-animate-css'` lines are present, both `styles:build`
and the three typechecks pass, and exactly the expected files changed (no
component/tokens.css/index.ts). It independently re-ran the on-demand probe
(temp scanned element → the 7 utilities + `enter`/`exit` keyframes generate;
deleted → absent, byte-inert), and the docs (2/2 = 11) and fixture (2/2 = 1191)
suites — judging that the byte-unchanged output means the change cannot cause
the Exp-9 overlay flake. It judged the foundation correct and faithful
(shadcn's `tw-animate-css`, imported as shadcn does), the on-demand behavior
correctly understood and provably inert, and the design's grep-assumption
correction honest and sound. Verdict: APPROVED.

Approval result: approved with no blockers.
