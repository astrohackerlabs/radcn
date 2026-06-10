# Experiment 4: Establish the candidate fixture's global Tailwind pipeline

## Description

Experiments 1 and 2 proved Tailwind v4 can be built and served in a native
Remix 3 app and defined the RadCN theme/token contract, but real Tailwind
output is currently loaded on exactly one page — `/tailwind-probe`. Every
other candidate-fixture page renders only the bespoke `radcnStyles` inline
stylesheet. Component styling cannot migrate to Tailwind utilities until the
generated Tailwind CSS is present on the pages that render components.

This experiment establishes that pipeline in the candidate fixture without
migrating any component. The point is to prove the generated Tailwind
stylesheet can be loaded application-wide, alongside the existing bespoke CSS,
with zero regressions in the full fixture suite. That green result is the
foundation every subsequent component-migration experiment builds on.

Why this is safe to do as a no-op-rendering step:

- The fixtures already carry the eventual Tailwind class strings together with
  matching inline `style` attributes (e.g.
  `class="... flex flex-col gap-4 ..." style="display:flex; ...; gap:16px"`).
  Inline styles win the cascade over any class-based rule, so elements that
  have an inline style render identically whether or not Tailwind utilities
  exist.
- Cascade order is chosen to preserve current rendering: the generated
  Tailwind `<link>` is placed BEFORE the inline `radcnStyles` `<style>` in
  `<head>`. Tailwind utilities and `.radcn-*` classes have equal (single-class)
  specificity, so document order breaks ties — `radcnStyles`, being later,
  wins every tie. Existing `.radcn-*` styling therefore stays authoritative.
- Newly active utilities can only affect an element that simultaneously has a
  Tailwind utility class, no inline style for that property, and no `.radcn-*`
  rule setting that property. The full fixture suite is the gate that proves
  this residual surface changes nothing observable.
- Preflight stays disabled (as in Experiments 1–2): no base reset is
  introduced, so global element defaults are untouched.

This deliberately does NOT migrate components or remove any bespoke CSS, does
NOT touch the docs app, and does NOT enable preflight. Those are later
experiments. It also adds `@source` scanning of the RadCN package source now,
so the moment a component starts emitting utility classes (next experiment)
they are generated — establishing the complete pipeline, even though scanning
the package generates no new utilities today (components currently use
`radcn-*` class names, which Tailwind ignores).

## Background: how styles load today

`radcn/fixtures/candidate-remix/app/ui/document.tsx` injects
`<style>{radcnStyles}</style>` in `<head>` on every page. Only the
`tailwindProbe` controller action additionally passes a `head` `<link>` to the
generated stylesheet. The generated file
`app/assets/tailwind.generated.css` is produced by the `styles:build` script
(`@tailwindcss/cli`) and served by `createAssetServer()` (proven in
Experiment 1); it is gitignored build output. Tailwind v4 automatic source
detection scans from the CLI working directory (the fixture package dir).

## Changes

- `radcn/fixtures/candidate-remix/app/styles/tailwind.css`:
  - Add an explicit `@source` directive for the RadCN package component
    source so component-emitted utilities will be generated as components
    migrate:
    `@source '../../../../packages/radcn/src';`
    (Automatic detection already covers the fixture's own `app/` source.)
    Place the `@source` line at the top of the file, immediately after the
    header comment and before the `@import` lines. Tailwind v4 resolves
    `@source` paths relative to the CSS file that declares them (the same base
    used for relative `@import`), so the path resolves to
    `radcn/packages/radcn/src`. Keep preflight excluded; keep the import order
    `tailwindcss/theme` → `radcn/theme.css` → `tailwindcss/utilities`.
    Verification step 1 fails loudly if either the `@source` path or its
    placement is wrong.
- `radcn/fixtures/candidate-remix/app/ui/document.tsx`:
  - Link the generated Tailwind stylesheet on every page, ordered BEFORE the
    `radcnStyles` inline `<style>` so bespoke rules win cascade ties:

    ```tsx
    <link
      rel="stylesheet"
      href={routes.assets.href({ path: 'app/assets/tailwind.generated.css' })}
    />
    <style>{radcnStyles}</style>
    ```

    (`routes` is already imported in this module.) The per-page `head` prop
    keeps working; the `/tailwind-probe` action can drop its now-redundant
    explicit `<link>` since the shell provides it — but to keep this
    experiment's diff minimal and the probe self-evidently correct, the probe
    action is left untouched (a duplicate identical stylesheet link is
    harmless; the next experiment that touches the probe can remove it).

No component source changes, no fixture markup changes, no test changes, no
removal of any `.radcn-*` CSS.

Expected git status for the result commit: `app/styles/tailwind.css`,
`app/ui/document.tsx`, this experiment file, and the issue README index line.
The generated `tailwind.generated.css` stays untracked (gitignored).

## Verification

From the repo root:

1. `pnpm --dir radcn/fixtures/candidate-remix styles:build` — exits 0;
   regenerates `app/assets/tailwind.generated.css` (still contains the
   Experiment 1/2 markers: `tailwindcss v4`, the theme tokens, the probe
   utilities).
2. `pnpm fixtures:candidate:typecheck` — passes.
3. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/tailwind-probe.spec.ts`
   — still passes (the probe page still gets real Tailwind output; now via the
   shell link plus its own).
4. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts` — the
   FULL fixture suite reports 0 failures (expected 1191 passed). This is the
   experiment's gate: it proves loading Tailwind application-wide regresses
   nothing.
5. Manual cascade spot-check, recorded in the Result: on one representative
   non-probe page (e.g. `/fixtures/accordion/demo`), confirm the rendered
   `<head>` has the Tailwind `<link>` before the `radcnStyles` `<style>`, and
   that a known `.radcn-*`-styled element keeps its bespoke computed value
   (cascade order honored). This is covered by the existing accordion spec's
   computed-style assertions, which must remain green.
6. `git diff --check` — clean. 7. `git status --short vendor/` — empty.
8. `git status --short` — only the two source files plus the experiment/README
   docs; `tailwind.generated.css` does not appear (gitignored).

Pass criteria (all must hold):

- The generated Tailwind stylesheet is linked on all candidate-fixture pages,
  ordered before `radcnStyles`.
- The full fixture suite is green (0 failures).
- Typecheck clean; hygiene checks clean; only the expected files change; the
  generated CSS remains untracked.

Fail criteria (any one fails the experiment, and the result is recorded as
Partial/Fail with the specific regressions, informing a narrower next step):

- Any fixture spec regresses once Tailwind is loaded globally.
- The cascade order is wrong (bespoke rules lose ties they previously won).
- The asset server cannot serve the stylesheet on non-probe pages.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (given only `AGENTS.md`, the issue README, this experiment
file, Experiments 1–2 for context, and read access to referenced sources)

Findings: two Minor, no Blocker/Major.

- Minor: `@source` placement in the file was unspecified. Fixed: the design
  now states the directive goes at the top after the header comment, before
  the imports.
- Minor: the design assumed `@source` paths are CSS-file-relative without
  citing it. Fixed: the design now states Tailwind v4 resolves `@source`
  relative to the declaring CSS file (same base as relative `@import`), and
  notes verification step 1 catches any path/placement error.

The reviewer independently verified: document.tsx already imports `routes`,
injects `radcnStyles`, and supports the `<link>`-before-`<style>` ordering;
the `@source` relative path resolves to `radcn/packages/radcn/src`; the
tailwindProbe action's redundant-but-harmless link claim is accurate; the
cascade-order reasoning is correct (equal specificity → later `<style>` wins;
inline styles beat both); the no-regression thesis holds on spot-checked
fixtures (Tailwind class strings carry matching inline styles, component
containers use inline styles or `radcn-*` not utilities); all verification
commands and the gitignore entry exist; and the full-suite gate is a sound
safety net. Verdict: APPROVED.

Approval result: approved with no blockers (two minor findings fixed).
