# Experiment 1: Prove the Tailwind v4 integration point for native Remix 3

## Description

Issue 6 requires Tailwind v4 as RadCN's styling model, but its central open
question is unanswered: what is the correct Tailwind v4 integration point for a
standard Remix 3 app?

The only working Tailwind integration in this repository today is
`radcn/fixtures/reference-react-router`, which uses the `@tailwindcss/vite`
plugin inside a Vite build. That path is unavailable to RadCN's own targets:
the docs app and the candidate fixture are native Remix 3 apps that run
directly via `node --import remix/node-tsx server.ts` with no bundler, and the
RadCN library must not require React Router or Vite. Remix 3's
`createAssetServer()` compiles and serves CSS from source, but it does not run
Tailwind's compiler, so Tailwind needs its own generation step whose output
flows into the Remix 3 asset pipeline.

This experiment answers the question by doing it: integrate Tailwind v4 into
`radcn/fixtures/candidate-remix` — the smallest native Remix 3 app with an
existing Playwright harness — and prove with browser assertions that real
Tailwind-generated utilities style a page, with no inline-style fallback.

Chosen integration model to prove:

- `@tailwindcss/cli` (the standalone Tailwind v4 CLI) compiles
  `app/styles/tailwind.css` into a generated CSS file under `app/assets/`.
- The existing `createAssetServer()` serves the generated file like any other
  source CSS asset (fingerprinting and `@import` rewriting included).
- The page links the stylesheet via the existing `routes.assets.href(...)`
  pattern.

Alternatives considered and rejected for this experiment:

- `@tailwindcss/vite`: requires Vite, which native Remix 3 apps do not use and
  the RadCN library must not require.
- `@tailwindcss/postcss`: requires introducing a PostCSS runner; the repo has
  no PostCSS pipeline, so this adds toolchain for no benefit over the CLI.
- Programmatic `@tailwindcss/node` compilation inside the Remix server or
  asset route: viable future refinement for watch-mode DX, but more custom
  code than a proof needs. If the CLI path fails, this is the fallback to
  evaluate in the next experiment.

Deliberate scope limits:

- Tailwind preflight (base reset) is NOT enabled in this experiment. The
  Tailwind source imports only the theme and utilities layers, because
  preflight would change rendering on every existing fixture page and is a
  decision that belongs to the component-migration experiments. This is
  recorded as a known follow-up, not an omission.
- The stylesheet link is added only to a new probe page (via the `Document`
  component's existing `head` prop), not to the shared document shell, so
  existing fixture specs are not perturbed.
- No RadCN components are migrated to Tailwind utilities yet. The probe uses
  plain elements with utility classes.

## Changes

- `pnpm-workspace.yaml` (repo root):
  - add catalog entries `tailwindcss: ^4.1.0` and `@tailwindcss/cli: ^4.1.0`.
- `radcn/fixtures/candidate-remix/package.json`:
  - add devDependencies `tailwindcss: catalog:` and
    `@tailwindcss/cli: catalog:`;
  - add script `styles:build`:
    `tailwindcss --input app/styles/tailwind.css --output app/assets/tailwind.generated.css`;
  - prepend `pnpm styles:build && ` to the `dev` and `start` scripts so the
    generated CSS always exists before the server boots (the Playwright
    `webServer` uses `dev`).
- `radcn/fixtures/candidate-remix/app/styles/tailwind.css` (new):
  - `@import "tailwindcss/theme";` and `@import "tailwindcss/utilities";`
    (no preflight, per scope limits). Tailwind v4 automatic source detection
    scans the fixture app source from the CLI working directory.
- `.gitignore` (repo root):
  - ignore `radcn/fixtures/**/app/assets/tailwind.generated.css` (generated
    build output, consistent with existing generated-output ignores).
- `radcn/fixtures/candidate-remix/app/routes.ts`:
  - add `tailwindProbe: '/tailwind-probe'`.
- `radcn/fixtures/candidate-remix/app/actions/controller.tsx`:
  - add a `tailwindProbe` action that renders the probe page inside
    `Document`, passing
    `head={<link rel="stylesheet" href={routes.assets.href({ path: 'app/assets/tailwind.generated.css' })} />}`.
- `radcn/fixtures/candidate-remix/app/fixtures/tailwind-probe.tsx` (new):
  - a probe layout styled exclusively with Tailwind utilities — no `style`
    attributes, no `radcn-*` classes, no `css(...)` mixins. Utilities chosen
    for deterministic computed values:
    `flex flex-col gap-4 w-full max-w-md p-6 rounded-lg bg-[#112233] text-[#fafafa]`
    on a `data-tailwind-probe` container plus a child element exercising at
    least one more spacing utility. Arbitrary-value colors are used
    deliberately: they only exist in the output if Tailwind really scanned the
    source, and they compute to stable `rgb(...)` values for assertions.
- `radcn/fixtures/tests/tailwind-probe.spec.ts` (new):
  - asserts the stylesheet URL linked from the probe page returns HTTP 200
    with a CSS content type, contains the Tailwind v4 header comment
    (`tailwindcss v4`), contains the `.bg-\[\#112233\]` utility, and does NOT
    contain a never-used marker utility (e.g. `bg-[#445566]`), proving
    on-demand generation rather than a static dump;
  - asserts computed styles on the probe container: `display: flex`,
    `flex-direction: column`, `gap: 16px`, `padding: 24px`,
    `border-radius: 8px`, `background-color: rgb(17, 34, 51)`,
    `color: rgb(250, 250, 250)`;
  - asserts the probe container has no `style` attribute, proving no
    inline-style fallback.

Expected git status for the result commit: only the files listed above plus
`pnpm-lock.yaml`.

## Verification

From the repo root:

1. `pnpm install` — succeeds and updates the lockfile with the two new catalog
   packages.
2. `pnpm --dir radcn/fixtures/candidate-remix styles:build` — exits 0 and
   writes `app/assets/tailwind.generated.css` containing the Tailwind v4
   header comment and the probe's arbitrary-value utilities.
3. `pnpm fixtures:candidate:typecheck` — passes.
4. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/tailwind-probe.spec.ts`
   — the new spec passes.
5. `pnpm exec playwright test -c radcn/fixtures/playwright.config.ts tests/accordion.spec.ts tests/input.spec.ts`
   — two representative existing specs still pass, proving the dev-script
   change and new route did not disturb the harness or existing pages.
6. `git diff --check` — no whitespace errors.
7. `git status --short vendor/` — empty (vendor checkouts untouched).

Pass criteria (all must hold):

- The generated stylesheet is served by the Remix 3 asset server and is real
  Tailwind v4 output (header comment + on-demand utility presence/absence
  assertions).
- The probe page's computed styles match the utility classes with no `style`
  attribute on the probe container.
- Typecheck and all listed Playwright specs pass.
- No vendor or unrelated files change.

Fail criteria (any one fails the experiment):

- The asset server cannot serve the generated CSS, or mangles it (computed
  styles wrong despite correct file output).
- Utilities only render with preflight enabled (would force rescoping).
- The CLI cannot detect classes in the fixture's source.

## Design Review

Reviewer: fresh Claude subagent (Explore agent, spawned via the Agent tool by
the Claude implementation session)
Fresh context: yes (subagents start with no parent conversation context; given
only `AGENTS.md`, the issue README, this experiment file, and read access to
referenced repository sources)

Findings: none (no Blocker, Major, or Minor findings).

The reviewer verified the issue README links this experiment as Designed, all
required sections exist, scope limits are appropriate, all referenced fixture
files/scripts/route patterns exist as claimed, the asset server's CSS serving
behavior matches the Remix skill reference, and the Playwright commands match
the existing suite's conventions. It flagged three Tailwind v4 assumptions as
unverifiable from the repo alone (the `@tailwindcss/cli` package split, the
`tailwindcss/theme` + `tailwindcss/utilities` layer imports, and automatic
source detection without a config file) and confirmed each one fails loudly at
a concrete verification step if wrong.

Approval result: approved with no blockers.
